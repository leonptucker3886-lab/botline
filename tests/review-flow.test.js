/* Smoke test: submit -> verdict rounds -> live, and the link-count gate.
   Run with: node tests/review-flow.test.js   (needs jsdom installed) */
const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

const root = path.join(__dirname, "..", "app");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8").replace(/<script[\s\S]*?<\/script>/g, "");
const dom = new JSDOM(html, { url: "https://example.test/botline/app/", runScripts: "outside-only" });
const { window } = dom;
window.confirm = () => true;
window.alert = () => {};
window.scrollTo = () => {};

function load(name) {
  let code = fs.readFileSync(path.join(root, name), "utf8");
  code = code.replace(/^\s*"use strict";\s*/, "");
  window.eval(code);
}
load("app.js");
load("ui.js");
load("boot.js");

let failures = 0;
function ok(cond, msg) {
  if (cond) { console.log("  ok  " + msg); return; }
  failures++;
  console.log("  FAIL " + msg);
}

const S = window.S;
S.me = { kind: "boss" };
S.types = window.defaultTypes();
S.jobs = [];
S.bots = [{ id: "bot-1", name: "Ernie", role: "Writer", categories: ["blog"], active: true, lastSeenAt: window.now() }];

const t = S.types.find((x) => x.id === "blog");
const checkpoints = (t.checkpoints || []).map((label) => ({ id: window.uid("cp"), label, done: false, at: "", by: "" }));
const job = {
  id: "J-1001", type: t.id, typeName: t.name, title: "Best cat beds", brief: "x",
  priority: "Normal", status: "Open", assignee: null, assigneeName: "",
  createdAt: window.now(), createdBy: "Boss", deadline: null, deadlineExplicit: false,
  slaHours: 2, checkinHours: 6, checkpoints, checkins: [],
  activity: [{ at: window.now(), by: "Boss", kind: "create", text: "Posted" }],
  blockedReason: "", reviewNote: "", rework: 0
};
S.jobs.push(job);

(async () => {
  await window.assignJob("J-1001", "bot-1", true);
  S.me = { kind: "bot", botId: "bot-1" };

  const linkCp = checkpoints.find((cp) => window.needsLinkCount(cp));
  ok(!!linkCp, "a checkpoint that asks about links needs a count");

  window.toggleCheckpoint("J-1001", linkCp.id, true);
  ok(!linkCp.done, "ticking a link checkpoint without a count is refused");
  window.setCheckpointLinks("J-1001", linkCp.id, 4);
  window.toggleCheckpoint("J-1001", linkCp.id, true);
  ok(linkCp.done && linkCp.links === 4, "with a count the link checkpoint ticks");

  checkpoints.forEach((cp) => {
    if (cp.done) return;
    window.setCheckpointLinks("J-1001", cp.id, 2);
    window.toggleCheckpoint("J-1001", cp.id, true);
  });
  ok(window.progressOf(job).done === window.progressOf(job).total, "every checkpoint can be ticked with a link count");
  window.submitForReview("J-1001", "github.com/org/site/pull/7", "first pass");
  ok(job.status === "Review", "submitting puts the card in review");
  ok(job.rounds.length === 1 && job.round === 1, "round 1 recorded with a link");
  ok(job.rounds[0].url === "https://github.com/org/site/pull/7", "bare domain becomes a real link");
  ok(window.statusHistory(job).some((h) => /Submitted/.test(h.label)), "history logs the submission");

  S.me = { kind: "boss" };
  window.route = "inspect";
  const queueHtml = window.viewInspect();
  ok(/Review queue/.test(queueHtml) && /Best cat beds/.test(queueHtml), "inspector queue lists the card");
  ok(/Ernie/.test(queueHtml), "queue shows who submitted it");
  ok(/github\.com\/org\/site\/pull\/7/.test(queueHtml), "queue shows the GitHub link");

  window.applyVerdict("J-1001", "changes", "swap the hero chart", "docs/report-1.html");
  ok(job.status === "Active" && job.rework === 1, "changes needed sends it back");
  ok(job.rounds[0].verdict === "changes" && job.rounds[0].reportUrl, "round 1 keeps its verdict + report");

  S.me = { kind: "bot", botId: "bot-1" };
  window.submitForReview("J-1001", "github.com/org/site/pull/9", "second pass");
  ok(job.rounds.length === 2 && job.round === 2, "resubmission opens round 2");

  const roundsHtml = window.roundsPanel(job);
  ok(/Round 2/.test(roundsHtml) && /Round 1/.test(roundsHtml), "the card shows round 1 and round 2");
  ok(/Changes needed/.test(roundsHtml), "round 1 keeps the changes-needed verdict");

  S.me = { kind: "boss" };
  window.applyVerdict("J-1001", "approved", "ships", "");
  ok(job.status === "Approved", "approving moves the card to Approved");
  ok(!window.activeJobOf("bot-1"), "an approved card frees the writer");

  window.markLive("J-1001");
  ok(job.status === "Live", "the inspector's live step lands");
  ok(window.statusHistory(job).some((h) => /Live on leonlink\.net/.test(h.label)), "history records going live");

  window.render();
  const dash = window.viewDash();
  ok(/In review/.test(dash) && /Live/.test(dash), "dashboard shows the new statuses");

  window.boardFilter.status = "Rejected";
  ok(typeof window.viewBoard() === "string", "board renders the rejected filter");

  console.log(failures ? "\n" + failures + " failure(s)" : "\nall checks passed");
  process.exit(failures ? 1 : 0);
})().catch((e) => { console.error("ERROR", e); process.exit(1); });

# Leenlink SOP: New Bot Onboarding

_Owner: Leon Tucker · Maintained by: Inspector gadget · Started: Nov 25 2026_

## Why
Leenlink bots use a **GitHub personal access token (PAT)** connection only. **We do not use GitHub OAuth anymore.** On Nov 25 2026 the OAuth link failed ("Credentials could not be checked") and blocked the Sootfather chief, while token connections kept working.

## 1. First wake (before any other work)
1. **Send Leon the GitHub connection card.** Post the Connect card for the *GitHub personal access token* connector (not GitHub OAuth) so Leon can paste the token in himself.
   - Never ask for the token in chat. Never post, save to memory or commit a token.
   - If a GitHub OAuth connection is present, don't use it. Tell Leon so he can disconnect it.
2. **Test the connection.** After Leon connects the token, do a read-only test of each repo you'll work in (leenlink-home, botline). Post pass/fail in the topic.
3. **Introduce yourself.** Post your name, the role Leon gave you, and confirm you've read this SOP and BOTS.md.
4. **Do not claim a card** until steps 1–3 are done.

## 2. Wake-up job
- Set up your Botline wake-up job only after the token test passes.
- When Leon says hold, **pause** (don't delete) the job and confirm. Turn it back on only when Leon says so.

## 3. Before every job
- Quick test read of the repo to confirm the token still works.
- Confirm your wake-up job is on.
- If GitHub fails, post the exact error and ask Leon to reconnect the token. Don't guess the cause.

## Related
- BOTS.md (roster and roles)
- sops/blog.md
- Games SOP (in progress during Sootfather repair)

---
name: precise
description: Rewrite or compose text at maximum information density without losing meaning. Use when the user asks to tighten, condense, or make an answer, message, commit, PR description, status update, or doc more concise or precise, or says "too long", "cut the fluff", or "be terse".
---

# Precise

Goal: maximum information per word, full meaning preserved. Precision picks the term that already carries the whole idea; compression drops meaning to save words. Do the first, never the second.

## Rules

1. **Conclusion first.** Keep supporting detail only if it changes the reader's action or understanding. (Grice, Quantity; NN/g front-loading)
2. **No ritual.** No greetings, acknowledgments, restated question, or sign-off. (Grice, Manner)
3. **Exact term over paraphrase.** "Race condition", not "two things happening at once and interfering". (Wüster/ISO 704: terms as compression)
4. **Hedge only real, material uncertainty — and quantify it.** "Likely (~80%)", not "it might possibly be the case that".
5. **Status = subject + state.** "Build passed. 2 warnings." (GPWS/appliance prompts)
6. **Outcomes, not process.** Report what is true now, not the steps taken. (Unix: silence on success)
7. **One idea per sentence. One word per concept.** No synonyms for variety. (ASD-STE100)
8. **Even density.** No filler stretches, no cryptic spikes; drop articles or verbs only where no ambiguity results. (Uniform Information Density)
9. **Expand on request**, never preemptively — except where omission would mislead.
10. **Claim only what you verified.** Say what is loaded, active, tested, or checked only if you observed it; otherwise name what you did ("Skill loaded; output style depends on your settings").
11. **Name the unit before any arithmetic.** "85 dev-weeks summed across 3 apps (~28 calendar weeks)", not "85 weeks, about 7 months".

## Procedure

1. State the core claim in one sentence.
2. List the facts the reader needs to act on it. Drop the rest.
3. Replace each multi-word paraphrase with the precise term.
4. Delete every word whose removal leaves meaning unchanged.
5. Check: did any fact, qualifier, or condition disappear? If so, restore it.

## Examples

**Before:** "Great question! So, after looking into this, it seems like the problem is probably that the function is being called before the data has finished loading, which means it ends up getting undefined."
**After:** "`render()` runs before `fetchData()` resolves, so `data` is `undefined`. Await the fetch or guard on `data`."

**Before:** "I went ahead and ran the test suite, and I'm happy to report that everything passed except for a couple of warnings that came up."
**After:** "Tests passed. 2 warnings."

**Before (over-compressed, meaning lost):** "Fix: cache. Done."
**After:** "Added a 60 s in-memory cache to `getUser()`; p95 latency 420 ms → 35 ms. Stale reads possible for up to 60 s."

## Failure modes

- **Teaching / explanation:** a learner needs the intermediate steps; they carry meaning. Keep them.
- **Ambiguity:** if the request has two readings, name both in one line instead of guessing silently.
- **Legal / medical / safety:** qualifiers and conditions are the content. Never cut them.

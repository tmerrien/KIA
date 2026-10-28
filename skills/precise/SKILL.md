---
name: precise
description: Rewrite or compose text so every word carries meaning and no meaning is lost. Use when the user asks to tighten, condense, or make an answer, message, commit, PR description, status update, or doc more concise or precise, or says "too long", "cut the fluff", or "be terse".
---

# Precise

Goal: the fewest words that carry the full meaning *for this reader*. Precision picks the term or structure that already carries the whole idea. Compression drops meaning the reader cannot rebuild. Do the first, never the second.

## Rules

1. **Answer first, unless something changes how it must be read.** Open with the answer or deciding term. A reversing condition, an uncertainty status, a departure from the request, or your reading of an ambiguous request comes first instead. Each paragraph carries its own point. (Morkes & Nielsen 1997; STE 5.4; Duggan & Payne 2009)
2. **Cut by the recoverability test.** Delete only what this reader can rebuild cheaply from what they have seen or know. When unsure of their level, assume they recover less. Recoverable does not mean must-cut: keep restatements at costly points. (Shannon 1951; Piantadosi 2012; CAP 413)
3. **Never change the claim.** A cut is wrong if it changes truth conditions, stated confidence, or stated source. Keep scope qualifiers, quantifiers ("usually", "most"), rounders ("about"), sibling-separating negations, and real shields ("I suspect", "per the 2023 label"). (ISO 704; Prince et al. 1982)
4. **Most specific supported term, everyday level by default.** Use a more specific term only when a same-kind alternative is live. Swap catch-alls for the deciding variable. Use a coarser claim when the evidence supports nothing finer. Give exact counts with their scope. (Degen 2020; Frank & Goodman 2012; Jiang 2025)
5. **Gloss, don't paraphrase.** If the reader hasn't shown the concept, add one short appositive at first use, or use an exactly equivalent common word. Never use a vaguer paraphrase. Never re-gloss terms the user used correctly. (Oksa 2010; Yeung 1998; Martínez 2022)
6. **One concept, one term.** Reuse the established term verbatim. Shorten by dropping modifiers, never by swapping in a synonym. Map the user's term to the standard one once. Hold identifiers and defined terms exactly. (Hua & Artzi 2024; ISO 10241-1; Brennan & Clark 1996)
7. **Strongest supported claim; calibrated hedges.** Hedge only claims materially less certain than the rest, at the claim, in plain first-person words. Give a number only when it has a basis. Name the reason only when it tells the reader what to check. Prefer the tightest true claim, or "likely X because Y; if not, check Z", to a bare "possibly". (Kim 2024; Steyvers 2025)
8. **Restructure, don't telegraph.** In prose, keep articles, subjects, verbs, units, and connectives that state contrast, condition, or concession. Split long sentences, carrying the connective across. Fragments only in closed status vocabularies ("Build passed. 2 warnings."). (STE 4.2; Meister 2021)
9. **Deciding conditions travel with the claim.** A condition, exception, or warning that decides truth or safety goes before the action or in the same sentence. (STE 5.4; Duggan & Payne 2009)
10. **Exact literals; separated look-alikes.** Commands, paths, versions, flags, and errors go in code, verbatim. Same-shaped values go on labelled separate lines. Use numbered steps for three or more actions, never splitting an AND-condition. (Cardosi 1996; Grayson 1981; Morrow 1993)
11. **Private context is not given.** Describe anything only you saw at first mention: files, unshown output, coined labels. In summaries, commits, PRs, and handoffs, expand session labels into standard terms. (Schober & Clark 1989; Hua & Artzi 2024)
12. **Cut zero-information material; replace marked forms rather than deleting them.** Delete stock phrases, praise, sign-offs, process narration, and prose that echoes a self-sufficient code block or table. Replace "not unreasonable" or "was able to" with the plain form only if the plain meaning is intended. (Chandler & Sweller 1991; Tessler & Franke 2018)

## Procedure

1. Identify the reader (the live user, a forwarded or third-party reader, an expert or novice signal) and the goal (decide, act, learn, look up).
2. List the must-have units: facts, conditions, warnings, steps *with their order*, and the links a novice would need. Must-haves stay even past the question's apparent scope.
3. Cut optional units lowest-impact first. Then cut zero-information words (rule 12).
4. Replace paraphrases with the precise term (rules 4-5). Restructure long or nested sentences (rules 8-9).
5. **Claim check:** compare each sentence with its original. Did any modality, causality, negation, scope, quantifier, rounder, shield, or source change or vanish? Restore it.
6. **Consistency check (a separate pass):** one term per concept, no new synonyms, identifiers verbatim, session labels expanded if the text leaves the conversation.
7. **Ambiguity check:** for each word with two live senses for this reader, qualify its first mention. Leave settled ambiguity alone.

## Examples

**Before:** "Great question! So, after looking into this, it seems like the problem is probably that the function is being called before the data has finished loading, which means it ends up getting undefined."
**After:** "`render()` runs before `fetchData()` resolves, so `data` is `undefined`. Await the fetch or guard on `data`."

**Before:** "I went ahead and ran the test suite, and I'm happy to report that everything passed except for a couple of warnings that came up."
**After:** "All 212 tests passed. 2 warnings."

**Before (over-compressed, meaning lost):** "Fix: cache. Done."
**After:** "Added a 60 s in-memory cache to `getUser()`; p95 latency 420 ms → 35 ms. Stale reads possible for up to 60 s."

**Before (shield and condition lost):** "Max dose is 4 g/day. Don't if liver disease."
**After:** "If you have no liver disease, the 2023 label puts the adult maximum at about 4 g/day."

**Before (synonym drift):** "Clear the cache... then rebuild the store... the buffer should now be empty."
**After:** "Clear the cache, then rebuild it; the cache should now be empty."

## Failure modes: where density rules bend

- **Teaching:** the intermediate steps carry meaning; keep them. One short restatement of the principle right after a worked example is allowed.
- **Ambiguity:** if two readings give different short answers, give both in one line each. Before an irreversible step, ask.
- **Legal / medical / safety:** qualifiers, conditions, sources and standard warnings are the content. A warning stays when its trigger is unknown.
- **Destructive commands:** warn first, give the full target, and prefer a dry-run or a typed-back confirmation to an echo.
- **Emotional turns:** a brief acknowledgment of bad news or frustration is a grounding act, not filler.
- **Text leaving the conversation:** write for a reader who saw none of it.
- **Creative drafts:** do not apply density rules unless asked. If asked, cut filler only, and never change what the passage asserts or implies.

# Card et al. (2001): Information scent as a driver of Web Behavior Graphs

*Coverage note:* I was assigned Fu & Pirolli (2007), SNIF-ACT, but `fu-pirolli-2007-snif-act.md` already existed. I covered this paper instead because its protocols are the Experiment 1 data of SNIF-ACT 1.0, and it is the original statement of the "leave the patch when scent drops" finding the assignment asked about. The other candidate, Pirolli (2005), *Cognitive Science* 29(3), 343-373, doi:10.1207/s15516709cog0000_20, is closed access, and no open copy could be read.

## Citation
Card, S. K., Pirolli, P., Van Der Wege, M., Morrison, J. B., Reeder, R. W., Schraedley, P. K., & Boshart, J. (2001). Information scent as a driver of Web behavior graphs: Results of a protocol analysis method for Web usability. *CHI 2001*, pp. 498-505. ACM. doi:10.1145/365024.365331 (DOI and pages checked on Crossref).
- Full text read: the ACM-typeset PDF (8 pp.) on a Virginia Tech course page, https://research.cs.vt.edu/ns/cs5724papers/5.usageenvir.adaptation.card.infoscent.pdf

## Core claim
Information scent is "one of the major controlling variables in Web foraging behavior" (p. 504). It produces two signature behaviours. **Scent-following:** users pick the links whose proximal cues best predict their goal. **Patch scent policy:** users switch to another site or search engine "when the information scent of the current site becomes low" (p. 504). The authors explain the second behaviour with a threshold rule taken from optimal foraging theory. As long as the expected reward of staying, judged from scent, stays above a threshold, the user stays. When it falls below, the user moves on.

## Key evidence
- **Method.** 14 Stanford participants (mean age 23). Six "find information" tasks came from 2,188 responses to a GVU Web survey. The instruments were WebLogger (keystrokes, clicks, page cache), an ISCAN eyetracker with Web-EyeMapper, and videotaped think-aloud. Only **4 of the 14 participants on 2 tasks** (ANTZ, CITY), i.e. 8 protocols, were analysed (p. 500). SNIF-ACT's account of this dataset as "8 participants" is a slip: it was 8 protocols from 4 people.
- **Web Behavior Graph.** This is a problem-behaviour graph (Newell & Simon 1972) drawn from the logs. It shows users moving among four problem spaces: typing a URL, following links, keyword search, and visual search. "The user reacts to an impasse in one problem space by quickly shifting to another" (p. 505).
- **Task difficulty.** ANTZ was harder than CITY: 25% vs 75% success, 21.7 vs 9.8 unique states (geometric means), and 5.6 vs 2.8 websites used. The ratio of within-site to between-site transitions was 2.1 for ANTZ and 5.2 for CITY. Information is patchy, and the patchiness is stronger on the easy task (p. 504).
- **Verbal markers of scent.** "That's what I want, 'ANTZ' movie posters" marked high scent. "But there's nothing on Antz" and "I think I'll have more luck with the WebRing" marked low scent (p. 504).
- **Patch-leaving plot (Fig. 5).** Three judges rated each page's scent from 0 (none) to 3 (high), and the analysis used the geometric mean of their ratings. The authors took runs of 3 or more pages on one site (not a search engine or portal) that ended in a switch: N = 3 three-page runs and N = 6 five-page runs. In those runs, scent starts high, falls over the last pages before the switch, and is higher again on the next page after leaving. The authors warn that the ratings are ordinal, so the graph "cannot be interpreted quantitatively" (p. 504). No inferential test is reported. Fu & Pirolli (2007) later re-analysed the same data and found the drop non-significant: t(11) = 0.61, p = .56.
- **Discussion conclusions (p. 505).** "Dwindling information scent caused users to backtrack or switch problem spaces." On the easy task, search looked close to linear, GOMS-like execution. On the hard task it was heuristic search with backtracking. Users also used hub-and-spoke returns to landmark pages such as hit lists.
- **Design implication (p. 505).** There are two separate levers. One is "time limiting operators (e.g., accelerated reading/skimming)", meaning content that is faster to process. The other is "reducing the extent of search (e.g., creating better information scent)", meaning fewer wrong turns. The authors treat these as different problems.

## Sources it builds on
- Pirolli & Card (1999), Information Foraging, *Psych. Review* 106 (already covered)
- Stephens & Krebs (1986), *Foraging Theory*; McNamara (1982), optimal patch use in a stochastic environment (the source of patch potential)
- Furnas (1997), Effective view navigation, CHI '97 ("residue", the precursor of scent)
- Newell & Simon (1972), problem spaces and problem behaviour graphs; Card, Moran & Newell (1983), GOMS
- Chi, Pirolli & Pitkow (2000), The scent of a site, CHI 2000
- Byrne, John, Wehrle & Crow (1999), The tangled web we wove, CHI '99. It found that most Web time is spent *reading content*.
- Scanlon (2000), On-site Searching and Scent, UIE Report #10 (practitioner source on scent)

## Works that cite it (forward)
- Fu, W.-T., & Pirolli, P. (2007). SNIF-ACT, *HCI* 22(4). Verified: it uses these protocols for Experiment 1 (see `fu-pirolli-2007-snif-act.md`).
- Pirolli, P. (2007). *Information Foraging Theory*. OUP, ch. 4-5. UNVERIFIED as a citer; the book was not opened.
- Chi, E. H., Rosien, A., Supattanasiri, G., Williams, A., Royer, C., Chow, C., Robles, E., Dalal, B., Chen, J., & Cousins, S. (2003). The Bloodhound project, CHI 2003. UNVERIFIED as a citer.
- OpenAlex counts 167 citing works (W2162583366, checked 2026-10-28). The list of citers could not be fetched because the OpenAlex rate limit was hit.

## Relevance to AI answer style
- **Abandonment follows falling relevance, not length.** In Fig. 5 users stayed for five-page runs while scent was high and left only when it fell. A long answer whose every unit is on-goal keeps the reader. A short answer that opens with low-scent material (preamble, a restated question, generic caveats) gives the reader the "nothing on Antz" signal. This is the precision-vs-compression line: what matters is the scent per unit, not the number of units.
- **The leave rule is a threshold on expected yield.** Each sentence updates the reader's estimate of whether the rest will pay off. Text that is precise early, using the exact term the reader's goal is phrased in, keeps that estimate above threshold.
- **Two separate levers (p. 505).** Faster-to-process text (shorter, skimmable) and better scent (the right labels, so the reader goes to the right place) are different problems. Compression works only on the first. Precise labelling works on the second, and on hard tasks the second dominates: the ANTZ graphs show far more backtracking than the CITY graphs.
- **Readers switch strategy at impasses.** When text stops yielding, users do not keep reading more carefully. They jump to another source. An answer that stalls loses the reader to a search engine.

## Candidate rules for the harness
1. **No low-yield opening.** The first sentence must carry high scent: the answer, or the exact term or decision the user asked about. Preamble, restating the question and generic disclaimers are the low-scent pages that come before a patch switch.
2. **Cut low-yield units; do not shrink them.** Drop sentences that do not move toward the user's goal entirely. Keep on-goal detail even when it makes the answer longer, since readers stayed for long runs while scent held.
3. **Label for direction, not just speed.** On hard or multi-part questions, spend words on accurate section labels and signposts in the user's own terms ("If X, do Y"), so the reader goes straight to the right part instead of backtracking.

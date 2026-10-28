# Blackmon, Kitajima & Polson (2003): Repairing Usability Problems Identified by the Cognitive Walkthrough for the Web

## Citation
Blackmon, M. H., Kitajima, M., & Polson, P. G. (2003). Repairing usability problems identified by the Cognitive Walkthrough for the Web. *Proceedings of CHI 2003*, 497-504. ACM. doi:10.1145/642611.642698

- Full text read (author mirror): http://oberon.nagaokaut.ac.jp/ktjm/English/PAPERS(E)/CHI2003BlackmonEtAl.pdf (landing page http://oberon.nagaokaut.ac.jp/ktjm/English/PAPERS(E)/CHI2003.html)
- OpenAlex lists 61 citing works (2026-10-28).
- Companion to `blackmon-2002-cognitive-walkthrough-web.md`.

## Core claim
The label problems that CWW detects can be repaired, and repair roughly halves the clicks needed to reach a target. Three repairs do this:
- replace unfamiliar words with familiar, distinguishing ones;
- separate confusable labels so each predicts its own content;
- give multiple access paths wherever several labels legitimately attract the goal.

Elaborating each link with 5-10 example items added text but no measurable benefit.

## Key evidence
- **Setup.** The test site simulated an online encyclopedia: a Humanities page with 40 links under 5 headings and a Sciences page with 34 links under 3 headings. Participants searched for 32 target articles. Exp. 1 had 119 undergraduates and Exp. 2 had 85, 204 in total.
- **Confusable repair.** "United States History" vs "People in United States History" had a cosine of 0.97. The second was renamed "Leaders in American History", which brought the cosine to 0.23. The new label is also more *accurate*, because every article under it is about an individual leader and none is about "a people". The repair also requires high similarity between a link and its own heading and low similarity to the other headings, which can force links to be regrouped.
- **Unfamiliar repair.**
  - "Paleontology" (term vector length 0.06) became "Paleontology & Fossils" (1.55).
  - "The Occult" (0.08) became "Magic, Supernatural, & Spirits" (0.88). Finding "Medicine Man" fell from 7.2 to 2.6 clicks.
  - The paper also reports that paraphrase "only sometimes" fixes unfamiliarity, because it cannot supply missing domain knowledge.
- **Competing repair.** Links to the target were added under every heading and link that CWW predicted users would choose. For example, "Fish" was added under "Life Science" for Fisheries. In the paper's words, "putting links to the item all the places where CWW predicts users are most likely to look".
- **Exp. 1 results.** Mean clicks on the main page fell from 4.51 to 1.97 on Humanities and from 3.24 to 1.68 on Sciences, about 2:1. Both F tests were above 100, p<.0001. Gains were largest for competing headings and links and smallest for unfamiliar labels.
- **Exp. 2 results.**
  - Removing the 5-10 elaborating examples per link ("RepairedNoExamples") gave performance no different from the full repair, and the page was more scannable.
  - Repairing only the competing problems ("SemiRepaired") captured most of the gain, but it was significantly worse than the full repair on Sciences.
  - The authors cite Nielsen: users skim and do not process the extra material.

## Sources it builds on
Blackmon et al. (2002) CWW; Kitajima, Blackmon & Polson (2000) CoLiDeS; Kintsch (1998); Landauer & Dumais (1997) LSA; Larson & Czerwinski (1998); Pirolli & Card (1999); Chi et al. (2000, 2001); Nielsen (2000) *Designing Web Usability*; Wharton et al. (1994).

## Works that cite it (forward)
- Blackmon, Kitajima & Polson (2005) CHI 2005, doi:10.1145/1054972.1054978. This is the AutoCWW tool paper, predicting problem severity (NOT read).
- Mahatody, Sagar & Kolski (2010) CW state of the art, doi:10.1080/10447311003781409 (UNVERIFIED that it cites the 2003 paper specifically; it does cite the 2002 one per OpenAlex).

## Relevance to AI answer style
- This is a direct test of PRECISION vs COMPRESSION. Both "Leaders in American History" and "People in United States History" are four words long. The repair changed which words were used, not how many, and it fixed both confusion and prediction.
- "Paleontology & Fossils" is *longer* than "Paleontology" and performs better. The precise term is kept, and one familiar anchor word is added for the reader who lacks it.
- Elaboration that repeats what a good label already conveys (the 5-10 examples) costs length and buys nothing. Redundancy that a skimming reader does not process is pure cost.
- When a question legitimately maps to several categories, answer where the user will look. Point to the item from each plausible frame rather than forcing the taxonomist's single "correct" path.

## Candidate rules for the harness
1. **Fix labels by choosing words, not counting them.** When revising a heading or term, replace overlapping or misleading words with distinguishing ones. Do not shorten by removing the distinguishing word.
2. **Anchor, don't substitute.** Keep the exact technical term, and add one familiar anchor word only when the user's vocabulary suggests a gap ("idempotent (safe to repeat)").
3. **No decorative examples.** Do not append example lists that only restate what a clear label or sentence already says. Add examples only when they change what the reader will do or choose.

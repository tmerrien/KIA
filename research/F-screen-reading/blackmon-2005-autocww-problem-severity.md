# Blackmon, Kitajima & Polson (2005): Tool for Accurately Predicting Website Navigation Problems, Non-Problems, Problem Severity, and Effectiveness of Repairs

## Citation
Blackmon, M. H., Kitajima, M., & Polson, P. G. (2005). Tool for accurately predicting website navigation problems, non-problems, problem severity, and effectiveness of repairs. *Proceedings of CHI 2005*, 31-40. ACM. doi:10.1145/1054972.1054978

- Full text read (6 pp., author mirror on Kitajima's page): http://oberon.nagaokaut.ac.jp/ktjm/English/PAPERS(E)/CHI2005.pdf
- This is the third paper in the CWW series. The first two are already covered in `blackmon-2002-cognitive-walkthrough-web.md` and `blackmon-2003-repairing-cww.md`. It was taken instead of the queued 2002/2003 pair because both of those slugs already exist.
- Citation counts: OpenAlex 101 (W2103981575) and Semantic Scholar 123, both checked 2026-10-28.
- The AutoCWW tools at autocww.colorado.edu and the "AutomatableRules.doc" were not opened. They are referenced only through the paper, so their content is UNVERIFIED and their current availability is unknown.

## Core claim
How hard it is to find something on a page can be predicted from the *wording* of its labels alone. Three objective, LSA-computed label defects add a fixed cost in extra clicks: the correct link is **unfamiliar**, the correct link has **weak scent**, or there are **competing links under competing headings**. The resulting regression formula cross-validates on new tasks, and repairs aimed at predicted *serious* problems succeed 93% of the time.

## Key evidence
- **Dataset.** 164 tasks (82 unrepaired/repaired pairs) pooled from four experiments, with mostly 38 or more participants per task. The site was a simulated online encyclopedia with 74-93 links under 9-13 headings. The goal was shown as a 100-200-word summary of the target article (LSA cosine to the article of at least 0.76).
- **Replications (Exps. 1-2, N = 52 and 76).**
  - Competing-heading tasks: 5.62 clicks unrepaired vs about 1.9 repaired (Exp. 1, F(1,50) = 253.46); 6.46 vs 2.01 (Exp. 2).
  - Unfamiliar-link tasks: 5.70 vs 2.55 (Exp. 2).
  - Repairing an unfamiliar label meant (a) *substituting a familiar wording*, e.g. "Paleontology and Fossils" for "Paleontology", and (b) adding a familiar correct link under the best-matching heading.
- **Prediction formula (p. 36).** Mean total clicks = 2.199 + 1.656 [correct link unfamiliar] + 1.464 [correct link weak scent] + 0.754 × (number of competing links nested under competing headings).
  - Adjusted R² = .574, F(4,160) = 74.22. All terms significant (t = 5.1, 5.8, 10.8).
  - Competing links under the *correct* heading did not survive as a predictor. Only competition across headings did.
- **Automatable rule example (competing heading).** All three conditions must hold: the goal-heading cosine is at least 0.8 × the best correct heading's cosine, the goal-heading cosine is at least 0.10, and the best goal-link cosine under that heading is at least 0.20.
- **Clicks track failure.** Observed clicks predict the task-failure rate at r = .93 (adjusted R² = .87). The fitted failure rate is about 5% at 2.5 clicks, 26% at 5, 51% at 8 and 76% at 11.
- **Repairs and prediction accuracy.**
  - Repair success: 83% overall (62/75) and 93% (43/46) for predicted-serious problems.
  - Unfamiliar-term problems were the hardest to repair: 75% (21/28) vs 87% (41/47) for tasks without one. The authors' explanation: "there is no easy way to compensate for users' low background knowledge."
  - Hits: 92% (69/75), with 100% hits for predicted-serious problems.
- **Cross-validation (Exp. 3, N = 113, 64 new tasks, 1 correct link of 93).**
  - The same three predictors held (R² ≈ .50), with coefficients close to the original fit.
  - Predicted non-problems: 2.20 clicks predicted vs 2.20 observed. Predicted problems: 5.43 predicted vs 5.68 observed.
  - Hits 90%. Correct rejections 69%; no miss was a serious problem.
- **Limits stated by the authors.**
  - One site genre (an encyclopedia) with text-only layouts and college-educated participants only.
  - Generalization to other informational sites is assumed, and "this cross-validation study provides no evidence to confirm that assumption."

## Sources it builds on
- **Cognitive models.**
  - Kitajima, Blackmon & Polson (2000), CoLiDeS, *Proc. HCI 2000*, 357-373.
  - Kitajima & Polson (1997), *HCI* 12.
  - Kintsch (1998), *Comprehension*.
- **LSA.** Landauer & Dumais (1997), *Psych. Rev.* 104; Landauer, Foltz & Laham (1998), *Discourse Processes* 25.
- **Information scent and foraging.**
  - Pirolli & Card (1999).
  - Chi et al. (2000, 2001, 2003 Bloodhound).
  - Pirolli & Fu (2003), SNIF-ACT.
  - Furnas (1997).
  - Katz & Byrne (2003), *TOCHI* 10.
  - Larson & Czerwinski (1998).
  - Miller & Remington (2004), *HCI* 19, 225-271.
- **Usability-method critique.** Gray & Salzman (1998), "Damaged merchandise"; Hertzum & Jacobsen (2003), the evaluator effect; Wharton et al. (1994), cognitive walkthrough.

## Works that cite it (forward; Semantic Scholar, ranked by their own citations; contents NOT read)
- Fu & Pirolli (2007), SNIF-ACT, *HCI* 22, doi:10.1080/07370020701638806 (already covered in `fu-pirolli-2007-snif-act.md`).
- Fernandez, Insfrán & Abrahão (2011), usability evaluation methods for the web: a systematic mapping study, *IST*, doi:10.1016/j.infsof.2011.02.007.
- Brumby & Howes (2008), Strategies for guiding interactive search: label relevance, assessment and selection, *HCI* 23(1), doi:10.1080/07370020701851078.
- Kaur & Hornof (2005), Modeling information scent: a comparison of LSA, PMI and GLSA similarity measures, 10.5555/1931390.1931422. UNVERIFIED: the author/year attribution is from memory, not the record.
- Teo, John & Blackmon (2012), CogTool-Explorer: goal-directed exploration that considers information layout, CHI 2012, doi:10.1145/2207676.2208414. UNVERIFIED: the author list is from memory, not the record.
- Fu & Dong (2010), *Semantic imitation in social tagging*, *TOCHI*, doi:10.1145/1806923.1806926. UNVERIFIED: the author list is from memory, not the record.

## Relevance to AI answer style
- **Precision vs compression, measured.** All three defects are about *which words* a label uses, not *how many*. The best-attested repair *lengthened* the label: "Paleontology" became "Paleontology and Fossils".
  - Adding one familiar anchor word to a rare technical term cut clicks by more than half.
  - This is the opposite of compression. A shorter, rarer term is less precise *for this reader*, because precision is judged relative to the reader's vocabulary (the LSA space chosen for the user population).
- **Competition costs the most.** The largest per-unit cost (0.754 clicks for each competing link under a competing heading) comes from labels that look relevant but lead nowhere. For an assistant answer, a heading or lead sentence that seems to address the question but does not hold the answer is a real cost. Each such distractor sends some readers down the wrong path.
- **Unfamiliar terms are the hardest defect to fix later.** They should be avoided in the first wording, or glossed where they first appear.
- **Fewer, sharper section labels.** When an answer is long enough to need headings, each heading should be the most goal-similar label for its own content and dissimilar from its siblings. This repeats the confusable-label finding of the 2002 paper, now with a severity weight attached.
- **Caveat.** The data are navigation choices among headings and links on encyclopedia pages, not reading of answer prose. Transferring the findings to headings and lead sentences inside a chat answer is an analogy and has not been tested.

## Candidate rules for the harness
1. **Gloss or replace rare terms at first use.** If a key term is likely to be unfamiliar to the asker, pair it with a familiar anchor word or a short gloss at first mention, e.g. "Paleontology (fossils)". A few added words are worth it. Do not drop the exact term, because it is the precise one, but do not leave it bare either.
2. **No decoy labels.** Every heading, bullet lead or opening sentence must lead to the content it promises. Remove or rename any section label that seems to answer the question but does not hold the answer, since competing look-alike labels were the biggest single driver of wasted effort.
3. **Distinct sibling labels.** Within one answer, sibling headings or list-item leads should not overlap in meaning. If two would attract the same question, merge them or rename one so each points to a single, distinct piece of content.

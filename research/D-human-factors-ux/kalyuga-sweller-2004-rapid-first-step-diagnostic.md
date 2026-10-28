# Kalyuga & Sweller (2004): The Rapid "First-Step" Diagnostic of Expertise

## Citation
Kalyuga, S., & Sweller, J. (2004). Measuring knowledge to optimize cognitive load factors during instruction. *Journal of Educational Psychology*, 96(3), 558-568. doi:10.1037/0022-0663.96.3.558

- Full text read: the 11-page publisher PDF from the Semantic Scholar mirror, https://pdfs.semanticscholar.org/0c98/8f8889459d5f734780583ebba43983097425.pdf (md5 c214652327e2b3740bc420023a486528). The green OA record is UNSWorks handle http://hdl.handle.net/1959.4/42176 (CC BY-NC-ND 3.0 AU). Its file bundle was not publicly listed on 2026-10-28.
- Citation counts on 2026-10-28: Semantic Scholar 218, OpenAlex 219, Crossref 141.
- Type: empirical. Four classroom and computer experiments with Sydney students in Years 9-11.

## Core claim
Because of the expertise reversal effect, the right format depends on what the learner already knows. So knowledge has to be measured fast and repeatedly during instruction. The paper's solution is to show a learner a partly solved task for a few seconds and ask only for "the first step (operation) towards the solution" (p. 560). How far that one move jumps ahead in the solution is a valid, very fast measure of the schemas the learner holds. Tailoring instruction to that measure beat a yoked, non-adapted sequence with the same stages, time limits and feedback.

## Key evidence
- **Rationale (p. 559).** The test does not ask what the learner can reproduce. It asks what move they make. A recall test, with coordinate-geometry diagrams shown for a few seconds in the style of Chase & Simon, did NOT correlate with problem-solving tests in pilot work. The authors say diagram recall taps visual working memory rather than solution schemas. They reason that "tests of working memory content may provide a de facto measure of levels of expertise" because schemas held in long-term memory change what working memory can do (Ericsson & Kintsch's long-term working memory).
- **Exp. 1, algebra (n = 45, Years 9-10).** Twelve linear equations at four levels of solution depth, e.g. 2(2x-5)/3 = 5 -> 3(x+1) = 5 -> 4x-5 = 3 -> 5x = 3. The rapid score correlated with the full-solution test at r = .92 (95% CI .86-.96). Test time was 118 s against 574 s, a 4.9x reduction. Students averaged about 10 s per written step in both tests. Cronbach's alpha was .63 (rapid) and .78 (traditional). The authors attribute the low rapid alpha to the test measuring four distinct schemas with few items.
- **Exp. 2, coordinate geometry (n = 20).** r = .85 (CI .65-.94). Time was 124 s against 306 s, a 2.5x reduction.
- **Exp. 3, predicting the expertise reversal effect (n = 42, Year 9 girls).** A 90-s rapid pretest with eight levels split students at the median. The scoring was changed so that a skipped intermediate step earned extra credit: a correct final answer given on the first page scored 4, not 1. The authors write: "The ability to skip steps reflects a higher level of knowledge" (p. 562, citing Blessing & Anderson, 1996). The knowledge x format interaction was significant, F(1, 38) = 9.04, p < .01, Cohen's f = 0.96. Low-knowledge learners did much better with worked examples (M = 4.80 vs 1.18, f = 1.20). High-knowledge learners did better with problem solving (10.82 vs 7.20, f = 0.36, not significant). The rapid test sorted students better than the existing advanced/regular class split (p. 562).
- **Exp. 4, real-time adaptive tutor (n = 26, Years 10-11).** A computer tutor used faded worked examples. Each learner typed "a single one-line step that you would normally do first" (p. 564), with a 1-min limit and a "Don't know" button. Scores were graded by depth. On the second equation, typing the final answer scored 4, the step just before it scored 3, and an intermediate step on the way to the first level scored 1. The score set the entry stage, and short rapid tests between stages moved the learner on or added examples. Knowledge gain was 3.23 for the adapted group against 0.77 for yoked controls, t(24) = 2.26, p < .05. Training time did not differ significantly (991 s vs 907 s).
- **Stated limits (p. 566).** The work covers two narrow, well-structured domains with predictable solution paths. Where there are many routes, the authors suggest asking learners to verify suggested steps quickly. The method was not tested on "less well-structured domains such as text comprehension or second language learning."

## Sources it builds on
- Kalyuga, Ayres, Chandler & Sweller (2003), the expertise reversal effect (already in this track).
- Chase & Simon (1973) and De Groot (1946/1965): chess recall as a sign of expertise. The paper tested this approach and dropped it.
- Ericsson & Kintsch (1995), Long-term working memory, *Psychological Review* 102, 211-245.
- Blessing & Anderson (1996), How people learn to skip steps, *JEP:LMC* 22, 576-598, the basis for scoring skipped steps; Koedinger & Anderson (1990); Sweller, Mawer & Ward (1983).
- Cronbach & Snow (1977): aptitude-treatment interactions.
- Faded worked examples: Renkl & Atkinson (2003); Atkinson, Derry, Renkl & Wortham (2000); Van Merrienboer (1990), the completion strategy.
- McNamara, Kintsch, Songer & Kintsch (1996), text coherence and knowledge (already in this track).

## Works that cite it (influential forward citations; Semantic Scholar counts, 2026-10-28)
- van Merrienboer & Sweller (2005), Cognitive load theory and complex learning, *Educ. Psychol. Rev.* 17, 147-177, doi:10.1007/s10648-005-3951-0 (about 2,250).
- Kalyuga (2007), Expertise reversal effect and its implications for learner-tailored instruction, *Educ. Psychol. Rev.* 19, 509-539, doi:10.1007/s10648-007-9054-3 (about 1,080).
- Koedinger, Corbett & Perfetti (2012), The Knowledge-Learning-Instruction framework, *Cognitive Science* 36, doi:10.1111/j.1551-6709.2012.01245.x (about 825).
- Kalyuga & Sweller (2005), Rapid dynamic assessment of expertise to improve the efficiency of adaptive e-learning, *ETR&D* 53(3), 83-93, doi:10.1007/BF02504800 (about 260). This is the direct sequel, which adds cognitive efficiency (performance combined with mental effort).
- Kostons, van Gog & Paas (2012), Training self-assessment and task-selection skills, *Learning and Instruction*, doi:10.1016/j.learninstruc.2011.08.004 (about 270).

## Relevance to AI answer style
- **Read the depth of the user's first move, not the topic.** For an assistant, a user's message is their partial step. Someone who writes "my migration fails with a lock timeout on the FK index" has skipped several steps. Someone who writes "my database thing doesn't work" has not. The paper's scoring makes skipped steps the main signal of expertise, ahead of vocabulary or self-description. The step skipped and the precise term used are evidence of schemas, so the answer can leave out the steps the user has already shown they have.
- **Precision, not compression.** The adaptation removes *redundant* steps for a reader who has the schema. It does not drop needed steps to save words. When the depth signal is weak (the "Don't know" case, or a vague message), the paper falls back to full worked examples, not to a terse answer.
- **Re-estimate continuously.** Exp. 4 re-tested between stages and changed the guidance level each time. One snapshot was not enough: most learners repeated the Stage 1 check more than once. An assistant should treat its estimate of the user's level as provisional and update it from each follow-up. A follow-up that asks about a step the assistant left out means the estimate was too high.
- **Caveat.** Validity was shown only in well-structured domains with predictable solution paths. Applying it to open-ended chat is an extrapolation and should be labelled as one.

## Candidate rules for the harness
1. **Calibrate from the first move.** Estimate the user's level from how far into the problem their message starts: which steps they have already done, and the most specific correct term they use. Leave out the steps they have shown they have. Do not lower the level because a message is short. Only the depth of the step counts.
2. **Fall back to full steps when the signal is weak.** If the message shows no step taken (vague phrasing, "don't know", a misused term), give the complete worked path. Do not give a terse answer, because the removed steps are essential for this reader.
3. **Re-estimate on every turn.** Treat the level estimate as provisional. If a follow-up asks about a step that was skipped, go back to the fuller form for the rest of that thread. If the user then jumps ahead, cut the guidance back again.

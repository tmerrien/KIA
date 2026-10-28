# Nenkova & Passonneau (2004): The Pyramid Method

## Citation
Nenkova, Ani, and Rebecca Passonneau. 2004. "Evaluating Content Selection in Summarization: The Pyramid Method." *Proceedings of HLT-NAACL 2004*, Boston, pp. 145–152.
Link: https://aclanthology.org/N04-1019.pdf (full text read)

- The page range 145–152 is UNVERIFIED (from memory). The PDF I read has 8 pages.

## Core claim
No single best summary exists. Content selection is best measured with **Summary Content Units (SCUs)**: meanings no larger than a clause, each with a weight equal to the number of independent human summaries that express it. Those weights form a "pyramid". A good summary expresses the higher-weight meanings before the lower-weight ones, however they are worded. The score is the summary's total SCU weight divided by the weight of an optimal summary with the same number of SCUs.

## Key evidence
- **Meaning, not wording:** an SCU is "a set of contributors that, in their sentential contexts, express the same semantic content". For example, "indicted", "accused" and "Two Libyan suspects were indicted" all count as one SCU (weight 4).
- **Optimal content is stated outright:** "an SCU from tier (n − 1) should not be expressed if all the SCUs in tier n have not been expressed". The method predicts that several different summaries can be equally good: two of six optimal 4-SCU summaries are shown.
- **Reliability:** inter-annotator agreement Krippendorff's α = .81, and there is no significant difference between annotations (ANOVA p = 0.90).
- **Stability:** you need 4–5 reference summaries. With order-5 pyramids the total error probability is 0.10, and the average Spearman rank correlation with the order-9 ranking is 0.87 at order 4.
- **Wording overlap does not measure meaning:** unigram-overlap scores (Lin & Hovy-style, the precursor of ROUGE) did not correlate with pyramid rankings per document set (average rs 0.12–0.35, against the 0.85 needed for significance).
- **Ceiling:** about 34–40 distinct SCUs appear across four 100-word summaries, and about 60 across ten. Content keeps growing, much like the Zipf-like curve van Halteren & Teufel found for factoids.
- **Stated limits:** the method ignores dependencies between SCUs and their ordering, and annotation is laborious.

## Sources it builds on
- van Halteren & Teufel 2003 (factoid analysis of consensus summaries)
- Lin & Hovy 2002, 2003 (manual vs automatic evaluation; n-gram co-occurrence → ROUGE)
- Papineni et al. 2002 (BLEU)
- Rath, Resnick & Savage 1961 (instability of human sentence selection)
- Jing et al. 1998
- Radev et al. 2003
- Krippendorff 1980
- Passonneau & Nenkova 2003 (Columbia tech report CUCS-025-03)

## Works that cite it (forward)
I know of these but did not check them in this session. UNVERIFIED:
- Nenkova, Passonneau & McKeown 2007, "The Pyramid Method: Incorporating human content selection variation in summarization evaluation", *ACM TSLP* 4(2).
- Shapira et al. 2019, "Crowdsourcing Lightweight Pyramids for Manual Summary Evaluation", NAACL.
- Liu et al. 2023, "Revisiting the Gold Standard: Grounding Summarization Evaluation with Robust Human Evaluation" (Atomic Content Units, RoSE), ACL.
- Min et al. 2023, FActScore (atomic facts for factual precision), EMNLP. This applies the atomic-meaning-unit idea to LLM output.

## Relevance to AI answer style
This paper gives an operational test for the line between PRECISION and COMPRESSION.
- **Lossless compression:** shortening that keeps every top-weight content unit and only changes the wording.
- **Lossy compression:** shortening that drops a high-weight unit, whatever the word count.

Two consequences follow.
1. Brevity should be judged by meaning units kept per word, not by word or n-gram overlap. The paper shows wording overlap fails to track content.
2. There is a strict priority order. When an answer has to be short, it may drop low-weight (rarely-needed) facts, but never a top-tier fact to keep a lower-tier one. The many equally good summaries also justify leaving wording free once the meaning units are set.

## Candidate rules for the harness
1. **Cut from the bottom of the pyramid.** When shortening, list the answer's content units by importance to the question. Drop the least important first. Never drop a must-have unit while keeping a nice-to-have one.
2. **Before cutting, check that the meaning survives.** A shorter rewrite is acceptable only if every must-have content unit from the longer draft is still recoverable from it. If one is lost, the cut was compression, not precision.
3. **Spend words on meanings, not on restating them.** Two clauses that express the same content unit count once. Remove the duplicate; don't remove a distinct unit.

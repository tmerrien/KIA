# Song, Kim & Iyyer (2024): VeriScore, scoring only the verifiable claims

(This note was queued as FActScore (Min et al. 2023), but FActScore already has a note at `min-2023-factscore-atomic-facts.md`. This note covers its most direct forward descendant instead.)

## Citation
Song, Y., Kim, Y., & Iyyer, M. (2024). VeriScore: Evaluating the factuality of verifiable claims in long-form text generation. In *Findings of the Association for Computational Linguistics: EMNLP 2024*, pp. 9447-9474. Miami, FL: ACL. doi:10.18653/v1/2024.findings-emnlp.552. https://aclanthology.org/2024.findings-emnlp.552/ (venue, pages and DOI read from the Anthology landing page).
Full text read: arXiv:2406.19276v1 (27 Jun 2024), https://arxiv.org/pdf/2406.19276. I read the main text, the Limitations section and parts of the appendices. The Findings camera-ready may differ from v1, and I did not compare the two. Code: https://github.com/Yixiao-Song/VeriScore

## Core claim
FActScore and SAFE assume every sentence breaks down into atomic, checkable facts. That assumption only holds for formulaic, fact-dense text such as biographies. Real answers interleave verifiable claims with analogies, advice, opinion and hypotheticals, and some real claims "cannot be made 'atomic' without losing critical context". VeriScore therefore extracts only verifiable claims, each "a single event or state with all necessary modifiers", resolves them against nearby context, and scores them with F1@K against Google Search results.

## Key evidence
- **Definition (Sec. 2.1.2).** The definition draws on Maienborn's event/state semantics: "Verifiable claims describe a single event or state with all necessary modifiers (e.g., spatial, temporal, or relative clauses) that help denote entities or events in the real world." Each claim is a set of parts, for example "Jensen Huang founded NVIDIA" + "in 1993" + "in California". A claim counts as supported only if *every* part is supported.
- **Extraction with context.** A sliding window gives the extractor 0-3 sentences of context, the focused sentence, then 0-1 sentence of context, and the question is prepended in QA tasks. This lets the extractor resolve pronouns so each claim stands alone. "Unverifiable content such as advice, fictional stories, or subjective opinions are ignored."
- **Fig. 1 (ELI5 beetroot).** SAFE/FActScore extract "Betacyanin is like a superhero cape" and "Betacyanin is a special helper..." as claims, then mark the first one Unsupported. In other words, the older metrics penalise the answer for using an analogy.
- **Over-decomposition failures in SAFE (Sec. 3.1, examples 2-4).** SAFE extracts subjective content ("I am 1000% better") and splits one idea into overlapping claims ("Longwood House is a place / is a Napoleonic Museum / is one of the best... / ...in the world"), which "can disproportionately affect the final score". It also extracts trivial or vague claims ("3.2 is a number", "All My Sons has key themes").
- **Human preference.** In 360 judgments, raters preferred SAFE's claim list only 26 times, and 19 of those preferences were marginal (Fleiss kappa 0.766). VeriScore's list was preferred even on biographies.
- **VerRatio, verifiable claims per sentence (Table 1).** WritingPrompts 0.03, ShareGPT 0.92, FreshQA 1.00, ELI5 1.71, AskHistorians 1.90, Biography 2.08, LongFact 2.24, FreshBooks 2.31. Claim density varies roughly 75-fold across genres.
- **Verification (Sec. 3.3).** On 320 human-verified claims, 55% were supported, 2.8% contradicted and 42% inconclusive. Claims were inconclusive mostly because they were "too general to be verified" (e.g., "a systematic review ... was published ... in 2019" with no indication of which review) or because no evidence linked the parts of the claim.
- **Claim length (Sec. 4.4.1, fn. 16).** FActScore biography claims average 7 words (maximum 18). Claims from ELI5 answers average 12 words (maximum 25). Some core content is "inherently long": "Travelers and crusaders during the medieval period depended on established infrastructure to secure clean and consistent sources of water." In "[Victory X] solidified [his reputation as Y]", verifying both halves does not verify the whole claim, because the relational verb "solidified" carries a claim of its own.
- **Vague evaluative claims cannot be checked (Sec. 4.4.2).** Examples are "Marshall's leadership and strategic acumen ensured the maneuver was carried out flawlessly" and "Germany is maintaining its competitive edge in a rapidly changing global landscape". Search cannot confirm or refute claims like these.
- **F1@K favours length (Sec. 4.3).** K is set to the median number of claims per domain, for example ShareGPT K=11 and LongFact K=32. "Models that generate short to-the-point outputs will be penalized if other models generate lengthy outputs with auxiliary information." The authors add: "It is debatable whether longer responses should always be preferred... later facts in long responses tend to be less accurate." Fn. 15 shows GPT-3.5-turbo-1106 losing recall simply because it is terser, at 8.56 sentences per response against 15.95.
- **Rankings shift by task.** Kendall's tau between domains falls as low as 0.39 (Biography vs ShareGPT). Factuality on biographies does not predict factuality in general assistant use.
- **Limitations.** The authors say "verifiable claim" remains "a working definition rather than a formal one", and that the sliding-window extraction is slow.

## Sources it builds on
- Min et al. (2023), FActScore (covered); Wei et al. (2024), SAFE/F1@K (covered in this track).
- Maienborn (2003, 2019), the semantics of events and states (the basis of the claim definition).
- Tang et al. (2024) (cited for claim decomposition; full citation UNVERIFIED in this note); Kamoi et al. (2023, WiCE); Chern et al. (2023, FacTool); Wanner et al. (2024).
- Vu et al. (2023), FreshQA/FreshPrompt, which supplied the format for search evidence; Thorne et al. (2018), FEVER.

## Works that cite it (forward)
Semantic Scholar API, queried 2026-10-28, listed 153 citing papers. The counts below are the citing papers' own citation counts.
- Bang et al. (2025). HalluLens: LLM Hallucination Benchmark. ACL 2025. arXiv:2504.17550 (161). Author list UNVERIFIED.
- Hu et al. (2024/2025). Decomposition Dilemmas: Does Claim Decomposition Boost or Burden Fact-Checking Performance? NAACL. arXiv:2411.02400 (47). Authors UNVERIFIED.
- Wanner, M. et al. (2024). DnDScore: Decontextualization and Decomposition for Factuality Verification in Long-Form Text Generation. arXiv:2412.13175 (32).
- Metropolitansky, D., & Larson, J. (2025). Towards Effective Extraction and Evaluation of Factual Claims (Claimify). ACL 2025. arXiv:2502.10855 (28). Authors UNVERIFIED.
- Jiang et al. (2025). Conformal Linguistic Calibration. arXiv:2502.19110 (already covered in this track).
- Also FactBench (arXiv:2410.22257), Atomic Calibration of LLMs in Long-Form Generations (arXiv:2410.13246), and FACTS Grounding (arXiv:2501.03200).
I read none of these forward works. Only their titles and arXiv IDs come from the API listing.

## Relevance to AI answer style
1. **The test for precision is the verifiable claim, not the word.** VeriScore makes the PRECISION/COMPRESSION distinction operational. A precise sentence names one event or state *with all the modifiers needed to pin it down in the world*, such as time, place and which entity. If the compressed version drops "in 1993" or "which review", the claim becomes "too general to be verified": it is shorter, but it says less. That is lossy compression.
2. **Some ideas cannot be cut below a minimum size.** The paper shows claims whose core content is "inherently long", and relational claims ("X solidified Y") whose meaning is lost if the claim is split. Concision means deleting words that carry no claim. It does not mean breaking a claim into pieces that no longer stand alone.
3. **Analogies and opinions are not facts, so do not let them pose as facts.** An analogy such as "superhero cape" is not a claim the reader can check. That is fine if it is clearly marked as an analogy, and harmful if it replaces the verifiable mechanism. Vague evaluative sentences ("strategic acumen ensured... flawlessly", "maintaining its competitive edge") cost words and assert nothing anyone can check. They are the "staleness" Orwell attacked, now measured.
4. **Different genres carry very different claim densities.** A conversational answer averages about 0.9 verifiable claims per sentence, while a fact-seeking answer averages about 2. A tight factual answer should look like the denser end. Sentences with no verifiable claim and no needed framing are padding.
5. **Length-favouring metrics are not a target to imitate.** The authors note that F1@K rewards long answers even where a short, to-the-point answer is the right one. Recall should be measured against what *this* user needs, not against how much other models write.

## Candidate rules for the harness
1. **Pin every factual claim.** Each factual sentence should state one event or state, with the modifiers (who or which, when, where, how much) that make it checkable. When shortening, keep the pinning modifiers and cut the adjectives. A claim that loses its anchor ("a review found...") has been compressed with loss, not made concise.
2. **Do not split relational claims, and do not pad them.** If the point is a relation ("A caused, enabled or solidified B"), state the relation in one clause and name both sides. Do not reduce it to two separate facts, and do not wrap it in evaluative filler.
3. **Label non-claims and keep them out of the core.** Analogies, advice and opinions are allowed, but they should be marked as such ("think of it as...", "I'd recommend...") and placed after the verifiable answer, never instead of it. Delete evaluative sentences that assert nothing anyone could check.

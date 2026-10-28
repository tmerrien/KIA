# Wei et al. (2024): Long-form factuality, SAFE, and F1@K (precision plus recall up to a preferred length)

## Citation
Wei, J., Yang, C., Song, X., Lu, Y., Hu, N., Huang, J., Tran, D., Peng, D., Liu, R., Huang, D., Du, C., & Le, Q. V. (2024). Long-form factuality in large language models. NeurIPS 2024. arXiv:2403.18802 (v4, 7 Nov 2024). Google DeepMind / Stanford.
Full text read: https://arxiv.org/pdf/2403.18802 (v4, including Appendices A, D, E). Code and data: https://github.com/google-deepmind/long-form-factuality
(The NeurIPS 2024 venue comes from the queue entry. The arXiv v4 PDF I read does not show a venue line, so the venue is UNVERIFIED from the primary text.)

## Core claim
A long answer has to be judged on two axes: precision (the share of its claims that are supported) and recall (how many supported claims it gives, up to the number the user actually wants). F1@K combines them. Recall is capped at K, "the number of supported facts that a human prefers in a response", so it penalises answers that are too thin and gives no credit for supported facts past K. In this metric, padding earns nothing and over-compression costs points.

## Key evidence
- **Definitions (Sec. 5, Eq. 1).** Prec(y) = S/(S+N), where S is the number of supported facts and N the number of not-supported facts. R_K(y) = min(S/K, 1). F1@K is the harmonic mean of the two, and it is 0 if S = 0. A response scores 1 only if it has "no not-supported facts and at least K supported facts". In the authors' words, K is a user who is "indifferent to having additional supported facts after the Kth supported fact", and "the choice of K can thus be viewed as a choice in how one models the preferences of end users" (App. D.3).
- **Irrelevant facts are excluded from both numerator and denominator (App. A.5).** The authors say irrelevant facts measure "instruction-following ability ... more than they measure factuality". This differs from FActScore, which counts irrelevant facts in the total.
- **Limits of K (App. D.3).** F1@1 reduces to a monotone function of precision (2·Prec/(Prec+1)). As K grows without bound, the ranking is by the raw count of supported facts. So K moves the metric from "say only what is safe" (precision) to "say as much as possible" (volume).
- **Length–precision trade-off (App. D.4, Fig. 14).** GPT-4-Turbo was prompted "Respond in N sentences" for N in {1, 2, 4, 8, 16}. Precision was higher for shorter responses. Longer responses gave more supported facts but "a larger proportion of factual errors". The authors write: "one can trade-off between precision and recall in long-form factuality by varying the response length." The figure's precision axis spans roughly 90-95% (read from the plot; exact values UNVERIFIED).
- **Specific details cost precision (App. A.7).** The postamble "provide as many specific details as possible" lowered F1@1, i.e. precision, slightly and raised F1@K at high K. The authors explain that "details are more-difficult to get correct than general facts (e.g., the exact height of the Eiffel Tower is lesser known than the fact that the Eiffel Tower is tall)".
- **Recall tracks human preference (App. A.6, Fig. 9).** Precision alone against LMSys Chatbot Arena ELO gave r = 0.502 (p = 0.205, not significant). F1@64 against ELO gave r = 0.754 (p = 0.031). The authors caution that the correlation is "nontrivial (albeit not perfect)" and that Arena does not measure factuality directly. The comparison covers only 9 models.
- **Benchmark.** 13 LLMs were scored on 250 LongFact-Objects prompts at K = 64 (the median number of facts per response) and K = 178 (the maximum). On F1@64, GPT-4-Turbo scored 95.0 and PaLM-2-L-IT 31.1. Claude-3-Haiku's low score "may have been a result of prioritizing factual precision over recall". This is a direct case of a model that compresses too far being penalised.
- **SAFE evaluator.** SAFE splits a response into facts, revises each to be "self-contained" by replacing vague references, checks relevance, then verifies with multi-step Google Search. On about 16k facts it agreed with FActScore's crowd annotators 72% of the time. In 100 disagreement cases SAFE was right 76% of the time and the humans 19%. SAFE was more than 20 times cheaper. About a third of the humans' errors came from confusing "irrelevant" with "not supported" (App. A.4).
- **Admitted gap (Limitations; App. D.1).** F1@K "operates under the assumption that a response does not contain any repeated facts". Repeating a supported fact would game the score. The authors leave repetition to "other metrics such as fluency or usefulness", because a response that repeats one fact "is not helpful for a user, however, because the user only learns a single piece of information."
- **Generalisation (App. A.9).** The same capped-recall idea is proposed for any task "where a response can be infinitely-long, yet users do not desire longer responses past some point".

## Sources it builds on
- Min et al. (2023) FActScore: atomic facts and precision only. Recall was explicitly left as future work (already covered in this track).
- Tian et al. (2023), fine-tuning for factuality, and Dhuliawala et al. (2023), Chain-of-Verification: both use precision as the factuality proxy.
- Manakul et al. (2023) SelfCheckGPT; Rajpurkar et al. (2016) token-level F1. Both handle recall but need ground-truth references.
- Zheng et al. (2023) Chatbot Arena, used for the human-preference correlation.
- Christiano et al. (2017), Ouyang et al. (2022), Bai et al. (2022): RLHF. App. E.4 reports that RLHF raised F1@K for PaLM-2.

## Works that cite it (forward)
Source: the Semantic Scholar citations API, queried 2026-10-28. It returned 190 citing records, which looks partial, so these counts are approximate.
- Wei, J. et al. (2024). Measuring short-form factuality in large language models (SimpleQA). arXiv:2411.04368. The same first author; it scores "not attempted" separately from "incorrect". About 386 citations.
- Bang et al. (2025). HalluLens: LLM Hallucination Benchmark. arXiv:2504.17550. About 161 citations. Author list UNVERIFIED.
- Jacovi et al. (2025). The FACTS Grounding Leaderboard. arXiv:2501.03200. Author list UNVERIFIED.
- Jiang, Z., Liu, A., & Van Durme, B. (2025). Conformal Linguistic Calibration: Trading-off between Factuality and Specificity. arXiv:2502.19110. Title, authors and abstract checked on the arXiv abstract page.
- Jafari, N., Allan, J., & Iyyer, M. (2026). Beyond Precision: Importance-Aware Recall for Factuality Evaluation in Long-Form LLM Generation. arXiv:2604.03141. Title, authors and abstract checked on the arXiv abstract page. It weights facts by relevance and salience, which addresses F1@K's equal weighting of facts.
- Also: FACTORY (arXiv:2508.00109), a human-verified LongFact successor; and "When Should LLMs Be Less Specific? Selective Abstraction" (arXiv:2602.11908). Neither was read: UNVERIFIED beyond title.

## Relevance to AI answer style
- **This gives a formal statement of "precision without loss".** Precision penalises unsupported claims. Capped recall penalises cutting supported content the user wanted and gives no credit for content past the user's need. The ideal answer is the one that reaches K: K supported, distinct, relevant facts, and nothing unsupported. Shorter than K is lossy compression. Longer than K adds risk with no gain, because extra facts can only lower precision.
- **Irrelevant material is scored as an instruction-following failure, not as information.** This matches Grice's Relation maxim and the redundancy findings already in the corpus.
- **Being more specific carries a precision cost (A.7).** A precise term or number is worth giving only if it is supported. If it is not, the honest move is a less specific but true claim, which is the trade-off CLC formalises. This separates PRECISION (the exact term, when it is known) from false precision.
- **Repetition is invisible to the metric, but the authors still call it unhelpful.** The harness has to ban restating facts explicitly, because a fact-count objective will not catch it.
- **Limits.** The metric is about facts in open-domain, fact-seeking prompts. It counts facts equally, regardless of importance, and K is set per dataset (from the median response length), not elicited per user. It is evaluated with automated LLM judges, and the human-preference evidence is a 9-model correlation.

## Candidate rules for the harness
1. **Stop at the user's K.** Estimate how many distinct points the user needs from the question's scope and any stated length. Deliver that many supported, distinct points. Do not stop short of it, and do not add extra points that only add risk.
2. **Never pad and never repeat.** Restating a fact, or adding facts the question did not ask about, counts as zero value (A.5, D.1). Before sending, cut any sentence whose claim already appears or that does not answer the prompt.
3. **Be only as specific as you can support.** Use the exact figure or term when you are confident of it. When you are not, give the coarser true claim, or say what is unknown, rather than a precise-looking guess. Specificity raises information only while precision holds (A.7, D.4).

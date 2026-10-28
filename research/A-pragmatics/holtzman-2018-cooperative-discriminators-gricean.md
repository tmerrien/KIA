# Holtzman et al. (2018). Learning to Write with Cooperative Discriminators

## Citation
Holtzman, A., Buys, J., Forbes, M., Bosselut, A., Golub, D., & Choi, Y. (2018). Learning to Write with Cooperative Discriminators. *Proceedings of the 56th Annual Meeting of the Association for Computational Linguistics (Long Papers)*, pp. 1638-1649. Melbourne. doi:10.18653/v1/P18-1152.
Full text read: https://aclanthology.org/P18-1152.pdf (12 pp., including references). Demo: https://ari-holtzman.github.io/l2w-demo/ (not opened).

## Core claim
Maximum-likelihood RNN language models tend to produce long text that is repetitive, generic, and self-contradictory. Better long-form text comes from decoding with an objective that adds learned scores from a "committee" of discriminators to the LM log-probability: f(x,y) = log P_lm(y|x) + sum_k lambda_k s_k(x,y) (Eq. 1). Each discriminator is designed around one of Grice's maxims (Quantity, Quality, Relation, Manner). The weights lambda are learned online by comparing the system's best beam output with the gold continuation (Eq. 12).

## Key evidence
- **The four discriminators, mapped to the maxims (Sec. 3.2):**
  - *Repetition model, for Quantity.* For each token it computes the maximum cosine similarity of the word embedding to the previous k words (Eq. 3). An RNN runs over that similarity sequence, and the model is trained with a ranking loss to score gold continuations above LM samples (Eqs. 4-5). The authors say explicitly: "we do not want to completely eliminate repetition, as words do recur in English". The target is the *natural* level of repetition, not zero.
  - *Entailment model, for Quality and Quantity.* An NLI classifier (decomposable attention, trained on SNLI+MultiNLI) scores each new complete sentence against every earlier sentence, and only the probability of the *neutral* class is rewarded (Eq. 6). Contradiction violates Quality. Entailment, "something that readily follows from the context", violates Quantity, because it is the RNN "habit of paraphrasing itself". Footnote 2 makes an exception: a sentence that entails an earlier one "may simply be adding more specific information" ("He hated broccoli. Every time he ate broccoli ... the thing he hated most"). So the check is one-directional: the new sentence must not be entailed *by* the earlier text.
  - *Relevance model, for Relation.* A CNN with max-pooling and an element-wise product of the context vector and the continuation vector (Eqs. 7-9). It is trained to rank the true continuation above a random human-written continuation (Eq. 10).
  - *Lexical style model, for Manner.* A bag of embeddings with max-pooling (Eq. 11), ranked against LM samples, to correct the low lexical diversity of RNN output.
- **Decoding (Sec. 3.4, Alg. 1):** The full objective is used inside beam search, not just to rerank the final k-best list. The authors found that LM-only beams followed by reranking had "limited diversity". The beam size is 10, with k candidates sampled from the k^2 expansions at temperature 1.8.
- **Data:** TripAdvisor (330M words) and BookCorpus (980M words). Each item has 5 context sentences and 5 continuation sentences.
- **Automatic results (Table 1):** L2W has the highest unique-trigram rate among the non-sampling systems: 98.9% on BookCorpus (reference 99.7%) and 96.2% on TripAdvisor (reference 99.4%). AdaptiveLM scores 92.7% and 92.5%, and Seq2Seq scores 33.7% on BookCorpus. BLEU and Meteor are near zero for every system, and the authors say these metrics are not meaningful for this task.
- **Human evaluation (Table 2):** 100 test items per comparison, 3 AMT workers each, with 5-point comparative Likert scales for repetition, contradiction, relevance and clarity, plus an overall vote. On TripAdvisor, L2W beats AdaptiveLM 47% better / 19% equal / 34% worse. Against CacheLM it wins 86/6/8 on BookCorpus and 77/9/14 on TripAdvisor. On BookCorpus, L2W was preferred even over the human reference (53/18/29). The authors put this down to shallow crowd judgments: the real continuation "is more surprising and contains complex references to earlier parts of the book".
- **Ablation (Table 4, TripAdvisor, one discriminator vs. the LM):** Each module improves its own target criterion, but *only the repetition module improves overall quality* (50% better / 23% / 27% worse). Entailment-only scores 39/20/41, relevance-only 36/22/42 and style-only 38/25/38. The authors conclude that "many of the deficiencies of RNN as a text generator lie in semantic repetition". The entailment module was the weakest, which they attribute to domain mismatch and to a score that only updates at sentence ends.
- **Residual failure (Sec. 5.3):** L2W "still paraphrases itself, albeit more subtly": "we would definitely recommend this hotel to others" is followed later by "I'd recommend this hotel". Surface n-gram and embedding-window checks miss paraphrased restatement. This is why a hard trigram ban (Paulus et al., 2018) is called inadequate in Sec. 2: it "do[es] not stop RNNs from repeating through paraphrasing while preventing occasional intentional repetition."

## Sources it builds on
- Grice (1975), the maxims (already covered: grice-1975-logic-conversation.md).
- Andreas & Klein (2016), a neural speaker reranked by a listener (already covered).
- Frank & Goodman (2012), RSA (already covered).
- Li et al. (2016a), diversity-promoting MMI objective, NAACL 2016.
- Paulus, Xiong & Socher (2018), trigram blocking, ICLR 2018.
- Wu et al. (2016), GNMT length normalization.
- Hinton (2002), Product of Experts.
- Parikh et al. (2016), decomposable attention NLI. Bowman et al. (2015), SNLI. Williams et al. (2017), MultiNLI.
- Yu et al. (2017a), SeqGAN.
- Wiseman et al. (2017) and Liu et al. (2016), on why BLEU-style metrics fail for open-ended generation.

## Works that cite it (influential forward citations)
Source: the Semantic Scholar Graph API citation list (fetched 2026-10-28). It shows 257 citations, 17 of them "influential". The citing papers below were **not opened** in this session, so their content claims are UNVERIFIED.
- Holtzman, Buys, Du, Forbes & Choi (2020). The Curious Case of Neural Text Degeneration. ICLR 2020. arXiv:1904.09751. The same first author follows up on degeneration and nucleus sampling.
- Welleck et al. (2020). Neural Text Generation with Unlikelihood Training. ICLR 2020. arXiv:1908.04319. A training-time repetition penalty.
- Xu et al. (2022). Learning to Break the Loop: Analyzing and Mitigating Repetitions for Neural Text Generation. NeurIPS 2022. arXiv:2206.02369.
- Dathathri et al. (2020) PPLM, Krause et al. (2021) GeDi, Yang & Klein (2021) FUDGE, and Liu et al. (2021) DExperts. These descend from discriminator-guided decoding.
- Dou et al. (2022). Scarecrow: A Framework for Scrutinizing Machine Text. ACL 2022. A human error taxonomy that includes redundancy.
- Karpinska, Akoury & Iyyer (2021). The Perils of Using Mechanical Turk to Evaluate Open-Ended Text Generation. EMNLP 2021. It extends this paper's own warning about shallow crowd judgments.
- Roller et al. (2021). Recipes for Building an Open-Domain Chatbot. EACL 2021.

## Relevance to AI answer style
- The paper gives an operational split between **two kinds of redundancy**. A new sentence *entailed by* earlier text adds nothing (a Quantity violation). A new sentence that *entails* an earlier one and is more specific adds precision (footnote 2). This maps onto the track's PRECISION vs. COMPRESSION distinction. A refinement that states the same point more exactly carries information. A restatement does not, however it is reworded.
- The repetition discriminator aims at a **natural rate** of repetition, not zero. Term repetition is often what precision requires: reusing the exact technical term instead of swapping in a synonym (compare ISO 10241-1, Cabré). A "never repeat a word" heuristic would push the writer toward elegant variation, which harms precision.
- The ablation shows that, of the four maxim-inspired scorers, **removing semantic repetition is the one that measurably improves overall perceived quality**. Of the four, it is the most cost-effective lever.
- The paraphrase failure ("would definitely recommend" ... "I'd recommend") is the usual LLM closing-summary pattern. Lexical checks miss it, and only a meaning-level check catches it.
- Caveat: the human raters preferred the "straightforward" L2W text over the richer human original. Raters who skim may reward plainness over earned complexity. This is a known risk when tuning answer style on shallow preference data.

## Candidate rules for the harness
1. **Neutral-or-more-specific test.** Each sentence in an answer must either add new content or *refine* an earlier claim (more specific, quantified, or scoped). Delete any sentence that the earlier text already entails, including a paraphrased restatement or a closing "in summary" that adds nothing. (Grounded in Eq. 6 and footnote 2.)
2. **Repeat terms, not claims.** Reuse the exact technical term every time the same concept comes up, and do not vary synonyms for style. Repeated words are fine. Repeated propositions are not. (Grounded in the repetition model's "natural level" target and in the Sec. 2 critique of hard n-gram bans.)
3. **Check redundancy by meaning, not by surface form.** When self-reviewing a draft for verbosity, compare claims, not n-grams. Rewording is the main way redundancy gets past surface checks. (Grounded in the Sec. 5.3 residual-paraphrase finding.)

# Min et al. (2023): FActScore, atomic facts as the unit of factual precision

## Citation
Min, S., Krishna, K., Lyu, X., Lewis, M., Yih, W.-t., Koh, P. W., Iyyer, M., Zettlemoyer, L., & Hajishirzi, H. (2023). FActScore: Fine-grained Atomic Evaluation of Factual Precision in Long Form Text Generation. In *Proceedings of EMNLP 2023*. arXiv:2305.14251v2 (11 Oct 2023). Full text read: https://arxiv.org/pdf/2305.14251v2. Code: https://github.com/shmsw25/FActScore.

## Core claim
A long-form answer is a bundle of independently true-or-false atomic facts, so its factual quality should be scored as the share of atomic facts a trusted knowledge source supports, not as one binary judgment per sentence or per answer. Human annotation shows commercial LMs do poorly on this measure: InstructGPT scores 42.5%, ChatGPT 58.3%, and the search-backed PerplexityAI 71.5%. An automated estimator that combines retrieval with an LM comes within 2% of the human scores.

## Key evidence
- **Definition (Sec. 3.1).** An atomic fact is "a short sentence conveying one piece of information", which the paper calls "similar to summarization content units (Nenkova and Passonneau, 2004)". FActScore(M) is the expected fraction of supported atomic facts over the responses where M did not abstain.
- **Sentences mix true and false content.** ChatGPT averages 4.4 atomic facts per sentence. In 40% of its sentences, supported and unsupported facts appear together, so sentence-level labels are too coarse (fn. 2, Sec. 3.1). Fig. 1 example: two biographies both score 0.0 under all-or-nothing support, but 66.7% and 10.0% under FActScore.
- **Three assumptions:** (1) whether a fact is supported is not debatable; (2) every atomic fact counts equally, following Krishna et al. 2023; (3) the knowledge source does not contradict itself. Biographies checked against Wikipedia were chosen because they meet these assumptions reasonably well.
- **Annotation.** 183 people sampled from Wikidata, prompt "Tell me a bio of <entity>". Human annotators revised atomic-fact splits that InstructGPT drafted, then labeled each fact Supported, Not-supported or Irrelevant. Inter-annotator agreement was 96%, 90% and 88% across the three models, at about $4 per generation.
- **Table 1.** Average response length is 110-155 tokens, 26-41 atomic facts per response. ChatGPT responds 85.8% of the time and PerplexityAI 90.7%, because both often abstain.
- **Rarity.** Scores fall sharply for rarer entities: ChatGPT drops from 80% to 16% (Fig. 2 top).
- **Position.** "Across all LMs, the later part of the generation has significantly worse precision." The authors give two likely causes: early facts such as nationality and profession are more frequent in pretraining data, and errors propagate. Their conclusion is that short-answer evaluation underestimates errors (Fig. 2 bottom, Sec. 3.4).
- **Irrelevant facts.** These are either facts that depend on an earlier fact that was unsupported, or content off the prompt. PerplexityAI produces many of the second kind because it copies search results.
- **Precision is not recall (Sec. 3.1, Limitations).** "A model that abstains from answering too often or generates text with fewer facts may have a higher FActScore." In addition, "even if every piece of information in a generation is supported, it misses a significant piece of information that should have been mentioned" (their Table 6). The authors recommend always reporting FActScore together with the abstention rate and the number of facts per response.
- **Scope limit.** FActScore does not apply when facts are "nuanced, open-ended, and debatable", or when the text involves intentional or implicit deception.
- **Scale.** The automated estimator was used to score 6,500 generations from 13 LMs, which would have cost an estimated $26K to annotate by hand.

## Sources it builds on
- Nenkova & Passonneau (2004), Pyramid/SCUs. Already covered; this is the direct ancestor of the atomic-fact unit.
- Shapira et al. (2019), Zhang & Bansal (2021), Liu et al. (2022): lightweight pyramid and atomic content units (ACUs, RoSE).
- Krishna et al. (2023), LongEval: equal weighting of facts and fine-grained human evaluation of long-form summaries.
- Claim decomposition for fact verification: Fan et al. (2020), Wright et al. (2022), Chen et al. (2022), Kamoi et al. (2023, WiCE). Also Thorne et al. (2018, FEVER).
- Manakul et al. (2023), SelfCheckGPT: the reference-free baseline estimator.
- Kandpal et al. (2022) and Mallen et al. (2023): the link between entity rarity and errors.

## Works that cite it (forward)
- Wei, J. et al. (2024). Long-form factuality in large language models (SAFE, LongFact). NeurIPS 2024. arXiv:2403.18802 (abstract page read). Adds recall by scoring against a target number of facts K, which stands for the user's preferred response length.
- Song, Y., Kim, Y., & Iyyer, M. (2024). VeriScore. arXiv:2406.19276 (abstract page read). Separates verifiable claims from unverifiable content so the scoring works beyond biographies.
- Wanner, M., Ebner, S., Jiang, Z., Dredze, M., & Van Durme, B. (2024). A Closer Look at Claim Decomposition. arXiv:2403.11903 (abstract page read). Shows that FActScore-style scores depend on how the text is split into facts, and introduces DecompScore.
- Gunjal, A., & Durrett, G. (2024). Molecular Facts. Findings of EMNLP 2024. arXiv:2406.20079 (abstract page read). Argues that fully atomic facts lose the context needed to check them, and proposes facts that are minimal but still stand alone.
- Citation counts: UNVERIFIED (not checked against Semantic Scholar or Google Scholar).

## Relevance to AI answer style
FActScore gives a working test for the PRECISION-versus-COMPRESSION distinction:
1. **The atomic fact is the unit of meaning.** A concise rewrite preserves meaning if its set of atomic facts covers the facts in the longer answer that the reader needs. It is compression with loss if some of those facts are gone. Word count does not settle the question; the fact set does.
2. **Short answers can game precision.** The paper says outright that fewer facts or more abstention raises the score. A terse answer that omits the key fact is accurate but incomplete. Brevity therefore always has to be checked against recall.
3. **Density raises the stakes.** At about 4.4 facts per sentence, one dense sentence carries several separate claims. Packing clauses together makes a sentence denser in information, but it also packs in more opportunities to be wrong. Each clause should be a claim the assistant can support.
4. **Precision decays toward the end.** Facts late in a long generation are less accurate. This supports putting the core answer first and treating trailing elaboration as the riskiest part, which is also the part to cut first.
5. **Unsupported premises spoil what follows.** "Irrelevant" facts often hang off an earlier unsupported fact. One wrong premise contaminates every elaboration built on it.
6. **Subjective filler is not checkable.** Subjective or "vague" statements fall outside the metric. In answer-style terms, hedged praise or vague claims are words that carry no checkable fact.

## Candidate rules for the harness
1. **Fact-set check on compression.** Before shortening a draft, list its atomic facts and mark the ones the user needs. The short version must keep every marked fact. A cut that removes a needed fact is lossy compression, not concision.
2. **Front-load the supported core and trim the tail.** State the main answer in the first sentence. Facts added late carry the most error risk, so drop any trailing detail that cannot be checked or that hangs off an uncertain premise.
3. **Every clause must be a supportable claim.** In a dense sentence, each conjoined clause should be one specific fact the assistant can stand behind. Cut vague or subjective clauses, or mark them explicitly as opinion.

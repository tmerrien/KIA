# Andreas & Klein (2016): Reasoning about Pragmatics with Neural Listeners and Speakers

> Substitution note: the queued work, Frank & Goodman (2012), already has a file in this track (`frank-goodman-2012-rsa-language-games.md`). Under the no-overwrite rule, this file covers that paper's most direct forward link to machine generation instead. The Frank & Goodman file lists this paper as UNVERIFIED. It is now verified.

## Citation
Andreas, J., & Klein, D. (2016). Reasoning about Pragmatics with Neural Listeners and Speakers. *Proceedings of the 2016 Conference on Empirical Methods in Natural Language Processing (EMNLP 2016)*, Austin, Texas, pp. 1173-1182. ACL Anthology D16-1125. doi:10.18653/v1/D16-1125. arXiv:1604.00562.
- Full text read: https://aclanthology.org/D16-1125.pdf. The pages and venue are taken from the PDF footer.
- Code: http://github.com/jacobandreas/pragma (cited in the paper; not opened).

## Core claim
A pragmatic speaker can be built from two ordinary learned models. One is a literal speaker S0, a plain captioner that ignores context. The other is a literal listener L0, a retrieval model that picks which referent a description fits. The reasoning speaker S1 samples candidate descriptions from S0 and keeps the one that best makes L0 pick the target over the distractor. A small weight on S0 keeps the output fluent. This produces context-sensitive, discriminative descriptions without any training data that shows pragmatic behavior, and it beats a direct contrastive baseline in human reference games.

## Key evidence
- **Task.** Reference game on the Abstract Scenes Dataset (Zitnick & Parikh 2013): 10,020 scenes with up to 6 captions each. The speaker must describe a target scene so that a human can pick it out from one distractor. The human evaluation ran on Mechanical Turk with 200 target/distractor pairs per held-out set, in two conditions: "All" (up to 4 differences between scenes) and "Hard" (exactly 1 difference).
- **Scoring rule (eq. 8):** p_k = p_S0(d_k | r_i)^λ · p_L0(i | d_k, r1, r2)^(1-λ). The authors map this onto Grice explicitly. L0 encodes Quality and Relation (enough information to choose correctly), and S0 encodes Manner (conforms to human usage). **Quantity is split between them: "L0 ensures that the model doesn't say too little, and S0 ensures that the model doesn't say too much."**
- **Informativeness/fluency trade-off (Fig. 5).** λ = 0 (listener only) gives the highest accuracy but degraded fluency. λ = 1 (speaker only) gives fluent but generic captions. A *very small* speaker weight, λ = 0.02, gives fluency of 4.8/5, the same as the literal speaker's 4.8, without a substantial accuracy loss. Example for one pair: λ=0.0 gives "a hamburger on the ground", λ=0.1 gives "mike is holding the burger", and λ=0.2 gives "the airplane is in the sky" (fluent, generic, and not discriminating).
- **Samples (Table 1, λ=0.02).** S1 accuracy with 1, 10, 100, and 1000 candidates: 66, 75, 83, and 85%.
- **Final test accuracy (Table 2), All/Hard.** Literal S0: 64/53. Contrastive (a reimplementation of Mao et al. 2015): 69/58. Reasoning S1: 81/68. All differences are significant (p < .05, binomial). On the dev set the figures are 66/54, 71/54, and 83/73.
- **Context changes the content (Fig. 6).** The same target is described as "mike is holding a baseball bat" against one distractor and "the snake is slithering away from mike and jenny" against another. Only the feature that distinguishes the target from *this* alternative gets mentioned.
- **Explicit reasoning was needed (Table 3).** A "compiled" speaker trained on S1's own outputs averaged 69%, versus 83% for reasoning S1 and 66% for literal S0. Its gain over S0 was not significant. A footnote reports that a hand-engineered speaker that mentions only target-unique objects scored 78/69 on dev, still below S1.

## Sources it builds on
Grice (1970, "Logic and conversation"; cited by its lecture date); Frank, Goodman, Lai & Tenenbaum (2009, CogSci), on informative communication; Golland, Liang & Klein (2010, EMNLP), a game-theoretic model of spatial descriptions; Vogel, Bodoia, Potts & Jurafsky (2013, NAACL), on how Gricean maxims emerge from multi-agent decision theory; Smith, Goodman & Frank (2013, NIPS), on recursive pragmatic reasoning; Monroe & Potts (2015, Amsterdam Colloquium), on learning in RSA; Mao et al. (2015, arXiv:1511.02283), the contrastive baseline; Smith & Eisner (2005), contrastive estimation; Goodfellow et al. (2014), adversarial examples, used to motivate the fluency regularizer; Gatt et al. (2007), the TUNA corpus.
Note: Frank & Goodman (2012) is not itself in the reference list. The paper cites the RSA line through Frank et al. (2009) and Smith et al. (2013).

## Works that cite it (influential forward citations)
Semantic Scholar API (queried 2026-10-28) lists 192 citations. The titles, venues, and DOIs below come from that API. These papers were NOT read here.
- Goodman & Frank (2016), TiCS, doi:10.1016/j.tics.2016.08.005. Already covered in this track.
- Fried, Andreas & Klein (2018), "Unified Pragmatic Models for Generating and Following Instructions," NAACL, doi:10.18653/v1/N18-1177.
- Fried et al. (2018), "Speaker-Follower Models for Vision-and-Language Navigation," NeurIPS.
- Monroe, Hawkins, Goodman & Potts (2017), "Colors in Context," TACL 5, doi:10.1162/tacl_a_00064. Already in the queue.
- Cohn-Gordon, Goodman & Potts (2018), "Pragmatically Informative Image Captioning with Character-Level Inference," NAACL, doi:10.18653/v1/N18-2070. Already in the queue.
- Vedantam et al. (2017), "Context-Aware Captions from Context-Agnostic Supervision," CVPR, doi:10.1109/CVPR.2017.120.
- Holtzman et al. (2018), "Learning to Write with Cooperative Discriminators," ACL, doi:10.18653/v1/P18-1152.
- Rao & Daumé III (2018), "Learning to Ask Good Questions: Ranking Clarification Questions using Neural Expected Value of Perfect Information," ACL, doi:10.18653/v1/P18-1255.
- Krause et al. (2020/21), "GeDi: Generative Discriminator Guided Sequence Generation," Findings of EMNLP, doi:10.18653/v1/2021.findings-emnlp.424.
- Lazaridou et al. (2020), "Multi-agent Communication meets Natural Language," ACL, doi:10.18653/v1/2020.acl-main.685.

## Relevance to AI answer style
- **This is the closest classical analogue of an LLM answering under pragmatic constraint.** The paper's base speaker S0 is "a fluent model that says what is typical for the topic," which is the default failure mode of an assistant: the λ=1 output, fluent and generic. The fix is to score candidate phrasings by whether a listener would land on the *intended* reading rather than a nearby one.
- **The paper puts PRECISION and COMPRESSION on separate dials.** The listener term rewards *discriminating* content, the detail that rules out the live alternative. The speaker term penalizes unnatural or excess wording. Removing the listener term yields generic text: fluent, short, and uninformative. Removing the speaker term yields terse, odd text that is discriminative ("a hamburger on the ground"). The best point is almost all listener weight plus a little fluency, so precision dominates and naturalness is a light constraint, not a goal.
- **Mention what distinguishes the target from the alternative.** The bat/snake example shows that the right content of an answer depends on what the user might otherwise think. For an assistant, the "distractor" is the plausible wrong interpretation or the wrong fix. Say the thing that separates them.
- **Generating several drafts and selecting among them works.** Accuracy rose from 66% with 1 candidate to 83% with 100. Selecting with a listener model is a concrete mechanism for "choose the phrasing that disambiguates."
- **Caveat.** This is a two-referent image-description game, not long-form answers. The transfer to assistant prose is an inference by analogy (UNTESTED here).

## Candidate rules for the harness
1. **Write against the distractor.** Before finalizing a key sentence, name the most likely wrong reading or wrong option the user could take. Keep the wording that rules it out. Drop details that are true but do not discriminate between the right reading and the wrong one.
2. **Generic fluency is a failure mode, not a safe default.** A sentence that would be equally true of the neighbouring case (for example, "check your configuration") carries no information. Replace it with the specific item that only fits this case.
3. **Use naturalness as a tiebreaker, not as a target.** Among phrasings that disambiguate equally well, choose the most ordinary and idiomatic one. Never trade away the discriminating term for smoother prose.

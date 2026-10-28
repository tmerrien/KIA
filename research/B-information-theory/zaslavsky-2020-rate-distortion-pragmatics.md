# Zaslavsky, Hu & Levy (2020/2021): A Rate-Distortion view of human pragmatic reasoning

## Citation
Zaslavsky, N., Hu, J., & Levy, R. P. (2020). *A Rate-Distortion view of human pragmatic reasoning.* arXiv:2005.06641v1 [cs.CL], submitted 13 May 2020. https://arxiv.org/abs/2005.06641 (I read the full text and the supplement, pp. 1-12, from https://arxiv.org/pdf/2005.06641v1.)

Also published as a 2-page abstract titled "A Rate–Distortion view of human pragmatic reasoning?" (with a question mark) in *Proceedings of the Society for Computation in Linguistics 2021*, pp. 347-348. ACL Anthology 2021.scil-1.32: https://aclanthology.org/2021.scil-1.32. The anthology page shows no DOI. A search result gave DOI 10.7275/gc1z-ck09; that DOI is UNVERIFIED.

## Core claim
The recursion in the Rational Speech Act (RSA) model is an alternating-maximization algorithm. It does not maximize expected utility. It maximizes a trade-off between expected utility and communicative effort: G_α = H_S(U|M) + α·E_S[V_L]. If the effort term is replaced by the rate I(M;U), the result is a Rate-Distortion objective, F_α = I(M;U) − α·E_S[V_L], which the authors call RD-RSA. RD-RSA fits human reference-game data about as well as RSA, and it lacks RSA's bias toward random, uninformative utterances.

## Key evidence
- **Proposition 1 (proof in the supplement):** each speaker step and each listener step of RSA is the argmax of G_α while the other agent is held fixed. G_α therefore never decreases, and the recursion converges to a stationary point (Csiszár & Shields 2004). This disproves a conjecture by Yuan et al. (2018) and Peloquin et al. (2019) that RSA always increases expected utility. The listener step maximizes utility. The speaker step can lower it, because the speaker also trades utility against effort (Fig. 3b).
- **The least-effort reading (p. 2):** "attaining the maximal expected utility requires a very precise selection of utterances, leading to low entropy (high effort), while attaining minimal communicative effort requires a random production distribution, leading to low expected utility." The authors link this to Zipf (1949).
- **RD-RSA speaker (eqs. 16-18):** S_t(u|m) ∝ S_{t−1}(u)·exp(α·V(m,u)). The speaker weights each utterance by how often it is already used overall. The authors stress that S(u) is not a fixed cost: it changes as the speaker reasons about the listener.
- **α = 1 is a critical point (Propositions 3-4):** in the basic setup (uniform prior, |M| = |U|, graded lexicon), the non-informative solution, I(M;U) = 0, is optimal when α < 1. A bijection of meanings to utterances, the maximal-utility solution, is optimal when α > 1. In RD-RSA at α = 1, every fixed point is equally good.
- **Fit to human data:** the data come from Vogel et al. (2014), the "Complex" condition, a reference game with glasses, hat and mustache. Best RSA fit: α = 0.9, depth 1, ρ = 0.98. Best RD-RSA fit: α = 1.2, depth 5, ρ = 0.97. Both models' fits get worse after a few recursion steps.
- **Bias toward random utterances (Fig. 5):** the authors add a catch-all utterance, "friend", that is true of every referent. At α = 0.5 the RSA speaker uses all utterances almost uniformly, while the RD-RSA speaker uses only the catch-all. At α = 3 the RSA speaker mixes in "friend" for one referent, because this raises entropy at no cost to utility. RD-RSA also allows a clean one-utterance-per-referent code. Supplement §3.1 adds that with a non-trivial cost and α ≤ α0, RSA predicts that the speaker conveys no information (I = 0) while still varying its word choice.
- **Stated limit:** only one dataset (Vogel et al. 2014) was tested. The authors call for more empirical tests.

## Sources it builds on
- Frank & Goodman (2012), *Science* 336:998, and Goodman & Frank (2016), *TiCS* 20(11):818-829. These are the RSA framework.
- Shannon (1948), rate-distortion theory, and Csiszár & Shields (2004), alternating maximization.
- Zipf (1949), *Human Behavior and the Principle of Least Effort*.
- Zaslavsky, Kemp, Regier & Tishby (2018), on efficient compression in color naming (already covered).
- Sims (2016, 2018), rate-distortion theory in perception, and Gershman (2020), the reward-complexity trade-off.
- Hahn, Jurafsky & Futrell (2020), on word-order universals.
- Levy (2018), CogSci, "Communicative efficiency, Uniform Information Density, and the Rational Speech Act theory".
- Peloquin, Goodman & Frank (2019); Yuan, Monroe, Bai & Kushman (2018), "Understanding the Rational Speech Act model"; Frank et al. (2018), RSA in reference games; Vogel et al. (2014), the human data.
- Sperber & Wilson (1986), whose "gap ... filled not by more coding, but by inference" (p. 9) the authors claim RD theory bridges.
- Wang, Wang, Paranamana & Shafto (2019), optimal-transport cooperative communication.

## Works that cite it (forward)
- Hu, J., Levy, R., & Zaslavsky, N. (2021). *Scalable pragmatic communication via self-supervision.* arXiv:2108.05799, ICML 2021 Workshop on Self-Supervised Learning. Verified on the arXiv abstract page: it trains pragmatic agents by self-supervision and builds on the "information-theoretic principles" characterization of pragmatics.
- Zhou, I., Hu, J., Levy, R., & Zaslavsky, N. (2021). *Empirical support for a rate-distortion account of pragmatic reasoning.* Proc. CogSci 43, eScholarship item 0fg427ng. Reported finding: an optimal experiment design finds contexts where RSA and RD-RSA disagree, and RD-RSA wins on newly collected data. UNVERIFIED: the eScholarship PDF came back empty, so the content above comes only from search results.
- I could not see citation counts. Wider forward citation is UNVERIFIED.

## Relevance to AI answer style
- **Precision, formally:** an utterance is precise when it lets the listener recover the intended meaning with low surprisal, which means high E[V_L]. The cost of precision is the speaker's effort or rate. The paper shows that these two pull in opposite directions, and that a single weight, α, decides which one wins.
- **Compression, formally:** the α < 1 regime is the case where the speaker saves effort by conveying nothing. In RD-RSA the speaker falls back on one catch-all utterance (I(M;U) → 0). That is the formal picture of vague filler such as "it depends" or "there are many factors". It is cheap, it is always true, and it carries no information.
- **Two kinds of laziness:** the RSA model shows a second failure, which is to vary wording at random with no gain in information. The RD view says the efficient speaker re-uses a stable code: the same term for the same referent, every time. Synonym variation for its own sake costs effort and does not help the listener.
- **Saying less can still be informative,** but only when the shorter form is still the one that best separates the intended meaning from the alternatives in context (the glasses → GM inference). The shorter form must keep the meanings distinguishable.

## Candidate rules for the harness
1. **Name the distinguishing term.** Choose the word or phrase that singles out the intended answer from the plausible alternatives in context. Do not use a phrase that is true of every alternative ("it depends", "various factors"). A catch-all phrase has zero information however short it is.
2. **Use one term per referent.** Once you name a concept, keep that term for the rest of the answer. Do not rotate synonyms for style. A stable one-to-one code is the efficient solution, and random variation adds effort with no information.
3. **Cut words, not distinctions.** Shorten only to the point where the listener can still recover the meaning. If dropping a word would make two candidate meanings indistinguishable, keep the word. That loss is compression, not precision.

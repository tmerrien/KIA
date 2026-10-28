# Zaslavsky, Kemp, Regier & Tishby (2018): the lexicon as an information bottleneck

## Citation

Zaslavsky, N., Kemp, C., Regier, T., & Tishby, N. (2018). Efficient compression in color naming and its evolution. *Proceedings of the National Academy of Sciences*, 115(31), 7937-7942. https://doi.org/10.1073/pnas.1800521115

Read in full (all 6 pages, main text; the SI Appendix was not read). Copy used: https://lclab.berkeley.edu/papers/zaslavsky-et-al-IB-2018.pdf. Open-access copies also exist at PMC (https://pmc.ncbi.nlm.nih.gov/articles/PMC6077716) and eScholarship (https://escholarship.org/uc/item/0gf3c34v).

**Why this work instead of Shannon (1948).** The queue assigned Shannon (1948), but `shannon-1948-source-channel-redundancy.md` already exists in this track, and so does `shannon-1951-prediction-entropy-printed-english.md`. This paper is the most direct modern use of the part of Shannon that the existing note only gestures at: the fidelity criterion and rate-distortion theory (Shannon 1948, Part V; Shannon 1959). The existing Shannon note mostly covers form-level redundancy. This paper applies the same mathematics to meaning, which is the PRECISION question.

## Core claim

A lexicon is an encoder that compresses intended meanings into words. Its quality is a trade-off between **complexity** I(M;W), the bits a speaker must spend to represent the meaning, and **accuracy** I(W;U), how much the word tells the listener about the world. Across 110 World Color Survey languages, color-naming systems lie close to the theoretical limit of this trade-off (the information bottleneck curve), and one parameter, β, explains most of the variation between languages.

## Key evidence (from the text)

- **Communication model** (pp. 2-3). The model is built on "Shannon's classical communication model". A meaning is a distribution m(u) over world states. A speaker encodes it with q(w|m). An optimal Bayesian listener reconstructs m̂. The channel is assumed noiseless, so that "we focus on the uncertainty involved in compressing meanings into words, rather than the uncertainty involved in transmission." The authors contrast their compression focus with prior work that looks at channel capacity (Levy & Jaeger 2007; Piantadosi et al. 2011; Jaeger 2010), and say this is "in contrast" to those works (p. 2).
- **The two extremes** (p. 3). "Minimal complexity, i.e., Iq(M;W) = 0, can be achieved if the speaker uses a single word to describe all her intended meanings. However, in this case the listener will not have any information about the speaker's intended meaning." At the other end, "If the speaker and the listener are unwilling to tolerate any information loss, the speaker must assign a unique word to each meaning, which requires maximal complexity."
- **Objective** (Eq. 6). F_β = I(M;W) − β·I(W;U), with β ≥ 1. Distortion is the expected KL divergence between the intended meaning and the reconstructed one, and minimizing it is equivalent to maximizing I(W;U) (Eq. 5). So "mutual information appears in our setting as a natural measure both for complexity and for semantic informativeness."
- **Near-optimality** (Table 1, Fig. 3). With the least-informative (LI) source, the mean efficiency loss is ε = 0.18 (±0.07) under IB, against 0.70 under the older Regier-Kemp-Kay objective. That is "74% improvement in εl". "A total of 93% of the languages achieve better trade-offs than any of their hypothetical variants" (39 hue-rotated controls per language). The remaining 7% beat most of their variants.
- **Real languages sit where bits pay most** (p. 4). Fitted β is about 1.03, "only slightly greater than 1". "These trade-offs correspond to the steepest part of the IB curve, in which every additional bit in complexity contributes the most to the accuracy of communication ... before the point of diminishing returns."
- **Soft boundaries are efficient, not noise** (pp. 3-5). "if some information loss is allowed, i.e., β < ∞, then an efficient encoder would induce soft rather than hard categories." Regions with inconsistent naming and "dominated categories" near phase transitions are predicted by the model. They are not failures.
- **Refinement by phase transitions** (Fig. 5, p. 5). As β increases, categories split at critical points. This roughly recapitulates Berlin & Kay's sequence (dark/light, then red, then green/yellow, then blue), with one discrepancy: yellow appears too early in the IB sequence. English sits at "a relatively complex point".
- **Generality claim** (p. 5). "The only domain-specific component in our analysis is the structure of the meaning space." The authors propose but do not test that the principle extends to other semantic domains.

## Sources it builds on

All of these were checked against the paper's reference list. The works themselves were not opened in this session.
- Shannon (1948), communication model (ref. 23), and Shannon (1959), *Coding theorems for a discrete source with a fidelity criterion*, IRE Nat. Conv. Rec. 4:142-163 (ref. 19): rate-distortion theory.
- Tishby, Pereira & Bialek (1999). The information bottleneck method. *37th Allerton Conference*, 368-377 (ref. 14).
- Regier, Kay & Khetarpal (2007). Color naming reflects optimal partitions of color space. *PNAS* 104:1436-1441 (ref. 6). Regier, Kemp & Kay (2015), "Word meanings across languages support efficient communication", *Handbook of Language Emergence* (ref. 8). These are the "RKK" informativeness baseline.
- Berlin & Kay (1969). *Basic Color Terms* (ref. 11).
- Harremoës & Tishby (2007). The information bottleneck revisited, ISIT (ref. 18): relates IB to rate-distortion theory.
- Efficiency-in-language works already covered in this crawl: Levy & Jaeger 2007, Piantadosi et al. 2011, Jaeger 2010.

## Works that cite it (influential forward citations)

- Zaslavsky, N., Hu, J., & Levy, R. P. (2020). A Rate-Distortion view of human pragmatic reasoning. arXiv:2005.06641 (short version in SCiL 2021, pp. 347-348). Abstract page read at https://arxiv.org/abs/2005.06641. It shows that the Rational Speech Act recursion implements alternating maximization of a trade-off between expected utility and communicative effort, and that it can be grounded in rate-distortion theory. Whether it cites the 2018 paper is UNVERIFIED, since the reference list was not read, but the author and framework overlap.
- Zaslavsky, N., Regier, T., Tishby, N., & Kemp, C. (2019). Semantic categories of artifacts and animals reflect efficient coding. SCiL 2019. UNVERIFIED (not opened).
- Mollica, F., Bacon, G., Zaslavsky, N., Xu, Y., Regier, T., & Kemp, C. (2021). The forms and meanings of grammatical markers support efficient communication. *PNAS* 118(49). UNVERIFIED (not opened).
- Gibson et al. (2019), *How efficiency shapes human language*, is already covered. It reviews this line of work. Whether it cites this specific paper is UNVERIFIED.

## Relevance to AI answer style

This paper gives the formal shape of the PRECISION vs. COMPRESSION split at the level of meaning, not form.

1. **Compression has a floor and a cost.** One word for everything, such as "it depends", "various issues" or "some configuration", has zero complexity and zero accuracy. That is COMPRESSION in the bad sense: the speaker saves bits and the listener learns nothing. The vague umbrella word is the I(M;W) = 0 corner of the plane.
2. **Precision means choosing the right partition, not using more words.** Accuracy comes from the word picking out a narrow region of meaning space, so that the KL divergence between the intended and reconstructed meaning is small. An exact term ("race condition", "off-by-one", "HTTP 409") is a fine-grained category. It raises accuracy per word, and the cost falls on the shared lexicon, not on answer length. This is PRECISION.
3. **Spend bits where they buy the most accuracy.** Real lexicons sit on the steep part of the curve, before diminishing returns. For an answer, refine the distinction that changes what the user will do, and stop splitting categories that the user's decision does not depend on.
4. **Graded hedges can be efficient.** Soft categories are optimal when some loss is tolerated. Calibrated graded language ("likely", "in most setups") is not vagueness when the underlying belief really is graded. The failure case is a hard claim that hides uncertainty, or a hedge that carries no gradient.
5. **The β is set by the task.** A higher accuracy weight justifies finer categories and more terms. Debugging, legal or safety contexts call for high β. A quick orientation question calls for low β. Answer length and the granularity of terms should follow the stakes.

## Candidate rules for the harness

1. **Name the category, do not gesture at it.** Replace umbrella words ("issue", "stuff", "some settings", "it depends") with the narrowest term the reader shares. If "it depends", state on what, by naming the deciding variable. An umbrella word carries close to zero information about which case applies.
2. **Refine only the distinctions that change the reader's action.** Split a category (say, two causes, two commands or two versions) when the user would act differently on each branch. Merge the branches when the action is the same. Granularity beyond that point costs words for little accuracy.
3. **Grade uncertainty honestly and in few words.** When a belief is graded, use one calibrated qualifier at the claim it attaches to ("probably the cache; check X to confirm"). Avoid both false crispness and blanket hedging.

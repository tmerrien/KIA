# Frank & Goodman (2012): Predicting pragmatic reasoning in language games

## Citation
Frank, M. C., & Goodman, N. D. (2012). Predicting pragmatic reasoning in language games. *Science*, 336(6084), 998. doi:10.1126/science.1218633
- Full text read (the author preprint, which includes the Supplementary Materials and the model derivation): https://langcog.stanford.edu/papers/FG-science2012.pdf
- The page numbers and DOI come from the task queue and the figure filename embedded in the PDF ("1218633_figure1.pdf"). The published Science version was not opened.

## Core claim
A listener resolves a word's referent by Bayesian inference. The listener combines a prior (how salient each object is in context) with a model of a speaker who picks words by informativeness minus cost. With the speaker's rationality fixed at alpha = 1, this model is parameter-free. It predicts human speaker choices and listener interpretations almost perfectly. Gricean "be as informative as required, not more" therefore becomes a computable quantity: surprisal reduction relative to the context.

## Key evidence
- **Speaker utility** (Supplementary eq. S2): U(w; r, C) = I(w; r, C) - D(w). Informativeness I is the negative surprisal of the referent under a literal reading of w. D(w) is cost. Words are chosen by softmax, P(w|r,C) ∝ exp(alpha·U), with alpha = 1. This reduces to the "size principle": P(w|r,C) ∝ |w|^-1, where |w| is the number of objects in context that the word fits. The more specific word is preferred in proportion.
- **Listener** (eq. 1): P(r|w,C) ∝ P(w|r,C)·P(r). The prior P(r) is measured empirically: participants guess which object a speaker means when the word is unknown.
- **Experiment**: 745 participants on Amazon Mechanical Turk, each seeing three objects that vary on two of three features (color, shape, texture), in 7 context types. Conditions: speaker (N=206), salience (N=276), listener (N=263). The figure legend gives N=20 and N=24 for one context type.
- **Results**: speaker bets vs. model, r = .98. Salience alone vs. listener bets, r = .19 (n.s.). Prior × likelihood vs. listener bets, r = .99. With predictions of 0 and 100 excluded, r = .87.
- **Cost** was held constant because the words were matched. The authors say explicitly that in real use cost would depend on length, frequency, and similar factors (UNTESTED in this paper).

## Sources it builds on
Grice (1975); Sperber & Wilson (1986); Clark (1996) *Using Language*; Wittgenstein (1953), for language games; Clark, Schreuder & Buttrick (1983), for salience in common ground; Xu & Tenenbaum (2007), Psych. Rev. 114, for the size principle; Rosenberg & Cohen (1964), for disambiguation; Benz, Jäger & van Rooij (2005), *Game Theory and Pragmatics*; Dale & Reiter (1995), Cognitive Science 19, for generating referring expressions.

## Works that cite it (influential forward citations)
- Goodman, N. D., & Frank, M. C. (2016). Pragmatic language interpretation as probabilistic inference. *TiCS* 20(11), 818-829. doi:10.1016/j.tics.2016.08.005. The canonical review of the Rational Speech Act (RSA) framework. The citation was verified from the Stanford-hosted PDF header (https://psych205.stanford.edu/papers/GoodmanFrank17TiCS.pdf), but the paper was not read.
- Bergen, Levy & Goodman (2016), on lexical uncertainty. Already covered in this track.
- Degen et al. (2020), on useful redundancy and overinformativeness. Already covered.
- The following are known from memory only, so citation details are UNVERIFIED: Goodman & Stuhlmüller (2013, Topics in Cognitive Science), on knowledge and implicature; Kao et al. (2014, PNAS), on hyperbole; Andreas & Klein (2016, EMNLP), on neural listeners and speakers; Cohn-Gordon, Goodman & Potts (2018, NAACL), on incremental pragmatics; Qing & Franke (2015), on variations of the RSA model.

## Relevance to AI answer style
- **Precision is formalized here.** A word's value is how much it narrows the hearer's space of interpretations *in this context*. The term that fits only the intended referent (small |w|) carries the idea. A vague word that fits many readings (large |w|) wastes the hearer's inference even when it is short.
- **This separates precision from compression.** Utility is informativeness *minus* cost. Cutting words lowers cost but must not lower informativeness. Dropping the word that disambiguates is a net loss. Swapping a vague phrase for the exact term is a gain on both terms.
- **Context determines informativeness.** "Blue" is informative when only one object is blue and worthless when all three are. Whether an answer's wording is informative depends on what the user's context already pins down: the alternatives the user has in mind.
- **Salience (the prior) is shared common ground.** The listener resolves meaning using what is already salient. An assistant can rely on referents that are salient in the conversation and should spell out the rest.

## Candidate rules for the harness
1. **Pick the most specific term that is true.** Among the words that correctly describe the thing, use the one that fits the fewest competing readings in the user's context (e.g. "race condition in the cache write," not "an issue"). Specificity is the measure. Length is not.
2. **Cut only zero-information words.** Delete a word only if, given what the conversation has already established, the user would reach the same interpretation without it. Keep any word that rules out a live alternative.
3. **Name the contrast set.** When the right term depends on alternatives the user may not share, state them briefly ("X, not Y"). Informativeness is relative to the alternatives, so the user needs to know which ones are excluded.

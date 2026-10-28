# Goodman & Frank (2016): Pragmatic language interpretation as probabilistic inference

## Citation
Goodman, N. D., & Frank, M. C. (2016). Pragmatic language interpretation as probabilistic inference. *Trends in Cognitive Sciences*, 20(11), 818-829. doi:10.1016/j.tics.2016.08.005
- I read the full text: the 8-page publisher PDF, pp. 818-829 with all 80 references, at https://psych205.stanford.edu/papers/GoodmanFrank17TiCS.pdf. (The filename says "17", but the PDF prints November 2016, Vol. 20, No. 11.)

## Core claim
The Rational Speech Act (RSA) framework replaces Grice's maxims with "a single, utility-theoretic version of the cooperative principle" (p. 821). A listener interprets an utterance by Bayesian inference over what a rational speaker would have said. That speaker picks the utterance that makes a literal listener most certain of the intended world, minus a cost. The extension uRSA lets the listener also infer the speaker's topic, goals and word meanings. This one extension explains hyperbole, irony, metaphor, vagueness and embedded implicature.

## Key evidence
- **The model (Eqs. 1-4).** The pragmatic listener is P_L(w|u) ∝ P_S(u|w)P(w). The speaker is P_S(u|w) ∝ exp(α·U(u,w)), with utility U = log P_Lit(w|u). The literal listener is P_Lit(w|u) ∝ [[u]](w)P(w). The parameter α is the speaker's degree of rationality.
- **Worked example (Fig. 1).** Three faces: hat and glasses, glasses only, neither. The speaker says "My friend has glasses." Listeners infer the glasses-only face, because a speaker who meant the hat face would have said "hat."
- **Box 1, refinements to the utility function.**
  - (II) *Cost*: U = log P_Lit(w|u) + cost(u). The sign is as printed; the cost works as a penalty. Cost can be "number of words" or word frequency. This "yields effects similar to Grice's maxim of manner."
  - (III) *Speaker uncertainty*: the speaker maximises expected utility given her knowledge.
  - (IV) *Topic relevance (QUD)*: informativity counts only along the topic t(w). "Although it may be highly informative to provide detailed descriptions, such detail is not always relevant."
  - *Social goals*: the speaker can also value kindness or politeness (Yoon et al. 2016).
- **Empirical fit.**
  - Frank & Goodman (2012), betting paradigm: tight fit.
  - Replications: Qing & Franke 2015; Carstensen et al. 2014.
  - Recursion depth: most people reason only one level deep. About 15% of participants reason deeper (Franke & Degen 2016).
  - Listeners track the speaker's production cost, whether dollar cost (Bergen et al. 2012) or typing difficulty (Degen et al. 2013).
  - Scalar "some" is modulated by the speaker's knowledge (Goodman & Stuhlmüller 2013).
- **uRSA (Eq. 5).** P_L(w,s|u) ∝ P_S(u|w,s)P(s)P(w).
  - Hyperbole: "kettle cost $1000" is read as the speaker's affect, not the price (Kao et al. 2014, PNAS).
  - Irony and metaphor: the model "accounts for almost all of the explainable variance."
  - Vague "tall": an inferred threshold trades informativity against plausibility (Lassiter & Goodman 2015).
  - Embedded implicature: modelled by compositional lexical uncertainty (Potts et al. 2015; Bergen et al. 2016).
- **Box 2, overspecification.** Speakers often say "glasses and no hat" even though "glasses" alone suffices. This "unnecessarily redundant utterance may in fact be a reasonable response to uncertainty about whether a conversational partner will in fact draw the desired implicature."
- **Box 4, language change.** Too-narrow words get extended pragmatically; too-broad words get narrowed by implicature. Lexicons converge on efficient ambiguity (Piantadosi et al. 2012). Learnability alone degenerates a language to a single word. Adding an RSA pressure yields compositional languages (Kirby et al. 2015).
- **Processing.** Pragmatics is "a fundamental part of language comprehension," not a repair step triggered by a maxim violation (Grodner et al. 2010).
- **Limits.** RSA is a computational-level theory in Marr's sense. How the alternative utterances are computed is an open question. Exact inference scales badly; the authors point to ML/NLP work (Monroe & Potts 2015; Andreas & Klein 2016).

## Sources it builds on
- Grice 1975; Lewis 1969 (signaling games)
- Horn 1984; Sperber & Wilson 1986; Clark 1996; Levinson 2000
- Game-theoretic pragmatics: Benz et al. 2006; Jäger 2008; Franke & Jäger 2016
- Bayesian cognition: Tenenbaum et al. 2011; Baker et al. 2009 (inverse planning)
- Roberts 1996 (QUD); Levy 2008 (noisy channel); Dale & Reiter 1995 (referring-expression generation)

## Works that cite it
Semantic Scholar lists 696 citations, 28 of them "influential" (API checked 2026-10-28). The influential forward work:
- Degen (2023), "The Rational Speech Act framework," *Annual Review of Linguistics* 9. doi:10.1146/annurev-linguistics-031220-010811
- Degen et al. (2020), "When redundancy is useful," *Psychological Review*. Already covered.
- Monroe et al. (2017), "Colors in Context," *TACL*. doi:10.1162/tacl_a_00064
- Sap et al. (2022), "Neural Theory-of-Mind?", EMNLP. arXiv:2210.13312
- Zhou et al. (2024), "Relying on the Unreliable: The Impact of Language Models' Reluctance to Express Uncertainty," ACL. arXiv:2401.06730
- Collins et al. (2024), "Building machines that learn and think with people," *Nature Human Behaviour*. doi:10.1038/s41562-024-01991-9

I took these titles and counts from the Semantic Scholar API listing and did not open the papers. Their content is UNVERIFIED.

## Relevance to AI answer style
RSA gives the PRECISION versus COMPRESSION distinction an exact form. An utterance's value is log P_Lit(w|u): how sharply it narrows the listener onto the intended state, minus its cost. Two consequences follow:
- A precise term ("hat") is short *and* informative, because it rules out every alternative.
- Compression that leaves the listener spread across states lowers utility. The words saved do not make up for it.

Two of the refinements map directly onto an assistant's answers:
- **Topic relevance (Eq. IV).** Detail off the question under discussion earns nothing, however true it is. Trimming it is not lossy compression.
- **Alternatives.** Listeners read meaning from what the speaker *could have said*. If the assistant hedges ("may," "some") where a stronger claim was available, readers infer that the stronger claim is false. The same goes for omitting an expected item. Word choice therefore carries implicatures the assistant must intend.

Box 2 permits redundancy only for one reason: it hedges against the listener failing to draw the implicature. That is the risk-based exception, not a style default. Hyperbole and irony are read off implausibility plus affect, so a model that exaggerates for emphasis is read as expressing affect, not stating facts.

## Candidate rules for the harness
1. **Pick the term that rules out the alternatives.** Choose the word or number that leaves the reader one interpretation. Cut words that do not narrow it. Do not cut a word whose removal re-opens alternatives ("some" for "all," "a config file" for `~/.npmrc`).
2. **Mean every implicature of a weaker word.** Readers take "some," "may," "usually" and omitted items as signals that the stronger claim is false. Use the strongest claim that is true. Hedge only where real uncertainty exists, and say where that uncertainty lies.
3. **Measure informativity against the question asked (the QUD).** Drop true but off-topic detail. Add a redundant restatement only where misreading is likely and costly, such as a destructive command or an exact identifier. Never use hyperbole for emphasis, because readers take it as affect, not fact.

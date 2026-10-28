# Tessler & Franke (2018): "Not unreasonable", how listeners read double negation

*Why this work, not Levinson (2000)?* The queued item was Levinson (2000), but `levinson-2000-presumptive-meanings-qim.md` already exists in this track. So this note covers the most direct experimental test of Levinson's M-heuristic minimal pair: "not unreliable" means less than "reliable" (Levinson 1995: 104-105). That pair is the flagship case of a prolix form being read as carrying meaning.

## Citation
Tessler, M. H., & Franke, M. (2018). Not unreasonable: Carving vague dimensions with contraries and contradictions. In *Proceedings of the 40th Annual Conference of the Cognitive Science Society*, pp. 1108-1113. (I took the page range from the search result and did not check it against the proceedings.)
- Full text read (6 pp.): http://www.mit.edu/~tessler/papers/Tessler2018-negant-cogsci-final.pdf
- Mirrors: https://escholarship.org/uc/item/7p2130hr and https://cogsci.mindmodeling.org/2018/papers/0219/index.html
- Preregistration for Expt. 2: osf.io/p7f25/
- Data and models: https://mhtess.github.io

## Core claim
Listeners are uncertain whether a negation marker (*un-*, *not*) expresses contradictory negation (¬happy) or contrary negation (a new predicate with its own threshold, like *sad*). They resolve that uncertainty by pragmatic reasoning about why the speaker chose a longer form. The result: "not unhappy" is not read as "happy". It is read as a *slightly positive* state, because a speaker who meant happy "could have said the simpler *happy*" (p. 2). Read alone, *unhappy* and *not happy* get the same interpretation. Listeners separate them only when both forms appear in the same context, because they infer that a speaker who uses two forms means two things.

## Key evidence
- **The model.** A Rational Speech Act listener with lexical uncertainty over what negation means (Bergen, Levy & Goodman 2016), combined with Lassiter & Goodman's threshold semantics for gradable adjectives (Eqs. 1-3).
  - Parameters: P(x) = N(0,1); α = 1; cost(un) = 1 < cost(not) = 2. Footnote 2 says the predictions are qualitatively the same when the two costs are equal.
  - Three lexicon priors were compared:
    - **logical negation** (the "George Orwell class"): predicts that "not unhappy" equals "happy", with no ordering differences.
    - **bona fide contraries**: predicts the full ordering everywhere.
    - **full uncertain negation**: predicts a partial ordering for single utterances and the full ordering for multiple utterances.
- **Experiment 1** (MTurk, N = 114 after exclusions).
  - Design: 20 adjective sets, 10 with morphological antonyms (unhappy) and 10 with lexical antonyms (short). Participants rated each person on a slider.
  - Morphological sets showed only a partial ordering: *unhappy* ≈ *not happy*. Lexical sets showed the full ordering.
  - The interaction was significant: b = 0.029, t(16) = 2.4, p = 0.029.
- **A minority reading of double negation** (Expt. 1). Ratings for negated antonyms were bimodal. Most were slightly positive, but a distinct minority were slightly *negative*, for example "not dishonest" read as "not honest". This minority reading appeared "at least somewhat in every item and in most participants". The authors attribute it to politeness: "not dishonest may be an indirect way of saying that a person is not honest" (p. 4, citing Yoon et al. 2017).
- **Experiment 2** (preregistered, N = 715 after exclusions).
  - Design: 2x2 between-subjects (antonym type x single vs. multiple utterances), with 20 adjectives that have both kinds of antonym on the same scale (happy / unhappy / sad).
  - Single utterances:
    - Morphological antonyms did not differ from negated positives: b = 5.3e-05, p = 0.98.
    - Lexical antonyms were rated more negative than negated positives: b = 0.011, t(280) = 3.66, p = 0.0003.
  - Context x adjective-type interaction for morphological sets: b = 0.032, t(6457) = 6.73, p = 1.9e-11. *Unhappy* came out more negative than *not happy* only when participants saw all four forms together.
- **The authors' framing** (Discussion): scales like happiness have no units, so speakers "use modifiers and morphemes to carve more precise meanings from otherwise vague dimensions." Double negation is a way to *name* a region of the scale that has no word of its own. "Potentially equivalent expressions receive differential interpretations when observed uttered by the same speaker in close proximity" (p. 5).
- **Limitation the authors state:** the model *stipulates*, rather than derives, the difference in meaning between morphological and lexical antonyms (they cite Rett 2014).

## Sources it builds on
- Jespersen (1917, 1924), *Philosophy of Grammar*, p. 332: "the longer expression is always weaker". This is the M-heuristic intuition, stated roughly 75 years before Levinson.
- Orwell (1946), "Politics and the English Language" (already covered). The paper quotes Orwell's "not unblack dog" passage and treats Orwell's view as the logical-negation model that the data reject.
- Horn (1989), *A Natural History of Negation*, on contraries vs. contradictories. Horn (1991), "Duplex negatio affirmat", on double negation as a neutral state.
- Krifka (2007), "Negated antonyms: creating and filling the gap", which proposes the four-way ordering.
- Blutner (2004), "Pragmatics and the lexicon", which holds that "not happy" and "unhappy" mean the same.
- Bergen, Levy & Goodman (2016), lexical uncertainty (already in repo). Goodman & Frank (2016), RSA (already in repo). Lassiter & Goodman (2015) and Kennedy (2007), on gradable adjectives.
- Yoon, Tessler, Goodman & Frank (2017), on polite indirect speech.
- Levinson is *not* cited. The paper's M-style reasoning comes through Jespersen, Horn and Bergen et al.

## Works that cite it (influential forward citations)
I could not get citation counts: Semantic Scholar returned 429 and OpenAlex had used up its daily budget on 2026-10-28.
- **Jeong, S., Potts, C., & Degen, J. (2024).** Is the asymmetry in negative strengthening the result of adjectival polarity or face considerations? Full text read: https://alpslab.stanford.edu/papers/2024JeongEtAl.pdf. It builds on Tessler & Franke's threshold semantics and, "in contrast with Tessler & Franke (2018)", adds polarity costs and a face-threat utility. The venue is probably CogSci 2024 (UNVERIFIED).
- **"Interpretation of Relative and Absolute Adjectives Under Negation"**, *Journal of Semantics* (2024), doi:10.1093/jos/ffae012. It showed up in the search, but I did not open it, so whether it cites this paper is UNVERIFIED.

## Relevance to AI answer style
1. **Hedged double negatives do carry meaning, but the meaning is unstable.** "Not unreasonable", "not incorrect", "not impossible" and "not unlikely" are read neither as their positive counterpart nor as a fixed weaker value. Most readers take a slightly-positive reading. A reliable minority take a polite *negative* one, such as "not dishonest" read as "not honest". So the M-heuristic prediction (Levinson) holds on average. For the individual reader, though, it is a coin flip with weighted odds. The assistant cannot control which reading a reader picks. That is COMPRESSION of the worst kind: one form, two incompatible meanings.
2. **Precision, by contrast, names the region directly.** The paper's own point is that double negation exists to name regions of a scale that have no units. An assistant usually *has* units: a probability, a count, a version, a test result. "Not unlikely" → "about 30%". "Not unreasonable" → "acceptable for under 1k rows". The exact term carries the whole idea. The double negative only gestures at it.
3. **Using two near-synonyms makes readers infer two meanings.** When "potentially equivalent expressions" appear close together from the same speaker, readers infer a difference between them (the mutual-exclusivity effect). If one answer says "the call fails" and later "the call is unsuccessful", or "deprecated" and later "obsolete", the reader will look for a distinction the writer never meant. This is the same principle as the terminology rule of one term per concept (track G), now with behavioural evidence behind it.

## Candidate rules for the harness
1. **No "not un-" or "not im-" hedges.** Never use a negated antonym ("not unreasonable", "not incorrect", "not impossible", "not insignificant") as a softener. State the value ("about 20% likely"), or name the condition ("correct only if X"). Readers split between a slightly-positive and a politely-negative reading, so the hedge creates ambiguity, not caution.
2. **One form per meaning within an answer.** Once a term is used for a concept, keep using it. Change the wording only when you mean a different thing, and then say what differs. Readers who see two forms from one speaker infer two meanings.
3. **On a scale, pick the scale word, or a number.** For gradable judgements, use the plain positive or the lexical antonym (fast/slow, safe/unsafe → risky) when it is true. Give a number or threshold when there is one. Use a negated positive ("not fast") only when you mean "below the threshold, degree unknown".

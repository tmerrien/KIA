# Piantadosi, Tily & Gibson (2012): The communicative function of ambiguity in language

## Citation
Piantadosi, S. T., Tily, H., & Gibson, E. (2012). The communicative function of ambiguity in language. *Cognition*, 122(3), 280-291. doi:10.1016/j.cognition.2011.10.004
Full text read: https://colala.berkeley.edu/papers/piantadosi2012communicative.pdf (author-hosted PDF, all pages incl. references).

## Core claim
If context is informative about meaning, any efficient communication system will leave out what context already supplies, so its units look ambiguous when examined out of context. Ambiguity also lets the "easy" units (short, frequent, phonotactically probable) be re-used for several meanings, which lowers total effort. Ambiguity is therefore a sign of efficient design, not a defect, provided disambiguation is cheap and speaker and listener share the same coding scheme.

## Key evidence
- **Formal argument (Sec. 2.1).** Uncertainty about meaning is Shannon entropy H[M]. Conditioning on context C gives H[M|C], and if C is informative then H[M] > H[M|C] (Eq. 3). "An optimally efficient communication system will not convey unnecessary information": the minimum it must send to be unambiguous *in context* is H[M|C] bits, which is strictly less than H[M]. By Shannon's source coding theorem those H[M|C] bits can never resolve H[M] bits out of context, so efficient units will look ambiguous in isolation.
- **Stated assumption (Sec. 2.1).** "speakers and listeners have the same—or very similar—coding schemes ... and also the same ability to use contextual information." This is the precondition that decides whether omission is precision or compression.
- **Stated limit (Sec. 2).** The authors note one can build an ambiguous system that is *not* efficient, "for instance, one which leaves out information other than what is provided in the context." Omission is only justified for information the context actually carries.
- **Minimum-effort argument (Sec. 2.2).** If meanings m1 and m2 are well separated by context and form l1 is easier than l2, mapping both to l1 lowers total effort. This requires that "disambiguation is not prohibitively costly." The authors cite Levinson (2000): "inference is cheap, articulation expensive." Their summary: "any effort the speaker makes to express a distinction that could have been inferred is, in effect, wasted effort."
- **Corpus tests (Sec. 3).** The data are CELEX for English, German and Dutch, plus WordNet senses for English.
  - *Homophony:* 65,417 English, 310,668 German and 277,522 Dutch phonological forms were tested. Shorter, more frequent and more phonotactically probable forms have more homophones (quasi-Poisson, rank and entropy regressions, p < 0.001). The one exception is English phonotactics, which is marginal and in the wrong direction.
  - *Polysemy:* 20,582 nouns, 3,175 verbs and 1,536 adjectives were tested. Shorter, more frequent and phonotactically easier words have more senses.
  - *Syllables:* about 11k syllable types per language were tested. The predicted effects hold, except that length in German goes the wrong way.
- **Cost of ambiguity (Sec. 4).** Real confusion is rare. Ferreira, Slevc & Rogers (2005) found that speakers avoid *conceptual* ambiguity (they say "small bat" when a large bat is present) but rarely avoid purely *linguistic* ambiguity (they seldom say "baseball bat" when an animal bat is present). Miller (1951) is cited for the view that ambiguity appears only when words are taken out of their usage context.
- **Limits the authors concede.** The three languages are historically related. The argument is about the lexicon out of context, which is different from Uniform Information Density (UID), a theory of in-context use.

## Sources it builds on
- Zipf (1949), *Human Behavior and the Principle of Least Effort*: the unification/diversification forces and the meaning-frequency law.
- Shannon (1948), and Cover & Thomas (2006): the source coding theorem and conditional entropy.
- Levinson (2000), *Presumptive Meanings*: inference is cheap, articulation is expensive.
- Wasow, Perfors & Beaver (2005), "The puzzle of ambiguity", and Wasow & Arnold (2003).
- Ferreira, Slevc & Rogers (2005), *Cognition* 96(3), and Ferreira (2008): speakers avoid conceptual but not linguistic ambiguity.
- Ferrer i Cancho & Solé (2003), PNAS: least effort and Zipf's law.
- Juba, Kalai, Khanna & Sudan (2011): compression without a common prior.
- Levy & Jaeger (2007) and Jaeger (2010): Uniform Information Density.
- Chomsky (2002), the foil: language is not designed for communication.

## Works that cite it (forward)
- Gibson et al. (2019), TiCS: already covered. It summarises this paper's argument.
- Pimentel, Meister, Teufel & Cotterell (2021), "On Homophony and Rényi Entropy", EMNLP 2021, arXiv:2109.13766 (abstract page read). It re-examines the claim that good wordforms are more homophonous and finds no clear pressure for or against homophony once a methodological issue is corrected.
- Trott, S. & Bergen, B. (2020), "Why do human languages have homophones?", *Cognition* 205, 104449. UNVERIFIED: the PDF could not be fetched, and its content here is known only through Pimentel et al. (2021). As Pimentel et al. describe it, the paper explains the homophony of easy forms by phonotactic probability alone and suggests homophony may be selected against.
- Citation counts: UNVERIFIED (not checked).

## Relevance to AI answer style
This is the formal licence for omission, and it separates PRECISION from COMPRESSION exactly. Leaving something out is *precision* when the omitted bits are in H[M] but not in H[M|C], meaning the shared context (the user's question, prior turns, the visible code) already resolves them. Omission becomes *compression* when it drops bits that context does not supply, the case the authors themselves flag as inefficient ambiguity. The argument rests on the speaker and listener sharing a coding scheme and context. An assistant must therefore judge what the *user* holds in context, not what the assistant holds. Private state such as tool output, files read, or internal labels coined during a task is not shared context, so omitting it is compression. The Ferreira finding gives a further distinction: ambiguity between referents the user is actually considering ("which bat") must be resolved explicitly, while lexical ambiguity that context already settles can be left alone.

## Candidate rules for the harness
1. **Omit only what the user's context supplies.** Leave out a detail only if the user's own visible context (their message, earlier turns, shown output) already settles it. Anything known only from the assistant's tool calls or private reasoning must be stated.
2. **Disambiguate between live alternatives.** When two or more plausible referents or options are in play (two files, two functions, two numbers), name the one meant precisely, for example by path, identifier or value. Never use a bare "it", "the config" or "that fix".
3. **Do not over-specify what context settles.** Do not restate the question, re-define terms the user just used, or spell out distinctions the context already makes. That is redundant coding and wastes the reader's effort.

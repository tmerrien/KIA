# Kuhn (2014): A Survey and Classification of Controlled Natural Languages (the PENS scheme)

## Citation
Kuhn, T. (2014). A Survey and Classification of Controlled Natural Languages. *Computational Linguistics* 40(1): 121-170. doi:10.1162/COLI_a_00168. ACL Anthology J14-1005.
- Read in full: arXiv:1507.01701v1 (7 Jul 2015), https://arxiv.org/abs/1507.01701. It says it was submitted 26 Oct 2012, revised 7 Mar 2013, and accepted 25 Apr 2013.
- Data set (CSV of all 100 languages): http://purl.org/tkuhn/cnlsurvey/data (cited in the paper; not opened).
- Citation counts: Semantic Scholar API, queried 2026-10-28, gives 401 citations, 41 of them "influential".

## Core claim
Controlled natural languages (CNLs) are languages built on purpose from one base language. They restrict its lexicon, syntax and/or semantics but stay readable to native speakers without training. All CNLs sit in one connected cloud between full English and propositional logic. That space has four roughly independent dimensions, the PENS scheme: **P**recision, **E**xpressiveness, **N**aturalness and **S**implicity, each scored 1-5. No language scores top on all four. The paper finds P5 E5 N5 S5 "practically impossible", so every design gives something up.

## Key evidence
- **Definition (Sec. 2.1).** A CNL has four properties:
  1. It has exactly one base language.
  2. It is more restrictive in lexicon, syntax and/or semantics.
  3. Speakers of the base language can understand it "intuitively and correctly ... to a substantial degree". Later this is made concrete as naturalness N3 or higher.
  4. It is constructed, not naturally evolved.

  Kuhn rejects "subset" as too strict, because many CNLs add non-natural devices such as colour or parentheses.
- **Related terms (Sec. 2.2).** These separate *precision devices* from *compression devices*:
  - **Sublanguage** arises naturally among experts.
  - **Phraseology** selects phrases rather than whole sentences, e.g. ATC.
  - **Controlled vocabulary** standardizes terms but no grammar.
  - **Style guide** gives "hints, not rules" (EC "How to write clearly"). A strict one such as the Plain Language Guidelines can define a language.
- **Precision (Sec. 3.1)** is "the degree to which the meaning of a text ... can be directly retrieved from its textual form". Less precision means more of the meaning must come from context.
  - P1: natural language. Virtually every sentence is somewhat vague, and interpretation is "AI-complete".
  - P2: ambiguity "considerably lower", but interpretation still not reliable.
  - P3: reliably interpretable, but needs heuristics or background knowledge.
  - P4: deterministic parse to logic.
  - P5: fixed semantics.
- **Expressiveness (Sec. 3.2)** is graded by five features: universal quantification, relations of arity above 1, general rules, negation, and second-order quantification. Kuhn borrows Felleisen's (1991) test: a construct adds expressiveness if removing it would force "a global reorganization of the entire" text. This is a useful operational test for whether a word or construct earns its place.
- **Naturalness (Sec. 3.3).**
  - N4: valid sentences, but "complete texts ... seem very clumsy and repetitive, and lack a natural text flow".
  - N5: natural texts and dialogs.
- **Simplicity (Sec. 3.4)** is measured as the page count of an exact, complete description of the language:
  - S5: up to 1 page.
  - S4: up to 10 pages.
  - S3: more than 10 pages.
  - S2: no exhaustive description possible, but much simpler than natural language.
  - S1: as complex as natural language.

  S1/S2 languages are defined by *proscriptive* rules on top of full English, so they "import" its complexity. S3-S5 languages are *prescriptive*, built from scratch.
- **Classifications relevant to this crawl (Sec. 4):**

  | Language | PENS class | Note |
  |---|---|---|
  | Full English | P1 E5 N5 S1 | |
  | Plain Language | P1 E5 N5 S1 | "not ... considerably more precise or simpler" than English, despite the Plain Writing Act |
  | E-Prime | P1 E5 N5 S1 | Banning "to be" leaves rewrites "fully natural though possibly longer"; no precision gain |
  | Basic English (850 words, 18 verbs) | P2 E5 N5 S1 | |
  | Caterpillar Fundamental English | P2 E5 N5 S1 | One meaning per word, e.g. *right* only as the opposite of *left*. Dropped in 1982 because its rules "were not enforceable" |
  | ASD-STE / AECMA-SE (about 60 rules, one approved meaning per word, user-defined Technical Names/Verbs) | P2 E5 N5 S1 | "considerably more precise than full English" yet not reliably machine-interpretable |
  | FAA/ICAO/CAA phraseology ("AirSpeak", Robertson 1987); more than 300 fixed patterns plus prose-defined implicit patterns; free English allowed where no pattern exists | P2 E1 N3 S2 | Precision is bought by giving up expressiveness and naturalness |
  | Attempto Controlled English (unambiguous mapping to first-order logic) | P4 E3 N4 S3 | |
  | Propositional logic | P5 E1 N1 S5 | |

- **Correlations across the 100 languages (Sec. 5.1, Spearman's rho):**

  | Dimension pair | rho | Reading |
  |---|---|---|
  | Precision-simplicity | +0.90 | |
  | Expressiveness-simplicity | -0.82 | |
  | Naturalness-expressiveness | +0.77 | |
  | Naturalness-simplicity | -0.76 | |
  | Precision-naturalness | -0.67 | Precision costs naturalness |
  | Precision-expressiveness | -0.66 | Precision costs range |

- **PENS describes, not ranks (end of Sec. 3).** "A certain level in any of the dimensions is often good enough ... and going beyond that level brings no additional benefit."
- **Evaluations (Sec. 5.5):**
  - Comprehension (type C goal). Two AECMA-SE studies found significantly better comprehension, "with a particularly large effect for complex texts and non-native speakers": Shubert, Spyridakis, Holmback & Coney 1995 (*J. Technical Writing and Communication*) and Chervak, Drury & Ouellette 1996 (FAA). Stewart 1998 found a similar but non-significant effect. Temnikova 2012 found CLCM helped under stress.
  - Translation (type T goal). Reported gains include MCE's "five-to-one gain in translation time" (Ruffino 1982), PACE post-editing "three or four times faster" (Pym 1990), and CLCM post-editing time down about 20% (Temnikova).
  - Kuhn's caveat: benefit "depends heavily on ... the quality of the design of the language".

## Sources it builds on
- Earlier CNL type schemes:
  - Huijsen (1998): human-oriented versus computer-oriented.
  - Schwitter (2002): communication / translation / formal-representation goals.
  - Pool (2006): an earlier survey of 41 CNLs.
  - Wyner et al. (2010): more than 40 CNL properties.
  - O'Brien (2003): compared rule sets and found no common core.
- Kittredge (2003), on sublanguage.
- Felleisen (1991), on expressiveness.
- Language sources: Ogden (1930) for Basic English, Verbeke (1973) for CFE, ASD (2013) for STE, FAA (2010) phraseology, and Fuchs, Kaljurand & Kuhn (2008) for ACE.
- Kuhn's own thesis (2010), where "precision" was called "clearness".

## Works that cite it (forward; from the Semantic Scholar citations API, metadata only unless noted)
- Safwat & Davis (2016), "CNLs for the Semantic Web: a state of the art", *Language Resources and Evaluation*, doi:10.1007/s10579-016-9351-x.
- Guitton, Tamò-Larrieux, Mayer & Zumbrunn (2025), "Controlled Language Increases Comprehension of Law for People", *ACM J. Computing and Sustainable Societies*, doi:10.1145/3711128.
  - Only the abstract was read, via the API. It reports 73 participants, including MPs and public servants. Controlled language raised understandability but did *not* reduce the number of terms perceived as open-texture (ambiguous or vague).
  - The full text is UNVERIFIED.
- Jahchan, Condamines & Cannesson (2016), "To What Extent Does Text Simplification Entail a More Optimized Comprehension in Human-Oriented CNLs?", CNL 2016, doi:10.1007/978-3-319-41498-0_7. The Airbus cockpit follow-up is from 2019. Findings are UNVERIFIED (metadata only).
- Two papers that use LLMs with CNLs:
  - "Language Models as Controlled Natural Language Semantic Parsers for KGQA" (ECAI 2023), doi:10.3233/FAIA230411.
  - "Bridging language models and knowledge graphs with controlled natural languages" (*Knowledge-Based Systems* 2026), doi:10.1016/j.knosys.2026.115405.

  Both are UNVERIFIED beyond metadata.
- Kuhn (2016), "The Controlled Natural Language of Randall Munroe's Thing Explainer", arXiv:1605.02457. This is a forward case of extreme lexical compression (the 1,000 most common words). UNVERIFIED beyond metadata.

## Relevance to AI answer style
PENS gives the crawl its vocabulary for the PRECISION versus COMPRESSION distinction:
- **Precision** means less meaning has to be pulled from context. It comes from fixing the meaning of each term (STE's one approved meaning per word, CFE's *right* only as the opposite of *left*). It does not come from dropping words.
- **Compression** in the PENS sense mostly costs expressiveness and naturalness. Phraseology is very terse (E1, N3) and works only in a narrow domain with trained listeners, and it still falls back to plain English when no pattern exists.

Three findings matter for an assistant:
1. Making text shorter or simpler does not make it more precise. Plain Language and E-Prime both stay at P1.
2. Readers tolerate valid but repetitive sentences badly. N4 texts are "clumsy and repetitive", so mechanically uniform phrasing has a cost in flow.
3. Felleisen's test, as Kuhn applies it, works as a deletion check. A word or construct earns its place if removing it would force the rest of the answer to be reorganized; otherwise it is padding.

The negative correlation between precision and naturalness (rho = -0.67) warns that pushing toward precise wording costs readability. An assistant answering general users should target about P2 N5, the STE zone: fixed, consistent terms inside natural prose. It should not target the terse P2 E1 N3 zone of phraseology.

## Candidate rules for the harness
1. **Use one term per concept, one meaning per term.** Once a key term is used, keep it and its single meaning throughout the answer. Do not swap in synonyms for variety. This is precision without added words, the move STE and CFE make.
2. **Do not mistake terseness for precision.** Before cutting a word, ask whether the reader would then have to get that meaning from context. If yes, keep it, because that is a precision loss. If removing it changes nothing elsewhere, cut it.
3. **Use fixed patterns only for small, recurring, high-stakes slots, and stay in natural prose elsewhere.** Status lines, exact values and commands can use fixed patterns, as AirSpeak does. All-telegraphic or all-templated answers lose naturalness and range, which phraseology accepts only because its users are trained.

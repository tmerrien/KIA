# Horn (1984): Q-based and R-based implicature

## Citation
Horn, L. R. (1984). Toward a new taxonomy for pragmatic inference: Q-based and R-based implicature. In D. Schiffrin (Ed.), *Meaning, Form, and Use in Context: Linguistic Applications* (Georgetown University Round Table on Languages and Linguistics 1984), pp. 11-42. Washington, DC: Georgetown University Press. (Some reference lists give pp. 11-48.)

- Primary text: **NOT READ.** The only scan found is the Internet Archive's lending-only copy, which returned 401 on full text: https://archive.org/details/meaningformusein0000geor. No ResearchGate or author PDF was accessible. The Kasher (1998) reprint was not found online.
- **What was read instead:**
  1. Kim, S.-H. (1992). Division of labor between grammar and pragmatics concerning anaphora. *Kansas Working Papers in Linguistics* 17, ERIC ED351856. It quotes Horn 1984 with page numbers (pp. 12-13, 22): https://pdfs.semanticscholar.org/f98a/1f512c79ca66a05df6e194fe1e3610dda491.pdf
  2. Davis, W. *Implicature*, Stanford Encyclopedia of Philosophy, §11 "Neo-Gricean Pragmatics". It quotes Horn (2004), "Implicature", Handbook of Pragmatics, p. 16: https://plato.stanford.edu/entries/implicature/
  3. Gawron, J. M. *Q and R Principles*, SDSU lecture slides, which give Horn's examples: https://gawron.sdsu.edu/semantics/course_core/lectures/horn_qr.pdf
- Every quotation below is second-hand: each comes through one of these sources, which name Horn's page.

## Core claim
Of Grice's maxims, all except Quality reduce to two opposing forces. The hearer-oriented **Q principle** says "Make your contribution sufficient. Say as much as you can (given Quality and R)." The speaker-oriented **R principle** says "Make your contribution necessary. Say no more than you must (given Q)." These two forces are a version of Zipf's auditor's economy and speaker's economy. The conflict between them is resolved by the **division of pragmatic labor**: an unmarked, brief form gets the stereotypical meaning, and a marked, prolix form signals a meaning the brief form would not have conveyed.

## Key evidence (as quoted in the secondary sources)
- **Q principle**, Horn 1984: 13 via Kim 1992. "Do not provide a statement that is informationally weaker than your knowledge of the world allows." It is lower-bounding and induces upper-bounding implicata: saying "...p..." implicates "at most p". Example: "Bill has a C-average" implicates "not a B-average" (Gawron).
- **R principle**, ibid. "Produce the minimal linguistic information sufficient to achieve your communicative ends." It is upper-bounding and induces lower-bounding implicata: saying "p" implicates "more than p". Examples: "Can you open the window?" R-implicates a request. "I don't think he's coming" R-implicates "I think he's not coming" (neg-raising).
- **Division of pragmatic labor**, Horn 1984: 22 via Kim 1992. "The use of a marked (relatively complex and/or prolix) expression when a corresponding unmarked (simpler, less effortful) alternate expression is available tends to be interpreted as conveying a marked message (one which the unmarked alternative would not or could not have conveyed)." The 2004 restatement (SEP) reads: the unmarked form "tends to be R-associated with a particular unmarked, stereotypical meaning", and the periphrastic form "tends to be Q-restricted to those situations outside the stereotype."
- **Minimal pairs** (Gawron; SEP):
  - "stopped the machine" means in the usual way; "got the machine to stop" means in an unusual way.
  - "pink" is the expected colour word; "pale red" means a tint not covered by pink.
  - "my mother" is the plain relation; "my father's wife" suggests a stepmother.
  - "possible" is plain possibility; "not impossible" means bare possibility only.
  - "rectangle" Q-implicates "not square" because the lexeme *square* exists. "triangle" does not implicate "not equilateral", because no single word for that case exists.
- **Critiques** (SEP §11):
  - Levinson (1987, 2000) argues that the division of labor concerns form, not information. He therefore splits it off as a separate M principle and ranks the principles Q > M > R.
  - Davis (2016) notes that many synonym pairs show no implicature difference (*mare* vs *adult female horse*).
  - Critics also say Q and R together do not predict which one wins in a given case.

## Sources it builds on
- Grice (1975), Logic and Conversation (already covered).
- Zipf, G. K. (1949), *Human Behavior and the Principle of Least Effort*: the speaker's and auditor's economies (per Kim 1992).
- Atlas & Levinson (1981) and Gazdar (1979) on scalar and informativeness inferences. UNVERIFIED in the primary text.
- McCawley (1978) on conversational implicature and the lexicon: the "pink/pale red" and "kill/cause to die" pairs. UNVERIFIED in the primary text.
- Horn (1972) on scales: the origin of the "Horn scale".

## Works that cite it (influential forward citations)
- Levinson, S. C. (1987). Pragmatics and the grammar of anaphora. *Journal of Linguistics* 23; and Levinson (2000), *Presumptive Meanings* (MIT Press). Both give Q/I/M heuristics.
- Horn, L. R. (1989). *A Natural History of Negation*, pp. 193-203; and Horn (2004), "Implicature", *Handbook of Pragmatics*.
- Blutner, R. (2000). Some aspects of optimality in natural language interpretation. *Journal of Semantics* 17. Bidirectional OT derives the division of labor. UNVERIFIED (not opened).
- van Rooij, R. (2004). Signalling games select Horn strategies. *Linguistics and Philosophy* 27. UNVERIFIED (not opened).
- Bergen, L., Levy, R., & Goodman, N. D. (2016). Pragmatic reasoning through semantic inference. *Semantics & Pragmatics* 9(20), doi:10.3765/sp.9.20. It derives M-implicatures in the RSA framework. Keywords and abstract were confirmed on the journal record; the paper was not read.
- Farkas, D. applies the division of labor to sentence forms (talk at the Hornucopia festschrift, https://campuspress.yale.edu/hornucopia/abstracts/).

## Relevance to AI answer style
Horn gives a formal account of the precision-versus-compression distinction:
- **Q is the floor.** An answer must not be informationally weaker than what the assistant knows. A hearer reads a weaker claim as denying the stronger one: "some tests fail" implies "not all fail". Over-compression is therefore not neutral. It creates false upper-bound implicatures.
- **R is the ceiling.** Produce the minimal form sufficient for the goal. The hearer fills in the stereotypical case, so the default need not be spelled out.
- **The division of pragmatic labor turns wordiness into a signal.** When a short standard term exists, a hedged or periphrastic phrase tells the reader that something non-standard is meant. For example, "not unreasonable" suggests weaker approval than "reasonable", and "got the build to pass" suggests a hack. Padding is therefore costly in a second way: it tells the reader something the speaker did not intend.
- **Precision means picking the lexicalized term.** The exact word (*square*, *idempotent*, *deprecated*) is both the shortest form and the strongest one. It satisfies Q and R together. Compression, by contrast, gives up Q to satisfy R.

## Candidate rules for the harness
1. **Do not understate (Q).** Never make a weaker claim than the evidence supports. "Some", "may" or "can" will be read as "not all", "not certainly" or "not always". If all tests pass, say "all".
2. **Use the plain term for the plain case (R plus the division of labor).** If a standard, lexicalized term exists, use it. Use a longer or hedged phrase only when the meaning really differs from the standard case, and say how it differs.
3. **Leave defaults unstated, state exceptions.** Omit what the reader will infer as the stereotypical case. Explicitly mark anything non-default, such as a unit, scope, side-effect or unusual method. Unmarked wording will be read as "the usual way".

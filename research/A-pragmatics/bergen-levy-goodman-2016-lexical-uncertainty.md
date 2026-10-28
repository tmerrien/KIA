# Bergen, Levy & Goodman (2016): Pragmatic reasoning through semantic inference

## Citation
Bergen, L., Levy, R., & Goodman, N. D. (2016). Pragmatic reasoning through semantic inference. *Semantics and Pragmatics* 9(20), 1-91. doi:10.3765/sp.9.20 (metadata checked on Crossref).
- Text read: the lingbuzz/002110 "current" PDF, manuscript dated 22 October 2015 (https://lingbuzz.net/lingbuzz/002110). Page numbers below are from that manuscript, not the typeset journal version. The journal page (semprag.org) returned HTTP 502 when tried, so the typeset text was NOT checked against the manuscript (UNVERIFIED that the wording is identical).

## Core claim
The baseline Rational Speech Acts (RSA) model has a speaker choose an utterance to maximize informativity minus cost (U = log L(o|u) - c(u)). That model cannot derive Horn's division of pragmatic labor (M-implicature): when two forms mean the same thing literally, cost alone only makes the long form less frequent. It does not give the long form a meaning of its own. The paper adds *lexical uncertainty*, where the listener reasons over possible refinements of each word's literal meaning. With it, the costly form becomes linked to the rare or marked meaning, and the cheap form to the frequent one.

## Key evidence
- **Speaker utility (Eq. 3, p. 6).** Un(u|o) = E log Ln-1(o,w|u) - c(u). Cost is "strictly monotonic in utterance length (as measured in words)" (pp. 6-7). The speaker "wants to minimize the expected amount of information that is left uncommunicated, while simultaneously minimizing the cost" (p. 7).
- **M-implicature example (p. 13).** "John can finish the homework" vs "John has the ability to finish the homework". The literal content is the same, but the longer sentence is usually taken to mean John *won't* finish it.
- **One-shot signaling game (p. 13).** Two forms, SHORT and long, and two meanings, FREQ and rare. The efficient system pairs long with rare and SHORT with FREQ. Bergen, Goodman & Levy (2012) find people reach this pairing even in one-shot games with no conventions. So the effect is general reasoning, not lexical habit.
- **Negative result (Section 4.1.1, Lemmas 1-2, pp. 14-15).** In baseline RSA, forms that mean the same literally stay interchangeable at every level of recursion. The only difference is "an across-the-board dispreference ... for long". This holds for all priors, costs and values of λ.
- **Game-theory framing (Section 4.2).** The game has several equilibria: an efficient separating one, an inefficient reversed one, and a "pooling" one where everyone uses SHORT and nothing gets communicated. Cost alone does not choose among them.
- **Derivation (Section 4.5, pp. 23-24).** The listener considers the nine possible refinements of the two forms' meanings. "The value of precision varies with communicative intention." A speaker can convey *rare* precisely only with long, because SHORT is vague there. FREQ, by contrast, gets across well with SHORT. So long becomes more strongly tied to rare, and further recursion strengthens the link toward a categorical one.
- **Symmetry problem (Section 3.2, pp. 12-13).** The model can include "all" and "some but not all" as alternatives at once. The longer one costs more, so "some" still means "not all". Costlier alternatives become "less and less salient ... as an alternative".
- **Extensions.** Ignorance is treated as a marked state: "some or all" signals that the speaker doesn't know (Section 4.6). The paper also covers Hurford-violating disjunctions and non-convex disjunctive implicatures (Section 5).
- **Conclusion (p. 55).** Baseline RSA "captures the Gricean imperatives that the speaker be informative but brief". Lexical uncertainty is needed for marked-form effects.

## Sources it builds on
- Horn 1984 (Q/R principles, division of pragmatic labor); Levinson 2000 (*Presumptive Meanings*), already covered
- Frank & Goodman 2012 (*Science* 336:998), the first RSA model; Goodman & Stuhlmüller 2013 (*Topics in Cognitive Science*), knowledge-sensitive RSA
- Franke 2009 (*Signal to Act*, the IBR model); Jäger 2012; Parikh 2000 (focal points); Cho & Kreps 1987 and Rabin 1990 (equilibrium selection)
- Bergen, Goodman & Levy 2012 (CogSci), the one-shot M-implicature experiment
- Hurford 1974; Chierchia, Fox & Spector 2012; Fox 2007; Fox & Katzir 2011 (alternatives)

## Works that cite it (forward)
Semantic Scholar citations endpoint, read 2026-10-28. Crossref reports 60 citations; Semantic Scholar's own counts are higher. The most-cited citing works are:
- Degen, Hawkins, Graf, Kreiss & Goodman (2020). When redundancy is useful: a Bayesian approach to "overinformative" referring expressions. *Psychological Review*. doi:10.1037/rev0000186
- Degen, J. (2023). The Rational Speech Act framework. *Annual Review of Linguistics* 9. doi:10.1146/annurev-linguistics-031220-010811
- Hawkins et al. (2023). From partners to populations: a hierarchical Bayesian account of coordination and convention. *Psychological Review*. doi:10.1037/rev0000348
- Fried, Andreas & Klein (2018). Unified pragmatic models for generating and following instructions. NAACL. doi:10.18653/v1/N18-1177
- Hu et al. (2023). A fine-grained comparison of pragmatic language understanding in humans and language models. ACL. arXiv:2212.06801
- Zaslavsky, Hu & Levy (2021). A rate-distortion view of human pragmatic reasoning. SCiL. arXiv:2005.06641
- Burnett (2019). Signalling games, sociolinguistic variation and the construction of style. *Linguistics and Philosophy*. doi:10.1007/s10988-018-9254-y
These are bibliographic listings only. The contents of these works were not read here. Semantic Scholar gives preprint years for some of them (Degen et al. 2019, Hawkins et al. 2021, Fried et al. 2017, Hu et al. 2022, Zaslavsky et al. 2020). The journal and venue years above are from memory and are UNVERIFIED.

## Relevance to AI answer style
- **Precision vs compression, formally.** The speaker's goal has two terms: leave nothing out (informativity) and spend little (cost). Compression cuts cost and leaves the listener less sure of the meaning, which loses utility. Precision raises informativity per word. The model penalizes a short form when it is *vague*, not when it is short.
- **Length carries meaning.** If an assistant uses a long phrasing where a short standard one exists ("has the ability to" for "can", or "it may be worth considering" for "do X"), a rational reader infers a marked meaning: hedging, reluctance, an unusual case. Wordiness is not neutral padding. It sends an unintended signal.
- **Spend extra words on rare meanings.** The efficient system puts the costly form on the improbable meaning. An answer should state the normal case in the standard short term, and spend extra words only to mark exceptions, caveats or rare conditions. Then the extra length tells the reader something.
- **Ignorance is marked.** "Some or all" signals that the speaker doesn't know. So when an assistant is uncertain, it should mark that explicitly. And it should not use hedging disjunctions when it does know.

## Candidate rules for the harness
1. **Use the standard short form for the default meaning.** When a plain, conventional term exists ("can", "use", "fails"), use it. Don't swap in a longer paraphrase with the same literal meaning ("is able to", "make use of", "is not successful"). Readers take the longer version to imply a marked meaning, such as doubt or reluctance, that you didn't intend.
2. **Spend extra length only to mark the unusual.** Add qualifying words only where the meaning really departs from the expected case (an exception, a rare condition, real uncertainty), so that extra length reliably signals "this is not the default".
3. **Mark ignorance explicitly, and only when it is real.** Use "X or Y" or "some or all" style hedges only when you actually don't know which holds. If you know, state the specific case. A needless hedge tells the reader you don't know.

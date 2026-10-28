# Degen, Hawkins, Graf, Kreiss & Goodman (2020): When redundancy is useful

## Citation

Degen, J., Hawkins, R. X. D., Graf, C., Kreiss, E., & Goodman, N. D. (2020). When redundancy is useful: A Bayesian approach to "overinformative" referring expressions. *Psychological Review*, 127(4), 591-621. https://doi.org/10.1037/rev0000186

- Volume, issue, pages and date (July 2020) come from Crossref metadata for the DOI.
- I read the full text from the arXiv preprint v3 (10 Dec 2019): https://arxiv.org/abs/1903.08237. The published version was not compared against it, so its page numbers and wording may differ.
- Interactive toy model, per footnote 13: http://forestdb.org/models/overinf.html

## Core claim

Speakers trade off an utterance's cost against its informativeness in a rational way. If informativeness is computed over a continuous, "noisy" semantics (word-object fit takes values in [0,1]) rather than a Boolean one, many apparently "overinformative" referring expressions turn out to carry real information. A modifier that is redundant under truth conditions helps when the sufficient word is itself imprecise. In the authors' words, reference is "usefully redundant" rather than "wastefully overinformative" (Abstract; Sec. 6.9).

## Key evidence

- **Model (cs-RSA).** It is the Rational Speech Act model. The literal listener is P_L0(o|u) ∝ L(u,o), with the lexicon L(u,o) ∈ [0,1] (Eq. 6), and the speaker soft-maximises informativeness minus cost. Simulation 1 sets x_size = .8 and x_color = .99. With these values the minimal "small" has literal-listener success .48 and the redundant "small blue" has .50. That gap is enough to make the speaker prefer the redundant form. The reverse case gives nothing: adding size to an already precise colour term does not help ("red" .57 vs "big red" .52). Conclusion (Sec. 2.2.2): "When modifiers are noisy, adding 'stricter' modifiers adds information."
- **Exp. 1** (58 interactive MTurk pairs, free-chat reference game). It replicates the colour-over-size asymmetry in redundant modifiers and the rise of redundancy with scene variation. Bayesian data analysis gives r = .99 at condition level and r = .85 by item. The inferred semantic values are x_color = 0.88 and x_size = 0.79, with HDIs that do not overlap. Inferred cost weights sit near zero, so the asymmetry "cannot be reduced to cost differences" (Sec. 3.3).
- **Exp. 2** (61 pairs; colour typicality, e.g. yellow / brown / blue banana). Redundant colour mention rises as typicality falls. Typicality was normed separately. The best semantics interpolates between noisy truth-conditional values and empirical typicality, with r = .94 by item. Again, cost parameters were not justified: Bayes factors of about 10^21 to 10^27 favour no cost (Sec. 4.4).
- **Exp. 3** (noun level: dalmatian / dog / animal). Superordinate terms are almost never used (< 2%). The basic level is preferred when it suffices. Subordinate mentions rise with the object's typicality for the subordinate term. Model fit is r = .86, and r = .95 when collapsed across targets.
- **Comprehension (Sec. 6.4.2, explicitly speculative).** The authors propose a link: a redundant form should be processed fast to the degree it is *expected* under the pragmatic speaker model ("pragmatic surprisal"). Some studies find that redundancy speeds listeners up (Arts et al. 2011; Paraboni et al. 2007). Others find it slows them down (Engelhardt et al. 2011; Davies & Katsos 2013), and the authors argue that those studies used low-variation scenes where redundancy was surprising.
- **Audience design (Sec. 6.6).** The model stays agnostic about whether redundancy is aimed at the listener or comes from production pressures. On their reading, "redundancy emerges as a property of the communicative situation as a whole."

## Sources it builds on

- Grice (1975), Quantity-1 and Quantity-2. The paper frames itself as rescuing rationality from apparent violations of Quantity-2. (Already covered.)
- Frank & Goodman (2012, *Science*), Goodman & Frank (2016), and Franke & Jäger (2016): the RSA framework.
- The overspecification literature: Pechmann (1989); Sedivy (2003); Engelhardt, Bailey & Ferreira (2006); Gatt et al. (2011, 2014); Koolen et al. (2011, 2013); Westerbeek, Koolen & Maes (2015); Rubio-Fernández (2016); van Gompel et al. (2019).
- The basic level: Rosch et al. (1976); Jolicoeur, Gluck & Kosslyn (1984).
- Graded semantics: Zadeh (1965, fuzzy logic); Rosch (1973, prototypes); Bernardy et al. (2018).
- Generation algorithms: Dale & Reiter (1995), the Incremental Algorithm.
- Surprisal and processing: Hale (2001); Levy (2008); Smith & Levy (2013).

## Works that cite it (influential forward citations)

Counts come from the Semantic Scholar citations API (102 citing records returned), queried 2026-10-28. Crossref lists 57 citations.

- Degen, J. (2023). The Rational Speech Act framework. *Annual Review of Linguistics*.
- Hawkins, R. D., Franke, M., Frank, M. C., Goldberg, A. et al. (2021/2023). From partners to populations: a hierarchical Bayesian account of coordination and convention. *Psychological Review*.
- Rubio-Fernández, P., Mollica, F., & Jara-Ettinger, J. (2021). Speakers and listeners exploit word order for communicative efficiency: a cross-linguistic investigation. *JEP: General*.
- Kravtchenko, E., & Demberg, V. (2022). Informationally redundant utterances elicit pragmatic inferences. *Cognition*.
- Rohde, H., Futrell, R., & Lucas, C. G. (2021). What's new? A comprehension bias in favor of informativity. *Cognition*.
- Sumers, T., Ho, M. K., Griffiths, T., & Hawkins, R. D. (2023/2024). Reconciling truthfulness and relevance as epistemic and decision-theoretic utility. *Psychological Review*.
- Rehrig, G., Cullimore, R., Henderson, J. M., & Ferreira, F. (2020). When more is more: redundant modifiers can facilitate visual search. *Cognitive Research: Principles and Implications*.
- Kreiss, E., & Degen, J. (2020). Production expectations modulate contrastive inference. *CogSci 2020*.

UNVERIFIED: the exact volume and page details of these citing works. I took titles, years and venues from Semantic Scholar metadata and did not open the papers themselves.

## Relevance to AI answer style (precision vs compression)

- **The paper gives a formal criterion for when an extra word is not padding.** A word earns its place when the term that is "sufficient" on its own is imprecise (low semantic value) for this listener. The extra word then cuts the listener's chance of landing on the wrong referent. The criterion is about the listener's recovery probability, not word count. In the paper's terms, *precision* means choosing the term with the highest semantic value. *Compression* means dropping a term on the assumption that a Boolean "sufficient" word will be read exactly. That assumption fails when the word is vague.
- **Which extra word helps matters.** Only a redundant modifier that is *more precise* than the sufficient one adds information (colour on top of size). Adding a vague word on top of a precise one adds nothing (size on top of colour). For an assistant this means adding the exact identifier, such as a file path, function name, version number or concrete value, next to a vague description ("the config"). It does not mean adding another vague paraphrase next to an exact term.
- **Context complexity raises the value of redundancy.** The more candidate referents the scene holds, the more a precise redundant feature pays off: many files, many similar functions, a long conversation. In a small, unambiguous context the same redundancy is surprising and, on the evidence the paper reviews, can slow the listener down.
- **Atypical facts deserve explicit marking. Typical ones do not.** People say "blue banana" but never "yellow banana". An assistant should state the non-default property (an unusual flag, a non-standard version, an exception) and leave defaults unstated.
- **The basic level is the default noun.** Use the basic-level term unless the context contains a competitor that forces the subordinate term, or the item is atypical for its basic category. Superordinate terms ("the thing", "the component", "the issue") are almost never what people choose, because they carry too little information.

## Candidate rules for the harness

1. **Redundancy must be more precise than what it backs up.** When a short reference could be misread (a vague noun, or several plausible candidates in context), add the exact identifier (path, name, number, version) next to it. Never add a second paraphrase of the same vagueness.
2. **Mark the atypical, omit the default.** Explicitly state properties that differ from what the reader would assume. Do not restate properties the reader would infer anyway.
3. **Prefer basic-level terms, and go more specific only when the context has a competitor.** Use the plain category word ("the test", "the endpoint") when it is unique in context. Use the specific name when a similar item is in play. Avoid umbrella words ("the thing", "stuff", "the issue") that leave the referent open.

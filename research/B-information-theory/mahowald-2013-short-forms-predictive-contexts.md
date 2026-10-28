# Mahowald, Fedorenko, Piantadosi & Gibson (2013): Speakers choose shorter words in predictive contexts

> Substitution note: this crawl task assigned Levy & Jaeger (2007) with Jaeger (2010). Both are already covered in `levy-jaeger-2007-uniform-information-density.md`, so this note covers the closest work from the same line that the crawl has not yet covered. It extends uniform information density (UID) from optional function words ("that") to the choice between near-synonymous content words.

## Citation
Mahowald, K., Fedorenko, E., Piantadosi, S. T., & Gibson, E. (2013). Info/information theory: Speakers choose shorter words in predictive contexts. *Cognition*, 126(2), 313-318. doi:10.1016/j.cognition.2012.09.010 (PMID 23116925). Brief article.
- Full text read (author copy of the accepted article, 6 pp.): https://tedlab.mit.edu/tedlab_website/researchpapers/Mahowald_et_al_2013_Cogn.pdf
- Publisher page: https://doi.org/10.1016/j.cognition.2012.09.010 (closed access according to Semantic Scholar; 176 citations there as of 2026-10).

## Core claim
Near-synonyms that differ in length, such as *chimp/chimpanzee*, *math/mathematics* and *exam/examination*, are not interchangeable from an information-theoretic point of view. The short form occurs in more predictable contexts, and speakers actively *choose* it when the context already points to the meaning. They choose the long form when the context does not. So even content words, and not only optional function words or phonetic detail, are used to keep the information rate roughly constant.

## Key evidence
- **Materials.** Candidate short/long pairs were drawn from CELEX, WordNet and Marchand (1966). A pair qualified only if both forms could be used interchangeably. Ambiguous short forms such as *ad* (compare *ad infinitum*) and multi-word forms such as *US/United States* were kept out of the corpus study and used only in the experiment.
- **Corpus study (22 pairs).** Mean surprisal came from an unsmoothed Google trigram model (the context is the two preceding words), the same data as Piantadosi et al. 2011.
  - Long forms averaged 9.21 bits and short forms 6.90 bits (Wilcoxon signed-rank, P = .004). The long form had higher surprisal in 18 of 22 pairs.
  - A regression on the log-frequency difference still left an intercept of 1.45 bits (t = 2.76, P = .01). So at equal frequency, the long form is still 1.45 bits more surprising. Predictability matters beyond frequency.
- **Behavioral study.** 58 native English speakers on Mechanical Turk did a forced choice of which form "sounded more natural". Each item had a supportive version, "Susan was very bad at algebra, so she hated... math / mathematics", and a neutral version, "Susan introduced herself to me as someone who loved...". The two contexts were matched for length, and no item used a fixed phrase such as "final exam".
  - Manipulation check (n = 80, free completion): the target word was supplied after 52.4% of supportive contexts and 1.6% of neutral ones (b = 5.22, z = 13.09).
  - Result: the short form was chosen 67% of the time after supportive contexts and 56% after neutral ones (mixed-effects logistic regression, b = .75, z = 3.65, P < .001). There was also an overall baseline preference for the short form (b = .77, P < .01).
- **Argument against artefacts.** Because the experiment used novel contexts, the effect cannot just be learned collocations. The authors argue that the result rebuts the random-typing explanation of the length-information link (Ferrer i Cancho & Moscoso del Prado Martín 2011), since random typing predicts no effect of context on a speaker's choice.
- **Limits (the authors' own and mine).** The effect is modest: an 11-point shift on a scale where the short form is already the default. The corpus context is only two words. The task asks for judgments of naturalness, not spontaneous production. All the pairs are clipped nouns, many of them informal (*porn*, *frat*, *carbs*), so register and length are confounded. That last point is my observation, not the authors'.

## Sources it builds on
- Zipf (1935, 1949): the principle of least effort and the link between frequency and length.
- Shannon (1948).
- Piantadosi, Tily & Gibson (2011, PNAS), already covered in this crawl. This paper is its controlled, causal follow-up.
- Levy & Jaeger (2007); Jaeger (2006, 2010); Frank & Jaeger (2008), on UID through *that*-omission and contraction.
- Aylett & Turk (2004), the Smooth Signal Redundancy Hypothesis; Bell et al. (2003); Genzel & Charniak (2002), entropy rate constancy; van Son & Pols (2003).
- Hale (2001) and Levy (2008), surprisal as processing cost.
- Marchand (1966) on clippings: such forms "originate ... where a hint is sufficient to indicate the whole".

## Works that cite it (influential forward citations)
- **Cai, Duan, Haslett, Wang & Pickering**, "Do large language models resemble humans in language use?", arXiv:2303.08014 (verified, full text read). They re-ran the Mahowald design on ChatGPT and Vicuna. Neither model was significantly more likely to choose the short form after predictive preambles: ChatGPT 0.26 vs 0.20, p = .101; Vicuna 0.31 vs 0.31, p = .444. They describe this as a clear divergence from humans. The same paper cites a human replication, Dunn & Cai (2023), which was not opened (UNVERIFIED).
- **Li, Scontras & Futrell (2023)** applied the design to Chinese abbreviations and reportedly found the same effect. The PDF (https://sites.socsci.uci.edu/~rfutrell/papers/li2023chinese.pdf) could not be retrieved because of a TLS error and a 503 response, so the venue and numbers are UNVERIFIED.
- Mahowald's 2016 MIT dissertation develops this line of work (https://dspace.mit.edu/handle/1721.1/106435). It was not read because the download was rate-limited (UNVERIFIED).
- Gibson et al. (2019, TiCS), already covered, cites it as evidence for efficiency in the lexicon.

## Relevance to AI answer style
- **Where the line between precision and compression falls for word choice.** A shorter word, abbreviation or clipped term is lossless only when context has already made its meaning predictable. Then the short form carries everything the long form would. In a neutral context, where the meaning is not yet set up, the longer and more explicit form is what both humans and an efficient code prefer. The same logic gives a rule for acronyms and jargon: spell the term out at first mention, where it is unpredictable, and use the short form afterwards, where it is predictable.
- **It flags a known LLM gap.** Cai et al. found that ChatGPT and Vicuna do *not* show this human sensitivity to context. They pick short and long forms without regard to predictability. So a harness rule here is not redundant with what the model already does: it corrects a measured deviation from how people write.
- **It does not license replacing precise terms with vague short ones.** The pairs were near-synonyms. The paper says nothing in favour of a short word that means something *different*. Precision first, then length.

## Candidate rules for the harness
1. **Long form first, short form after.** Use the full, explicit term (the expanded acronym, *the configuration file* rather than *the config*) at first mention, or wherever context does not yet point to it. Switch to the short form only once the reader can predict what it refers to.
2. **Shorten only true synonyms.** Swap a long form for a shorter one only when both mean the same thing in this context. Never shorten into a word that is broader, ambiguous (*ad*, *ref*) or more casual than the register calls for.
3. **Spend length where surprise is.** Give more words to the parts of the answer the user cannot predict (the new term, the unexpected result) and fewer to the parts they can (restating their question, the setup they gave you).

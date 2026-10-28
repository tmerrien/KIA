# Genzel & Charniak (2002): Entropy Rate Constancy in Text

**Substitution note.** This note was assigned Aylett & Turk (2004), but a note for that paper already exists (aylett-turk-2004-smooth-signal-redundancy.md). Genzel & Charniak (2002) replaces it. It was already queued (p4, FOLLOW) on the same branch. It cites Aylett (1999) as the speech-side precedent and moves the same principle from speech to written text.

## Citation
Genzel, D., & Charniak, E. (2002). Entropy rate constancy in text. *Proceedings of the 40th Annual Meeting of the Association for Computational Linguistics (ACL 2002)*, Philadelphia, July 2002, pp. 199-206. ACL Anthology P02-1026. doi:10.3115/1073083.1073117 (the DOI comes from the standard ACL/ACM mapping and was not resolved: UNVERIFIED). Full text read (8 pp.): https://aclanthology.org/P02-1026.pdf

## Core claim
Information theory says that the most efficient way to send information through a noisy channel is at a constant rate. If writers communicate efficiently, then the entropy of each word *given all preceding text* should stay constant across a document. Because the context grows as a text goes on, the entropy of each sentence measured *without* that context should therefore **rise** with sentence position. The authors find that it does.

## Key evidence
- **Derivation (Sec. 3).** H(X_i | C_i, L_i) = H(X_i | L_i) − I(X_i ; C_i | L_i). Here C_i is all the words of the preceding sentences and L_i is the words earlier in the same sentence. The mutual information with prior context grows as the document goes on. If the left side stays constant, the context-free term H(X_i | L_i) must grow with sentence number. That term can be estimated with local models.
- **Three estimators, one trend.** (1) A trigram model on Penn Treebank WSJ (sections 0-20 train, 21-24 test). (2) Charniak's (2001) statistical parser, which gives lower, better estimates with the same upward trend (Fig. 1: about 7 to 8.4 bits/word over sentences 1-25). (3) The non-parametric Kontoyiannis et al. (1998) estimator: 3M words of 1988 WSJ for training, 23M words of 1987 WSJ for testing (Fig. 2). In all three, sentences seen out of context get harder as the article goes on. The data for later sentence positions is thinner because most articles are short.
- **One anomaly.** The second sentence dips on the non-parametric measure. The authors trace this to formula: 1.5% of second sentences begin "the terms were not disclosed". Boilerplate is low-entropy by definition.
- **Lexical vs. non-lexical causes (Sec. 4.4, Fig. 3).** Per-word entropy rises for nouns, verbs, determiners *and* prepositions. A cache model, which credits words repeated from earlier sentences (λ = 0.1), lowers entropy for nouns, a little for verbs, and not at all for closed-class words. The rise therefore has two parts. One is *which* words appear (open-class content shifts and repeats). The other is *how* words are used: grammatical patterns grow less predictable in isolation as context builds up.
- **Open questions the authors pose.** Is the previous sentence always the most useful context? For news, is it the first sentence? Can entropy measures detect the given-new distinction and other pragmatic relations?

## Sources it builds on
- Shannon (1948): constant-rate transmission is optimal for a noisy channel (already covered: shannon-1948).
- Aylett (1999), ICPhS: less predictable words are pronounced more carefully and for longer. This is the precursor of Aylett & Turk (2004).
- Kontoyiannis (1996) and Kontoyiannis et al. (1998): non-parametric entropy estimation. The 1996 report found a consistent pattern across 5 blocks of Jane Austen.
- Plotkin & Nowak (2000): language evolution and information theory.
- Kuhn & De Mori (1990): cache language models. Charniak (2001): the parser.
- The authors credit Daniel Jurafsky with suggesting the interpretation of the data.

## Works that cite it (forward)
Semantic Scholar lists 228 citing papers (API, retrieved 2026-10-28). The citation count of the paper itself is UNVERIFIED because the API rate-limited that call.
- Genzel & Charniak (2003), "Variation of entropy and parse trees of sentences as a function of the sentence number", EMNLP 2003. Their own follow-up.
- Keller (2004), "The entropy rate principle as a predictor of processing effort: An evaluation against eye-tracking data", EMNLP 2004 (ACL W04-3241). Tests the principle against reading effort.
- Levy & Jaeger (2006/2007), NIPS (already covered), and Jaeger (2010), Cognitive Psychology 61(1), 23-62. These generalise the principle to Uniform Information Density (UID) inside the sentence.
- Mahowald et al. (2013) and Gibson et al. (2019), both already covered. Meister et al. (2021), "Revisiting the UID hypothesis", EMNLP (already covered). Meister et al. find that the strongest trend is regression toward a *language-wide* mean surprisal, rather than toward a sentence or document mean (arXiv:2109.11635 abstract read).
- Doyle & Frank (2015), NAACL: shared common ground influences information density in microblog texts. Xu & Reitter (2018), Cognition 170: information density converges in dialogue. Both titles come from the Semantic Scholar listing; their contents are UNVERIFIED.
- **Verma, Tomlin & Klein (2023), "Revisiting Entropy Rate Constancy in Text", EMNLP 2023 (arXiv:2305.12084).** This is a negative replication. Re-run with neural language models, the study *fails to find clear evidence* of entropy rate constancy across datasets, model sizes and languages (abstract read). The 2002 rise may partly reflect the weakness of n-gram and parser models at using context.
- **Tsipidi, Nowak, Cotterell, Wilcox, Giulianelli & Warstadt (2024), "Surprise! UID isn't the whole story", EMNLP 2024 (arXiv:2410.16062).** Information rate fluctuates with position in the *hierarchical discourse structure*: the Structured Context Hypothesis (abstract read).
- Giulianelli & Fernández (2021), CoNLL, and Giulianelli et al. (2021), EMNLP: these study information transmission as a function of discourse context and in task-oriented dialogue. Titles only; contents UNVERIFIED.

## Relevance to AI answer style
- **Density should be set by context, not fixed per sentence.** The principle predicts that a good text *looks* denser out of context as it goes on. Later sentences can lean on what earlier ones set up. That is precision, not compression: each later sentence carries new information because shared ground now does the work that words once had to do. An answer that re-explains a term in sentence 6 that it defined in sentence 1 wastes the reader's channel. An answer that uses an undefined term in sentence 1 overloads it.
- **The cache result separates two levers.** Repeating the same content words (nouns) is what makes later text predictable, and that is good: it keeps terms consistent, as in terminology practice and the one-term-one-concept rule. The rise in entropy for closed-class words shows that structure gets richer too. So hold *terms* constant and let *structure* carry the new information.
- **Boilerplate is visible as low entropy.** "The terms were not disclosed" is the newswire version of "Great question!". A phrase predictable from genre alone carries almost no information and is the first thing to cut.
- **A caution.** The strongest form of the claim, that entropy is constant across a document, did not replicate with neural models (Verma et al. 2023). Tsipidi et al. (2024) show that rate varies with discourse structure, for example section openings versus elaborations. Use the principle as a heuristic ("don't front-load, don't repeat what's established"), not as a law requiring flat density. Opening sentences that orient the reader are expected to be lower in information.

## Candidate rules for the harness
1. **Define once, then lean on it.** Establish a term or premise the first time it is needed. After that, use the same term unglossed and do not re-explain it. Later sentences should add new information, not restate context the reader already has.
2. **Keep vocabulary fixed and let content advance.** Reuse the exact key term rather than a synonym (the cache effect makes the text more predictable where predictability helps). Put the novelty in claims, conditions and values, not in new wording for old concepts.
3. **Cut genre-predictable formulas.** A sentence that any answer of this type could contain ("Here's an overview", "Hope this helps", "Let me know if you have questions") carries almost no information. Delete it unless it does a structural job, such as marking a section boundary.

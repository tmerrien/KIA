# Verma, Tomlin & Klein (2023): Revisiting Entropy Rate Constancy in Text

**Substitution note.** This note was assigned Genzel & Charniak (2002). A note for that paper already exists (genzel-charniak-2002-entropy-rate-constancy.md). It lists this paper as the key negative replication but had read only the abstract. This note covers the replication from the full text. It tests whether the 2002 rise in context-free entropy actually means constant entropy in context.

## Citation
Verma, V., Tomlin, N., & Klein, D. (2023). Revisiting Entropy Rate Constancy in Text. *Findings of the Association for Computational Linguistics: EMNLP 2023*, Singapore, December 2023, pp. 15537-15549. doi:10.18653/v1/2023.findings-emnlp.1039. ACL Anthology: https://aclanthology.org/2023.findings-emnlp.1039/ (venue, pages and DOI checked against the Anthology .bib). Full text read: arXiv:2305.12084v2 (18 Oct 2023), https://arxiv.org/abs/2305.12084

## Core claim
Genzel & Charniak (2002) showed only that entropy *without long context*, H(X_i | L_i), rises through a document. That is a necessary condition for entropy rate constancy, not a sufficient one. When GPT-2 models, which do use long context, measure H(X_i | C_i, L_i) directly, the per-word surprisal is not constant. It **falls sharply over the opening words of a document**, then levels off or keeps declining slowly. The paper therefore finds "no clear evidence" for entropy rate constancy.

## Key evidence
- **The logical gap (Sec. 2.3).** H(Y_i) = H(X_i | L_i) − I(X_i ; C_i, L_i). A rising H(X_i | L_i) is compatible with a rising, flat or falling H(Y_i), depending on how fast the mutual information with context grows. The 2002 paper "confirmed a prediction of entropy rate constancy but did not provide direct evidence for the hypothesis itself".
- **Replication plus a direct measure.** The authors used smoothed trigram models (λ1 = 0.5, λ2 = 0.3, following Genzel & Charniak 2003) and GPT-2 (124M to 1.5B, with and without fine-tuning). They analysed Penn Treebank, the NYT Annotated Corpus (100K/10K/10K articles), CC News filtered to articles after 2018 (to avoid contamination of GPT-2's training data), and Arabic Al-Ittihad (with AraGPT-2 Mega). They measured surprisal per *word* (summing subword log-probs) over the first 500 words. Working per word avoids the sentence-length confound that Keller (2004) and Xu & Reitter (2018) pointed out.
- **Results (Figs. 1, 2, 4).** The trigram entropy rises in every corpus, which replicates 2002. The GPT-2 surprisal falls sharply at the start in every corpus. After that it varies: in CC News it rises sharply and then stays roughly constant, in NYT it declines asymptotically, and in Arabic it rises slowly and then declines. The trend holds at all four model sizes, and GPT-3 davinci shows the same shape (Fig. 7, Appendix C).
- **Fine-tuning (Fig. 5).** Fine-tuning lowers surprisal most at the opening of a document. The authors read this as domain adaptation: a model that has not been fine-tuned must work out the genre from the first words alone.
- **Titles (Fig. 6).** Conditioning on the headline makes the first words much more predictable, but after about 100 words it helps "only marginally". A short title carries limited information.
- **Interpretive caveat (Sec. 7).** This does not refute UID. Human surprisal may be computed over a *lossy* memory of context (Futrell et al. 2020), whereas an LLM's context is lossless. Smaller models such as GPT-2 small predict human reading times better (Shain et al. 2022). An entropy rate cannot fall for ever, because surprisal is bounded below by zero. The authors suggest future work on information structure, comparing ledes with conclusions.

## Sources it builds on
- Genzel & Charniak (2002, 2003). Shannon (1948). Cover & Thomas (2012): the authors point out that their sense of "entropy rate" (a trend over position) differs from the standard information-theoretic limit.
- UID and smooth-signal-redundancy: Aylett (1999), Aylett & Turk (2004), Jaeger & Levy (2007), Jaeger (2010), Meister et al. (2021). All but Jaeger (2010) are already covered in this track.
- Keller (2004), EMNLP: the entropy rate principle tested against eye-tracking data. Xu & Reitter (2018), Cognition 170: information density converges in dialogue.
- Giulianelli & Fernández (2021), CoNLL, and Giulianelli, Sinclair & Fernández (2021), EMNLP. These use GPT-2 and claim to support constancy in the Penn Treebank but not in dialogue.
- Futrell, Gibson & Levy (2020), Cognitive Science 44(3): lossy-context surprisal. Shain et al. (2022): logarithmic effects of predictability on reading time.
- Khandelwal et al. (2018), "Sharp nearby, fuzzy far away", and O'Connor & Andreas (2021): how language models use context.

## Works that cite it (forward)
OpenAlex lists 2 citing works (W4389524051, retrieved 2026-10-28). That figure is probably an undercount. The Semantic Scholar count is UNVERIFIED because the API rate-limited the call.
- **Tsipidi, Nowak, Cotterell, Wilcox, Giulianelli & Warstadt (2024), "Surprise! Uniform Information Density Isn't the Whole Story: Predicting Surprisal Contours in Long-form Discourse", EMNLP 2024 (arXiv:2410.16062).** The citation is confirmed in its text and reference list. The paper cites Verma et al. as evidence against strict constancy. It proposes the Structured Context Hypothesis: information rate varies with position in a *hierarchical* discourse structure, and deeply nested predictors explain more than shallow ones. Abstract and citation context read.
- Other citing works are UNVERIFIED.

## Relevance to AI answer style
- **The density of an answer is not flat. It peaks early, while the reader is still orienting.** The first words of a text are the least predictable because the reader does not yet know the topic, genre or frame. Fine-tuning (knowing the genre) and titles (knowing the topic) both cut opening surprisal most. For an answer, this means the first sentence does the most work in reducing uncertainty. It should establish the frame, which is the direct answer or the governing term, rather than spend that slot on filler. This is *precision* at the opening: one exact framing term lowers the cost of everything after it.
- **Headlines help less than one might expect.** A title's benefit is gone after about 100 words. A one-line heading cannot replace a substantive opening sentence. Do not assume a bold label has set up the context.
- **Constancy is a heuristic, not a target.** The 2002 note's rule to lean on established context still stands, since later text really is more predictable given context. But the evidence does not justify forcing uniform density sentence by sentence. Rate varies with discourse structure (Tsipidi et al. 2024), so section openings may legitimately run denser in new framing and elaborations lighter.
- **The reader's surprisal is not the model's.** A model with perfect memory finds its own later sentences highly predictable. A human reader, whose memory is lossy, does not (Futrell et al. 2020; Shain et al. 2022). An assistant that judges redundancy by its own context will under-repeat. A brief re-anchor to a term defined far back is justified for a human reader. This is the boundary between precision and over-compression.

## Candidate rules for the harness
1. **Spend the first sentence on the frame.** Open with the direct answer or the governing term that tells the reader what kind of answer follows. The opening is where uncertainty is highest and where each word reduces it most. Never open with throat-clearing.
2. **Don't let a heading do the opening's job.** A heading or bold label orients the reader only briefly. Follow it with a sentence that states the claim, rather than assuming the label set the context.
3. **Judge redundancy by the reader's memory, not yours.** In a long answer, restate a key term's referent briefly (a few words, not a re-definition) when it was last established far back or in a different section. Do not re-explain anything within the same paragraph.

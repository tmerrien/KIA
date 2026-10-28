# Meister et al. (2021). Revisiting the Uniform Information Density Hypothesis

**Citation:** Meister, C., Pimentel, T., Haller, P., Jäger, L., Cotterell, R., & Levy, R. (2021). Revisiting the Uniform Information Density Hypothesis. *Proceedings of the 2021 Conference on Empirical Methods in Natural Language Processing (EMNLP 2021)*, 963-980. Association for Computational Linguistics.
**Link:** https://aclanthology.org/2021.emnlp-main.74/ (PDF: https://aclanthology.org/2021.emnlp-main.74.pdf). Code: https://github.com/rycolab/revisiting-uid
**Read:** Full text, pp. 963-971 (main body and the start of the references). Appendices were skimmed but not checked in detail.

## Core claim
UID applies to how readers judge text, not only to how speakers produce it. When surprisal is spread unevenly across a sentence, readers rate the sentence as less acceptable. Reading times fit a linear effect of surprisal, but a weakly super-linear one fits as well. Among the measures tested, the one that explains the data best is a super-linear cost of per-word surprisal. The next best is variance around the mean surprisal of the whole *language*. Measures of local smoothness, or of variance around the sentence's own mean, do worse. So the pressure looks like a pull toward a typical, channel-like information rate.

## Key evidence
- **Model (Eq. 3):** Effort(u) ∝ Σ s(u_n)^k + c·N, with k > 1. For a fixed length and fixed total information, a uniform surprisal profile is the unique way to minimise this effort (proof in App. A). Setting k = 1 gives back plain surprisal theory, under which "all ways of distributing that information" cost the same effort. That includes "packing it all into a single, short utterance" (p. 964-965).
- **Data:** Reading times come from Natural Stories and Brown (self-paced reading) and from Provo and Dundee (eye-tracking), plus Dutch GECO in an appendix. Acceptability judgments come from CoLA and from the BNC dataset of Lau et al. (2017). Surprisal is estimated with GPT-2, TransformerXL, BERT and a 5-gram model. The measure of fit is ΔLogLik on held-out data, averaged over 10-fold cross-validation.
- **Acceptability:** For acceptability, k > 1 fits better than k = 1. A Bonferroni-corrected paired t-test rejects k = 1 at α = 0.001 for every model except the n-gram one (p. 969). With GPT-2 surprisal (Table 1), the ΔLogLik values (in 10^-2 nats) are:
  - CoLA: 6.18 at k = 1.25, against 5.28 at k = 1.
  - BNC: 14.35 at k = 1.25, against 13.89 at k = 1.
- **Reading times:** k slightly above 1 often fits as well as k = 1 or better, especially on Provo. The null hypothesis (k = 1) is never rejected, so the linear account stands (p. 969-970).
- **Operationalizations (Table 1):** Super-linear (k ≥ 1) and Variance(lang) predict best. Variance(sent), LocalVariance (squared surprisal change between neighbouring words) and Max surprisal are weaker. Sentence-level Rényi or Shannon entropy predicts poorly.
- **Scope (Fig. 4):** Per-word reading times are better predicted by variance around a mean taken over a larger context than by variance around the mean of the previous 1-4 words. The order runs from worst to best: the previous few words, then the sentence, the document, and the language.
- **Their own caveat on cadence (p. 966):** Writers mix short, high-information sentences with longer ones, and "some would argue that such fluctuations make text easier to read." The authors note that they did this deliberately in the paper. Their results still favour a language-level mean.
- **Limitations:** The data cover English and Dutch only and are written only, with no speech. Sentences are the unit of analysis. Surprisal estimates from the language models are proxies for the true values.

## Sources it builds on
- Fenk & Fenk (1980), *Zeitschrift für Experimentelle und Angewandte Psychologie* 27(3), 400-414 (origin of the constancy idea)
- Genzel & Charniak (2002), Entropy rate constancy in text, ACL 2002, 199-206
- Aylett & Turk (2004), smooth signal redundancy hypothesis, *Language and Speech* 47(1)
- Levy & Jaeger (2007); Jaeger (2010) [already covered]; Levy (2005), PhD thesis, ch. 2 (source of the super-linear Eq. 3)
- Hale (2001); Levy (2008) (surprisal theory); Smith & Levy (2013), *Cognition* (linear surprisal effect on reading times)
- Collins (2014), Information density and dependency length as complementary cognitive models, *J. Psycholinguistic Research* 43(5), 651-681 (local and global variance, max surprisal)
- Frank & Jaeger (2008), CogSci; Mahowald et al. (2013) (lexical UID)
- Coupé et al. (2019), *Science Advances* 5(9) (cross-language information rate of about 39 bits/s). The figure comes from my prior knowledge and was not checked against that paper (UNVERIFIED).
- Lau, Clark & Lappin (2017), *Cognitive Science* 41(5); Warstadt et al. (2019) CoLA

## Works that cite it (forward)
Citation lists come from OpenAlex (`cites:W3204890648`), which counted 63 citing works on 2026-10-28. That count is probably low; Semantic Scholar was rate-limited and gave no number. Of the works below, only the Tsipidi abstract was opened.
- Shain, Meister, Pimentel, Cotterell & Levy (2024), Large-scale evidence for logarithmic effects of word predictability on reading time, *PNAS*. This is the most-cited follow-up. Per its title it finds logarithmic (linear-in-surprisal) effects, which weakens the super-linear reading-time reading of UID (title only, UNVERIFIED in detail).
- Wilcox, Pimentel, Meister, Cotterell & Levy (2023), Testing the Predictions of Surprisal Theory in 11 Languages, *TACL*.
- Tsipidi, Nowak, Cotterell, Wilcox, Giulianelli & Warstadt (2024), Surprise! Uniform Information Density Isn't the Whole Story: Predicting Surprisal Contours in Long-form Discourse, EMNLP 2024, 18820-18836 (abstract read: https://aclanthology.org/2024.emnlp-main.1047/). The abstract proposes that information rate rises and falls with position in the hierarchical structure of a discourse.
- Clark, Meister, Pimentel, Hahn, Cotterell, Futrell & Levy (2023), A Cross-Linguistic Pressure for Uniform Information Density in Word Order, *TACL*.
- Futrell & Hahn (2022), Information Theory as a Bridge Between Language Function and Language Form, *Frontiers in Communication*.
- Hewitt, Manning & Liang (2022), Truncation Sampling as Language Model Desmoothing, Findings of EMNLP (shows a link to LLM decoding).
- Giulianelli et al. (2023), Information Value: Measuring utterance predictability as distance from plausible alternatives, EMNLP.

## Relevance to AI answer style
- **Compression has a measurable cost to readers.** Extreme compression, such as dropped articles and connectives or telegraphic fragments, piles surprisal onto a few words. Under a super-linear cost (k > 1), those spikes cost readers more than the same information spread evenly, and readers rate such sentences as less acceptable. This gives the PRECISION/COMPRESSION distinction an information-theoretic basis. A precise term carries an idea at a predictable, normal rate. Compression spends fewer words, and each remaining word carries a spike.
- **Padding also deviates from the target.** The language-mean variance measure penalises deviation in both directions, so stretches of near-zero surprisal (filler, restated questions, boilerplate hedges) also move text away from the typical rate. The best fit was regression toward a *language-wide* mean. That points to one global target rate rather than permission to swing between dense and sparse within an answer.
- **Choosing the target.** The "typical rate" is set by the reader's language model. Text that is dense in jargon is high-surprisal for a novice and normal for an expert, which links to the expertise reversal effect (Kalyuga et al. 2003, already covered). The paper does not test this link, so it is my inference.
- **Varied cadence is not ruled out.** The authors' own aside on cadence, and Tsipidi et al. (2024), suggest that rate shifts at discourse boundaries are acceptable. The rule should therefore be "no spikes within a sentence", not "flat everywhere".

## Candidate rules for the harness
1. **No surprisal spikes.** Do not pack a sentence's new information into one dense noun stack or an undefined acronym. If a sentence carries a hard term, keep its other parts predictable, or define the term on first use. Do not delete the articles, verbs or connectives that make the term parseable.
2. **Keep a steady, typical rate in both directions.** Cut filler that adds near-zero information, such as restating the question, stock hedges or "it's important to note". Do not cut function words, and do not turn sentences into fragments, to look concise. Aim for each sentence to carry about the same amount of new information.
3. **Set the rate for the reader.** Judge density against what this reader can predict. For a novice, spell out the step an expert would skip. For an expert, skip the definitions they would find predictable. (This is my inference from the language-model-relative definition of surprisal; the paper does not test it.)

# Piantadosi, Tily & Gibson (2011). Word lengths are optimized for efficient communication

**Citation:** Piantadosi, S. T., Tily, H., & Gibson, E. (2011). Word lengths are optimized for efficient communication. *Proceedings of the National Academy of Sciences*, 108(9), 3526–3529. https://doi.org/10.1073/pnas.1012551108
Open access: https://pmc.ncbi.nlm.nih.gov/articles/PMC3048148/ (read via PMC; metadata checked against Crossref.)

## Core claim
Zipf held that word length tracks word frequency (the principle of least effort). Across languages, however, a word's average information content (its average surprisal given the preceding words) predicts its length better than its frequency does. Lexicons are therefore optimized for efficient communication *in context*, which takes the statistical dependencies between words into account.

## Key evidence
- **Data:** 11 European languages (Czech, Dutch, English, French, German, Italian, Polish, Portuguese, Romanian, Spanish, Swedish). The Google Web 1T n-gram counts were used, with a lexicon of the 25,000 most frequent strings that also appear in OpenSubtitles (OPUS). The English results were replicated on the BNC with a held-out, Kneser–Ney-smoothed model.
- **Measure:** A word's information content is its mean of −log P(word | previous n−1 words) across all its occurrences. Length was measured in orthographic characters, and also in phones and syllables (CELEX) for English, German and Dutch.
- **Results:** With 2-gram models, information content correlated with length more strongly than frequency did in all 11 languages. With 3-gram models (the headline result) it did so in 10 of 11 (Polish was the exception), and with 4-gram models in 7 of 11, which the authors partly attribute to estimation error. Controlling for information content often drove frequency's partial correlation with length close to zero. BNC English: frequency–length ρ = 0.121; information content–length ρ = 0.161 (2-gram) and 0.168 (3-gram).
- **Caveat in the data:** The 5–20% least informative words do not follow the trend. They are often long but predictable parts of collocations.

## Sources it builds on
Zipf (1936, 1949), the principle of least effort; Aylett & Turk (2004), the smooth signal redundancy hypothesis; Levy & Jaeger (2007) and Jaeger (2010), uniform information density and syntactic reduction; Frank & Jaeger (2008); Manin (2006); Piantadosi, Tily & Gibson (2009), the Communicative Lexicon Hypothesis. (The PMC reference list was checked: it does not cite Shannon 1948 or Genzel & Charniak 2002 directly.)

## Influential forward citations (OpenAlex, by citation count, fetched 2026-10-28)
- Piantadosi (2014). Zipf's word frequency law in natural language: a critical review. *Psychon. Bull. Rev.* doi:10.3758/s13423-014-0585-6
- Smith & Levy (2013). The effect of word predictability on reading time is logarithmic. *Cognition*. doi:10.1016/j.cognition.2013.02.013
- Piantadosi, Tily & Gibson (2012). The communicative function of ambiguity in language. *Cognition*. doi:10.1016/j.cognition.2011.10.004
- Mahowald et al. (2013). Info/information theory: speakers choose shorter words in predictive contexts. *Cognition* 126, 313–318.
- Lieder & Griffiths (2020). Resource-rational analysis. *BBS*. doi:10.1017/S0140525X1900061X

## Relevance to AI answer style
- **Length should track how much the reader can predict, not how common a word is.** Spend words where the content is surprising to this reader, and abbreviate where context already predicts it. A rare technical term that is the only word naming the idea carries a lot of information. It is not padding: using it is PRECISION.
- **Short forms are allowed only where the context makes them predictable.** This is the chimp/chimpanzee effect (Mahowald 2013, cited here via Gibson et al. 2019). An abbreviation or pronoun works after the full term has been established. Used before that, it destroys meaning, which is COMPRESSION.
- **Predictable filler is long, low-information language.** The words that buck the trend are long but predictable. The prose equivalent is stock phrases ("it is important to note that"), which take space and carry almost no information. Cut them.

## Candidate rules for the harness
1. **Spend words on what the reader can't predict.** Put the detail into the parts of the answer that are new to this user. Shrink or drop the parts the conversation already makes obvious.
2. **Introduce, then shorten.** Use the full, exact term the first time. Switch to a short form (acronym, pronoun, clipped name) only after context makes it unambiguous.
3. **Cut predictable stock phrases.** Delete stock framing phrases whose content the reader could predict from the first two words.

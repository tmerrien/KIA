# Shannon (1951): the reader as predictor, and the "reduced text"

## Citation

Shannon, C. E. (1951). Prediction and entropy of printed English. *Bell System Technical Journal*, 30(1), 50-64. https://doi.org/10.1002/j.1538-7305.1951.tb01366.x

Read in full (all 15 BSTJ pages). Two copies were used: a scan with a text layer at https://www.princeton.edu/~wbialek/rome/refs/shannon_51.pdf, and the Internet Archive BSTJ scan https://archive.org/details/bstj30-1-50, whose OCR text (https://archive.org/download/bstj30-1-50/bstj30-1-50_djvu.txt) was used to check a two-column page (p. 55) that the first copy garbled. Page numbers below are BSTJ pages.

This note was written in place of Shannon (1948) because `shannon-1948-source-channel-redundancy.md` already exists in this track. That note lists the 1951 paper as an UNVERIFIED forward citation. It is now verified.

## Core claim

A fluent reader carries an implicit statistical model of the language, so the information in text can be measured by how well that reader predicts the next letter. With up to 100 letters of context, printed English carries roughly one bit per letter, which means about 75% redundancy. That is well above the 50% Shannon estimated in 1948 from statistics over eight letters or fewer. A text from which every correctly predicted letter has been removed (the "reduced text") still holds all of the information, but only for a receiver whose predictor is identical to the sender's.

## Key evidence (from the text)

- **Long-range context drives redundancy up** (p. 50). "in ordinary literary English, the long range statistical effects (up to 100 letters) reduce the entropy to something of the order of one bit per letter, with a corresponding redundancy of roughly 75%. The redundancy may be still higher when structure extending over paragraphs, chapters, etc. is included." Shannon adds that at these lengths the estimates "become more erratic and uncertain, and they depend more critically on the type of text involved" (pp. 50-51).
- **N-gram ladder** (pp. 51-54). For the 26-letter alphabet: F0 = 4.70, F1 = 4.14, F2 = 3.56, F3 = 3.3 bits per letter. Using Zipf's law over word frequencies, word-level entropy comes to 11.82 bits per word, or 2.62 bits per letter at 4.5 letters per word. Shannon notes this corresponds more nearly to F7 or F8, because "a word is a cohesive group of letters with strong internal statistical influences" (pp. 53-54).
- **Speakers' tacit knowledge is the instrument** (p. 54). "anyone speaking a language possesses, implicitly, an enormous knowledge of the statistics of the language. Familiarity with the words, idioms, cliches and grammar enables him to fill in missing or incorrect letters in proof-reading, or to complete an unfinished phrase in conversation."
- **Information sits at branch points** (p. 55). In the first guessing experiment, "Of a total of 129 letters, 89 or 69% were guessed correctly. The errors, as would be expected, occur most frequently at the beginning of words and syllables where the line of thought has more possibility of branching out."
- **The reduced text loses nothing, but only for an identical predictor** (p. 55). "both lines contain the same information in the sense that it is possible, at least in principle, to recover the first line from the second. To accomplish this we need an identical twin of the individual who produced the sequence. The twin (who must be mathematically, not just biologically identical) will respond in the same way." Fig. 2 shows the communication system: transmit only the reduced text, with "two identical prediction devices" at the two ends.
- **Genre matters** (p. 56). Out of 102 symbols, 79 were guessed on the first try. "Results of this order are typical of prediction by a good subject with ordinary literary English. Newspaper writing, scientific work and poetry generally lead to somewhat poorer scores." Technical prose is less predictable, so each letter carries more information.
- **Prediction improves with context** (Table I, p. 57). Correct first guesses rise from 18.2% with no context to 29.2% with one letter, and to 80% with 100 letters known.
- **Ideal prediction is the best reversible recoding** (p. 60). "ideal prediction collapses the probabilities of various symbols to a small group more than any other translating operation involving the same number of letters which is instantaneously reversible."
- **Bounds** (p. 64, Fig. 4). With 100 letters of context the upper bound is 1.3 and the lower bound is 0.6 bits per letter for 27-letter English. Shannon flags "considerable sampling error". He also notes that the lower bound was proved for an ideal predictor while the data come from human prediction. In his view the two errors roughly offset each other, so "we feel reasonably confident of both bounds apart from sampling errors."
- **Reverse prediction** (p. 58). Guessing the preceding letter instead of the next one gave scores that "were only slightly poorer" (70 vs. 66 first-guess hits out of 101).

## Sources it builds on

All of these are cited in the paper's footnotes. None of the cited works was opened in this session.

- Shannon, C. E. (1948). A mathematical theory of communication. *BSTJ* 27, 379-423, 623-656. Already covered in this track.
- Pratt, F. (1942). *Secret and Urgent*. Blue Ribbon Books. The source of the letter, digram and trigram tables (p. 51, fn 2).
- Dewey, G. (1923). *Relative Frequency of English Speech Sounds*. Harvard University Press. The source of the word frequencies (p. 52, fn 3).
- Zipf, G. K. (1949). *Human Behavior and the Principle of Least Effort*. Addison-Wesley. The source of the rank-frequency law p_n = k/n (p. 52, fn 4).
- Hardy, G. H., Littlewood, J. E., & Pólya, G. (1934). *Inequalities*. Cambridge University Press. The source of the majorization results (Muirhead) behind the bounds (p. 60, fn 6).

## Works that cite it (influential forward citations)

I opened the first page or the arXiv abstract record of each of these, as noted.

- Cover, T. M., & King, R. C. (1978). A convergent gambling estimate of the entropy of English. *IEEE Transactions on Information Theory*, 24(4), 413-421. First page read at https://www.gwern.net/doc/cs/algorithm/information/1978-cover.pdf. It replaces guessing with sequential betting, which removes the inconsistency of the guessing bounds, and reports "approximately 1.3 bits/symbol, which agrees well with Shannon's estimate."
- Brown, P. F., Della Pietra, V. J., Mercer, R. L., Della Pietra, S. A., & Lai, J. C. (1992). An estimate of an upper bound for the entropy of English. *Computational Linguistics*, 18(1), 31-40. https://aclanthology.org/J92-1002.pdf (first page read). It is the first machine-predictor estimate: 1.75 bits per character on the Brown Corpus, from a word-trigram model.
- Valmeekam, C. S. K., Narayanan, K., Kalathil, D., et al. (2023). LLMZip: Lossless text compression using large language models. arXiv:2306.04050 (abstract read). It uses LLaMA-7B as the predictor in Shannon's scheme and reports an upper bound "significantly smaller" than Cover & King. The exact figure was not read: UNVERIFIED.
- Delétang, G., Ruoss, A., Duquenne, P.-A., et al. (2023). Language modeling is compression. arXiv:2309.10668 (abstract read). Its premise is that prediction and lossless compression are equivalent. The ICLR 2024 venue is UNVERIFIED.
- The linguistic line already covered in this track (Levy & Jaeger 2007; Mahowald et al. 2013; Piantadosi et al. 2011) uses the same idea: information is surprisal under the listener's predictive model.

## Relevance to AI answer style

1. **What counts as "redundant" depends on the receiver's predictor, not on the text alone.** The reduced text is lossless only for the "mathematically, not just biologically identical" twin. An assistant that drops articles, connectives, subjects, units or steps on the grounds that "the reader can infer them" is sending reduced text to a reader whose predictor is not its own. That is COMPRESSION in the harmful sense: the information is there in principle and gone in practice. PRECISION works the other way. It keeps the text decodable by the actual reader and puts the bits where that reader cannot predict.
2. **Information is concentrated at branch points.** Errors cluster "at the beginning of words and syllables where the line of thought has more possibility of branching out." In an answer, the branch points are the choice made, the number, the exception and the condition. Spend explicit words there. Text that follows predictably from the previous clause (a restatement, or a generic gloss) is the "first-guess correct" material, and it carries little.
3. **Context is the main source of redundancy.** Redundancy rises from 50% at 8 letters to 75% at 100 letters, and Shannon says it may rise further over paragraphs. Most of what makes a sentence predictable, and therefore cuttable, is the surrounding conversation. Something the user said two turns ago has already been "transmitted", and restating it costs the reader's attention for almost no information.
4. **Technical text leaves less to cut.** "scientific work ... generally lead[s] to somewhat poorer scores". Technical answers have higher entropy per word to begin with, so the same terseness that suits chat removes real content from a technical explanation. A length budget should depend on the content type.

## Candidate rules for the harness

1. **Do not write reduced text.** Never drop grammatical glue (articles, subjects, connectives such as "because", "so" and "unless") or units to save words. It costs the reader almost nothing to read, and the reader is not your identical twin. Cut whole predictable units instead, such as restated questions, recaps and generic openers.
2. **Spend words at branch points.** Wherever the reader could not guess the next step (which option was chosen, an exact value, an exception, a precondition), state it explicitly and specifically. Where the reader would guess right on the first try, say nothing.
3. **Set terseness by content entropy.** Allow more words per idea for technical or novel content than for conversational content. Before cutting a sentence in a technical answer, check that the reader could reconstruct it from what they have actually seen in this conversation, not from what you know.

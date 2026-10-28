# Aylett & Turk (2004): The Smooth Signal Redundancy Hypothesis

## Citation
Aylett, M., & Turk, A. (2004). The smooth signal redundancy hypothesis: A functional explanation for relationships between redundancy, prosodic prominence, and duration in spontaneous speech. *Language and Speech*, 47(1), 31-56. doi:10.1177/00238309040470010201. PMID 15298329. https://journals.sagepub.com/doi/10.1177/00238309040470010201

**Access note.** The 2004 article is closed access. OpenAlex reports oa_status "closed", and the SAGE page returned 403. **The 2004 full text was NOT read.** This note rests on three sources:
1. The 2004 abstract, as given in the OpenAlex record (api.openalex.org/works/doi:10.1177/00238309040470010201).
2. Aylett's PhD thesis, read in full via text extraction. It is the source of the 2004 paper's data and argument: Aylett, M. P. (2000). *Stochastic suprasegmentals: Relationships between redundancy, prosodic structure and care of articulation in spontaneous speech.* PhD thesis, University of Edinburgh. https://era.ed.ac.uk/handle/1842/22455
3. Turk's own restatement of the 2004 claims and results: Turk, A. (2010). Does prosodic constituency signal relative predictability? A Smooth Signal Redundancy hypothesis. *Laboratory Phonology* 1(2), 227-262. doi:10.1515/LABPHON.2010.012. Full text read at https://www.pure.ed.ac.uk/ws/files/8880329/TURK_2010_Does_prosodic_constituency_signal_relative_predictability.pdf

Any figure that appears only in the 2004 paper is marked UNVERIFIED.

## Core claim
Speakers must communicate robustly through noise while spending as little articulatory effort as they can. That pressure produces an *inverse* relationship between language redundancy (how predictable an element is from context) and acoustic redundancy (how much signal it gets, such as duration). The result is a *smooth signal redundancy profile*: total recognition likelihood is spread evenly across the utterance. In English, prosodic prominence is the means: unpredictable syllables get stress or accent, and therefore more duration and salience.

## Key evidence
- **Corpus and measures.** The data is the HCRC Map Task, a large corpus of spontaneous, task-oriented Glasgow English dialogue (thesis; Turk 2010). Language redundancy is measured by word frequency, syllable-trigram probability and givenness (prior mentions of the referent). Acoustic redundancy is measured by normalised syllable duration, plus vowel quality in the thesis.
- **Results in the 2004 abstract.** Linear regressions confirm (1) an inverse relationship between language redundancy and duration and (2) a strong relationship between prosodic prominence and duration. A large share of the variance that redundancy and prominence predict is *non-unique*. The authors read this as showing that prominence is the vehicle through which robustness constraints are expressed.
- **Numbers from the thesis abstract.** When boundary ("checking signal") effects are controlled, language redundancy predicts up to 65% of the variance in raw syllable duration. Prosodic structure predicts 64%, and 62% of that predictive power is shared. Whether these exact figures appear in the 2004 paper is UNVERIFIED.
- **Phrase-medial result (Turk 2010, p. 240).** In phrase-medial words (GlaToBI break index 1), the variance explained by redundancy and by prominence was largely shared. When all boundary strengths were included, prosodic variables, boundary strength among them, added a large unique contribution. Boundaries do work that predictability alone does not explain.
- **Why smooth beats lumpy (Turk 2010, p. 229).** Take two two-element strings whose recognition probabilities sum to 1. With 0.5 and 0.5, the chance of recognising the whole string is 0.25. With 0.1 and 0.9 it is 0.09. An even profile more than doubles the chance of recognising the whole message.
- **Worked example (Turk 2010).** In "Who's the author?", *who's the* is highly predictable and gets reduced. The first syllable of *author* is the least predictable, so it carries the nuclear accent and the extra duration.
- **Speaker-internal computation (Turk 2010, p. 230).** The hypothesis does *not* require the speaker to model the listener online. Speakers can compute redundancy from their own language experience as a proxy for the listener's, citing Bard et al. 2000 for evidence that speakers often ignore listener needs.

## Sources it builds on
- Shannon (1948) and Pierce (1961): redundancy as protection against channel noise (already covered: shannon-1948).
- Lieberman (1963): predictable words in fixed phrases are less intelligible when excised.
- Fowler & Housum (1987): second mentions are shorter.
- Lindblom (1990), H&H (hyper- and hypo-articulation) theory: speakers trade effort against listener needs.
- Jurafsky, Bell, Gregory & Raymond (2001): probabilistic reduction of predictable or frequent words.
- Shattuck-Hufnagel & Turk (1996): prosody-grammar architecture, adapted as the SSR model figure.
- Bard et al. (2000): intelligibility of referring expressions is controlled speaker-internally.

## Works that cite it (forward)
About 780 citations (OpenAlex; Semantic Scholar 783), retrieved 2026-10-28.
- Aylett & Turk (2006), JASA 119(5), 3048-3059: redundancy also predicts the spectral quality of vowels, not only duration.
- Levy & Jaeger (2007), Uniform Information Density (already covered). Turk (2010) itself cites Levy & Jaeger for the same optimality argument.
- Bell, Brenier, Gregory, Girand & Jurafsky (2009), J. Memory and Language: predictability effects on content and function word duration.
- Turk (2010), above: extends SSR from prominence to prosodic constituency (word boundaries).
- Mahowald et al. (2013) (already covered) and Meister et al. (2021) (already covered).
- Kuperman et al. (2008) is a counter-case: in Dutch compounds, informativity was linked to *longer* durations of interfixes (cited by Turk 2010 as "but see"). The direction is reported from Turk's citation only; UNVERIFIED in the original.

## Relevance to AI answer style
SSR is the clearest statement of the *precision vs. compression* distinction in the information-theory track. Its rule is not "be short everywhere". It is "give **less** signal to what the reader can predict and **more** signal to what they cannot". Over-compression flattens the redundancy curve the wrong way: the unpredictable part, such as a novel term, number, exception or condition, gets the same few words as the boilerplate. One weak spot then sinks the whole message (the 0.1 × 0.9 = 0.09 effect). For an assistant:
- Predictable scaffolding can be cut hard: restating the question, generic preambles, "I hope this helps".
- Low-predictability content must be *expanded* or made salient: the surprising result, the one non-default flag, the caveat that reverses the advice, a new term. The written analogue of prosodic prominence is placement in stressed position (the end of a sentence; see Gopen & Swan), bold, or a brief gloss.
- "Predictable" is computed from the *reader's* context, not the model's. SSR concedes that speakers often use their own model as a proxy, and the proxy fails when expertise differs (cf. the expertise reversal effect). Givenness, meaning whether something was already mentioned in this conversation, is a usable proxy that the assistant can measure.
- Boundaries act as "checking signals" (thesis): explicit section breaks and closing confirmations give the reader a place to verify or ask again. This is the same function as readback/hearback in radiotelephony.

## Candidate rules for the harness
1. **Spend words in proportion to surprise.** Cut words given by the question or by convention. Never cut words from the part the user could not have guessed: a non-default value, an exception, a reversal, a new term. Give that part an extra clause or a gloss if needed.
2. **Put the least predictable item in the prominent position.** Lead with it or end the sentence on it, and mark it (bold or its own line). Do not bury it mid-list among routine items.
3. **Judge predictability by what the user has seen, not by what the model knows.** A term counts as "given" only if it already appeared in this conversation or is standard in the user's evident field. Otherwise treat it as new and define it once.

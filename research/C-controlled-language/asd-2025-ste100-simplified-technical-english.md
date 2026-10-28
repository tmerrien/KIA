# ASD-STE100 Simplified Technical English (Issue 9, 2025)

## Citation
ASD (Aerospace, Security and Defence Industries Association of Europe). *ASD-STE100 Simplified Technical English: Standard for technical documentation*. Issue 9, 15 January 2025. Brussels: ASD. Originally released as *AECMA Simplified English Guide*, PSC-85-16598 (first release 1986-02-15).
Link: https://www.asd-ste100.org/assets/files/ASD-STE100_ISSUE9.pdf (PDF read in full-text form for this note; official download page: https://www.asd-europe.org/standards-specifications/simplified-technical-english/download-asd-ste-100)

## Core claim
Technical text can be made unambiguous for readers worldwide, many of them non-native, by restricting writing to a controlled dictionary where "in general, each word has only one meaning and is approved with only one part of speech" (one synonym chosen, e.g. "start" not "begin/commence/initiate"), plus about 60 writing rules on sentence length, verb form, and structure. Brevity comes from short sentences and one idea per sentence. It does **not** come from removing words: Rule 4.2 explicitly forbids omitting nouns, verbs, subjects or articles "to make your sentences shorter".

## Key evidence (from the primary text)
- Origin (General introduction, p. i): in the late 1970s the Association of European Airlines asked AECMA to investigate the readability of civil-aviation maintenance documentation. AECMA and AIA project groups surveyed existing controlled languages and manual texts and "confirmed that a simplified language for aerospace was necessary". The working group was founded in Amsterdam on 30 June 1983.
- Section 1 (Words): Rule 1.3 "Use approved words only with their approved meanings"; Rule 1.9 choose short, easy technical nouns; Rule 1.11 "Do not use different technical nouns for the same item." Example: "fall" means only "move down by gravity", never "decrease".
- Rule 2.1: multi-word nouns of at most three words, because modifier attachment becomes ambiguous ("Runway light connection resistance calibration" does not show how "runway" relates to "calibration").
- Section 3: restricted tenses; Rule 3.4 no complex auxiliary constructions; Rule 3.6 active voice (passive only when the agent is unknown); Rule 3.7 express actions with verbs, not nominalizations ("Do the leak test" rather than verbing a noun).
- Rule 4.2 (the PRECISION-vs-COMPRESSION rule): "If you do that, your sentence will be shorter, but it will not be easier to read." Non-STE "Rotary switch to INPUT." becomes STE "Set the rotary switch to INPUT." Non-STE "Remove the bolt and stop." becomes "Remove the bolt and the stop." because a dropped article makes "stop" read as a verb.
- Rule 4.3: use vertical lists for complex text. Rule 4.4: use connecting words between related sentences.
- Rule 5.1: procedures have a maximum of 20 words per sentence. Rule 5.2: one instruction per sentence. Rule 5.3: imperative. Rule 5.4: put the condition first ("When X, do Y"). Rule 5.5: notes give information, not instructions.
- Rule 6.1: give information gradually, one subject per sentence. Rule 6.3: descriptive text has a maximum of 25 words per sentence. Rules 6.5 and 6.6: one topic per paragraph, at most six sentences.
- Section 7: a safety instruction starts with a signal word for risk level (7.1), then a clear command or condition (7.2), then the reason or consequence (7.3).
- Rule 9.4: consistent terminology and wording throughout.
- The standard itself reports no controlled experiment. For empirical support, see the forward citations below.

## Sources it builds on
- ATA100 specification for technical publications. The "100" in the name is a tribute to it (p. i).
- Prior controlled languages surveyed by the AECMA/AIA groups. Kuhn (2014) names ILSAM (Adriaens and Schreors 1992) as the original inspiration, with lineage back to Caterpillar Fundamental English (1971) and Ogden's Basic English (1930).
- Merriam-Webster's dictionary, for approved meanings and spelling. ISO 1087:2019 (terminology work), for the technical-noun and technical-verb categories added in Issue 9.

## Works that cite it (forward)
- Kuhn, T. (2014). "A Survey and Classification of Controlled Natural Languages." *Computational Linguistics* 40(1): 121-170. https://arxiv.org/abs/1507.01701. VERIFIED in full text: it classifies ASD-STE as PENS P2 E5 N5 S1 ("considerably more precise than full English" but not machine-interpretable).
- Shubert, S. K. et al. (1995). "The Comprehensibility of Simplified English in Procedures." *Journal of Technical Writing and Communication* 25(4): 347-369. doi:10.2190/wg69-d74b-4dll-2wbk. The reported finding is that SE significantly improved comprehension of the more complex procedure, for both native and non-native readers. UNVERIFIED: the full text was not read, and the full author list is unconfirmed (a related IEEE IPCC 1995 paper lists Shubert, Holmback, Spyridakis, Coney).
- Chervak, Drury and Ouellette (1996), "Simplified English for aircraft workcards". UNVERIFIED: only a catalogue page was seen.

## Relevance to AI answer style
STE is the clearest formal statement of the PRECISION-not-COMPRESSION distinction:
- Precision: one term, one meaning, held consistently, using the term the domain already uses.
- Brevity: one idea per sentence, and short sentences.
- Compression is banned outright: telegraphic omission of subjects, verbs or articles is forbidden because it shifts the work of disambiguation onto the reader.

An assistant that drops articles and verbs ("Fixed. Config wrong, restart svc") gets shorter but less readable. STE says to split the content into short, complete sentences instead. The condition-first rule (5.4) and the command, then consequence, then reason structure (7.1-7.3) map directly onto how to phrase instructions and warnings.

## Candidate rules for the harness
1. **Shorten by splitting, never by deleting grammar.** Keep subjects, verbs and articles. Aim for about 20 words or fewer per instruction sentence and 25 or fewer per explanatory sentence. Express one instruction or one fact per sentence.
2. **One term, one meaning, held for the whole answer.** Once you name a thing ("the cache layer"), do not switch to a synonym ("the store", "the buffer"). Do not reuse a word in a second sense. Prefer the domain's established technical noun over a coined paraphrase.
3. **Put conditions first in instructions, and give warnings as signal, then action, then consequence.** For example: "If the migration fails, run X." Or: "Warning: this deletes the branch. Back it up first; otherwise the commits are lost." Use the imperative and the active voice. Use vertical lists for three or more parallel steps.

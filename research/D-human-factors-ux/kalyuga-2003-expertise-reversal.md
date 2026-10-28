# Kalyuga, Ayres, Chandler & Sweller (2003): The Expertise Reversal Effect

## Citation
Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The expertise reversal effect. *Educational Psychologist*, 38(1), 23-31. doi:10.1207/S15326985EP3801_4

- Full text read: University of Wollongong Research Online author copy (6-page PDF), https://ro.uow.edu.au/edupapers/136, file https://ndownloader.figshare.com/files/50479548 (md5 8a5998eb45666b3c22308a87f814250b). The repository record lists the authors in the order Sweller, Ayres, Kalyuga, Chandler. The published article page lists Kalyuga first, which is the standard citation.
- Crossref citation count on 2026-10-28: 1,433.
- Type: a narrative review of the authors' own experiments plus related studies. It reports no new data.

## Core claim
Instructional techniques that lower working-memory load for novices (integrated explanations, added coherence text, narration, worked examples) "lose their effectiveness and even have negative consequences when used with more experienced learners" (abstract). Experts already hold schemas that give the same guidance. Redundant external guidance then forces them to cross-reference two sources for the same content, and "Redundant information is frequently difficult to ignore" (p. 24). Whether material is essential or redundant is therefore a property of the reader-material pair, not of the material alone.

## Key evidence (as summarised in the review)
- **Split-attention becomes redundancy.** Kalyuga, Chandler & Sweller (1998, *Human Factors* 40, 1-17): inexperienced electrical trainees needed text built into circuit diagrams and could not understand the diagram alone. More experienced trainees scored significantly better with the diagram alone and reported less mental effort (p. 25).
- **Text glosses.** Yeung, Jin & Sweller (1998): explanatory notes built into the main text helped readers with low language competence but "retarded learning" for more knowledgeable readers, because the notes were hard to ignore (p. 25).
- **Text coherence.** McNamara, Kintsch, Songer & Kintsch (1996): coherence additions to a biology text helped only low-knowledge readers. High-knowledge readers did best with the original, minimally coherent text. Kalyuga et al. reinterpret this as redundancy, not as a benefit of active processing, because experts reported *lower* mental load on minimal formats (pp. 25-26). "Text that is minimally coherent for novices may well be fully coherent for experts" (p. 26).
- **Modality and redundancy.** Kalyuga et al. (2000): diagram plus spoken narration was best for novices. After more training the narration's advantage disappeared and then reversed, so diagram-only won (p. 26).
- **Worked examples versus problem solving.** Kalyuga, Chandler, Tuovinen & Sweller (2001), Tuovinen & Sweller (1999), and Kalyuga, Chandler & Sweller (2001) found that worked examples help novices, but the advantage disappears or reverses as experience grows. Renkl et al. found that *fading* guidance step by step works better than an abrupt switch (the "guidance-fading effect", p. 27).
- **Isolated versus interacting elements** (Pollock et al., 2002): this showed only partial evidence, with no full reversal (p. 28).
- **Imagination effect** (Cooper et al., 2001): imagining procedures helped knowledgeable students and hurt novices (p. 29).
- **Measurement.** Subjective mental-effort ratings were collected next to performance and are the authors' main evidence for a load-based explanation.
- **Conclusion.** "Without such tailoring, the effectiveness of instructional designs is likely to be random" (p. 29).

## Sources it builds on
- Sweller (1988, 1994, 1999) and Sweller, van Merrienboer & Paas (1998): cognitive load theory.
- Chi, Feltovich & Glaser (1981) and Chi & Glaser (1985): experts chunk many elements into a single schema.
- Schneider & Shiffrin (1977): automatic versus controlled processing.
- Miller (1956) and Baddeley (1986): limits of working memory.
- Chandler & Sweller (1991): redundancy and split attention.
- Kalyuga, Chandler & Sweller (1998, 1999 [already covered], 2000).
- McNamara et al. (1996): text coherence by background knowledge.
- Mayer (2001): the "individual differences principle" (p. 161).
- Snow & Lohman (1984): the aptitude-treatment interaction tradition.

## Works that cite it (influential forward citations, metadata checked on Crossref)
- Kalyuga, S. (2007). Expertise reversal effect and its implications for learner-tailored instruction. *Educational Psychology Review*, 19, 509-539. doi:10.1007/s10648-007-9054-3 (877 citations)
- Kalyuga, S., & Sweller, J. (2004). Measuring knowledge to optimize cognitive load factors during instruction. *Journal of Educational Psychology*, 96(3), 558-568. doi:10.1037/0022-0663.96.3.558. This is the rapid first-step diagnostic method. (141 citations)
- Kalyuga, S., Chandler, P., & Sweller, J. (2004). When redundant on-screen text in multimedia technical instruction can interfere with learning. *Human Factors*, 46(3), 567-581. doi:10.1518/hfes.46.3.567.50405
- Kalyuga, S., & Renkl, A. (2010). Expertise reversal effect and its instructional implications: introduction to the special issue. *Instructional Science*, 38, 209-215. doi:10.1007/s11251-009-9102-0
- Chen, O., Kalyuga, S., & Sweller, J. (2017). The expertise reversal effect is a variant of the more general element interactivity effect. *Educational Psychology Review*, 29, 393-405. doi:10.1007/s10648-016-9359-1
- I did not open these forward works, so their content is UNVERIFIED. Only titles, venues and counts were checked.

## Relevance to AI answer style
- **The precision/compression line moves with the reader.** One answer can be precise for an expert and over-compressed for a novice. A term such as "idempotent" carries the whole idea only when the reader holds the matching schema. For a novice the same term leaves out meaning they cannot rebuild. Precision depends on the reader, and the paper gives the mechanism: a schema turns many elements into one.
- **Padding has a cost beyond wasted words.** For experts, redundant explanation does more than waste words. It lowers performance, because readers cannot reliably skip it and spend effort cross-referencing it against what they already know (p. 24). This argues against "explain everything just in case" defaults.
- **Interleaving makes the cost worse.** Explanations integrated into the main text (Yeung et al.) were the hardest for experts to ignore. Glosses that can be skipped, placed after or beside the core answer, keep novice support without taxing experts. This is an inference from the paper, not something it tested on chat.
- **Fade, do not switch.** Over a conversation, guidance should taper as the user shows competence (Renkl's guidance fading).
- **Limit:** the evidence comes from technical training (circuits, machinery, spreadsheets, biology text) measured by learning outcomes. Carrying it over to answering questions, where the goal is often a quick task rather than learning, is an extrapolation.

## Candidate rules for the harness
1. **Calibrate to shown expertise.** Infer the user's level from their wording: the terms they use correctly, the code they paste, the questions they skip. For a user who shows expertise, give the precise term and the result, with no definitions or background they have already shown they hold. Redundant explanation is a cost to them, not a courtesy.
2. **Keep novice scaffolding separate.** When the level is unclear, put the core answer first in exact terms. Put any definitions or step-by-step explanation in a separate, clearly marked part after it ("If X is unfamiliar: ..."), never interleaved in the core sentences.
3. **Fade guidance across turns.** Once a user has followed or used a concept, stop re-explaining it in later turns. Never cut meaning the user has not shown they can supply: compression is only safe where the reader's schema covers the gap.

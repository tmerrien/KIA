# Kalyuga, Chandler & Sweller (1999): Managing Split-attention and Redundancy in Multimedia Instruction

**Citation:** Kalyuga, S., Chandler, P., & Sweller, J. (1999). Managing split-attention and redundancy in multimedia instruction. *Applied Cognitive Psychology, 13*(4), 351–371. https://doi.org/10.1002/(SICI)1099-0720(199908)13:4<351::AID-ACP589>3.0.CO;2-6
**Full text read:** https://tecfa.unige.ch/tecfa/teaching/methodo/Kalyuga99.pdf
Crossref shows 401 citing works (checked 2026-10-28). The journal later reprinted the paper in its "From the archive" series with commentary (doi:10.1002/acp.1773).

## Core claim
Working memory is limited, so any processing not directly used to build schemas takes capacity away from learning. When sources of information are each intelligible on their own and repeat one another (e.g., on-screen text duplicating narration), the duplicate is *redundant*: it adds load and harms learning. Eliminating it helps, while integrating it does not. Information that is not redundant but split across sources should instead be physically integrated or signposted (e.g., with colour coding).

## Key evidence
- **Experiment 1:** 34 first-year trade apprentices learned a soldering "Fusion Diagram" in one of three formats: Visual text, Audio text, or Visual + Audio text (identical narration and on-screen text). The Audio-text group did best on every measure. It needed fewer reattempts (F(2,29)=3.58), gave lower mental-load ratings (F(2,31)=4.32), and scored higher on fault-finding (F(2,31)=4.86) and multiple-choice (F(2,31)=7.80). The duplicated Visual + Audio format was *the worst of the three*: "Redundancy overrode all the benefits of dual-mode presentation."
- **Experiment 2:** colour-coding diagram elements to match their referents in the text reduced search load and improved multiple-choice scores (F(1,13)=7.17) compared with conventional separate diagram and text.
- Subjective mental-load ratings tracked the performance differences, which supports a load-based explanation.
- The authors note the common designer belief that "duplicating informationally identical audio and visual material facilitates learning". Their results contradict it.

## Sources it builds on
- Miller (1956) on working-memory limits. Sweller (1988, *Cognitive Science* 12:257–285; abstract read via Crossref) on problem-solving load and schema acquisition. Sweller (1994) and Sweller, van Merriënboer & Paas on CLT.
- Chandler & Sweller (1991, *Cognition and Instruction* 8:293–332), the original redundancy and split-attention demonstrations (full text not read; content as described here).
- Baddeley (1992) on working-memory subsystems. Mousavi, Low & Sweller (1995) on the modality effect. Schooler & Engstler-Schooler (1990) on verbal overshadowing.

## Works that cite it (influential forward citations)
- Mayer's redundancy principle in multimedia learning (Mayer, *Multimedia Learning*; *Cambridge Handbook of Multimedia Learning*, chapter "Redundancy principle in multimedia learning"). Direct citation UNVERIFIED.
- Kalyuga, Ayres, Chandler & Sweller (2003), "The expertise reversal effect", *Educational Psychologist*. This work shows that material helpful to novices becomes redundant for experts. Citation link UNVERIFIED.

## Relevance to AI answer style
- **Gives a mechanism for why padding hurts.** Restating content the reader already has (repeating the question, summarising a list just shown, "In summary..." paragraphs) is not neutral politeness. It uses working-memory capacity the reader needs for the substance.
- **Precision vs compression.** The redundancy effect only licenses removing a source that is *self-contained and duplicated*. Information that is needed but split across places must be *integrated*, not cut. Dropping a necessary element is compression and recreates the problem by forcing the reader to infer or search. So CLT supports precision (one complete, non-duplicated statement) and argues against blind brevity.
- **Split attention.** Explanations that point to code or values located elsewhere ("see above", or a definition three paragraphs away) force search-and-match. Put the referent next to the claim.
- **Expertise matters.** What counts as redundant depends on what the reader already knows (expertise reversal). Calibrate to the user.

## Candidate rules for the harness
1. Say each thing once. Do not restate the question, repeat content the user just saw, or add a summary that duplicates a short answer.
2. Keep each claim next to what it refers to: quote the relevant line or value inline instead of saying "see above" or making the reader cross-reference.
3. Cut only what is truly duplicated or already known to this user. If removing a step would force the reader to reconstruct it, keep it.

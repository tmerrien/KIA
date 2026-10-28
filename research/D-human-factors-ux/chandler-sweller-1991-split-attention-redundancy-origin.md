# Chandler & Sweller (1991): Cognitive Load Theory and the Format of Instruction

**Citation:** Chandler, P., & Sweller, J. (1991). Cognitive load theory and the format of instruction. *Cognition and Instruction, 8*(4), 293-332. https://doi.org/10.1207/s1532690xci0804_2
**Full text read:** the publisher scan in the University of Wollongong repository, https://ro.uow.edu.au/edupapers/128 (PDF mirrored on figshare: https://ndownloader.figshare.com/files/50549310, record 27778410).
OpenAlex lists 2,894 citing works (checked 2026-10-28). Note: some web sources give the DOI as 10.1023/a:1022193728205. That DOI belongs to a different paper; the correct one is 10.1207/s1532690xci0804_2.

## Core claim
Learning suffers when readers must do work that does not itself produce learning. One such job is mentally joining separate sources that refer to each other, such as a diagram and its text. When neither source makes sense alone, *physically integrating* them helps. When one source makes sense alone and the other only repeats it, integrating them does not help: *deleting* the repeat does (p. 330: "Isolation and elimination of redundant sources of information are preferable").

## Key evidence (six experiments; times in seconds)
- **Exp. 1 (split attention, 12-week field study):** 28 electrical apprentices used installation-testing notes. In one version the text and diagrams were separate; in the other the same text was placed onto the diagram as numbered steps. The integrated group scored higher on written tests (F(1,26)=8.60; means 13.8 vs 8.2 immediately and 17.1 vs 10.1 at 12 weeks) and on practical tests (F(1,18)=33.72). After 12 weeks, the split-format group still scored below the integrated group's first score.
- **Exp. 2 (no benefit when one source is self-sufficient):** lighting-circuit notes in which the diagram was understandable alone. The paper's example is the text line "The active wire goes from the active to the common of Switch 1", which "adds nothing" to the diagram (p. 305). Integrating text and diagram gave no advantage; the split group was slightly ahead (n.s.).
- **Exp. 3 (telling readers to process the repeat hurts):** both groups got the same diagram plus a redundant text. Readers told to relate the text to the diagram took almost twice as long (62.6 vs 32.3 s, t(18)=3.28) and scored lower on the main test (one-tailed).
- **Exp. 4 (deleting beats integrating):** mixed-circuit materials. Diagram only: 60.4 s and test-1 score 34.8. Integrated diagram plus text: 92.4 s and 26.6. Separate diagram plus text: 136.9 s and 23.2. The diagram-only group did best on problems 1-2 (t(27)=3.65, 3.86).
- **Exp. 5 (a different domain, the same result):** 30 Year-9 students learned blood circulation. Diagram only: 69.1 s, with significantly higher scores on 5 of 6 problems. Integrated: 105.7 s. Separate: 158.8 s. The separate-format group's mean fell "below a quarter of the diagram-only group" (p. 323).
- **Exp. 6 (the test case):** the same heart diagram, but with labels replaced by numbers that are explained only in the text, so neither source works alone. Integration now helps: 105.1 vs 150.8 s, with better scores on problems 1-3. Exp. 5 and Exp. 6 used nearly the same materials and got opposite results, which shows the deciding variable is *whether each source makes sense on its own*, not the topic.
- Limits the authors state: cognitive load was not measured directly (study time stood in for it); samples were small (n=20-30); some tests showed ceiling or floor effects.

## Sources it builds on
- Sweller (1988), *Cognitive Science* 12, 257-285; Sweller (1989), *J. Educ. Psych.* 81, 457-466: cognitive load theory, and extraneous load from searching while solving problems.
- Tarmizi & Sweller (1988); Ward & Sweller (1990), *Cognition and Instruction* 7, 1-39: split-attention worked examples are no better than solving problems.
- Sweller, Chandler, Tierney & Cooper (1990), *JEP: General* 119, 176-192: integrated initial instruction, with study-time savings.
- Larkin & Simon (1987), "Why a diagram is (sometimes) worth ten thousand words", *Cognitive Science* 11, 65-99: why the self-sufficient source is often the diagram.
- Sweller & Cooper (1985); Cooper & Sweller (1987): the worked-example effect.

## Works that cite it (influential forward citations)
Each of these appears in the Semantic Scholar citations list for this DOI (checked 2026-10-28):
- Sweller, van Merriënboer & Paas (2019), "Cognitive architecture and instructional design: 20 years later", *Educ. Psych. Rev.*, doi:10.1007/s10648-019-09465-5.
- Schroeder & Cenkci (2018), "Spatial contiguity and spatial split-attention effects in multimedia learning environments: a meta-analysis", *Educ. Psych. Rev.*, doi:10.1007/s10648-018-9435-9.
- Castro-Alonso, de Koning, Fiorella & Paas (2021), "Five strategies for optimizing instructional materials", *Educ. Psych. Rev.*, doi:10.1007/s10648-021-09606-9.
- Kalyuga, Chandler & Sweller (1999) and the expertise-reversal line (Kalyuga et al. 2003) are already covered in this track.
- Not checked against the citation list (UNVERIFIED as direct citations): Mayer's redundancy and coherence principles (Mayer, Heiser & Lonn 2001); Ginns (2006), meta-analysis of the split-attention effect.

## Relevance to AI answer style
- **This is the experiment that separates precision from compression.** Exp. 4/5 versus Exp. 6 is a controlled contrast. Cutting a source that repeats something already complete *helps* (precision: one complete statement). Moving needed information elsewhere, with labels in one place and meanings in another, *hurts*, even when nothing is deleted. The rule is not "be shorter". It is "keep exactly one self-sufficient statement of each idea, and keep things that refer to each other in the same place".
- **Prose that restates code, tables or lists is the Exp. 2-5 redundant text.** A sentence such as "The function takes x and returns y" placed under a code block that already shows the signature plays the same role as "The active wire goes from the active to the common of Switch 1".
- **Numbered labels with a separate legend are the Exp. 6 failure.** Footnote-style references ("see [3]"), variables defined three paragraphs away, or "as noted above" force readers to search and match. Put the meaning at the point of use.
- **Redundancy is "neutral at best", and then only if readers recognise it and skip it** (p. 330). Readers who are told or expected to read everything (Exp. 3) pay full cost. AI answers are usually read in full, so repetition is not free.
- The authors suggest that separated repetition such as a summary can help memory (p. 331), but they had "no information on the relevant conditions". Treat that suggestion as UNTESTED in this paper.

## Candidate rules for the harness
1. **Find the self-sufficient source and delete its echoes.** If a code block, table, diagram or list already states something completely, do not repeat it in prose. Prose should only add what that source cannot show (why, caveats, the next action).
2. **Integrate what can't stand alone.** Never separate a term, label or symbol from its meaning. Define it or explain it where it appears (inline comment, a parenthetical, a table cell), not in a later legend or a "see above".
3. **Judge each element by whether it makes sense alone, not by length.** Before cutting, ask: "Is this understandable without the other part?" If yes, the other part may be redundant and can go. If no, both are needed and should sit next to each other. Cutting a needed part is compression, not concision.

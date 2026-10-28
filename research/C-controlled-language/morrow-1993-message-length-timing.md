# Morrow & Rodvold (1993): ATC message length and timing

## Citation
Morrow, D., & Rodvold, M. (1993, August). *The Influence of ATC Message Length and Timing on Pilot Communication*. NASA Contractor Report 177621, contract NAS2-13210, NASA Ames Research Center (report no. A-93115). Authors: Decision Systems, Los Altos; San Jose State University Foundation.
Open access: https://ntrs.nasa.gov/api/citations/19940010271/downloads/19940010271.pdf (full 26-page PDF read, including Tables 1-3).

## Core claim
If the same four ATC commands are sent as one long message, pilots make more readback errors and ask for more repeats than if the commands are split into two two-command messages: the long message overloads working memory at the point of *understanding*. The split messages have a different weak point. When the second message arrives soon after the first, it interferes with *memory* for the first (delayed problems, digit intrusions). Splitting trades more routine turns for fewer problem turns, and the authors judge that trade worth it because accuracy comes first.

## Key evidence
- Design: 16 glass-cockpit airline pilots in a part-task simulation, flying SFO to SMF while vectored by recorded ATC voice messages. Each leg had 6 long (4-command) messages and 6 pairs of short (2-command) messages, with the same content in both conditions. Half of the radio legs added a secondary visual monitoring task. A parallel data-link arm was run by McGann, Lozito & Corker (1992).
- Long vs. both short messages combined (Table 2, % of transactions): readback errors 18 vs 8 (F(1,15)=7.1, p<.05); requests for clarification 65 vs 33 (F=13.1, p<.01); procedural deviations (incomplete or missing readback) about 60 vs 35 (F=13.2, p<.01). The 60/35 values are read from a garbled OCR table, so treat them as approximate.
- Table 3 (long / first short / second short): readback errors 18/3/5; requests for repeat 46/10/6; requests for confirmation 18/14/3. Long messages mainly produced "say again" requests, which means part of the message was never taken in.
- Timing: 84% of problems with the short messages were *delayed*, raised only after the second message had been read back. For long messages the figure was 12%. Every command involved had first been read back correctly. 70% of the delayed problems were repeat requests or wrong confirmation requests, and 42% of the wrong confirmations contained digits carried over from the second message (retroactive interference).
- Caveat on timing: problems looked more frequent at gaps under 5 s (34% vs 22%), but the gap was not controlled (1-108 s). A post-hoc median split showed no difference (27% vs 29%). The interference claim therefore rests on the type of error (intrusions), not on a dose-response curve.
- Cost of splitting: more transactions (13.5 vs 6.7 per flight), and therefore more turns (t(15)=8.0) and more speech acts. Problem turns and speech acts were *more* frequent for long messages (t(15)=5.2). Long messages also delayed frequency entry (18.0 s vs 11.9 s).
- In the data-link arm, long messages caused no excess problems, which suggests that a persistent visual medium can carry longer messages. The first-short/second-short timing pattern still appeared.
- Secondary task: it did not affect communication. Communication did lower monitoring accuracy (.31 within 40 s of a message vs .58 later).
- Limitations stated by the authors: single pilot, no background radio traffic, and a poorly integrated secondary task.

## Sources it builds on (backward)
- Loftus, G., Dark, V., & Williams, D. (1979). Short-term memory factors in ground controller/pilot communication. *Human Factors* 21, 169-181. This is the laboratory basis for the length effect.
- Billings, C., & Cheaney, E. (1981). *Information transfer problems in the aviation system*. NASA TP-1875.
- Morrow, Lee & Rodvold (in press, about 1993), *Int. J. Aviation Psychology*, and Morrow, Rodvold & Lee (in press, about 1994), *Discourse Processes*: the field studies this simulation follows up.
- Clark & Schaefer (1987), "Collaborating on contributions to conversations": the collaborative acceptance scheme.
- Levelt (1989), *Speaking*: the formulating/packaging/delivering stages. Bock (1982).
- Monan (1983), the callsign addressee report (already covered: Monan 1986).
- Kerns (1990), MITRE data-link review. Wickens (1992).

## Works that cite it / follow-on work (forward)
- The Barshi and Healy navigation-instruction paradigm at NASA Ames and CU Boulder (Barshi 1997 dissertation; Barshi & Healy 1998, "Misunderstandings in voice communication"; Schneider, Healy & Barshi 2000 poster, in Healy & Schneider, NASA grant NCC2-1112 annual report, https://ntrs.nasa.gov/api/citations/20000109796/downloads/20000109796.pdf, which I read). This line takes the same message-length question into controlled lab work. I could not see whether these works cite *this specific report*: UNVERIFIED.
- Formal citation counts and other citing works: UNVERIFIED (not checked).

## Relevance to AI answer style
- This is precision through structure, not compression. The four commands stay intact, nothing is dropped, and only the *packaging* changes. Splitting raised accuracy even though it raised the total word and turn count. "Shorter answer" and "better answer" are separate axes, and what matters is the load per unit.
- An answer with many instructions packed into one paragraph is the "long message": readers lose part of it and must ask again. Splitting it into separate numbered steps, one action each, is the "two short messages".
- The interference finding warns against adjacent items that look alike. Two similar numbers, versions, paths, or flags placed one after the other are prone to intrusion errors, the digit swapping seen in the confirmations. Give each its own label and context.
- The data-link result: a persistent, re-readable medium (written text, code blocks, tables) tolerates more items per unit than ephemeral speech does. Even so, keep commands separable and scannable.
- The authors' trade-off judgement: when accuracy matters (commands, configuration values, safety steps), accept a few more lines to keep units small. Do not merge steps just to cut length.

## Candidate rules for the harness
1. **One action per step.** If an answer asks the user to do more than about two things, give each action its own numbered line. Never pack several commands or values into one sentence. Split for structure, but delete nothing.
2. **Separate look-alike values.** When two or more similar values sit close together (numbers, versions, ports, file paths, flags), put each on its own labelled line or in a code block, so one cannot be mixed up with another.
3. **Accuracy beats brevity for executable content.** For instructions the user will carry out, accept slightly greater length (extra line breaks, labels) if it lowers the chance of a misread. For explanatory prose, keep the usual concision.

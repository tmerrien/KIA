# Schober & Clark (1989): Understanding by Addressees and Overhearers

## Citation
Schober, M. F., & Clark, H. H. (1989). Understanding by addressees and overhearers. *Cognitive Psychology*, 21(2), 211-232. doi:10.1016/0010-0285(89)90008-x. Accepted October 24, 1988.
Full text read (22-page scan): https://web.stanford.edu/~clark/1980s/Schober.Clark.89.pdf

## Core claim
Speakers and addressees ground each reference together until both believe it is understood "to a criterion sufficient for current purposes". The shortened terms that result fit the people who negotiated them. An overhearer with the same background, who heard every word from the start, still understands those references less well, because she could not shape the perspective, ask questions, or control the pace. Understanding is collaborative, not autonomous.

## Key evidence
- Task: Krauss-Glucksberg referential task with 16 Tangram figures (12 used per trial) and 6 trials. Director, matcher and overhearer started as strangers.
- Shortening: directors used about 73 words per figure on Trial 1 and about 13 by Trial 6. Matchers went from about 39 to about 3. Turns per figure fell from 7.8 to 1.1, and time per position from about 39 s to about 6 s. Example from one pair: a long multi-turn description became "the dancer with the big fat leg?" / "Okay." Final names varied widely across pairs ("the rice bag", "the whale", "the baby in a straitjacket").
- Exp. 1 (tape-recorded conversations, 10 pairs, 40 overhearers):
  - Accuracy: matchers 99%, early overhearers (heard from Trial 1) 88%, late overhearers (joined at Trial 3) 68%. All differences significant.
  - Late overhearers improved only from 55% to 73% by Trial 6.
  - A pause button did not help (89 vs 88% early, 73 vs 68% late, n.s.), although most overhearers believed it had helped.
  - Overhearers placed 63% of cards by the speakers' completion point; matchers placed 99%. Overhearers' error rate was 28% after the completion point and 12% before it.
  - Overhearers changed cards 5.1% of the time and matchers 1.6%. Only 56% of the overhearers' changes were to the correct card.
- Exp. 2 (live overhearer in the same room, 10 triples analysed, videotaped):
  - Accuracy: matchers 98%, overhearers 85%. Overhearers started at 78% and reached only 89% by Trial 6. The authors call this "decisive evidence against the autonomous view".
  - Mean placement times were the same for both groups. The SD of placement time relative to the completion point was about 5x larger for overhearers. Placement-completion correlations were .96 for matchers and .68 for overhearers.
  - Overhearer errors were 9.6% before the completion point and 21% after it. In the latest decile on Trial 1 they were only 42% correct.
  - Faster pairs produced more overhearer errors (r = .58, one-tailed).
- Overhearers' own words: "they just say, y'know, 'this one'"; "They're just talking to each other, and using their definitions"; "developed their own terms and it took a while to catch on to their terminology"; "it went too fast."
- Mechanism (Conclusions): grounding is "opportunistic". A and B stop at the first perspective *they* can agree on, and "her [C's] state of understanding plays no role in A and B's decision to stop or go on." The authors add that most comprehension experiments treat participants as overhearers.

## Sources it builds on
- Clark & Wilkes-Gibbs (1986), collaborative reference (already covered).
- Clark & Schaefer (1987a, 1989), grounding and contributions to discourse. Clark & Schaefer (1987b), concealing one's meaning from overhearers.
- Krauss & Weinheimer (1964, 1966, 1967), the shortening of repeated reference.
- Kraut, Lewis & Swezey (1982), listener responsiveness. This was the earlier finding that overhearers do worse.
- Clark & Marshall (1981), sources of mutual knowledge. Clark & Carlson (1982), hearers and speech acts. Goffman (1976), participation roles.
- Clark & Haviland (1977), Sperber & Wilson (1986). Both are cited as examples of the "autonomous view".
- Isaacs & Clark (1987), experts and novices. Bell (1984), audience design.

## Works that cite it (Semantic Scholar: 693 citations, checked 2026-10-28)
- Brennan, S. E., & Clark, H. H. (1996). Conceptual pacts and lexical choice in conversation. JEP:LMC 22(6), 1482-1493. doi:10.1037/0278-7393.22.6.1482
- Pickering, M. J., & Garrod, S. (2004). Toward a mechanistic psychology of dialogue. BBS 27(2). doi:10.1017/S0140525X04000056
- Metzing, C., & Brennan, S. E. (2003). When conceptual pacts are broken. JML 49(2). doi:10.1016/S0749-596X(03)00028-7
- Fox Tree, J. E. (1999). Listening in on monologues and dialogues. Discourse Processes 27(1). doi:10.1080/01638539909545049
- Fox Tree & Mayer (2008), Discourse Processes, doi:10.1080/01638530701792867. Tolins & Fox Tree (2016), Cognitive Science, doi:10.1111/cogs.12278. Tolins, Zeamer & Fox Tree (2017), Discourse Processes, doi:10.1080/0163853X.2017.1279516.
- Chi, Roy & Hausmann (2008). Observing tutorial dialogues collaboratively: vicarious learning. Cognitive Science, doi:10.1080/03640210701863396.
- LLM-era work: Wang et al. (2025), "LVLMs are Bad at Overhearing Human Referential Communication", arXiv:2509.11514. Zhu & Callison-Burch (2025), "Overhearing LLM Agents" survey, arXiv:2509.16325. Asthana et al. (2023), LLM meeting recaps, doi:10.1145/3711074.
- These works were seen only as listing entries (titles and DOIs). Their content was NOT read and is UNVERIFIED here.

## Relevance to AI answer style (precision vs compression)
- A term coined during a session, such as a nickname for a bug, a file or an option ("the Duveen fix", "option B"), is **precise for the participants and compressed for everyone else**. Its meaning lives in the shared history, not in the words. The study shows that even a reader who saw the whole history (the early overhearers) loses accuracy: 88% vs 99%.
- Summaries, handoff notes, PR descriptions, commit messages and reports to a parent agent are read by overhearers. The reader cannot ask "Duveen?", so the writer has to supply the repair turn in advance.
- Giving the reader more time does not fix it (the pause button had no effect). What the reader lacks is the referent, not reading time. Re-expansion has to add content, not just slow the text down.
- Overhearers are less calibrated: they guess, change answers and are wrong more often. A reader with a compressed reference may *act* confidently on the wrong referent.
- The shortened term is still the right choice *inside* the live dialogue with the same user. There it is precision, and grounding has licensed it.

## Candidate rules for the harness
1. **Re-expand coined labels for overhearers.** Any text that leaves the live dialogue (a summary, handoff, PR or commit description, subagent report, or document for a third party) must restate every session-coined label in full on first use, using standard terms: "option B (move the cache to Redis)", not "option B".
2. **Short labels are for the people who grounded them.** Inside a conversation, abbreviated references are fine once the user has confirmed them. Do not use them with a reader who was not part of that exchange, even one who has read the transcript.
3. **Write the clarification the reader cannot ask for.** For each reference in a handoff, ask "if the reader could ask one question here, what would it be?" and answer it inline. Do not rely on the reader to scroll back or re-read.

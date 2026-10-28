# Grayson & Billings (1981): Information Transfer Between Air Traffic Control and Aircraft

## Citation
Grayson, R. L. & Billings, C. E. (1981). Information Transfer Between Air Traffic Control and Aircraft: Communication Problems in Flight Operations. Chapter 4 (pp. 47-61) in C. E. Billings & E. S. Cheaney (Eds.), *Information Transfer Problems in the Aviation System*, NASA Technical Paper 1875 (report A-8567), NASA Ames Research Center, September 1981. NTRS 19810022620.
PDF (read in full for ch. 4, plus abstract and ch. 1 pp. 9-11): https://ntrs.nasa.gov/api/citations/19810022620/downloads/19810022620.pdf

Note: TP-1875 as a whole is an edited volume (eds. Billings & Cheaney). Grayson & Billings wrote chapter 4 only. The chapter says it is adapted from Grayson, R. L. (1981), *Effects of the Introduction of the Discrete Address Beacon System Data Link on Air/Ground Information Transfer Problems*, NASA CR-166165 (not read).

## Core claim
About 70% of ASRS reports involve some oral communication problem, and most of these come from human error by the sender or receiver, not from equipment. The biggest failure is content that is missing (never sent, incomplete, or sent too late), not words that are misheard. Listeners "hear what they expect to hear," so a read-back can sound right even when it is wrong.

## Key evidence
- Corpus: 6,527 ASRS reports (1 May 1978 to 31 Aug 1979). These held 5,402 information-transfer problems; one report can hold more than one (p. 47).
- Ten categories, counts as given in the chapter (pp. 50-53). The counts add up to 5,351. My shares use that sum:
  | Category | n | share |
  |---|---|---|
  | Absent - not sent | 1,991 | 37.2% |
  | Other inaccuracies in content (formulation and judgment errors) | 792 | 14.8% |
  | Untimely transmission | 710 | 13.3% |
  | Recipient not monitoring | 553 | 10.3% |
  | **Ambiguous phraseology** | **529** | **9.9%** |
  | Incomplete content | 296 | 5.5% |
  | Garbled phraseology | 171 | 3.2% |
  | Absent - equipment failure | 153 | 2.9% |
  | Inaccurate - transposition | 85 | 1.6% |
  | Misinterpretable - phonetic similarity | 71 | 1.3% |
- Definition of ambiguous (p. 51): "the composition, phraseology, or presentation of the message were such that the recipient would tend to misinterpret or misunderstand the message when receiving it under normal conditions." Example: "The runway is nine o'clock and 3 miles, can you see the runway? ... OK, turn to 360". The crew took this as a visual-approach clearance and descended below their assigned 4,000 ft.
- Definition of incomplete (p. 51): "the originator failed to provide all of the information necessary for the recipient to understand it properly." Example: "expect a profile descent" was never said.
- Transposition (p. 50) happens most often when one clearance holds several numbers, for example headings or distances plus altitudes. Example: "cross 10 DME east at 240" vs "cross 24 DME east at 10". A pilot's own fix (p. 52): "If Tower had issued 'expect further clearance from him,' it would have made this clear and concise."
- Expectation factor (p. 48): "99% of all clearances from that area are to descend to and maintain 10,000 ft ... I was programmed for 10,000 ft."
- ATIS (p. 53-54): pilots complained the recordings were read too fast ("had to listen to the ATIS seven times").
- The companion chapter 1 (Billings & Reynard, same volume, Table 1.1) reran the analysis on 12,373 reports and found 10,815 citations. "Message not originated" was 37% and "inaccurate/incomplete/ambiguous/garbled" was also 37%. The same chapter adds that visual data links reduce, but do not remove, transposition and expectation errors (p. 11).

## Sources it builds on
- Grayson (1981) NASA CR-166165 (DABS data-link study). The category scheme follows ASRS coding practice.
- NTSB accident reports AAR-79-11 and AAR-78-14, and Monan (1979), *Distraction*, NASA TM-78408. These are cited in the neighbouring chapter of the same volume.
- FAA Handbook 7110.65A and the AIM for ATIS content.

## Works that cite it (forward)
- Cushing (1994), *Fatal Words*: already covered in the crawl. UNVERIFIED that it cites ch. 4 by page.
- Monan, W. P. (1986). *Human Factors in Aviation Operations: The Hearback Problem*. NASA CR-177398. UNVERIFIED citation link.
- Morrow, D., Lee, A., & Rodvold, M. (1993). Analysis of problems in routine controller-pilot communication. This paper exists (Illinois Experts record). Its venue (*IJAP* 3(4)) and its citation of this chapter are UNVERIFIED.
- Prinzo, O. V. & Britton, T. W. (1993). *ATC/Pilot Voice Communications: A Survey of the Literature*. FAA DOT/FAA/AM-93/20. UNVERIFIED.

## Relevance to AI answer style
- This is empirical support for PRECISION over COMPRESSION. Almost half the failures were missing content: 37% absent and 5.5% incomplete. Garbled or confusable form (phonetic similarity, transposition, garbling) was only about 6%. Cutting a needed qualifier or next step ("expect further clearance from X") does more harm than wordiness.
- About 10% of failures were ambiguous phrasing that could be read two ways. Under expectation bias, the reader picks the routine reading. So when an answer departs from the default, say so outright.
- Several numbers packed into one sentence invite transposition. Label each number with its unit or role.
- Timing counts on its own (13%). Information that arrives too late is a failure even when it is accurate. Put what the user must act on first.

## Candidate rules for the harness
1. **No silent omission:** if the user needs a fact, caveat or next step to act correctly, include it, however short the answer. Drop words, never required content.
2. **Flag the non-default:** when the answer departs from what the user probably expects (a different version, a reversed recommendation, an exception), say so in words ("Note: unlike usual, ..."). Do not count on the reader to notice.
3. **Label every number:** in a sentence with two or more values, attach the unit or role to each one ("timeout 30 s, retries 3"). Avoid bare strings of numbers.

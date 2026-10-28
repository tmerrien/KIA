# Cardosi, Brett & Han (1996): An Analysis of TRACON Controller-Pilot Voice Communications

SUBSTITUTE: the assigned work, Cardosi (1993), already had a note (`cardosi-1993-en-route-readback-complexity.md`). This is its direct sequel, by the same lead author with the same method, applied to the terminal-approach (TRACON) environment. It was not in the queue or the covered list.

## Citation

Cardosi, K., Brett, B. E., & Han, S. (1996). *An Analysis of TRACON (Terminal Radar Approach Control) Controller-Pilot Voice Communications*. Final Report, June 1996 (reprint November 1997). DOT/FAA/AR-96/66 and DOT-VNTSC-FAA-96-7. Cambridge, MA: John A. Volpe National Transportation Systems Center, for the FAA Office of the Chief Scientific and Technical Advisor for Human Factors (AAR-100). Brett was at SAIC and Han at EG&G Dynatrend.

Full text (36-page scan, 22 numbered pages) read: https://rosap.ntl.bts.gov/view/dot/8711/dot_8711_DS1.pdf (record: https://rosap.ntl.bts.gov/view/dot/8711)

## Core claim

In approach and departure control, the readback error rate rises "slowly, but steadily" with the number of new pieces of information in a controller's transmission. Clearances with five or more elements make up 16% of messages but account for about a third of readback errors. Element count does not equal memory load, though. Predictable, expected and logically grouped information costs less, so the curve is weaker and less regular in the terminal area than en route. The recommendation stays the same: "keep their transmissions brief".

## Key evidence

- **Corpus.** 48 hours of tape from 8 TRACONs (Boston, Denver, Dallas-Fort Worth, Los Angeles, Miami, New York, Phoenix, Seattle), 4-8 hours each, depending on tape quality. 24 hours were high workload and 24 moderate, each split half arrival and half departure. The tapes hold 13,089 controller transmissions, of which 9,409 are "messages of substance" (clearances); the other 3,680 (requests, salutations and so on) were tallied but not analysed. Three coders did the work: one former controller and two pilots.
- **Element definition (slightly modified from 1993).** An element is "each word, or set of words... that contained a new piece of information for the pilot, and was critical to the understanding of the message... an opportunity for error". "Heading two five zero" is 2 elements, because it can come back as "speed 250" or as "heading 150". The call sign is excluded. The authors admit the scheme is "necessarily arbitrary", for example in whether a frequency is one element or four, and that "It is not reasonable to assume that all elements impose the same memory load."
- **Messages are longer here than en route (Table 3-1).** 1 element: 32%; 2: 27%; 3: 15%; 4: 10%; 5: 6%; 6: 4%; 7 or more: 5%. So 25% have four or more elements, against about 11% en route in Cardosi 1993.
- **Acknowledgements (Table 3-2).** Full readback 60%, partial 26%, "roger" only 5%, other 7%, none 2%. Fifteen of the acknowledgements were mike clicks, and six of those answered a real control instruction. "Each partial or missing readback presents an opportunity for a communications error" because it removes the hearback check.
- **Readback errors against complexity (Table 3-3).** There were 81 errors, under 1% of clearances. The rates are computed per full or partial readback at each level: 1: 0.7% (16); 2: 0.5% (12); 3: 0.9% (13); 4: 1.5% (14); 5: 3.6% (17 of 475); 6: 0.7% (2); 7 or more: 1.7% (7). The text says clearances with four or more elements were 26% of readbacks and 51% of errors, and those with five or more were 16% and 33%. My arithmetic from the table gives 40/81 = 49% for four or more and 26/81 = 32% for five or more, so the stated shares are slightly high. The curve peaks at 5 and then falls, which the authors call "not perfectly linear". The report gives no significance test (the 1993 report had one chi-square).
- **Why the effect is weaker in the terminal area.** Much of a long approach clearance is predictable from the ATIS and the party line. Pilots in the terminal area expect calls and are ready to write them down. Familiarity with the airport cuts the load. And "many of these pieces of information could be logically grouped by the pilot and would not impose the same memory load as the same number of unrelated pieces of information." Expectation is "a double-edged sword": it helps only when what is expected is what is actually sent. The introduction notes that the en route complexity effect "was not as strong in the ground control study and weaker still in the study of local tower".
- **Base rates against raw counts (Tables 3-4, 3-5).** By raw count, headings caused the most errors (36%), then frequencies (26%), altitude (17%) and speed (12%). Per readback of that type, frequencies are the most error-prone (1.1%), then speed (1%), heading (0.8%) and altitude (0.4%). The authors redid the analysis because the raw counts were misleading. (The text says 31 heading errors out of 3,396 readbacks; Table 3-4 says 29, an internal inconsistency.)
- **Hearback misses (Table 3-6).** 32 of the 81 errors (40%) went uncorrected. Controllers missed 55% of heading errors and 50% of speed errors but only 21-24% of altitude and frequency errors, perhaps because they "routinely assign the same ones". One missed error was a clean transposition: "heading three one zero... speed two one zero" came back as "three ten on the speed, two ten on the heading", where both numbers end in "ten".
- **Truncated readbacks of multi-digit values.** Only 52% of altimeter settings were read back even in part. Of those readbacks, 74% had all four digits, 10% had three and 14% only the last two. This matters because altitude deviations have been traced to crews checking two digits when three differed (29.92 against 28.92).
- **Ambiguity from non-standard phrasing.** "descend and maintain one one thousand, expect runway eight" came back as "one one thousand and down to eight". Shared terms can also mean different things to the two sides: "established on the localizer" means beam capture to pilots but stable tracking on the centreline to controllers, citing the MiTech/Carlow/FAA (1992) altitude deviation study.
- **Call signs.** In 79 cases (0.8%) the pilot answered with a different call sign, and 53% of these were never corrected. Similar call signs were the only coincident factor seen in several miscommunications (6%). Weather, equipment, speech rate, accent and non-standard phraseology were not seen with any error, though the authors stress that 81 errors are too few to test them.
- **A self-repair worked.** A pilot read back "zero six zero" for "zero eight zero" and then called back on his own to confirm, probably prompted by the other crew member. The recommendations ask pilots to "ask for clarification, rather than expect the controller to catch readback errors".

Limitations: the study is observational, with no control over which messages are long. It sampled one position for one hour and did not follow flights, so consequences are not seen. It has few errors and no inferential statistics. The citations of the earlier studies are partly swapped: the text calls the en route study "Cardosi, 1994" and the tower study "Cardosi, 1993", but the reference list has en route = 1993 (RD-93/11) and tower = 1994 (RD-94/15).

## Sources it builds on

- Cardosi, K. (1993). *An analysis of en route controller-pilot voice communications*. DOT/FAA/RD-93/11. Already covered.
- Cardosi, K. (1994). *An analysis of tower (local) controller-pilot voice communications*. DOT/FAA/RD-94/15. Not read.
- Burki-Cohen, J. (1995). *An analysis of tower (ground) controller-pilot voice communications*. DOT/FAA/AR-96/19. Not read.
- Morrow, D., Lee, A., & Rodvold, M. (1993). Analysis of problems in routine controller-pilot communication. *International Journal of Aviation Psychology* 3(4), 285-302. Already queued.
- Morrow, D., & Rodvold, M. (1993). *The influence of ATC message length and timing on pilot communication*. NASA CR-177621. Already covered as `morrow-1993-message-length-timing.md`.
- MiTech Inc., Carlow International & FAA R&D Service (1992). *Altitude deviation study: A descriptive analysis of pilot and controller incidents*. Final Report, October 1992. Pilots linked 49% of their altitude deviations to multiple instructions in one transmission. Not read.
- Monan, W. P. (1983). *Addressee errors in ATC communications: The call sign problem*. NASA CR-166462. Not read. The covered Monan work is the 1986 hearback report.
- ASRS Callback No. 163 (December 1992), "Readback/hearback - some fresh ideas".

## Works that cite it (forward)

Checked in the citing full text:
- Prinzo, O. V., Hendrix, A. M., & Hendrix, R. (2009). *The Outcome of ATC Message Length and Complexity on En Route Pilot Readback Performance*. DOT/FAA/AM-09/2. Already covered as `prinzo-2009-...`. It says Prinzo et al. (2006) "took the concept of message complexity that was originally proposed by Cardosi (1993) for the ARTCC domain, modified by Cardosi et al. (1996) for the TRACON domain, further refined it and provided a theory-driven rationale" (after Wasow 1997), and it lists Cardosi, Brett & Han (1996) among the baseline studies.
- Morrow, D. G., & Prinzo, O. V. (1999). DOT/FAA/AM-99/21. Already covered. It cites "Cardosi, 1996" for the claim that frequency and altitude readbacks are especially error-prone, and uses that to justify choosing those instructions for its experiment.
- Prinzo (1998), DOT/FAA/AM-97/17. It cites the study alongside Cardosi 1993 and Burki-Cohen 1995. This comes from the existing Cardosi 1993 note; I did not re-check it here.

## Relevance to AI answer style

- **The cost of an answer is unrelated load, not item count.** Cardosi et al. say outright that a count of elements overstates load when the items are predictable, expected or "logically grouped". This is the PRECISION side. An answer can carry many specifics cheaply if they fit one frame the user already holds, such as a single command with its flags or one config block. Five unrelated facts in one paragraph cost far more.
- **Base rates against raw counts.** The authors noticed that the type of information with the most errors (headings) was not the most error-prone per use (frequencies). An assistant reporting evidence should give rates, not counts, wherever the count is driven by exposure.
- **Partial uptake and truncated values.** 14% of altimeter readbacks kept only the last two digits. Listeners compress long numbers to the part they think varies. An assistant should state a critical value in full, once, in a form that is hard to truncate, such as a code block or a full version string. It should not trust the reader to keep the prefix.
- **Similar-looking items in one message.** "Three one zero" and "two one zero" in one transmission were swapped, and the swap went unnoticed. When an answer holds two values of the same shape, such as two ports, two paths or two version numbers, it should give each a distinct label and keep them apart.
- **Shared terms can diverge.** "Established on the localizer" meant different things to the two parties. That is a failure of PRECISION through an unchecked term, not of length. Define a load-bearing term the first time it could be read two ways.

## Candidate rules for the harness

1. **Weight elements by how unrelated they are.** Apply the cap of about 4 elements from Cardosi 1993 to *unrelated* new items. Items that fill slots in one familiar frame the user already holds (one command, one code block, one table row) count roughly as one. Do not split a coherent structure just to meet the count.
2. **Keep same-shaped values apart.** When an answer contains two or more values of the same form (numbers, paths, IDs, versions), label each with its role ("port 8080 for the API; port 5432 for Postgres"). Never put them next to each other with no label. Write critical values out in full, never as a suffix or "the same but ending in 2".
3. **Give rates, not raw counts, when exposure differs.** When reporting which option fails, errors or costs most, normalize by how often it is used or how many there are, or say plainly that the figure is a raw count.

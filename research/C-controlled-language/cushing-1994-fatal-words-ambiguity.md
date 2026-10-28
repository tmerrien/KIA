# Fatal Words (Cushing, 1994): how ambiguous wording causes aircraft accidents

## Citation
Cushing, S. (1994). *Fatal Words: Communication Clashes and Aircraft Crashes*. Chicago: University of Chicago Press. xiv + 162 pp. (cloth 1994). Paperback ISBN 9780226132013, 176 pp., 1997.
- Publisher page (description and table of contents): https://chicagoreference.com/ucp/books/book/chicago/F/bo3633901.html
- Internet Archive scans (print-disabled lending only, so the full text was not readable): https://archive.org/details/fatalwordscommun0000cush

**What was read.** The book itself was NOT read; its full text is lending-restricted. The note rests on two texts Cushing wrote himself, both read in full:
- **Cushing, S. (1995).** "Pilot-Air Traffic Control Communications: It's Not (Only) What You Say, It's How You Say It." *Flight Safety Digest* 14(7), July 1995, Flight Safety Foundation. https://flightsafety.org/fsd_jul95 (PDF; text extracted with pdftotext). Its editorial note says: "This article is based in part on Steven Cushing's book *Fatal Words*." This is the main source for the evidence below.
- **Cushing, S. (1994).** "Plane Speaking." *Verbatim* 21(2), Autumn 1994. https://www.verbatimquarterly.com/v21_2

Anything attributed to the book beyond the publisher's table of contents and these two articles is UNVERIFIED.

## Core claim
Many aviation accidents and incidents come from properties of language itself, not only from equipment or discipline:
- lexical ambiguity;
- homophony ("to"/"two");
- slipping from aviation jargon into everyday English, or into another language's grammar;
- uncertain reference of pronouns and "OK";
- an unclear speech act (a statement heard as an instruction);
- numbers confused with one another.

Messages that are clear to the sender fail when the receiver is under workload or is expecting something else. Defences come in layers:
- awareness, plus a willingness "to use more words to get meanings across" (*Verbatim*);
- the read-back/hear-back loop;
- in the long run, an interface that only lets well-formed messages in a restricted English-like language through (Cushing 1995).

## Key evidence (Cushing 1995 FSF article and 1994 *Verbatim* essay, read directly)
- **Corpus.** More than 200 communication-related incidents, drawn from NASA ASRS reports, NTSB accident reports and ATC audio recordings (FSF 1995). The article cites Grayson & Billings (1981), who classified 529 of 6,527 ASRS reports as "ambiguous phraseology".
- **Tenerife, 27 March 1977 (583 dead): a failure of precision.**
  - KLM radioed "We are now at take-off" as the aircraft began its roll. The controller understood "at" as a place, the take-off point.
  - Cushing explains this as code-switching: Dutch expresses the progressive with "aan het" plus the infinitive.
  - The controller's own message ("you are cleared to the Papa beacon ... right turn after take-off") used "cleared" for something that was not a take-off clearance. The KLM crew heard it as one.
  - Cushing notes that controllers now use "anticipate"/"expect" to mark the time frame, and that "they are not without dangers of their own", because expectation primes people to mishear.
- **"Hold", Santa Ana, 17 Feb 1981 (34 injured, aircraft destroyed): a vernacular sense displaced the reserved one.** "In aviation parlance, 'hold' always means to stop what you are now doing. But in ordinary English, 'hold' can also mean to continue what you are now doing." The captain used "hold" to mean "continue the landing".
- **"To"/"two", a fatal accident "at a southeast Asian airport".**
  - ATC cleared the aircraft to descend "two four zero zero". The pilot read back "OK. Four zero zero" and descended to 400 ft. The controller did not catch the bad read-back.
  - In a second case, "cleared two-seven" (runway 27L) was heard as "cleared to seven" (7,000 ft).
  - The accident is not named in the article. It is commonly identified as Flying Tiger 66 (Kuala Lumpur, 1989); that identification is UNVERIFIED here.
- **Omitting the reserved word: a failure of compression.** At Cove Neck, NY (1990, 73 dead), the crew said "We're running out of fuel" but never said the required word "emergency" (*Verbatim*).
- **Uncertain reference.** Everglades, 29 Dec 1972 (101 dead):
  - The controller asked "How are things coming along up there?" and the crew answered "OK".
  - The crew meant the nose-gear problem; the controller meant the altitude.
  - The terse acknowledgement had no stated referent.
- **Ellipsis hides the speech act.** "traffic ... level at 6000" was a report about other traffic, but a pilot took it as an instruction to level at 6,000.
- **A conditional heard as a clearance.** "I can give you FL290" was read back as "cleared to FL290", and the controller did not challenge it.
- **Context carried over silently.**
  - The controller first asked about airspeed, then said "Maintain 280".
  - The pilot read back "280 knots", but the controller meant altitude.
  - "The controller had established a context of airspeed ... and failed to indicate that the subject had changed."
- **Numbers.**
  - The same number range serves many parameters ("240 can be a flight level, a heading, an air speed or the airline's flight number").
  - Errors cluster when one transmission calls for two or more actions with numbers. Cushing cites Monan (1983) and Grayson & Billings (1981).
  - Saying a call sign after a remembered number invites confusion (Salzinger et al., 1979).
- **Read-back/hear-back loop.** The loop has four steps: transmit, listen, read back, and listen to the read-back. Its safety margin "depends on all four elements" being done. Monan (1988) found the hear-back is "frequently ... missed". An inadequate "roger"/"okay"/"so long" sign-off "precludes any controller double-check".
- **Remedies, quoting Prinzo & Britton (1993):**
  - "Only a few speech acts should make up a single transmission."
  - The speech acts in one transmission should be "topically related".
  - Information should be chunked.
  - Preface an uncertain read-back with "Verify".
- **Remedy: a restricted language with a parser.** The AIR (Aviation Interface Research) prototype uses nested menus. A parser checks every message against a "restricted English-like language" before sending it, and returns an error to the sender if the message fails.
- **Remedy: varied wording.** As a planned feature, AIR would "choose randomly from a set of synonymous alternative formulations" to break the "semi-hypnotic boredom" of repeated identical wording. This is a notable tension with fixed phraseology.
- **Closing line:** "explicit instructions by controllers, complete readbacks by pilots and active listening by controllers to pilots' readbacks are the best defense against miscommunication ... which, at worst, can mean fatal words."
- **Book structure (publisher's table of contents).**
  - Part I, language-based problems: Language, Reference, Inference, Repetition.
  - Part II, problems not based on language: Numbers, Radios, Compliance, General.
  - Part III, solutions: Immediate Fixes; Intelligent Voice Interface; Error-Resistant Visual Interface.
  - Back matter includes an "Index of Problematic Phrases".

## Sources it builds on (from the FSF 1995 reference list, read)
- Grayson, R. L. & Billings, C. E. (1981). "Information Transfer Between Air Traffic Control and Aircraft: Communication Problems in Flight Operations." NASA TP-1875.
- Monan, W. P. (1983). *Addressee Errors in ATC Communications: The Call Sign Problem.* NASA CR-166462. Also Monan (1988). *Human Factors in Aviation Operations: The Hearback Problem.* NASA CR-177398.
- Prinzo, O. V. & Britton, T. W. (1993). *ATC/Pilot Voice Communications: A Survey of the Literature.* FAA DOT/FAA/AM-93/20.
- Salzinger, K. et al. (1979). Behavioral analysis of verbal interaction between pilots and air traffic controllers. *Transportation Research Record* 732.
- Golaszewski, R. (1989). "An Analysis of Pilot-Controller Read-Back Errors." *Journal of ATC*.
- Sweeney, F. M. (1993). "Phraseology: Same Word, Different Meaning." FSF 46th IASS.
- NTSB AAR-73-14 (Everglades), NTSB AAR-81-12 (Santa Ana), the Spanish Ministry of Transport report on Tenerife (1978), and NASA ASRS *Callback* issues.
- Cushing's own earlier report: Cushing, S. (1989). *Language and Communication-related Problems of Aviation Safety.* ERIC ED-296 505.

## Works that cite it (forward)
- Krifka, M., Martens, S. & Schwarz, F. "Group Interaction in the Cockpit: Some Linguistic Factors." Humboldt-Universität zu Berlin manuscript, PDF dated 2002. https://amor.cms.hu-berlin.de/~h2816i3x/Publications/GihreLB-Krifka.pdf. VERIFIED (read): it summarises Cushing (1994) on Tenerife, "hold", "PD" (pilot's discretion vs profile descent), "climb two five zero" heard as "climb to five zero", and "back on the power". It adds a caveat: "A rule like 'avoid pronouns' or 'avoid ellipsis' would very likely be counter-productive in making communication too verbose." Final publication venue UNVERIFIED.
- Bliek, O. "Communication Errors: Based on a story by Steve Cushing." https://www.leonardo-in-flight.nl/PDF/Communication%20Errors.pdf. VERIFIED (read): a near-verbatim adaptation of the FSF 1995 article for pilot training.
- Not opened, so UNVERIFIED:
  - Tajima, A. (2004). "Fatal miscommunication: English in aviation safety." *World Englishes* 23(3).
  - Jones, R. K. (2003). "Miscommunication between pilots and air traffic control." *Language Problems and Language Planning* 27(3).
  - Howard, J. W. (2008). "'Tower, am I cleared to land?': Problematic communication in aviation discourse." *Human Communication Research* 34(3).
  - ICAO Doc 9835 (Manual on the Implementation of ICAO Language Proficiency Requirements, 2004/2010).

## Relevance to AI answer style
Cushing's cases give the failure evidence that separates **precision** from **compression**:
- **Precision failures** come from a word with the wrong or two meanings:
  - "at take-off" for "taking off";
  - "hold" in its vernacular sense;
  - "cleared" for a non-clearance;
  - "to" heard as "two".
  - The fix is the exact, reserved term. That costs no extra words.
- **Compression failures** come from dropping the load-bearing element:
  - the missing word "emergency";
  - "OK" with no referent;
  - "level at 6000" with the subject elided;
  - "Four zero zero" with a digit dropped;
  - "Maintain 280" with no unit after a topic change.
  - The fix *adds* a few words: the referent, the unit, the subject.

Cushing's own advice, "be willing to use more words", applies to this second class only. Krifka et al.'s caveat keeps it from turning into verbosity: you cannot ban pronouns or ellipsis wholesale, only stay alert to them where the referent could be mistaken.

For an assistant, the analogues are:
- "Done", "OK" or "Yes" without saying *what* is done.
- Prose that blurs "I can do X" (an offer) into "I did X" (a report).
- A bare number whose unit or parameter changed since the last turn.
- A restatement of the user's instruction that silently drops part of it. This is the read-back that "passes unchallenged".

## Candidate rules for the harness
1. **Name the referent of every acknowledgement or status word.** Never answer with a bare "Done", "OK", "Fixed" or "Yes" when more than one thing is in play. Write "Tests pass; the lint step still fails", not "OK". (Everglades "OK"; the missing word "emergency".)
2. **Keep offer, plan and report linguistically distinct.** Use completion verbs ("deleted", "pushed", "deployed") only for actions that actually happened. Mark possibilities and plans explicitly ("I can ...", "Next I would ..."), so a conditional is never read as authorisation or completion. (Tenerife "cleared"; "I can give you FL290".)
3. **When you restate a user's instruction or a value, restate it whole and labelled.** Give every digit, the unit and the parameter name, especially after the topic changed. Put one critical number per clause. If uncertain, flag it ("Verify: you want 2400 ms, not 400?") rather than silently normalising. ("two four zero zero" read back as "four zero zero"; "Maintain 280" after the airspeed context.)

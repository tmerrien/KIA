# Monan (1986): The Hearback Problem, or why a read-back that nobody checks is not a check

## Citation
Monan, W. P. (1986). *Human Factors in Aviation Operations: The Hearback Problem.* NASA Contractor Report 177398, Battelle Columbus Division, for NASA Ames Research Center (contract NAS2-11934). Report date March 1986. Reissued as NASA ASRS Publication 33.
- PDF, read in full (30 pp. plus the report documentation page): https://asrs.arc.nasa.gov/docs/rs/33_Human_Factors_The_Hearback_Problem.pdf

**Date note.** The report documentation page says "March 1986". Cushing (1995, *Flight Safety Digest*) cites the same report number as Monan (1988). These look like the same document. The 1988 date is UNVERIFIED and may be a later printing.

**Why this work and not Cushing.** This note was queued for Cushing (1994), but `cushing-1994-fatal-words-ambiguity.md` already exists. Following the crawl rule, this note covers the primary study Cushing relies on for the read-back/hear-back loop instead.

## Core claim
Read-back is a redundancy check, and it works only if someone actively listens to the read-back ("hearback"). In practice that listening step often drops out. Pilots then treat the controller's *silence* as confirmation, so a wrong read-back becomes a wrong action that carries apparent authorisation. The danger is not only mishearing. It is also the false assurance that comes from a verification loop that was never closed.

## Key evidence
- **Corpus.** The study period was April 1981 to July 1983 (29 months). It began with 763 ASRS reports of erroneous read-backs or missed hearbacks and kept 417 incidents after deduplication: 332 from pilots and 85 from controllers (pp. 1, 3).
- **Outcomes (Table 2).** 232 altitude deviations, 143 heading deviations, 34 hold-short or ground mishaps, and 8 routing errors. 148 of these became traffic conflicts (p. 9).
- **Link failures (Table 3).**
  - **Transmitted correctly, misheard, and the hearback failed: 328 incidents.** Within these:
    - 174 misheard numerics, including the 10,000/11,000 mix (28) and the FL200/FL220 mix (11);
    - **46 "inadequate acknowledgements ('Roger', 'So Long', 'Okay') with subsequent flight deviations"**;
    - 38 amendments not attended to;
    - 71 read-back errors caused by cockpit mismanagement.
  - **Heard and read back correctly, but cockpit mismanagement still caused a deviation: 71 incidents.** Within these:
    - 46 misused the altitude alerter;
    - 25 were "forgetting".
  - **Controller hearback failures: 298 incidents.** Within these:
    - 174 cases where the controller failed to hear the error in the read-back;
    - 86 where the error's source was unknown but it was not caught;
    - 38 amendments that were neither acknowledged nor challenged.
- **Ways the hearback step went missing (p. 4):**
  1. The pilot misheard and read back the wrong value.
  2. The controller did not listen, "the airman accepted lack of response as silent confirmation".
  3. The read-back was correct, but the crew then mishandled it.
  4. Controller slips in the original transmission were not caught at read-back. Related: bare "Roger"/"okay"/"So long" acknowledgements "precluded any controller double-check".
- **Compound messages.** "Mishearing of the numbers occurred most frequently when single, one sentence clearance messages called for two or more separate pilot actions." An example is "cross XYZ at one one thousand, descend and maintain one zero thousand, reduce speed to 250 knots" (p. 11).
- **Expectation.** Pilots "heard what they expected to hear, heard what they wanted to hear and frequently did not hear what they did not anticipate hearing -- amendments". One pilot noted that crews "interpret an advisory of traffic at some altitude as clearance to that altitude". Another: "If flight crews plan or request a specific altitude, they tend to translate the next clearance into that altitude" (p. 11).
- **Silence read as approval.** The study's dominant theme is the pilots' question: "So, we made a mistake. BUT we made a readback. WHY didn't the controller catch our error?" Pilots wrote "I read back, they didn't say anything so I descended". One pilot said, "I could read back my social security number and most controllers would not question it" (pp. 12-15). Crews also settled doubtful numbers by "consensus poll" in the cockpit, not by querying ATC (p. 23).
- **Over-trust in the check suppresses common sense.** Pilots accepted descents below terrain, 180-degree turns and wrong-direction flight levels, because the read-back "passed unchallenged" (p. 28).
- **Automation replaces attention.** In the 46 alerter misuses, the altitude window "became the sole authority". Crew responsibility for altitude awareness "appeared to have been transferred to an external memory device" (pp. 24-25).
- **A role swap breaks the loop.** In one case the pilot flying, not the pilot communicating, set the alerter to "310" after the first officer had acknowledged heading 310 (p. 25).
- **Regulatory gap (p. 5 and Addenda).** Controllers had no written duty to listen to read-backs. The AIM even allowed controllers to "observe your response visually or on radar". In February 1985 the FAA added handbook para 2-72 "Ensuring Acknowledgement". It requires controllers to "ensure the readback is correct. If incorrect, distorted, or incomplete, make correction". As of June 1985, ASRS reports were still arriving at roughly the same rate (p. 31).

## Sources it builds on
- NASA ASRS *CALLBACK* No. 11 (May 1980), the first use of "hearback" in this sense (ref. 1).
- Monan, W. P. (1983). *Addressee Errors in ATC Communications: The Call Sign Problem.* NASA CR-166462, the companion study (ref. 2).
- FAA *Airman's Information Manual* (July 1984), paras 265 and 192c, the read-back advisory and the "observe on radar" exception (refs. 3-4).
- Implicitly, Grayson & Billings (1981), the earlier ASRS taxonomy. It is already covered in this track and is not cited by Monan.

## Works that cite it (forward)
- Cushing, S. (1995). "Pilot-Air Traffic Control Communications: It's Not (Only) What You Say..." *Flight Safety Digest* 14(7). VERIFIED by way of the existing Cushing note in this track, which records that it cites Monan (1988) CR-177398 for "hearback is frequently missed".
- Cushing (1994), *Fatal Words*: UNVERIFIED that the book itself cites it.
- Morrow, D. & Rodvold, M. (1993). *The Influence of ATC Message Length and Timing on Pilot Communication.* NASA CR-177621. https://ntrs.nasa.gov/api/citations/19940010271/downloads/19940010271.pdf. Read: it cites Monan (1983), **not** the 1986 report. It is a direct experimental follow-up on the compound-message finding.
  - Pilots made more read-back errors after one four-command message than after two two-command messages: F(1,15)=7.1, p<.05.
  - They asked for clarification more often after the long message: F(1,15)=13.1, p<.01.
  - When the second short message came too soon, it interfered with the first.
- UNVERIFIED (not opened):
  - Prinzo & Britton (1993), FAA DOT/FAA/AM-93/20;
  - Morrow, Lee & Rodvold (1993), *International Journal of Aviation Psychology* 3(4);
  - Cardosi (1993), FAA DOT/FAA/RD-93/20 on controller-pilot communication errors;
  - Eurocontrol air-ground communication safety study (2006).

## Relevance to AI answer style
- **Restating the instruction is a precision device, not padding.** It earns its words only if the other party can check it. An assistant that paraphrases the request ("You want X with Y") makes its interpretation checkable. A vague restatement ("Got it, working on it") is the "Roger" that "precluded any double-check". It is compression, because the content needed for verification has been dropped.
- **Silence is not confirmation, in either direction.**
  - An assistant should not treat the user's lack of objection to a stated assumption as approval for a destructive or irreversible step.
  - An assistant should not imply that "the tests/linter/user would have caught it" as a reason to skip its own check. Monan's crews flew toward terrain because a check that never happened had seemed to pass.
- **One action per sentence when values matter.** Monan observed that errors cluster in multi-action messages, and Morrow & Rodvold confirmed it experimentally. So the assistant should split instructions that carry several numbers or commands into separate lines or steps, each with its own value. This is precision through structure, not extra words.
- **Expectation bias in the reader.** Users "translate the next clearance into" what they asked for. If an answer departs from what the user expects (a different number, version, or command than they requested), the assistant must flag the departure explicitly. Otherwise it will be misread as the expected value.
- **Automation dependence.** When a tool output or a setting becomes "the sole authority", the error goes through unnoticed. An assistant reporting a configured value should state the value it actually set, not the value that was intended.

## Candidate rules for the harness
1. **Make acknowledgements checkable.** Before acting on a multi-part or numeric instruction, restate the load-bearing values: numbers with units, names, the scope of the change. Never use a contentless "Got it" or "OK" as the only confirmation. (46 deviations followed "Roger"/"Okay"/"So long".)
2. **Do not read silence as approval, and flag departures from expectation.** Treat the user's non-objection as consent only for reversible steps. When the answer differs from what the user asked for or probably expects, say so in the first line ("Note: this uses v2.3, not v3.0 as requested, because ..."). (Pilots descended on unchallenged read-backs; crews heard the altitude they had requested.)
3. **One command or value per line in procedural answers.** When an answer has several actions with numbers (ports, versions, paths, limits), put each one in its own step or line, not in a single compound sentence. (Misheard numbers peaked in single sentences with two or more actions; Morrow & Rodvold 1993 found the same in a controlled experiment.)

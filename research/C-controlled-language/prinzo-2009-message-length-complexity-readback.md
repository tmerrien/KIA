# Prinzo, Hendrix & Hendrix (2009): ATC message length vs. complexity in en route readbacks

## Citation
Prinzo, O. V., Hendrix, A. M., & Hendrix, R. (2009). *The Outcome of ATC Message Length and Complexity on En Route Pilot Readback Performance*. DOT/FAA/AM-09/2, Final Report, January 2009. FAA Office of Aerospace Medicine / Civil Aerospace Medical Institute, Oklahoma City. Task AM-B-06-HRR-516. 38 pp.
- Full text (read in full, 43-page PDF): https://libraryonline.erau.edu/online-full-text/faa-aviation-medicine-reports/AM09-02.pdf
- Mirror: https://rosap.ntl.bts.gov/view/dot/58347
- Companion (first) report, TRACON environment: Prinzo, Hendrix & Hendrix (2006), DOT/FAA/AM-06/25, https://libraryonline.erau.edu/online-full-text/faa-aviation-medicine-reports/AM06-25.pdf (not read)

## Definitions you need before the result means anything
The queue note says the report "finds that length, not complexity, drives readback errors". That is half right, and the terms are easy to misread.
- **Message length (ML / NAT)** is the *number of aviation topics* in a transmission (altitude, speed, frequency, route...), so 1, 2, or 3-4. It is **not** a word count or a duration. It is the closest thing here to Cardosi's (1993) "pieces of information", and so to an element or idea count.
- **Complexity level (CL)** is the sum of per-topic complexity values. Each anchor word ("contact", "point", "thousand"), digit, and qualifier scores 1, and one point is added for excessive verbiage beyond FAA Order 7110.65 phraseology. "Contact Minneapolis Center 118.8" scores CV = 6. Cardosi scored it as 1 or 2 pieces. CL therefore works like a weighted *token* load: words, digits, and articulation length (Baddeley's loop), with Miller's 7±2 cited as the rationale. Range 1-31.
- **Error of omission**: part of the content is missing, but what was read back is correct. 98% of these were dropped *anchor words*, e.g. "point" in a frequency.
- **Readback error**: wrong content, by substitution or transposition, mostly combined with an omission.

## Core claim
In 51 h of 2006 en route tapes (5 ARTCCs, 4,261 analysed ATC messages, 3,799 readbacks), token-weighted complexity raised only errors of omission, which are mostly harmless dropped anchor words. The number of topics per transmission raised both omissions and real content errors (substitutions and transpositions). The authors recommend at most three topics per transmission, a route clearance as its own transmission, repeating or spelling out fix names, no slang, and cutting filler words ("on, your, to, is").

## Key evidence (all verified in the PDF)
- Of 6,875 ATC transmissions, 4,261 met the criteria. 84.3% had 1 topic, 14.1% had 2, 1.4% had 3, and 0.1% had 4 (Table 8). 51% of one-topic messages had CL 6-7 (Table 9).
- Pilot responses (Table 10): full readback 81.2% (Cardosi 1993: 71%), partial 8.6%, ack-only 2.8%, no acknowledgment 3.8%.
- Of 3,799 readbacks, only 28.7% were perfect, with all anchor words. 67.4% had omissions only, 0.9% had readback errors only, and 3.1% had both. Readback errors overall were 4.0% (151 transmissions).
- Pearson r (n = 3,799, p < .05), against complexity and against length:
  - Omissions: r = .46 with complexity, r = .29 with length.
  - Readback errors: r = .11 with complexity, r = .14 with length.
- One-way ANOVAs on data aggregated by facility × sector × level:
  - Complexity and omissions: F(4,89) = 52.41, significant, with a steady rise. CL ≤ 3 gave 72% correct readback, and CL ≥ 7 gave under 15% (Fig. 5).
  - Complexity and readback errors: F(4,89) = 1.97, n.s.
  - Length and omissions: F(2,45) = 5.97, significant.
  - Length and readback errors: F(2,45) = 3.61, significant. On Fisher LSD the NAT 3-4 group was above NAT 1 and NAT 2. The executive summary also says errors rise "once ATC messages included two or more ATs", which is inconsistent with that post hoc. Treat the threshold as 3, possibly 2.
- Per-topic error rates (Table 15): holding 22% (n = 9), altimeter 6.2%, altitude restriction 5.8%. Frequency (30%) and altitude (22%) account for most errors in absolute count.
- 112 requests for repeat. Of the 107 not caused by a controller call-sign error, 37% asked for the whole transmission, and 67.5% of those whole-transmission requests contained a fix, intersection, or facility *name*. Names, not numbers, are what listeners could not recover.
- Inter-coder reliability: Krippendorff's α = .945 on 125 messages.
- Theory cited: three as the upper limit for propositional representations (Barshi & Healy 2002) and for sentence processing (Lewis 1996). Dropping redundant anchors "is comparable to retaining the gist of a conversation rather than its exact wording" and "has no adverse affect on pilot's actions" (Barshi & Healy 2002).

## Caveats
- The tests are correlational, not experimental. The ANOVAs use aggregated cells, and no p-values are printed for the F tests, only "significant" or not.
- Length and complexity are confounded, since more topics means more tokens. There is no regression that partials one out of the other. The bivariate r actually favours complexity for omissions.
- "Errors of omission" are dominated by harmless anchor-dropping. The authors note that frequency readbacks like "one nine two five" count as omissions only. So the large complexity effect is mostly on *benign* compression.
- Recommendation 5 (cut filler words) is not tested in the data. It is asserted, and it relies on the claim that "the phraseology created by the FAA is precise."

## Sources it builds on
Cardosi (1993), already covered. Cardosi, Brett & Han (1996), TRACON, DOT/FAA/AR-96/66. Prinzo (1996), DOT/FAA/AM-96/26. Prinzo & Britton (1993), literature survey. Prinzo, Britton & Hendrix (1995), the ATSAT coding form. Prinzo et al. (2006), AM-06/25. Morrow & Prinzo (1999), AM-99/21. Barshi & Healy (2002), Memory & Cognition 30:1189-1203. Lewis (1996), J. Psycholinguistic Research 25:93-115. Wasow (1997), Language Variation and Change 9:81-105. Miller (1956). Baddeley & Hitch (1974). Baddeley, Thomson & Buchanan (1975). Baddeley (2000). Krippendorff (1980).

## Works that cite it
- Flight Safety Foundation, *AeroSafety World*, May 2009, pp. 53-56, "InfoScan: Say No More / Topical Storm Warning", https://flightsafety.org/wp-content/uploads/2016/12/asw_may09_p53-56.pdf (read). This is a practitioner digest. It describes the finding as "more important than the duration of the message is the number of different items of information". It also misdescribes Table 14: it calls 78.1% a "combination of transposition and substitution", but the report says these were combined with omissions.
- Academic forward citations are UNVERIFIED. OpenAlex and Semantic Scholar were rate-limited during this session, and no citing paper was opened.

## Relevance to AI answer style (PRECISION vs COMPRESSION)
- The best-supported cap is on **separate topics or ideas per unit** (≤ 3), not on word count. Topic count is the variable linked to real content errors. Token load mostly produced harmless dropping of redundant scaffolding.
- That dropping is the *receiver* compressing benignly. Listeners keep the gist and shed anchors. The harmful cases are compression that creates **ambiguity**: "two five" for 250 knots, "nineteen zip", "to level one nine". These are slang or private shorthand that is not the shared code. This matches the PRECISION/COMPRESSION split: trimming a word the shared code makes predictable is safe, and replacing the standard term with a shortened ad hoc form is not.
- **High-entropy identifiers** (proper names, fix names, identifiers) are where the most repeat requests came from. The recommendation is to *add* redundancy there by repeating and spelling out. Concision is not uniform: cut filler, but spend extra words on the exact names the reader must act on. For an assistant, that means file paths, commands, flag names, version numbers, and API names.
- Bundling a long, complex item (a route clearance) with others raised errors, so the authors isolate it. An answer should put the one complex artifact, such as a long command or a multi-step procedure, in its own block, not inline among other points.

## Candidate rules for the harness
1. **Topic cap, not word cap.** Give at most three distinct actionable points per paragraph or turn segment. If there are more, split them into a list or separate sections. Do not achieve brevity by deleting standard terms.
2. **Isolate the heavy item.** Put any long or high-load artifact (a multi-part command, a path list, a procedure) in its own block or step, separate from commentary.
3. **Spend words on identifiers, cut them on filler.** Give exact names, paths, versions, and identifiers in full and verbatim, never as private abbreviations or slang. Remove connective filler that the standard phrasing makes redundant.

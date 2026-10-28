# CAP 413 Radiotelephony Manual (UK CAA, Edition 24, 2026): standard ICAO-derived phraseology

## Citation
UK Civil Aviation Authority. *CAP 413: Radiotelephony Manual*, Edition 24, effective 1 July 2026. It implements ICAO Annex 10 Vol. II and Vol. V, Annex 11, Doc 4444 PANS-ATM, **Doc 9432 Manual of Radiotelephony** (4th ed., 2007), and ICAO Circular 211, together with UK SERA Section 14.
Link: https://www.caa.co.uk/publication/download/18165 (official PDF, read in full-text form for this note). Index: https://www.caa.co.uk/cap413

Note: ICAO Doc 9432 itself is a paywalled publication (ICAO store, ISBN 92-9194-996-5) and could not be opened, so its own wording is UNVERIFIED here. CAP 413 is the freely available official national implementation, and its Foreword states that it is built on Doc 9432.

## Core claim
Safety-critical voice communication should be "concise and unambiguous, using standard phraseology for all situations for which it is specified". Plain language is a fallback, used "only when standard phraseology cannot serve an intended transmission" and then "as clear and concise as possible" (para 3.1; Foreword para 12). How thoroughly a message must be read back scales with how serious a misunderstanding would be (para 2.68).

## Key evidence (from the primary text)
- Para 2.1, Table 1: every message is classified as a *clearance* (read back verbatim), an *instruction* (read back, or for a short, clear and unambiguous one acknowledge with ROGER or WILCO "for the sake of brevity"), or *information* (not read back; ask for a repeat if it was not understood).
- Para 2.2: "Verbose transmissions are to be avoided, and one of the most common faults in radiotelephony is the unnecessary retransmission of simple instructions and information."
- Para 2.3: "Incidents and accidents have occurred in which a contributing factor has been the misunderstanding caused by the use of non-standard phraseology." Para 2.4: "The importance of using correct and precise standard phraseology cannot be over-emphasised."
- Para 2.67 is a reserved-word rule: "The words 'TAKE-OFF' are used only when an aircraft is cleared for take-off ... At all other times the word 'DEPARTURE' is used." This is the post-Tenerife (1977) fix for a high-consequence word used ambiguously. The link to Tenerife is background knowledge and is not stated in the text read.
- Para 4.17: pre-departure phraseology is designed so that it "cannot be interpreted as a take-off clearance". The runway designator is stated *before* the clearance ("Runway 06, cleared for take-off").
- Para 3.3-3.5: redundancy is added where confusion is possible ("degrees" after headings ending in zero; "hectopascal" below 1000). Specific words ("surface", "knots", "visibility") "may be omitted ... provided that no confusion or ambiguity may result". Omission is allowed only where it is provably safe.
- Para 4.29: a take-off clearance is issued separately from any other clearance, so there is one critical action per transmission.
- The standard-words glossary defines each procedural word with one fixed meaning (e.g. AFFIRM = Yes; WILCO = "I understand your message and will comply with it"; READ BACK = "Repeat all, or the specified part, of this message back to me exactly as received").

## Sources it builds on
- ICAO Annex 10 Vol. II (communication procedures), Doc 4444 PANS-ATM (phraseology), Doc 9432 Manual of Radiotelephony, and Circular 211-AN/128 (all UNVERIFIED at primary level).
- NATO STANAG 3817, for the military phraseology in Chapter 10 (military brevity overlap).
- Accident investigations of non-standard phraseology. Not cited by name in the passages read.

## Works that cite it (forward)
- Kuhn, T. (2014). "A Survey and Classification of Controlled Natural Languages." *Computational Linguistics* 40(1): 121-170. VERIFIED in full text: it treats FAA, ICAO and CAA phraseologies as one CNL family ("AirSpeak", Robertson 1987), defined by more than 300 fixed sentence patterns. It finds the family "heavily restricted and much less ambiguous than full English" and rates it PENS P2 E1 N3 S2.
- Cushing, S. (1994). *Fatal Words: Communication Clashes and Aircraft Crashes*. University of Chicago Press. A linguistic analysis of phraseology failures, opening with Tenerife 1977. UNVERIFIED: the book was not read, and only publisher and catalogue pages were seen.
- ICAO language proficiency requirements (Doc 9835, 2004/2010). UNVERIFIED.

## Relevance to AI answer style
Radiotelephony phraseology is the canonical case of brevity achieved through **precision**: fixed tokens with exactly one meaning. It is not brevity through dropping content. The manual is explicit on four points:
- Verbosity and needless repetition are faults.
- Redundancy is *added* exactly where confusion is possible.
- Omission is allowed only where "no confusion or ambiguity may result".
- High-consequence words are reserved for one use only.

For an assistant this means:
- Classify each part of the answer as clearance, instruction or information, and weight it accordingly.
- Put the identifying context first (the runway designator before the clearance).
- Never use the "dangerous" verb (delete, deploy, force-push) loosely in a non-action sense.

## Candidate rules for the harness
1. **Reserve high-consequence words for their literal action.** Say "delete", "deploy", "push" or "done" only when that exact action is meant or has happened. In other contexts use neutral words ("remove from the list", "prepare the release"), the way "DEPARTURE" stands in for "TAKE-OFF".
2. **Scale explicitness with the cost of a misunderstanding.** For irreversible or destructive steps, state the target and parameters in full and first ("On branch main, run ..."). Ask for, or provide, confirmation-level detail. Low-stakes information can be terse but complete.
3. **Do not repeat what was already understood; add redundancy only where confusion is likely.** Cut restated questions, re-summaries and repeated instructions. Do add units, identifiers and disambiguators wherever a bare number or name could be misread (e.g. "30 s timeout", not "timeout 30").

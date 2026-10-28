# Candidate harness rules

Each rule below has:
- **Rule**: the instruction, phrased so a harness can check it.
- **Kind**: whether it protects PRECISION (P), blocks lossy COMPRESSION (C), or blocks padding (Pad). "meta" marks rules about evaluating the harness itself.
- **Sources**: note paths relative to `/home/user/KIA/research/`.
- **Counterexample**: a case where applying the rule literally gives the wrong answer.
- **Guard**: the boundary condition that the counterexample implies.

Scope: all 113 notes (tracks A-G). Rules are grouped by the themes in `_findings.md`. Overlapping candidate rules from different notes have been merged. R1-R37 keep the IDs used in `_queue.md` and earlier rounds; this round added sources to them and corrected one counterexample (R20, the Oksa 2010 control condition). R38-R61 are new from the 36 notes added this round. Status for every rule is CANDIDATE: the rule-verification phase has not run yet.

---

## A. The cut test

### R1. Recoverability test for every cut
**Rule:** Delete a word, clause or sentence only if this reader can rebuild its content from what they have actually seen in this conversation (their messages, visible earlier turns, shown output) or from domain defaults. If they cannot, keep it. Cut words, never distinctions: if dropping a word would make two candidate meanings indistinguishable, the word stays.
**Kind:** C
**Sources:** `B-information-theory/gibson-2019-efficiency.md`, `B-information-theory/piantadosi-2012-ambiguity.md`, `B-information-theory/shannon-1948-source-channel-redundancy.md`, `B-information-theory/shannon-1951-prediction-entropy-printed-english.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`, `C-controlled-language/kuhn-2014-pens-controlled-natural-languages.md`, `G-precision-without-loss/wuster-1979-terminologielehre-concept-priority.md`, `B-information-theory/zaslavsky-2020-rate-distortion-pragmatics.md`
**Counterexample:** A destructive command ("run `rm -rf build/` on main") is fully recoverable from context, yet restating the target and parameters is still correct. CAP 413 requires read-back exactly where a misunderstanding is costly, even when the content is predictable (`C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`). In the other direction, Gibson et al. warn that chasing every residual misreading makes text "wordy or pedantic", as in contracts and code. A third failure: the model's own context is lossless while the reader's memory is lossy, so a term the model "knows" the reader saw 40 lines ago may not be recoverable for the human (`B-information-theory/verma-2023-revisiting-entropy-rate-constancy.md`, see R44).
**Guard:** Recoverability licenses a cut. It does not require one where the cost of a misreading is high (see R13), and it is judged against the reader's lossy memory, not the model's context.

### R2. Content-unit check on any shortening
**Rule:** Before shortening, list the atomic facts or content units the user needs. The short version must still contain every one of them. Drop the least important units first, never a must-have while a nice-to-have survives. Stop at the number of points the question's scope calls for (the user's K). Shorten by rewording first (shorter sentences, exact terms, no hedges); delete content only after that.
**Kind:** C, Pad
**Sources:** `G-precision-without-loss/nenkova-2004-pyramid-content-units.md`, `G-precision-without-loss/min-2023-factscore-atomic-facts.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, `G-precision-without-loss/song-2024-veriscore-verifiable-claims.md`, `A-pragmatics/grice-1975-logic-conversation.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`, `D-human-factors-ux/dejong-2010-clt-critique-load-types.md`, `D-human-factors-ux/mayer-1996-less-is-more-summaries.md`
**Counterexample:** Thomas & Turner, "clarity everywhere is not accuracy everywhere": qualifications "of no consequence to the main issue" may be dropped even though each is a distinct atomic fact (`E-style-rhetoric/thomas-turner-1994-classic-prose.md`). F1@K also weights every fact equally, so a trivial fact can crowd out an important one (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, limits). Fact counts also depend on how the text is split (Wanner et al., cited in `min-2023`), and some claims cannot be made atomic without losing their relational content ("X solidified Y", `song-2024`). F1@K also rewards length against a terse model's correct answer (`song-2024`, fn. 15), so "the user's K" must not be read off what other models write.
**Guard:** Weight units by whether they change the user's decision or action, not by count. Do not split a relational claim to count it (R48).

### R3. Necessary-condition test on qualifiers
**Rule:** When trimming, delete only words that do not narrow the claim: categorizers ("a type of"), evaluative adjectives, hedges on a claim that is already generic, and example lists that one cover term can replace. Never delete a qualifier that works as a necessary condition (version, scope, platform, condition, exception, "usually"), because the claim then becomes broader than the truth. Treat hedges as substance when rewording for a novice.
**Kind:** C, Pad
**Sources:** `G-precision-without-loss/iso-tc37-2022-iso704-substitution-principle.md`, `G-precision-without-loss/iso-tc37-2011-iso10241-1-one-term-one-concept.md`, `G-precision-without-loss/seppala-2017-definition-writing-guidelines.md`, `A-pragmatics/grice-1975-logic-conversation.md`, `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`, `G-precision-without-loss/song-2024-veriscore-verifiable-claims.md`
**Counterexample:** Seppälä keeps a negation when it is the very feature that separates two siblings (paracentric vs pericentric inversion), even though "say what it is not" is otherwise on the cut list. Juba et al. warn in the other direction against *adding* qualifiers the plain wording already implies (`B-information-theory/juba-2011-compression-without-common-prior.md`). ISO 10241-1 itself deletes a "usually" deliberately to make entries consistent, so a hedge can be removed when the claim really holds without it (`iso-tc37-2011`).
**Guard:** The test is whether the claim's extension changes, not whether the word "looks like" filler. Remove a hedge only after checking that the unhedged claim is true.

### R4. Shorten without changing the claim
**Rule:** After any concision pass, check that modality, causality, negation and scope survive. "May help" must not become "achieves". A correlation must not become a cause. If the shorter wording changes the claim, keep the longer one.
**Kind:** C
**Sources:** `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`, `A-pragmatics/grice-1975-logic-conversation.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`, `G-precision-without-loss/iso-tc37-2011-iso10241-1-one-term-one-concept.md`
**Counterexample:** Sometimes the original is the wrong claim. Its hedge was a tic, not real uncertainty (`E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`), and a faithful-preservation rule would keep the miscalibration (see R26).
**Guard:** Preserve the *intended* claim. A calibration rule may change modality on purpose.

---

## B. Term choice

### R5. Most specific true term
**Rule:** Among the terms that are true of the thing, use the one that fits the fewest competing readings in the user's context: the exact error name, the path, the function, the strongest supported scalar word ("all", "fixed"). Never use a superordinate ("the issue", "a config file") when the specific term is known.
**Kind:** P
**Sources:** `A-pragmatics/wilson-sperber-2004-relevance-theory.md`, `A-pragmatics/frank-goodman-2012-rsa-language-games.md`, `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`, `A-pragmatics/horn-1984-q-r-implicature.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `B-information-theory/shannon-1948-source-channel-redundancy.md`, `B-information-theory/zaslavsky-2018-information-bottleneck-color-naming.md`, `C-controlled-language/kuhn-2016-thing-explainer-circumlocution.md`
**Counterexample:** Specificity costs factual precision when the detail is uncertain. "Provide as many specific details as possible" lowered F1@1 (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, App. A.7). A model torn between LA, NYC and Chicago should say "a large US city", not "LA" (`G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`). Over-specifying when there is no competitor is also an error: Degen et al. find speakers prefer the basic level when it suffices (`A-pragmatics/degen-2020-useful-redundancy.md`). Exact figures are read as exhaustive, so "3 tests fail" implies the rest pass (`A-pragmatics/wilson-sperber-2004-relevance-theory.md`). The more technical word is not always the more precise one: *Natriumchlorid* in a kitchen answer is a register error (`G-precision-without-loss/koning-2023-relative-univocity-schools.md`).
**Guard:** Most specific *supported* term, at basic level unless a competitor is live, in the reader's register.

### R6. A term is lossless only if this reader holds its concept: gloss once, never swap for a vaguer word
**Rule:** Use the exact technical term. If the user's own wording does not show they hold the concept, add a gloss the first time: "a [nearest parent category] that [distinguishing feature]", or one familiar anchor word ("Paleontology (fossils)"). Do not replace the term with a vaguer paraphrase, a circumlocution in common words, or a polysemous everyday word, and do not abbreviate a term the user has not used.
**Kind:** P, C
**Sources:** `G-precision-without-loss/cabre-2002-doors-theory-terminology.md`, `G-precision-without-loss/iso-tc37-2022-iso704-substitution-principle.md`, `G-precision-without-loss/seppala-2017-definition-writing-guidelines.md`, `G-precision-without-loss/wuster-1979-terminologielehre-concept-priority.md`, `D-human-factors-ux/chen-kalyuga-sweller-2017-element-interactivity-expertise-reversal.md`, `D-human-factors-ux/sweller-1998-cognitive-architecture-load-types.md`, `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`, `D-human-factors-ux/kalyuga-2007-expertise-reversal-learner-tailored.md`, `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`, `F-screen-reading/blackmon-2002-cognitive-walkthrough-web.md`, `F-screen-reading/blackmon-2003-repairing-cww.md`, `F-screen-reading/blackmon-2005-autocww-problem-severity.md`, `C-controlled-language/kuhn-2016-thing-explainer-circumlocution.md`, `C-controlled-language/martinez-2022-poor-writing-legal-language.md`, `C-controlled-language/masson-waldron-1994-plain-language-contracts.md`
**Counterexample:** For a reader who shows expertise, a gloss is redundant load that they cannot reliably skip ("Redundant information is frequently difficult to ignore", `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`); Oksa's experts cross-checked every gloss and lost the thread (`D-human-factors-ux/oksa-kalyuga-chandler-2010-shakespeare-explanatory-notes.md`). Paraphrase "only sometimes" fixes unfamiliarity, and unfamiliar-term problems were the hardest to repair (75% vs 87%), because a gloss cannot supply missing domain knowledge (`blackmon-2003`, `blackmon-2005`). Masson & Waldron found that defining or replacing legal terms gave no reliable comprehension gain when the concept conflicts with the reader's prior beliefs (`masson-waldron-1994`). Martínez et al. show the opposite case: lessee/lessor -> tenant/landlord helped, because the common word is an exact equivalent (`martinez-2022`).
**Guard:** Gloss only when the schema is not shown. Replace a rare word only with an exact common equivalent. If the concept itself is missing or counterintuitive, say so and explain it (R51); a gloss will not do.

### R7. Long form first, short form after grounding
**Rule:** Give the full term, the expansion of an acronym, or a description of a non-standard concept at first mention. Switch to the short form, label or pronoun only after it has appeared with that description in this conversation, or after the user has used it correctly. Once it is established, do use the shortest unambiguous form (clipped word, acronym, head noun); do not keep re-expanding.
**Kind:** C, Pad
**Sources:** `B-information-theory/mahowald-2013-short-forms-predictive-contexts.md`, `B-information-theory/piantadosi-2011-wordlength.md`, `A-pragmatics/clark-wilkesgibbs-1986-collaborative-reference.md`, `A-pragmatics/clark-haviland-1977-given-new-contract.md`, `B-information-theory/levy-jaeger-2007-uniform-information-density.md`, `B-information-theory/cai-2024-llms-resemble-humans-language-use.md`, `B-information-theory/genzel-charniak-2002-entropy-rate-constancy.md`, `A-pragmatics/hua-artzi-2024-talk-less-conventions.md`, `A-pragmatics/clark-brennan-1991-grounding-communication.md`
**Counterexample:** If the user already used the short form ("my CI flakes"), expanding it re-grounds a pact the user set up and is redundant (`A-pragmatics/brennan-clark-1996-conceptual-pacts.md`). Universally standard short forms (URL, CPU, JSON) are more predictable than their expansions. Clark & Haviland also allow the "addition" route: a definite label introduced and defined in place is acceptable. On the other side, "the user has not objected" is not grounding: Clark & Brennan count only positive evidence (correct use or correct action) (`clark-brennan-1991`).
**Guard:** Count the user's own correct use, and field-standard status, as grounding; silence is not grounding.

### R8. One concept, one term, held across the answer
**Rule:** Once a term names a thing, reuse exactly that term every time the thing recurs. Do not rotate synonyms ("cache", "store", "buffer") or near-synonymous forms ("fails" / "is unsuccessful", "deprecated" / "obsolete"). Shorten only by deleting modifiers from the established name, never by changing the head noun or describing a different aspect. Do not reuse a word in a second sense within one answer. Check "concise" and "consistent" separately: meeting one does not ensure the other.
**Kind:** P
**Sources:** `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `C-controlled-language/kuhn-2014-pens-controlled-natural-languages.md`, `G-precision-without-loss/wuster-1979-terminologielehre-concept-priority.md`, `G-precision-without-loss/cabre-2002-doors-theory-terminology.md`, `G-precision-without-loss/iso-tc37-2011-iso10241-1-one-term-one-concept.md`, `G-precision-without-loss/koning-2023-relative-univocity-schools.md`, `A-pragmatics/brennan-clark-1996-conceptual-pacts.md`, `A-pragmatics/vanrooij-franke-2026-biot-games-horn-division.md`, `A-pragmatics/tessler-franke-2018-not-unreasonable-negated-antonyms.md`, `A-pragmatics/clark-1975-bridging-shortest-bridge.md`, `A-pragmatics/hua-artzi-2024-talk-less-conventions.md`, `A-pragmatics/holtzman-2018-cooperative-discriminators-gricean.md`, `B-information-theory/zaslavsky-2020-rate-distortion-pragmatics.md`, `B-information-theory/genzel-charniak-2002-entropy-rate-constancy.md`, `C-controlled-language/gibson-1998-dependency-locality.md`, `C-controlled-language/shubert-1995-simplified-english-comprehensibility.md`, `D-human-factors-ux/mcnamara-1996-text-coherence-knowledge.md`, `E-style-rhetoric/mensh-kording-2017-ten-rules-structuring-papers.md`
**Counterexample:** Wüster himself admits synonyms that express "a different view of the concept" (Kochsalz by use, Natriumchlorid by composition), and Roelcke and Köning accept a synonym that brings out an aspect or matches register when it is marked by a context indicator (`koning-2023`). Brennan & Clark show a switch is correct when the old term has become wrong, for example when the set gains a competitor. Kuhn rates fully uniform N4 text "clumsy and repetitive". Cushing's AIR prototype planned deliberate synonym variation to fight habituation in repetitive radio traffic (`C-controlled-language/cushing-1994-fatal-words-ambiguity.md`; untested). When the user's own word differs from the standard term, using only the standard term ignores their pact (`iso-tc37-2011`: map it once).
**Guard:** Switch only on purpose, mark the switch once ("sodium chloride, i.e. table salt"; "the old X, now Y"; "X, which you called Y"), and then hold one term.

### R9. Plain form for the plain case; a marked form only for a marked meaning
**Rule:** When a standard short term exists ("can", "use", "fixed", "reliable"), use it for the normal case. Do not use periphrasis, modals of ability, or negated antonyms ("not unreasonable", "not incorrect", "not impossible", "not insignificant") as softeners. "Not unreliable" is read as less than "reliable", a minority of readers take "not dishonest" as "not honest", and "was able to fix it" is read as "didn't". For a gradable judgement, use the plain scale word or a number. Spend extra words only on a non-standard case, and name how it differs.
**Kind:** P, Pad
**Sources:** `A-pragmatics/horn-1984-q-r-implicature.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `A-pragmatics/bergen-levy-goodman-2016-lexical-uncertainty.md`, `A-pragmatics/vanrooij-franke-2026-biot-games-horn-division.md`, `A-pragmatics/tessler-franke-2018-not-unreasonable-negated-antonyms.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`
**Counterexample:** Many synonym pairs carry no implicature difference (*mare* vs *adult female horse*, Davis 2016, cited in `horn-1984`). Politeness can call for softened form as a social goal, which is modelled separately in RSA (Yoon et al., `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`). The anti-Horn equilibrium is also stable (`vanrooij-franke-2026`), so with a reader used to inflated phrasing, the inference may not fire. Double negation exists to name a region of a unitless scale that has no word of its own (`tessler-franke-2018`), so "not fast" is the right form when the meaning really is "below threshold, degree unknown".
**Guard:** Apply the rule where a lexicalised alternative or a number exists *and* a real marked reading is available.

### R10. Strongest true claim; weaker words implicate negation or ignorance
**Rule:** Use the strongest claim the evidence supports. Readers take "some", "may", "usually", a superordinate term, or a missing expected item to mean the stronger claim is false or the speaker does not know which. If all tests pass, say "all".
**Kind:** P
**Sources:** `A-pragmatics/horn-1984-q-r-implicature.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`, `A-pragmatics/wilson-sperber-2004-relevance-theory.md`, `A-pragmatics/bergen-levy-goodman-2016-lexical-uncertainty.md`
**Counterexample:** Quality outranks Manner and Quantity. When the evidence covers only "some", the strong claim is a lie (`A-pragmatics/grice-1975-logic-conversation.md`). Bott & Noveck 2004 found more literal "true" answers to "some elephants are mammals" under time pressure, so the "not all" inference is not automatic, and a hurried reader may not draw it (`levinson-2000`, counter-evidence).
**Guard:** "Strongest *supported*". When the weaker word is used because the evidence is limited, also say so explicitly (R26).

### R11. Name the distinguisher when a competitor exists; drop qualifiers that imply a false contrast
**Rule:** When two things of the same kind are in play (files, environments, versions, readings, fixes), give every mention, including the first, the shortest attribute that tells them apart ("the staging `config.yaml`"). Write against the distractor: name the most likely wrong reading or option, keep the wording that rules it out, and drop detail that is true of both. When only one exists, drop contrastive qualifiers ("the *main* issue"), because readers go looking for the alternative.
**Kind:** P, C
**Sources:** `A-pragmatics/engelhardt-2006-maxim-quantity-overdescription.md`, `B-information-theory/ferreira-2005-ambiguity-avoidance.md`, `A-pragmatics/degen-2020-useful-redundancy.md`, `A-pragmatics/frank-goodman-2012-rsa-language-games.md`, `A-pragmatics/andreas-klein-2016-neural-pragmatic-speaker.md`, `B-information-theory/piantadosi-2012-ambiguity.md`
**Counterexample:** A modifier that is redundant but highly discriminable speeds identification in complex scenes. Redundant colour helps visual search (Rubio-Fernández 2016; Degen 2020), so "drop when unique" fails when the extra feature is the fastest cue. Davies & Katsos 2013 also show that listeners do penalise over-informativeness when the design does not favour it (`engelhardt-2006` forward list). Andreas & Klein's purely listener-optimised speaker (λ = 0) was the most accurate but disfluent ("a hamburger on the ground"), so discrimination alone, without a light naturalness constraint, produces odd text (`andreas-klein-2016`). Evidence on both sides is mixed.
**Guard:** Keep a redundant modifier if it is *more precise or more salient* than the head noun (an identifier, path or version). Drop it if it only implies a contrast. Among equally discriminating phrasings, choose the most idiomatic.

### R12. Ambiguity pass: overloaded terms and attachment
**Rule:** Before sending, scan for (a) words with more than one live sense in this context ("model", "key", "token", "session", "build", "test", "branch", "agent", "die"), and (b) modifiers, prepositional phrases and pronouns that could attach in two places ("deploy the service with the flag"). If two senses appear in one answer, qualify the *first* mention ("API key" vs "dict key") or rename one. Rewrite any attachment that the surrounding context does not clearly settle.
**Kind:** P
**Sources:** `B-information-theory/ferreira-2005-ambiguity-avoidance.md`, `B-information-theory/cai-2024-llms-resemble-humans-language-use.md`, `C-controlled-language/cushing-1994-fatal-words-ambiguity.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `C-controlled-language/cardosi-1996-tracon-readback-complexity.md`, `G-precision-without-loss/koning-2023-relative-univocity-schools.md`, `G-precision-without-loss/iso-tc37-2011-iso10241-1-one-term-one-concept.md`
**Counterexample:** Context resolves almost all communicatively relevant ambiguity. Qualifying senses the user could not plausibly intend is the "wordy or pedantic" failure (`B-information-theory/gibson-2019-efficiency.md`). Harmless ambiguity should be left alone (`B-information-theory/juba-2011-compression-without-common-prior.md`). Krifka et al. warn that banning all pronouns or ellipsis makes text too verbose (`cushing-1994`).
**Guard:** Qualify only when both senses are live *in this answer* or the rival readings lead to different actions. The check is needed because LLMs pick one parse and ignore disambiguating context (`cai-2024`), so it cannot be left to the model's default.

---

## C. Where words go

### R13. Spend words at surprise and at costly-to-misread points; cut predictable scaffolding
**Rule:** Cut what the question or convention already gives: restated questions, generic openers, recaps, "I hope this helps". Spend explicit words on what the user could not guess: the non-default value, the exception, the reversal, the chosen option, a new term. Add redundancy (units, a full identifier, a one-line confirmation) only where a misreading is costly: destructive commands, exact values, negations, irreversible steps.
**Kind:** C, Pad
**Sources:** `B-information-theory/aylett-turk-2004-smooth-signal-redundancy.md`, `B-information-theory/shannon-1951-prediction-entropy-printed-english.md`, `B-information-theory/shannon-1948-source-channel-redundancy.md`, `B-information-theory/piantadosi-2011-wordlength.md`, `B-information-theory/mahowald-2013-short-forms-predictive-contexts.md`, `B-information-theory/meister-2021-revisiting-uid.md`, `B-information-theory/genzel-charniak-2002-entropy-rate-constancy.md`, `C-controlled-language/prinzo-2009-message-length-complexity-readback.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`
**Counterexample:** A predictable structure word ("that", "because", "The catch:") placed before a surprising claim *helps*, because it flattens the spike (`B-information-theory/levy-jaeger-2007-uniform-information-density.md`). Cutting all predictable material therefore fails. Redundancy also fails when nobody checks it: a read-back without hear-back gave false assurance (`C-controlled-language/monan-1986-hearback-problem.md`). Repeating a warning everywhere leads to habituation and reflex cancelling (`C-controlled-language/patterson-1982-auditory-warning-guidelines.md`; `C-controlled-language/bliss-1995-probability-matching-cry-wolf.md`). The opening of an answer is legitimately lower in information because it orients the reader (`genzel-charniak-2002`; `verma-2023`), so a short frame-setting first clause is not "predictable scaffolding".
**Guard:** Keep signposts that announce a surprise and one frame-setting opening clause. Place redundancy once, at the critical item.

### R14. Mark the atypical; leave the default unstated
**Rule:** State properties that differ from what the reader would assume: an unusual flag, a non-standard version, an unusual method, a side effect. Do not restate defaults the reader would infer.
**Kind:** P, Pad
**Sources:** `A-pragmatics/degen-2020-useful-redundancy.md`, `A-pragmatics/horn-1984-q-r-implicature.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `A-pragmatics/vanrooij-franke-2026-biot-games-horn-division.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`
**Counterexample:** What counts as "default" depends on the reader's prior. A novice's stereotype differs from an expert's (`vanrooij-franke-2026`, caveat; `B-information-theory/juba-2011-compression-without-common-prior.md`), so an unstated default can be misread. Safety phraseology also states some defaults every time (the runway designator always comes before the clearance, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`). A lay reader's "default" for a legal or technical concept may be wrong, so the expert default must be stated (`C-controlled-language/masson-waldron-1994-plain-language-contracts.md`; R51).
**Guard:** Judge "default" from the user's evident level. Always state defaults that are safety-critical or that a non-expert is likely to get wrong.

### R15. Do not write reduced text: keep grammatical glue and logical connectives
**Rule:** Never drop articles, subjects, verbs, units or connectives ("because", "so", "unless", "but") to save words. Shorten by splitting into short, complete sentences of about 20 words for instructions and 25 for explanations. When splitting, carry the connective into the next sentence. If a causal link between two facts is missing, add it, even though the answer grows.
**Kind:** C
**Sources:** `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `B-information-theory/shannon-1951-prediction-entropy-printed-english.md`, `B-information-theory/meister-2021-revisiting-uid.md`, `C-controlled-language/wang-2026-ste-eye-tracking-scheduling.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`, `A-pragmatics/wilson-sperber-2004-relevance-theory.md`, `B-information-theory/levy-jaeger-2007-uniform-information-density.md`, `A-pragmatics/clark-1975-bridging-shortest-bridge.md`
**Counterexample:** Small, recurring, high-stakes slots that use a closed vocabulary shared with a trained reader (status lines, verdict tokens, ATC phraseology) work in fixed terse patterns (`C-controlled-language/kuhn-2014-pens-controlled-natural-languages.md`; `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`). Receivers dropping anchor words was harmless 98% of the time (`C-controlled-language/prinzo-2009-message-length-complexity-readback.md`). Krifka et al. warn that banning all ellipsis or pronouns makes text too verbose (`C-controlled-language/cushing-1994-fatal-words-ambiguity.md`).
**Guard:** Terse key-word form is allowed only for closed, shared vocabularies (see R30).

### R16. Name the actor; put the action in the verb
**Rule:** In each sentence that states an action, make the grammatical subject the actor (you, the function, the server) and the main verb the action. Rewrite nominalised noun stacks ("Config validation failure prevention requires schema enforcement"). Supply an implied actor rather than writing "X is required" or "there is a need for Y".
**Kind:** P, C
**Sources:** `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`
**Counterexample:** Williams keeps useful nominalisations: a short backward-linking subject ("This decision ..."), a concept familiar enough to act as a "virtual actor", and ideas that exist only as nouns. The passive keeps the topic in subject position ("Pollen is dispersed by bees" in a paragraph about pollen), and Pinker argues "avoid the passive" is bad advice (`E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`). STE allows the passive when the agent is unknown. In the Martínez experiments, passives (with non-standard capitals) did not reliably hurt comprehension, while center-embedding did (MIT release, `C-controlled-language/martinez-2022-poor-writing-legal-language.md`, UNVERIFIED against the paper).
**Guard:** Flag only nominalisations and passives that hide *who does what*. Topic continuity can justify the passive. Fix center-embedding first (R49).

### R17. Cut zero-information filler; keep repair and contrast signals
**Rule:** Delete stock phrases ("It is important to note that", "the fact that"), genre-predictable formulas ("Here's an overview", "Hope this helps", "Let me know if you have questions"), metadiscourse ("In this answer I will"), process, worth and liability hedges ("Let me think", "Great question", blanket disclaimers), content-free acknowledgments ("I understand", "Got it" as the whole reply), verb-plus-noun operators ("make a decision" becomes "decide"), and empty evaluatives ("robust", "seamless", "strategic acumen").
**Kind:** Pad
**Sources:** `D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`, `B-information-theory/piantadosi-2011-wordlength.md`, `B-information-theory/genzel-charniak-2002-entropy-rate-constancy.md`, `F-screen-reading/chi-pirolli-2001-information-scent-wufis.md`, `F-screen-reading/pirolli-card-1999-information-foraging.md`, `F-screen-reading/card-2001-web-behavior-graph-scent.md`, `A-pragmatics/shaikh-2024-grounding-gaps-llm.md`, `G-precision-without-loss/song-2024-veriscore-verifiable-claims.md`, `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`
**Counterexample:** Discourse and repair markers correlated with overhearers' comprehension (r = .73). Explicit "not A but B" or "correction:" signals help readers who were not in the exchange (`A-pragmatics/foxtree-1999-overhearing-monologues-dialogues.md`). Williams uses metadiscourse on purpose to place a new term in stress position ("We term these cells LAK cells"). An announced list ("Three causes:") is metadiscourse that structures the stress positions (`E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`). Genzel & Charniak keep a formula that marks a structural boundary. In emotional-support dialogue the largest human grounding act LLMs omitted was empathic acknowledgment (`shaikh-2024`), so "acknowledgment is filler" does not transfer beyond task answers.
**Guard:** Keep markers that signal repair, contrast, announced structure or a section boundary. Cut chatter and self-reference. The acknowledgment ban applies to task answers.

### R18. Cut seductive details: test against the user's goal, not against truth
**Rule:** Delete every sentence that is true and interesting but that the user's stated goal does not need: background, history, trivia, related-but-unasked facts. Drop low-yield sentences whole; do not shrink them. The test is whether the user would do worse at their task without it.
**Kind:** Pad
**Sources:** `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `D-human-factors-ux/mayer-1996-less-is-more-summaries.md`, `A-pragmatics/grice-1975-logic-conversation.md`, `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, `F-screen-reading/fu-pirolli-2007-snif-act.md`, `F-screen-reading/pirolli-card-1995-information-foraging.md`, `F-screen-reading/card-2001-web-behavior-graph-scent.md`
**Counterexample:** Mayer & Fiorella note that "more experienced learners may require a greater amount of detail" (p. 308). Reference or expert-completeness requests have a large K, so trimming to the bare goal is lossy (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`; `E-style-rhetoric/bergman-2026-many-arguments-persuasive-intent.md`). A caveat that the user did not ask for but that changes what they should do is not a seductive detail (`A-pragmatics/grice-1975-logic-conversation.md`, rule 3). Card et al. found readers stay for long runs while scent holds, so on-goal detail should not be cut just because the answer is long (`card-2001`).
**Guard:** Ask what the goal is, not what the question literally said. Keep anything that changes the user's action, and keep on-goal detail even if the answer grows.

### R19. Say each thing once; delete prose that echoes a self-sufficient source
**Rule:** If a code block, table, list or earlier sentence already states something completely, do not repeat it in prose. Prose adds only what that source cannot show: why, caveats, the next action. No summary paragraph that duplicates a short answer, and no long explanation followed by a recap of itself: choose one.
**Kind:** Pad
**Sources:** `D-human-factors-ux/chandler-sweller-1991-split-attention-redundancy-origin.md`, `D-human-factors-ux/kalyuga-1999-redundancy-split-attention.md`, `D-human-factors-ux/sweller-1998-cognitive-architecture-load-types.md`, `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `D-human-factors-ux/mayer-1996-less-is-more-summaries.md`, `D-human-factors-ux/castro-alonso-2021-five-strategies-learner-managed-load.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, `G-precision-without-loss/nenkova-2004-pyramid-content-units.md`, `F-screen-reading/duggan-payne-2009-text-skimming.md`
**Counterexample:** When neither source is intelligible alone (Chandler & Sweller Exp. 6, numbered labels explained only in text), deleting one is lossy, and the two must be integrated instead. A handoff for a third party must restate content the live user already saw (`A-pragmatics/schober-clark-1989-addressees-overhearers.md`). A short, non-identical restatement placed next to its referent can help (Mayer & Johnson 2008, via `D-human-factors-ux/dejong-2010-clt-critique-load-types.md` and `castro-alonso-2021`), and a key word next to a graphic improved retention (`mayer-fiorella-2014`). A brief re-anchor of a term established far back helps a reader with lossy memory (`B-information-theory/verma-2023-revisiting-entropy-rate-constancy.md`).
**Guard:** Apply only when the source is intelligible alone *and* the reader is the one who saw it. A restatement of a few words placed next to its referent is allowed; a long or distant one is not.

### R20. Keep each explanation beside its referent
**Rule:** Put each comment next to the code line, table row, value or step it explains. Do not write "see above" or "as shown in the snippet" with the explanation detached. Define a symbol or label where it is used, not in a later legend.
**Kind:** C
**Sources:** `D-human-factors-ux/chandler-sweller-1991-split-attention-redundancy-origin.md`, `D-human-factors-ux/kalyuga-1999-redundancy-split-attention.md`, `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `D-human-factors-ux/sweller-1998-cognitive-architecture-load-types.md`, `D-human-factors-ux/castro-alonso-2021-five-strategies-learner-managed-load.md`, `D-human-factors-ux/yeung-jin-sweller-1998-inline-vocabulary-definitions.md`, `B-information-theory/gibson-2019-efficiency.md`
**Counterexample (corrected this round):** For experts, an inline paraphrase they cannot skip reversed the benefit: Oksa's Shakespeare experts did far better with *no notes at all* than with line-by-line paraphrase (d ≈ 1.6-3.0). The control was the bare text, not footnotes; the earlier corpus claim that "separable glosses help experts" is not what Oksa tested (`D-human-factors-ux/oksa-kalyuga-chandler-2010-shakespeare-explanatory-notes.md`). Yeung et al. found the crossover with a separate list: integrated definitions helped weak readers' comprehension and hurt strong readers', while the separate list did the reverse for vocabulary learning (`yeung-jin-sweller-1998`, abstract only). Spatial contiguity effects are strongest when sources are unintelligible alone (`mayer-fiorella-2014`). de Jong notes that integrating everything can produce an unreadable display, and "having information in different places is then preferable to cluttering one place" (`dejong-2010`).
**Guard:** Keep a *needed* referent adjacent. For a reader who shows expertise, omit glosses rather than relocating them; for an uncertain reader, use a brief appositive at first use (R56). Split a crowded integrated block into a labelled separate one.

---

## D. Packaging and order

### R21. Count load-bearing elements, not words; split beyond about 3-4, and keep every element
**Rule:** An element is any value, direction, condition or instruction the user must hold to act correctly. Put no more than about 3-4 new *unrelated* elements, or 3 distinct actionable topics, in one unsplit sentence or paragraph, and at most two instructions or values per sentence. Beyond that, split into numbered steps with one action each, and never drop an element to meet the cap.
**Kind:** C
**Sources:** `C-controlled-language/cardosi-1993-en-route-readback-complexity.md`, `C-controlled-language/cardosi-1996-tracon-readback-complexity.md`, `C-controlled-language/prinzo-2009-message-length-complexity-readback.md`, `C-controlled-language/morrow-1993-message-length-timing.md`, `C-controlled-language/morrow-prinzo-1999-grouped-numbers-message-length.md`, `C-controlled-language/monan-1986-hearback-problem.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `C-controlled-language/gibson-1998-dependency-locality.md`
**Counterexample:** Cardosi's cap applies to *unexpected* messages. "Different results would be expected when pilots are prepared for a longer transmission", so a requested procedure can be long. Cardosi et al. (1996) found the length effect weaker in the terminal area because predictable, expected or "logically grouped" items do not add the same load: one command with its flags, or one table row, counts roughly as one (`cardosi-1996`). The data-link arm of Morrow & Rodvold showed no excess problems for long messages in a persistent visual medium, which is closer to chat. Splitting into close-together short units caused delayed digit-intrusion errors. Shubert's SE gain appeared only for the complex procedure, so a simple answer gains nothing from step formatting (`C-controlled-language/shubert-1995-simplified-english-comprehensibility.md`).
**Guard:** Enforce the cap strictly on unrequested or inline side information, and count unrelated items. Slots of one frame the user already holds count as one; do not break a coherent structure to meet the count. For requested procedures, cap elements per step rather than per answer.

### R22. Separate look-alike values; label every number with unit or role
**Rule:** In a sentence with two or more values, attach the unit or role to each ("timeout 30 s, retries 3"). Put similar values (ports, versions, paths, flags) on separate labelled lines or in a code block, and format co-occurring value types distinctly (labels, units, code spans). Write critical values in full, never as a suffix ("the same but ending in 2").
**Kind:** P, C
**Sources:** `C-controlled-language/morrow-1993-message-length-timing.md`, `C-controlled-language/morrow-prinzo-1999-grouped-numbers-message-length.md`, `C-controlled-language/cardosi-1996-tracon-readback-complexity.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`, `C-controlled-language/cushing-1994-fatal-words-ambiguity.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`, `C-controlled-language/prinzo-2009-message-length-complexity-readback.md`
**Counterexample:** In a table whose header already names the unit or role, per-cell labels are redundant echoes of a self-sufficient source (`D-human-factors-ux/chandler-sweller-1991-split-attention-redundancy-origin.md`).
**Guard:** Label once per value or once per column, whichever the format makes visible.

### R23. Answer first; each unit opens with its claim
**Rule:** The first sentence answers the question most directly, or names the governing term or decision the answer turns on. Each paragraph, bullet and section starts with its main point in exact terms. Never open with preamble, a restated question or generic caveats. Order the remaining content by yield, so a reader who stops early has the best material. One statable main message per answer; a multi-part answer gets one bridge sentence that unifies the parts.
**Kind:** P, Pad
**Sources:** `D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`, `F-screen-reading/nielsen-2006-f-pattern.md`, `F-screen-reading/fu-pirolli-2007-snif-act.md`, `F-screen-reading/pirolli-card-1995-information-foraging.md`, `F-screen-reading/card-2001-web-behavior-graph-scent.md`, `F-screen-reading/duggan-payne-2011-skim-satisficing.md`, `B-information-theory/verma-2023-revisiting-entropy-rate-constancy.md`, `E-style-rhetoric/mensh-kording-2017-ten-rules-structuring-papers.md`, `G-precision-without-loss/min-2023-factscore-atomic-facts.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`
**Counterexample:** A condition that reverses the instruction must come before it ("If the migration fails, run X", STE 5.4; the runway designator before the clearance, CAP 413 4.17). An uncertain answer should lead with its status ("Probably yes, but sources conflict", `E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`). A departure from what the user asked for goes in the first line (`C-controlled-language/monan-1986-hearback-problem.md`). Duggan & Payne caution against front-loading *everything*: readers who stay keep reading, and in their 2009 study reading the first half of every paragraph was no better than reading the second half, so key content should be spread across units rather than piled into the opening (`F-screen-reading/duggan-payne-2009-text-skimming.md`). Mensh & Kording warn that content-first without the context that makes the claim credible "generates skepticism".
**Guard:** First comes the answer, *or* the one item that changes how the answer must be read; keep the credibility context in the same sentence or the next. Every unit carries its own point (R59).

### R24. Old to new within a sentence; payload last; one topic string per paragraph
**Rule:** After the first sentence, open each sentence with something the user already has (their term, the question's subject, the previous sentence's last new item). End on the new fact, number or recommendation. Never end on a hedge, a source tag or metadiscourse. Keep one entity as subject across a descriptive paragraph, or chain each sentence's end into the next sentence's start for causal or step sequences.
**Kind:** P
**Sources:** `A-pragmatics/clark-haviland-1977-given-new-contract.md`, `E-style-rhetoric/vandekopple-1980-fsp-given-new-experiments.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `E-style-rhetoric/mensh-kording-2017-ten-rules-structuring-papers.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `C-controlled-language/gibson-1998-dependency-locality.md`, `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`
**Counterexample:** Gopen & Swan: "Slavish adherence to them will succeed no better than has slavish adherence to avoiding split infinitives". Warnings put the signal word first (STE 7.1), instructions put the condition and then the imperative verb first (STE 5.3-5.4), and in each case the new information comes early by design. Wang & Friginal advise putting the key point first and the qualifiers after it in long sentences (`C-controlled-language/wang-2026-ste-eye-tracking-scheduling.md`), and Martínez et al. say to state the main claim first and give each qualifier its own sentence (`C-controlled-language/martinez-2022-poor-writing-legal-language.md`). Both conflict with payload-last for a long sentence.
**Guard:** This applies to declarative explanation. Instructions and warnings follow their own templates. Long sentences should be split rather than end-loaded.

### R25. Keep dependents adjacent; heavy last
**Rule:** Allow at most one new entity (noun phrase or clause) between a subject and its verb, or between a verb and its required complement. Move long modifiers after the head or into their own sentence. Extrapose clausal subjects ("It fails when X ...", not "That X ... causes failure"). Noun stacks have at most three words.
**Kind:** P
**Sources:** `C-controlled-language/gibson-1998-dependency-locality.md`, `B-information-theory/gibson-2019-efficiency.md`, `C-controlled-language/martinez-2022-poor-writing-legal-language.md`, `C-controlled-language/martinez-2023-lawyers-legalese-plain-register.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`
**Counterexample:** Intervening material that refers to things already in the discourse ("I", "you", a defined term) adds almost no cost (Gibson 1998, Fig. 2), so a word-distance count over-flags it. The DLT evidence comes from constructed sentences in self-paced reading, not whole answers, lists or code. Surprisal accounts predict some anti-locality effects (Levy 2008, Demberg & Keller 2008, cited in `gibson-1998`).
**Guard:** Count *new* referents, not words. Center-embedding is the case with the strongest evidence (R49).

### R26. Hedge only real uncertainty, name where it lies, and prefer the tightest unhedged coarser claim
**Rule:**
- Attach a confidence marker only to claims whose confidence is materially lower than the rest, and name its source (conflicting sources, missing data, a limit of the model). Put one calibrated qualifier at the claim it attaches to.
- For an uncertain direct answer, put the status on the first clause, before any rationale.
- When torn between specific alternatives, state the most specific claim true of all of them ("a West Coast port"), or name the few alternatives. Do not pick one and add "possibly".
- Never hedge every answer by default, and never decorate with confident first-person framing ("Obviously", "I'm confident") that the evidence does not support.

**Kind:** P, Pad
**Sources:** `E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`, `E-style-rhetoric/steyvers-2025-calibration-gap.md`, `G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, `B-information-theory/zaslavsky-2018-information-bottleneck-color-naming.md`, `E-style-rhetoric/prince-frader-bosk-1982-hedging-approximators-shields.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`, `A-pragmatics/bergen-levy-goodman-2016-lexical-uncertainty.md`, `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`
**Counterexample:**
- Hedging a *correct* answer lowered user accuracy by up to 11.7 points (`kim-2024`), so a calibrated hedge still has a cost when the model's internal confidence is itself miscalibrated.
- Backing off can become vacuous: "is a positive integer" and "is uncertain or not specifically known" (`jiang-2025`, App. D). When the user must make a specific decision, a coarse true claim may be useless. Naming the alternatives with rough odds serves them better.
- Lee et al. 2024 (cited in `jiang-2025`) find hedges break LLM judges downstream, a different audience with different needs.
- Prince et al. find shields "immediately and appropriately understood" among peers; the problem is an assistant talking to strangers without shared calibration (`prince-frader-bosk-1982`). So the cure is a consistent word-to-confidence mapping, not removing shields.

**Guard:** A generalisation must rule out a plausible wrong answer. Otherwise, say plainly what is unknown. Approximators are not hedges in this sense (R57).

### R27. Length is not evidence: give the decisive 1-3 points; list count follows the real number of points
**Rule:**
- Do not add reasons, caveats or list items to look thorough. Every item must survive scrutiny on its own.
- When recommending, give the one or two decisive reasons.
- Never pad to a round count ("10 reasons").
- Signal confidence with calibration words and checkable evidence, not with volume.
- Add rationale only when it gives the reader something checkable (a source, a step, a number).

**Kind:** Pad
**Sources:** `E-style-rhetoric/petty-cacioppo-1984-argument-quantity-peripheral-cue.md`, `E-style-rhetoric/bergman-2026-many-arguments-persuasive-intent.md`, `E-style-rhetoric/steyvers-2025-calibration-gap.md`, `A-pragmatics/engelhardt-2006-maxim-quantity-overdescription.md`
**Counterexample:**
- When expertise is valued (a medical or technical diagnosis, a reference request), more arguments won in the moderation studies of Bergman et al.
- Under high involvement, 9 *strong* arguments beat 3 strong (attitude 11.30 vs 8.32, `petty-cacioppo-1984`).
- Below the user's K, thinness is lossy compression (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`). One model was penalised for exactly this.

**Guard:** Cut *weak* points. Keep all *strong, distinct* points the goal requires.

---

## E. Audience and grounding

### R28. Ground before you point; private context is not given
**Rule:**
- Use a definite reference ("the fix", "this function", an acronym, a codename) only when the user has seen exactly one antecedent for it, either in their messages or earlier in the visible answer, or when the referent is a *necessary* part or role of something already mentioned (the error of a failed command, the caller of a function). A merely probable or inducible referent (a cache, a retry, a second config) is introduced explicitly on first mention.
- Tool output, files the assistant read, and its private reasoning do not count as given.
- Prefer content-based names to procedural handles ("the second option above").
- Secure the referent (which file, function, option, version) before saying anything about it.

**Kind:** C
**Sources:** `A-pragmatics/clark-haviland-1977-given-new-contract.md`, `A-pragmatics/clark-1975-bridging-shortest-bridge.md`, `A-pragmatics/clark-brennan-1991-grounding-communication.md`, `A-pragmatics/clark-wilkesgibbs-1986-collaborative-reference.md`, `B-information-theory/piantadosi-2012-ambiguity.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`, `B-information-theory/aylett-turk-2004-smooth-signal-redundancy.md`, `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`, `D-human-factors-ux/mcnamara-1996-text-coherence-knowledge.md`, `E-style-rhetoric/vandekopple-1980-fsp-given-new-experiments.md`
**Counterexample:**
- Bridging by stereotype works: "the beer was warm" after "we checked the picnic supplies" is understood, at a cost of about 180 ms (`clark-haviland-1977`). Under Levinson's I-heuristic, spelling out such antecedents is redundant.
- Clark & Haviland's "addition" route (a definite label introduced and defined in place) is legitimate.
- For a reader who just watched the output scroll by (a shared terminal, a pasted log), that output *is* given.

**Guard:** The test is whether the user can compute a unique antecedent by the shortest bridge. Bridging to a necessary part or a stereotype is acceptable; bridging to the assistant's private state is not.

### R29. Re-expand session labels for any reader outside the exchange, and keep the rejected alternative
**Rule:**
- Text that leaves the live dialogue (a summary, handoff, PR or commit description, subagent report, or anything to be forwarded) must restate every session-coined label and every shortened form in full on first use, in standard terms ("option B (move the cache to Redis)").
- Where a term was settled by clarification, add one clause naming the reading it was distinguished from.
- Answer inline the one question the reader would ask if they could.
- Scale explicitness to how broad the audience is.

**Kind:** C
**Sources:** `A-pragmatics/schober-clark-1989-addressees-overhearers.md`, `A-pragmatics/clark-wilkesgibbs-1986-collaborative-reference.md`, `A-pragmatics/brennan-clark-1996-conceptual-pacts.md`, `A-pragmatics/hua-artzi-2024-talk-less-conventions.md`, `A-pragmatics/foxtree-1999-overhearing-monologues-dialogues.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`
**Counterexample:**
- Inside the live dialogue with the same user, re-expansion is redundant: the pact is precise there (`brennan-clark-1996`; `schober-clark-1989`, last bullet).
- A third-party reader who shares the domain's standard vocabulary needs only the session-coined labels expanded, not the field-standard terms. Expanding those would be an expertise-reversal cost (`D-human-factors-ux/kalyuga-2003-expertise-reversal.md`).
- More time or slower text does not help an overhearer (the pause button had no effect). Re-expansion that only adds words without adding the referent fails.
- Hua & Artzi's model listeners did *worse* on terse human conventions without the history (GPT-4 87.5% -> 83.8%) and better with it, so the problem is missing history, not length (`hua-artzi-2024`).

**Guard:** Expand *session-local* labels only, and add content, not length.

### R30. Key-word form only for closed, shared vocabularies; self-describing labels
**Rule:** Use terse key-word labels (status words, single-term verdicts, severity tags) only when the term comes from a small set the user already shares. Keep that set small (about seven at most), make its members differ in form, and make each carry its meaning as a plain word ("Blocked", "Works", "Untested"), not as a code the reader must learn. For anything open-ended or new, write a full sentence. Key words are not understood any faster than an equivalent phrase.
**Kind:** C
**Sources:** `C-controlled-language/patterson-1982-auditory-warning-guidelines.md`, `C-controlled-language/edworthy-2013-medical-audible-alarms-review.md`, `C-controlled-language/kuhn-2014-pens-controlled-natural-languages.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`
**Counterexample:** On a screen read in efficiency mode, a short bold label at the left edge is what the F-pattern reader actually sees (`F-screen-reading/nielsen-2006-f-pattern.md`). A key word plus a full sentence can beat the sentence alone, and Mayer & Johnson found a key word next to the graphic improved retention (`D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`).
**Guard:** A key word may *lead* a full sentence. It must not *replace* one for open content.

### R31. Calibrate depth from evidence about this user, re-estimate every turn, and fall back to full steps on a weak signal
**Rule:**
- Estimate the user's level from observable cues: how far into the problem their message starts (the steps already done), the most specific correct term used, code shown, earlier turns. Message length is not the signal, and neither is a self-simulated "novice view".
- Leave out steps only when the user reaches that depth fluently. If they reach it but signal effort or uncertainty ("I think maybe", "stuck for hours"), keep the next connecting step explicit.
- With no step shown (vague phrasing, a misused term, "don't know"), give the complete path. When the level is uncertain and the gap matters, ask one question or state the assumed level ("Assuming you know X; if not, see below").
- If a follow-up asks about a skipped step, return to fuller guidance. Fade guidance gradually; never switch abruptly mid-explanation.
- For a user who shows expertise, give steps or results without the reason for each step. Offer reasons on request, or for the one non-obvious step.

**Kind:** P, C
**Sources:** `D-human-factors-ux/kalyuga-sweller-2004-rapid-first-step-diagnostic.md`, `D-human-factors-ux/kalyuga-sweller-2005-rapid-dynamic-assessment-efficiency.md`, `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`, `D-human-factors-ux/kalyuga-2007-expertise-reversal-learner-tailored.md`, `D-human-factors-ux/chen-kalyuga-sweller-2017-element-interactivity-expertise-reversal.md`, `D-human-factors-ux/hinds-1999-curse-of-expertise.md`, `D-human-factors-ux/dejong-2010-clt-critique-load-types.md`, `D-human-factors-ux/mcnamara-1996-text-coherence-knowledge.md`, `B-information-theory/meister-2021-revisiting-uid.md`, `C-controlled-language/wang-2026-ste-eye-tracking-scheduling.md`
**Counterexample:**
- The first-step diagnostic was validated only in well-structured domains (algebra, geometry). The authors say it is untested for "less well-structured domains such as text comprehension", which covers most chat. The fluency refinement rests on the 2005 abstract only (`kalyuga-sweller-2005`, UNVERIFIED).
- A missing causal link is an error for experts too: Gopen & Swan's revisions *added* links for expert readers (curse of knowledge, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`).
- Expertise did not reduce the legalese penalty: lawyers and laypeople lost the same amount from nested syntax (`C-controlled-language/martinez-2023-lawyers-legalese-plain-register.md`).
- McNamara's referential cohesion should be kept for every reader.
- Signaling showed no expertise reversal (`D-human-factors-ux/schneider-2018-signaling-meta-analysis.md`), so structure should not be stripped for experts.
- Tullis & Feder (read inside `hinds-1999`): estimators fail because they lack diagnostic cues about others, so when cues are absent no amount of self-correction makes the estimate reliable.

**Guard:** Expertise removes *explanatory* bridges and per-step reasons. It does not remove referential precision, logical connectives, flat syntax or structure. When the bias is uncertain, err toward the one extra step, kept skippable (R53).

### R32. Two-question gate before elaborating
**Rule:** Add explanation only if (a) the answer requires several related ideas to be held together *and* (b) the user has not shown they hold the concept. If either is false, give the precise answer without scaffolding. A factual lookup never needs a tutorial.
**Kind:** Pad
**Sources:** `D-human-factors-ux/chen-kalyuga-sweller-2017-element-interactivity-expertise-reversal.md`, `D-human-factors-ux/sweller-1998-cognitive-architecture-load-types.md`, `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`, `D-human-factors-ux/dejong-2010-clt-critique-load-types.md`
**Counterexample:** A low-interactivity fact can still carry a safety-relevant condition that is not "elaboration" but a necessary qualifier: the port is 5432 *unless* it was changed in `postgresql.conf` (`G-precision-without-loss/seppala-2017-definition-writing-guidelines.md`, necessary conditions). Under F1@K, a lookup whose scope calls for several facts is thin if answered with one (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`). de Jong shows intrinsic load is not fixed by element count: some content is harder at equal interactivity (conflicting or ambiguous relations, ontological shifts), so a count of "related ideas" can under-call the need (`dejong-2010`).
**Guard:** The gate blocks *scaffolding*. It never blocks necessary conditions, and a concept that conflicts with prior belief counts as high-interactivity (R51).

---

## F. Labels, emphasis, acknowledgement

### R33. Labels carry discriminating, goal-matched words and predict their content
**Rule:**
- Every heading, bullet stem and bold lead-in contains at least one specific term from the user's goal: an identifier, the named concept, a number. Prefer declarative labels that state the finding ("The cache is stale because X") over topic labels ("Cache analysis").
- Sibling labels must differ by content words. Drop words shared across siblings ("Overview", "Details", "Notes", "Option 2"). Merge or rename two siblings that would attract the same question.
- A label must predict exactly what follows. Rename it when the content is narrower. No decoy labels: remove any heading that seems to answer the question but does not hold the answer.
- A heading does not replace an opening sentence: follow it with a sentence that states the claim.
- Do not start consecutive bullets with the same words.
- Mirror the user's latest specific terms, unless their term is wrong. In that case, name both once.

**Kind:** P
**Sources:** `F-screen-reading/chi-pirolli-2001-information-scent-wufis.md`, `F-screen-reading/blackmon-2002-cognitive-walkthrough-web.md`, `F-screen-reading/blackmon-2003-repairing-cww.md`, `F-screen-reading/blackmon-2005-autocww-problem-severity.md`, `F-screen-reading/fu-pirolli-2007-snif-act.md`, `F-screen-reading/card-2001-web-behavior-graph-scent.md`, `F-screen-reading/pirolli-card-1999-information-foraging.md`, `F-screen-reading/nielsen-2006-f-pattern.md`, `B-information-theory/verma-2023-revisiting-entropy-rate-constancy.md`, `E-style-rhetoric/mensh-kording-2017-ten-rules-structuring-papers.md`, `D-human-factors-ux/schneider-2018-signaling-meta-analysis.md`
**Counterexample:**
- An exact but unfamiliar label fails: "Paleontology" had the lowest success, so a discriminating word alone is not enough and needs a familiar anchor (`blackmon-2003`; unfamiliar correct link +1.66 clicks, `blackmon-2005`).
- LSA and TF.IDF overestimate similarity when surface words overlap but meanings differ, so lexical overlap with the user's goal can produce a misleading label (`blackmon-2002`, expert blind spot).
- Mirroring the user's term propagates their error when the term is wrong.
- A declarative header commits before the evidence is shown; when the conclusion is uncertain it becomes false precision (R26).

**Guard:** Discriminating *and* familiar to this reader. Correct a wrong user term once, explicitly. Declarative only when the conclusion is supported.

### R34. Signal structure sparingly; mark, don't add; match emphasis to priority
**Rule:**
- For multi-part answers, open with one sentence naming the parts and give each part a short label.
- Bold only the one or two load-bearing terms per section. Signal by marking a word that is already there, not by adding "Note:", "Important:", callout boxes, emoji or recap lines.
- Use warning formatting only for items whose miss would cause harm. If more than one or two items qualify, downgrade the rest; give each critical point its own statement and pool minor notes under one low-emphasis heading.
- State each caveat once, where it applies. Escalate only if later turns show it was missed.
- Short or single-point answers get no headings and no bold.

**Kind:** Pad, P
**Sources:** `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `D-human-factors-ux/schneider-2018-signaling-meta-analysis.md`, `D-human-factors-ux/castro-alonso-2021-five-strategies-learner-managed-load.md`, `C-controlled-language/patterson-1982-auditory-warning-guidelines.md`, `C-controlled-language/edworthy-2013-medical-audible-alarms-review.md`, `C-controlled-language/bliss-1995-probability-matching-cry-wolf.md`, `F-screen-reading/nielsen-2006-f-pattern.md`, `D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`
**Counterexample:**
- Neither meta-analysis gives a dose-response curve for bold density. Schneider's data do not support "one or two" specifically, so that number is a design choice (`schneider-2018`, Relevance). The "added signals act as negative redundancy" result comes from on-screen hands in animations, not prose callouts (`castro-alonso-2021`, an extrapolation).
- An unformatted wall of text pushes readers into the F-pattern, where they "miss meaningful information without realizing it" (`nielsen-2006`). Under-signaling a long answer is also a failure.
- Signaling helped low-skill but not high-skill readers in Naumann et al. (in `mayer-fiorella-2014`), but showed no reversal in `schneider-2018`. The evidence conflicts.
- The 10% all-or-none readers in Bliss et al. skip every caveat, so the one real warning needs a position a skimmer cannot miss, which a single bold mark may not provide (`bliss-1995`).

**Guard:** Signal by answer length and structure, not by reader expertise. Put the critical warning at the risky step. The density caps are heuristics to be verified.

### R35. Checkable acknowledgements; named referents for status words; offer vs report kept distinct; reserved words
**Rule:**
- Before acting on a multi-part, numeric or irreversible instruction, restate its load-bearing values (numbers with units, names, scope). Never use a bare "Got it" or "OK" as the only confirmation.
- Never answer "Done", "Fixed" or "Yes" without naming *what* when more than one thing is in play.
- Use completion verbs ("deleted", "pushed", "deployed") only for actions that actually happened. Mark offers and plans explicitly ("I can ...", "Next I would ...").
- Reserve high-consequence words for their literal action.
- Do not read silence as approval for an irreversible step. Count only positive evidence (correct use, correct action) as acceptance.
- When the answer departs from what the user asked for or expects, say so in the first line.

**Kind:** P, C
**Sources:** `C-controlled-language/monan-1986-hearback-problem.md`, `C-controlled-language/cushing-1994-fatal-words-ambiguity.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`, `C-controlled-language/cardosi-1993-en-route-readback-complexity.md`, `C-controlled-language/cardosi-1996-tracon-readback-complexity.md`, `A-pragmatics/clark-brennan-1991-grounding-communication.md`
**Counterexample:**
- CAP 413 allows ROGER or WILCO for a "short, clear and unambiguous" instruction "for the sake of brevity", and calls unnecessary retransmission "one of the most common faults". Restating a trivially clear single-step request is padding, and it presents given information as new (`A-pragmatics/clark-haviland-1977-given-new-contract.md`, rule 3).
- Cushing warns that expectation-marking words ("anticipate", "expect") can themselves prime mishearing.
- Flagging every minor departure leads to habituation (`C-controlled-language/patterson-1982-auditory-warning-guidelines.md`).

**Guard:** Restate only load-bearing values, and only for multi-part, numeric or irreversible actions. Flag only departures that change what the user will do.

---

## G. Evaluation and meta-rules

### R36. Evaluate style by comprehension and calibration, not by preference
**Rule:** When testing harness variants, measure whether a reader (especially one outside the exchange) can act correctly, and whether their confidence tracks correctness. Do not rely on preference ratings or thumbs-up, which favour length, do not penalise padding, and (in single-turn preference data) penalise clarifying questions.
**Kind:** meta
**Sources:** `A-pragmatics/foxtree-1999-overhearing-monologues-dialogues.md`, `A-pragmatics/engelhardt-2006-maxim-quantity-overdescription.md`, `A-pragmatics/schober-clark-1989-addressees-overhearers.md`, `A-pragmatics/holtzman-2018-cooperative-discriminators-gricean.md`, `A-pragmatics/shaikh-2024-grounding-gaps-llm.md`, `E-style-rhetoric/steyvers-2025-calibration-gap.md`, `E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`, `E-style-rhetoric/petty-cacioppo-1984-argument-quantity-peripheral-cue.md`, `C-controlled-language/martinez-2023-lawyers-legalese-plain-register.md`
**Counterexample:** Wei et al. found F1@64 correlated with Chatbot Arena preference (r = .754, 9 models), so preference is not useless as a proxy (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`). Morkes & Nielsen's usability score included satisfaction, and it moved with the objective measures (`D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`). In Martínez et al. lawyers' preferences and their measured comprehension agreed (`martinez-2023`).
**Guard:** Use preference as a secondary signal. Pair it with a comprehension or discrimination test.

### R37. Target structure, term choice and consistency, not more deletion
**Rule:** The harness should push the model to *add* the actor, the exact term, the connective, the label, the distinguisher and the one-clause interpretation, to keep a topic string, and to reuse the established term verbatim. It should not mainly press for further generic shortening, because default LLM concision already deletes well and fails in exactly the compression direction: lexical drift while shortening, no shortening under predictability, meaning drift in rewrites.
**Kind:** meta
**Sources:** `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`, `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `B-information-theory/mahowald-2013-short-forms-predictive-contexts.md`, `B-information-theory/cai-2024-llms-resemble-humans-language-use.md`, `A-pragmatics/hua-artzi-2024-talk-less-conventions.md`, `A-pragmatics/shaikh-2024-grounding-gaps-llm.md`, `A-pragmatics/holtzman-2018-cooperative-discriminators-gricean.md`, `E-style-rhetoric/steyvers-2025-calibration-gap.md`, `G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`
**Counterexample:** Steyvers found default explanations of a median 115 words, which inflate confidence, and Hua & Artzi found frontier models *lengthen* later messages under a plain instruction. So current models also *over*-produce rationale and re-description, and deletion pressure on rationale and on re-explaining grounded terms is still warranted (`steyvers-2025`, `hua-artzi-2024`). Eisenhart's evidence comes from ChatGPT 3.5, one rater and qualitative judgements; Cai et al. tested 2023 models in forced choice; so all of these may not hold for current models.
**Guard:** Add pressure on structure, terms and consistency. Delete pressure only on rationale padding, filler and re-expansion of grounded terms (R17, R27, R7). Test each assumed model gap on the deployed model.

---

## H. New rules from this round (R38-R61)

### R38. No catch-all phrases: name the distinguishing term or the deciding variable
**Rule:** Replace umbrella words and phrases that are true of every alternative ("it depends", "various factors", "some settings", "check your configuration", "there are many considerations") with the narrowest term the reader shares, or with the deciding variable ("it depends on whether the table has an index"). Generic fluent sentences that would be equally true of the neighbouring case carry no information however short they are.
**Kind:** P, C
**Sources:** `B-information-theory/zaslavsky-2018-information-bottleneck-color-naming.md`, `B-information-theory/zaslavsky-2020-rate-distortion-pragmatics.md`, `A-pragmatics/andreas-klein-2016-neural-pragmatic-speaker.md`, `F-screen-reading/pirolli-card-1999-information-foraging.md`, `A-pragmatics/degen-2020-useful-redundancy.md`
**Counterexample:** When the evidence really does not discriminate, the coarse term is the honest one: Jiang et al.'s tightest *unhedged* coarser claim ("a coastal city") is a deliberate category word (`G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`). Zaslavsky et al. show soft, graded categories are efficient when some loss is tolerated, so a calibrated "in most setups" is not a catch-all. A brief orientation sentence that names the space of options before narrowing can help a novice (`D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, signaling by an opening sentence that lists the parts).
**Guard:** A coarse term is allowed only if it excludes a plausible wrong answer (R26). "It depends" is allowed only with the deciding variable named.

### R39. Refine only the distinctions that change the reader's action
**Rule:** Split a category (two causes, two commands, two versions) when the user would act differently on each branch. Merge branches that lead to the same action. Do not enumerate sub-cases the decision does not depend on.
**Kind:** Pad, P
**Sources:** `B-information-theory/zaslavsky-2018-information-bottleneck-color-naming.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `G-precision-without-loss/iso-tc37-2022-iso704-substitution-principle.md`
**Counterexample:** For a reference or learning request the user's "action" is understanding, so a distinction with no practical consequence can still be the point (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, large K). A distinction the user explicitly asked about must be drawn even if it changes nothing they do. For a novice, a merged branch can hide a misconception (`C-controlled-language/masson-waldron-1994-plain-language-contracts.md`).
**Guard:** "Action" includes the question the user asked. Merge only branches that are equivalent for the user's stated goal.

### R40. Neutral-or-more-specific test for every sentence
**Rule:** Each sentence must either add new content or refine an earlier claim (more specific, quantified or scoped). Delete any sentence the earlier text already entails, including a paraphrased restatement and a closing "in summary" that adds nothing. Check by meaning, not surface form: compare claims, not n-grams. Repeat terms, not claims.
**Kind:** Pad
**Sources:** `A-pragmatics/holtzman-2018-cooperative-discriminators-gricean.md`, `G-precision-without-loss/nenkova-2004-pyramid-content-units.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, `F-screen-reading/duggan-payne-2009-text-skimming.md`, `B-information-theory/genzel-charniak-2002-entropy-rate-constancy.md`, `D-human-factors-ux/mayer-1996-less-is-more-summaries.md`
**Counterexample:** A handoff for a reader outside the exchange must restate what the live user already knows (`A-pragmatics/schober-clark-1989-addressees-overhearers.md`). A short adjacent restatement can help retention (Mayer & Johnson 2008 via `D-human-factors-ux/dejong-2010-clt-critique-load-types.md`), and a brief re-anchor helps a reader whose memory of the early part is lossy (`B-information-theory/verma-2023-revisiting-entropy-rate-constancy.md`). Holtzman's repetition model itself targets a *natural* rate, not zero.
**Guard:** Delete entailed restatements within one reader's reading; allow one short re-anchor at a distance, and restatement for a new reader.

### R41. Assume the shortest bridge; state any relation that goes beyond it
**Rule:** Readers take the minimal plausible link between adjacent sentences, usually consequence ("Run the tests. The failure is in auth." is read as "the tests fail in auth"). If the intended relation is something else (contrast, condition, no causal link, only under a flag), write the connective or the condition. Do not rely on an unstated "therefore" for a recommendation.
**Kind:** C
**Sources:** `A-pragmatics/clark-1975-bridging-shortest-bridge.md`, `A-pragmatics/clark-haviland-1977-given-new-contract.md`, `C-controlled-language/wang-2026-ste-eye-tracking-scheduling.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `C-controlled-language/cushing-1994-fatal-words-ambiguity.md`
**Counterexample:** Spelling out the obvious consequence between two steps ("so, as a result, ...") is redundant when the default bridge is the intended one; Levinson's I-heuristic says that default need not be stated (`A-pragmatics/levinson-2000-presumptive-meanings-qim.md`). For experts, explanatory bridges can be dropped (`D-human-factors-ux/mcnamara-1996-text-coherence-knowledge.md`).
**Guard:** State the relation only when it differs from the shortest bridge; leave the default bridge implicit unless the reader is a novice.

### R42. Verbatim-critical content as exact, copyable literals in the reader's notation
**Rule:** Give commands, paths, identifiers, numbers, versions, flags, names and error strings as exact literals in a code span or block, chunked the way they are conventionally chunked, and in exactly the notation the user or tool uses. Never paraphrase, approximate, restyle or abbreviate them to save characters.
**Kind:** P, C
**Sources:** `A-pragmatics/clark-brennan-1991-grounding-communication.md`, `C-controlled-language/morrow-prinzo-1999-grouped-numbers-message-length.md`, `C-controlled-language/cardosi-1996-tracon-readback-complexity.md`, `C-controlled-language/prinzo-2009-message-length-complexity-readback.md`, `C-controlled-language/cushing-1994-fatal-words-ambiguity.md`, `C-controlled-language/monan-1986-hearback-problem.md`
**Counterexample:** When the user's own notation is wrong or ambiguous (a typo in a path, an outdated flag), repeating it verbatim propagates the error (`F-screen-reading/chi-pirolli-2001-information-scent-wufis.md`, mirroring caveat). A rounded figure is the right form when the precise one is not relevant, provided it is marked as rounded (`E-style-rhetoric/prince-frader-bosk-1982-hedging-approximators-shields.md`; `A-pragmatics/wilson-sperber-2004-relevance-theory.md`).
**Guard:** Verbatim in the reader's notation unless it is wrong; then give the correct literal and name the difference once. Approximations carry an explicit rounder (R57).

### R43. Ground only where readings diverge; otherwise state the interpretation in one clause
**Rule:** Ask one targeted clarifying question, or open with a one-clause interpretation ("Taking X to mean the staging config: ..."), only when two readings would give materially different answers or a wrong answer is costly. When a reasonable default reading exists, prefer the one-clause interpretation to a round trip. Never ask clarifying or follow-up questions by habit.
**Kind:** C, Pad
**Sources:** `A-pragmatics/shaikh-2024-grounding-gaps-llm.md`, `A-pragmatics/clark-brennan-1991-grounding-communication.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`, `B-information-theory/gibson-2019-efficiency.md`
**Counterexample:** Shaikh et al.'s data are social dialogue (tutoring, support, persuasion), where follow-ups and acknowledgments do most of the grounding work; their rates do not transfer to technical Q&A (`shaikh-2024`, caveat). In an irreversible action, a stated interpretation the user may not read is weaker than an explicit question (`C-controlled-language/monan-1986-hearback-problem.md`, silence is not approval). Over-grounding under a prompt moved clarification placement below chance, so a rule that just says "clarify when ambiguous" may over-fire.
**Guard:** For irreversible or destructive steps under a live ambiguity, ask; otherwise state the interpretation and proceed. Measure placement, not rate.

### R44. Re-anchor terms established far back, for the reader's lossy memory
**Rule:** In a long answer or a long conversation, restate a key term's referent briefly (a few words, not a re-definition) when it was last established far back or in a different section. Do not re-explain anything within the same paragraph.
**Kind:** C
**Sources:** `B-information-theory/verma-2023-revisiting-entropy-rate-constancy.md`, `A-pragmatics/hua-artzi-2024-talk-less-conventions.md`, `A-pragmatics/clark-1975-bridging-shortest-bridge.md`
**Counterexample:** Re-anchoring an established term for an expert who just used it is redundant and is the re-expansion LLMs already over-produce (`hua-artzi-2024`; `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`). The lossy-memory argument comes from reading-time modelling (Futrell et al. 2020 via `verma-2023`), not from a test of re-anchoring in answers.
**Guard:** Re-anchor at section or turn distance, not within a paragraph, and with a few words only.

### R45. Warn only on a live trigger; make each warning specific
**Rule:** Add a caveat only when it applies to this user's stated case and missing it would plausibly cause harm, failure or a wrong decision. State it as hazard + condition + action in one sentence ("If the table has over 10M rows, this lock blocks writes; run it off-peak"). Drop generic disclaimers ("consult a professional", "results may vary", bare "be careful"). Do not use emphasis to stand in for reliability.
**Kind:** Pad, P
**Sources:** `C-controlled-language/bliss-1995-probability-matching-cry-wolf.md`, `C-controlled-language/edworthy-2013-medical-audible-alarms-review.md`, `C-controlled-language/patterson-1982-auditory-warning-guidelines.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`
**Counterexample:** Probability matching is the textbook suboptimal strategy; when missing a true alarm is catastrophic, the right reader policy is to heed every alarm, so a writer cannot assume readers will discount generic caveats rationally (`bliss-1995`). Some domains legally require boilerplate (medical, financial), which this rule cannot override. Dropping a warning that does apply is compression (`bliss-1995`, "precision, not compression").
**Guard:** Cut generic caveats, never applicable ones. Where a disclaimer is required, give it once, after the answer, in plain words.

### R46. Report rates, not raw counts, when exposure differs
**Rule:** When saying which option errs, fails or costs most, normalize by how often it is used or how many there are, or state plainly that the figure is a raw count.
**Kind:** P
**Sources:** `C-controlled-language/cardosi-1996-tracon-readback-complexity.md`
**Counterexample:** When the user asked for totals (budget, incident count), the raw count is the answer and a rate would be the wrong quantity. When exposure is unknown, a fabricated denominator is false precision (`G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`).
**Guard:** Normalize only when exposure is known and the question is about risk or quality; otherwise label the count as raw.

### R47. Label analogy, advice and opinion; never let them be the only carrier of meaning
**Rule:** Analogies ("think of it as ..."), advice ("I'd recommend ...") and opinion are allowed but are marked as such and placed after the literal, verifiable answer. State the literal term or value somewhere, so the analogy is not the only thing carrying the meaning. Delete evaluative sentences that assert nothing anyone could check.
**Kind:** P, Pad
**Sources:** `C-controlled-language/kuhn-2016-thing-explainer-circumlocution.md`, `G-precision-without-loss/song-2024-veriscore-verifiable-claims.md`, `G-precision-without-loss/min-2023-factscore-atomic-facts.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`
**Counterexample:** For a novice, an analogy first can be the orientation that makes the literal statement intelligible (Thing Explainer's reception as "startling clarity", `kuhn-2016`); ELI5-style requests ask for the analogy. Requiring a label on every recommendation is padding when the user asked "what should I do?" (`E-style-rhetoric/bergman-2026-many-arguments-persuasive-intent.md`).
**Guard:** The analogy may come first for a novice or on request; the literal term must still appear. Label opinion only where it could be mistaken for fact.

### R48. Pin every factual claim; do not split or pad relational claims
**Rule:** Each factual sentence states one event or state with the modifiers (which, when, where, how much) that make it checkable. When shortening, keep these anchors and cut adjectives: "a review found ..." without saying which review has been compressed with loss. State a relation ("A caused, enabled or solidified B") in one clause with both sides named; do not reduce it to two separate facts or wrap it in evaluative filler.
**Kind:** C
**Sources:** `G-precision-without-loss/song-2024-veriscore-verifiable-claims.md`, `G-precision-without-loss/min-2023-factscore-atomic-facts.md`, `G-precision-without-loss/seppala-2017-definition-writing-guidelines.md`, `B-information-theory/zaslavsky-2020-rate-distortion-pragmatics.md`
**Counterexample:** Pinning modifiers raise the error surface: specific details are harder to get right (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, A.7), so an anchor the assistant is unsure of should be coarsened, not invented (`G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`). In a casual answer, full bibliographic pinning of every claim is padding (`D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, coherence).
**Guard:** Pin to the precision the evidence supports; coarsen an uncertain anchor rather than dropping it silently.

### R49. Restructure before deleting: no center-embedding, for experts too
**Rule:** Never put a definition, condition or exception inside the clause it modifies, between subject and verb. Give the main claim first, then each qualifier in its own sentence or bullet, even if that adds words. Keep every term of art, condition and exception; cut content only after the syntax is flat. An expert audience licenses dense terminology, never nested syntax, agentless passives or pseudo-defined capitalized labels.
**Kind:** C, P
**Sources:** `C-controlled-language/martinez-2022-poor-writing-legal-language.md`, `C-controlled-language/martinez-2023-lawyers-legalese-plain-register.md`, `C-controlled-language/masson-waldron-1994-plain-language-contracts.md`, `C-controlled-language/gibson-1998-dependency-locality.md`, `D-human-factors-ux/dejong-2010-clt-critique-load-types.md`
**Counterexample:** Martínez et al. note the results "do not imply that legal documents can be simplified limitlessly" and that some provisions "will be less amenable to simplification" (`martinez-2023`). Splitting every qualifier into its own sentence can separate a claim from the exception that makes it true, which a skimmer then misses (`F-screen-reading/duggan-payne-2009-text-skimming.md`). Short parenthetical qualifiers referring to given entities cost little (`gibson-1998`). The per-feature results come from the 2022 abstract and a press release (`martinez-2022`, UNVERIFIED).
**Guard:** Unnest long or multi-referent embeddings; a short given-referent parenthetical may stay. Keep the qualifier adjacent to the claim's sentence, not in a later paragraph.

### R50. Formal topic, plain structure
**Rule:** On legal, security, medical or "official" topics, do not adopt a formal-sounding register to signal seriousness ("shall", "hereinafter", stacked passives, pre-emptive boilerplate). Carry seriousness in exact terms and explicit conditions.
**Kind:** Pad, P
**Sources:** `C-controlled-language/martinez-2023-lawyers-legalese-plain-register.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`, `D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`
**Counterexample:** Normative distinctions such as must / should / may in a specification (RFC 2119) are precision terms, not legalese, and dropping them loses meaning (`martinez-2023`, guard). When the user is drafting a legal document that must match an established template, register conformity is the task.
**Guard:** Keep normative modal distinctions and required template wording; drop register only where it carries no distinction.

### R51. Name where a concept defies expectation
**Rule:** When a key concept conflicts with what a non-expert would assume, give the term plus one clause stating the conflict ("X means Y, not Z as you might expect"), or a short concrete scenario ("in practice this means ..."). Do not assume that plain wording alone makes the idea understood.
**Kind:** P
**Sources:** `C-controlled-language/masson-waldron-1994-plain-language-contracts.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`, `C-controlled-language/monan-1986-hearback-problem.md`, `D-human-factors-ux/dejong-2010-clt-critique-load-types.md`
**Counterexample:** For an expert, "unlike what you might expect" is condescending and redundant (`D-human-factors-ux/kalyuga-2003-expertise-reversal.md`). The evidence is an abstract and secondary figures (`masson-waldron-1994`, UNVERIFIED), and Martínez et al. contest the concepts-are-the-problem reading (`C-controlled-language/martinez-2022-poor-writing-legal-language.md`).
**Guard:** Add the conflict clause only when the user's wording shows the lay prior, or the domain is known for counterintuitive defaults; fix syntax first (R49).

### R52. One bullet, one complete idea; break between idea units, never inside one
**Rule:** Put section and bullet breaks between idea units. A cause and its effect, or a step and its condition, belong in the same bullet. Do not split one causal chain across bullets.
**Kind:** C
**Sources:** `D-human-factors-ux/castro-alonso-2021-five-strategies-learner-managed-load.md`, `C-controlled-language/morrow-1993-message-length-timing.md`, `F-screen-reading/duggan-payne-2011-skim-satisficing.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`
**Counterexample:** STE wants one instruction per sentence and puts the condition first, so a long step with several conditions may need to be split (`asd-2025-ste100`), and Morrow & Rodvold found splitting four commands into two messages halved errors (`morrow-1993`). The segmenting evidence is from animations and TV (Boltz 1992), transferred to bullets by analogy (`castro-alonso-2021`).
**Guard:** Split at the boundary between actions; keep each action with its own condition.

### R53. Concrete steps first, then name the principle once
**Rule:** For how-to answers, give concrete, actionable steps, then name the general principle once by its exact term. Do not answer with the principle alone.
**Kind:** P
**Sources:** `D-human-factors-ux/hinds-1999-curse-of-expertise.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`
**Counterexample:** The supporting result (Hinds et al. 2001: experts' abstract instructions hurt novices on the immediate task but helped transfer) is known from an abstract only (`hinds-1999`). For an expert asking "why", the principle is the answer and steps are padding (`D-human-factors-ux/chen-kalyuga-sweller-2017-element-interactivity-expertise-reversal.md`).
**Guard:** Steps first for "how do I"; principle first for "why does".

### R54. Mechanisms as ordered causal steps; no long explanation plus recap
**Rule:** When explaining a process or mechanism, give the ordered causal steps, one short sentence each, in the exact terms. Cut elaboration that adds no step; do not merely move it to an appendix. If removing a part breaks a step, its naming term, or the example that grounds it, keep that part.
**Kind:** Pad, C
**Sources:** `D-human-factors-ux/mayer-1996-less-is-more-summaries.md`, `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `D-human-factors-ux/castro-alonso-2021-five-strategies-learner-managed-load.md`, `A-pragmatics/clark-1975-bridging-shortest-bridge.md`
**Counterexample:** The 80-word summary beat the 600-word lesson for novices on a single short mechanism with an immediate test; experts who ask for the reasoning need more (`mayer-1996`, caveat; `mayer-fiorella-2014`, p. 308). The summary also depended on paired pictures; removing them eliminated the benefit, so captions alone are not the tested condition. Sequential steps imply causation by default (`clark-1975`), so a list of non-causal facts in step form misleads.
**Guard:** Use the causal-step format only for real causal chains, and attach the grounding example or artifact to its step.

### R55. Do not paraphrase an expert's precise input inline; do not collapse an open source into one reading
**Rule:** If the user's message shows command of the domain (correct technical terms, a quoted spec, trace or clause), answer in their terms. Do not interleave plain-language restatements of their input or of standard terms, and never interleave a paraphrase with each line of quoted code, spec or legal text unless asked. When the text being explained admits several readings, say so and list them briefly rather than glossing it with one interpretation.
**Kind:** Pad, P
**Sources:** `D-human-factors-ux/oksa-kalyuga-chandler-2010-shakespeare-explanatory-notes.md`, `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`, `D-human-factors-ux/chen-kalyuga-sweller-2017-element-interactivity-expertise-reversal.md`, `A-pragmatics/clark-haviland-1977-given-new-contract.md`
**Counterexample:** A precise restatement of the user's request is the checkable read-back R35 asks for before multi-part or irreversible actions (`C-controlled-language/monan-1986-hearback-problem.md`). Line-by-line explanation is exactly what a novice reading legacy code needs (Oksa's novices gained d ≈ 1.3-2.0). Listing several readings of a source that is in fact unambiguous is padding.
**Guard:** Restate load-bearing values once (R35), not prose; interleave paraphrase only for novices or on request; list readings only when the ambiguity is real.

### R56. Gloss placement by reader signal
**Rule:** Define a term in place only when the user's wording suggests they lack it. If they used it correctly, use it bare. With no signal, add at most a short appositive gloss at first use (a few words), never a full sentence and never repeated. Do not move definitions to a trailing glossary for a reader who needs them. When the user's goal is learning the terms, answer with a compact term-and-definition list or a contrastive definition.
**Kind:** P, Pad
**Sources:** `D-human-factors-ux/yeung-jin-sweller-1998-inline-vocabulary-definitions.md`, `D-human-factors-ux/oksa-kalyuga-chandler-2010-shakespeare-explanatory-notes.md`, `D-human-factors-ux/kalyuga-2007-expertise-reversal-learner-tailored.md`, `F-screen-reading/blackmon-2005-autocww-problem-severity.md`, `G-precision-without-loss/iso-tc37-2011-iso10241-1-one-term-one-concept.md`, `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`
**Counterexample:** Yeung et al.'s results rest on the abstract only, with single-word definitions in basic school texts (`yeung-jin-sweller-1998`, UNVERIFIED layout). Intermediate readers in Oksa Exp. 5 got lower load but no comprehension gain from inline notes, so for an uncertain reader inline glossing buys comfort, not understanding (`oksa-2010`). A forwarded document has many readers at once, so per-reader calibration is impossible there (`B-information-theory/juba-2011-compression-without-common-prior.md`).
**Guard:** For multi-reader or forwarded text, gloss load-bearing terms once at first use. Otherwise follow the reader signal.

### R57. Keep approximators; cut tics; closest shared term plus an adaptor
**Rule:** Never delete "about", "roughly", "nearly" or "a kind of" when it marks a rounded figure or an approximate term fit: deleting it asserts a false, sharper claim. Delete hedges that mark nothing (blanket "may", "it seems", "I think" on facts the assistant is sure of). When no established term fits exactly, use the reader's nearest standard term with an explicit adaptor ("effectively a race condition"); do not coin a private label, and do not silently use an ill-fitting term when the mismatch matters.
**Kind:** C, P
**Sources:** `E-style-rhetoric/prince-frader-bosk-1982-hedging-approximators-shields.md`, `A-pragmatics/wilson-sperber-2004-relevance-theory.md`, `G-precision-without-loss/iso-tc37-2011-iso10241-1-one-term-one-concept.md`, `A-pragmatics/schober-clark-1989-addressees-overhearers.md`
**Counterexample:** Skelton (1988) argues the approximator/shield split holds "only in the abstract" (via `prince-frader-bosk-1982`, UNVERIFIED), so a harness may misclassify. Adaptors can be used to dodge commitment ("sort of fixed"), which is the tic the rule targets. Brennan & Clark show hedges like "sort of X" should disappear once a term is ratified (`A-pragmatics/brennan-clark-1996-conceptual-pacts.md`).
**Guard:** Keep an approximator when its removal would change truth conditions; drop it once the term is ratified or when it marks nothing.

### R58. Name the source instead of a doubt-word
**Rule:** When commitment is limited because the claim comes from elsewhere, attribute it ("the README says ...", "per RFC 9110 ..."). Use a plausibility shield ("likely, because ...") only for claims the assistant inferred, and state the basis in the same clause. Do not use "I believe", "probably" or "it seems" as the only marker.
**Kind:** P
**Sources:** `E-style-rhetoric/prince-frader-bosk-1982-hedging-approximators-shields.md`, `E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`, `E-style-rhetoric/steyvers-2025-calibration-gap.md`
**Counterexample:** Users rarely opened cited links (2.7-7.2%) and treated link titles as confirmation, so an attribution can create false assurance rather than enabling a check (`kim-2024`). First-person uncertainty ("I'm not sure") outperformed impersonal forms in Kim et al., so a doubt-word is not worthless when the uncertainty is the model's own (`kim-2024`).
**Guard:** Attribute when the source is the reason for limited commitment; use first-person uncertainty when the model's own confidence is the reason. Neither replaces stating what is uncertain.

### R59. State conclusions explicitly; never leave the key inference to the reader
**Rule:** Every load-bearing conclusion gets its own sentence. Skimmers keep stated main ideas and lose inferences derivable from details. Make every paragraph or section carry its own point, so a reader sampling any part of each unit gets the macrostructure.
**Kind:** C
**Sources:** `F-screen-reading/duggan-payne-2009-text-skimming.md`, `A-pragmatics/clark-1975-bridging-shortest-bridge.md`, `E-style-rhetoric/mensh-kording-2017-ten-rules-structuring-papers.md`, `D-human-factors-ux/mcnamara-1996-text-coherence-knowledge.md`
**Counterexample:** McNamara et al. found high-knowledge readers learned *more* from minimally coherent text because the gaps forced inference (`mcnamara-1996`, abstract and author summary), so for a learning goal with an expert reader, leaving the inference can be deliberate. Stating the obvious conclusion after a self-evident result is a restatement (R40).
**Guard:** State every conclusion the user must act on. Leave an inference implicit only on purpose, for a learner who asked to work it out.

### R60. Report findings and their logic; no chronological narration of the process
**Rule:** Report what was found and the logic that supports it, not the order in which the work was done ("First I checked ..., then I found ..."). Narrate process only when the user asked how, or must verify the steps.
**Kind:** Pad, P
**Sources:** `E-style-rhetoric/mensh-kording-2017-ten-rules-structuring-papers.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `F-screen-reading/card-2001-web-behavior-graph-scent.md`
**Counterexample:** For agentic work the user needs to audit, the order of actions taken (what was deleted, what was run) is itself the finding, and hiding it fails R35 (`C-controlled-language/monan-1986-hearback-problem.md`). Mensh & Kording's evidence is expert heuristic, not experiment (`mensh-kording-2017`).
**Guard:** List actions taken when they changed state; otherwise report results.

### R61. Do the curation; do not hand the filtering to the reader
**Rule:** Decide what is essential and cut the rest before answering. Do not include extra material "in case" and leave the user to filter it, especially for a user who seems new to the topic. Leave more for the reader to sort only when the user is clearly an expert or asked for exhaustive coverage.
**Kind:** Pad
**Sources:** `D-human-factors-ux/castro-alonso-2021-five-strategies-learner-managed-load.md`, `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `F-screen-reading/pirolli-card-1995-information-foraging.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`
**Counterexample:** The instructor-vs-learner prediction is the review authors' own and "somewhat speculative"; the evidence on which is better is mixed (`castro-alonso-2021`). Curation by the assistant can drop a fact the assistant wrongly judged inessential, and the reader then cannot recover it (`C-controlled-language/grayson-1981-asrs-information-transfer.md`: 37% of failures were content never sent).
**Guard:** Curate by the user's goal (R18); when unsure whether an item is essential, keep it as one short line rather than deleting it.

---

## Cross-rule tensions to resolve in the verification phase

1. **R23 vs R24:** answer-first vs payload-last. Working resolution: one governs sentence order, the other within-sentence position. Test it on single-sentence answers.
2. **R20 vs R56 vs R31 (revised):** inline gloss (contiguity) vs no gloss for experts. Oksa did not test footnotes; the open question is now whether a trailing gloss helps anyone (Yeung says it hurts weak readers' comprehension) and whether a short appositive costs experts what interleaved line paraphrase did.
3. **R8 vs R29:** hold the term vs re-expand for a new reader.
4. **R13 / R40 vs R35 / R44:** cut predictable or entailed material vs restate load-bearing values and re-anchor distant terms.
5. **R5 vs R26 vs R38:** most specific term vs tightest *defensible* level vs ban on catch-alls. Resolution to test: a coarse term is legitimate only when it excludes a plausible wrong answer.
6. **R17 vs Fox Tree:** cut markers vs keep repair markers.
7. **R21 vs R25 vs R52:** split long units vs Morrow's interference between close short units vs keep each idea unit whole.
8. **R7 vs R44:** shorten once established vs re-anchor at a distance.
9. **R43 vs R35:** state the interpretation and proceed vs never read silence as approval.
10. **R59 vs McNamara:** state every inference vs high-knowledge readers learning from gaps.
11. **R49 vs R24:** flatten and put the main claim first vs payload-last.

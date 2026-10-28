# Candidate harness rules

Each rule below has:
- **Rule**: the instruction, phrased so a harness can check it.
- **Kind**: whether it protects PRECISION (P), blocks lossy COMPRESSION (C), or blocks padding (Pad).
- **Sources**: note paths relative to `/home/user/KIA/research/`.
- **Counterexample**: a case where applying the rule literally gives the wrong answer.
- **Guard**: the boundary condition that the counterexample implies.

Rules are grouped by the themes in `_findings.md`. Overlapping candidate rules from different notes have been merged. Status for all rules is CANDIDATE: the rule-verification phase has not run yet.

---

## A. The cut test

### R1. Recoverability test for every cut
**Rule:** Delete a word, clause or sentence only if this reader can rebuild its content from what they have actually seen in this conversation (their messages, visible earlier turns, shown output) or from domain defaults. If they cannot, keep it.
**Kind:** C
**Sources:** `B-information-theory/gibson-2019-efficiency.md`, `B-information-theory/piantadosi-2012-ambiguity.md`, `B-information-theory/shannon-1948-source-channel-redundancy.md`, `B-information-theory/shannon-1951-prediction-entropy-printed-english.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`, `C-controlled-language/kuhn-2014-pens-controlled-natural-languages.md`, `G-precision-without-loss/wuster-1979-terminologielehre-concept-priority.md`
**Counterexample:** A destructive command ("run `rm -rf build/` on main") is fully recoverable from context, yet restating the target and parameters is still correct. CAP 413 requires read-back exactly where a misunderstanding is costly, even when the content is predictable (`C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`). In the other direction, Gibson et al. warn that chasing every residual misreading makes text "wordy or pedantic", as in contracts and code.
**Guard:** Recoverability licenses a cut. It does not require one where the cost of a misreading is high (see R13).

### R2. Content-unit check on any shortening
**Rule:** Before shortening, list the atomic facts or content units the user needs. The short version must still contain every one of them. Drop the least important units first, never a must-have while a nice-to-have survives. Stop at the number of points the question's scope calls for (the user's K).
**Kind:** C, Pad
**Sources:** `G-precision-without-loss/nenkova-2004-pyramid-content-units.md`, `G-precision-without-loss/min-2023-factscore-atomic-facts.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, `A-pragmatics/grice-1975-logic-conversation.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`
**Counterexample:** Thomas & Turner, "clarity everywhere is not accuracy everywhere": qualifications "of no consequence to the main issue" may be dropped even though each is a distinct atomic fact (`E-style-rhetoric/thomas-turner-1994-classic-prose.md`). F1@K also weights every fact equally, so a trivial fact can crowd out an important one (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, limits). Fact counts also depend on how the text is split (Wanner et al., cited in `min-2023`).
**Guard:** Weight units by whether they change the user's decision or action, not by count.

### R3. Necessary-condition test on qualifiers
**Rule:** When trimming, delete only words that do not narrow the claim: categorizers ("a type of"), evaluative adjectives, hedges on a claim that is already generic, and example lists that one cover term can replace. Never delete a qualifier that works as a necessary condition (version, scope, condition, exception), because the claim then becomes broader than the truth.
**Kind:** C, Pad
**Sources:** `G-precision-without-loss/iso-tc37-2022-iso704-substitution-principle.md`, `G-precision-without-loss/seppala-2017-definition-writing-guidelines.md`, `A-pragmatics/grice-1975-logic-conversation.md`, `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`
**Counterexample:** Seppälä keeps a negation when it is the very feature that separates two siblings (paracentric vs pericentric inversion), even though "say what it is not" is otherwise on the cut list. Juba et al. warn in the other direction against *adding* qualifiers the plain wording already implies (`B-information-theory/juba-2011-compression-without-common-prior.md`).
**Guard:** The test is whether the claim's extension changes, not whether the word "looks like" filler.

### R4. Shorten without changing the claim
**Rule:** After any concision pass, check that modality, causality, negation and scope survive. "May help" must not become "achieves". A correlation must not become a cause. If the shorter wording changes the claim, keep the longer one.
**Kind:** C
**Sources:** `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`, `A-pragmatics/grice-1975-logic-conversation.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`
**Counterexample:** Sometimes the original is the wrong claim. Its hedge was a tic, not real uncertainty (`E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`), and a faithful-preservation rule would keep the miscalibration (see R26).
**Guard:** Preserve the *intended* claim. A calibration rule may change modality on purpose.

---

## B. Term choice

### R5. Most specific true term
**Rule:** Among the terms that are true of the thing, use the one that fits the fewest competing readings in the user's context: the exact error name, the path, the function, the strongest supported scalar word ("all", "fixed"). Never use a superordinate ("the issue", "a config file") when the specific term is known.
**Kind:** P
**Sources:** `A-pragmatics/wilson-sperber-2004-relevance-theory.md`, `A-pragmatics/frank-goodman-2012-rsa-language-games.md`, `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`, `A-pragmatics/horn-1984-q-r-implicature.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `B-information-theory/shannon-1948-source-channel-redundancy.md`
**Counterexample:** Specificity costs factual precision when the detail is uncertain. "Provide as many specific details as possible" lowered F1@1 (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, App. A.7). A model torn between LA, NYC and Chicago should say "a large US city", not "LA" (`G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`). Over-specifying when there is no competitor is also an error: Degen et al. find speakers prefer the basic level when it suffices (`A-pragmatics/degen-2020-useful-redundancy.md`). Exact figures are read as exhaustive, so "3 tests fail" implies the rest pass (`A-pragmatics/wilson-sperber-2004-relevance-theory.md`).
**Guard:** Most specific *supported* term, at basic level unless a competitor is live.

### R6. A term is lossless only if this reader holds its concept: gloss once, never swap for a vaguer word
**Rule:** Use the exact technical term. If the user's own wording does not show they hold the concept, add a gloss the first time: "a [nearest parent category] that [distinguishing feature]", or one familiar anchor word. Do not replace the term with a vaguer paraphrase, and do not abbreviate a term the user has not used.
**Kind:** P, C
**Sources:** `G-precision-without-loss/cabre-2002-doors-theory-terminology.md`, `G-precision-without-loss/iso-tc37-2022-iso704-substitution-principle.md`, `G-precision-without-loss/seppala-2017-definition-writing-guidelines.md`, `G-precision-without-loss/wuster-1979-terminologielehre-concept-priority.md`, `D-human-factors-ux/chen-kalyuga-sweller-2017-element-interactivity-expertise-reversal.md`, `D-human-factors-ux/sweller-1998-cognitive-architecture-load-types.md`, `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`, `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`, `F-screen-reading/blackmon-2002-cognitive-walkthrough-web.md`, `F-screen-reading/blackmon-2003-repairing-cww.md`
**Counterexample:** For a reader who shows expertise, a gloss is redundant load that they cannot reliably skip ("Redundant information is frequently difficult to ignore", `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`). Blackmon 2003 also reports that paraphrase "only sometimes" fixes unfamiliarity, because a gloss cannot supply missing domain knowledge (`F-screen-reading/blackmon-2003-repairing-cww.md`). For a deep concept, a one-clause gloss is a false sense of precision.
**Guard:** Gloss only when the schema is not shown. If the concept itself is missing, say so and explain it; a gloss will not do.

### R7. Long form first, short form after grounding
**Rule:** Give the full term, the expansion of an acronym, or a description of a non-standard concept at first mention. Switch to the short form, label or pronoun only after it has appeared with that description in this conversation, or after the user has used it.
**Kind:** C
**Sources:** `B-information-theory/mahowald-2013-short-forms-predictive-contexts.md`, `B-information-theory/piantadosi-2011-wordlength.md`, `A-pragmatics/clark-wilkesgibbs-1986-collaborative-reference.md`, `A-pragmatics/clark-haviland-1977-given-new-contract.md`, `B-information-theory/levy-jaeger-2007-uniform-information-density.md`
**Counterexample:** If the user already used the short form ("my CI flakes"), expanding it re-grounds a pact the user set up and is redundant (`A-pragmatics/brennan-clark-1996-conceptual-pacts.md`). Universally standard short forms (URL, CPU, JSON) are more predictable than their expansions. Clark & Haviland also allow the "addition" route: a definite label introduced and defined in place is acceptable.
**Guard:** Count the user's own use, and field-standard status, as grounding.

### R8. One concept, one term, held across the answer
**Rule:** Once a term names a thing, reuse exactly that term every time the thing recurs. Do not rotate synonyms ("cache", "store", "buffer"). Shorten only by dropping modifiers, never by changing the head noun. Do not reuse a word in a second sense within one answer.
**Kind:** P
**Sources:** `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `C-controlled-language/kuhn-2014-pens-controlled-natural-languages.md`, `G-precision-without-loss/wuster-1979-terminologielehre-concept-priority.md`, `G-precision-without-loss/cabre-2002-doors-theory-terminology.md`, `A-pragmatics/brennan-clark-1996-conceptual-pacts.md`, `A-pragmatics/vanrooij-franke-2026-biot-games-horn-division.md`, `C-controlled-language/gibson-1998-dependency-locality.md`, `C-controlled-language/shubert-1995-simplified-english-comprehensibility.md`, `D-human-factors-ux/mcnamara-1996-text-coherence-knowledge.md`
**Counterexample:** Wüster himself admits synonyms that express "a different view of the concept" (Kochsalz by use, Natriumchlorid by composition). Brennan & Clark show a switch is correct when the old term has become wrong, for example when the set gains a competitor. Kuhn rates fully uniform N4 text "clumsy and repetitive". Cushing's AIR prototype planned deliberate synonym variation to fight habituation in repetitive radio traffic (`C-controlled-language/cushing-1994-fatal-words-ambiguity.md`; untested).
**Guard:** Switch only on purpose, mark the switch once ("the old X, now Y"), and then hold the new term.

### R9. Plain form for the plain case; a marked form only for a marked meaning
**Rule:** When a standard short term exists ("can", "use", "fixed", "reliable"), use it for the normal case. Do not use periphrasis, double negatives or modals of ability as softeners. "Not unreliable" is read as less than "reliable", and "was able to fix it" is read as "didn't". Spend extra words only on a non-standard case, and name how it differs.
**Kind:** P, Pad
**Sources:** `A-pragmatics/horn-1984-q-r-implicature.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `A-pragmatics/bergen-levy-goodman-2016-lexical-uncertainty.md`, `A-pragmatics/vanrooij-franke-2026-biot-games-horn-division.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`
**Counterexample:** Many synonym pairs carry no implicature difference (*mare* vs *adult female horse*, Davis 2016, cited in `horn-1984`). Politeness can call for softened form as a social goal, which is modelled separately in RSA (Yoon et al., `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`). The anti-Horn equilibrium is also stable (`vanrooij-franke-2026`), so with a reader used to inflated phrasing, the inference may not fire.
**Guard:** Apply the rule where a lexicalised alternative exists *and* a real marked reading is available.

### R10. Strongest true claim; weaker words implicate negation or ignorance
**Rule:** Use the strongest claim the evidence supports. Readers take "some", "may", "usually", a superordinate term, or a missing expected item to mean the stronger claim is false or the speaker does not know which. If all tests pass, say "all".
**Kind:** P
**Sources:** `A-pragmatics/horn-1984-q-r-implicature.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`, `A-pragmatics/wilson-sperber-2004-relevance-theory.md`, `A-pragmatics/bergen-levy-goodman-2016-lexical-uncertainty.md`
**Counterexample:** Quality outranks Manner and Quantity. When the evidence covers only "some", the strong claim is a lie (`A-pragmatics/grice-1975-logic-conversation.md`). Bott & Noveck 2004 found more literal "true" answers to "some elephants are mammals" under time pressure, so the "not all" inference is not automatic, and a hurried reader may not draw it (`levinson-2000`, counter-evidence).
**Guard:** "Strongest *supported*". When the weaker word is used because the evidence is limited, also say so explicitly (R26).

### R11. Name the distinguisher when a competitor exists; drop qualifiers that imply a false contrast
**Rule:** When two things of the same kind are in play (files, environments, versions), give every mention, including the first, the shortest attribute that tells them apart ("the staging `config.yaml`"). When only one exists, drop contrastive qualifiers ("the *main* issue"), because readers go looking for the alternative.
**Kind:** P, C
**Sources:** `A-pragmatics/engelhardt-2006-maxim-quantity-overdescription.md`, `B-information-theory/ferreira-2005-ambiguity-avoidance.md`, `A-pragmatics/degen-2020-useful-redundancy.md`, `A-pragmatics/frank-goodman-2012-rsa-language-games.md`, `B-information-theory/piantadosi-2012-ambiguity.md`
**Counterexample:** A modifier that is redundant but highly discriminable speeds identification in complex scenes. Redundant colour helps visual search (Rubio-Fernández 2016; Degen 2020), so "drop when unique" fails when the extra feature is the fastest cue. Davies & Katsos 2013 also show that listeners do penalise over-informativeness when the design does not favour it (`engelhardt-2006` forward list). Evidence on both sides is mixed.
**Guard:** Keep a redundant modifier if it is *more precise or more salient* than the head noun (an identifier, path or version). Drop it if it only implies a contrast.

### R12. Overloaded-term pass
**Rule:** Before sending, scan for words with more than one live sense in this context ("model", "key", "token", "session", "build", "test", "branch", "agent"). If two senses appear in one answer, qualify the *first* mention ("API key" vs "dict key").
**Kind:** P
**Sources:** `B-information-theory/ferreira-2005-ambiguity-avoidance.md`, `C-controlled-language/cushing-1994-fatal-words-ambiguity.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`
**Counterexample:** Context resolves almost all communicatively relevant ambiguity. Qualifying senses the user could not plausibly intend is the "wordy or pedantic" failure (`B-information-theory/gibson-2019-efficiency.md`). Harmless ambiguity should be left alone (`B-information-theory/juba-2011-compression-without-common-prior.md`).
**Guard:** Qualify only when both senses are live *in this answer* or the rival readings lead to different actions.

---

## C. Where words go

### R13. Spend words at surprise and at costly-to-misread points; cut predictable scaffolding
**Rule:** Cut what the question or convention already gives: restated questions, generic openers, recaps, "I hope this helps". Spend explicit words on what the user could not guess: the non-default value, the exception, the reversal, the chosen option, a new term. Add redundancy (units, a full identifier, a one-line confirmation) only where a misreading is costly: destructive commands, exact values, negations, irreversible steps.
**Kind:** C, Pad
**Sources:** `B-information-theory/aylett-turk-2004-smooth-signal-redundancy.md`, `B-information-theory/shannon-1951-prediction-entropy-printed-english.md`, `B-information-theory/shannon-1948-source-channel-redundancy.md`, `B-information-theory/piantadosi-2011-wordlength.md`, `B-information-theory/mahowald-2013-short-forms-predictive-contexts.md`, `B-information-theory/meister-2021-revisiting-uid.md`, `C-controlled-language/prinzo-2009-message-length-complexity-readback.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`
**Counterexample:** A predictable structure word ("that", "because", "The catch:") placed before a surprising claim *helps*, because it flattens the spike (`B-information-theory/levy-jaeger-2007-uniform-information-density.md`). Cutting all predictable material therefore fails. Redundancy also fails when nobody checks it: a read-back without hear-back gave false assurance (`C-controlled-language/monan-1986-hearback-problem.md`). Repeating a warning everywhere leads to habituation and reflex cancelling (`C-controlled-language/patterson-1982-auditory-warning-guidelines.md`).
**Guard:** Keep signposts that announce a surprise. Place redundancy once, at the critical item.

### R14. Mark the atypical; leave the default unstated
**Rule:** State properties that differ from what the reader would assume: an unusual flag, a non-standard version, an unusual method, a side effect. Do not restate defaults the reader would infer.
**Kind:** P, Pad
**Sources:** `A-pragmatics/degen-2020-useful-redundancy.md`, `A-pragmatics/horn-1984-q-r-implicature.md`, `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, `A-pragmatics/vanrooij-franke-2026-biot-games-horn-division.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`
**Counterexample:** What counts as "default" depends on the reader's prior. A novice's stereotype differs from an expert's (`vanrooij-franke-2026`, caveat; `B-information-theory/juba-2011-compression-without-common-prior.md`), so an unstated default can be misread. Safety phraseology also states some defaults every time (the runway designator always comes before the clearance, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`).
**Guard:** Judge "default" from the user's evident level. Always state defaults that are safety-critical.

### R15. Do not write reduced text: keep grammatical glue and logical connectives
**Rule:** Never drop articles, subjects, verbs, units or connectives ("because", "so", "unless", "but") to save words. Shorten by splitting into short, complete sentences of about 20 words for instructions and 25 for explanations. When splitting, carry the connective into the next sentence. If a causal link between two facts is missing, add it, even though the answer grows.
**Kind:** C
**Sources:** `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `B-information-theory/shannon-1951-prediction-entropy-printed-english.md`, `B-information-theory/meister-2021-revisiting-uid.md`, `C-controlled-language/wang-2026-ste-eye-tracking-scheduling.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`, `A-pragmatics/wilson-sperber-2004-relevance-theory.md`, `B-information-theory/levy-jaeger-2007-uniform-information-density.md`
**Counterexample:** Small, recurring, high-stakes slots that use a closed vocabulary shared with a trained reader (status lines, verdict tokens, ATC phraseology) work in fixed terse patterns (`C-controlled-language/kuhn-2014-pens-controlled-natural-languages.md`; `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`). Receivers dropping anchor words was harmless 98% of the time (`C-controlled-language/prinzo-2009-message-length-complexity-readback.md`). Krifka et al. warn that banning all ellipsis or pronouns makes text too verbose (`C-controlled-language/cushing-1994-fatal-words-ambiguity.md`).
**Guard:** Terse key-word form is allowed only for closed, shared vocabularies (see R30).

### R16. Name the actor; put the action in the verb
**Rule:** In each sentence that states an action, make the grammatical subject the actor (you, the function, the server) and the main verb the action. Rewrite nominalised noun stacks ("Config validation failure prevention requires schema enforcement"). Supply an implied actor rather than writing "X is required" or "there is a need for Y".
**Kind:** P, C
**Sources:** `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`
**Counterexample:** Williams keeps useful nominalisations: a short backward-linking subject ("This decision ..."), a concept familiar enough to act as a "virtual actor", and ideas that exist only as nouns. The passive keeps the topic in subject position ("Pollen is dispersed by bees" in a paragraph about pollen), and Pinker argues "avoid the passive" is bad advice (`E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`). STE allows the passive when the agent is unknown.
**Guard:** Flag only nominalisations that hide *who does what*. Topic continuity can justify the passive.

### R17. Cut zero-information filler; keep repair and contrast signals
**Rule:** Delete stock phrases ("It is important to note that", "the fact that"), metadiscourse ("In this answer I will"), process, worth and liability hedges ("Let me think", "Great question", blanket disclaimers), verb-plus-noun operators ("make a decision" becomes "decide"), and empty evaluatives ("robust", "seamless").
**Kind:** Pad
**Sources:** `D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`, `E-style-rhetoric/orwell-1946-politics-english-language.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`, `B-information-theory/piantadosi-2011-wordlength.md`, `F-screen-reading/chi-pirolli-2001-information-scent-wufis.md`, `F-screen-reading/pirolli-card-1999-information-foraging.md`, `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`
**Counterexample:** Discourse and repair markers correlated with overhearers' comprehension (r = .73). Explicit "not A but B" or "correction:" signals help readers who were not in the exchange (`A-pragmatics/foxtree-1999-overhearing-monologues-dialogues.md`). Williams uses metadiscourse on purpose to place a new term in stress position ("We term these cells LAK cells"). An announced list ("Three causes:") is metadiscourse that structures the stress positions (`E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`).
**Guard:** Keep markers that signal repair, contrast or announced structure. Cut chatter and self-reference.

### R18. Cut seductive details: test against the user's goal, not against truth
**Rule:** Delete every sentence that is true and interesting but that the user's stated goal does not need: background, history, trivia, related-but-unasked facts. The test is whether the user would do worse at their task without it.
**Kind:** Pad
**Sources:** `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `A-pragmatics/grice-1975-logic-conversation.md`, `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, `F-screen-reading/fu-pirolli-2007-snif-act.md`, `F-screen-reading/pirolli-card-1995-information-foraging.md`
**Counterexample:** Mayer & Fiorella note that "more experienced learners may require a greater amount of detail" (p. 308). Reference or expert-completeness requests have a large K, so trimming to the bare goal is lossy (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`; `E-style-rhetoric/bergman-2026-many-arguments-persuasive-intent.md`). A caveat that the user did not ask for but that changes what they should do is not a seductive detail (`A-pragmatics/grice-1975-logic-conversation.md`, rule 3).
**Guard:** Ask what the goal is, not what the question literally said. Keep anything that changes the user's action.

### R19. Say each thing once; delete prose that echoes a self-sufficient source
**Rule:** If a code block, table, list or earlier sentence already states something completely, do not repeat it in prose. Prose adds only what that source cannot show: why, caveats, the next action. No summary paragraph that duplicates a short answer.
**Kind:** Pad
**Sources:** `D-human-factors-ux/chandler-sweller-1991-split-attention-redundancy-origin.md`, `D-human-factors-ux/kalyuga-1999-redundancy-split-attention.md`, `D-human-factors-ux/sweller-1998-cognitive-architecture-load-types.md`, `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, `G-precision-without-loss/nenkova-2004-pyramid-content-units.md`
**Counterexample:** When neither source is intelligible alone (Chandler & Sweller Exp. 6, numbered labels explained only in text), deleting one is lossy, and the two must be integrated instead. A handoff for a third party must restate content the live user already saw (`A-pragmatics/schober-clark-1989-addressees-overhearers.md`). Chandler & Sweller themselves suggest a separated summary may aid memory, though this is untested (p. 331).
**Guard:** Apply only when the source is intelligible alone *and* the reader is the one who saw it.

### R20. Keep each explanation beside its referent
**Rule:** Put each comment next to the code line, table row, value or step it explains. Do not write "see above" or "as shown in the snippet" with the explanation detached. Define a symbol or label where it is used, not in a later legend.
**Kind:** C
**Sources:** `D-human-factors-ux/chandler-sweller-1991-split-attention-redundancy-origin.md`, `D-human-factors-ux/kalyuga-1999-redundancy-split-attention.md`, `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `D-human-factors-ux/sweller-1998-cognitive-architecture-load-types.md`, `B-information-theory/gibson-2019-efficiency.md`
**Counterexample:** For experts, interleaved glosses hurt and separable ones help (Yeung et al. 1998; Oksa et al. 2010, in `D-human-factors-ux/kalyuga-2003-expertise-reversal.md` and `D-human-factors-ux/chen-kalyuga-sweller-2017-element-interactivity-expertise-reversal.md`). Kalyuga 2003 recommends core answer first and scaffolding in a separate marked block. Spatial contiguity effects are also strongest when sources are unintelligible alone (`mayer-fiorella-2014`).
**Guard:** Keep a *needed* referent adjacent. Optional novice scaffolding may go in a separate block after the core.

---

## D. Packaging and order

### R21. Count load-bearing elements, not words; split beyond about 3-4, and keep every element
**Rule:** An element is any value, direction, condition or instruction the user must hold to act correctly. Put no more than about 3-4 new elements, or 3 distinct actionable topics, in one unsplit sentence or paragraph. Beyond that, split into numbered steps with one action each, and never drop an element to meet the cap.
**Kind:** C
**Sources:** `C-controlled-language/cardosi-1993-en-route-readback-complexity.md`, `C-controlled-language/prinzo-2009-message-length-complexity-readback.md`, `C-controlled-language/morrow-1993-message-length-timing.md`, `C-controlled-language/monan-1986-hearback-problem.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `C-controlled-language/gibson-1998-dependency-locality.md`
**Counterexample:** Cardosi's cap applies to *unexpected* messages. "Different results would be expected when pilots are prepared for a longer transmission", so a requested procedure can be long. The data-link arm of Morrow & Rodvold showed no excess problems for long messages in a persistent visual medium, which is closer to chat. Splitting into close-together short units caused delayed digit-intrusion errors. Shubert's SE gain appeared only for the complex procedure, so a simple answer gains nothing from step formatting (`C-controlled-language/shubert-1995-simplified-english-comprehensibility.md`).
**Guard:** Enforce the cap strictly on unrequested or inline side information. For requested procedures, cap elements per step rather than per answer.

### R22. Separate look-alike values; label every number with unit or role
**Rule:** In a sentence with two or more values, attach the unit or role to each ("timeout 30 s, retries 3"). Put similar values (ports, versions, paths, flags) on separate labelled lines or in a code block. Give identifiers in full and verbatim, never as private abbreviations.
**Kind:** P, C
**Sources:** `C-controlled-language/morrow-1993-message-length-timing.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`, `C-controlled-language/cushing-1994-fatal-words-ambiguity.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`, `C-controlled-language/prinzo-2009-message-length-complexity-readback.md`
**Counterexample:** In a table whose header already names the unit or role, per-cell labels are redundant echoes of a self-sufficient source (`D-human-factors-ux/chandler-sweller-1991-split-attention-redundancy-origin.md`).
**Guard:** Label once per value or once per column, whichever the format makes visible.

### R23. Answer first; each unit opens with its claim
**Rule:** The first sentence answers the question most directly. Each paragraph, bullet and section starts with its main point in exact terms. Never open with preamble, a restated question or generic caveats. Order the remaining content by yield, so a reader who stops early has the best material.
**Kind:** P, Pad
**Sources:** `D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`, `F-screen-reading/nielsen-2006-f-pattern.md`, `F-screen-reading/fu-pirolli-2007-snif-act.md`, `F-screen-reading/pirolli-card-1995-information-foraging.md`, `F-screen-reading/duggan-payne-2011-skim-satisficing.md`, `G-precision-without-loss/min-2023-factscore-atomic-facts.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`
**Counterexample:** A condition that reverses the instruction must come before it ("If the migration fails, run X", STE 5.4; the runway designator before the clearance, CAP 413 4.17). An uncertain answer should lead with its status ("Probably yes, but sources conflict", `E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`). A departure from what the user asked for goes in the first line (`C-controlled-language/monan-1986-hearback-problem.md`). Duggan & Payne caution against front-loading *everything*: readers who stay keep reading, so needed detail should not be cut just to front-load.
**Guard:** First comes the answer, *or* the one item that changes how the answer must be read.

### R24. Old to new within a sentence; payload last; one topic string per paragraph
**Rule:** After the first sentence, open each sentence with something the user already has (their term, the question's subject, the previous sentence's last new item). End on the new fact, number or recommendation. Never end on a hedge, a source tag or metadiscourse. Keep one entity as subject across a descriptive paragraph, or chain each sentence's end into the next sentence's start for causal or step sequences.
**Kind:** P
**Sources:** `A-pragmatics/clark-haviland-1977-given-new-contract.md`, `E-style-rhetoric/vandekopple-1980-fsp-given-new-experiments.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `C-controlled-language/gibson-1998-dependency-locality.md`, `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`
**Counterexample:** Gopen & Swan: "Slavish adherence to them will succeed no better than has slavish adherence to avoiding split infinitives". Warnings put the signal word first (STE 7.1), instructions put the condition and then the imperative verb first (STE 5.3-5.4), and in each case the new information comes early by design. Wang & Friginal advise putting the key point first and the qualifiers after it in long sentences (`C-controlled-language/wang-2026-ste-eye-tracking-scheduling.md`), which conflicts with payload-last for a long sentence.
**Guard:** This applies to declarative explanation. Instructions and warnings follow their own templates. Long sentences should be split rather than end-loaded.

### R25. Keep dependents adjacent; heavy last
**Rule:** Allow at most one new entity (noun phrase or clause) between a subject and its verb, or between a verb and its required complement. Move long modifiers after the head or into their own sentence. Extrapose clausal subjects ("It fails when X ...", not "That X ... causes failure"). Noun stacks have at most three words.
**Kind:** P
**Sources:** `C-controlled-language/gibson-1998-dependency-locality.md`, `B-information-theory/gibson-2019-efficiency.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`, `E-style-rhetoric/strunk-1918-elements-of-style.md`, `C-controlled-language/asd-2025-ste100-simplified-technical-english.md`
**Counterexample:** Intervening material that refers to things already in the discourse ("I", "you", a defined term) adds almost no cost (Gibson 1998, Fig. 2), so a word-distance count over-flags it. The DLT evidence comes from constructed sentences in self-paced reading, not whole answers, lists or code. Surprisal accounts predict some anti-locality effects (Levy 2008, Demberg & Keller 2008, cited in `gibson-1998`).
**Guard:** Count *new* referents, not words.

### R26. Hedge only real uncertainty, name where it lies, and prefer the tightest unhedged coarser claim
**Rule:**
- Attach a confidence marker only to claims whose confidence is materially lower than the rest, and name its source (conflicting sources, missing data, a limit of the model).
- For an uncertain direct answer, put the status on the first clause, before any rationale.
- When torn between specific alternatives, state the most specific claim true of all of them ("a West Coast port"), or name the few alternatives. Do not pick one and add "possibly".
- Never hedge every answer by default, and never decorate with confident first-person framing ("Obviously", "I'm confident") that the evidence does not support.

**Kind:** P, Pad
**Sources:** `E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`, `E-style-rhetoric/steyvers-2025-calibration-gap.md`, `G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`, `G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, `E-style-rhetoric/thomas-turner-1994-classic-prose.md`, `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`, `A-pragmatics/bergen-levy-goodman-2016-lexical-uncertainty.md`, `A-pragmatics/goodman-frank-2016-rsa-probabilistic-inference.md`
**Counterexample:**
- Hedging a *correct* answer lowered user accuracy by up to 11.7 points (`kim-2024`), so a calibrated hedge still has a cost when the model's internal confidence is itself miscalibrated.
- Backing off can become vacuous: "is a positive integer" and "is uncertain or not specifically known" (`jiang-2025`, App. D). When the user must make a specific decision, a coarse true claim may be useless. Naming the alternatives with rough odds serves them better.
- Lee et al. 2024 (cited in `jiang-2025`) find hedges break LLM judges downstream, a different audience with different needs.

**Guard:** A generalisation must rule out a plausible wrong answer. Otherwise, say plainly what is unknown.

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
- Use a definite reference ("the fix", "this function", an acronym, a codename) only when the user has seen exactly one antecedent for it, either in their messages or earlier in the visible answer. Otherwise name it in full.
- Tool output, files the assistant read, and its private reasoning do not count as given.
- Prefer content-based names to procedural handles ("the second option above").

**Kind:** C
**Sources:** `A-pragmatics/clark-haviland-1977-given-new-contract.md`, `A-pragmatics/clark-wilkesgibbs-1986-collaborative-reference.md`, `B-information-theory/piantadosi-2012-ambiguity.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`, `B-information-theory/aylett-turk-2004-smooth-signal-redundancy.md`, `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`, `D-human-factors-ux/mcnamara-1996-text-coherence-knowledge.md`, `E-style-rhetoric/vandekopple-1980-fsp-given-new-experiments.md`
**Counterexample:**
- Bridging by stereotype works: "the beer was warm" after "we checked the picnic supplies" is understood, at a cost of about 180 ms (`clark-haviland-1977`). Under Levinson's I-heuristic, spelling out such antecedents is redundant.
- Clark & Haviland's "addition" route (a definite label introduced and defined in place) is legitimate.
- For a reader who just watched the output scroll by (a shared terminal, a pasted log), that output *is* given.

**Guard:** The test is whether the user can compute a unique antecedent. Bridging to a stereotype is acceptable; bridging to the assistant's private state is not.

### R29. Re-expand session labels for any reader outside the exchange, and keep the rejected alternative
**Rule:**
- Text that leaves the live dialogue (a summary, handoff, PR or commit description, subagent report, or anything to be forwarded) must restate every session-coined label in full on first use, in standard terms ("option B (move the cache to Redis)").
- Where a term was settled by clarification, add one clause naming the reading it was distinguished from.
- Answer inline the one question the reader would ask if they could.
- Scale explicitness to how broad the audience is.

**Kind:** C
**Sources:** `A-pragmatics/schober-clark-1989-addressees-overhearers.md`, `A-pragmatics/clark-wilkesgibbs-1986-collaborative-reference.md`, `A-pragmatics/brennan-clark-1996-conceptual-pacts.md`, `A-pragmatics/foxtree-1999-overhearing-monologues-dialogues.md`, `B-information-theory/juba-2011-compression-without-common-prior.md`
**Counterexample:**
- Inside the live dialogue with the same user, re-expansion is redundant: the pact is precise there (`brennan-clark-1996`; `schober-clark-1989`, last bullet).
- A third-party reader who shares the domain's standard vocabulary needs only the session-coined labels expanded, not the field-standard terms. Expanding those would be an expertise-reversal cost (`D-human-factors-ux/kalyuga-2003-expertise-reversal.md`).
- More time or slower text does not help an overhearer (the pause button had no effect). Re-expansion that only adds words without adding the referent fails.

**Guard:** Expand *session-local* labels only, and add content, not length.

### R30. Key-word form only for closed, shared vocabularies
**Rule:** Use terse key-word labels (status words, single-term verdicts, severity tags) only when the term comes from a small set the user already shares. Keep that set small (about seven at most) and make its members differ in form. For anything open-ended or new, write a full sentence. Key words are not understood any faster than an equivalent phrase.
**Kind:** C
**Sources:** `C-controlled-language/patterson-1982-auditory-warning-guidelines.md`, `C-controlled-language/kuhn-2014-pens-controlled-natural-languages.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`
**Counterexample:** On a screen read in efficiency mode, a short bold label at the left edge is what the F-pattern reader actually sees (`F-screen-reading/nielsen-2006-f-pattern.md`). A key word plus a full sentence can beat the sentence alone, and Mayer & Johnson found a key word next to the graphic improved retention (`D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`).
**Guard:** A key word may *lead* a full sentence. It must not *replace* one for open content.

### R31. Calibrate depth from the user's first move, re-estimate every turn, and fall back to full steps on a weak signal
**Rule:**
- Estimate the user's level from how far into the problem their message starts: the steps already done and the most specific correct term used. Message length is not the signal.
- Leave out the steps they have shown they have.
- With no step shown (vague phrasing, a misused term, "don't know"), give the complete path.
- If a follow-up asks about a skipped step, return to fuller guidance.
- For a user who shows expertise, give steps or results without the reason for each step. Offer reasons on request, or for the one non-obvious step.

**Kind:** P, C
**Sources:** `D-human-factors-ux/kalyuga-sweller-2004-rapid-first-step-diagnostic.md`, `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`, `D-human-factors-ux/chen-kalyuga-sweller-2017-element-interactivity-expertise-reversal.md`, `D-human-factors-ux/mcnamara-1996-text-coherence-knowledge.md`, `B-information-theory/meister-2021-revisiting-uid.md`, `C-controlled-language/wang-2026-ste-eye-tracking-scheduling.md`
**Counterexample:**
- The first-step diagnostic was validated only in well-structured domains (algebra, geometry). The authors say it is untested for "less well-structured domains such as text comprehension", which covers most chat.
- A missing causal link is an error for experts too: Gopen & Swan's revisions *added* links for expert readers (curse of knowledge, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`).
- McNamara's referential cohesion should be kept for every reader.
- Signaling showed no expertise reversal (`D-human-factors-ux/schneider-2018-signaling-meta-analysis.md`), so structure should not be stripped for experts.

**Guard:** Expertise removes *explanatory* bridges and per-step reasons. It does not remove referential precision, logical connectives or structure.

### R32. Two-question gate before elaborating
**Rule:** Add explanation only if (a) the answer requires several related ideas to be held together *and* (b) the user has not shown they hold the concept. If either is false, give the precise answer without scaffolding. A factual lookup never needs a tutorial.
**Kind:** Pad
**Sources:** `D-human-factors-ux/chen-kalyuga-sweller-2017-element-interactivity-expertise-reversal.md`, `D-human-factors-ux/sweller-1998-cognitive-architecture-load-types.md`, `D-human-factors-ux/kalyuga-2003-expertise-reversal.md`
**Counterexample:** A low-interactivity fact can still carry a safety-relevant condition that is not "elaboration" but a necessary qualifier: the port is 5432 *unless* it was changed in `postgresql.conf` (`G-precision-without-loss/seppala-2017-definition-writing-guidelines.md`, necessary conditions). Under F1@K, a lookup whose scope calls for several facts is thin if answered with one (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`).
**Guard:** The gate blocks *scaffolding*. It never blocks necessary conditions.

---

## F. Labels, emphasis, acknowledgement

### R33. Labels carry discriminating, goal-matched words and predict their content
**Rule:**
- Every heading, bullet stem and bold lead-in contains at least one specific term from the user's goal: an identifier, the named concept, a number.
- Sibling labels must differ by content words. Drop words shared across siblings ("Overview", "Details", "Notes", "Option 2").
- A label must predict exactly what follows. Rename it when the content is narrower.
- Do not start consecutive bullets with the same words.
- Mirror the user's latest specific terms, unless their term is wrong. In that case, name both once.

**Kind:** P
**Sources:** `F-screen-reading/chi-pirolli-2001-information-scent-wufis.md`, `F-screen-reading/blackmon-2002-cognitive-walkthrough-web.md`, `F-screen-reading/blackmon-2003-repairing-cww.md`, `F-screen-reading/fu-pirolli-2007-snif-act.md`, `F-screen-reading/pirolli-card-1999-information-foraging.md`, `F-screen-reading/nielsen-2006-f-pattern.md`, `D-human-factors-ux/schneider-2018-signaling-meta-analysis.md`
**Counterexample:**
- An exact but unfamiliar label fails: "Paleontology" had the lowest success, so a discriminating word alone is not enough and needs a familiar anchor (`blackmon-2003`).
- LSA and TF.IDF overestimate similarity when surface words overlap but meanings differ, so lexical overlap with the user's goal can produce a misleading label (`blackmon-2002`, expert blind spot).
- Mirroring the user's term propagates their error when the term is wrong.

**Guard:** Discriminating *and* familiar to this reader. Correct a wrong user term once, explicitly.

### R34. Signal structure sparingly; match emphasis to priority
**Rule:**
- For multi-part answers, open with one sentence naming the parts and give each part a short label.
- Bold only the one or two load-bearing terms per section.
- Use warning formatting only for items whose miss would cause harm. If more than one or two items qualify, downgrade the rest.
- State each caveat once, where it applies. Escalate only if later turns show it was missed.
- Short or single-point answers get no headings and no bold.

**Kind:** Pad, P
**Sources:** `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, `D-human-factors-ux/schneider-2018-signaling-meta-analysis.md`, `C-controlled-language/patterson-1982-auditory-warning-guidelines.md`, `F-screen-reading/nielsen-2006-f-pattern.md`, `D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`, `E-style-rhetoric/gopen-swan-1990-science-scientific-writing.md`
**Counterexample:**
- Neither meta-analysis gives a dose-response curve for bold density. Schneider's data do not support "one or two" specifically, so that number is a design choice (`schneider-2018`, Relevance).
- An unformatted wall of text pushes readers into the F-pattern, where they "miss meaningful information without realizing it" (`nielsen-2006`). Under-signaling a long answer is also a failure.
- Signaling helped low-skill but not high-skill readers in Naumann et al. (in `mayer-fiorella-2014`), but showed no reversal in `schneider-2018`. The evidence conflicts.

**Guard:** Signal by answer length and structure, not by reader expertise. The density caps are heuristics to be verified.

### R35. Checkable acknowledgements; named referents for status words; offer vs report kept distinct; reserved words
**Rule:**
- Before acting on a multi-part, numeric or irreversible instruction, restate its load-bearing values (numbers with units, names, scope). Never use a bare "Got it" or "OK" as the only confirmation.
- Never answer "Done", "Fixed" or "Yes" without naming *what* when more than one thing is in play.
- Use completion verbs ("deleted", "pushed", "deployed") only for actions that actually happened. Mark offers and plans explicitly ("I can ...", "Next I would ...").
- Reserve high-consequence words for their literal action.
- Do not read silence as approval for an irreversible step.
- When the answer departs from what the user asked for or expects, say so in the first line.

**Kind:** P, C
**Sources:** `C-controlled-language/monan-1986-hearback-problem.md`, `C-controlled-language/cushing-1994-fatal-words-ambiguity.md`, `C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`, `C-controlled-language/grayson-1981-asrs-information-transfer.md`, `C-controlled-language/cardosi-1993-en-route-readback-complexity.md`
**Counterexample:**
- CAP 413 allows ROGER or WILCO for a "short, clear and unambiguous" instruction "for the sake of brevity", and calls unnecessary retransmission "one of the most common faults". Restating a trivially clear single-step request is padding, and it presents given information as new (`A-pragmatics/clark-haviland-1977-given-new-contract.md`, rule 3).
- Cushing warns that expectation-marking words ("anticipate", "expect") can themselves prime mishearing.
- Flagging every minor departure leads to habituation (`C-controlled-language/patterson-1982-auditory-warning-guidelines.md`).

**Guard:** Restate only load-bearing values, and only for multi-part, numeric or irreversible actions. Flag only departures that change what the user will do.

---

## G. Evaluation and meta-rules

### R36. Evaluate style by comprehension and calibration, not by preference
**Rule:** When testing harness variants, measure whether a reader (especially one outside the exchange) can act correctly, and whether their confidence tracks correctness. Do not rely on preference ratings or thumbs-up, which favour length and do not penalise padding.
**Kind:** meta
**Sources:** `A-pragmatics/foxtree-1999-overhearing-monologues-dialogues.md`, `A-pragmatics/engelhardt-2006-maxim-quantity-overdescription.md`, `A-pragmatics/schober-clark-1989-addressees-overhearers.md`, `E-style-rhetoric/steyvers-2025-calibration-gap.md`, `E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`, `E-style-rhetoric/petty-cacioppo-1984-argument-quantity-peripheral-cue.md`
**Counterexample:** Wei et al. found F1@64 correlated with Chatbot Arena preference (r = .754, 9 models), so preference is not useless as a proxy (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`). Morkes & Nielsen's usability score included satisfaction, and it moved with the objective measures (`D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`).
**Guard:** Use preference as a secondary signal. Pair it with a comprehension or discrimination test.

### R37. Target structure and term choice, not more deletion
**Rule:** The harness should push the model to *add* the actor, the exact term, the connective, the label and the distinguisher, and to keep a topic string. It should not mainly press for further generic shortening, because default LLM concision already deletes well and fails in exactly the compression direction.
**Kind:** meta
**Sources:** `E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`, `E-style-rhetoric/williams-1981-style-clarity-grace.md`, `B-information-theory/mahowald-2013-short-forms-predictive-contexts.md`, `E-style-rhetoric/steyvers-2025-calibration-gap.md`, `G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`
**Counterexample:** Steyvers found default explanations of a median 115 words, which inflate confidence. So current models also *over*-produce rationale, and deletion pressure on rationale specifically is still warranted (`steyvers-2025`). Eisenhart's evidence comes from ChatGPT 3.5, one rater and qualitative judgements, so it may not hold for current models.
**Guard:** Add pressure on structure and terms. Delete pressure only on rationale padding and filler (R17, R27).

---

## Cross-rule tensions to resolve in the verification phase

1. **R23 vs R24:** answer-first vs payload-last. The working resolution is that one governs sentence order and the other within-sentence position. Test it on single-sentence answers.
2. **R20 vs R31:** inline gloss (contiguity) vs separate scaffolding (expertise reversal).
3. **R8 vs R29:** hold the term vs re-expand for a new reader.
4. **R13 vs R35:** cut predictable material vs restate load-bearing values.
5. **R5 vs R26:** most specific term vs tightest *defensible* level.
6. **R17 vs Fox Tree:** cut markers vs keep repair markers.
7. **R21 vs R25:** split long units vs Morrow's interference between close short units.

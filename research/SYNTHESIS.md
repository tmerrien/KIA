# Synthesis: precise, high-density answers without loss

Topic: how an AI assistant should phrase answers so they are concise and high in information density.

- **Precision** means choosing the exact term or structure that carries the whole idea for this reader.
- **Compression** means dropping meaning to save words.

The crawl's verdict is that every school of thought it covered defines efficiency as communication that succeeds under a cost constraint, not as shortness (`_findings.md` T1). This document gives the final principles, the rules the verification refuted, and draft changes to the `precise` plugin.

**Inputs.** 113 notes in tracks A-G, `_findings.md` (T1-T20), `_map.md`, `_rules.md` (R1-R61), and `_rules_verified.md`. The verification file holds 15 bundled candidate rules, each challenged under three lenses: L1 attribution, L2 counterevidence and L3 application. A rule was KEPT if at least two lenses failed to refute it. That left 5 KEPT and 10 REFUTED.

**Conventions.**
- Note paths are relative to `/home/user/KIA/research/`.
- "L2 revised" means the revised wording offered by lens 2 for that rule in `_rules_verified.md`.
- **UNVERIFIED** tags a claim that its own note marks as unchecked against the primary source, or that rests only on an abstract, a secondary source or memory.
- Evidence grades follow `_findings.md`: E is an experiment read in full, E\* is an experiment known from its abstract or a secondary source only, H is a heuristic or codified practice, and T is theory.

---

## 1. Principles

There are 14 principles.
- **P1-P5** are built on the 5 KEPT rules, using the lens-revised wording.
- **P6-P14** are salvaged from refuted rules. Each one keeps only the core that the lens reasoning explicitly says holds. The clauses that caused the refutation are dropped.

### P1. Cut only what this reader can cheaply rebuild (KEPT R1)

**Statement.** Delete a word, clause or sentence only if *this* reader can cheaply rebuild its content from what they have actually seen or from defaults they hold. Recoverability permits a cut but never requires one.

Wording merged from the L1, L2 and L3 revisions:
- **Measure against the reader's memory.** Recovery is judged against the reader's lossy memory, not the model's context. Recovering by scrolling back or re-deriving counts as a cost.
- **Lean toward less.** When expertise is unclear, assume the reader recovers less than you think.
- **Keep live distinctions.** Keep a word whose loss would merge two meanings the reader could plausibly be weighing, or would silently change scope (population, unit, negation, condition).
- **Restate at costly points.** Restate the critical parameters where a misreading is costly: destructive commands, exact values, negations, targets.
- **Keep precise backups.** Keep a recoverable item that is more precise than the reference it backs up, such as a path next to "the file".
- **Write forwarded text for strangers.** If the text will be forwarded, judge recoverability for a reader who never saw the conversation.

**Evidence.**
- A reduced text is lossless only for an "identical twin" predictor (`B-information-theory/shannon-1951-prediction-entropy-printed-english.md`).
- Omission is efficient only for what the shared context carries, H[M|C] (`B-information-theory/piantadosi-2012-ambiguity.md`).
- Without a common prior, codes tuned to the speaker are brittle (`B-information-theory/juba-2011-compression-without-common-prior.md`).
- Efficiency includes success, not just low cost (`B-information-theory/gibson-2019-efficiency.md`).
- The reader's memory is lossy where the model's context is not (`B-information-theory/verma-2023-revisiting-entropy-rate-constancy.md`). That clause is the note author's inference from Futrell et al.
- Omission is allowed only "provided that no confusion or ambiguity may result", and read-back scales with the cost of a misunderstanding (`C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`, paras 2.68 and 3.3-3.5).
- A redundant modifier helps when it is more precise than the head noun (`A-pragmatics/degen-2020-useful-redundancy.md`).
- Writers overestimate what readers can recover (`D-human-factors-ux/hinds-1999-curse-of-expertise.md`, UNVERIFIED: E\*, Hinds known via secondary reading).

**Where it fails.**
- It is a deletion test, not a whole policy. It says nothing about where to add redundancy (see P12).
- "Domain defaults" breaks for novices. An expert's default (skipping an algebra step, assuming "adult" scope) is not a novice's (L3).
- "Recoverable" is a writer's judgement, and writers make it badly. The Hinds evidence is UNVERIFIED (E\*).
- Ferreira's evidence that lexical ambiguity settled by context can stay reaches the rule only second-hand (`B-information-theory/ferreira-2005-ambiguity-avoidance.md`, primary not read).
- The Wüster and Kuhn notes give only loose support (`G-precision-without-loss/wuster-1979-terminologielehre-concept-priority.md`, all quotations UNVERIFIED).

### P2. Trimming must not change the claim's truth conditions, stated confidence or stated source (KEPT R3 + R4 + R57)

**Statement.** Test every cut by asking whether it changes the claim's truth conditions, its stated confidence or its stated source. If it does, keep the words.

Wording from the L3 revision, with L1 and L2 tightening:
- **Free to delete:** categorizers ("a type of"), reflexive hedges spread uniformly across sentences, evaluative words that are not part of what is asserted, and example lists that one cover term replaces.
- **Kept as content:**
  - scope qualifiers (version, platform, condition, exception);
  - quantifiers and frequency words ("usually", "most");
  - rounders ("about");
  - negations that separate a concept from its sibling;
  - shields that mark real commitment or source ("I suspect", "according to the 2023 label").
- **Removing a qualifier is a deliberate correction.** Do it only after checking that the unqualified claim is true, or after the user has ratified the term ("sort of X" can go once agreed).
- **Check after every concision pass.** Modality (epistemic and root), causality, negation, scope and attribution must survive: "may help" must not become "achieves", and a correlation must not become a cause.

**Evidence.**
- A definition must substitute for its term without loss, and dropping an essential characteristic changes the extension (`G-precision-without-loss/iso-tc37-2022-iso704-substitution-principle.md`, substitution wording via a third-party excerpt, UNVERIFIED for the 2022 text).
- Deleting "usually" is a content change that needs a reason (`G-precision-without-loss/iso-tc37-2011-iso10241-1-one-term-one-concept.md`, preview only).
- The necessary-condition test and the safe deletion classes come from `G-precision-without-loss/seppala-2017-definition-writing-guidelines.md`.
- Approximators change the proposition while shields change commitment. 39% of ICU self-repairs *added* a hedge (`E-style-rhetoric/prince-frader-bosk-1982-hedging-approximators-shields.md`).
- An LLM's "concise" rewrite drifted in meaning, from "importance of X in achieving" to "X achieving" (`E-style-rhetoric/eisenhart-2026-llm-style-pedagogy.md`, single rater).
- Quality outranks Manner (`A-pragmatics/grice-1975-logic-conversation.md`).
- A claim includes all its necessary modifiers (`G-precision-without-loss/song-2024-veriscore-verifiable-claims.md`).

**Where it fails.**
- The original wording put "usually" on a never-delete list. That contradicted its own guard and the ISO precedent, which deletes "usually" deliberately.
- The extension test alone would let shields be cut, so the confidence and source tests are required (L3).
- Faithfully preserving a miscalibrated hedge preserves the miscalibration. The target is the calibrated claim, not the original wording (L2; `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`).
- Skelton's objection that the approximator/shield split holds "only in the abstract" is UNVERIFIED.
- ISO and Seppälä concern definitions. Applying their extension test to answer prose is an analogy.

### P3. One concept, one term, held across the answer (KEPT R8)

**Statement.** Once a noun names a thing, keep naming it with exactly that noun. Do not rotate synonyms ("cache"/"store"/"buffer"), and do not use one word in two senses.

Wording merged from the L1, L2 and L3 revisions:
- **Shorter references.** A pronoun, a modifier-trimmed name or an abbreviation defined at first use is fine while exactly one antecedent is salient.
- **When a second thing of the same kind appears,** lengthen both names with a distinguishing modifier.
- **Fixed strings stay verbatim:** code identifiers, defined legal or clinical terms, and the user's quoted words.
- **When code forces one word into two senses** (dict "key" vs API key), qualify every use.
- **Prefer the user's term.** If the standard term differs, map it once ("myocardial infarction, i.e. the heart attack you mentioned") and then hold one term.
- **Switch only on purpose.** Valid reasons: the old term became wrong or ambiguous, a different aspect is meant, or the register changes. Mark the switch once.
- **Run two passes.** Check concise and consistent as separate passes.

**Evidence.**
- STE rules 1.3, 1.11 and 9.4 (`C-controlled-language/asd-2025-ste100-simplified-technical-english.md`).
- ISO 10241-1 clauses 4.1.1 and 4.2, "used consistently" (`G-precision-without-loss/iso-tc37-2011-iso10241-1-one-term-one-concept.md`).
- Pacts persist, and a synonym switch signals a new perspective (`A-pragmatics/brennan-clark-1996-conceptual-pacts.md`).
- Readers infer two meanings from two near-synonyms (`A-pragmatics/tessler-franke-2018-not-unreasonable-negated-antonyms.md`).
- An epithet swap reads as a new person (`A-pragmatics/clark-1975-bridging-shortest-bridge.md`).
- A new synonym counts as a new discourse referent (`C-controlled-language/gibson-1998-dependency-locality.md`).
- Elegant variation is rejected (`E-style-rhetoric/mensh-kording-2017-ten-rules-structuring-papers.md`).
- **The LLM-specific evidence is the strongest.** Models shorten by *substitution*, and only an explicit reuse-and-freeze instruction made them converge (`A-pragmatics/hua-artzi-2024-talk-less-conventions.md`).

**Where it fails.**
- A literal "reuse exactly that term every time" forbids pronouns. That triggers the Repeated Name Penalty (Gordon, Grosz & Gilliom 1993, L2 background knowledge, not a corpus note, UNVERIFIED here).
- Uniform text can read as "clumsy and repetitive" (`C-controlled-language/kuhn-2014-pens-controlled-natural-languages.md`). That is a naturalness rating, not a comprehension result.
- "Shorten only by deleting modifiers" is the Brennan-Clark note's own derived advice. Their data show falls back to a basic-level head noun 14-55% of the time.
- Wüster's view-synonyms (Kochsalz/Natriumchlorid) need the marked-switch clause (`G-precision-without-loss/koning-2023-relative-univocity-schools.md`).

### P4. Make the strongest claim the evidence supports, scoped to what it covers; mark only real uncertainty, at the claim (KEPT R10 + R26 + R58)

**Statement.** Make the strongest claim the evidence supports and keep its scope to what the evidence covers: say "all 40 tests pass", not "the code is correct". A weaker scalar ("some", "may") implicates that the stronger claim is false or unknown.

Wording merged from the L1, L2 and L3 revisions:
- **Mark only real uncertainty.** Hedge only claims that are materially less certain than the rest, at the claim, preferably as a short first-person marker ("I'm not sure, but...").
- **Lead with status when the answer itself is uncertain.** If the direct answer is uncertain, or every claim is equally uncertain, state that status first.
- **Attribute borrowed claims in the prose.** A citation is not verification.
- **When torn between alternatives,** do one of three things: state the tightest claim true of all of them, name the few candidates, or give a ranked best guess with its reason and next check ("likely X because Y; if not, check Z"). Never append a bare "possibly".
- **Never hedge by default,** and never add unsupported confidence.
- **Guard:** a coarser claim must still rule out a plausible wrong answer. Otherwise, say plainly what is unknown.

**Evidence.**
- The Q-principle (`A-pragmatics/horn-1984-q-r-implicature.md`, second-hand, UNVERIFIED primary; `A-pragmatics/levinson-2000-presumptive-meanings-qim.md`, book not read).
- Hedging correct answers cut user accuracy from 94.8 to 83.1 (impersonal hedge) and from 92.2 to 89.2 (first-person). Hedges on wrong answers raised it. Users opened cited links only 2.7-7.2% of the time (`E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`).
- Confidence-matched uncertainty phrases raised human AUC from about .59 to about .69, and long explanations inflate confidence (`E-style-rhetoric/steyvers-2025-calibration-gap.md`).
- Give the tightest unhedged claim instead of "possibly X", and avoid vacuous back-offs (`G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`, unreviewed preprint, venue UNVERIFIED).
- Specific details lower precision (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md`, App. A.7).

**Where it fails.**
- "Name the source of the doubt" was never tested. Kim's impersonal hedge, the form closest to naming the source, had no significant effect (L1, L2).
- Status-first placement was never varied in Kim. It is a design choice.
- Kim covers yes/no medical questions only, with a system right half the time.
- "Materially less certain than the rest" never fires when everything is shaky, so status-first must cover that case (L3).
- Quantified confidence ("~80%") is not supported unless the number has a real basis. LLM verbal confidence is poorly calibrated (Zhou et al., cited inside the Kim note, UNVERIFIED here).

### P5. Check for ambiguity before sending, and resolve it only where readings diverge (KEPT R12 + R43)

**Statement.** Before sending, scan for two kinds of ambiguity:
- words with two live senses *for this reader* ("model", "key", "token", "session", "build", "branch");
- modifiers, prepositional phrases or pronouns whose attachment the context does not settle.

Qualify the first mention or rewrite, but only when both senses are live and would lead to different understanding or action. Leave harmless ambiguity alone.

When the *request* has two live readings AND they lead to materially different answers or the cost of error is high, do one of three things (L3):
- (a) answer both briefly, labelled, if each answer is short;
- (b) open with a one-clause interpretation ("Taking X to mean the staging config: ...");
- (c) ask one targeted question. Always ask before an irreversible or destructive step.

Never ask clarifying questions or add interpretation clauses by habit.

**Evidence.**
- Speakers miss form-level ambiguity unless they check for it, and the qualifier belongs on the first mention (`B-information-theory/ferreira-2005-ambiguity-avoidance.md`, read via Ferreira 2008, UNVERIFIED primary).
- LLMs did not use context to resolve attachment, 0.06 vs 0.06 (`B-information-theory/cai-2024-llms-resemble-humans-language-use.md`, one comprehension item).
- LLMs make 77.5% fewer grounding acts. Prompting them to ground pushed clarification placement below chance, κ = -1.65 (`A-pragmatics/shaikh-2024-grounding-gaps-llm.md`).
- In non-cotemporal media, other-initiated repair is "very costly" (`A-pragmatics/clark-brennan-1991-grounding-communication.md`).
- Spend words only where a misreading is expensive (`B-information-theory/juba-2011-compression-without-common-prior.md`).
- An unchecked read-back gives false assurance (`C-controlled-language/monan-1986-hearback-problem.md`).
- Targeted clarifying questions help while always-on ones disturb users (Zou et al. 2023, L2 web source, not a corpus note).

**Where it fails.**
- Shaikh's data are social dialogue (support, tutoring, persuasion), so carrying them to technical Q&A is an admitted inference.
- A literal "costly OR divergent" trigger fires on unambiguous high-stakes requests and adds nothing. The trigger needs live ambiguity AND (divergence or high cost) (L3).
- A fixed list of example words invites mechanical qualifying.
- A banned-pronoun reading makes text too verbose (Krifka via `C-controlled-language/cushing-1994-fatal-words-ambiguity.md`, book not read).

### P6. Use the most specific supported term at the basic level; replace catch-alls with the deciding variable (salvaged from refuted R5 + R11 + R38)

**Statement.** Name the referent with the most specific term that is both supported and in the reader's register. Usually that is the basic-level term. Go more specific only when a same-kind competitor is live or the item is atypical.

- **No superordinates or catch-alls** ("the issue", "a config file", "various factors", "check your configuration") once the specific term or the deciding variable is known.
- **Distinguish competitors where it matters.** Mark the first mention, and any mention where the reading could switch, with the shortest distinguishing attribute ("the staging config.yaml"). Do not repeat it on every mention.
- **Use a coarser term when it is right:** the evidence supports nothing finer, the coarse level is the actionable one (triage, orientation), or it rules out a plausible wrong answer.
- **Scope exact figures** ("3 of the 40 tests I ran fail"), because exact numbers read as exhaustive.

**Why salvageable.** All three lenses say the core holds: avoid superordinates and catch-alls, and disambiguate against a live competitor (L1, L2, L3). The refutation came from four clauses:
- a headline ("fewest competing readings") that contradicted the basic-level guard;
- "every mention";
- "coarse only if it excludes a wrong answer";
- no warning about the exhaustive reading of exact scalars.

**Evidence.**
- Size principle (`A-pragmatics/frank-goodman-2012-rsa-language-games.md`).
- Speakers modify on 98% of two-referent trials, and listeners rate under-description worst (2.8 vs 4.35) (`A-pragmatics/engelhardt-2006-maxim-quantity-overdescription.md`).
- Superordinates are used less than 2% of the time and the basic level is preferred (`A-pragmatics/degen-2020-useful-redundancy.md`).
- A listener-reranked speaker scored 81% vs 64% for a literal one, but a pure discriminator is disfluent (`A-pragmatics/andreas-klein-2016-neural-pragmatic-speaker.md`).
- Circumlocution loses precision (`C-controlled-language/kuhn-2016-thing-explainer-circumlocution.md`).
- Soft categories are efficient when some loss is tolerated (`B-information-theory/zaslavsky-2018-information-bottleneck-color-naming.md`).
- Precision depends on register (`G-precision-without-loss/koning-2023-relative-univocity-schools.md`).

**Where it fails.**
- All the empirical sources study reference to objects in visual displays. Applying them to error names and file paths is untested (L1).
- A salient redundant modifier can help even when no competitor exists (Degen). Keep modifiers that carry an atypical property or the speaker's ranking ("the main issue is X; also Y").

### P7. Shorten by restructuring, not by telegraphese; keep a deciding condition with its claim (salvaged from refuted R15 + R41 + R59 + R16 + R25 + R49)

**Statement.** In open prose, keep articles, subjects, verbs, units and any connective whose relation the reader cannot infer by default. Split long sentences into complete ones and carry the connective across the split.

- **Write non-default relations explicitly:** contrast, condition, concession and "no causal link".
- **Actors and verbs.** Make the actor the subject and the action the verb, but rewrite a passive or nominalization only when it hides who does what.
- **Keep dependencies short.** Never center-embed a definition, condition or exception.
- **A condition, exception or warning that decides truth or safety** goes before the claim or in the same sentence: "If X, do Y", or "Warning: Z. Then do Y". It never goes in a later sentence.
- **Terse key-word form** is acceptable only inside closed, shared phraseologies such as status lines.
- **Expertise licenses** dense terminology and fewer obvious links, never nested syntax.

**Why salvageable.** All three lenses keep the no-deletion core and the dependency-locality core (STE 4.2, Williams, Gibson, Martínez). They refute only these clauses:
- "main claim first, then each qualifier in its own sentence", which contradicts STE 5.4 and Duggan-Payne;
- the invented "one new referent" threshold;
- "usually consequence", which is misattributed to Clark 1975;
- the absolute connective ban, which conflicts with Levinson and with the McNamara reverse cohesion effect.

**Evidence.**
- STE Rule 4.2 ("shorter, but not easier to read"), 5.4 (condition first) and the 20/25-word limits (`C-controlled-language/asd-2025-ste100-simplified-technical-english.md`; the standard reports no controlled experiment).
- Telegraphic spikes are costly (`B-information-theory/meister-2021-revisiting-uid.md`).
- Splitting schedules integration rather than removing it (`C-controlled-language/wang-2026-ste-eye-tracking-scheduling.md`, E\*, UNVERIFIED details).
- Center-embedding hurts recall "even for experienced readers" (`C-controlled-language/martinez-2022-poor-writing-legal-language.md`; every effect size there is UNVERIFIED).
- Lawyers show the same legalese penalty as lay readers (`C-controlled-language/martinez-2023-lawyers-legalese-plain-register.md`).
- Cost scales with new referents, not words (`C-controlled-language/gibson-1998-dependency-locality.md`).
- Skimmers read beginnings and miss late caveats (`F-screen-reading/duggan-payne-2009-text-skimming.md`).

**Where it fails.**
- High-knowledge readers learned more from less cohesive text (`D-human-factors-ux/mcnamara-1996-text-coherence-knowledge.md`, abstract only, UNVERIFIED full text). That result is about deep learning, not uptake.
- Inside a closed trained vocabulary, dropped anchor words were harmless 98% of the time (`C-controlled-language/prinzo-2009-message-length-complexity-readback.md`).
- The 20/25-word figures come from a controlled language for non-native maintenance readers.

### P8. Every must-have survives any shortening; curate everything else to the goal (salvaged from refuted R2 + R48 + R27 and R18 + R27 + R39 + R61)

**Statement.** Before shortening, list the units the user needs: facts, conditions, warnings, and steps *with their order and dependencies*. Label each one must-have or optional by whether it changes what the user decides or does.

- **Must-haves stay,** even past the scope the question implies. A dose question still gets the renal contraindication.
- **Cut optional units lowest-impact first.** Delete true but off-goal sentences (background, history, trivia) whole, and do this filtering yourself rather than including material "in case".
- **Keep relational and ordering claims in one clause** with both sides named. "Run the migration before deploying" is one unit.
- **No fixed count of reasons.** Give every strong, distinct reason the goal needs and drop weak or filler ones.
- **Split categories by goal.** For a decision request, split a category only where branches lead to different actions. For a learning request, also keep distinctions the user could confuse.
- **Give detail where it is wanted.** Experts and reference requests get more detail.

**Why salvageable.** For R2, L3 survived outright, and L1 and L2 both state that the core holds ("keep every must-have unit, drop low-priority units first"). For R18, all three lenses state the core holds (cut off-goal material, do not pad). Both bundles failed on these clauses:
- an unconditional "stop at K";
- "no hedges" in the rewording step;
- misattributed weighting (Pyramid and FActScore weights are not decision impact);
- a hard cap of 1-3 reasons, which contradicts Petty & Cacioppo;
- an action-only test for splitting categories.

**Evidence.**
- 37% of ASRS failures were content never sent and 5.5% incomplete, against about 6% garbled (`C-controlled-language/grayson-1981-asrs-information-transfer.md`).
- Coherence held in 23 of 23 tests, d = .86 (`D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`).
- The 80-word summary beat the 600-word lesson (`D-human-factors-ux/mayer-1996-less-is-more-summaries.md`, E\*, full text not read, UNVERIFIED).
- Tier order of content units (`G-precision-without-loss/nenkova-2004-pyramid-content-units.md`), which ignores dependencies between units.
- Relational claims cannot be split (`G-precision-without-loss/song-2024-veriscore-verifiable-claims.md`).
- Under high involvement, 9 strong arguments beat 3, 11.30 vs 8.32, and only weak padding hurt (`E-style-rhetoric/petty-cacioppo-1984-argument-quantity-peripheral-cue.md`). That simple effect is only marginal (p < .10). The interaction is p < .02.
- Qualifications "of no consequence to the main issue" may go (`E-style-rhetoric/thomas-turner-1994-classic-prose.md`, UNVERIFIED primary).

**Where it fails.**
- "Decision impact" is a judgement no metric source supplies.
- Atomic-fact inventories miss the glue between facts that novices need (McNamara).
- Mayer's coherence evidence comes from novices on short lab lessons. Mayer & Fiorella themselves warn that experienced learners may need more detail (p. 308).

### P9. Give verbatim-critical content as exact literals and keep look-alike values apart (salvaged from refuted R21 + R22 + R52 + R42)

**Statement.** Write commands, paths, identifiers, versions, flags and error strings as exact, copyable literals in code formatting, never paraphrased and never as a suffix ("port ...32").

- **Correct a wrong literal once.** If the user's literal is wrong, give the correct one and name the difference once.
- **Separate look-alike values** (ports, versions, paths) on their own labelled lines or in a table, labelled once per value or once per column.
- **Use numbered steps for three or more actions,** one action per step, with each step's condition kept inside it.
- **Never split** a conjunctive condition ("12 months AND 1,250 hours AND 50+ employees") or a cause from its effect.
- **No caps on requested content.** Keep unrequested side information to about three items. Apply no per-sentence element caps to requested on-screen content or to short answers.

**Why salvageable.** L2 and L3 each name a "what survives" core: exact literals, separated look-alike values, steps kept with their conditions, and a cap on side information. The refutation targeted the numeric per-sentence caps, which were measured on spoken ATC transmissions.

**Evidence.**
- "Three one zero" and "two one zero" were swapped unnoticed, and 14% of read-back altimeter settings kept only the last two digits (`C-controlled-language/cardosi-1996-tracon-readback-complexity.md`).
- Several numbers in one clearance get transposed (`C-controlled-language/grayson-1981-asrs-information-transfer.md`).
- Splitting four commands into two messages halved read-back errors, but **the data-link arm tolerated long messages** (`C-controlled-language/morrow-1993-message-length-timing.md`).
- Errors jump after three speech acts (`C-controlled-language/morrow-prinzo-1999-grouped-numbers-message-length.md`).
- Break text between idea units, not inside them (`D-human-factors-ux/castro-alonso-2021-five-strategies-learner-managed-load.md`).
- The verbatim display of critical content is the note author's extrapolation from grounding criteria (`A-pragmatics/clark-brennan-1991-grounding-communication.md`).

**Where it fails.**
- Every capacity number comes from transient voice heard once. A chat answer persists on screen.
- A simple answer gains nothing from step formatting (`C-controlled-language/shubert-1995-simplified-english-comprehensibility.md`, E\*, UNVERIFIED).
- Per-cell labels under a header are redundant (`D-human-factors-ux/chandler-sweller-1991-split-attention-redundancy-origin.md`).

### P10. Private context is not given; spell out session labels in text that leaves the conversation (salvaged from refuted R7 + R28 + R29 + R44)

**Statement.** A label, acronym or reference that only the assistant has seen gets a short description at first mention. This covers its reasoning, files it read but did not show, tool output that was not displayed, and labels it coined.

- **What counts as grounded:** the user's own correct use, field-standard short forms (URL, JSON, CI), and output the user saw displayed.
- **Definite references.** Use "the X" when its antecedent is unique for the user or follows by a short, plausible bridge ("run npm install; the lockfile changed"). Otherwise introduce it.
- **Text that leaves the conversation** (summary, handoff, PR, commit, subagent report) expands session-coined labels into standard terms. Where a label was settled by choosing between readings, add one clause naming the reading it excludes.
- **Re-anchoring.** Re-anchor a far-back term only for a cold reader, or when the user has not used it since and it carries a key point. Never re-expand a term the user is actively using.

**Why salvageable.** L3 survived. L1 and L2 both state that the core holds (Schober & Clark, Fox Tree, Brennan & Clark). They refuted these clauses:
- "necessary part only" for definite references (Clark 1975 allows probable parts);
- "tool output never counts", when the user watched it;
- "keep the rejected alternative" in every outbound text;
- an untriggered re-anchor rule.

**Evidence.**
- Overhearers scored 88% vs 99% for matchers, and 68% for late joiners (`A-pragmatics/schober-clark-1989-addressees-overhearers.md`).
- Pacts are partner-specific (`A-pragmatics/brennan-clark-1996-conceptual-pacts.md`).
- Listeners failed on terse conventions without the history (`A-pragmatics/hua-artzi-2024-talk-less-conventions.md`).
- Seeing the rejected alternative helped overhearers (`A-pragmatics/foxtree-1999-overhearing-monologues-dialogues.md`, n = 8 pairs, correlational).
- Bridging cost is about 180 ms (`A-pragmatics/clark-haviland-1977-given-new-contract.md`).
- The writer's-prior error is repeated across at least 10 notes (`_findings.md` T2).

**Where it fails.**
- The "tool output not given" clause is a design assumption. No note studies tool output.
- The re-anchoring evidence is an inference in the Verma note.

### P11. Gloss an unshown term once and briefly; expertise removes bridges, not precision (salvaged from refuted R6 + R56 + R51 + R31 + R32 + R55)

**Statement.** Use the established term, or an exactly equivalent common word (tenant for lessee).

- **When to gloss.** Gloss only when the answer depends on the term and the user has not shown they hold the concept.
- **How to gloss.** Use one short appositive at first use ("a [nearest parent] that [distinguishing feature]"), in its own clause. Never repeat it, never use a vaguer paraphrase, and never use a trailing glossary.
- **Do not restate the expert's input.** If the user used the term correctly, use it bare and do not paraphrase their precise input. Experts read a paraphrase as a competing claim.
- **High-stakes domains.** In medical, legal and financial answers, correct use of a term is weak evidence. Also say what the term implies for the user's situation.
- **Reading the user's level.** Treat chat cues (how far into the problem they start, the code they show) as weak, untested evidence. Re-estimate every turn.
- **Weak signal.** Keep the gloss to one clause and state the level you assumed. Do not write a tutorial.
- **Forwarded text** is written for the least expert likely reader.
- **What expertise removes:** bridges and per-step reasons. Never referential precision, necessary conditions or structure.

**Why salvageable.** L2 survived. L1 and L3 state that the core holds (fit glosses to evidenced knowledge and drop them for experts). They refuted:
- the absolute "exact technical term", with no common-word swap;
- treating correct use of a term as proof of understanding;
- an untested remedy, "name the conflict in one clause";
- level cues that were never validated for chat.

**Evidence.**
- Line-by-line paraphrase helped novices (d ≈ 1.3-2.0) and hurt experts (load d = 3.02) (`D-human-factors-ux/oksa-kalyuga-chandler-2010-shakespeare-explanatory-notes.md`, thesis read; mapping to the paper inferred, UNVERIFIED).
- Integrated definitions helped weak readers and a trailing glossary hurt them (`D-human-factors-ux/yeung-jin-sweller-1998-inline-vocabulary-definitions.md`, abstract only; every number UNVERIFIED).
- Expertise reversal (`D-human-factors-ux/kalyuga-2003-expertise-reversal.md`).
- The first-step diagnostic correlates at r = .92, but only in algebra and geometry (`D-human-factors-ux/kalyuga-sweller-2004-rapid-first-step-diagnostic.md`).
- Unfamiliar labels were the hardest defect to repair, 75% vs 87% (`F-screen-reading/blackmon-2005-autocww-problem-severity.md`).
- Paraphrase helps "only sometimes" (`F-screen-reading/blackmon-2003-repairing-cww.md`).
- Lessee to tenant helped (`C-controlled-language/martinez-2022-poor-writing-legal-language.md`, UNVERIFIED effect sizes).

**Where it fails.**
- No study tested a single appositive gloss on experts, so the size of any harm is extrapolated.
- A gloss cannot supply missing domain knowledge or fix a concept that conflicts with prior belief (`C-controlled-language/masson-waldron-1994-plain-language-contracts.md`; the stage 3 result is UNVERIFIED).

### P12. Spend words where the reader could not predict the content or a misreading is costly; make checks the user can verify (salvaged from refuted R13 + R14 + R45 + R35)

**Statement.** State what the reader could not guess: non-default values, exceptions, reversals, side effects. Cut generic openers and filler.

- **Defaults.** Leave a default unstated only when the user's level is evident. Always state defaults that are safety-critical or legally required.
- **Redundancy once, at the costly item.** Before a destructive or irreversible step, give the full target identifier and units.
- **Prefer a user-side check.** Ask for a dry-run or for the target name typed back rather than echoing the value. An echo is not a hearback.
- **Completion verbs** only for actions that actually happened. No bare "Done" when more than one thing is in play.
- **Warnings.** Give each warning once, as condition, hazard, action. Give it when its trigger is present *or unknown* and the harm is serious. Omit it only when the user's facts rule the trigger out.

**Why salvageable.** L2 survived. L1 and L3 both say the core has support:
- Horn and Levinson on marking the atypical;
- Aylett-Turk and Levy-Jaeger on spending signal where predictability is low;
- CAP 413 on scaling read-back to cost;
- Bliss and Patterson on reliable warnings.

The refuted clauses were:
- warnings gated only on a "live trigger", which suppresses a contraindication when the trigger is unknown;
- unconditional "cut recaps";
- a read-back that is only the model's own echo (Monan);
- an invented "one sentence" warning template.

**Evidence.**
- Smooth signal redundancy (`B-information-theory/aylett-turk-2004-smooth-signal-redundancy.md`, E\* in part, UNVERIFIED).
- Speakers keep "that" before surprising material (`B-information-theory/levy-jaeger-2007-uniform-information-density.md`).
- Read-back scales with the cost of a misunderstanding, and unnecessary retransmission is a named fault (`C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`).
- 46 deviations followed a bare "Roger" or "Okay" (`C-controlled-language/monan-1986-hearback-problem.md`).
- About 90% of operators matched their response rate to the alarm's reliability (`C-controlled-language/bliss-1995-probability-matching-cry-wolf.md`, abstract only, UNVERIFIED).
- Medical alarms with 85-99% false alarms (`C-controlled-language/edworthy-2013-medical-audible-alarms-review.md`).
- Warning guidelines (`C-controlled-language/patterson-1982-auditory-warning-guidelines.md`).

**Where it fails.**
- The information-theory evidence concerns word and syllable level in speech, so applying it to answer-level content is an analogy.
- The alarm evidence is auditory.
- A frame-setting opening clause is legitimately low in information (`B-information-theory/genzel-charniak-2002-entropy-rate-constancy.md`).

### P13. Cut zero-information material, but replace marked forms instead of deleting them (salvaged from refuted R17 + R9 + R19 + R40 + R50)

**Statement.** Cut material that carries no content for this reader:
- stock phrases ("It is important to note");
- sign-off formulas ("Hope this helps");
- praise of the question, hype and empty evaluatives;
- verb-plus-noun operators ("perform an analysis of" becomes "analyze");
- process narration;
- formal register used only to sound serious;
- prose that repeats a code block, table or earlier sentence that already makes sense alone.

Negated antonyms and softening periphrasis are marked forms with their own meaning. Replace one with the plain term or a number only when the plain meaning is intended. Keep "not unreasonable" or "not fast" when the claim really is weaker than the positive or the degree is unknown.

Keep:
- repair, contrast, cause and announced-structure markers;
- normative and RFC 2119 modals;
- register required by a template or genre;
- brief empathy when the user discloses distress or bad news;
- politeness in refusals and critique;
- a one-line takeaway right next to a table or worked example;
- a full restatement for a handoff reader.

**Why salvageable.** All three lenses keep the core: cut boilerplate, hype and self-sufficient echoes. The evidence includes Chandler & Sweller, Kalyuga 1999, Morkes & Nielsen's +58%, and Martínez 2023. The refutation came from blanket deletion of marked forms, which Tessler-Franke, Horn and Levinson show carry meaning. It also came from a ban on acknowledgment that worsens the gap Shaikh documents.

**Evidence.**
- Concise text scored +58% in usability (`D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`, UNVERIFIED details).
- Delete the self-sufficient redundant source (`D-human-factors-ux/chandler-sweller-1991-split-attention-redundancy-origin.md`; `D-human-factors-ux/kalyuga-1999-redundancy-split-attention.md`).
- "Not unhappy" reads as only mildly positive, and a minority read negated antonyms as polite negatives (`A-pragmatics/tessler-franke-2018-not-unreasonable-negated-antonyms.md`).
- Empathic acknowledgment was the largest grounding act LLMs omitted (`A-pragmatics/shaikh-2024-grounding-gaps-llm.md`).
- A short adjacent restatement helps and a distant one hurts (Mayer & Johnson via `D-human-factors-ux/dejong-2010-clt-critique-load-types.md`).

**Where it fails.**
- Many synonym pairs carry no implicature difference.
- "Was able to fix" can signal real difficulty.
- "Only to sound serious" is a motive test the model cannot apply.

### P14. Open with the answer unless something changes how it must be read; every unit carries its own point (salvaged from refuted R23 + R24 + R33 + R34 + R30)

**Statement.** The opening sentence gives the answer or the deciding term. If an item changes how the answer must be read, that item comes first instead, with the context that makes the answer credible placed beside it. Such items are a reversing condition, an uncertainty status, a departure from the request, or an interpretation of an ambiguous request.

- **Units.** Each paragraph or section carries its own point, usually stated early. In a diagnosis or derivation, the steps may come before the conclusion.
- **Within a sentence,** given material comes before new by default. This is a default, not a ban: a decisive exception may sit in stress position at the end.
- **Headings** only for answers long enough to scan. Each one is familiar, distinct from its siblings and predictive of what follows.
- **Bold and warning format.** Bold sparingly. Keep warning format for real harm.
- **Wrong user terms.** Do not adopt a user's wrong term as a label.

**Why salvageable.** L2 survived. L1 found "the rule's broad direction has support". L3's revision keeps answer-first with the same exceptions. The refutation targeted these absolutes:
- "bold only one or two", which the Schneider note calls "a harness design choice, not a finding";
- "every paragraph opens with its main point", which Duggan-Payne 2009 Exp. 2 contradicts;
- "never end on a hedge", which goes against Gopen & Swan's own disclaimer.

**Evidence.**
- Scannable, conclusion-first text did better, tested only as a bundle (`D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`).
- Opening surprisal is highest (`B-information-theory/verma-2023-revisiting-entropy-rate-constancy.md`).
- First sentences get the most gaze (`F-screen-reading/duggan-payne-2011-skim-satisficing.md`).
- Old-first paragraphs were read faster and recalled better (`E-style-rhetoric/vandekopple-1980-fsp-given-new-experiments.md`).
- Signaling gives g of about .5, with no expertise reversal (`D-human-factors-ux/schneider-2018-signaling-meta-analysis.md`, via a secondary review, UNVERIFIED primary).
- Labels must be familiar as well as discriminating (`F-screen-reading/blackmon-2003-repairing-cww.md`).
- Content-first without context "generates skepticism" (`E-style-rhetoric/mensh-kording-2017-ten-rules-structuring-papers.md`, H).

**Where it fails.**
- An exact term that a novice does not know cannot be the opening (pairs with P11).
- The F-pattern evidence comes from practitioner articles with unpublished protocols (`F-screen-reading/nielsen-2006-f-pattern.md`, UNVERIFIED).

---

## 2. Refuted rules

Lens votes are listed as refuted/survived (L1, L2, L3). Every refuted bundle failed through over-bundling, absolute quantifiers or misattributed specifics, not because its core was wrong. The usable core of each rule appears in the principle named in its entry.

- **R2 + R48 + R27-below-K** (content-unit check). Votes: L1 refuted, L2 refuted, L3 survived. It failed on three counts:
  - "Reword first ... no hedges" contradicts its own guard and the Grice and Seppälä notes.
  - Its unit weighting is misattributed: Pyramid weights count reference summaries, and FActScore weights every fact equally, so neither measures decision impact.
  - It conflicted with the must-haves by stopping at K, and atomic-fact lists miss order and glue. Core in P8.
- **R5 + R11 + R38** (most specific term). Votes: refuted, refuted, refuted. The headline "fewest competing readings" contradicts the basic-level guard. "Every mention gets the distinguisher" is over-description. "Coarse only if it excludes a wrong answer" is too narrow, given Jiang, Zaslavsky and triage cases. It also never warns that exact scalars read as exhaustive. Core in P6.
- **R6 + R56 + R51 + R31 + R32 + R55** (gloss calibration). Votes: refuted, survived, refuted. It bundled six rules and failed on four counts:
  - It allowed no swap to an exactly equivalent common word.
  - It treated correct use of a term as proof of understanding (a patient's "troponin").
  - Its "name the conflict in one clause" remedy is untested.
  - Its level cues and weak-signal default were never validated for chat.

  Core in P11.
- **R7 + R28 + R29 + R44** (grounding before pointing). Votes: refuted, refuted, survived. It failed on four clauses:
  - "Necessary part only" for definite references, although Clark allows probable-part bridges.
  - "Tool output never given", even when the user watched it.
  - "Keep the rejected alternative" in every outbound text.
  - "Re-anchor far-back terms" with no trigger.

  Core in P10.
- **R13 + R14 + R45 + R35** (spend words at surprise). Votes: refuted, survived, refuted. It failed on four clauses:
  - Live-trigger-only warnings suppress contraindications when the trigger is unknown.
  - "Cut recaps" and "cut restated questions" are unconditional.
  - It treats the assistant's own echo as a read-back (Monan).
  - Its "one sentence" warning template has no source.

  Core in P12.
- **R15 + R41 + R59 + R16 + R25 + R49** (restructure, never reduce). Votes: refuted, refuted, refuted. It failed on three counts:
  - "Main claim first, then each qualifier in its own sentence" contradicts STE 5.4 and Duggan-Payne. It produces the dangerous "Take 400 mg ... Do not if kidney disease" pattern.
  - The "one new referent" threshold and "usually consequence" are not in their sources.
  - The absolute connective ban conflicts with Levinson and McNamara.

  Core in P7.
- **R17 + R9 + R19 + R40 + R50** (cut zero-information material). Votes: refuted, refuted, refuted. It failed on four counts:
  - It deleted marked forms and negated antonyms, which carry meaning.
  - It banned acknowledgments, which worsens the LLM empathy gap.
  - It had no carve-out for politeness or genre register.
  - It allowed a distant re-anchor while banning the adjacent restatement that the evidence supports.

  Core in P13.
- **R18 + R27 + R39 + R61** (curate to goal). Votes: refuted, refuted, refuted. It failed on three counts:
  - Its hard cap of 1-3 reasons is contradicted by its own source: 9 strong arguments beat 3 (Petty & Cacioppo).
  - Its action-only split test breaks learning goals ("void vs voidable").
  - It cut background with no expertise check.

  Core in P8.
- **R21 + R22 + R52 + R42** (packaging values). Votes: refuted, refuted, refuted. Its numeric caps (3-4 elements, 2 values per sentence) come from transient ATC voice. The cited data-link arm shows a persistent medium tolerates long messages. The caps also split conjunctive conditions. Core in P9.
- **R23 + R24 + R33 + R34 + R30** (answer first, signal). Votes: refuted, survived, refuted. It merged five rules and had three faults:
  - Its absolutes ("every", "never", "one or two") outrun the evidence.
  - Per-paragraph front-loading is contradicted by Duggan-Payne 2009.
  - "Never end on a hedge" contradicts Gopen & Swan.

  Core in P14.

---

## 3. Where precision and compression diverge

The two often coincide. The exact term is usually shorter than its paraphrase ("race condition"). Cutting catch-alls, stock phrases and off-goal detail serves both (`_findings.md` T1, T3, T10). They come apart in these places:

1. **The reader lacks the concept.** The precise term plus a one-clause gloss is *longer* than the bare term and more precise than a paraphrase. Compression drops the gloss. Simplification swaps in a vaguer word, which Kuhn 2016 and Blackmon show loses meaning. Precision keeps the term and pays for the gloss once (P11).
2. **Costly points need redundancy.** Precision *adds* words at destructive commands, look-alike values, negations and units: full identifiers, labels, a user-side check (P9, P12). Compression removes exactly these (`C-controlled-language/cardosi-1996-tracon-readback-complexity.md`: truncated altimeter settings).
3. **Telegraphese.** Dropping articles, verbs and connectives is the purest compression. It saves words and moves the cost onto the reader (STE 4.2; Meister). Precision restructures instead (P7).
4. **Qualifiers and shields.** "Usually", "about", "I suspect" and "per the 2023 label" look like padding but are truth-conditional or calibrating content. Compression deletes them. Precision keeps them, or deletes them only after checking that the stronger claim is true (P2, P4).
5. **Marked forms.** "Not unreasonable" is longer than "reasonable" but means something different. Precision replaces a marked form only when the plain meaning is intended. Compression just shortens it (P13).
6. **Specificity beyond the evidence.** A more specific claim looks more precise but is less accurate (`G-precision-without-loss/wei-2024-long-form-factuality-f1-at-k.md` A.7). Under uncertainty the precise move is the tightest *coarser* claim (`G-precision-without-loss/jiang-2025-conformal-linguistic-calibration.md`). Precision is fit to the evidence, not maximal detail.
7. **Shortening across turns.** Humans shorten an established term by deleting words. LLMs shorten by substituting new words, which is compression disguised as variety and breaks the pact (`A-pragmatics/hua-artzi-2024-talk-less-conventions.md`, P3).
8. **Leaving the dialogue.** A session label is precise for the live partner and compressed for a handoff reader. The same string changes status with the audience (P10; `A-pragmatics/schober-clark-1989-addressees-overhearers.md`).
9. **Content units.** A cut can keep every listed fact and still lose an ordering ("migrate before deploy") or a link a novice needed. Precision is judged by idea units *and* their dependencies, not by word count or fact count (P8; `G-precision-without-loss/nenkova-2004-pyramid-content-units.md`).
10. **Length as a signal.** Padding is not neutral: excess content implies "some particular point" (Grice). Long explanations inflate confidence without improving discrimination (Steyvers). So padding damages precision, not just brevity. Preference ratings do not detect this (`_findings.md` T17).

**The cleanest line in the corpus** comes from McNamara, via `_findings.md` T11. Referential cohesion (consistent terms, nouns in place of ambiguous pronouns) is precision that every reader needs. Explanatory bridges are elaboration that can be compressed away for experts.

---

## 4. Field-specific variations

### Legal
- **Structure, not jargon, drives difficulty.** Pulling a center-embedded definition into its own sentence helped most. Swapping in exact common words (tenant for lessee) helped less but still helped (`C-controlled-language/martinez-2022-poor-writing-legal-language.md`; every effect size UNVERIFIED).
- **Plain register costs nothing with experts.** Lawyers took the same legalese penalty as lay readers and did not rate plain clauses as less enforceable (`C-controlled-language/martinez-2023-lawyers-legalese-plain-register.md`). Expertise licenses terms, not nested syntax (P7).
- **Defined terms are fixed strings.** Rotating "agreement" and "contract" when both are defined terms is a real hazard (P3, R8 L3).
- **Truth-making exceptions stay attached to the claim.** "You can break the lease with 30 days' notice", with "only after month 12" in a later sentence, is false on its own (R15 L3; P7).
- **Never split a conjunctive eligibility test into steps** (the FMLA example, R21 L3; P9).
- **Negated judgments are deliberate.** "Not unenforceable" is a below-threshold judgment. Do not "simplify" it into "enforceable" (P13).
- **Template register.** Drafting into a filing or a contract requires the genre's register. Jurisdiction caveats and legally required boilerplate are must-haves (P8, P12).
- **Limit:** where a concept conflicts with lay belief, comprehension stayed "very low" even after redrafting. Give an example or consequence rather than relying on a gloss (`C-controlled-language/masson-waldron-1994-plain-language-contracts.md`, E\*, stage 3 UNVERIFIED).

### Medical
- **Shields and attribution are clinical content.** Physicians inserted hedges in 39% of self-repairs. "According to the 2023 label, max about 4 g/day" must keep its source, its date and its rounder (`E-style-rhetoric/prince-frader-bosk-1982-hedging-approximators-shields.md`; P2).
- **Calibrated hedging changes user accuracy.** It helps when the answer is wrong and hurts when it is right. The Kim study covers yes/no medical questions only (`E-style-rhetoric/kim-2024-uncertainty-expression-reliance.md`; P4).
- **Correct use of a term is not understanding.** "My troponin is elevated" still needs what the term implies (R6 L3; P11).
- **Unknown triggers still warrant a warning.** For "how much ibuprofen?", the standard contraindication line stays when kidney disease or anticoagulant use is unknown (R13 L3; P12). It goes *before* the dose, not after (R15 L3; P7).
- **Must-haves beyond K.** The renal contraindication stays even for a question about adult dosing (R2 L3; P8). Scope qualifiers like "in adults" are never cut (R1 L3; P1).
- **Map the patient's word once.** "Myocardial infarction, i.e. the heart attack you mentioned", then hold the clinical term (P3).
- **Bad news gets a brief acknowledgment** before the definition (R17 L3; P13). The Shaikh evidence is from social dialogue.
- **Coarse but actionable claims are correct.** "Needs same-day in-person evaluation" (R5 L3; P6).
- **Alarm fatigue.** Generic "consult a professional" lines are false alarms that devalue the real one (`C-controlled-language/edworthy-2013-medical-audible-alarms-review.md`; `C-controlled-language/bliss-1995-probability-matching-cry-wolf.md`, abstract only, UNVERIFIED). The evidence is auditory, so applying it to text is an analogy.

### Engineering and software
- **Controlled-language practice transfers best here.** STE uses one word per meaning, condition first and complete sentences (`C-controlled-language/asd-2025-ste100-simplified-technical-english.md`). CAP 413 scales read-back to cost and treats unnecessary retransmission as a fault (`C-controlled-language/caa-2026-cap413-radiotelephony-phraseology.md`).
- **Literals.** Give commands, paths, versions and errors exactly, in code. Separate look-alike ports and versions (P9).
- **Destructive commands.** Put the warning before the command ("Warning: discards uncommitted work. Stash first, then `git reset --hard origin/main`"). Prefer a dry-run or a typed-back target to an echo (P7, P12; `C-controlled-language/monan-1986-hearback-problem.md`).
- **Scope the claim.** "All 40 tests pass", not "the code is correct". For a diagnosis, a ranked best guess with the next check beats an unranked list (P4).
- **Two senses forced by code.** Qualify every use when code forces one word into two senses (dict "key" vs API key). Hold identifiers like `PaymentServiceClient` verbatim (P3).
- **Terse status lines are fine** as a closed, shared vocabulary ("Build passed. 2 warnings."), but name the referent of every status word (`C-controlled-language/cushing-1994-fatal-words-ambiguity.md`: the referent-less "OK").
- **Ambiguous requests.** For "undo my last commit", answer both readings in two lines, unpushed (`reset --soft`) and pushed (`revert`) (P5 option a).
- **Limit:** STE's 20/25-word limits and one-instruction-per-sentence rule were designed for procedures read by non-native maintenance staff. Do not force numbered steps onto a two-command answer (`C-controlled-language/shubert-1995-simplified-english-comprehensibility.md`, E\*).

### Creative
- **The corpus has almost no direct evidence.** No note studies fiction, poetry or creative drafting. The closest sources are these:
  - Oksa's literary-verse comprehension tests: paraphrase beside the original hurt expert readers (`D-human-factors-ux/oksa-kalyuga-chandler-2010-shakespeare-explanatory-notes.md`).
  - Classic style as a chosen stance (`E-style-rhetoric/thomas-turner-1994-classic-prose.md`; `E-style-rhetoric/pinker-2014-sense-of-style-classic-style.md`).
  - Thing Explainer's deliberate vocabulary constraint (`C-controlled-language/kuhn-2016-thing-explainer-circumlocution.md`).
  - Shannon's note that literary English is highly redundant (`B-information-theory/shannon-1951-prediction-entropy-printed-english.md`).
- **What transfers.**
  - Marked forms, periphrasis and litotes are expressive tools whose meaning is derived pragmatically (Horn, Tessler-Franke). In creative text they are often the point (P13).
  - Verifiable-claim density varies about 75-fold by genre (`G-precision-without-loss/song-2024-veriscore-verifiable-claims.md`), so fact-unit checks (P8) do not apply to creative content.
- **What does not transfer** is inference, not evidence. Synonym variation, ambiguity and deliberate under-specification are literary resources, so P3, P5 and P6 should govern the assistant's *talk about* the draft, not the draft itself.
- **Recommendation:** the plugin should switch off its density rules for creative output unless the user asks for tightening. In that case only P2 (do not change what the passage asserts or implies) and P13's filler cut apply.

---

## 5. Caveats and open questions

### 5.1 Unverified and secondary evidence that the principles lean on
- **Primary sources not read.** Several load-bearing claims rest on sources whose primary text was never read: Horn 1984, Levinson 2000, Ferreira 2005, McNamara 1996, Schneider 2018, Wüster 1979 (every quotation), Thomas & Turner, Pinker and Cushing. ISO 704 and ISO 10241-1 are known from previews and third-party excerpts only (`_findings.md`, Open conflicts item 7).
- **Abstract-only experiments (E\*).** Yeung 1998 (every number UNVERIFIED), Mayer 1996, Bliss 1995, Kalyuga 2007, Kalyuga & Sweller 2005, Hinds 1999, Masson & Waldron 1994, Martínez 2022 (full text blocked; effect sizes UNVERIFIED, and the abstract and press release disagree on passives) and Bergman 2026.
- **Background knowledge, not corpus notes.** Some lens arguments use sources the crawl never captured: Gordon, Grosz & Gilliom 1993 (Repeated Name Penalty), Zou et al. 2023 (clarifying questions), Keysar et al. 1998, Durik 2008, Jensen 2008 and arXiv 2405.16908. Treat them as UNVERIFIED until a note exists.
- **A misread statistic.** L2 for R18 cites Petty & Cacioppo's Number × Quality interaction (p < .02) as if it were the strong-arguments simple effect. That simple effect is only p < .10 (`E-style-rhetoric/petty-cacioppo-1984-argument-quantity-peripheral-cue.md`, line 31). The refutation of the 1-3 cap still stands, because the cap has no source at all, but "9 beat 3" is a marginal result.
- **A single-rater source.** Eisenhart 2026 has one rater. Fox Tree 1999 has n = 8 pairs and is correlational. Card 2001 has n = 8 protocols and no inferential test.

### 5.2 Thin tracks F and G
- **Track F (screen reading, 11 notes)** is web navigation and link-label research: Blackmon CWW, Pirolli-Card foraging, SNIF-ACT, the Nielsen F-pattern. Only the two Duggan & Payne papers study reading prose. The F-pattern evidence is practitioner articles with unpublished protocols (UNVERIFIED). Pirolli & Card 1999 was read via restatements. P14 and the label clauses therefore rest on an analogy from menus to answers. Nothing in F studies chat transcripts, code blocks or answer-length text on screen.
- **Track G (precision without loss, 11 notes)** is two kinds of material, neither a test of writing:
  - normative terminology standards (ISO, Wüster, Seppälä, Cabré, Koning), none of them experiments;
  - evaluation metrics (Pyramid, FActScore, F1@K, VeriScore, conformal calibration). These define how to *score* content units. Applying them to *writing* is an extrapolation. VeriScore's "all necessary modifiers" is a definition for claim extraction, and F1@K's K is a per-dataset median, not a per-user quantity.

  The crawl's central construct, "precision", therefore has its definition from G but its empirical support from A-E.
- **Missing gaps.** Neither track covers creative text or multilingual readers. Only Morrow-Prinzo's older pilots touch on age.

### 5.3 Contradictions between notes
1. **Signaling for experts.** Schneider 2018 found no expertise reversal (E\*, via a secondary review). Naumann, inside `D-human-factors-ux/mayer-fiorella-2014-coherence-signaling.md`, found signaling helped low-skill readers only. Unresolved. P14 assumes structural cues behave differently from explanatory scaffolding.
2. **Connectives for experts.** McNamara 1996 reports a reverse cohesion effect for high-knowledge readers. STE, Wang 2026 and Clark 1975 argue for keeping connectives. Present resolution: McNamara measured deep learning, while an answer's goal is accurate uptake. So keep logical connectives and drop explanatory bridges (P7, P11). This resolution is untested.
3. **Front-loading.** Morkes & Nielsen, Nielsen 2006 and Verma 2023 favour answer-first. Duggan & Payne 2009 found that the first half of each paragraph was no better than the second half. Resolution: front-load the response, and let each unit carry its own point (P14).
4. **Stress position vs "answer first".** Gopen & Swan put the decisive item last in a sentence. Wang and Martínez put the key point first in long sentences. Both are defaults, not rules.
5. **"Usually".** The candidate rule protected "usually", while ISO 10241-1 and Seppälä G9 delete it deliberately. Resolution in P2: "usually" is content, and removing it is a checked correction.
6. **Naming the source of uncertainty.** P4's rule text says to name it, but Kim 2024's impersonal (source-like) hedge had no significant effect. The three lens revisions split on this: L1 drops naming the reason, L2 makes it optional, L3 keeps it. P4 leaves it out of the statement and flags it as untested. The plugin drafts in section 6 allow it only "when it tells the reader what to check" (L2).
7. **Discourse markers.** Fox Tree 1999 (r = .73) is contradicted by Fox Tree & Mayer 2008, who attribute the effect to perspectives. Classic style and Morkes say to cut filler.
8. **Entropy rate.** Genzel & Charniak 2002 support constancy. Verma 2023 finds no clear evidence with long-context models. The harness uses neither as a target.
9. **Scalar implicature automaticity.** Bott & Noveck and Breheny (unread) dispute that GCIs are automatic defaults. This weakens P4's mechanism but not its instruction.
10. **The lens vote masks dissent.** R2 (L3 survived) and R6, R7, R13 and R23 (one lens survived each) were refuted 2-1. Their salvaged principles (P8, P10-P12, P14) carry one lens's full endorsement, so they are better supported than the "refuted" label suggests.

### 5.4 Open questions
- **Transfer gap.** The load and learning evidence measures learning in instruction. The aviation and alarm evidence is transient speech or sound. The grounding evidence is social dialogue or reference games. None of it tests chat answers directly (`_findings.md`, Open conflicts item 8). Persistent text tolerates more per unit (`C-controlled-language/morrow-1993-message-length-timing.md`), but by how much is unknown.
- **Stale model measurements.** Every LLM-specific gap (Cai, Hua & Artzi, Shaikh, Eisenhart, Steyvers) was measured on 2023-2024 models and must be re-tested on the deployed model.
- **Estimating the reader's level.** No validated method exists for estimating reader level from chat cues (P11).
- **Glosses for experts.** Does a single appositive gloss cost experts anything? No source tested it.
- **Warning scope.** At what harm threshold should a warning fire when its trigger is unknown (P12)? Over-warning trades against cry-wolf effects.
- **Evaluation.** The preference signals are biased toward length and against clarifying questions (T17). The plugin needs comprehension- and calibration-based evals, not rater preference (R36).

---

## 6. Draft plugin revisions

This section covers `/home/user/KIA/output-styles/precise.md` and `/home/user/KIA/skills/precise/SKILL.md`. Those files are **not** edited here. The drafts below are proposals.

**Diagnosis.** The current plugin gets the goal right: "precision over brevity". But several lines push toward compression, which the evidence refutes:
- "Maximum information density. Machine-interface register."
- "Every word must change meaning. Delete any that do not."
- "Drop articles or verbs only where no ambiguity results" (UID).
- "Quantify it: 'Likely (~80%)'".
- "Expand on request, never preemptively".

It also has nothing on these areas:
- term consistency across turns (the failure Hua & Artzi measured);
- private context and outbound text;
- literals and look-alike values;
- warnings;
- shields and attribution;
- creative or emotional turns.

### 6.1 Revised output style

```markdown
---
name: precise
description: Precise, dense answers that drop words, never meaning. Written for a human reader.
keep-coding-instructions: true
---

Write for this reader: every word carries meaning, and no meaning is dropped to save words.

- Open with the answer. If something changes how the answer must be read (a reversing condition, uncertainty, a departure from the request, your reading of an ambiguous request), put that first. No preamble, praise or sign-off.
- Use the most specific term the evidence supports, at the everyday level unless a same-kind alternative is in play. Replace catch-alls ("the issue", "various factors") with the deciding variable.
- If the reader has not shown they know a term the answer depends on, gloss it once in a short clause. If an exact common word exists, use it instead.
- Cut a word only if this reader can rebuild it cheaply. Never cut qualifiers (version, scope, condition, exception, "usually", "about"), shields ("I suspect", "per the docs"), negations or connectives that state a relation.
- Write full sentences in prose. Fragments only in status lines: subject + state, with the referent named ("Build passed. 2 warnings.").
- Put a condition or warning that decides safety or truth before the action or in the same sentence: "If X, do Y"; "Warning: Z. Then run Y".
- One concept, one term. Reuse the established term verbatim; never rotate synonyms. Map the user's term to the standard one once, then hold it.
- Make the strongest claim the evidence supports, scoped to what it covers ("all 40 tests pass", not "the code works"). Hedge only claims that are really less certain, at the claim, in plain words ("I'm not sure, but"). Give a number only if it has a basis. Prefer the tightest true claim, or a ranked best guess plus the next check, to a bare "possibly".
- Commands, paths, identifiers, versions and errors as exact literals in code. Look-alike values on separate labelled lines. Numbered steps only for three or more actions.
- Things only you saw (files read, tool output not shown, your reasoning, labels you coined) are not shared context: describe them at first mention, and expand them in summaries, PRs and handoffs.
- Ambiguous request with materially different answers: answer both briefly, or state your reading in one clause; ask before anything irreversible. Do not ask by habit.
- Report outcomes, not process. Before a destructive step, give the full target and ask the user to confirm or dry-run.
- Warn once, specifically (condition, hazard, action), when the trigger is present or unknown and the harm is serious. No generic disclaimers.
- Keep empathy for bad news, politeness in refusals and critique, and the register a genre requires. Creative drafts are not compressed unless asked.
```

**Rationale per change.**
- Description: changed from "Maximum information density. Machine-interface register." to "drop words, never meaning... human reader". The original framing invites the compression failure. Every school defines efficiency as success under cost (T1).
- Answer-first: added the reading-changing exception (P14). STE 5.4, Kim 2024 and Monan put conditions, status and departures before the answer.
- "Most precise term; exactness over simplification": now "most specific *supported* term, at the basic level" (P6). The flat version picks over-specific or unsupported terms (Degen 2020; Wei A.7; Jiang 2025).
- New gloss line, including the exact-common-word swap (P11). This is the Oksa/Yeung crossover and Martínez's tenant-for-lessee result.
- "Every word must change meaning. Delete any that do not.": replaced by the recoverability test and a protected list (P1, P2). Qualifiers and shields fail the "changes meaning" test as writers apply it, yet carry truth conditions and calibration (Prince et al.; ISO 10241-1).
- "Full grammar when it carries meaning": now "full sentences in prose; fragments only in status lines". Grammar always carries meaning for a non-twin reader (STE 4.2; Shannon 1951; P7).
- New condition-first line (P7). It fixes the most dangerous ordering failure the lenses found (R15 L3 medical and git cases).
- "No synonyms for variety": extended to verbatim reuse plus mapping the user's term once (P3). LLMs shorten by substitution (Hua & Artzi 2024).
- Hedging: changed from "quantified where possible" to "a number only if it has a basis", plus first-person form and the tightest-claim or ranked-guess options (P4). Unbased percentages are unsupported confidence (Kim; Steyvers; Jiang).
- New literals line (P9). Cardosi and Grayson show look-alike and truncated values fail. The step threshold avoids over-formatting simple answers (Shubert).
- New private-context line (P10). This is the writer's-prior error, repeated across at least 10 notes (T2), plus overhearer accuracy (Schober & Clark).
- New ambiguity line (P5). LLMs under-ground, and over-prompting misplaces clarifying questions (Shaikh 2024).
- Process line: added the user-side check before destructive steps (P12). An echo is not a hearback (Monan 1986).
- New warning line (P12). Reliability, not volume, earns attention (Bliss; Edworthy). An unknown trigger must not suppress a serious warning.
- New carve-outs line (P13, section 4 Creative). Empathy, politeness and genre register are content, and Shaikh documents the empathy gap.
- Removed "One idea per sentence". It splits claims from their deciding qualifiers (R15 L1-L3). STE's one-instruction rule is for procedures and is covered by the steps line.
- Removed "Elaborate only when asked or when omission would mislead". Must-haves, glosses and warnings are now stated positively (P8, P11, P12). "Only when asked" suppresses decision-critical content (Grayson: 37% never sent).

### 6.2 Revised skill

````markdown
---
name: precise
description: Rewrite or compose text so every word carries meaning and no meaning is lost. Use when the user asks to tighten, condense, or make an answer, message, commit, PR description, status update, or doc more concise or precise, or says "too long", "cut the fluff", or "be terse".
---

# Precise

Goal: the fewest words that carry the full meaning *for this reader*. Precision picks the term or structure that already carries the whole idea. Compression drops meaning the reader cannot rebuild. Do the first, never the second.

## Rules

1. **Answer first, unless something changes how it must be read.** Open with the answer or deciding term. A reversing condition, an uncertainty status, a departure from the request, or your reading of an ambiguous request comes first instead. Each paragraph carries its own point. (Morkes & Nielsen 1997; STE 5.4; Duggan & Payne 2009)
2. **Cut by the recoverability test.** Delete only what this reader can rebuild cheaply from what they have seen or know. When unsure of their level, assume they recover less. Recoverable does not mean must-cut: keep restatements at costly points. (Shannon 1951; Piantadosi 2012; CAP 413)
3. **Never change the claim.** A cut is wrong if it changes truth conditions, stated confidence, or stated source. Keep scope qualifiers, quantifiers ("usually", "most"), rounders ("about"), sibling-separating negations, and real shields ("I suspect", "per the 2023 label"). (ISO 704; Prince et al. 1982)
4. **Most specific supported term, everyday level by default.** Use a more specific term only when a same-kind alternative is live. Swap catch-alls for the deciding variable. Use a coarser claim when the evidence supports nothing finer. Give exact counts with their scope. (Degen 2020; Frank & Goodman 2012; Jiang 2025)
5. **Gloss, don't paraphrase.** If the reader hasn't shown the concept, add one short appositive at first use, or use an exactly equivalent common word. Never use a vaguer paraphrase. Never re-gloss terms the user used correctly. (Oksa 2010; Yeung 1998; Martínez 2022)
6. **One concept, one term.** Reuse the established term verbatim. Shorten by dropping modifiers, never by swapping in a synonym. Map the user's term to the standard one once. Hold identifiers and defined terms exactly. (Hua & Artzi 2024; ISO 10241-1; Brennan & Clark 1996)
7. **Strongest supported claim; calibrated hedges.** Hedge only claims materially less certain than the rest, at the claim, in plain first-person words. Give a number only when it has a basis. Name the reason only when it tells the reader what to check. Prefer the tightest true claim, or "likely X because Y; if not, check Z", to a bare "possibly". (Kim 2024; Steyvers 2025)
8. **Restructure, don't telegraph.** In prose, keep articles, subjects, verbs, units, and connectives that state contrast, condition, or concession. Split long sentences, carrying the connective across. Fragments only in closed status vocabularies ("Build passed. 2 warnings."). (STE 4.2; Meister 2021)
9. **Deciding conditions travel with the claim.** A condition, exception, or warning that decides truth or safety goes before the action or in the same sentence. (STE 5.4; Duggan & Payne 2009)
10. **Exact literals; separated look-alikes.** Commands, paths, versions, flags, and errors go in code, verbatim. Same-shaped values go on labelled separate lines. Use numbered steps for three or more actions, never splitting an AND-condition. (Cardosi 1996; Grayson 1981; Morrow 1993)
11. **Private context is not given.** Describe anything only you saw at first mention: files, unshown output, coined labels. In summaries, commits, PRs, and handoffs, expand session labels into standard terms. (Schober & Clark 1989; Hua & Artzi 2024)
12. **Cut zero-information material; replace marked forms rather than deleting them.** Delete stock phrases, praise, sign-offs, process narration, and prose that echoes a self-sufficient code block or table. Replace "not unreasonable" or "was able to" with the plain form only if the plain meaning is intended. (Chandler & Sweller 1991; Tessler & Franke 2018)

## Procedure

1. Identify the reader (the live user, a forwarded or third-party reader, an expert or novice signal) and the goal (decide, act, learn, look up).
2. List the must-have units: facts, conditions, warnings, steps *with their order*, and the links a novice would need. Must-haves stay even past the question's apparent scope.
3. Cut optional units lowest-impact first. Then cut zero-information words (rule 12).
4. Replace paraphrases with the precise term (rules 4-5). Restructure long or nested sentences (rules 8-9).
5. **Claim check:** compare each sentence with its original. Did any modality, causality, negation, scope, quantifier, rounder, shield, or source change or vanish? Restore it.
6. **Consistency check (a separate pass):** one term per concept, no new synonyms, identifiers verbatim, session labels expanded if the text leaves the conversation.
7. **Ambiguity check:** for each word with two live senses for this reader, qualify its first mention. Leave settled ambiguity alone.

## Examples

**Before:** "Great question! So, after looking into this, it seems like the problem is probably that the function is being called before the data has finished loading, which means it ends up getting undefined."
**After:** "`render()` runs before `fetchData()` resolves, so `data` is `undefined`. Await the fetch or guard on `data`."

**Before:** "I went ahead and ran the test suite, and I'm happy to report that everything passed except for a couple of warnings that came up."
**After:** "All 212 tests passed. 2 warnings."

**Before (over-compressed, meaning lost):** "Fix: cache. Done."
**After:** "Added a 60 s in-memory cache to `getUser()`; p95 latency 420 ms → 35 ms. Stale reads possible for up to 60 s."

**Before (shield and condition lost):** "Max dose is 4 g/day. Don't if liver disease."
**After:** "If you have no liver disease, the 2023 label puts the adult maximum at about 4 g/day."

**Before (synonym drift):** "Clear the cache... then rebuild the store... the buffer should now be empty."
**After:** "Clear the cache, then rebuild it; the cache should now be empty."

## Failure modes: where density rules bend

- **Teaching:** the intermediate steps carry meaning; keep them. One short restatement of the principle right after a worked example is allowed.
- **Ambiguity:** if two readings give different short answers, give both in one line each. Before an irreversible step, ask.
- **Legal / medical / safety:** qualifiers, conditions, sources and standard warnings are the content. A warning stays when its trigger is unknown.
- **Destructive commands:** warn first, give the full target, and prefer a dry-run or a typed-back confirmation to an echo.
- **Emotional turns:** a brief acknowledgment of bad news or frustration is a grounding act, not filler.
- **Text leaving the conversation:** write for a reader who saw none of it.
- **Creative drafts:** do not apply density rules unless asked. If asked, cut filler only, and never change what the passage asserts or implies.
````

**Rationale per change.**
- Goal line: added "for this reader". Recoverability is relative to the reader (P1; Shannon 1951; Juba 2011).
- Rule 1: added reading-changing exceptions and per-unit points. Front-loading every paragraph is unsupported (P14; Duggan & Payne 2009).
- Rule 2 replaces old rule 2's ritual ban and procedure step 4's "delete every word whose removal leaves meaning unchanged" with the recoverability test plus "recoverable is not must-cut" (P1). Ritual cutting moved to rule 12 with its carve-outs.
- Rule 3 is new: the truth-conditions, confidence and source test (P2). It closes the shield and attribution gap that L3 found in R3.
- Rule 4 is new. Old rule 3's "exact term over paraphrase" is split into a specificity rule (P6) and a gloss rule (rule 5). The exact term alone fails readers who lack the concept (Blackmon 2003/2005).
- Rule 5 is new (P11): appositive gloss, common-word swap, no re-glossing experts. Supported by Oksa, Yeung and Martínez 2022, with the caveats in 5.1.
- Rule 6: old rule 7's "one word per concept" is kept and given LLM-specific instructions (verbatim reuse, shorten by deletion). These are the only instructions shown to make models converge (Hua & Artzi 2024).
- Rule 7: old rule 4's "quantify it, 'Likely (~80%)'" is replaced. An invented percentage is unsupported confidence, and generated confidence is poorly calibrated (P4; Kim 2024; Steyvers 2025). Added the first-person form, tightest claim and ranked guess.
- Rule 8: old rule 8 ("even density ... drop articles or verbs") is removed and replaced. Dropping function words is the telegraphese that STE 4.2 and Meister 2021 reject, and UID was never a writing target (Verma 2023; P7).
- Rule 9 is new: condition-first ordering for truth- and safety-deciding qualifiers (P7). Old rule 7's "one idea per sentence" produced the split-qualifier failure.
- Rule 10 is new (P9). It covers literals and look-alike values with the three-action threshold, and avoids the refuted per-sentence caps.
- Rule 11 is new (P10). The original skill explicitly covers commits and PR descriptions, which are exactly the outbound texts where session labels fail overhearers.
- Rule 12: keeps old rule 2's cuts and adds marked-form replacement (P13; Tessler & Franke 2018; Horn 1984).
- Old rule 5 ("status = subject + state") is folded into rule 8 as the closed-vocabulary exception. Old rule 6 ("outcomes, not process") is folded into rule 12 (process narration).
- Old rule 9 ("expand on request, never preemptively") is removed. It suppresses must-haves (P8; Grayson 1981) and reader-needed glosses (P11).
- Procedure steps 1-2: the reader and goal are identified first, and units include conditions, order and links. Atomic-fact lists miss dependencies (Nenkova 2004; R2 L3 migration case).
- Procedure step 5: the claim check is expanded to include shields and sources (P2).
- Procedure step 6: added consistency as a separate pass. Hua & Artzi show concise and consistent must be checked separately.
- Procedure step 7: added the ambiguity pass (P5). Writers miss form-level ambiguity unless they check for it (Ferreira 2005, UNVERIFIED primary).
- Examples:
  - The test example now gives a scoped count. "Tests passed" can over-claim (P4).
  - A medical example shows shield, rounder and condition-first ordering (P2, P7).
  - A synonym-drift example shows rule 6.
- Failure modes: added destructive commands, emotional turns, forwarded text and creative drafts (P12, P13, P10, section 4). Added warn-when-trigger-unknown (P12, R13 L3).

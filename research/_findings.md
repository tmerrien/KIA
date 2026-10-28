# Findings: running synthesis (deduplicated, by theme)

Topic: the linguistic and cognitive basis for concise, high-density communication, applied to how an AI assistant should phrase its answers.

Working definitions, which this crawl supports:
- **PRECISION**: picking the exact term or structure that carries the whole idea for *this* reader, so the meaning comes back with no loss.
- **COMPRESSION**: dropping material the reader cannot rebuild, so the text gets shorter and meaning is lost.

Source tags are note slugs. Each slug is a filename under `/home/user/KIA/research/<track>/` without `.md`. Evidence grade:
- **E**: experiment or corpus study, read in full.
- **E\***: experiment known only from an abstract or secondary source.
- **H**: expert heuristic or codified practice.
- **T**: formal or theoretical argument.

---

## T1. The core distinction: every school defines efficiency as success under constraint, not as shortness

- Gibson et al. define an efficient code as one that achieves "successful communication ... with minimal effort". Dropping content the reader cannot recover lowers success, so it is not efficient. [gibson-2019-efficiency, T]
- RSA writes utility as informativeness minus cost. A cut that lowers informativeness more than it lowers cost is a net loss. A vague short word fits many readings (large |w|) and is worse than an exact one. [frank-goodman-2012-rsa-language-games E; goodman-frank-2016-rsa-probabilistic-inference T; bergen-levy-goodman-2016-lexical-uncertainty T]
- Relevance is effect relative to effort. "Chicken" beats "meat" on effect, and beats the equivalent disjunction on effort. [wilson-sperber-2004-relevance-theory T]
- Wüster calls it precision against convenience: precision is low "loss of cargo" between the intended idea and the evoked one. [wuster-1979-terminologielehre-concept-priority T, UNVERIFIED primary]
- Kuhn's PENS gives the operational version. Precision means less meaning has to be recovered from context. Plain Language and E-Prime shorten text but stay at P1, while one-meaning-per-term languages reach P2. [kuhn-2014-pens-controlled-natural-languages E-survey]
- ISO 704's substitution principle tests a term the same way. A definition must replace the term "without loss of or change in meaning". Removing an essential characteristic changes the extension. Removing a non-essential one does not. [iso-tc37-2022-iso704-substitution-principle H]
- **Consequence for the harness:** every cut needs a *recoverability* test, not a length target. The schools disagree only on how to compute recoverability.

## T2. The licence to omit is the reader's context, never the writer's

- Shannon's reduced text loses nothing only for a "mathematically, not just biologically identical" twin. [shannon-1951-prediction-entropy-printed-english E]
- An efficient code sends H[M|C] bits. This assumes speaker and listener share the coding scheme and the context. Leaving out what the context does not carry is inefficient ambiguity. [piantadosi-2012-ambiguity T+E]
- Without a common prior, a code tuned to the speaker is brittle and can fail completely. Robustness costs about lg α extra bits, which grows only logarithmically with the mismatch. Writers should choose α by audience breadth. [juba-2011-compression-without-common-prior T]
- Levinson: omit what the Q and I defaults restore (the stereotype, temporal order, the normal method). Do not omit content the reader could rebuild only by reasoning about this particular context, because that inference is neither fast nor reliable. [levinson-2000-presumptive-meanings-qim T]
- The given-new contract fails on *computability* when the listener lacks the bridge, and the sentence becomes incomprehensible. [clark-haviland-1977-given-new-contract E]
- Overhearers who heard everything still lose accuracy: 88% vs 99%, and 68% for late joiners. More time does not help. [schober-clark-1989-addressees-overhearers E]
- **Assistant-specific corollary, repeated in at least 8 notes:** tool output, files the assistant read, its private reasoning and labels it coined are *not* the user's context. Treating them as given is the writer's-prior error. [piantadosi-2012, juba-2011, clark-haviland-1977, aylett-turk-2004, williams-1981 ("they all seem familiar, to you"), pinker-2014 (curse of knowledge), blackmon-2002 (developer blind spot), engelhardt-2006 (speaker-salience over-description)]

## T3. The exact term is shorter *and* stronger, but only for a reader who holds its concept

- Specificity carries more information at the same length:
  - "chicken" vs "meat" [wilson-sperber-2004];
  - the size principle [frank-goodman-2012];
  - the strongest true scalar term (Q) [horn-1984, levinson-2000];
  - "It rained every day for a week" [strunk-1918];
  - lexical fit [thomas-turner-1994];
  - an exact vocabulary condenses text where Basic English expands it [shannon-1948].
- A named term is a pointer. It keeps a link to the full definition that an inline paraphrase loses (Seppälä G6.2). One cover term can replace a list of examples. [seppala-2017-definition-writing-guidelines H]
- The limit: a term is precise only within a community that shares its concept [cabre-2002-doors-theory-terminology]. A term is one element for a reader with the schema and many interacting elements for a reader without it [chen-kalyuga-sweller-2017 T; sweller-1998 T; kalyuga-2003 E-review]. Unfamiliar labels had the lowest navigation success of any label problem [blackmon-2002 E]. Paraphrase "only sometimes" fixes unfamiliarity [blackmon-2003 E].
- The fix that keeps the precision is to keep the term and add a gloss or anchor once. Examples: "Paleontology & Fossils" [blackmon-2003]; "Arabidopsis, a flowering mustard plant" costs "no more space" [pinker-2014]; a genus-proximus gloss [seppala-2017, iso-tc37-2022]; a one-clause gloss in a separate position [chen-kalyuga-sweller-2017]. Replacing the term with a vaguer word is the wrong fix in every source.
- A higher-information word carries a cost. Specific details are harder to get right (Wei A.7), and unsupported specificity is false precision (T14). [wei-2024-long-form-factuality-f1-at-k E; jiang-2025-conformal-linguistic-calibration E]

## T4. Wordiness is not neutral padding: length carries meaning (markedness)

- Division of pragmatic labour: a periphrastic form signals a non-stereotypical meaning. "Got the machine to stop" means an unusual method. "Not impossible" means bare possibility. [horn-1984, T, second-hand]
- M-heuristic: "was able to fix it" is read as "didn't", and "not unreliable" is read as below "reliable". [levinson-2000]
- The meaning is *derived*, not stipulated, in Bi-OT, signalling games [vanrooij-franke-2026-biot-games-horn-division] and RSA with lexical uncertainty [bergen-levy-goodman-2016]. Speakers reach the pairing even in one-shot games.
- Excess content makes hearers infer that there is "some particular POINT" to it. [grice-1975]
- A redundant modifier makes listeners look for a contrast that does not exist (a garden path of about 300 ms). [engelhardt-2006 E]
- Counter-evidence: many synonym pairs show no implicature difference (*mare* / *adult female horse*, Davis 2016, via SEP). An anti-Horn equilibrium is also stable, so a reader trained on habitually inflated phrasing stops reading length as a signal. [horn-1984; vanrooij-franke-2026]

## T5. One concept, one term, held across the answer

- STE requires one word, one meaning and one part of speech, with no synonyms for an item (Rules 1.3, 1.11, 9.4). [asd-2025-ste100 H]
- Fixed meaning per term is what lifts a controlled language from P1 to P2. [kuhn-2014]
- Wüster's univocity principle, which he himself treats as relative to context. [wuster-1979]
- Synonym switching signals a new perspective or a new referent (principle of contrast). Pacts persist even when they are over-specific (52-69% retention). [brennan-clark-1996 E]
- A new synonym is a new discourse referent and adds integration cost. [gibson-1998-dependency-locality E]
- A switch in paraphrase is read as a different meaning under the division of labour. [vanrooij-franke-2026]
- Switching synonyms across procedure steps is the ambiguity that SE removed. [shubert-1995 E\*]
- Repeating the noun instead of an ambiguous pronoun is referential cohesion. It is precision for every reader, not padding. [mcnamara-1996 E\*; vandekopple-1980 E]
- Exceptions:
  - A second name is acceptable for a deliberately different view (Kochsalz/Natriumchlorid). [wuster-1979]
  - Switch when the old term has become wrong, and mark the switch. [brennan-clark-1996]
  - Pacts reset for a new reader. [brennan-clark-1996; schober-clark-1989]
  - Fully uniform N4 text reads "clumsy and repetitive". [kuhn-2014]
  - Cushing's AIR prototype planned *random synonym variation* to fight habituation. That runs against fixed phraseology and was never tested. [cushing-1994]

## T6. Grounding: short labels are earned, belong to a partner, and must be re-expanded for new readers

- Descriptions shrink after acceptance: 41 words to 8 [clark-wilkesgibbs-1986], and 73 to 13 [schober-clark-1989]. A first mention describes. Later mentions refer with a unitary term. Shortening works by simplification or narrowing to a distinctive part. Procedural handles ("the second one", 2% of references) lose to permanent properties. [clark-wilkesgibbs-1986 E]
- Long form first, short form after. Speakers choose the short form when context predicts it. ChatGPT and Vicuna do *not* show this sensitivity (Cai et al.), so this is a measured LLM gap. [mahowald-2013 E; piantadosi-2011 E]
- Overhearers are less accurate and less calibrated. They act confidently on the wrong referent. [schober-clark-1989]
- Seeing the rejected alternative ("turkey", not "ostrich") helped overhearers more than a clean monologue of equal length. Discourse and repair markers correlated with comprehension. [foxtree-1999 E, n = 8 pairs]
- A chat reader is closer to "distant responsibility" than to a live partner, because feedback is coarse and silence is not acceptance. Shorten references less aggressively than face-to-face speakers do, and treat the user's own reuse of a term as the clearest sign it is accepted. [clark-wilkesgibbs-1986]

## T7. Where to spend words: in proportion to surprise, at branch points and identifiers

- Smooth signal redundancy: give little signal to what is predictable and more to what is not. One weak spot sinks the whole message (0.1 × 0.9 = 0.09). [aylett-turk-2004 T + E\*]
- Speakers keep "that" before surprising material. A structure word before a hard claim is a signpost, not filler. [levy-jaeger-2007 E]
- Uneven density lowers acceptability. Spikes (telegraphese) and troughs (padding) both deviate from the language-wide rate. [meister-2021 E]
- Guessing errors cluster "where the line of thought ... branch[es]". Scientific prose is less predictable, so it has less to cut. [shannon-1951 E]
- Fix names and identifiers drove the repeat requests. Spell them out and repeat them, and cut filler instead. [prinzo-2009 E]
- Add redundancy only where confusion is possible: "degrees" after headings ending in zero, "hectopascal" below 1000. [caa-2026-cap413 H]
- Redundancy should go "in the proper way to combat the particular noise structure". For an assistant the noise is skimming and misreading of critical values. [shannon-1948 T]
- A redundant modifier adds information only if it is *more precise* than the term it backs up. Add the path or identifier next to the vague noun, not a second vague paraphrase. [degen-2020 E]
- Mark the atypical and leave the typical unstated ("blue banana", never "yellow banana"). [degen-2020; horn-1984; levinson-2000; vanrooij-franke-2026]

## T8. Grammatical glue and logical connectives are not the place to save words

- STE Rule 4.2: "your sentence will be shorter, but it will not be easier to read". "Remove the bolt and stop" misreads "stop" as a verb. [asd-2025-ste100]
- Do not send reduced text. Articles, subjects, connectives and units are cheap to read and are what a non-twin reader needs. [shannon-1951]
- Telegraphic text piles surprisal onto a few words, which is costly under a superlinear cost function. [meister-2021]
- STE schedules integration and does not remove it. Deleting "because", "so" or "unless" when splitting a sentence forces the reader to rebuild the link. [wang-2026-ste-eye-tracking-scheduling E\*]
- Revisions grew longer when the restructuring exposed a missing causal link. That gap is the curse of knowledge. [gopen-swan-1990 H]
- Deleting the *character* (the actor) makes a sentence look shorter and makes it ambiguous: "Who fears? Who recommends?" [williams-1981 H]
- ChatGPT's "concise" rewrite does well at deletion. It fails to *add* the missing actor or verb, and it drifts in meaning ("importance of X in achieving" became "X achieving"). [eisenhart-2026 H, single rater]
- Clarity overrides the brevity rules. [orwell-1946, rule vi]
- Boundary: in a closed, trained vocabulary (ATC phraseology), receivers drop anchor words harmlessly. Most "omission" readback errors were benign. [prinzo-2009] Krifka et al. warn that banning all ellipsis or pronouns would make text too verbose. [cushing-1994]

## T9. Redundancy, coherence and split attention: say it once, beside what it explains

- If a source is self-sufficient, delete its echo. Diagram only scored 34.8 in 60 s, against 26.6 in 92 s for diagram plus integrated text. Asking readers to process the redundant text doubles time and lowers scores. [chandler-sweller-1991 E]
- Duplicated narration plus on-screen text was the *worst* of three formats. [kalyuga-1999 E]
- If neither source is intelligible alone, integrate them. Moving the meaning elsewhere (a legend, "see above") hurts even when nothing is deleted. [chandler-sweller-1991 Exp. 6; mayer-fiorella-2014 spatial contiguity d = 1.10; kalyuga-1999]
- Coherence principle: cut true but interesting off-goal "seductive details" (23 of 23 tests, d = .86). The test is the user's goal, not accuracy. [mayer-fiorella-2014 E-review]
- Prose that restates code, a table or a list is the redundancy effect. Restatement is allowed only when it adds a relation or an implication. [sweller-1998]
- Holding information constant and cutting only non-information words gave +58% usability. Cutting promotional and self-referential words gave +27%. [morkes-nielsen-1997 E]
- Five to ten elaborating examples per link added nothing. [blackmon-2003 E]
- Repetition is invisible to F1@K, but the authors call it unhelpful. A fact-count objective will not catch it, so the harness must. [wei-2024]

## T10. Calibrate to the reader: expertise reversal

- Aids that help novices become load for experts, because "redundant information is frequently difficult to ignore". Interleaved glosses cost experts the most. Fade guidance rather than switching it off. [kalyuga-2003]
- Two-question gate: elaborate only if the content is high in element interactivity *and* the reader lacks the schema. A lookup never needs scaffolding. For experts, give steps without the reason for each step (van Gog 2008). [chen-kalyuga-sweller-2017]
- Read the depth of the user's first move, not the length of their message (r = .92). Fall back to full steps when the signal is weak, and re-estimate on every turn. [kalyuga-sweller-2004 E]
- Split cohesion into two kinds:
  - *referential* devices (nouns instead of ambiguous pronouns, consistent terms) are needed by every reader;
  - *explanatory* bridges can be dropped for experts.

  This distinction is the cleanest precision-versus-compression line in the track. [mcnamara-1996]
- Telegraphic STE helped stronger readers more, so it is not a safe default for novices. [wang-2026]
- Exception: signaling (headings, bold) showed *no* expertise reversal. The effect for high-knowledge learners was numerically larger. [schneider-2018 E\*] This conflicts with Naumann et al. (in mayer-fiorella-2014), where signaling helped low-skill readers but not high-skill ones. **Open conflict.**

## T11. Packaging: count idea units, cap them per unit, split rather than delete

- Readback problems run 1-3% for 1-4 elements and 8% for 5 or more. Clearances with 5 or more elements were 4% of all clearances and carried 26% of the errors. Long messages get *partial* readbacks, which removes the check. [cardosi-1993 E]
- Topic count drives real content errors, rising at 3-4 topics. Token load drives only benign anchor-dropping. [prinzo-2009 E]
- The same four commands split into two messages halved readback errors (18% to 8%) and clarification requests (65% to 33%). Close-together short messages caused *delayed* digit intrusions. A persistent medium (data link) tolerated long messages. [morrow-1993 E]
- Misheard numbers cluster in single sentences that call for two or more actions. [monan-1986 E]
- Several numbers in one clearance invite transposition. [grayson-1981 E]
- "Too long" means more emphasis-worthy items than stress positions. An announced list fills one stress position, with each item getting its own. [gopen-swan-1990 H]
- The new-referent count between dependents is the cost, and word count is not. [gibson-1998 E]
- Exceptions: a long procedure is fine when it was asked for (Cardosi's "clearance delivery" case). Controlled formatting pays only for complex content, so simple answers need none. [cardosi-1993; shubert-1995]

## T12. Order: answer first at the top of the response; old before new inside the sentence

- Response and unit level:
  - inverted pyramid [morkes-nielsen-1997];
  - readers satisfice in order and leave when scent drops [fu-pirolli-2007-snif-act E];
  - rank by yield so a reader who stops early has the best material [pirolli-card-1995];
  - the first sentence of each paragraph gets the most gaze [duggan-payne-2011 E];
  - attention goes to the first sentences and the first two words of each line [nielsen-2006 H];
  - precision falls later in a generation, so the core belongs first and the tail is riskiest [min-2023 E];
  - late information is a failure even when it is accurate (13% "untimely") [grayson-1981].
- Sentence and paragraph level:
  - the given part comes first so the antecedent can be found [clark-haviland-1977];
  - old-first paragraphs were read faster and recalled better, and readers re-order reversed text themselves [vandekopple-1980 E];
  - topic position and stress position [gopen-swan-1990];
  - old to new, with the payload at the end [williams-1981];
  - focus, then inspect, with the decisive item last [thomas-turner-1994];
  - heavy last [gibson-1998].
- **Apparent conflict resolved:** "answer first" governs which *sentence* comes first. "Old first" governs where the new item sits *inside* each sentence. Vande Kopple's example: write "The fix is a 30-second timeout", not "A 30-second timeout is what fixes it".
- Exceptions that put something before the answer:
  - a condition that changes the instruction (STE 5.4; the CAP 413 runway designator before the clearance);
  - the uncertainty status of an uncertain answer [kim-2024];
  - a departure from what the user expects [monan-1986; grayson-1981].
- Duggan & Payne: do not front-load *everything*. Readers who stay keep reading.

## T13. Labels and emphasis: scent and signaling

- Cue words predict value by association with the goal. High-base-rate words ("issues", "overview", "details") carry near-zero scent. [pirolli-card-1999 T; chi-pirolli-2001 E]
- Proximal cues beat destination content. [chi-pirolli-2001]
- Headings gate attention (91% vs 68% of clicks). Confusable sibling labels mislead. A label must predict its content. [blackmon-2002 E; blackmon-2003 E]
- Repairing a label means choosing different words, not fewer words (an equal-length relabel took cosine from .97 to .23). [blackmon-2003]
- Meaningful headings enable layer-cake scanning. Repeated bullet lead words get skipped. [nielsen-2006]
- Signaling adds no content (d = .41). Over-signaling cancels the effect (27 organizers gave d ≈ 0). Bold only the load-bearing term. [mayer-fiorella-2014]
- Flashing, salient but irrelevant cues hurt (g = -.56). [schneider-2018]
- Match urgency to priority. A low-priority alert that sounds urgent destroys the meaning of the real warning. State a warning once and escalate only on evidence it was missed. [patterson-1982-auditory-warning-guidelines H]

## T14. Hedging and calibration: hedges are content when calibrated, noise when uniform

- A first-person hedge raised user accuracy from 63.9% to 72.8%. Hedging *correct* answers cost up to 11.7 points. Users read the hedge as "couldn't reconcile an answer". They rarely clicked sources (2.7-7.2%). [kim-2024 E]
- Long explanations raise confidence without improving discrimination (AUC .54 vs .57). Uncertainty phrases matched to the model's confidence raise human AUC to about .69. [steyvers-2025 E]
- Instead of "possibly LA", give the tightest *unhedged* claim that covers every plausible answer ("a coastal city"). Vacuous generalisations ("a positive integer") are a failure, and informativeness drops monotonically with each step back. [jiang-2025 E]
- Specific details lower precision. Be only as specific as the evidence supports. [wei-2024 A.7]
- Classic style bans process, liability and worth hedges [thomas-turner-1994]. Pinker: a hedge should be "a choice, not a tic". Nardo's critique: credences are content [pinker-2014].
- A weaker word implicates that the stronger one is false. A superordinate term implicates "I don't know which". [goodman-frank-2016; levinson-2000; horn-1984]
- Ignorance is a marked state, so mark it only when it is real. [bergen-levy-goodman-2016]
- Quality outranks Manner: never cut a qualifier the claim's truth depends on. [grice-1975]

## T15. Volume as a persuasion and confidence cue (a reason not to pad that is social, not cognitive)

- Low-involvement readers count arguments. High-involvement readers punish weak padding (attitude 1.05 for weak/9 vs 4.10 for weak/3). Readers register the count even when they do not process the arguments (perceived 6.60 vs 3.68). [petty-cacioppo-1984 E]
- Many arguments raise perceived expertise *and* perceived persuasive intent, so the net is near zero. Whether more reasons help depends on whether expertise or low intent is valued. "Three is a charm" did not hold. [bergman-2026 E\*]
- Explanation length inflates confidence. [steyvers-2025]
- Raters do not penalise over-description, yet it still costs processing. [engelhardt-2006]
- Overhearers preferred monologues and understood dialogues better. [foxtree-1999]
- **Consequence:** preference or thumbs-up signals are biased toward length and will not detect padding. Evaluate comprehension and calibration instead.

## T16. Completeness: idea units, not words, decide whether a cut is lossless

- Pyramid SCUs: never express a lower-tier unit while a higher-tier unit is missing. Wording overlap does not track content. [nenkova-2004 E]
- A long answer is a bundle of atomic facts (4.4 per sentence). Precision metrics reward saying less, so always check against recall. [min-2023 E]
- F1@K: below the user's K is lossy, and above K only adds risk. Irrelevant facts count as an instruction-following failure. Claude-3-Haiku was penalised for "prioritizing factual precision over recall". [wei-2024 E]
- The largest real-world failure class is content that is *absent*: 37% never sent and 5.5% incomplete, against about 6% garbled or confusable form. [grayson-1981 E]
- Cushing's compression cases: a missing "emergency", a referent-less "OK", an elided subject, a dropped digit. [cushing-1994 H/case]
- Qualifiers that are necessary conditions (version, scope, exception) are essential characteristics. Dropping one widens the claim. [iso-tc37-2022; seppala-2017]
- Thomas & Turner: "clarity everywhere is not accuracy everywhere". Qualifications of no consequence to the main issue may go. The test is whether a qualification changes the reader's decision. [thomas-turner-1994]

## T17. Acknowledgement, report and reserved words

- A readback earns its words only if someone checks it. 46 deviations followed bare "Roger/Okay". Silence was read as approval. Crews flew toward terrain because a check that never happened had seemed to pass. [monan-1986 E]
- Name the referent of every status word (the Everglades "OK"). Keep offers and reports distinct: "I can give you FL290" was read back as "cleared to FL290". [cushing-1994]
- Reserve high-consequence words for their literal use (TAKE-OFF vs DEPARTURE). [caa-2026-cap413]
- CAP 413 allows ROGER or WILCO for a *short, clear, unambiguous* instruction "for the sake of brevity". Unnecessary retransmission is a named fault. So restating is for load-bearing values only. [caa-2026-cap413]

## T18. LLM-specific measured gaps (why the harness cannot rely on model defaults)

- No context sensitivity in short-vs-long word choice (ChatGPT and Vicuna, via Cai et al.). [mahowald-2013]
- Good at deletion. Weak at adding the missing actor or verb, at topic strings, and at stripping metadiscourse. Rewrites drift in meaning. [eisenhart-2026]
- Default explanations are long and inflate confidence. RLHF may reward length (speculative). [steyvers-2025]
- Generated certainty expressions are poorly calibrated (Zhou et al. 2023/2024, cited) and LLMs are reluctant to express uncertainty. [kim-2024; goodman-frank-2016 forward list]
- A naive "make it more confident" rewrite degenerates to low informativeness. [jiang-2025]
- **Implication:** harness rules should target *structure and term choice*, meaning adding the actor, the exact term, the connective and the label. More generic deletion pressure would push further toward the compression failure mode.

---

## Open conflicts and weak spots

1. **Signaling for experts.** Schneider 2018 found no reversal. Naumann (in Mayer & Fiorella) found signaling helped low-skill readers only. Kalyuga 2003 found scaffolding hurts experts. Resolution to test: structural cues (headings, bold) may differ from explanatory scaffolding.
2. **Inline vs separate glosses.** Spatial contiguity favours putting the meaning beside its use. Expertise reversal (Oksa 2010; Kalyuga 2003) favours separable glosses for experts. A candidate synthesis is an inline parenthetical for a single term and a separate block for longer scaffolding. Not tested on chat answers.
3. **Discourse markers.** Fox Tree 1999 links markers to overhearer comprehension (r = .73, n = 8). Fox Tree & Mayer 2008 attribute the effect to perspectives instead. Classic style and Morkes say cut filler. Present resolution: keep *repair and contrast* signals, cut chatter.
4. **Scalar defaults.** Levinson treats GCIs as defaults. Bott & Noveck 2004 and Breheny et al. 2006 (unread) dispute their automaticity, though not their content.
5. **Primaries not read**, where conclusions rest on secondary sources:
   - Horn 1984; Levinson 2000 (book);
   - Aylett & Turk 2004; Ferreira 2005; McNamara 1996; Shubert 1995; Sweller 1998; Schneider 2018;
   - Pirolli & Card 1999; Wang & Friginal 2026; Bergman 2026;
   - Thomas & Turner; Pinker; Cushing; Wüster 1979; ISO 704 clause 6.
6. **Transfer gap.** Most load and learning evidence measures learning outcomes in instruction, not task completion in Q&A. The aviation evidence is spoken and ephemeral, while chat text persists. Morrow's data-link arm suggests a persistent medium tolerates more per unit.

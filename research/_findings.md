# Findings: running synthesis (deduplicated, by theme)

Topic: the linguistic and cognitive basis for concise, high-density communication, applied to how an AI assistant should phrase its answers.

Scope: all 113 notes under `/home/user/KIA/research/` (tracks A-G: 22, 16, 21, 18, 14, 11, 11). This version folds in the 36 notes added this round and corrects one earlier claim (the Oksa 2010 control condition, T10).

Working definitions, which this crawl supports:
- **PRECISION**: picking the exact term or structure that carries the whole idea for *this* reader, so the meaning comes back with no loss.
- **COMPRESSION**: dropping material the reader cannot rebuild, so the text gets shorter and meaning is lost.

Source tags are note slugs. Each slug is a filename under `/home/user/KIA/research/<track>/` without `.md`. Evidence grade:
- **E**: experiment or corpus study, read in full.
- **E\***: experiment known only from an abstract or secondary source.
- **H**: expert heuristic or codified practice.
- **T**: formal or theoretical argument.

Rule IDs (R1-R61) refer to `_rules.md`.

---

## T1. The core distinction: every school defines efficiency as success under constraint, not as shortness

- Gibson et al. define an efficient code as one that achieves "successful communication ... with minimal effort". Dropping content the reader cannot recover lowers success, so it is not efficient. [gibson-2019-efficiency, T]
- RSA writes utility as informativeness minus cost. A cut that lowers informativeness more than it lowers cost is a net loss. A vague short word fits many readings (large |w|) and is worse than an exact one. [frank-goodman-2012-rsa-language-games E; goodman-frank-2016-rsa-probabilistic-inference T; bergen-levy-goodman-2016-lexical-uncertainty T]
- Rate-distortion gives the same shape twice:
  - A lexicon trades complexity I(M;W) against accuracy I(W;U). One word for everything has zero complexity and zero accuracy. 110 colour-naming systems sit near the optimal curve, on its steep part where each extra bit buys the most accuracy. [zaslavsky-2018-information-bottleneck-color-naming E+T]
  - RSA's recursion maximises utility *minus effort*, not utility. Below a critical weight the efficient speaker conveys nothing and falls back on a catch-all utterance true of every referent. [zaslavsky-2020-rate-distortion-pragmatics T+E]
- Relevance is effect relative to effort. "Chicken" beats "meat" on effect, and beats the equivalent disjunction on effort. [wilson-sperber-2004-relevance-theory T]
- Wüster calls it precision against convenience: precision is low "loss of cargo" between the intended idea and the evoked one. [wuster-1979-terminologielehre-concept-priority T, UNVERIFIED primary]
- Kuhn's PENS gives the operational version. Precision means less meaning has to be recovered from context. Plain Language and E-Prime shorten text but stay at P1, while one-meaning-per-term languages reach P2. [kuhn-2014-pens-controlled-natural-languages E-survey] Thing Explainer (1,000 most common words, free grammar) is also P1: banning words forced circumlocution ("the one after eight" for nine, "line" for rope) that is *less* precise than full English. [kuhn-2016-thing-explainer-circumlocution E-corpus]
- ISO 704's substitution principle tests a term the same way. A definition must replace the term "without loss of or change in meaning". Removing an essential characteristic changes the extension. Removing a non-essential one does not. ISO 10241-1 separates "rewritten without changing the substance" from content change, and treats deleting "usually" as a content change that must be justified. [iso-tc37-2022-iso704-substitution-principle H; iso-tc37-2011-iso10241-1-one-term-one-concept H]
- **Consequence for the harness:** every cut needs a *recoverability* test, not a length target (R1, R2). The schools disagree only on how to compute recoverability.

## T2. The licence to omit is the reader's context, never the writer's

- Shannon's reduced text loses nothing only for a "mathematically, not just biologically identical" twin. [shannon-1951-prediction-entropy-printed-english E]
- An efficient code sends H[M|C] bits. This assumes speaker and listener share the coding scheme and the context. Leaving out what the context does not carry is inefficient ambiguity. [piantadosi-2012-ambiguity T+E]
- Without a common prior, a code tuned to the speaker is brittle and can fail completely. Robustness costs about lg α extra bits, which grows only logarithmically with the mismatch. Writers should choose α by audience breadth. [juba-2011-compression-without-common-prior T]
- Levinson: omit what the Q and I defaults restore (the stereotype, temporal order, the normal method). Do not omit content the reader could rebuild only by reasoning about this particular context, because that inference is neither fast nor reliable. [levinson-2000-presumptive-meanings-qim T]
- The given-new contract fails on *computability* when the listener lacks the bridge. Clark's bridging taxonomy ranks bridges by predictability: identity < necessary part < probable part < inducible part or optional role. Readers stop at the shortest bridge; anything beyond it must be stated. [clark-haviland-1977-given-new-contract E; clark-1975-bridging-shortest-bridge T]
- Overhearers who heard everything still lose accuracy: 88% vs 99%, and 68% for late joiners. More time does not help. [schober-clark-1989-addressees-overhearers E]
- **The reader's memory is lossy; the model's context is not.** Measured with long-context LMs, per-word surprisal falls steeply over a document's opening and then levels off, so entropy-rate constancy does not hold for a perfect-memory reader. A human with lossy memory finds distant earlier material less available than the model does, so an assistant that judges redundancy by its own context will under-repeat. [verma-2023-revisiting-entropy-rate-constancy E] (R44)
- **Assistant-specific corollary, repeated in at least 10 notes:** tool output, files the assistant read, its private reasoning and labels it coined are *not* the user's context. Treating them as given is the writer's-prior error. [piantadosi-2012, juba-2011, clark-haviland-1977, aylett-turk-2004, williams-1981 ("they all seem familiar, to you"), pinker-2014 (curse of knowledge), blackmon-2002 (developer blind spot), engelhardt-2006 (speaker-salience over-description), hinds-1999 (experts underestimate novice difficulty; debiasing by introspection fails), mensh-kording-2017 ("the world's least qualified person to judge your writing")]
- Introspection does not fix it: in Hinds's studies more expertise meant worse prediction of novice time, resistant to debiasing; Tullis & Feder (read inside the note) find the failure is a lack of diagnostic cues about the other person, not over-reliance on one's own knowledge. [hinds-1999-curse-of-expertise E\* for Hinds, E for Tullis & Feder] (R31)

## T3. The exact term is shorter *and* stronger, but only for a reader who holds its concept

- Specificity carries more information at the same length:
  - "chicken" vs "meat" [wilson-sperber-2004];
  - the size principle [frank-goodman-2012];
  - the strongest true scalar term (Q) [horn-1984, levinson-2000];
  - "It rained every day for a week" [strunk-1918];
  - lexical fit [thomas-turner-1994];
  - an exact vocabulary condenses text where Basic English expands it [shannon-1948]; circumlocution in common words loses meaning [kuhn-2016].
- A named term is a pointer. It keeps a link to the full definition that an inline paraphrase loses (Seppälä G6.2). One cover term can replace a list of examples. [seppala-2017-definition-writing-guidelines H]
- The limit: a term is precise only within a community that shares its concept [cabre-2002-doors-theory-terminology]. A term is one element for a reader with the schema and many interacting elements for a reader without it [chen-kalyuga-sweller-2017 T; sweller-1998 T; kalyuga-2003 E-review; kalyuga-2007 E\*-review]. Unfamiliar labels had the lowest navigation success of any label problem, added +1.66 clicks per task, and were the hardest defect to repair (75% vs 87%) [blackmon-2002 E; blackmon-2005 E]. Paraphrase "only sometimes" fixes unfamiliarity [blackmon-2003 E].
- The fix that keeps the precision is to keep the term and add a gloss or anchor once. Examples: "Paleontology & Fossils" [blackmon-2003, blackmon-2005]; "Arabidopsis, a flowering mustard plant" costs "no more space" [pinker-2014]; a genus-proximus gloss [seppala-2017, iso-tc37-2022, iso-tc37-2011]; a one-clause gloss in a separate position [chen-kalyuga-sweller-2017]; "idempotent, meaning safe to run twice" [kuhn-2016]. Replacing the term with a vaguer word is the wrong fix in every source.
- Two refinements this round:
  - **Replace a rare word only with an exact common equivalent.** Lessee/lessor -> tenant/landlord improved comprehension in contracts [martinez-2022-poor-writing-legal-language E\*]; replacing a legal term with a vaguer one, or defining it, gave no reliable gain where the concept conflicts with lay belief [masson-waldron-1994-plain-language-contracts E\*]. (R6, R51)
  - **Precision is audience-relative.** *Natriumchlorid* in a kitchen confuses; *Kochsalz* in a chemistry text signals a lack of expertise [koning-2023-relative-univocity-schools T]. A "more technical" word is not automatically more precise.
- A higher-information word carries a cost. Specific details are harder to get right (Wei A.7), and unsupported specificity is false precision (T14). [wei-2024-long-form-factuality-f1-at-k E; jiang-2025-conformal-linguistic-calibration E]

## T4. Wordiness is not neutral padding: length carries meaning (markedness)

- Division of pragmatic labour: a periphrastic form signals a non-stereotypical meaning. "Got the machine to stop" means an unusual method. "Not impossible" means bare possibility. [horn-1984, T, second-hand]
- M-heuristic: "was able to fix it" is read as "didn't", and "not unreliable" is read as below "reliable". [levinson-2000]
- **The double-negative case was tested this round.** "Not unhappy" is read as slightly positive, not as "happy", but a reliable minority read negated antonyms as polite negatives ("not dishonest" = "not honest"), in every item and most participants. Read alone, "unhappy" and "not happy" mean the same; seen together from one speaker, readers infer two meanings. So a negated-antonym hedge gives each reader one of two incompatible readings. [tessler-franke-2018-not-unreasonable-negated-antonyms E] (R9)
- The meaning is *derived*, not stipulated, in Bi-OT, signalling games [vanrooij-franke-2026-biot-games-horn-division] and RSA with lexical uncertainty [bergen-levy-goodman-2016; tessler-franke-2018]. Speakers reach the pairing even in one-shot games.
- Excess content makes hearers infer that there is "some particular POINT" to it. [grice-1975]
- A redundant modifier makes listeners look for a contrast that does not exist (a garden path of about 300 ms). [engelhardt-2006 E]
- Counter-evidence: many synonym pairs show no implicature difference (*mare* / *adult female horse*, Davis 2016, via SEP). An anti-Horn equilibrium is also stable, so a reader trained on habitually inflated phrasing stops reading length as a signal. [horn-1984; vanrooij-franke-2026]

## T5. One concept, one term, held across the answer

- STE requires one word, one meaning and one part of speech, with no synonyms for an item (Rules 1.3, 1.11, 9.4). [asd-2025-ste100 H]
- ISO 10241-1 makes it normative: avoid one term for several concepts and several terms for one concept, and use fixed terms consistently within a document (4.1.1, 4.2). [iso-tc37-2011 H]
- Fixed meaning per term is what lifts a controlled language from P1 to P2. [kuhn-2014]
- Univocity is *relative*: Wüster's own "relative Eineindeutigkeit" (unambiguous in context) is the workable middle that every post-Wüster school ends up needing, including Roelcke and Temmerman. [wuster-1979; koning-2023 T]
- Synonym switching signals a new perspective or a new referent (principle of contrast). Pacts persist even when they are over-specific (52-69% retention). [brennan-clark-1996 E] Two near-synonyms from one speaker are read as two meanings [tessler-franke-2018 E]. An epithet swap ("the rancher" for an already-named man) reads as a new person [clark-1975].
- A new synonym is a new discourse referent and adds integration cost. [gibson-1998-dependency-locality E]
- Rotating synonyms adds effort and no information; a stable one-to-one code is the efficient solution, and RSA's flaw is that it varies wording at random at no gain. [zaslavsky-2020]
- Repeating content words is what makes later text predictable in the useful way (the cache effect); novelty should go into claims, not into new wording for old concepts. [genzel-charniak-2002-entropy-rate-constancy E]
- "Resist the temptation to use a different word to refer to the same concept—doing so makes readers wonder if the second word has a slightly different meaning." [mensh-kording-2017 H]
- Repeated words are fine; repeated propositions are not. A repetition discriminator aimed at the *natural* rate of word repetition, not zero, because words do recur. [holtzman-2018-cooperative-discriminators-gricean E]
- Switching synonyms across procedure steps is the ambiguity that SE removed. [shubert-1995 E\*]
- Repeating the noun instead of an ambiguous pronoun is referential cohesion. It is precision for every reader, not padding. [mcnamara-1996 E\*; vandekopple-1980 E]
- Exceptions:
  - A second name is acceptable for a deliberately different view or register (Kochsalz/Natriumchlorid) when marked. [wuster-1979; koning-2023]
  - Switch when the old term has become wrong, and mark the switch. [brennan-clark-1996]
  - Pacts reset for a new reader. [brennan-clark-1996; schober-clark-1989]
  - Fully uniform N4 text reads "clumsy and repetitive". [kuhn-2014]
  - Cushing's AIR prototype planned *random synonym variation* to fight habituation. That runs against fixed phraseology and was never tested. [cushing-1994]
- Real technical texts usually fail to mark their synonyms, so the "context indicators" the descriptive schools require are mostly absent in practice. [koning-2023]

## T6. Grounding: short labels are earned, belong to a partner, and must be re-expanded for new readers

- Descriptions shrink after acceptance: 41 words to 8 [clark-wilkesgibbs-1986], and 73 to 13 [schober-clark-1989]. A first mention describes. Later mentions refer with a unitary term. Shortening works by simplification or narrowing to a distinctive part. Procedural handles ("the second one", 2% of references) lose to permanent properties. [clark-wilkesgibbs-1986 E]
- **Humans shorten by deletion; LLMs shorten by substitution.** In repeated reference games, humans drop words from the established description ("dirty truck going towards the bridge" -> "dirty truck"). GPT-4, Gemini and Claude 3 either lengthen later messages or, when told to shorten, keep swapping in new words ("bridge construction" -> "overpass work" -> "concrete mixer"). Only an explicit "reuse previous words, then freeze the message" instruction produced human-like convergence. Model listeners understood terse human conventions *worse* without the history. [hua-artzi-2024-talk-less-conventions E] (R8, R29, R37)
- Long form first, short form after. Speakers choose the short form when context predicts it. ChatGPT and Vicuna preferred the *long* form 70-80% of the time and barely responded to context (ChatGPT vs humans β = -3.14). [mahowald-2013 E; piantadosi-2011 E; cai-2024-llms-resemble-humans-language-use E] Caveat: ChatGPT's group × context interaction was not significant, so its context sensitivity is not shown to be smaller than humans', only non-significant alone. [cai-2024]
- Only positive evidence grounds a term: an acknowledgment, a relevant next turn that shows *correct* understanding, or continued attention. Silence is not acceptance. [clark-brennan-1991-grounding-communication T] (R7, R35)
- Overhearers are less accurate and less calibrated. They act confidently on the wrong referent. [schober-clark-1989]
- Seeing the rejected alternative ("turkey", not "ostrich") helped overhearers more than a clean monologue of equal length. Discourse and repair markers correlated with comprehension. [foxtree-1999 E, n = 8 pairs]
- A chat reader is closer to "distant responsibility" than to a live partner, because feedback is coarse and silence is not acceptance. Shorten references less aggressively than face-to-face speakers do, and treat the user's own correct reuse of a term as the clearest sign it is accepted. [clark-wilkesgibbs-1986; clark-brennan-1991]

## T7. Grounding in a text medium: pay formulation cost up front, but clarify only where readings diverge (new theme)

- Chat has reviewability and revisability, but no copresence, simultaneity or mid-turn feedback. Clark & Brennan predict for such media: other-initiated repair is "very costly indeed", so speakers revise before sending and "do more within a turn". A terse answer that triggers a clarification round raises total collaborative effort. [clark-brennan-1991 T] This is the medium-level case against compression.
- But fault cost is also higher in a revisable medium, so the cheap grounding technique is precision: the exact term plus one checkable gloss or example, not restating the same thing several ways. [clark-brennan-1991]
- Techniques by content type: verbatim-critical content (numbers, names, paths) gets exact display in conventional chunks; conceptual content gets one precise term plus one check. Secure the referent before predicating anything of it (referential installments). A trial reference ("assuming you mean the staging config") is the written try marker. [clark-brennan-1991] (R28, R42, R43)
- LLMs ground far less than humans: 77.5% fewer grounding acts in the same context; ChatGPT never clarified in two of three datasets. Placement also differs (clarification κ ≈ 0.23). DPO/PPO *erode* grounding (R = -0.70 to -0.89), because single-turn preference data disprefer questions (13.77% of preferred vs 18.35% of dispreferred responses contain one). [shaikh-2024-grounding-gaps-llm E]
- The prompt fix over-corrects: told to ground, the model asked follow-ups 50% above the human rate and clarification placement fell below chance (κ = -1.65). The target is placement (real ambiguity or high stakes), not rate. [shaikh-2024] (R43)
- Caveat: Shaikh et al. studied social dialogue (support, tutoring, persuasion); their largest gap was empathic acknowledgment, which does not transfer to technical answers. [shaikh-2024]

## T8. Where to spend words: in proportion to surprise, at branch points and identifiers

- Smooth signal redundancy: give little signal to what is predictable and more to what is not. One weak spot sinks the whole message (0.1 × 0.9 = 0.09). [aylett-turk-2004 T + E\*]
- Speakers keep "that" before surprising material. A structure word before a hard claim is a signpost, not filler. [levy-jaeger-2007 E]
- Uneven density lowers acceptability. Spikes (telegraphese) and troughs (padding) both deviate from the language-wide rate. [meister-2021 E]
- Guessing errors cluster "where the line of thought ... branch[es]". Scientific prose is less predictable, so it has less to cut. [shannon-1951 E]
- Density is not flat across an answer:
  - Context-free entropy rises through a document, consistent with later sentences leaning on earlier ones; boilerplate shows up as low-entropy dips ("the terms were not disclosed", the newswire "Great question"). [genzel-charniak-2002 E]
  - But with long-context models the in-context surprisal *falls* sharply over the opening and then levels off, and headlines help only for about the first 100 words. The opening is where uncertainty is highest, so the first sentence does the most work: spend it on the frame (the direct answer or the governing term). A heading cannot do the opening's job. [verma-2023 E] (R23, R33)
  - Rate varies with hierarchical discourse position (Tsipidi et al. 2024, abstract via both notes), so constancy is a heuristic, not a target.
- Fix names and identifiers drove the repeat requests. Spell them out and repeat them, and cut filler instead. [prinzo-2009 E]
- Add redundancy only where confusion is possible: "degrees" after headings ending in zero, "hectopascal" below 1000. [caa-2026-cap413 H]
- Redundancy should go "in the proper way to combat the particular noise structure". For an assistant the noise is skimming and misreading of critical values. [shannon-1948 T]
- Truncation is the reader's own compression: only 52% of altimeter settings were read back at all, and 14% of those kept only the last two digits. State critical values in full, once, in a form that is hard to truncate. [cardosi-1996-tracon-readback-complexity E] (R22, R42)
- A redundant modifier adds information only if it is *more precise* than the term it backs up. Add the path or identifier next to the vague noun, not a second vague paraphrase. [degen-2020 E]
- Mark the atypical and leave the typical unstated ("blue banana", never "yellow banana"). [degen-2020; horn-1984; levinson-2000; vanrooij-franke-2026]
- **Name the distinguisher against the live alternative.** A neural pragmatic speaker that reranks fluent candidates by whether a listener would pick the target over the distractor beat a direct contrastive model in human reference games (81% vs 69% vs 64% literal). Context changes the content: the same scene is described by whatever separates it from *this* distractor. Pure fluency (λ = 1) gives fluent, generic, non-discriminating text; pure discrimination (λ = 0) gives odd text; a small fluency weight keeps both. [andreas-klein-2016-neural-pragmatic-speaker E] (R11, R38)

## T9. Grammatical glue, logical connectives and flat syntax are not the place to save words

- STE Rule 4.2: "your sentence will be shorter, but it will not be easier to read". "Remove the bolt and stop" misreads "stop" as a verb. [asd-2025-ste100]
- Do not send reduced text. Articles, subjects, connectives and units are cheap to read and are what a non-twin reader needs. [shannon-1951]
- Telegraphic text piles surprisal onto a few words, which is costly under a superlinear cost function. [meister-2021]
- STE schedules integration and does not remove it. Deleting "because", "so" or "unless" when splitting a sentence forces the reader to rebuild the link. [wang-2026-ste-eye-tracking-scheduling E\*]
- Adjacent sentences are read as consequence by default (the shortest bridge). If the relation is contrast, condition or none, it must be written. [clark-1975] (R41)
- Revisions grew longer when the restructuring exposed a missing causal link. That gap is the curse of knowledge. [gopen-swan-1990 H]
- Deleting the *character* (the actor) makes a sentence look shorter and makes it ambiguous: "Who fears? Who recommends?" [williams-1981 H]
- **Structure, not concepts, makes expert text hard.** Contracts carry far more low-frequency jargon, center-embedding, passives and odd capitals than nine baseline genres; center-embedding hurts recall most, "even for experienced readers". Pulling an embedded definition into its own sentence (longer, nothing lost) helped most; swapping jargon for an exact common word helped less. [martinez-2022 E\*] Lawyers recalled and understood plain-register clauses better than legalese with identical content, with no register × training interaction, and rated the plain versions no less enforceable. [martinez-2023-lawyers-legalese-plain-register E] Plain words and syntax (stage 2) was the only redrafting stage the abstract credits with a reliable gain; absolute comprehension stayed "very low" where concepts conflicted with prior belief. [masson-waldron-1994 E\*] (R49, R50, R51)
- ChatGPT's "concise" rewrite does well at deletion. It fails to *add* the missing actor or verb, and it drifts in meaning ("importance of X in achieving" became "X achieving"). [eisenhart-2026 H, single rater]
- Clarity overrides the brevity rules. [orwell-1946, rule vi]
- Boundary: in a closed, trained vocabulary (ATC phraseology), receivers drop anchor words harmlessly. Most "omission" readback errors were benign. [prinzo-2009] Krifka et al. warn that banning all ellipsis or pronouns would make text too verbose. [cushing-1994]

## T10. Redundancy, coherence and split attention: say it once, beside what it explains

- If a source is self-sufficient, delete its echo. Diagram only scored 34.8 in 60 s, against 26.6 in 92 s for diagram plus integrated text. Asking readers to process the redundant text doubles time and lowers scores. [chandler-sweller-1991 E] Redundancy is defined by whether a source is intelligible alone, not by length. [castro-alonso-2021-five-strategies-learner-managed-load E-review]
- Duplicated narration plus on-screen text was the *worst* of three formats. [kalyuga-1999 E]
- If neither source is intelligible alone, integrate them. Moving the meaning elsewhere (a legend, "see above") hurts even when nothing is deleted. [chandler-sweller-1991 Exp. 6; mayer-fiorella-2014 spatial contiguity d = 1.10; kalyuga-1999] But over-integration has its own cost: cramming everything into one place can make a display unreadable. [dejong-2010-clt-critique-load-types T]
- Coherence principle: cut true but interesting off-goal "seductive details" (23 of 23 tests, d = .86). The test is the user's goal, not accuracy. [mayer-fiorella-2014 E-review]
- **Less is more, measured.** An 80-word summary (five captioned illustrations of the causal steps, verbatim from the lesson) did as well as or better than the full 600-word lesson, and better than lesson plus summary; transfer d = 0.93-2.31 per Mayer 2002. Removing captions or pictures killed the benefit; adding text back reduced it. The cut was elaboration around the steps, not the steps. [mayer-1996-less-is-more-summaries E\*] (R54)
- Prose that restates code, a table or a list is the redundancy effect. Restatement is allowed only when it adds a relation or an implication. [sweller-1998]
- **Entailment, not overlap, is the test.** A sentence entailed *by* earlier text adds nothing (Quantity); a sentence that entails an earlier one and is more specific adds precision. In ablation, only the repetition scorer improved overall quality on its own, so semantic repetition is the main defect of long generated text. Residual paraphrase ("would definitely recommend this hotel" ... "I'd recommend this hotel") evades n-gram checks. [holtzman-2018 E] (R40)
- Short, non-identical redundancy placed next to its referent is the documented exception (Mayer & Johnson 2008; de Koning 2017). [dejong-2010; castro-alonso-2021] (R19 guard)
- Holding information constant and cutting only non-information words gave +58% usability. Cutting promotional and self-referential words gave +27%. [morkes-nielsen-1997 E]
- Five to ten elaborating examples per link added nothing. [blackmon-2003 E]
- Repetition is invisible to F1@K, but the authors call it unhelpful. A fact-count objective will not catch it, so the harness must. [wei-2024]
- Redundancy speeds skimmers' drop-off: once the gist is inferable, restating paragraphs get skipped and lower the threshold for what follows. [duggan-payne-2009-text-skimming E]

## T11. Calibrate to the reader: expertise reversal (with a correction)

- Aids that help novices become load for experts, because "redundant information is frequently difficult to ignore". Fade guidance rather than switching it off. [kalyuga-2003; kalyuga-2007 E\*-review, abstract only]
- **Correction this round (Oksa 2010).** The corpus had cited Oksa et al. as "integrated glosses helped novices and footnotes helped experts". The primary thesis shows every experiment compared line-by-line paraphrase *beneath each line* against the original with *no notes at all*. No footnote condition was tested. Novices gained strongly (d ≈ 1.3-2.0); experts reversed sharply (load d = 3.02, complex items d = 2.94), because 7 of 11 cross-checked each gloss against their own reading and lost flow. Intermediates got lower load but no comprehension gain. [oksa-kalyuga-chandler-2010-shakespeare-explanatory-notes E] (R20, R55)
- **The real inline-vs-separate test is Yeung et al. 1998**, a crossover on two outcomes: weak readers understood more with integrated definitions but learned fewer words; strong readers understood less but learned more words. A trailing glossary hurt weak readers' comprehension. [yeung-jin-sweller-1998-inline-vocabulary-definitions E\*, abstract only] (R56)
- Two-question gate: elaborate only if the content is high in element interactivity *and* the reader lacks the schema. A lookup never needs scaffolding. For experts, give steps without the reason for each step (van Gog 2008). [chen-kalyuga-sweller-2017] de Jong cautions that "extraneous" vs "germane" is not cleanly separable and depends on the reader and goal; cite the specific effects, not "germane load". [dejong-2010]
- Read the depth of the user's first move, not the length of their message (r = .92). Fall back to full steps when the signal is weak, and re-estimate on every turn. [kalyuga-sweller-2004 E] Add the effort signal: the same depth reached with reported struggle indicates a fragile schema. [kalyuga-sweller-2005-rapid-dynamic-assessment-efficiency E\*, abstract only]
- Calibrate to observable cues, not introspection; when cues are missing and the gap matters, ask one question or state the assumed level, and err toward the one extra step, kept skippable. Concrete steps first, then the principle by name (Hinds et al. 2001: abstract expert instructions hurt novices on the task but helped transfer). [hinds-1999] (R31, R53)
- Split cohesion into two kinds:
  - *referential* devices (nouns instead of ambiguous pronouns, consistent terms) are needed by every reader;
  - *explanatory* bridges can be dropped for experts.

  This distinction is the cleanest precision-versus-compression line in the track. [mcnamara-1996]
- **Expertise licenses dense terms, not dense syntax.** The legalese penalty was the same for lawyers and laypeople. [martinez-2023] (R49)
- Telegraphic STE helped stronger readers more, so it is not a safe default for novices. [wang-2026]
- The assistant is the "instructor": novices cannot reliably filter redundancy themselves, so the assistant should curate. Learner-managed formats suit experts (prediction, "somewhat speculative"). [castro-alonso-2021] (R61)
- Exception: signaling (headings, bold) showed *no* expertise reversal. The effect for high-knowledge learners was numerically larger. [schneider-2018 E\*] This conflicts with Naumann et al. (in mayer-fiorella-2014), where signaling helped low-skill readers but not high-skill ones. **Open conflict.**

## T12. Packaging: count idea units, cap them per unit, split rather than delete

- Readback problems run 1-3% for 1-4 elements and 8% for 5 or more. Clearances with 5 or more elements were 4% of all clearances and carried 26% of the errors. Long messages get *partial* readbacks, which removes the check. [cardosi-1993 E]
- The TRACON sequel finds the same direction but a weaker, non-linear curve (0.5-0.9% at 1-3 elements, 1.5% at 4, 3.6% at 5), because predictable, expected or "logically grouped" items do not add the same load. Element count is not memory load; unrelated items are what count. [cardosi-1996 E] (R21 guard)
- Topic count drives real content errors, rising at 3-4 topics. Token load drives only benign anchor-dropping. [prinzo-2009 E]
- The same four commands split into two messages halved readback errors (18% to 8%) and clarification requests (65% to 33%). Close-together short messages caused *delayed* digit intrusions. A persistent medium (data link) tolerated long messages. [morrow-1993 E]
- GA pilots: readback errors .00/.03/.06/.07 and clarification requests .01/.03/.08/.17 for 2-5 speech acts, with the jump after 3 (call sign plus 2 instructions); costs largest for older and lower-span pilots; pilots reordered instructions in long messages. A shorter grouped number format helped only slightly, and pilots trained on digit-by-digit form translated grouped numbers back, so a compact but unfamiliar format has a transition cost. [morrow-prinzo-1999-grouped-numbers-message-length E] (R21, R42)
- Misheard numbers cluster in single sentences that call for two or more actions. [monan-1986 E]
- Several numbers in one clearance invite transposition; same-shaped values in one message get swapped ("three one zero ... two one zero"). [grayson-1981 E; cardosi-1996 E]
- "Too long" means more emphasis-worthy items than stress positions. An announced list fills one stress position, with each item getting its own. [gopen-swan-1990 H]
- The new-referent count between dependents is the cost, and word count is not. [gibson-1998 E]
- Break at idea boundaries: segments that cut an idea unit hurt, breaks between units do not (Boltz 1992 via review). [castro-alonso-2021] (R52)
- Exceptions: a long procedure is fine when it was asked for (Cardosi's "clearance delivery" case). Controlled formatting pays only for complex content, so simple answers need none. [cardosi-1993; shubert-1995]

## T13. Order: answer first at the top of the response; old before new inside the sentence

- Response and unit level:
  - inverted pyramid [morkes-nielsen-1997];
  - readers satisfice in order and leave when scent drops [fu-pirolli-2007-snif-act E; card-2001-web-behavior-graph-scent E, descriptive];
  - rank by yield so a reader who stops early has the best material [pirolli-card-1995];
  - the first sentence of each paragraph gets the most gaze [duggan-payne-2011 E];
  - attention goes to the first sentences and the first two words of each line [nielsen-2006 H];
  - opening surprisal is highest, so the first words reduce uncertainty most [verma-2023 E];
  - precision falls later in a generation, so the core belongs first and the tail is riskiest [min-2023 E];
  - late information is a failure even when it is accurate (13% "untimely") [grayson-1981];
  - one message per answer, stated first, with the context that makes it credible [mensh-kording-2017 H].
- Sentence and paragraph level:
  - the given part comes first so the antecedent can be found [clark-haviland-1977];
  - old-first paragraphs were read faster and recalled better, and readers re-order reversed text themselves [vandekopple-1980 E];
  - topic position and stress position [gopen-swan-1990]; extended to paragraph and document as context-content-conclusion [mensh-kording-2017];
  - old to new, with the payload at the end [williams-1981];
  - focus, then inspect, with the decisive item last [thomas-turner-1994];
  - heavy last [gibson-1998].
- **Apparent conflict resolved:** "answer first" governs which *sentence* comes first. "Old first" governs where the new item sits *inside* each sentence. Vande Kopple's example: write "The fix is a 30-second timeout", not "A 30-second timeout is what fixes it".
- Exceptions that put something before the answer:
  - a condition that changes the instruction (STE 5.4; the CAP 413 runway designator before the clearance);
  - the uncertainty status of an uncertain answer [kim-2024];
  - a departure from what the user expects [monan-1986; grayson-1981];
  - a one-clause interpretation when the request is ambiguous [shaikh-2024; clark-brennan-1991].
- Do not front-load *everything*. Readers who stay keep reading [duggan-payne-2011]; reading the first half of every paragraph was no better than reading the second half, and the value of skimming came from sampling across units, so every unit must carry its own point [duggan-payne-2009]. Skimmers keep stated main ideas but lose inferences derivable from details, so state conclusions explicitly [duggan-payne-2009] (R59). Navigation cost removed the benefit of skimming, so units must be cheap to jump between.
- Report findings, not the chronology of the work. [mensh-kording-2017; thomas-turner-1994] (R60)

## T14. Labels and emphasis: scent and signaling

- Cue words predict value by association with the goal. High-base-rate words ("issues", "overview", "details") carry near-zero scent. [pirolli-card-1999 T; chi-pirolli-2001 E]
- Proximal cues beat destination content. [chi-pirolli-2001]
- Headings gate attention (91% vs 68% of clicks). Confusable sibling labels mislead. A label must predict its content. [blackmon-2002 E; blackmon-2003 E]
- Navigation difficulty is predictable from label wording alone: +1.66 clicks for an unfamiliar correct label, +1.46 for weak scent, +0.75 per competing link under a competing heading; repairs aimed at predicted-serious problems succeeded 93% of the time. Decoy labels that look relevant but hold nothing are the largest per-unit cost. [blackmon-2005 E] (R33)
- Repairing a label means choosing different words, not fewer words (an equal-length relabel took cosine from .97 to .23). [blackmon-2003]
- Scent-following and patch-leaving: users stayed on a site while scent was high and left when it dropped; faster-to-read text and better scent are separate levers, and on hard tasks scent dominates. [card-2001 E-protocol, n = 8 protocols, no inferential test]
- Meaningful headings enable layer-cake scanning. Repeated bullet lead words get skipped. [nielsen-2006] Headers and lead lines should state conclusions, not topics. [mensh-kording-2017]
- Signaling adds no content (d = .41). Over-signaling cancels the effect (27 organizers gave d ≈ 0). Bold only the load-bearing term. [mayer-fiorella-2014] Signals that *add* elements (on-screen hands) acted as negative redundancy; marking an existing word adds nothing to process. [castro-alonso-2021] (R34)
- Flashing, salient but irrelevant cues hurt (g = -.56). [schneider-2018]
- Match urgency to priority. A low-priority alert that sounds urgent destroys the meaning of the real warning. State a warning once and escalate only on evidence it was missed. [patterson-1982-auditory-warning-guidelines H]

## T15. Caveats are alarms: reliability, not volume or emphasis, earns attention (new theme)

- About 90% of participants matched their alarm-response rate to the alarm's true-alarm probability (25/50/75% conditions); about 10% responded all-or-none. Urgency and workload had only modest effects next to reliability. So false alarms lower responses to every later alarm, true ones included. [bliss-1995-probability-matching-cry-wolf E\*, abstract only]
- An alarm works only if the trigger and the alarm philosophy are right before the sound design matters; with 85-99% false-alarm rates, good design is wiped out. Keep alarms to a minimum, map urgency to hazard, and make the signals in a set maximally *different*; uniform melodies are confused, while meaning-bearing sounds (auditory icons, speech) are easiest to learn. [edworthy-2013-medical-audible-alarms-review H/review]
- For an assistant: every generic "consult a professional", "results may vary" or "be careful" is a false alarm that lowers attention to the real caveat. Bold or "IMPORTANT:" cannot restore credibility that frequent false caveats spent. The fix is not deleting warnings (compression drops the true alarm) but making each specific and conditional: hazard, condition, action. [bliss-1995; edworthy-2013; patterson-1982] (R45, R34)
- Recurring status or severity labels should be plain, self-describing words from a small, mutually distinct set, not learned codes. [edworthy-2013; patterson-1982] (R30)
- The all-or-none minority implies the critical warning needs a position a skimmer cannot miss: the first line or the risky step, not a closing block of disclaimers. [bliss-1995]

## T16. Hedging and calibration: hedges are content when calibrated, noise when uniform

- A first-person hedge raised user accuracy from 63.9% to 72.8%. Hedging *correct* answers cost up to 11.7 points. Users read the hedge as "couldn't reconcile an answer". They rarely clicked sources (2.7-7.2%). [kim-2024 E]
- Long explanations raise confidence without improving discrimination (AUC .54 vs .57). Uncertainty phrases matched to the model's confidence raise human AUC to about .69. [steyvers-2025 E]
- Instead of "possibly LA", give the tightest *unhedged* claim that covers every plausible answer ("a coastal city"). Vacuous generalisations ("a positive integer") are a failure, and informativeness drops monotonically with each step back. [jiang-2025 E]
- Soft categories are efficient when some loss is tolerated, so a calibrated graded word is not vagueness when the belief really is graded; the failure is a hard claim hiding uncertainty or a hedge with no gradient. [zaslavsky-2018]
- **Hedges are two different operations.** Approximators change the proposition (adaptors "sort of blue"; rounders "about 3.2 kg"); shields change commitment (plausibility "I think"; attribution "according to her estimates"). Deleting an approximator asserts a different, often false claim. In ICU rounds, 39% of 97 self-repairs *added* a hedge, mostly shields, and 21% of attribution shields occurred in self-repairs, so physicians deliberately insert them as content. When no shared term fits, the best choice is the nearest shared term plus an adaptor, not a private coinage and not silent approximation. [prince-frader-bosk-1982-hedging-approximators-shields E-corpus] (R57, R58)
- Specific details lower precision. Be only as specific as the evidence supports. [wei-2024 A.7]
- Classic style bans process, liability and worth hedges [thomas-turner-1994]. Pinker: a hedge should be "a choice, not a tic". Nardo's critique: credences are content [pinker-2014].
- A weaker word implicates that the stronger one is false. A superordinate term implicates "I don't know which". [goodman-frank-2016; levinson-2000; horn-1984]
- Ignorance is a marked state, so mark it only when it is real. [bergen-levy-goodman-2016]
- Quality outranks Manner: never cut a qualifier the claim's truth depends on. [grice-1975] ISO 10241-1 treats "usually" as content to be edited deliberately. [iso-tc37-2011]
- Verbal probability terms are understood in a tight speech community (Prince et al.) but are inconsistent out of context (Bryant & Norman 1979); an assistant talks to strangers, which argues for a fixed word-to-confidence mapping or a number. [prince-frader-bosk-1982, inference]

## T17. Volume as a persuasion and confidence cue (a reason not to pad that is social, not cognitive)

- Low-involvement readers count arguments. High-involvement readers punish weak padding (attitude 1.05 for weak/9 vs 4.10 for weak/3). Readers register the count even when they do not process the arguments (perceived 6.60 vs 3.68). [petty-cacioppo-1984 E]
- Many arguments raise perceived expertise *and* perceived persuasive intent, so the net is near zero. Whether more reasons help depends on whether expertise or low intent is valued. "Three is a charm" did not hold. [bergman-2026 E\*]
- Explanation length inflates confidence. [steyvers-2025]
- Raters do not penalise over-description, yet it still costs processing. [engelhardt-2006]
- Overhearers preferred monologues and understood dialogues better. [foxtree-1999]
- Crowd raters preferred plainer generated text over the richer human original (53/18/29). [holtzman-2018]
- Single-turn preference data disprefer clarifying questions, and preference optimisation erodes grounding. [shaikh-2024]
- **Consequence:** preference or thumbs-up signals are biased toward length and against questions, and will not detect padding. Evaluate comprehension and calibration instead (R36).

## T18. Completeness: idea units, not words, decide whether a cut is lossless

- Pyramid SCUs: never express a lower-tier unit while a higher-tier unit is missing. Wording overlap does not track content. [nenkova-2004 E]
- A long answer is a bundle of atomic facts (4.4 per sentence). Precision metrics reward saying less, so always check against recall. [min-2023 E]
- F1@K: below the user's K is lossy, and above K only adds risk. Irrelevant facts count as an instruction-following failure. Claude-3-Haiku was penalised for "prioritizing factual precision over recall". [wei-2024 E]
- **The verifiable claim is the precision unit.** A claim is "a single event or state with all necessary modifiers"; dropping the anchor ("a systematic review ... in 2019", which review?) made 42% of claims inconclusive, mostly because they were "too general to be verified". Some claims are inherently long, and relational claims ("X solidified Y") lose meaning if split. Analogies scored as facts get penalised; vague evaluatives ("strategic acumen ensured ... flawlessly") assert nothing checkable. Verifiable-claim density varies about 75-fold by genre (0.03 to 2.31 per sentence). F1@K favours length against terse correct answers. [song-2024-veriscore-verifiable-claims E] (R47, R48)
- The largest real-world failure class is content that is *absent*: 37% never sent and 5.5% incomplete, against about 6% garbled or confusable form. [grayson-1981 E]
- Cushing's compression cases: a missing "emergency", a referent-less "OK", an elided subject, a dropped digit. [cushing-1994 H/case]
- Qualifiers that are necessary conditions (version, scope, exception) are essential characteristics. Dropping one widens the claim. [iso-tc37-2022; seppala-2017; iso-tc37-2011]
- Thomas & Turner: "clarity everywhere is not accuracy everywhere". Qualifications of no consequence to the main issue may go. The test is whether a qualification changes the reader's decision. [thomas-turner-1994] Refine only distinctions that change action; stop splitting before diminishing returns. [zaslavsky-2018] (R39)
- Readability is not comprehension: plain redrafting raised legal-text comprehension (e.g. 15% to 36%, via Kimble) but left it "very low" where concepts conflicted with lay belief. [masson-waldron-1994] (R51)

## T19. Acknowledgement, report and reserved words

- A readback earns its words only if someone checks it. 46 deviations followed bare "Roger/Okay". Silence was read as approval. Crews flew toward terrain because a check that never happened had seemed to pass. [monan-1986 E]
- Partial and missing readbacks remove the hearback check; 40% of TRACON readback errors went uncorrected, and similar-shaped values were swapped unnoticed. [cardosi-1996 E]
- Name the referent of every status word (the Everglades "OK"). Keep offers and reports distinct: "I can give you FL290" was read back as "cleared to FL290". [cushing-1994]
- Reserve high-consequence words for their literal use (TAKE-OFF vs DEPARTURE). [caa-2026-cap413]
- CAP 413 allows ROGER or WILCO for a *short, clear, unambiguous* instruction "for the sake of brevity". Unnecessary retransmission is a named fault. So restating is for load-bearing values only. [caa-2026-cap413]
- No content-free acknowledgments in task answers; show understanding by the relevant next move (the correct answer, a precise restatement, a targeted follow-up). [shaikh-2024; clark-brennan-1991]

## T20. LLM-specific measured gaps (why the harness cannot rely on model defaults)

- No context sensitivity in short-vs-long word choice, and a default preference for the long form (ChatGPT and Vicuna, 2023). [cai-2024; mahowald-2013]
- Context is not used to resolve attachment ambiguity (two poachers did not shift the parse: 0.06 vs 0.06). What can be assumed: word-meaning priming, structural priming, adaptation to the user's dialect. [cai-2024] (R12)
- Shortening by substitution, not deletion; later messages *lengthen* under a plain instruction; "be shorter" and Gricean prompts produce lexical drift; only an explicit reuse-and-freeze instruction converges. Models "do not perceive the effort or cost needed for communication". [hua-artzi-2024] (R8, R37)
- 77.5% fewer grounding acts; preference optimisation erodes grounding; prompting over-corrects and misplaces it. [shaikh-2024] (R43)
- Self-paraphrase survives surface repetition checks. [holtzman-2018] (R40)
- Good at deletion. Weak at adding the missing actor or verb, at topic strings, and at stripping metadiscourse. Rewrites drift in meaning. [eisenhart-2026]
- Default explanations are long and inflate confidence. RLHF may reward length (speculative). [steyvers-2025]
- Generated certainty expressions are poorly calibrated (Zhou et al. 2023/2024, cited) and LLMs are reluctant to express uncertainty. [kim-2024; goodman-frank-2016 forward list]
- A naive "make it more confident" rewrite degenerates to low informativeness. [jiang-2025]
- A fluent base speaker says what is typical for the topic (the λ = 1 output); generic fluency is the default failure. [andreas-klein-2016]
- **Implication:** harness rules should target *structure, term choice and consistency*: add the actor, the exact term, the connective, the label, the one-clause interpretation, and reuse the established term verbatim. More generic deletion pressure would push further toward the compression failure mode (R37). Every gap above was measured on 2023-2024 models and must be re-tested on the deployed one.

---

## Open conflicts and weak spots

1. **Signaling for experts.** Schneider 2018 found no reversal. Naumann (in Mayer & Fiorella) found signaling helped low-skill readers only. Kalyuga 2003 found scaffolding hurts experts. Resolution to test: structural cues (headings, bold) may differ from explanatory scaffolding.
2. **Inline vs separate glosses (revised).** The earlier framing rested on a misreading of Oksa 2010. What the evidence now says: interleaved line paraphrase hurts experts badly relative to no gloss (Oksa); integrated single-word definitions help weak readers' comprehension and a separate list hurts them (Yeung, abstract only); nothing tested a trailing glossary for experts. Candidate synthesis (R56): no gloss for shown experts, a short appositive at first use for an uncertain reader, no trailing glossary for novices. Not tested on chat answers.
3. **Discourse markers.** Fox Tree 1999 links markers to overhearer comprehension (r = .73, n = 8). Fox Tree & Mayer 2008 attribute the effect to perspectives instead. Classic style and Morkes say cut filler. Present resolution: keep *repair and contrast* signals, cut chatter.
4. **Scalar defaults.** Levinson treats GCIs as defaults. Bott & Noveck 2004 and Breheny et al. 2006 (unread) dispute their automaticity, though not their content.
5. **Concepts vs syntax in expert text.** Martínez et al. 2022 say poor writing, not specialised concepts, drives difficulty; Masson & Waldron 1994 say concepts conflicting with prior belief keep comprehension "very low" after redrafting. Both agree on fixing syntax first; they are measuring different failures (processing vs misconception). The per-feature Martínez results are from an abstract and a press release, and they disagree on whether passives mattered.
6. **Entropy rate.** Genzel & Charniak (2002) support constancy indirectly; Verma et al. (2023) find no clear evidence with long-context models; Tsipidi et al. (2024, abstract only) tie rate to discourse structure. The harness should use "lean on established context, spend the opening on the frame" and not "flatten density".
7. **Primaries not read**, where conclusions rest on secondary sources or abstracts:
   - Horn 1984; Levinson 2000 (book);
   - Aylett & Turk 2004; Ferreira 2005; McNamara 1996; Shubert 1995; Sweller 1998; Schneider 2018;
   - Pirolli & Card 1999; Wang & Friginal 2026; Bergman 2026;
   - Thomas & Turner; Pinker; Cushing; Wüster 1979; ISO 704 clause 6; ISO 10241-1 clause 6.4;
   - new this round: Bliss 1995; Kalyuga 2007; Kalyuga & Sweller 2005; Mayer 1996; Yeung 1998; Hinds 1999; Masson & Waldron 1994; Martínez 2022 (full text blocked).
8. **Transfer gap.** Most load and learning evidence measures learning outcomes in instruction, not task completion in Q&A. The aviation and alarm evidence is spoken or auditory and ephemeral, while chat text persists. Morrow's data-link arm suggests a persistent medium tolerates more per unit. Shaikh's grounding rates come from social dialogue; Hua & Artzi's from visual reference games; Cai's from forced-choice tasks with 2023 models.

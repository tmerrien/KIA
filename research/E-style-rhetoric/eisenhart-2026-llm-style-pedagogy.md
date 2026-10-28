# Eisenhart (2026): Large Language Model Applications for Style Pedagogy

## Citation
Eisenhart, Christopher (University of Massachusetts Dartmouth). "Large Language Model Applications for Style Pedagogy." In Nupoor Ranade & Douglas Eyman (Eds.), *Composing with AI*. Computers and Composition Digital Press, an imprint of Utah State University Press, 2026. Open access, CC BY-NC-SA 4.0.
- Read (full text, every section): https://submissions.technorhetoric.net/ccdp-book/chapters/Style-Eisenhart/eisenhart-full.html. Section pages are index, analysis1-3, discussion and references.
- Book landing page, which lists the chapter under "Style-Eisenhart": https://ccdigitalpress.org/book/composing-with-ai
- Date: the WPA-announcements post of 2026-01-18 announces the book's release (https://wpa-announcements.tracigardner.com/?p=5773). The chapter's colophon still reads "ISBN: XXXX", so the exact date and ISBN are UNVERIFIED.

## Core claim
ChatGPT 3.5 was given Williams & Bizup's *Style* (12th ed.) exercises the way a student would give them, with no optimisation. It reliably finds subjects and verbs and does well on simple concision. It fails wherever the fix is not visible in the input sentence: supplying an implied character, turning a nominalised action into a verb throughout the sentence, keeping a consistent topic string, and choosing the main point to put in stress position. Eisenhart's explanation is that LLMs are "horizontally intertextual": they revise toward what sentences usually do (descriptive) rather than what a style standard prescribes.

## Method
- Model: ChatGPT 3.5. The prompts named "Joseph Williams' principles of Style", but the book was never loaded into the model, because students would not do that.
- Materials: 17 instructor-made subject/verb sentences, then Williams's exercises in sequence: character/action, nominalisations, passives, cohesion/coherence, emphasis, concision and shape.
- Evaluation: a qualitative, single-rater expert judgement by a teacher with 20+ years on this curriculum, against Williams's target revisions. There are no counts beyond the subject/verb test, no inter-rater check, and no repeated sampling. The author notes that outputs varied between runs, and one item was answered correctly only on a second try.

## Key evidence (from the chapter)
- **Subject/verb identification:** 16 of 17 correct. The one miss was "Just one of these ... disks can hold", where the model answered "disk" rather than "one".
- **Over-answering:** asked for *the* subject and verb, it listed five subject/verb pairs, most of them not grammatical subjects. Eisenhart calls this "more information than we wanted ... which might be confusing for students".
- **Phrase instead of head word:** it gave "has been speculation" as the verb, and "The loss of market share to Japan by domestic automakers" as the subject. So it did not isolate the single term the exercise needed.
- **Missing implied characters:** for "There is a need for an analysis of library use..." it returned "Characters: Not specified (general need)", where Williams wants an authorial "we". "Contradictions among the data require an explanation" became "An explanation is required for the contradictions among the data", a passive shuffle with no improvement. It named "hundreds of thousands of jobs" as a character, not "workers". When the instructor supplied the character, it revised well.
- **Partial revision:** in the Lincoln sentence it fixed the first clause but left the nominalised "the South's attack" as the subject of the second. In "The actors' performance of the play was marked by enthusiasm" it found the character but left the sentence passive.
- **Meaning drift in a concise rewrite:** "the importance of community organizers in achieving election day turnout" became "community organizers achieving election day turnout". Eisenhart flags this as more deterministic than the original, so the shorter sentence changed the claim. In the tobacco "shape" item, the revision kept the confusing double negative and "confused the effect of a strong statistical correlation".
- **Topic strings:** in the vegetation passage the subjects alternate between vegetation, plains, the ocean and so on. Even after the instructor marked the intended topic with parentheses, the model produced a near-nonsense sentence: "In regions where (plants) grow most abundantly, richly fertilized plains and river valleys are situated...". In the Thucydides passage it never makes Thucydides the topic, misplaces the invasion, and garbles how anticipation relates to tragedy.
- **Emphasis on single sentences:** mostly good. Sentences end on the main point, using pre-core phrases and "there are"/"it is" shifts. Two sentences end on a timeframe ("in recent years") or a qualifier instead.
- **Concision:** "Overall, CGPT does very well revising for concision." It removes redundant phrases and turns negatives into positives. It is weaker at removing metadiscourse and hedges or stance markers ("I believe", "we can assume", "the first is..."). It does not combine concision with character-as-subject and action-as-verb, even when prompted to.
- **Shape:** it misses a subordinate clause interrupting subject and verb, so the subject stays "far and densely divided from the verb". The author concludes that the decisions shape requires are "too many and too complex for CGPT to deliver consistently, correctly, and sensibly."
- **Discussion:** the failures cluster where "interpretation, invention, and contextualization" are needed, because "the solutions to the problems in bad sentences are not often visible, evident, or explicit." The default output follows the corpus, and "most sentences in the corpuses ... probably aren't clear, cohesive, coherent, concise, and shapely."

## Sources it builds on
- Williams, J. M. & Bizup, J. (2017). *Style: Lessons in Clarity and Grace*, 12th ed. Pearson. Already covered in this track (williams-1981-style-clarity-grace.md).
- Bazerman, C. (2003). Intertextuality: how texts rely on other texts. In Bazerman & Prior (Eds.), *What Writing Does and How It Does It*. Routledge.
- Kristeva, J. (1980). *Desire in Language*. Columbia UP. This is the source of the horizontal/vertical intertextuality distinction.
- Vee, A. (2023). Large language models write answers. *Composition Studies* 51(1), 176-221.
- Byrd, A. (2023). Truth-telling: Critical inquiries on LLMs and the corpus texts that train them. *Composition Studies* 51(1), 135-142.
- Morrison, A. (2023). Meta-Writing: AI and Writing. *Composition Studies* 51(1), 155-161.
- Smye, R. (1988). Style and usage software: Mentor not judge. *Computers and Composition* 6(1), 47-61.
- Knowles, A. M. (2022). Human-AI collaborative writing: Sharing the rhetorical task load. IEEE ProComm 2022, 257-261.

## Works that cite it
None found. The chapter is very recent (2026) and a search turned up only the chapter's own pages. UNVERIFIED whether any citing works exist.

## Relevance to AI answer style (precision vs compression)
- This is direct evidence that an LLM's default "concise" revision is **compression, not precision**. It deletes surplus words well. It does not add the term the sentence is missing: the implied actor ("we", "workers", "students") or the verb hidden in a nominalisation. Precision often means *adding* the one exact word. The model's horizontal, input-bound habit is to rearrange the words already present.
- Shortening can quietly change the claim ("importance of X in achieving" became "X achieving"; the tobacco correlation got garbled). A concision pass needs a check that the meaning is unchanged.
- The model over-answers when asked for one specific item, listing five candidate subjects. An assistant should return the single item the question asks for.
- It keeps metadiscourse and hedges ("I believe", "it is now clear/evident"). Its emphasis revision even kept "It is now evident that..." at the front. These are exactly the filler words an answer harness should strip.
- Its control of coherence across sentences is weak: topics drift sentence to sentence. For multi-sentence answers, keeping one consistent topic (usually the user's entity or the system under discussion) needs an explicit rule.
- Caveat: the evidence is from ChatGPT 3.5, one rater, qualitative. Treat these as named failure modes to test for, not measured rates.

## Candidate rules for the harness
1. **Name the actor; make the action the verb.** Before finalising a sentence, check that its grammatical subject is a concrete actor (the user, the function, the team, "you", "we") and its main verb is the real action. If the actor is only implied, supply it rather than writing "X is required" or "There is a need for Y". Precision may add a word; do not trade it away for brevity.
2. **Shorten without changing the claim.** When cutting words, check that the modality, causality, negation and scope of the original survive ("may help" must not become "achieves"; a correlation must not become a cause). If a cut changes what is claimed, keep the longer wording.
3. **One topic string, filler stripped.** Within a paragraph, keep sentence subjects on the same topic, with old information first and the new main point at the end. Delete metadiscourse and stance phrases ("It is now clear that", "I believe", "The first point is") unless the hedge carries real uncertainty. When the question asks for one thing, give that one thing, not a list of candidates.

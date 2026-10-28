# Wilson & Sperber (2004) — Relevance Theory

## Citation
Wilson, D. & Sperber, D. (2004). Relevance Theory. In L. R. Horn & G. Ward (Eds.), *The Handbook of Pragmatics* (pp. 607–632). Oxford: Blackwell. (End page 632 is UNVERIFIED. The text read starts at p. 607 and runs past p. 619.)

- Primary text read (full chapter, 42-page PDF): https://www.dan.sperber.fr/wp-content/uploads/2004_wilson_relevance-theory.pdf
- This is the authors' own condensed statement of the theory first set out in Sperber & Wilson, *Relevance: Communication and Cognition* (Blackwell, 1986; 2nd ed. 1995). The 1986/1995 book itself was not read in this session.

## Core claim
Human cognition "tends to be geared to the maximization of relevance" (Cognitive Principle). Relevance rises with the positive cognitive effects an input yields and falls with the processing effort it costs. Every act of ostensive communication "conveys a presumption of its own optimal relevance" (Communicative Principle), so hearers follow a path of least effort and stop at the first interpretation that meets their expectation of relevance.

## Key evidence (verbatim from the chapter)
- Definition (1): "a. Other things being equal, the greater the positive cognitive effects achieved by processing an input, the greater the relevance... b. Other things being equal, the greater the processing effort expended, the lower the relevance."
- Mary/menu example. Of "We are serving meat", "We are serving chicken" and "Either we are serving chicken or (7² − 3) is not 46", the chicken statement is the most relevant. It beats "meat" on *effect*, because it is more specific and entails it. It beats the logically equivalent disjunction on *effort*, which "requires an additional effort of parsing and inference". **This is the PRECISION vs COMPRESSION distinction stated formally: the more specific term wins on effect, and the roundabout form loses on effort although it carries identical content.**
- (8) Presumption of optimal relevance: "a. The ostensive stimulus is relevant enough to be worth the audience's processing effort. b. It is the most relevant one compatible with communicator's abilities and preferences."
- The speaker's side: it is in her interest "to make her ostensive stimulus as easy as possible for the audience to understand". She "should formulate it ... so that the first interpretation to satisfy the hearer's expectation of relevance is the one she intended to convey. An utterance with two apparently satisfactory competing interpretations would cause the hearer the unnecessary extra effort of choosing between them."
- (9) Comprehension procedure: "a. Follow a path of least effort in computing cognitive effects: Test interpretive hypotheses ... in order of accessibility. b. Stop when your expectations of relevance are satisfied (or abandoned)."
- Specificity implicates limits: "I've already written a third of the paper" is taken to mean *only* a third, "because if she had written more, she should have said so".
- Loose use: rounding 11:58 to "It's 12:00" is optimally relevant "unless this would ... lead to some significant loss of cognitive effects". Experimental support: strangers asked the time round or give exact answers depending on cues about why the asker needs it (van der Henst et al. 2002, cited in the chapter; that study itself was not read: UNVERIFIED).
- Against Grice: the authors propose abandoning the Cooperative Principle, the maxims, and the maxim of truthfulness, and treating expectations of truthfulness as by-products of the expectation of relevance.
- Lexical pragmatics: encoded word meanings are narrowed or loosened into "ad hoc concepts" in context (BANK*, BANK**).

## Sources it builds on
- Grice (1975, 1989): inferential model of communication, intention recognition, expectations raised by utterances (explicitly cited).
- Sperber & Wilson (1986/1995), *Relevance*; Wilson & Sperber (2002), "Truthfulness and relevance" (*Mind*).
- Barsalou on ad hoc categories (cited for ad hoc concept construction).
- Experimental work: van der Henst et al. (2002); Politzer & Macchi (2000), as cited in the chapter.

## Works that cite it (influential forward citations)
Counts are UNVERIFIED, and these works were not opened in this session.
- Carston, R. (2002). *Thoughts and Utterances: The Pragmatics of Explicit Communication*. Explicature and ad hoc concepts.
- Wilson, D. & Carston, R. (2007). A unitary approach to lexical pragmatics: relevance, inference and ad hoc concepts.
- Noveck, I. & Sperber, D. (Eds.) (2004). *Experimental Pragmatics*.
- Carston's "A Note on Pragmatic Principles of Least Effort" engages Horn's R-principle from a relevance-theory standpoint (seen only in search results: UNVERIFIED).

## Relevance to AI answer style
- **It gives the cost function for answer style.** Relevance equals effect divided by effort, roughly speaking. Precision raises effect per word: the specific term entails more and rules out more. Compression saves effort only when no effect is lost. Once it removes content the hearer needed, it lowers relevance even though the text is shorter.
- **A roundabout phrasing is worse even when it is true and complete.** The chicken-vs-disjunction case shows that the same content in a form that is harder to process is less relevant. Verbose or indirect phrasing has a real cost and is not merely a matter of style.
- **Ambiguity puts work on the reader.** The speaker should make the first accessible reading the intended one. Abbreviations, dropped function words and telegraphic fragments that allow two readings fail this test, whatever they save in length.
- **Be as exact as the use requires.** The rounding experiment supports matching precision to the user's purpose: give an exact figure when the exact value has consequences, and a rounded one otherwise.
- **Specific statements carry an implied limit.** Exact quantities are read as upper bounds ("a third" = "only a third"). If the assistant reports "3 tests fail", the user will take it that the others pass.

## Candidate rules for the harness
1. **Pick the most specific correct term:** Prefer the term that entails the most relevant conclusions, such as the exact error name, function or number, over a vaguer word with a higher-level meaning. The specific term is not longer, it carries more.
2. **First reading must be the intended one:** Cut words only while the sentence still has a single obvious reading. If dropping articles, verbs or connectives would let a reader take it two ways, keep them.
3. **Match precision to purpose, and remember exactness implies limits:** Round or approximate only when the extra exactness would not change what the user does. Do not state a specific count or scope unless it is the whole of it, because readers take specific figures as exhaustive.

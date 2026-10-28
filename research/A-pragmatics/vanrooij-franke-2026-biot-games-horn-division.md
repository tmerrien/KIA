# van Rooij & Franke: Optimality-theoretic and game-theoretic approaches to implicature (SEP)

## Citation
van Rooij, R., & Franke, M. "Optimality-Theoretic and Game-Theoretic Approaches to Implicature." In E. N. Zalta & U. Nodelman (Eds.), *The Stanford Encyclopedia of Philosophy*. First published 1 December 2006; substantive revision 2 July 2026. https://plato.stanford.edu/entries/implicature-optimality-games/ (archived 2014 version: https://plato.stanford.edu/archives/spr2014/entries/implicature-optimality-games/)

- I read the full current text online (sections 1.1-1.2, 2.1-2.3, 3).
- **Why this work and not Horn (1984):** `horn-1984-q-r-implicature.md` already exists in this track, so Horn (1984) is not covered again here. Its primary text is still unread: no free scan exists, and the Kasher (1998) reprint was not found online. I also searched for Horn (2004), "Implicature", *Handbook of Pragmatics* ch. 1. I found no free full text, only a third-party study page (https://cse.iitk.ac.in/users/amit/books/horn-2004-handbook-of-pragmatics.html). That page quotes Horn 1984a:13 ("SAY AS MUCH AS YOU CAN (given R)" / "SAY NO MORE THAN YOU MUST (given Q)") and Horn 1996a:313-314. These quotations are second-hand and UNVERIFIED in the primary texts.
- This entry is the authoritative open account of how the **division of pragmatic labor** is *derived* formally. It is therefore the natural next step after Horn (1984).

## Core claim
Horn's division of pragmatic labor can be derived rather than stipulated. Unmarked (cheap) forms receive the stereotypical interpretation, and marked (costly) forms receive the non-stereotypical one. Two derivations exist. One is weak bidirectional optimization over form-meaning pairs (Blutner). The other is equilibrium or iterated-best-response reasoning in signaling games, where speaker utility is benefit minus message cost (Parikh, van Rooij, Franke). Both frameworks require two inputs: a cost ranking of forms and a probability ranking of meanings.

## Key evidence (verbatim from the entry)
- **Example pair (§1.2):** "John killed the sheriff." (3) vs. "John caused the sheriff to die." (4). "the stereotypical interpretation is intuitively blocked for the cumbersome form (4)"; "As a result, the marked (4) will get the non-stereotypical interpretation."
- **Strong optimality (§1.1):** ⟨f,i⟩ is strongly optimal iff ¬∃i′: ⟨f,i′⟩ > ⟨f,i⟩ (hearer side: best reading for this form) and ¬∃f′: ⟨f′,i⟩ > ⟨f,i⟩ (speaker side: best form for this reading). The hearer side is ranked by conditional probability of interpretation given form, and the speaker side by form complexity.
- **Weak optimality (§1.2):** A pair is weakly optimal "iff there is neither a strongly optimal ⟨f,i′⟩ such that ⟨f,i′⟩ > ⟨f,i⟩, nor a strongly optimal ⟨f′,i⟩ such that ⟨f′,i⟩ > ⟨f,i⟩." This is what lets ⟨costly form, rare meaning⟩ survive once ⟨cheap form, common meaning⟩ is fixed. Jäger (2002) gives an algorithm for computing weakly optimal pairs.
- **Signaling game (§2.2):** There are two states, with "P(t_st) > P(t_¬st)". "Both meanings, however, could be expressed unambiguously as well by a more complex form", and "The cost of the ambiguous message f_u is lower than the cost of the unambiguous message f_m."
  - One Nash equilibrium sends the cheap form for the stereotypical state and the costly form for the other state (the Horn strategy).
  - The reverse ("anti-Horn") mapping is also an equilibrium. Parikh argues the Horn strategy Pareto-dominates it.
  - Van Rooij (2004) uses evolutionary game theory, because the division "involves not only language use but also language organization." Van Rooij (2008) uses forward induction. Franke (2014a) shows that "a simple model of iterated best response reasoning... gives the desired result as well."
- **Stated limits:**
  - "the standard solution concept of game theory cannot yet single out the desired outcome" (§2.2).
  - Bi-OT gives "partially wrong predictions" for Quantity implicatures when alternatives are only partially ordered (§1.1), which is addressed by Aloni (2007) and Schulz & van Rooij (2006).
  - Restricting to truthful strategies "excludes cases of non-literal language use, lying, cheating and error from the start" (§2.3).

## Sources it builds on
- Grice (1967/1975), Logic and Conversation (already covered).
- Horn (1984), Q/R implicature (already covered, second-hand).
- Levinson (2000), *Presumptive Meanings*: the name "M-implicature".
- Prince & Smolensky (1993), Optimality Theory.
- Blutner (1998, 2000).
- Jäger (2002).
- Lewis (1969), *Convention*.
- Parikh (1991, 1992; also 2001, *The Use of Language*).
- Dekker & van Rooij (2000).

## Works that cite it / later work it surveys (forward)
- van Rooij (2004), "Signalling games select Horn strategies", *Linguistics and Philosophy* 27.
- De Jaegher (2008), on the evolution of Horn's rule.
- Franke (2011, 2014a), iterated best response.
- Franke & Jäger (2012, 2016), probabilistic pragmatics.
- Frank & Goodman (2012), *Science*; Goodman & Stuhlmüller (2013), the RSA line.
- Bergen, Levy & Goodman (2016), already covered: M-implicature in RSA.
- Stevens & Benz (2018), an overview of game-theoretic pragmatics.
- Forward-citation counts for this entry: UNVERIFIED.

## Relevance to AI answer style
- **Precision vs compression made formal.** A form's meaning comes from competition with its *alternatives*, not from the form alone. A cheap, lexicalized term ("killed", "deprecated", "idempotent") claims the common meaning. A longer paraphrase is pushed by the hearer onto an *uncommon* meaning. So:
  - (a) Padding is not neutral. A roundabout phrasing for a standard case tells the reader that the case is non-standard.
  - (b) Compression that removes the distinguishing form merges two meanings into the ambiguous cheap form. The hearer then resolves it to the stereotype, so the rare case is lost.
- **Cost justifies length only when it buys a meaning distinction.** In the game, the costly message exists *because* it expresses the non-stereotypical state unambiguously. Extra words are worth paying for exactly when the situation is the atypical one.
- **Equilibria are conventions, and the reader must share them.** The anti-Horn mapping is also stable (§2.2). An assistant that habitually uses elaborate wording for routine claims trains its reader on a degraded convention. In that convention, length no longer signals anything, and real exceptions get missed.
- **Caveat:** these models assume a shared, small set of alternative forms and known prior probabilities over meanings. When the reader's priors differ, as with a novice versus an expert, the stereotype differs too. The rules below therefore depend on what counts as "standard" for that reader.

## Candidate rules for the harness
1. **Cheap form for the common case.** If a standard short term exists for what you mean, use it. Reserve longer or periphrastic phrasing ("caused X to stop", "effectively works", "not incorrect") for cases that really are non-standard, and then name the difference.
2. **Spend words only on the atypical.** When the actual situation departs from what the reader would assume, such as an unusual method, scope, side effect or failure mode, spend the extra words to state it explicitly. Do not compress it into the default term, which the reader will resolve to the stereotype.
3. **Keep form-meaning mappings consistent within an answer.** Once a term is used for a meaning, do not switch to a paraphrase for the same meaning. Under the division of labor, the switch will be read as a different meaning.

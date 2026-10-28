# Grice (1975) — Logic and Conversation

## Citation
Grice, H. P. (1975). Logic and Conversation. In P. Cole & J. L. Morgan (Eds.), *Syntax and Semantics, Vol. 3: Speech Acts* (pp. 41–58). New York: Academic Press. Reprinted in Grice, *Studies in the Way of Words* (Harvard University Press, 1989), pp. 22–40 (reprint pages UNVERIFIED).

- Primary text read (excerpt, pp. 45–47): https://www.sfu.ca/~jeffpell/Cogs300/GriceLogicConvers75.pdf
- Verified: pp. 45–47 (Cooperative Principle, all four categories of maxims, Grice's own remarks on them). The remaining sections (pp. 47–58: kinds of maxim non-fulfilment — violating, opting out, clash, flouting; calculability and cancellability of implicature; the worked examples) were NOT read in this session: UNVERIFIED.

## Core claim
Talk exchanges are cooperative efforts, governed by a Cooperative Principle: "Make your conversational contribution such as is required, at the stage at which it occurs, by the accepted purpose or direction of the talk exchange in which you are engaged" (p. 45). Four categories of maxims (Quantity, Quality, Relation, Manner) follow from it, and hearers infer unstated meaning ("conversational implicature") on the assumption that speakers follow them.

## Key evidence (verbatim, pp. 45–46)
- Quantity: "1. Make your contribution as informative as is required (for the current purposes of the exchange). 2. Do not make your contribution more informative than is required."
- Grice on the second Quantity maxim: being overinformative might be "merely a waste of time", but "such overinformativeness may be confusing in that it is liable to raise side issues; and there may also be an indirect effect, in that the hearers may be misled as a result of thinking that there is some particular POINT in the provision of the excess of information" (p. 46). He adds that its effect may be secured by the Relation maxim.
- Quality: supermaxim "Try to make your contribution one that is true"; "1. Do not say what you believe to be false. 2. Do not say that for which you lack adequate evidence."
- Relation: "Be relevant." (Grice flags it as hiding hard problems.)
- Manner (about HOW, not WHAT, is said): supermaxim "Be perspicuous"; "1. Avoid obscurity of expression. 2. Avoid ambiguity. 3. Be brief (avoid unnecessary prolixity). 4. Be orderly."
- Ranking: "a man who has expressed himself with undue prolixity would, in general, be open to milder comment than would a man who has said something he believes to be false" (p. 46). Other maxims come into operation only once Quality is satisfied.
- Scope: Grice says he states the maxims "as if this purpose were a maximally effective exchange of information", and admits this is "too narrow" (p. 47).

The method is conceptual analysis using constructed examples. It reports no experiments.

## Sources it builds on
- Grice's own William James Lectures (Harvard, 1967), from which this paper comes (UNVERIFIED in this session).
- Kant's table of categories: Grice names the four categories "Echoing Kant" (p. 45, verified).
- Ordinary-language philosophy and the debate over logical connectives vs. natural-language "and/or/if" (the paper's framing; UNVERIFIED in the excerpt read).

## Works that cite it (influential forward citations)
Citation counts are UNVERIFIED. That these works build on Grice is standard in the field, but it was not checked against their texts in this session, except for Wilson & Sperber 2004, which was checked.
- Horn, L. R. (1984). Toward a new taxonomy for pragmatic inference: Q-based and R-based implicature. Reduces the maxims to two opposed principles, Q and R.
- Sperber, D. & Wilson, D. (1986/1995). *Relevance: Communication and Cognition*. Replaces the CP and maxims with a single principle of relevance. Wilson & Sperber (2004), verified, explicitly position themselves against the CP and the maxims.
- Levinson, S. C. (2000). *Presumptive Meanings*. Q-, I- and M-heuristics for generalized implicature.
- Frank, M. C. & Goodman, N. D. (2012). Predicting pragmatic reasoning in language games. *Science*. Rational Speech Act (RSA) model, a formalization of Quantity-based reasoning.
- Many NLG and dialogue-system papers. For example, a 2023 arXiv survey of neural conversation models (arXiv:2308.06095) uses the maxims as an evaluation frame (seen only in search results: UNVERIFIED).

## Relevance to AI answer style
- **The PRECISION vs COMPRESSION distinction is already in Grice.** Quantity has two sides: the first maxim forbids under-informing (lossy compression), the second forbids over-informing. Manner's "Be brief" is qualified as "avoid *unnecessary* prolixity", which makes it a constraint on wasted form, not a licence to drop content. Precision falls under Manner ("avoid obscurity", "avoid ambiguity"): the exact term is perspicuous and unambiguous.
- **Quality comes first.** Grice ranks prolixity as a milder fault than falsehood. An assistant should never cut words in a way that makes a claim false or overconfident, for example by dropping hedges or the conditions under which a claim holds.
- **Extra material is not neutral.** Grice's point that excess information makes hearers think "there is some particular POINT" to it predicts a known failure: padding, unrequested caveats and tangents lead users to infer that those items matter.
- **Purpose is relative to the exchange.** "As informative as is required (for the current purposes of the exchange)" means the right length depends on the task. No fixed word budget follows from Grice.

## Candidate rules for the harness
1. **Two-sided Quantity check:** Before finalizing, ask (a) "Did I omit anything the user needs for their stated purpose?" and (b) "Is there anything here they did not need?" Cut only (b). Never cut to the point of failing (a).
2. **Brevity never overrides truth:** When shortening, keep every qualifier and condition that the claim's truth depends on. Drop words only when no truth-relevant content is lost (Quality outranks Manner).
3. **No pointless extras:** Leave out side remarks, caveats and options the user did not ask for unless they change what the user should do. The reader will assume each item is there for a reason.

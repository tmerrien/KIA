# Shannon (1948): source coding, channel coding, and the two kinds of redundancy

## Citation

Shannon, C. E. (1948). A mathematical theory of communication. *Bell System Technical Journal*, 27(3), 379-423 and 27(4), 623-656. https://doi.org/10.1002/j.1538-7305.1948.tb01338.x (Part I) and https://doi.org/10.1002/j.1538-7305.1948.tb00917.x (Part II).

Read in full: the Bell Labs reprint "with corrections" (55 pp.), hosted at https://people.math.harvard.edu/~ctm/home/text/others/shannon/entropy/entropy.pdf. Page numbers below are the reprint's own (pp. 1-55), not BSTJ pages.

## Core claim

A message source has an entropy H, the bits per symbol actually chosen freely. Everything above H is redundancy, and a noiseless channel can strip it out (source coding, Theorem 9). A noisy channel needs redundancy put back in, but only in "the proper way to combat the particular noise structure" (channel coding, Theorem 11). Both limits are sharp: you cannot compress below H, and you cannot push more than capacity C through a noisy channel without leftover uncertainty of at least H - C.

## Key evidence (from the text)

- **Meaning is set aside on purpose.** "These semantic aspects of communication are irrelevant to the engineering problem. The significant aspect is that the actual message is one selected from a set of possible messages" (p. 1). Information here means selection among alternatives, not meaning.
- **English is about 50% redundant.** "When we write English half of what we write is determined by the structure of the language and half is chosen freely" (p. 14). He gives three methods that agree: entropy of n-gram approximations, a letter-deletion and restoration test ("If they can be restored when 50% are deleted the redundancy must be greater than 50%"), and results from cryptography (pp. 14-15).
- **The Basic English vs. Joyce contrast** (p. 15). Basic English's 850-word vocabulary makes redundancy "very high", which "is reflected in the expansion that occurs when a passage is translated into Basic English. Joyce on the other hand enlarges the vocabulary and is alleged to achieve a compression of semantic content." This is the paper's one direct statement about prose style. A small vocabulary costs length, and a larger vocabulary of exact words buys density. Shannon writes "alleged", so he makes no claim about semantic compression himself.
- **Efficient source code** (p. 17). In the Shannon-Fano construction, "the messages of high probability are represented by short codes and those of low probability by long" codes. This is the formal root of the word-length result in Piantadosi et al. (2011), which is already covered.
- **Redundancy for noise is a different job** (pp. 21-22). One might expect error-free transmission to need endlessly growing repetition, so that rate falls to zero. "This is by no means true." Below capacity, proper encoding makes errors arbitrarily rare. Above it, "Nature takes payment by requiring just that much uncertainty."
- **Natural redundancy already protects messages** (p. 24). "Any redundancy in the source will usually help if it is utilized at the receiving point... in a noiseless telegraph channel one could save about 50% in time by proper encoding... This is not done and most of the redundancy of English remains in the channel symbols. This has the advantage, however, of allowing considerable noise in the channel. A sizable fraction of the letters can be received incorrectly and still reconstructed by the context."
- **Fidelity criterion** (pp. 47-48). Exact reproduction of a continuous source needs infinite capacity, so "we are not interested in exact transmission ... but only in transmission to within a certain tolerance." The rate needed is set by the fidelity the receiver demands (Theorem 21), and it rises "as the fidelity requirements are increased." This is the seed of rate-distortion theory.

## Sources it builds on

- Nyquist, H. (1924). Certain factors affecting telegraph speed. *BSTJ*, April 1924, 324; and (1928) Certain topics in telegraph transmission theory. *AIEE Trans.* 47, 617. (Cited p. 1, fn 1.)
- Hartley, R. V. L. (1928). Transmission of information. *BSTJ*, July 1928, 535. This is the source of the logarithmic measure. (Cited p. 1, fn 2.)
- Fano, R. M. Independent discovery of the same source code (cited p. 17, fn 9, as an MIT technical report).
- Wiener's work on prediction and filtering, and Shannon's own wartime cryptography work, which is the third method behind the 50% estimate (p. 15). The details of these references were not checked in this session.

## Works that cite it (influential forward citations)

The bibliographic details below were not opened in this session and are marked UNVERIFIED.

- Shannon, C. E. (1951). Prediction and entropy of printed English. *BSTJ* 30(1), 50-64. Human-guessing estimates of the entropy of English; extends the p. 14 redundancy estimate. UNVERIFIED.
- Shannon, C. E. & Weaver, W. (1949). *The Mathematical Theory of Communication*. University of Illinois Press. Weaver's introduction adds levels B (semantic) and C (effectiveness) to Shannon's level A. UNVERIFIED.
- Shannon, C. E. (1959). Coding theorems for a discrete source with a fidelity criterion. *IRE National Convention Record* 7(4), 142-163. Formal rate-distortion theory. UNVERIFIED.
- Bar-Hillel, Y. & Carnap, R. (1952/1953). An outline of a theory of semantic information. MIT RLE TR 247. UNVERIFIED.
- The linguistic descendants already covered: Piantadosi et al. 2011; Levy & Jaeger 2007; Jaeger 2010; Gibson et al. 2019; Meister et al. 2021.

## Relevance to AI answer style

Shannon gives an exact account of the PRECISION vs. COMPRESSION split the harness is after.

1. **Waste is redundancy that the reader's own context already supplies.** The user's question and the conversation act as the receiver's model. Restating the question, generic preambles, and "as an AI" boilerplate are all predictable from that model, so they carry close to zero bits. Removing them is source coding, and nothing is lost.
2. **Compression past the entropy loses meaning.** Theorem 9's converse says no code goes below H without loss. When an answer drops a qualifier, a unit, a condition or a step that the reader cannot rebuild from context, it is compressing below the content's entropy, and the reader has to guess. The test is whether a careful reader could restore what was deleted. That is the same test as Shannon's letter-deletion method.
3. **Some redundancy should stay, and it should be placed on purpose.** Redundancy protects against noise only when it is "introduced in the proper way to combat the particular noise structure." For an assistant, the noise is skimming, ambiguity and misreading of critical values. So repeat or restate only what is costly to get wrong, such as a destructive command, a number or a negation. Do not repeat everything evenly. The aviation readback in CAP 413 (already covered) is channel coding of this kind.
4. **A small vocabulary makes text longer, and exact words make it denser.** The Basic English vs. Joyce passage says this directly. One exact technical term ("idempotent") replaces a paraphrase made of simple words. This is precision: high information per word, with no loss, as long as the receiver shares the codebook. Shannon's "alleged" warns that the gain disappears for a reader who does not know the term.
5. **Fidelity is set by the receiver.** Theorem 21 makes the needed rate depend on the fidelity the receiver requires. How long an answer should be follows from what the user needs to act on, not from a fixed budget for brevity.

## Candidate rules for the harness

1. **Cut predictable text, keep unpredictable text.** Delete anything the user could predict from their own question or the prior turns, such as restated questions, generic openers and recaps. Never delete a condition, qualifier, unit or step that the user could not reconstruct. Test: if this phrase were blanked out, could the reader fill it in correctly? If yes, cut it. If no, keep it.
2. **Place redundancy only where errors are costly.** Repeat or restate only items that are dangerous to misread: destructive commands, exact values and versions, negations ("do NOT"), and irreversible steps. Use formatting or a one-line confirmation, and do not add repetition anywhere else.
3. **Use the exact term the reader already knows.** Prefer the precise term over a longer paraphrase when the user has shown they know the vocabulary. When they have not, define the term once and then use it, rather than paraphrasing it each time.

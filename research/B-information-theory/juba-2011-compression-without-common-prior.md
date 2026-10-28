# Juba, Kalai, Khanna & Sudan (2011): Compression without a common prior

*Coverage note.* This crawl node was queued for Piantadosi, Tily & Gibson (2012). That paper is already covered in `piantadosi-2012-ambiguity.md`, so this file covers the companion paper instead. Piantadosi et al. cite it in their own reference list, and it formalises the premise their proof assumes without examining: that speaker and listener share the same prior, or context.

## Citation
Juba, B., Kalai, A. T., Khanna, S., & Sudan, M. (2011). Compression without a common prior: an information-theoretic justification for ambiguity in language. In *Proceedings of Innovations in Computer Science (ICS 2011)*, Tsinghua University Press, pp. 79-86.

- Full text read, all 9 pages including references: https://www.microsoft.com/en-us/research/wp-content/uploads/2016/11/2011-Compression_without_a_Common_Prior.pdf
- Proceedings page: https://conference.iiis.tsinghua.edu.cn/ICS2011/content/papers/23.html
- Repository copy: https://dspace.mit.edu/handle/1721.1/62817

## Core claim
Classical compression assumes the encoder and decoder share one prior. In human communication the speaker's prior p and the listener's prior q differ, and a code tuned exactly to p, such as Huffman coding, is "very brittle": "if the speaker and listener have even slightly different priors, every transmission may be completely erroneous." The authors give a scheme that is robust when p and q are within a factor α of each other. In it, the speaker sends the *shortest* encoding under which the intended meaning is at least α² times more likely than every other meaning sharing that encoding, and the listener picks the most likely compatible meaning. They also prove that any unambiguous code wastes bits, so ambiguity is necessary for compression.

## Key evidence
- **Model (Sec. 1.1, Sec. 2).** A shared "dictionary" is a bipartite graph linking encodings to the meanings each could plausibly carry. The sender's prior p "is determined by the context in which the discussion takes place, and to some extent the speaker's knowledge and all of her own experiences." The two priors are α-close if (1/α)p(m) ≤ q(m) ≤ αp(m) for every message m. The sender picks α to reflect "how broad an audience to whom her communication must be clear": a smaller α when "writing a paper for people within her community", a larger one for "an interdisciplinary audience."
- **Speaker's duty (p. 3).** "it is the speaker's duty to communicate in such a manner that any listener in her audience will believe that the intended message is the most likely interpretation of what is said."
- **Cost of robustness (Observation 1, Claim 1).** The scheme's expected length is at most H(p) + 2 lg α + 2 bits. The analysis is essentially tight at H(p) + (2 − o(1)) lg α, and no α-robust scheme can beat H(p) + lg α for all p. Uncertainty about the listener's context therefore has a *price*: about lg α bits per message on top of the entropy. When α = 1, meaning a common prior, this reduces to classical compression.
- **Necessity of ambiguity (Sec. 4, Observation 2).** Every unambiguous encoder has some message that needs lg|M| − 1 bits *even when context makes that message certain* (H(δ_m) = 0). An unambiguous code cannot exploit context at all.
- **Pruning and implicature (Sec. 5, Observation 3).** If a meaning has an unambiguous encoding of length i, longer encodings need not distinguish it. This pruned, "higher-order" scheme is never longer and is sometimes strictly shorter. The examples are `log 1/p(x)` read as log(1/p(x)), and "You may step forward when your number is called," which implies not before. The authors present this as an account of Gricean implicature: "the speaker simply says as little as possible to overcome the disagreement with the listener's prior, trusting the listener to reason that any other (unintended) likely meanings would have had shorter expressions."
- **Limits the authors concede (Sec. 7).** The model treats all misreadings as equally bad. The authors note that a real encoder has a cost function c(m, m′): misreading "he is a tireless student and brilliant researcher" "would not be serious", whereas "you would be lucky to get him to work for you" is ambiguous and "the difference in meaning is very important." Communication is one-way, with no repair loop, and computational cost, such as garden-path sentences, is not modelled.

## Sources it builds on (from its reference list)
- Shannon (1948, 1950) and Huffman (1952): compression under a common prior.
- Lempel & Ziv (1978): universal, prior-free compression. The authors reject it because it cannot exploit shared knowledge.
- Grice (1975), Sperber & Wilson (1995), and Levinson (2000): implicature, which the model re-derives.
- Wasow, Perfors & Beaver (2005), "The puzzle of ambiguity"; Cohen (2006), "Why ambiguity?"; Chomsky (2008), "On phases": the puzzle of why language is ambiguous.
- Piantadosi, Tily & Gibson (2010 manuscript, published 2012): the independent common-prior version of the argument.
- Braverman & Rao (2010, ECCC TR10-083): compression with partial information.
- Juba & Sudan (2008, STOC), Universal Semantic Communication; Goldreich, Juba & Sudan (2009): goal-oriented communication.
- Blutner (1998), Parikh (1992), Merin (1997), and van Rooy (2001): information-theoretic and game-theoretic formalisations of pragmatics.
- Carter & Wegman (1979): universal hashing, used in Sec. 6.

## Works that cite it (forward)
- Haramaty, E. & Sudan, M. (2012). Deterministic Compression with Uncertain Priors. ECCC TR12-166, https://eccc.weizmann.ac.il/report/2012/166/ (abstract page read). It cites "Kalai et al. (ICS 2011)" as giving a near-optimal scheme with shared randomness, and asks whether that randomness is necessary. Whether its bibliography lists all four authors was not checked against the PDF.
- Piantadosi, Tily & Gibson (2012), *Cognition*: lists Juba et al. (2011) among its sources (see `piantadosi-2012-ambiguity.md`).
- Sudan's "Communication Amid Uncertainty" research programme, which includes work on imperfectly shared randomness (Canonne, Guruswami, Meka & Sudan). UNVERIFIED: known here only from talk listings, no paper opened.
- Citation counts: UNVERIFIED. The OpenAlex and Semantic Scholar APIs were rate-limited.

## Relevance to AI answer style
Piantadosi et al. (2012) licenses leaving out what context supplies, *assuming a shared context*. This paper says what to do when the assistant cannot be sure what the reader holds, and what that uncertainty costs. The line between PRECISION and COMPRESSION becomes quantitative:
- **Precision** is the shortest phrasing under which the intended meaning is clearly the most likely reading *for every reader the answer may reach*, which is the α² margin. This is the exact-term idea in formal terms: a term counts as precise when no rival reading comes close in the reader's context.
- **Compression** is a phrasing tuned only to the *speaker's* prior p, meaning the assistant's own context of tool output, files read and labels it coined, with α = 1. A slight mismatch with the reader's prior q then makes it fail badly, not gracefully. Private shorthand is a Huffman code: optimal for the writer, brittle for anyone else.
- The price of not knowing the reader's context is about lg α extra bits, which is small and logarithmic. When the audience is unclear, a little extra explicitness is cheap insurance. It is not a licence for padding, because the overhead grows only with the log of the mismatch.
- The pruning result supports leaving out distinctions that a shorter phrasing would have marked. Readers do infer "if they had meant X, they would have said the shorter thing." So an assistant should not add hedges or qualifiers that the plain wording already rules out.
- The authors' cost-function caveat is a design rule in its own right. Spend extra words only where a misreading is expensive, such as a destructive command, a version number, or a yes/no on safety. Elsewhere, tolerate harmless ambiguity.

## Candidate rules for the harness
1. **Write for the reader's prior, not your own.** Keep a short form only if it is the clearly dominant reading given what the *user* has seen. Terms, identifiers or abbreviations that exist only in the assistant's working context must be expanded or replaced by the user-visible name.
2. **Scale explicitness to audience breadth.** When the answer may be forwarded or read without the conversation, as in a summary, PR description or report, assume a larger α: define the one or two load-bearing terms and name referents fully. In a tight back-and-forth with a user who just used the term, do not.
3. **Spend disambiguation where misreading is costly.** Resolve ambiguity explicitly when the rival readings lead to different actions, such as delete versus archive, which environment, or which version. Leave harmless ambiguity alone instead of adding qualifiers that the plain phrasing already implies.

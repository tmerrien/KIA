# Gibson et al. (2019). How Efficiency Shapes Human Language

**Citation:** Gibson, E., Futrell, R., Piantadosi, S. T., Dautriche, I., Mahowald, K., Bergen, L., & Levy, R. (2019). How efficiency shapes human language. *Trends in Cognitive Sciences*, 23(5), 389–407. https://doi.org/10.1016/j.tics.2019.02.003
Open-access copies: MIT DSpace https://dspace.mit.edu/handle/1721.1/122958 ; TedLab PDF https://tedlab.mit.edu/tedlab_website/researchpapers/gibson%20et%20al%20TICS%202019.pdf (read in full; volume/issue/pages checked against Crossref.)

## Core claim
Language structure, from the lexicon through syntax, is shaped by a pressure for communicative efficiency: getting a message across successfully with the least average effort for both speaker and listener, traded off against how complex and learnable the language is. Ambiguity out of context is evidence *for* this view, not against it, because context resolves almost all ambiguity that matters, so leaving inferable information out makes speech shorter.

## Key evidence
- **Definition (Glossary/§Information theory):** "a code is efficient if successful communication can be achieved with minimal effort on average by the sender and receiver, usually by minimizing the message length." The definition includes success, so shortness alone does not count as efficiency.
- **Ambiguity:** Chomsky treated ambiguity as a sign that language is inefficient. The authors reply that "context resolves all communicatively relevant ambiguity" (to a first approximation), and that conversation partners can quickly ask about anything left unclear (citing Clark 1996). They note that legal contracts and programming languages, which aim for zero ambiguity, end up "wordy or pedantic." The formal proof is in Piantadosi, Tily & Gibson (2012, *Cognition*).
- **Word length:** In an optimal code, a signal's length depends on its probability *in context*, not on its overall frequency. Corpus estimates of contextual predictability predict word length better than frequency does (Piantadosi et al. 2011). Speakers also choose the short member of a near-synonym pair, such as "chimp" over "chimpanzee", more often when the context makes the word predictable (Mahowald et al. 2013).
- **Semantic partitioning:** Kinship systems across languages lie on or near the best possible trade-off between informativeness and complexity (Kemp & Regier 2012). Color terms convey warm colors in fewer bits, and warm colors are the colors of objects people talk about.
- **Syntax:** Hand-parsed corpora of 37 languages show dependency lengths shorter than random baselines (Futrell et al. 2015). Long dependencies cause measurable comprehension difficulty. The "information locality" generalization says that words with high mutual information should sit close together.
- **Noisy channel:** SVO order is more robust to a lost word when subject and object could be confused. SOV languages make up for this with case marking.
- **UID:** The information rate per unit time tends to be roughly constant (Fenk & Fenk 1980; Genzel & Charniak 2002; Levy & Jaeger 2007).

## Sources it builds on
Shannon (1948); Zipf (1935, 1949); Hockett (1960); Hawkins (1994); Clark (1996, *Using Language*); Levy & Jaeger (2007); Levy (2008, noisy channel); Piantadosi, Tily & Gibson (2011, 2012); Kemp & Regier (2012); Futrell et al. (2015, PNAS); Zaslavsky et al. (2018); Cover & Thomas (2006).

## Influential forward citations (OpenAlex, by citation count, fetched 2026-10-28)
- Fedorenko, Piantadosi & Gibson (2024). Language is primarily a tool for communication rather than thought. *Nature*. doi:10.1038/s41586-024-07522-w
- Futrell, Gibson & Levy (2020). Lossy-context surprisal. *Cognitive Science*. doi:10.1111/cogs.12814
- Haspelmath (2021). Explaining grammatical coding asymmetries: form–frequency correspondences and predictability. *J. Linguistics*. doi:10.1017/S0022226720000535
- Blasi et al. (2022). Over-reliance on English hinders cognitive science. *TiCS*.

## Relevance to AI answer style
- The paper's definition of efficiency settles the PRECISION vs COMPRESSION distinction. Efficiency means minimizing effort *subject to communicative success*. Dropping content the reader cannot recover from context lowers the success rate, so it is not efficient. Leaving out what the reader can infer from context is efficient.
- The test for whether to omit something is "can the reader infer it from the shared context?", not "is it short?". The assistant knows the context: the conversation, the user's code, and what the user just said. It should cut what that context supplies and spell out what it does not.
- The point about legal contracts and code shows that hedging against every misreading turns prose pedantic. The paper's suggestion is to state the likely reading and let the user ask about the rest.
- Information/dependency locality: keep related words close, for example a term next to its definition, a claim next to its qualifier, a verb next to its particle. Do not separate them with long parentheticals.

## Candidate rules for the harness
1. **Omit what the context supplies; keep what it doesn't.** Before cutting a word, check whether the reader can recover its meaning from the conversation. If yes, cut it. If no, keep it, because the cut is compression, not precision.
2. **Don't disambiguate what context already resolves.** Skip defensive caveats that cover readings the user plainly did not intend. Address residual ambiguity with one short clarifying clause or question, not with exhaustive coverage.
3. **Keep dependents adjacent.** Place qualifiers, definitions and conditions right next to the words they modify. Avoid long interruptions between a subject and its verb or between a claim and its exception.

# Clark (1975), Bridging: taxonomy of bridging inferences and the shortest-bridge stopping rule

Covered instead of Clark & Haviland (1977) and Haviland & Clark (1974), which already have a note: `A-pragmatics/clark-haviland-1977-given-new-contract.md`. This is the theory paper that goes with those two. It names and sorts the bridging inferences that the 1974 experiments measured as extra reading time, and it adds a rule for when bridging stops.

## Citation
Clark, H. H. (1975). Bridging. In R. C. Schank & B. L. Nash-Webber (Eds.), *Theoretical Issues in Natural Language Processing* (TINLAP-1), pp. 169-174. Cambridge, MA. ACL Anthology T75-2034: https://aclanthology.org/T75-2034/ (the Anthology record gives no pages; the page numbers 169-174 come from the scan's folios). Full text read, 6-page scan hosted by Clark: https://web.stanford.edu/~clark/1970s/Clark.Bridging.75.pdf

## Core claim
A listener has to find a referent for every referring expression, because all of them are Given information. When no direct antecedent is in memory, the listener builds one through an implicature, a "bridge", and treats that implicature as part of the intended message. Bridges are determinate: the listener "take[s] as the intended implicature the one that requires the fewest assumptions, yet whose assumptions are all plausible", which makes the stopping rule "build the shortest possible bridge that is consistent with the Given-New Contract". Unauthorized inferences such as forward elaboration are open-ended. Bridges are not.

## Key evidence
This is a theory paper with examples taken from "naturally occurring discourse". It reports no experiments. The empirical support is Haviland & Clark (1974), covered in the other note. The taxonomy, with Clark's own examples:
- **Direct reference.** *Identity*: "I met a man yesterday. The man told me a story." *Pronominalization*: "...He told me a story." *Epithets*: "...The bastard stole all my money." Even identity "force[s] an implicature ... perhaps only a millimeter leap". Clark describes a continuum of pronominalization from fully specified to sparse: *the elderly gentleman*, *the man*, *the oldster*, *the person*, *he*. Epithets are "surprisingly restricted": replace *the bastard* with *the rancher* or *the robber* and the bridge fails, because the new noun seems to pick out a different person.
- **Set membership.** "I met two people yesterday. The woman told me a story." The implicature is that exactly one of the two is a woman. The reader infers this because it is "the only way the speaker could have picked out 'the woman' uniquely."
- **Indirect reference by association**, ranked by how predictable the link is:
  - *Necessary parts*: "...The ceiling was very high."
  - *Probable parts*: "I walked into the room. The windows looked out to the bay."
  - *Inducible parts*: "...The chandeliers sparkled brightly." The search for an antecedent is what creates the proposition that the room had chandeliers.
- **Indirect reference by characterization.** *Necessary roles*: "John was murdered yesterday. The murderer got away." *Optional roles*: "John died yesterday. The murderer got away." Here the reader has to supply the inference that John was killed.
- **Reasons, causes, consequences, concurrences** connect one event to another. Consequence is "the most common", appearing "every time chronological order is conveyed". Concurrence covers the *too/either* cases (citing Lakoff 1971): "John is a Republican. Mary is slightly daft too."
- **Determinacy argument.** "Alex went to a party last night. He's going to get drunk again tonight." The reader could build an ever-longer chain (women, high voices, his mother, anger, drink). In real discourse readers stop at the shortest plausible bridge, here that Alex gets drunk at parties. The speaker had "a unique bridge in mind". By contrast, the inferences people drew from Nixon's "I am not a crook" went beyond the first legitimate one (that the audience suspected he was) and were "completely unauthorized", with "many different stopping points".
- **Forward vs backward inferences.** Forward inferences, such as imagining things about *the room* when it is first mentioned, are mostly unauthorized and indeterminate. Backward inferences, which a later definite NP forces, are determinate. Clark proposes studying the determinate ones first.

## Sources it builds on
Grice (1967/1975) on implicature (already covered). Clark & Haviland (1974, 1977) and Haviland & Clark (1974) on the given-new contract (already covered). Chafe (1972), "Discourse structure and human knowledge", for associated information. Lakoff (1971), "The role of deduction in grammar", for *too/either*.

## Works that cite it (influential forward citations)
None of these were opened in this pass, so their content is UNVERIFIED unless a note says otherwise:
- Burkhardt, P. (2006). Inferential bridging relations reveal distinct neural mechanisms: Evidence from event-related brain potentials. *Brain and Language* 98(2), 159-168. doi:10.1016/j.bandl.2006.04.005. Bibliographic details come from a search result and were not opened. The reported finding, also from the search result only, is that bridged definites pattern with given NPs on the N400 and with new NPs on the P600. UNVERIFIED.
- Garrod & Sanford (1977, 1981): a scenario-mapping account of bridging. Already in the queue.
- Asher, N., & Lascarides, A. (1998). Bridging. *Journal of Semantics* 15(1), 83-113. A formal treatment through discourse coherence. UNVERIFIED.
- Poesio, M., & Vieira, R. (1998). A corpus-based investigation of definite description use. *Computational Linguistics* 24(2). An annotation study of bridging descriptions in corpus text. UNVERIFIED.
- Matsui, T. (2000). *Bridging and Relevance*. John Benjamins. A relevance-theoretic reworking of the shortest-bridge rule. UNVERIFIED.

## Relevance to AI answer style
- **Each definite noun phrase costs the reader a bridge.** The size of the bridge depends on how predictable the antecedent is: identity < necessary part < probable part < inducible part or optional role. An assistant that writes "the cache", "the migration" or "the fallback" after mentioning only "the deploy" is asking the reader to build a probable or inducible bridge. That is acceptable when the link is necessary. When it is only inducible, the reader has to assume the referent exists.
- **PRECISION vs COMPRESSION.** The pronominalization continuum, from *the elderly gentleman* down to *he*, describes compression directly. Each step down drops descriptive content and leaves more of the work to antecedent search. Shorter forms are precise only while exactly one antecedent remains salient. The failure of the epithet substitution (*the rancher* reads as a new person) is a warning against "elegant variation". A new term for an entity already introduced suggests a new entity. The precise choice is to keep the term already introduced.
- **The shortest-bridge rule makes implied content determinate.** The reader takes the minimal plausible assumption as intended. An assistant that leaves a step implicit (for example "Run the tests. The failure is in auth.") gets the minimal reading, which is that the tests fail in auth. If the intended meaning is longer than that reading (for example, that auth fails only under some flag), the reader will not recover it. Anything beyond the shortest bridge has to be stated.
- **Forward elaboration is unauthorized.** Readers do not reliably draw inferences the writer did not force. A recommendation that depends on an unstated "therefore" goes beyond what the text licenses. That "therefore" has to be written out.
- **Consequence is the default bridge between sentences in sequence.** Sentences in chronological order are read as cause followed by effect. A list of steps or events written in sequence implies causation whether or not the writer means it. If no causal link is meant, the answer should say so.

## Candidate rules for the harness
1. **Bridge only on necessary links.** A definite reference the user has not seen ("the X") is acceptable only when X is a necessary part or role of something already mentioned: the error of a failed command, the caller of a function. If X is only probable or inducible (a cache, a retry, a second config), introduce it explicitly with "there is a..." or a full name on first mention.
2. **One referent, one term.** Once an entity is named, keep that name. Do not switch to a synonym or descriptive variant for style, because a new noun suggests a new referent. Shorten to a pronoun or short form only while exactly one candidate antecedent is salient.
3. **State whatever goes beyond the minimal inference.** Assume the reader will take the shortest plausible link between adjacent sentences, usually consequence. If the intended connection is something else (contrast, no causal link, a condition), write the connective or the condition. Do not leave it implicit.

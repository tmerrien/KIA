# Strunk (1918), *The Elements of Style*

## Citation
Strunk, William, Jr. (1918/1920). *The Elements of Style*. Ithaca, NY: privately printed 1918; New York: Harcourt, Brace and Howe, 1920 (copyright 1918, 1919 W. Strunk Jr.; 1920 Harcourt, Brace and Howe).
Primary text read: Project Gutenberg eBook #37134 (released 2011-08-19): https://www.gutenberg.org/files/37134/37134-h/37134-h.htm
(Later expanded editions with E. B. White, 1959 onward ("Strunk & White"), were NOT read here; claims about them are UNVERIFIED except where quoted via Pullum 2009 below.)

## Core claim
The book "aims to give in brief space the principal requirements of plain English style." Its central principle, Rule 13, says: "Vigorous writing is concise. A sentence should contain no unnecessary words, a paragraph no unnecessary sentences". It also defines concision as precision rather than brevity. The rule "requires not that the writer make all his sentences short, or that he avoid all detail ... but that he make every word tell."

## Key evidence
This is a prescriptive manual. It gives rules and paired rewrites. It reports no experiments.
- Rule 13 replacement table (verified): "the question as to whether" -> "whether"; "there is no doubt but that" -> "no doubt (doubtless)"; "in a hasty manner" -> "hastily"; "the fact that he had not succeeded" -> "his failure". The text adds: "the expression *the fact that* should be revised out of every sentence in which it occurs."
- Rule 12, "Use definite, specific, concrete language": "Prefer the specific to the general, the definite to the vague, the concrete to the abstract." Example: "A period of unfavorable weather set in." -> "It rained every day for a week." The rewrite carries more information in a similar number of words. It is a gain in precision, not just a cut.
- Rule 11, "Put statements in positive form": "Use the word *not* as a means of denial or in antithesis, never as a means of evasion." Examples: "not honest" -> "dishonest"; "did not pay any attention to" -> "ignored". A single exact word replaces a periphrasis.
- Rule 10, "Use the active voice": "The active voice is usually more direct and vigorous than the passive." The word is "usually". According to Pullum (2009), the text also says the rule does not mean discarding the passive entirely.
- Structure rules: Rule 8 (one paragraph per topic); Rule 9 (begin each paragraph with a topic sentence); Rule 15 (express co-ordinate ideas in similar form, i.e. parallelism); Rule 16 (keep related words together); Rule 18 (put the emphatic words at the end of the sentence).

## Sources it builds on
- The 19th-century rhetoric and composition tradition, e.g. Herbert Spencer's "Philosophy of Style" (1852, economy of the reader's attention) and the Cornell composition teaching of Strunk's day. UNVERIFIED: the 1918 text does not cite these explicitly. This lineage is inferred.

## Works that cite / extend it (forward)
- Strunk & White (1959, Macmillan; later editions): E. B. White's expansion, the best-known version. UNVERIFIED detail.
- Pullum, G. K. (2009-04-17). "50 Years of Stupid Grammar Advice." *The Chronicle Review* 55(32): B15. Verified via PDF at https://pullum.ppls.ed.ac.uk/50years.pdf. Pullum calls "Omit needless words" "useless" because "The students who know which words are needless don't need the instruction". He shows that three of the four 'passive' examples in the White edition are not passives.
- Pinker, S. (2014). *The Sense of Style*. Viking. It critiques the rule-list approach and offers "classic style" in its place. UNVERIFIED, not read here.
- Williams, J. M. (1981). *Style: Ten Lessons in Clarity and Grace*. It turns "omit needless words" into operational diagnostics (characters as subjects, actions as verbs). UNVERIFIED, not read here.

## Relevance to AI answer style
Strunk draws the PRECISION/COMPRESSION line the harness needs: "make every word tell" is not "make it short." Rules 11-13 are precision moves. They replace a multi-word periphrasis with the one exact word ("his failure", "ignored", "dishonest") or a vague abstraction with a concrete fact ("It rained every day for a week"). None of them drops content. LLM filler matches Strunk's targets: "It is worth noting that", "the fact that", "in order to", "there is no doubt that". Pullum's critique is a warning for the harness. A bare instruction to "omit needless words" does not tell a model which words are needless. Rules need operational tests such as replacement tables and detectable patterns.

## Candidate rules for the harness
1. **Replace periphrasis with the exact word; do not delete content.** If a multi-word phrase has a single-word equivalent with the same meaning (e.g. "did not pay attention to" -> "ignored", "in order to" -> "to", "the fact that X" -> nominalize or restructure), use it. If removing words would remove a fact, a condition, or a caveat, keep them.
2. **Prefer the concrete claim to the abstract summary.** Say "the test fails on inputs over 2^31" rather than "there are some issues with larger values." Specificity adds information at constant length.
3. **Topic sentence first; one topic per paragraph; emphasis at the end.** Lead each paragraph with its point. End the sentence on the word the reader must retain.

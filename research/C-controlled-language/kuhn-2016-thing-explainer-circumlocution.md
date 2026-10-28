# Kuhn (2016): The Controlled Natural Language of Randall Munroe's Thing Explainer

Picked in place of Kuhn (2014), which is already covered in `kuhn-2014-pens-controlled-natural-languages.md`. This is Kuhn's own follow-up, and it applies PENS to an extreme case of vocabulary compression.

## Citation
Kuhn, T. (2016). The Controlled Natural Language of Randall Munroe's Thing Explainer. In B. Davis, G. J. Pace & A. Wyner (Eds.), *Controlled Natural Language: 5th International Workshop, CNL 2016*, LNCS 9767, pp. 102-110. Springer. doi:10.1007/978-3-319-41498-0_10. Venue and pages come from Crossref metadata; the editors' names are UNVERIFIED.
- Read in full: arXiv:1605.02457v1 (9 May 2016), https://arxiv.org/abs/1605.02457 (PDF text extracted locally).
- The book it analyses is Munroe, R. (2015). *Thing Explainer: Complicated Stuff in Simple Words*. Houghton Mifflin Harcourt. The book itself was not read; quotes from it are taken through Kuhn.

## Core claim
Thing Explainer allows only the 1,000 most frequent English words and puts no limit on grammar. Under PENS it is P1 E5 N5 S1, the same class as full English, Special English, E-Prime and Plain Language. So cutting the vocabulary leaves precision where it was. When common but specific words are banned, writers have to "circumscribe existing concepts instead of naming them or ... involve rough analogies, which can lead to a language that [is] even less precise than full natural language."

## Key evidence
- **PENS classification (Sec. 2.2).** The language is not "considerably more precise than full English, because no semantic restrictions come with the restricted vocabulary and the grammar is not restricted at all". Kuhn also says it is simple only "when full English can be taken for granted". Describing its 13 word-production rules from scratch would be no simpler than describing English.
- **Hidden rules (Sec. 2.4).** Munroe's own rules take a few sentences, but Kuhn reverse-engineered 13 rules from the text. Examples are verb conjugation, -er nouns, plurals, comparatives, -y and -ful adjectives, -ly adverbs, -ness nouns, pronoun case forms, noun-verb conversion and acronyms. Six words fit no rule at all (*some, mad, hat, apart, rid, worth*); Kuhn suspects either list errors or a spell-checker that let them through. A "simple" restriction turns out to rest on unstated rules.
- **Counts (Figs. 1-2).**
  - The text has 1,736 distinct word forms and 51,086 tokens.
  - Only about 45% of the forms are on the list exactly as written, but about 79% of the tokens are, because function words dominate.
  - 260 word forms ending in -s, and 21 ending in -er, cannot be assigned to a rule without parsing, since the root could be a noun, a verb or an adjective.
- **Word distribution (Sec. 2.5).** Word frequencies still follow Zipf's law: a power law fits significantly better than an exponential (p = 0.022 for word forms, 0.017 for lemmas). The curve bends more than in unrestricted text, and more again after lemmatizing. Kuhn hypothesizes that CNL texts weaken the power law but says this is not conclusive.
- **The cost of circumlocution (Sec. 4).** These are the central examples for the PRECISION/COMPRESSION distinction:

  | Concept | Thing Explainer wording | Note |
  |---|---|---|
  | nine | "the one after eight" | |
  | salt | "white stuff, like what we put on food to make it better" | |
  | root | "dirt branch" | |
  | rope or string | "line" | Munroe: it "has so many other meanings that it was hard to work with" |
  | tea, coffee | "light/dark drink that wakes you up" | *tea* and *coffee* were allowed; Munroe chose the paraphrase for fun |
  | spaceship | "space boat" | *ship* was allowed; chosen because it "makes me laugh" |

  Proper names for countries and planets are also unavailable. Kuhn: "the omission of a word rather leads to confusion than simplification."
- **Proposed repair (Sec. 4).** Kuhn suggests raising the list to 1,500 words (as Special English does) or to 2,000-3,000, and choosing words by hand rather than by frequency. Choosing by hand is what Special English and Basic English do.
- **Reception (Sec. 1), reported by Kuhn.** The Guardian found "passages of such startling clarity"; the first printing was 300,000 copies. Kuhn argues the book works as an engaging explainer that comes with pictures, not as a precise one.

## Sources it builds on
- Kuhn (2014), the PENS survey (already covered).
- Ogden (1930), *Basic English*: 850 root words and 18 verbs, chosen by hand, with grammar restrictions.
- Voice of America (2009), *VOA Special English Word Book*: about 1,500 words chosen by hand, each tied to a part of speech, with no grammar restrictions, in use since 1959.
- Bourland (1965), E-Prime.
- ASD-STE100 Issue 6 (2013).
- Clauset, Shalizi & Newman (2009), power-law fitting.
- Corral, Boleda & Ferrer-i-Cancho (2015), Zipf's law for word forms versus lemmas.
- Heaven (2015), a *New Scientist* interview with Munroe, the source of Munroe's quotes on the word list.

## Works that cite it
Crossref shows 1 citing work (is-referenced-by-count = 1, queried 2026-10-28). Semantic Scholar and OpenAlex were rate-limited, so the citing works are UNVERIFIED. This is a minor workshop paper; its value is the evidence above, not how often it is cited.

## Relevance to AI answer style
This is the clearest worked example in the crawl of COMPRESSION posing as simplicity.
- Cutting the vocabulary to common words makes each word easier, but it costs precision. A rare word that names the concept exactly (*salt*, *root*, *nine*) gets replaced by a longer and vaguer description.
- Measured in words, the answer gets longer. Measured in meaning, it gets less exact. Precision and brevity point the same way here: the exact term is both shorter and more precise.
- For an assistant, "write simply" must not become "avoid the exact term". The precise term is the cheapest and clearest choice, and an unfamiliar term can be glossed once.
- It also warns that "plain" or "simple" style rules quietly depend on full English. Rules that look short need unstated production rules, and the reader still faces full ambiguity (P1).

## Candidate rules for the harness
1. **Name the concept; do not describe it around.** If one exact term exists (e.g. *salt*, *root*, *latency*, *idempotent*), use it rather than a longer description in common words. If the reader may not know it, add a short gloss once at first use ("idempotent, meaning safe to run twice"). Do not replace the term with the gloss.
2. **Common words do not make an answer clear.** Judge a simplification by whether the reader can still recover the exact meaning without context, not by how familiar the words are. Swapping a precise term for a polysemous everyday word (*line* for *rope* or *string*) is a precision loss, even when the sentence looks simpler.
3. **Save analogy for orientation, not for definition.** An analogy such as "space boat" can introduce an idea. The answer should still state the literal term or value somewhere, so that the analogy is not the only thing carrying the meaning.

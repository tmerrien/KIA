# Seppälä, Ruttenberg & Smith (2017), Guidelines for writing definitions in ontologies

## Citation

Seppälä, S., Ruttenberg, A., & Smith, B. (2017). Guidelines for writing definitions in ontologies. *Ciência da Informação*, 46(1), 73-88. Published 2017-12-28. doi:10.18225/ci.inf.v46i1.4015
- Journal page: https://revista.ibict.br/ciinf/article/view/4015
- Full text read (16 pp., updated PDF): https://revista.ibict.br/ciinf/article/view/4015/3715
- The DOI resolver returned 404 on 2026-10-28, and PhilArchive (https://philarchive.org/rec/SEPGFW) returned 403. The journal copy was the one read.
- Why this work and not ISO 704: this note was queued as ISO 704:2022, but that slug already exists (`iso-tc37-2022-iso704-substitution-principle.md`). This paper is the open-access work that turns ISO 704:2009 (which it cites) and lexicographic practice into worked rules, with good and bad examples taken from real ontologies.

## Core claim

A good definition has the form "X: a Y that Zs". It names exactly one genus, which should be the genus proximus (the nearest parent), plus differentiae. Those differentiae must be necessary conditions and, whenever possible, jointly sufficient ones, so that the definition picks out exactly the term's extension: no broader and no narrower. Anything that cannot be stated as a necessary condition is not defining content. That covers examples, usage notes, "usually"-type hedges, evaluative words and encyclopedic facts, and all of it belongs in a separate note.

## Key evidence (from the full text)

- **Structure (p. 76).** A definition consists of a definiendum, a copula and a definiens. The genus "tells us what kind of thing the defined term denotes". The differentiae tell us "what distinguishes them from the things referred to by the genus term and by all other terms under the same genus." "Each part serves as a condition for determining which things are members of the defined term's extension."
- **Partial definition = lossy compression (p. 77).** "A definition that contains only necessary conditions that are not jointly sufficient ... is called a partial definition. For example, defining a bird as an animal that lays eggs produces a definition that applies to all [instances] of birds but also to amphibians."
- **G3.1.1, genus proximus (p. 79).** Use "the closest parent term. This ensures that the genus is specific enough." Example: 'measurement datum' defined via the grandparent 'information content entity' rather than the parent 'data item' is marked wrong.
- **G3.1.4, avoid categorizers (p. 81).** "type of", "sort of" "can usually be omitted": "immunogen: A type of antigen ..." becomes "An antigen ...". This is pure filler removal with no loss.
- **G5.1, avoid encyclopedic information (p. 81).** Definitions "should avoid including information that goes beyond the minimum useful information for specifying the intended meaning". "An indication that a piece of information is encyclopedic is that it cannot be expressed as a necessary condition." Such content moves to an "editor note". Example: the spiracle definition with ant-anatomy facts.
- **G5.2, negative terms (p. 82).** "A definition that tells us what something is not is uninformative". Example: "mineral: composed of matter other than plant or animal" becomes "solid inorganic matter". There are two exceptions: inherently negative concepts ("bachelor") and a negation that is itself the feature separating two siblings (paracentric vs pericentric inversion).
- **G5.3, avoid definition by extension (p. 82).** A list of instances does not say what the thing is "unless we are already familiar with the listed instances" (planet = Mercury, Venus, ...).
- **G6.1, scope (p. 82).** Too broad: "bird: an animal that lays eggs". Too narrow: "antidote: a substance that counteracts snakebite".
- **G6.2, term vs inline expansion (p. 83).** When a definition embeds a nested definition of another term, a cross-reference to that term "is preferable since it preserves the link to the full definition ... as well as to the term that denotes it, both of which are lost when the term is replaced by its definition." So a precise term is a pointer that carries more than a single paraphrase can.
- **G7, circularity (pp. 83-84).** This covers circularity within one definition ("fear: The state of being fearful") and across the system (training objective <-> training process: "It does not tell us what either of these things really are").
- **G9.1, G9.2, G9.4 (pp. 84-85).** Avoid "usually"/"generally" (either the definition already states the typical case or the feature is non-defining). Avoid "such as", "etc." and "for example", and "replace the examples ... with a more general term, the extension of which includes all the examples": "height, weight, race, ... etc." becomes "demographic and medical questions". Evaluative words ('delicious', 'beautiful') "are removed ... without any change in the informative content".
- **Context dependence (p. 77).** "The content and form of definitions have to be adapted to each context of use ... and to the target audience."
- **Not in the paper.** It does not state the ISO 704 substitution principle by name. G5 and G6.1 (necessary + jointly sufficient, neither too broad nor too narrow) are its working equivalent: a definition that passes them can stand in for the term without changing the extension.

## Sources it builds on

- ISO 704:2009, *Terminology work: Principles and methods* (cited; already covered in this track).
- Arp, R., Smith, B., & Spear, A. D. (2015). *Building Ontologies with Basic Formal Ontology*. MIT Press. This is the source of the joint-satisfiability guideline and of the mammal use/mention examples.
- Kelley, D. (1998). *The Art of Reasoning* (3rd ed.). Norton. This is the source of the too-broad and too-narrow examples.
- Landau, S. I. (2001). *Dictionaries: The Art and Craft of Lexicography* (2nd ed.). CUP. Svensén, B. (1993). *Practical Lexicography*. OUP.
- Vézina, R. et al. (2009). *La rédaction de définitions terminologiques*. Office québécois de la langue française.
- Pavel, S., & Nolet, D. (2001). *Handbook of Terminology*. Translation Bureau, Canada.
- Smith, B. (2013). Introduction to the logic of definitions. DO 2013, CEUR-WS Vol-1061.
- Seppälä, Ruttenberg & Smith (2016), "The functions of definitions in ontologies", FOIS 2016, pp. 37-50. Seppälä, Ruttenberg & Schreiber (2016), "Definitions in ontologies", *Cahiers de lexicologie* 109, 173-206.
- OBO Foundry Principle FP-006, Textual Definitions (http://obofoundry.org/principles/fp-006-textual-definitions.html).

## Works that cite it (forward)

UNVERIFIED. Citation-index lookups failed: Semantic Scholar returned 404 or 429, OpenAlex was rate-limited, and web search showed no citing works. Likely downstream uses are the OBO Foundry FP-006 textual-definition principle docs and later definition-quality work in biomedical ontologies (Schlegel, Seppälä and colleagues), but none of these was confirmed as citing this paper.

## Relevance to AI answer style

The paper gives a concrete split between defining content and everything else, and that split matches PRECISION vs COMPRESSION directly.
- **Safe deletions (lossless).** Categorizers ("a type of"), evaluative adjectives, hedges like "generally" when the claim is already generic, and example lists that one more general term can absorb. Removing any of these leaves the extension unchanged, and the paper shows this case by case.
- **Lossy deletions (compression).** Removing a differentia makes a partial definition ("bird: an animal that lays eggs"), and the claim then covers too much. Swapping the genus proximus for a distant genus does the same. An answer that drops a qualifier or uses a vaguer category word is making exactly this error.
- **Precision as pointer.** G6.2 says a named term keeps a link that an inline paraphrase loses. For an assistant, naming the exact term (an API, a standard, a theorem) is often shorter and more informative than paraphrasing it. A one-line gloss is still needed when the reader may not know the term, because a definition by extension or by pointer fails "unless we are already familiar".
- **Swapping examples for a cover term.** G9.2 is a precision move: one word whose extension covers all the examples can replace a list of them. This is shorter and loses nothing.

## Candidate rules for the harness

1. **Genus-proximus gloss.** When introducing a term, gloss it as "a [nearest parent category] that [distinguishing feature]". Do not use a distant genus ("a thing", "a tool", "a type of X"), a list of instances, or a statement of what it is not, unless the negation itself is what separates it from its sibling.
2. **The necessary-condition test for cuts.** When shortening, delete words that do not narrow the claim: categorizers, evaluative adjectives, hedges on an already-generic claim, and "such as/etc." lists that one cover term can replace. Never delete a qualifier that serves as a necessary condition (version, scope, condition, exception), because the claim then becomes too broad.
3. **Name, don't paraphrase, when the reader can follow the pointer.** Prefer the exact established term, which keeps the link to its full definition, over an inline paraphrase. Add the paraphrase only when the reader is unlikely to know the term.

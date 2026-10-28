# ISO 704:2022, Terminology work: Principles and methods (ISO/TC 37/SC 1)

## Citation

ISO (2022). *ISO 704:2022 Terminology work: Principles and methods* (4th ed.). Geneva: International Organization for Standardization. Prepared by ISO/TC 37 *Language and terminology*, SC 1 *Principles and methods*. Replaces ISO 704:2009 (3rd ed.) and ISO 704:2000 (2nd ed.). Earlier ancestor: ISO/R 704:1968 *Naming principles*.
- Catalogue page: https://www.iso.org/standard/79077.html
- What was read: the official publisher-authorised preview, 15 pages (Foreword, Introduction, Clauses 1 to 5.4.5): https://cdn.standards.iteh.ai/samples/79077/2dd50250582e4a9fa3420af5da705572/ISO-704-2022.pdf
- Also read: the ISO 704:2000 preview (TOC to 5.3.4), https://cdn.standards.iteh.ai/samples/31696/b62b1a16b573494f9d3a8cb84ccd308e/ISO-704-2000.pdf ; and Pozzi (2007), an ISO/TC 37 conference paper quoting ISO 704 and ISO 1087-1, https://www.ttt.org/tc37/ISO%20Conference%202007_files/Maria_704%20860%201087.pdf
- Access notes: iso.org/obp and the ANSI preview returned 403. A university-hosted full copy of the 2009 edition was not used because it is an unauthorised copy. Clause 6 of the 2022 edition (Definitions, pp. 33-47) was **not read**.

## Core claim

A concept is a unique set of characteristics (its intension), and that set determines which objects fall under it (its extension). The preferred definition, the intensional definition, states the immediate superordinate concept plus the delimiting characteristic(s) that separate the concept from its siblings. A definition is valid only if it can replace its term in running text "without loss of or change in meaning". That is the substitution principle.

## Key evidence (verbatim from the 2022 preview unless marked)

- **3.3 intensional definition**: "definition that conveys the intension of a concept by stating the immediate superordinate concept and the delimiting characteristic(s)". EXAMPLE 1: "optical mouse: computer mouse in which movement is detected by light sensors." Note 1: intensional definitions "are preferable to other types of definitions because they clearly reveal the delimiting characteristics of a concept within a concept system: they should be used whenever possible." [SOURCE: ISO 1087:2019, 3.3.2, modified]
- **5.4.3**: "The set of characteristics that make up the concept is the intension of the concept. The set of objects conceptualized as a concept is the extension of the concept. The intension determines the extension."
- **5.4.4, essential vs non-essential characteristics (the lossless test at the level of features)**: if 'using a wireless light or sound connection' is removed from 'wireless mouse', "the concept represents a different concept corresponding to a different set of objects. Therefore, this is an essential characteristic." If 'having colour' is removed, "the concept is not altered", so colour is non-essential. "The absence of an essential characteristic ... leads to poor or even erroneous understanding of the concept."
- **5.4.2**: "the number of properties that distinguish one object from another is effectively infinite", so characteristics are selected for a purpose ("the property 'place of manufacture' need not be considered").
- **5.4.5**: shared characteristics mark similarity and delimiting characteristics mark difference. The same characteristic can delimit with respect to one concept and be shared with another. The analysis yields "the unique set of characteristics that make up a given concept."
- **5.1 EXAMPLE**: one concept, 'water', gets different definitions for chemistry, physics and biology. Characteristics are chosen relative to domain and audience.
- **Introduction 0.1**: the aim is "terminology used for unambiguous communication in natural language, in particular special languages".
- **Substitution principle (wording from an earlier edition, via a third-party excerpt)**: "The substitution principle shall be used to test the validity of a definition. A definition is valid if it can replace a designation in a text without loss of or change in meaning." This is attributed to ISO 704 clause 6.3.5, which matches the 2000 edition's TOC entry "6.3.5 Principle of substitution". Source: HTA Glossary, "Excerpts from the ISO standards 10241 and 704", https://htaglossary.net/Excerpts-from-the-ISO-standards-10241-and-704. **UNVERIFIED for 2022**: the 2022 TOC lists "6.4.4 Applying the substitution principle" (p. 39), but its text was not read.
- **UNVERIFIED (not read)**: the 2022 clauses 6.4.3 (writing intensional definitions), 6.5 (deficient definitions, e.g. circular, incomplete or negative definitions) and Annex A (other definition types).

## Sources it builds on

- Wüster, E. (1979/1985). *Einführung in die allgemeine Terminologielehre und terminologische Lexikographie*. Its concept-oriented General Theory of Terminology is the origin of ISO/R 704:1968.
- ISO 1087:2019, *Terminology work and terminology science: Vocabulary*. This is the normative reference; 3.3 is quoted from it.
- ISO 24156-1 (UML concept models); ISO 10241-1/-2 (terminological entries in standards).
- The classical Aristotelian definition *per genus proximum et differentiam specificam* (Topics). The standard's "immediate superordinate concept" is the *genus proximum*.

## Works that cite it / apply it (forward)

- ISO 10241-1:2011, which applies the 704 definition rules to the term entries of every ISO and IEC standard. HTA excerpt 5.2.5 b): "a basic part stating the class to which the concept belongs" plus "another part enumerating the characteristics that distinguish the concept from other members of the class."
- Seppälä, S., Ruttenberg, A., & Smith, B. (2017). Guidelines for writing definitions in ontologies. *Ciência da Informação* 46(1), 73-88, doi:10.18225/ci.inf.v46i1.4015. Existence and bibliographic data verified; content not read.
- Pozzi, M. (2007), cited above. A TC 37 internal critique: 704 accepts extensional definitions, while 1087-1 defines them as mere "description[s]".
- Critique: Temmerman, R. (2000), *Towards New Ways of Terminology Description: The sociocognitive approach* (Benjamins). It argues that many concepts are prototype-structured and resist genus+differentia. UNVERIFIED (not read in this session).

## Relevance to AI answer style

ISO 704 gives an operational test for the PRECISION vs COMPRESSION distinction. A precise term is a compressed pointer to a definition, and the substitution principle checks that pointer: if the reader could expand the term back into "superordinate + delimiting characteristics" and recover the intended meaning, the term is lossless. If expansion gives something broader, narrower or different, the term was COMPRESSION. Clause 5.4.4 supplies the matching test for omissions. Dropping a non-essential characteristic (colour) leaves the concept intact and is safe brevity. Dropping an essential one turns it into a different concept with a different extension, which is lossy compression. Clause 5.1's 'water' example adds a caveat: which characteristics are essential depends on the domain and the audience. A term can therefore be lossless for an expert and lossy for a novice. This fits the expertise-reversal findings already covered (Kalyuga et al. 2003).

## Candidate rules for the harness

1. **Substitution check for key terms.** Before using a technical term in place of an explanation, check that a short genus+differentia gloss ("X: a [superordinate] that [delimiting characteristic]") could replace it in the sentence without changing what the sentence asserts. If the reader may not know the term, give that gloss once, at first use.
2. **Cut non-essential, never essential, characteristics.** When shortening, drop only qualifiers whose removal leaves the referent set unchanged (the 'colour of the mouse' test). Keep any qualifier whose removal would widen or shift what the claim covers, such as a version, condition, scope or exception.
3. **Define by nearest genus.** When a definition is needed, name the immediate superordinate (not a distant one like "a thing" or "a tool") plus the one or two features that separate the concept from its siblings. Avoid circular glosses and glosses that only say what the concept is not.

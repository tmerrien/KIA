# Cabré (2002): Terminology and linguistics, the theory of doors (with Wüster's General Theory of Terminology)

## Citation
Cabré, M. Teresa. "Terminología y lingüística: la teoría de las puertas." *Estudios de Lingüística del Español* (ELIES), vol. 16, 2002 (ISSN 1139-8736). Spanish translation by Rosanna Folguerà of "Terminologie et linguistique: la théorie des portes", *Terminologies nouvelles* 21, pp. 10–15.
Link (open access, UAB repository): https://ddd.uab.cat/pub/elies/elies_a2002v16/elies_a2002v16a4/Cabre.html

- The year 2002 and volume 16 come from the repository path. The page itself does not print them.
- UNVERIFIED: the year of the French original (*Terminologies nouvelles* 21, probably 2000).
- I did not open Wüster's own works: the 1931 dissertation and *Einführung in die allgemeine Terminologielehre und terminologische Lexikographie* (1979, posthumous). They are described here only as Cabré reports them.

## Core claim
Wüster's General Theory of Terminology (GTT/TGT) is prescriptive. It starts from the concept ("el concepto precede a la denominación"), and its goal is "garantizar la precisión y la univocidad de la comunicación profesional" through standardized, single-meaning terms. Cabré says this is "reduccionista e idealista". In its place she proposes a communicative theory: a term is an ordinary lexical unit that takes on specialized value in context. It can be entered through three "doors", the linguistic, the cognitive and the communicative. How dense and how single-meaning the terms in a text are depends on how specialized the text is.

## Key evidence (from the text)
- **The GTT's tenets as Cabré states them:** concept priority, with an onomasiological method (concept → name). It is strictly synchronic, its object is "las unidades unívocas normalizadas", and standardization removes variation in naming. Terms are treated as having no pragmatic value and no semantic variation.
- **Critiques:**
  - it idealizes knowledge and communication;
  - it reduces the field to standardization;
  - it assumes specialized knowledge is uniform and universal;
  - it ignores syntax, variation and communicative context;
  - it is "no falsable".
- **Density gradient:** the higher the level of specialization, the higher the terminological density, and the closer the text comes to monosemy. Less specialized texts show more synonymy, paraphrase and ambiguity. This is an argument from description, not a quantified study.
- **Origin of meaning:** a term's meaning is produced by "negociación entre expertos". Precision is therefore a convention shared by an expert community, not a property of the word.

## Sources it builds on
- Wüster (1931 dissertation; 1979 *Einführung*). Named in the text but not in the reference list.
- Cabré 1999, *La terminología: representación y comunicación* (UPF/IULA).
- Diki-Kidiri 1999, *Meta* 44(4).
- Rey 1999.
- Slodzian 1994/1995.

## Works that cite it / the line of work it opens (forward)
None of these have been checked for direct citation. All UNVERIFIED as citing this specific article:
- Cabré Castellví 2003, "Theories of terminology: their description, prescription and explanation", *Terminology* 9(2):163–199 (the longer English version of this argument).
- Temmerman 2000, *Towards New Ways of Terminology Description: the sociocognitive approach* (Benjamins).
- Faber (ed.) 2012, *A Cognitive Linguistics View of Terminology and Specialized Language* (Frame-Based Terminology).
- ISO 704 (editions 2000/2009/2022). This is the standard that puts the Wüsterian principles into practice: intensional definitions, the substitution principle, concept systems. I could not open it (paywalled), so its wording is UNVERIFIED here.

## Relevance to AI answer style
This text separates two meanings of "precision".
1. **Wüsterian precision:** one concept, one term, no synonyms. Using the standardized term carries the whole concept in one token. This is lossless compression, but only for readers who share the concept system.
2. **Cabré's correction:** a term only carries its meaning inside a community and at a particular level of specialization. For a non-expert, a dense term is not precise. It is lossy, because the reader cannot unpack it.

So an assistant should set terminological density to the reader's level of specialization. With experts it should use the exact term and keep it fixed (no "elegant variation"). With novices it should give the term together with a short intensional gloss, not drop the term, and not paraphrase it away.

## Candidate rules for the harness
1. **One concept, one term, used consistently.** Once a term is introduced, do not swap in synonyms for the same concept within an answer. Each synonym makes the reader ask whether it is a different thing.
2. **Match term density to the reader's level of specialization.** For an expert, the precise term is enough. For a non-expert, put the term first, then add a one-clause definition (genus + differentia). Never drop the term to save words, and never replace it with a vague paraphrase.
3. **A term is precise only if the reader shares its concept.** If the conversation has not shown that the reader knows a specialist term, treat that term as unexplained, and therefore lossy, until it is glossed.

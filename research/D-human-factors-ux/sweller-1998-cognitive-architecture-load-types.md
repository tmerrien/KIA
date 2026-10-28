# Sweller, van Merrienboer & Paas (1998): Cognitive architecture and instructional design

## Citation
Sweller, J., van Merrienboer, J. J. G., & Paas, F. G. W. C. (1998). Cognitive architecture and instructional design. *Educational Psychology Review*, 10(3), 251-296. doi:10.1023/A:1022193728205. https://doi.org/10.1023/A:1022193728205

**What was actually read.** The 1998 article is closed access: Semantic Scholar marks it CLOSED, and the University of Twente repository record (https://research.utwente.nl/en/publications/cognitive-architecture-and-instructional-design/) has the abstract but no file. The only copies I found were on a course server and on Scribd. I did not use either. So the 1998 text itself was NOT read.

The content below comes from the authors' own retrospective, read in full: Sweller, J., van Merrienboer, J. J. G., & Paas, F. (2019). Cognitive architecture and instructional design: 20 years later. *Educational Psychology Review*, 31(2), 261-292. doi:10.1007/s10648-019-09465-5. It is CC BY and was read from the University of Wollongong repository copy (https://ro.uow.edu.au/sspapers/4554; file https://ndownloader.figshare.com/files/50496330).

Page numbers below are pages of the 2019 article. Claims about the 1998 paper rest on the 2019 article's own description of it. The citation counts come from the OpenAlex API in October 2026: about 6,000 for the 1998 paper and about 2,300 for the 2019 paper.

## Core claim
Working memory is limited in capacity and duration for new information. Long-term memory is effectively unlimited and stores schemas, and once something is stored as a schema it is handled as a single element. Instruction should therefore cut extraneous load, meaning load caused by how the information is presented. It should keep intrinsic load, meaning load caused by element interactivity in the material relative to the learner's existing knowledge, within working-memory capacity. The capacity this frees goes to germane processing, which is schema construction.

## Key evidence
- **Three load types as stated in 1998** (2019, pp. 263-264):
  - *Intrinsic* load is "the complexity of the information being processed", tied to element interactivity. It depends on "both the complexity of the information and the knowledge of the person processing that information". It "only can be changed by changing what needs to be learned or changing the expertise of the learner".
  - *Extraneous* load is set by "how the information is presented and what the learner is required to do", so instructional design can change it.
  - *Germane* load is the load "required to learn".
- **Germane load was revised later** (p. 264). In 1998, germane load was assumed to add to the total load, standing in for extraneous load. The theory now says germane load *redistributes* working-memory resources toward intrinsic content and adds no load of its own. Since Sweller et al. (2011), only intrinsic and extraneous load count as basic categories (p. 281). Anything that cites "germane load" as a third quantity is using the 1998 version.
- **Seven effects reported in 1998** (Table 1, pp. 265-267). Six of them work by cutting extraneous element interactivity. The variability effect raises intrinsic load instead.
  - *Goal-free*: Sweller & Levine 1982.
  - *Worked example*: Sweller & Cooper 1985.
  - *Completion problem*: van Merrienboer & Krammer 1987.
  - *Split-attention*: Tarmizi & Sweller 1988. Two sources that are each unintelligible alone should be integrated into one.
  - *Redundancy*: Chandler & Sweller 1991. Two "self-contained" sources should be replaced with one. A heart diagram shown alone beat the same diagram plus text restating it, because learners spend effort discovering "that the information from the two sources is identical" (p. 268).
  - *Modality*: Mousavi et al. 1995.
  - *Variability*: Paas & van Merrienboer 1994. Varied practice raises intrinsic load but improves transfer, provided total load stays within limits (p. 269).
- **Evidence type** (p. 265). Many experiments in 1998 did not measure load directly. They tested whether designs derived from the theory improved learning. The measurement tool of the time was Paas's (1992) subjective mental-effort rating scale (p. 281).
- **Effects added after 1998** (pp. 276-278). These are compound effects that limit the simple ones:
  - *Element interactivity*: the simple effects disappear with low-interactivity material.
  - *Expertise reversal*: Kalyuga et al. 2003.
  - *Guidance fading*: "additional information ... may become redundant and impose an unnecessary cognitive load" as expertise grows (p. 277).
  - *Transient information*: Leahy & Sweller 2011. Information that disappears forces learners to hold it in working memory. This raises extraneous load and reverses the modality advantage for long audio passages (pp. 277-278).

## Sources it builds on (backward)
Miller (1956); Peterson & Peterson (1959); De Groot (1946/1965) on chess expertise; Ericsson & Kintsch (1995) on long-term working memory; Baddeley (1992) on modality-specific working memory; Sweller (1988) *Cognitive load during problem solving*; Sweller & Cooper (1985); Chandler & Sweller (1991); Paas (1992). All are named in the 2019 article as sources of the 1998 architecture.

## Works that cite it (forward)
- Paas, Renkl & Sweller (2003), *Educational Psychologist* 38(1). Special issue introduction (UNVERIFIED that it cites the 1998 paper directly; inferred from reference lists).
- Kalyuga, Ayres, Chandler & Sweller (2003), expertise reversal effect.
- Mayer, *Multimedia Learning* (2001; 2014 *Cambridge Handbook*). Its coherence and redundancy principles build on this paper (p. 284 of the 2019 article).
- Sweller (2010), *Educational Psychology Review* 22. Element interactivity determines extraneous load as well as intrinsic load.
- Sweller, Ayres & Kalyuga (2011), *Cognitive Load Theory* (Springer). Germane load reconceptualised.
- Leahy & Sweller (2011), transient information effect.
- Sweller et al. (2019), the 20-year update read here.

## Relevance to AI answer style
CLT gives an operational test that separates PRECISION from COMPRESSION:
- **Padding is extraneous load.** Restating content the reader can already understand on its own is the redundancy effect, a measurable cost and not a matter of taste. Examples are a prose paraphrase of a code block, or a summary that repeats the list right above it. Cutting it is pure gain.
- **Dropping needed content cuts intrinsic content, not load.** Intrinsic load can only be reduced "by changing what needs to be learned" (p. 264). An answer that omits a needed step, a caveat, or the relation between two facts has changed the task. That is lossy compression. It is not a gain in efficiency.
- **Precise terms lower element interactivity, but only for readers who know them.** For a reader who knows the term, an exact term ("idempotent", "race condition") is retrieved as *one* element. For a novice, the same word is many interacting elements, as in the paper's "characteristics" example (p. 264). How dense a term can be depends on the reader's expertise (expertise reversal and guidance fading). A term carries the whole idea only if the reader already holds its schema. Otherwise it needs a short gloss the first time it appears.
- **Split-attention.** The explanation should sit next to what it explains. Writing "see above" or splitting a code snippet from the note that interprets it forces the reader to integrate the two mentally.
- **Transient information.** Chat output persists on screen, unlike speech. Long unsegmented blocks still behave as transient for a reader who scrolls, which argues for segmentation (UNVERIFIED extrapolation; not tested in the source).

## Candidate rules for the harness
1. **No self-contained duplicates.** Do not restate in prose what a table, list, code block or earlier sentence already says completely (redundancy effect). Restatement is allowed only when it *adds* a relation or an implication.
2. **Cut presentation cost, never task content.** Shorten by removing extraneous load: hedging, preamble, repetition, and references that point elsewhere. Never shorten by deleting steps, conditions or caveats that the user's task needs. That changes intrinsic content and is lossy compression.
3. **Calibrate term density to the reader.** Use the exact technical term when the user's own wording shows they hold it. Otherwise give a gloss of a few words on its first use. Drop glosses as the conversation shows expertise (guidance fading). Put each explanation directly beside the code or data it refers to (split-attention).

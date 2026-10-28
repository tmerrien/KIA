# Kalyuga & Sweller (2005): Rapid Dynamic Assessment of Expertise Combined with Cognitive Load (Cognitive Efficiency)

## Citation
Kalyuga, S., & Sweller, J. (2005). Rapid dynamic assessment of expertise to improve the efficiency of adaptive e-learning. *Educational Technology Research and Development*, 53(3), 83-93. doi:10.1007/BF02504800. https://doi.org/10.1007/BF02504800

- **Access status: FULL TEXT NOT READ.** This note rests only on the publisher abstract (Semantic Scholar Graph API, matching the ERIC EJ732688 record) and the paper's reference list (Semantic Scholar API). Every detail below that goes beyond those two sources is UNVERIFIED.
- Green OA record: UNSWorks handle http://hdl.handle.net/1959.4/42174 (CC BY-NC-ND 3.0 AU). On 2026-10-28 the DSpace REST API listed no public bundles for item 1060f094-047a-40e8-8953-eb3e6c2b08bc. This matches the 2004 paper's record (handle 1959.4/42176). Springer is paywalled. ERIC has no full text (e_fulltextauth = 0). The CiteSeerX cache 10.1.1.463.2825 was not used because it is a third-party copy of walled content.
- Citation counts on 2026-10-28: Semantic Scholar 261, OpenAlex 265.
- Why this work and not the queued one: the queued item, Kalyuga & Sweller (2004), already has a full note at `D-human-factors-ux/kalyuga-sweller-2004-rapid-first-step-diagnostic.md`, and the slug rule forbids overwriting it. This paper is its direct sequel and was queued as FOLLOW.

## Core claim (from the abstract)
Expertise can be assessed by "the content of working memory and the extent to which cognitive load has been reduced by knowledge retrieved from long-term memory." That means pairing the 2004 rapid first-step test with a measure of cognitive load. In an elementary-algebra tutor, instruction adapted dynamically to this combined measure produced "higher knowledge and cognitive efficiency gains" than a yoked, non-adapted control.

## Key evidence
- **Design (abstract, verified).** One experiment with an elementary-algebra tutor and a yoked-control design. The experimental group's instruction was "dynamically tailored to changing levels of expertise using rapid tests of knowledge combined with measures of cognitive load". Each control learner got "exactly the same instructional procedures" as their yoked partner.
- **Result (abstract, verified, direction only).** The adapted group gained more in knowledge and in cognitive efficiency. Sample size, effect sizes, the test statistic and the exact efficiency formula are UNVERIFIED because the full text was not read.
- **The added step over 2004 (inferred from the reference list, UNVERIFIED in detail).** The paper cites Paas & van Merrienboer (1993), the efficiency measure that combines mental effort with performance, and the dynamic task-selection studies of Camp, Paas, Rikers & van Merrienboer (2001) and Salden, Paas, Broers & van Merrienboer (2004). So "cognitive efficiency" here most likely means a performance score adjusted by a subjective mental-effort rating. On that reading, the same correct first step counts as stronger evidence of expertise when it was made with low reported effort.

## Sources it builds on (reference list, Semantic Scholar API)
- Kalyuga & Sweller (2004), the rapid first-step test (in this track).
- Kalyuga, Ayres, Chandler & Sweller (2003), the expertise reversal effect (in this track).
- Paas & van Merrienboer (1993), the efficiency of instructional conditions, *Human Factors* 35, 737-743.
- Camp et al. (2001) and Salden et al. (2004): dynamic task selection by performance, mental effort and efficiency in air-traffic-control training.
- Ericsson & Kintsch (1995), long-term working memory. Blessing & Anderson (1996), how people learn to skip steps.
- Renkl & Atkinson (2003), the fading of worked examples. Kalyuga, Chandler, Tuovinen & Sweller (2001), when problem solving beats studying worked examples.
- Chi, Glaser & Rees (1981) and Larkin, McDermott & Simon (1980), the expert-novice problem-solving literature.

## Works that cite it (Semantic Scholar counts, 2026-10-28)
- Kalyuga (2007), *Educ. Psychol. Rev.* 19, 509-539, doi:10.1007/s10648-007-9054-3 (about 1,080). Already queued and marked ACCESS-RISK.
- Sweller (2019) Cognitive load theory and educational technology, *ETR&D*, doi:10.1007/s11423-019-09701-3 (about 940).
- Koedinger, Corbett & Perfetti (2012), the KLI framework, doi:10.1111/j.1551-6709.2012.01245.x (about 825).
- van Gog & Paas (2008), Instructional efficiency: revisiting the original construct, *Educational Psychologist* 43(1), doi:10.1080/00461520701756248 (about 480). This critiques how efficiency measures are computed.
- Sweller (2018), Measuring cognitive load, *Perspectives on Medical Education* 7, doi:10.1007/s40037-017-0395-4 (about 370, OA).
- Kalyuga (2009), Knowledge elaboration: a cognitive load perspective, *Learning and Instruction*, doi:10.1016/j.learninstruc.2009.02.003 (about 220).

## Relevance to AI answer style
- **Signals of effort, not only correctness.** The 2004 paper read expertise from how deep the learner's first step went. This sequel (going by the abstract) adds how much load that step cost. For an assistant, the closest observable signal is how a user's message is phrased: hedges ("I think maybe..."), a stated struggle ("I've been stuck for hours") or visible trial-and-error. These suggest the user reached that depth at high effort, so the schema is fragile. A user who reaches the same depth fluently has a stable schema. This mapping is an extrapolation and is UNVERIFIED against the paper's own operationalisation.
- **Precision vs compression.** Leaving steps out is justified only when the reader holds the schema cheaply. A correct but effortful reader still needs the connecting steps. Removing them would be compression, not precision.

## Candidate rules for the harness
1. **Weigh depth by fluency.** Leave out steps only when the user's message reaches that depth *fluently*: precise terms, with no hedging or reported struggle. If the user is at the same depth but signals effort or uncertainty, keep the next connecting step explicit.
2. **Adapt dynamically, not once.** (This agrees with the R-rules from the 2004 note.) Treat each follow-up as a new rapid test, and adjust the level of guidance per turn rather than fixing it at the first message.

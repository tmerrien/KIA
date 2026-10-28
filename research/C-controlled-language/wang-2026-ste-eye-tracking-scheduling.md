# Wang & Friginal (2026): Does simpler mean easier? (STE eye-tracking)

## Citation
Wang, A. W. [Amber Wanwen Wang, ORCID 0000-0002-8026-5556], & Friginal, E. (2026). *Does simpler mean easier? What practitioners expected of Simplified Technical English, and what second-language readers' eyes showed.* SSRN preprint (posted content, Elsevier BV). doi:10.2139/ssrn.7651098. https://www.ssrn.com/abstract=7651098

**What was read.** The SSRN page and its PDF download both returned HTTP 403, so the full text was **not** read. This note rests on two sources:
1. the Crossref record (https://api.crossref.org/works/10.2139/ssrn.7651098; deposited 2026-10-21), which carries the abstract and the 30-item reference list;
2. the PolyU Scholars Hub record of a related talk by the same authors: "Methodology and Training Applications of Eye-Tracking Research for STE in Aviation Maintenance", IALCAER, Bayreuth, 26-28 June 2026, listed as presented only (https://research.polyu.edu.hk/en/publications/methodology-and-training-applications-of-eye-tracking-research-fo/).

Effect sizes, statistics, the panel's size and composition, and which STE rules were manipulated are all **UNVERIFIED**.

## Core claim
Readers got through STE text faster, but STE did not make processing easier. Per-word processing time was unchanged, and pupil size showed the same effort. Short STE sentences spread the work of integrating information across the text. Long sentences concentrate that work at the sentence-final word, where it triggers regressions. Controlled language therefore *schedules* integration rather than reducing it.

## Key evidence (from the abstract, paraphrased)
- **Design.** Mixed methods. A practitioner panel stated what they expected of STE; their expectations were then tested experimentally. The panel was analysed by thematic or qualitative text analysis, inferred from the references to Braun & Clarke 2006 and Kuckartz 2014; **UNVERIFIED**.
- **Participants.** N = 45 second-language readers of English from aviation and engineering programmes.
- **Materials.** 24 authentic aircraft-maintenance instructions, each in an STE version and a non-STE version.
- **Measures.** Eye movements and pupil size. Proficiency was measured with the Oxford Placement Test and working memory with an operation-span task (both inferred from the references). The models were mixed-effects models (lme4, statsmodels) and a time-course analysis of the pupil data (van Rij et al. 2019); **UNVERIFIED** in detail.
- **Speed.** As predicted, STE was read faster in total.
- **Effort.** STE did not reduce processing effort. Per-word processing time was unchanged, and pupil-indexed effort was the same.
- **Mechanism.** The cost of integrating information moves to a different place; it does not disappear. Short sentences spread it out, while long sentences pile it up at the final word and cause regressions. This is a clause and sentence wrap-up effect (Just & Carpenter 1980; Rayner et al. 2000; Hirotani et al. 2006).
- **Who benefits.** The time saving grew with English proficiency and with working memory. STE therefore helped the stronger readers more and did not favour the weakest readers it was designed for.
- **Expectation versus measurement.** The panel predicted that STE would be easier, and the eye data showed it was only faster. The exact wording of the panel's claims is **UNVERIFIED**.

## Sources it builds on (from the Crossref reference list)
- **Standard and earlier STE evaluations:** ASD-STE100 (2025); Shubert et al. (1995); Chervak, Drury & Ouellette (1996), "Simplified English for aircraft workcards"; Knezevic (2015).
- **Language error in aviation maintenance:** Drury, Ma & Woodcock (2009/2010), IJAP 20(1); Rankin (2003), MEDA.
- **Processing theory:** Gibson (1998), Dependency Locality Theory; Just & Carpenter (1980); Rayner, Kambe & Duffy (2000); Hirotani, Frazier & Rayner (2006); Clahsen & Felser (2006), the shallow-structure hypothesis for L2 learners.
- **Methods:** Conklin et al. (2018); Godfroid et al. (2025); Schmidtke (2018), pupillometry for L2 research; Unsworth et al. (2005, 2022); Conway et al. (2005); Laufer & Ravenhorst-Kalovski (2010), lexical coverage.
- **The authors' own corpus programme:** Wang & Friginal (2025), JEAL 4(2), a diachronic STE corpus study; Wang (2026), Applied Linguistics Review, on WARNING/CAUTION/NOTE; Wang (2026), IJCL, on dependency distance in maintenance English.

## Works that cite it
None found. The preprint was posted 2026-10-21, one week before this note was written.

## Relevance to AI answer style
This is the clearest direct evidence in the crawl for the claim that **shorter is not the same as easier.** Cutting a long sentence into short ones (the STE move) reduces reading time but leaves the reader's integration work unchanged. The work moves from one sentence-final pile-up to many smaller integration points. The reader must still relate the pieces to each other. If the connectives that carry those relations ("because", "so", "unless") were deleted to make the sentences short, the reader has to rebuild them.

The result fits the precision-versus-compression distinction:
- **Compression** (fewer words, chopped syntax, dropped connectives) buys speed, not understanding.
- **Precision** (the term that carries the relation) is what lowers the reader's work.

The proficiency result adds a caveat. Telegraphic text helped the stronger readers most, so it is not a safe default for novices.

This preprint corrects, rather than repeats, the speed and comprehension gains reported for STE by Shubert et al. (1995). It also fits the expertise-reversal finding already in the crawl (Chen, Kalyuga & Sweller 2017; Kalyuga & Sweller 2004): who gains from a format depends on who is reading.

## Candidate rules for the harness
1. **Do not shorten by deleting relations.** When splitting a long sentence, keep the logical connective ("because", "so", "but", "unless") at the start of the next sentence. A shorter sentence saves reading time only if the reader does not have to rebuild the link.
2. **Measure ease by integration work, not by word count.** Judge a concise rewrite by whether each sentence can be understood without holding unresolved pieces in mind. A shorter answer is not simpler by default.
3. **Put the key point first and the qualifiers after it.** Long sentences cost the most at the sentence-final wrap-up. Do not save the main point, or a condition that changes it, for the end of a long sentence. Put the main point first and attach the qualifiers in short, explicitly linked sentences after it.

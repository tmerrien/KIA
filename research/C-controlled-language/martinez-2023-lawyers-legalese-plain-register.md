# Martínez, Mollica & Gibson (2023): Even lawyers do not like legalese

## Citation

Martínez, E., Mollica, F., & Gibson, E. (2023). Even lawyers do not like legalese. *Proceedings of the National Academy of Sciences*, 120(23), e2302672120. doi:[10.1073/pnas.2302672120](https://doi.org/10.1073/pnas.2302672120). Open access (CC BY-NC-ND), PMC10266064.

- **Full text read:** the Europe PMC full-text XML (https://www.ebi.ac.uk/europepmc/webservices/rest/PMC10266064/fullTextXML), covering the main text, Methods and Constraints on Generality. The SI Appendix, which holds the stimuli and the subjective-difficulty statistics, was NOT read.
- **Companion study, abstract only:** Martínez, E., Mollica, F., & Gibson, E. (2022). Poor writing, not specialized concepts, drives processing difficulty in legal language. *Cognition*, 224, 105070. doi:10.1016/j.cognition.2022.105070. PMID 35257980.
  - I read the abstract via PubMed E-utilities.
  - The full text is open access (CC BY-NC-ND), but every repository copy I tried returned HTTP 403 or 429. **Its full text was NOT read.**
  - The layperson data in the 2023 paper are a reanalysis of this 2022 experiment.
- Preregistrations: https://osf.io/y8xjd/ (Exp. 1) and https://osf.io/b98j5/ (Exp. 2). Data: https://osf.io/dmkrx/.

**Why this work replaces the queued one.** The task named Shubert et al. (1995), but `shubert-1995-simplified-english-comprehensibility.md` already exists. I chose this study for three reasons:

1. It is the strongest open-access, full-text test in this track of whether simplifying a professional register costs content.
2. It tests directly whether *experts* are immune to complex phrasing.
3. Guitton et al. (2025), the queued controlled-language law study, cites it. Guitton was closed behind a Cloudflare check.

## Core claim

Lawyers, like laypeople, recall and understand contract clauses worse when the same content is written in a "legalese" register: center-embedded clauses, low-frequency jargon, passives and non-standard capitalization. Legal training raises overall performance but does not shrink the legalese penalty. Lawyers also rate plain-register versions as no less enforceable and as better on quality, hireability of the author and likelihood of client signature. That contradicts the claim that legal complexity is needed for precision.

## Key evidence

**Materials (Methods).**
- 12 pairs of contract excerpts of about 150 words each, the same materials as Martínez et al. (2022).
- Each pair is one legalese version and one simple version, "identical in content to the other excerpt but without the above features".
- Each pair has 12-15 comprehension questions written in a "neutral" register.
- Whether the two versions differ in word count is not reported in the main text (UNVERIFIED).

**Experiment 1: comprehension and recall.**
- Participants: 105 verified US attorneys, compared with 108 laypeople from the 2022 study.
- Each participant read 6 excerpts, 3 in each register, never both versions of the same contract.
- Each excerpt was followed by a distractor task (Author Recognition Test), free recall coded by propositions, and comprehension questions.
- Coders were blind to register.
- Register effect (both groups): plain English was better for comprehension (β = 0.354, SE = 0.088, P < 0.001) and for recall (β = 0.360, SE = 0.121, P = 0.003).
- Legal-training effect: lawyers were better overall at recall (β = 0.353, SE = 0.159, P = 0.026) and comprehension (β = 0.808, SE = 0.100, P < 0.001).
- **No register × training interaction** for recall (P = 0.360) or comprehension (P = 0.638). Expertise does not cancel the penalty from complex phrasing.
- Lawyers' predictions of how hard a text is for laypeople did not differ significantly from laypeople's own ratings. This counts against a curse-of-knowledge explanation. Details are in the SI, which I did not read.

**Experiment 2: lawyers' judgments.**
- Participants: 102 lawyers analysed (105 recruited). Each saw both versions of a contract, first separately and then side by side.
- Plain versions were rated higher quality (β = 1.705, P < 0.001).
- Plain versions were rated **no less enforceable** (P = 0.717).
- Authors of plain versions were rated more hireable (β = 1.835, P < 0.001).
- Lawyers were more willing to use the plain version as written (β = 1.432, P < 0.001).
- Lawyers predicted clients were more likely to sign the plain version (β = 1.232, P < 0.001).
- These results fit the authors' "copy-and-paste" (template inertia) hypothesis. They run against the "complexity of information" hypothesis, the claim that legal language must be complex to be "far more precise than ordinary language".

**Companion 2022 study (abstract only).**
- Corpus: about 10 million words. Contracts contain far higher rates of low-frequency jargon, center-embedding, passives and non-standard capitalization than nine baseline genres.
- Two experiments (N = 184): excerpts with these features were recalled and comprehended worse, "even for experienced readers".
- **Center-embedded clauses inhibited recall more than the other features.**
- The authors conclude that the difficulty comes "largely from working-memory limitations imposed by long-distance syntactic dependencies (i.e., poor writing) as opposed to a mere lack of specialized legal knowledge". This contradicts the "specialized concepts account".

**Authors' limits (Discussion and Constraints on Generality).**
- The results "do not imply that legal documents can be simplified limitlessly without sacrificing communicative aims".
- "Formality is not necessarily synonymous with complexity."
- "Some types of provisions will be less amenable to simplification."
- The lawyer sample is US-only.

**Confound to note.**
- In the 2023 design the four features vary together, so the study cannot separate their individual effects. Only the 2022 paper isolates the larger effect of center-embedding.
- Whether genuine terms of art were kept, or only archaic low-frequency words were replaced, cannot be checked without the stimuli in the SI (UNVERIFIED).

## Sources it builds on

- Gibson (1998) and Gibson et al. (2019) on dependency locality and efficiency. Both are already covered: `C-controlled-language/gibson-1998-dependency-locality.md` and `B-information-theory/gibson-2019-efficiency.md`.
- Piantadosi et al. (2011) on word length and frequency. Already covered: `B-information-theory/piantadosi-2011-wordlength.md`.
- Futrell, Mahowald & Gibson (2015), dependency length minimization across 37 languages (PNAS). The paper's ref. 14 is cited as this cross-language finding; the exact reference was not checked against the list (UNVERIFIED).
- Martínez, Mollica & Gibson (2022, *Cognition*). This is the corpus and layperson experiment, and the source of the stimuli.
- The "curse of knowledge" literature (refs. 35-36), presumably including Camerer, Loewenstein & Weber (1989), which is already in the queue (UNVERIFIED mapping).
- Legal-writing commentary: Tiersma's *Legal Language*, and Mellinkoff, as the sources of "habit, laziness", "tradition" and "precise" (UNVERIFIED: the reference list was stripped in my extraction).
- Earlier psycholinguistic jury-instruction work: Charrow & Charrow (1979), *Making Legal Language Understandable*, Columbia Law Review. It is cited by Guitton et al. (2025); whether it is cited here is UNVERIFIED.

## Works that cite it (OpenAlex cites-filter, Oct 2026)

- Martínez, Mollica & Gibson (2024). Even laypeople use legalese. *PNAS* 121, doi:10.1073/pnas.2405564121, PMC11363274. Abstract read.
  - Corpus: 59 million words of laws, which show elevated complex syntax compared with six baseline genres.
  - Experiments: two preregistered writing experiments (n = 286). Laypeople asked to write *official* laws wrote more convolutedly than when they wrote unofficial texts of equal conceptual complexity. This is the "magic spell" hypothesis.
  - Editing an existing document did not increase convolution, contrary to the copy-and-edit hypothesis.
  - Conclusion: laws "can be simplified without a loss or distortion of communicative content".
  - So the complexity signals authority or performativity; it does not carry information.
- Shulman, Markowitz & Rogers (2024). Reading dies in complexity: Online news consumers prefer simple writing. *Science Advances*, doi:10.1126/sciadv.adn2555, PMC11152133. Abstract read.
  - More than 30,000 headline field experiments: simpler headlines (common words, readable) won.
  - Readers skip complex headlines through a "simpler-writing heuristic".
  - Professional writers did not show the pattern. Writers misjudge readers, which complements the lawyers' finding here.
- Guitton, Tamò-Larrieux, Mayer & Zumbrunn (2025). Controlled Language Increases Comprehension of Law for People. *ACM JCSS* 3(1), 1-14, doi:10.1145/3711128. The Crossref abstract was read; the full text was blocked. With 73 participants, including members of parliament and public servants, controlled language increased understandability across legal domains "but does not reduce the number of terms that are perceived as open-texture". Simpler syntax does not remove vagueness that lives in the terms.
- Katz, Bommarito, Gao & Arredondo (2024). GPT-4 passes the bar exam. *Phil. Trans. R. Soc. A*, doi:10.1098/rsta.2023.0254. High citation count, but it is off-topic for answer style.
- "It's not merely about the content: How rules are communicated matters to administrative burden" (2023), *Public Administration Review*, doi:10.1111/puar.13751. OpenAlex lists it as a citing work. Authors and content were not checked (UNVERIFIED).

## Relevance to AI answer style

- **This is the clearest evidence that precision does not require convoluted syntax.** Lawyers themselves rated plain versions of equal content as no less enforceable. The cost of legalese comes mainly from long-distance dependencies (center-embedding), not from the concepts. An assistant can keep every term of art and every condition and still lower the load by restructuring.
- **Expertise is no exemption.** The register penalty was the same size for experts and novices (no interaction). A user's display of expertise licenses dense *terminology* (see R6 and R31). It does not license nested clauses, passives that hide the actor, or long subject-verb gaps. This sharpens R25 and R16.
- **Writers misjudge.** Template inertia ("copy-and-paste") and the "magic spell" effect of the 2024 paper both show that writers produce complexity for reasons other than content: habit, or signalling authority. The assistant equivalent is formal-sounding, hedge-laden boilerplate in "serious" answers, such as security, legal or medical topics. Formality can be kept through word choice without syntactic complexity.
- **The boundary from Guitton et al. (2025).** Simplifying structure did not reduce perceived vagueness of terms. Open-texture (vague or contested terms) must be fixed at the term level, by defining or specifying, not by syntax (R5, R12).
- **Measurement.** Comprehension and recall were measured by proposition-coded recall and question answering, not by reader preference. This supports R36. Here preference and comprehension happened to agree, but Shulman et al. show that writers' intuitions do not track readers' behaviour.

## Candidate rules for the harness

1. **Restructure, don't delete.** When an answer about a technical, legal or safety topic feels dense, first remove center-embedding: unnest relative or conditional clauses into separate sentences or a list, and keep subject and verb adjacent. Keep every term of art, condition and exception. Only then consider cutting content. (Kind: P/C. Sharpens R25 and R37.)
2. **Expert users get dense terms, not dense syntax.** Evidence of user expertise licenses unglossed technical terms. It never licenses nested clauses, agentless passives or capitalized pseudo-defined labels. The legalese penalty in this study was the same for lawyers and laypeople. (Kind: P. Guard on R31.)
3. **Formal topic, plain structure.** On high-stakes or "official" topics, do not shift to a formal-sounding register to signal seriousness: "shall", "hereinafter", stacked passives, preemptive boilerplate. Lawyers rated plain versions of equal content as no less enforceable and as higher quality. Seriousness belongs in exact terms and explicit conditions. (Kind: Pad/P. Guard: real distinctions, such as "must" vs "should" in a specification, are precision terms, not legalese.)

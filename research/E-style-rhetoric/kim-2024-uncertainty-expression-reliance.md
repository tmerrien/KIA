# Kim, Liao, Vorvoreanu, Ballard & Vaughan (2024), "I'm Not Sure, But...": LLM uncertainty expression and user reliance

**Substitution note.** The queued work was Thomas & Turner (1994), *Clear and Simple as the Truth*, but it already has a note at `E-style-rhetoric/thomas-turner-1994-classic-prose.md`. That note, and the Pinker note, leave one question open. Classic style bans liability hedges, but Nardo's critique says calibrated uncertainty is content. Which is right for an AI assistant? This note covers the empirical test of that question. I first tried Hyland (2005), "Stance and engagement" (*Discourse Studies* 7(2):173-192, doi:10.1177/1461445605050365), but it is closed access: Unpaywall and OpenAlex list no open copy, the HKU repository sits behind a Cloudflare challenge, and the UEA record says "Full text not available".

## Citation
Kim, S. S. Y., Liao, Q. V., Vorvoreanu, M., Ballard, S., & Vaughan, J. W. (2024). "I'm Not Sure, But...": Examining the Impact of Large Language Models' Uncertainty Expression on User Reliance and Trust. *Proceedings of the 2024 ACM Conference on Fairness, Accountability, and Transparency (FAccT '24)*, Rio de Janeiro. doi:10.1145/3630106.3658941.
- **Full text read:** arXiv:2405.00623v2, https://arxiv.org/abs/2405.00623
- **Pre-registration:** https://osf.io/mnrp9 (cited in the paper; I did not open it)

## Core claim
Prefixing an LLM answer with a natural-language hedge lowered users' agreement with the system and raised their accuracy, because they over-relied less on its wrong answers. The first-person form ("I'm not sure, but...") worked better than the impersonal form ("It's not clear, but..."). The authors warn that a hedge only helps when it tracks real uncertainty, and that "the precise language used matters."

## Key evidence
**Design.** Pre-registered, between-subjects, N=404 U.S. MTurk workers after 38.4% were excluded. Each participant answered eight yes/no medical questions. The AI answers were real Copilot-in-Bing responses, and they were right on exactly half the questions.
- Four conditions: Control (no hedge), Uncertain1st, UncertainGeneral, and No-AI.
- In the two hedge conditions, half the answers had the leading "Yes"/"No" replaced by a templated hedge. First-person: "I'm not {certain, sure}, but {it seems to me / it seems like / I would guess / I'd guess that}". General: "{It's unclear / It's not clear / There is uncertainty}, but it seems like". The templates follow Oba & Berger (2022).
- Apart from the hedge, the information content of every version was identical.

**Results** (model-estimated means; "sig." means statistically significant):

| Measure | Control | Uncertain1st | UncertainGeneral | No-AI |
|---|---|---|---|---|
| Agree with AI | 80.9% | 74.8% (sig.) | 77.6% (not sig.) | 58.4% |
| Correct | 63.9% | 72.8% (sig.) | 67.9% (not sig.) | 74.2% |
| Confidence in the answer | | lower (sig.) | lower (not sig.) | |
| Self-reported trust | | lower (sig.) | lower (not sig.) | |

- **Hedges trade a little accuracy on right answers for more on wrong ones.**
  - When the AI was correct, hedging that answer lowered user accuracy: 92.2% to 89.2% for first-person, 94.8% to 83.1% for general.
  - When the AI was wrong, hedging raised user accuracy more: 43.6% to 52.0%, and 32.8% to 48.0%.
  - Overall, having the AI's answer helped when it was right (88.5% vs 77.9% with no AI) and hurt badly when it was wrong (33.0% vs 64.7%). Hedging did not close that gap: the No-AI group still scored best.
- **Behaviour.** At the instance level, a hedged answer increased time on task and use of outside sources. Participants used the system less: UseAI fell from 73.2% to 57.4% on hedged answers in the general condition. Clicking the cited links was rare (2.7–7.2% between conditions), even though 74.7–85.5% of participants *said* they relied on the links. Some judged agreement from the link titles alone.
- **How users read the hedge.** In free text, 102 of the 186 participants in the hedge conditions took it to mean that the system could not find or reconcile an answer. A few read it as liability-avoidance or impression management, and the authors say those readings may not reduce over-reliance. Readers of the general form more often blamed the information or the question (51.5% vs 41.3%). Readers of the first-person form more often blamed the system itself (20.7% vs 7.4%).
- **Limits the authors state.**
  - Yes/no tasks only, not complex tasks.
  - The system's accuracy was low (50%), and it hedged half its answers "in a poorly calibrated manner".
  - Single session, U.S. English speakers.
  - First-person *confidence* may raise over-reliance, citing Zhou et al. (2024).

## Sources it builds on
- **Oba, D. & Berger, J. A. (2022).** "How Hedges Impact Persuasion." SSRN doi:10.2139/ssrn.4170915. The hedge templates and the first-person vs general contrast come from here.
- **Mielke, S. J., Szlam, A., Dinan, E., & Boureau, Y-L. (2022).** "Reducing Conversational Agents' Overconfidence Through Linguistic Calibration." *TACL* 10, 857-872. doi:10.1162/tacl_a_00494. Source for the observation that LLMs already say "I'm not sure, but my guess is".
- **Zhou, K., Jurafsky, D., & Hashimoto, T. (2023).** "Navigating the Grey Area." *EMNLP 2023*, 5506-5524. LLM-generated certainty expressions are poorly calibrated, especially the high-certainty ones.
- **Zhou, K., Hwang, J. D., Ren, X., & Sap, M. (2024).** "Relying on the Unreliable." arXiv:2401.06730. LLMs are reluctant to express uncertainty, and users over-rely on confident wording.
- **Zhang, Y., Liao, Q. V., & Bellamy, R. K. E. (2020).** Effect of confidence and explanation on trust calibration. *FAT* 2020*, 295-305.
- **Bansal, G. et al. (2021).** *CHI 2021*. Explanations can increase over-reliance.

## Works that cite it (forward)
Taken from the Semantic Scholar citation graph (API listing of citing papers; 145 citations per OpenAlex as of 2026-10-28). I did not read these papers, so their content is UNVERIFIED.
- Cheng, M. et al. (2025). "Sycophantic AI decreases prosocial intentions and promotes dependence." *Science*. The author list is UNVERIFIED.
- Kim, S. S. Y. et al. (2025). "Fostering Appropriate Reliance on Large Language Models: The Role of Explanations, Sources, and Inconsistencies." *CHI 2025*. The author list is UNVERIFIED.
- Wen, B. et al. (2024/2025). "Know Your Limits: A Survey of Abstention in Large Language Models." *TACL*. The author list is UNVERIFIED.
- Spatharioti, S. et al. (2025). "Effects of LLM-based Search on Decision Making: Speed, Accuracy, and Overreliance." *CHI 2025*. The author list is UNVERIFIED.

## Relevance to AI answer style
1. **It settles the classic-style hedge question empirically, within its domain.** Thomas & Turner exclude liability hedges because they are "insurance". In this study, a hedge carried decision-relevant information: it changed what users did, and it raised their accuracy on wrong answers. A hedge tied to real uncertainty is therefore **content (precision)**, not filler. A blanket liability caveat is the case participants read as "absolving it of responsibility", and the authors judge that reading unlikely to help.
2. **The hedge is cheap in words but expensive if miscalibrated.** Hedging a correct answer cost up to 11.7 points of user accuracy (general form). A hedge on every answer therefore *destroys* information: if every answer is hedged, the hedge no longer separates the answers that need checking from the ones that don't. This is lossy compression of a different kind: the signal is still there, but it no longer discriminates.
3. **Wording carries the signal, not just presence.** The same uncertainty, voiced in first person versus impersonally, gave different effect sizes and different attributions: the system's limits versus the information's. "The sources conflict" and "I'm not sure" are not interchangeable. The precise form should name the *locus* of the uncertainty.
4. **Placement.** The hedge *replaced* the leading Yes/No. That is a strong position: the answer starts with the uncertainty. This fits a focus-then-inspect order in which the status of the answer comes first, and it argues against burying the caveat at the end.
5. **Citations are not a substitute.** Users rarely open links (single-digit click rates) and treat link titles as confirmation. An answer cannot hand verification off to a source list. The uncertainty has to be stated in the prose.

## Candidate rules for the harness
1. **Hedge only where you would bet against yourself, and say why.** Put an uncertainty marker only on claims whose confidence is materially lower than the rest of the answer, and name its source: conflicting sources, missing data, or a limit of the model. Never put a hedge on every answer by default. A uniform hedge carries zero bits and lowers trust in the correct answers.
2. **Lead with the answer's status when it is uncertain.** For a low-confidence answer to a direct question, put the qualifier on the first clause ("Probably yes, but the sources conflict on X: ..."), not in a closing disclaimer. Make the stated next step concrete (what to check) rather than a generic "consult a professional".
3. **Do not use confident first-person framing as decoration.** Avoid "I'm confident that..." or "Obviously..." unless confidence is actually high. First-person framing amplified the effect of the hedge, and the authors warn that it may equally amplify unjustified confidence (citing Zhou et al. 2024; UNVERIFIED that this holds for confidence in this study, which tested only uncertainty).

# Steyvers et al. (2025): What large language models know and what people think they know

## Citation
Steyvers, M., Tejeda, H., Kumar, A., Belem, C., Karny, S., Hu, X., Mayer, L. W., & Smyth, P. (2025). What large language models know and what people think they know. *Nature Machine Intelligence*, 7, 221-231. doi:10.1038/s42256-024-00976-7
- Publisher page: https://www.nature.com/articles/s42256-024-00976-7 (redirected to a login page; NOT read)
- Full text read: arXiv:2401.13835v2 (revised 13 Feb 2025), https://arxiv.org/html/2401.13835v2. The last ~9k characters (reference tail / appendix) were not read.
- Volume and pages (7, 221-231) confirmed via Semantic Scholar metadata. Semantic Scholar lists the online/preprint date as 2024. Citation count on 2026-10-28 was 306.

## Core claim
When people read an LLM's default explanation, they are more confident in its answer than the model itself is (the *calibration gap*). They are also much worse than the model's own confidence at telling right answers from wrong ones (the *discrimination gap*). Two things drive the gap: longer explanations raise user confidence without helping users discriminate, while uncertainty phrases that match the model's internal confidence shrink both gaps.

## Key evidence
- **Models and tasks.** GPT-3.5 and PaLM2 answered 350 MMLU multiple-choice items. GPT-4o (gpt-4o-mini per Methods) answered 336 TriviaQA short-answer items. Model confidence came from token probabilities for MMLU and from a pTrue-style check for TriviaQA.
- **Participants.** 301 US-based native English speakers recruited on Prolific, about 40-60 per condition.
- **Exp. 1, default explanations:**

  | Model | ECE (model) | ECE (human) | AUC (model) | AUC (human) |
  |---|---|---|---|---|
  | GPT-3.5 | .104 | .264 | .751 | .589 |
  | PaLM2 | .154 | .291 | .746 | .602 |
  | GPT-4o | .141 | .165 | .781 | .592 |

  Human discrimination was barely above chance.
- **Exp. 2, manipulated explanations:**
  - Confidence prefixes were "I am not sure", "I am somewhat sure" and "I am sure". Human confidence moved strongly and in order: low < medium < high, BF > 100.
  - Length conditions:
    - long: no instruction; median 115, 64 and 95 words
    - short: "as few words as possible"; median 34, 24 and 24 words
    - uncertainty-only: about 9 words, no rationale
  - Long explanations raised confidence over short ones (BF = 25), and short over uncertainty-only (BF > 100).
  - Length did not improve discrimination: mean AUC was 0.54 for long and 0.57 for uncertainty-only (BF = 0.23).
- **Aligning the language with the model's confidence.** Choosing the uncertainty phrase from the model's internal confidence raised human AUC to .694, .652 and .689 (Exp. 2a-c), still below model AUC. Calibration error also fell.
- **No gain in accuracy.** Participants' own answer accuracy did not improve, and self-rated expertise did not predict better judgments.
- **Authors' suggested causes (speculative).** RLHF may reward long, persuasive explanations. Autoregressive generation may produce explanations that defend whatever answer was already chosen.

## Sources it builds on
- Kadavath et al. (2022), "Language models (mostly) know what they know" (the pTrue method)
- Guo et al. (2017), calibration of modern neural networks (ECE)
- Hendrycks et al. (2021), MMLU; Joshi et al. (2017), TriviaQA
- Jiang et al. (2021); Xiong et al. (2024); Tian et al. (2023): eliciting and calibrating LLM confidence
- Zhou et al. (2023, 2024): verbal uncertainty markers and user reliance
- Farquhar et al. (2024), semantic entropy
- Ouyang et al. (2022), RLHF
- Petty & Cacioppo (1984), central and peripheral routes to persuasion. This is the cited frame for length acting as a peripheral cue. Exactly how the paper uses it was not read verbatim (UNVERIFIED).

## Works that cite it
This list is only a partial sample: the first 100 citing records from the Semantic Scholar API, ranked by citation count.
- Fleming, S. M. (2026). Towards an integrative neuroscience of metacognition. *Nature Reviews Neuroscience*.
- Jaidka, K. & Cai, M.-X. (2026). Why we believe chatbots: trust calibration as a design problem. *Frontiers in Psychology*.
- Sabour, S. et al. (2026). Human preferences are susceptible to covertly misaligned AI advice. *PNAS*.
- Liu, G. K.-M. et al. (2026). Metacognition in LLMs: Foundations, Progress, and Opportunities. arXiv.
- Boie et al. (2026). Calibration of self-reported confidence ... medical QA. *J. Medical Systems*.
- Kim et al. (2024, FAccT), already covered in this crawl, runs a parallel line on the same question.

## Relevance to AI answer style
This is direct experimental evidence that padding is not neutral. Extra rationale words act as a confidence signal, not an information signal. A 115-word explanation made users more sure than a 9-word one, yet users were no better at spotting wrong answers. Padding is therefore worse than wasted words, because it miscalibrates the reader.

Precision works differently here. A single calibrated hedge ("I am not sure") did measurable work: it moved reader confidence toward the model's real confidence. The hedge carries the information; the length does not.

Caveat: the study measures confidence and discrimination, not comprehension or usefulness. It does not show that short rationales are always better. Its tasks are multiple-choice and trivia, where the rationale adds little checkable content.

## Candidate rules for the harness
1. **Length is a claim of confidence.** Do not lengthen an explanation to sound thorough. Add rationale only when it gives the reader something checkable, such as a source, a step or a number. Otherwise the extra words inflate trust without improving the reader's ability to catch errors.
2. **State calibrated uncertainty in a few words.** Open uncertain answers with an explicit confidence marker ("I'm not sure", "fairly confident", "confident") that matches the actual evidence. Never hedge everything uniformly. The marker only helps when it varies with real confidence.
3. **Never use fluent elaboration to defend a guess.** When the answer is uncertain, say so before giving the rationale. Do not write a confident-sounding justification and then add a caveat at the end.

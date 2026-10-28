# Shaikh et al. (2024): Grounding Gaps in Language Model Generations

## Citation
Shaikh, O.\*, Gligorić, K.\*, Khetan, A., Gerstgrasser, M., Yang, D., & Jurafsky, D. (2024). Grounding Gaps in Language Model Generations. *Proceedings of NAACL-HLT 2024 (Volume 1: Long Papers)*, pp. 6279-6296. Mexico City, June 16-21, 2024. doi:10.18653/v1/2024.naacl-long.348. (\* equal contribution; all authors at Stanford.)
- Full text read: https://aclanthology.org/2024.naacl-long.348.pdf. The author list, venue, pages and DOI were checked against the PDF and the Semantic Scholar record. The preprint is arXiv:2311.09144.
- Code and prompts: https://github.com/oshaikh13/grounding-gaps (cited in the paper; the repository itself was not opened).

## Core claim
LLMs given the same conversational context as human experts (teachers, emotional supporters, persuaders) produce far fewer **grounding acts** (clarification requests, acknowledgments, follow-up questions). They "simply 'provide the answer'" and presume common ground. Off-the-shelf generations are on average 77.5% less likely to contain a grounding act than the human turn they replace. When the models do ground, they do it in different places from humans (low Cohen's kappa). Instruction-following SFT does not close this gap, and preference optimization (DPO, PPO) widens it.

## Key evidence
- **Method: counterfactual turn simulation.** The data are 100 sampled conversations each from ESConv (emotional support), TSCC (teacher-student chat for English learners) and Persuasion for Good, truncated to the median length. For every expert turn u_t, the LLM gets the identical history C_1..t-1 plus a role instruction and generates g_t. A few-shot GPT-4 classifier labels human and model turns for three acts. Classifier macro-F1 was 0.89. Zero-shot it confused clarification and follow-up: clarification F1 was 0.40 zero-shot and 0.85 few-shot. Human annotation reached kappa = 0.72.
- **Act definitions** (from the expert listener's point of view):
  - *Clarification* clears up a potential misunderstanding of prior content ("did you mean...?").
  - *Acknowledgment* is a turn whose only purpose is a marker such as "ok" or "I see".
  - *Follow-up* asks for more on a prior utterance and so implicitly signals understanding.
  - The two kinds of question are separated by Benotti & Blackburn's "O.K. test": if prefixing "O.K." to the question sounds odd, it is a clarification.
- **Base rates (Table 2, GPT-3.5-turbo vs human).** ESConv follow-up 10.78 vs 27.87%, acknowledgment 1.05 vs 12.9%, clarification 0.0 vs 3.05%. TSCC clarification 0.57 vs 3.77%. Persuasion clarification 0.0 vs 0.28%. Averaged over datasets, follow-ups fall 64.3% and acknowledgments 83.4%. ChatGPT never clarified in ESConv or Persuasion.
  - Note: in the extracted PDF the Table 2 columns print in the order model, human, kappa, while the header lists Human first. The assignment above follows Table 3 and the prose, which agree on Human ESConv = 27.87, 12.89, 3.05.
- **Placement, not just rate.** Only 3 of 9 act-by-dataset kappas were significantly above zero. Mean kappa was 10.73 for follow-up, 11.13 for acknowledgment and 0.23 for clarification. A human-human control on ESConv gave kappa of about 37.5.
- **Error analysis.** One author coded 160 cases where the human grounded and the model did not:
  - no empathic acknowledgment: 43.9%
  - no follow-up for more information: 26.5%
  - no follow-up to continue the conversation: 12.9%
  - no clarification to verify understanding: 9.1%
  - no clarification to resolve a specific ambiguity: 7.6%
- **Model variants (ESConv, Table 3).** The newer models GPT-3.5-turbo and GPT-4 ground less than humans. The older-style gpt-3.5-instruct is closest to humans on follow-ups (29.35% vs 27.87%, kappa 22.2).
- **Training ablation.**
  - Mistral-7B was given Zephyr-style SFT on UltraChat. Across 10 checkpoints, SFT steps had no correlation with kappa (p > 0.1).
  - DPO on UltraFeedback correlated negatively with kappa for every act (follow-up R = -0.70, acknowledgment R = -0.89, clarification R = -0.78, all p < 0.05). The authors liken this to how preference optimization lengthens responses (Singhal et al. 2023).
  - In the Archangel Llama-7B suite (human-feedback data: OpenAssistant, SHP, Anthropic HH), PPO cut kappa by 39.0% and DPO by 42.5%.
- **Source in the data.** Few assistant responses contain any question at all: 11.83% in UltraChat and 18.35% in UltraFeedback. In UltraFeedback, questions are rarer in *preferred* responses (13.77%) than in dispreferred ones (18.35%), chi-squared = 484.08, p < 0.00001. Raters in single-step preference collection reward answers that are "immediately relevant to a prompt".
- **The prompting mitigation over-corrects.** The system prompt (App. E) told the model to ask clarifications, ask follow-ups and acknowledge, "like a trained therapist; do not overuse them". Follow-ups went from 10.76% to 42.32%, about 50% *more* than humans, with little gain in kappa. Clarification kappa fell from 0 to -1.65, significantly worse than chance. The authors conclude the gap is "a fundamental problem, difficult to address by prompting alone". They also note that an agent that always grounds "can be understandably irritating" (citing Horvitz 1999).
- **Limitations the authors state.** They measure positive grounding acts only (repair is out of scope). The data are English crowdworker dialogues. The classifier is GPT-4. The social domains studied are not technical Q&A.

## Sources it builds on (backward)
- Clark & Schaefer (1989), Contributing to discourse, *Cognitive Science* 13, 259-294. This is the contribution model and the evidence hierarchy. Clark (1996), *Using Language*, CUP.
- Clark & Brennan (1991). Already covered in this track; the paper builds on the same tradition but cites Clark & Schaefer and Clark 1996 as its anchors.
- Traum, D. R., & Hinkelman, E. A. (1992), Conversation acts in task-oriented spoken dialogue, *Computational Intelligence* 8(3) (details UNVERIFIED). This supplies the grounding-act inventory.
- Purver, M. (2004), *The Theory and Use of Clarification Requests in Dialogue*, PhD thesis, King's College London. Ginzburg & Cooper (2001). These cover clarification requests.
- Schegloff (1982) on "uh huh"; Jefferson (1972) on side sequences; Litman & Allen (1987) on subdialogues.
- Benotti, L., & Blackburn, P. (2021), Grounding as a collaborative process, EACL 2021 (source of the "O.K. test"; details UNVERIFIED).
- Tamkin, A., et al. (2022), Task ambiguity in humans and language models (arXiv:2212.10711, UNVERIFIED). Cited for users bringing underspecified tasks.
- Horvitz, E. (1999), Principles of mixed-initiative user interfaces, CHI '99. Cited for the cost of over-grounding.
- Ouyang et al. (2022, InstructGPT); Rafailov et al. (2023, DPO); Cui et al. (2023, UltraFeedback); Ethayarajh et al. (2024, Archangel/KTO).

## Works that cite it (forward)
Semantic Scholar, queried 2026-10-28: 83 citations, 10 marked influential. Titles and metadata only, not read:
- Shaikh, O., Mozannar, H., Bansal, G., et al. (2025). Navigating Rifts in Human-LLM Grounding: Study and Benchmark. ACL 2025, arXiv:2503.13975. Influential. This is the same first author's follow-up, moving to real human-LLM logs.
- Lachenmaier, C., Sieker, J., & Zarrieß, S. (2025). Can LLMs Ground when they (Don't) Know: A Study on Direct and Loaded Political Questions. ACL 2025, arXiv:2506.08952. Influential.
- Cheng, M., Hawkins, R. D., Jurafsky, D., et al. (2026). Accommodation and Epistemic Vigilance: A Pragmatic Account of Why LLMs Fail to Challenge Harmful Beliefs. ACL 2026, arXiv:2601.04435.
- Li, S., et al. (2025). ALFA: Aligning LLMs to Ask Good Questions: A Case Study in Clinical Reasoning. arXiv:2502.14860.
- Hua, Y., & Artzi, Y. (2024). Talk Less, Interact Better. arXiv:2408.01417. Also listed among Clark & Brennan's citers.
- Chiu, Y. Y., Sharma, A., Lin, I. W., et al. (2024). A Computational Framework for Behavioral Assessment of LLM Therapists. arXiv:2401.00820. The most-cited citer (101).
- Spangher, A., et al. (2024). NewsInterview: ... LLMs' Grounding Gap via Informational Interviews. arXiv:2411.13779. Influential.
- Influential surveys, details UNVERIFIED: "Building Common Ground in Dialogue: A Survey"; "Conversational Grounding in Large Language Models: Evaluation Methods, Challenges and Future Directions".

## Relevance to AI answer style
- **It names the failure that pure compression causes.** "Just provide the answer" is the instruction-tuned default, and preference data reward it, because single-turn raters penalize questions. When the user's referent or goal is underspecified, a dense, confident answer that presumes common ground is compression of the worst kind. It drops the step of establishing *what* is being answered. That step costs one clause, while a wrong answer costs a whole extra exchange (Clark & Brennan's least collaborative effort).
- **It also limits the fix.** Telling the model to "ask clarifying questions" produced over-eager grounding, misplaced so badly that agreement fell below chance. That is padding. The useful target is *placement*: ground where a skilled human would, which means real ambiguity or high stakes. A blanket rate does not help. This supports precision over volume: one well-placed clarifying clause beats either no check or a check on every turn.
- **Empty acknowledgments are not what is missing for an assistant.** The biggest gap in the error analysis was empathic acknowledgment in emotional-support talk. For a technical assistant the transferable parts are clarification for real ambiguity and the *implicit* grounding a follow-up provides. A one-clause restatement of the interpreted task ("Assuming you mean the staging config: ...") does both jobs without a round trip. It works like a trial reference with a try marker.
- **Caveat on scope.** Every domain studied was social: tutoring, support, persuasion. The paper does not measure technical Q&A, so carrying the rates over to a coding assistant is an inference.

## Candidate rules for the harness
1. **Ground before answering only when the referent or goal is truly ambiguous.** Ask one targeted clarification, or state the interpretation in one clause and proceed, when two readings would lead to materially different answers or the cost of error is high. Do not add clarifying or follow-up questions by habit: over-grounding scored worse than chance against where humans place them.
2. **Prefer implicit grounding to a round trip.** When a reasonable default reading exists, open with a compact statement of the interpretation ("Taking X to mean Y: ...") so a misreading shows at once. Do not presume common ground silently, and do not stall with a question the user can only answer one way.
3. **No content-free acknowledgments in task answers.** Do not open with "Great question" or "I understand". Show understanding through a relevant next move: the correct answer, a precise restatement, or a targeted follow-up. A bare acknowledgment marker adds no information in a revisable text medium.

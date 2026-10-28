# Cai, Duan, Haslett, Wang & Pickering (2024): Do large language models resemble humans in language use?

## Citation
Cai, Z. G., Duan, X., Haslett, D. A., Wang, S., & Pickering, M. J. (2024). Do large language models resemble humans in language use? In T. Kuribayashi, G. Rambelli, E. Takmaz, P. Wicke & Y. Oseki (Eds.), *Proceedings of the Workshop on Cognitive Modeling and Computational Linguistics (CMCL 2024)*, pp. 37-56. Bangkok: ACL. doi:10.18653/v1/2024.cmcl-1.4
- Published version, full text read (main text plus Appendices A-C): https://aclanthology.org/2024.cmcl-1.4.pdf. Bib entry verified at https://aclanthology.org/2024.cmcl-1.4.bib.
- Preprint: arXiv:2303.08014. v1 is dated 10 Mar 2023 and is titled "Does ChatGPT resemble humans in language use?". It tested ChatGPT only. v2 is dated 26 Mar 2024, adds Vicuna and takes the current title. https://arxiv.org/abs/2303.08014
- Preregistrations, data and code: osf.io/vu2h3 (ChatGPT) and osf.io/sygku (Vicuna). I did not open them.

## Core claim
The study ran 12 preregistered psycholinguistic experiments, two at each linguistic level from sounds to dialogue. ChatGPT (GPT-3.5, through the web interface, early 2023) showed the human pattern in 10 of them and Vicuna-13B in 7. Neither model showed two efficiency behaviours that humans show. They did not prefer the shorter of two near-synonyms when the context made the meaning predictable, and they did not use discourse context to resolve a syntactic ambiguity. The authors conclude that LLMs are humanlike "in many aspects" but that these specific context-driven economies are missing.

## Key evidence
Each item was presented 1000 times at default temperature, and the responses were analysed with mixed-effects logistic regression.

- **Word length and predictivity.** This replicates Mahowald et al. 2013, which is covered in `mahowald-2013-short-forms-predictive-contexts.md`. The models made a forced choice between a short and a long near-synonym, for example "Susan was very bad at algebra, so she hated... 1. math 2. mathematics".
  - The short form was chosen after predictive vs neutral preambles at these rates: ChatGPT 0.26 vs 0.20 (β = 0.35, z = 1.64, p = .101) and Vicuna 0.31 vs 0.31 (p = .444). Neither difference is significant.
  - The paper reports the item count inconsistently. The main text says "20 items", while Appendix B says 40 targets and 40 fillers, the same set as Mahowald. Appendix C says 39 items remained once the math/mathematics exemplar was dropped, which supports 40.
  - Comparison with the human data (Appendix C, not preregistered): both LLMs chose the short word far less often than humans (ChatGPT vs humans β = -3.14, z = -13.98; Vicuna vs humans β = -1.86, z = -7.61). For reference, the humans chose the short form at 67% after predictive and 56% after neutral contexts.
  - **The larger finding: the models default to the long form.** Humans' baseline preference is the short one. On the gradient, the paper is less clear-cut than its abstract. In the pooled ChatGPT-plus-human model there was a context effect (β = 0.44, p < .005) and no group-by-context interaction (p = .336). So ChatGPT's context sensitivity is not shown to be smaller than humans'. It is only non-significant on its own. Vicuna's interaction was significant (β = -0.60, p = .006).
  - The authors' explanation is tokenization. GPT-4's tokenizer splits *roach* into "ro"+"ach" and *cockroach* into "cock"+"roach", so the model may not treat the pair as near-synonyms.
- **Syntactic ambiguity resolution.** The test sentence was "The ranger killed the dangerous poacher with the rifle", a verb phrase / noun phrase (VP/NP) attachment ambiguity. Both models favoured the verb-phrase reading (ChatGPT 0.94 vs 0.06), and neither shifted toward the noun-phrase reading when the discourse introduced two poachers instead of one. For ChatGPT the proportions were 0.06 vs 0.06 (p = .861). Humans do shift (Altmann & Steedman 1988). The authors suggest the models may keep both parses at once, and they link this to the earlier finding that ChatGPT ignores context in pragmatic implicature (Qiu, Duan & Cai 2023).
- **Humanlike results, for contrast.**
  - Sound-shape and sound-gender symbolism.
  - Word-meaning priming. Recently used senses of ambiguous words such as *post* were reused: 0.53 vs 0.33 for ChatGPT.
  - Structural priming with a lexical boost.
  - Implicit causality (*scare* vs *fear*).
  - Sensitivity to the interlocutor's dialect. Told that the user was American, the models more often gave the American meaning of *bonnet* and American words such as *apartment*.
- **Results for ChatGPT only.**
  - Noisy-channel reinterpretation of implausible sentences.
  - More bridging than elaborative inferences (0.51 vs 0.26 "yes"). In the Moses-illusion task, ChatGPT flagged the weak impostor *mouse* more often than the strong impostor *cat* (0.17 vs 0.13).
- **Contamination check.** Removing the exemplar items quoted in the source papers did not change any pattern (Appendix C).
- **Limits.** The authors state three. The choice of tasks may look arbitrary, the designs differ from the human studies, and several experiments have no human data to compare against. I add three more of my own:
  - The models tested were GPT-3.5 and Vicuna in 2023, and ChatGPT ran in multi-trial web sessions.
  - Forced choice in a "game" prompt is not free production of an answer.
  - Coding of the response as short or long is not described as blind.

## Sources it builds on
- Mahowald, Fedorenko, Piantadosi & Gibson (2013), Cognition, and Piantadosi, Tily & Gibson (2011), PNAS. Both are already covered.
- Altmann & Steedman (1988), Cognition 30(3), on referential context in parsing, and Rayner, Carlson & Frazier (1983).
- Gibson, Bergen & Piantadosi (2013), PNAS 110(20), rational noisy-channel interpretation, and Levy et al. (2009), PNAS.
- Pickering & Branigan (1998), JML, on structural priming. Rodd et al. (2013), JML, on word-meaning priming.
- Singer & Spear (2015), on bridging vs elaborative inferences. Erickson & Mattson (1981) and Hannon & Daneman (2001), on semantic illusions.
- Cai et al. (2017), Cognitive Psychology, on accent and word meaning. Van Berkum et al. (2008).
- Piantadosi (2023), the LingBuzz paper arguing against Chomsky's approach; Mahowald, Ivanova et al. (2023), dissociating language and thought in LLMs.

## Works that cite it (influential forward citations)
These come from the Semantic Scholar citations API (fetched 2026-10-28). Except for HLB, where I read only the arXiv abstract, none of the papers below was read.
- **Duan, Xiao, Tang & Cai (2024).** HLB: Benchmarking LLMs' Humanlikeness in Language Use. arXiv:2409.15890. The authors' own follow-up runs 10 psycholinguistic experiments on 20 LLMs against more than 2,000 human participants. Humanlikeness is measured as distributional similarity, and the abstract reports that gains on other metrics did not reliably make models more humanlike, and sometimes made them less so. The abstract does not say whether the word-length task was kept (UNVERIFIED).
- **Haslett & Cai (2025?).** "Tokenization changes meaning in large language models: Evidence from Chinese." *Computational Linguistics*, doi:10.1162/coli_a_00557. It follows up the tokenization explanation. Authorship and year are UNVERIFIED.
- "LLMs syntactically adapt their language use to their conversational partner" (ACL 2025, arXiv:2503.07457). Semantic Scholar flags it as an influential citation. Authors not checked.
- Herbold, Hautli-Janisz, Heuer, Kikteva & Trautsch (2023). "AI, write an essay for me", arXiv:2304.14276. I read the abstract: ChatGPT essays have more nominalizations, greater lexical diversity and fewer discourse and epistemic markers than human essays. Publication in Scientific Reports is UNVERIFIED.
- Mahowald et al. 2013 and Dunn & Cai (2023, human replication) are referenced from the other direction; Dunn & Cai remains UNVERIFIED.

## Relevance to AI answer style
- **Brevity calibrated to predictability is not a default LLM behaviour.** Humans prefer the short form as a baseline and become more likely to use it when context has already given the meaning away. GPT-3.5 and Vicuna preferred the *long* form about 70-80% of the time and barely responded to context.
  - So a harness cannot assume that a model will, on its own, use the economical form a human writer would use where it is lossless.
  - In terms of this crawl's distinction, the models miss the safe kind of compression: shortening that predictability makes lossless, which is close to *precision*. The cue has to be explicit. Once a term is established or the reader's context makes it predictable, use the short form.
- **The models also ignore context when settling ambiguity.** The ambiguity result is the mirror image. Humans use discourse context, such as *two poachers*, to settle what an ambiguous phrase attaches to, and the models did not.
  - An answer generator may therefore leave a sentence ambiguous in a way that the context fails to resolve for the reader. Equally, it may fail to notice that its own wording admits two readings.
  - That supports an explicit ambiguity check on the draft, rather than trusting the model to have used context as a human would.
- **What can be assumed.** These are the behaviours a harness can probably take for granted:
  - Reusing the sense of a word the user has just used (word-meaning priming).
  - Reusing the user's sentence structures (structural priming).
  - Lexical adaptation to the user's stated dialect.
- **Caveat.** The evidence comes from 2023 models and forced-choice tasks. Current models may differ, and HLB suggests that capability gains do not guarantee humanlikeness. These rules should be treated as hypotheses to test on the deployed model.

## Candidate rules for the harness
1. **Shorten once the meaning is predictable.** After a term, name or concept is established in the conversation, refer to it by its shortest unambiguous form: the clipped word, the acronym or the head noun. Use the long or explicit form only at first mention or where the context does not yet predict the meaning. The reason this has to be stated is that LLMs prefer long forms by default and do not shorten when context makes a word predictable (Cai et al. 2024; human baseline from Mahowald et al. 2013).
2. **Check each draft for attachment ambiguity.** Before sending, look for modifiers, prepositional phrases and pronouns that could attach to two places ("deploy the service with the flag"). Rewrite any that the surrounding context does not clearly settle. Do not assume the reader will resolve them from the discourse the way the model resolved them. LLMs default to one parse and ignore disambiguating context (Cai et al. 2024).
3. **Keep the user's terms, but test the efficiency behaviours.** Reusing the user's words and dialect can be relied on, since it is humanlike in LLMs. Matching brevity to predictability, and resolving ambiguity from context, must be added and checked in evaluation, not assumed.

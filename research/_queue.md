# Queue: unfollowed proposals by priority

Source: the proposal list in `_budget.md`. Total entries: 163. By priority: p5=2, p4=40, p3=79, p2=41, p1=1.

Status counts: ACCESS-RISK=9, COMPANION=1, DROP=6, DUPLICATE=1, FOLLOW=132, PARTIAL=13, UPDATE=1.

Status key: FOLLOW = not yet covered; DROP = already a note (or read in full as a note's source); DUPLICATE = merged into another entry; UPDATE = amend an existing note; PARTIAL = already read in part inside another note; COMPANION = sibling of a covered note; ACCESS-RISK = an earlier attempt failed to get full text.

"Verifies" names the candidate rules in `_rules.md` whose counterexamples or guards this work would test. Use it to pick items for the rule-verification phase.

Remaining budget: 48 sub-agents (see `_budget.md`), shared with rule verification and final synthesis, so not every FOLLOW item can be taken.

## Recommended for the rule-verification phase

Chosen because each tests a counterexample or guard of a rule, or decides one of the open conflicts in `_findings.md` (gloss placement, grounding placement, re-anchoring, negated antonyms, warning reliability). Ordered by priority, then by how many rules it bears on.

- (p5) [A-pragmatics] Shaikh, O., Mozannar, H., Bansal, G., et al. (2025). Navigating Rifts in Human-LLM Grounding: Study and Benchmark. ACL 2025. arXiv:2503.13975  
  Verifies: R43. Status: FOLLOW: Follow-up on real human-LLM logs.
- (p5) [D-human-factors-ux] Hinds, P. J., Patterson, M., & Pfeffer, J. (2001). Bothered by abstraction: The effect of expertise on knowledge transfer and subsequent novice performance. Journal of Applied Psychology 86(6), 1232-1243. doi:10.1037/0021-9010.86.6.1232  
  Verifies: R53. Status: PARTIAL: Abstract read inside hinds-1999 note.
- (p4) [D-human-factors-ux] Mayer, R. E., & Johnson, C. I. (2008). Revising the redundancy principle in multimedia learning. Journal of Educational Psychology, 100(2), 380-386. doi:10.1037/0022-0663.100.2.380  
  Verifies: R19, R40. Status: FOLLOW: Cited second-hand in dejong-2010 and castro-alonso-2021 for short adjacent redundancy.
- (p4) [E-style-rhetoric] Kent, S. (1964). Words of Estimative Probability. Studies in Intelligence 8(4), 49-65. CIA (open access)  
  Verifies: R26, R58. Status: FOLLOW: Words of estimative probability; fixed word-to-confidence mapping.
- (p4) [A-pragmatics] Isaacs, E. A., & Clark, H. H. (1987). References in conversation between experts and novices. Journal of Experimental Psychology: General 116(1), 26-37.  
  Verifies: R31, R6. Status: FOLLOW: Experts vs novices in reference (clark-brennan-1991 sources).
- (p4) [B-information-theory] Tsipidi, E., Nowak, F., Cotterell, R., Wilcox, E., Giulianelli, M., & Warstadt, A. (2024). Surprise! Uniform Information Density Isn't the Whole Story: Predicting Surprisal Contours in Long-form Discourse. EMNLP 2024. arXiv:2410.16062  
  Verifies: R13, R44. Status: PARTIAL: Abstract and citation context read in verma-2023 and genzel-charniak-2002 notes.
- (p4) [B-information-theory] Futrell, R., Gibson, E., & Levy, R. P. (2020). Lossy-context surprisal: An information-theoretic model of memory effects in sentence processing. Cognitive Science 44(3), e12814.  
  Verifies: R44, R25. Status: FOLLOW: Lossy-context surprisal; the basis for re-anchoring (R44); overlaps the p3 Futrell 2015 entry.
- (p4) [D-human-factors-ux] Kalyuga, S., Chandler, P., & Sweller, J. (1998). Levels of expertise and instructional design. Human Factors, 40(1), 1-17. doi:10.1518/001872098779480587  
  Verifies: R31, R20. Status: FOLLOW: Described second-hand in kalyuga-2003.
- (p4) [D-human-factors-ux] Rey, G. D., & Fischer, A. (2013). The expertise reversal effect concerning instructional explanations. Instructional Science, 41(2), 407-429. doi:10.1007/s11251-012-9237-2  
  Verifies: R31, R55.
- (p4) [A-pragmatics] Hua, Y., Wang, E., & Artzi, Y. (2025). Post-training for Efficient Communication via Convention Formation. arXiv:2508.06482  
  Verifies: R8, R37. Status: FOLLOW: Authors' training fix for convention formation.
- (p4) [A-pragmatics] Krifka, M. (2007). Negated antonyms: Creating and filling the gap. In U. Sauerland & P. Stateva (Eds.), Presupposition and Implicature in Compositional Semantics, 163-177. Palgrave Macmillan.  
  Verifies: R9. Status: FOLLOW: Source of the four-way ordering tested in tessler-franke-2018.
- (p4) [C-controlled-language] Breznitz, S. (1984). Cry Wolf: The Psychology of False Alarms. Hillsdale, NJ: Lawrence Erlbaum.  
  Verifies: R45. Status: FOLLOW: Theoretical origin of cry-wolf (bliss-1995 sources).
- (p4) [C-controlled-language] Fernández-Silva, S., & Núñez Cortés, J. A. (2025). Exploring the Effect of Plain Terminology on Processing and Comprehension of Administrative Texts in Spanish: A Self-Paced Reading Experiment. International Journal of Applied Linguistics. doi:10.1111/ijal.12650  
  Verifies: R6. Status: FOLLOW: Isolates the terminology arm; same work as the p3 "(2024) Exploring the effect" entry, merged here.
- (p4) [A-pragmatics] Purver, M. (2004). The Theory and Use of Clarification Requests in Dialogue. PhD thesis, King's College London  
  Verifies: R43.
- (p4) [D-human-factors-ux] Yeung, A. S. (1999). Cognitive load and learner expertise: Split-attention and redundancy effects in reading comprehension tasks with vocabulary definitions. Journal of Experimental Education, 67(3), 197-217. doi:10.1080/00220979909598353  
  Verifies: R56. Status: COMPANION: Replication of yeung-jin-sweller-1998.
- (p3) [A-pragmatics] Horn, L. R. (1984), primary text, by library scan or the Kasher (Ed.) 1998 Pragmatics: Critical Concepts vol. IV reprint. This should be an update to the existing horn-1984-q-r-implicature.md, not a new slug.  
  Verifies: R9, R10. Status: UPDATE: Amend horn-1984-q-r-implicature.md; earlier attempts found only a lending-restricted scan.
- (p3) [A-pragmatics] Zhou, K., Jurafsky, D., & Hashimoto, T. (2023). Navigating the Grey Area: How Expressions of Uncertainty and Overconfidence Affect Language Models. EMNLP 2023.  
  Verifies: R26, R37. Status: FOLLOW: LLM certainty expressions poorly calibrated (cited in kim-2024).
- (p3) [D-human-factors-ux] Getty, D. J., Swets, J. A., Pickett, R. M., & Gonthier, D. (1995). System operator response to warnings of danger: A laboratory investigation of the effects of the predictive value of a warning on human response time. J. Experimental Psychology: Applied 1(1), 19-33.  
  Verifies: R45. Status: FOLLOW: Predictive value of warnings.
- (p3) [B-information-theory] Altmann, G., & Steedman, M. (1988). Interaction with context during human sentence processing. Cognition 30(3), 191-238. doi:10.1016/0010-0277(88)90020-0  
  Verifies: R12. Status: FOLLOW: Context resolves attachment in humans (cai-2024).
- (p3) [D-human-factors-ux] Agostinho, S., Tindall-Ford, S., & Roodenrys, K. (2013). Adaptive diagrams: Handing control over to the learner to manage split-attention online. Computers & Education. doi:10.1016/j.compedu.2013.01.007  
  Verifies: R56. Status: FOLLOW: Learner-controlled integration (oksa-2010 forward).

## Priority 5 (2 entries)

- **PARTIAL** [D-human-factors-ux] Hinds, P. J., Patterson, M., & Pfeffer, J. (2001). Bothered by abstraction: The effect of expertise on knowledge transfer and subsequent novice performance. Journal of Applied Psychology 86(6), 1232-1243. doi:10.1037/0021-9010.86.6.1232  
  Verifies: R53. Abstract read inside hinds-1999 note.
- **FOLLOW** [A-pragmatics] Shaikh, O., Mozannar, H., Bansal, G., et al. (2025). Navigating Rifts in Human-LLM Grounding: Study and Benchmark. ACL 2025. arXiv:2503.13975  
  Verifies: R43. Follow-up on real human-LLM logs.

## Priority 4 (40 entries)

- **PARTIAL** [B-information-theory] Tsipidi, E., Nowak, F., Cotterell, R., Wilcox, E., Giulianelli, M., & Warstadt, A. (2024). Surprise! Uniform Information Density Isn't the Whole Story: Predicting Surprisal Contours in Long-form Discourse. EMNLP 2024. arXiv:2410.16062  
  Verifies: R13, R44. Abstract and citation context read in verma-2023 and genzel-charniak-2002 notes.
- **PARTIAL** [B-information-theory] Duan, X., Xiao, B., Tang, X., & Cai, Z. G. (2024). HLB: Benchmarking LLMs' Humanlikeness in Language Use. arXiv:2409.15890  
  Verifies: R37. Abstract read inside cai-2024 note.
- **PARTIAL** [C-controlled-language] Martínez, E., Mollica, F., & Gibson, E. (2024). Even laypeople use legalese. PNAS 121, e2405564121. doi:10.1073/pnas.2405564121 (PMC11363274, OA)  
  Verifies: R50. Abstract read inside martinez-2023 note.
- **PARTIAL** [D-human-factors-ux] Tullis, J. G., & Feder, B. (2023). The 'curse of knowledge' when predicting others' knowledge. Memory & Cognition 51, 1214-1234. doi:10.3758/s13421-022-01382-3 (full text at education.arizona.edu)  
  Verifies: R31. Full text read inside hinds-1999 note; a standalone note mainly adds detail.
- **PARTIAL** [F-screen-reading] Shulman, H. C., Markowitz, D. M., & Rogers, T. (2024). Reading dies in complexity: Online news consumers prefer simple writing. Science Advances 10, eadn2555. doi:10.1126/sciadv.adn2555 (PMC11152133, OA)  
  Verifies: R36, R6. Abstract read inside martinez-2023 note (writers misjudge readers).
- **COMPANION** [D-human-factors-ux] Yeung, A. S. (1999). Cognitive load and learner expertise: Split-attention and redundancy effects in reading comprehension tasks with vocabulary definitions. Journal of Experimental Education, 67(3), 197-217. doi:10.1080/00220979909598353  
  Verifies: R56. Replication of yeung-jin-sweller-1998.
- **FOLLOW** [A-pragmatics] Krifka, M. (2007). Negated antonyms: Creating and filling the gap. In U. Sauerland & P. Stateva (Eds.), Presupposition and Implicature in Compositional Semantics, 163-177. Palgrave Macmillan.  
  Verifies: R9. Source of the four-way ordering tested in tessler-franke-2018.
- **FOLLOW** [A-pragmatics] Holtzman, A., Buys, J., Du, L., Forbes, M., & Choi, Y. (2020). The Curious Case of Neural Text Degeneration. ICLR 2020. arXiv:1904.09751  
  Verifies: R40. Same first author as holtzman-2018; degeneration/repetition.
- **FOLLOW** [A-pragmatics] Dou, Y., Forbes, M., Koncel-Kedziorski, R., Smith, N. A., & Choi, Y. (2022). Is GPT-3 Text Indistinguishable from Human Text? Scarecrow: A Framework for Scrutinizing Machine Text. ACL 2022. doi:10.18653/v1/2022.acl-long.501  
  Verifies: R40, R36. Human error taxonomy including redundancy.
- **FOLLOW** [A-pragmatics] Isaacs, E. A., & Clark, H. H. (1987). References in conversation between experts and novices. Journal of Experimental Psychology: General 116(1), 26-37.  
  Verifies: R31, R6. Experts vs novices in reference (clark-brennan-1991 sources).
- **FOLLOW** [A-pragmatics] Hua, Y., Wang, E., & Artzi, Y. (2025). Post-training for Efficient Communication via Convention Formation. arXiv:2508.06482  
  Verifies: R8, R37. Authors' training fix for convention formation.
- **FOLLOW** [A-pragmatics] Purver, M. (2004). The Theory and Use of Clarification Requests in Dialogue. PhD thesis, King's College London  
  Verifies: R43.
- **FOLLOW** [B-information-theory] Arnold, J. E., Losongco, A., Wasow, T., & Ginstrom, R. (2000). Heaviness vs. newness: The effects of structural complexity and discourse status on constituent ordering. Language 76(1), 28-55.  
  Verifies: R24, R25.
- **FOLLOW** [B-information-theory] Shannon, C. E. (1959). Coding theorems for a discrete source with a fidelity criterion. IRE National Convention Record 7(4), 142-163.  
  Verifies: R1, R39. Rate-distortion primary behind zaslavsky-2018.
- **FOLLOW** [B-information-theory] Futrell, R., Gibson, E., & Levy, R. P. (2020). Lossy-context surprisal: An information-theoretic model of memory effects in sentence processing. Cognitive Science 44(3), e12814.  
  Verifies: R44, R25. Lossy-context surprisal; the basis for re-anchoring (R44); overlaps the p3 Futrell 2015 entry.
- **FOLLOW** [C-controlled-language] Hellier, E., Edworthy, J., Weedon, B., Walters, K., & Adams, A. (2002). The perceived urgency of speech warnings: semantics versus acoustics. Human Factors 44(1), 1-17. doi:10.1518/0018720024494810  
  Verifies: R30, R45.
- **FOLLOW** [C-controlled-language] Breznitz, S. (1984). Cry Wolf: The Psychology of False Alarms. Hillsdale, NJ: Lawrence Erlbaum.  
  Verifies: R45. Theoretical origin of cry-wolf (bliss-1995 sources).
- **FOLLOW** [C-controlled-language] Fernández-Silva, S., & Núñez Cortés, J. A. (2025). Exploring the Effect of Plain Terminology on Processing and Comprehension of Administrative Texts in Spanish: A Self-Paced Reading Experiment. International Journal of Applied Linguistics. doi:10.1111/ijal.12650  
  Verifies: R6. Isolates the terminology arm; same work as the p3 "(2024) Exploring the effect" entry, merged here.
- **FOLLOW** [D-human-factors-ux] Mayer, R. E., & Johnson, C. I. (2008). Revising the redundancy principle in multimedia learning. Journal of Educational Psychology, 100(2), 380-386. doi:10.1037/0022-0663.100.2.380  
  Verifies: R19, R40. Cited second-hand in dejong-2010 and castro-alonso-2021 for short adjacent redundancy.
- **FOLLOW** [D-human-factors-ux] Pouw, W., Rop, G., de Koning, B., & Paas, F. (2019). The cognitive basis for the split-attention effect. Journal of Experimental Psychology: General, 148(11), 2058-2075. doi:10.1037/xge0000578  
  Verifies: R20. Split-attention non-replication cited in castro-alonso-2021.
- **FOLLOW** [D-human-factors-ux] Meyer, J. (2004). Conceptual issues in the study of dynamic hazard warnings. Human Factors 46(2), 196-204. doi:10.1518/hfes.46.2.196.37335  
  Verifies: R45. Compliance vs reliance.
- **FOLLOW** [D-human-factors-ux] Dixon, S. R., Wickens, C. D., & McCarley, J. S. (2007). On the independence of compliance and reliance: Are automation false alarms worse than misses? Human Factors 49(4), 564-572. doi:10.1518/001872007X215656  
  Verifies: R45.
- **FOLLOW** [D-human-factors-ux] Reder, L. M., & Anderson, J. R. (1980). A comparison of texts and their summaries: Memorial consequences. Journal of Verbal Learning and Verbal Behavior, 19(2), 121-134.  
  Verifies: R54, R19. Prior "summaries beat chapters" finding (mayer-1996 sources).
- **FOLLOW** [D-human-factors-ux] Kalyuga, S., Chandler, P., & Sweller, J. (1998). Levels of expertise and instructional design. Human Factors, 40(1), 1-17. doi:10.1518/001872098779480587  
  Verifies: R31, R20. Described second-hand in kalyuga-2003.
- **FOLLOW** [D-human-factors-ux] Renkl, A., & Atkinson, R. K. (2003). Structuring the transition from example study to problem solving in cognitive skill acquisition: A cognitive load perspective. Educational Psychologist, 38(1), 15-22. doi:10.1207/S15326985EP3801_3  
  Verifies: R31. Guidance fading.
- **FOLLOW** [D-human-factors-ux] Rey, G. D., & Fischer, A. (2013). The expertise reversal effect concerning instructional explanations. Instructional Science, 41(2), 407-429. doi:10.1007/s11251-012-9237-2  
  Verifies: R31, R55.
- **FOLLOW** [D-human-factors-ux] Wittwer, J., & Renkl, A. (2008). Why instructional explanations often do not work: A framework for understanding the effectiveness of instructional explanations. Educational Psychologist, 43(1), 49-64. doi:10.1080/00461520701756420  
  Verifies: R31, R32.
- **FOLLOW** [E-style-rhetoric] Kent, S. (1964). Words of Estimative Probability. Studies in Intelligence 8(4), 49-65. CIA (open access)  
  Verifies: R26, R58. Words of estimative probability; fixed word-to-confidence mapping.
- **FOLLOW** [E-style-rhetoric] Wallsten, T. S., Budescu, D. V., Rapoport, A., Zwick, R., & Forsyth, B. (1986). Measuring the vague meanings of probability terms. JEP: General 115(4), 348-365  
  Verifies: R26.
- **FOLLOW** [F-screen-reading] Miller, C. S., & Remington, R. W. (2004). Modeling information navigation: Implications for information architecture. Human-Computer Interaction, 19(3), 225-271.  
  Verifies: R33.
- **FOLLOW** [F-screen-reading] Brumby, D. P., & Howes, A. (2008). Strategies for guiding interactive search: An empirical investigation into the consequences of label relevance for assessment and selection. Human-Computer Interaction, 23(1), 1-46. doi:10.1080/07370020701851078  
  Verifies: R33.
- **FOLLOW** [F-screen-reading] Rayner, K., Schotter, E. R., Masson, M. E. J., Potter, M. C., & Treiman, R. (2016). So much to read, so little time: How do we read, and can speed reading help? Psychological Science in the Public Interest 17(1), 4-34. doi:10.1177/1529100615623267  
  Verifies: R23, R59.
- **FOLLOW** [F-screen-reading] Kieras, D. E. (1980). Initial mention as a signal to thematic content in technical passages. Memory & Cognition 8(4), 345-353.  
  Verifies: R23. "important information early" (duggan-payne-2009 sources).
- **FOLLOW** [G-precision-without-loss] Temmerman, R. (2017). Questioning the univocity ideal. The difference between socio-cognitive terminology and traditional terminology. Hermes - Journal of Language and Communication in Business 10(18), 51-90 (open access).  
  Verifies: R8. Univocity applies to clear-cut concepts only (quoted in koning-2023).
- **FOLLOW** [G-precision-without-loss] Gerzymisch-Arbogast, H. (1996). Termini im Kontext. Verfahren zur Erschließung und Übersetzung der textspezifischen Bedeutung von fachlichen Ausdrücken. Tübingen: Narr. Open PDF: http://www.translationconcepts.org/pdf/Termini.pdf  
  Verifies: R8. Channel for Wüster's relative univocity quotation (koning-2023).
- **FOLLOW** [G-precision-without-loss] Metropolitansky, D., & Larson, J. (2025). Towards Effective Extraction and Evaluation of Factual Claims (Claimify). ACL 2025. arXiv:2502.10855 (authors UNVERIFIED)  
  Verifies: R48.
- **ACCESS-RISK** [B-information-theory] Zhou, I., Hu, J., Levy, R., & Zaslavsky, N. (2021). Empirical support for a rate-distortion account of pragmatic reasoning. Proc. 43rd Annual Meeting of the Cognitive Science Society. https://escholarship.org/uc/item/0fg427ng  
  Verifies: R38. Zaslavsky-2020 note: eScholarship PDF came back empty.
- **ACCESS-RISK** [C-controlled-language] Loftus, G. R., Dark, V. J., & Williams, D. (1979). Short-term memory factors in ground controller/pilot communication. Human Factors, 21(2), 169-181.  
  Verifies: R21, R42. Morrow-prinzo-1999 note: no open full text; origin of the grouping/unique-encoding result.
- **DROP** [B-information-theory] Verma, V., Tomlin, N., & Klein, D. (2023). Revisiting Entropy Rate Constancy in Text. EMNLP 2023. arXiv:2305.12084  
  Note now exists: B-information-theory/verma-2023-revisiting-entropy-rate-constancy.md.
- **DROP** [F-screen-reading] Card, S. K., Pirolli, P., Van Der Wege, M., Morrison, J. B., Reeder, R. W., Schraedley, P. K., & Boshart, J. (2001). Information scent as a driver of Web behavior graphs: Results of a protocol analysis method for Web usability. CHI 2001. Open copy: https://research.cs.vt.edu/ns/cs5724papers/5.usageenvir.adaptation.card.infoscent.pdf  
  Note now exists: F-screen-reading/card-2001-web-behavior-graph-scent.md.

## Priority 3 (79 entries)

- **UPDATE** [A-pragmatics] Horn, L. R. (1984), primary text, by library scan or the Kasher (Ed.) 1998 Pragmatics: Critical Concepts vol. IV reprint. This should be an update to the existing horn-1984-q-r-implicature.md, not a new slug.  
  Verifies: R9, R10. Amend horn-1984-q-r-implicature.md; earlier attempts found only a lending-restricted scan.
- **PARTIAL** [A-pragmatics] Jeong, S., Potts, C., & Degen, J. (2024). Is the asymmetry in negative strengthening the result of adjectival polarity or face considerations? (CogSci 2024, venue unverified). https://alpslab.stanford.edu/papers/2024JeongEtAl.pdf  
  Verifies: R9. Full text read inside tessler-franke-2018 note; venue unverified.
- **PARTIAL** [C-controlled-language] Edworthy, J., et al. (2017). The recognizability and localizability of auditory alarms: setting global medical device standards. Human Factors 59(7), 1108-1127. doi:10.1177/0018720817712004  
  Verifies: R30. Abstract read inside edworthy-2013 note.
- **PARTIAL** [E-style-rhetoric] Herbold, S., Hautli-Janisz, A., Heuer, U., Kikteva, Z., & Trautsch, A. (2023). A large-scale comparison of human-written versus ChatGPT-generated essays. arXiv:2304.14276 (Scientific Reports version UNVERIFIED)  
  Verifies: R37. Abstract read inside cai-2024 note.
- **FOLLOW** [A-pragmatics] van der Henst, J.-B., Carles, L. & Sperber, D. (2002). Truthfulness and relevance in telling the time. Mind & Language 17(5), 457-466.  
  Verifies: R57, R5. Rounding experiment cited in wilson-sperber-2004.
- **FOLLOW** [A-pragmatics] van Rooij, R. (2004). Signalling games select Horn strategies. Linguistics and Philosophy 27(4), 493-527. doi:10.1023/B:LING.0000024403.88733.3f  
  Verifies: R9.
- **FOLLOW** [A-pragmatics] Camerer, C., Loewenstein, G., & Weber, M. (1989). The curse of knowledge in economic settings. Journal of Political Economy 97(5), 1232-1254.  
  Verifies: R31. Origin of "curse of knowledge".
- **FOLLOW** [A-pragmatics] Burkhardt, P. (2006). Inferential bridging relations reveal distinct neural mechanisms: Evidence from event-related brain potentials. Brain and Language 98(2), 159-168. doi:10.1016/j.bandl.2006.04.005  
  Verifies: R28, R41.
- **FOLLOW** [A-pragmatics] Vogel, A., Bodoia, M., Potts, C., & Jurafsky, D. (2013). Emergence of Gricean Maxims from Multi-Agent Decision Theory. NAACL-HLT 2013, pp. 1072-1081  
  Verifies: R38.
- **FOLLOW** [A-pragmatics] Rao, S., & Daumé III, H. (2018). Learning to Ask Good Questions: Ranking Clarification Questions using Neural Expected Value of Perfect Information. ACL 2018. doi:10.18653/v1/P18-1255  
  Verifies: R43.
- **FOLLOW** [A-pragmatics] Horn, L. R. (1991). Duplex negatio affirmat: The economy of double negation. CLS 27-II: Papers from the Parasession on Negation, 80-106.  
  Verifies: R9.
- **FOLLOW** [A-pragmatics] Li, J., Galley, M., Brockett, C., Gao, J., & Dolan, B. (2016). A Diversity-Promoting Objective Function for Neural Conversation Models. NAACL 2016. doi:10.18653/v1/N16-1014  
  Verifies: R38.
- **FOLLOW** [A-pragmatics] Zhou, K., Jurafsky, D., & Hashimoto, T. (2023). Navigating the Grey Area: How Expressions of Uncertainty and Overconfidence Affect Language Models. EMNLP 2023.  
  Verifies: R26, R37. LLM certainty expressions poorly calibrated (cited in kim-2024).
- **FOLLOW** [A-pragmatics] Maienborn, C. (2019). Events and states. In R. Truswell (Ed.), The Oxford Handbook of Event Structure. OUP (citation details UNVERIFIED)  
  Verifies: R48. Event/state semantics behind VeriScore claims.
- **FOLLOW** [A-pragmatics] Clark, H. H., & Schaefer, E. F. (1989). Contributing to discourse. Cognitive Science 13(2), 259-294.  
  Verifies: R7, R35. Contribution model.
- **FOLLOW** [A-pragmatics] Traum, D. R. (1994). A computational theory of grounding in natural language conversation. PhD thesis, University of Rochester.  
  Verifies: R43.
- **FOLLOW** [A-pragmatics] Vaduguru, S., Hua, Y., Artzi, Y., & Fried, D. (2025). Success and Cost Elicit Convention Formation for Efficient Communication. arXiv:2510.24023  
  Verifies: R8, R37.
- **FOLLOW** [A-pragmatics] Tamkin, A., Handa, K., Shrestha, A., & Goodman, N. (2022). Task Ambiguity in Humans and Language Models. arXiv:2212.10711 (ICLR 2023, venue UNVERIFIED)  
  Verifies: R43.
- **FOLLOW** [A-pragmatics] Cheng, M., Hawkins, R. D., Jurafsky, D., et al. (2026). Accommodation and Epistemic Vigilance: A Pragmatic Account of Why LLMs Fail to Challenge Harmful Beliefs. ACL 2026. arXiv:2601.04435  
  Verifies: R43.
- **FOLLOW** [B-information-theory] Futrell, R., Mahowald, K., & Gibson, E. (2015). Large-scale evidence of dependency length minimization in 37 languages. PNAS, 112(33), 10336-10341; then Futrell, Gibson & Levy (2020) Lossy-context surprisal, Cognitive Science.  
  Verifies: R25. Dependency length minimization; second half duplicates the p4 Futrell 2020 entry.
- **FOLLOW** [B-information-theory] Wasow, T., Perfors, A., & Beaver, D. (2005). The puzzle of ambiguity. In O. Orgun & P. Sells (Eds.), Morphology and the Web of Grammar: Essays in Memory of Steven G. Lapointe. CSLI Publications.  
  Verifies: R12.
- **FOLLOW** [B-information-theory] Tishby, N., Pereira, F. C., & Bialek, W. (1999). The information bottleneck method. Proc. 37th Allerton Conference, 368-377. arXiv:physics/0004057.  
  Verifies: R1, R39.
- **FOLLOW** [B-information-theory] Mollica, F., Bacon, G., Zaslavsky, N., Xu, Y., Regier, T., & Kemp, C. (2021). The forms and meanings of grammatical markers support efficient communication. PNAS 118(49).  
  Verifies: R1.
- **FOLLOW** [B-information-theory] Levy, R. P. (2018). Communicative Efficiency, Uniform Information Density, and the Rational Speech Act theory. Proc. CogSci 40, 684-689.  
  Verifies: R13.
- **FOLLOW** [B-information-theory] Keller, F. (2004). The Entropy Rate Principle as a Predictor of Processing Effort: An Evaluation against Eye-tracking Data. EMNLP 2004, ACL W04-3241.  
  Verifies: R13.
- **FOLLOW** [B-information-theory] Doyle, G., & Frank, M. C. (2015). Shared common ground influences information density in microblog texts. NAACL 2015, ACL N15-1182.  
  Verifies: R13.
- **FOLLOW** [B-information-theory] Giulianelli, M., & Fernández, R. (2021). Analysing human strategies of information transmission as a function of discourse context. CoNLL 2021, 647-660.  
  Verifies: R44.
- **FOLLOW** [B-information-theory] Altmann, G., & Steedman, M. (1988). Interaction with context during human sentence processing. Cognition 30(3), 191-238. doi:10.1016/0010-0277(88)90020-0  
  Verifies: R12. Context resolves attachment in humans (cai-2024).
- **FOLLOW** [B-information-theory] Gibson, E., Bergen, L., & Piantadosi, S. T. (2013). Rational integration of noisy evidence and prior semantic expectations in sentence interpretation. PNAS 110(20), 8051-8056. doi:10.1073/pnas.1216438110  
  Verifies: R12.
- **FOLLOW** [C-controlled-language] US DoD ATP 1-02.1 / FM 1-02.1 Multi-Service Brevity Codes  
  Verifies: R30, R15.
- **FOLLOW** [C-controlled-language] Monan, W. P. (1983). Addressee Errors in ATC Communications: The Call Sign Problem. NASA CR-166462 (ASRS).  
  Verifies: R35. Companion of monan-1986.
- **FOLLOW** [C-controlled-language] Prinzo, O. V., & Britton, T. W. (1993). ATC/Pilot Voice Communications: A Survey of the Literature. FAA DOT/FAA/AM-93/20.  
  Verifies: R21. Source of "few, topically related speech acts" (cushing-1994).
- **FOLLOW** [C-controlled-language] Burki-Cohen, J. (1995). Say Again? How complexity and format of Air Traffic Control instructions affect pilot recall. 40th Annual Air Traffic Control Association meeting (Volpe Center).  
  Verifies: R21, R42. Grouping hurt long messages but helped speed (morrow-prinzo-1999).
- **FOLLOW** [C-controlled-language] Voice of America (2009). VOA Special English Word Book: a list of words used in Special English programs on radio, television, and the Internet (Special English in use since 1959).  
  Verifies: R6.
- **FOLLOW** [C-controlled-language] Ogden, C. K. (1930). Basic English: A General Introduction with Rules and Grammar. London: Paul Treber & Co.  
  Verifies: R6.
- **FOLLOW** [C-controlled-language] Charrow, R. P., & Charrow, V. R. (1979). Making Legal Language Understandable: A Psycholinguistic Study of Jury Instructions. Columbia Law Review 79(7), 1306-1374. doi:10.2307/1121842  
  Verifies: R49.
- **FOLLOW** [C-controlled-language] Dixon, P., Faries, J., & Gabrys, G. (1988). The role of explicit action statements in understanding and using written directions. JML 27(6), 649-667. doi:10.1016/0749-596X(88)90013-7  
  Verifies: R16, R21. Explicit action statements (shubert-1995 sources).
- **FOLLOW** [C-controlled-language] Edworthy, J., Hellier, E., Titchener, K., Naweed, A., & Roels, R. (2011). Heterogeneity in alarm sounds makes them easier to learn. International Journal of Industrial Ergonomics 41(2), 136-146.  
  Verifies: R30.
- **FOLLOW** [C-controlled-language] Martínez, E., Mollica, F., & Gibson, E. (2024). So much for plain language: An analysis of the accessibility of U.S. federal laws over time. J. Experimental Psychology: General. doi:10.1037/xge0001572  
  Verifies: R50.
- **FOLLOW** [C-controlled-language] Severance, L. J., Greene, E., & Loftus, E. F. (1984). Toward criminal jury instructions that jurors can understand. Journal of Criminal Law and Criminology 75(1), 198-233. doi:10.2307/1143210  
  Verifies: R49.
- **FOLLOW** [C-controlled-language] Waddell, T. F., Auriemma, J. R., & Sundar, S. S. (2016). Make it Simple, or Force Users to Read? Paraphrased Design Improves Comprehension of End User License Agreements. CHI 2016. doi:10.1145/2858036.2858149  
  Verifies: R49.
- **FOLLOW** [C-controlled-language] Burki-Cohen, J. (1995). An Analysis of Tower (Ground) Controller-Pilot Voice Communications. DOT/FAA/AR-96/19. Volpe Center.  
  Verifies: R21.
- **FOLLOW** [C-controlled-language] MiTech Inc., Carlow International & FAA R&D Service (1992). Altitude Deviation Study: A Descriptive Analysis of Pilot and Controller Incidents. Final Report, October 1992.  
  Verifies: R21. Pilots linked 49% of altitude deviations to multiple instructions (cardosi-1996).
- **FOLLOW** [D-human-factors-ux] Redish, J. (2012). Letting Go of the Words: Writing Web Content that Works (2nd ed.). Morgan Kaufmann.  
  Verifies: R23, R33.
- **FOLLOW** [D-human-factors-ux] Stanton, N. A., & Edworthy, J. (Eds.) (1999). Human Factors in Auditory Warnings. Ashgate. Alternatively, Patterson (1982) on alarm design.  
  Verifies: R30, R45. Alternative named in entry (Patterson 1982) is already a note.
- **FOLLOW** [D-human-factors-ux] van Gog, T., Paas, F., & van Merriënboer, J. J. G. (2008). Effects of studying sequences of process-oriented and product-oriented worked examples on troubleshooting transfer efficiency. Learning and Instruction, 18, 211-222.  
  Verifies: R31, R32. "reasons for each step become redundant" (chen-kalyuga-sweller-2017).
- **FOLLOW** [D-human-factors-ux] Sweller, J. (2018). Measuring cognitive load. Perspectives on Medical Education, 7(1), 1-2. doi:10.1007/s40037-017-0395-4 (open access)  
  Verifies: R36.
- **FOLLOW** [D-human-factors-ux] van Gog, T., & Paas, F. (2008). Instructional efficiency: Revisiting the original construct in educational research. Educational Psychologist, 43(1), 16-26. doi:10.1080/00461520701756248  
  Verifies: R36.
- **FOLLOW** [D-human-factors-ux] Schnotz, W., & Kürschner, C. (2007). A reconsideration of cognitive load theory. Educational Psychology Review, 19(4), 469-508. doi:10.1007/s10648-007-9053-4  
  Verifies: R32.
- **FOLLOW** [D-human-factors-ux] Skulmowski, A., & Xu, K. M. (2022). Understanding cognitive load in digital and online learning: a new perspective on extraneous cognitive load. Educational Psychology Review, 34, 171-196. doi:10.1007/s10648-021-09624-7  
  Verifies: R32.
- **FOLLOW** [D-human-factors-ux] Sundararajan, N., & Adesope, O. (2020). Keep it coherent: A meta-analysis of the seductive details effect. Educational Psychology Review, 32(3), 707-734. doi:10.1007/s10648-020-09522-4  
  Verifies: R18.
- **FOLLOW** [D-human-factors-ux] Getty, D. J., Swets, J. A., Pickett, R. M., & Gonthier, D. (1995). System operator response to warnings of danger: A laboratory investigation of the effects of the predictive value of a warning on human response time. J. Experimental Psychology: Applied 1(1), 19-33.  
  Verifies: R45. Predictive value of warnings.
- **FOLLOW** [D-human-factors-ux] Mayer, R. E., & Moreno, R. (2003). Nine ways to reduce cognitive load in multimedia learning. Educational Psychologist, 38(1), 43-52.  
  Verifies: R18.
- **FOLLOW** [D-human-factors-ux] Bernacki, M. L., Greene, M. J., & Lobczowski, N. G. (2021). A systematic review of research on personalized learning. Educational Psychology Review, 33, 1675-1715. doi:10.1007/s10648-021-09615-8  
  Verifies: R31.
- **FOLLOW** [D-human-factors-ux] Agostinho, S., Tindall-Ford, S., & Roodenrys, K. (2013). Adaptive diagrams: Handing control over to the learner to manage split-attention online. Computers & Education. doi:10.1016/j.compedu.2013.01.007  
  Verifies: R56. Learner-controlled integration (oksa-2010 forward).
- **FOLLOW** [D-human-factors-ux] Plass, J. L., Chun, D. M., Mayer, R. E., & Leutner, D. (2003). Cognitive load in reading a foreign language text with multimedia aids and the influence of verbal and spatial abilities. Computers in Human Behavior, 19(2), 221-243. doi:10.1016/S0747-5632(02)00015-8  
  Verifies: R56.
- **FOLLOW** [D-human-factors-ux] Kalyuga, S., Law, Y. K., & Lee, C. H. (2013). Expertise reversal effect in reading Chinese texts with added causal words. Instructional Science, 41(3), 481-497. doi:10.1007/s11251-012-9239-0  
  Verifies: R41, R31.
- **FOLLOW** [D-human-factors-ux] Keysar, B., & Bly, B. (1995). Intuitions of the transparency of idioms: Can one keep a secret by spilling the beans? Journal of Memory and Language 34(1), 89-109.  
  Verifies: R31.
- **FOLLOW** [D-human-factors-ux] Nickerson, R. S. (1999). How we know - and sometimes misjudge - what others know: Imputing one's own knowledge to others. Psychological Bulletin 125(6), 737-759.  
  Verifies: R31.
- **FOLLOW** [E-style-rhetoric] Hyland, K. (2005). Metadiscourse: Exploring Interaction in Writing. Continuum.  
  Verifies: R17. Metadiscourse book (distinct from the closed 2005 article tried in kim-2024).
- **FOLLOW** [E-style-rhetoric] Colomb, G. G., & Williams, J. M. (1985). Perceiving structure in professional prose: a multiply determined experience. In L. Odell & D. Goswami (Eds.), Writing in Non-Academic Settings, 87-128. Guilford.  
  Verifies: R24.
- **FOLLOW** [E-style-rhetoric] Lakoff, G. (1972/1973). Hedges: A study in meaning criteria and the logic of fuzzy concepts. CLS 8, 183-228; repr. Journal of Philosophical Logic 2(4), 458-508, doi:10.1007/BF00262952  
  Verifies: R57.
- **FOLLOW** [E-style-rhetoric] Schimel, J. (2012). Writing Science: How to Write Papers That Get Cited and Proposals That Get Funded. Oxford University Press.  
  Verifies: R23. Patient/impatient reader (mensh-kording-2017 source).
- **FOLLOW** [F-screen-reading] Delgado, P., Vargas, C., Ackerman, R., & Salmeron, L. (2018). Don't throw away your printed books: A meta-analysis on the effects of reading media on reading comprehension. Educational Research Review, 25, 23-38.  
  Verifies: R36. Screen vs paper; transfer gap.
- **FOLLOW** [F-screen-reading] Furnas, G. W. (1997). Effective view navigation. CHI '97, 367-374.  
  Verifies: R33.
- **FOLLOW** [F-screen-reading] Teo, L., John, B. E., & Blackmon, M. H. (2012). CogTool-Explorer: a model of goal-directed user exploration that considers information layout. CHI 2012. doi:10.1145/2207676.2208414  
  Verifies: R33.
- **FOLLOW** [F-screen-reading] Byrne, M. D., John, B. E., Wehrle, N. S., & Crow, D. C. (1999). The tangled web we wove: A taxonomy of WWW use. CHI '99, 544-551.  
  Verifies: R23.
- **FOLLOW** [F-screen-reading] Reader, W. R., & Payne, S. J. (2007). Allocating time across multiple texts: Sampling and satisficing. Human-Computer Interaction 22(3), 263-298.  
  Verifies: R23. Satisficing/sampling origin (duggan-payne notes).
- **FOLLOW** [G-precision-without-loss] Liu, Y. et al. (2023). Revisiting the Gold Standard: Grounding Summarization Evaluation with Robust Human Evaluation (Atomic Content Units / RoSE). ACL 2023.  
  Verifies: R2.
- **FOLLOW** [G-precision-without-loss] Roelcke, T. (2016). Exaktheit - Eindeutigkeit - Eigentlichkeit: Zur semiotischen Explikation terminologischer Grundeigenschaften. Zeitschrift für Semiotik 38(3-4), 89-103.  
  Verifies: R8. "effective but not efficient" precision (koning-2023).
- **FOLLOW** [G-precision-without-loss] Wanner, M. et al. (2024). DnDScore: Decontextualization and Decomposition for Factuality Verification in Long-Form Text Generation. arXiv:2412.13175  
  Verifies: R48, R2.
- **ACCESS-RISK** [B-information-theory] Trott, S., & Bergen, B. (2020). Why do human languages have homophones? Cognition 205, 104449.  
  Verifies: R12. Piantadosi-2012 note: PDF could not be fetched.
- **ACCESS-RISK** [D-human-factors-ux] Mayer, R. E., Heiser, J., & Lonn, S. (2001). Cognitive constraints on multimedia learning: When presenting more material results in less understanding. Journal of Educational Psychology, 93(1), 187-198. doi:10.1037/0022-0663.93.1.187  
  Verifies: R19. Castro-alonso-2021 note: csus.edu copy 404, archive unreachable.
- **ACCESS-RISK** [E-style-rhetoric] Williams, J. M. (1979). Defining complexity. College English 40(6), 595-609.  
  Verifies: R16. Williams-1981 note: not found or opened.
- **ACCESS-RISK** [G-precision-without-loss] ISO 1087:2019 Terminology work and terminology science: Vocabulary (ISO/TC 37/SC 1), definitions of 'definition', 'intensional definition', 'essential characteristic' and 'delimiting characteristic'. Try the iTeh preview at cdn.standards.iteh.ai, since OBP gave 403.  
  Verifies: R6, R3. OBP 403; try the iTeh preview.
- **DUPLICATE** [C-controlled-language] (2024). Exploring the effect of plain terminology on processing and comprehension of administrative texts in Spanish: A self-paced reading experiment. International Journal of Applied Linguistics. doi:10.1111/ijal.12650 (authors UNVERIFIED)  
  Same DOI as the p4 Fernández-Silva & Núñez Cortés entry; merged there.
- **DROP** [B-information-theory] Mahowald, K., Fedorenko, E., Piantadosi, S. T., & Gibson, E. (2013). Info/information theory: Speakers choose shorter words in predictive contexts. Cognition, 126(2), 313-318.  
  Note exists: B-information-theory/mahowald-2013-short-forms-predictive-contexts.md.
- **DROP** [D-human-factors-ux] Nielsen, J. (2006). F-Shaped Pattern for Reading Web Content. Nielsen Norman Group (eyetracking).  
  Note exists: F-screen-reading/nielsen-2006-f-pattern.md.
- **DROP** [D-human-factors-ux] Sweller, J., van Merriënboer, J. J. G., & Paas, F. (2019). Cognitive architecture and instructional design: 20 years later. Educational Psychology Review, 31, 261-292. doi:10.1007/s10648-019-09465-5  
  Read in full as the source of sweller-1998-cognitive-architecture-load-types.md.

## Priority 2 (41 entries)

- **PARTIAL** [B-information-theory] Pimentel, T., Meister, C., Teufel, S., & Cotterell, R. (2021). On Homophony and Renyi Entropy. EMNLP 2021. arXiv:2109.13766  
  Verifies: R12. Abstract read inside piantadosi-2012 note.
- **PARTIAL** [C-controlled-language] Kimble, J. (1994-1995). Answering the Critics of Plain Language. The Scribes Journal of Legal Writing 5. https://scribes.org/wp-content/uploads/2022/12/Scribes_vol5_06_Answering_the_Critics_of_Plain_Language.pdf  
  Verifies: R51. Read for second-hand figures in masson-waldron-1994 note.
- **PARTIAL** [E-style-rhetoric] Pullum, G. K. (2009). '50 Years of Stupid Grammar Advice.' Chronicle Review 55(32):B15.  
  Verifies: R16, R17. PDF read inside strunk-1918 note.
- **FOLLOW** [A-pragmatics] Carston, R. (2002). Thoughts and Utterances: The Pragmatics of Explicit Communication. Blackwell.  
  Verifies: R28.
- **FOLLOW** [A-pragmatics] McCawley, J. D. (1978). Conversational implicature and the lexicon. In P. Cole (Ed.), Syntax and Semantics 9: Pragmatics, 245-259. Academic Press.  
  Verifies: R9.
- **FOLLOW** [A-pragmatics] Blutner, R. (2000). Some aspects of optimality in natural language interpretation. Journal of Semantics 17(3), 189-216.  
  Verifies: R9.
- **FOLLOW** [A-pragmatics] Matsui, T. (2000). Bridging and Relevance. John Benjamins.  
  Verifies: R41.
- **FOLLOW** [A-pragmatics] Poesio, M., & Vieira, R. (1998). A corpus-based investigation of definite description use. Computational Linguistics 24(2), 183-216.  
  Verifies: R28.
- **FOLLOW** [A-pragmatics] Fried, D., Andreas, J., & Klein, D. (2018). Unified Pragmatic Models for Generating and Following Instructions. NAACL 2018. doi:10.18653/v1/N18-1177  
  Verifies: R11.
- **FOLLOW** [A-pragmatics] Ruytenbeek, N., Verheyen, S., & Spector, B. (2017). Asymmetric inference towards the antonym: Experiments into the polarity and morphology of negated adjectives. Glossa 2(1).  
  Verifies: R9.
- **FOLLOW** [A-pragmatics] Karpinska, M., Akoury, N., & Iyyer, M. (2021). The Perils of Using Mechanical Turk to Evaluate Open-Ended Text Generation. EMNLP 2021. doi:10.18653/v1/2021.emnlp-main.97  
  Verifies: R36.
- **FOLLOW** [A-pragmatics] Yuan, A., Monroe, W., Bai, Y., & Kushman, N. (2018). Understanding the Rational Speech Act model. Proc. CogSci 40, 2759-2764.  
  Verifies: R38.
- **FOLLOW** [A-pragmatics] Horvitz, E. (1999). Principles of Mixed-Initiative User Interfaces. CHI '99, pp. 159-166  
  Verifies: R43. Cost of over-grounding (shaikh-2024).
- **FOLLOW** [B-information-theory] Zipf, G. K. (1949). Human Behavior and the Principle of Least Effort. Addison-Wesley.  
  Verifies: R13.
- **FOLLOW** [B-information-theory] Frank, A., & Jaeger, T. F. (2008). Speaking rationally: Uniform information density as an optimal strategy for language production. CogSci 2008.  
  Verifies: R13.
- **FOLLOW** [B-information-theory] Sims, C. R. (2016). Rate-distortion theory and human perception. Cognition 152, 181-198.  
  Verifies: R39.
- **FOLLOW** [B-information-theory] Xu, Y., & Reitter, D. (2018). Information density converges in dialogue: Towards an information-theoretic model. Cognition 170, 147-163.  
  Verifies: R44.
- **FOLLOW** [B-information-theory] Haslett, D. A., & Cai, Z. G. (2025?). Tokenization changes meaning in large language models: Evidence from Chinese. Computational Linguistics. doi:10.1162/coli_a_00557  
  Verifies: R37.
- **FOLLOW** [C-controlled-language] Taylor, J. L., Yesavage, J. A., Morrow, D. G., Dolhert, N., Brooks, J. O., & Poon, L. W. (1994). The effects of information load and speech rate on young and older aircraft pilots' ability to execute simulated air-traffic controller instructions. Journal of Gerontology: Psychological Sciences, 49(5), P191-P200.  
  Verifies: R21.
- **FOLLOW** [C-controlled-language] Ferreira, F. (2003). The misinterpretation of noncanonical sentences. Cognitive Psychology 47(2), 164-203. doi:10.1016/S0010-0285(03)00005-7  
  Verifies: R16.
- **FOLLOW** [C-controlled-language] Wasow, T. (1997). Remarks on grammatical weight. Language Variation and Change 9(1), 81-105.  
  Verifies: R21.
- **FOLLOW** [D-human-factors-ux] Paas, F., & van Merrienboer, J. J. G. (1993). The efficiency of instructional conditions: An approach to combine mental-effort and performance measures. Human Factors, 35(4), 737-743.  
  Verifies: R36.
- **FOLLOW** [D-human-factors-ux] DeLeeuw, K. E., & Mayer, R. E. (2008). A comparison of three measures of cognitive load: Evidence for separable measures of intrinsic, extraneous, and germane load. Journal of Educational Psychology, 100(1), 223-234.  
  Verifies: R32.
- **FOLLOW** [D-human-factors-ux] Kalyuga, S., & Renkl, A. (2010). Expertise reversal effect and its instructional implications: introduction to the special issue. Instructional Science, 38, 209-215. doi:10.1007/s11251-009-9102-0  
  Verifies: R31.
- **FOLLOW** [D-human-factors-ux] Roelle, J., & Berthold, K. (2013). The expertise reversal effect in prompting focused processing of instructional explanations. Instructional Science. doi:10.1007/s11251-012-9247-0  
  Verifies: R31.
- **FOLLOW** [E-style-rhetoric] Spencer, H. (1852). 'The Philosophy of Style.' Westminster Review.  
  Verifies: R17.
- **FOLLOW** [E-style-rhetoric] Sword, H. (2012). Stylish Academic Writing. Harvard UP (zombie nouns; empirical survey of 1,000 academic articles).  
  Verifies: R16.
- **FOLLOW** [E-style-rhetoric] Hyland, K. (1998). Hedging in Scientific Research Articles. John Benjamins  
  Verifies: R57, R58.
- **FOLLOW** [E-style-rhetoric] Skelton, J. (1988). The care and maintenance of hedges. ELT Journal 42(1), 37-43  
  Verifies: R57. Critique of the approximator/shield split (prince-frader-bosk-1982).
- **FOLLOW** [E-style-rhetoric] Paiva, C. E., Lima, J. P. S. N., & Paiva, B. S. R. (2012). Articles with short titles describing the results are cited more often. Clinics 67: 509-513. doi:10.6061/clinics/2012(05)17  
  Verifies: R33.
- **FOLLOW** [F-screen-reading] Nielsen, J., & Pernice, K. (2010). Eyetracking Web Usability. New Riders.  
  Verifies: R23.
- **FOLLOW** [F-screen-reading] Kitajima, M., Blackmon, M. H., & Polson, P. G. (2000). A comprehension-based model of Web navigation and its application to Web usability analysis (CoLiDeS). People and Computers XIV (HCI 2000), 357-373. Springer.  
  Verifies: R33.
- **FOLLOW** [F-screen-reading] Teo, L., & John, B. E. (2008). Towards a tool for predicting goal-directed exploratory behavior (CogTool-Explorer). Proc. HFES 52nd Annual Meeting.  
  Verifies: R33.
- **FOLLOW** [F-screen-reading] Oulasvirta, A., Jokinen, J. P. P., & Howes, A. (2022). Computational rationality as a theory of interaction. CHI '22. doi:10.1145/3491102.3517739  
  Verifies: R23.
- **FOLLOW** [G-precision-without-loss] Temmerman, R. (2000). Towards New Ways of Terminology Description: The Sociocognitive Approach. John Benjamins.  
  Verifies: R8.
- **FOLLOW** [G-precision-without-loss] ISO 860:2007 Terminology work: Harmonization of concepts and terms (ISO/TC 37/SC 1)  
  Verifies: R8.
- **FOLLOW** [G-precision-without-loss] Hu et al. (2024/2025). Decomposition Dilemmas: Does Claim Decomposition Boost or Burden Fact-Checking Performance? NAACL 2025. arXiv:2411.02400 (authors UNVERIFIED)  
  Verifies: R48.
- **ACCESS-RISK** [B-information-theory] Li, J., Scontras, G., & Futrell, R. (2023). Chinese abbreviation choice and predictive context (exact title and venue UNVERIFIED). https://sites.socsci.uci.edu/~rfutrell/papers/li2023chinese.pdf  
  Verifies: R7. Mahowald-2013 note: TLS error and 503.
- **ACCESS-RISK** [C-controlled-language] ICAO Doc 9432 Manual of Radiotelephony 4th ed. (2007) / Doc 4444 PANS-ATM ch.12  
  Verifies: R30, R35. Caa-2026-cap413 note: paywalled; CAP 413 implements it.
- **ACCESS-RISK** [F-screen-reading] Pirolli, P. (2005). Rational analyses of information foraging on the Web. Cognitive Science 29(3), 343-373. doi:10.1207/s15516709cog0000_20  
  Verifies: R33. Card-2001 note: closed access, no open copy.
- **DROP** [E-style-rhetoric] Mensh, B., & Kording, K. (2017). Ten simple rules for structuring papers. PLoS Computational Biology 13(9): e1005619. https://doi.org/10.1371/journal.pcbi.1005619  
  Note now exists: E-style-rhetoric/mensh-kording-2017-ten-rules-structuring-papers.md.

## Priority 1 (1 entries)

- **PARTIAL** [B-information-theory] Haramaty, E., & Sudan, M. (2012). Deterministic Compression with Uncertain Priors. ECCC TR12-166 (later ITCS 2014).  
  Verifies: R1. Abstract page read inside juba-2011 note.

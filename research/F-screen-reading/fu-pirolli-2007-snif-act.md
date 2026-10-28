# Fu & Pirolli (2007): SNIF-ACT, a cognitive model of Web navigation

## Citation
Fu, W.-T., & Pirolli, P. (2007). SNIF-ACT: A cognitive model of user navigation on the World Wide Web. *Human-Computer Interaction*, 22(4), 355-412. Lawrence Erlbaum. doi:10.1080/07370020701638806 (the DOI string comes from memory; it was not checked against the publisher, so UNVERIFIED).
- Full text read: the publisher-typeset PDF (58 pp.) hosted by Google Research, https://research.google.com/pubs/archive/25938.pdf
- DTIC record of the same work (Jan 2007): https://apps.dtic.mil/sti/html/tr/ADA462156/index.html (the PDF link returned an HTML stub and was not read)

## Core claim
Web users judge each link by its *information scent*, meaning how strongly the link text predicts the distal goal; scent is computed as spreading activation, which in practice is PMI over a corpus. Users do not survey a whole page. They read links in order and *satisfice*: a link that is good enough gets clicked. When the scent of what they are reading falls below the level that earlier pages led them to expect, they leave the page or site. A model that combines Information Foraging Theory with a Bayesian satisficing model (BSM) predicts both link choice and the decision to go back better than an exhaustive best-link model or a position-only model.

## Key evidence
- **SNIF-ACT 1.0 (Experiment 1).** Protocols came from Card et al. (2001): 8 participants on 2 tasks (Antz, City), 189 actions. Link-following made up 48% of actions and site-leaving 24%. Mean scent was high three pages before leaving a site, dropped just before leaving, and was higher on the page reached after the switch, as patch-leaving theory predicts. With so few site-leaving events this was not significant: t(11) = 0.61, p = .56. Verbal protocols just before a switch included "it seems that I don't have much luck with this site" (p. 375).
- **Position correlates with scent.** On search-result pages, scent and link position correlated at r = .64. Even so, a pure position model fit the human data poorly (p. 376).
- **SNIF-ACT 2.0 (Experiment 2).** Data came from Chi et al. (2003): 74 participants (30 on help.yahoo.com, 44 on the ParcWeb intranet) and 16 tasks. Utility updates per link attended (eq. 8, p. 380):
  - Attend-to-Link: U(n+1) = (U(n) + IS(link)) / (1 + N(n))
  - Click-Link: U(n+1) = (U(n) + IS(best)) / (1 + k + N(n))
  - Backup-a-Page: U(n+1) = MIS(previous pages) - MIS(links 1..n) - GoBackCost, with k = 5 and GoBackCost = 5.
  
  In effect this is an adaptive stopping rule. Each extra link read makes it more likely the reader commits to the best link seen so far. A run of low-scent links makes it more likely the reader abandons the page.
- **Fit.** Link-selection fit for SNIF-ACT 2.0 was R² = .91 on Yahoo and .69 on ParcWeb. SNIF-ACT 1.0 got .62 and .35, and the position model .45 and .03. For go-back counts, SNIF-ACT 2.0 got R² = .80 on Yahoo and .73 on ParcWeb (p. 387).
- **Where 1.0 failed.** Links that people chose but SNIF-ACT 1.0 did not were all encountered early on the page (13/16 ParcWeb, 6/6 Yahoo). Links that 1.0 chose but people did not had high scent but sat near the bottom of the page (8/12 ParcWeb, 6/7 Yahoo). In the authors' words, participants "tended to 'satisfice' on 'reasonably good' links presented earlier on the Web page rather than exhaustively finding the best links" (p. 387).
- **Free-running simulations (500 runs, Fig. 13).** SNIF-ACT 2.0 came closest to human success rates. On hard tasks it also failed where people failed, which suggests that correct but low-placed links go unseen.
- **Aggregate behaviour.** Path-length distributions fit the Law of Surfing (Huberman et al., 1998), with R² ≈ .98 for both the observed data and SNIF-ACT 2.0 (App. C).
- **Search cost.** Scent quality controls search cost. Small drops in scent can turn costs that grow linearly with distance into costs that grow exponentially, a "phase transition" (p. 398-399, citing Pirolli 2005 and Hogg & Huberman 1987).
- **Limitations the authors state.** The model assumes sequential link evaluation. Blackmon et al. (2005) showed hierarchical processing instead: people scan headings, enter the high-scent subregion and ignore the rest. The model is also blind to layout and assumes a well-defined goal and domain-general users.

## Sources it builds on
- Pirolli & Card (1999), information foraging and the patch-leaving rule (already covered)
- Pirolli (2005), rational analysis of information scent (Cognitive Science 29); not read
- Fu & Gray (2006), Bayesian satisficing in interactive search; Simon (1955, 1956) on bounded rationality
- Anderson et al. (2004), ACT-R; McFadden (1974), random utility model
- Card et al. (2001), the Web Behavior Graph protocols; Chi et al. (2003), Bloodhound; Chi et al. (2001), already covered
- Huberman, Pirolli, Pitkow & Lukose (1998), Law of Surfing, *Science* 280
- Kitajima, Blackmon & Polson (2000/2005), CoLiDeS; Miller & Remington (2004), MESA; Blackmon et al. (2005)
- Brumby & Howes (2004) on label assessment during search

## Works that cite it (forward)
All of these are UNVERIFIED as citers: the citing texts were not opened.
- Duggan, G. B., & Payne, S. J. (2011). Skim reading by satisficing: evidence from eye tracking. CHI 2011, 1141-1150. Its abstract is on the Bath research portal. It applies the same satisficing threshold to prose: read until the rate of information gain falls, then skip to the next section.
- Fu, W.-T., & Pirolli, P. (2013), chapter in *The Oxford Handbook of Cognitive Engineering* (paywalled)
- Brumby & Howes (2008), HCI 23(1), on how label relevance affects assess-versus-select strategies
- Teo & John (2008), CogTool-Explorer, which builds on SNIF-ACT

## Relevance to AI answer style
- **Readers satisfice in order.** They commit to the first unit that looks good enough, so the answer-bearing sentence has to come first. A better point placed at the bottom is, in the model, a link that is never chosen.
- **Readers abandon on falling scent, and the bar is relative.** A run of low-relevance sentences (preamble, restating the question, hedges) lowers the running mean scent below what the reader expected from earlier text, and the reader leaves. This works through *relevance*, not length: a long run of high-scent sentences keeps the reader. That is the PRECISION versus COMPRESSION distinction. Dropping words does not keep a reader. Every unit must carry scent toward the goal.
- **Scent is lexical overlap with the reader's goal vocabulary** (PMI between cue words and goal words). Headings and lead words that use the user's own terms, or the precise domain term the user will recognise, carry the most scent. Vague labels ("Overview", "Some considerations") carry almost none.
- **Small losses in scent compound.** A small drop in scent quality can make navigation costs blow up. In a long structured answer, one misleading section label can send the reader down the wrong section.

## Candidate rules for the harness
1. **Lead with the answer.** Put the sentence that most directly answers the question first. Never open with preamble, a restatement of the question, or caveats, because readers commit to the first good-enough unit and drop the rest.
2. **Keep every unit on the goal.** Each heading, bullet and paragraph opener should share key terms with the user's question or name the exact concept that answers it. Cut sentences that do not move toward the goal; do not just shorten them. A run of off-goal sentences triggers abandonment whatever their length.
3. **Use specific section labels.** In multi-part answers, label sections with specific content terms ("Fix: set `timeout=30`") rather than generic ones ("Details"). Readers scan headings and enter only the high-scent region (Blackmon et al. 2005, as discussed here).

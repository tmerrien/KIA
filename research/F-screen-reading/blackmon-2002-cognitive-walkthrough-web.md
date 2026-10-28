# Blackmon, Polson, Kitajima & Lewis (2002): Cognitive Walkthrough for the Web

## Citation
Blackmon, M. H., Polson, P. G., Kitajima, M., & Lewis, C. (2002). Cognitive walkthrough for the Web. *Proceedings of CHI 2002*, 463-470. ACM. doi:10.1145/503376.503459

- Full text read (author mirror, Kitajima's page): http://oberon.nagaokaut.ac.jp/ktjm/English/PAPERS(E)/CHI2002.pdf (landing page http://oberon.nagaokaut.ac.jp/ktjm/English/PAPERS(E)/CHI2002.html)
- The ACM DL is closed access and sits behind a Cloudflare challenge. OpenAlex lists 251 citing works and Semantic Scholar lists 298 (checked 2026-10-28).
- Companion paper: Blackmon, Kitajima & Polson (2003), see `blackmon-2003-repairing-cww.md`.

## Core claim
Navigation succeeds when a label's wording is semantically closest to the reader's goal *and* distinct from its neighbours. Corpus-based semantic similarity (LSA cosines and term-vector lengths) can predict, before any user test, which heading and link labels will misdirect readers. CWW sorts these failures into three types: an **unfamiliar** label (the reader does not know the words), **confusable** labels (two labels mean nearly the same thing), and **goal-specific competing** labels (a wrong label pulls harder on this goal than the right one).

## Key evidence
- **Model.** The method rests on CoLiDeS (Kitajima, Blackmon & Polson 2000), which builds on Kintsch's construction-integration theory. Readers act in two phases. First they parse the page into subregions and attend to the one whose *heading* is most similar to their goal. Then they pick the widget in that subregion whose label is most similar to the goal. Goals are written as 100-200-word narratives.
- **Operational thresholds (p. 465-466).**
  - *Unfamiliar*: LSA term vector length below 0.8 for the label's "two most meaningful words". For example, "Landscape Installation" scores 0.53.
  - *Confusable*: a heading-heading or link-link cosine of 0.6 or more. "Landscape Management/Maintenance" vs "Tree Services" scores 0.65.
  - *Competing heading*: any heading whose cosine with the goal is at least the correct heading's cosine.
  - *Competing link*: a link under the same heading whose goal cosine is at least 80% of the correct link's cosine, unless an analyst rejects it as a false alarm.
- **Worked example.** The intended correct link "Storm damage specialists" has a cosine of 0.24 with a storm-repair goal. "Removing trees and dead tree limbs" scores 0.81. The developer's label was apt but weaker than the plain descriptive phrases next to it.
- **Discrimination rule for trimming labels (p. 466).** To test familiarity, keep "the two words that best distinguish that label from other labels on the same page". "Snow ice" stands in for "Snow and Ice Services", because "services" belongs as much to "Tree Services". The word that carries the label is the one that separates it from its neighbours.
- **Table 1.** These are first-click success rates in three re-analysed experiments with online-encyclopedia category pages:

  | Goals | Exp. 1 (177 goals) | Exp. 2 (63 goals) | Exp. 3 (32 goals) |
  |---|---|---|---|
  | Any CWW-flagged problem | 41% | 68% | 38% |
  | No flagged problem | 70% | 89% | 62% |
  | Unfamiliar link labels | 24% (lowest) | 60% (lowest) | 28% (lowest) |

  - In Exp. 1, unfamiliar labels had a main effect of F(1,174)=24.7, p<.0001, and competing links one of F(1,174)=5.03, p=.026.
- **Headings gate attention (Exp. 3).** With no competing heading, 91% of clicks fell under the correct heading. With a competing heading the figure was 68%, F(1,638)=95.6. Competing headings added 1.42 clicks and unfamiliar labels 0.82 clicks per goal. Mean clicks rose with page size: 1.38 for 16 links, 1.77 for 32 and 2.67 for 51.
- **Goal elaboration.** Giving users a goal description rather than a bare term ("Tlingit") raised success about 23 points (Exp. 2 vs Exp. 1). A richer statement of intent makes labels easier to match.
- **Repair (p. 466).** Confusable headings were fixed by rewording the links under them. This "magnified the distinguishing features of each heading and reduced overlap", and the maximum heading-pair cosine fell to 0.39.
- **Expert blind spot (p. 469).** "Developers have trouble detecting such problems with link and heading vocabulary, because they nearly always have considerable knowledge of the content of the website." LSA overestimates similarity when surface terms overlap but meanings differ, so a human must veto false alarms.

## Sources it builds on
- Polson, Lewis, Rieman & Wharton (1992) Cognitive walkthroughs, *IJMMS* 36; Wharton et al. (1994) practitioner's guide; Lewis et al. (1990) CHI'90.
- Kitajima & Polson (1997) comprehension-based model of exploration, *HCI* 12; Kitajima, Blackmon & Polson (2000) CoLiDeS, *People and Computers XIV*.
- Kintsch (1998) *Comprehension*; Landauer & Dumais (1997) LSA, *Psych. Review* 104.
- Pirolli & Card (1999) information foraging; Chi et al. (2001) WUFIS (both already covered); Pirolli (1997) scent-following.
- Larson & Czerwinski (1998) breadth/depth and scent, CHI'98. Its data were re-analysed here as Exp. 1.

## Works that cite it (influential forward citations; OpenAlex counts)
- Blackmon, Kitajima & Polson (2003) Repairing usability problems identified by CWW, CHI 2003, doi:10.1145/642611.642698 (read; separate note).
- Blackmon, Kitajima & Polson (2005) Tool for accurately predicting website navigation problems, non-problems, problem severity, and effectiveness of repairs, CHI 2005, doi:10.1145/1054972.1054978 (NOT read).
- Pirolli & Fu (2003) SNIF-ACT, doi:10.1007/3-540-44963-9_8 (202 cites).
- Chi et al. (2003) The Bloodhound project, CHI 2003, doi:10.1145/642611.642699 (128).
- Mahatody, Sagar & Kolski (2010) State of the art on the cognitive walkthrough method, *IJHCI*, doi:10.1080/10447311003781409 (337).
- Fernandez, Insfrán & Abrahão (2011) Usability evaluation methods for the web: systematic mapping, *IST*, doi:10.1016/j.infsof.2011.02.007 (497).

## Relevance to AI answer style
- **Precision is discriminability, not brevity.** CWW never rewards a shorter label. It rewards the label whose words sit closest to the reader's goal and furthest from the other labels on screen. The exact term is the one that separates this item from its neighbours. A term the reader lacks fails however exact it is: "Paleontology" is precise to an expert and unfamiliar to a first-year student.
- **Headings in an answer are attention gates.** Readers commit to a subregion by its heading and then ignore the rest (91% vs 68% of clicks). When an assistant uses section headings or bold lead-ins, they must not overlap ("Overview" vs "Summary"). Each must predict exactly what sits under it, as "Leaders in American History" did where "People in United States History" did not.
- **Writer expertise hides unfamiliarity.** The assistant knows the content domain, so it is in the developer's position. It should test label words against the user's likely vocabulary, not its own.
- **Compression failure mode.** Trimming a label to generic words ("services", "info", "details") keeps it short but destroys discrimination. That is compression in the bad sense: meaning is lost while the word count stays the same.

## Candidate rules for the harness
1. **Distinct headings.** Every heading or bold lead-in must be distinguishable from every sibling by its content words. Drop or replace words shared across siblings ("Details", "Overview", "Services"), and never give two sections near-synonymous titles.
2. **Familiar exact term.** Use the exact term for the idea. If the user's own wording suggests they may not know it, pair it once with a high-frequency gloss, as in "Paleontology & Fossils". Do not swap the term for a vaguer common word.
3. **Label predicts content.** A heading or link text must predict what follows it. If the content is narrower or different, rename the label ("Leaders in American History", not "People in United States History").

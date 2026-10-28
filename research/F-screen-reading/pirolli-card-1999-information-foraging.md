# Pirolli & Card (1999): Information Foraging (the ACT-IF and information-scent statement)

## Citation
Pirolli, P., & Card, S. K. (1999). Information foraging. *Psychological Review, 106*(4), 643-675. https://doi.org/10.1037/0033-295X.106.4.643
- Volume, issue and pages (643-675) are confirmed through the OpenAlex API, which also reports 1,351 citations as of 2026-10-28.
- **I did not read the full text.** OpenAlex lists it as closed access with no repository copy. This pass tried these mirrors and every one failed:
  - CMU ACT-R archive `act-r.psy.cmu.edu/.../124pirolli_card.pdf`: 503 and a proxy tunnel reset.
  - CiteSeerX `10.1.1.29.7346`: redirects to the Wayback Machine, which the fetcher cannot reach.
  - Academia.edu and ResearchGate: 403 / bot check.
  - The author's own site, peterpirolli.com/research.html: lists no copy of the 1999 paper.
  - The PARC tech-report precursor ("The evolutionary ecology of information foraging", UIR-R97-01, 1997): no open copy found.
- **What I read instead.** Three primary texts by the first author restate the 1999 model, and all three are hosted on his own site:
  - (a) Pirolli, P. & Fu, W.-T. (2003). SNIF-ACT: A model of information foraging on the World Wide Web. *User Modeling 2003*, LNAI 2702. https://www.peterpirolli.com/ewExternalFiles/Pirolli-Fu%20UM2003.pdf. Its ref. [1] is the 1999 paper.
  - (b) Pirolli, P. (2007). Cognitive models of human-information interaction. In F. Durso (Ed.), *Handbook of Applied Cognition* (2nd ed.), ch. 17, pp. 443-470 (Wiley). https://www.peterpirolli.com/ewExternalFiles/C17.PDF. The page range 443-470 is inferred from the running heads and is partly UNVERIFIED.
  - (c) Pirolli, P. (2007). *Information Foraging Theory*, ch. 1 (uncorrected proof, OUP). https://www.peterpirolli.com/ewExternalFiles/31354_C01_UNCORRECTED_PROOF.pdf
- Claims below that rest only on these restatements are marked "(via a/b/c)". Anything about page-level content of the 1999 article is UNVERIFIED.

## Core claim
Information-seeking strategies and technologies adapt to maximize the rate of valuable information gained per unit of time cost. The 1999 paper develops this in two ways: a rational (adaptation) analysis, using patch, diet and scent models, and a process model, ACT-IF, which is ACT-R extended with an information-scent utility (via a, c). Information scent is the user's judgment, made from proximal cues such as link text, snippets and cluster summaries, of the value of a distal information source. The judgment is computed by spreading activation from the cue words to the words of the user's goal (via a, b).

## Key evidence
- **ACT-IF.** ACT-R extended with "a formal model of information scent that predicted how users would use text presented in browsers to make navigation decisions". Utility is spreading activation between goal chunks and display chunks. Production conflict resolution picks the action whose matched chunks are most activated (via a, §2.3).
- **Association strengths.** These were estimated from word statistics in the Tipster corpus: "base-level activations of 200 million word tokens and the inter-word association strengths of 55 million word pairs" (via a, §2.3, describing "past research [1, 10]", i.e. the 1999 paper and Pirolli 1997).
- **Scent formalism, as Pirolli later gives it** (via b, eqs. 17.1-17.4):
  - S_ji = log[Pr(i|j)/Pr(i)], i.e. pointwise mutual information between cue j and goal chunk i.
  - A_i = sum_j W_j S_ji, where W_j is the attention given to cue j.
  - V = sum_i A_i.
  - Choice is a softmax: Pr(L|G,C) = e^{mu V_L} / sum_{k in C} e^{mu V_k}.
  - Chapter (b) credits the Bayesian derivation of this to Pirolli (2005), not to the 1999 paper. Whether the 1999 paper uses exactly these equations is UNVERIFIED.
- **Empirical fit.** ACT-IF predicted which Scatter/Gather clusters users would select from the scent of the cluster summaries. SNIF-ACT (2003) reports that its own link-choice fit "replicates a similar analysis made by Pirolli and Card [1] concerning the ACT-IF model prediction of cluster selection in the Scatter/Gather browser" (via a, §4.1). The 1999 effect sizes and n are UNVERIFIED.
- **Patch and rate model.** The conventional patch model assumes the forager maximizes the overall rate of gain R. It leaves a patch when the marginal within-patch rate drops to the average rate R* (via c, the marginal-value-theorem section). The 1995 CHI paper is already covered for the patch and diet models.
- **Web extension, which supports the theory but is not in the 1999 paper.** SNIF-ACT users on unfamiliar Web tasks chose links in proportion to scent rank (91 link choices, chi-square(30) = 18589.45, p < .0001). Mean page scent dropped just before users left a site (via a, §4.1-4.2). The sample was small: 4 participants on 2 tasks.

## Sources it builds on
- Pirolli & Card (1995), CHI. Already covered.
- Anderson's ACT-R and rational analysis: Anderson (1990), *The Adaptive Character of Thought*; Anderson & Lebiere (1998).
- Anderson & Pirolli (1984), on spreading activation (cited in b).
- Optimal foraging theory: Stephens & Krebs (1986); Charnov (1976).
- Cutting, Karger, Pedersen & Tukey (1992), Scatter/Gather.
- Pirolli (1997), "Computational models of information scent-following in a very large browsable text collection", CHI '97 (cited in a as [10]; the CHI '97 venue is UNVERIFIED).

## Works that cite it (forward)
- Verified, read here: Pirolli & Fu (2003), SNIF-ACT; Pirolli (2007), Handbook chapter; Pirolli (2007), *Information Foraging Theory* (OUP).
- UNVERIFIED (not opened): Chi, Pirolli, Chen & Pitkow (2001), CHI, the WUFIS/IUNIS scent algorithms; Fu & Pirolli (2007), SNIF-ACT in *Human-Computer Interaction* 22; Blackmon, Polson et al. (2002), CoLiDeS / Cognitive Walkthrough for the Web, with LSA-computed scent; Spool's "scent of information" practitioner work; Olston & Chi (2003), ScentTrails, *TOCHI*.

## Relevance to AI answer style
The 1999 paper's key addition over 1995 is a **quantitative account of how cue words predict value**. A reader judges whether a chunk of text is worth reading from the *association strength between its visible words and the words of their goal*: the log ratio of how much a cue raises the probability of a goal concept above its base rate. This is a direct argument for **PRECISION**:
- A precise term such as "pointwise mutual information" or "race condition" has high S_ji to the right goal concepts and low association to others. It carries strong, discriminating scent.
- A vague term such as "issues", "things to consider" or "some aspects" has a high base rate Pr(i), so its log-odds contribution is near zero. It costs attention (W_j) and delivers no scent.
- **COMPRESSION** that drops the discriminating term (e.g. "fix the thing in config" for "set `max_connections` in postgresql.conf") removes exactly the cues that carry the scent. **Padding** dilutes attention across zero-scent words.
- The softmax choice rule implies that when the cues in an answer's headings and lead phrases are weak, the reader's next move (keep reading, skim, abandon) becomes close to random.
- Abandonment when scent falls below expectation (SNIF-ACT) implies that a strong opening followed by low-scent filler loses the reader before the payload.

## Candidate rules
1. **Lead with the discriminating term.** Make the first words of the answer and of each heading or bullet the most specific term for the concept: the one a reader with this goal would most strongly associate with it. Do not lead with generic frames such as "There are several factors...".
2. **No zero-scent words.** Cut words whose base rate is so high that they predict nothing ("various", "aspects", "it is important to note"). Never drop the specific noun, identifier or number to save length, because that is what carries the scent.
3. **Keep scent from flagging.** Order content so that every successive section is at least as relevant to the user's stated goal as the reader expects. Stop when the remaining material would fall below that bar, instead of trailing off into low-value detail.

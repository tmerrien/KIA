# Chi, Pirolli, Chen & Pitkow (2001): Using Information Scent to Model User Information Needs and Actions on the Web (WUFIS / IUNIS)

## Citation
Chi, E. H., Pirolli, P., Chen, K., & Pitkow, J. (2001). Using information scent to model user information needs and actions on the Web. *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems (CHI 2001)*, Seattle, pp. 490-497. ACM. https://doi.org/10.1145/365024.365325
- **Full text read** (8 pp.) from an open copy at https://cs.fit.edu/~pkc/apweb/related/chi-chi01.pdf.
- Crossref confirms the DOI and pages 490-497. Crossref's registered title has a typo ("...and actions **and** the Web"); the PDF title reads "on the Web".
- OpenAlex (W2129874624) reports 418 citations as of 2026-10-28.
- **Why this work and not the 1999 paper.** The queued item was Pirolli & Card (1999), *Psychological Review* 106(4). Its slug `pirolli-card-1999-information-foraging.md` already exists in this track, so this note does not overwrite it. I retried the full text on this pass and it is still unavailable:
  - CMU ACT-R archive `124pirolli_card.pdf`: 503, then connection reset.
  - CiteSeerX 10.1.1.29.7346: connection reset.
  - APA PsycNET full text: 403.
  - PubPeer: lists a "preprint" label, but no resolvable URL.
- I covered this paper instead. It cites the 1999 paper as ref. [17] for its definition of information scent, and it turns that definition into a working, evaluated algorithm. That is the 1999 theory as operationalized by its own authors.

## Core claim
Information scent is "the imperfect, subjective perception of the value and cost of information sources obtained from proximal cues, such as Web links" (p. 491). It can be computed as the similarity between a link's cue words, weighted by TF.IDF, and the user's goal keywords. Spreading these normalized scent probabilities through a site's link graph predicts where goal-driven users end up (WUFIS). Reversing the computation, by running a visited path back through the topology to keyword weights, recovers the user's information need (IUNIS).

## Key evidence
- **WUFIS method** (pp. 491-492):
  - For each link (i,j), take the proximal-cue words K(i,j): the link text, the text around it, and so on.
  - Weight each word by TF.IDF, where W_TF.IDF(i,j) is how important word i is in document j.
  - Take the dot product with the need vector Q. This gives raw scent PS'(i,j).
  - Normalize each column to sum to 1, so PS is the probability of following each link.
  - Where no proximal cue can be extracted (image-only links), substitute "distal scent", computed from the words on the target page.
  - Simulate flow by spreading activation: A(t) = α S A(t-1) + E.
- **WUFIS evaluation** (Table 1, p. 493):
  - 19 sites of 27 to 12,000 pages each.
  - A blind human judge gave 570 ratings on a 0-10 scale (10 top URLs × 3 algorithm variants × 19 sites).
  - Proximal scent, where it could be extracted (11 sites), "consistently outperformed" distal scent, and scored 9 or higher in 8 of the 11.
  - Mean ratings across all sites: Combined 7.54, Distal 6.69, Proximal 5.20. Proximal is lowered by the 8 sites where it was n/a, because those links were image-only.
  - Caveat: a single judge, so inter-rater reliability is not reported.
- **IUNIS evaluation** (p. 494):
  - 8 PARC participants and 10 six-page paths from xerox.com logs. Each path was summarized by its 20 top keywords.
  - The matching summary was rated 4.58 on a 5-point scale (median 5). Non-matching summaries were rated 1.97, F(1,781) = 283.08, p < .001.
  - Participants picked the matching summary as the best of 10 in 5.6 of 10 cases (chance is 1), Cohen's kappa = 0.51.
- **Weighting the most recent pages more heavily in IUNIS** (recency weighting, plus page-access TF.IDF that down-weights pages like splash pages that everyone visits). This is the design point the authors justify: content that many paths share says little about any particular need (p. 492).
- **Design reading the authors give** (p. 493): good proximal scent indicates "a site that is well designed with the proximal browsing cues". Good distal scent alone means only that search will work, because the content is rich.

## Sources it builds on
- Pirolli & Card (1999), *Psychological Review*: ref. [17], the source of information-scent theory.
- Pirolli (1997), CHI '97, pp. 3-10: "Computational models of information scent-following in a very large browsable text collection", ref. [16].
- Anderson & Pirolli (1984), "Spread of activation", *JEP:LMC* 10, 791-798, ref. [3].
- Furnas (1997), "Effective view navigation", CHI '97, which introduces "residue" as the precursor term for scent, ref. [11].
- Huberman, Pirolli, Pitkow & Lukose (1998), "Strong regularities in World Wide Web surfing", *Science* 280, 95-97, the "Law of Surfing", ref. [13].
- Chi, Pirolli & Pitkow (2000), "The Scent of a Site", CHI 2000, the earlier system paper, ref. [9].
- Chakrabarti et al. (1998), WWW7, on link-anchor text as evidence, ref. [7]. Kleinberg (1998), ref. [14]. Brin & Page (1998), ref. [6]. Turtle & Croft (1991), inference networks, ref. [25].

## Works that cite it (forward)
- Verified as citing, from the OpenAlex cites-filter listing (not opened): White, R. W. & Roth, R. A. (2009), *Exploratory Search: Beyond the Query-Response Paradigm*, Morgan & Claypool, doi:10.2200/s00174ed1v01y200901icr003.
- UNVERIFIED (not opened):
  - Chi, Rosien, Supattanasiri et al. (2003), "The Bloodhound project", CHI 2003, automated usability from scent.
  - Olston & Chi (2003), "ScentTrails", *ACM TOCHI* 10(3).
  - Blackmon, Polson, Kitajima & Lewis (2002), "Cognitive walkthrough for the Web", CHI 2002, pp. 463-470, doi:10.1145/503376.503459. Its existence and DOI are confirmed via Crossref and DOI listings, but whether it cites this specific paper is UNVERIFIED.
  - Fu & Pirolli (2007), "SNIF-ACT", *Human-Computer Interaction* 22.
  - Pirolli (2007), *Information Foraging Theory* (OUP).

## Relevance to AI answer style
- **Measured advantage for the label's own words.** Proximal scent is computed only from the words a reader sees before committing: link text and the text around it. Where those words existed, they predicted the relevant destination better than the full target content did. The words in a heading, a lead sentence or a bullet stem are what the reader uses to decide whether to read on.
- **This argues for PRECISION in those slots.** The cue words must match the goal vector Q, and TF.IDF gives a word weight in proportion to how *discriminating* it is.
  - A word that occurs everywhere ("information", "overview", "details", "home") has near-zero IDF. It carries almost no scent, whatever its position.
  - This is the same point the 1999 note makes with PMI (pointwise mutual information), here in an implemented, evaluated form.
- **The image-only link as a COMPRESSION failure.** An image-only link carried no extractable proximal scent, so the model had to fall back on the destination's content. In answer terms this is the label with no words, such as "See below" or "Option 2", or a heading like "Notes". The reader can no longer judge from the label and has to pay the cost of reading the body.
- **IUNIS weights recent pages and down-weights shared ones.** The best evidence of what someone needs is the specific, rarely shared material they engaged with most recently, not the boilerplate everyone passes through. For an assistant: anchor the answer to the specific terms in the user's latest message, which is their highest-weight signal of need, rather than to generic topic words.

## Candidate rules
1. **The label must carry discriminating words.** Every heading, bullet stem and opening clause should contain at least one specific, low-frequency term from the user's goal: an identifier, a named concept or a number. Never use a content-free label such as "Details", "Option 2" or "Notes", whose only scent is in the body.
2. **Mirror the user's latest specific terms.** Use the user's most recent, most specific vocabulary in the lead and the labels, as IUNIS weighs the most recent page most heavily. Change to a more precise standard term only when the user's term is wrong or ambiguous, and then name both once.
3. **Cut zero-IDF filler from cue positions.** Generic words that would appear in any answer ("overview", "various aspects", "information about") add length to the slot the reader uses to decide whether to read on, and give the reader nothing to judge by. Keep the specific term, drop the generic frame.

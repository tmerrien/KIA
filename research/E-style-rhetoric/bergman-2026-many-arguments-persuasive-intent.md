# Bergman, Hussein, Catapano & Tormala (2026): many arguments raise both perceived expertise and perceived persuasive intent

## Citation
Bergman, A., Hussein, M. A., Catapano, R., & Tormala, Z. L. (2026). Fifteen reasons you should read this paper: How providing many arguments increases perceptions of both expertise and persuasive intent. *Personality and Social Psychology Bulletin*, 52(10), 3199-3215. doi:10.1177/01461672251366068. Online first 2025-09-24; PMID 40994142.
- Publisher page: https://journals.sagepub.com/doi/10.1177/01461672251366068
- Metadata, abstract and the 51-item reference list were read via Crossref: https://api.crossref.org/works/10.1177/01461672251366068
- Earlier conference version: "15 Reasons You Should Attend this Presentation...", Society for Consumer Psychology (SCP) 2025 preliminary program, https://myscp.org/wp-content/uploads/2025/01/Preliminary-Program-1.15.25.pdf

**Access note:** The full text was NOT read. OpenAlex marks the paper as bronze OA, but the Sage PDF and HTML both returned 403 or a bot-check page. Below:
- The abstract is primary (via Crossref).
- Study-level details come from a secondary report: BPS Research Digest, "More persuasive arguments aren't always more convincing," https://www.bps.org.uk/research-digest/more-persuasive-arguments-arent-always-more-convincing.
- Anything taken only from that secondary report is marked (secondary).

## Core claim
Compared with a few arguments, many arguments make a source look more expert, which helps persuasion. They also make the source look more intent on persuading, which hurts it. Because the two perceptions suppress each other, many arguments bring little or no net gain. Whether more arguments help or hurt depends on which matters more in context: high expertise or low persuasive intent.

## Key evidence
- From the abstract (primary): "using many arguments makes the source seem more like an expert, increasing persuasion, but it can also make the source appear to have greater persuasive intent, decreasing persuasion. These perceptions suppress each other, resulting in minimal or no overall benefit to persuasion." Across experiments, many arguments "can have a clear positive or negative effect, depending on whether high expertise or low persuasive intent is more valued."
- (secondary) The paper has five online experiments with more than 3,000 participants in total.
- (secondary) **Study 1** (N = 590): an email about a fictitious community ballot measure from "John", with 9 arguments vs. 1. Nine arguments raised both perceived expertise and perceived persuasive intent, and persuasion did not differ.
- (secondary) **Study 2**: a cold-brew coffee ad with 8 arguments vs. 2. Same pattern: the expertise gain was offset by persuasive intent.
- (secondary) **Study 3**: universal healthcare with 1, 3 or 9 arguments. Both perceptions rose with argument count. The study found "no evidence for the so-called 'three is a charm' effect."
  - UNVERIFIED: the exact conditions. The BPS summary contradicts itself, and Psychology Today lists 1/3/6/9.
- (secondary) **Moderation studies**: participants were steered to value expertise (medical advice from a doctor) or low persuasive intent (a supplement ad). With expertise valued, more arguments won. With low intent valued, fewer arguments won.
- Reported mechanism (secondary, quoting the authors): "providing many arguments might lead the target to question why the source is providing so many arguments."
- UNVERIFIED: effect sizes, the exact mediation statistics, and whether the arguments were pretested as strong. The BPS summary says "even cogent arguments."

## Sources it builds on
All of these are confirmed in the Crossref reference list.
- **Argument quantity as a peripheral cue:** Petty & Cacioppo (1984), already covered. Calder, Insko & Yandell (1974). Maddux & Rogers (1980).
- **Numerosity heuristic:** Pelham, Sumarta & Myaskovsky (1994).
- **The closest precedent:** Weaver, Hock & Garcia (2016), "'Top 10' reasons: When adding persuasive arguments reduces persuasion," *Marketing Letters* 27(1), 27-38, doi:10.1007/s11002-014-9286-1.
- **Persuasion knowledge and suspicion of motive:**
  - Campbell & Kirmani (2000)
  - Fein (1996)
  - Reinhard, Messner & Sporer (2006), on explicit persuasive intent
  - The forewarning literature: McGuire & Papageorgis 1962; Petty & Cacioppo 1977; Hass & Grady 1975; Chen et al. 1992
  - Reactance: Brehm 1966
- **Source credibility:**
  - Hovland, Janis & Kelley (1953)
  - Pornpitakpan (2004)
  - McGinnies & Ward (1980)
  - Wallace, Wegener & Petty (2020), on biased vs. untrustworthy sources
  - Tormala, Briñol & Petty (2006)
  - Karmarkar & Tormala (2010)
- **AI as a source:** Lu, Tormala & Duhachek (2025), *Scientific Reports* 15, 17170, which found that AI sources can increase openness to opposing views.

## Works that cite it
Crossref showed 0 citing works as of 2026-08-31. The OpenAlex forward query hit a rate limit. No influential forward citations found (UNVERIFIED beyond Crossref).

## Relevance to AI answer style
- **Padding sends a signal.** A long answer with many reasons ("here are 9 reasons...") does more than spend the reader's attention. Readers treat argument count as evidence of what the speaker wants. The answer reads as more expert but also more like a sales pitch, and the two cancel.
- **This is a COMPRESSION-vs-PRECISION argument from social cognition, not cognitive load.** The fix is not dropping meaning. It is choosing the one or two decisive reasons, i.e. precision: the argument that actually carries the conclusion.
- **Context changes the trade-off.**
  - When a user asks for expertise (a technical diagnosis), thoroughness costs less.
  - When the assistant is recommending, advocating or choosing between options, where persuasive intent is salient, extra reasons backfire.
- **"Three is a charm" did not hold**, so there is no magic list length.

## Candidate rules for the harness
1. When recommending an option, give the one or two reasons that decide it, not an exhaustive list of supporting points. Piling on reasons reads as selling and adds no persuasive value.
2. Do not inflate lists to round or impressive counts ("10 reasons..."). List length should follow the actual number of distinct, decisive points.
3. Match depth to the goal. When the user wants expert completeness (a diagnosis, a reference), fuller coverage is fine. When the answer advocates or advises, keep the support short and lead with any counter-consideration.

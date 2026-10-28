# Pirolli & Card (1995/1999): Information Foraging

## Citation
- **Read (primary):** Pirolli, P., & Card, S. (1995). Information foraging in information access environments. In *Proceedings of CHI '95: Human Factors in Computing Systems* (pp. 51-58). ACM. Full text: https://www.chi1995.chistatic.hosting.acm.org/proceedings/papers/ppp_bdy.htm
  - Page range 51-58 is UNVERIFIED (not shown on the HTML page I read).
- **Canonical expanded version (not read):** Pirolli, P., & Card, S. K. (1999). Information foraging. *Psychological Review, 106*(4), 643-675. https://doi.org/10.1037/0033-295X.106.4.643. Bibliographic data confirmed through the Crossref API (1,302 Crossref citations as of 2026-10-28). I could not open the full text: it is closed access per OpenAlex, and the APA, ResearchGate, CMU ACT-R and DTIC copies were blocked (403/503). Anything below that is specific to the 1999 paper (ACT-IF, the formal definition of "information scent") is UNVERIFIED.

## Core claim
People looking for information act like optimal foragers. They try to maximize the rate at which they gain valuable information per unit of time spent, and they do it under bounded rationality. Information sits in "patches", and models adapted from biology predict how foragers spend time between patches and inside them: Charnov's marginal value theorem predicts when a forager leaves a patch, and the diet model predicts which items are worth taking at all. The value of information is "not [an] intrinsic propert[y] of information-bearing representations"; it depends on the task the reader has in hand.

## Key evidence
- Case study of the Scatter/Gather cluster browser on the NIST Tipster corpus (more than 1M documents), using TREC queries. Four Xerox PARC researchers (2-96 hours of experience with the system) each did a one-hour retrieval session. The sessions were video-coded "to the nearest second" to measure the time cost of each operation, and separate experiments measured system response times.
- Patch model: when titles inside a cluster are sorted by probability of relevance, the gain curve changes from linear to diminishing returns. The marginal value theorem then gives a shorter optimal time in each patch, which means a higher overall rate of gain.
- Diet model: items are ranked by profitability (value divided by handling time). Lower-ranked items are included only if they at least match the average rate of the higher-ranked ones. Inclusion depends on profitability, not on how often items are encountered, and it is "all-or-none".
- A dynamic-programming model of when to scatter, gather or display under a deadline predicts that broad overview operations are optimal early, when precision is low and time is ample, and that displaying and selecting become optimal later. The validation is largely analytical and qualitative: there is no full empirical test, and n=4.
- Limits: tiny sample, one system, pre-web. Later web-scale support (SNIF-ACT, eye-tracking on SERPs) is cited below but was not read here.

## Sources it builds on (from its reference list)
Charnov (1976) marginal value theorem; Stephens & Krebs (1986) *Foraging Theory*; Card, Moran & Newell (1983) GOMS; Cutting et al. (1992) Scatter/Gather; Newell (1990) *Unified Theories of Cognition*; Anderson (1990) *The Adaptive Character of Thought* (rational analysis); Simon (1955) bounded rationality; Bates (1989) berrypicking; Schamber, Eisenberg & Nilan (1990) dynamic relevance; Smith & Winterhalder (1992).

## Works that cite it (forward). Not opened in this crawl, so the citation link is UNVERIFIED unless noted
- Pirolli & Card (1999), *Psychological Review*: the expanded theory, with ACT-IF and information scent (bibliographic data confirmed via Crossref).
- Chi, Pirolli, Chen & Pitkow (2001), "Using information scent to model user information needs and actions on the Web", CHI '01.
- Fu & Pirolli (2007), "SNIF-ACT: A cognitive model of user navigation on the World Wide Web", *Human-Computer Interaction* 22. Secondary sources describe its predictions: users choose high-scent links and leave when scent drops below a threshold.
- Pirolli (2007), *Information Foraging Theory: Adaptive Interaction with Information*, Oxford University Press.
- Nielsen Norman Group's practitioner articles on information foraging and scent (e.g. "Information Foraging: A Theory of How People Navigate on the Web").

## Relevance to AI answer style
An answer is a patch, and the reader is a forager deciding at every line whether the rate of gain justifies staying. Two levers follow from the theory:
1. **Gain curve.** Putting the highest-value content first turns a linear gain curve into diminishing returns. The reader gets most of the value early and can leave at the optimal point. This is the foraging justification for answer-first ordering.
2. **Profitability per item.** Each sentence has a value-to-handling-time ratio. In the diet model, low-profitability items should be dropped entirely, not shortened. That supports PRECISION over COMPRESSION: compressing a sentence lowers its handling time but also its value, and it can raise handling time if the reader has to decode it. Choosing the exact term raises value at constant cost. Filler (restating the question, hedging preambles) has near-zero value and still costs reading time, so it lowers the rate for the whole answer.
Value is also task-relative: the same fact can be high-value for one question and noise for another.
Scent: headings, first words and link labels are proximal cues. A misleading cue costs the reader more than a missing one, because it sends them into a low-yield patch.

## Candidate rules
1. **Rank by yield.** Order content by expected value to this user's task. Put the direct answer first, then what they need to act on it, then optional detail, so a reader who stops early still has the best of it.
2. **Drop low-profitability items whole.** If a sentence's value does not match the average of the rest, delete it. Do not abbreviate it. Never shorten by removing the term that carries the meaning.
3. **Make the cues truthful.** Every heading, lead phrase and link label must accurately predict what follows it (good information scent), so the reader can decide to enter or skip without reading the body.

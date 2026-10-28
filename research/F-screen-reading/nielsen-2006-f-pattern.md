# Nielsen (2006): F-Shaped Pattern for Reading Web Content (with 2017 and 2019 NN/g follow-ups)

## Citation
- **Primary:** Nielsen, J. (2006, April 16). *F-shaped pattern for reading web content*. Nielsen Norman Group. https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/
- **Follow-up 1 (read):** Pernice, K. (2017, November 12). *F-shaped pattern of reading on the web: Misunderstood, but still relevant (even on mobile)*. NN/g. https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/
- **Follow-up 2 (read):** Pernice, K. (2019, August 4). *The layer-cake pattern of scanning content on the web*. NN/g. https://www.nngroup.com/articles/layer-cake-pattern-scanning/
- Note: these are practitioner articles, not peer-reviewed papers. NN/g reports the eye-tracking studies in summary form. Full protocols and statistics are not given and are UNVERIFIED.

## Core claim
On the web, users mostly do not read text word by word. Their gaze makes two horizontal sweeps near the top of the content and then a vertical scan down the left edge, so the first paragraphs and the first words of each line get almost all of the attention. The F-pattern is "the default pattern when there are no strong cues to attract the eyes towards meaningful information". Clear headings shift users to the far more efficient layer-cake pattern: they scan the headings and read a section's body only when it looks relevant.

## Key evidence
- 2006: eye-tracking of 232 users looking at thousands of pages. Heatmaps of an About Us page, an e-commerce product page and a SERP all show an F shape, with variants (an E shape with a third bar, or an inverted L). Users see the first two words of a left-edge line far more often than the third. Exact fixation statistics are UNVERIFIED (not given).
- 2017: heatmaps of a historical article (more than 45 users) and TigersinCrisis.com (47 participants), plus mobile gaze replays and a right-to-left Arabic site, where the F is mirrored. The F appears when three conditions hold together: (a) unformatted text (a "wall of text" with no bolding, bullets or subheads), (b) the user wants to be efficient, and (c) the user is not committed to reading every word. Other patterns named: layer-cake, spotted (hunting for a number or link), marking (common on mobile), bypassing (skipping repeated first words of list items), and commitment (reading everything; only when highly motivated).
- 2019: the layer-cake pattern is shown in gaze plots and a 9-participant heatmap, and it was first seen in a 2004 study. NN/g rates it high-efficiency, versus low for the F, which "may miss meaningful information without realizing it". It works only "provided that the headings are meaningful and representative for the content underneath."

## Sources it builds on
- NN/g's earlier web-usability work. Morkes & Nielsen (1997), "Concise, SCANNABLE, and objective", is already covered in `D-human-factors-ux/morkes-nielsen-1997-concise-scannable.md`.
- The general eye-tracking/reading research tradition (e.g. Rayner's work on eye movements in reading). The articles do not cite it explicitly, so that lineage is UNVERIFIED.
- Nielsen & Pernice (2010), *Eyetracking Web Usability* (New Riders), the book-length report of the same research program. Not read; UNVERIFIED.

## Works that cite it (forward). Not opened in this crawl, so the citation link is UNVERIFIED
- Pernice (2017) and Pernice (2019) above (read; both explicitly build on the 2006 article).
- Nielsen & Pernice (2010), *Eyetracking Web Usability*.
- Academic eye-tracking studies of SERPs and web pages that test the F-pattern, e.g. Buscher, Cutrell & Morris (2009), "What do you see when you're surfing? Using eye tracking to predict salient regions of web pages", CHI '09.

## Relevance to AI answer style
An AI answer read in a chat UI is screen text, and the reader is usually in efficiency mode, not commitment mode. Most of their attention therefore goes to (1) the first one or two sentences and (2) the first one or two words of each line, paragraph, bullet and heading. That makes the left edge and the top of the answer the high-value positions, and the choice of word in those positions is a PRECISION problem. The word in the second slot of a bullet must be the exact term carrying the idea, not a filler like "It is important to note". A wall of unformatted text pushes readers into the F-pattern, where they miss content without knowing it. Meaningful headings let them use the layer-cake pattern and skip safely. There is a precision constraint here too: a heading that is broader or vaguer than its section breaks layer-cake scanning. Bullets that all start with the same words get skipped (bypassing), so repeated lead-ins waste the most valuable positions on the line.

## Candidate rules
1. **Front-load every unit.** Put the answer in the first sentence. Start each paragraph, bullet and heading with the information-carrying word. Never start with throat-clearing ("So,", "Great question", "It is worth noting that").
2. **No walls of text past a few lines.** When an answer has several separable parts, chunk it under short headings or bullets that accurately and exactly describe their contents, so the reader can scan the headings and skip what they don't need. Keep short answers as plain prose.
3. **Vary bullet lead words.** Do not start consecutive bullets with the same phrase. Lead with the distinguishing term so the first two words of each bullet carry different information.

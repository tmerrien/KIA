# Chen, Kalyuga & Sweller (2017): The expertise reversal effect is a variant of the element interactivity effect

## Citation
Chen, O., Kalyuga, S., & Sweller, J. (2017). The expertise reversal effect is a variant of the more general element interactivity effect. *Educational Psychology Review*, 29(2), 393-405. doi:10.1007/s10648-016-9359-1 (published online 2016-01-29).

- Full text read: the accepted manuscript on figshare (CC BY-NC-ND 4.0), https://figshare.com/articles/journal_contribution/The_expertise_reversal_effect_is_a_variant_of_the_more_general_element_interactivity_effect/12052695, file https://ndownloader.figshare.com/files/22174806 (md5 c74393ede4cb72339c1b7e70d5820329, 29 manuscript pages). The page numbers below are manuscript pages, not journal pages.
- Crossref citation count on 2026-10-28: 169.
- Type: a theoretical review. It reports no new data and reinterprets earlier experiments, mainly Chen, Kalyuga & Sweller (2015).
- Why this work is here: it was queued as a forward follow-up to Kalyuga et al. (2003). The 2003 paper already has a note (`kalyuga-2003-expertise-reversal.md`). Kalyuga (2007, *Educational Psychology Review* 19, 509-539), the most-cited forward work, could not be read: the UNSW repository record hides its file, and the only other copy found is a third-party course upload. That work stays unread.

## Core claim
The amount of material a reader must hold in mind at once, its *element interactivity*, is "a combination of the characteristics of the material to be learned and the knowledge base of the learner. It cannot be determined merely by reference to the characteristics of the information alone" (p. 9). Expertise collapses many interacting elements into one schema. So guidance that cuts load for novices makes a high-interactivity task low-interactivity for experts, where the guidance becomes redundant and *adds* elements to process. The expertise reversal effect is therefore not a separate phenomenon. It is the general rule that load-reducing techniques work only on high-interactivity material, with expertise as the variable that changes interactivity (pp. 15-17, 23-24).

## Key evidence (as summarised in the review)
- **Mechanism for redundancy.** An expert given a worked example "must compare their known problem solution with the redundant solution presented. The consequence is an increase in element interactivity due to redundancy rather than the decrease we find with novices" (p. 17). The reverse worked-example effect "is an example of the redundancy effect" (p. 17).
- **Chen et al. (2015, *J. Educ. Psych.* 107, 689-704, doi:10.1037/edu0000018).** In geometry, novices learned better from worked examples on high-interactivity problem solving, and from generating answers on low-interactivity formula learning. With more knowledgeable learners and the same content, generating was better for *both* kinds of material, because expertise had made everything low in interactivity (pp. 21-23).
- **Kalyuga, Chandler & Sweller (2001).** The worked-example effect and its reversal appeared only for high-interactivity material. There was no difference on low-interactivity material (p. 18).
- **Leahy & Sweller (2005).** The imagination effect held for more knowledgeable students and only on high-interactivity material (p. 18).
- **Blayney et al. (2010), accountancy.** Presenting isolated elements first helped less knowledgeable learners. More knowledgeable learners did better with the fully interacting presentation (pp. 18-20).
- **Older interactivity evidence.** Sweller & Chandler (1994), Chandler & Sweller (1996), Tindall-Ford et al. (1997) and Rey (2011) found that split-attention, redundancy and modality effects disappear on low-interactivity material (p. 12).
- **Range of the expertise reversal effect** (pp. 3-7): engineering, geometry, algebra, statistics, gradient descent, Shakespeare with explanatory notes (Oksa et al., 2010: integrated glosses helped novices and footnotes helped experts), journal-writing prompts, and process-oriented versus product-oriented worked examples (van Gog et al., 2008: once learners have expertise, explanations of the *reasons for each step* become redundant).
- **Two forms** (pp. 2-3): an ordinal interaction, where the advantage shrinks or disappears with small expertise gaps, and a disordinal interaction, where it crosses over with large gaps (Nievelstein et al., 2013).
- **Not the same as difficulty** (p. 10): vocabulary or the periodic table is hard because it has many elements, but interactivity is low because each element can be learned alone. "Understanding" applies only to high-interactivity information (p. 10).

## Sources it builds on
- Sweller (1994); Sweller & Chandler (1994); Sweller (2010), *Educational Psychology Review* 22, 123-138, doi:10.1007/s10648-010-9128-5 (element interactivity as the basis of every load type; 1,571 Crossref citations).
- Sweller, Ayres & Kalyuga (2011), *Cognitive Load Theory* (Springer): the five principles of human cognitive architecture (pp. 13-14).
- Kalyuga, Chandler & Sweller (1998, 2000, 2001); Kalyuga, Chandler, Tuovinen & Sweller (2001); Kalyuga (2007); Kalyuga & Renkl (2010); Kalyuga & Sweller (2004).
- Chen, Kalyuga & Sweller (2015): the main empirical base.
- Van Merriënboer, Kester & Paas (2006): intrinsic load depends on element connectedness and on the learner's knowledge.
- Wulf & Shea (2002): a parallel argument from motor learning that findings on simple skills do not transfer to complex ones (p. 24).

## Works that cite it (influential forward citations)
- Sweller, J., van Merriënboer, J. J. G., & Paas, F. (2019). Cognitive architecture and instructional design: 20 years later. *Educational Psychology Review*, 31, 261-292. doi:10.1007/s10648-019-09465-5. Crossref: 2,126 citations. Its reference list on Crossref includes this paper (ref. 9465_CR17). Its content is UNVERIFIED: not opened.
- A full list of forward citations is UNVERIFIED. The OpenAlex and Semantic Scholar citation endpoints were rate-limited or returned nothing on 2026-10-28.

## Relevance to AI answer style
- **A test for precision versus compression.** A precise term is one element *for a reader who holds the schema*. For a reader who does not, the same term brings back every interacting element it stands for. So "concise" cannot be judged from the text alone (p. 9). An answer is precise when its terms are single elements for this reader. It is over-compressed when a term silently stands for interacting elements the reader must rebuild.
- **Explanation of known material costs the reader, not just the word count.** For an expert, an explanation of what they already know does more than waste space. It adds an element to process, because they must check it against what they know (p. 17). This is a mechanism for why padded answers feel worse to experts, beyond time spent reading.
- **Gauge interactivity, not difficulty.** A lookup ("what port does Postgres use?") has low interactivity even for a novice. Scaffolding there is pure redundancy, so give the fact. Scaffolding pays only when the answer requires several related ideas to be held together (a design trade-off, a debugging chain), and only for a reader without the schema. That gives two separate checks before expanding an answer: is the content high in interactivity, and does this reader lack the schema?
- **Explain the result, not the steps, for experts.** The van Gog et al. (2008) result suggests that experts benefit from the steps without the "why" of each step. The rationale is what turns redundant (p. 6).
- **Separate glosses beat interleaved ones for experts** (Oksa et al., 2010): this agrees with the existing 2003 note's rule on keeping scaffolding separate. It adds a direct test on text with explanatory notes.
- **Limits:** this is a theory paper whose evidence comes from learning outcomes in instruction, not task completion in Q&A. Carrying it over to chat answers is an extrapolation. Nobody has yet measured element counts for real answers.

## Candidate rules for the harness
1. **Two-question gate before elaborating.** Add explanation only when (a) the answer requires several related ideas to be held together, *and* (b) the user has not shown they hold the relevant concept. If either is false, give the precise answer without scaffolding. A factual lookup never needs a tutorial, whoever asks.
2. **Count a term as compressed only relative to this reader.** Use the exact technical term when the user's own wording shows they hold its schema. When they have not, keep the term (it carries the idea) and add a one-clause gloss in a separate position. Never replace it with a vaguer paraphrase that drops meaning.
3. **For a user who shows expertise, give steps or results without the reasons for each step.** Offer the reasons on request, or only for the one step that is non-obvious.

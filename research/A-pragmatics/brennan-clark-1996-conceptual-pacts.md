# Brennan & Clark (1996): Conceptual pacts and lexical choice in conversation

## Citation
Brennan, S. E., & Clark, H. H. (1996). Conceptual pacts and lexical choice in conversation. *Journal of Experimental Psychology: Learning, Memory, and Cognition*, 22(6), 1482-1493. doi:10.1037/0278-7393.22.6.1482

Full text read: https://web.stanford.edu/~clark/1990s/Brennan.Clark.96.pdf (12-page publisher scan on H. H. Clark's Stanford page).

## Core claim
When people refer to something, they are proposing a way to conceptualize it. Once the partner accepts that proposal, it becomes a "conceptual pact": a temporary, partner-specific agreement that both sides go on using even when a simpler term would now be enough. Pacts are provisional. Over time people shorten them, and they drop them when the situation or the partner changes.

## Key evidence
- **Task.** Director-matcher card matching. In A trials each target is the only member of its basic-level category (one shoe). In B trials it is not (three shoes, so "the loafer" is needed). C trials return to the A set, where "the shoe" would again be enough.
- **Exp. 1** (24 pairs, Stanford). In the first B trial (B1), directors became more specific 95% of the time, so they obeyed Grice's first quantity submaxim. In the first C trial (C1) they kept the over-specific B term 52% of the time (40% by a verbatim criterion), so they ignored the second submaxim. Frequency mattered: they kept it 69% of the time after four B trials but 35% after one (verbatim: 60% vs 15%). This counts against a recency-only account. When terms changed between trials, they were mostly shortened (shortening 60% vs lengthening 8% over B trials), and "they almost always retained a consistent conceptual perspective" (p. 1487).
- **Between-pair vs within-pair agreement (Exp. 2).** Two directors from different pairs chose the same B term only 10% of the time, which falls inside Furnas et al.'s (1987) 7-18% "vocabulary problem" range. Within a pair, the terms matched 56% of the time.
- **Exp. 2** (36 pairs who swapped roles each trial). Directors kept the B term in C1 46% of the time, rising to 61% after four B trials vs 31% after one. It did not matter which partner had proposed the term, so the pact is shared rather than owned by one speaker. Hedges ("sort of", "-ish", "kinda") marked uncertain proposals: 1 hedge in 240 A trials, 26% in B1, falling to 2% by B4. "Meta-references" ("the one from before") fell from 21% to 4%. When the B term already contained the basic-level word ("big dog"), pairs reverted to that word 49% of the time, vs 14% when it did not ("Irish setter").
- **Exp. 3** (partner switch). Directors used the same term in C1 as in B4 48% of the time with the same matcher and 18% with a new one. Over the C trials, use of plain basic-level terms rose from 15% to 23% with the same partner and from 20% to 55% with a new partner. With a new partner, directors who did change their term lengthened it 67% of the time, vs 22% with the old partner. New matchers cut in with "yeah" to signal that the basic-level term was enough.
- **Appendix and the Danet (1980) trial example.** A failed pact ("lab" vs "dog") and the "baby" vs "fetus" contest show that a term choice signals a perspective. Refusing a partner's term is itself a communicative act.

## Sources it builds on
Grice (1975) quantity maxims; Horn (1984); Cruse (1977) on lexical specificity and markedness; Brown (1958) "How shall a thing be called?"; Rosch et al. (1976) on the basic level; E. V. Clark (1987) principle of contrast; Garrod & Anderson (1987) output/input coordination; Krauss & Weinheimer (1964, 1966); Carroll (1980); Clark & Wilkes-Gibbs (1986); Schober & Clark (1989); Clark & Brennan (1991) on grounding; Furnas et al. (1987) on the vocabulary problem; Levelt & Kelter (1982) on question-answer correspondence.

## Works that cite it (forward)
All bibliographic details below are from search results and publisher listings only. None of these full texts was read, so their content claims are UNVERIFIED.
- Metzing, C., & Brennan, S. E. (2003). When conceptual pacts are broken: Partner-specific effects on the comprehension of referring expressions. *JML* 49(2), 201-213. This is the comprehension-side test: an old partner who breaks a pact slows the listener.
- Pickering, M. J., & Garrod, S. (2004). Toward a mechanistic psychology of dialogue. *BBS* 27(2). This is the interactive-alignment account, which competes with the partner-specific account.
- Kronmüller, E., & Barr, D. J. (2007), *JML*. They argue that the "broken pact" effect reflects general expectations about language use rather than beliefs about a particular speaker.
- Branigan, H. P., Pickering, M. J., Pearson, J., & McLean, J. F. (2010). Linguistic alignment between people and computers. *Journal of Pragmatics* 42(9), 2355-2368. The listing reports that alignment in human-computer interaction is stronger than between humans and more belief-mediated.

## Relevance to AI answer style
- **Precision vs compression.** The paper separates two kinds of shortening. Shortening *within* a pact keeps the conceptualization ("the curved round fish with the green stripe" becomes "the curved round fish"); that is safe compression, because the shared history supplies the dropped content. Switching to a new term is a *new* conceptualization, which costs grounding. An assistant that swaps synonyms for variety ("cache" / "buffer" / "store") is, in Brennan & Clark's terms, signalling a new referent or perspective (principle of contrast). That is a precision failure, not stylistic elegance.
- **Over-specific but stable beats minimal but shifting** while the conversation continues. Partners kept "the loafer" when "the shoe" would have been enough, because the established term costs no new grounding. Human-human dialogue therefore licenses keeping an agreed term even when it is longer than the context needs.
- **The pact belongs to this user, not to the world.** With a new addressee (a new session, or text meant to be forwarded to a third party), the pact does not carry over. Speakers re-expanded and went back to the plain basic-level term. Text the user will forward should be re-lexicalized for the new reader.
- **Hedges mark provisional terms and should disappear once a term is ratified.** Repeated "sort of X" after the user has adopted X is noise.
- **Adopt the user's term.** Pacts are shared regardless of who proposed them. If the user names something, using their name grounds it for free. Pressing an alternative signals a different perspective (the lab/dog and baby/fetus cases).

## Candidate rules for the harness
1. **Term lock:** Once the user and assistant have used a term for a thing (especially the user's own term), keep exactly that term for the rest of the conversation. Do not rotate synonyms for variety. Shorten it only by dropping modifiers ("the retry-with-backoff wrapper" can become "the wrapper"), never by switching to a different head noun.
2. **Announce a re-lexicalization:** Switch terms only when the old term has become wrong (the referent changed, or the set now has competitors). When you switch, mark it explicitly once ("the old function, now called X") and then use only the new term.
3. **Reset for a new reader:** When writing something meant for a third party (summary, PR description, message to forward), do not rely on conversation-internal labels. Use the plain, most available term, or define the pact term on first use. Drop hedges on a term once the user has ratified it.

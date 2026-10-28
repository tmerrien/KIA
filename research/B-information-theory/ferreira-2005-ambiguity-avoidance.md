# Ferreira, Slevc & Rogers (2005): How do speakers avoid ambiguous linguistic expressions?

## Citation

Ferreira, V. S., Slevc, L. R., & Rogers, E. S. (2005). How do speakers avoid ambiguous linguistic expressions? *Cognition, 96*(3), 263-284. https://doi.org/10.1016/j.cognition.2004.09.002 (PMID 15996561)

**How it was read.** The article is closed access. Semantic Scholar marks it CLOSED, it has no PMC copy, and the lab's publication page links only to the Elsevier copy. The full 2005 article was NOT read. Two primary sources were read instead:

1. The authors' abstract on PubMed: https://pubmed.ncbi.nlm.nih.gov/15996561/
2. The first author's detailed account of all the experiments, with the percentages, in §4.1 of Ferreira, V. S. (2008), "Ambiguity, accessibility, and a division of labor for communicative success", *Psychology of Learning and Motivation 49*, 209-246, doi:10.1016/S0079-7421(08)00006-6. Author manuscript: https://pmc.ncbi.nlm.nih.gov/articles/PMC2731310/

Every number below comes from that 2008 account. None was checked against the 2005 tables.

## Core claim

Speakers almost always avoid *nonlinguistic* ambiguity. This is where two referents share a concept and differ only in a feature such as size: they say "smaller bat" and "bigger bat". Speakers only sometimes avoid *linguistic* ambiguity, such as the homophone "bat" for an animal and for a baseball bat, and they detect it mainly after the fact. Once they have said "bat" for one meaning and are about to use it for the other, they switch to a distinct label. Production can check meaning against meaning well. It is bad at the "production U-turn": checking a chosen word against unintended meanings that word could also have.

## Key evidence

The task was referential communication. The speaker saw four line drawings and described the target so that an addressee could pick it out. The target was a homophone object, such as a flying mammal. The display held either a *foil* (the baseball bat, which causes linguistic ambiguity), a same-category foil (a larger flying mammal, which causes nonlinguistic ambiguity), or only unrelated objects (control).

- **Exp. 1: preview.** In half the trials the target arrow appeared together with the pictures. In the other half the speaker saw the display for 5 s first. With preview, speakers avoided the bare homophone 22% more often than without. Without preview, they used bare "bat" only 11% less often in ambiguous contexts than in control contexts, so they barely avoided ambiguity at all.
- **Exp. 2: look at the foil vs. prepare to name it.** A bouncing dot indicated the objects. In one condition speakers named only the second-last object, which meant looking at the foil. In the other they named all objects, so the foil was the very next thing they would say. Bare homophones fell only from 46% to 44%. Avoidance in Exp. 2 was just 7 points better than Exp. 1 without preview (52% vs. 45%).
  - Speakers often said "swan, bat, and baseball bat": the first mention stayed ambiguous and only the second was repaired.
  - With size-contrast pairs, speakers almost never said "bat, and bigger bat". They nearly always said "smaller bat, and bigger bat".
  - Real addressees vs. imagined addressees made no qualitative difference. With real addressees, speakers were over-descriptive overall, even in the control condition, with descriptions like "the animal bat with its wings open".
- **Exps. 3-4: order.** When speakers described the target *after* the foil, they avoided the bare homophone far more often ("swan, bat, and flying bat") than when the target came first. Speakers avoid linguistic ambiguity most reliably once the ambiguous form has already been produced for another meaning.
- **Abstract wording (PubMed).** "Speakers almost always avoided nonlinguistic-ambiguity... production processes are especially sensitive to nonlinguistic- but not linguistic-ambiguity, with the latter avoided consistently only once it is already articulated."

**Correction to the queue note.** The queue note said speakers "resolve conceptual ambiguity but not linguistic ambiguity". That is roughly right, but they do resolve linguistic ambiguity in two cases: with long preview, and after they have already used the label. The asymmetry is about *when* the ambiguity is detected.

## Sources it builds on

These come from the 2008 chapter's framing and reference list. The 2005 reference list itself is UNVERIFIED.

- Grice (1975), maxim of Manner: "avoid ambiguity". Already covered.
- Ferreira & Dell (2000), *Cognitive Psychology 40*(4), 296-340, doi:10.1006/cogp.1999.0730. Speakers do not use optional "that" to avoid temporary syntactic ambiguity; availability drives the choice.
- Clark (1996), *Using Language*, and the referential-communication paradigm tradition.
- Snedeker & Trueswell (2003), *JML 48*, 103-130. Speakers use prosody to disambiguate only when they are aware of the ambiguity.
- Kraljic & Brennan (2005), *Cognitive Psychology 50*, 194-231, doi:10.1016/j.cogpsych.2004.08.002. Prosodic disambiguation happens regardless of whether the addressee needs it.
- Levinson (2000), *Presumptive Meanings*. Production is costlier than comprehension, so listeners take on the inferential work.

## Works that cite it (forward)

Citation counts are from the Semantic Scholar API, retrieved 2026-10-28. The paper itself has 142 citations.

- Piantadosi, Tily & Gibson (2012), *Cognition*: the communicative function of ambiguity. Already covered.
- Engelhardt, Bailey & Ferreira (2006), "Do speakers and listeners observe the Gricean Maxim of Quantity?", *JML*, doi:10.1016/j.jml.2005.12.009.
- Arnold (2008), "Reference production: Production-internal and addressee-oriented processes", *LCP*, doi:10.1080/01690960801920099. Also Arnold (2010), "How speakers refer: the role of accessibility", *Lang. Ling. Compass*.
- Arnold & Griffin (2007), "The effect of additional characters on choice of referring expression", *JML*.
- Keysar (2007), "Communication and miscommunication: the role of egocentric processes", *Intercultural Pragmatics*.
- Jaeger & Buz (2017), "Signal reduction and linguistic encoding", *Handbook of Psycholinguistics*.
- van Deemter, Gatt & van Gompel (2012), "Toward a computational psycholinguistics of reference production", *TopiCS*.
- Ferreira (2008), the chapter above. It reframes the result as a "division of labor": the grammar keeps most utterances understandable, speakers optimize for ease of production, and addressees do the inferential work.

## Relevance to AI answer style

The result splits *precision* into two separate checks:

1. **Referent-level contrast.** Two things in context share a concept, such as two config files or two versions of a function. Humans handle this automatically by adding the distinguishing feature, which costs few words and resolves the ambiguity fully. An assistant should do the same: name the contrastive attribute ("the staging `config.yaml`", not "the config").
2. **Form-level ambiguity.** One word means different things in context, such as "model", "key", "session", "test", "build" or "artifact". Human writers do not reliably catch this, because spotting it means checking the chosen word against meanings they never intended. An assistant cannot rely on the human default. It needs an explicit pass for terms that are overloaded *in this conversation's context*.

The data also show the cheap fix. Humans naturally repair a word when they are about to reuse it for a second meaning. If a term will carry two senses in one answer, the first mention should already carry the qualifier, so the reader never has to revise.

This is precision, not compression. The fix adds one or two words ("baseball bat", "flying bat") exactly where an ambiguity exists. It does not over-describe; the real-addressee speakers' "the animal bat with its wings open" is the over-description case.

The division-of-labor view also implies that readers will absorb unflagged ambiguity at their own cost. For an assistant whose reader cannot ask cheaply, or will act on the answer immediately, that cost is not acceptable.

## Candidate rules for the harness

1. **Name the contrast, not the category.** When the context holds two or more things the reader could mean by a noun (files, versions, environments, functions), give every mention, including the first, the attribute that tells them apart. Use the identifier, path or version, not a generic noun.
2. **Overloaded-term check.** Before finalizing, scan for terms with more than one live sense in this context, such as "model", "key", "token", "session", "build", "test", "branch" or "agent". If two senses appear in the same answer, qualify the *first* mention, not just the later ones ("API key" vs. "dict key").
3. **Minimal disambiguator.** Add the shortest modifier that separates the referents. Do not add descriptive detail beyond the contrast, because over-description costs reading time without adding precision.

# Kanien'kéha Learning Companion — Root-Word Curriculum Reorganization Plan

**Document purpose:** This is a design brief for Claude. It reorganizes the existing 30-unit topic-based curriculum into a root-word-first (morphological) sequence, aligned with Kanien'kéha immersion pedagogy as practiced at programs such as the Ratióhkwats language nest (Kahnawà:ke), the Akwesasne Freedom School, and Tsi Tyónnheht Onkwawén:na (Six Nations). It maps all existing content (data_units.json, data_glossary.json) to a new unit order, explains the pedagogical logic, and provides complete specs for each new unit so a future Claude session can generate `data_units.json` lessons and exercises directly.

---

## Background: Why root-word sequencing?

The existing curriculum is topic-based: Unit 1 = pronouns, Unit 2 = kinship, Unit 3 = nouns, etc. This mirrors dominant-language pedagogy (vocabulary lists by theme). Kanien'kéha immersion programs use a different organizing principle: **the verb root and its prefix system are the engine of the language.** Every word — noun, verb, pronoun, particle — grows from a root that carries the core meaning. Prefixes encode who is doing what to whom, when, in what number, and in what relationship to the speaker.

A root-word curriculum teaches the root first, then systematically expands the prefix paradigm around it. A learner who knows the root *-atien-* (sit) can immediately generate "I sit," "you sit," "he sits," "she sits," "we two sit," "you all sit" once they control the prefix system — and this same prefix system applies to every other verb root. By contrast, a topic-based curriculum teaches "sit" as a vocabulary item and teaches the prefix system separately, causing learners to re-learn the same paradigm for every new verb.

This approach also reflects how fluent speakers describe the language: not as a list of words, but as a system of roots that "grow" with prefixes and suffixes. The Mohawk Language Immersion approach used by Brian Maracle (Tsi Tyónnheht Onkwawén:na) starts with the verb body in the first week and expands outward. The Ratióhkwats nest operates on the same principle.

### Consequences for this curriculum

1. **The syllabary (data_syllabary.json) moves to Unit 0** — an unlockable sound reference, not a prerequisite gate. Learners encounter sounds through roots, not through abstract drills.
2. **Verb roots are the primary organizing unit** for Stages 1–3 (Units 1–18). Noun vocabulary attaches to the verb paradigm it most naturally accompanies.
3. **The existing pronoun and noun content (Units 1–3)** is redistributed: free pronouns are taught as the "minimal verb" (a pronoun standing alone is a compressed verb phrase), and noun classes are introduced as objects/incorporates of high-frequency verb roots.
4. **All existing vocab IDs, exercise types, and `accepts[]` arrays are preserved.** This plan reorganizes which unit/lesson they appear in, not their content.
5. **The Thanksgiving Address (existing Unit 5) is kept early** — moved to Unit 4 — consistent with the Chew, Leonard & Rosenblum (2023) principle that ceremony is not advanced content; it is the beginning of meaning.
6. **Grammar units (existing Units 10–11, 18–19, 21–22) are dissolved** into the verb-root units where the grammar arises naturally, rather than being taught as standalone grammar modules.

---

## Data file notes for Claude

Before generating any unit or lesson, Claude should read:

- `data_glossary.json` — 1,254 vocab entries. Each has `id`, `target`, `english`, `pos`, `unit`, `lesson`, `notes`, `cite`, `accepts[]`, and optionally `forms[]`.
- `data_variants.json` — dialect variant table keyed to vocab IDs (e.g., `"p04"`, `"n05"`). Always include variant notes in lesson `intro` when a root has a community variant.
- `data_syllabary.json` — phonological reference. Use for `audio` exercise `hint` fields.
- `data_units.json` — the existing unit/lesson/exercise structure. All exercise types (`mc`, `match`, `fill`, `type`, `audio`, `story`) and their required fields are defined here.
- `README.md` — exercise type specs, field requirements, pedagogical framework citations. Every lesson must include at least one `story` or reflective `mc` exercise (Emotional/Spiritual dimension per LaFever four-domain outcomes).

### Verb stem classes in the glossary (for Claude's reference)

| POS value | Description | Example IDs |
|---|---|---|
| `verb` | Uninflected/command citation forms | v01–v06, av01–av14 |
| `verb.a-stem` | A-stem (most common) | v01, v03, v05 |
| `verb.consonant-stem` | C-stem | cv01–cv09 |
| `verb.e-stem-true` | True E-stem | ev01–ev04 |
| `verb.e-stem-fake` | Fake E-stem (root begins with e but behaves differently) | fe01–fe16 |
| `verb.i-stem` | I-stem | iv01–iv03 |
| `verb.o-stem` | O-stem | ov01–ov04 |
| `verb.stative` | Stative (describes a state, not an action) | st01–st23 |
| `verb.direction` | Direction verbs | dv01–dv04 |
| `verb.relational` | Relational prefix verbs | — |

### Noun classes in the glossary

| ID prefix | Class | Examples |
|---|---|---|
| a01–a08 | A-class (clothing/personal objects) | shoe, dress, basket |
| o01–o08 | O-class (nature/round objects) | stone, bowl |
| ka01–ka14 | Ka-class (tools, vehicles, instruments) | canoe, drum |
| n01–n08 | Person nouns (singular) | man, woman, child |
| k01–k18 | Kinship | mother, father, grandmother |
| na01–na23 | Nature | land, tree, water, sky |
| wa01–wa19 | Wild animals | bear, deer, wolf |
| fo01–fo21 | Food | corn, bread, fish |

---

## Curriculum architecture overview

The reorganized curriculum has four stages:

| Stage | Units | Core principle | Immersion analog |
|---|---|---|---|
| **Foundation** | 1–4 | Root + minimal prefix system | Week 1–4 immersion: verb body first |
| **Paradigm expansion** | 5–12 | All persons, all numbers, aspect | Weeks 5–12: full conjugation tables |
| **Relational and transitive** | 13–20 | Object prefixes, relational prefixes | Intermediate immersion |
| **Cultural depth** | 21–30 | Ceremony, oral tradition, land, oral fluency | Advanced immersion / community language |

Units from the existing curriculum map to this structure as follows (see individual unit specs below).

---

## Stage 1: Foundation — Root, Prefix Body, Singular Paradigm

### Unit 1 — The Root Is the Word
*Replaces: portions of existing Unit 1 (Singular Pronouns) and Unit 3 (A-stem verbs)*

**Core concept:** Kanien'kéha words grow from roots. The root carries the meaning; prefixes carry the grammar. Begin with two high-frequency A-stem roots and show how the prefix body works for first and second person singular.

**Key roots introduced:**
- `-atien-` (sit) — existing id: v01
- `-aráhtat-` (run) — existing id: v03
- `-atkáhthon-` (listen) — existing id: v05

**Prefix paradigm (singular only):**
- `k-` / `ke-` = I (first person singular)
- `s-` = you (second person singular)

**Lesson plan:**

```
u_rw1l0 — "The Root and the Prefix"
  intro: What is a root in Kanien'kéha? The analogy of a tree: root (meaning) + prefix (who/what).
         Compare to English: "sit" is always "sit" — you add a pronoun before it.
         In Kanien'kéha, the pronoun fuses INTO the verb. There is no separate word for "I."
  vocabIds: [v01, v03]
  exercises: mc (what does -atien- mean), fill (k___atien = I sit), type (you sit),
             audio (á:tien, hint from syllabary), story (when do you sit and listen?)

u_rw1l1 — "Adding a Third Root: Listening"
  intro: A third A-stem root. Notice the at- middle-voice infix in atkáhthon — this infix
         appears in many body-related and reflexive verbs and is worth noticing now.
  vocabIds: [v05]
  exercises: mc, fill, match (three roots to three meanings), type, audio, story

u_rw1l2 — "Root and Prefix Together: I and You"
  intro: Practice k- (I) and s- (you) across all three roots introduced so far.
         Introduce the concept: the prefix IS the pronoun. No separate word needed.
  vocabIds: [v01, v03, v05]
  exercises: match (prefix + root combinations), fill (build sentences), mc (structural),
             story (Maracle/Freire reflection: this language puts the person inside the verb)

u_rw1l3 — "Dialect Note: r/l and y/i"
  intro: Brief lesson on the two most common dialect variations the learner will encounter.
         Use data_variants.json for p01 (í:se'/ý:se') and p04 (raónha/laónha).
         All forms accepted as correct throughout the app.
  vocabIds: [p01, p04]
  exercises: mc (which community uses l-form), match (dialect pairs), story (your community form)
```

**Pedagogical note:** This unit follows Mithun (1982) on teaching polysynthetic structure as generative architecture, not vocabulary list. It also follows Maracle (1993): the first thing a new speaker should be able to say is "I sit here and listen."

---

### Unit 2 — The Pronoun as Compressed Verb
*Replaces: existing Unit 1 Lessons u0l0–u0l2 (Singular, Dual, Plural Pronouns)*

**Core concept:** Free pronouns (í:se', í:'i, raónha, etc.) are not "stand-alone" pronouns the way English has them — they are emphatic/focus forms that can stand in for a full verb phrase. Teach them as the "smallest possible verb," coming after learners understand that the same meaning is normally carried inside the verb prefix.

**Key vocab:**
- All 15 free pronouns: p01–p13
- Introduce alongside the same three verb roots from Unit 1

**Lesson plan:**

```
u_rw2l0 — "Free Pronouns: What They Are and Are Not"
  intro: Now that you know k- (I) and s- (you) live inside the verb, meet the free pronoun.
         í:'i does not mean "I" the way English "I" does — it emphasizes, focuses, or stands
         alone when no verb follows. Use data_variants.json for p01, p02.
  vocabIds: [p01, p02, p03, p04, p05]
  exercises: [all from existing u0l0, reorganized]

u_rw2l1 — "Dual Pronouns: te- marks Two"
  intro: The te- prefix for duality. This is the same te- you will see later in dualic verbs.
         Learning it here is not a pronoun lesson — it is a prefix lesson.
  vocabIds: [p06, p07, p08, p09]
  exercises: [all from existing u0l1]

u_rw2l2 — "Plural Pronouns: -kwé:kon marks Everyone"
  intro: The -kwé:kon suffix for plurality. Again, this is a morpheme lesson.
  vocabIds: [p10, p11, p12, p13]
  exercises: [all from existing u0l2]

u_rw2l3 — "All Fifteen Together"
  vocabIds: [p01–p13]
  exercises: [from existing u0l8]

u_rw2l4 — "Formal Pronouns and Addressing Elders"
  vocabIds: [p03, p04, p05, n04, n08, le04]
  exercises: [from existing u0l7]
```

---

### Unit 3 — People, Kinship, and the Ra-/I- Prefix System
*Replaces: existing Unit 1 Lessons u0l3–u0l4 (People Nouns) and Unit 2 Lessons u1l0–u1l1 (Kinship)*

**Core concept:** The Ra-/I- (or La-/I- in Akwesasne) male/female prefix distinction runs through person nouns and kinship terms. Teach these as a paradigm, not a list: the root `-nón:kwe-` (person) with Ra- = man, I- = woman, Teken- = two women, Ron- = men, Kon- = women. This is the same prefix logic as the pronouns — the learner is now seeing it in nouns.

**Key vocab:** n01–n08, nd01–nd07, np03–np07, k01–k10, k17–k18, kin02–kin04

**Lesson plan:**

```
u_rw3l0 — "The Person Root: -nón:kwe-"
  intro: One root, many words. Ra- + -nón:kwe- = man. I- + -nón:kwe- = woman.
         This is the same Ra-/I- distinction from the pronouns. It is not a coincidence.
  vocabIds: [n01, n02, n03, n04, n05, n06, n07, n08]
  exercises: [from existing u0l3, with new intro framing the root explicitly]

u_rw3l1 — "Dual and Plural People"
  intro: Add te- (dual) and -kwé:kon (plural) from Unit 2 to the person root paradigm.
  vocabIds: [nd01, nd03, nd07, np03, np07]
  exercises: [from existing u0l4]

u_rw3l2 — "Female Kinship Roots"
  vocabIds: [k01, k04, k05, k07, k09]
  exercises: [from existing u1l0]

u_rw3l3 — "Male Kinship Roots"
  vocabIds: [k02, k03, k06, k08, k10]
  exercises: [from existing u1l1]

u_rw3l4 — "Extended Family and the Matrilineal System"
  vocabIds: [kin02, kin03, kin04, k17, k18, ex09, k01, k04, le04, cl01, cl02, cl03]
  exercises: [from existing u1l3, u1l5]

u_rw3l5 — "Asking About Family"
  vocabIds: [par10, par11, par12, k01, k02, k03, k04, q17]
  exercises: [from existing u1l6]
```

---

### Unit 4 — The Thanksgiving Address: Language in Its Deepest Form
*Replaces: existing Unit 5 (Thanksgiving Address), moved earlier*

**Rationale:** The Ohén:ton Karihwatéhkwen is not advanced material. It is the opening of every gathering, ceremony, and meeting in Kanien'kehá:ka life. Chew, Leonard & Rosenblum (2023) argue that ceremony should be the primary context for vocabulary — not a supplement. Moving it to Unit 4 places it where immersion programs place it: in the first month, before grammar is fully formed, because meaning comes before grammatical precision.

**Key vocab:** ta01–ta04, na02, o05, env15, na11, fo05, fo04, fo06, wa01, wa02, wa03, le17, pl02, na01, ex13, le05, ph07

**Lesson plan:** Carry over all lessons from existing Unit 5 (u4l_welcome through u4l6) with no content changes. Only the unit number changes.

---

## Stage 2: Paradigm Expansion — All Persons, All Stems, Aspect

### Unit 5 — A-Stem Verbs: Full Singular Paradigm
*Replaces: existing Unit 3 Lesson u2l1 (A-stem Verbs) + existing Unit 10 Lessons u9l1–u9l3*

**Core concept:** Expand the k-/s- prefix system to all five singular persons across A-stem verbs. Introduce the habitual suffix (-s) and its interaction with stems. This is the "engine lesson" — once a learner controls this paradigm, they can generate hundreds of inflected forms.

**Key roots:** v01 (sit), v03 (run), v05 (listen), av05 (eat), av06 (walk), av07 (sleep)

**Lesson plan:**

```
u_rw5l0 — "All Five Persons: Singular Paradigm"
  intro: Expand from k-/s- to all five singular prefixes.
         Present as a table: I / you / he / she-formal / she-familiar
         for a single verb (v01 á:tien). Show the whole table at once (Nation, 2001: paradigm learning).
  vocabIds: [v01, p01, p02, p03, p04, p05]
  exercises: [paradigm table fill, match, type, audio]

u_rw5l1 — "The Habitual: What -s Does"
  intro: The habitual suffix -s marks ongoing or repeated actions.
         "I sit habitually" vs "sit!" (command). Most dictionary forms omit -s.
  vocabIds: [v01, v03, v05]
  exercises: [from existing u9l2, reframed as prefix+root+suffix paradigm]

u_rw5l2 — "Daily Action Roots: Eat, Walk, Sleep"
  intro: Three of the highest-frequency daily A-stem roots.
         Conjugate each across all five singular persons.
  vocabIds: [av05, av06, av07]
  exercises: [from existing u12l3–u12l6b, extracted verb exercises only]

u_rw5l3 — "Commands: The Bare Root"
  intro: Commands use the bare root (or a slightly modified stem).
         The command IS the root. No prefix. Show for all A-stem verbs introduced so far.
  vocabIds: [v01, v03, v05, av05, av06, av07]
  exercises: [from existing u9l4]

u_rw5l4 — "Putting It Together: A-Stem Mini Paradigm Review"
  vocabIds: [v01, v03, v05, av05, av06]
  exercises: [from existing u9l_review]
```

---

### Unit 6 — Noun Incorporation: Objects Enter the Verb
*Replaces: existing Unit 3 Lessons u2l0 (A-class nouns), u2l3 (O-class), u2l4 (Ka-class)*

**Core concept:** Kanien'kéha frequently incorporates nouns directly into the verb. Instead of "I eat the corn" (separate noun), the verb becomes "I corn-eat." Noun incorporation is not an advanced feature — it is a fundamental structure that beginners encounter in the first conversations. Teach the three major noun classes (A, O, Ka) as things that enter verb structures, not as stand-alone lists.

**Key vocab:** a01–a08, o01–o08, ka01–ka06

**Lesson plan:**

```
u_rw6l0 — "A-Class Nouns: Clothing and Personal Objects"
  intro: A-class nouns (áhta' = shoe, etc.) are those most commonly worn or carried.
         Show incorporation: not "I put on the shoe" but the shoe-root enters the verb.
  vocabIds: [a01, a02, a03, a04, a05, a06, a07, a08]
  exercises: [from existing u2l0, with incorporation note added to intro]

u_rw6l1 — "Possessed Nouns: My and Your"
  vocabIds: [a01, a02, o05, ka02, ho01, ho02]
  exercises: [from existing u2l6]

u_rw6l2 — "O-Class Nouns: Nature and Round Objects"
  vocabIds: [o01, o02, o03, o04, o05, o06, o07, o08]
  exercises: [from existing u2l3]

u_rw6l3 — "Ka-Class Nouns: Tools and Community Objects"
  vocabIds: [ka01, ka02, ka03, ka04, ka05, ka06]
  exercises: [from existing u2l4]

u_rw6l4 — "Questions About Nouns"
  vocabIds: [par11, par12, a01, o05, ka01, ka02, q06]
  exercises: [from existing u2l7]
```

---

### Unit 7 — Consonant-Stem, I-Stem, and E-Stem Verbs
*Replaces: existing Unit 8 Lessons u7l1–u7l4 (Verb Stems)*

**Core concept:** A-stems are the majority, but C-stems, I-stems, E-stems (true and fake), and O-stems each have different prefix behavior. Teach each stem class through a small set of high-frequency roots, emphasizing what changes and what stays the same from the A-stem paradigm.

**Key vocab:** cv01–cv05, iv01–iv03, ev01–ev04, fe01–fe16 (selected), ov01–ov04

**Lesson plan:**

```
u_rw7l0 — "Consonant-Stem Verbs"
  intro: When the root begins with a consonant, the first-person prefix may double or change.
         Show the pattern through cv01 (kwe'tarón:ko, to cut).
  vocabIds: [cv01, cv02, cv03, cv04, cv05]
  exercises: [from existing u7l1]

u_rw7l1 — "I-Stem and True E-Stem Verbs"
  vocabIds: [iv01, iv02, iv03, ev01, ev02, ev03, ev04]
  exercises: [from existing u7l2]

u_rw7l2 — "O-Stem Verbs"
  vocabIds: [ov01, ov02, ov03, ov04]
  exercises: [from existing u7l3]

u_rw7l3 — "Fake E-Stem Verbs"
  intro: The root begins with e but the conjugation pattern differs from true E-stems.
         fe01 (to make) is the highest-frequency fake E-stem — it appears everywhere.
  vocabIds: [fe01, fe02, fe09, fe16, fe15, fe04, fe14, fe07]
  exercises: [from existing u7l4]

u_rw7l4 — "Negation Across All Verb Classes"
  vocabIds: [g06, v01, v03, cv01, ov01, ov03, fe01, fe16, iv03]
  exercises: [from existing u7l7]

u_rw7l5 — "Stative Verbs: Describing States"
  intro: Stative verbs describe conditions, not actions. They use different prefix sets.
         Introduce the most common stative roots (st01–st07).
  vocabIds: [st01, st02, st03, st04, st05, st06, st07]
  exercises: [new; draw on stative vocab from u22l6, u25l0, u10l4]
```

---

### Unit 8 — The Verb in Time: Aspect and Tense
*Replaces: existing Unit 19 (Tense, Aspect & Mood)*

**Core concept:** Kanien'kéha locates actions in time primarily through aspect (completed/ongoing/habitual) rather than tense. The completed aspect marker changes the verb significantly; the future is expressed through a particle + verb form. Teach through the roots already known (v01, av05, fe01).

**Lesson plan:** Carry over all lessons from existing Unit 19 (u18l0–u18l5) with no content changes. Only the unit number changes. Cross-reference to the verb roots introduced in Units 5–7.

---

### Unit 9 — Dual and Plural Verb Paradigms
*Replaces: existing Unit 9 Lesson u8l2 (Dual & Plural Commands) + portions of Unit 10*

**Core concept:** Expand the A-stem paradigm from singular to dual and plural. The te- prefix for duality (introduced in Unit 2 as a pronoun marker) now appears in verb conjugation. The learner recognizes it as the same morpheme.

**Lesson plan:**

```
u_rw9l0 — "Dual Commands and Verb Forms"
  vocabIds: [dc01, dc02, dc03, dc04, dc05, dc06]
  exercises: [from existing u8l2]

u_rw9l1 — "Full Paradigm: All Persons, All Numbers"
  intro: Bring together singular (Unit 5), dual, and plural conjugation into a complete table.
         Use v01 (sit) as the model. This is the full paradigm — memorize the shape, not each form.
  vocabIds: [v01, v03, p01, p02, p03, p04, p05, p06, p07, p08, p09, p10, p11, p12, p13]
  exercises: [from existing u9l3, expanded]
```

---

### Unit 10 — Direction Verbs and Location
*Replaces: existing Unit 2 Lessons u1l2, u1l7 and Unit 24 (Spatial Language)*

**Core concept:** Direction verbs (go, come, come back, go away) are among the first verbs children acquire in immersion programs because they describe movement through space — a constant feature of daily life. Introduce them as their own small paradigm, then connect to locative particles.

**Key vocab:** dv01–dv04, ds01–ds07, na04, env08–env09, pl01–pl03, loc01, loc04, loc05, loc07

**Lesson plan:**

```
u_rw10l0 — "Direction Verbs: Going and Coming"
  vocabIds: [dv01, dv02, dv03, dv04, k09, k10]
  exercises: [from existing u1l2]

u_rw10l1 — "Direction Vocabulary Extended"
  vocabIds: [dv01, dv02, dv03, dv04, ds05, ds06, ds07, ar02]
  exercises: [from existing u1l7]

u_rw10l2 — "Locative Expressions: Where Things Are"
  vocabIds: [na02, na04, na05, na11, env13, env08, env09, pl01, pl03]
  exercises: [from existing u23l0]

u_rw10l3 — "Direction Verbs Extended + Place Names"
  vocabIds: [dv01, dv02, dv03, dv04, na04, cu01, loc07, pl01, pl03]
  exercises: [from existing u23l1]

u_rw10l4 — "Land Features and Place Names"
  vocabIds: [na04, na05, env08, env09, env10, env11, na02, na03, pl01]
  exercises: [from existing u23l2]

u_rw10l5 — "Moving Through the Territory"
  vocabIds: [dv01, dv02, dv03, na04, env09, na05, loc07, pl01, pl03]
  exercises: [from existing u23l3b]

u_rw10l6 — "Kanehsatà:ke: Our Place on the Land"
  vocabIds: [pl01, pl02, pl03]
  exercises: [from existing u2l5]
```

---

## Stage 3: Relational and Transitive

### Unit 11 — Articles, Greetings, Particles, and Conversation
*Replaces: existing Unit 3 Lesson u2l2 and Unit 9 Lessons u8l4, u8l7*

**Core concept:** Discourse particles, greetings, and conversational phrases are taught here — not at the beginning — because they make more sense once the learner has a verb system. Shé:kon means more when you can follow it with a verb.

**Key vocab:** ar01, ar02, g01–g06, ph01–ph08, par30, par31

**Lesson plan:**

```
u_rw11l0 — "Articles and Greetings"
  vocabIds: [ar01, ar02, g01, g02, g03, g04, g05, g06]
  exercises: [from existing u2l2]

u_rw11l1 — "Everyday Conversation Phrases"
  vocabIds: [ph01, ph02, ph03, ph04, ph05, ph06, ph07, ph08]
  exercises: [from existing u8l4]

u_rw11l2 — "Real Conversation"
  vocabIds: [ph01, ph02, gr03, dv01, dv02, g01, g02, ph07, par30, par31]
  exercises: [from existing u8l7]
```

---

### Unit 12 — The Active/Stative Distinction
*Replaces: existing Unit 10 Lesson u9l1 (Active vs Stative)*

**Core concept:** This distinction is fundamental to Kanien'kéha verb morphology and deserves its own unit now that learners know multiple verb classes. Active verbs describe actions; stative verbs describe conditions. Different prefix sets apply. The learner already knows some stative verbs from Unit 7 — this unit names the pattern explicitly.

**Lesson plan:** Carry over existing Unit 10 Lessons u9l1 and u9l_review. Add cross-references to stative vocab introduced in Unit 7.

---

### Unit 13 — Possessive Prefixes and Relational Nouns
*Replaces: existing Unit 8 Lesson u7l6 (Possessive Prefixes)*

**Core concept:** Possessive prefixes (my, your, his, her) on nouns — different from the verb subject prefixes. Teach through kinship terms (which always take possessive prefixes in natural speech) and household vocabulary.

**Key vocab:** a01, a02, ho01, ka02, k01, k02, p01, p02 + kinship terms

**Lesson plan:** Carry over existing u7l6. Add kinship forms table for selected entries (k01 mother → my mother, your mother, his mother, her mother).

---

### Unit 14 — Relational Prefixes: Speaking About Others
*Replaces: existing Unit 11 (Verb System II: Relational Prefixes)*

**Core concept:** Relational prefixes encode the relationship between subject and object inside the verb. "He sees her" and "she sees him" use different relational prefix sets. This is the core of Kanien'kéha transitive morphology.

**Lesson plan:** Carry over all lessons from existing Unit 11 (u10l1–u10l_review) with no content changes.

---

### Unit 15 — Transitive Verbs and Object Agreement
*Replaces: existing Unit 18 (Transitive Verbs & Object Agreement)*

**Lesson plan:** Carry over all lessons from existing Unit 18 (u17l0–u17l5) with no content changes. Unit 14 (relational prefixes) serves as direct prerequisite.

---

### Unit 16 — Building Sentences
*Replaces: existing Unit 20 (Putting It Together: Simple Sentences)*

**Core concept:** Sentence-level assembly. Kanien'kéha word order is flexible, but information structure (what is focused, what is given) determines emphasis. Teach through contexts already familiar from earlier units.

**Lesson plan:** Carry over all lessons from existing Unit 20 (u19l0–u19l_review) with no content changes.

---

### Unit 17 — Complex Sentences and Subordination
*Replaces: existing Unit 21 (Sentences & Clauses II: Complex Sentences)*

**Lesson plan:** Carry over all lessons from existing Unit 21 (u20l0–u20l3) with no content changes.

---

### Unit 18 — Grammar in Action: Full Verb System Integration
*Replaces: existing Unit 22 (Grammar in Action)*

**Lesson plan:** Carry over all lessons from existing Unit 22 (u21l0–u21l4) with no content changes.

---

## Stage 4: Cultural Depth

The following units carry over from the existing curriculum with minimal structural change. Their position in Stage 4 reflects the principle that cultural and ceremonial content is not "advanced" in difficulty — it is advanced in the sense of being richly contextualized, requiring the verb system from Stages 1–3 to be fully productive.

### Unit 19 — Telling Your Story: Introductions and Identity
*Existing Unit 12 (u11l0–u11l_review) — carry over unchanged*

### Unit 20 — The Body in Motion: Daily Routine
*Existing Unit 13 (u12l0–u12l_review) — carry over unchanged*
Note: Verb exercises in this unit should cross-reference the A-stem paradigm from Unit 5.

### Unit 21 — Colours, Shapes, and Descriptions
*Existing Units 4 (Colours, Body, Numbers) and 23 (Describing Things) — merge into one unit*

```
u_rw21l0 — Colours (from u3l0, u3l3)
u_rw21l1 — Body Parts (from u3l1, u3l4)
u_rw21l2 — Shapes (from u5l0, u5l7)
u_rw21l3 — Stative Descriptions: Good, Bad, Beautiful (from u22l3)
u_rw21l4 — Texture, Taste, Smell (from u22l4, u22l4b)
u_rw21l5 — Describing Animals and People (from u22l5, u22l6)
u_rw21l6 — Intensifiers and Negating Descriptions (from u22l7, u22l8)
```

### Unit 22 — The Natural World: Weather, Sky, and Seasons
*Existing Unit 14 (u13l0–u13l_review) — carry over unchanged*

### Unit 23 — Numbers, Time, and the Calendar
*Merge existing Units 4 (Numbers 1–10), 9 (Numbers to 100), and 17 (Numbers in Depth)*

```
u_rw23l0 — Numbers 1–10 (from u3l2, u3l5)
u_rw23l1 — Numbers to 100 (from u8l3, u8l8)
u_rw23l2 — Numbers 1–100 Consolidated (from u16l0)
u_rw23l3 — Counting People and Ordinals (from u16l1, u16l2)
u_rw23l4 — Telling Time: Hours (from u16l3)
u_rw23l5 — Days of the Week (from u16l4)
u_rw23l6 — Months: Traditional Moon Names (from u16l5)
u_rw23l7 — Age and Time Elapsed (from u16l7)
u_rw23l8 — A Full Time Conversation (from u16l8)
u_rw23l9 — Numbers in Ceremony (from u16l6)
```

### Unit 24 — Animals, Clans, and Birds
*Merge existing Unit 6 (Animals, Shapes, Clans) minus Shapes → Unit 21, and Unit 9 (Fish and Birds)*

```
u_rw24l0 — Wild Animals (from u5l1, u5l4)
u_rw24l1 — Domestic Animals (from u5l2)
u_rw24l2 — Fish of the Waters (from u8l0, u8l5)
u_rw24l3 — Birds of the Sky (from u8l1, u8l6)
u_rw24l4 — Birds as Clan Symbols (from u5l5)
u_rw24l5 — The Clan System (from u5l3, u5l6)
```

### Unit 25 — Food, the Three Sisters, and Agriculture
*Merge existing Units 7 (Food, Land) and 27 (Agriculture, Three Sisters)*

```
u_rw25l0 — Fruits and Traditional Foods (from u6l0)
u_rw25l1 — Foods of the Home (from u6l1)
u_rw25l2 — Food and Community (from u6l6)
u_rw25l3 — The Three Sisters: Companions in the Garden (from u26l0)
u_rw25l4 — Planting, Growing, Harvesting (from u26l1)
u_rw25l5 — Corn Soup and Daily Food (from u26l2b)
u_rw25l6 — Sacred Medicines and Plants (from u6l8)
```

### Unit 26 — Making and Building: Crafts and Trades
*Existing Unit 15 (u14l0–u14l9) — carry over unchanged*

### Unit 27 — Community Life: Governance, Ceremony, and Gathering
*Existing Unit 16 (u15l0–u15l_review) — carry over unchanged*

### Unit 28 — Health and the Body in Depth
*Existing Unit 26 (u25l0–u25l3) — carry over unchanged*

### Unit 29 — Technology and the Modern World
*Existing Unit 25 (u24l0–u24l3) — carry over unchanged*

### Unit 30 — Oral Tradition: Stories, Legends, and the Spoken Word
*Existing Unit 28 (u27l0–u27l3b) — carry over unchanged*

### Unit 31 — Ceremony in Language: Singing, Prayer, and Ritual Speech
*Existing Unit 29 (u28l0–u28l3) — carry over unchanged*

### Unit 32 — Reading and Writing Kanien'kéha
*Existing Unit 30 (u29l0–u29l_review) — carry over unchanged*
Note: Consider moving individual phonology lessons from this unit into Unit 1 as optional reference material that unlocks alongside the corresponding roots.

---

## Summary: Old unit → new unit mapping table

| Old unit # | Old title | New unit # | Status |
|---|---|---|---|
| Unit 1 (id:0) | Who We Are: Pronouns & People | Units 1–3 | Reorganized by root logic |
| Unit 2 (id:1) | Family, Kinship & Movement | Units 3, 10 | Split; kinship → U3, direction → U10 |
| Unit 3 (id:2) | Objects, Verbs & Everyday Language | Units 5, 6, 11 | Verbs → U5; nouns → U6; greetings → U11 |
| Unit 4 (id:3) | Colours, Body & Numbers | Units 21, 23 | Colours/shapes → U21; numbers → U23 |
| Unit 5 (id:4) | The Thanksgiving Address | Unit 4 | Moved earlier |
| Unit 6 (id:5) | Animals, Shapes & Clans | Units 21, 24 | Shapes → U21; animals/clans → U24 |
| Unit 7 (id:6) | Food, Land & Ceremony | Units 25, 27 | Food/agriculture → U25; community → U27 |
| Unit 8 (id:7) | Tools, Verb Stems & More Grammar | Units 7, 13 | Verb stems → U7; possessives → U13 |
| Unit 9 (id:8) | Fish, Birds, Numbers & Conversation | Units 11, 23, 24 | Conversation → U11; numbers → U23; birds/fish → U24 |
| Unit 10 (id:9) | The Verb System I | Units 5, 12 | Paradigms → U5; active/stative → U12 |
| Unit 11 (id:10) | The Verb System II: Relational Prefixes | Unit 14 | Carry over |
| Unit 12 (id:11) | Telling Your Story | Unit 19 | Carry over |
| Unit 13 (id:12) | The Body in Motion: Daily Routine | Unit 20 | Carry over |
| Unit 14 (id:13) | The Natural World: Weather, Sky, Seasons | Unit 22 | Carry over |
| Unit 15 (id:14) | Making & Building | Unit 26 | Carry over |
| Unit 16 (id:15) | Community Life | Unit 27 | Carry over |
| Unit 17 (id:16) | Numbers in Depth | Unit 23 | Merged into U23 |
| Unit 18 (id:17) | Transitive Verbs & Object Agreement | Unit 15 | Carry over |
| Unit 19 (id:18) | Tense, Aspect & Mood | Unit 8 | Moved earlier (after verb stems) |
| Unit 20 (id:19) | Putting It Together: Simple Sentences | Unit 16 | Carry over |
| Unit 21 (id:20) | Complex Sentences | Unit 17 | Carry over |
| Unit 22 (id:21) | Grammar in Action | Unit 18 | Carry over |
| Unit 23 (id:22) | Describing Things | Unit 21 | Merged with colours/shapes |
| Unit 24 (id:23) | Spatial Language | Unit 10 | Merged into direction verb unit |
| Unit 25 (id:24) | Technology & the Modern World | Unit 29 | Carry over |
| Unit 26 (id:25) | Health & the Body in Depth | Unit 28 | Carry over |
| Unit 27 (id:26) | Agriculture & the Three Sisters | Unit 25 | Merged with food |
| Unit 28 (id:27) | Oral Tradition | Unit 30 | Carry over |
| Unit 29 (id:28) | Ceremony in Language | Unit 31 | Carry over |
| Unit 30 (id:29) | Reading and Writing | Unit 32 | Carry over |
| Unit TEST (id:100) | Dialogue Exercises | Unit TEST | Carry over unchanged |
| *(new)* | The Root Is the Word | Unit 1 | New content — see spec above |

---

## Implementation notes for Claude

When generating lessons for Units 1–4 (the new content):

1. **Read `data_glossary.json` first** and retrieve the full entry for each vocabId before writing exercises. Do not invent target forms; use `target` from the glossary entry.
2. **Check `data_variants.json`** for every vocabId in the lesson. If a variant exists, add a dialect note to the lesson `intro` and ensure the `alts[]` in type exercises includes the variant form.
3. **Every lesson must have at least one `story` exercise** and at least one reflective `mc` exercise that asks the learner to notice a structural pattern (per LaFever Emotional/Spiritual requirement).
4. **Use the `ped` field** to cite the scholarly framework that justifies the lesson's sequencing decision (Mithun for morphological architecture; Nation for paradigm tables; Freire for identity-first sequencing; Krashen for comprehensible input ordering).
5. **For `audio` exercise `hint` fields**, consult `data_syllabary.json` to identify the relevant vowel or consonant and quote the `t` (tooltip) field as the basis for the pronunciation note.
6. **Use `cm` (correct message) to reinforce the morphological pattern**, not just confirm the answer. Example: "Tho niioht! k- marks first person singular. This same k- appears in every A-stem verb you will learn."
7. **Unit 1 is entirely new content** — no existing lessons in `data_units.json` correspond to it. Write all four lessons from scratch using the specs above.
8. **For carry-over units** (Units 8, 12, 14–20, 22, 26–32): copy the existing lesson array from `data_units.json`, update only the `id` (unit number) field, and add a brief `ped` note to each lesson's `intro` if none exists.

---

*End of curriculum reorganization plan.*
*Version: draft 1 — for review by learning designer before Claude implementation.*

---

# Appendix A: Detailed Lesson Specifications — Units 1–4 (New Content)

This appendix provides complete, field-level specs for every lesson in Units 1–4. These are the only units that require entirely new content generation; Units 5–32 re-use existing lesson arrays from `data_units.json` with unit-number updates only (per the mapping table above).

Each lesson spec below is formatted so a future Claude session can generate a conforming `data_units.json` entry directly. Fields follow the schema established in the existing data:

```
id          string   lesson ID — format: u_rwNlM (N = unit, M = lesson index)
title       string   display title
icon        emoji    single emoji
sub         string   subtitle (one phrase)
intro       array    2–4 HTML strings shown before exercises
ped         string   HTML string — scholarly rationale, shown to designers not learners
vocabIds    array    glossary IDs; all must exist in data_glossary.json
exercises   array    ordered exercise objects
```

Exercise field reference (from README.md):

```
mc:     type, wid, prompt, sub, correct, options[], cm, wm
match:  type, wid(null), prompt, sub, pairs[{target, english, wids[]}], cm, wm
fill:   type, wid, prompt, sentence (with ___), correct, hint, alts[], cm, wm
type:   type, wid, prompt, sub, correct, alts[], cm, wm
audio:  type, wid, prompt, sub, word, meaning, hint
story:  type, wid, prompt, sub, word, meaning, storyPrompt
```

All `cm` (correct message) and `wm` (wrong message) fields must be in Kanien'kéha + English.
Accepted wrong-message opener: "That answer is incorrect — please try again."
Accepted correct-message openers (rotate): Tho niioht!, Niawenhkó:wa!, Io'nikonhraién:ta'ne!, Shé:kon!

---

## Unit 1 — The Root Is the Word

**Unit-level metadata:**
```
id:    1  (array index 0 in data_units.json if rebuilding from scratch; or append as new)
title: "Unit 1 — The Root Is the Word"
desc:  "Three high-frequency A-stem verb roots. The prefix body. First and second person singular."
```

---

### Lesson u_rw1l0 — "The Root and the Prefix"

```json
{
  "id": "u_rw1l0",
  "title": "The Root and the Prefix",
  "icon": "🌱",
  "sub": "Where every word begins",
  "intro": [
    "Kanien'kéha words grow from <strong>roots</strong>. The root carries the meaning; a <strong>prefix</strong> fused to the front tells you who is doing it. There is no separate word for 'I' or 'you' — those meanings live <em>inside</em> the verb.",
    "English says: <em>I sit.</em> Two words. Kanien'kéha says: <strong>ká:tiens</strong>. One word. The <strong>k-</strong> prefix is 'I'; the root <strong>-á:tien-</strong> is 'sit'; the <strong>-s</strong> suffix marks a habitual or ongoing action. Everything in one word.",
    "This lesson introduces two roots: <strong>-á:tien-</strong> (sit) and <strong>-aráhtat-</strong> (run), and two prefixes: <strong>k-</strong> (I) and <strong>s-</strong> (you, singular). These four pieces will generate dozens of forms across the course.",
    "Dialect note: in Akwesasne, <strong>r</strong> becomes <strong>l</strong>. In Six Nations/Tyendinaga, some vowels differ. All community forms are accepted as correct throughout this app."
  ],
  "ped": "<strong>Morphology-first sequencing:</strong> Mithun (1982, 1989) demonstrates that polysynthetic language learners benefit most from understanding the architectural logic of the prefix system before acquiring large vocabulary. Beginning with two roots and two prefixes — rather than a vocabulary list — allows the learner to grasp the generative principle immediately. Nation (2001) supports paradigm-table exposure at the earliest stage.",
  "vocabIds": ["v01", "v03"],
  "exercises": [
    {
      "type": "mc",
      "wid": "v01",
      "prompt": "What does the root -á:tien- mean?",
      "sub": "Choose the correct answer",
      "correct": "to sit",
      "options": ["to sit", "to run", "to listen", "to eat"],
      "cm": "Tho niioht! -á:tien- means 'to sit'. The root carries the core meaning — the prefix will tell us who is sitting.",
      "wm": "That answer is incorrect — please try again. The root -á:tien- is one of the most common in daily Kanien'kéha."
    },
    {
      "type": "mc",
      "wid": "v01",
      "prompt": "ká:tiens means 'I sit (habitually)'. What does the k- prefix tell you?",
      "sub": "Think about what prefix means",
      "correct": "k- marks the first person — I / me",
      "options": [
        "k- marks the first person — I / me",
        "k- marks you (singular)",
        "k- marks the plural",
        "k- is part of the root"
      ],
      "cm": "Niawenhkó:wa! k- is the first-person singular subject prefix. It appears on every A-stem verb when 'I' am doing the action.",
      "wm": "That answer is incorrect — please try again. k- is not part of the root -á:tien-. Try removing it: what's left?"
    },
    {
      "type": "fill",
      "wid": "v01",
      "prompt": "Complete the verb: 'I sit (habitual)'",
      "sentence": "___á:tiens",
      "correct": "k",
      "hint": "k",
      "alts": ["k"],
      "cm": "Tho niioht! ká:tiens — I sit. k- (I) + á:tien (root) + -s (habitual). One word, three meaningful pieces.",
      "wm": "That answer is incorrect — the first-person singular prefix for A-stem verbs is k-."
    },
    {
      "type": "mc",
      "wid": "v03",
      "prompt": "What is unusual about the root -aráhtat- (to run)?",
      "sub": "Look closely at the command form: tesaráhtat",
      "correct": "It always requires the te- prefix — running is inherently dualic (a two-phase motion: stop, then go)",
      "options": [
        "It always requires the te- prefix — running is inherently dualic (a two-phase motion: stop, then go)",
        "It has no prefix",
        "It is the same as -á:tien-",
        "It cannot be used in the first person"
      ],
      "cm": "Io'nikonhraién:ta'ne! te- is the dualic prefix. -aráhtat- is a dualic verb — the te- prefix is part of every form. You will see te- again in dual pronouns (teseniiáhshe) and dual commands. It is the same morpheme each time.",
      "wm": "That answer is incorrect — look at the command form tesaráhtat. The te- prefix is always there."
    },
    {
      "type": "match",
      "wid": null,
      "prompt": "Match each form to its meaning",
      "sub": "Tap a form, then its meaning",
      "pairs": [
        { "target": "á:tien", "english": "sit (root / bare form)", "wids": ["v01"] },
        { "target": "ká:tiens", "english": "I sit (habitual)", "wids": ["v01"] },
        { "target": "sá:tien", "english": "you sit (command)", "wids": ["v01"] },
        { "target": "tekaráhtats", "english": "I run (habitual)", "wids": ["v03"] }
      ],
      "cm": "Shé:kon! k- = I, s- = you (command), te- = dualic marker on run. These four pieces recur across every verb you will learn.",
      "wm": "That answer is incorrect — please try again. Look for the prefix first, then find the root."
    },
    {
      "type": "fill",
      "wid": "v03",
      "prompt": "Complete 'you run (command)'",
      "sentence": "te___aráhtat",
      "correct": "s",
      "hint": "s",
      "alts": ["s"],
      "cm": "Niawenhkó:wa! tesaráhtat — you run. te- (dualic, always on this root) + s- (you) + aráhtat (root).",
      "wm": "That answer is incorrect — the second-person singular command prefix is s-. The te- is already there because running always takes it."
    },
    {
      "type": "type",
      "wid": "v01",
      "prompt": "How do you say 'you sit' (command)?",
      "sub": "Type the full form",
      "correct": "sá:tien",
      "alts": ["sa:tien", "satien"],
      "cm": "Tho niioht! sá:tien — you sit. s- (you) + á:tien (root). No -s suffix on commands.",
      "wm": "That answer is incorrect — try again. Command form: s- + á:tien. Don't add -s (that's the habitual)."
    },
    {
      "type": "audio",
      "wid": "v01",
      "prompt": "Say this word aloud",
      "sub": "Record yourself, listen back, and self-assess",
      "word": "á:tien",
      "meaning": "sit (root form)",
      "hint": "Two syllables: Á:-tien. The colon marks a long vowel — hold the á: slightly longer than a short vowel. The acute accent (á) marks stress: louder and higher in pitch. The 't' is unaspirated — no puff of air, like the t in 'stop' not 'top'."
    },
    {
      "type": "mc",
      "wid": "v01",
      "prompt": "In Kanien'kéha, 'I sit' is one word: ká:tiens. In English it is two words: 'I sit'. What does this tell you about the two languages?",
      "sub": "A reflection on language architecture",
      "correct": "Kanien'kéha fuses the speaker into the verb — the person is grammatically inseparable from the action",
      "options": [
        "Kanien'kéha fuses the speaker into the verb — the person is grammatically inseparable from the action",
        "Kanien'kéha is a simpler language than English",
        "Kanien'kéha and English have the same grammar, just different words",
        "The k- prefix is an optional decoration"
      ],
      "cm": "Io'nikonhraién:ta'ne! As Mithun (1989) observes, in a polysynthetic language like Kanien'kéha, the verb is the sentence. The speaker and the action are one grammatical unit — a very different way of organising experience than English.",
      "wm": "That answer is incorrect — please try again."
    },
    {
      "type": "story",
      "wid": "v01",
      "prompt": "Connect to your life",
      "sub": "A moment of reflection",
      "word": "á:tien",
      "meaning": "to sit",
      "storyPrompt": "The first thing Brian Maracle teaches new speakers at Tsi Tyónnheht Onkwawén:na is: 'I sit here and I listen.' ká:tiens — I sit. Sitting and listening is how language transmission begins. Where do you sit to learn? Who do you sit with?"
    }
  ]
}
```

---

### Lesson u_rw1l1 — "A Third Root: Listening"

```json
{
  "id": "u_rw1l1",
  "title": "A Third Root: Listening",
  "icon": "👂",
  "sub": "The at- infix and what it signals",
  "intro": [
    "The third root is <strong>-atkáhthon-</strong> (to listen). It contains an <strong>at-</strong> infix — a piece that sits inside the root and signals <em>middle voice</em>: an action directed at or involving oneself.",
    "The <strong>at-</strong> infix appears in many body-related and reflexive verbs throughout Kanien'kéha. Noticing it now, in the very first lesson where it appears, means you will recognise it every time you encounter it later.",
    "You now have three roots: <strong>-á:tien-</strong> (sit), <strong>-aráhtat-</strong> (run), <strong>-atkáhthon-</strong> (listen). All three are A-stem verbs — they take the same k-/s- prefixes."
  ],
  "ped": "<strong>Infix awareness:</strong> Nation (2001) recommends drawing learners' attention to recurring morphemes even when they are not the main teaching target. The at- middle-voice infix recurs in av02 (to wash), av03 (to groom), av07 (to sleep), and dozens of other entries in data_glossary.json. A single explicit mention at first encounter significantly improves later recognition (Mithun 1989).",
  "vocabIds": ["v05"],
  "exercises": [
    {
      "type": "mc",
      "wid": "v05",
      "prompt": "What does -atkáhthon- mean?",
      "sub": "",
      "correct": "to listen",
      "options": ["to listen", "to sit", "to run", "to speak"],
      "cm": "Tho niioht! -atkáhthon- means 'to listen'. Notice the at- infix inside the root — this marks middle voice, common in body-related verbs.",
      "wm": "That answer is incorrect — please try again. The root is -atkáhthon-."
    },
    {
      "type": "mc",
      "wid": "v05",
      "prompt": "The root -atkáhthon- contains an at- infix. What does this infix signal?",
      "sub": "This infix will appear in many other verbs",
      "correct": "Middle voice — an action involving or directed at oneself (body-related, reflexive)",
      "options": [
        "Middle voice — an action involving or directed at oneself (body-related, reflexive)",
        "Past tense",
        "Dualic action (like te- in run)",
        "Negation"
      ],
      "cm": "Niawenhkó:wa! at- marks middle voice. You will see it in 'to wash' (atye'tarón:ko), 'to dress' (atkén:ons), 'to sleep' (anón:we uses a related form). Recognising at- now means every later verb that contains it is already partially familiar.",
      "wm": "That answer is incorrect — please try again. The at- infix is not a tense or number marker."
    },
    {
      "type": "fill",
      "wid": "v05",
      "prompt": "Complete 'I listen (habitual)'",
      "sentence": "___atkáhthons",
      "correct": "k",
      "hint": "k",
      "alts": ["k"],
      "cm": "Tho niioht! katkáhthons — I listen. k- (I) + atkáhthon (root) + -s (habitual). Same prefix as ká:tiens.",
      "wm": "That answer is incorrect — the first-person singular prefix is k-, the same as with á:tien."
    },
    {
      "type": "match",
      "wid": null,
      "prompt": "Match each form to its meaning",
      "sub": "",
      "pairs": [
        { "target": "atkáhthon", "english": "listen (root / bare form)", "wids": ["v05"] },
        { "target": "katkáhthons", "english": "I listen (habitual)", "wids": ["v05"] },
        { "target": "satkáhthons", "english": "you listen (habitual)", "wids": ["v05"] }
      ],
      "cm": "Shé:kon! k- = I, s- = you. The root -atkáhthon- stays the same; only the prefix changes.",
      "wm": "That answer is incorrect — please try again."
    },
    {
      "type": "type",
      "wid": "v05",
      "prompt": "How do you say 'you listen (habitual)'?",
      "sub": "Include the habitual -s suffix",
      "correct": "satkáhthons",
      "alts": ["satkahthons", "satkáhthon"],
      "cm": "Niawenhkó:wa! satkáhthons — you listen. s- (you) + atkáhthon (root) + -s (habitual).",
      "wm": "That answer is incorrect — try again. s- + atkáhthon + -s."
    },
    {
      "type": "audio",
      "wid": "v05",
      "prompt": "Say this word aloud",
      "sub": "Record, listen back, and self-assess",
      "word": "atkáhthon",
      "meaning": "listen (root form)",
      "hint": "Three syllables: at-KÁH-thon. Stress on KÁH — louder and higher. The 'th' is not the English 'th' in 'the' — it is a plain t followed by h, two separate sounds: t + h. The final n is clear and unaspirated."
    },
    {
      "type": "story",
      "wid": "v05",
      "prompt": "Connect to your life",
      "sub": "",
      "word": "atkáhthon",
      "meaning": "to listen",
      "storyPrompt": "'I sit and I listen' — ká:tiens, katkáhthons. In Kanien'kehá:ka tradition, listening is not passive. It is a commitment. Elders begin gatherings by asking everyone to bring their minds together. Who do you listen to in your language journey? How does listening feel different from reading or typing?"
    }
  ]
}
```

---

### Lesson u_rw1l2 — "Root and Prefix Together: I and You"

```json
{
  "id": "u_rw1l2",
  "title": "Root and Prefix Together: I and You",
  "icon": "🔗",
  "sub": "k- and s- across all three roots",
  "intro": [
    "You now know three roots and two prefixes. This lesson practises all six combinations: k- (I) and s- (you) applied to <strong>-á:tien-</strong>, <strong>-aráhtat-</strong>, and <strong>-atkáhthon-</strong>.",
    "Notice what stays the same (the root) and what changes (the prefix). This is the pattern that runs through the entire language: <em>same root, different prefix, different meaning</em>.",
    "The habitual suffix <strong>-s</strong> marks repeated or ongoing actions. Commands do not take -s. Dualic -aráhtat- always takes te- in addition to the person prefix."
  ],
  "ped": "<strong>Pattern recognition over rote memorisation:</strong> Nation (2001) and Mithun (1989) both show that learners who grasp paradigm architecture early outperform those who memorise individual forms. This lesson is explicitly about the pattern, not individual words.",
  "vocabIds": ["v01", "v03", "v05"],
  "exercises": [
    {
      "type": "mc",
      "wid": "v01",
      "prompt": "Which of these is 'I sit (habitual)'?",
      "sub": "",
      "correct": "ká:tiens",
      "options": ["ká:tiens", "sá:tien", "katkáhthons", "tekaráhtats"],
      "cm": "Tho niioht! ká:tiens — k- (I) + á:tien (sit root) + -s (habitual).",
      "wm": "That answer is incorrect — look for the k- prefix on the sit root -á:tien-."
    },
    {
      "type": "match",
      "wid": null,
      "prompt": "Match each inflected form to its meaning",
      "sub": "Six combinations: two prefixes, three roots",
      "pairs": [
        { "target": "ká:tiens", "english": "I sit (habitual)", "wids": ["v01"] },
        { "target": "sá:tien", "english": "you sit (command)", "wids": ["v01"] },
        { "target": "tekaráhtats", "english": "I run (habitual)", "wids": ["v03"] },
        { "target": "satkáhthons", "english": "you listen (habitual)", "wids": ["v05"] }
      ],
      "cm": "Shé:kon! k- = I, s- = you. te- on run is always there. The root tells you the action.",
      "wm": "That answer is incorrect — please try again. Identify the prefix first, then the root."
    },
    {
      "type": "fill",
      "wid": "v03",
      "prompt": "Complete 'I run (habitual)'",
      "sentence": "te___aráhtats",
      "correct": "k",
      "hint": "k",
      "alts": ["k"],
      "cm": "Niawenhkó:wa! tekaráhtats — te- (always on run) + k- (I) + aráhtat (root) + -s (habitual).",
      "wm": "That answer is incorrect — I is k-. The te- is already written for you because run always takes it."
    },
    {
      "type": "type",
      "wid": "v05",
      "prompt": "How do you say 'I listen (habitual)'?",
      "sub": "",
      "correct": "katkáhthons",
      "alts": ["katkahthons"],
      "cm": "Tho niioht! katkáhthons — k- (I) + atkáhthon (root) + -s (habitual).",
      "wm": "That answer is incorrect — try: k- + atkáhthon + -s."
    },
    {
      "type": "mc",
      "wid": "v01",
      "prompt": "You know k- (I) and s- (you). The same two prefixes work on all three roots. What does this tell you about Kanien'kéha grammar?",
      "sub": "A structural insight",
      "correct": "Learning one prefix unlocks every verb — the system is consistent across the whole language",
      "options": [
        "Learning one prefix unlocks every verb — the system is consistent across the whole language",
        "Each verb has its own special prefix that must be memorised separately",
        "Prefixes are optional and can be dropped",
        "The prefix system only works for these three verbs"
      ],
      "cm": "Io'nikonhraién:ta'ne! This is the generative power Mithun (1989) describes. In a polysynthetic language, the prefix paradigm is the skeleton — once you know it, it holds up every new verb you learn.",
      "wm": "That answer is incorrect — please try again."
    },
    {
      "type": "story",
      "wid": "v03",
      "prompt": "Connect to your life",
      "sub": "",
      "word": "tekaráhtats",
      "meaning": "I run (habitual)",
      "storyPrompt": "tekaráhtats — I run. The te- prefix on 'run' encodes something about the nature of running itself: a two-phase motion, stopping and going. Some Kanien'kéha speakers describe language learning the same way — a rhythm of stopping to think, then moving forward. Where are you in that rhythm right now?"
    }
  ]
}
```

---

### Lesson u_rw1l3 — "Dialect Note: r/l and y/i"

```json
{
  "id": "u_rw1l3",
  "title": "Dialect Note: r/l and y/i",
  "icon": "🗺️",
  "sub": "Community variation is not error",
  "intro": [
    "Kanien'kéha is spoken across several communities — Kanehsatà:ke, Kahnawà:ke, Akwesasne, Six Nations (Ohsweken), Tyendinaga, and others. Each community has developed its own pronunciation patterns. These are <strong>not errors or dialects to rank</strong> — they are equally valid community forms.",
    "Two variations appear constantly in this course. First: in <strong>Akwesasne</strong>, the sound <strong>r</strong> is pronounced <strong>l</strong>. So <em>raónha</em> (he) becomes <em>laónha</em> in Akwesasne. Second: in <strong>Six Nations and Tyendinaga</strong>, the vowel <strong>i</strong> in some pronouns is pronounced <strong>y</strong>. So <em>í:se'</em> (you) becomes <em>ý:se'</em>.",
    "This app accepts all community forms as correct. When you type or speak, your community's form will be recognised."
  ],
  "ped": "<strong>Dialect as asset:</strong> García & Li Wei's (2014) translanguaging framework and Flores & Rosa's (2015) raciolinguistics work both argue that treating dialect variation as deficiency reproduces colonial language hierarchies. This lesson explicitly frames variation as community identity, not error. The data_variants.json file encodes this at the data level.",
  "vocabIds": ["p01", "p04"],
  "exercises": [
    {
      "type": "mc",
      "wid": "p04",
      "prompt": "In Akwesasne, raónha (he) is pronounced laónha. What sound change produces this?",
      "sub": "",
      "correct": "r → l (the r-to-l alternation in Akwesasne Kanien'kéha)",
      "options": [
        "r → l (the r-to-l alternation in Akwesasne Kanien'kéha)",
        "The entire word changes",
        "The vowel changes, not the consonant",
        "laónha is an older form no longer used"
      ],
      "cm": "Tho niioht! The r→l alternation is systematic in Akwesasne — wherever Kanehsatà:ke/Kahnawà:ke has r, Akwesasne has l. Both are correct.",
      "wm": "That answer is incorrect — the change is specifically r → l, a consistent phonological alternation."
    },
    {
      "type": "match",
      "wid": null,
      "prompt": "Match each form to its community",
      "sub": "",
      "pairs": [
        { "target": "raónha", "english": "he — Kanehsatà:ke / Kahnawà:ke / Six Nations", "wids": ["p04"] },
        { "target": "laónha", "english": "he — Akwesasne", "wids": ["p04"] },
        { "target": "í:se'", "english": "you — Kanehsatà:ke / Kahnawà:ke", "wids": ["p01"] },
        { "target": "ý:se'", "english": "you — Six Nations / Tyendinaga", "wids": ["p01"] }
      ],
      "cm": "Niawenhkó:wa! Two alternations, two communities. r/l and i/y are the most common variations you will encounter.",
      "wm": "That answer is incorrect — please try again."
    },
    {
      "type": "mc",
      "wid": "p01",
      "prompt": "A learner types ý:se' for 'you (singular)'. Is this correct?",
      "sub": "",
      "correct": "Yes — ý:se' is the Six Nations / Tyendinaga form; all community forms are accepted",
      "options": [
        "Yes — ý:se' is the Six Nations / Tyendinaga form; all community forms are accepted",
        "No — the correct form is only í:se'",
        "No — ý:se' is an error",
        "Only elders use ý:se'"
      ],
      "cm": "Io'nikonhraién:ta'ne! ý:se' is the Ontario dialect form. This app accepts both í:se' and ý:se' — and their unaccented variants — as correct. Your community's form is correct.",
      "wm": "That answer is incorrect — please try again."
    },
    {
      "type": "audio",
      "wid": "p04",
      "prompt": "Say this pronoun aloud",
      "sub": "Try both the r-form and l-form",
      "word": "raónha / laónha",
      "meaning": "he / him",
      "hint": "r-form (Kanehsatà:ke/Kahnawà:ke): the r is an alveolar flap [ɾ], like a quick single tap of the tongue — not the English 'r'. l-form (Akwesasne): the l replaces r entirely. Both: two syllables, ra-ÓN-ha or la-ÓN-ha. Stress on ón."
    },
    {
      "type": "story",
      "wid": "p01",
      "prompt": "Connect to your community",
      "sub": "",
      "word": "í:se' / ý:se'",
      "meaning": "you (singular)",
      "storyPrompt": "Which community's form feels like home to you — or are you learning a form different from the one you grew up hearing? There is no single 'correct' Kanien'kéha. The language lives in communities, and communities vary. Which form will you carry forward?"
    }
  ]
}
```

---

## Unit 2 — The Pronoun as Compressed Verb

**Unit-level metadata:**
```
id:    2
title: "Unit 2 — The Pronoun as Compressed Verb"
desc:  "All 15 free pronouns — singular, dual, plural. The te- and -kwé:kon morphemes as system, not vocabulary."
```

**Generation instruction for Claude:** The five lessons of Unit 2 re-use exercises from existing `data_units.json` lessons u0l0–u0l2, u0l7, and u0l8. When generating this unit, copy those exercise arrays verbatim and update only:

1. The `id` field on each lesson (u0lN → u_rw2lN).
2. The `intro` array — replace the existing intro paragraphs with the new framing below.
3. The `ped` field — replace with the new rationale below.

The `vocabIds` and `exercises` arrays carry over unchanged.

---

### Lesson u_rw2l0 — "Free Pronouns: What They Are and Are Not"

**New intro (replace existing u0l0 intro):**
```json
"intro": [
  "You have been using <strong>k-</strong> (I) and <strong>s-</strong> (you) <em>inside</em> the verb. Now meet the <strong>free pronoun</strong> — a word that can stand on its own. <strong>í:'i</strong> means 'I', but it is not the same as the English 'I'. It is more like a full phrase: <em>'I, for my part'</em> — emphatic, focused, capable of standing alone.",
  "Free pronouns are used when you want to emphasise who is doing something, or when no verb follows. In normal speech, the prefix inside the verb carries the person meaning — the free pronoun is an addition, not a requirement.",
  "Dialect note: in Six Nations and Tyendinaga, <strong>í:'i</strong> (I) appears as <strong>ý:'i</strong>, and <strong>í:se'</strong> (you) as <strong>ý:se'</strong>. In Akwesasne, <strong>r</strong> becomes <strong>l</strong>: <strong>raónha</strong> → <strong>laónha</strong>. All forms accepted as correct."
]
```

**New ped (replace existing):**
```
"ped": "<strong>Pronoun as compressed verb phrase:</strong> Kaulfers (1944) and more recently Mithun (1989) note that free pronouns in Iroquoian languages are not the same part of speech as English pronouns — they function closer to focused NPs or elliptical verb phrases. Introducing them after the prefix system (Unit 1) allows learners to understand them correctly rather than mapping them onto English pronoun slots."
```

`vocabIds` and `exercises`: copy from existing u0l0.

---

### Lesson u_rw2l1 — "Dual Pronouns: te- Marks Two"

**New intro:**
```json
"intro": [
  "The <strong>te-</strong> prefix marks duality throughout Kanien'kéha. You saw it in Unit 1 on the verb -aráhtat- (to run) — running is inherently dualic. Now you see the same <strong>te-</strong> in all four dual pronouns.",
  "This is not a coincidence. In Kanien'kéha, the same morpheme carries the same meaning across word classes. <strong>te-</strong> = two, always. Learning it once means recognising it everywhere.",
  "The four dual pronouns are: <strong>teseniiáhshe</strong> (you two), <strong>teiakeniiáhshe</strong> (you and I), <strong>teteniiáhshe</strong> (two females), <strong>tehniiáhshe</strong> (two males / one of each)."
]
```

`vocabIds` and `exercises`: copy from existing u0l1.

---

### Lesson u_rw2l2 — "Plural Pronouns: -kwé:kon Marks Everyone"

**New intro:**
```json
"intro": [
  "The suffix <strong>-kwé:kon</strong> marks plurality — three or more — throughout Kanien'kéha. It appears on all four plural pronouns and will appear later on other words meaning 'all' or 'every'.",
  "The four plural pronouns are: <strong>sewakwé:kon</strong> (you all), <strong>iakwakwé:kon</strong> (we all, inclusive), <strong>kontikwé:kon</strong> (all females), <strong>ratikwé:kon</strong> (all males / everyone).",
  "Notice the <strong>inclusive/exclusive</strong> distinction: iakwakwé:kon includes the person you are speaking to ('we all, including you'); ratikwé:kon may exclude the speaker. Kanien'kéha encodes this social precision directly into grammar."
]
```

`vocabIds` and `exercises`: copy from existing u0l2.

---

### Lesson u_rw2l3 — "All Fifteen Together"

**New intro:**
```json
"intro": [
  "You now have all fifteen free pronouns: five singular, four dual, six plural. Before reviewing them together, notice the architecture: <strong>te-</strong> marks duality throughout; <strong>-kwé:kon</strong> marks plurality; <strong>Ra-/Ro-</strong> marks male; <strong>I-/Iak-/A-</strong> marks female.",
  "These morphemes are not just pronoun pieces — they are the same prefixes that appear inside every verb and on person nouns. You are not memorising fifteen unrelated words; you are seeing fifteen instances of the same four-part system."
]
```

`vocabIds` and `exercises`: copy from existing u0l8.

---

### Lesson u_rw2l4 — "Formal Pronouns and Addressing Elders"

**New intro:**
```json
"intro": [
  "Kanien'kéha encodes social register directly into pronouns. <strong>akaónha</strong> (she, respectful) is used for mothers, elders, and women of authority. <strong>aónha</strong> is used for familiar females, animals, and objects.",
  "Using the wrong pronoun is not just informally rude — it is grammatically incorrect. The language requires you to know your relationship before you speak. This is one of the ways Kanien'kéha embeds social ethics into everyday speech.",
  "Elder terms: <strong>Akokstén:ha</strong> (elder woman), <strong>Rokstén:ha</strong> (elder man), <strong>Iakoiánehr</strong> (Clan Mother). These will appear again in Unit 3."
]
```

`vocabIds` and `exercises`: copy from existing u0l7.

---

## Unit 3 — People, Kinship, and the Ra-/I- System

**Unit-level metadata:**
```
id:    3
title: "Unit 3 — People, Kinship, and the Ra-/I- System"
desc:  "Person nouns, kinship terms, and the clan system — all as expressions of the Ra-/I- prefix architecture."
```

**Generation instruction:** Unit 3 re-uses exercises from existing lessons u0l3, u0l4, u1l0, u1l1, u1l3, u1l5, u1l6. Update `id` fields and replace `intro`/`ped` as specified below. `vocabIds` and `exercises` carry over unchanged.

---

### Lesson u_rw3l0 — "The Person Root: -nón:kwe-"

**New intro:**
```json
"intro": [
  "The root <strong>-nón:kwe-</strong> means 'person'. Add <strong>Ra-</strong> and you get <strong>Rón:kwe</strong> (man). Add <strong>Iak-</strong> and you get <strong>Iakón:kwe</strong> (woman). Add <strong>Kon-</strong> and you get <strong>Konón:kwe</strong> (women, plural). Add <strong>Ron-</strong> and you get <strong>Ronón:kwe</strong> (men, plural).",
  "This is the same <strong>Ra-/I-</strong> distinction you learned in Unit 2 for pronouns. It is not a coincidence — it is a system. The same prefixes that mark male and female on pronouns mark male and female on nouns.",
  "In Akwesasne, <strong>Rón:kwe</strong> (man) becomes <strong>Lón:kwe</strong> (r→l). In Akwesasne and other communities, check data_variants.json for n05–n08 variant forms. All accepted."
]
```

`vocabIds` and `exercises`: copy from existing u0l3.

---

### Lesson u_rw3l1 — "Dual and Plural People"

**New intro:**
```json
"intro": [
  "Add <strong>te-</strong> (dual) and <strong>-kwé:kon</strong> (plural) to the person root paradigm. These are the same morphemes from the pronoun lessons. You are not learning new morphemes — you are seeing the same ones in a new context.",
  "<strong>Tekeniksá:'a</strong> = two girls (tekeni- = two female). <strong>Tekenón:kwe</strong> = two women. <strong>Techniiáhshe</strong>-type patterns extend to nouns as they do to pronouns."
]
```

`vocabIds` and `exercises`: copy from existing u0l4.

---

### Lesson u_rw3l2 — "Female Kinship Roots"

**New intro:**
```json
"intro": [
  "Kinship terms in Kanien'kéha are always possessed — they cannot stand alone without a prefix marking who the relative belongs to. <strong>ista</strong> means 'mother' but in natural speech it appears as <strong>akista</strong> (my mother) or <strong>sista</strong> (your mother).",
  "Kanien'kehá:ka society is matrilineal: clan membership, political authority, and family identity pass through the mother's line. This social reality is built into the grammar — kinship terms always come with a possessive prefix.",
  "This lesson covers female kinship: mother, grandmother, older sister, daughter, and related terms."
]
```

`vocabIds` and `exercises`: copy from existing u1l0.

---

### Lesson u_rw3l3 — "Male Kinship Roots"

**New intro:**
```json
"intro": [
  "Male kinship terms follow the same always-possessed pattern. <strong>'nisten'ha</strong> (father), <strong>'sot</strong> (grandfather), <strong>raksén'a</strong> (son) — all appear with possessive prefixes in natural speech.",
  "Notice the glottal stop (') at the start of some terms: <strong>'nisten'ha</strong>, <strong>'sot</strong>. The glottal stop is a full consonant in Kanien'kéha — it is not punctuation and cannot be dropped."
]
```

`vocabIds` and `exercises`: copy from existing u1l1.

---

### Lesson u_rw3l4 — "Extended Family and the Matrilineal System"

**New intro:**
```json
"intro": [
  "Beyond the nuclear family, Kanien'kéha kinship vocabulary encodes the broader structure of Haudenosaunee society. <strong>Kahwatsíre'</strong> (extended family/community) describes a network that extends through the clan.",
  "The <strong>Clan Mother (Iakoiánehr)</strong> is the political and social anchor of the clan. Her authority over chieftainship nominations, conflict resolution, and community welfare is built into the language's kinship system.",
  "The three original Mohawk clans — Bear (<strong>Rotihskeré:wake</strong>), Turtle (<strong>Rotiniáhton</strong>), Wolf (<strong>Ronathahí:non</strong>) — define the extended family beyond blood."
]
```

`vocabIds` and `exercises`: copy from existing u1l3 and u1l5 (merge the two lesson arrays into one).

---

### Lesson u_rw3l5 — "Asking About Family"

**New intro:**
```json
"intro": [
  "Combine the kinship vocabulary with the question words you have been building toward: <strong>Ónhka</strong> (who), <strong>Nahò:ten</strong> (what), <strong>Ka'</strong> (where), <strong>To nihá:ti</strong> (how many).",
  "Asking about family is one of the first real communicative acts in an immersion context. Who is your mother? Who are your grandparents? How many children? These questions appear in introductions, ceremonies, and community gatherings."
]
```

`vocabIds` and `exercises`: copy from existing u1l6.

---

## Unit 4 — The Thanksgiving Address

**Unit-level metadata:**
```
id:    4
title: "Unit 4 — The Thanksgiving Address: Ohén:ton Karihwatéhkwen"
desc:  "The Words Before All Else — the most important oral text in Kanien'kéha, taught here as ceremony, not advanced grammar."
```

**Generation instruction:** Unit 4 is a direct carry-over of existing Unit 5 (lessons u4l_welcome through u4l6). Copy the entire lessons array from the existing `data_units.json` Unit 5 entry. Update only:

1. Unit `id` to 4 (or the correct array index).
2. Unit `title` — add subtitle: `"Unit 4 — The Thanksgiving Address: Ohén:ton Karihwatéhkwen"`.
3. Unit `desc` — update to: `"The Words Before All Else. Taught in Unit 4 — not as advanced content, but as the beginning of meaning."`.
4. Add one sentence to the `intro` of lesson u4l_welcome (the welcome/orientation lesson): `"In this curriculum, the Thanksgiving Address appears in Unit 4 — not because it is easy, but because it is <em>primary</em>. Ceremony is not a reward for learning enough grammar. It is the reason the language exists."`.

All `vocabIds`, `exercises`, `ped`, and `sub` fields: copy verbatim from existing Unit 5.

---

## Appendix B: Glossary Entries Implied by data_units.json but Absent from data_glossary.json

The following vocab IDs are referenced in `data_units.json` exercises but do not appear in `data_glossary.json`. They are likely defined in `kanienkeha_data.js` (the fallback bundle). Before generating exercises that reference these IDs, Claude should read `kanienkeha_data.js` to retrieve their `target`, `english`, `pos`, `notes`, and `accepts[]` fields. Their meanings are recoverable from exercise context (see below) but should not be invented without verifying against the source file.

| ID | Inferred meaning | Source of inference |
|---|---|---|
| p05 | aónha — she (familiar) / female animal / object | Exercise options in u0l0 |
| p07 | teiakeniiáhshe — you and I (dual inclusive) | Exercise correct answers in u0l1 |
| p08 | teteniiáhshe — two females (dual) | Exercise correct answers in u0l1 |
| p09 | tehniiáhshe — two males / one of each (dual) | Fill exercise in u0l1 |
| p11 | iakwakwé:kon — we all (inclusive plural) | Fill exercise in u0l2 |
| p12 | kontikwé:kon — all females (plural) | MC exercise in u0l2 |
| p13 | ratikwé:kon — all males / everyone (plural) | Type exercise in u0l2 |
| nd01 | tekeniksá:'a — two girls | MC exercise in u0l4 |
| nd03 | Tekenón:kwe — two women | MC exercise in u0l4 |
| nd07 | tehnón:kwe — two men | MC exercise in u0l4 |
| np03 | Konón:kwe — women (plural 3+) | MC/type exercise in u0l4 |
| np07 | Ronón:kwe — men (plural 3+) | MC exercise in u0l4 |
| k09 | Likely a kinship term used in audio/story context | audio + story in u1l0 |
| k10 | raksótha — my grandfather (possessed form) | Type exercise in u1l1 |
| ta03 | Ionkhi'nikonhraién:tase' — likely the collective gratitude refrain | MC exercise in u4l0 |
| ta04 | Ohwén:tsia ne Ionkwarihó:ten — the earth that sustains us | MC exercise in u4l1 |
| dc01–dc06 | Dual/plural command forms of v01, v03, v05 | MC/fill/type exercises in u8l2 |

---

# Appendix C: Session-Start Checklist for Claude

**Purpose:** Paste this section at the top of any new conversation where Claude will work on this curriculum. It gives a fresh Claude session the orientation needed to work on the data files without re-reading the full plan.

---

## Quick context

You are working on a Kanien'kéha (Mohawk) language learning app. The project owner is a learning designer. You are implementing a **root-word-first curriculum reorganization** of the existing topic-based unit structure.

## Files — read these first, in this order

1. **`kanienkeha_root_word_curriculum_plan.md`** (this document) — the full reorganization plan. Read before doing anything else.
2. **`data_glossary.json`** — 1,254 vocabulary entries. Every `vocabId` used in exercises must exist here (or in `kanienkeha_data.js` — see item 5). Fields: `id`, `target` (Kanien'kéha form), `english`, `pos`, `notes`, `accepts[]`, optionally `forms[]`.
3. **`data_units.json`** — the existing unit/lesson/exercise structure. When a plan entry says "copy from existing uXlY", retrieve that lesson from this file.
4. **`data_variants.json`** — dialect variants, keyed to vocab IDs. Check this for every lesson that introduces a vocab item with a known variant (especially r/l and i/y alternations).
5. **`kanienkeha_data.js`** — fallback bundle containing vocab entries not yet migrated to `data_glossary.json`. Read this when a referenced vocabId is not found in the JSON glossary.
6. **`data_syllabary.json`** — pronunciation reference. Use `t` (tooltip) fields for `audio` exercise `hint` text.

## Non-negotiable content rules

- **Never invent a Kanien'kéha form.** All `target` values must come from the glossary. All `correct` and `alts[]` values in exercises must match `target` or entries in the word's `accepts[]` array.
- **Every lesson needs at least one `story` exercise** and at least one `mc` exercise that asks the learner to notice a structural or cultural pattern (LaFever four-domain requirement: Emotional/Spiritual dimension).
- **Every lesson needs a `ped` field** citing the scholarly framework that justifies its sequencing (Mithun, Nation, Freire, Krashen, García & Li Wei, Flores & Rosa, Chew/Leonard/Rosenblum, or LaFever).
- **Dialect variants are always correct.** If `data_variants.json` has a variant for a vocabId, the lesson `intro` must acknowledge it and the exercise `alts[]` must include the variant form.
- **`cm` and `wm` fields reinforce morphological patterns**, not just right/wrong. Correct message openers (rotate): `Tho niioht!`, `Niawenhkó:wa!`, `Io'nikonhraién:ta'ne!`, `Shé:kon!`. Wrong message opener: `That answer is incorrect — please try again.`

## Exercise type schema (quick reference)

```
mc:     type, wid, prompt, sub, correct, options[4], cm, wm
match:  type, wid(null), prompt, sub, pairs[{target, english, wids[]}], cm, wm
fill:   type, wid, prompt, sentence (with ___), correct, hint, alts[], cm, wm
type:   type, wid, prompt, sub, correct, alts[], cm, wm
audio:  type, wid, prompt, sub, word, meaning, hint
story:  type, wid, prompt, sub, word, meaning, storyPrompt
```

## Lesson ID convention

New lessons (Units 1–4): `u_rw{unit}l{index}` — e.g., `u_rw1l0`, `u_rw2l3`.
Carry-over lessons (Units 5–32): keep the original ID from `data_units.json`; update the parent unit number only.
Merged lessons (where two source lessons combine): use the first source lesson's ID with a suffix, e.g., `u_rw21l3_merged`.

## Unit-number mapping (quick reference)

| New unit | Source | Status |
|---|---|---|
| 1 | new | Full spec in Appendix A |
| 2 | old u0l0–u0l2, u0l7, u0l8 | New intro/ped in Appendix A |
| 3 | old u0l3–u0l4, u1l0–u1l3, u1l5–u1l6 | New intro/ped in Appendix A |
| 4 | old Unit 5 (id:4) | Add one sentence to u4l_welcome intro |
| 5 | old u2l1 + u9l2–u9l4 | New intro/ped in Appendix D |
| 6 | old u2l0, u2l6, u2l3, u2l4, u2l7 | New intro/ped in Appendix D |
| 7 | old u7l1–u7l4, u7l7, u7l8 + new stative lesson | New intro/ped in Appendix D |
| 8 | old Unit 19 (id:18) all lessons | New intro/ped in Appendix D |
| 9 | old u8l2 + new full-paradigm lesson | New intro/ped in Appendix D |
| 10 | old u1l2, u1l7 + old u23l0–u23l3b + u2l5 | New intro/ped in Appendix D |
| 11 | old u2l2, u8l4, u8l7 | New intro/ped in Appendix D |
| 12 | old u9l1, u9l_review | New intro/ped in Appendix D |
| 13 | old u7l6 | New intro/ped in Appendix D |
| 14–32 | carry-over (see mapping table in main body) | Unit number update only |

---

# Appendix D: Detailed Lesson Specifications — Units 5–13 (Stage 2 & 3 Entry)

Units 5–13 are the core of Stage 2 (Paradigm Expansion) and the entry to Stage 3 (Relational). Most lessons re-use existing exercise arrays; the specifications below provide the reframing intros, peds, and any structural changes. Lessons marked **[NEW]** require exercise generation from scratch.

---

## Unit 5 — A-Stem Verbs: Full Singular Paradigm

**Unit-level metadata:**
```
id:    5
title: "Unit 5 — A-Stem Verbs: Full Singular Paradigm"
desc:  "Expand k-/s- to all five singular persons. The habitual -s. Commands without -s. The engine of the verb system."
```

**Unit intro note for Claude:** This unit draws exercises from three source locations in `data_units.json`: `u2l1` (A-Stem Verbs: Commands & First Person), `u9l2` (The Habitual), `u9l3` (Full Paradigm Practice), and `u9l4` (Commands Revisited). The existing lessons already contain high-quality exercise arrays; they need new framing intros that explicitly connect to the root-word architecture introduced in Units 1–2.

---

### Lesson u_rw5l0 — "All Five Persons: Singular Paradigm" **[NEW]**

This lesson does not exist in the current `data_units.json`. It must be generated from scratch.

```
id:       u_rw5l0
title:    "All Five Persons: Singular Paradigm"
icon:     🔢
sub:      "From two prefixes to five"
vocabIds: [v01, v03, v05, p01, p02, p03, p04]
```

**Intro:**
```json
"intro": [
  "In Unit 1 you learned two prefixes: <strong>k-</strong> (I) and <strong>s-</strong> (you, singular). Kanien'kéha has five singular persons. This lesson introduces all five using the root you know best: <strong>-á:tien-</strong> (to sit).",
  "The five singular persons are: <strong>k-</strong> (I), <strong>s-</strong> (you), <strong>ra-</strong> (he), <strong>a-/iak-</strong> (she, familiar), <strong>iak-</strong> (she, respectful). Study the table below as a shape — not as five separate vocabulary items, but as one system with five slots.",
  "<table style='width:100%;border-collapse:collapse'><tr><th>Person</th><th>Prefix</th><th>Form (to sit)</th><th>Meaning</th></tr><tr><td>1st sg</td><td>k-</td><td>ká:tiens</td><td>I sit</td></tr><tr><td>2nd sg</td><td>s-</td><td>sá:tien</td><td>you sit</td></tr><tr><td>3rd sg masc</td><td>ra-</td><td>rá:tiens</td><td>he sits</td></tr><tr><td>3rd sg fem (familiar)</td><td>a-</td><td>á:tiens</td><td>she sits (familiar)</td></tr><tr><td>3rd sg fem (respectful)</td><td>iak-</td><td>iaká:tiens</td><td>she sits (respectful)</td></tr></table>",
  "Dialect note: In Akwesasne, <strong>ra-</strong> (he) becomes <strong>la-</strong>. So <em>rá:tiens</em> → <em>lá:tiens</em>. Both forms are correct."
]
```

**Ped:**
```
"ped": "<strong>Full paradigm presentation:</strong> Nation (2001) and Mithun (1989) both recommend presenting the complete paradigm table at the point of introduction rather than spreading it across multiple lessons. Seeing the full shape — five slots, one root — allows learners to grasp the system rather than accumulating isolated forms. The table format here mirrors how fluent speaker-teachers at Tsi Tyónnheht Onkwawén:na present paradigms in immersion week one."
```

**Exercises to generate:**

```
1. mc — wid:v01 — "Look at the table. Which prefix marks 'he' in Kanien'kéha?"
   correct: "ra- (or la- in Akwesasne)"
   options: ["ra- (or la- in Akwesasne)", "k-", "iak-", "s-"]
   cm: "Tho niioht! ra- marks masculine third person singular throughout Kanien'kéha — on pronouns, person nouns, and kinship terms as well as verbs."
   wm: "That answer is incorrect — find the 3rd singular masculine row in the table."

2. match — wid:null — "Match each prefix to its person"
   pairs: [{ra-, he/him}, {iak-, she (respectful)}, {k-, I/me}, {s-, you (singular)}]
   cm: "Niawenhkó:wa! These five prefixes run through the entire verb system. Every new verb you learn takes these same prefixes."
   wm: "That answer is incorrect — please try again."

3. fill — wid:v01 — "Complete 'she sits (respectful)'"
   sentence: "___á:tiens"
   correct: "iak"  hint: "iak"  alts: ["iak"]
   cm: "Tho niioht! iaká:tiens — iak- (she, respectful) + á:tien (root) + -s (habitual). Use this form for mothers, elders, Clan Mothers."
   wm: "That answer is incorrect — the respectful feminine prefix is iak-."

4. type — wid:v03 — "How do you say 'he runs (habitual)'? Remember: run always takes te-."
   correct: "teraráhtats"   alts: ["telaráhtats", "te-raráhtats"]
   cm: "Io'nikonhraién:ta'ne! teraráhtats — te- (dualic, always) + ra- (he) + aráhtat (root) + -s (habitual). In Akwesasne: telaráhtats."
   wm: "That answer is incorrect — te- is always present on aráhtat. Then add ra- for 'he'."

5. mc — wid:v01 — "Why does the table show two feminine third-person forms (a-/iak-) but only one masculine (ra-)?"
   correct: "Kanien'kéha encodes social register for women: familiar vs respectful. The language requires knowing the relationship before speaking."
   options: ["Kanien'kéha encodes social register for women: familiar vs respectful. The language requires knowing the relationship before speaking.", "It is a grammatical error in the table.", "The two forms are interchangeable.", "ra- also has a respectful form not shown here."]
   cm: "Shé:kon! As Mithun (1982) notes, Kanien'kéha builds social ethics into grammar. Using the wrong register is not informally rude — it is grammatically incorrect."
   wm: "That answer is incorrect — please try again."

6. audio — wid:v01 — word:"rá:tiens" meaning:"he sits (habitual)"
   hint: "Two syllables: RÁ:-tiens. The r is an alveolar flap [ɾ] — a quick single tap of the tongue against the ridge behind your upper teeth, not the English 'r'. In Akwesasne, this r becomes l: lá:tiens. Stress on rá:."

7. story — wid:v01 — word:"iaká:tiens" meaning:"she sits (respectful)"
   storyPrompt: "iaká:tiens — she sits. The iak- prefix marks a woman you respect: your mother, your grandmother, a Clan Mother, an elder. Kanien'kéha asks you to know that before you speak. Who in your life would you address with iak-?"
```

---

### Lesson u_rw5l1 — "The Habitual: What -s Does"

**Source:** `u9l2` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "You have been adding <strong>-s</strong> to habitual verb forms since Unit 1. This lesson names and explains what -s actually does.",
  "The <strong>habitual suffix -s</strong> marks actions that are repeated, regular, or customary — things you do as a matter of course. <em>Ká:tiens</em> — I sit (habitually, as a regular practice). Commands and one-time actions omit -s.",
  "Mithun (1999) notes that habitual aspect in Kanien'kéha carries a cultural weight that simple 'present tense' in English does not. Saying <em>katkáhthons</em> (I listen, habitually) is not just a grammar form — it describes a stance, a practice, an identity."
]
```

**New ped (replace existing):**
```
"ped": "<strong>Habitual as culturally significant aspect:</strong> Mithun (1999): aspect-prominent languages like Kanien'kéha foreground the relationship between speaker and action type over time-of-action. The habitual encodes practice and identity, not just repetition. Krashen's (1982) comprehensible input hypothesis supports treating the habitual as meaning-bearing rather than as a grammar rule to memorise."
```

---

### Lesson u_rw5l2 — "Daily Action Roots: Eat, Walk, Sleep"

**Source:** Mix exercises from existing `data_units.json` lessons — extract verb paradigm exercises from u12l3–u12l6b for av05, av06, av07. If those lessons contain non-verb vocabulary exercises (food nouns, body nouns), exclude them; this lesson covers only the verb forms.

**New intro:**
```json
"intro": [
  "Three A-stem roots you will use every day: <strong>-átskhwa'-</strong> (to eat), <strong>-aié:re-</strong> (to walk), <strong>-anón:we-</strong> (to sleep). All three take the same five singular prefixes you learned in the previous lesson.",
  "Notice: the 'I eat (habitual)' form is <em>kátskhwa's</em> — the k- prefix triggers a slight sound change at the boundary. This is predictable: A-stems whose root begins with a vowel may show this blending. The pattern is consistent.",
  "These are not just vocabulary items. They are the backbone of daily conversation in an immersion environment. The first full day at Tsi Tyónnheht Onkwawén:na involves saying what you eat, where you walk, and when you sleep — all in Kanien'kéha."
]
```

**Ped:**
```
"ped": "<strong>High-frequency daily vocabulary:</strong> Nation (2001) identifies frequency as the primary criterion for early vocabulary selection. Eat, walk, sleep are among the top-20 frequency verbs in any language corpus. Krashen (1982): comprehensible input is most effective when it uses vocabulary the learner encounters repeatedly in real contexts."
```

**Exercises:** Generate a paradigm-table fill + match for each of av05, av06, av07 covering all five singular persons. Include one `type` exercise per root (produce the 'I' form), one `audio` exercise per root, and one `story` exercise at the end of the lesson.

Audio hints (derive from `data_syllabary.json`):
- av05 átskhwa': Three syllables — ÁT-skhwa'. The 'ts' cluster is a single affricate sound. The glottal stop (') closes the syllable sharply — do not trail off.
- av06 aié:re: Three syllables — a-IÉ:-re. The colon marks a long vowel; hold the é: distinctly longer than a short vowel. Stress on ié:.
- av07 anón:we: Three syllables — a-NÓN:-we. Long nasal vowel ón:. Keep the 'w' brief.

---

### Lesson u_rw5l3 — "Commands: The Bare Root"

**Source:** `u9l4` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "Commands use the <strong>s-</strong> prefix (you, singular) with the bare root — no habitual -s. <em>Sá:tien</em> — sit. <em>Satkáhthon</em> — listen. The absence of -s is itself meaningful: this is a single, directed action, not a practice.",
  "In ceremony and in teaching, the command form carries weight. Elder speakers at Ratióhkwats describe the command as 'an invitation with authority' — it is direct, but it is also relational. The speaker using the command knows the listener.",
  "This lesson consolidates singular, dual, and plural command forms across all A-stem roots introduced so far: -á:tien-, -aráhtat-, -atkáhthon-, -átskhwa'-, -aié:re-, -anón:we-."
]
```

**Ped:**
```
"ped": "<strong>Command paradigm as social form:</strong> Freire (1970): language exists in relationship. The command form in Kanien'kéha is not the language of dominance — it is the language of instruction and care, used by teachers, parents, and ceremony leaders. Nation (2001): consolidating command forms at this point prepares learners for relational prefix instruction (Unit 14), which requires confident command-form recognition."
```

---

### Lesson u_rw5l4 — "A-Stem Paradigm Review"

**Source:** `u9l_review` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "Review of the A-stem paradigm: five persons, three roots, habitual and command forms. Before moving to other stem classes (Unit 7), this lesson confirms productive control — not just recognition, but the ability to generate forms from the prefix + root + suffix pattern.",
  "If any combination feels uncertain, return to the paradigm table in Lesson u_rw5l0. The table is a tool, not a crutch — fluent speakers have the table in their muscle memory."
]
```

---

## Unit 6 — Noun Incorporation: Objects Enter the Verb

**Unit-level metadata:**
```
id:    6
title: "Unit 6 — Noun Incorporation: Objects Enter the Verb"
desc:  "A-class, O-class, and Ka-class nouns — taught as things that enter verb structures, not as stand-alone lists."
```

### Lesson u_rw6l0 — "A-Class Nouns and the Logic of Noun Incorporation"

**Source:** `u2l0` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "In English, you say 'I put on the shoe' — a verb and a separate noun. In Kanien'kéha, the noun often moves <em>inside</em> the verb: shoe + put-on becomes a single word. This is <strong>noun incorporation</strong>, and it is one of the most distinctive features of the language.",
  "<strong>A-class nouns</strong> begin with the vowel 'a'. They cover clothing, personal objects, and items worn or carried: <em>áhta'</em> (shoe), <em>atháhsteren</em> (pants), <em>atià:tawi</em> (shirt). Learning their roots now means you will recognise them when they are incorporated into verb structures later.",
  "You do not need to produce incorporated forms yet. At this stage: learn the noun roots. Notice that they begin with 'a'. That's the class marker."
]
```

**Ped:**
```
"ped": "<strong>Noun incorporation awareness — early exposure:</strong> Mithun (1984) identifies noun incorporation as a core typological feature of polysynthetic languages, present at all levels of fluency. Introducing noun roots as incorporation candidates (rather than vocabulary list items) primes learners for the morphological pattern they will encounter constantly in natural speech. Nation (2001): the productive use of incorporated nouns requires prior familiarity with the noun root — this lesson builds that familiarity."
```

---

### Lesson u_rw6l1 — "Possessed Nouns: My and Your"

**Source:** `u2l6` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "You have been producing possessed forms since Unit 3: <em>akista</em> (my mother), <em>sista</em> (your mother). Now apply the same possessive prefix logic to object nouns.",
  "The same <strong>ak-/sk-</strong> (my/your) prefixes that mark possessed kinship terms also mark possessed objects: <em>ak-áhta'</em> (my shoe), <em>sk-áhta'</em> (your shoe). The prefix is the same morpheme — only the root changes.",
  "This is the pattern Mithun (1982) describes as 'paradigm transfer': once you know the possessive paradigm on one word class, you can apply it to another. The lesson that follows will make this transfer explicit."
]
```

**Ped:**
```
"ped": "<strong>Possessive paradigm transfer:</strong> Mithun (1982): the possessive prefix system in Kanien'kéha is consistent across noun classes — learning it once transfers to all subsequent nouns. Nation (2001): paradigm transfer is one of the highest-yield learning strategies in morphologically complex languages."
```

---

### Lesson u_rw6l2 — "O-Class Nouns: Nature and Round Objects"

**Source:** `u2l3` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "<strong>O-class nouns</strong> begin with the vowel 'o'. They include nature objects, round or contained items: <em>ohkwá:ri</em> (bear), <em>o'wá:ron</em> (stone/rock), <em>onón:ta'</em> (hill/mountain — root form).",
  "Like A-class nouns, O-class roots can be incorporated into verb structures. The class marker 'o' at the beginning is the signal. When you see a word beginning with 'o' that is not a verb prefix, you are likely looking at an O-class noun root.",
  "You will see several of these roots again in Unit 22 (Natural World) and Unit 27 (Agriculture). Learn them now as roots; you will encounter them in more complex structures later."
]
```

**Ped:**
```
"ped": "<strong>Noun class as pattern:</strong> Mithun (1984): Kanien'kéha noun classes are not arbitrary gender — they reflect historical semantic groupings (animate, round, elongated, etc.) that still show partial semantic coherence. Noticing the 'o' at the start of O-class nouns is a chunking strategy (Nation 2001) that aids both recognition and production."
```

---

### Lesson u_rw6l3 — "Ka-Class Nouns: Tools and Community Objects"

**Source:** `u2l4` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "<strong>Ka-class nouns</strong> begin with 'ka'. They cover tools, vehicles, instruments, and community objects: <em>kanò:nwe</em> (canoe), <em>kaná:tsiherà</em> (drum), <em>ka'shatstén:sera</em> (knife).",
  "Ka-class nouns appear frequently in cultural and ceremonial contexts — drums, canoes, longhouses, baskets are all Ka-class roots. You will encounter them throughout Units 24–30 (Cultural Depth).",
  "The 'ka' prefix at the start is the class marker — same logic as 'a' for A-class and 'o' for O-class. Three classes, three vowel markers. The pattern is consistent."
]
```

**Ped:**
```
"ped": "<strong>Ka-class as cultural vocabulary anchor:</strong> Chew, Leonard & Rosenblum (2023): cultural material objects — drums, canoes, baskets — are not decoration in an Indigenous language curriculum. They are primary vocabulary because they are the objects through which the culture and the language are transmitted together. Introducing Ka-class nouns in Unit 6 primes their appearance in cultural units in Stage 4."
```

---

### Lesson u_rw6l4 — "Questions About Nouns"

**Source:** `u2l7` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "Apply the question words from Unit 3 — <strong>Ónhka</strong> (who), <strong>Nahò:ten</strong> (what), <strong>Ka'</strong> (where) — to noun vocabulary. Asking what something is and where it is are among the first communicative acts in any immersion setting.",
  "Notice how question formation in Kanien'kéha works: the question word comes first, then the verb or noun phrase. The word order reflects information structure — new information (the question) leads."
]
```

**Ped:**
```
"ped": "<strong>Question formation as communicative priority:</strong> Krashen (1982): comprehensible input includes the ability to ask clarifying questions. Nation (2001): question words are highest-frequency items in any language corpus and should be introduced early and reinforced often. This lesson is the third encounter with these question words (after Units 3 and 4 introductions)."
```

---

## Unit 7 — Consonant-Stem, I-Stem, E-Stem, and Stative Verbs

**Unit-level metadata:**
```
id:    7
title: "Unit 7 — Beyond the A-Stem: Other Verb Classes and Stative Verbs"
desc:  "C-stem, I-stem, true and fake E-stem, O-stem, and stative verbs — same prefix system, different root behavior."
```

### Lesson u_rw7l0 — "Consonant-Stem Verbs"

**Source:** `u7l1` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "A-stem verb roots begin with a vowel, so the prefix attaches smoothly: <em>k-</em> + <em>á:tien</em> = <em>ká:tiens</em>. <strong>Consonant-stem (C-stem) verbs</strong> begin with a consonant. When <em>k-</em> (I) meets a consonant, the two sounds need a buffer — the prefix may double or change slightly.",
  "The key rule: <strong>k- before a consonant root becomes ke-</strong> in most environments. So <em>k-</em> + <em>-wé'tarón:ko-</em> (to cut) = <em>kewé'tarón:kos</em> (I cut, habitual). The root is unchanged; the prefix adapts.",
  "This is not a new prefix — it is the same k- (I) adapting to the phonological environment. Same meaning, slightly different shape."
]
```

**Ped:**
```
"ped": "<strong>C-stem as phonological adaptation:</strong> Mithun (1989): the variation in prefix shape across stem classes is a phonological phenomenon (prefix allomorphy), not a grammatical irregularity. Framing it this way — same prefix, different shape — prevents learners from treating each stem class as an entirely separate system. Nation (2001): transfer from A-stem to C-stem is explicit and teachable."
```

---

### Lesson u_rw7l1 — "I-Stem and True E-Stem Verbs"

**Source:** `u7l2` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "<strong>I-stem verbs</strong> begin with 'i'. The first-person prefix k- merges with the initial 'i': <em>k-</em> + <em>-ient-</em> → <em>kient-</em>. A small blend, consistent across all I-stem roots.",
  "<strong>True E-stem verbs</strong> begin with 'e' and take the prefix k- directly: <em>k-</em> + <em>-en:teron</em> → <em>ken:terons</em>. The 'e' of the root absorbs the prefix smoothly.",
  "Three stem classes now: A-stem (most common), C-stem (prefix becomes ke- before consonants), I-stem (k- + i merges). The same five persons, the same habitual -s, the same command pattern. The only thing that changes is the boundary between prefix and root."
]
```

**Ped:**
```
"ped": "<strong>Stem class as prefix-boundary phenomenon:</strong> Mithun (1989): the six verb stem classes in Kanien'kéha are distinguished by how they interact with the prefix-root boundary — not by separate grammatical rules. Teaching all classes as variations of the same underlying system prevents learners from over-generalising or treating each class as unpredictable."
```

---

### Lesson u_rw7l2 — "O-Stem Verbs"

**Source:** `u7l3` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "<strong>O-stem verbs</strong> begin with 'o'. This is the same 'o' you saw as the O-class noun marker. In verb roots, 'o' at the beginning signals a slightly different prefix attachment pattern.",
  "O-stem verbs are smaller in number than A-stem verbs but include several high-frequency roots: <em>ov01</em> (to see), <em>ov03</em> (to know). They are worth learning as individual paradigms rather than as a large class.",
  "The prefix k- before 'o' typically becomes <em>wak-</em> in stative/experiential contexts (you will see this pattern more in Unit 12). For active O-stem verbs, the pattern is similar to C-stem: the prefix adapts to avoid a vowel cluster."
]
```

**Ped:**
```
"ped": "<strong>O-stem verbs as manageable subclass:</strong> Mithun (1989): O-stem verbs in Kanien'kéha form a closed, learnable set. Nation (2001): for low-frequency classes, explicit list learning is appropriate — do not apply paradigm-generation expectations until productive control of the class is confirmed."
```

---

### Lesson u_rw7l3 — "Fake E-Stem Verbs"

**Source:** `u7l4` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "The <strong>Fake E-stem</strong> class is large and productive. It gets its name from the fact that the root <em>appears</em> to begin with 'e' but does not behave like a True E-stem. The difference is in the root's origin: the 'e' is a phonological artifact, not the root's true first sound.",
  "The highest-frequency Fake E-stem verb is <strong>fe01</strong> — the verb meaning 'to make / to do'. You have seen it throughout the course: <em>sahrón:ni</em> (you make it), <em>kahrón:nis</em> (I make it habitually). It appears in cooking, craft, ceremony, and daily conversation.",
  "Learn Fake E-stem verbs as individual high-frequency items rather than as a fully productive class. The 'fake' label is a teaching convenience — in fluent speech, they feel entirely natural."
]
```

**Ped:**
```
"ped": "<strong>Fake E-stem as high-frequency productive class:</strong> Mithun (1989): the Fake E-stem class is historically derived from E-stem roots with incorporated nominals, but synchronically it is the most productive verb-formation class in Kanien'kéha — new verbs for technology, modern concepts, and loanword adaptation predominantly use this class. Nation (2001): high-frequency irregular classes should be taught explicitly and repeatedly."
```

---

### Lesson u_rw7l4 — "Negation Across All Verb Classes"

**Source:** `u7l7` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "Negation in Kanien'kéha is expressed through the particle <strong>iah</strong> (not / no) combined with a change in the verb form. The negated verb takes a different suffix pattern — the <em>negative aspect</em> form.",
  "This lesson applies negation to all verb stem classes introduced in Unit 7: C-stem, I-stem, E-stem (true and fake), O-stem. The negation pattern is consistent across classes — the verb changes in a predictable way regardless of stem class.",
  "Knowing how to negate is as foundational as knowing how to affirm. 'I do not sit' and 'I sit' are equally important for basic communication."
]
```

**Ped:**
```
"ped": "<strong>Negation as early productive target:</strong> Krashen (1982): negation is one of the first morphological targets in natural language acquisition. Nation (2001): ensuring productive negation control before progressing to transitive verb morphology prevents a gap where learners can only make affirmative statements."
```

---

### Lesson u_rw7l5 — "Stative Verbs: Describing States" **[NEW]**

This lesson does not exist in the current `data_units.json`. It must be generated.

```
id:       u_rw7l5
title:    "Stative Verbs: Describing States"
icon:     🌀
sub:      "A different prefix set for a different kind of meaning"
vocabIds: [st01, st02, st03, st04, st05, st06, st07]
```

**Intro:**
```json
"intro": [
  "Active verbs describe <em>actions</em>: sitting, running, listening, eating. <strong>Stative verbs</strong> describe <em>conditions</em>: being afraid, being happy, being tired, knowing something. They use a different set of prefixes — the stative/experiential prefix set — because the relationship between the 'experiencer' and the condition is different from the relationship between a subject and an action.",
  "The first-person stative prefix is <strong>wak-</strong> (I am in a state of...). So: <em>wak-</em> + <em>-hterón:ni-</em> = <em>wakhterón:ni</em> (I am afraid). Compare: <em>k-</em> + <em>á:tien</em> = <em>ká:tiens</em> (I sit). Same person, different prefix, because the relationship to the experience is different.",
  "Seven of the most common stative roots are introduced here. You will use all of them in everyday conversation: afraid, angry, busy, happy, tired, cold, hot."
]
```

**Ped:**
```
"ped": "<strong>Active/stative distinction as fundamental:</strong> Mithun (1982): the active/stative distinction is one of the most typologically significant features of Kanien'kéha — it reflects a different ontological organisation of events. Introducing stative verbs at the end of Unit 7 (after all active stem classes) follows the sequencing logic of Nation (2001): introduce the exception after the rule is established, not before."
```

**Exercises to generate:**

```
1. mc — wid:st01 — "wakhterón:ni means 'I am afraid'. The prefix is wak-, not k-. Why?"
   correct: "Stative verbs use the wak- prefix because the person is experiencing a condition, not performing an action"
   options: [correct, "wak- is the plural prefix", "wak- is used for past tense", "wak- is an Akwesasne dialect form"]
   cm: "Tho niioht! wak- is the first-person stative/experiential prefix. You are not 'doing' fear — you are in a state of fear. The language reflects this distinction grammatically."
   wm: "That answer is incorrect — wak- is the stative first-person prefix, distinct from the active k-."

2. match — wid:null — "Match each stative verb to its meaning"
   pairs: [{wakhterón:ni, I am afraid}, {wakena'khwén:'on, I am angry}, {tewakeweiénhare, I am busy}, and 2 more from st04–st07]
   cm: "Niawenhkó:wa! Notice wak- on each one — the same prefix, the same experiencer relationship."
   wm: "That answer is incorrect — all of these use wak- (I am in a state). Find the root that matches the meaning."

3. mc — wid:st01 — "How do you say 'you are afraid' (second person stative)?"
   [Provide four options derived from replacing wak- with the correct 2nd person stative prefix — Claude should look up the stative prefix set from data_glossary.json notes or kanienkeha_data.js before generating options. Do not invent the form.]
   cm: "Io'nikonhraién:ta'ne! The stative prefix set has its own second-person form — different from the active s-. The same logic applies: the person is experiencing, not acting."
   wm: "That answer is incorrect — please try again."

4. fill — wid:st02 — "Complete 'I am angry'"
   sentence: "___ena'khwén:'on"
   correct: "wak"  hint: "wak"  alts: ["wak"]
   cm: "Tho niioht! wakena'khwén:'on — wak- (I, stative) + ena'khwén:'on (root: to be angry). The wak- prefix is the signal that this is a state, not an action."
   wm: "That answer is incorrect — stative first person is wak-, not k-."

5. type — wid:st03 — "How do you say 'I am busy'?"
   correct: "tewakeweiénhare"   alts: ["tewakeweienhare"]
   cm: "Niawenhkó:wa! tewakeweiénhare — te- (dualic aspect marker here) + wak- (I, stative) + eweiénhare (root). A common daily-life stative."
   wm: "That answer is incorrect — try again. The prefix is wak-."

6. audio — wid:st01 — word:"wakhterón:ni" meaning:"I am afraid"
   hint: "Four syllables: wak-hte-RÓN-ni. The 'kh' is a velar fricative — air passes through a slightly constricted throat, similar to the 'ch' in Scottish 'loch'. Do not make it a separate 'k' and 'h'. Stress on rón."

7. story — wid:st01 — word:"wakhterón:ni" meaning:"I am afraid"
   storyPrompt: "wakhterón:ni — I am afraid. wak- tells you: this is my experience, not my action. Stative verbs in Kanien'kéha often describe emotional and relational states. Which of the seven stative verbs introduced in this lesson describes where you are right now in your language learning?"
```

---

### Lesson u_rw7l6 — "Unit 7 Review: All Stem Classes"

**Source:** `u7l8` from `data_units.json`. Copy exercise array verbatim. No intro change needed — the existing review intro references prior lessons in the same unit.

---

## Unit 8 — The Verb in Time: Aspect and Tense

**Unit-level metadata:**
```
id:    8
title: "Unit 8 — The Verb in Time: Aspect and Tense"
desc:  "Completed past, future/intentional, and conditional — how Kanien'kéha locates action in time through aspect rather than tense."
```

**Generation instruction:** All lessons in Unit 8 come directly from existing Unit 19 (id:18): `u18l0` through `u18l5`. Copy all lesson arrays verbatim. Update only:

1. The unit `id` to 8.
2. Add the following sentence to the `intro[0]` of `u18l0` (Time in the Verb): `"You now control the full A-stem singular paradigm (Unit 5) and four additional verb stem classes (Unit 7). This is the right moment to learn how aspect works — because aspect changes the <em>stem</em> you already know, not the prefix system you are still building."`
3. No other changes.

**Rationale note for Claude:** The existing `u18l0` intro correctly frames the aspect/tense distinction for an English speaker. The added sentence contextualises it within the root-word curriculum sequence (aspect after paradigm, not before).

---

## Unit 9 — Dual and Plural Verb Paradigms

**Unit-level metadata:**
```
id:    9
title: "Unit 9 — Dual and Plural Verb Paradigms"
desc:  "te- and -kwé:kon move from pronouns into the verb system. The complete paradigm: all persons, all numbers."
```

### Lesson u_rw9l0 — "Dual and Plural Commands"

**Source:** `u8l2` from `data_units.json`. Copy exercise array verbatim.

**New intro (replace existing):**
```json
"intro": [
  "In Unit 2 you learned that <strong>te-</strong> marks duality and <strong>-kwé:kon</strong> marks plurality — on pronouns. Now those same morphemes appear inside verb command forms.",
  "<strong>seniá:tien</strong> (you two sit) = seni- (dual you) + á:tien (root). <strong>sewá:tien</strong> (you all sit) = sewa- (plural you) + á:tien (root). The te- and -kwé:kon you learned in Unit 2 are embedded in these prefix forms.",
  "This is not new grammar — it is the same grammar in a new position. The prefix paradigm you have been building since Unit 1 now has all three numbers: singular (Unit 5), dual (this lesson), plural (this lesson)."
]
```

**Ped:**
```
"ped": "<strong>Paradigm completion as milestone:</strong> Nation (2001) identifies paradigm completion — the moment a learner has all slots of a system — as a significant acquisition milestone. Mithun (1989): the dual/plural command forms are where the consistency of the Kanien'kéha prefix system becomes most visible to learners, because the te-/kwé:kon morphemes they already know from pronouns reappear in verb forms."
```

---

### Lesson u_rw9l1 — "Full Paradigm: All Persons, All Numbers" **[NEW]**

This lesson does not exist in the current `data_units.json`. It must be generated.

```
id:       u_rw9l1
title:    "Full Paradigm: All Persons, All Numbers"
icon:     🏛️
sub:      "The complete verb paradigm — fifteen slots, one root"
vocabIds: [v01, v03, v05, p01, p02, p03, p04, p06, p10]
```

**Intro:**
```json
"intro": [
  "You now have all the pieces: five singular persons (Unit 5), dual and plural command forms (previous lesson), and the habitual suffix (Unit 5). This lesson brings them together into a single complete paradigm table using the root <strong>-á:tien-</strong> (to sit) as the model.",
  "Study the table as a complete object — not row by row, but as a shape. Fluent speakers do not think through the table when they speak; they have it as an internalized pattern. The goal of this lesson is to begin building that internalized shape.",
  "<table style='width:100%;border-collapse:collapse;font-size:0.9em'><tr><th>Person</th><th>Number</th><th>Form</th><th>Meaning</th></tr><tr><td>1st</td><td>sg</td><td>ká:tiens</td><td>I sit</td></tr><tr><td>2nd</td><td>sg</td><td>sá:tien</td><td>you sit (command)</td></tr><tr><td>3rd m</td><td>sg</td><td>rá:tiens</td><td>he sits</td></tr><tr><td>3rd f fam</td><td>sg</td><td>á:tiens</td><td>she sits (familiar)</td></tr><tr><td>3rd f resp</td><td>sg</td><td>iaká:tiens</td><td>she sits (respectful)</td></tr><tr><td>2nd</td><td>du</td><td>seniá:tien</td><td>you two sit</td></tr><tr><td>1st incl</td><td>du</td><td>teiakeniiá:tien</td><td>you and I sit</td></tr><tr><td>3rd m</td><td>du</td><td>tehniá:tien</td><td>two men sit</td></tr><tr><td>3rd f</td><td>du</td><td>tekeniá:tien</td><td>two women sit</td></tr><tr><td>2nd</td><td>pl</td><td>sewá:tien</td><td>you all sit</td></tr><tr><td>1st incl</td><td>pl</td><td>iakwá:tiens</td><td>we all sit (inclusive)</td></tr><tr><td>3rd f</td><td>pl</td><td>koná:tiens</td><td>women sit</td></tr><tr><td>3rd m</td><td>pl</td><td>roná:tiens</td><td>men sit</td></tr></table>",
  "Note: Claude — before generating exercises for this lesson, verify the full paradigm forms for v01 against <strong>kanienkeha_data.js</strong> and the <strong>forms[]</strong> array in <strong>data_glossary.json</strong>. The table above uses standard Kanehsatà:ke/Kahnawà:ke forms. Do not invent forms not attested in the data files."
]
```

**Ped:**
```
"ped": "<strong>Complete paradigm as cognitive anchor:</strong> Mithun (1989): presenting the full paradigm as a unified object — rather than building it incrementally over many units — allows learners to perceive the system as a system. Nation (2001): productive control of a paradigm requires repeated production practice across all slots, not just the most frequent slots. This lesson is the first of several paradigm-consolidation lessons; it should be revisited after Units 14 (relational) and 15 (transitive) to see how the paradigm extends."
```

**Exercises:** Generate 8–10 exercises covering: production (type) of at least four different paradigm slots; recognition (mc) of paradigm structure; a match across at least six forms; one audio on an unfamiliar dual or plural form; one story on what it means to have a language where 'we' distinguishes inclusive/exclusive.

---

## Unit 10 — Direction Verbs and Location

**Unit-level metadata:**
```
id:    10
title: "Unit 10 — Direction Verbs and Location"
desc:  "Going, coming, returning. Where things are. Kanien'kéha territory in language."
```

### Lessons u_rw10l0 through u_rw10l6

**Sources and new intros:**

**u_rw10l0** — "Direction Verbs: Going and Coming"
Source: `u1l2`. Copy exercises verbatim.
New intro sentence to add at start: `"Direction verbs are among the first verbs children acquire in immersion programs. They describe movement through real space — the most immediate physical experience of daily life. You have the prefix system (Units 5–9); now apply it to the most fundamental motions."`

**u_rw10l1** — "Direction Vocabulary Extended"
Source: `u1l7`. Copy exercises verbatim.
No intro change needed — existing intro is well-framed.

**u_rw10l2** — "Locative Expressions: Where Things Are"
Source: `u23l0`. Copy exercises verbatim.
New intro sentence to add at start: `"Kanien'kéha locates things in space through a system of locative suffixes and particles — not through prepositions as in English. The locative tells you where something is <em>in relation to the speaker's position</em>."`

**u_rw10l3** — "Direction Verbs Extended + The Longhouse"
Source: `u23l1`. Copy exercises verbatim.
New intro sentence: `"The <strong>longhouse (kanonhséhsne)</strong> is the spatial anchor of Kanien'kehá:ka community life — politically, ceremonially, and linguistically. Direction verbs that orient toward the longhouse appear constantly in ceremony and governance speech."`

**u_rw10l4** — "Land Features and Place Names"
Source: `u23l2`. Copy exercises verbatim.
No intro change needed.

**u_rw10l5** — "Moving Through the Territory"
Source: `u23l3b`. Copy exercises verbatim.
No intro change needed.

**u_rw10l6** — "Kanehsatà:ke: Our Place on the Land"
Source: `u2l5`. Copy exercises verbatim.
New intro sentence: `"Place names in Kanien'kéha are not labels — they are descriptions. <em>Kanehsatà:ke</em> means 'at the top of the rapids'. <em>Kahnawà:ke</em> means 'at the rapids'. The land speaks its own history in the language."`

**Ped for all u_rw10 lessons (add to any that lack one):**
```
"ped": "<strong>Land-based language learning:</strong> Tuck & Yang (2012): language and land are inseparable in Indigenous communities — language carries the land's history and the community's relationship to it. Chew, Leonard & Rosenblum (2023): direction and locative vocabulary is not a grammar exercise; it is the language of living on a specific territory. Freire (1970): generative vocabulary should emerge from learners' lived geographical and social reality."
```

---

## Unit 11 — Articles, Greetings, Particles, and Conversation

**Unit-level metadata:**
```
id:    11
title: "Unit 11 — Articles, Greetings, and Real Conversation"
desc:  "Discourse particles, greetings, and everyday phrases — taught after the verb system, so they carry meaning in context."
```

### Lesson u_rw11l0 — "Articles and Greetings"
Source: `u2l2`. Copy exercises verbatim.
New intro: `"You now have a verb system, a pronoun system, and noun vocabulary. Greetings and articles are the connective tissue that holds these together in real conversation. <strong>Shé:kon</strong> is not just 'hello' — it means 'still / again / yet' — a greeting that says: you are still here, and so am I."`

### Lesson u_rw11l1 — "Everyday Conversation Phrases"
Source: `u8l4`. Copy exercises verbatim.
New intro: `"Conversational phrases feel most natural after the learner has a verb system to attach them to. <em>Sewatahonhsí:yo</em> (have a good day) contains verb morphology you now recognise. The phrase is not arbitrary — you can see it working."`

### Lesson u_rw11l2 — "Real Conversation"
Source: `u8l7`. Copy exercises verbatim.
No intro change needed — the existing 'Real Conversation' framing is appropriate here.

---

## Unit 12 — The Active/Stative Distinction: Naming the Pattern

**Unit-level metadata:**
```
id:    12
title: "Unit 12 — The Active/Stative Distinction"
desc:  "Naming the pattern you have been building since Unit 5. Active vs stative as a complete system."
```

### Lesson u_rw12l0 — "Active vs Stative: The Core Distinction"
Source: `u9l1`. Copy exercises verbatim.
New intro sentence to add at start: `"In Unit 7 you learned stative verbs and their wak- prefix. This lesson names what you have been doing: the <strong>active/stative distinction</strong> is the fundamental division in Kanien'kéha verb morphology. Every verb is either active (something happening) or stative (a state being experienced). This lesson makes that division explicit."`

### Lesson u_rw12l1 — "Active/Stative Review"
Source: `u9l_review`. Copy exercises verbatim.
No intro change needed.

---

## Unit 13 — Possessive Prefixes and Relational Nouns

**Unit-level metadata:**
```
id:    13
title: "Unit 13 — Possessive Prefixes: My, Your, His, Her"
desc:  "The possessive prefix system applied explicitly across noun classes."
```

### Lesson u_rw13l0 — "Possessive Prefixes: My and Your"
Source: `u7l6`. Copy exercises verbatim.
New intro sentence: `"You have been producing possessed forms since Unit 3 — <em>akista</em> (my mother), <em>ak-áhta'</em> (my shoe). This lesson makes the possessive prefix paradigm explicit: the same ak-/sk- (my/your) system applies to every noun class. You are not learning new prefixes — you are naming the pattern you have already been using."`

**Ped (update existing):**
```
"ped": "<strong>Explicit paradigm naming as consolidation:</strong> Nation (2001): explicit grammar instruction is most effective when it follows implicit pattern exposure — not before it. Learners who have encountered the possessive prefix on kinship terms (Unit 3), A-class nouns (Unit 6), and household vocabulary are now ready to name and generalise the pattern. Mithun (1982): the Kanien'kéha possessive prefix system is morphologically transparent and learnable as a unified paradigm."
```

---

*End of Appendix D.*
*Curriculum reorganization plan — complete draft.*
*Version: draft 1 — for review by learning designer before Claude implementation.*

---

# Appendix E: Remediation Plan — Reaching 8–10 Lessons and 8–10 Exercises Per Unit

**Purpose:** This appendix is the work order for a future Claude session. It specifies exactly what needs to be added to each under-built lesson and unit, grounded in the pedagogical frameworks from the README. It is organized by priority tier, then by unit, then by lesson. Each entry names: what exercise types to add, which framework justifies the addition, and what the exercise should accomplish.

---

## Pedagogical scaffolding logic (read before generating)

Every remediation exercise must serve one of the four LaFever Medicine Wheel domains. The gap analysis shows that `type` and `audio` (Physical domain) are missing from 77 and 46 lessons respectively — this is the most common deficit. `fill` (Mental → Physical bridge) is missing from 61 lessons. The pattern is consistent: existing lessons over-rely on `mc` (Mental recognition) and `story` (Emotional/Spiritual) but under-serve Physical production.

The remediation strategy for each exercise type follows directly from the frameworks:

**`type` exercises** (Physical — Nation 2001 "productive control")
Add when: the lesson has no production exercise. The learner must generate the target form from scratch, not just recognise it. Use the `wid` of the lesson's primary vocabulary item. `correct` must come from the glossary `target` field; `alts[]` must include all entries from `accepts[]`.

**`audio` exercises** (Physical — Krashen 1982 "comprehensible input includes pronunciation")
Add when: the lesson introduces a new vocabulary item or morphological form with a non-obvious pronunciation. `hint` must draw from `data_syllabary.json` tooltip fields. Never invent a phonological description. Audio exercises are especially critical in ceremony and oral tradition units (old U27, U28) where the acoustic register of language is part of its meaning.

**`fill` exercises** (Mental → Physical bridge — Nation 2001 "meaning in context")
Add when: the lesson has `mc` (recognition) but no sentence-completion exercise. The `sentence` field must use a real sentence from the lesson's `intro` or from an existing `mc` exercise's `correct` field. The blank (`___`) must isolate exactly one morpheme — prefix, suffix, or root — so the exercise tests pattern recognition, not guessing.

**`match` exercises** (Mental — Nation 2001 "semantic grouping")
Add when: the lesson introduces 4+ vocabulary items with no pairing exercise. `pairs[]` must use `target` values from the glossary exactly. Match exercises are especially effective for dialect pairs (r/l, i/y variants) and for active/stative pairs on the same root.

**`mc` (structural reflection)** (Mental + Emotional — Flores & Rosa 2015; Mithun 1989)
Add when: a lesson lacks a question that asks the learner to notice a pattern or a sociolinguistic/political dimension. These are not knowledge-check questions — they ask "why does this work this way?" or "what does this choice tell you about the language?" One per lesson minimum (already present in most; add only where missing).

**`story` exercises** (Emotional + Spiritual — Freire 1970; Maracle 1993; LaFever 2016)
Every lesson already has one. Do not add a second unless the lesson has 10+ exercises and the content specifically warrants a second reflection point (ceremony, oral tradition, grief/reclamation themes from Maracle).

**Lesson gaps (units below 8 lessons)**: New lessons must follow the same topic logic as existing lessons in the unit. The new lesson titles suggested below are pedagogically motivated — they fill genuine content gaps, not arbitrary slots. Each suggested new lesson includes a topic, the primary vocabIds to draw from the glossary, and the framework justification.

---

## Priority Tier 1 — Grammar units: highest structural impact

These units are the engine of the verb system. Under-built grammar lessons create compounding gaps downstream — learners who don't consolidate the habitual, the relational prefix, or the transitive object prefix will struggle in every subsequent unit. Fix these first.

---

### New Unit 8 (old U18) — Tense, Aspect & Mood
**Current:** 6 lessons, all at 5 exercises. **Target:** 8 lessons, 8 exercises each.
**Exercises to add per existing lesson:**

`u18l0` — Time in the Verb (5 ex: mc, match, mc, mc, story)
- Add: `fill` — sentence with aspect marker blank: "Ká:tiens — I sit (habitual). Ka___ — I sat (completed)." Tests the slot where the aspect suffix goes. Framework: Nation (productive control precedes narrative use).
- Add: `type` — "How do you say 'you ran' (completed past)? Use the root -aráhtat-." Framework: Nation (physical production of aspect-marked forms).
- Add: `audio` — pronunciation of a completed-past form showing vowel/suffix change. Framework: Krashen (phonological comprehensible input).

`u18l1` — The Completed Past (5 ex: mc, mc, mc, fill, story)
- Add: `match` — pairs of habitual ↔ completed forms on 3 roots: sit/sat, run/ran, make/made. Framework: Nation (contrastive semantic grouping reveals the pattern).
- Add: `type` — produce the completed past of fe01 (to make) in first person. Framework: Nation (productive control; fe01 is the highest-frequency Fake E-stem).
- Add: `audio` — completed past form pronunciation; the suffix change often affects vowel length. Framework: Krashen.

`u18l2` — The Future and Intentional (5 ex: mc, match, mc, fill, story)
- Add: `type` — "How do you express 'I will go'?" Uses dv02 + future prefix. Framework: Nation.
- Add: `audio` — future prefix pronunciation (wa'k- or similar; verify in kanienkeha_data.js before generating). Framework: Krashen.
- Add: `fill` — sentence with future prefix blank. Framework: Nation (Mental → Physical bridge).

`u18l3` — Conditional and Hypothetical (5 ex: mc, mc, mc, mc, story)
- Add: `match` — particle pairs: tánon (and), tsi (when/where), ki' (just/only), onen' (now/then) paired to their English meanings. Framework: Nation (semantic grouping of discourse particles).
- Add: `fill` — conditional sentence with particle blank: "___ tsi wá:ke, sá:tien." (When I go, you sit.) Framework: Nation.
- Add: `type` — produce a conditional sentence using pc03 (tsi). Framework: Nation (productive sentence-level control).

`u18l4` — Talking About the Past: Narratives (5 ex: mc, mc, mc, match, story)
- Add: `fill` — narrative sentence with past marker blank. Framework: Nation.
- Add: `type` — produce a two-clause narrative sentence (subject + completed verb + location). Framework: Nation (sentence-level productive control; builds toward Unit 17 Complex Sentences).
- Add: `audio` — a full narrative sentence spoken aloud; hint emphasises prosody across clause boundaries. Framework: Krashen.

**New lessons needed (2):**

`u18l6` — "Aspect in Ceremony: The Thanksgiving Address Revisited" (new)
- Topic: Re-encounter the Thanksgiving Address (ta01) through the aspect lens. Which verbs in the Address are habitual? Which are stative? Identify aspect marking in the text learners already know.
- vocabIds: ta01, ta02, ta03, ta04, v01, fe01, ov01, ov03
- Frameworks: McCarty & Lee (revitalization through ceremony); Chew et al. (ceremony as primary text, not supplement). LaFever (Spiritual domain: aspect as meaning in sacred context).
- Exercise types required: mc, mc, match (habitual vs stative forms), fill, audio, story

`u18l7` — "Aspect and Identity: Habitual as Who We Are" (new)
- Topic: The habitual aspect in Kanien'kéha does not just describe repeated actions — it describes practices, identities, commitments. "katkáhthons" is not just "I listen sometimes" — it is "I am one who listens."
- vocabIds: v05, av05, av06, av07, st01, st02
- Frameworks: Maracle (1993) — language as identity reclamation; Freire (1970) — generative theme: who are you through what you do habitually?; LaFever (Emotional domain).
- Exercise types required: mc (structural: what does habitual aspect mean beyond repetition), match, fill, type, audio, story

---

### New Unit 12 (old U9) — Active/Stative Distinction
**Current:** 5 lessons, 6 exercises each. **Target:** 8 lessons, 8 exercises each.
**Exercises to add per existing lesson:**

`u9l1` — Active vs Stative (6 ex: mc, mc, match, mc, mc, story)
- Add: `fill` — sentence with stative prefix blank: "___hterón:ni" (I am afraid — insert wak-). Framework: Nation.
- Add: `type` — produce the stative form of st02 (angry) in first person. Framework: Nation.
- Add: `audio` — wak- prefix pronunciation; the kh cluster is non-obvious for English speakers. Framework: Krashen.

`u9l2` — The Habitual (6 ex: mc, match, mc, mc, fill, story)
- Add: `type` — produce habitual form of av05 (eat) in second person. Framework: Nation.
- Add: `audio` — habitual -s suffix in context; the s voices differently before certain roots. Framework: Krashen.

`u9l3` — Full Paradigm Practice (6 ex: mc, match, mc, mc, fill, story)
- Add: `type` — produce third-person-masculine habitual form of v01. Framework: Nation (full-paradigm productive control).
- Add: `audio` — third-person prefix ra- pronunciation (alveolar flap; Akwesasne l-form). Framework: Krashen + García & Li Wei (dialect as asset).

`u9l4` — Commands Revisited (7 ex: mc, mc, match, mc, fill, dialogue, story)
- Add: `type` — produce the plural command form of av06 (walk). Framework: Nation.

`u9l_review` — Review (6 ex: match, mc, mc, fill, audio, story)
- Add: `type` — free production: "Write one sentence in the habitual and one in the stative about yourself." Framework: Freire (generative theme: who you are).
- Add: `mc` (structural reflection) — "The habitual and stative use different prefix sets. What does this reveal about how Kanien'kéha organises the relationship between a person and an action?" Framework: Mithun + Flores & Rosa (language as ontology, not just grammar).

**New lessons needed (3):**

`u9l5` — "Noticing Stative Verbs in Context" (new)
- Topic: Return to vocabulary from Units 3–6 and identify which items are stative. The learner has seen par16 (it is cold), par17 (it is hot), par22 (it is good), par23 (it is bad) — these are stative quality particles. Connect them to the stative prefix system.
- vocabIds: par16, par17, par22, par23, st01, st02, st03, st04
- Frameworks: Krashen (noticing: grammar understood inductively through familiar vocabulary); Nation (spaced retrieval of earlier vocabulary in new structural context).
- Exercise types: mc, match (stative particles ↔ stative verbs), fill, type, audio, story

`u9l6` — "Asking How Someone Is: Stative in Conversation" (new)
- Topic: The stative system is the grammar of "how are you?" conversations. Introduce the question-answer patterns using stative verbs: How are you? I am well/tired/afraid. This connects grammar to immediate communicative function.
- vocabIds: st04, st05, st06, st07, par22, g01, g02, ph03
- Frameworks: Krashen (functional communicative context makes grammar comprehensible); Freire (generative theme: daily emotional life).
- Exercise types: mc, match, fill, type, audio, dialogue, story

`u9l7` — "Active and Stative in the Same Sentence" (new — pre-empts u21l1 but at lower complexity)
- Topic: A short sentence using both: "I sit (active) and I am afraid (stative)." The two prefix sets appear side by side. This is the earliest point at which the learner can see the distinction in natural syntax.
- vocabIds: v01, st01, st02, pc01
- Frameworks: Mithun (1989) — active/stative in clause structure; Nation (productive sentence-level control).
- Exercise types: mc, match, fill, type, audio, story

---

### New Unit 14 (old U10) — Relational Prefixes
**Current:** 6 lessons, 5–7 exercises each. **Target:** 8–9 lessons, 8 exercises each.
**Exercises to add per existing lesson:**

`u10l1` — What Is a Relational Prefix? (5 ex: mc, mc, mc, mc, story)
- Add: `match` — pairs of subject-only vs relational forms of v01: "I sit" ↔ "I sit with her". Framework: Nation (contrastive pairing reveals the prefix function).
- Add: `fill` — sentence with relational prefix slot blank. Framework: Nation.
- Add: `type` — produce one relational form from the lesson vocabulary. Framework: Nation.

`u10l2` — He Sees Her / She Sees Him (6 ex: mc, match, mc, fill, audio, story)
- Add: `mc` (structural reflection) — "In English, 'he sees her' and 'she sees him' are different word orders. In Kanien'kéha, how does the language encode this difference?" Framework: Mithun (relational prefix as directional encoding); Flores & Rosa (Kanien'kéha encodes social direction with structural precision English does not).
- Add: `type` — produce "she sees him" from scratch. Framework: Nation.

`u10l3` — He Helps Her / She Helps Him (5 ex: mc, mc, match, mc, story)
- Add: `fill` — relational helping verb with prefix blank. Framework: Nation.
- Add: `type` — produce the reverse direction (she helps him → he helps her). Framework: Nation (productive control of directionality).
- Add: `audio` — relational prefix pronunciation; the prefix cluster is phonologically complex. Framework: Krashen.

`u10l4` — Love, Knowledge & Memory (6 ex: mc, match, mc, mc, fill, story)
- Add: `type` — produce "I know her" using the relational prefix + st06/st07 root. Framework: Nation.
- Add: `audio` — stative relational form pronunciation. Framework: Krashen.

`u10l5` — Teaching and Learning (7 ex: mc, match, mc, mc, fill, dialogue, story)
- Add: `type` — produce "she teaches him" from the lesson vocabulary. Framework: Nation.

`u10l_review` — Review (6 ex: match, mc, mc, fill, audio, story)
- Add: `type` — produce two relational sentences from scratch (one in each direction). Framework: Nation (productive control as unit exit standard).
- Add: `mc` (structural + political) — "Relational prefixes encode direction: A acts on B vs B acts on A. What does it say about a language that it requires you to know the direction of every action before you speak?" Framework: Flores & Rosa; Mithun (relational morphology as social precision).

**New lessons needed (2):**

`u10l6` — "Reciprocal Actions: Each Other" (new)
- Topic: The reciprocal/mutual relational prefix — when both parties act on each other simultaneously. "We see each other." This is grammatically distinct from "he sees her and she sees him" (sequential). The reciprocal is a single verb form.
- vocabIds: p07, p09 (dual pronouns — reciprocal is common in dual contexts), plus relational forms from previous lessons
- Frameworks: Mithun (1989) — reciprocal morphology in Iroquoian languages; Nation (paradigm completion: the relational paradigm is incomplete without the reciprocal).
- Exercise types: mc, mc, match, fill, type, audio, story

`u10l7` — "Relational Verbs in Cultural Context: Teaching and Transmission" (new)
- Topic: The language of teaching, learning, and transmission — rakenohá:'a (my uncle) teaches me; the Clan Mother speaks to the community. Relational verbs are the grammar of cultural transmission. Connect to the revitalization context.
- vocabIds: gr05, gr06, gr07, gr08, le04, kin04, ta01
- Frameworks: McCarty & Lee (language revitalization as relational practice — transmission requires a teacher and a learner, and the grammar encodes both); Maracle (1993) (learning Kanien'kéha is itself a relational act); LaFever (Spiritual domain: transmission as ceremony).
- Exercise types: mc, match, fill, type, audio, dialogue, story

---

### New Unit 15 (old U17) — Transitive Verbs & Object Agreement
**Current:** 6 lessons, 5–6 exercises each. **Target:** 8 lessons, 8 exercises each.
**Exercises to add per existing lesson:**

`u17l0` — What Is a Transitive Verb? (5 ex: mc, match, mc, mc, story)
- Add: `fill` — intransitive → transitive sentence pair with object prefix blank. Framework: Nation.
- Add: `type` — produce the transitive form of fe01 (to make) with a him-object prefix. Framework: Nation.
- Add: `audio` — object prefix pronunciation on a transitive verb. Framework: Krashen.

`u17l1` — Object Prefixes (6 ex: mc, match, mc, fill, mc, story)
- Add: `type` — produce "I make it" and "I make him" as a minimal pair showing the prefix change. Framework: Nation (minimal pair as pattern isolator).
- Add: `audio` — the it-object prefix pronunciation (often zero or a vowel change). Framework: Krashen.

`u17l2` — Seeing, Giving, Telling (6 ex: mc, match, mc, mc, fill, story)
- Add: `type` — produce "she told him" from cv05 or similar. Framework: Nation.
- Add: `audio` — a full transitive sentence with all three components (subject prefix + root + object agreement). Framework: Krashen.

`u17l3` — Building Transitive Sentences (6 ex: mc, mc, mc, match, fill, story)
- Add: `type` — produce a transitive sentence from a supplied subject + verb + object prompt. Framework: Nation (sentence-level productive control).
- Add: `audio` — full transitive sentence. Framework: Krashen.

`u17l4` — Asking Transitive Questions (5 ex: mc, match, mc, fill, story)
- Add: `type` — produce a transitive question using par10 (who) as the object. Framework: Nation.
- Add: `audio` — question intonation in Kanien'kéha (rising vs falling; verify in data_syllabary.json). Framework: Krashen.
- Add: `mc` (structural reflection) — "In a transitive question like 'who sees her?', the object (her) is marked in the verb prefix. How does this change what the question word 'who' does?" Framework: Mithun (question formation in polysynthetic languages).

**New lessons needed (2):**

`u17l6` — "Transitive Verbs in Daily Conversation" (new)
- Topic: High-frequency transitive verbs in everyday contexts: giving food, seeing family members, telling stories. The lesson focuses on naturalising transitive production, not introducing new grammatical concepts.
- vocabIds: cv05 (to see), fe01 (to make/do), and 4–5 food/kinship vocabIds from earlier units (fo05, k01, k04, ta01)
- Frameworks: Krashen (comprehensible input: new grammar in familiar semantic contexts); Nation (spaced retrieval of prior vocabulary in new grammatical frame).
- Exercise types: mc, match, fill, type, audio, dialogue, story

`u17l7` — "What Are You Making? Transitive Verbs and Craft" (new)
- Topic: Connect transitive verb production to the craft vocabulary from Unit 26 (Making & Building). "She is making a basket." "He is weaving." Transitive verbs are the grammar of making things.
- vocabIds: fe01, fe02, ka01, ka03 (basket-related Ka-class nouns), cv01, t01, t02
- Frameworks: Chew, Leonard & Rosenblum (2023) — material culture and language are inseparable; craft vocabulary as primary not supplementary; Freire (generative theme: what you make is who you are).
- Exercise types: mc, match, fill, type, audio, story

---

### New Unit 17 (old U20) — Complex Sentences
**Current:** 4 lessons, 5–7 exercises. **Target:** 8 lessons, 8 exercises each.
**Exercises to add per existing lesson:**

`u20l0` — Combining Sentences (7 ex: mc, mc, match, fill, type, audio, story)
- Add: `mc` (structural) — "English uses 'and', 'but', 'because' as separate words between sentences. Kanien'kéha uses particles. What is the difference?" Framework: Mithun; Flores & Rosa.

`u20l1` — Relative Clauses (7 ex: mc, match, mc, fill, type, audio, story)
- Add: `mc` (structural) — "In the phrase 'the bear that runs', the relative clause describes the bear. Which particle or morpheme marks the relative clause in Kanien'kéha?" Framework: Mithun.

`u20l2` — Causal and Purposive Clauses (7 ex: mc, mc, match, fill, type, audio, story)
- Add: `mc` (structural) — "A purposive clause expresses purpose: 'I sit in order to listen.' How does Kanien'kéha express purpose: through a particle, a verb suffix, or a prefix?" Framework: Mithun.

`u20l3` — Review (5 ex: match, mc, mc, fill, story)
- Add: `type` — produce a complex sentence with a relative clause. Framework: Nation.
- Add: `audio` — complex sentence with clause boundary; how does prosody mark the boundary? Framework: Krashen.
- Add: `mc` (reflection) — "You have now combined sentences, formed relative clauses, and expressed cause/purpose. What communicative possibilities does this open that single sentences could not?" Framework: Freire (language as meaning-making capacity).

**New lessons needed (4):**

`u20l4` — "Temporal Clauses: When and Until" (new)
- Topic: Temporal clause particles — onen' (now/then), tsi (when/at), and the concept of sequence in narrative. When does event A happen relative to event B?
- vocabIds: pc03, pc05, onen', and 3–4 verb roots from Units 5–8
- Frameworks: Mithun (1999) — temporal deixis in aspect-prominent languages; Nation (sentence-level productive control).
- Exercise types: mc, match, fill, type, audio, story

`u20l5` — "Reported Speech: Saying What Someone Said" (new)
- Topic: Quoting or reporting what someone else said. Kanien'kéha has specific structures for reported speech; this lesson introduces them through familiar cultural contexts (elder speech, ceremony).
- vocabIds: ta01, gr05, gr07, le04, plus relational verbs from Unit 14
- Frameworks: McCarty & Lee (oral transmission is relational; reported speech is the grammar of story-telling); Chew et al.
- Exercise types: mc, mc, match, fill, type, audio, story

`u20l6` — "Negation in Complex Sentences" (new)
- Topic: How to negate a clause within a complex sentence — which element takes the negation, and what changes.
- vocabIds: g06, pc01, pc03, pc04, plus 4 verb roots
- Frameworks: Nation (productive control of negation in complex sentences); Krashen (input: negation in context is more acquisible than isolated negation drills).
- Exercise types: mc, match, fill, fill, type, audio, story

`u20l7` — "Complex Sentences in the Thanksgiving Address" (new)
- Topic: Return to the Thanksgiving Address and identify its complex sentence structures. The Address uses relative clauses, causal clauses, and reported speech. Learners apply their new grammar knowledge to a text they already know.
- vocabIds: ta01, ta02, ta03, ta04, na02, fo05, na06
- Frameworks: Chew et al. (ceremony as primary text); McCarty & Lee (revitalization means using the language, not just analysing it); LaFever (Spiritual domain: grammar in ceremony).
- Exercise types: mc, mc, match, fill, audio, story (two reflection prompts warranted here)

---

### New Unit 18 (old U21) — Grammar in Action
**Current:** 5 lessons, 5–7 exercises. **Target:** 8 lessons, 8 exercises each.
**Exercises to add per existing lesson:**

All five existing lessons (u21l0–u21l4) have 5–7 exercises and are missing `type` in most cases. Add the following to each:

`u21l0` — The Verb System: A Map (7 ex: mc, match, mc, fill, type, audio, story)
- Add: `mc` (reflection) — "You have now learned A-stem, C-stem, I-stem, E-stem (true and fake), O-stem, stative, direction, relational, and transitive verbs. What is the single prefix system that connects all of them?" Framework: Mithun (the prefix paradigm as unifying architecture).

`u21l1` — Active and Stative in the Same Sentence (7 ex: mc, mc, match, fill, type, audio, story)
- Add: `mc` (structural) — "When active and stative verbs appear in the same sentence, what determines their order?" Framework: Mithun.

`u21l2` — Aspect in Narrative (7 ex: mc, match, mc, fill, type, audio, story)
- Add: `mc` (reflection) — "A narrative in Kanien'kéha uses habitual for background and completed for foregrounded events. How is this different from English past tense?" Framework: Mithun (1999).

`u21l3` — Full Verb System Practice (7 ex: mc, mc, mc, fill, type, audio, story)
- Add: `match` — 6 verb forms from across all stem classes paired to their English equivalents. Framework: Nation (cross-class spaced retrieval).

`u21l4` — Review (5 ex: match, mc, mc, fill, story)
- Add: `type` — produce a 2-clause sentence with one active and one stative verb. Framework: Nation.
- Add: `audio` — the full sentence from the type exercise spoken aloud. Framework: Krashen.
- Add: `mc` (political/cultural) — "You have now completed the full Kanien'kéha verb system. Brian Maracle writes that learning this system as an adult, when you should have learned it as a child, is both grief and liberation. What does that mean to you?" Framework: Maracle (1993); LaFever (Emotional + Spiritual).

**New lessons needed (3):**

`u21l5` — "Verb System in Story: Narrating a Full Scene" (new)
- Topic: Learners produce a short narration (5–6 sentences) using at least three verb classes, one aspect shift, and one relational verb. This is the first open-ended production task in the curriculum.
- vocabIds: v01, v03, fe01, st01, dv01, p01, p02, p04, k01
- Frameworks: Nation (productive control as unit-exit standard); Freire (meaning-making through narrative); LaFever (Physical + Emotional domain integration).
- Exercise types: mc (model narration analysis), match (verb class identification in a text), fill, type, type (two production exercises), audio, story

`u21l6` — "The Verb System and Language Revitalization" (new)
- Topic: Explicitly connect the verb system to the revitalization context. The verb system was the primary target of colonial suppression — residential schools focused on preventing children from speaking the verb forms that carry social meaning (relational, ceremonial, transitive). Knowing the verb system is a political act.
- vocabIds: gr08 (language revitalization vocabulary), ex10, ta01, le05
- Frameworks: Tuck & Yang (2012) — revitalization as material and political; McCarty & Lee (sovereignty through language); Flores & Rosa (the verb system is not 'complex' — it is precisely structured and was deliberately suppressed); LaFever (Spiritual domain).
- Exercise types: mc, mc, mc (three structural-political reflections), match, fill, audio, story

`u21l7` — "Unit 18 Synthesis Review" (new)
- Topic: Cross-unit review integrating vocabulary and structures from Units 8, 12, 14, 15, 17, and 18. This is the capstone of Stage 3 (Relational and Transitive).
- vocabIds: v01, fe01, st01, dv01, cv05, ov01, p01, p04, ta01
- Frameworks: Nation (spaced retrieval across multiple encounter contexts); Mithun (the full verb system as a unified architecture).
- Exercise types: match (verb class identification), mc, mc, fill, fill, type, audio, story

---

## Priority Tier 2 — Cultural depth units: content gaps and exercise shortfalls

These units (old U27, U28, and parts of U24–U26) have both lesson count gaps and pervasive exercise shortfalls. The content is spiritually and culturally significant — the exercise deficit here has the highest LaFever (Spiritual domain) cost.

---

### New Unit 30 (old U27) — Oral Tradition
**Current:** 5 lessons, 3–4 exercises each. **Target:** 8 lessons, 8 exercises each.
**Pattern:** Every lesson is mc/match/story only — missing fill, type, audio throughout.

For each existing lesson, add the following (framework: Krashen — oral tradition requires acoustic engagement; Nation — productive control even at advanced levels; McCarty & Lee — revitalization means using, not just appreciating):

`u27l0` — The Storytelling Season (4 ex)
- Add: `fill` — complete a sentence about the storytelling season using na06 (winter) or na09 (autumn). Framework: Nation.
- Add: `type` — "In which season is storytelling traditionally practiced? Name it in Kanien'kéha." Framework: Nation.
- Add: `audio` — pronunciation of na06 (winter) and the story-season phrase. Framework: Krashen.
- Add: `match` — seasons paired to their traditional cultural activities. Framework: Nation (semantic grouping).

`u27l1` — The Creation Story (4 ex)
- Add: `fill` — creation story sentence with key vocabulary blank (env13 = sky, na02 = earth). Framework: Nation.
- Add: `type` — "How do you say 'the earth' in Kanien'kéha?" Framework: Nation.
- Add: `audio` — pronunciation of env13 (sky/heaven) and na02 (earth) — both carry long vowels and stress patterns critical to meaning. Framework: Krashen.
- Add: `mc` (structural) — "The creation story describes Sky Woman falling from the sky world. Which vocabulary item from this lesson names her origin point?" Framework: Chew et al. (cosmology as primary text).

`u27l2` — Legendary Beings (4 ex)
- Add: `fill` — legendary being name + description blank. Framework: Nation.
- Add: `type` — produce the name of one legendary being from memory. Framework: Nation.
- Add: `audio` — pronunciation of le09, le10, or le16 (legendary being names); these are often long compound forms. Framework: Krashen.
- Add: `mc` (cultural) — "Legendary beings in Kanien'kéha oral tradition are not just characters — they carry moral and cosmological teachings. What does the name of [le09 or le16] mean literally?" Framework: McCarty & Lee; Chew et al.

`u27l3` and `u27l3b` — Reviews (3–4 ex each)
- Consolidate into a single review lesson with 8 exercises: match (beings to their domains), mc (creation story sequence), fill (key vocabulary), type (produce two oral tradition vocabulary items), audio (pronunciation of the most complex form in the unit), story (two reflection prompts: one personal, one political — Tuck & Yang: oral tradition as sovereignty).
- Remove the duplicate review (u27l3 and u27l3b are near-identical; replace with one consolidated lesson).

**New lessons needed (3):**

`u27l4` — "Sky World and the Turtle's Back: Creation Narrative Vocabulary" (new)
- Topic: Deeper vocabulary for the creation story — sky world, turtle, muskrat, the tree of light. These are the cosmological anchors of Kanien'kehá:ka worldview.
- vocabIds: env13, na02, wa02 (turtle), wa12 (muskrat), na05 (mountains — from the growing island)
- Frameworks: Chew et al. (cosmology as primary text); Tuck & Yang (oral tradition as sovereignty, not folklore).
- Exercise types: mc, mc, match, fill, type, audio, story

`u27l5` — "The Peacemaker and the Great Law: Narrative Vocabulary" (new)
- Topic: The founding narrative of the Haudenosaunee Confederacy — Deganawi:dah, the Peacemaker, bringing the Great Law of Peace. This narrative is inseparable from the political structure of Haudenosaunee governance and appears in ceremony.
- vocabIds: le05 (Great Law vocabulary), le09, le10, ta01, cu01 (longhouse)
- Frameworks: McCarty & Lee (sovereignty is encoded in oral tradition); Chew et al.
- Exercise types: mc, mc, match, fill, type, audio, story

`u27l6` — "Telling a Story: Oral Tradition as Living Practice" (new)
- Topic: The learner practises being a storyteller, not just a student of story. Vocabulary for the act of telling: "I am telling you," "listen," "long ago," "it is said that." The lesson treats oral tradition as a practice the learner can participate in, not just receive.
- vocabIds: v05 (listen), ta01, le05, na06, pc04, pc05, gr05
- Frameworks: Freire (learner as meaning-maker, not recipient); Maracle (1993) (reclaiming the storyteller role is part of language reclamation); LaFever (Spiritual domain: telling is ceremony).
- Exercise types: mc, match, fill, type, audio, dialogue, story

---

### New Unit 31 (old U28) — Ceremony in Language
**Current:** 5 lessons, 3–4 exercises each, with two duplicate review lessons.
**Pattern:** Same deficit as Oral Tradition — mc/story only, missing fill, type, audio.

Apply the same exercise-addition logic as Unit 30 to each existing lesson:

`u28l0` — Ceremonial Language (4 ex) → add: fill, type, audio, match
`u28l1` — Songs and Singing (4 ex) → add: fill, type, audio, mc (cultural)
`u28l2` and `u28l3` — duplicate reviews → consolidate into one lesson with 8 exercises
`u28l2b` — The Language of Prayer (4 ex) → add: fill, type, audio, match

**New lessons needed (3):**

`u28l3_new` — "The Language of the Longhouse: Ceremonial Roles" (new)
- Topic: The vocabulary of who does what in a ceremonial gathering — the speaker (rotiyanér:shon), the faithkeeper, the doorkeeper. The ceremonial register requires specific relational verbs and honorifics.
- vocabIds: le04, cu04, cu05, le06, ta01, cu13, cu14
- Frameworks: McCarty & Lee; Chew et al. (ceremony as primary language context); LaFever (Spiritual domain).
- Exercise types: mc, mc, match, fill, type, audio, story

`u28l4` — "Condolence and Renewal: The Language of Loss" (new)
- Topic: Condolence ceremony vocabulary — one of the most linguistically rich ceremonial contexts in Kanien'kehá:ka life. The Three Bare Words of Condolence; the language of grief and restoration.
- vocabIds: le09, le17, ta01, ta02, cu05, le05
- Frameworks: Maracle (1993) — language reclamation includes reclaiming the language of grief; LaFever (Emotional + Spiritual); Tuck & Yang (colonial loss is part of this context).
- Exercise types: mc, mc, mc (three reflection exercises — this topic warrants a heavier reflective load), match, audio, story

`u28l5` — "Ceremony as Language Learning" (new)
- Topic: Capstone lesson for the ceremony unit and for the Stage 4 cultural depth sequence. The learner reflects on what it means that ceremony is not an advanced topic — it is the beginning and the end of meaning in Kanien'kéha. Connect to the Ohén:ton Karihwatéhkwen from Unit 4 and ask: what has changed since then?
- vocabIds: ta01, ta02, ta03, ta04, na02, na06, v05, st04
- Frameworks: All frameworks active; Chew et al. most prominent (ceremony as primary, not supplement); Maracle (grief and reclamation as unified experience); LaFever (all four domains explicitly present).
- Exercise types: mc, match, fill, type, audio, story, story (second story exercise warranted as capstone reflection)

---

## Priority Tier 3 — Secondary lessons throughout Units 1–16

202 lessons need exercises added. After Tiers 1 and 2, the remaining work is systematic: most secondary lessons (the `b`-suffix and expansion lessons) need exactly the same three exercise types added — `fill`, `type`, and `audio` — using the vocabIds already listed in each lesson.

Rather than specifying every lesson individually, the following rules cover the entire tier. A future Claude session should apply them in unit order.

---

### Tier 3 rules for exercise addition

**Rule A — Any lesson with 4 exercises and no `fill`, `type`, or `audio`:**
Add all three. Derive the `fill` from the lesson's primary vocabId — use the `target` field in a sentence blank. Derive the `type` from the same vocabId — ask the learner to produce it from scratch. Derive the `audio` from the `data_syllabary.json` tooltip fields for the most phonologically complex sound in the `target`. This brings the lesson to 7 exercises; then apply Rule C.

**Rule B — Any lesson with 5–6 exercises missing `type`:**
Add one `type` exercise targeting the lesson's primary vocabId. This is the most common single gap (77 lessons). The `correct` must be the `target` field value; `alts[]` must include the full `accepts[]` array from the glossary entry. Framework: Nation (productive control).

**Rule C — Any lesson that reaches 7 exercises after Rules A/B but needs one more:**
Add an `mc` (structural reflection) question. The question should ask the learner to notice a morphological pattern, a cultural dimension, or a sociolinguistic fact about the vocabulary in the lesson. It must not be a knowledge-check question — it should have no single "correct" answer from a vocabulary list, but a conceptual answer about how the language works. Framework: Flores & Rosa; Mithun; LaFever (Mental + Emotional domain).

**Rule D — Review lessons (all currently 4–6 exercises):**
Review lessons serve consolidation, not introduction. They should reach 8 exercises through: 2 `match` exercises (cross-lesson pairing), 1 `fill`, 1 `type`, 1 `audio` (on the most phonologically complex item reviewed), 1 `mc` (structural reflection on what connected the unit's lessons), 1 `mc` (cultural/political reflection appropriate to the unit's content), 1 `story` (already present in most). Do not add vocabulary not introduced in the unit. Framework: Nation (spaced retrieval); LaFever (all four domains in the review).

**Rule E — "Welcome" orientation lessons (u3l_welcome, u4l_welcome):**
These are currently 2–3 exercises and serve as unit introductions, not vocabulary instruction. They should reach 5 exercises (not 8 — they are a special case). Add: 1 `match` (preview of the unit's key vocabulary pairs), 1 `audio` (pronunciation of the unit's most prominent new sound or vocabulary item), 1 `mc` (framing question: "What do you expect to find in this unit? What do you already know about this topic?"). This makes them pedagogically intentional rather than passive. Framework: Krashen (schema activation before input); LaFever (Emotional domain: anticipation and connection).

---

## Tier 3 application order (work queue for Claude)

Process units in this order, applying Tier 3 rules:

1. Old U0 (new U2) — lessons u0l5, u0l6, u0l7, u0l8
2. Old U1 (new U3) — lessons u1l3, u1l4, u1l5, u1l6, u1l7, u1l8
3. Old U2 (new U6) — lessons u2l6, u2l7, u2l9, u2l8
4. Old U3 (new U21) — lessons u3l_welcome (Rule E), u3l3, u3l4, u3l6
5. Old U4 (new U4) — lessons u4l_welcome (Rule E), u4l1, u4l2, u4l3, u4l4, u4l5, u4l6
6. Old U5 (new U24) — lessons u5l7, u5l4, u5l5, u5l6, u5l8
7. Old U6 (new U25) — lessons u6l6, u6l7, u6l8, u6l9
8. Old U7 (new U7) — lessons u7l3, u7l4, u7l5, u7l6, u7l7, u7l8
9. Old U8 (new U9) — lessons u8l5, u8l6, u8l7, u8l8, u8l9
10. Old U11 (new U19) — lessons u11l0–u11l11, u11l_review (13 lessons; most need only 1–2 exercises added)
11. Old U12 (new U20) — lessons u12l0–u12l_review (14 lessons; same pattern)
12. Old U13 (new U22) — lessons u13l0–u13l_review (12 lessons)
13. Old U14 (new U26) — lessons u14l0–u14l9 (10 lessons)
14. Old U15 (new U27) — lessons u15l0–u15l_review (13 lessons)
15. Old U16 (new U23) — lessons u16l1–u16l_review (10 lessons)
16. Old U19 (new U16) — lessons u19l0–u19l_review (13 lessons)
17. Old U22 (new U21) — lessons u22l0–u22l_review (12 lessons)
18. Old U24 (new U29) — lessons u24l1–u24l3
19. Old U25 (new U28) — lessons u25l1–u25l3
20. Old U26 (new U25) — lessons u26l2–u26l3
21. Old U29 (new U32) — lessons u29l0, u29l4, u29l5, u29l6, u29l10, u29l_review

---

## Summary table: full gap remediation

| Gap type | Count | Approach |
|---|---|---|
| Units below 8 lessons | 12 units | Add 2–4 new lessons per unit (Tiers 1–2 above); total ~30 new lessons |
| Lessons below 8 exercises | 202 lessons | Add 1–4 exercises per lesson (Tiers 1–3 rules); total ~492 exercises |
| Missing `type` exercises | 77 lessons | Rule B (Tier 3) + explicit adds in Tier 1 |
| Missing `audio` exercises | 46 lessons | Rule A (Tier 3) + explicit adds in Tier 1; always use syllabary tooltips |
| Missing `fill` exercises | 61 lessons | Rule A/B (Tier 3) + explicit adds in Tier 1 |
| Missing `match` exercises | ~25 lessons | Rule A (Tier 3) + new lessons in Tiers 1–2 |
| Duplicate review lessons | 4 cases (u27l3/3b, u28l2/l3) | Consolidate into single lesson with 8 exercises |
| Welcome lessons (2 ex) | 2 lessons | Rule E (target: 5 exercises, not 8) |

**Estimated total work:** ~30 new lessons + ~492 exercises added to existing lessons. At a rate of one unit per Claude session (reading data files + generating conforming JSON), this is approximately 20–25 sessions of focused implementation work.

---

## Session workflow for implementation

When a future Claude session begins remediation work on a specific unit:

1. Read the session-start checklist (Appendix C).
2. Read `data_units.json` and locate the target unit.
3. Read `data_glossary.json` entries for all `vocabIds` in the target lessons.
4. Check `data_variants.json` for any vocabId in the target lesson.
5. Read `data_syllabary.json` for any `audio` exercise you are about to write.
6. Apply the relevant Tier rules or new-lesson spec from this appendix.
7. Output the modified lesson as valid JSON conforming to the existing schema.
8. Do not modify any existing exercise — only append new exercises to the `exercises` array.
9. Confirm exercise count reaches 8 before moving to the next lesson.

---

*End of Appendix E.*
*Curriculum reorganization and remediation plan — complete draft.*
*Version: draft 1 — for review by learning designer before Claude implementation.*

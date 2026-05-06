# CLAUDE.md — Kanien'kéha App: AI Session Context

Upload this file at the start of any Claude session. It replaces having to
paste README sections, schemas, or line-number guides. Keep it up to date
when schemas or section positions change.

---

## Project overview

A client-side Kanien'kéha (Mohawk) language-learning app. No backend.
All content lives in JSON files loaded at runtime. The app logic and UI
live entirely in `index.html`. The design centres decolonising pedagogy,
community dialect equity, and spaced-repetition vocabulary acquisition.

---

## File map

| File | Description | When to upload to Claude |
|------|-------------|--------------------------|
| `CLAUDE.md` | This file | Every session |
| `index.html` | App logic + UI (~5,400 lines) | When editing app behaviour or UI |
| `data_glossary.json` | 1,254 vocabulary entries | When adding/editing words |
| `data_phrases.json` | 821 phrase entries | When adding/editing phrases |
| `data_units.json` | 31 units, ~1,600 exercises | When adding lessons or exercises |
| `data_variants.json` | 12 dialect variant entries | When adding dialect notes |
| `data_syllabary.json` | Phonology content (vowels/consonants) | When editing the Sounds screen |
| `kanienkeha_data.js` | ⚠️ ARCHIVED — superseded by the JSON files | Do not edit |

For most content tasks (adding words, exercises, lessons) you only need
`CLAUDE.md` + the relevant `data_*.json` file. Do **not** upload `index.html`
unless the task requires editing app logic.

---

## index.html section map

The `<script>` block starts at line 1211. Sections by line range:

| Lines | Section |
|-------|---------|
| 1212–1272 | LOCAL PROFILE SYSTEM — auth, login, user storage (`getUsers`, `saveUsers`, `loginAs`) |
| 1273–1363 | PROFICIENCY — SM-2 spaced repetition (`_sm2Init`, `_sm2Step`, `recProf`, `getProf`, `getDueWords`) |
| 1364–1422 | NAV — screen switching (`navTo`, `showScreen`, `goHome`) |
| 1423–1796 | PRACTICE FAB + MINI-SESSION ENGINE — due-word practice overlay (`buildPracPool`, `openPracOverlay`, `renderPracEx`) |
| 1797–1827 | HOME UI — unit card rendering (`renderHomeUnits`, `updateHomeUI`) |
| 1828–1954 | DATA — `loadData()`, `FALLBACK_DATA`, error screen |
| 1955–2073 | EXERCISE ENGINE — `renderEx()`, `handleAction()`, `finishEx()`, `showFB()`, `advance()` |
| 2074–2763 | DIALOGUE ENGINE — multi-turn conversation exercises (`initDialogue`, `dlRenderStep`, `dlAdvance`) |
| 2764–3091 | GLOSSARY — `renderGloss()`, search, filter, vocab detail drawer |
| 3092–3379 | SYLLABARY PRACTICE ENGINE — sound and syllable exercises |
| 3380–3487 | PHRASES ENGINE — phrase library screen |
| 3488–5344 | WORD BUILDER ENGINE — prefix rule system, noun incorporation, dialect adaptation |
| 5345–5402 | FEEDBACK / REPORT — `submitReportOption()`, GitHub issue creation |

CSS runs from line 9 to 1210. HTML structure (screens, overlays) runs
from the `<body>` tag to line 1211.

To navigate, ask Claude to search for the exact function name rather than
relying on line numbers alone — they shift as content is added.

---

## Data schemas

### Glossary entry (`data_glossary.json`)

```json
{
  "id": "p01",
  "target": "í:se'",
  "english": "you",
  "pos": "pronoun",
  "posLabel": "Pronoun",
  "unit": 0,
  "lesson": 0,
  "notes": "Cultural or linguistic note for learners.",
  "cite": {
    "text": "Kontinónhstats L1 · Mary McDonald, Kanehsatà:ke",
    "url": "https://www.kanehsatakevoices.com/lessons/lesson-1/"
  },
  "accepts": ["í:se'", "i:se'", "ise'", "ý:se'"],
  "forms": [
    { "label": "singular (you)", "form": "í:se'" },
    { "label": "dual (you two)", "form": "teseniiáhshe" }
  ]
}
```

**Field rules:**
- `id` — unique across all glossary entries. See ID prefix conventions below.
- `pos` — machine tag from the controlled list below. Use dot-notation.
- `posLabel` — human-readable display label. May be more specific than `pos`
  (e.g. `pos: "noun.animal"`, `posLabel: "Noun — Bird"`). Always provide it.
- `accepts` — all strings accepted as correct in typing exercises. Always
  include the unaccented form and any dialect variants.
- `forms` — possessive forms, conjugation table, or paradigm. Set to `null`
  if not needed.
- `cite` — required. Link to the Kontinónhstats lesson page where possible.
- `unit` / `lesson` — the unit index (0-based) and lesson index where this
  word is first introduced. Set both to `0` if not yet placed.
- `sortKey` — **DO NOT ADD.** Computed at runtime from `english`.
- `group` / `groupLabel` — **DO NOT ADD.** Computed at runtime.

### Phrase entry (`data_phrases.json`)

Same shape as glossary, with two differences:
- No `posLabel` or `sortKey` field.
- Has a `scenario` field: a short string grouping phrases by topic
  (e.g. `"Movement and direction"`, `"Greetings"`).

### Variant entry (`data_variants.json`)

```json
{
  "p01": [
    { "c": "Kanehsatà:ke / Kahnawà:ke", "f": "í:se'", "n": "i-form (Eastern Quebec dialects)" },
    { "c": "Six Nations / Tyendinaga",   "f": "ý:se'", "n": "y-form (Ontario dialects)" }
  ]
}
```

Key = glossary `id`. Each entry: `c` = community, `f` = form in that community,
`n` = brief note with source.

### Unit / lesson / exercise (`data_units.json`)

```json
{
  "id": 0,
  "title": "Unit 1 — Who We Are: Pronouns & People",
  "desc": "Short description shown on the home screen.",
  "lessons": [
    {
      "id": "u0l0",
      "title": "Lesson 1 — You and Me",
      "icon": "🗣️",
      "sub": "One-line lesson description",
      "intro": ["First paragraph (HTML allowed).", "Second paragraph."],
      "ped": "Pedagogical note — which scholars and frameworks this lesson draws on.",
      "vocabIds": ["p01", "p02"],
      "exercises": [ ]
    }
  ]
}
```

Lesson `id` format: `u{unitId}l{lessonIndex}` (both zero-based).

---

## Exercise schemas

### `mc` — Multiple choice

```json
{
  "type": "mc",
  "wid": "p01",
  "prompt": "What does í:se' mean?",
  "sub": "Choose the correct answer",
  "correct": "You (singular)",
  "options": ["You (singular)", "I / Me", "He", "She (respectful)"],
  "cm": "Correct-answer message shown after second attempt.",
  "wm": "Wrong-answer message shown after second attempt."
}
```

### `match` — Matching pairs

```json
{
  "type": "match",
  "wid": null,
  "prompt": "Match each pronoun to its meaning",
  "sub": "Tap left, then right",
  "pairs": [
    { "target": "í:se'", "english": "You (singular)", "wids": ["p01"] },
    { "target": "í:'i",  "english": "I / Me",          "wids": ["p02"] }
  ],
  "cm": "Correct message.",
  "wm": "Wrong message."
}
```

`wid` at top level is `null` for match; proficiency is tracked via `wids`
on each pair.

### `fill` — Fill in the blank

```json
{
  "type": "fill",
  "wid": "p04",
  "prompt": "Complete the pronoun",
  "sentence": "'He' is ___ónha",
  "correct": "ra",
  "hint": "r",
  "alts": ["ra"],
  "cm": "Correct message.",
  "wm": "Wrong message with the answer."
}
```

`___` in `sentence` is replaced with an input field. `hint` = first letter(s).

### `type` — Type the word

```json
{
  "type": "type",
  "wid": "p01",
  "prompt": "How do you say 'You (singular)'?",
  "sub": "Dialect variants accepted",
  "correct": "í:se'",
  "alts": ["i:se'", "ise'", "ý:se'", "yse'"],
  "cm": "Correct message.",
  "wm": "Wrong message — include the correct answer."
}
```

### `audio` — Speak aloud (self-assessed)

```json
{
  "type": "audio",
  "wid": "p01",
  "prompt": "Say this word aloud",
  "sub": "Record, listen back, and self-assess",
  "word": "í:se'",
  "meaning": "You (singular)",
  "hint": "Pronunciation tip: two syllables, stress on first, glottal stop at end."
}
```

No `cm`/`wm` — learner self-assesses as "Felt right" or "Still learning".

### `story` — Reflective writing prompt

```json
{
  "type": "story",
  "wid": "p03",
  "prompt": "Connect to your life",
  "sub": "A moment of reflection",
  "word": "akaónha",
  "meaning": "She (respectful)",
  "storyPrompt": "The full reflective prompt shown to the learner."
}
```

`word` and `meaning` are optional (omit for purely conceptual prompts).
Response is saved locally only and never transmitted.

### `dialogue` — Multi-turn conversation

```json
{
  "type": "dialogue",
  "id": "dl_u0l7_01",
  "prompt": "Scene title",
  "sub": "One-line subtitle",
  "scene": "Narrative scene-setter shown before the conversation begins.",
  "turns": [
    { "speaker": "other", "name": "Character Name", "line": "Shé:kon.", "gloss": "Greetings." },
    {
      "speaker": "learner",
      "instruction": "Greet him back.",
      "mode": "mc",
      "options": ["Shé:kon.", "Niawenhkó:wa.", "Tho niioht.", "Onen'."],
      "correct": "Shé:kon.",
      "cm": "Correct message.",
      "wm": "Wrong message."
    }
  ],
  "closing": "Closing reflection shown after the dialogue ends.",
  "dialect_note": "Optional note about dialect variation in this exercise.",
  "wids_tested": ["p01", "p03"]
}
```

Learner turns always use `"mode": "mc"` currently. `wids_tested` is a flat
list of all word IDs practised in the dialogue.

---

## `pos` controlled vocabulary

Use exactly one of these strings for the `pos` field in any glossary entry.
All values use dot-notation (`category.subcategory`). Never use a bare
category alone (e.g. `noun`, `verb`) — use the `.unclassified` form if
the correct subcategory is not yet known.

```
noun.a-class        noun.animal         noun.body           noun.clothing
noun.colour         noun.cultural       noun.food           noun.household
noun.ka-class       noun.kinship        noun.nature         noun.o-class
noun.person         noun.place          noun.shape          noun.tool
noun.unclassified   ← pending classification; use when subcategory is uncertain

number.cardinal     number.ordinal

particle.article    particle.discourse  particle.locative   particle.negation
particle.quality    particle.question   particle.temporal
particle.unclassified ← pending classification

pronoun.independent pronoun.possessive
← independent = singular base forms (í:se', í:'i, etc.)

proper-noun.clan    proper-noun.cultural proper-noun.identity proper-noun.place

verb.a-stem         verb.active         verb.consonant-stem verb.direction
verb.e-stem-fake    verb.e-stem-true    verb.i-stem         verb.o-stem
verb.relational     verb.stative
verb.unclassified   ← pending stem classification
```

---

## ID prefix conventions (glossary)

IDs are not fully standardised — they evolved with the data. When adding
new entries, extend an existing prefix series or create a new short prefix
that reflects the semantic group. Always check for collisions first.

Common active prefixes:
`p` pronouns · `k` kinship · `n` persons/nouns · `num` numbers ·
`fv` verbs (largest group) · `st` stative verbs · `na` nature nouns ·
`ani`/`wa`/`bi`/`brd`/`ins`/`fi`/`da` animals ·
`fd`/`fo`/`fx`/`fr` food · `col` colours · `bp` body parts ·
`ho` household · `cu` cultural · `loc` place nouns · `par` particles ·
`o`/`dh`/`a`/`ka` noun class entries · `cl` clan · `le` proper nouns ·
`sh` shapes · `ex` locative particles

Phrase IDs (`data_phrases.json`): mostly `fv` followed by a number,
with smaller series for `gr` (greetings), `q` (questions), `ds` (discourse),
`eat` (food/eating), `g` (general).

---

## Dialect handling

Four dialect communities are represented. All forms are equally valid and
must all be accepted in typing exercises.

| Community | Key feature |
|-----------|-------------|
| Kanehsatà:ke / Kahnawà:ke | r-initial (e.g. `raónha`) |
| Akwesasne | r→l alternation (e.g. `laónha`) |
| Six Nations / Tyendinaga | y-form where Kanehsatà:ke uses i (e.g. `ý:se'`) |

Unaccented forms should also be in `accepts` (e.g. `"ise'"` alongside `"í:se'"`).

---

## Content principles (brief)

- Every lesson must include at least one `story` or reflective exercise
  (Emotional/Spiritual domain per LaFever's four outcomes).
- Vocabulary is introduced in culturally coherent sets, not random lists
  (Nation 2001 — meaningful semantic grouping).
- All dialect variants are accepted as correct answers — never penalise
  a learner for their community's form.
- `ped` fields in lessons document the scholarly grounding for that lesson's
  sequence. Always include one when creating a new lesson.
- The Thanksgiving Address (Ohén:ton Karihwatéhkwen) is treated as
  foundational, not advanced — it appears in Unit 5.
- Kanien'kéha is presented as a living language, not a documented artefact.

---

## Common tasks — what to upload

| Task | Upload |
|------|--------|
| Add vocabulary words | `CLAUDE.md` + `data_glossary.json` |
| Add phrases | `CLAUDE.md` + `data_phrases.json` |
| Add a lesson with exercises | `CLAUDE.md` + `data_units.json` |
| Add dialect variants | `CLAUDE.md` + `data_variants.json` |
| Edit app UI or logic | `CLAUDE.md` + `index.html` |
| Edit a specific engine | `CLAUDE.md` + `index.html` (cite section by name) |
| Add root-word curriculum units | `CLAUDE.md` + `data_units.json` + `kanienkeha_root_word_curriculum_plan.md` |

When asking Claude to generate new entries, always say which file the output
goes into and ask for a JSON array (not a prose description) so it can be
pasted directly.

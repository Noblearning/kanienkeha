# Kanien'kéha Learning App — File Guide

## What's in this folder

```
index.html              ← The app itself (open this in a browser)
data_glossary.json      ← All vocabulary entries
data_units.json         ← All units, lessons, and exercises
data_variants.json      ← Dialect variant table (r/l, y/i, etc.)
data_syllabary.json     ← Sounds & Syllables content (vowels, consonants, tone)
README.md               ← This file
```

The app loads the four `data_*.json` files at startup. To add vocabulary,
lessons, or exercises, **edit the JSON files directly** — no HTML editing needed.
The app reloads fresh content every time the page opens.

---

## How to run it

### ⚠️ You must use a local web server

Browsers block JavaScript from reading local files (`file://` protocol) for
security reasons. If you double-click `index.html`, the app will show you a
setup guide. Use one of these instead:

**Option A — VS Code (easiest)**
1. Install the **Live Server** extension (by Ritwick Dey)
2. Right-click `index.html` → **Open with Live Server**
3. The app opens automatically at `http://127.0.0.1:5500`

**Option B — Node.js**
```bash
npx serve .
# then open http://localhost:3000
```

**Option C — Python**
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

**Option D — Deploy to the web**
Upload all five files to any static host (GitHub Pages, Netlify, Vercel — all free).
No backend required. The app is entirely client-side.

---

## How to edit content

### Adding a vocabulary word (`data_glossary.json`)

Each entry in the array follows this shape:

```json
{
  "id": "w001",
  "target": "Kanien'kéha word here",
  "english": "English meaning",
  "pos": "Part of speech (e.g. Noun — Kinship, Verb, Pronoun)",
  "unit": 0,
  "lesson": 0,
  "notes": "Cultural or linguistic context for learners",
  "cite": {
    "text": "Source — author, community, publication",
    "url": "https://link-to-source.com"
  },
  "accepts": ["exact-match", "variant-without-accents", "akwesasne-form"],
  "forms": [
    { "label": "My [word]", "form": "possessive-form-here" },
    { "label": "Your [word]", "form": "possessive-form-here" }
  ]
}
```

- `id` — must be unique across all entries (e.g. `w001`, `k07`, `v01`)
- `accepts` — all strings in this list are accepted as correct in typing exercises. Include accent-stripped versions and dialect variants so learners aren't penalised for their community's orthography.
- `forms` — optional. Use for kinship terms, nouns with possessive prefixes, or verbs with conjugation tables. Set to `null` if not needed.
- `cite` — always include a source. If drawn from the Kontinónhstats curriculum, link to the specific lesson page.

### Adding a lesson (`data_units.json`)

Units contain lessons; lessons contain exercises. The structure is:

```json
{
  "id": 2,
  "title": "Unit 3 — The Land Around Us",
  "desc": "Short description for the home screen",
  "lessons": [
    {
      "id": "u2l0",
      "title": "Lesson 1 — Directions",
      "icon": "🧭",
      "sub": "One-line description",
      "intro": [
        "First paragraph of lesson intro (HTML allowed).",
        "Second paragraph."
      ],
      "ped": "Pedagogical note — why this sequence, which scholars it draws on.",
      "vocabIds": ["w001", "w002"],
      "exercises": [ ... ]
    }
  ]
}
```

### Exercise types

| `type`    | Required fields                                                    |
|-----------|--------------------------------------------------------------------|
| `mc`      | `prompt`, `correct`, `options[]`, `wid`, `cm` (correct msg), `wm` |
| `match`   | `prompt`, `pairs[]` (each: `target`, `english`, `wids[]`)         |
| `fill`    | `prompt`, `sentence` (use `___`), `correct`, `hint`, `alts[]`     |
| `type`    | `prompt`, `correct`, `alts[]`, `wid`                              |
| `audio`   | `prompt`, `word`, `meaning`, `hint`                               |
| `story`   | `prompt`, `storyPrompt`, `word`, `meaning` (word/meaning optional)|

- `wid` — the vocabulary ID this exercise is testing. Used to update proficiency.
- `cm` / `wm` — correct message / wrong message shown after the second attempt.
- `alts` — alternative accepted answers (accent variants, dialect forms).

### Adding dialect variants (`data_variants.json`)

```json
{
  "word-id": [
    { "c": "Community name", "f": "form in that community", "n": "brief note + source" }
  ]
}
```

---

## Offline / local-file fallback

If you need the app to work without a server (e.g. on a device with no internet
and no ability to run a server), open `index.html`, find this line near the top
of the `<script>` section:

```javascript
const FALLBACK_DATA = null;
```

Replace `null` with the combined data object:

```javascript
const FALLBACK_DATA = {
  variants:  { /* paste contents of data_variants.json here */ },
  glossary:  [ /* paste contents of data_glossary.json here */ ],
  units:     [ /* paste contents of data_units.json here */ ],
  syllabary: { /* paste contents of data_syllabary.json here */ }
};
```

This makes the app fully self-contained again at the cost of losing the
ability to edit content separately.

---

## Migration to a backend (future)

When you're ready to support multi-device login, find this comment in `index.html`:

```
LOCAL PROFILE SYSTEM
Migration to backend: replace getUsers/saveUsers with API calls.
All UI logic stays the same.
```

The three functions to replace are `getUsers()`, `saveUsers()`, and the
`localStorage.setItem(LK, ...)` call in `loginAs()`. Everything else —
exercises, proficiency tracking, navigation — stays identical.

---

## Content sources and attribution

All vocabulary currently in the app is drawn from:

- **Kontinónhstats 40-Lesson Curriculum** — Onwá:ri Tekahawáhkwen Mary McDonald,
  Mohawk Language Custodian Association, Kanehsatà:ke.
  https://www.kanehsatakevoices.com

Dialect variant data sourced from:
- Bonvillain (1984) — Akwesasne r/l alternation
- CBC Original Voices — Ontario y/i alternation
- native-languages.org — community dialect overview
- Pentangelo (2020) — phonological variation

Pedagogical framework:
- García & Li Wei (2014) — Translanguaging
- Flores & Rosa (2015) — Raciolinguistics
- McCarty & Lee (2014) — Culturally Sustaining/Revitalizing Pedagogy
- Freire (1970) — Pedagogy of the Oppressed
- Chew, Leonard & Rosenblum (2023) — Decolonizing Indigenous language pedagogies
- Tuck & Yang (2012) — Decolonization is not a metaphor

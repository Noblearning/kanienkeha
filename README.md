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

---

## Pedagogical framework

This curriculum is built at the intersection of several complementary
frameworks. They are not cited decoratively — each one shapes decisions
about sequencing, exercise design, what counts as correct, and what the
language is for. Frameworks do not need to be named explicitly in lesson
content to be active; they operate in the structure of what is taught,
in what order, in what context, and why.

### Learning outcomes: the Medicine Wheel framework

**LaFever (2016)** — *The Medicine Wheel: An Indigenous Curriculum
Framework.* Extends Bloom's taxonomy by adding a spiritual domain to the
three conventional ones (cognitive, psychomotor, affective), producing
four outcome quadrants aligned with the Medicine Wheel:

- **Mental** — knowing, understanding, analysing language structure and vocabulary
- **Physical** — producing: speaking, typing, commanding, constructing sentences
- **Emotional** — connecting language to identity, relationship, and community belonging
- **Spiritual** — situating language in ceremony, land, oral tradition, and worldview

Every lesson from Unit 12 onward is explicitly designed with all four
domains present. Earlier units address these domains implicitly; the
framework is made structurally visible from Unit 12. Exercise types map
roughly as follows: `mc` and `fill` exercises are primarily Mental;
`type` and `audio` exercises are Physical; `story` exercises are
Emotional and Spiritual; cultural reflection questions embedded in `mc`
exercises address all four. No lesson should rely exclusively on Mental
and Physical outcomes — every lesson must include at least one Emotional
or Spiritual touchpoint.

### Language learning and acquisition

**Nation (2001)** — *Learning Vocabulary in Another Language.* Vocabulary
acquisition principles used throughout: spaced retrieval (known words
reappear across units in new contexts), meaningful semantic grouping
(vocabulary is introduced in culturally coherent sets, not random lists),
pattern-based learning over rote memorisation (the Ra-/I- prefix system
is taught as a generative rule, not a list), and productive control of
full paradigms (learners are expected to generate forms, not just
recognise them). The principle that vocabulary must be encountered across
multiple exercise types and contexts to move into long-term memory shapes
the exercise mix in every lesson.

**Mithun (1982, 1984, 1989, 1999)** — Kanien'kéha morphology and
polysynthetic language structure. The decision to teach verb stem classes
systematically, to introduce noun incorporation early as a concept before
requiring productive use, and to treat the prefix system as a generative
architecture rather than a list of exceptions all follow Mithun's
structural analysis of Iroquoian languages. Mithun's work on language
vitality — the relationship between morphological productivity and a
language's ability to name new things — also informs the treatment of
descriptive naming strategies in contemporary vocabulary.

**Krashen (1982)** — Comprehensible input (+1). Lesson introductions are
designed to be slightly above the learner's current level, presenting new
forms in contexts that make meaning accessible without requiring
translation dependence. Grammar is introduced inductively through
examples before being named explicitly. The app does not front-load
grammatical rules; it creates conditions for noticing.

### Translanguaging and language ideology

**García & Li Wei (2014)** — *Translanguaging: Language, Bilingualism and
Education.* Learners arrive with existing linguistic repertoires — English,
French, other Indigenous languages — and these are not obstacles to
Kanien'kéha acquisition but resources. The app does not frame Kanien'kéha
as replacing other languages. All dialect variation (Akwesasne, Kahnawà:ke,
Kanehsatà:ke, Six Nations) is treated as an asset, not a problem to be
standardised away; all community forms are accepted as correct in exercises.
The translanguaging framework also informs the decision not to use
translation as the primary meaning-making strategy — images, cultural
context, and morphological explanation are preferred.

**Flores & Rosa (2015)** — *Undoing Appropriateness: Raciolinguistic
Ideologies and Language Diversity in Education.* The dominant ideology
that positions some languages (English, French) as neutral and others
(Kanien'kéha) as marked, regional, complex, or deficient is a
raciolinguistic construction, not a linguistic fact. Exercise design
actively resists this framing: Kanien'kéha is presented as structurally
precise and morphologically productive. The curriculum periodically
positions learners to notice how languages are valued or devalued in
social and institutional contexts — not as an add-on, but as part of
what it means to understand a language.

**Bonvillain (1984)** — Sociolinguistic analysis of Kanien'kéha community
variation and use. Informs the treatment of dialect variation as
socially meaningful rather than hierarchical, and the representation of
community-specific forms as equally valid expressions of the language.
Also informs cultural and social context notes throughout the vocabulary.

### Critical and decolonising pedagogies

**Freire (1970)** — *Pedagogy of the Oppressed.* Generative themes:
learning begins with what is meaningful in the learner's world — who
they are, who they are related to, where they live — before moving
outward to grammar, ceremony, and history. The curriculum sequences
from pronouns and kinship (who we are and who we speak to) through land
and place names to ceremony and oral tradition, rather than from
tourist phrases or decontextualised grammar drills. Learners are
positioned as meaning-makers, not recipients of vocabulary lists. The
`story` exercise type is the direct expression of this principle.

**Tuck & Yang (2012)** — *Decolonization Is Not a Metaphor.* Language
revitalization is not a metaphor for cultural appreciation or
multicultural awareness — it is a material and political act. This
curriculum is built on the understanding that Kanien'kéha belongs to
the Kanien'kehá:ka people, that its transmission was interrupted by
colonial policy (residential schools, language bans, forced assimilation),
and that learning it involves taking a position on that history. The app
does not present itself as neutral, and it does not soften the political
context of language loss.

**Chew, Leonard & Rosenblum (2023)** — *Decolonizing Indigenous language
pedagogies.* Language pedagogy must serve community-defined goals, not
reproduce the logics of dominant-language instruction. This shapes the
decision to centre ceremony, oral tradition, clan structure, and
land-based knowledge as primary contexts for vocabulary — not as cultural
supplements to a grammar-first spine. It also shapes the treatment of
the Thanksgiving Address: it is introduced in Unit 5, not as advanced
material, because it is the beginning of meaning in Kanien'kéha.

**McCarty & Lee (2014)** — *Critical Culturally Sustaining/Revitalizing
Pedagogy and Indigenous Education Sovereignty.* Language learning must
sustain and revitalize, not merely document or preserve. Preservation
implies the language is frozen; revitalization means it is alive,
growing, and being transmitted. Every unit assumes Kanien'kéha is a
living language in active community use. The sovereignty framing also
informs the decision not to frame the curriculum around government
language outcomes or standardised testing logic.

**Maracle (1993)** — *Kaia'titahkhe' — Mohawk Language.* Brian Maracle's
account of reclaiming his ancestral language as an adult learner after
colonial interruption of transmission shapes the emotional register of
story exercises throughout the curriculum. The experience of learning
a language that should have been your first language — the grief,
the reconnection, the political dimension of that personal act — is
treated as part of the learning, not separate from it.

---

## Canadian Indigenous language reclamation context

This curriculum is set in the specific context of Kanien'kehá:ka
communities in what is now Quebec and Ontario, Canada. The following
legislative, policy, and historical context shapes what the curriculum
is for and why it matters. Content designers should be familiar with
this context even when it is not explicitly named in lesson text.

**Residential schools and the Indian Act.** The systematic suppression
of Kanien'kéha — through residential schools, prohibition of Indigenous
language use, and the assimilation policies of the Indian Act — created
the transmission gap this curriculum exists to help address. The TRC
*Calls to Action* (Truth and Reconciliation Commission of Canada, 2015),
particularly Calls 13–15, call for the preservation, promotion, and
adequate funding of Indigenous languages. This app is a practical
response to that call.

**Indigenous Languages Act (Canada, 2019).** Bill C-91 affirms the
rights of Indigenous peoples to use, reclaim, revitalize, maintain,
and strengthen their languages, and establishes a framework for federal
funding and institutional support. The development of this curriculum
is an exercise of the rights that legislation affirms.

**United Nations Declaration on the Rights of Indigenous Peoples
(UNDRIP), Article 13.** Indigenous peoples have the right to revitalize,
use, develop, and transmit to future generations their languages,
oral traditions, and other cultural expressions. Canada endorsed UNDRIP
in 2016; the *United Nations Declaration on the Rights of Indigenous
Peoples Act* (2021) makes implementation a legal obligation in Canadian
law. This app is one expression of Article 13 in practice.

**Bill 96 (Québec, 2022).** The *Loi sur la langue officielle et commune
du Québec, le français* significantly expands French-language requirements
in Quebec institutions and workplaces. Its effect in Kanien'kehá:ka
communities — particularly Kanehsatà:ke and Kahnawà:ke — is to add a
second colonial language pressure alongside English. The curriculum
acknowledges that Kanien'kéha speakers navigate multiple language
systems simultaneously and that this navigation is a political condition,
not a personal preference or a learning obstacle.

**Community revitalization programs.** Active Kanien'kéha revitalization
infrastructure includes: Ratióhkwats (Kahnawà:ke immersion language
nest); Kanien'kéha Ratiwennahní:rats (language programs);
Tsi Tyónnheht Onkwawén:na (Six Nations language program);
Akwesasne Freedom School; and the Kontinónhstats curriculum at
Kanehsatà:ke on which this app's vocabulary is based. This app is
designed to complement, not replace, community-led transmission.

---

## Framework-to-unit mapping

The table below shows which frameworks are most structurally active in
each unit cluster. All frameworks are present throughout; this table
identifies where each one is doing its most concentrated work.

| Units | Primary frameworks |
|-------|--------------------|
| 1–3 | Freire (generative themes from identity outward); Nation (paradigm learning); Mithun (polysynthetic structure) |
| 4–5 | McCarty & Lee (ceremonial grounding); Chew et al. (land-based vocabulary as primary text) |
| 6–7 | Freire (animals and clan as generative themes); García & Li Wei (translanguaging, dialect as asset) |
| 8–9 | Mithun (verb stem morphology); Nation (productive paradigm control); Krashen (comprehensible input) |
| 10–11 | Mithun (relational prefix system); Nation (paradigm completion); Flores & Rosa (raciolinguistic reflection) |
| 12+ | LaFever (four-domain outcomes explicit); all frameworks active; Canadian policy context available as lesson content |

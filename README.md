# examples/ — Schema reference files

Each file in this folder is a single annotated example of a content schema
used in the app. Use them as templates when asking Claude to generate new
content, or as a quick reference when editing manually.

## Files

| File | Use when adding… |
|------|-----------------|
| `glossary_entry.json` | New words to `data_glossary.json` |
| `phrase_entry.json` | New phrases to `data_phrases.json` |
| `exercise_mc.json` | Multiple choice exercises |
| `exercise_match.json` | Matching pair exercises |
| `exercise_fill.json` | Fill-in-the-blank exercises |
| `exercise_type.json` | Type-the-word exercises |
| `exercise_audio.json` | Speak-aloud exercises |
| `exercise_story.json` | Reflective writing exercises |
| `exercise_dialogue.json` | Multi-turn conversation exercises |

## How to use with Claude

For content generation tasks, upload `CLAUDE.md` + the relevant example file
+ the target data file. For example:

> "I need 5 new nature vocabulary entries for data_glossary.json.
> Follow the schema in glossary_entry.json exactly. Do not add sortKey,
> group, or groupLabel fields. Output a JSON array I can paste directly."

## Notes on `_comment` and `_fieldname` keys

All example files use `_comment` and `_fieldname` keys (underscore-prefixed)
as inline documentation. These are not part of the live schema and must
**not** be included in actual data file entries. They exist only in this
`examples/` folder.

## What the exercises go inside

Exercises are elements of the `exercises` array inside a lesson object in
`data_units.json`. The nesting is:

```
data_units.json
└── [ ]  ← array of units
    └── unit.lessons[ ]
        └── lesson.exercises[ ]  ← paste exercise objects here
```

Each exercise object is one element of `lesson.exercises`. When adding
exercises to an existing lesson, append to the array. When creating a new
lesson, create the full lesson object (see `data_units.json` schema in
`CLAUDE.md`) and populate its `exercises` array.

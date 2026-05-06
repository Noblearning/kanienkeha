#!/usr/bin/env python3
"""
validate.py
===========
Validates all Kanien'kéha app data files before deploying or handing off
to Claude for further editing.

Checks performed
----------------
  [1]  JSON parses cleanly (all four data files)
  [2]  No duplicate IDs within data_glossary.json
  [3]  No duplicate IDs within data_phrases.json
  [4]  No ID collisions between data_glossary.json and data_phrases.json
  [5]  No duplicate unit IDs in data_units.json
  [6]  No duplicate lesson IDs across all units
  [7]  No duplicate dialogue IDs (excluding unit 99 test scaffolding)
  [8]  Required fields present on every glossary entry
  [9]  Required fields present on every phrase entry
  [10] pos value is from the controlled vocabulary (glossary + phrases)
  [11] Every exercise has required fields for its type
  [12] mc exercises have exactly 4 options (warn on other counts)
  [13] mc correct answer is present in options
  [14] match exercises: wid is null, each pair has target/english/wids
  [15] Every wid reference resolves to a glossary or phrase entry
  [16] Every vocabId in lesson.vocabIds resolves to a glossary or phrase entry
  [17] Every wids_tested entry in dialogues resolves
  [18] Every match pair wid resolves

Exit codes
----------
  0  — no errors (warnings may be present)
  1  — one or more errors found

Usage
-----
  python3 validate.py              # check all files in current directory
  python3 validate.py --summary    # errors only, no per-item detail
  python3 validate.py --fix-report # print a grouped fix list at the end

Run from the folder containing index.html and the data_*.json files.
"""

import json
import sys
import os
from collections import defaultdict, Counter

SUMMARY_ONLY = '--summary' in sys.argv
FIX_REPORT   = '--fix-report' in sys.argv

GLOSSARY_PATH  = 'data_glossary.json'
PHRASES_PATH   = 'data_phrases.json'
UNITS_PATH     = 'data_units.json'
VARIANTS_PATH  = 'data_variants.json'

# ── Controlled pos vocabulary ─────────────────────────────────────
VALID_POS = {
    'noun.a-class', 'noun.animal', 'noun.body', 'noun.clothing',
    'noun.colour', 'noun.cultural', 'noun.food', 'noun.household',
    'noun.ka-class', 'noun.kinship', 'noun.nature', 'noun.o-class',
    'noun.person', 'noun.place', 'noun.shape', 'noun.tool',
    'noun.unclassified',
    'number.cardinal', 'number.ordinal',
    'particle.article', 'particle.discourse', 'particle.locative',
    'particle.negation', 'particle.quality', 'particle.question',
    'particle.temporal', 'particle.unclassified',
    'pronoun.independent', 'pronoun.possessive',
    'proper-noun.clan', 'proper-noun.cultural', 'proper-noun.identity',
    'proper-noun.place',
    'verb.a-stem', 'verb.active', 'verb.consonant-stem',
    'verb.direction', 'verb.e-stem-fake', 'verb.e-stem-true', 'verb.i-stem',
    'verb.o-stem', 'verb.relational', 'verb.stative', 'verb.unclassified',
}

# ── Required fields per exercise type ────────────────────────────
REQUIRED_EXERCISE_FIELDS = {
    'mc':       {'type', 'wid', 'prompt', 'sub', 'correct', 'options', 'cm', 'wm'},
    'match':    {'type', 'wid', 'prompt', 'sub', 'pairs', 'cm', 'wm'},
    'fill':     {'type', 'wid', 'prompt', 'sentence', 'correct', 'hint', 'alts', 'cm', 'wm'},
    'type':     {'type', 'wid', 'prompt', 'correct', 'alts', 'cm', 'wm'},
    'audio':    {'type', 'wid', 'prompt', 'sub', 'word', 'meaning', 'hint'},
    'story':    {'type', 'wid', 'prompt', 'sub', 'word', 'meaning', 'storyPrompt'},
    'dialogue': {'type', 'id', 'prompt', 'sub', 'scene', 'turns'},
}

REQUIRED_GLOSSARY_FIELDS = {'id', 'target', 'english', 'pos', 'posLabel',
                             'unit', 'lesson', 'notes', 'cite', 'accepts'}

REQUIRED_PHRASE_FIELDS   = {'id', 'target', 'english', 'pos', 'scenario',
                             'unit', 'lesson', 'notes', 'cite', 'accepts'}

# ── Result tracking ───────────────────────────────────────────────

errors   = []  # (check_id, location, message)
warnings = []  # (check_id, location, message)
fix_groups = defaultdict(list)  # check_id → [location strings]

def err(check_id, location, msg):
    errors.append((check_id, location, msg))
    fix_groups[check_id].append(location)

def warn(check_id, location, msg):
    warnings.append((check_id, location, msg))

# ── Helpers ───────────────────────────────────────────────────────

def load(path):
    if not os.path.exists(path):
        err(1, path, f"File not found: {path}")
        return None
    try:
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        err(1, path, f"JSON parse error: {e}")
        return None

def loc_ex(unit_id, lesson_id, ex_type, wid_or_id):
    return f"unit={unit_id} lesson={lesson_id} type={ex_type} ref={wid_or_id}"

# ── Load all files ────────────────────────────────────────────────

glossary = load(GLOSSARY_PATH)
phrases  = load(PHRASES_PATH)
units    = load(UNITS_PATH)
variants = load(VARIANTS_PATH)  # not deeply validated, just parsed

if not all([glossary, phrases, units]):
    print("Fatal: one or more files failed to load. Aborting.")
    sys.exit(1)

# ── [2] Duplicate glossary IDs ───────────────────────────────────

g_ids = [e['id'] for e in glossary]
for iid, count in Counter(g_ids).items():
    if count > 1:
        err(2, f"glossary:{iid}", f"ID '{iid}' appears {count}× in {GLOSSARY_PATH}")

# ── [3] Duplicate phrase IDs ─────────────────────────────────────

p_ids = [e['id'] for e in phrases]
for iid, count in Counter(p_ids).items():
    if count > 1:
        err(3, f"phrases:{iid}", f"ID '{iid}' appears {count}× in {PHRASES_PATH}")

# ── [4] Cross-file ID collisions ─────────────────────────────────

g_id_set = set(g_ids)
p_id_set = set(p_ids)
collisions = g_id_set & p_id_set
for iid in sorted(collisions):
    err(4, f"cross:{iid}", f"ID '{iid}' exists in both {GLOSSARY_PATH} and {PHRASES_PATH}")

# Build combined lookup (glossary wins on collision for downstream checks)
all_content_ids = p_id_set | g_id_set

# ── [5] Duplicate unit IDs ───────────────────────────────────────

unit_ids = [u['id'] for u in units]
for uid, count in Counter(unit_ids).items():
    if count > 1:
        err(5, f"unit:{uid}", f"Unit ID '{uid}' appears {count}×")

# ── [6] Duplicate lesson IDs ─────────────────────────────────────

all_lesson_ids = [(u['id'], l['id']) for u in units for l in u.get('lessons', [])]
lesson_id_counts = Counter(lid for _, lid in all_lesson_ids)
for lid, count in lesson_id_counts.items():
    if count > 1:
        units_with_lid = [str(uid) for uid, l in all_lesson_ids if l == lid]
        err(6, f"lesson:{lid}", f"Lesson ID '{lid}' appears {count}× (units: {', '.join(units_with_lid)})")

# ── [7] Duplicate dialogue IDs (skip unit 99 — test scaffolding) ─

dl_id_counts = Counter()
dl_id_locations = defaultdict(list)
for u in units:
    if u['id'] == 99:
        continue
    for l in u.get('lessons', []):
        for e in l.get('exercises', []):
            if e.get('type') == 'dialogue' and 'id' in e:
                dl_id_counts[e['id']] += 1
                dl_id_locations[e['id']].append(f"unit={u['id']} lesson={l['id']}")

for did, count in dl_id_counts.items():
    if count > 1:
        err(7, f"dialogue:{did}",
            f"Dialogue ID '{did}' appears {count}× in non-test units: "
            f"{'; '.join(dl_id_locations[did])}")

# ── [8] Required glossary fields ─────────────────────────────────

for e in glossary:
    missing = REQUIRED_GLOSSARY_FIELDS - set(e.keys())
    if missing:
        err(8, f"glossary:{e.get('id','?')}",
            f"Missing fields: {sorted(missing)}")

# ── [9] Required phrase fields ───────────────────────────────────

for e in phrases:
    missing = REQUIRED_PHRASE_FIELDS - set(e.keys())
    if missing:
        err(9, f"phrases:{e.get('id','?')}",
            f"Missing fields: {sorted(missing)}")

# ── [10] pos controlled vocabulary ───────────────────────────────

for e in glossary:
    pos = e.get('pos', '')
    if pos not in VALID_POS:
        err(10, f"glossary:{e.get('id','?')}",
            f"Unknown pos value: {pos!r}")

for e in phrases:
    pos = e.get('pos', '')
    if pos not in VALID_POS:
        err(10, f"phrases:{e.get('id','?')}",
            f"Unknown pos value: {pos!r}")

# ── [11–18] Exercise checks ───────────────────────────────────────

for u in units:
    uid = u['id']
    for l in u.get('lessons', []):
        lid = l['id']

        # [16] vocabIds
        for vid in l.get('vocabIds', []):
            if vid not in all_content_ids:
                err(16, f"unit={uid} lesson={lid}",
                    f"vocabId '{vid}' not in glossary or phrases")

        for e in l.get('exercises', []):
            ex_type = e.get('type', '?')
            wid     = e.get('wid')
            loc     = loc_ex(uid, lid, ex_type, wid or e.get('id', '?'))

            # [11] Required fields
            required = REQUIRED_EXERCISE_FIELDS.get(ex_type)
            if required is None:
                warn(11, loc, f"Unknown exercise type: {ex_type!r}")
            else:
                missing = required - set(e.keys())
                if missing:
                    err(11, loc, f"Missing required fields: {sorted(missing)}")

            # [12] mc options count
            if ex_type == 'mc':
                n_opts = len(e.get('options', []))
                if n_opts != 4:
                    warn(12, loc, f"mc has {n_opts} options (expected 4)")

            # [13] mc correct in options
            if ex_type == 'mc':
                correct = e.get('correct')
                options = e.get('options', [])
                if correct and correct not in options:
                    err(13, loc,
                        f"mc correct={correct!r} not found in options={options}")

            # [14] match structure
            if ex_type == 'match':
                if wid is not None:
                    warn(14, loc, f"match wid should be null, got {wid!r}")
                for i, pair in enumerate(e.get('pairs', [])):
                    for field in ('target', 'english', 'wids'):
                        if field not in pair:
                            err(14, f"{loc} pair[{i}]",
                                f"match pair missing field: {field!r}")

            # [15] Top-level wid resolves
            if wid is not None and wid not in all_content_ids:
                err(15, loc, f"wid '{wid}' not in glossary or phrases")

            # [17] dialogue wids_tested resolve
            if ex_type == 'dialogue':
                for w in e.get('wids_tested', []):
                    if w not in all_content_ids:
                        err(17, loc,
                            f"dialogue wids_tested entry '{w}' not in glossary or phrases")

            # [18] match pair wids resolve
            if ex_type == 'match':
                for i, pair in enumerate(e.get('pairs', [])):
                    for w in pair.get('wids', []):
                        if w not in all_content_ids:
                            err(18, f"{loc} pair[{i}]",
                                f"match pair wid '{w}' not in glossary or phrases")

# ── Output ────────────────────────────────────────────────────────

CHECK_NAMES = {
    1:  'File loads',
    2:  'Glossary duplicate IDs',
    3:  'Phrases duplicate IDs',
    4:  'Cross-file ID collisions (glossary ∩ phrases)',
    5:  'Duplicate unit IDs',
    6:  'Duplicate lesson IDs',
    7:  'Duplicate dialogue IDs',
    8:  'Glossary required fields',
    9:  'Phrases required fields',
    10: 'pos controlled vocabulary',
    11: 'Exercise required fields',
    12: 'mc option count (warn)',
    13: 'mc correct in options',
    14: 'match structure',
    15: 'wid resolves',
    16: 'vocabId resolves',
    17: 'dialogue wids_tested resolve',
    18: 'match pair wids resolve',
}

print(f"\n{'='*60}")
print(f"  Kanien'kéha App — Data Validation")
print(f"{'='*60}")
print(f"  {GLOSSARY_PATH}: {len(glossary)} entries")
print(f"  {PHRASES_PATH}:  {len(phrases)} entries")
print(f"  {UNITS_PATH}: {len(units)} units, "
      f"{sum(len(u.get('lessons',[])) for u in units)} lessons, "
      f"{sum(len(l.get('exercises',[])) for u in units for l in u.get('lessons',[]))} exercises")
print(f"{'='*60}\n")

if not errors and not warnings:
    print("  ✓  All checks passed. No errors or warnings.\n")
    sys.exit(0)

# Group errors by check
by_check = defaultdict(list)
for cid, loc, msg in errors:
    by_check[cid].append((loc, msg))

by_check_warn = defaultdict(list)
for cid, loc, msg in warnings:
    by_check_warn[cid].append((loc, msg))

for check_id in sorted(set(list(by_check.keys()) + list(by_check_warn.keys()))):
    errs  = by_check.get(check_id, [])
    warns = by_check_warn.get(check_id, [])
    label = CHECK_NAMES.get(check_id, f'Check {check_id}')
    prefix = '✗ ERROR' if errs else '⚠ WARN '
    print(f"  {prefix}  [{check_id:02d}] {label}")
    if not SUMMARY_ONLY:
        for loc, msg in (errs + warns)[:20]:
            print(f"          {loc}")
            print(f"            → {msg}")
        overflow = len(errs + warns) - 20
        if overflow > 0:
            print(f"          … and {overflow} more (run without --summary to see all)")
    else:
        total = len(errs) + len(warns)
        print(f"          {total} instance(s)")
    print()

print(f"{'─'*60}")
print(f"  {len(errors)} error(s)   {len(warnings)} warning(s)")

if FIX_REPORT and errors:
    print(f"\n{'='*60}")
    print(f"  Fix report")
    print(f"{'='*60}")
    for check_id, locs in sorted(fix_groups.items()):
        print(f"\n  [{check_id:02d}] {CHECK_NAMES.get(check_id,'')} — {len(locs)} to fix")
        for loc in locs[:10]:
            print(f"       {loc}")
        if len(locs) > 10:
            print(f"       … and {len(locs)-10} more")

print()
sys.exit(0 if not errors else 1)

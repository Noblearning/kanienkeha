#!/usr/bin/env python3
"""
fix_data.py
===========
Fixes four pre-existing data issues surfaced by validate.py.

  FIX A  [13] mc correct not in options (234 exercises)
          Replaces correct with the best-matching option string.

  FIX B  [08/09] Missing unit/lesson fields (489 glossary + phrase entries)
          Defaults missing unit/lesson to 0 (marks entry as unplaced).

  FIX C  [10] Invalid pos values in data_phrases.json (821 entries)
          Maps free-text pos labels to the controlled vocabulary.

  FIX D  [04] 52 exercise wids that resolve only in PHRASES, not GLOSS
          The app resolves wids via GLOSS.find() only. Exercises referencing
          a wid that exists solely in data_phrases.json silently fail.
          This fix reports the affected exercises but does NOT auto-rename IDs
          — that requires manually verifying which glossary entry each phrase
          wid should point to, or adding stub glossary entries.

Usage
-----
  python3 fix_data.py              # dry run — shows all changes, writes nothing
  python3 fix_data.py --apply      # writes patched files
  python3 fix_data.py --fix-a      # apply fix A only
  python3 fix_data.py --fix-b      # apply fix B only
  python3 fix_data.py --fix-c      # apply fix C only
  python3 fix_data.py --report-d   # report fix D items only (never auto-applied)

Run from the folder containing the data_*.json files.
"""

import json
import sys
import os
from difflib import SequenceMatcher
from collections import defaultdict

APPLY    = '--apply' in sys.argv
ONLY_A   = '--fix-a' in sys.argv
ONLY_B   = '--fix-b' in sys.argv
ONLY_C   = '--fix-c' in sys.argv
REPORT_D = '--report-d' in sys.argv

RUN_A = APPLY or ONLY_A
RUN_B = APPLY or ONLY_B
RUN_C = APPLY or ONLY_C

DRY = not (RUN_A or RUN_B or RUN_C)

GLOSSARY_PATH = 'data_glossary.json'
PHRASES_PATH  = 'data_phrases.json'
UNITS_PATH    = 'data_units.json'

# ── pos mapping for Fix C ─────────────────────────────────────────
# Maps every free-text pos value found in data_phrases.json to the
# nearest controlled vocabulary value.
POS_MAP = {
    # Generic phrase labels → particle.discourse (catch-all for phrases
    # that function as discourse units without a cleaner fit)
    'Phrase':                           'particle.discourse',
    'phrase':                           'particle.discourse',
    'Conversational Phrase':            'particle.discourse',
    'conversational phrase':            'particle.discourse',
    'cognitive phrase':                 'particle.discourse',
    'learning phrase':                  'particle.discourse',
    'metalinguistic question':          'particle.discourse',
    'qualifier phrase':                 'particle.discourse',
    'qualifier phrase — time':          'particle.temporal',
    'temporal phrase':                  'particle.temporal',
    'time expression':                  'particle.temporal',
    'noun — time':                      'particle.temporal',
    'noun — time of day':               'particle.temporal',
    'locative response':                'particle.locative',

    # Greeting / expression labels
    'Greeting':                         'particle.discourse',
    'greeting phrase':                  'particle.discourse',
    'greeting response':                'particle.discourse',
    'greeting — full form':             'particle.discourse',
    'greeting response — full form':    'particle.discourse',
    'greeting — variant':               'particle.discourse',
    'particle — greeting':              'particle.discourse',
    'Expression':                       'particle.discourse',

    # Question labels
    'question phrase':                  'particle.question',
    'Question phrase — Clan':           'particle.question',
    'question word':                    'particle.question',
    'question phrase — food':           'particle.question',
    'question phrase — time':           'particle.question',
    'question phrase — introduction':   'particle.question',

    # Negation labels
    'Particle — Negation':              'particle.negation',
    'particle phrase — negation':       'particle.negation',
    'verb phrase — negation':           'particle.negation',

    # Direction / sentence pattern labels
    'sentence — direction':             'verb.direction',
    'sentence pair — direction':        'verb.direction',
    'Verb Phrase — Direction':          'verb.direction',
    'Verb phrase — Clan':               'particle.discourse',
    'sentence — dialogue':              'particle.discourse',
    'response phrase — introduction':   'particle.discourse',
    'introduction phrase — age':        'particle.discourse',
    'sentence pattern — age':           'particle.discourse',
    'phrase — descriptive':             'particle.discourse',
    'imperative phrase':                'verb.active',

    # Verb phrase labels
    'verb phrase — perception':         'verb.stative',
    'verb — preference':                'verb.stative',
    'stative verb — desire':            'verb.stative',
    'stative verb — desire (negated)':  'verb.stative',

    # Food labels
    'phrase — food/negation':           'particle.discourse',
    'phrase — food/completion':         'particle.discourse',
    'response phrase — food':           'particle.discourse',
    'response phrase — food (negated)': 'particle.discourse',

    # Ceremonial labels
    'Verb Phrase — Ceremonial':         'particle.discourse',
    'Phrase — Ceremonial':              'particle.discourse',
    'Ceremonial Phrase':                'particle.discourse',
}

# ── Load files ────────────────────────────────────────────────────

def load(path):
    with open(path, encoding='utf-8') as f:
        return json.load(f)

def save(path, data):
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write('\n')

glossary = load(GLOSSARY_PATH)
phrases  = load(PHRASES_PATH)
units    = load(UNITS_PATH)

g_ids = {e['id'] for e in glossary}
p_ids = {e['id'] for e in phrases}
all_ids = g_ids | p_ids

# ════════════════════════════════════════════════════════════════
# FIX A — mc correct not in options
# ════════════════════════════════════════════════════════════════

def best_match(correct, options):
    scores = [(o, SequenceMatcher(None, correct.lower(), o.lower()).ratio())
              for o in options]
    return max(scores, key=lambda x: x[1])

fix_a_changes = []   # (unit_id, lesson_id, wid, old_correct, new_correct)
units_patched_a = 0

for u in units:
    for l in u['lessons']:
        for e in l.get('exercises', []):
            if e['type'] != 'mc':
                continue
            correct = e.get('correct', '')
            options = e.get('options', [])
            if correct in options:
                continue
            best_opt, score = best_match(correct, options)
            fix_a_changes.append((
                u['id'], l['id'], e.get('wid', '?'),
                correct, best_opt, round(score, 2)
            ))

print(f"\n{'='*62}")
print(f"  FIX A — mc correct not in options")
print(f"{'='*62}")
print(f"  {len(fix_a_changes)} exercises to fix")
if fix_a_changes:
    low = [(x) for x in fix_a_changes if x[5] < 0.5]
    print(f"  ({len(low)} with similarity score < 0.5 — verify these)")
    print()
    for uid, lid, wid, old, new, score in fix_a_changes[:6]:
        flag = ' ⚠ LOW' if score < 0.5 else ''
        print(f"  unit={uid} lesson={lid} wid={wid} score={score}{flag}")
        print(f"    was: {old!r}")
        print(f"    now: {new!r}")
    if len(fix_a_changes) > 6:
        print(f"  … and {len(fix_a_changes)-6} more")

if RUN_A:
    for u in units:
        for l in u['lessons']:
            for e in l.get('exercises', []):
                if e['type'] != 'mc':
                    continue
                correct = e.get('correct', '')
                options = e.get('options', [])
                if correct in options:
                    continue
                best_opt, _ = best_match(correct, options)
                e['correct'] = best_opt
    print(f"\n  ✓ Fix A applied — {len(fix_a_changes)} mc exercises patched")

# ════════════════════════════════════════════════════════════════
# FIX B — missing unit/lesson fields
# ════════════════════════════════════════════════════════════════

fix_b_gloss = [e for e in glossary if 'unit' not in e or 'lesson' not in e]
fix_b_phrase = [e for e in phrases if 'unit' not in e or 'lesson' not in e]

print(f"\n{'='*62}")
print(f"  FIX B — missing unit/lesson fields")
print(f"{'='*62}")
print(f"  {len(fix_b_gloss)} glossary entries missing unit/lesson")
print(f"  {len(fix_b_phrase)} phrase entries missing unit/lesson")
print(f"  → All defaulted to unit=0, lesson=0 (marks entry as unplaced)")
if fix_b_gloss:
    sample_ids = [e['id'] for e in fix_b_gloss[:6]]
    print(f"  Sample glossary: {sample_ids}")
if fix_b_phrase:
    sample_ids = [e['id'] for e in fix_b_phrase[:6]]
    print(f"  Sample phrases:  {sample_ids}")

if RUN_B:
    for e in glossary:
        if 'unit' not in e:
            e['unit'] = 0
        if 'lesson' not in e:
            e['lesson'] = 0
    for e in phrases:
        if 'unit' not in e:
            e['unit'] = 0
        if 'lesson' not in e:
            e['lesson'] = 0
    print(f"\n  ✓ Fix B applied — {len(fix_b_gloss)+len(fix_b_phrase)} entries updated")

# ════════════════════════════════════════════════════════════════
# FIX C — invalid pos values in phrases
# ════════════════════════════════════════════════════════════════

VALID_POS = set(POS_MAP.values()) | {
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

fix_c_changes = []
unmapped = []
for e in phrases:
    pos = e.get('pos', '')
    if pos in VALID_POS:
        continue
    if pos in POS_MAP:
        fix_c_changes.append((e['id'], pos, POS_MAP[pos]))
    else:
        unmapped.append((e['id'], pos))

print(f"\n{'='*62}")
print(f"  FIX C — invalid pos values in phrases")
print(f"{'='*62}")
print(f"  {len(fix_c_changes)} entries to remap")
print(f"  {len(unmapped)} entries with unmapped pos (will be set to 'particle.discourse')")
if unmapped:
    for iid, pos in unmapped[:5]:
        print(f"    {iid}: {pos!r}")

if RUN_C:
    for e in phrases:
        pos = e.get('pos', '')
        if pos in VALID_POS:
            continue
        e['pos'] = POS_MAP.get(pos, 'particle.discourse')
    print(f"\n  ✓ Fix C applied — {len(fix_c_changes)+len(unmapped)} phrase entries updated")

# ════════════════════════════════════════════════════════════════
# FIX D (report only) — exercise wids resolving only in PHRASES
# ════════════════════════════════════════════════════════════════

phrase_only_ids = p_ids - g_ids
broken_wid_exercises = []

for u in units:
    for l in u['lessons']:
        for e in l.get('exercises', []):
            # top-level wid
            wid = e.get('wid')
            if wid and wid in phrase_only_ids:
                broken_wid_exercises.append({
                    'unit': u['id'], 'lesson': l['id'],
                    'type': e['type'], 'wid': wid, 'source': 'wid'
                })
            # match pair wids
            for i, pair in enumerate(e.get('pairs', [])):
                for w in pair.get('wids', []):
                    if w in phrase_only_ids:
                        broken_wid_exercises.append({
                            'unit': u['id'], 'lesson': l['id'],
                            'type': f'match pair[{i}]', 'wid': w, 'source': 'pair.wids'
                        })
            # dialogue wids_tested
            for w in e.get('wids_tested', []):
                if w in phrase_only_ids:
                    broken_wid_exercises.append({
                        'unit': u['id'], 'lesson': l['id'],
                        'type': 'dialogue', 'wid': w, 'source': 'wids_tested'
                    })

print(f"\n{'='*62}")
print(f"  FIX D (report only) — exercise wids in PHRASES but not GLOSS")
print(f"{'='*62}")
print(f"  {len(broken_wid_exercises)} exercise references that will silently fail")
print(f"  The app resolves wids via GLOSS.find() only — phrase-only IDs never resolve.")
print(f"  Resolution options per exercise:")
print(f"    1. Add the phrase entry to data_glossary.json as a vocabulary word")
print(f"    2. Change the wid to an existing glossary ID that covers the same concept")
print(f"    3. Remove the wid (for story/audio exercises where it's supplementary)")
print()

by_wid = defaultdict(list)
for item in broken_wid_exercises:
    by_wid[item['wid']].append(item)

for wid in sorted(by_wid):
    phrase_entry = next((e for e in phrases if e['id'] == wid), None)
    meaning = phrase_entry.get('english', '?') if phrase_entry else '?'
    items = by_wid[wid]
    print(f"  {wid!r:12s}  ({meaning[:45]})")
    for item in items[:3]:
        print(f"    unit={item['unit']} lesson={item['lesson']} type={item['type']}")
    if len(items) > 3:
        print(f"    … and {len(items)-3} more references")

# ════════════════════════════════════════════════════════════════
# Write files
# ════════════════════════════════════════════════════════════════

print(f"\n{'='*62}")
if DRY:
    print(f"  DRY RUN — no files written.")
    print(f"  Run with --apply to write all fixes, or --fix-a / --fix-b / --fix-c")
    print(f"  for individual fixes. Fix D is report-only and is never auto-applied.")
else:
    if RUN_A:
        save(UNITS_PATH, units)
        print(f"  ✓ {UNITS_PATH} written")
    if RUN_B or RUN_C:
        if RUN_B:
            save(GLOSSARY_PATH, glossary)
            print(f"  ✓ {GLOSSARY_PATH} written")
        save(PHRASES_PATH, phrases)
        print(f"  ✓ {PHRASES_PATH} written")
    print(f"\n  Run validate.py to confirm all targeted errors are resolved.")
print()

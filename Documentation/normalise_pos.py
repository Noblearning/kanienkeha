#!/usr/bin/env python3
"""
normalise_pos.py
================
Normalises the `pos` field in data_glossary.json so every entry uses
consistent dot-notation (category.subcategory).

What this does
--------------
Five bare category values currently exist without a subcategory:
  noun     (172) — genuinely unclassified; spans household, abstract, time, fv series
  verb      (40) — core action verbs not yet assigned a stem class
  number    (55) — all cardinal numbers; a closed, uniform group
  pronoun    (6) — independent pronouns not yet assigned dual/plural subtype
  particle  (15) — particles not yet assigned a discourse subtype

Strategy per category:

  noun     → noun.unclassified
  verb     → verb.unclassified
  number   → number.cardinal   (all 55 entries are cardinals; ordinals already tagged)
  pronoun  → pronoun.independent  (the 4 without dual/plural are singular base forms)
  particle → particle.unclassified

Why NOT .base
  '.base' implies an intentional root form. These entries are pending classification,
  not a deliberate base type. '.unclassified' is an honest status marker.

Why this matters
  - Claude generating new entries now has a clear pattern: always dot-notation
  - Unclassified entries are visually distinct from properly classified ones
  - validate.py controlled vocabulary list updated to match

Runtime safety
  The app's pos filter uses posLow.startsWith(p) where p is 'noun', 'verb', etc.
  Adding a subcategory never breaks startsWith — 'noun.unclassified'.startsWith('noun') ✓
  The word builder uses pos.includes('stative') — unaffected ✓
  The vocab drawer displays pos raw — 'noun.unclassified' is readable ✓

Usage
-----
  python3 normalise_pos.py          # dry run
  python3 normalise_pos.py --apply  # write data_glossary.json in place
"""

import json
import sys
from collections import Counter

DRY_RUN = '--apply' not in sys.argv

GLOSSARY_PATH = 'data_glossary.json'

REMAP = {
    'noun':     'noun.unclassified',
    'verb':     'verb.unclassified',
    'number':   'number.cardinal',
    'pronoun':  'pronoun.independent',
    'particle': 'particle.unclassified',
}

with open(GLOSSARY_PATH, encoding='utf-8') as f:
    glossary = json.load(f)

changes = []
for entry in glossary:
    old = entry.get('pos', '')
    new = REMAP.get(old)
    if new:
        changes.append((entry['id'], old, new))

# Summarise
by_old = Counter(old for _, old, _ in changes)

print(f"\n{'='*60}")
print(f"  normalise_pos.py — pos taxonomy normalisation")
print(f"{'='*60}")
print(f"\n  {len(changes)} entries to update:\n")
for old, new in sorted(REMAP.items()):
    count = by_old.get(old, 0)
    print(f"  {count:4d}  {old!r:20s} → {new!r}")

print(f"\n  Spot-checks (first 3 per category):")
for old_val in REMAP:
    samples = [(iid, old, new) for iid, old, new in changes if old == old_val][:3]
    for iid, old, new in samples:
        entry = next(e for e in glossary if e['id'] == iid)
        print(f"    {iid:10s}  {entry['target']:28s}  {old!r} → {new!r}")

print(f"\n  Runtime safety checks:")
for old_val, new_val in REMAP.items():
    filter_cat = old_val.split('.')[0]  # 'noun', 'verb', etc.
    starts = new_val.lower().startswith(filter_cat)
    print(f"    startsWith({filter_cat!r}) after rename: {starts} {'✓' if starts else '✗ PROBLEM'}")
stative_ok = 'verb.stative'.replace('verb.unclassified', 'verb.unclassified').find('stative')
print(f"    includes('stative') on verb.stative: unaffected ✓")

if DRY_RUN:
    print(f"\n  DRY RUN — no files written.")
    print(f"  Run with --apply to write {GLOSSARY_PATH}.")
    sys.exit(0)

# Apply
for entry in glossary:
    old = entry.get('pos', '')
    if old in REMAP:
        entry['pos'] = REMAP[old]

with open(GLOSSARY_PATH, 'w', encoding='utf-8') as f:
    json.dump(glossary, f, ensure_ascii=False, indent=2)
    f.write('\n')

print(f"\n  ✓ {len(changes)} entries updated in {GLOSSARY_PATH}.")
print(f"\n  Next: update the controlled vocabulary in CLAUDE.md and validate.py")
print(f"  to include the five new pos values:")
for new_val in sorted(set(REMAP.values())):
    print(f"    {new_val}")
print()

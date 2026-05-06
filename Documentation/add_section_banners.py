#!/usr/bin/env python3
"""
add_section_banners.py
======================
Adds or upgrades section banners in index.html so every major JS section
is findable with a single grep for its § tag.

Strategy
--------
- Sections that already have a ══ banner get a § tag inserted into their
  existing first line (non-destructive — the rest of the block is untouched).
- Sections with a weaker ── banner or no banner get a full ══ banner inserted
  above the first function/statement of that section.
- The § tag format is:  § SECTION-NAME
  grep pattern: grep -n "§" index.html

After this script, navigating to any section is:
    grep -n "§ EXERCISE ENGINE" index.html

Usage
-----
    python3 add_section_banners.py [--apply]

Without --apply: dry run — prints every change, writes nothing.
With    --apply: writes index.html in place.

Run from the folder containing index.html.
"""

import sys
import re

DRY_RUN = '--apply' not in sys.argv
HTML_PATH = 'index.html'

with open(HTML_PATH, encoding='utf-8') as f:
    html = f.read()

changes = []  # list of (description, old, new)

def replace(description, old, new):
    """Register a replacement. Verifies old string is present exactly once."""
    count = html.count(old)
    if count == 0:
        print(f"  SKIP (not found): {description}")
        return
    if count > 1:
        print(f"  WARN (found {count}x — skipping): {description}")
        return
    changes.append((description, old, new))


# ── 1. Existing ══ banners — insert § tag into first line ────────
#    These already look good; we just add the grep anchor.

replace(
    "§ LOCAL PROFILE SYSTEM",
    "/* ══════════════════════════════════════════════════════════\n"
    "   LOCAL PROFILE SYSTEM\n",
    "/* ══════════════════════════════════════════════════════════ § LOCAL PROFILE SYSTEM\n"
    "   LOCAL PROFILE SYSTEM\n",
)

replace(
    "§ PROFICIENCY",
    "/* ══════════════════════════════════════════════════════════\n"
    "   PROFICIENCY — SM-2 spaced repetition\n",
    "/* ══════════════════════════════════════════════════════════ § PROFICIENCY\n"
    "   PROFICIENCY — SM-2 spaced repetition\n",
)

replace(
    "§ NAV",
    "/* ══════════════════════════════════════════════════════════\n"
    "   NAV\n"
    "   ══════════════════════════════════════════════════════════ */\n",
    "/* ══════════════════════════════════════════════════════════ § NAV\n"
    "   NAV\n"
    "   ══════════════════════════════════════════════════════════ */\n",
)

replace(
    "§ PRACTICE",
    "/* ══════════════════════════════════════════════════════════\n"
    "   PRACTICE FAB + MINI-SESSION ENGINE\n",
    "/* ══════════════════════════════════════════════════════════ § PRACTICE\n"
    "   PRACTICE FAB + MINI-SESSION ENGINE\n",
)

replace(
    "§ HOME UI",
    "/* ══════════════════════════════════════════════════════════\n"
    "   HOME UI\n"
    "   ══════════════════════════════════════════════════════════ */\n",
    "/* ══════════════════════════════════════════════════════════ § HOME UI\n"
    "   HOME UI\n"
    "   ══════════════════════════════════════════════════════════ */\n",
)

replace(
    "§ DATA",
    "/* ══════════════════════════════════════════════════════════\n"
    "   DATA — loaded from external JSON files at runtime.\n",
    "/* ══════════════════════════════════════════════════════════ § DATA\n"
    "   DATA — loaded from external JSON files at runtime.\n",
)

replace(
    "§ EXERCISE ENGINE",
    "/* ══════════════════════════════════════════════════════════\n"
    "   EXERCISE ENGINE\n"
    "   ══════════════════════════════════════════════════════════ */\n",
    "/* ══════════════════════════════════════════════════════════ § EXERCISE ENGINE\n"
    "   EXERCISE ENGINE\n"
    "   ══════════════════════════════════════════════════════════ */\n",
)

replace(
    "§ SYLLABARY PRACTICE ENGINE",
    "/* ══════════════════════════════════════════════════════════\n"
    "   SYLLABARY PRACTICE ENGINE\n"
    "   ══════════════════════════════════════════════════════════ */\n",
    "/* ══════════════════════════════════════════════════════════ § SYLLABARY PRACTICE ENGINE\n"
    "   SYLLABARY PRACTICE ENGINE\n"
    "   ══════════════════════════════════════════════════════════ */\n",
)

replace(
    "§ PHRASES ENGINE",
    "/* ══════════════════════════════════════════════════════════\n"
    "   PHRASES ENGINE\n"
    "   ══════════════════════════════════════════════════════════ */\n",
    "/* ══════════════════════════════════════════════════════════ § PHRASES ENGINE\n"
    "   PHRASES ENGINE\n"
    "   ══════════════════════════════════════════════════════════ */\n",
)

replace(
    "§ WORD BUILDER ENGINE",
    "/* ══════════════════════════════════════════════════════════\n"
    "   WORD BUILDER ENGINE — PREFIX RULE SYSTEM\n",
    "/* ══════════════════════════════════════════════════════════ § WORD BUILDER ENGINE\n"
    "   WORD BUILDER ENGINE — PREFIX RULE SYSTEM\n",
)


# ── 2. Weak ── banners — upgrade to ══ with § tag ────────────────

replace(
    "§ DIALOGUE ENGINE",
    "/* ── DIALOGUE ENGINE ─────────────────────────────────────────── */\n",
    "/* ══════════════════════════════════════════════════════════ § DIALOGUE ENGINE\n"
    "   DIALOGUE ENGINE\n"
    "   ══════════════════════════════════════════════════════════ */\n",
)

replace(
    "§ FEEDBACK / REPORT",
    "/* ── DUOLINGO DRAWER — swipe, report, submit ── */\n",
    "/* ══════════════════════════════════════════════════════════ § FEEDBACK / REPORT\n"
    "   FEEDBACK / REPORT — drawer swipe, report panel, GitHub issue submit\n"
    "   ══════════════════════════════════════════════════════════ */\n",
)


# ── 3. Missing banners — insert above first function ─────────────

replace(
    "§ GLOSSARY",
    "function renderGloss(){\n",
    "/* ══════════════════════════════════════════════════════════ § GLOSSARY\n"
    "   GLOSSARY — search, filter, alpha bar, vocab detail drawer\n"
    "   ══════════════════════════════════════════════════════════ */\n"
    "function renderGloss(){\n",
)


# ── 4. Report ─────────────────────────────────────────────────────

print(f"{'DRY RUN — no files written' if DRY_RUN else 'APPLYING CHANGES'}")
print("─" * 52)
print(f"\n{len(changes)} replacements queued:\n")
for desc, old, new in changes:
    print(f"  ✓  {desc}")

# ── 5. Apply ─────────────────────────────────────────────────────

if DRY_RUN:
    print("\nRun with --apply to write index.html.")
    sys.exit(0)

patched = html
for desc, old, new in changes:
    patched = patched.replace(old, new, 1)

with open(HTML_PATH, 'w', encoding='utf-8') as f:
    f.write(patched)

print(f"\nDone. {len(changes)} banners added/upgraded in {HTML_PATH}.")
print("\nVerify with:")
print('  grep -n "§" index.html')

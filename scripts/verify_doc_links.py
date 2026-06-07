#!/usr/bin/env python3
"""Verify all local markdown links resolve to existing files."""
from pathlib import Path
import re, sys
root = Path('.')
errors = 0
for md in sorted(root.glob('docs/*.md')):
    text = md.read_text(encoding='utf-8')
    for m in re.finditer(r'\]\(([^)]+)\)', text):
        target = m.group(1)
        if target.startswith(('http://','https://','#')):
            continue
        p = (md.parent / target).resolve()
        if not p.exists():
            print(f'BROKEN: {md} -> {target}')
            errors += 1
if errors:
    sys.exit(1)
print(f'✓ All local links OK ({len(list(root.glob("docs/*.md")))} docs checked)')

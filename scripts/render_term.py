#!/usr/bin/env python3
"""
render_term.py - Renders terminal-style PNG screenshots from text content.
Usage: python3 render_term.py --output out.png --title "Window Title" - < text.txt
       python3 render_term.py --output out.png --title "..." --text "line1\nline2"
"""

import argparse
import sys
import textwrap
import re
from pathlib import Path

try:
    import cairosvg
except ImportError:
    print("ERROR: cairosvg not installed. pip install cairosvg", file=sys.stderr)
    sys.exit(1)

# ── Color palette (dark terminal) ──────────────────────────────────────────
BG       = "#1e1e2e"   # deep dark bg
CHROME   = "#313244"   # titlebar
DOT_RED  = "#f38ba8"
DOT_YEL  = "#f9e2af"
DOT_GRN  = "#a6e3a1"
TEXT     = "#cdd6f4"   # default fg
DIM      = "#6c7086"   # comments / dim
GREEN    = "#a6e3a1"
YELLOW   = "#f9e2af"
CYAN     = "#89dceb"
BLUE     = "#89b4fa"
MAGENTA  = "#cba6f7"
RED      = "#f38ba8"
WHITE    = "#cdd6f4"
BOLD_GRN = "#a6e3a1"

FONT = "monospace"
FONT_SIZE = 13
LINE_H = 20
PADDING_X = 18
PADDING_TOP = 48
CHROME_H = 32

# ── ANSI → SVG span helper ─────────────────────────────────────────────────
ANSI_COLORS = {
    "30": "#45475a", "31": RED, "32": GREEN, "33": YELLOW,
    "34": BLUE,  "35": MAGENTA, "36": CYAN, "37": WHITE,
    "90": DIM,   "91": RED, "92": GREEN, "93": YELLOW,
    "94": BLUE,  "95": MAGENTA, "96": CYAN, "97": WHITE,
    "1":  None,  # bold — handled separately
}

def escape_xml(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;").replace('"', "&quot;")

def ansi_to_spans(line):
    """Convert ANSI escape codes to SVG tspan elements."""
    # strip raw ANSI
    segments = []
    cur_color = TEXT
    cur_bold = False
    pos = 0
    ansi_re = re.compile(r'\x1b\[([0-9;]*)m')
    for m in ansi_re.finditer(line):
        if m.start() > pos:
            segments.append((line[pos:m.start()], cur_color, cur_bold))
        codes = m.group(1).split(";") if m.group(1) else ["0"]
        for code in codes:
            if code == "0" or code == "":
                cur_color = TEXT; cur_bold = False
            elif code == "1":
                cur_bold = True
            elif code in ANSI_COLORS and ANSI_COLORS[code] is not None:
                cur_color = ANSI_COLORS[code]
        pos = m.end()
    if pos < len(line):
        segments.append((line[pos:], cur_color, cur_bold))
    
    out = []
    for text, color, bold in segments:
        if not text:
            continue
        style = f"fill:{color}"
        if bold:
            style += ";font-weight:bold"
        out.append(f'<tspan style="{style}">{escape_xml(text)}</tspan>')
    return "".join(out) if out else f'<tspan style="fill:{TEXT}"> </tspan>'

def colorize_line(line):
    """Detect line patterns and apply appropriate colors (for plain text)."""
    stripped = line.strip()
    
    # Already has ANSI? convert directly
    if '\x1b[' in line:
        return ansi_to_spans(line)
    
    # Prompt line
    if re.match(r'^[~$/].*[\$#>]\s', line) or line.startswith("$ ") or line.startswith("❯ "):
        # Split at the $ or ❯
        m = re.match(r'^(.*?[\$#❯>]\s)(.*)', line)
        if m:
            prompt = f'<tspan style="fill:{GREEN};font-weight:bold">{escape_xml(m.group(1))}</tspan>'
            cmd = f'<tspan style="fill:{WHITE}">{escape_xml(m.group(2))}</tspan>'
            return prompt + cmd
    
    # Success / checkmark lines
    if stripped.startswith("✓") or stripped.startswith("✔") or stripped.startswith("Done"):
        return f'<tspan style="fill:{GREEN}">{escape_xml(line)}</tspan>'
    
    # Warning
    if stripped.startswith("⚠") or "warn" in stripped.lower():
        return f'<tspan style="fill:{YELLOW}">{escape_xml(line)}</tspan>'
    
    # Error / fail
    if stripped.startswith("✗") or stripped.startswith("ERROR") or stripped.startswith("error"):
        return f'<tspan style="fill:{RED}">{escape_xml(line)}</tspan>'
    
    # Info bullet
    if stripped.startswith("i ") or stripped.startswith("ℹ"):
        return f'<tspan style="fill:{CYAN}">{escape_xml(line)}</tspan>'
    
    # Dim / comment
    if stripped.startswith("#") or stripped.startswith("--"):
        return f'<tspan style="fill:{DIM}">{escape_xml(line)}</tspan>'
    
    # Version lines
    if re.match(r'^[a-z].*?v?[\d]+\.[\d]+', stripped):
        return f'<tspan style="fill:{CYAN}">{escape_xml(line)}</tspan>'
    
    # Section headers / GSD ascii banner
    if stripped.upper() == stripped and len(stripped) > 3 and stripped.replace(" ", "").isalpha():
        return f'<tspan style="fill:{MAGENTA};font-weight:bold">{escape_xml(line)}</tspan>'
    
    return f'<tspan style="fill:{TEXT}">{escape_xml(line)}</tspan>'

def build_svg(title, lines, width=860):
    visible_lines = lines[:50]  # max 50 lines
    height = CHROME_H + PADDING_TOP - CHROME_H + (len(visible_lines) * LINE_H) + 24
    height = max(height, 120)
    
    svg_lines = []
    svg_lines.append(f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}">')
    svg_lines.append(f'  <rect width="{width}" height="{height}" rx="8" fill="{BG}"/>')
    
    # Title bar
    svg_lines.append(f'  <rect width="{width}" height="{CHROME_H}" rx="8" fill="{CHROME}"/>')
    svg_lines.append(f'  <rect y="20" width="{width}" height="12" fill="{CHROME}"/>')
    
    # Window dots
    svg_lines.append(f'  <circle cx="16" cy="16" r="5" fill="{DOT_RED}"/>')
    svg_lines.append(f'  <circle cx="32" cy="16" r="5" fill="{DOT_YEL}"/>')
    svg_lines.append(f'  <circle cx="48" cy="16" r="5" fill="{DOT_GRN}"/>')
    
    # Title text
    svg_lines.append(f'  <text x="{width//2}" y="20" text-anchor="middle" font-family="{FONT}" font-size="11" fill="{DIM}">{escape_xml(title)}</text>')
    
    # Terminal content
    svg_lines.append(f'  <text font-family="{FONT}" font-size="{FONT_SIZE}" xml:space="preserve">')
    for i, line in enumerate(visible_lines):
        y = PADDING_TOP + i * LINE_H
        colored = colorize_line(line)
        svg_lines.append(f'    <tspan x="{PADDING_X}" y="{y}">{colored}</tspan>')
    svg_lines.append('  </text>')
    svg_lines.append('</svg>')
    
    return "\n".join(svg_lines)

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--output", "-o", required=True)
    parser.add_argument("--title", "-t", default="Terminal")
    parser.add_argument("--text", default=None, help="Inline text (\\n-separated)")
    parser.add_argument("--width", type=int, default=860)
    args = parser.parse_args()
    
    if args.text:
        raw = args.text.replace("\\n", "\n")
    else:
        raw = sys.stdin.read()
    
    lines = raw.splitlines()
    # Word-wrap very long lines
    wrapped = []
    for ln in lines:
        if len(ln) > 100 and '\x1b' not in ln:
            for part in textwrap.wrap(ln, 98):
                wrapped.append(part)
        else:
            wrapped.append(ln)
    
    svg = build_svg(args.title, wrapped, width=args.width)
    out = Path(args.output)
    out.parent.mkdir(parents=True, exist_ok=True)
    
    cairosvg.svg2png(bytestring=svg.encode(), write_to=str(out), scale=2)
    print(f"✓ Written: {out} ({out.stat().st_size // 1024}KB)")

if __name__ == "__main__":
    main()

#!/usr/bin/env python3
"""Compress a saved `get_design_context` payload into something cheap to read.

get_design_context routinely returns 50-130KB of generated JSX. This turns it
into a digest of the parts that actually drive an implementation: the copy, the
layout-bearing classes, and the asset map.

  python3 scripts/figma-digest.py <file> --all
  python3 scripts/figma-digest.py <file> --text
  python3 scripts/figma-digest.py <file> --tree --grep "Table Header"
  python3 scripts/figma-digest.py <file> --assets

<file> is the path the MCP tool printed when it said the result was too large.
Accepts either the JSON array form or a raw text dump.
"""
import argparse, json, os, re, sys

# classes that never change an implementation decision
NOISE = re.compile(
    r'^(content-stretch|relative|shrink-0|block|inset-0|max-w-none|size-full|'
    r'\[word-break:break-word\]|whitespace-nowrap|min-w-px|min-h-px|overflow-clip)$'
)
KEEP = re.compile(
    r'^(flex|grid|absolute|fixed|w-|h-|size-|min-w-|max-w-|min-h-|gap-|p[xytblr]?-|'
    r'm[xytblr]?-|rounded|border|bg-|text-|font-|leading-|tracking-|items-|justify-|'
    r'flex-|order-|top-|left-|right-|bottom-|shadow|opacity|z-|col-|row-)'
)

def load(path):
    raw = open(path, encoding='utf-8').read()
    try:
        data = json.loads(raw)
        if isinstance(data, list):
            return "\n".join(e.get('text', '') for e in data if isinstance(e, dict))
    except json.JSONDecodeError:
        pass
    return raw

def prettify(text):
    out, depth = [], 0
    for tok in re.split(r'(<[^>]*>)', text):
        if tok.startswith('<'):
            if tok.startswith('</'):
                depth = max(depth - 1, 0); out.append(('  ' * depth) + tok)
            elif tok.endswith('/>'):
                out.append(('  ' * depth) + tok)
            else:
                out.append(('  ' * depth) + tok); depth += 1
        else:
            s = tok.strip()
            if s:
                out.append(('  ' * depth) + 'TEXT: ' + s)
    return out

CODE = re.compile(
    r'(=>|\bconst \b|\btype \b|\bprops\b|className|^\)?;?\}?$|^\);|^\{|^\}|'
    r'^import |\?:|: string|: boolean|"\w+" \|)'
)

def is_copy(text):
    """Keep human-facing strings, drop the generated TypeScript around them."""
    t = text.strip()
    if not t or len(t) > 400:
        return False
    return not CODE.search(t)

def slim(line):
    """Drop node ids, inline font hacks, and decorative classes."""
    line = re.sub(r'\s*data-node-id="[^"]*"', '', line)
    line = re.sub(r'\s*style=\{\{ fontVariationSettings[^}]*\}\}', '', line)
    def trim(m):
        kept = [c for c in m.group(1).split() if KEEP.match(c) and not NOISE.match(c)]
        return 'class="%s"' % ' '.join(kept) if kept else ''
    return re.sub(r'className="([^"]*)"', trim, line)

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('file')
    ap.add_argument('--text', action='store_true', help='copy only')
    ap.add_argument('--tree', action='store_true', help='named-node skeleton')
    ap.add_argument('--full', action='store_true', help='every node, not just named ones')
    ap.add_argument('--assets', action='store_true', help='asset constant -> nearest data-name')
    ap.add_argument('--all', action='store_true')
    ap.add_argument('--grep', help='only lines matching this regex (with context)')
    ap.add_argument('--context', type=int, default=6, help='lines of context for --grep')
    a = ap.parse_args()
    if not (a.text or a.tree or a.assets):
        a.all = True

    if not os.path.exists(a.file):
        sys.exit(f'not found: {a.file}')
    text = load(a.file)
    lines = prettify(text)

    if a.text or a.all:
        print('===== COPY =====')
        for i, l in enumerate(lines):
            if 'TEXT:' not in l:
                continue
            body = l.split('TEXT:', 1)[1]
            if is_copy(body):
                print(f'{i:5d} {l.rstrip()}')

    if a.assets or a.all:
        print('\n===== ASSETS =====')
        consts = dict(re.findall(r'const (img\w+) = "([^"]+)"', text))
        seen = set()
        for i, l in enumerate(lines):
            m = re.search(r'src=\{(img\w+)\}', l)
            if not m or m.group(1) in seen:
                continue
            seen.add(m.group(1))
            name = None
            for j in range(i - 1, max(0, i - 8), -1):
                dn = re.search(r'data-name="([^"]+)"', lines[j])
                if dn and dn.group(1) not in ('constraint', 'image', 'mask', 'Badge') \
                        and not dn.group(1).startswith('size='):
                    name = dn.group(1); break
            url = consts.get(m.group(1), '')
            print(f'{m.group(1):16s} {str(name):38s} {url.rsplit("/", 1)[-1]}')
        unused = [k for k in consts if k not in seen]
        if unused:
            print('(declared but unreferenced: %s)' % ', '.join(unused))

    if a.tree or a.all:
        print('\n===== STRUCTURE =====')
        slimmed = [slim(l) for l in lines]
        if a.grep:
            pat = re.compile(a.grep, re.I)
            hits = [i for i, l in enumerate(slimmed) if pat.search(l)]
            show = sorted({j for i in hits for j in range(max(0, i - 1), min(len(slimmed), i + a.context))})
            prev = None
            for i in show:
                if prev is not None and i != prev + 1:
                    print('  ...')
                print(f'{i:5d} {slimmed[i].rstrip()[:300]}')
                prev = i
        else:
            for i, l in enumerate(slimmed):
                s = l.rstrip()
                if not s or re.match(r'^\s*</?\w+>\s*$', s):
                    continue
                # skeleton mode: only nodes Figma named, i.e. the ones worth mapping
                if not a.full and 'data-name=' not in s and 'TEXT:' not in s:
                    continue
                print(f'{i:5d} {s[:300]}')

if __name__ == '__main__':
    main()

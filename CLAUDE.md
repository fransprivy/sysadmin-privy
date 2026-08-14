# Admin Center — agent context

Next.js 14 App Router + Tailwind. Cloning the Privy **SysAdmin-Prototype** Figma
file page by page. Figma file key: `7ziFoWatKsolh3Hak3AlkI`.

## Workflow for a new Figma page

The user pastes a Figma node URL. Do this, in order:

1. `get_screenshot` on the node (`maxDimension: 1500`, `enableBase64Response: true`) — look at it.
2. `get_design_context` on the node. It usually **exceeds the token limit and is saved to a file**.
   **Never read that file directly** — it is 50-130KB of generated JSX. Instead:
   ```
   python3 scripts/figma-digest.py <saved-file> --text --assets     # start here
   python3 scripts/figma-digest.py <saved-file> --tree --grep "Toolbar"   # then per section
   ```
   Measured on a 64KB payload: `--text --assets` is 4.5KB (93% smaller) and is enough to
   plan the whole page; each `--grep` costs ~3KB. `--tree` alone is 25KB and `--all` 30KB —
   reach for those only if the targeted greps genuinely miss something.
3. Download assets: `scripts/fetch-figma-assets.sh` (see `--help`), then `python3 scripts/gen-icons.py`.
4. Build the page reusing the inventory below. Match the frame's geometry.
5. Verify in the browser: `preview_start {name:"dev"}`, resize to the frame's size, screenshot,
   and check computed values with `javascript_tool` (getBoundingClientRect + getComputedStyle).
   **Measure, don't eyeball** — this is how every real bug so far was caught.
6. `npx next build` (rm -rf .next first if it errors about `_document`).
7. Commit and push **directly to `main`**. No PR unless the user asks.

## Layout constants (from the frames)

Topbar 60px · sidebar 285px · content area 1081px · reading column 721px at x=465.
`AdminLayout` owns all of it — never re-implement the topbar/sidebar/breadcrumbs.

`<AdminLayout trail={[...]} width="content|wide|bleed">`
- `content` (default) — 721px centred column. Settings-style pages.
- `wide` — fills the viewport. Data-table pages (721px wraps dates onto 3 lines).
- `bleed` — no padding/gap; the page owns its spacing. Needed when something spans
  the full content width, e.g. the User and role tab bar.

## Design tokens

Declared in `app/globals.css`, exposed in `tailwind.config.ts`. **Never use raw
Tailwind palette classes** (`text-gray-500`, `bg-blue-600`, …).

| Figma | class |
| --- | --- |
| bg/default · bg/layer1 | `bg-background` |
| bg/defaultAlpha | `bg-bg-alpha` |
| bg/ground | `bg-ground` |
| bg/info · bg/success · bg/warning | `bg-info` · `bg-success` · `bg-warning` |
| bg/subtle | `bg-surface-subtle` (`subtle` is taken by the fg colour) |
| fg/default | `text-foreground` |
| fg/subtle · fg/subtlest · fg/muted | `text-subtle` · `text-subtlest` · `text-muted` |
| fg/link · fg/info · fg/success · fg/warning · fg/danger | `text-link` · `text-info-fg` · `text-success-fg` · `text-warning-fg` · `text-danger-fg` |
| border/default · border/muted | `border-border` (#dbdbdc) · `border-border-muted` (#e7e7e8) |
| brand/accent · brand/logo | `text-accent`/`bg-accent` · `bg-logo` |
| teal/0 · teal/50 | `bg-teal0` · `text-teal50` |
| blue/green/teal/orange/purple/red 40 | `*-blue40` … `*-red40` |

Type ramp (DM Sans, weights 400/500/700 only — use `font-medium`, never `font-semibold`):
`text-caption2` 11 · `text-caption1` 12 · `text-p2` 14 · `text-p1` 16 · `text-b1` 16/0.4 · `text-h6` 20.
Elevation `shadow-small` / `shadow-medium`. Radii `rounded-sm` 6 · `rounded-md` 8 · `rounded-lg` 12.

**Primary CTA is brand red `#E42E2C`** (`<Button variant="primary">`), confirmed by
"Add employee". Blue is for links/toggles/status — `variant="accent"` if you need a
blue button. `variant="default"` is the neutral grey one.

## Component inventory — reuse, don't rebuild

`components/`: `AdminLayout` (+`AdminSection`), `Topbar`, `Sidebar`, `Breadcrumbs`, `icons/` (generated).
`components/ui/`: `button` `card` `badge` (info/success/warning/subtle/neutral/outline) `avatar` (initials fallback) `checkbox` `toast` `row-menu` (Edit/Delete)
`privy-logo` (4 brand lockups) `toggle` `pagination` `asset-library` (**the whole Enterprise seal/stamp page** — title,
optional Premium label, description, uploader + 192px tile grid; pass `tiles`).
`components/user-and-role/shared.tsx`: `Toolbar` (field selector + search + actions),
`TableToolbar` (title + search + actions, used by Admins/Document category/Groups),
`TableHeaderCell`, `SortableHeaderCell`, `TableCell`, `TableWrapper`, `CodeBadge`, `NoResults`, `EmptyState`, `CreateButton`.
Despite the folder name, the table primitives here are shared across list pages.

Adding a nav item: append to `SECTIONS` in `Sidebar.tsx`. Active state comes from
`usePathname()`; add `match: ['/detail-route']` for sub-pages.

## Traps that have already bitten (do not relearn these)

1. **`cn()` drops colours.** tailwind-merge reads custom sizes (`text-p2`, `text-h6`) as text
   *colours*. `lib/utils.ts` extends it — if you add a font size, add it there too.
2. **Layered SVGs need wrapper divs.** An absolutely positioned `<img>` is a replaced element:
   it takes its intrinsic size and ignores the opposing offset, so artwork renders clipped.
   Put the inset on a wrapper `div`, let the image fill it. See `ui/privy-logo.tsx`.
3. **Tailwind preflight caps images.** `img { max-width: 100% }` silently shrinks artwork
   the frame deliberately overflows past its container's padding (stamp tiles rendered
   142px instead of 148px). Add `max-w-none` — and `shrink-0` inside a flex tile.
4. **Squashed CTAs in Figma are accidents.** Several frames contain `Button / Text` instances
   resized to 19–23px tall inside a 32px bar with fractional widths and clipped labels.
   Render at the real 32px `size="sm"`. Check the instance height before copying a button.
5. **Avatar/person images export blank** (172-byte transparent PNGs) — they're placeholder fills
   bound to empty `person/*` variables. Use `<Avatar>` (initials fallback), don't commit them.
6. **`border-border-muted` is #e7e7e8** — table row rules, search fields and the rows-per-page
   select all use it. The Employee frame's older #f4f5f7 is too faint for control borders.
7. **Two token generations in the file.** Some frames show literal fallbacks from an older set
   (`#5b6778` for fg/subtle, `#1f2329` for fg/default). The **bound variables** resolve to the
   values above — trust `get_variable_defs`, not the literals in the generated code.
8. **Toasts are anchored 30px from the viewport's bottom-left in the frames**, which lands them
   on top of the sidebar. `ui/toast.tsx` offsets past the sidebar.
9. **Consistency beats per-frame fidelity** when frames disagree by a few px. Tabs of one page
   must not shift when switching. Say so in the commit message when you deviate.
10. **Check what an asset actually is before wiring it up.** Figma's layer names lie —
    `left_icon` on the Groups frame is a kebab, not the group avatar. Open the SVG (or the
    `--assets` map's data-name) and confirm the glyph matches before committing it.
11. **Figma raster exports don't upscale** past a node's natural size. For anything small, rebuild
   from the vector assets instead of exporting a PNG.
12. **Tailwind colours share one flat namespace.** `subtle` was already the fg colour, so
    adding a `bg/subtle` surface under the same key silently made `bg-subtle` resolve to the
    dark text grey. Give each role its own key; tsc catches the duplicate, the browser won't.
13. **`next build` clobbers the dev server's `.next`.** Stop the preview first, or `rm -rf .next`.

## Repo notes

- `main` is the working branch; commit straight to it. Built so far: Overview, User and role
  (4 tabs), Enterprise seal, Enterprise stamp, Email logo, Document category, Admins, Groups,
  Billing, Payment history, Reports (Balance usage tab).
- If `git push` fails with `remote: Internal Server Error` on the ref update, that was a
  transient GitHub incident (Aug 2026). Retry; if it persists, build the ref via the Git Data
  API (blobs → tree → commit → ref) and verify the tree hash matches local.
- Longer human-facing docs: `PROJECT_CONTEXT.md`.

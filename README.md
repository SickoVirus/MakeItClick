# Make It Click

Web design & redesign studio site. Next.js 16 (App Router) · TypeScript · Tailwind v4.

**Your business works. Your website should too.**

---

## Run it

```bash
npm install
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on `localhost:3000` |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Deploys to Vercel with zero configuration. No paid services, no API keys, no
runtime dependencies beyond React and Next.

---

## Where to edit things

Content lives in `src/data/`. You should not need to open a component to change
copy, projects, or services.

| File | Holds |
| --- | --- |
| `src/data/site.ts` | Brand strings, nav, socials, contact email |
| `src/data/projects.ts` | Selected work + every before/after miniature |
| `src/data/services.ts` | The four services |
| `src/data/process.ts` | Look → Think → Make → Click |
| `src/data/principles.ts` | Why It Clicks, and which demo each principle runs |

### Before launch

`contactEmail` in `src/data/site.ts` is the real inbox
(`makeitclickpe@gmail.com`); the whole CTA and both mail links point at it.

One placeholder remains, marked `TODO`:

- **`socials`** — each entry has `href: null`, which renders the name as plain
  text rather than a dead link. Fill in a URL and it becomes a real link.

---

## The before/after system

The miniature websites are **not screenshots**. They are live interfaces built
from data in `src/components/ui/MiniSite.tsx`, sized entirely in `cqw`
(container query units) so one component renders correctly at 280px in a card
and at 900px in the hero.

This is deliberate:

- nothing to download, nothing to optimise, no layout shift;
- every "before" is our own work — no real business's website is photographed
  and labelled bad.

### Six designs, not two templates

Each project carries its own art direction **in data** (`after.art` in
`projects.ts`): palette, typeface, layout and corner radius. A restaurant does
not come out looking like a dental clinic, and neither comes out looking like
us. The range is the content of the section, which is why it lives in data
rather than in the component.

| # | Sector | Direction |
| --- | --- | --- |
| 000 | Fitness (hero) | Black / acid yellow · poster type · numbers and one bar · `poster` |
| 001 | Hospitality | Bone / wine / ochre · high-contrast serif · the carta leads · `menu` |
| 002 | Health | Ice mint / pine / green · soft 14px corners · `clinic` |
| 003 | Professional services | Navy / bone / muted gold · ruled grid · `ledger` |

The "before" states are bad in four different ways too — `gradient` (the 2009
template), `promo` (saturated colours and a discount ribbon), `corporate`
(grey, dense, indistinguishable) and `builder` (a tidy, anonymous
drag-and-drop build). Set `before.flavor` to pick one.

### Every business appears exactly once

`heroDemo` (000, exported separately from the `projects` array) exists so the
hero does not demonstrate on the same business that opens Selected Work. And
Selected Work is the only place work is shown: the lead project gets the
draggable slider, the rest get one click each.

This is a rule, not a preference. An earlier build had a separate
"Before / After" section doing the same job as the portfolio list, and the
lead project ended up on the page **four** times — hero, feature section,
portfolio, and a principle demo. The work looked a quarter as deep as it was.
If you add a project, give it one home.

**None of these palettes are the Make It Click palette, and none of them are
tokens.** Ours is the frame; theirs is the work. Adding a fourth project means
adding an entry with its own `art` — and, if the sector calls for a layout the
three existing ones cannot carry, a fourth layout function.

`Project` carries optional `beforeImage` / `afterImage` fields. When real
project screenshots exist, add them and swap the render inside `MiniSite`.
Nothing else on the page has to change.

Two presentations of the same data, both in `BeforeAfter.tsx`:

- **`mode="slider"`** — draggable split. Pointer input lives on the frame
  (`touch-action: pan-y`): vertical swipes scroll the page, sideways drags move
  the split, a tap jumps it, a mouse drags it. A real `<input type="range">`
  sits underneath, unhittable, for keyboard and screen readers. Do not put the
  range input back on top: iOS only drags it from its invisible thumb, and
  Android grabs every scroll that starts on the frame.
- **`mode="toggle"`** — one click wipes the redesign across via `clip-path`.

Pass `url` and the component renders its own browser chrome, reporting
before/after state in the URL bar. That is not cosmetic: a badge floating over
the miniature covers the very thing it labels — the redesigned brand, top
left, every time.

---

## Design tokens

Every colour, type size, radius and easing is defined once, in the `@theme`
block at the top of `src/app/globals.css`. The only hex values elsewhere are
the ones that cannot read CSS: `themeColor` in `layout.tsx` and the social
card in `opengraph-image.tsx` (both annotated with the token they mirror), plus
the miniatures' own palettes, which are content, not tokens.

### Colour

```
--color-ink     #0B0B0B
--color-paper   #F7F5EF
--color-blue    #0066FF
--color-line    #E8E6E1
--color-grey    #6B6B6B
--color-on-blue #FFFFFF
```

Ratio discipline is roughly **80% ink/paper · 15% grey · 5% blue**. Blue is
never decoration: it marks interaction, change, selection and action. Anywhere
blue appears at rest, it should be answering "something happened here".

The one exception is the marquee band between the problem and the proof —
the single place blue takes a whole surface, because that band *is* the brand
speaking. Keep it to one.

The portfolio miniatures use their own sector palettes and are deliberately
outside this system. See "Six designs, not two templates" above.

**Three deliberate deviations from the brand palette, all for contrast:**

| Token | Value | Why |
| --- | --- | --- |
| `--color-grey` | `#6B6B6B` | The palette's `#787878` reaches only 4.05:1 on warm white — under WCAG AA for the 11px labels it is used for. This is the same grey at 4.89:1. |
| `--color-on-blue` | `#FFFFFF` | Text on an Electric Blue fill (hover buttons, "Después" chips, selection, marquee). Paper reaches only 4.43:1 there; white reaches 4.83:1. The blue itself never changes. |
| `--color-blue-on-paper` / `--color-blue-on-ink` | `#005AF0` / `#3D8BFF` | Electric Blue is a mid-tone: as *small text* it lands at 4.43:1 on paper and 4.07:1 on ink, both under AA. These two are the same blue shifted just far enough to clear it. |

The rule: **fills, rules and display-size glyphs use `--color-blue`.** Only
small blue *text* uses the two variants. To revert to the literal palette,
change those three values back — nothing else refers to them.

### Radius

`0` · `4px` · `8px`. That is the whole set. Nothing becomes a pill.

---

## Motion

Two reveals, and a rule about which is which.

- **`<Reveal>`** (default) fades and lifts a block. Safe on anything.
- **`<Reveal variant="mask">`** wipes a line up from its own baseline. Much
  stronger, and reserved for headline type.

The mask clips, so it must never wrap an interface — and the clip lives on an
**inner** element, never on the observed one. Putting `clip-path` on the
element the IntersectionObserver is watching shrinks that element's
intersection rectangle to zero, the callback never fires, and the headline
hides itself permanently. Its insets also run slightly negative on every side,
because display type set below a line-height of 1 puts caps and descenders
outside the line box.

Two more rules keep reveals from costing anything:

- **Content is only hidden when a script exists to show it.** An inline script
  in `<head>` adds `js` to `<html>` before first paint, and every hide rule is
  scoped under `.js`. With JavaScript off or failed, the page is simply there.
- **Above the fold, pass `immediate`.** The hero's reveals start with the first
  paint in pure CSS — no observer, no wait for React to hydrate. The hero
  headline is the page's LCP element; it must not sit behind the bundle.

### The one loop

The marquee is the only thing that moves on its own, so it answers to the
reader: a visible pause control (WCAG 2.2.2 — touch has no hover), a pause on
hover and focus, and a full stop while offscreen. The hero's "Click" attractor
pulses twice and rests.

---

## The brand gesture

`ClickBurst` (mounted once in the root layout) fires a short radial burst of
Electric Blue at the pointer — but only on elements that opt in with
`data-burst`. Clicking body text does nothing, which is the point: the burst
means *that click did something*.

`CursorLabel` shows a small trailing label over elements marked
`data-cursor="…"`. Constraints it respects:

- the native cursor is never hidden;
- fine pointers only — touch is untouched;
- it only repeats an affordance that already exists in the DOM, so keyboard and
  screen-reader users lose nothing by not seeing it;
- position is written straight to `transform` in one rAF per burst of
  movement — no re-renders, and no standing loop while the pointer is still.

Both switch themselves off entirely under `prefers-reduced-motion`.

---

## The form

`src/lib/submit.ts` is a one-function adapter.

**Today** it opens a prefilled email — no backend, no cost, nothing to
maintain. **When you want a real inbox**, set one environment variable:

```bash
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxx
```

Submissions then POST `{ website, source }` as JSON to that endpoint instead.
Works as-is with Formspree, Tally, or your own route handler. No component
changes.

---

## Accessibility

- Semantic landmarks, skip link, one `h1`, ordered heading levels.
- The page is `lang="es"`; the brand's English lines (hero statement, tagline,
  marquee, "Why it clicks", service names, Look → Click) carry `lang="en"` so
  screen readers switch voice.
- Why It Clicks is a real tabs pattern: roving tabindex, arrow keys, Home/End,
  labelled panel. Tabs are named by their title; the open one is described by
  its reasoning.
- Before/after is keyboard-operable via the range input, with `aria-valuetext`.
  The toggles are `aria-pressed` buttons with a constant name.
- Controls that fill a frame (before/after, hero demo) draw their focus ring on
  the frame (`.focus-frame`), since the frame's overflow would clip their own.
- The mobile menu makes the page behind it `inert`; Escape or Close returns
  focus to the Menu button.
- The CTA field carries `aria-invalid`, `aria-describedby` and a live region,
  and its underline turns blue and doubles on focus.
- Touch targets are at least 44px. The desktop nav links (fine pointer only,
  hidden below `md`) are ~28px — above the 24px WCAG 2.2 AA minimum.
- Focus is always visible and never removed: brand blue, or white on the blue
  marquee.
- `prefers-reduced-motion` stills the reveals and the marquee (whose pause
  control then hides) and turns off the burst and the cursor label.

## Performance

No image files, no icon font, no animation library, no carousel library. Three
fonts — Space Grotesk and Inter for the brand, Instrument Serif (one weight)
used only inside the hospitality miniature — all self-hosted and subset at
build time by `next/font`. Instrument Serif is not preloaded: nothing above the
fold uses it. Motion is CSS; the only JS observers are one per below-the-fold
revealed block (each disconnected the moment it fires) and the marquee's
offscreen check.

---

## Structure

```
src/
  app/            layout, page, tokens, icon, OG image, robots, sitemap
  components/
    brand/        ClickMark, Logo
    layout/       Navbar, Footer, Section, Marquee
    sections/     Hero, Problem, BeforeAfterFeature, SelectedWork,
                  Services, Process, WhyItClicks, WebsiteCTA
    ui/           ActionLink, BeforeAfter, BrowserFrame, MiniSite,
                  PrincipleDemos, Reveal, ClickBurst, CursorLabel
  data/           all editable content
  lib/            cn, domain, submit, useReducedMotion
```

---

## Honesty rules this project follows

The site claims nothing that is not true yet. There are **no** invented
testimonials, clients, metrics, awards, logos or years of experience, and no
stock photography.

All three portfolio entries are labelled **Concepto propio** and carry an
explicit note that they are our own exercises representing no real client. The
"before" states are archetypes we built, not copies of anyone's website. Keep
it that way until there is real work to show.

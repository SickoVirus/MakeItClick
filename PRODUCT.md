# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Owners and decision-makers of established small and mid-size businesses in Peru: restaurants, clinics, gyms, professional-services firms and similar. Their business already works; their website does not. It is dated, template-built, cluttered or anonymous, and it undersells them.

They arrive wanting to know whether this studio can make their site look as serious as their business, and what it takes to get started. The job: hand over their current site and start a redesign with low commitment.

Geographic focus: Lima first, as the launch market. The intent is to serve all of Peru. Remote work is possible, but international clients are not a stated focus.

## Product Purpose

Make It Click is a small web design and redesign studio. This project is its own marketing site. The site's job is to make visible the difference between a website that merely exists and one that earns the click, and to turn a visiting business owner into a lead by sending their current site ("Send your site").

Success: qualified Peruvian business owners submit their website for a redesign conversation.

## Positioning

A redesign-first studio for businesses that already work. The site doesn't describe good design, it shows it: live before/after miniature interfaces, and principles that run as working demos rather than claims. Each redesign gets its own art direction for its sector instead of a house style stamped onto every client.

## Operating Context

- Visitors are Peruvian SMB owners, often on a phone ("Tu cliente no está en una laptop. Está en el bus."), deciding in seconds whether the studio is serious.
- Conversion path: a single CTA field where the visitor sends their current website URL. Today it opens a prefilled email (`src/lib/submit.ts`); setting `NEXT_PUBLIC_FORM_ENDPOINT` switches it to a form service.
- Process offered to clients: Look → Think → Make → Click (diagnosis, architecture, design + code, launch).
- Services: Web Design, Website Redesign, UX / UI, Frontend Development (`src/data/services.ts`).

## Capabilities and Constraints

- Existing codebase: Next.js 16 (App Router), TypeScript, Tailwind v4, deployed on Vercel. No paid services, no API keys, no runtime dependencies beyond React, Next and lucide-react.
- All editable content lives in `src/data/`; components should not need opening to change copy, projects or services.
- Before/after work is rendered as live data-driven miniature sites (`src/components/ui/MiniSite.tsx`), not screenshots. Each project's palette, type and layout is content in `projects.ts`, not a site token.
- Each business appears on the page exactly once. A project gets one home.
- Contact inbox: `makeitclickpe@gmail.com`.
- Open before launch: social account URLs (currently null, rendered as inert text).

## Brand Commitments

- Name: **Make It Click**. Tagline: "Make your website worth the click." Statement: "Your business works. Your website should too."
- Language: **Spanish is the primary language** of the site. Some things may stay in English: the brand name, tagline, and select labels or terms such as service names or process step names. Explanatory and persuasive copy is Spanish.
- Team: a studio of 2–5 people in distinct roles. "We" is honest; the site should not imply a large agency or a solo freelancer.
- Voice: short, direct, confident sentences; concrete over abstract; no hype.
- Existing logo reference: `Logo/Logo Templates.png`; brand components in `src/components/brand/`.

## Evidence on Hand

- Three concept redesigns plus a hero demo (`src/data/projects.ts`). All are labelled **Concepto propio**: the studio's own exercises, with no real client and no real brand represented. The "before" states are built archetypes, not copies of real websites.
- There are **no** real clients, testimonials, metrics, awards, client logos, years of experience or stock photography. Future work must not invent any of these. Replace the concepts only when real, permissioned work exists (`beforeImage` / `afterImage` fields are ready for it).
- Founded 2026; based in Lima.

## Product Principles

1. **Show, don't claim.** Every promise about design quality is demonstrated on the page itself.
2. **Honesty over polish.** Nothing appears that isn't true yet: no fabricated proof, no dead links, concepts labelled as concepts.
3. **Their brand, not ours.** Client work carries its own sector-appropriate direction. The studio's identity is the frame, not the template.
4. **Built for the Peruvian owner on a phone.** Spanish-first, mobile-first, fast, clear within three seconds.
5. **Every click does something.** Interaction exists only where it serves a decision.

## Accessibility & Inclusion

Standing commitments already implemented and to be kept: semantic landmarks and skip link, one `h1` with ordered headings, fully keyboard-operable interactive demos (tabs, range slider), visible focus, targets at least 44px, and all decorative motion disabled under `prefers-reduced-motion`. Performance matters for users on mobile data: no image files, no animation libraries, self-hosted subset fonts.

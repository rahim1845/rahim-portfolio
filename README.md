# rahim rangrez portfolio

next.js 14 + gsap + lenis. redesign of rahim1845.framer.ai with the human-in-the-loop / annotated-working-file direction.

## run locally

```bash
npm install
npm run dev
```

open http://localhost:3000

## deploy (vercel, ~2 min)

1. push this folder to a github repo
2. vercel.com -> add new project -> import -> deploy (auto-detects next.js)

or `npm i -g vercel && vercel` from this folder.

## content map

- case studies (tingting, kanini, themeforge): `lib/projects.ts`
- hero copy + home sections: `app/page.tsx`, `components/HeroHeadline.tsx`
- about: `app/about/page.tsx`
- playground tiles: `components/PlaygroundGrid.tsx`
- name, status, links: `components/Nav.tsx`, `components/Footer.tsx`, `app/layout.tsx`

## before going live — verify these

1. tingting numbers: this build uses 40k+ orders / 12k+ downloads / 4.5 stars / rs 1cr+ transactions.
   your current framer site says 20k+ orders in one place. pick the correct, defensible figure and
   make it consistent everywhere (including linkedin and resume).
2. the kanini and themeforge case studies were written from your own published summaries and project
   notes. read every line and correct anything that doesn't match what actually happened. you will be
   asked about all of it in portfolio reviews.
3. tingting images currently hotlink from framerusercontent.com (your live framer cdn). they work,
   but download them and move into /public before you ever take the framer site down.
4. resume link points at your google drive file; confirm sharing is set to "anyone with the link".

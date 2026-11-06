# Putera MY design implementation · QA report

Date: 2026-11-07 (Asia/Kuala_Lumpur)

## What was verified in this workspace

- **Source syntax:** All 27 TypeScript/TSX implementation modules transpiled without parser diagnostics using a locally installed TypeScript compiler. This is a syntax check, **not** a full typecheck against Next/React dependencies.
- **Content/source integrity:** `npm run test:source` passed. Verified required source files, three original SVG artwork files, factual project links and the absence of fabricated experience/client metrics.
- **Static visual layout harness:** A faithful static DOM rendition using the same CSS was tested in headless Chromium at **360, 390, 768, 1024, 1440px**. No body horizontal overflow or hero heading overflow was detected at any of these widths. Both light and dark desktop/mobile preview images were captured.
- **Contrast calculations:** Main text, muted text, primary links and CTA color pairs have WCAG contrast ratios >4.5:1, as shown below.
- **Assets:** Three new SVG illustrations were created and labeled `ILLUSTRATIVE PREVIEW / ACTUAL SCREENSHOT TODO` within each artwork.

## Main theme contrast pairs

| Pair | Ratio | WCAG AA for normal text |
| --- | ---: | --- |
| Dark ink #F7F4FF on #0B0B1A | 17.96:1 | Pass |
| Dark muted #B8B2CB on #0B0B1A | 9.53:1 | Pass |
| Dark purple link #C4A0FF on #0B0B1A | 9.12:1 | Pass |
| Dark CTA text #131222 on #FACC15 | 12.06:1 | Pass |
| Light ink #161323 on #F8F7FF | 17.14:1 | Pass |
| Light muted #59546D on #F8F7FF | 6.77:1 | Pass |
| Light purple link #6D28D9 on #F8F7FF | 6.68:1 | Pass |
| Light CTA white on #6D28D9 | 7.10:1 | Pass |

## Not verified here

**The npm registry is unavailable in this execution environment**. Therefore these steps still require the implementer's local workstation or connected CI:

- `npm install`, full `npm run typecheck`, and `npm run build`.
- A full headless browser/keyboard audit against the actual compiled Next.js app.
- Actual Lighthouse scores (Performance, Accessibility, Best Practices, SEO 90+ targets).
- Physical mobile device review, focus visibility in all states, and voiceover/screen-reader testing.

The static visual QA preview is *not* the production Next.js runtime and uses available local fonts to approximate the deployed `next/font` typography.

## TODO before publication

1. Provide actual email, phone (optional), LinkedIn and WhatsApp URLs (optional).
2. Supply a real CV file and set the accurate `site.cvPath` in `data/portfolio.ts`.
3. Replace the illustrative SVG project images with true screenshots when available.
4. Confirm project timeframes, personal responsibilities and actual technical lessons.
5. Publish actual Blog posts or remove the Blog tab.
6. Validate the installed dependency versions and commit the generated lockfile.
7. Run both themes through browser, keyboard, screen-reader and Lighthouse checks on a production build.

No original portfolio repository or live Vercel deployment was modified while making this package.

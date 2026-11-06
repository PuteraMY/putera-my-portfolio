# CONTROL ROOM · source audit and change log

## Scope

- Baseline examined: GitHub repo puteraaqmalputera-dot/putera-my-portfolio, branch design/putera-v2 (commit 3ba10435205c09472646af33bcd76543d637ed51).
- Reviewed layout, styles, fonts, header, hero, project index, toolbox, about/contact, modal, themes, case studies, data, routes, build configuration and SEO.
- Working branch: design/control-room. No change or merge to main.
- Evidence: original repo and its Vercel builds; VANTA FUN repo and published Vue 3 application; CINEX preview/repository; NimbusCloud demo. Academic / personal history comes only from the owner.

## Findings, decisions and fixes

| Existing problem | CONTROL ROOM change |
| --- | --- |
| Mobile navbar cramped with Search, theme, language and hamburger | Small logo + large MENU; safe-area padding; no mobile Search icon. MENU launches a full-height searchable panel. |
| Fixed round Back-to-Top button obscured page | Removed from the new pages. |
| Headline began with “Hi, I'm” and included decorative P sidecard | “Putera MY.” in Inter Tight with a one-time yellow underline and a specific supporting sentence; no decorative card. |
| Letter spacing as tight as -0.08em could overlap | Consistent -0.025em for main headings, -0.015em for monospace. |
| UI used bright cobalt, mint, coral, yellow and a cream base | Dark ink #101312, warm text #F5F1E6, a single yellow #F4CF57, and green only for availability/status. Thoughtfully colored light mode. |
| Amber/coral status pulse | Green status dot, reduced-motion fallback. |
| Disabled CV button visible even though no PDF exists | Build-time real-PDF lookup in public/assets/cv/; absent means hidden. |
| Placeholder email appeared as potential contact action | Copy email is hidden unless a real email is provided. WhatsApp/LinkedIn links not invented. |
| AsetDesk had no public demo/code and could appear as a built system | Omitted from public index and sitemap, retained only as owner TODO. No PulseBoard claims. |
| NimbusCloud sounded like a real cloud platform | Explicit “UI concept” distinction. |
| All project rows looked similar and had mobile expansion | Oversized CINEX row; all rows are direct semantic case-study links. Floating preview only for a fine pointer. |
| Colorful screenshot tiles looked like fake product visuals | Muted fixed-aspect TODO placeholder; use next/image only for real file-backed screenshots. |
| Case studies relied on data with missing personal role/dates | Explicit TODO text for missing facts; no invented metrics, employment or client outcomes. |
| Hero background and animations could be distracting | Hero-only low-opacity SVG dots; small clearly labeled simulated boot log, paused on tab hide/offscreen. |
| Color-borders on interactive elements were faint in dark theme | Dedicated high-contrast --control-line for controls. |
| Old BM/EN toggle conflicted with English-only brief | English-only public experience. |
| Theme default was always light, regardless of system preference | System preference is now initial state; manual selection persists in guarded localStorage. |
| Back navigation could lose project index scroll position | Save homepage scroll on case-study navigation and restore on Back to work. |

## Main color contrast checks

WCAG contrast ratios computed from final CSS RGB tokens (ratios alone are not a comprehensive accessibility audit).

| Foreground / background | Ratio | Requirement |
| --- | ---: | --- |
| Dark text #F5F1E6 / #101312 | 16.56:1 | AA pass |
| Dark muted #B6BCB2 / #101312 | 9.63:1 | AA pass |
| Yellow #F4CF57 / #101312 | 12.38:1 | AA pass |
| Ink #171B19 / yellow #F4CF57 | 11.52:1 | AA pass |
| Light ink #171B19 / #F7F4EC | 15.83:1 | AA pass |
| Light muted #465048 / #F7F4EC | 7.64:1 | AA pass |
| Yellow link #955E00 / #F7F4EC | 4.93:1 | AA pass |
| Dark control outline #909A8F / #101312 | 6.41:1 | 3:1 UI pass |
| Light control outline #5C6C5E / #F7F4EC | 5.08:1 | 3:1 UI pass |

## Verification

- Next.js build and TypeScript: last intermediate Vercel deployment READY; rerun against final branch head.
- Chromium checks at **360px, 390px, 768px, 1280px, 1920px**, in dark and light: **RUNNING / see GitHub Actions**.
- Browser suite covers body overflow, hero width, menu/nav overlap, keyboard palette, Escape dismissal, theme, case-study routes, sitemap, disabled placeholder actions and console exceptions.
- Manual visual review and real-device safe-area check: **PENDING**.
- Independent WCAG audit and Lighthouse Performance / Accessibility / Best Practices / SEO 90+: **NOT MEASURED**.
- GitHub Actions browser screenshots are review artifacts, not a substitute for user sign-off.

## TODO for Putera

1. Provide an actual email address for Copy email.
2. Provide WhatsApp and LinkedIn URLs; neither is guessed.
3. Put a real PDF under public/assets/cv/ and redeploy.
4. Supply CINEX, VANTA FUN, NimbusCloud screenshots, with accurate alt text.
5. Confirm individual role, year/timeframe, approach and lessons for each case study.
6. Confirm TVETMARA Besut education dates.
7. Confirm which Cloud Computing / IT support tools and skills have genuine project evidence.
8. Provide working code or demo for AsetDesk/PulseBoard if they should appear in the index.
9. Check the final design on physical Android/iOS and desktop; confirm contrast, safe areas, keyboard, touches.
10. Review PR and approve explicitly before merge. Production stays unchanged.

## Release gate

Do not merge into main before production build, typecheck, responsive browser suite, owner visual review and final audit pass. CI success does not establish a Lighthouse 90+ score or full WCAG conformance.

# Lead engineer implementation notes

## Pixel-faithful interpretation

The supplied image is a desktop design board showing dark and light variants side by side, not layered design source files. This reproduction follows its section order, laptop/code-card treatment, spacing rhythm, purple accent colors, 2×2 fact panel, 3-column skill area, 3-card featured work area, and footer. It is adapted for a normal full-width website (rather than matching the two half-width screenshots pixel-for-pixel).

## Decisions deliberately different from the mockup

1. No portrait is present, per previous directions. The hero uses a CSS-rendered laptop/editor and code card.
2. The 4 number counters are real counts derived from project data, not invented work history or client claims.
3. Skill meters show appearances in portfolio case studies (e.g. `1/3 projects`), **not** 95% mastery claims.
4. The testimonial is replaced by a clearly attributed `Portfolio snapshot` fact card, not a fictional collaborator.
5. The project cards depict CINEX, VANTA FUN and NimbusCloud. Their SVGs are labeled ILLUSTRATIVE PREVIEW, not falsely presented as real screenshots.
6. No real CV, email, phone, WhatsApp or LinkedIn details were provided, so those links cannot be shown. A `Contact` button replaces the unavailable hero CV button.
7. The Blog link is functional and points to a transparent empty state, not fake writing.
8. Source code is packaged as a zip containing all files, rather than pasted into an extremely long chat message.

## Production release gate

- Fill owner TODO fields in `data/portfolio.ts`.
- Verify Next production build and TypeScript using the exact scripts from `package.json`.
- Test focus, theme persistence, carousel, images, and 360px viewport on real devices.
- Replace SVG concepts with actual screenshots if available.
- Run Lighthouse and resolve any score below the agreed target.

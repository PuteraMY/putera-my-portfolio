# Portfolio assets

**Before sending the portfolio to an employer:**

1. Add your real CV at `public/cv.pdf` and set `cvUrl: "/cv.pdf"` in `data/site.ts`.
2. Set a verified email and LinkedIn URL in `data/site.ts`.
3. Add real screenshots at `public/images/nimbuscloud.png` and `public/images/cinex.png`. Cards intentionally have gradient fallbacks until these exist.
4. Optionally add your photo at `public/images/putera.jpg`. The About section has a fallback.
5. `putera-logo-f.svg` is a **temporary vector interpretation** of your previously preferred Concept F monogram, not the original logo image. Replace it with the approved final logo when ready.
6. Update the technologies in `data/projects.ts` if the deployed project stack changes.

Social preview is generated automatically by `app/opengraph-image.tsx`. No placeholder OG PNG is required.

# ARCPLAN Hero Landing (Vite + React + Tailwind)

ASCII-only frontend to avoid Unicode parsing errors. It replicates a Flow-like hero with:
- Fullscreen looping <video> background
- Giant ARCPLAN heading with a dynamic blur band that sweeps across glyphs
- Minimal top/bottom controls and a primary CTA

## Quick start
1) Install deps
   npm install

2) Place your single MP4 background video at:
   public/videos/flow.mp4

   (Optional) add a poster frame as:
   public/videos/poster.jpg

3) Run dev server
   npm run dev

4) Build for production
   npm run build
   npm run preview

## Tests (Vitest + JSDOM)
- Basic tests assert that the <video> element has loop, muted, autoplay, and playsInline.
- Run: npm test

## Notes
- All text in source files is ASCII-only. Feel free to localize UI text after your toolchain is confirmed to be UTF-8 friendly.

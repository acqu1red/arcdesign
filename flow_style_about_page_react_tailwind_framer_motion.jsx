import React from "react";
import { motion } from "framer-motion";

/**
 * ARCPLAN hero (video bg + giant ARCPLAN with animated blur band across glyphs)
 * ASCII-only source to avoid Unicode parsing errors in some toolchains.
 * - No Google branding.
 * - Put your MP4 files in /public/videos and edit `bgVideos`.
 * - Blur effect: two synced layers of the same text. The clear layer is hidden inside a moving band; a blurred layer is shown in that band.
 */

const bgVideos = [
  { src: "/videos/wave-1.mp4", type: "video/mp4" },
  { src: "/videos/wave-2.mp4", type: "video/mp4" },
  { src: "https://cdn.coverr.co/videos/coverr-ocean-waves-4038/1080p.mp4", type: "video/mp4" },
];

export default function ArcplanHero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* BACKGROUND VIDEO LAYER */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/videos/wave-poster.jpg"
          >
            {bgVideos.map((v, i) => (
              <source key={i} src={v.src} type={v.type} />
            ))}
          </video>
        </div>
        {/* Subtle darkening vignette for readability */}
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_40%,rgba(0,0,0,0)_0%,rgba(0,0,0,0.25)_60%,rgba(0,0,0,0.65)_100%)]" />
      </div>

      {/* TOP MINI-BAR MESSAGE (centered, minimal) */}
      <div className="absolute top-6 left-0 right-0 flex items-center justify-center px-4">
        <a
          href="#update"
          className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white backdrop-blur transition hover:bg-white/15"
        >
          <span className="opacity-80">UPDATE - ARCPLAN v3.1 build available.</span> <span className="underline underline-offset-2">Try now</span>
        </a>
      </div>

      {/* CONTENT */}
      <main className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        {/* BIG TITLE - dynamic blur band on the text itself */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[1200px] leading-[0.88]"
        >
          <span className="sr-only">ARCPLAN</span>
          {/* Fallback crisp text (hidden when masking is supported) */}
          <span aria-hidden className="block text-[16vw] font-semibold tracking-tight text-white md:text-[12rem] base-fallback">ARCPLAN</span>
          {/* Clear text outside a very narrow moving band */}
          <span aria-hidden className="absolute inset-0 block text-[16vw] font-semibold tracking-tight text-white md:text-[12rem] mask-inverse scanAnimH">ARCPLAN</span>
          {/* Blurred text limited vertically and moving horizontally */}
          <span aria-hidden className="absolute inset-0 vmask">
            <span className="absolute inset-0 block text-[16vw] font-semibold tracking-tight text-white md:text-[12rem] blur-scan scanAnimH">ARCPLAN</span>
          </span>
        </motion.h1>

        {/* SUBLINE - ASCII transliteration to avoid Unicode in source */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="mt-6 max-w-3xl text-lg text-white/90"
        >
          ARCPLAN - servis, kotoryi avtomaticheski prevrashchaet tekhplan v chistyi 2D-chertezh i po foto udalyaet/dobavlyaet mebel. Geometriya i planirovka sokhranyayutsya strogo, bez domyslov.
        </motion.p>

        {/* PRIMARY CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-8"
        >
          <a
            href="#create"
            className="inline-flex items-center justify-center rounded-full bg-white/15 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 focus:outline-none"
          >
            Create with ARCPLAN
          </a>
        </motion.div>

        {/* BOTTOM LINKS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="pointer-events-auto absolute bottom-8 left-0 right-0 flex items-center justify-center px-4"
        >
          <div className="flex flex-wrap items-center gap-2 text-sm text-white/80">
            <a className="underline underline-offset-2 hover:text-white" href="#plans">Tariffs</a>
            <span className="opacity-60">|</span>
            <a className="underline underline-offset-2 hover:text-white" href="#faq">FAQ</a>
          </div>
        </motion.div>
      </main>

      {/* LOCAL STYLES */}
      <style>{`
        /* Horizontal sweep */
        @keyframes scanH {
          0%   { -webkit-mask-position: 0% 0%; mask-position: 0% 0%; }
          100% { -webkit-mask-position: 100% 0%; mask-position: 100% 0%; }
        }
        /* Gentle vertical meander so the band is not always centered */
        @keyframes meanderV {
          0%   { transform: translateY(-4%); }
          35%  { transform: translateY(2%); }
          65%  { transform: translateY(-1%); }
          100% { transform: translateY(5%); }
        }
        .scanAnimH {
          -webkit-mask-size: 260% 100%;
          mask-size: 260% 100%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          animation: scanH 7.5s cubic-bezier(.4,.0,.2,1) infinite alternate;
          will-change: -webkit-mask-position, mask-position;
        }
        /* Very narrow band so fewer letters are affected at once */
        .mask-inverse {
          -webkit-mask-image: linear-gradient(to right, white 0%, rgba(255,255,255,0) 49.3%, rgba(255,255,255,0) 50.7%, white 100%);
          mask-image: linear-gradient(to right, white 0%, rgba(255,255,255,0) 49.3%, rgba(255,255,255,0) 50.7%, white 100%);
        }
        /* Vertical limiter with a soft oval window and small meander */
        .vmask {
          -webkit-mask-image: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 32%, white 50%, rgba(255,255,255,0.55) 68%, rgba(255,255,255,0) 100%);
          mask-image: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.55) 32%, white 50%, rgba(255,255,255,0.55) 68%, rgba(255,255,255,0) 100%);
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          animation: meanderV 9s ease-in-out infinite alternate;
          will-change: transform;
        }
        /* Narrow blur band to match and mild intensity */
        .blur-scan {
          filter: blur(12px);
          -webkit-mask-image: linear-gradient(to right, rgba(255,255,255,0) 0%, white 49.6%, white 50.4%, rgba(255,255,255,0) 100%);
          mask-image: linear-gradient(to right, rgba(255,255,255,0) 0%, white 49.6%, white 50.4%, rgba(255,255,255,0) 100%);
          -webkit-mask-size: 260% 100%;
          mask-size: 260% 100%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }
        /* Fallback handling */
        .base-fallback { opacity: 1; }
        @supports (-webkit-mask-image: linear-gradient(white, white)) or (mask-image: linear-gradient(white, white)) {
          .base-fallback { opacity: 0; }
        }
        video { transform: translateZ(0); }
      `}</style>
    </div>
  );
}

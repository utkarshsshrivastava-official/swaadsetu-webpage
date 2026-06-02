"use client";

import Navbar from "../component/Navbar";
import {Footer} from "../component/Footer";
import { motion, useInView } from "framer-motion";
import FeaturePlayground from "../component/FeaturePlayground";
import { useRef, useState, useEffect } from "react";

/* ─────────────────────────────────────────
   Types
───────────────────────────────────────── */
interface Feature {
  icon: string; // SVG path data
  eyebrow: string;
  title: string;
  description: string;
  accent: string; // tailwind color token used for glows/borders
  stat?: { value: string; label: string };
  /**
   * Unsplash image URL for the card visual.
   * Recommended sizes are listed next to each feature below.
   * You can swap any URL — keep w/h params for performance.
   */
  image?: string;
  imageAlt?: string;
  wide?: boolean; // spans multiple columns in the bento grid
  tall?: boolean; // spans multiple rows in the bento grid
}

/* ─────────────────────────────────────────
   Feature data
   IMAGE SIZES (Unsplash params):
     wide cards  → w=900&h=420
     tall cards  → w=480&h=520
     small cards → w=480&h=260
───────────────────────────────────────── */
const features: Feature[] = [
  {
    icon: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
    eyebrow: "Smart QR",
    title: "Instant QR Menus",
    description:
      "Generate beautiful, scannable QR menus in seconds. Customers point their camera and your full menu loads — zero app download, zero friction.",
    accent: "amber",
    stat: { value: "0.3s", label: "Avg. load time" },
    image:
      "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=900&h=420&fit=crop&auto=format",
    imageAlt: "Restaurant QR code menu on a table",
    wide: true,
  },
  {
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4",
    eyebrow: "Contactless",
    title: "One-Tap Ordering",
    description:
      "Guests browse, customise, and place orders without ever flagging a waiter. Orders hit the kitchen the moment they're placed.",
    accent: "orange",
    stat: { value: "−40%", label: "Wait time" },
    image:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=480&h=520&fit=crop&auto=format",
    imageAlt: "Person ordering food on smartphone",
    tall: true,
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    eyebrow: "Analytics",
    title: "Real-Time Insights",
    description:
      "Live dashboards show top-selling dishes, peak hours, and table turnover. Make data-driven decisions without an MBA.",
    accent: "yellow",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=260&fit=crop&auto=format",
    imageAlt: "Analytics dashboard on a laptop",
  },
  {
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    eyebrow: "Reliability",
    title: "99.9% Uptime SLA",
    description:
      "Built on redundant infra so your menu is live even during dinner rush. We've never gone dark during a service.",
    accent: "green",
    stat: { value: "99.9%", label: "Uptime" },
  },
  {
    icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z",
    eyebrow: "Payments",
    title: "Integrated Billing",
    description:
      "UPI, cards, wallets — all in one flow. Split bills, apply offers, and close tables in under 30 seconds.",
    accent: "amber",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=480&h=260&fit=crop&auto=format",
    imageAlt: "Digital payment on a smartphone",
    wide: true,
  },
  {
    icon: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    eyebrow: "Marketing",
    title: "Push Promotions",
    description:
      "Send targeted offers, happy-hour alerts, and seasonal specials directly to diners who've ordered before.",
    accent: "orange",
    stat: { value: "3.2×", label: "Repeat visits" },
  },
];

/* ─────────────────────────────────────────
   Helpers
───────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* Glow colour map — consumed by inline styles */
const glowMap: Record<string, string> = {
  amber: "rgba(251,191,36,0.18)",
  orange: "rgba(249,115,22,0.18)",
  yellow: "rgba(234,179,8,0.18)",
  green: "rgba(34,197,94,0.16)",
};

const borderMap: Record<string, string> = {
  amber: "rgba(251,191,36,0.25)",
  orange: "rgba(249,115,22,0.25)",
  yellow: "rgba(234,179,8,0.25)",
  green: "rgba(34,197,94,0.22)",
};

const iconBgMap: Record<string, string> = {
  amber: "rgba(251,191,36,0.12)",
  orange: "rgba(249,115,22,0.12)",
  yellow: "rgba(234,179,8,0.12)",
  green: "rgba(34,197,94,0.10)",
};

const iconColorMap: Record<string, string> = {
  amber: "#fbbf24",
  orange: "#f97316",
  yellow: "#eab308",
  green: "#22c55e",
};

/* ─────────────────────────────────────────
   Sub-components
───────────────────────────────────────── */
const FeatureIcon = ({ path, accent }: { path: string; accent: string }) => (
  <div
    className="flex items-center justify-center w-11 h-11 rounded-2xl flex-shrink-0 transition-all duration-300"
    style={{ background: iconBgMap[accent] }}
  >
    <svg
      className="w-5 h-5 transform transition-transform duration-300 group-hover:scale-110"
      viewBox="0 0 24 24"
      fill="none"
      stroke={iconColorMap[accent]}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  </div>
);

const FeatureCard = ({ feature, index, onSelect }: { feature: Feature; index: number; onSelect?: (f: Feature) => void; }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative overflow-hidden rounded-[30px] border border-white/10 bg-slate-950/80 shadow-[0_20px_80px_-34px_rgba(15,23,42,0.7)] transition-all duration-500 will-change-transform cursor-pointer ${feature.wide ? "lg:col-span-3" : ""} ${feature.tall ? "lg:row-span-2" : ""}`}
      style={{
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderColor: borderMap[feature.accent],
      }}
      onClick={() => onSelect?.(feature)}
      whileHover={{
        y: -10,
        scale: 1.025,
        boxShadow: `0 30px 80px -30px ${glowMap[feature.accent]}`,
      }}
      whileTap={{ scale: 0.995 }}
    >
      <div className="pointer-events-none absolute -top-8 -right-8 w-52 h-52 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: glowMap[feature.accent] }} aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-70" aria-hidden="true" />

      {feature.image ? (
        <div className={`flex flex-col overflow-hidden ${feature.wide ? "md:flex-row" : ""}`}>
          <div className={`relative overflow-hidden ${feature.wide ? "md:w-1/2 h-64 md:h-auto" : "h-56"}`}>
            <img
              src={feature.image}
              alt={feature.imageAlt ?? ""}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" aria-hidden="true" />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ background: iconBgMap[feature.accent], color: iconColorMap[feature.accent] }}>
              {feature.eyebrow}
            </div>
          </div>

          <div className="flex flex-col justify-between p-6 md:p-8 space-y-4 bg-gradient-to-b from-slate-950/90 to-slate-950/70">
            <div className="flex items-start gap-4">
              <FeatureIcon path={feature.icon} accent={feature.accent} />
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight text-white">{feature.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{feature.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              {feature.stat ? (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-2xl font-extrabold text-white" style={{ color: iconColorMap[feature.accent] }}>{feature.stat.value}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 mt-1">{feature.stat.label}</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-300 text-sm">Advanced service layer</div>
              )}
              <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">Tap to explore</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 p-6 md:p-8">
          <div className="flex items-center gap-4">
            <FeatureIcon path={feature.icon} accent={feature.accent} />
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{feature.eyebrow}</p>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-white">{feature.title}</h3>
            </div>
          </div>
          <p className="text-sm leading-6 text-slate-400">{feature.description}</p>
          {feature.stat && (
            <div className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="text-3xl font-extrabold" style={{ color: iconColorMap[feature.accent] }}>{feature.stat.value}</span>
              <span className="text-xs uppercase tracking-[0.3em] text-slate-500">{feature.stat.label}</span>
            </div>
          )}
        </div>
      )}
    </motion.div>
  );
};

const PlaygroundToggle = ({ open, onToggle }: { open: boolean; onToggle: () => void }) => (
  <button
    type="button"
    className="btn btn-md btn-outline border-white/15 text-slate-200 hover:border-white/30"
    onClick={onToggle}
  >
    {open ? "Hide mini demo" : "Show mini demo"}
  </button>
);

const PlaygroundArea = ({ featureTitle, open }: { featureTitle: string; open: boolean }) => (
  <motion.div
    layout
    initial={{ height: 0, opacity: 0 }}
    animate={open ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    style={{ overflow: "hidden" }}
  >
    {open && <FeaturePlayground featureTitle={featureTitle} />}
  </motion.div>
);

/* Modal preview shown when a card is selected */
const FeatureModal = ({
  feature,
  onClose,
}: {
  feature: Feature | null;
  onClose: () => void;
}) => {
  const [playgroundOpen, setPlaygroundOpen] = useState(false);

  if (!feature) return null;

  return (
    <motion.div
      key={feature.title}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="max-w-3xl w-full bg-base-100 rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {feature.image && (
            <>
              <img
                src={feature.image}
                alt={feature.imageAlt ?? feature.title}
                className="w-full h-60 object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.02) 0%, transparent 25%, rgba(255,255,255,0.02) 50%, transparent 75%)",
                  mixBlendMode: "overlay",
                  transform: "skewX(-10deg)",
                  animation: "slide 7.5s linear infinite",
                  opacity: 0.7,
                }}
              />
            </>
          )}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute top-4 right-4 btn btn-sm btn-circle btn-ghost"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-extrabold mb-2">{feature.title}</h3>
          <p className="text-base-content/70 mb-4">{feature.description}</p>
          <div className="flex flex-wrap gap-3 items-center">
            <button
              className="btn btn-md font-bold"
              style={{
                background: "linear-gradient(90deg, #fbbf24, #f97316)",
                color: "#08101a",
              }}
              onClick={() => window.open("https://www.swaadsetu.com/contact", "_blank")}
            >
              Request Demo
            </button>
            <button className="btn btn-md btn-ghost" onClick={onClose}>
              Close
            </button>
            <PlaygroundToggle open={playgroundOpen} onToggle={() => setPlaygroundOpen((value) => !value)} />
          </div>
          <PlaygroundArea featureTitle={feature.title} open={playgroundOpen} />
        </div>
      </motion.div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────
   Main Section
───────────────────────────────────────── */
const FeatureSection = () => {
  const [selected, setSelected] = useState<Feature | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="min-h-screen bg-[#060812] text-base-content overflow-x-hidden" data-theme="swaad-dark">
      <Navbar />
      <section
        className="relative overflow-hidden py-24 md:py-32"
        /* 
         * THEME SWITCHING:
         * The section reads from DaisyUI's CSS variable system.
         * Wrap your <html> (or this component) with data-theme="dark" or
         * data-theme="light" (or any DaisyUI theme name) to switch the palette.
         * The amber/gold accents are hardcoded as they're brand colours and
         * should remain consistent across themes.
         */
      >
      {/* ── Background grid (same as Hero) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden="true"
      />

      {/* ── Radial glows ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-30 blur-[130px] bg-amber-500/20" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[350px] rounded-full opacity-20 blur-[100px] bg-orange-500/20" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 md:px-8">
        {/* ── Section header ── */}
        <motion.div
          {...fadeUp(0)}
          className="flex flex-col items-center text-center mb-16 gap-4"
        >
          <div
            className="px-4 py-2 rounded-full text-sm font-semibold tracking-wide"
            style={{
              background: "linear-gradient(90deg,#fbbf24, #fb923c)",
              color: "#08101a",
            }}
          >
            Key Capabilities
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-base-content">
            Elevate Your Service —
            <span
              className="bg-clip-text text-transparent ml-2"
              style={{
                backgroundImage:
                  "linear-gradient(90deg,#fbbf24, #fb923c)",
              }}
            >
              Delight Every Diner
            </span>
          </h2>

          <p className="text-base-content/60 text-base max-w-2xl leading-relaxed font-light">
            Modern, fast and beautiful tools for Indian restaurants — QR menus,
            frictionless ordering, instant payments and actionable insights.
          </p>

          <div className="w-32 h-0.5 mt-2 rounded-full" style={{background: "linear-gradient(90deg,#fbbf24, #fb923c)"}} aria-hidden="true" />
        </motion.div>

        {/* ── Responsive bento grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-[260px]">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} onSelect={(f)=>setSelected(f)} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
            <motion.div
              {...fadeUp(0.3)}
              className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl p-8 md:p-10"
              style={{
                background: "linear-gradient(90deg, rgba(247,185,76,0.06), rgba(251,115,22,0.03))",
                border: "1px solid rgba(251,191,36,0.12)",
              }}
            >
              <div className="text-center md:text-left">
                <p className="text-base-content font-extrabold text-xl">
                  Ready to elevate your dining experience?
                </p>
                <p className="text-base-content/50 text-sm mt-1">
                  Start a free demo — no credit card required.
                </p>
              </div>
              <div className="flex gap-3 flex-wrap justify-center">
                <button
                  className="btn btn-md font-bold border-none"
                  style={{
                    background: "linear-gradient(90deg, #fbbf24, #f97316)",
                    color: "#08101a",
                    boxShadow: "0 10px 30px rgba(247,147,60,0.18)",
                  }}
                  onClick={() =>
                    window.open(
                      "https://docs.google.com/forms/d/e/1FAIpQLSdjwZxtGkYIpulXopAiZBd-BKbQkqA81--N2DNZ5DqqMYTCXw/viewform?embedded=true",
                      "_blank",
                    )
                  }
                >
                  Start Free Demo
                </button>
                <button
                  className="btn btn-md btn-ghost border text-amber-400"
                  style={{ borderColor: "rgba(251,191,36,0.18)" }}
                  onClick={() =>
                    (window.location.href = "https://www.swaadsetu.com/features")
                  }
                >
                  View Full Specs
                </button>
              </div>
            </motion.div>
      </div>
      </section>
      <Footer />

      {/* Modal preview */}
      {selected && <FeatureModal feature={selected} onClose={() => setSelected(null)} />}
    </div>
  );
};

export default FeatureSection;

/*
 * ──────────────────────────────────────────────────────────────
 *  DARK / LIGHT THEME SETUP (DaisyUI)
 *
 *  1. Install DaisyUI: npm i -D daisyui
 *
 *  2. In tailwind.config.ts:
 *       plugins: [require("daisyui")],
 *       daisyui: {
 *         themes: ["dark", "light", "night", "luxury"],  // add as many as you like
 *       }
 *
 *  3. In your root layout / _app.tsx, set the theme on <html>:
 *       <html data-theme="dark">   ← dark mode
 *       <html data-theme="light">  ← light mode
 *
 *  4. To toggle at runtime:
 *       document.documentElement.setAttribute("data-theme", "light");
 *
 *  5. The bg-[#060812] of your Hero won't switch automatically — wrap
 *     the whole page in a <div className="bg-base-100"> and remove the
 *     hardcoded hex from Hero so both sections share the DaisyUI token.
 *
 *  RECOMMENDED THEME PAIRS:
 *    Dark  → "dark" or "night" (near-black, plays nicely with amber accents)
 *    Light → "lemonade" or "corporate" (warm neutrals complement gold tones)
 *
 *  IMAGE SIZES REFERENCE:
 *    Wide cards  (md:col-span-2)  → 900 × 420 px
 *    Tall cards  (single col)     → 480 × 520 px
 *    Small cards (single col)     → 480 × 260 px
 * ──────────────────────────────────────────────────────────────
 */
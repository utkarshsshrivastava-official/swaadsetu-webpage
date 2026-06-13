/**
 * Features.tsx — SwaadSetu Features Page (v2)
 *
 * Design: Bold editorial — oversized numbering, horizontal-rule-driven layout,
 * alternating full-bleed feature rows instead of a bento card grid.
 * Matches About.tsx design system tokens exactly.
 */

import type { FC } from "react";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "../component/Navbar";
import { Footer } from "../component/Footer";
import BackButton from "../component/ui/BackButton";
import { Helmet } from "@dr.pogodin/react-helmet";

/* ─────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -48 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const fadeRight = (delay = 0) => ({
  initial: { opacity: 0, x: 48 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─────────────────────────────────────────────
   Floating particle
───────────────────────────────────────────── */
const Particle = ({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) => (
  <motion.div
    className="absolute rounded-full bg-amber-400 pointer-events-none"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ y: [0, -18, 0], opacity: [0.1, 0.4, 0.1] }}
    transition={{ duration: 4 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

const particles = [
  { x: "5%",  y: "15%", size: 3, delay: 0.2 },
  { x: "20%", y: "70%", size: 4, delay: 1.5 },
  { x: "78%", y: "25%", size: 5, delay: 0.8 },
  { x: "92%", y: "60%", size: 3, delay: 2.1 },
  { x: "55%", y: "8%",  size: 4, delay: 0.5 },
];

/* ─────────────────────────────────────────────
   Feature data
───────────────────────────────────────────── */
interface Feature {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  stat: { value: string; label: string };
  image: string;
  imageAlt: string;
  flip?: boolean; // alternate image side
}

const features: Feature[] = [
  {
    number: "01",
    eyebrow: "Smart QR",
    title: "Instant QR Menus",
    description:
      "Generate beautiful, scannable QR menus in seconds. Customers point their camera and your full menu loads — zero app download, zero friction. Update prices and items live without reprinting a single sheet.",
    bullets: ["Live menu edits in real time", "Works on any camera app", "Multi-language support"],
    stat: { value: "0.3s", label: "Average load time" },
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=900&h=700&fit=crop&auto=format",
    imageAlt: "Restaurant QR code menu on a table",
    flip: false,
  },
  {
    number: "02",
    eyebrow: "Contactless",
    title: "One-Tap Ordering",
    description:
      "Guests browse, customise, and place orders without ever flagging a waiter. Orders hit the kitchen display the moment they're confirmed — no paper tickets, no miscommunication.",
    bullets: ["Custom modifiers & add-ons", "Reorder in one tap", "Live order status for guests"],
    stat: { value: "−40%", label: "Average wait time" },
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=900&h=700&fit=crop&auto=format",
    imageAlt: "Person ordering food on smartphone",
    flip: true,
  },
  {
    number: "03",
    eyebrow: "Analytics",
    title: "Real-Time Insights",
    description:
      "Live dashboards surface your top-selling dishes, peak hours, and table turnover rates. Stop guessing what to 86 — know it before the rush starts.",
    bullets: ["Hourly & daily sales breakdown", "Dish-level profitability", "Staff performance tracking"],
    stat: { value: "2.4×", label: "Faster decisions" },
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&h=700&fit=crop&auto=format",
    imageAlt: "Analytics dashboard on a laptop",
    flip: false,
  },
  {
    number: "04",
    eyebrow: "Payments",
    title: "Integrated Billing",
    description:
      "UPI, cards, wallets — all in one seamless flow. Split bills, apply offers, and close tables in under 30 seconds. No separate POS device, no manual settlement at end of shift.",
    bullets: ["UPI, cards & all major wallets", "Split-bill in one tap", "Auto GST calculation"],
    stat: { value: "28s", label: "Avg. table close time" },
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&h=700&fit=crop&auto=format",
    imageAlt: "Digital payment on a smartphone",
    flip: true,
  },
  {
    number: "05",
    eyebrow: "Marketing",
    title: "Push Promotions",
    description:
      "Send targeted offers, happy-hour alerts, and seasonal specials directly to diners who've ordered before. Turn one-time visitors into regulars with zero ad spend.",
    bullets: ["Segment by order history", "Scheduled campaigns", "Coupon & offer management"],
    stat: { value: "3.2×", label: "Repeat visit rate" },
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=900&h=700&fit=crop&auto=format",
    imageAlt: "Restaurant promotional notification on phone",
    flip: false,
  },
];

/* ═══════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════ */
const FeatureSection: FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <>
      <Helmet>
        <title>Features – SwaadSetu Smart Restaurant Management Platform</title>
        <meta name="description" content="Explore SwaadSetu's full feature set: QR menus, contactless ordering, real-time analytics, integrated billing, and more — built for Indian restaurants." />
        <meta property="og:title" content="Features – SwaadSetu Smart Restaurant Management Platform" />
        <meta property="og:description" content="Explore SwaadSetu's full feature set: QR menus, contactless ordering, real-time analytics, integrated billing, and more — built for Indian restaurants." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.swaadsetu.com/features" />
        <meta property="og:image" content="https://www.swaadsetu.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Features – SwaadSetu Smart Restaurant Management Platform" />
        <meta name="twitter:description" content="Explore SwaadSetu's full feature set: QR menus, contactless ordering, real-time analytics, integrated billing, and more — built for Indian restaurants." />
        <meta name="twitter:image" content="https://www.swaadsetu.com/logo.png" />
      </Helmet>

      <div
        data-theme="swaad-dark"
        className="min-h-screen bg-base-100 text-base-content overflow-x-hidden"
      >

        {/* ── Fixed header ── */}
        <header className="fixed top-0 left-0 w-full z-50 bg-base-100/80 backdrop-blur-md border-b border-primary/10">
          <Navbar />
          <div className="px-0 -mx-6 py-2">
            <BackButton />
          </div>
        </header>

        {/* ════════════════════════════════════
            HERO — EDITORIAL OPENER
        ════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden pt-20">

          {/* Parallax image — full bleed */}
          <motion.div style={{ y: heroImgY }} className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&h=900&fit=crop&q=85"
              alt="Warm restaurant interior"
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-base-100/55 to-transparent" />
          </motion.div>

          {/* Grid overlay */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Particles */}
          <div className="absolute inset-0 z-[2] pointer-events-none">
            {particles.map((p, i) => <Particle key={i} {...p} />)}
          </div>

          {/* Editorial headline block */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 pb-24 w-full">

            {/* Top rule + eyebrow */}
            <motion.div
              {...fadeUp(0.05)}
              className="flex items-center gap-4 mb-10"
            >
              <div className="h-px flex-1 bg-amber-400/30" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400/70 shrink-0">
                Platform Features
              </span>
              <div className="h-px w-12 bg-amber-400/30" />
            </motion.div>

            {/* Giant editorial headline */}
            <motion.h1
              {...fadeUp(0.15)}
              className="text-[clamp(3rem,10vw,8rem)] font-black leading-[0.95] tracking-tighter text-white"
            >
              Every tool
              <br />
              your{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                kitchen
              </span>
              <br />
              deserves.
            </motion.h1>

            {/* Subtext + stat row */}
            <div className="mt-10 flex flex-col sm:flex-row sm:items-end gap-8">
              <motion.p
                {...fadeUp(0.3)}
                className="text-slate-400 text-lg leading-relaxed max-w-sm font-light"
              >
                Five features. Zero compromise. Built ground-up for the realities
                of Indian dining.
              </motion.p>

              {/* Inline stats — stark, editorial */}
              <motion.div {...fadeUp(0.4)} className="flex gap-8 sm:ml-auto sm:mb-1">
                {[
                  { v: "58+", l: "Restaurants live" },
                  { v: "44K+", l: "Orders processed" },
                  { v: "99.9%", l: "Uptime SLA" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col">
                    <span className="text-3xl font-black text-amber-300 tabular-nums leading-none">{s.v}</span>
                    <span className="text-[10px] tracking-widest uppercase text-slate-500 mt-1">{s.l}</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            FEATURES — EDITORIAL ALTERNATING ROWS
        ════════════════════════════════════ */}
        <section className="relative">

          {features.map((f, idx) => (
            <div key={f.number} className="relative overflow-hidden">

              {/* Full-width top rule */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 py-24 lg:py-5">
                <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${f.flip ? "lg:[&>*:first-child]:order-2" : ""}`}>

                  {/* ── Text column ── */}
                  <div className="flex flex-col gap-6">

                    {/* Number + eyebrow */}
                    <motion.div
                      {...(f.flip ? fadeRight(0.05) : fadeLeft(0.05))}
                      className="flex items-baseline gap-4"
                    >
                      <span
                        className="text-[5rem] font-black leading-none tabular-nums select-none"
                        style={{
                          WebkitTextStroke: "1px rgba(251,191,36,0.25)",
                          color: "transparent",
                        }}
                      >
                        {f.number}
                      </span>
                      <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber-400/70">
                        {f.eyebrow}
                      </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                      {...(f.flip ? fadeRight(0.12) : fadeLeft(0.12))}
                      className="text-4xl sm:text-5xl font-black leading-tight text-white"
                    >
                      {f.title}
                    </motion.h2>

                    {/* Description */}
                    <motion.p
                      {...(f.flip ? fadeRight(0.2) : fadeLeft(0.2))}
                      className="text-slate-400 leading-relaxed text-base"
                    >
                      {f.description}
                    </motion.p>

                    {/* Bullets */}
                    <motion.ul
                      {...(f.flip ? fadeRight(0.28) : fadeLeft(0.28))}
                      className="space-y-2.5"
                    >
                      {f.bullets.map((b) => (
                        <li key={b} className="flex items-center gap-3 text-sm text-slate-400">
                          <span className="w-5 h-5 rounded-full bg-amber-400/15 border border-amber-400/30 flex items-center justify-center shrink-0">
                            <svg className="w-3 h-3 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          {b}
                        </li>
                      ))}
                    </motion.ul>

                    {/* Stat — large, stark */}
                    <motion.div
                      {...(f.flip ? fadeRight(0.36) : fadeLeft(0.36))}
                      className="flex items-baseline gap-3 pt-4 mt-2 border-t border-amber-400/10"
                    >
                      <span className="text-5xl font-black tabular-nums bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-transparent">
                        {f.stat.value}
                      </span>
                      <span className="text-xs tracking-widest uppercase text-slate-500 max-w-[8rem] leading-relaxed">
                        {f.stat.label}
                      </span>
                    </motion.div>
                  </div>

                  {/* ── Image column ── */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.97, y: 24 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-3xl overflow-hidden border border-amber-400/10 shadow-[0_0_60px_rgba(251,191,36,0.07)] aspect-[4/3] lg:aspect-auto lg:h-[480px]"
                  >
                    <img
                      src={f.image}
                      alt={f.imageAlt}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                    {/* Inner gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100/40 via-transparent to-transparent pointer-events-none" />

                    {/* Floating number badge — top corner */}
                    <div
                      className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-2xl border border-amber-400/25 bg-base-100/70 backdrop-blur-sm"
                    >
                      <span className="text-xs font-black text-amber-400 tabular-nums">{f.number}</span>
                    </div>
                  </motion.div>

                </div>
              </div>
            </div>
          ))}

          {/* Bottom rule */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
        </section>

        {/* ════════════════════════════════════
            RELIABILITY STRIP (no image needed)
        ════════════════════════════════════ */}
        <section className="relative py-15 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none opacity-40"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full bg-amber-500/6 blur-[100px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 relative z-10">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-amber-400/10 rounded-3xl overflow-hidden border border-amber-400/10">
              {[
                { icon: "◎", title: "99.9% Uptime SLA", text: "Redundant infrastructure so your menu is live even during dinner rush. We've never gone dark during a service." },
                { icon: "✦", title: "Under 30-min Setup", text: "Go live before your next lunch service. No IT team, no complicated onboarding, no enterprise contracts." },
                { icon: "❋", title: "Dedicated Local Support", text: "A real support team in your timezone — not a chatbot. Call, WhatsApp, or email, we respond within the hour." },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  {...fadeUp(i * 0.1)}
                  className="bg-base-200 p-8 lg:p-10 flex flex-col gap-4"
                >
                  <span className="text-amber-400 text-2xl">{item.icon}</span>
                  <h3 className="text-white font-black text-xl leading-tight">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════
            CTA BAND
        ════════════════════════════════════ */}
        <section className="relative py-4 overflow-hidden">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent mb-24" />

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div {...fadeUp(0.05)} className="mb-4">
              <div className="badge badge-outline border-amber-400/40 text-amber-300 bg-amber-400/5 gap-2 px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Join 58+ restaurants already live
              </div>
            </motion.div>

            <motion.h2
              {...fadeUp(0.15)}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
            >
              Ready to{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                transform
              </span>{" "}
              your restaurant?
            </motion.h2>

            <motion.p {...fadeUp(0.25)} className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Get a personalised demo and see SwaadSetu live in your restaurant in under 30 minutes.
            </motion.p>

            <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  window.open(
                    "https://docs.google.com/forms/d/e/1FAIpQLSdjwZxtGkYIpulXopAiZBd-BKbQkqA81--N2DNZ5DqqMYTCXw/viewform?embedded=true",
                    "_blank",
                  )
                }
                className="btn btn-lg bg-gradient-to-r from-amber-400 to-orange-400 text-black font-bold border-none shadow-[0_0_32px_rgba(251,191,36,0.4)] hover:shadow-[0_0_48px_rgba(251,191,36,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-200 rounded-xl flex items-center justify-center gap-2 px-3 py-2 cursor-pointer"
              >
                Book a Free Demo
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                className="btn btn-lg btn-ghost border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400/60 transition-all duration-200 rounded-xl px-3 py-2 cursor-pointer"
                onClick={() => (window.location.href = "https://www.swaadsetu.com/about")}
              >
                Learn About Us
              </button>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default FeatureSection;
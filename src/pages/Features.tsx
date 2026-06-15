/**
 * Features.tsx — SwaadSetu Features Page (v2)
 *
 * Design: Bold editorial — oversized numbering, horizontal-rule-driven layout,
 * alternating full-bleed feature rows instead of a bento card grid.
 * Matches About.tsx design system tokens exactly.
 */

import type { FC } from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "../component/Navbar";
import { Footer } from "../component/Footer";
import BackButton from "../component/ui/BackButton";
import { Helmet } from "@dr.pogodin/react-helmet";
// import { CTASection } from "../component/cta-section";

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
        className="min-h-screen bg-[#060812] text-base-content overflow-x-hidden"
      >

        {/* ── Fixed header ── */}
        {/* ── Global background grid (matches Hero exactly) ── */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        {/* ── Global radial glows (matches Hero) ── */}
        <div className="fixed inset-0 pointer-events-none z-0" aria-hidden="true">
          <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] rounded-full bg-amber-500/10 blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full bg-orange-600/10 blur-[140px]" />
        </div>

        <header className="fixed top-0 left-0 w-full z-50 bg-[#060812]/80 backdrop-blur-md border-b border-amber-400/10">
          <Navbar />
          <div className="px-0 -mx-6 py-2">
            <BackButton />
          </div>
        </header>

        {/* ════════════════════════════════════
            HERO SECTION
        ════════════════════════════════════ */}
        <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-28 pb-16">
          {/* Grid overlay */}
          <div
            className="absolute inset-0 z-[1] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,191,36,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.035) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Glows */}
          <div className="absolute inset-0 z-[1] pointer-events-none">
            <div className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-[130px]" />
            <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-orange-600/10 blur-[120px]" />
          </div>

          {/* Floating particles */}
          <div className="absolute inset-0 z-[2] pointer-events-none">
            {particles.map((p, i) => <Particle key={i} {...p} />)}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-20 w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-16 lg:gap-10 items-center">
            {/* Left: Text & Story */}
            <div className="flex flex-col gap-8 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
              <motion.div {...fadeUp(0.1)} className="flex justify-center lg:justify-start">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(251,191,36,0.15)] backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Platform Features
                </div>
              </motion.div>

              <motion.h1
                {...fadeUp(0.2)}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] tracking-tight text-white drop-shadow-lg"
              >
                Every tool your{" "}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent drop-shadow-xl">
                    kitchen
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.5)]"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
                <br />
                deserves.
              </motion.h1>

              <motion.p
                {...fadeUp(0.35)}
                className="text-slate-300 text-lg sm:text-xl leading-relaxed font-light drop-shadow-sm max-w-xl mx-auto lg:mx-0"
              >
                Five features. Zero compromise. Built ground-up for the realities of Indian dining.
              </motion.p>
            </div>

            {/* Right: Modern floating image composition */}
            <div className="relative w-full h-[400px] sm:h-[500px] flex items-center justify-center perspective-1000 mt-10 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: 50, y: 30, rotateY: -10, rotateZ: 5 }}
                animate={{ opacity: 1, x: 0, y: 0, rotateY: -10, rotateZ: 5 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="absolute w-[80%] h-[80%] rounded-3xl overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20"
              >
                <img src={features[2].image} alt={features[2].imageAlt} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060812] via-transparent to-transparent opacity-80" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50, y: -30, rotateY: 15, rotateZ: -5 }}
                animate={{ opacity: 1, x: -30, y: 30, rotateY: 15, rotateZ: -5 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                className="absolute left-0 bottom-10 w-[50%] h-[50%] rounded-3xl overflow-hidden border border-amber-400/20 shadow-[0_20px_50px_rgba(251,191,36,0.2)] z-30 backdrop-blur-md bg-black/40 p-2"
              >
                <img src={features[0].image} alt={features[0].imageAlt} className="w-full h-full object-cover rounded-2xl" />
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
                      className="absolute top-4 right-4 flex items-center justify-center w-10 h-10 rounded-2xl border border-amber-400/25 bg-[#060812]/70 backdrop-blur-sm"
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
                  className="bg-[#0d1020] p-8 lg:p-10 flex flex-col gap-4"
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
        {/* <section className="relative py-4 overflow-hidden">
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
        </section> */}

     <section className="relative py-24 overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />
              {/* ── Background grid ── */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
    
              {/* ── Glow blobs ── */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full bg-amber-500/10 blur-[140px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[400px] rounded-full bg-orange-600/6 blur-[120px]" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[400px] rounded-full bg-amber-400/5 blur-[120px]" />
              </div>
    
              {/* ── Decorative rings ── */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] rounded-full border border-amber-400/5" />
                <div className="absolute w-[400px] h-[400px] rounded-full border border-amber-400/8" />
                <div className="absolute w-[200px] h-[200px] rounded-full border border-amber-400/10" />
              </div>
    
              <div className="relative z-10 max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
                {/* ── Badge ── */}
                <motion.div {...fadeUp(0)} className="flex justify-center mb-6">
                  <div className="badge badge-outline border-amber-400/40 text-amber-300 bg-amber-400/5 gap-2 px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Join the platform
                  </div>
                </motion.div> 
    
                {/* ── Headline ── */}
                <motion.h2 {...fadeUp(0.1)} className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tight text-white leading-[1.05] mb-6">
                  Ready to{" "}
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                      Transform
                    </span>
                    <motion.span
                      className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.8, duration: 0.7, ease: "easeOut" }}
                    />
                  </span>{" "}
                  Your Restaurant?
                </motion.h2>
    
                {/* ── Subtext ── */}
                <motion.p {...fadeUp(0.2)} className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed font-light mb-10">
                  Get a personalised demo and see SwaadSetu live in your restaurant in under 30 minutes.
                </motion.p>
    
                {/* ── Benefit pills ── */}
                <motion.div {...fadeUp(0.28)} className="flex flex-wrap justify-center gap-3 mb-10">
                  {["No Setup Fee", "24/7 Support", "No Credit Card Required"].map((label, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-white/[0.05] border border-white/10 backdrop-blur-sm rounded-full px-4 py-2"
                    >
                      <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm font-medium text-slate-300">{label}</span>
                    </div>
                  ))}
                </motion.div>
    
                {/* ── CTA buttons ── */}
                <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <button
                    onClick={() =>
                      window.open(
                        "https://docs.google.com/forms/d/e/1FAIpQLSdjwZxtGkYIpulXopAiZBd-BKbQkqA81--N2DNZ5DqqMYTCXw/viewform?embedded=true",
                        "_blank",
                      )
                    }
                    className="btn btn-lg bg-gradient-to-r from-amber-400 to-orange-400 text-black font-bold border-none shadow-[0_0_40px_rgba(251,191,36,0.4)] hover:shadow-[0_0_60px_rgba(251,191,36,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-200 group cursor-pointer flex items-center justify-center gap-2 px-3 py-2 rounded-2xl"
                  >
                    Book a Free Demo
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </button>
    
                  <button
                    onClick={() => (window.location.href = "https://www.swaadsetu.com/features")}
                    className="btn btn-lg btn-ghost border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400/60 transition-all duration-200 cursor-pointer group px-3 py-2 rounded-2xl"
                  >
                    See How It Works
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
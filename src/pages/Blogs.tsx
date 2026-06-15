/**
 * Blogs.tsx — SwaadSetu Blog Listing Page
 *
 * Layout: page.tsx reference structure (cover images, dynamic categories,
 *         4-col grid, newsletter strip, loading state)
 * Theme:  SwaadSetu dark editorial (bg-base-100, amber accents, framer-motion)
 */

import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../component/Navbar";
import { Footer } from "../component/Footer";
import BackButton from "../component/ui/BackButton";
import { Helmet } from "@dr.pogodin/react-helmet";
import { CTASection } from "../component/cta-section";

/* ─────────────────────────────────────────────
   Animation helpers
───────────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
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
  { x: "5%",  y: "20%", size: 3, delay: 0.2 },
  { x: "85%", y: "30%", size: 5, delay: 0.8 },
  { x: "50%", y: "10%", size: 4, delay: 0.5 },
  { x: "92%", y: "65%", size: 3, delay: 2.1 },
];

/* ─────────────────────────────────────────────
   Types & Data
───────────────────────────────────────────── */
type BlogCategory = "All" | "Product" | "Design" | "Restaurants" | "Updates";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  readTime: string;
  date: string;
  author: string;
  coverImage: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How Digital Menus Are Transforming Restaurants in India",
    slug: "digital-menus-transforming-restaurants-india",
    excerpt: "From QR-based ordering to live kitchen updates, see how modern tools are changing the way guests experience dining.",
    category: "Restaurants",
    readTime: "6 min read",
    date: "Dec 01, 2025",
    author: "Swaad Setu Team",
    coverImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Designing a Delightful QR Ordering Experience",
    slug: "designing-delightful-qr-ordering-experience",
    excerpt: "Good UX can make the difference between a confused guest and a loyal customer. Here's how we think about flows.",
    category: "Design",
    readTime: "5 min read",
    date: "Nov 25, 2025",
    author: "Product Design",
    coverImage: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Product Update: Advanced Analytics for Multi-Outlet Brands",
    slug: "product-update-advanced-analytics",
    excerpt: "Introducing cross-outlet performance, peak hour analysis, and deep item-level insights for serious operators.",
    category: "Product",
    readTime: "4 min read",
    date: "Nov 18, 2025",
    author: "Product Team",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "How to Reduce Wait Times Without Hiring More Staff",
    slug: "reduce-wait-times-without-more-staff",
    excerpt: "Smart routing, live order tracking, and self-service ordering can dramatically shorten customer wait times.",
    category: "Restaurants",
    readTime: "7 min read",
    date: "Nov 10, 2025",
    author: "Operations",
    coverImage: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&h=400&fit=crop&auto=format",
  },
  {
    id: 5,
    title: "Our Vision for the Future of Contactless Dining",
    slug: "vision-future-contactless-dining",
    excerpt: "From discovery to re-ordering, we're building a connected experience for guests, staff, and owners.",
    category: "Updates",
    readTime: "3 min read",
    date: "Nov 02, 2025",
    author: "Founder's Note",
    coverImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=400&fit=crop&auto=format",
  },
];

const CATEGORIES: BlogCategory[] = ["All", "Product", "Design", "Restaurants", "Updates"];

const categoryAccent: Record<string, { bg: string; text: string; border: string }> = {
  Restaurants: { bg: "rgba(251,191,36,0.12)", text: "#fbbf24", border: "rgba(251,191,36,0.3)" },
  Design:      { bg: "rgba(249,115,22,0.12)", text: "#f97316", border: "rgba(249,115,22,0.3)" },
  Product:     { bg: "rgba(34,197,94,0.10)",  text: "#22c55e", border: "rgba(34,197,94,0.25)" },
  Updates:     { bg: "rgba(139,92,246,0.12)", text: "#a78bfa", border: "rgba(139,92,246,0.3)" },
  Article:     { bg: "rgba(251,191,36,0.08)", text: "#fbbf24", border: "rgba(251,191,36,0.2)" },
};
const getAccent = (cat: string) => categoryAccent[cat] ?? categoryAccent["Article"];

/* ═══════════════════════════════════════════
   PAGE COMPONENT
═══════════════════════════════════════════ */
const BlogsPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      const matchesSearch =
        search.trim().length === 0 ||
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <>
      <Helmet>
        <title>Swaad Setu Blog – Insights for Modern Restaurant Teams</title>
        <meta name="description" content="Explore product updates, practical guides, and stories from restaurants using Swaad Setu to grow faster and serve better." />
        <meta property="og:title" content="Swaad Setu Blog – Insights for Modern Restaurant Teams" />
        <meta property="og:description" content="Explore product updates, practical guides, and stories from restaurants using Swaad Setu to grow faster and serve better." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.swaadsetu.com/blogs" />
        <meta property="og:image" content="https://www.swaadsetu.com/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Swaad Setu Blog – Insights for Modern Restaurant Teams" />
        <meta name="twitter:description" content="Explore product updates, practical guides, and stories from restaurants using Swaad Setu to grow faster and serve better." />
        <meta name="twitter:image" content="https://www.swaadsetu.com/logo.png" />
      </Helmet>

      <div data-theme="swaad-dark" className="min-h-screen bg-[#060812] text-base-content overflow-x-hidden">

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
            HERO
        ════════════════════════════════════ */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,191,36,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.04) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full bg-amber-500/8 blur-[130px] pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none">
            {particles.map((p, i) => <Particle key={i} {...p} />)}
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">
            {/* Rule + eyebrow */}
            <motion.div {...fadeUp(0.05)} className="flex items-center gap-4 mb-8">
              <div className="h-px w-14 bg-amber-400/30" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-amber-400/70">
                Swaad Setu Blog
              </span>
              <div className="h-px w-8 bg-amber-400/30" />
            </motion.div>

            <motion.h1
              {...fadeUp(0.12)}
              className="text-4xl sm:text-5xl lg:text-5xl font-black leading-tight tracking-tight text-white mb-6"
            >
              Insights for
              <br />
              modern{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                restaurants.
              </span>
            </motion.h1>

            <motion.p {...fadeUp(0.2)} className="text-slate-400 text-lg leading-relaxed max-w-lg font-light mb-10">
              Product updates, practical guides, and stories from restaurants using technology to grow faster and serve better.
            </motion.p>

            {/* Search + filter row */}
            <motion.div {...fadeUp(0.28)} className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="relative md:w-72">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/[0.04] border border-amber-400/15 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition-colors"
                />
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 cursor-pointer ${
                      activeCategory === cat
                        ? "bg-amber-400 text-black border-amber-400"
                        : "bg-transparent text-slate-400 border-amber-400/20 hover:border-amber-400/45 hover:text-amber-300"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Full-width rule */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent" />

        {/* ════════════════════════════════════
            BLOG GRID
        ════════════════════════════════════ */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-20">

            <AnimatePresence mode="wait">
              {filteredPosts.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-center py-24"
                >
                  <p className="text-slate-400 text-lg mb-2">No articles found.</p>
                  <p className="text-slate-600 text-sm">Try a different search or category.</p>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filteredPosts.map((post, idx) => {
                    const accent = getAccent(post.category);
                    return (
                      <motion.article
                        key={post.id}
                        initial={{ opacity: 0, y: 36 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ y: -4, boxShadow: `0 0 36px 2px ${accent.bg}` }}
                        className="group flex flex-col rounded-2xl border border-amber-400/10 bg-white/[0.03] overflow-hidden transition-all duration-300 hover:border-amber-400/25 cursor-pointer"
                      >
                        {/* Cover image */}
                        <Link to={`/blog/${post.slug}`} className="block relative overflow-hidden h-44 shrink-0">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-base-200/80 via-transparent to-transparent" />
                          {/* Category badge on image */}
                          <span
                            className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border backdrop-blur-sm"
                            style={{ background: accent.bg, color: accent.text, borderColor: accent.border }}
                          >
                            {post.category}
                          </span>
                        </Link>

                        {/* Body */}
                        <div className="flex flex-col flex-1 p-5">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] uppercase tracking-widest text-slate-600">{post.readTime}</span>
                            <span className="text-[10px] text-slate-600">{post.date}</span>
                          </div>

                          <h2 className="text-sm font-black leading-snug text-white mb-2 group-hover:text-amber-100 transition-colors line-clamp-2 flex-1">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h2>

                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-4">
                            {post.excerpt}
                          </p>

                          {/* Footer */}
                          <div className="flex items-center justify-between pt-3 border-t border-amber-400/10 mt-auto">
                            <p className="text-[11px] font-semibold text-slate-400">{post.author}</p>
                            <Link
                              to={`/blog/${post.slug}`}
                              className="flex items-center gap-1 text-[11px] font-bold text-slate-500 group-hover:text-amber-400 transition-colors"
                            >
                              Read more
                              <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7v10" />
                              </svg>
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Newsletter interstitial (matches page.tsx pattern) ── */}
            {filteredPosts.length > 0 && (
              <motion.div
                {...fadeUp(0.1)}
                className="relative mt-14 rounded-3xl p-10 overflow-hidden border border-amber-400/20"
                style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.07) 0%, rgba(249,115,22,0.07) 100%)" }}
              >
                {/* Decorative grid */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(251,191,36,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.06) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                />
                {/* Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-amber-500/10 blur-[80px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
                  <div className="badge badge-outline border-amber-400/40 text-amber-300 bg-amber-400/5 gap-2 px-4 py-3 text-xs font-semibold tracking-widest uppercase mb-5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Stay in the loop
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-3 leading-tight">
                    Get restaurant insights{" "}
                    <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                      in your inbox.
                    </span>
                  </h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Join 2,000+ restaurant operators receiving weekly tips, product updates, and industry stories.
                  </p>

                  {subscribed ? (
                    <div className="flex items-center gap-2 text-green-400 font-semibold">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      You're subscribed!
                    </div>
                  ) : (
                    <form
                      className="flex w-full max-w-md gap-2"
                      onSubmit={(e) => { e.preventDefault(); setSubscribed(true); }}
                    >
                      <input
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 bg-white/[0.04] border border-amber-400/20 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-400/40 focus:ring-1 focus:ring-amber-400/20 transition-colors"
                      />
                      <button
                        type="submit"
                        className="bg-gradient-to-r from-amber-400 to-orange-400 text-black font-bold rounded-xl px-5 py-2.5 text-sm hover:scale-[1.03] active:scale-95 transition-all shadow-[0_0_20px_rgba(251,191,36,0.3)] cursor-pointer shrink-0"
                      >
                        Subscribe
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ════════════════════════════════════
            CTA BAND
        ════════════════════════════════════ */}
        {/* <section className="relative py-24 overflow-hidden">
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-400/20 to-transparent mb-24" />
          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <motion.div {...fadeUp(0.05)} className="mb-4">
              <div className="badge badge-outline border-amber-400/40 text-amber-300 bg-amber-400/5 gap-2 px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                Join 58+ restaurants already live
              </div>
            </motion.div>
            <motion.h2 {...fadeUp(0.15)} className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Ready to{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent">transform</span>{" "}
              your restaurant?
            </motion.h2>
            <motion.p {...fadeUp(0.25)} className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Get a personalised demo and see SwaadSetu live in your restaurant in under 30 minutes.
            </motion.p>
            <motion.div {...fadeUp(0.35)} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdjwZxtGkYIpulXopAiZBd-BKbQkqA81--N2DNZ5DqqMYTCXw/viewform?embedded=true", "_blank")}
                className="btn btn-lg bg-gradient-to-r from-amber-400 to-orange-400 text-black font-bold border-none shadow-[0_0_32px_rgba(251,191,36,0.4)] hover:shadow-[0_0_48px_rgba(251,191,36,0.6)] hover:scale-[1.03] active:scale-95 transition-all duration-200 rounded-xl flex items-center justify-center gap-2 px-3 py-2 cursor-pointer"
              >
                Book a Free Demo
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
              <button
                className="btn btn-lg btn-ghost border border-amber-400/30 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400/60 transition-all duration-200 rounded-xl px-3 py-2 cursor-pointer"
                onClick={() => (window.location.href = "https://www.swaadsetu.com/features")}
              >
                See All Features
              </button>
            </motion.div>
          </div>
        </section> */}
         
         <CTASection/>
        <Footer />
      </div>
    </>
  );
};

export default BlogsPage;
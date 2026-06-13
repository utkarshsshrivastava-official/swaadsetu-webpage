import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../component/Navbar";
import { Footer } from "../component/Footer";
import BackButton from "../component/ui/BackButton";
import { Helmet } from "@dr.pogodin/react-helmet";

/* ─────────────────────────── animation helpers (same as About / Hero) ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ─────────────────────────── types ─────────────────────────── */
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
  coverImage?: string;
  content?: string;
}

/* ─────────────────────────── data ──────────────────────────── */
const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "How Digital Menus Are Transforming Restaurants in India",
    slug: "digital-menus-transforming-restaurants-india",
    excerpt:
      "From QR-based ordering to live kitchen updates, see how modern tools are changing the way guests experience dining.",
    category: "Restaurants",
    readTime: "6 min read",
    date: "Dec 01, 2025",
    author: "Swaad Setu Team",
    coverImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    content: `The restaurant industry in India is undergoing a quiet revolution. Walk into any mid-tier or premium dining establishment in a metro city and you'll notice something different: fewer printed menus, more QR codes, and guests who order without ever flagging down a waiter.

This shift is not cosmetic. Digital menus backed by real-time kitchen integrations are changing fundamental dynamics — order accuracy, table turnover, and the quality of the guest experience.

Why QR Ordering Works Here

India's smartphone penetration crossed 800 million active users in 2024. Nearly every guest at a restaurant already has the device needed to scan a code and browse a menu. There's no app download required, no learning curve, and no dependency on staff availability.

For restaurant owners, the benefits compound quickly. A digital menu can be updated in seconds — no reprinting costs when prices change or a dish runs out. Seasonal specials can go live the moment they're ready. Allergen information and photos can be embedded directly into each item.

Live Kitchen Updates

The more transformative layer is real-time kitchen status. When a table's order flows directly to a KDS (Kitchen Display System), the margin for error collapses. No ticket gets lost in transit. Modifications — "no onion," "extra spice" — travel with the order, not as a verbal relay.

Guests can also see estimated wait times on their phones. This reduces the anxiety of waiting and, anecdotally, reduces the number of times staff are asked "how long?"

What Operators Are Saying

Operators who've made the switch consistently cite two outcomes above all: fewer order errors and higher average order values. When guests browse at their own pace, they explore more of the menu. Upsell prompts — "Pairs well with…" — convert at rates traditional staff-led upselling rarely matches.`,
  },
  {
    id: 2,
    title: "Designing a Delightful QR Ordering Experience",
    slug: "designing-delightful-qr-ordering-experience",
    excerpt:
      "Good UX can make the difference between a confused guest and a loyal customer. Here's how we think about flows.",
    category: "Design",
    readTime: "5 min read",
    date: "Nov 25, 2025",
    author: "Product Design",
    coverImage:
      "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1200&auto=format&fit=crop",
    content: `A QR menu is only as good as what happens after the scan. Most implementations stop at "it's digital now" — the items are there, prices are listed, and technically the job is done. But technically done is miles from delightful.

The Three-Second Rule

When a guest scans a code and your menu loads, you have roughly three seconds before frustration sets in. If the page is slow, confusing, or doesn't immediately signal "this is the right place," they'll put the phone down and wait for a waiter.

This means fast load times are a design requirement, not a nice-to-have. It also means the first screen needs to orient the guest instantly — which restaurant, which table, what to do next.

Clear Information Hierarchy

Every menu item needs a clear title, a price, and enough description to help someone decide. Photos help, but only if they're honest. A beautiful food photo that doesn't match the actual dish destroys trust immediately.

Modifiers — extra toppings, spice levels, portion sizes — should feel guided, not overwhelming. We use a step-by-step approach: pick the base item, then see modifiers, one layer at a time. Presenting everything at once leads to decision paralysis.

Cart and Confirmation

The cart is where most QR ordering flows fail. Guests want to review their order before committing. They want to see the total. They want to know what "place order" actually does. Clarity at this moment is the difference between a confident tap and an abandoned cart.`,
  },
  {
    id: 3,
    title: "Product Update: Advanced Analytics for Multi-Outlet Brands",
    slug: "product-update-advanced-analytics",
    excerpt:
      "Introducing cross-outlet performance, peak hour analysis, and deep item-level insights for serious operators.",
    category: "Product",
    readTime: "4 min read",
    date: "Nov 18, 2025",
    author: "Product Team",
    coverImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    content: `Running one restaurant is hard. Running five is a different discipline entirely. The data you need to manage a multi-outlet brand isn't just more of the same — it's fundamentally different in structure and purpose.

Today we're shipping advanced analytics capabilities designed specifically for operators with more than one location.

Cross-Outlet Performance

The new dashboard gives you a side-by-side view of every outlet. Revenue, order volume, average order value, and top-selling items — all in one screen, all comparable at a glance.

Peak Hour Analysis

Every outlet has its own rhythm. The lunch rush at a business-district location behaves nothing like a residential area's dinner peak. Our peak hour heatmaps now show you, hour by hour and day by day, exactly when each outlet is busiest.

Item-Level Insights

The most granular new view is item-level performance across outlets. See which dishes sell across all locations, which are outlet-specific favourites, and which items consistently appear in high-value orders.

Getting Access

Advanced analytics is available to all Swaad Setu Pro and Enterprise customers starting today. Log into your dashboard and look for the Analytics tab — it's been rebuilt from the ground up.`,
  },
  {
    id: 4,
    title: "How to Reduce Wait Times Without Hiring More Staff",
    slug: "reduce-wait-times-without-more-staff",
    excerpt:
      "Smart routing, live order tracking, and self-service ordering can dramatically shorten customer wait times.",
    category: "Restaurants",
    readTime: "7 min read",
    date: "Nov 10, 2025",
    author: "Operations",
    coverImage:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    content: `Long wait times are the single most common reason guests leave a restaurant unhappy — and the most common reason they don't come back. Yet most operators treat this as a staffing problem: more people means faster service.

That logic breaks down quickly. More staff costs more, and beyond a certain point, additional people in a small kitchen or on a crowded floor create their own inefficiencies. The smarter path is to reduce the time wasted in the process itself.

Where Time Actually Goes

Most waits in a restaurant happen at three moments: getting a menu and placing an order, waiting for food, and getting the bill. Of these, the first and the last are almost entirely eliminable with the right tools.

Self-Service Ordering

When guests can browse and order from their phones, the "getting a menu" step disappears. More importantly, the order goes to the kitchen the moment the guest taps "confirm" — not when a server finds a free moment to relay it.

In busy periods, this compression matters enormously. An order that would have taken four to six minutes to reach the kitchen now takes under a minute.

Smart Order Routing

Once orders are digital, you can route them intelligently. Quick orders — a coffee, a dessert — can be routed to a dedicated station. Combined, these changes can reduce perceived and actual wait times by 20–35% without adding a single person to your payroll.`,
  },
  {
    id: 5,
    title: "Our Vision for the Future of Contactless Dining",
    slug: "vision-future-contactless-dining",
    excerpt:
      "From discovery to re-ordering, we're building a connected experience for guests, staff, and owners.",
    category: "Updates",
    readTime: "3 min read",
    date: "Nov 02, 2025",
    author: "Founder's Note",
    coverImage:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=1200&auto=format&fit=crop",
    content: `When we started building Swaad Setu, the brief was simple: make it easier for restaurants to take orders. The problem felt tactical — QR codes, digital menus, a cleaner way to manage tables.

Two years in, we see something larger. The restaurants we've worked with most closely are not just using technology to take orders faster. They're using data to understand their guests, their kitchen, and their business in ways that weren't possible before.

A chef who knows which dish is consistently returned or modified can improve the recipe. An owner who can see, in real time, which tables have been waiting too long can intervene before a guest gets frustrated.

What We're Building Toward

In the near term, we're focused on three areas. First, personalisation — menus that surface items a returning guest has ordered before. Second, integrated loyalty — rewards built into the ordering flow, not bolted on as a separate app. Third, predictive operations — tools that help owners get ahead of busy periods, staffing gaps, and inventory shortages.

The operators who will thrive in the next decade are the ones who use every tool available to run a tighter, smarter operation — without losing the warmth and hospitality that makes a great restaurant great.`,
  },
];

/* ─────────────────────────── category colour map ───────────────────────── */
const categoryStyle: Record<BlogCategory, string> = {
  All:         "bg-amber-400/10 text-amber-300 border-amber-400/25",
  Product:     "bg-amber-400/10 text-amber-300 border-amber-400/25",
  Design:      "bg-orange-400/10 text-orange-300 border-orange-400/25",
  Restaurants: "bg-amber-400/10 text-amber-300 border-amber-400/25",
  Updates:     "bg-yellow-400/10 text-yellow-300 border-yellow-400/25",
};

/* ─────────────────────────── content renderer ──────────────────────────── */
const renderContent = (raw: string) => {
  const paragraphs = raw.trim().split(/\n\n+/);
  return paragraphs.map((block, i) => {
    const lines = block.split("\n");
    // Single short line with no period at the end → treat as sub-heading
    if (lines.length === 1 && block.length < 60 && !block.endsWith(".")) {
      return (
        <h4
          key={i}
          className="text-lg font-bold text-white mt-8 mb-2 first:mt-0"
        >
          {block}
        </h4>
      );
    }
    return (
      <p key={i} className="text-slate-400 leading-relaxed">
        {block}
      </p>
    );
  });
};

/* ─────────────────────────── component ─────────────────────── */
const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug) ?? null;
  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== slug).slice(0, 4);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [slug]);

  /* ── 404 ── */
  if (!post) {
    return (
      <div className="min-h-screen bg-[#060812]" data-theme="swaad-dark">
        <Navbar />
        {/* <div className="mb-8"><BackButton /></div> */}
        <div className="flex flex-col items-center justify-center py-32 px-4 text-center">
          <p className="text-slate-400 mb-2">Post not found.</p>
          <p className="text-sm text-slate-500 mb-8">
            This article doesn't exist or may have been moved.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all"
            style={{ background: "linear-gradient(90deg,#fbbf24,#f97316)", color: "#000" }}
          >
            ← Back to all posts
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} – Swaad Setu Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.swaadsetu.com/blog/${post.slug}`} />
        {post.coverImage && <meta property="og:image" content={post.coverImage} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        {post.coverImage && <meta name="twitter:image" content={post.coverImage} />}
      </Helmet>

      <div className="min-h-screen bg-[#060812] text-base-content overflow-x-clip" data-theme="swaad-dark">
        <Navbar />

        {/* ── Background grid (same as About / Hero) ── */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(251,191,36,0.03) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />

        {/* ── Top radial glow ── */}
        <div
          className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] rounded-full opacity-20 blur-[140px] bg-amber-500/30 pointer-events-none z-0"
          aria-hidden="true"
        />

        <div className="relative z-10">
          <div className="mb-6 pt-2"><BackButton /></div>

          {/* ════════════════════════════════════
              HERO
          ════════════════════════════════════ */}
          <section className="border-b border-amber-400/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

              {/* Back link */}
              <motion.div {...fadeUp(0)}>
                <Link
                  to="/blogs"
                  className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-amber-400 transition-colors mb-8 group"
                >
                  <span className="transition-transform group-hover:-translate-x-0.5">←</span>
                  Back to all posts
                </Link>
              </motion.div>

              {/* Category + read-time */}
              <motion.div {...fadeUp(0.06)} className="flex items-center gap-3 mb-5">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border ${categoryStyle[post.category]}`}
                >
                  {post.category}
                </span>
                <span className="text-[11px] uppercase tracking-widest text-slate-500">
                  {post.readTime}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                {...fadeUp(0.12)}
                className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.08] text-white max-w-4xl mb-5"
              >
                {post.title}
              </motion.h1>

              {/* Excerpt */}
              <motion.p
                {...fadeUp(0.18)}
                className="text-slate-400 leading-relaxed max-w-2xl mb-8 text-[15px]"
              >
                {post.excerpt}
              </motion.p>

              {/* Author row */}
              <motion.div
                {...fadeUp(0.24)}
                className="flex items-center gap-3 pt-6 border-t border-amber-400/10"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold select-none flex-shrink-0"
                  style={{ background: "rgba(251,191,36,0.12)", color: "#fbbf24", border: "1px solid rgba(251,191,36,0.22)" }}
                  aria-hidden="true"
                >
                  {post.author.charAt(0)}
                </div>
                <div className="text-xs">
                  <p className="font-semibold text-white">{post.author}</p>
                  <p className="text-slate-500 mt-0.5">{post.date}</p>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ════════════════════════════════════
              BODY
          ════════════════════════════════════ */}
          <section className="py-12 sm:py-16">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                {/* ── Main article ── */}
                <article className="w-full lg:w-[62%]">

                  {/* Cover image */}
                  {post.coverImage && (
                    <motion.div
                      {...fadeUp(0.08)}
                      className="rounded-2xl overflow-hidden mb-10 border border-amber-400/10"
                      style={{ boxShadow: "0 0 48px rgba(251,191,36,0.07)" }}
                    >
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="w-full object-cover max-h-[420px]"
                      />
                    </motion.div>
                  )}

                  {/* Content */}
                  <motion.div
                    {...fadeUp(0.14)}
                    className="space-y-5 text-[15px]"
                  >
                    {renderContent(post.content ?? "No content available.")}
                  </motion.div>

                  {/* Bottom CTA */}
                  <motion.div
                    {...fadeUp(0.1)}
                    className="mt-14 pt-6 border-t border-amber-400/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                  >
                    <div>
                      <p className="font-semibold text-white text-sm">Enjoyed this article?</p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        Explore more insights from the Swaad Setu team.
                      </p>
                    </div>
                    <Link
                      to="/blogs"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors whitespace-nowrap group"
                    >
                      Browse all posts
                      <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                    </Link>
                  </motion.div>
                </article>

                {/* ── Sidebar ── */}
                <aside className="w-full lg:w-[38%] lg:sticky lg:top-8">
                  <h3 className="text-xs font-semibold tracking-widest uppercase text-amber-400/60 pb-4 border-b border-amber-400/10 mb-5">
                    More articles
                  </h3>

                  <div className="flex flex-col gap-4">
                    {otherPosts.map((p, i) => (
                      <motion.article
                        key={p.id}
                        {...fadeUp(0.08 + i * 0.06)}
                        className="group rounded-2xl border border-amber-400/10 p-4 transition-all duration-200 hover:border-amber-400/25"
                        style={{ background: "rgba(255,255,255,0.02)" }}
                      >
                        {/* Category + readTime */}
                        <div className="flex items-center justify-between mb-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${categoryStyle[p.category]}`}
                          >
                            {p.category}
                          </span>
                          <span className="text-[10px] uppercase tracking-widest text-slate-600">
                            {p.readTime}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-sm font-semibold text-white leading-snug mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors">
                          <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                        </h2>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-xs pt-3 border-t border-amber-400/8">
                          <div>
                            <p className="font-medium text-slate-400">{p.author}</p>
                            <p className="text-slate-600 mt-0.5">{p.date}</p>
                          </div>
                          <Link
                            to={`/blog/${p.slug}`}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400/60 group-hover:text-amber-400 transition-colors"
                          >
                            Read
                            <span className="transition-transform group-hover:translate-x-0.5">↗</span>
                          </Link>
                        </div>
                      </motion.article>
                    ))}
                  </div>

                  {/* CTA card */}
                  <motion.div
                    {...fadeUp(0.3)}
                    className="mt-6 rounded-2xl p-5"
                    style={{
                      background: "rgba(251,191,36,0.05)",
                      border: "1px solid rgba(251,191,36,0.15)",
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                      <span className="text-[10px] font-semibold tracking-widest uppercase text-amber-400/70">
                        Join SwaadSetu
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white mb-1">
                      Transform your restaurant
                    </p>
                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      58+ restaurants are already running on SwaadSetu. Book a free demo today.
                    </p>
                    <button
                      className="w-full btn btn-sm font-bold border-none text-black"
                      style={{ background: "linear-gradient(90deg,#fbbf24,#f97316)" }}
                      onClick={() =>
                        window.open(
                          "https://docs.google.com/forms/d/e/1FAIpQLSdjwZxtGkYIpulXopAiZBd-BKbQkqA81--N2DNZ5DqqMYTCXw/viewform?embedded=true",
                          "_blank",
                        )
                      }
                    >
                      Book a Free Demo ↗
                    </button>
                  </motion.div>
                </aside>

              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BlogPostPage;
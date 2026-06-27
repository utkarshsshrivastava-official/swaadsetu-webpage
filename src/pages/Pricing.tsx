import type { FC } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../component/Navbar";
import { Footer } from "../component/Footer";
import BackButton from "../component/ui/BackButton";
import { Helmet } from "@dr.pogodin/react-helmet";
import { CTASection } from "../component/cta-section";

/* ─────────────────────────────────────────────────────────────────
   THEMING NOTE:
   Swap the data-theme attribute on <html> (or wrap this page's root
   div) between "swaad-dark" and "swaad-light" to switch themes.
   DaisyUI theme definitions go in tailwind.config.js under
   daisyui.themes. CSS variables below drive everything.
───────────────────────────────────────────────────────────────── */

/* ── Floating particle (reused from Hero) ── */
const Particle = ({
  x,
  y,
  size,
  delay,
}: {
  x: string;
  y: string;
  size: number;
  delay: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-amber-400 pointer-events-none"
    style={{ left: x, top: y, width: size, height: size }}
    animate={{ y: [0, -18, 0], opacity: [0.08, 0.35, 0.08] }}
    transition={{
      duration: 4 + delay,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

const particles = [
  { x: "5%", y: "15%", size: 4, delay: 0 },
  { x: "20%", y: "70%", size: 3, delay: 1.4 },
  { x: "78%", y: "25%", size: 5, delay: 0.6 },
  { x: "92%", y: "60%", size: 3, delay: 2.1 },
  { x: "55%", y: "8%", size: 4, delay: 0.3 },
  { x: "68%", y: "80%", size: 3, delay: 1.9 },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

/* ── Feature comparison table ── */
const tableFeatures = [
  { label: "QR Ordering System", value: "Unlimited" },
  { label: "Digital Menu Management", value: "Unlimited" },
  { label: "Live Order Tracking", value: true },
  { label: "Digital Billing", value: true },
  { label: "Secure Payments", value: true },
  { label: "Waiter Call System", value: true },
  { label: "Staff Accounts", value: "Unlimited" },
  { label: "Order Analytics", value: "Advanced" },
  { label: "Inventory Management", value: true },
  { label: "Expense Tracking", value: true },
  { label: "Priority Support", value: true },
  { label: "Cloud Access", value: true },
  { label: "Regular Updates", value: true },
];

const CheckIcon = () => (
  <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = () => (
  <svg className="w-5 h-5 text-slate-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

/* ── FAQ ── */
const faqs = [
  {
    q: "Do customers need to install an app?",
    a: "No. Customers simply scan the QR code and access the digital menu directly through their mobile browser. No app downloads or registrations are required."
  },
  {
    q: "How long does setup take?",
    a: "Most businesses can get started within a day. Our team helps with menu setup, QR generation, staff onboarding, and initial configuration."
  },
  {
    q: "What payment methods are supported?",
    a: "SwaadSetu supports UPI, cards, and other digital payment methods through integrated payment gateways, depending on your setup."
  },
  {
    q: "Can I manage multiple staff members?",
    a: "Yes. You can create separate staff accounts and provide role-based access for managers, cashiers, waiters, and other team members."
  },
  {
    q: "Does SwaadSetu provide order tracking?",
    a: "Yes. Customers can view real-time order status updates while staff and kitchen teams can track orders from placement to completion."
  },
  {
    q: "Can I update my menu anytime?",
    a: "Absolutely. Add, edit, remove, or update menu items, pricing, and availability instantly without reprinting QR codes."
  },
  {
    q: "Is inventory and expense management included?",
    a: "Yes. SwaadSetu helps track stock consumption, manage expenses, and gain better visibility into daily operational costs."
  },
  {
    q: "Is there any setup fee or hidden charge?",
    a: "No. Our pricing is transparent with no hidden fees. You only pay for the selected subscription plan."
  },
  {
    q: "What kind of support do you provide?",
    a: "We offer support through WhatsApp, phone, and email to help with onboarding, setup, and operational queries."
  },
  {
    q: "Is my business data secure?",
    a: "Yes. We use secure cloud infrastructure, controlled access permissions, and regular backups to protect your operational data."
  }
];




const Pricing: FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  // const handleCTA = () => {
  //     window.open(
  //       "https://docs.google.com/forms/d/e/1FAIpQLSdjwZxtGkYIpulXopAiZBd-BKbQkqA81--N2DNZ5DqqMYTCXw/viewform?embedded=true",
  //       "_blank"
  //     );
  // };

  return (
    <>
      <Helmet>
        <title>Pricing – Swaad Setu</title>
        <meta
          name="description"
          content="Find the perfect plan for your restaurant with Swaad Setu's flexible pricing."
        />
      </Helmet>

      {/*
        ─────────────────────────────────────────────────────────────
        ROOT: bg-[#060812] mirrors Hero's dark background.
        For light theme, swap to bg-[#FAFAF7] and adjust text/border
        classes below (or use DaisyUI data-theme on the html element).
        ─────────────────────────────────────────────────────────────
      */}
      <div className="min-h-screen bg-[#060812] text-white overflow-x-hidden">

        {/* ── Background grid (identical to Hero) ── */}
        <div
          className="fixed inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* ── Radial glows ── */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-amber-500/8 blur-[140px]" />
          <div className="absolute bottom-0 left-[-5%] w-[400px] h-[300px] rounded-full bg-amber-600/6 blur-[100px]" />
        </div>

        {/* ── Floating particles ── */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {particles.map((p, i) => <Particle key={i} {...p} />)}
        </div>

        {/* ── Fixed header ── */}
        <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
          <Navbar />
          <div className="px-0 -mx-6 py-2">
            <BackButton />
          </div>
        </header>

        {/* ── Page content ── */}
        <div className="relative z-10 pt-28 pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">

            {/* ── Hero section ── */}
            <div className="text-center mb-16">
              {/* Eyebrow badge */}
              <motion.div {...fadeUp(0.1)} className="flex justify-center mb-5">
                <div className="badge badge-outline border-amber-400/40 text-amber-300 bg-amber-400/5 gap-2 px-4 py-3 text-xs font-semibold tracking-widest uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  Pricing
                </div>
              </motion.div>

              <motion.h1
                {...fadeUp(0.2)}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight tracking-tight"
              >
                Simple Pricing.{" "}
                <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent block sm:inline">
                   Powerful Operations.
                </span>
              </motion.h1>

              <motion.p
                {...fadeUp(0.35)}
                className="mt-5 text-slate-400 text-lg max-w-xl mx-auto font-light leading-relaxed"
              >
                Everything you need to manage ordering, billing, payments, inventory, staff coordination, and business insights — in one unified platform.
              </motion.p>

              {/* ── Billing toggle ── */}
              {/* <motion.div {...fadeUp(0.45)} className="mt-8 flex items-center justify-center gap-4">
                <span className={`text-sm font-medium transition-colors ${billing === "monthly" ? "text-white" : "text-slate-500"}`}>
                  Monthly
                </span>
                <input
                  type="checkbox"
                  className="toggle toggle-warning"
                  checked={billing === "annual"}
                  onChange={() =>
                    setBilling(billing === "monthly" ? "annual" : "monthly")
                  }
                />
                <span className={`text-sm font-medium flex items-center gap-2 transition-colors ${billing === "annual" ? "text-white" : "text-slate-500"}`}>
                  Annual
                  <span className="badge bg-amber-400/15 text-amber-300 border-amber-400/30 text-[10px] font-semibold px-2">
                    Save 20%
                  </span>
                </span>
              </motion.div>*/}
            </div>

            {/* ── Feature comparison table ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-20"
            >
              <h2 className="text-2xl font-bold text-center mb-2">All-in-One Plan</h2>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto mb-10" />

              <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm max-w-3xl mx-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-6 text-slate-400 font-medium w-2/3">Feature</th>
                      <th className="py-4 px-6 text-center font-bold text-white">
                        <span className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
                          Included
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableFeatures.map((row, i) => (
                      <tr
                        key={row.label}
                        className={`border-b border-white/5 ${i % 2 === 0 ? "bg-white/[0.01]" : ""}`}
                      >
                        <td className="py-3.5 px-6 text-slate-300">{row.label}</td>
                       <td className="py-3.5 px-6 text-center flex justify-center">
  {typeof row.value === "boolean" ? (
    row.value ? (
      <CheckIcon />
    ) : (
      <CrossIcon />
    )
  ) : (
    <span className="text-slate-200 font-medium">
      {row.value}
    </span>
  )}
</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            <div className="rounded-3xl border border-amber-400/15 bg-amber-400/5 p-8 text-center mb-20">
  <h3 className="text-2xl font-bold text-white mb-4">
    Questions about pricing?
  </h3>

  <p className="text-slate-400 max-w-2xl mx-auto mb-6">
    Get in touch with our team to understand plans, features, onboarding, and everything included with SwaadSetu.
  </p>

  <button className="btn bg-gradient-to-r from-amber-400 to-orange-400 text-black border-none" onClick={() => window.open('mailto:connect@swaadsetu.com')}>
    Talk to Our Team
  </button>
</div>


            {/*── Pricing Benefits (3 cards) ──*/}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
            >
              {[
                { title: "No Setup Fees", text: "Start without additional onboarding or installation charges." },
                { title: "Unlimited Growth", text: "No restrictions on menus, orders, or staff accounts." },
                { title: "Dedicated Support", text: "Real humans available through WhatsApp, call, and email." }
              ].map((card, i) => (
                <div key={i} className="rounded-2xl border border-amber-400/15 bg-amber-400/5 p-6">
                  <h4 className="text-base font-bold text-white mb-2">{card.title}</h4>
                  <p className="text-sm text-slate-400">{card.text}</p>
                </div>
              ))}
            </motion.div>

            {/* ── FAQ ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-center mb-2">
                Frequently asked questions
              </h2>
              <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mx-auto mb-10" />

              <div className="flex flex-col gap-3">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden"
                  >
                    <button
                      className="w-full flex items-center justify-between px-6 py-4 text-left text-sm font-medium text-white hover:bg-white/5 transition-colors"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    >
                      {faq.q}
                      <svg
                        className={`w-4 h-4 text-amber-400 shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5 text-sm text-slate-400 leading-relaxed border-t border-white/5">
                        <div className="pt-4">{faq.a}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              

              {/* Bottom CTA */}
              <div className="text-center mt-12">
                <p className="text-slate-400 text-sm mb-5">
                  Still have questions? We're happy to help. Talk to our team and see how SwaadSetu can fit your business operations.
                </p>
                <a
                  href="mailto:connect@swaadsetu.com"
                  className="btn btn-outline border-amber-400/40 text-amber-300 hover:bg-amber-400/10 rounded-xl px-8 group"
                >
                  Talk to Our Team →
                </a>
              </div>
            </motion.div>
          </div>
        </div>


<CTASection/>
        <Footer />
      </div>
    </>
  );
};

export default Pricing;
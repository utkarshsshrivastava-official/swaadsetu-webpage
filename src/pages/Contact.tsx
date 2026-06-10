import React, { useEffect } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Shield, Globe, Cpu, ExternalLink } from "lucide-react";
import Navbar from "../component/Navbar";
import { Footer, footerContact } from "../component/Footer";
import { Helmet } from "@dr.pogodin/react-helmet";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number] 
    } 
  }
};

const Contact: React.FC = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleFormRedirect = () => {
    window.open(
      "https://docs.google.com/forms/d/e/1FAIpQLSdjwZxtGkYIpulXopAiZBd-BKbQkqA81--N2DNZ5DqqMYTCXw/viewform?embedded=true",
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <>
      <Helmet>
        <title>Contact Swaad Setu</title>
        <meta
          name="description"
          content="Reach out to Swaad Setu for smarter restaurant ordering, guest engagement, and menu automation."
        />
      </Helmet>

      <div data-theme="swaad-dark" className="min-h-screen bg-base-100 text-base-content flex flex-col font-sans antialiased overflow-x-hidden selection:bg-amber-400 selection:text-black relative">
        <Navbar />

        {/* ── CINEMATIC AMBIENT ENGINE ── */}
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/40 to-black opacity-95" />
          <div className="absolute top-[-10%] right-[-10%] w-[65vw] aspect-square rounded-full bg-amber-500/[0.03] blur-[130px]" />
          <div className="absolute bottom-[15%] left-[-5%] w-[45vw] aspect-square rounded-full bg-orange-600/[0.02] blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px'
            }}
          />
        </div>

        {/* ── MAIN CONTENT LAYER ── */}
        <main className="flex-grow relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-12 gap-10 items-center w-full"
          >
            
            {/* ── LEFT CANVAS: BRAND STORYTELLING & CHANNELS ── */}
            <div className="lg:col-span-5 space-y-10 flex flex-col justify-between">
              
              <div className="space-y-6">
                {/* Premium Floating Badge */}
                <motion.div
                  variants={itemVariants}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-400/30 bg-amber-400/10 text-amber-300 text-xs font-bold tracking-widest uppercase shadow-[0_0_20px_rgba(251,191,36,0.15)] backdrop-blur-md"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  Restaurant Partner Network
                </motion.div>

                {/* Typography Block */}
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.05]"
                >
                  Let’s elevate your <br />
                  <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                    restaurant experience
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="text-slate-300 text-lg sm:text-xl leading-relaxed font-light max-w-xl"
                >
                  Reach out for restaurant ordering, table flow, and guest engagement solutions built specifically for modern Indian dining spaces.
                </motion.p>
              </div>

              {/* Communication Stack */}
              <div className="space-y-4 pt-4">
                <motion.a
                  variants={itemVariants}
                  href={`mailto:${footerContact.email}`}
                  className="group flex items-center gap-5 rounded-2xl border border-white/[0.05] bg-slate-950/60 p-5 transition-all duration-300 hover:border-amber-400/20 hover:bg-slate-900/40"
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-400/10 to-transparent text-amber-400 border border-white/5 transition-colors group-hover:bg-amber-400 group-hover:text-black">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">Partner Support</p>
                    <h4 className="text-sm font-semibold text-white mt-0.5 break-all">{footerContact.email}</h4>
                  </div>
                </motion.a>

                <div className="grid sm:grid-cols-2 gap-4">
                  <motion.a
                    variants={itemVariants}
                    href={`tel:${footerContact.phone.replace(/\s+/g, "")}`}
                    className="group block rounded-2xl border border-white/[0.05] bg-slate-950/60 p-5 transition-all duration-300 hover:border-amber-400/20 hover:bg-slate-900/40"
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-400/10 to-transparent text-amber-400 border border-white/5 mb-4 transition-colors group-hover:bg-amber-400 group-hover:text-black">
                      <Phone className="w-4 h-4" />
                    </div>
                    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">Sales & Onboarding</p>
                    <h4 className="text-sm font-semibold text-white mt-1">{footerContact.phone}</h4>
                  </motion.a>

                  <motion.a
                    variants={itemVariants}
                    href="https://maps.google.com/?q=Durg+Chhattisgarh"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-2xl border border-white/[0.05] bg-slate-950/60 p-5 transition-all duration-300 hover:border-amber-400/20 hover:bg-slate-900/40"
                  >
                    <div className="flex items-center justify-between text-amber-400 mb-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-400/10 to-transparent border border-white/5 transition-colors group-hover:bg-amber-400 group-hover:text-black">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                        Map <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                    <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-500">Head Office</p>
                    <div className="text-xs text-slate-300 mt-1 line-clamp-2">
                      {footerContact.addressLines.join(", ")}
                    </div>
                  </motion.a>
                </div>
              </div>
            </div>

            {/* ── RIGHT CANVAS: HIGH-FIDELITY INTERACTIVE LAUNCHPAD ── */}
            <div className="lg:col-span-7 w-full flex justify-center lg:justify-end">
              <motion.div
                variants={itemVariants}
                className="w-full max-w-xl bg-gradient-to-b from-slate-900/40 to-slate-950/90 border border-white/[0.08] rounded-[32px] p-8 md:p-10 shadow-2xl backdrop-blur-2xl relative overflow-hidden"
              >
                {/* Visual Accent Glow */}
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-amber-400/[0.03] blur-[50px] pointer-events-none" />

                <div className="space-y-8 relative z-10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white tracking-tight">Restaurant Enquiry</h3>
                      <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 font-mono text-[9px] text-amber-400">
                        <span className="w-1 h-1 rounded-full bg-amber-400 animate-ping" />
                        ONLINE INTAKE
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Initialize your onboarding sequence. Click below to launch our verified onboarding dashboard in a secure, full-screen environment.
                    </p>
                  </div>

                  {/* Informational Bento Accent Card */}
                  <div className="rounded-2xl border border-white/5 bg-black/40 p-5 shadow-inner">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      To help our solutions engineering team structure your customized venue blueprint, the form will gather details regarding your **ordering infrastructure, operating guest capacity, and existing Point of Sale integrations**.
                    </p>
                  </div>

                  {/* HIGH-FIDELITY HOVER BUTTON CAPABILITY */}
                  <motion.button
                    type="button"
                    onClick={handleFormRedirect}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="group w-full relative py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black font-black uppercase tracking-[0.15em] text-xs md:text-sm shadow-xl transition-shadow duration-300 hover:shadow-amber-500/10 flex items-center justify-center gap-2 overflow-hidden"
                  >
                    {/* Glossy sheen swipe animation on hover */}
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                    
                    <span>Open Enquiry Form</span>
                    <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </motion.button>

                  <p className="text-[10px] text-slate-500 text-center tracking-wide">
                    Fast-track deployment pipeline. Redirects to secure Google Infrastructure.
                  </p>
                </div>
              </motion.div>
            </div>

          </motion.div>
        </main>

        {/* ── SECURITY ENCRYPTION METRICS FOOTER BADGES ── */}
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 pt-8 border-t border-white/[0.05]">
            {[
              { icon: Shield, title: "Secure Guest Payments", desc: "Safe, compliant financial transaction layers for restaurant checkouts." },
              { icon: Cpu, title: "Reliable KOT Flow Engine", desc: "Digital tickets move instantly and securely from table endpoints to kitchen." },
              { icon: Globe, title: "Domestic Hospitality Support", desc: "Dedicated optimization service structured specifically for Indian operators." }
            ].map((stat, i) => {
              const StatIcon = stat.icon;
              return (
                <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-white/[0.01] border border-white/[0.02]">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-white/5 text-slate-400 flex items-center justify-center flex-shrink-0">
                    <StatIcon size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">{stat.title}</h4>
                    <p className="text-[11px] text-slate-500 leading-normal mt-0.5">{stat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
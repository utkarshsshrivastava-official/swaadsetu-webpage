import { useState, useMemo, memo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Clock, FileText, Bell, CreditCard, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Images } from "../assets/assets";

// Types
interface Feature {
  icon: React.ComponentType<{ className?: string; size?: number }>;
  title: string;
  description: string;
  color: string;
  bg: string;
  image: string;
  stat: { value: string; label: string };
  metrics: { label: string; value: string }[];
}

// Immutable Feature Configuration Data
const FEATURES_DATA: Feature[] = [
  {
    icon: QrCode,
    title: "QR Code Ordering",
    description: "Customers scan and order instantly. No app downloads, no waiting for staff. Pure convenience.",
    color: "#FBBF24",
    bg: "rgba(251,191,36,0.08)",
    image: Images.userFront,
    stat: { value: "3s", label: "avg. scan to order" },
    metrics: [
      { label: "Engagement lift", value: "+32%" },
      { label: "Friction Drop", value: "94%" }
    ]
  },
  {
    icon: Clock,
    title: "Live Order Tracking",
    description: "Real-time order status updates from kitchen to table. Complete transparency for customers.",
    color: "#22C55E",
    bg: "rgba(34,197,94,0.08)",
    image: Images.orderStatus,
    stat: { value: "0 calls", label: "to check order status" },
    metrics: [
      { label: "Faster turns", value: "18%" },
      { label: "Kitchen Sync", value: "Realtime" }
    ]
  },
  {
    icon: FileText,
    title: "Digital Bill Management",
    description: "Generate and share bills instantly. Support for split payments and custom discounts.",
    color: "#3B82F6",
    bg: "rgba(59,130,246,0.08)",
    image: Images.Bill,
    stat: { value: "1 tap", label: "to split & settle" },
    metrics: [
      { label: "Table Throughput", value: "+22%" },
      { label: "Split Latency", value: "Instant" }
    ]
  },
  {
    icon: Bell,
    title: "Instant Waiter Call",
    description: "Direct notification system for customer service. No more waiting or looking around.",
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    image: Images.placeOrder,
    stat: { value: "<5s", label: "staff response time" },
    metrics: [
      { label: "Staff Efficiency", value: "+40%" },
      { label: "Guest Frustration", value: "-85%" }
    ]
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Integrated UPI, cards, wallets. PCI-DSS compliant with instant payment reconciliation.",
    color: "#A78BFA",
    bg: "rgba(167,139,250,0.08)",
    image: Images.custDetails,
    stat: { value: "100%", label: "PCI-DSS compliant" },
    metrics: [
      { label: "Fail Rate", value: "0.01%" },
      { label: "Payout Sync", value: "Instant" }
    ]
  },
];

// Sub-component: Mock Phone Showcase
const DeviceShowcase = memo(({ activeFeature }: { activeFeature: Feature }) => (
  <div className="relative w-full max-w-[310px] mx-auto aspect-[9/18.5] rounded-[52px] border border-white/10 bg-[#020205] p-3 shadow-2xl shadow-black">
    {/* Screen Perimeter Bezel Inset */}
    <div className="absolute inset-[1px] rounded-[51px] border border-white/[0.04] pointer-events-none z-30" />
    
    {/* Display Area Container */}
    <div className="relative w-full h-full overflow-hidden rounded-[40px] bg-slate-950 flex flex-col justify-between">
      
      {/* Top Status Bar & Dynamic Island Layer */}
      <div className="absolute top-0 inset-x-0 h-11 bg-gradient-to-b from-black/60 to-transparent flex items-center justify-center z-40 px-6">
        <div className="w-24 h-4.5 bg-black rounded-full flex items-center justify-between px-2.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-camera-lens bg-slate-900" />
          <motion.div 
            animate={{ scale: [1, 1.15, 1] }} 
            transition={{ repeat: Infinity, duration: 3 }} 
            className="w-1 h-1 rounded-full bg-emerald-500" 
          />
        </div>
      </div>

      {/* Screen Interface Mock Mockup Frame Image Showcase */}
      <div className="relative flex-1 w-full h-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeFeature.image}
            src={activeFeature.image}
            alt={activeFeature.title}
            className="absolute inset-0 w-full h-full object-cover object-top select-none"
            initial={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>
      </div>

      {/* Bottom Virtual Home Indicator Strip */}
      <div className="absolute bottom-1.5 inset-x-0 flex justify-center pointer-events-none z-40">
        <div className="w-28 h-1 bg-white/25 rounded-full" />
      </div>
    </div>
  </div>
));
DeviceShowcase.displayName = "DeviceShowcase";

export function CustomerSection() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<number>(0);

  const currentFeature = useMemo(() => FEATURES_DATA[activeTab], [activeTab]);

  return (
    <section className="relative bg-[#03050c] text-slate-100 py-20 lg:py-32 px-4 overflow-hidden selection:bg-amber-400 selection:text-black">
      
      {/* Ultra-high-fidelity Ambient Lighting Mesh Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        <div className="absolute -top-[20%] -left-[10%] w-[60%] aspect-square rounded-full bg-indigo-900/20 blur-[160px]" />
        <motion.div 
          animate={{ background: currentFeature.bg }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute top-1/4 right-[-10%] w-[50%] aspect-square rounded-full blur-[180px]" 
        />
      </div>

      {/* Background Matrix Linear Structure Grid System */}
      <div className="absolute inset-0 z-0 opacity-[0.015] pointer-events-none bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">
        
        {/* Header Block Section Component */}
        <div className="text-center max-w-3xl mx-auto flex flex-col items-center gap-4">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-xs font-semibold uppercase tracking-wider text-amber-300 shadow-sm"
          >
            <Sparkles size={13} className="animate-spin-slow text-amber-400" />
            <span>Hyper-engineered Guest Flow</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]"
          >
            Features Crafted to{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-orange-500">
              Captivate
            </span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg font-light leading-relaxed max-w-2xl"
          >
            Empower your restaurant workspace layout ecosystem. Give diners access to seamless mobile ordering menus, frictionless checkout channels, and immediate table requests.
          </motion.p>
        </div>

        {/* Core Main Grid Framework Ecosystem */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Tab Selection Column Layout Array Left Side */}
          <div className="lg:col-span-4 flex flex-col gap-3.5 order-2 lg:order-1">
            {FEATURES_DATA.map((item, index) => {
              const isActive = index === activeTab;
              const IconComponent = item.icon;
              return (
                <button
                  key={item.title}
                  onClick={() => setActiveTab(index)}
                  className={`relative group flex items-start gap-4 p-5 rounded-3xl text-left transition-all duration-300 border focus:outline-none ${
                    isActive 
                      ? "bg-slate-900/60 border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_12px_24px_-10px_rgba(0,0,0,0.5)]" 
                      : "bg-transparent border-transparent hover:bg-slate-900/20 hover:border-white/5"
                  }`}
                >
                  <div 
                    className="flex-shrink-0 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: isActive ? item.color : "rgba(255,255,255,0.03)" }}
                  >
                    <IconComponent 
                      size={18} 
                      className="transition-colors duration-300"
                      style={{ color: isActive ? "#000000" : "rgba(255,255,255,0.6)" }} 
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className={`font-semibold text-sm transition-colors duration-200 ${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200"}`}>
                      {item.title}
                    </h4>
                    <p className={`text-xs leading-relaxed transition-opacity duration-300 ${isActive ? "text-slate-300 opacity-100" : "text-slate-500 opacity-0 h-0 overflow-hidden"}`}>
                      {item.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Central Interactive Phone Device Frame Container */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col items-center justify-center relative py-6 lg:py-0">
            {/* Soft Radial Ambient Reactive Glow behind Phone Case */}
            <motion.div 
              animate={{ background: `radial-gradient(circle, ${currentFeature.color}1F 0%, transparent 70%)` }}
              className="absolute w-[120%] aspect-square pointer-events-none z-0" 
            />
            <div className="relative z-10 w-full">
              <DeviceShowcase activeFeature={currentFeature} />
            </div>
          </div>

          {/* Data Analytic Stats & Interactive CTAs Sidebar Grid Panel Right Side */}
          <div className="lg:col-span-4 order-3 flex flex-col gap-6">
            
            {/* Dynamic Card Displaying Performance Telemetry */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-900/80 to-slate-950/90 p-6 shadow-xl backdrop-blur-md">
              <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                <currentFeature.icon size={120} style={{ color: currentFeature.color }} />
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-500 block mb-1">Performance Benchmark</span>
                  <motion.div 
                    key={currentFeature.stat.value}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-4xl font-black tracking-tight tabular-nums"
                    style={{ color: currentFeature.color }}
                  >
                    {currentFeature.stat.value}
                  </motion.div>
                  <p className="text-xs text-slate-400 mt-0.5 font-medium">{currentFeature.stat.label}</p>
                </div>

                <hr className="border-white/5" />

                {/* Micro Metrics Rows sub grids */}
                <div className="grid grid-cols-2 gap-3">
                  {currentFeature.metrics.map((m) => (
                    <div key={m.label} className="p-3 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
                      <span className="text-[9px] font-bold tracking-wider uppercase text-slate-500 block">{m.label}</span>
                      <span className="text-base font-bold text-white tracking-tight tabular-nums block">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro Badges Sub Grid Container */}
            <div className="flex flex-wrap gap-2">
              {["UPI Auto-Settle", "Appless Infrastructure", "Fault-Tolerant Queue", "Multilingual Localisation"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/[0.06] bg-slate-900/40 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                  <div className="w-1 h-1 rounded-full bg-slate-500" />
                  {badge}
                </div>
              ))}
            </div>

            {/* Action Call to Action Button Layout Container Rows */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mt-2">
              <button
                onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSdjwZxtGkYIpulXopAiZBd-BKbQkqA81--N2DNZ5DqqMYTCXw/viewform?embedded=true', '_blank')}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Request Live Sandbox Demo</span>
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
              
              <button
                onClick={() => navigate('/features')}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-2xl font-semibold text-sm border border-white/10 bg-white/[0.02] text-slate-200 hover:bg-white/[0.06] hover:border-white/20 transition-all duration-200"
              >
                Explore Structural Architecture
              </button>
            </div>

          </div>
        </div>

        {/* Global Bottom Summary Analytics Showcase Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-white/5 pt-12 mt-4">
          {[
            { icon: QrCode, color: "text-amber-400", title: "Frictionless Onboarding", text: "Drastically reduce table abandonment rates with intuitive scan workflows needing absolutely zero manual setups." },
            { icon: ShieldCheck, color: "text-emerald-400", title: "Bank-Grade Encryption", text: "Secure enterprise operational parameters. Rest assured with native end-to-end continuous validation checks." },
            { icon: Bell, color: "text-indigo-400", title: "Optimized Waiter Routing", text: "Intelligent layout communication queues decrease internal transit overhead and improve staff synchronization speed." }
          ].map((card, i) => {
            const CardIcon = card.icon;
            return (
              <div key={i} className="group p-6 rounded-3xl border border-white/[0.05] bg-gradient-to-b from-slate-900/30 to-slate-950/50 space-y-3 hover:border-white/10 transition-all duration-300">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center bg-white/[0.03] ${card.color} group-hover:scale-105 transition-transform duration-300`}>
                  <CardIcon size={16} />
                </div>
                <h5 className="font-semibold text-sm text-white tracking-wide">{card.title}</h5>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{card.text}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
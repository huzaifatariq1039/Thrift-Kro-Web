"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  Shield,
  Sparkles,
  ArrowRight,
  Check,
  Lock,
  Zap,
  Star,
} from "lucide-react";

/* ─── Animation Helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section
      ref={ref}
      id={id}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/* ─── Navbar ─── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#F6F6F4]/80 backdrop-blur-xl border-b border-[#E6E6E1]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <a href="#" className="block">
          <Image src="/logo.png" alt="Thrift Kro Logo" width={130} height={36} className="object-contain h-9 w-auto" priority />
        </a>
        <a
          href="#waitlist"
          className="bg-[#FF5C00] hover:bg-[#E55200] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
        >
          Join the Beta
        </a>
      </div>
    </motion.nav>
  );
}

/* ─── Hero Section ─── */
function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      const formData = new URLSearchParams();
      formData.append("form-name", "hero-waitlist");
      formData.append("email", email);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      })
      .then(() => {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setEmail("");
      })
      .catch((error) => console.error(error));
    }
  };

  return (
    <Section
      id="hero"
      className="pt-[140px] pb-24 md:pb-32 px-6 md:px-10 max-w-7xl mx-auto relative"
    >
      {/* Subtle Background Watermark */}
      <div className="absolute top-[100px] lg:top-[140px] left-1/2 -translate-x-1/2 w-full flex justify-center pointer-events-none select-none z-0 opacity-80">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="text-[100px] sm:text-[160px] md:text-[220px] lg:text-[300px] font-black text-[#FF5C00]/[0.04] uppercase tracking-tighter leading-none whitespace-nowrap"
        >
          Coming Soon
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        {/* Left - Copy */}
        <div>
          <motion.div variants={fadeUp} custom={0}>
            <div className="inline-flex items-center gap-2.5 bg-[#121212] text-white text-[12px] md:text-[13px] font-bold px-5 py-2.5 rounded-full mb-6 uppercase tracking-[0.15em] shadow-xl hover:scale-105 transition-transform cursor-default">
              <Sparkles className="w-4 h-4 text-[#FF5C00]" />
              Coming Soon
            </div>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            custom={1}
            className="text-[52px] sm:text-[64px] md:text-[76px] lg:text-[84px] font-extrabold leading-[1.0] tracking-[-0.04em] text-[#121212] drop-shadow-sm"
          >
            Try kro.
            <br />
            Buy kro.
            <br />
            <span className="gradient-text-orange">Thrift kro.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-6 text-[17px] md:text-[18px] leading-relaxed text-[#7A7A75] max-w-xl"
          >
            Pakistan&apos;s first AI-powered secondhand streetwear marketplace.
            Built for Gen-Z. See exactly how pieces fit before you buy with our
            virtual try-on. Upgrade your closet without destroying the planet.
          </motion.p>

          {/* Email Form */}
          <motion.form
            name="hero-waitlist"
            variants={fadeUp}
            custom={3}
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-0"
          >
            <input type="hidden" name="form-name" value="hero-waitlist" />
            <div className="relative flex-1">
              <input
                id="hero-email-input"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email..."
                className="w-full h-[52px] pl-5 pr-4 bg-white border border-[#E6E6E1] sm:border-r-0 rounded-full sm:rounded-r-none text-[15px] text-[#121212] placeholder:text-[#B0B0AB] focus:border-[#FF5C00] transition-colors duration-200"
              />
            </div>
            <button
              id="hero-cta-button"
              type="submit"
              className="h-[52px] px-7 bg-[#FF5C00] hover:bg-[#E55200] text-white font-semibold text-[15px] rounded-full sm:rounded-l-none flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap cta-glow"
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" /> You&apos;re in!
                </>
              ) : (
                <>
                  Get Early Access <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>

          <motion.div variants={fadeUp} custom={4} className="mt-6 flex items-center gap-4 text-xs text-[#7A7A75]">
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> Zero spam
            </span>
            <span className="w-1 h-1 rounded-full bg-[#D1D1CC]" />
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5" /> Launch updates only
            </span>
          </motion.div>
        </div>

        {/* Right - Floating Cards */}
        <motion.div
          variants={fadeIn}
          className="relative h-[420px] md:h-[480px] lg:h-[520px] hidden lg:block"
        >
          {/* Card 1: Product card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="absolute top-4 left-8 w-[220px] bg-white border border-[#E6E6E1] rounded-[14px] overflow-hidden transition-transform duration-300 card-lift animate-float shadow-xl shadow-black/5"
          >
            <div className="relative w-full h-[200px] bg-[#F6F6F4]">
              <Image
                src="/carhartt-vest.png"
                alt="Carhartt vest product"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <p className="text-[13px] font-semibold text-[#121212]">Carhartt WIP Vest</p>
              <p className="text-[12px] text-[#7A7A75] mt-0.5">Lightly worn · Size L</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[16px] font-bold text-[#121212]">Rs. 4,800</span>
                <span className="text-[11px] line-through text-[#B0B0AB]">Rs. 12,500</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Escrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="absolute top-[180px] right-4 w-[200px] bg-white border border-[#E6E6E1] rounded-[14px] p-5 transition-transform duration-300 card-lift animate-float-delayed shadow-xl shadow-black/5"
          >
            <div className="w-10 h-10 rounded-full bg-[#FFF0E6] flex items-center justify-center mb-3">
              <Shield className="w-5 h-5 text-[#FF5C00]" />
            </div>
            <p className="text-[14px] font-semibold text-[#121212]">Escrow Protected</p>
            <p className="text-[12px] text-[#7A7A75] mt-1 leading-relaxed">
              Payment held securely until delivery confirmed
            </p>
            <div className="mt-3 flex items-center gap-1.5">
              <div className="w-full bg-[#E6E6E1] rounded-full h-1.5">
                <div className="bg-[#22C55E] h-1.5 rounded-full w-full" />
              </div>
              <Check className="w-3.5 h-3.5 text-[#22C55E]" />
            </div>
          </motion.div>

          {/* Card 3: AI Style Card */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -1 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
            className="absolute bottom-4 left-[60px] w-[210px] bg-white border border-[#E6E6E1] rounded-[14px] p-5 transition-transform duration-300 card-lift animate-float-slow shadow-xl shadow-black/5"
          >
            <div className="w-10 h-10 rounded-full bg-[#E6EEFF] flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5 text-[#0047FF]" />
            </div>
            <p className="text-[14px] font-semibold text-[#121212]">AI Style Match</p>
            <p className="text-[12px] text-[#7A7A75] mt-1 leading-relaxed">
              &quot;Based on your vibe, you&apos;d love this piece&quot;
            </p>
            <div className="mt-3 flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-[#FF5C00] text-[#FF5C00]" />
              ))}
              <span className="text-[11px] text-[#7A7A75] ml-1">98% match</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Marquee Section ─── */
function MarqueeStrip() {
  const brands = [
    "Supreme", "Carhartt WIP", "Stüssy", "Palace", "Off-White", "Nike", "Aime Leon Dore", "BAPE",
    "Supreme", "Carhartt WIP", "Stüssy", "Palace", "Off-White", "Nike", "Aime Leon Dore", "BAPE",
  ];
  return (
    <div className="w-full overflow-hidden border-y border-[#E6E6E1] bg-white py-4 relative">
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="flex whitespace-nowrap animate-marquee">
        {brands.map((brand, i) => (
          <span key={i} className="text-[#B0B0AB] text-[15px] font-semibold uppercase tracking-widest mx-8">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Featured Carousel ─── */
function FeaturedCarousel() {
  const items = [
    { id: 1, image: "/carhartt-vest.png", title: "Carhartt WIP Vest", price: "Rs. 4,800", orig: "Rs. 12,500" },
    { id: 2, image: "/vintage-tee.png", title: "Vintage Band Tee", price: "Rs. 2,500", orig: "Rs. 6,000" },
    { id: 3, image: "/carhartt-vest.png", title: "Stüssy Zip Hoodie", price: "Rs. 8,200", orig: "Rs. 18,000" },
    { id: 4, image: "/vintage-tee.png", title: "Nike Dunk Low", price: "Rs. 15,000", orig: "Rs. 25,000" },
    { id: 5, image: "/carhartt-vest.png", title: "Palace Windbreaker", price: "Rs. 12,000", orig: "Rs. 22,000" },
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  return (
    <Section id="featured" className="py-24 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
      <motion.div variants={fadeUp} custom={0} className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-[32px] md:text-[40px] font-bold tracking-tight text-[#121212]">
            Fresh from the Vault
          </h2>
          <p className="text-[#7A7A75] mt-2">Curated preloved pieces dropping daily.</p>
        </div>
        <div className="hidden md:flex gap-2">
          <div className="w-10 h-10 rounded-full border border-[#E6E6E1] flex items-center justify-center opacity-50 cursor-not-allowed">
            <ArrowRight className="w-5 h-5 rotate-180" />
          </div>
          <div className="w-10 h-10 rounded-full border border-[#E6E6E1] flex items-center justify-center bg-[#121212] text-white">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} custom={1} className="relative cursor-grab active:cursor-grabbing">
        <motion.div
          ref={carouselRef}
          className="flex gap-6 overflow-x-visible"
          drag="x"
          dragConstraints={{ right: 0, left: -800 }}
        >
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="min-w-[280px] md:min-w-[320px] bg-white border border-[#E6E6E1] rounded-[14px] overflow-hidden card-lift shadow-sm"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative w-full h-[320px] bg-[#F6F6F4] p-6 flex items-center justify-center">
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full z-10 border border-[#E6E6E1]">
                  Verified
                </div>
                <div className="relative w-full h-full">
                  <Image src={item.image} alt={item.title} fill className="object-contain drop-shadow-xl" draggable="false" />
                </div>
              </div>
              <div className="p-5">
                <p className="text-[16px] font-bold text-[#121212]">{item.title}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[18px] font-bold text-[#FF5C00]">{item.price}</span>
                  <span className="text-[13px] line-through text-[#B0B0AB]">{item.orig}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}

/* ─── How It Works ─── */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Upload & Verify", desc: "Snap a pic. Our AI instantly verifies brand authenticity and suggests the market price." },
    { num: "02", title: "AI Virtual Try-On", desc: "Our vision model drapes your flat-lay item onto diverse virtual models to boost sales." },
    { num: "03", title: "Escrow Secured", desc: "Buyer pays into our secure vault. Funds are only released when the item arrives." },
    { num: "04", title: "Eco-Flex", desc: "Look good while reducing fashion waste. Track your carbon savings on your profile." }
  ];

  return (
    <Section id="how-it-works" className="py-24 bg-[#121212] text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <motion.div variants={fadeUp} custom={0} className="mb-16">
          <span className="text-[13px] font-medium text-[#FF5C00] tracking-wider uppercase">The Process</span>
          <h2 className="text-[36px] md:text-[46px] font-bold tracking-tight mt-2">How Thrift Kro Works</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-[24px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-[#333] to-transparent" />
          
          {steps.map((step, i) => (
            <motion.div key={i} variants={fadeUp} custom={i + 1} className="relative z-10">
              <div className="w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#333] flex items-center justify-center text-[16px] font-bold text-[#FF5C00] mb-6 shadow-[0_0_15px_rgba(255,92,0,0.15)]">
                {step.num}
              </div>
              <h3 className="text-[20px] font-bold mb-3">{step.title}</h3>
              <p className="text-[#888] leading-relaxed text-[15px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Bento Box Goals ─── */
function BentoGoals() {
  return (
    <Section id="goals" className="py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <motion.div variants={fadeUp} custom={0} className="text-center mb-14">
        <span className="text-[13px] font-medium text-[#FF5C00] tracking-wider uppercase">Why Thrift Kro</span>
        <h2 className="text-[36px] md:text-[46px] font-bold tracking-tight text-[#121212] mt-2">
          Smart. Trusted. Effortless.
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[280px]">
        {/* Large Feature 1 */}
        <motion.div variants={fadeUp} custom={1} className="md:col-span-2 md:row-span-2 bg-white border border-[#E6E6E1] rounded-[24px] p-10 overflow-hidden relative group card-lift hover:border-[#D1D1CC]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#E6EEFF] to-transparent rounded-bl-full opacity-50 transition-transform duration-500 group-hover:scale-110" />
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-14 h-14 rounded-2xl bg-[#E6EEFF] flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-[#0047FF]" />
            </div>
            <div>
              <h3 className="text-[28px] font-bold text-[#121212] mb-4">AI-Powered Commerce</h3>
              <p className="text-[16px] leading-relaxed text-[#7A7A75] max-w-md">
                Smart pricing, AI-generated virtual try-ons, and intelligent style matching. Our vision models do the heavy lifting so you can shop smarter and sell faster.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Small Feature 1 */}
        <motion.div variants={fadeUp} custom={2} className="bg-white border border-[#E6E6E1] rounded-[24px] p-8 relative overflow-hidden group card-lift hover:border-[#D1D1CC]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FFF0E6] to-transparent rounded-bl-full opacity-50 transition-transform duration-500 group-hover:scale-110" />
          <div className="w-12 h-12 rounded-xl bg-[#FFF0E6] flex items-center justify-center mb-6 relative z-10">
            <Shield className="w-5 h-5 text-[#FF5C00]" />
          </div>
          <h3 className="text-[20px] font-bold text-[#121212] mb-2 relative z-10">Trusted & Verified</h3>
          <p className="text-[14px] leading-relaxed text-[#7A7A75] relative z-10">
            Every payment is escrow-protected. Zero scams, zero fakes.
          </p>
        </motion.div>

        {/* Small Feature 2 */}
        <motion.div variants={fadeUp} custom={3} className="bg-white border border-[#E6E6E1] rounded-[24px] p-8 relative overflow-hidden group card-lift hover:border-[#D1D1CC]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#F0F0ED] to-transparent rounded-bl-full opacity-50 transition-transform duration-500 group-hover:scale-110" />
          <div className="w-12 h-12 rounded-xl bg-[#F0F0ED] flex items-center justify-center mb-6 relative z-10">
            <Zap className="w-5 h-5 text-[#121212]" />
          </div>
          <h3 className="text-[20px] font-bold text-[#121212] mb-2 relative z-10">Seamless Delivery</h3>
          <p className="text-[14px] leading-relaxed text-[#7A7A75] relative z-10">
            One-tap listings, real-time tracking, and hassle-free logistics across Pakistan.
          </p>
        </motion.div>
      </div>
    </Section>
  );
}

/* ─── Bottom Waitlist Form ─── */
function WaitlistForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      const formData = new URLSearchParams();
      formData.append("form-name", "main-waitlist");
      formData.append("name", name);
      formData.append("email", email);
      formData.append("role", role);

      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString()
      })
      .then(() => {
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setName("");
          setEmail("");
          setRole("buyer");
        }, 4000);
      })
      .catch((error) => console.error(error));
    }
  };

  return (
    <Section
      id="waitlist"
      className="py-24 md:py-32 px-6 md:px-10 max-w-3xl mx-auto"
    >
      <motion.div
        variants={fadeUp}
        custom={0}
        className="bg-white border border-[#E6E6E1] rounded-[14px] p-8 md:p-12"
      >
        <div className="text-center mb-10">
          <motion.span
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 bg-[#FFF0E6] text-[#FF5C00] text-xs font-semibold px-4 py-2 rounded-full mb-5"
          >
            <Lock className="w-3.5 h-3.5" /> Limited beta slots
          </motion.span>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-[30px] md:text-[38px] font-bold tracking-[-0.02em] text-[#121212] leading-tight"
          >
            The closet opens soon.
            <br />
            <span className="text-[#7A7A75]">Reserve your spot.</span>
          </motion.h2>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-16 h-16 rounded-full bg-[#ECFDF5] flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7 text-[#22C55E]" />
            </div>
            <p className="text-[20px] font-bold text-[#121212]">You&apos;re on the list!</p>
            <p className="text-[14px] text-[#7A7A75] mt-2">
              We&apos;ll hit you up when the doors open.
            </p>
          </motion.div>
        ) : (
          <motion.form
            name="main-waitlist"
            variants={fadeUp}
            custom={2}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <input type="hidden" name="form-name" value="main-waitlist" />
            
            <div>
              <label htmlFor="waitlist-name" className="block text-[13px] font-medium text-[#121212] mb-2">
                Full name
              </label>
              <input
                id="waitlist-name"
                name="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ayan Khan"
                className="w-full h-[50px] px-5 bg-[#F6F6F4] border border-[#E6E6E1] rounded-[14px] text-[14px] text-[#121212] placeholder:text-[#B0B0AB] focus:border-[#FF5C00] transition-colors duration-200"
              />
            </div>

            <div>
              <label htmlFor="waitlist-email" className="block text-[13px] font-medium text-[#121212] mb-2">
                Email address
              </label>
              <input
                id="waitlist-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ayan@example.com"
                className="w-full h-[50px] px-5 bg-[#F6F6F4] border border-[#E6E6E1] rounded-[14px] text-[14px] text-[#121212] placeholder:text-[#B0B0AB] focus:border-[#FF5C00] transition-colors duration-200"
              />
            </div>

            {/* Role Toggle */}
            <div>
              <label className="block text-[13px] font-medium text-[#121212] mb-3">
                I want to
              </label>
              <div className="flex gap-3">
                {(["buyer", "seller"] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 h-[48px] rounded-full text-[14px] font-semibold border transition-all duration-200 ${
                      role === r
                        ? "bg-[#121212] text-white border-[#121212]"
                        : "bg-white text-[#7A7A75] border-[#E6E6E1] hover:border-[#D1D1CC]"
                    }`}
                  >
                    {r === "buyer" ? "🛒 Buy" : "🏷️ Sell"}
                  </button>
                ))}
              </div>
            </div>

            <button
              id="waitlist-cta-button"
              type="submit"
              className="w-full h-[54px] bg-[#FF5C00] hover:bg-[#E55200] text-white font-bold text-[15px] rounded-full flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] mt-2 cta-glow"
            >
              Lock my position <ArrowRight className="w-4 h-4" />
            </button>

            <p className="text-center text-[12px] text-[#B0B0AB] mt-3">
              No credit card required. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </motion.div>
    </Section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="py-12 px-6 md:px-10 border-t border-[#E6E6E1]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
          <Image src="/logo.png" alt="Thrift Kro Logo" width={110} height={30} className="object-contain h-7 w-auto" />
          <span className="text-[13px] text-[#7A7A75]">
            © 2026 Thrift Kro. Built in Islamabad.
          </span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/thriftkaroooo?igsh=cDlmMzJpNGM1eXVj"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-[#E6E6E1] flex items-center justify-center text-[#7A7A75] hover:text-[#121212] hover:border-[#D1D1CC] transition-all duration-200"
            aria-label="Instagram"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a
            href="https://www.linkedin.com/company/thrift-kro"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full border border-[#E6E6E1] flex items-center justify-center text-[#7A7A75] hover:text-[#121212] hover:border-[#D1D1CC] transition-all duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── Page Root ─── */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 grain-overlay relative">
        <Hero />
        <MarqueeStrip />
        <FeaturedCarousel />
        <HowItWorks />
        <BentoGoals />
        <WaitlistForm />
      </main>
      <Footer />
    </>
  );
}

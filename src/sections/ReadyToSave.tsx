import { fadeUp } from "@/utils/constants";
import { useWaitlistOpen } from "@/zustand";
import { motion } from "motion/react";

const AVATAR_COLORS = [
  "bg-text",
  "bg-[#d282f9]",
  "bg-[#f544bd]",
  "bg-[#ecfef8]",
  "bg-[#0a3d2c]",
];

const TRUST_ITEMS = [
  "Free forever",
  "No hidden fees",
  "Verified students only",
];

export default function ReadyToSave() {
 
  return (
    <section id="ready-to-save" className="bg-text py-24 px-6 md:px-8 relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute w-100 h-100 rounded-full border border-[#17f3b515] -top-50 left-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute w-60 h-60 rounded-full border border-[#17f3b510] -bottom-30 right-15 pointer-events-none" />
      <div className="absolute w-40 h-40 rounded-full border border-[#d282f910] -bottom-20 left-20 pointer-events-none" />

      <div className="max-w-2xl mx-auto flex flex-col items-center text-center relative z-10">
        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0)}
          className="text-[11px] font-bold text-primary uppercase tracking-widest mb-4"
        >
          Ready to save?
        </motion.p>

        {/* Headline */}
        <motion.h2
          {...fadeUp(0.08)}
          className="text-[44px] font-extrabold text-[#ecfef8] leading-[1.05] tracking-[-1.5px] mb-4"
          style={{ fontFamily: "Syne, serif" }}
        >
          Your campus market
          <br />
          is <span className="text-primary">waiting</span>.
        </motion.h2>

        {/* Sub */}
        <motion.p
          {...fadeUp(0.14)}
          className="text-[15px] text-[#6b9e8a] leading-relaxed max-w-105 mb-10"
        >
          Join thousands of students buying and selling smarter. Sign up free —
          no credit card, no catch.
        </motion.p>

        {/* Buttons */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex flex-col sm:flex-row gap-3 mb-10"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            
            className="bg-primary text-text font-bold text-[15px] px-8 py-4 rounded-[14px] cursor-pointer"
          >
            Get started free →
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="bg-transparent text-[#ecfef8] font-medium text-[15px] px-8 py-4 rounded-[14px] border border-[#0a3d2c] cursor-pointer hover:border-[#17f3b530] transition-colors"
          >
            Browse listings
          </motion.button>
        </motion.div>

        {/* Social proof */}

        {/* Trust pills */}
        <motion.div
          {...fadeUp(0.32)}
          className="flex flex-wrap gap-5 justify-center"
        >
          {TRUST_ITEMS.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-[12px] text-[#6b9e8a]">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

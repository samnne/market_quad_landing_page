import { fadeUp, PHONE_CARDS, PHONE_CHIPS, STATS } from "@/utils/constants";
import { useWaitlistOpen } from "@/zustand";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import profilePage from "../../public/profile.PNG";
import convosPage from "../../public/convos.PNG";
import listingPage from "../../public/listings.PNG";
export default function Hero() {
  const { setWaitlistOpen, waitlistCount, setWaitlistCount } =
    useWaitlistOpen();
  const [activeImage, setActiveImage] = useState(0);
  const images = [listingPage, profilePage, convosPage];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch("/api/supabase")
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.count));
  }, []);

  return (
    <section className="bg-text min-h-screen flex flex-col">
      {/* Nav */}

      {/* Hero grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-12 px-8 py-20 items-center max-w-6xl mx-auto w-full">
        {/* Left */}
        <div className="flex flex-col">
          <motion.div
            {...fadeUp(0.1)}
            className="inline-flex items-center gap-2 bg-[#0a3d2c] border border-[#17f3b540] rounded-full px-3 py-1.5 w-fit mb-5"
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span className="text-[11px] font-bold text-primary uppercase tracking-widest">
              Student marketplace
            </span>
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="text-[52px] font-extrabold text-[#ecfef8] leading-[1.05] tracking-[-2px] mb-5"
            style={{ fontFamily: "Syne, serif" }}
          >
            Buy & sell on
            <br />
            <span className="text-primary">Campus</span>.<br />
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-[15px] text-[#6b9e8a] leading-relaxed mb-8 max-w-95"
          >
            MarketQuad connects students at your university. Textbooks,
            electronics, housing; all in one place, trusted by your peers.{" "}

            Built for Students, by Students.
          </motion.p>

          <motion.div {...fadeUp(0.25)} className="flex items-center gap-4">
            <button
              onClick={() => setWaitlistOpen(true)}
              className="bg-primary text-text font-bold text-[14px] px-6 py-3.5 rounded-xl cursor-pointer"
            >
              Get started free →
            </button>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 text-[14px] text-[#6b9e8a] font-medium"
            >
              See how it works
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle
                  cx="7"
                  cy="7"
                  r="6"
                  stroke="#6b9e8a"
                  strokeWidth="1.2"
                />
                <path
                  d="M5.5 7l2 2 2-4"
                  stroke="#6b9e8a"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          {/* Stats */}
          <p className="text-[12px] p-2 text-[#6b9e8a]">
            <span className="text-primary font-bold">{waitlistCount}</span>{" "}
            students already waiting
          </p>
        </div>

        {/* Right — phone mockup */}
        <motion.div {...fadeUp(0.2)} className="flex justify-center relative">
          {/* Decorative rings */}
          <div className="absolute w-75 h-75 rounded-full border border-[#17f3b515] -top-15 -right-10 pointer-events-none" />
          <div className="absolute w-45 h-45 rounded-full border border-[#d282f915] bottom-10 -left-5 pointer-events-none" />

          {/* Phone frame */}
          <div className="w-55 bg-[#ecfef8] rounded-4xl border-[6px] border-[#0a3d2c] overflow-hidden flex flex-col">
            {/* Notch */}
            <div className="w-15 h-4.5 bg-[#0a3d2c] rounded-b-xl mx-auto" />
            <div className="w-52 h-100  relative">

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={images[activeImage]}
                  alt=""
                  className="absolute aspect-9/16 mix-blend-multiply inset-0 w-full h-full "
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          </div>
          {/* Search bar */}
          {/* <div className="mx-3 mb-2 bg-white border border-[#c8f5e8] rounded-[10px] px-2.5 py-1.5 flex items-center gap-2">
              <div className="flex-1 h-1.5 bg-[#e0faf2] rounded-full" />
              <div className="w-5 h-5 bg-primary rounded-md" />
            </div> */}

          {/* Chips */}
          {/* <div className="flex gap-1.5 px-3 pb-2 overflow-hidden">
              {PHONE_CHIPS.map((chip, i) => (
                <span
                  key={chip}
                  className={`shrink-0 px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                    i === 0
                      ? "bg-text text-primary border-text"
                      : "bg-white text-[#6b9e8a] border-[#c8f5e8]"
                  }`}
                >
                  {chip}
                </span>
              ))}
            </div> */}

          {/* Cards grid */}
          {/* <div className="grid grid-cols-2 gap-2 px-3">
              {PHONE_CARDS.map(({ emoji, bg, name, price }) => (
                <div
                  key={name}
                  className="bg-white rounded-xl border border-[#e0faf2] overflow-hidden"
                >
                  <div
                    className={`h-14 ${bg} flex items-center justify-center text-[22px]`}
                  >
                    {emoji}
                  </div>
                  <div className="px-2 py-1.5">
                    <p className="text-[9px] font-bold text-text">{name}</p>
                    <p className="text-[9px] font-bold text-primary mt-0.5">
                      {price}
                    </p>
                  </div>
                </div>
              ))}
            </div> */}

          {/* Sell banner */}
        </motion.div>
      </div>
    </section>
  );
}

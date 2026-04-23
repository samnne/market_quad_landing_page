import { fadeUp, PHONE_CARDS, PHONE_CHIPS, STATS } from "@/utils/constants";
import { useWaitlistOpen } from "@/zustand";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

import profilePage from "../../public/profile.PNG";
import convosPage from "../../public/convos.PNG";
import marketquad from "../../public/marketquad.PNG";
import home_page from "../../public/home_page.PNG";
import newPage from "../../public/new.PNG";
import listingPage from "../../public/market.PNG";
import { getClientId } from "@/utils/utils";
export default function Hero() {
  const { setWaitlistOpen, waitlistCount, setWaitlistCount } =
    useWaitlistOpen();
  const [activeImage, setActiveImage] = useState(0);
  const images = [
    listingPage,
    profilePage,
    convosPage,
    marketquad,
    home_page,
    newPage,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lsCount = localStorage.getItem("COUNT")
    if (waitlistCount){
      return
    }
    fetch("/api/supabase", {
      headers: {
        "x-client-id": getClientId(),
      },
    })
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.count ?? (( typeof lsCount === "number") ? parseInt(lsCount!) : lsCount)));
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
            electronics, housing; all in one place, trusted by your peers. Built
            for Students, by Students.
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
        </motion.div>
      </div>
    </section>
  );
}

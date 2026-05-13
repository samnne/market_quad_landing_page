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
import appScreenshot from "../../public/app.PNG";
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

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveImage((prev) => (prev + 1) % images.length);
  //   }, 3000);
  //   return () => clearInterval(interval);
  // }, []);

  useEffect(() => {
    const lsCount = localStorage.getItem("COUNT");
    if (waitlistCount) {
      return;
    }
    fetch("/api/supabase", {
      headers: {
        "x-client-id": getClientId(),
      },
    })
      .then((res) => res.json())
      .then((data) =>
        setWaitlistCount(
          data.count ??
            (typeof lsCount === "number" ? parseInt(lsCount!) : lsCount),
        ),
      );
  }, []);

  return (
    <section className="bg-background min-h-screen flex flex-col">
      {/* Nav */}

      {/* Hero grid */}
      <div className="flex-1 z-10 grid grid-cols-1 md:grid-cols-2 gap-12 px-8 py-20 items-center max-w-6xl mx-auto w-full">
        {/* Left */}
        <div className="flex flex-col">
          

          <motion.h1
            {...fadeUp(0.15)}
            className="text-[52px] font-extrabold text-text leading-[1.05] tracking-[-2px] mb-5"
         
          >
            Buy & sell on
            <br />
            <span className="text-primary">Campus</span>.<br />
          </motion.h1>

          <motion.p
            {...fadeUp(0.2)}
            className="text-[15px] text-text/80 font-semibold leading-relaxed mb-4 max-w-95"
          >
            MarketQuad connects students at your university. Textbooks,
            electronics, housing; all in one place, trusted by your peers. Built
            for Students, by Students.
          </motion.p>

          <motion.div {...fadeUp(0.25)} className="flex items-center gap-4">
            <button
              onClick={() => setWaitlistOpen(true)}
              className="bg-primary text-text font-bold flex justify-center items-center text-xl px-6 py-4 rounded-full cursor-pointer"
            >
              Get started free
            </button>
           
          </motion.div>

          {/* Stats */}
          <p className="text-xl pt-1  text-text/70">
            <span className="text-primary font-black">{waitlistCount}</span>{" "}
            students already waiting
          </p>
        </div>

        {/* Right — phone mockup */}
        <motion.div className="flex justify-center  relative">
       
          {/* Phone frame */}

          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={appScreenshot}
              alt=""
              className="    inset-0 w-90 h-full "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </AnimatePresence>
        </motion.div>
      </div>
     
    </section>
  );
}

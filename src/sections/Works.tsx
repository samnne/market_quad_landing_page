import { fadeUp } from "@/utils/constants";
import { useWaitlistOpen } from "@/zustand";
import { motion } from "motion/react";

const STEPS = [
  {
    num: 1,
    active: true,
    title: "Join the Campus",
    desc: "Sign up with your @uvic.ca email and get instant access to your campus marketplace.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2C8.24 2 6 4.24 6 7c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1111 5a1.5 1.5 0 010 3.5z"
          fill="#17f3b5"
        />
      </svg>
    ),
  },
  {
    num: 2,
    active: false,
    title: "Browse or list",
    desc: "Find what you need from students nearby, or post your own listing in under a minute.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="10" cy="10" r="7" stroke="#17f3b5" strokeWidth="1.4" />
        <path
          d="M15.5 15.5L19 19"
          stroke="#17f3b5"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    num: 3,
    active: false,
    title: "Message & agree",
    desc: "Chat with the other student directly in the app to agree on price and meetup spot.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M16 10a5 5 0 01-5 5H5l-3 3V7a5 5 0 015-5h5a5 5 0 015 5z"
          stroke="#17f3b5"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    num: 4,
    active: false,
    title: "Meet on campus",
    desc: "Exchange safely at a shared campus location. Leave a review and build your reputation.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M5 11l5 5L19 7"
          stroke="#17f3b5"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Works() {
 
  return (
    <section id="how-it-works" className="bg-text py-24 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-16">
          <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2
            className="text-[38px] font-extrabold text-[#ecfef8] leading-[1.1] tracking-[-1px]"
            style={{ fontFamily: "Syne, serif" }}
          >
            Four steps to your next deal
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-[#0a3d2c] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6 relative z-10">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                {...fadeUp(0.1 + i * 0.1)}
                className="flex flex-col items-center text-center md:items-center"
              >
                {/* Step number circle */}
                <div
                  className={`w-14 h-14 rounded-full border-2 flex items-center justify-center mb-5 text-[18px] font-extrabold shrink-0 ${
                    step.active
                      ? "bg-primary border-primary text-text"
                      : "bg-text border-[#0a3d2c] text-primary"
                  }`}
                  style={{ fontFamily: "Syne, serif" }}
                >
                  {step.num}
                </div>

                {/* Icon box */}
                <div className="w-12 h-12 rounded-[14px] bg-[#0a3d2c] flex items-center justify-center mb-4">
                  {step.icon}
                </div>

                <p
                  className="text-[15px] font-bold text-[#ecfef8] mb-2"
                  style={{ fontFamily: "Syne, serif" }}
                >
                  {step.title}
                </p>
                <p className="text-[12px] text-[#6b9e8a] leading-relaxed max-w-45">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#0a3d2c] my-16" />

        {/* CTA */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-col items-center gap-5"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
           
            className="bg-primary text-text font-bold text-[15px] px-8 py-4 rounded-[14px] cursor-pointer"
          >
            Start buying & selling →
          </motion.button>

          {/* Social proof */}

          {/* Trust pills */}
          <div className="flex flex-wrap gap-4 justify-center mt-2">
            {["Free forever", "No hidden fees", "Verified students only"].map(
              (item) => (
                <div key={item} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  <span className="text-[12px] text-[#6b9e8a]">{item}</span>
                </div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

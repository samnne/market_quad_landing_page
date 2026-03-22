
import { fadeUp } from "@/utils/constants";
import { motion } from "motion/react";


const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2a9 9 0 100 18A9 9 0 0011 2z"
          stroke="#0a6644"
          strokeWidth="1.4"
        />
        <path
          d="M7 11l3 3 5-5"
          stroke="#0a6644"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg: "bg-[#d6fdf1]",
    title: "Verified students only",
    desc: "Sign in with your university email. Every buyer and seller is a real student at your campus.",
    tag: "Trusted community",
    tagColor: "bg-[#d6fdf1] text-[#0a6644]",
    dark: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M3 7h16M3 11h10M3 15h7"
          stroke="#17f3b5"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    ),
    iconBg: "bg-[#0a3d2c]",
    title: "List in 30 seconds",
    desc: "Snap a photo, set a price, and you're live. No lengthy forms or approval wait times.",
    tag: "Instant listing",
    tagColor: "bg-[#0a3d2c] text-primary",
    dark: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M17 10a5 5 0 01-5 5H5l-3 3V7a5 5 0 015-5h5"
          stroke="#7c3aed"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <circle cx="17" cy="5" r="3" fill="#f544bd" />
      </svg>
    ),
    iconBg: "bg-[#f3e8ff]",
    title: "In-app messaging",
    desc: "Chat with buyers and sellers directly in the app. Real-time, no number sharing required.",
    tag: "Real-time chat",
    tagColor: "bg-[#f3e8ff] text-[#7c3aed]",
    dark: false,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2l2.5 7H21l-6 4.5 2.5 7L11 17l-6.5 3.5L7 13 1 8.5h7.5L11 2z"
          stroke="#be185d"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
      </svg>
    ),
    iconBg: "bg-[#fff0f6]",
    title: "Seller ratings",
    desc: "Leave and receive reviews after every transaction. Build a reputation you carry to every listing.",
    tag: "Community trust",
    tagColor: "bg-[#fff0f6] text-[#be185d]",
    dark: false,
    wide: true,
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 2C8.24 2 6 4.24 6 7c0 4 5 11 5 11s5-7 5-11c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1111 5a1.5 1.5 0 010 3.5z"
          fill="#17f3b5"
        />
      </svg>
    ),
    iconBg: "bg-[#d6fdf1]",
    title: "Campus meetups",
    desc: "Set a preferred location on campus. Exact address only shared once the deal is confirmed.",
    tag: "Safe exchanges",
    tagColor: "bg-[#d6fdf1] text-[#0a6644]",
    dark: false,
  },
];

const CHAT_MESSAGES = [
  { text: "Hey is this still available?", mine: false },
  { text: "Yeah! Want to meet tomorrow?", mine: true },
  { text: "Works for me — library entrance?", mine: false },
  { text: "Perfect, see you at 2pm!", mine: true },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-[#ecfef8] py-24 px-6 md:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-14">
          <p className="text-[11px] font-bold text-primary uppercase tracking-widest mb-3">
            Why MarketQuad
          </p>
          <h2
            className="text-[38px] font-extrabold text-text leading-[1.1] tracking-[-1px] mb-4"
            style={{ fontFamily: "Syne, serif" }}
          >
            Built for campus life
          </h2>
          <p className="text-[15px] text-[#6b9e8a] max-w-115 mx-auto leading-relaxed">
            Everything you need to buy, sell, and connect with students at your
            university — no strangers, no sketchy meetups.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Row 1: 3 equal cards */}
          {FEATURES.slice(0, 3).map((feat, i) => (
            <motion.div
              key={feat.title}
              {...fadeUp(0.1 + i * 0.07)}
              className={`rounded-[20px] border p-6 flex flex-col gap-4 ${
                feat.dark
                  ? "bg-text border-[#0a3d2c]"
                  : "bg-white border-[#e0faf2]"
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${feat.iconBg} flex items-center justify-center`}
              >
                {feat.icon}
              </div>
              <div>
                <p
                  className={`text-2xl font-bold mb-1.5 ${feat.dark ? "text-[#ecfef8]" : "text-text"}`}
                  style={{ fontFamily: "Syne, serif" }}
                >
                  {feat.title}
                </p>
                <p
                  className={`text-[13px] leading-relaxed ${feat.dark ? "text-[#aad4c5]" : "text-[#6b9e8a]"}`}
                >
                  {feat.desc}
                </p>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-md w-fit ${feat.tagColor}`}
              >
                {feat.tag}
              </span>
            </motion.div>
          ))}

          {/* Row 2: wide card (2 cols) + narrow card (1 col) */}
          <motion.div
            {...fadeUp(0.3)}
            className="md:col-span-2 bg-white border border-[#e0faf2] rounded-[20px] p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
          >
            <div className="flex flex-col gap-4">
              <div className="w-11 h-11 rounded-xl bg-[#fff0f6] flex items-center justify-center">
                {FEATURES[3]?.icon}
              </div>
              <div>
                <p
                  className="text-2xl font-bold text-text mb-1.5"
                  style={{ fontFamily: "Syne, serif" }}
                >
                  {FEATURES[3]?.title}
                </p>
                <p className="text-[13px] text-[#6b9e8a] leading-relaxed">
                  {FEATURES[3]?.desc}
                </p>
              </div>
              <span
                className={`text-[10px] font-bold px-2.5 py-1 rounded-md w-fit ${FEATURES[3]?.tagColor}`}
              >
                {FEATURES[3]?.tag}
              </span>
            </div>

            {/* Chat preview */}
            <div className="bg-[#f7fdfb] border border-[#e0faf2] rounded-2xl p-4 flex flex-col gap-2.5">
              {CHAT_MESSAGES.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.mine ? 10 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.3 }}
                  className={`flex ${msg.mine ? "justify-end" : "justify-start"}`}
                >
                  <span
                    className={`text-[11px] px-3 py-1.5 rounded-xl max-w-[80%] leading-snug ${
                      msg.mine
                        ? "bg-text text-primary rounded-br-sm"
                        : "bg-white border border-[#e0faf2] text-text rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            {...fadeUp(0.35)}
            className="bg-white border border-[#e0faf2] rounded-[20px] p-6 flex flex-col gap-4"
          >
            <div className="w-11 h-11 rounded-xl bg-[#d6fdf1] flex items-center justify-center">
              {FEATURES[4]?.icon}
            </div>
            <div>
              <p
                className="text-2xl font-bold text-text mb-1.5"
                style={{ fontFamily: "Syne, serif" }}
              >
                {FEATURES[4]?.title}
              </p>
              <p className="text-[13px] text-[#6b9e8a] leading-relaxed">
                {FEATURES[4]?.desc}
              </p>
            </div>
            <span
              className={`text-[10px] font-bold px-2.5 py-1 rounded-md w-fit ${FEATURES[4]?.tagColor}`}
            >
              {FEATURES[4]?.tag}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

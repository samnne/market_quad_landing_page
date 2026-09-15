import { motion } from "motion/react";
import { fadeUp } from "@/utils/constants";
import { useDashboard } from "@/zustand";
import DownloadToday from "@/components/DownloadToday";

const rules = [
  {
    step: "01",
    title: "Create a listing",
    desc: "Post at least one item for sale on MarketQuad. Each listing must include a photo, and a title (LISTING CAN BE FREE).",
  },
  {
    step: "02",
    title: "Make a sale",
    desc: "Complete a real transaction with another student through the app. Both parties must confirm the sale.",
  },
  {
    step: "03",
    title: "Send proof",
    desc: "DM @MarketQuad on Instagram or email contact@market-quad.com with a screenshot of your completed in-app transaction.",
  },
  {
    step: "04",
    title: "Win $10 One Card",
    desc: "The first 3 buyers and sellers to complete steps 1 to 3 each win $10 loaded directly to their UVic One Card.",
  },
];

export default function GiveawayRules() {
  const { downloadModal, setDownloadModal } = useDashboard();
  return (
    <section className="bg-background min-h-screen flex flex-col items-center justify-center px-8 py-24">
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <motion.div {...fadeUp(0.05)} className="mb-14">
          <span   className="inline-block bg-primary text-text text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
            Launch Giveaway
          </span>
          <h2 className="text-[48px] font-extrabold text-text leading-[1.05] tracking-[-2px] mb-4">
            Win a <span className="text-primary">$10 One Card</span> Gift Card.<br />
            Be one of the first.
          </h2>
          <p className="text-[15px] text-text/70 font-semibold leading-relaxed max-w-lg">
            To celebrate the launch of MarketQuad, we are giving $10 UVic One
            Card funds to the first 3 buyers and sellers who list and sell on the app.
            First come, first served.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.step}
              {...fadeUp(0.1 + i * 0.07)}
              className="bg-text/5 rounded-2xl p-6 flex flex-col gap-4 border border-text/8"
            >
              <span className="text-primary font-black text-3xl leading-none">
                {rule.step}
              </span>
              <div>
                <h3 className="text-text font-bold text-[16px] mb-1">
                  {rule.title}
                </h3>
                <p className="text-text/60 text-[13.5px] leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Prize callout */}
        <motion.div
          {...fadeUp(0.4)}
          className="bg-primary rounded-2xl px-8 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <div>
            <p className="text-text font-black text-[22px] leading-snug tracking-tight">
              2 winners. $10 One Card each.
            </p>
            <p className="text-text/60 text-[13px] mt-1 font-medium">
              Only UVic students are eligible. Giveaway runs until both prizes
              are claimed.
            </p>
          </div>
          <a
            onClick={() => setDownloadModal(true)}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-text text-primary font-bold text-[15px] px-7 py-4 rounded-full hover:opacity-90 transition-opacity cursor-pointer"
          >
            Get started free
          </a>
        </motion.div>

        {/* Fine print */}
        <motion.p
          {...fadeUp(0.5)}
          className="text-text/40 text-[12px] mt-8 leading-relaxed max-w-2xl"
        >
          Listings must be genuine items for sale, not duplicates or placeholder
          posts. Proof of sale must be submitted via DM or email within 48 hours
          of the transaction. MarketQuad reserves the right to disqualify
          entries that do not meet listing quality standards. One Card funds
          will be delivered within 5 business days of verification.
        </motion.p>
      </div>
      <DownloadToday onClose={()=> setDownloadModal(false)} open={downloadModal} />
    </section>
  );
}

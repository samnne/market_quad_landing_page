import { fadeUp } from "@/utils/constants";
import { motion } from "motion/react";
import { Link } from "react-router";



const FOOTER_LINKS = [
  {
    title: "MarketQuad",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/tos" },
      { label: "Safety Guidelines", href: "/safety-guidelines" },
    ],
  },
];

const SOCIAL_LINKS = [
  {
    label: "X",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M1 1l5 5.5L1 13h1.5l4-4.5 3 4.5H13L7.5 6.5 12 1h-1.5L6.5 5 4 1H1z"
          fill="#6b9e8a"
        />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect
          x="1"
          y="1"
          width="12"
          height="12"
          rx="3.5"
          stroke="#6b9e8a"
          strokeWidth="1.2"
        />
        <circle cx="7" cy="7" r="2.5" stroke="#6b9e8a" strokeWidth="1.2" />
        <circle cx="10.5" cy="3.5" r="0.75" fill="#6b9e8a" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M9 1c.2 1.5 1 2.5 2.5 2.5v2c-1 0-2-.4-2.5-1v4a3 3 0 11-3-3v2a1 1 0 100 2 1 1 0 001-1V1h2z"
          fill="#6b9e8a"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#000f09] px-6 md:px-8 pt-14 pb-8">
      <div className="max-w-5xl mx-auto">
        {/* Top grid */}
        <motion.div
          {...fadeUp(0)}
          className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#0a3d2c]"
        >
          {/* Brand col */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <span
              className="text-[20px] font-extrabold text-primary tracking-tight"
              style={{ fontFamily: "Syne, serif" }}
            >
              MarketQuad
            </span>
            <p className="text-[13px] text-[#6b9e8a] leading-relaxed max-w-55">
              The student marketplace built for campus life. Buy, sell, and
              connect with students at your university.
            </p>

            {/* Social icons */}
            <div className="flex gap-2 mt-1">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg bg-[#0a3d2c] border border-[#17f3b510] flex items-center justify-center hover:border-[#17f3b540] transition-colors"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {FOOTER_LINKS.map((col, i) => (
            <motion.div
              key={col.title}
              {...fadeUp(0.08 + i * 0.06)}
              className="flex flex-col gap-4"
            >
              <p className="text-[11px] font-bold text-[#ecfef8] uppercase tracking-widest">
                {col.title}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map(({label,href}: {label: string, href: string}) => (
                  <li key={label}>
                    <Link
                      to={href}
                      className="text-[13px] text-[#6b9e8a] hover:text-[#ecfef8] transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom row */}
        <motion.div
          {...fadeUp(0.2)}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-7"
        >
          <p className="text-[12px] text-[#6b9e8a]">
            © {new Date().getFullYear()} MarketQuad. All rights reserved.
          </p>

          <div className="flex items-center gap-3">
            {/* Live badge */}
            

            {/* App store pill */}
            <div className="flex items-center gap-1.5 bg-[#0a3d2c] border border-[#17f3b520] rounded-lg px-3 py-1.5">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M9 6.5L4 10V3l5 3.5z" fill="#17f3b5" />
              </svg>
              <span className="text-[11px] font-bold text-primary">
                Join the Waitlist
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

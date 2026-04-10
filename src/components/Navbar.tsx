import { NAV_LINKS } from "@/utils/constants";
import { useWaitlistOpen } from "@/zustand";
import { motion } from "motion/react";
import { Link } from "react-router";

const Navbar = () => {
  const { setWaitlistOpen } = useWaitlistOpen();

  return (
    <motion.nav className="flex bg-text items-center justify-between px-8 py-5 border-b border-[#0a3d2c]">
      <Link
      to={'/'}
        className="font-extrabold text-[20px] text-primary tracking-tight"
        style={{ fontFamily: "Syne, serif" }}
      >
        MarketQuad
      </Link>
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <a
            key={link.link}
            href={`#${link.link}`}
            className="text-[13px] text-[#6b9e8a] hover:text-[#ecfef8] transition-colors"
          >
            {link.text}
          </a>
        ))}
      </div>
      <button
        onClick={()=> setWaitlistOpen(true)}
        className="bg-primary text-text text-[13px] font-bold px-4 py-2 rounded-[10px] cursor-pointer"
      >
      Join The Waitlist
      </button>
    </motion.nav>
  );
};

export default Navbar;

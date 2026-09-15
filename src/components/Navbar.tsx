import { NAV_LINKS } from "@/utils/constants";
import { useDashboard, useWaitlistOpen } from "@/zustand";
import { motion } from "motion/react";
import { Link } from "react-router";
import logoPNG from "@/LOGO.PNG"
const Navbar = () => {
  const { setDownloadModal } = useDashboard();

  return (
    <motion.nav className="flex bg-background items-center justify-between px-8 py-5 ">
      <Link
      
      to={'/'}
        className="font-extrabold text-[20px] text-primary tracking-tight"
       
      >
        <img src={logoPNG} className="w-12" alt="mq-logo"/>
      </Link>
      <div className="hidden md:flex items-center gap-6">
        {NAV_LINKS.map((link) => (
          <a
            key={link.link}
            href={`#${link.link}`}
            className="text-xl  text-text  hover:text-primary font-bold transition-colors"
          >
            {link.text}
          </a>
        ))}
      </div>
      <button
        onClick={()=> setDownloadModal(true)}
        className="bg-primary text-text text-base font-bold px-6 py-3 rounded-full cursor-pointer"
      >
      Download for Free today!
      </button>
    </motion.nav>
  );
};

export default Navbar;

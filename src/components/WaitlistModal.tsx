import { useWaitlistOpen } from "@/zustand";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const INTENTS = ["Buy & sell", "Mostly buying", "Mostly selling"];
declare const FORMSPARK_ACTION_URL: string;
const AVATAR_COLORS = [
  "bg-primary",
  "bg-[#d282f9]",
  "bg-[#f544bd]",
  "bg-[#ecfef8]",
  "bg-[#0a3d2c]",
];

const Toast = ({ onDone }: { onDone: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => setTimeout(onDone, 3500)}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3 bg-text border border-[#17f3b540] rounded-2xl px-5 py-3.5"
    >
      <div className="w-8 h-8 rounded-[10px] bg-[#0a3d2c] flex items-center justify-center shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7l4 4 6-7"
            stroke="#17f3b5"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <p className="text-[13px] font-bold text-[#ecfef8]">
          You're on the list!
        </p>
        <p className="text-[11px] text-[#6b9e8a]">
          We'll email you when UVic goes live.
        </p>
      </div>
      <button
        onClick={onDone}
        className="ml-3 text-[#6b9e8a] hover:text-[#ecfef8] transition-colors cursor-pointer"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M1 1l10 10M11 1L1 11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>
    </motion.div>
  );
};

export default function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [form, setForm] = useState({ name: "", email: "", intent: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showToast, setShowToast] = useState(false);
  const {setWaitlistCount, waitlistCount} = useWaitlistOpen()
  useEffect(() => {
    fetch("/api/supabase")
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.count));
  }, []);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (
      !form.email.includes("@") ||
      (!form.email.endsWith(".ca") && !form.email.endsWith(".edu"))
    ) {
      errs.email = "Please use your UVic email (.ca or .edu)";
    }
    if (!form.intent) errs.intent = "Please pick one";
    return errs;
  }
  async function submitWaitlist(formData: {
    name: string;
    email: string;
    intent: string;
  }) {
    const response = await fetch("/api/formspark", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const res = await response.json();

    if (!res.success) {
      return;
    }
    return;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      setLoading(true);
      await submitWaitlist(form);
      await new Promise((r) => setTimeout(r, 900));
      setForm({ name: "", email: "", intent: "" });
      onClose();
      setShowToast(true);
    } catch (err) {
      console.error("Waitlist error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black/60"
            />

            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center px-5 pointer-events-none">
              <motion.div
                key="modal"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.97 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-105 bg-text border border-[#0a3d2c] rounded-d3xl p-8 pointer-events-auto relative"
              >
                {/* Close btn */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#0a3d2c] flex items-center justify-center cursor-pointer hover:bg-[#17f3b515] transition-colors"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M1 1l10 10M11 1L1 11"
                      stroke="#6b9e8a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Icon */}
                <div className="w-13 h-13 bg-[#0a3d2c] rounded-2xl flex items-center justify-center mb-5">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2l2.5 7H22l-6 4.5 2.5 7L12 17l-7.5 3.5L7 13.5 1 9h7.5L12 2z"
                      fill="#17f3b5"
                      opacity="0.2"
                    />
                    <path
                      d="M12 2l2.5 7H22l-6 4.5 2.5 7L12 17l-7.5 3.5L7 13.5 1 9h7.5L12 2z"
                      stroke="#17f3b5"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* Headline */}
                <h2
                  className="text-[26px] font-extrabold text-[#ecfef8] leading-[1.1] tracking-[-0.5px] mb-2"
                  style={{ fontFamily: "Syne, serif" }}
                >
                  Get <span className="text-primary">early access</span>
                  <br />
                  to MarketQuad
                </h2>
                <p className="text-[13px] text-[#6b9e8a] leading-relaxed mb-5">
                  Be the first to know when we launch for UVic. Join the
                  waitlist and skip the line.
                </p>

                {/* Social proof */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex">
                    {AVATAR_COLORS.map((color, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-full border-2 border-text ${color} ${i !== 0 ? "-ml-2" : ""}`}
                      />
                    ))}
                  </div>
                  <p className="text-[12px] text-[#6b9e8a]">
                    <span className="text-primary font-bold">{waitlistCount}</span> students
                    already waiting
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#ecfef8] uppercase tracking-widest">
                      Full name
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Jordan Lee"
                      className="w-full bg-[#0a3d2c] border border-[#17f3b520] focus:border-primary rounded-[12px] px-3.5 py-3 text-[14px] text-[#ecfef8] placeholder:text-[#6b9e8a] outline-none transition-colors"
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-[#ecfef8] uppercase tracking-widest">
                      UVic email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, email: e.target.value }))
                      }
                      placeholder="vsmith@uvic.ca"
                      className="w-full bg-[#0a3d2c] border border-[#17f3b520] focus:border-primary rounded-[12px] px-3.5 py-3 text-[14px] text-[#ecfef8] placeholder:text-[#6b9e8a] outline-none transition-colors"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-400">{errors.email}</p>
                    )}
                  </div>

                  {/* Intent chips */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[11px] font-bold text-[#ecfef8] uppercase tracking-widest">
                      I want to
                    </label>
                    <div className="flex gap-2 flex-wrap">
                      {INTENTS.map((intent) => (
                        <button
                          key={intent}
                          type="button"
                          onClick={() => setForm((p) => ({ ...p, intent }))}
                          className={`px-3.5 py-2 rounded-full text-[13px] font-medium border transition-all cursor-pointer ${
                            form.intent === intent
                              ? "bg-primary text-text border-primary"
                              : "bg-[#0a3d2c] text-[#6b9e8a] border-[#17f3b520] hover:border-[#17f3b540]"
                          }`}
                        >
                          {intent}
                        </button>
                      ))}
                    </div>
                    {errors.intent && (
                      <p className="text-[11px] text-red-400">
                        {errors.intent}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-text font-bold text-[15px] py-3.5 rounded-[14px] mt-1 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity cursor-pointer"
                    style={{ fontFamily: "Syne, serif" }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="animate-spin"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
                          <circle
                            cx="8"
                            cy="8"
                            r="6"
                            stroke="#011d16"
                            strokeWidth="2"
                            strokeDasharray="20"
                            strokeDashoffset="10"
                            strokeLinecap="round"
                          />
                        </svg>
                        Joining…
                      </span>
                    ) : (
                      "Join the waitlist →"
                    )}
                  </motion.button>

                  <p className="text-[11px] text-[#6b9e8a] text-center">
                    No spam, ever. We'll only email you when MarketQuad goes
                    live.
                  </p>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {showToast && <Toast key="toast" onDone={() => setShowToast(false)} />}
      </AnimatePresence>
    </>
  );
}

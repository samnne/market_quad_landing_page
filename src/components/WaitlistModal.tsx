import { useWaitlistOpen } from "@/zustand";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const INTENTS = ["Buy & sell", "Mostly buying", "Mostly selling"];
const AVATAR_COLORS = [
  "bg-primary",
  "bg-[#d282f9]",
  "bg-[#f544bd]",
  "bg-[#ecfef8]",
  "bg-[#0a3d2c]",
];

export default function WaitlistModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({ name: "", email: "", intent: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // NEW: Referral Tracking States
  const [incomingRefCode, setIncomingRefCode] = useState("");
  const [userReferralCode, setUserReferralCode] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);

  const { setWaitlistCount, waitlistCount } = useWaitlistOpen();

  useEffect(() => {
    // Fetch initial count
    fetch("/api/supabase")
      .then((res) => res.json())
      .then((data) => setWaitlistCount(data.count))
      .catch((err) => console.error("Count fetch error:", err));

    // NEW: Check URL for a referral code when modal opens
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) setIncomingRefCode(ref);
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
    referredBy: string;
  }) {
    // Note: Switched from formspark to a custom backend route (e.g., Supabase)
    // so you can generate and return a unique referral code.
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    const res = await response.json();
    if (!res.success) {
      throw new Error(res.message || "Failed to add to waitlist");
    }

    setUserReferralCode(res.referralCode);
  }
  async function checkSignedUp(formData: {
    email: string;
    name: string;
    intent: string;
  }) {
    const response = await fetch("/api/get_referral_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });
    
    const res = await response.json();
   
    if (!res.success) {
      return res;
    } 
    setUserReferralCode(res?.code);
    return res;
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
      const res = await checkSignedUp({ ...form });
      if (res.success) {
        await submitWaitlist({ ...form, referredBy: incomingRefCode });
      }
  

     
      setIsSuccess(true);
      setErrorMessage("");
    } catch (err) {
      console.error("Waitlist error:", err);
      setErrorMessage("Error adding to waitlist. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = () => {
    const link = `https://market-quad.com/?ref=${userReferralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Reset state when modal closes so it's fresh if they open it again
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSuccess(false);
      setForm({ name: "", email: "", intent: "" });
    }, 300);
  };

  return (
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
            onClick={handleClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-5 pointer-events-none">
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-105 bg-text border border-[#0a3d2c] rounded-3xl p-8 pointer-events-auto relative overflow-hidden"
            >
              {/* Close btn */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-[#0a3d2c] flex items-center justify-center cursor-pointer hover:bg-[#17f3b515] transition-colors z-10"
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

              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="form-view"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Icon */}
                    <div className="w-13 h-13 bg-[#0a3d2c] rounded-2xl flex items-center justify-center mb-5">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
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

                    {/* NEW: Updated Headline for Giveaway */}
                    <h2
                      className="text-[26px] font-extrabold text-[#ecfef8] leading-[1.1] tracking-[-0.5px] mb-2"
                      style={{ fontFamily: "Syne, serif" }}
                    >
                      Join & Win one of three{" "}
                      <span className="text-primary">
                        $15 Starbucks gift cards!
                      </span>
                    </h2>
                    <p className="text-[13px] text-[#6b9e8a] leading-relaxed mb-5">
                      The exclusive student marketplace for UVic. Join the
                      waitlist for early access and an entry to win a BiblioCafé
                      gift card.
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
                      <p className="text-xl text-[#6b9e8a]">
                        <span className="text-primary font-bold">
                          {waitlistCount}
                        </span>{" "}
                        students waiting
                      </p>
                    </div>

                    {errorMessage && (
                      <div className="border border-red-500 px-2 py-1 text-red-500 rounded-xl font-bold text-xs my-2 bg-red-200/10 mx-auto w-fit">
                        {errorMessage}
                      </div>
                    )}

                    {/* Form */}
                    <form
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-4"
                    >
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
                          autoComplete="name"
                          className="w-full bg-[#0a3d2c] border border-[#17f3b520] focus:border-primary rounded-xl px-3.5 py-3 text-[14px] text-[#ecfef8] placeholder:text-[#6b9e8a] outline-none transition-colors"
                        />
                        {errors.name && (
                          <p className="text-[11px] text-red-400">
                            {errors.name}
                          </p>
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
                          autoComplete="email"
                          onChange={(e) =>
                            setForm((p) => ({ ...p, email: e.target.value }))
                          }
                          placeholder="jordan@uvic.ca"
                          className="w-full bg-[#0a3d2c] border border-[#17f3b520] focus:border-primary rounded-xl px-3.5 py-3 text-[14px] text-[#ecfef8] placeholder:text-[#6b9e8a] outline-none transition-colors"
                        />
                        {errors.email && (
                          <p className="text-[11px] text-red-400">
                            {errors.email}
                          </p>
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
                        {loading ? "Joining..." : "Join & Enter Draw →"}
                      </motion.button>
                    </form>
                  </motion.div>
                ) : (
                  // NEW: Success View for Referrals
                  <motion.div
                    key="success-view"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <div className="w-16 h-16 bg-[#0a3d2c] rounded-full flex items-center justify-center mb-6">
                      <span className="text-3xl">🎉</span>
                    </div>

                    <h2
                      className="text-[24px] font-extrabold text-[#ecfef8] mb-2"
                      style={{ fontFamily: "Syne, serif" }}
                    >
                      You're on the list!
                    </h2>
                    <p className="text-[14px] text-[#6b9e8a] mb-6">
                      You have{" "}
                      <span className="text-primary font-bold">1 entry</span>{" "}
                      for one of three $15 Starbucks gift card.
                    </p>

                    <div className="w-full bg-[#0a3d2c] border border-[#17f3b540] rounded-2xl p-5 mb-6">
                      <p className="text-[13px] font-bold text-[#ecfef8] mb-1">
                        Want more entries?
                      </p>
                      <p className="text-xl text-[#6b9e8a] mb-4">
                        Get 3 extra entries for every UVic student who joins
                        using your link.
                      </p>

                      <div className="flex items-center gap-2 bg-text border border-[#17f3b520] rounded-[10px] p-1.5">
                        <input
                          type="text"
                          readOnly
                          value={`market-quad.com/?ref=${userReferralCode}`}
                          className="bg-transparent text-xl text-[#ecfef8] px-2 w-full outline-none"
                        />
                        <button
                          onClick={handleCopy}
                          className="bg-primary text-text text-xl font-bold px-4 py-2 rounded-[8px] hover:opacity-90 transition-opacity whitespace-nowrap"
                        >
                          {copied ? "Copied!" : "Copy"}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleClose}
                      className="text-[13px] font-bold text-[#6b9e8a] hover:text-primary transition-colors"
                    >
                      Close for now
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

import { useState, type ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import { Link } from "react-router";
import { FaArrowDown } from "react-icons/fa";
import { motion } from "motion/react";
import { getClientId } from "@/utils/utils";

const REASONS = ["General", "Error", "Report", "Feature Request", "Other"];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    first: "",
    last: "",
    email: "",
    description: "",
  });
  const [show, setShow] = useState(false);
  const [selection, setSelection] = useState("Please Select A Reason");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit() {
    const { first, last, email, description } = formData;

    if (!first || !last || !email || !description) {
      setError("Please fill in all fields.");
      return;
    }
    if (selection.includes("Please")) {
      setError("Please select a reason.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-client-id": getClientId(),
        },
        body: JSON.stringify({
          first,
          last,
          email,
          description,
          reason: selection,
        }),
      }).then((res) => res.json());

      if (response.success) {
        setSubmitted(true);
        setFormData({ first: "", last: "", email: "", description: "" });
        setSelection("Please Select A Reason");
      } else {
        setError(response.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="grid grid-cols-2 max-sm:grid-cols-1 justify-center items-center w-full h-full flex-1 px-5 md:px-25">
        <motion.section
          className="flex-1 flex-col gap-2 w-full pt-12.5 md:pt-25 h-full flex items-center "
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl w-full font-bold text-primary"
          >
            Contact Us
          </motion.h1>
          <motion.p variants={itemVariants} className="text-mint/75">
            Feel free to reach out to us with feature requests, errors, reports,
            and anything you feel we need to hear.
          </motion.p>
        </motion.section>

        <motion.section className="flex-1 flex w-full justify-center items-center h-full">
          <motion.div
            variants={containerVariants}
            animate="visible"
            initial="hidden"
            className="h-fit w-100 md:w-120 rounded-4xl flex px-6 py-4 flex-col items-center border-primary border"
          >
            <motion.h1
              variants={itemVariants}
              className="text-primary mt-5 font-bold text-4xl"
            >
              Reach Out!
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-mint/75 text-center w-100"
            >
              You can reach us at anytime!
            </motion.p>

            {/* ── First / Last ── */}
            <motion.div
              variants={containerVariants}
              className="flex w-full justify-center gap-4 mt-6"
            >
              <motion.input
                variants={itemVariants}
                type="text"
                name="first"
                value={formData.first}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full bg-[#0a3d2c] border border-[#17f3b520] focus:border-primary rounded-xl px-3.5 py-3 text-[14px] text-[#ecfef8] placeholder:text-[#6b9e8a] outline-none transition-colors"
              />
              <motion.input
                variants={itemVariants}
                type="text"
                name="last"
                value={formData.last}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full bg-[#0a3d2c] border border-[#17f3b520] focus:border-primary rounded-xl px-3.5 py-3 text-[14px] text-[#ecfef8] placeholder:text-[#6b9e8a] outline-none transition-colors"
              />
            </motion.div>

            {/* ── Email ── */}
            <motion.div
              variants={itemVariants}
              className="flex w-full justify-center gap-4 mt-6"
            >
              <motion.input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email. (Preferably @uvic.ca)"
                className="w-full bg-[#0a3d2c] border border-[#17f3b520] focus:border-primary rounded-xl px-3.5 py-3 text-[14px] text-[#ecfef8] placeholder:text-[#6b9e8a] outline-none transition-colors"
              />
            </motion.div>

            {/* ── Reason dropdown ── */}
            <motion.div
              variants={itemVariants}
              className="flex relative w-full justify-center gap-4 mt-6"
            >
              <div
                onClick={() => setShow((prev) => !prev)}
                className={`w-full py-2 appearance-none bg-[#0a3d2c] border border-[#17f3b520] focus:border-primary rounded-xl px-3.5 text-[14px] cursor-pointer ${
                  selection.includes("Please")
                    ? "text-[#ecfef8]/50"
                    : "text-primary"
                } outline-none transition-colors`}
              >
                {selection}
              </div>
              <motion.ul
                initial={{ opacity: 0, scale: 0.75, y: 0 }}
                animate={
                  show
                    ? { opacity: 1, scale: 1, y: 40, zIndex: 10 }
                    : { opacity: 0, scale: 0.75, y: 0, zIndex: -10 }
                }
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
               
              
                className="absolute bg-text rounded-2xl w-full border origin-top-left border-primary p-px h-fit"
              >
                {REASONS.map((reason, i) => (
                  <motion.li
                  whileTap={{
                    backgroundColor: "#17f3b5"
                  }}
                  transition={{
                    duration: 0.05
                  }}
                    key={reason}
                    onClick={() => {
                      setSelection(reason);
                      setShow(false);
                    }}
                    className={`text-primary  font-bold cursor-pointer transition-all hover:text-text active:bg-primary focus:bg-primary  hover:bg-primary p-2 ${
                      i === 0
                        ? "rounded-t-2xl"
                        : i === REASONS.length - 1
                          ? "rounded-b-2xl"
                          : ""
                    }`}
                  >
                    {reason}
                  </motion.li>
                ))}
              </motion.ul>
              <div className="absolute top-1/2 -translate-y-1/2 text-mint/50 right-5 pointer-events-none">
                <FaArrowDown />
              </div>
            </motion.div>

            {/* ── Description ── */}
            <div className="flex w-full justify-center gap-4 mt-6">
              <motion.textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                variants={itemVariants}
                placeholder="Tell us how we can attend to this reason."
                className="w-full bg-[#0a3d2c] border border-[#17f3b520] focus:border-primary rounded-xl px-3.5 py-3 h-30 text-[14px] text-[#ecfef8] placeholder:text-[#6b9e8a] outline-none transition-colors"
              />
            </div>

            {/* ── Error / success feedback ── */}
            {error && (
              <p className="text-red-400 text-xs text-center mt-3 px-4">
                {error}
              </p>
            )}
            {submitted && (
              <p className="text-primary text-xs font-semibold text-center mt-3 px-4">
                ✓ Message sent — we'll be in touch soon!
              </p>
            )}

            {/* ── Submit ── */}
            <div className="flex w-full justify-center gap-4 mt-4">
              <motion.button
                onClick={handleSubmit}
                disabled={loading}
                whileTap={{ scale: 0.9 }}
                variants={itemVariants}
                className="cursor-pointer bg-primary px-20 font-bold text-text py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending…" : "Submit"}
              </motion.button>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex w-full justify-center gap-4 mt-6"
            >
              <p className="font-bold text-center px-12 text-mint">
                by contacting us you agree to our <br />
                <Link to="/tos" className="text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary">
                  Privacy Policy.
                </Link>
              </p>
            </motion.div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
};

export default Contact;

export const navLinks = ["How it Works", "Browse", "For Sellers"];

export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, delay },
});

export const PHONE_CHIPS = ["All", "Books", "Tech", "Housing", "Notes"];

export const PHONE_CARDS = [
  { emoji: "📱", bg: "bg-[#f0fdf8]", name: "iPhone 13", price: "$380" },
  { emoji: "📚", bg: "bg-[#fdf4ff]", name: "Calc Bundle", price: "$45" },
  { emoji: "🎧", bg: "bg-[#fff3f7]", name: "Sony WH", price: "$160" },
  { emoji: "🚲", bg: "bg-[#f0f8ff]", name: "Trek Bike", price: "$220" },
];
export const FOOTER_LINKS = [
  {
    title: "MarketQuad",
    links: [
      // { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/tos" },
      { label: "Safety Guidelines", href: "/safety-guidelines" },
      { label: "EULA", href: "/eula" },
    ],
  },
];
export const STATS = [
  { num: "12k+", label: "Active students" },
  { num: "$2.1M", label: "Saved by students" },
  { num: "48h", label: "Avg. listing sold" },
];
export const NAV_LINKS = [
  { text: "Why MarketQuad", link: "features" },
  // { text: "How it works", link: 'how-it-works' },
  // { text: "Save Today", link: 'ready-to-save' },
];

export const CHAT_MESSAGES = [
  { text: "Hey is this still available?", mine: false },
  { text: "Yeah! Want to meet tomorrow?", mine: true },
  { text: "Works for me — library entrance?", mine: false },
  { text: "Perfect, see you at 2pm!", mine: true },
];

/**
 * This file is the entry point for the React app, it sets up the root
 * element and renders the App component to the DOM.
 *
 * It is included in `src/index.html`.
 */

import { createRoot } from "react-dom/client";
import { App } from "./App";
import { createBrowserRouter, RouterProvider } from "react-router";
import { PrivacyPolicy } from "./sections/PrivacyPolicy";
import { TermsOfService } from "./sections/TOS";
import SafetyGuidelines from "./sections/SafetyGuidelines";
import Licenses from "./sections/Licenses";
import Contact from "./sections/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/privacy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/tos",
    element: <TermsOfService />,
  },
  {
    path: "/safety-guidelines",
    element: <SafetyGuidelines />,
  },
  { path: "/licenses", element: <Licenses /> },
  { path: "/contact", element: <Contact /> },
]);
function start() {
  const root = createRoot(document.getElementById("root")!);
  root.render(<RouterProvider router={router} />);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start);
} else {
  start();
}

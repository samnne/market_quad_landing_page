import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import { motion } from "motion/react";
import { Link } from "react-router";

export default function SafetyGuidelines() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-40 py-10 px-4">
        <div className="relative max-w-3xl mx-auto rounded-2xl p-6 ">
       

          <h1 className="text-3xl font-bold mb-2 text-text">
            Safety Guidelines for{" "}
            <span className="text-primary">
              Market<span className="text-secondary">Quad</span>
            </span>
          </h1>

          <p className="mb-6 text-black">
            <span className="font-bold">Last Updated:</span> Apr 9, 2026
          </p>

          <Section title="1. Respectful Communication">
            <ul className="list-disc ml-6">
              <li>Treat all users with respect</li>
              <li>No harassment, hate speech, or abusive language</li>
              <li>No inappropriate or unwanted messages</li>
            </ul>
          </Section>

          <Section title="2. Appropriate Content">
            <p>Users may not upload or share:</p>
            <ul className="list-disc ml-6">
              <li>Explicit, sexual, or vulgar images</li>
              <li>Violent or disturbing content</li>
              <li>Hateful or discriminatory material</li>
              <li>Spam or misleading listings</li>
            </ul>
            <p className="mt-2">
              All listings must accurately represent the item being sold.
            </p>
          </Section>

          <Section title="3. No Scams or Fraud">
            <ul className="list-disc ml-6">
              <li>No fake or misleading listings</li>
              <li>No impersonation of other users</li>
              <li>No attempts to deceive for financial gain</li>
            </ul>
            <p className="mt-2">
              If something seems too good to be true, it probably is.
            </p>
          </Section>

          <Section title="4. Safe Transactions">
            <p>MarketQuad does not handle payments. All transactions are peer-to-peer.</p>
            <ul className="list-disc ml-6">
              <li>Meet in public places (campus, cafes, etc.)</li>
              <li>Avoid sharing sensitive personal information</li>
              <li>Bring a friend if possible</li>
              <li>Trust your instincts</li>
            </ul>
          </Section>

          <Section title="5. Protect Your Privacy">
            <ul className="list-disc ml-6">
              <li>Do not share your home address publicly</li>
              <li>Avoid posting personal contact details in listings</li>
              <li>Use in-app messaging when possible</li>
            </ul>
          </Section>

          <Section title="6. Reporting and Blocking">
            <p>If you encounter:</p>
            <ul className="list-disc ml-6">
              <li>Suspicious behavior</li>
              <li>Inappropriate content</li>
              <li>Harassment or scams</li>
            </ul>
            <p className="mt-2">
              Report the user or listing immediately. We may remove content or accounts that violate these guidelines.
            </p>
          </Section>

          <Section title="7. Enforcement">
            <p>Violations WILL result in:</p>
            <ul className="list-disc ml-6">
              <li>Content removal</li>
              <li>Account suspension</li>
              <li>Permanent bans</li>
            </ul>
          </Section>

          <Section title="8. Disclaimer">
            <p>
              MarketQuad is a platform for connecting users and is not responsible
              for interactions, transactions, or user behavior.
            </p>
            <p className="mt-2">
              Users are responsible for their own safety when using the platform.
            </p>
          </Section>

          <Section title="9. Contact">
            <p className="text-accent">contact@market-quad.com</p>
          </Section>
        </div>
      </div>
    </>
  );
};
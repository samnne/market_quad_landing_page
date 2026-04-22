import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import { motion } from "motion/react";
import { Link } from "react-router";

export const TermsOfService = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-10 pt-40 px-4 bg-background">
        <div className=" relative max-w-3xl mx-auto  rounded-2xl p-6 ">
          <motion.div
            whileTap={{
              scale: 0.95,
            }}
            className=" text-xl font-bold right-0 underline text-secondary cursor-pointer"
          >
            <Link to={"/privacy"}>Privacy</Link>
          </motion.div>
          <h1 className="text-3xl font-bold mb-2 text-text">
            Terms of Service for{" "}
            <span className="text-primary">
              Market<span className="text-secondary">Quad</span>
            </span>
          </h1>
          <p className="mb-6 text-text">
            <span className="font-bold">Last Updated:</span> Apr 9, 2026
          </p>

          <Section title="1. Overview">
            <p>
              MarketQuad is a mobile marketplace platform designed for students,
              including those at the University of Victoria, to connect and
              arrange peer-to-peer buying and selling.
            </p>
            <p>
              MarketQuad is not affiliated with or endorsed by the University of
              Victoria.
            </p>
          </Section>

          <Section title="2. Platform Role">
            <ul className="list-disc ml-6">
              <li>We do not process payments</li>
              <li>We do not handle transactions</li>
              <li>We are not a broker, agent, or escrow service</li>
              <li>We do not guarantee item quality or legality</li>
            </ul>
            <p className="mt-2">
              All transactions occur independently between users.
            </p>
          </Section>

          <Section title="3. User Responsibility">
            <ul className="list-disc ml-6">
              <li>Your listings and communications</li>
              <li>Verifying buyers/sellers</li>
              <li>Completing transactions safely</li>
            </ul>
          </Section>

          <Section title="4. Transactions and Risk">
            <p>All transactions are conducted at your own risk.</p>
            <ul className="list-disc ml-6">
              <li>Fraud or scams</li>
              <li>Failed transactions</li>
              <li>Loss or damage</li>
            </ul>
          </Section>

          <Section title="5. Safety Guidelines">
            <ul className="list-disc ml-6">
              <li>Meet in public places</li>
              <li>Avoid sharing sensitive information</li>
              <li>Use caution with other users</li>
            </ul>
          </Section>

          <Section title="6. Prohibited Use">
            <ul className="list-disc ml-6">
              <li>Illegal items</li>
              <li>Fraudulent listings</li>
              <li>Harassment</li>
            </ul>
          </Section>

          <Section title="7. Account Termination">
            <p>
              We may suspend or terminate accounts for violations or suspicious
              activity.
            </p>
          </Section>

          <Section title="8. Limitation of Liability">
            <p>
              MarketQuad is not liable for damages arising from platform use.
            </p>
          </Section>

          <Section title="9. Changes">
            <p>We may update these terms at any time.</p>
          </Section>

          <Section title="10. Contact">
            <a href="mailto:contact@market-quad.com" className="text-accent">contact@market-quad.com</a>
          </Section>
        </div>
      </div>
    </>
  );
};

import Navbar from "@/components/Navbar";
import Section from "@/components/Section";

export default function EULA() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background pt-40 py-10 px-4">
        <div className="relative max-w-3xl mx-auto rounded-2xl p-6 ">

          <h1 className="text-3xl font-bold mb-2 text-text">
            End User License Agreement for{" "}
            <span className="text-primary">
              Market<span className="text-secondary">Quad</span>
            </span>
          </h1>

          <p className="mb-6 text-black">
            <span className="font-bold">Last Updated:</span> May 3, 2026
          </p>

          <Section title="1. Agreement to Terms">
            <p>
              By accessing or using MarketQuad, you agree to this End User License Agreement (“EULA”).
              If you do not agree, you may not use the platform.
            </p>
          </Section>

          <Section title="2. Eligibility">
            <ul className="list-disc ml-6">
              <li>MarketQuad is intended for students only</li>
              <li>You must provide accurate and truthful information</li>
              <li>We may verify student status at any time</li>
            </ul>
          </Section>

          <Section title="3. License Grant">
            <p>
              We grant you a limited, non-exclusive, revocable license to use the platform
              for personal, non-commercial purposes.
            </p>
            <ul className="list-disc ml-6">
              <li>No copying or reverse engineering</li>
              <li>No commercial resale operations</li>
              <li>No misuse of the platform</li>
            </ul>
          </Section>

          <Section title="4. Accounts">
            <ul className="list-disc ml-6">
              <li>You are responsible for your account and activity</li>
              <li>Do not share or sell your account</li>
              <li>No impersonation or fake accounts</li>
            </ul>
          </Section>

          <Section title="5. Marketplace Disclaimer">
            <p>
              MarketQuad is not a buyer or seller and does not participate in transactions.
            </p>
            <ul className="list-disc ml-6">
              <li>We do not verify listings</li>
              <li>We do not guarantee payments or delivery</li>
              <li>All transactions are at your own risk</li>
            </ul>
          </Section>

          <Section title="6. Content">
            <p>You retain ownership of your content but grant us the right to display it.</p>
            <ul className="list-disc ml-6">
              <li>No illegal or stolen items</li>
              <li>No misleading listings</li>
              <li>No harmful or abusive content</li>
            </ul>
          </Section>

          <Section title="7. Reporting and Blocking">
            <ul className="list-disc ml-6">
              <li>You can report users, listings, and messages</li>
              <li>You can block other users at any time</li>
              <li>We may remove content or accounts at our discretion</li>
            </ul>
            <p className="mt-2">
              Reports are reviewed, but action is not guaranteed.
            </p>
          </Section>

          <Section title="8. Prohibited Conduct">
            <ul className="list-disc ml-6">
              <li>No scams, fraud, or deceptive behavior</li>
              <li>No harassment or harmful conduct</li>
              <li>No attempts to bypass safety systems</li>
            </ul>
          </Section>

          <Section title="9. Payments">
            <p>
              MarketQuad does not process payments. All transactions are handled directly between users.
            </p>
          </Section>

          <Section title="10. Termination">
            <ul className="list-disc ml-6">
              <li>We may suspend or terminate accounts at any time</li>
              <li>Violations or repeated reports may result in bans</li>
            </ul>
          </Section>

          <Section title="11. Intellectual Property">
            <p>
              All rights to the platform, including branding and software, belong to MarketQuad.
            </p>
          </Section>

          <Section title="12. Disclaimer">
            <p>
              The platform is provided “as is” without warranties of any kind.
            </p>
          </Section>

          <Section title="13. Limitation of Liability">
            <p>
              MarketQuad is not liable for user interactions, transactions, or damages resulting from use of the platform.
            </p>
          </Section>

          <Section title="14. Indemnification">
            <p>
              You agree to hold MarketQuad harmless from any claims arising from your use of the platform.
            </p>
          </Section>

          <Section title="15. Privacy">
            <p>
              Your use of MarketQuad is also governed by our Privacy Policy.
            </p>
          </Section>

          <Section title="16. Terms of Service">
            <p>
              Additional terms apply through our Terms of Service.
            </p>
          </Section>

          <Section title="17. Changes">
            <p>
              We may update this agreement at any time. Continued use means you accept the changes.
            </p>
          </Section>

          <Section title="18. Governing Law">
            <p>
              This agreement is governed by the laws of British Columbia, Canada.
            </p>
          </Section>

          <Section title="19. Contact">
            <p className="text-accent">contact@market-quad.com</p>
          </Section>

        </div>
      </div>
    </>
  );
}
import Section from "@/components/Section";
export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white pt-40 py-10 px-4">
      <div className="max-w-3xl mx-auto rounded-2xl p-6 ">
        <h1 className="text-3xl font-bold mb-2 text-text">
          Privacy Policy for MarketQuad
        </h1>
        <p className="mb-6 text-black"><span>Last Updated:</span> Apr 2026 </p>

        <Section title="1. Information We Collect">
          <ul className="list-disc ml-6">
            <li>Email address</li>
            <li>Listings, messages, and images</li>
            <li>Location data (latitude and longitude)</li>
            <li>Usage data</li>
          </ul>
        </Section>

        <Section title="2. How We Use Information">
          <ul className="list-disc ml-6">
            <li>Provide and maintain the app</li>
            <li>Enable marketplace interactions</li>
            <li>Improve safety and functionality</li>
          </ul>
        </Section>

        <Section title="3. Third-Party Services">
          <p>
            We use Supabase (authentication/database) and Cloudinary (image
            storage).
          </p>
        </Section>

        <Section title="4. Data Sharing">
          <p>We do not sell your personal data. </p>
        </Section>

        <Section title="5. Location Data">
          <p>
            Location data is shared as part of listings. Users control what they
            share and should avoid sensitive locations.
          </p>
        </Section>

        <Section title="6. Data Retention">
          <p>We retain data as needed to provide our services.</p>
        </Section>

        <Section title="7. Your Rights">
          <p>You may request access or deletion of your data.</p>
        </Section>

        <Section title="8. Security">
          <p>No system is 100% secure, but we take reasonable precautions.</p>
        </Section>

        <Section title="9. Changes">
          <p>We may update this policy at any time. In the event we do, users will be notified upon changes.</p>
        </Section>

        <Section title="10. Cookies">
          <p>
          </p>
        </Section>

        <Section title="10. Contact">
          <p className="text-accent">contact@market-quad.com</p>
        </Section>
      </div>
    </div>
  );
};

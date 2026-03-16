import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for ideaDB — how we handle data and protect your privacy.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-xs text-muted-foreground/50 mb-10">Last updated: March 16, 2026</p>

      <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">1. Overview</h2>
          <p>
            ideaDB (<strong>ideadb.shop</strong>) is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding that information when you visit our website.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">2. Information We Collect</h2>
          <p>ideaDB does not require account registration or login. We collect minimal data:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Usage analytics:</strong> We use Vercel Analytics to collect anonymized, aggregated data such as page views, referrers, and device type. No personally identifiable information (PII) is collected.
            </li>
            <li>
              <strong>Log data:</strong> Our hosting provider (Vercel) may collect standard server logs, including IP addresses, browser type, and request timestamps, for security and operational purposes.
            </li>
          </ul>
          <p className="mt-3">We do not collect names, email addresses, or any other personal information unless you voluntarily contact us.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">3. Cookies</h2>
          <p>
            ideaDB uses a single functional cookie to remember your preferred color theme (e.g., light, dark). This cookie is stored locally in your browser, contains no personal information, and is not used for tracking or advertising purposes.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">4. How We Use Information</h2>
          <p>The limited data we collect is used exclusively to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Understand how visitors use the site and improve the experience</li>
            <li>Monitor platform performance and availability</li>
            <li>Detect and prevent abuse or malicious activity</li>
          </ul>
          <p className="mt-3">We do not sell, rent, or share any user data with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">5. Third-Party Services</h2>
          <p>We rely on the following third-party services, each with their own privacy policies:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <strong>Vercel</strong> — Hosting and analytics.{" "}
              <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                Vercel Privacy Policy
              </a>
            </li>
            <li>
              <strong>Turso / libSQL</strong> — Database infrastructure. Data is stored in a managed SQLite-compatible database.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">6. Data Retention</h2>
          <p>
            We do not store personal data about individual visitors. Anonymized analytics data is retained by Vercel per their own data retention policies. Server logs are typically retained for a short period for debugging purposes and then discarded.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">7. Your Rights</h2>
          <p>
            Since we do not collect personally identifiable information, there is generally no personal data to access, correct, or delete. If you have submitted any personal information through direct contact (e.g., feedback via Telegram), you may request its removal by contacting us.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">8. Children&apos;s Privacy</h2>
          <p>
            ideaDB is not directed at children under the age of 13. We do not knowingly collect any information from children. If you believe a child has provided us with personal data, please contact us so we can remove it.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be reflected by updating the "Last updated" date at the top of this page. We encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">10. Contact</h2>
          <p>
            For any privacy-related questions or concerns, please contact us via{" "}
            <a
              href="https://t.me/tieu_exe"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Telegram
            </a>
            .
          </p>
        </section>

      </div>
    </div>
  );
}

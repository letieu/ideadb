import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of Use for ideaDB — the problems, ideas, and products database.",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Terms of Use</h1>
      <p className="text-xs text-muted-foreground/50 mb-10">Last updated: March 16, 2026</p>

      <div className="prose prose-sm prose-neutral dark:prose-invert max-w-none space-y-8 text-muted-foreground leading-relaxed">

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using ideaDB (<strong>ideadb.shop</strong>), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please discontinue use of the site immediately.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">2. Description of Service</h2>
          <p>
            ideaDB is a read-only database that aggregates publicly available problems, ideas, and product information collected from social networks and other public sources. The service is provided for informational and research purposes only.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">3. Intellectual Property</h2>
          <p>
            The ideaDB platform, including its design, code, and original content, is owned by ideaDB. Content displayed on ideaDB is aggregated from public third-party sources. We do not claim ownership of third-party content. If you believe any content infringes your rights, please contact us.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">4. Permitted Use</h2>
          <p>You may use ideaDB solely for lawful, personal, or internal research purposes. You agree not to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Scrape, harvest, or systematically download content from the site in bulk</li>
            <li>Use the service in any way that could damage, disable, or impair the platform</li>
            <li>Attempt to gain unauthorized access to any part of the site or its backend systems</li>
            <li>Reproduce or redistribute ideaDB content for commercial purposes without prior written permission</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">5. Disclaimer of Warranties</h2>
          <p>
            ideaDB is provided <strong>"as is"</strong> and <strong>"as available"</strong> without warranties of any kind, express or implied. We do not guarantee the accuracy, completeness, or timeliness of any information on the platform. Use of the content is at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, ideaDB and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the service.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">7. Third-Party Links</h2>
          <p>
            The site may contain links to external websites (e.g., source posts on Reddit or Hacker News). We are not responsible for the content, privacy practices, or availability of those third-party sites.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">8. Changes to Terms</h2>
          <p>
            We reserve the right to update these Terms of Use at any time. Changes will be reflected by updating the "Last updated" date above. Continued use of the service after any changes constitutes acceptance of the new terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-foreground mb-3">9. Contact</h2>
          <p>
            If you have questions about these terms, reach out via{" "}
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

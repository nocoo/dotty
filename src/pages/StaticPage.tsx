import { ArrowLeft } from "lucide-react";

export default function StaticPage() {
  return (
    <div className="min-h-screen bg-background p-2 md:p-4 flex items-center justify-center">
      <div className="mx-auto w-full max-w-2xl rounded-[var(--radius-card)] bg-muted p-2">
        <div className="rounded-[var(--radius-widget)] bg-card border border-border p-6 md:p-10">
          {/* Header */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-2">
              <a
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-5 w-5" strokeWidth={1.5} />
              </a>
              <h1 className="text-2xl font-semibold text-foreground">
                Terms of Service
              </h1>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Last updated: January 1, 2026
            </p>
          </div>

          {/* Body */}
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold mb-2 text-base">
                1. Acceptance of Terms
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using this service, you acknowledge that you have
                read, understood, and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use this service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2 text-base">
                2. Service Description
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                This application provides the following features:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Feature overview and dashboard analytics</li>
                <li>Account management and tracking</li>
                <li>Data visualization and reporting</li>
                <li>Import and export capabilities</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2 text-base">
                3. User Responsibilities
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                When using this service, you agree to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>Provide accurate and truthful registration information</li>
                <li>Safeguard your account credentials</li>
                <li>Be responsible for all activity under your account</li>
                <li>Not use the service for any unlawful purpose</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2 text-base">
                4. Limitation of Liability
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                To the maximum extent permitted by law, the service shall not be
                liable for any direct, indirect, incidental, special, or
                consequential damages arising from the use or inability to use this
                service.
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2 text-base">
                5. Modifications
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to modify or discontinue the service at any
                time without prior notice. We shall not be liable to any user or
                third party for any modification or suspension of the service.
              </p>
            </section>

            {/* Footer divider */}
            <div className="pt-4 border-t">
              <p className="text-muted-foreground text-xs">
                By using this service, you acknowledge that you have read,
                understood, and agree to comply with these Terms of Service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

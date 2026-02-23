import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function StaticPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background p-2 md:p-4 flex items-center justify-center">
      <div className="mx-auto w-full max-w-2xl h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-2">
        <div className="flex-1 rounded-[var(--radius-widget)] bg-card border border-border p-6 md:p-10">
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
                {t("pages.static.termsOfService")}
              </h1>
            </div>
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {t("pages.static.lastUpdated")}
            </p>
          </div>

          {/* Body */}
          <div className="space-y-6 text-sm">
            <section>
              <h3 className="font-semibold mb-2 text-base">
                {t("pages.static.section1Title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("pages.static.section1Body")}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2 text-base">
                {t("pages.static.section2Title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("pages.static.section2Body")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>{t("pages.static.section2Item1")}</li>
                <li>{t("pages.static.section2Item2")}</li>
                <li>{t("pages.static.section2Item3")}</li>
                <li>{t("pages.static.section2Item4")}</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2 text-base">
                {t("pages.static.section3Title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-2">
                {t("pages.static.section3Body")}
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-2">
                <li>{t("pages.static.section3Item1")}</li>
                <li>{t("pages.static.section3Item2")}</li>
                <li>{t("pages.static.section3Item3")}</li>
                <li>{t("pages.static.section3Item4")}</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2 text-base">
                {t("pages.static.section4Title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("pages.static.section4Body")}
              </p>
            </section>

            <section>
              <h3 className="font-semibold mb-2 text-base">
                {t("pages.static.section5Title")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("pages.static.section5Body")}
              </p>
            </section>

            {/* Footer divider */}
            <div className="pt-4 border-t">
              <p className="text-muted-foreground text-xs">
                {t("pages.static.footerText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useTranslation } from "react-i18next";
import { Landmark, CreditCard, TrendingUp, Wallet, ShieldCheck, ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { StatCardWidget, StatGrid } from "@/components/dashboard/StatCardWidget";
import { StackedAreaCard } from "@/components/dashboard/StackedAreaCard";
import { BulletChartCard } from "@/components/dashboard/BulletChartCard";
import { MiniDonutCard } from "@/components/dashboard/MiniDonutCard";
import { SankeyCard } from "@/components/dashboard/SankeyCard";
import { GroupedBarCard } from "@/components/dashboard/GroupedBarCard";
import { RadialProgressCard } from "@/components/dashboard/RadialProgressCard";
import { ItemListCard } from "@/components/dashboard/ItemListCard";
import { RecentListCard } from "@/components/dashboard/RecentListCard";

// ── View Model ──

const useStatCards = (t: (key: string) => string) => [
  { title: t("pages.banking.assets"), value: "$4.82M", subtitle: t("pages.banking.managedTotal"), icon: Wallet, trend: { value: 4.8, label: t("pages.banking.qoq") } },
  { title: t("pages.banking.liquidity"), value: "$620k", subtitle: t("pages.banking.onHandCash"), icon: CreditCard, trend: { value: 2.1, label: t("pages.banking.qoq") } },
  { title: t("pages.banking.netWorth"), value: "$3.12M", subtitle: t("pages.banking.household"), icon: TrendingUp, trend: { value: 6.7, label: t("pages.banking.yoy") } },
  { title: t("pages.banking.risk"), value: t("pages.banking.low"), subtitle: t("pages.banking.portfolioTilt"), icon: ShieldCheck, trend: { value: -3.2, label: t("pages.banking.yoy") } },
];

const transfers = [
  { name: "Wire transfer", amount: "$120k", direction: "in" },
  { name: "Mortgage payment", amount: "$4.8k", direction: "out" },
  { name: "Treasury coupon", amount: "$3.6k", direction: "in" },
];

// ── View ──

export default function BankingDashboardPage() {
  const { t } = useTranslation();
  const statCards = useStatCards(t);

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">{t("pages.banking.eyebrow")}</p>
        <div className="mt-2 flex items-center gap-3">
          <div className="rounded-[var(--radius-widget)] bg-card border border-border p-2 text-muted-foreground">
            <Landmark className="h-5 w-5" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="text-lg font-semibold font-display text-foreground">{t("pages.banking.title")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("pages.banking.description")}
            </p>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <StatGrid columns={4}>
        {statCards.map((stat) => (
          <StatCardWidget key={stat.title} {...stat} />
        ))}
      </StatGrid>

      {/* Row 1: charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StackedAreaCard />
        <MiniDonutCard />
        <BulletChartCard />
      </div>

      {/* Row 2: charts */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <SankeyCard />
        <GroupedBarCard />
        <RadialProgressCard />
      </div>

      {/* Row 3: lists + transfers */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ItemListCard />
        <RecentListCard />
        <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
          <div className="mb-4 flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">{t("pages.banking.recentTransfers")}</p>
          </div>
          <div className="space-y-3">
            {transfers.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between rounded-[var(--radius-widget)] bg-card border border-border p-3"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-[var(--radius-widget)] ${
                      item.direction === "in" ? "bg-success/10" : "bg-muted"
                    }`}
                  >
                    {item.direction === "in" ? (
                      <ArrowDownLeft className="h-3.5 w-3.5 text-success" strokeWidth={1.5} />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                    )}
                  </div>
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium font-mono-num text-foreground">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

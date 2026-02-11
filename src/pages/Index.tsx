import { TotalBalanceCard } from "@/components/dashboard/TotalBalanceCard";
import { IncomeCard } from "@/components/dashboard/IncomeCard";
import { UsageCategoryCard } from "@/components/dashboard/UsageCategoryCard";
import { SpendingTrendCard } from "@/components/dashboard/SpendingTrendCard";
import { ExpenseBreakdownCard } from "@/components/dashboard/ExpenseBreakdownCard";
import { RecentTransactionsCard } from "@/components/dashboard/RecentTransactionsCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { AccountOverviewCard } from "@/components/dashboard/AccountOverviewCard";
import { SavingsGoalCard } from "@/components/dashboard/SavingsGoalCard";
import { WeeklyActivityCard } from "@/components/dashboard/WeeklyActivityCard";
import { CreditScoreCard } from "@/components/dashboard/CreditScoreCard";
import { MonthlyComparisonCard } from "@/components/dashboard/MonthlyComparisonCard";

export default function Index() {
  return (
    <>
      {/* Row 1: 3 summary cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalBalanceCard />
        <IncomeCard />
        <SpendingTrendCard />
      </div>

      {/* Row 2: wide bar chart + donut */}
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UsageCategoryCard />
        </div>
        <ExpenseBreakdownCard />
      </div>

      {/* Row 3: wide area chart + radial cards */}
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <WeeklyActivityCard />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <SavingsGoalCard />
          <CreditScoreCard />
        </div>
      </div>

      {/* Row 4: wide grouped bar chart + transactions */}
      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MonthlyComparisonCard />
        </div>
        <RecentTransactionsCard />
      </div>

      {/* Row 5: quick actions + accounts */}
      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        <QuickActionsCard />
        <AccountOverviewCard />
      </div>
    </>
  );
}

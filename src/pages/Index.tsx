import { TotalBalanceCard } from "@/components/dashboard/TotalBalanceCard";
import { IncomeCard } from "@/components/dashboard/IncomeCard";
import { UsageCategoryCard } from "@/components/dashboard/UsageCategoryCard";
import { SpendingTrendCard } from "@/components/dashboard/SpendingTrendCard";
import { ExpenseBreakdownCard } from "@/components/dashboard/ExpenseBreakdownCard";
import { RecentTransactionsCard } from "@/components/dashboard/RecentTransactionsCard";
import { QuickActionsCard } from "@/components/dashboard/QuickActionsCard";
import { AccountOverviewCard } from "@/components/dashboard/AccountOverviewCard";

export default function Index() {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <TotalBalanceCard />
        <IncomeCard />
        <SpendingTrendCard />
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <UsageCategoryCard />
        </div>
        <ExpenseBreakdownCard />
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTransactionsCard />
        </div>
        <div className="flex flex-col gap-4">
          <QuickActionsCard />
          <AccountOverviewCard />
        </div>
      </div>
    </>
  );
}

import { AppSidebar } from "@/components/AppSidebar";
import { TotalBalanceCard } from "@/components/dashboard/TotalBalanceCard";
import { IncomeCard } from "@/components/dashboard/IncomeCard";
import { UsageCategoryCard } from "@/components/dashboard/UsageCategoryCard";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />

      {/* Main content area with rounded container */}
      <main className="flex-1 p-3 pl-0">
        <div className="h-full rounded-2xl bg-card p-6 overflow-y-auto">
          {/* Header — no icon */}
          <header className="mb-6">
            <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
          </header>

          {/* Bento Grid — cards use secondary bg, no borders */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <TotalBalanceCard />
            <IncomeCard />
          </div>
          <div className="mt-4">
            <UsageCategoryCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

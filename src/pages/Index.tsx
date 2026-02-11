import { AppSidebar } from "@/components/AppSidebar";
import { TotalBalanceCard } from "@/components/dashboard/TotalBalanceCard";
import { IncomeCard } from "@/components/dashboard/IncomeCard";
import { UsageCategoryCard } from "@/components/dashboard/UsageCategoryCard";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />

      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-6">
          <h1 className="text-lg font-medium text-foreground">Dashboard</h1>
        </header>

        {/* Bento Grid */}
        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <TotalBalanceCard />
            <IncomeCard />
            <UsageCategoryCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

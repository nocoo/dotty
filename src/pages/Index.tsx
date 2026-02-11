import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { TotalBalanceCard } from "@/components/dashboard/TotalBalanceCard";
import { IncomeCard } from "@/components/dashboard/IncomeCard";
import { UsageCategoryCard } from "@/components/dashboard/UsageCategoryCard";
import { PanelLeft } from "lucide-react";

const Index = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      <main className="flex-1 flex flex-col min-h-screen">
        {/* Header — outside the panel */}
        <header className="flex h-14 items-center gap-3 px-6">
          {collapsed && (
            <button
              onClick={() => setCollapsed(false)}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors mr-1"
            >
              <PanelLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
          )}
          <h1 className="text-xl font-semibold text-foreground">Dashboard</h1>
        </header>

        {/* L1 panel: rounded-[20px], uniform padding */}
        <div className="flex-1 px-3 pb-3 pr-3">
          <div className="h-full rounded-[20px] bg-card p-5 overflow-y-auto">
            {/* Cards grid — uniform 16px gap */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <TotalBalanceCard />
              <IncomeCard />
            </div>
            <div className="mt-4">
              <UsageCategoryCard />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;

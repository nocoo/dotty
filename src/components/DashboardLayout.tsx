import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PanelLeft } from "lucide-react";

export function DashboardLayout({
  children,
  title,
  currentPath,
}: {
  children: React.ReactNode;
  title: string;
  currentPath: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        currentPath={currentPath}
      />
      <main className="flex-1 flex flex-col min-h-screen">
        <header className="flex h-14 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            {collapsed && (
              <button
                onClick={() => setCollapsed(false)}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors mr-1"
              >
                <PanelLeft className="h-4 w-4" strokeWidth={1.5} />
              </button>
            )}
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          </div>
          <ThemeToggle />
        </header>
        <div className="flex-1 px-3 pb-3 pr-3">
          <div className="h-full rounded-[20px] bg-card p-5 overflow-y-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

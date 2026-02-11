import { useState } from "react";
import {
  LayoutDashboard, Wallet, CreditCard, ArrowLeftRight,
  PiggyBank, Target, BarChart3, TrendingUp,
  LineChart, HelpCircle, Search, ChevronUp,
  Sparkles, PanelLeft, LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NavItem {
  title: string;
  icon: React.ElementType;
  badge?: number;
  path: string;
}

const mainMenuItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Wallet", icon: Wallet, path: "/wallet" },
  { title: "Cards", icon: CreditCard, path: "/cards" },
  { title: "Transactions", icon: ArrowLeftRight, path: "/transactions", badge: 6 },
  { title: "Budget", icon: PiggyBank, path: "/budget" },
  { title: "Goals", icon: Target, path: "/goals" },
];

const analyticsItems: NavItem[] = [
  { title: "Analytics", icon: BarChart3, path: "/analytics" },
  { title: "Cash Flow", icon: TrendingUp, path: "/cash-flow", badge: 2 },
  { title: "Investments", icon: LineChart, path: "/investments" },
];

const otherItems: NavItem[] = [
  { title: "Help Center", icon: HelpCircle, path: "/help" },
];

function NavGroup({
  label, items, defaultOpen = true, currentPath,
}: {
  label: string; items: NavItem[]; defaultOpen?: boolean; currentPath: string;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const navigate = useNavigate();

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-2.5 mt-2">
        <span className="text-sm font-normal text-muted-foreground">{label}</span>
        <ChevronUp className={cn("h-4 w-4 text-muted-foreground transition-transform duration-200", !open && "rotate-180")} strokeWidth={1.5} />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-0.5 px-3">
          {items.map((item) => (
            <button
              key={item.title}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal transition-colors",
                currentPath === item.path
                  ? "bg-accent text-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-badge-red px-1.5 text-[11px] font-medium text-badge-red-foreground">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function AppSidebar({ collapsed, onToggle, currentPath }: { collapsed: boolean; onToggle: () => void; currentPath: string }) {
  return (
    <aside className={cn("flex h-screen shrink-0 flex-col bg-background transition-all duration-300 ease-in-out overflow-hidden", collapsed ? "w-0" : "w-[260px]")}>
      <div className="flex h-screen w-[260px] flex-col">
        <div className="flex h-14 items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <span className="text-lg font-semibold text-foreground">Acme Inc.</span>
          </div>
          <button onClick={onToggle} className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors">
            <PanelLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>
        <div className="px-4 pb-1">
          <div className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-sm text-muted-foreground">Search</span>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto pt-1">
          <NavGroup label="Main Menu" items={mainMenuItems} currentPath={currentPath} />
          <NavGroup label="Analytics" items={analyticsItems} currentPath={currentPath} />
          <NavGroup label="Others" items={otherItems} currentPath={currentPath} />
        </nav>

        {/* User profile */}
        <div className="border-t border-border px-4 py-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 shrink-0">
              <AvatarImage src="https://avatar.vercel.sh/acme" alt="User" />
              <AvatarFallback className="text-xs">JD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">john@acme.com</p>
            </div>
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0">
              <LogOut className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}

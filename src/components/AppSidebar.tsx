import { useState } from "react";
import {
  LayoutDashboard,
  Wallet,
  CreditCard,
  ArrowLeftRight,
  PiggyBank,
  Target,
  BarChart3,
  TrendingUp,
  LineChart,
  HelpCircle,
  Search,
  ChevronUp,
  Sparkles,
  PanelLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface NavItem {
  title: string;
  icon: React.ElementType;
  badge?: number;
  active?: boolean;
}

const mainMenuItems: NavItem[] = [
  { title: "Dashboard", icon: LayoutDashboard, active: true },
  { title: "Wallet", icon: Wallet },
  { title: "Cards", icon: CreditCard },
  { title: "Transactions", icon: ArrowLeftRight, badge: 6 },
  { title: "Budget", icon: PiggyBank },
  { title: "Goals", icon: Target },
];

const analyticsItems: NavItem[] = [
  { title: "Analytics", icon: BarChart3 },
  { title: "Cash Flow", icon: TrendingUp, badge: 2 },
  { title: "Investments", icon: LineChart },
];

const otherItems: NavItem[] = [
  { title: "Help Center", icon: HelpCircle },
];

function NavGroup({ label, items, defaultOpen = true }: { label: string; items: NavItem[]; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
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
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal transition-colors",
                item.active ? "bg-accent text-foreground font-medium" : "text-muted-foreground hover:bg-accent hover:text-foreground"
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

export function AppSidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col bg-background transition-all duration-300 ease-in-out overflow-hidden",
        collapsed ? "w-0" : "w-[260px]"
      )}
    >
      <div className="w-[260px]">
        {/* Logo row — h-14 matches header */}
        <div className="flex h-14 items-center justify-between px-5">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-primary" strokeWidth={1.5} />
            <span className="text-lg font-semibold text-foreground">Acme Inc.</span>
          </div>
          <button
            onClick={onToggle}
            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
          >
            <PanelLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-1">
          <div className="flex items-center gap-3 rounded-lg bg-secondary px-3 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-sm text-muted-foreground">Search</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto pt-1">
          <NavGroup label="Main Menu" items={mainMenuItems} />
          <NavGroup label="Analytics" items={analyticsItems} />
          <NavGroup label="Others" items={otherItems} />
        </nav>
      </div>
    </aside>
  );
}

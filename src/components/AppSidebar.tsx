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
  ChevronDown,
  Sparkles,
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

function NavGroup({
  label,
  items,
  defaultOpen = true,
}: {
  label: string;
  items: NavItem[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between px-4 py-2 mt-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-0.5 px-3">
          {items.map((item) => (
            <button
              key={item.title}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-normal text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                item.active &&
                  "bg-sidebar-accent text-sidebar-foreground font-medium"
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

export function AppSidebar() {
  return (
    <aside className="flex h-screen w-[250px] shrink-0 flex-col border-r border-border bg-sidebar">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={1.5} />
        </div>
        <span className="text-sm font-medium text-foreground">Acme Inc.</span>
      </div>

      {/* Search */}
      <div className="px-4 pb-2">
        <div className="flex items-center gap-2.5 rounded-lg bg-input px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-sm text-muted-foreground">Search</span>
        </div>
      </div>

      {/* Nav Groups */}
      <nav className="flex-1 overflow-y-auto">
        <NavGroup label="Main Menu" items={mainMenuItems} />
        <NavGroup label="Analytics" items={analyticsItems} />
        <NavGroup label="Others" items={otherItems} />
      </nav>
    </aside>
  );
}

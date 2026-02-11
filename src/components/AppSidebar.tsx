import { useCallback, useEffect, useState } from "react";
import {
  LayoutDashboard, Wallet, CreditCard, ArrowLeftRight,
  PiggyBank, Target, BarChart3, TrendingUp,
  LineChart, HelpCircle, Settings, Search, ChevronUp,
  PanelLeft, LogOut, Mountain, Palette,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip, TooltipContent, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CommandDialog, CommandEmpty, CommandGroup,
  CommandInput, CommandItem, CommandList,
} from "@/components/ui/command";

// ── Navigation data model ──

interface NavItem {
  title: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
}

interface NavGroup {
  label: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "Main Menu",
    defaultOpen: true,
    items: [
      { title: "Dashboard", icon: LayoutDashboard, path: "/" },
      { title: "Wallet", icon: Wallet, path: "/wallet" },
      { title: "Cards", icon: CreditCard, path: "/cards" },
      { title: "Transactions", icon: ArrowLeftRight, path: "/transactions", badge: 6 },
      { title: "Budget", icon: PiggyBank, path: "/budget" },
      { title: "Goals", icon: Target, path: "/goals" },
    ],
  },
  {
    label: "Analytics",
    defaultOpen: true,
    items: [
      { title: "Analytics", icon: BarChart3, path: "/analytics" },
      { title: "Cash Flow", icon: TrendingUp, path: "/cash-flow", badge: 2 },
      { title: "Investments", icon: LineChart, path: "/investments" },
    ],
  },
  {
    label: "Others",
    defaultOpen: true,
    items: [
      { title: "Help Center", icon: HelpCircle, path: "/help" },
      { title: "Color Palette", icon: Palette, path: "/palette" },
      { title: "Settings", icon: Settings, path: "/settings" },
    ],
  },
];

const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

// ── Sub-components ──

function NavGroupSection({ group, currentPath }: { group: NavGroup; currentPath: string }) {
  const [open, setOpen] = useState(group.defaultOpen ?? true);
  const navigate = useNavigate();

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-2.5 mt-2">
        <span className="text-sm font-normal text-muted-foreground">{group.label}</span>
        <ChevronUp
          className={cn(
            "h-4 w-4 text-muted-foreground transition-transform duration-200",
            !open && "rotate-180"
          )}
          strokeWidth={1.5}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="flex flex-col gap-0.5 px-3">
          {group.items.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal transition-colors",
                currentPath === item.path
                  ? "bg-accent text-foreground"
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

function CollapsedNavItem({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const navigate = useNavigate();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button
          onClick={() => navigate(item.path)}
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
            currentPath === item.path
              ? "bg-accent text-foreground"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          )}
        >
          <item.icon className="h-4 w-4" strokeWidth={1.5} />
          {item.badge && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-badge-red px-1 text-[10px] font-medium text-badge-red-foreground">
              {item.badge}
            </span>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {item.title}
      </TooltipContent>
    </Tooltip>
  );
}

// ── Main sidebar component ──

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = useCallback(
    (path: string) => {
      setSearchOpen(false);
      navigate(path);
    },
    [navigate],
  );

  return (
    <aside
      className={cn(
        "flex h-screen shrink-0 flex-col bg-background transition-all duration-300 ease-in-out overflow-hidden",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {collapsed ? (
        /* ── Collapsed (icon-only) view ── */
        <div className="flex h-screen w-[68px] flex-col items-center">
          <div className="flex h-14 items-center justify-center">
            <Mountain className="h-5 w-5 text-primary" strokeWidth={1.5} />
          </div>

          <button
            onClick={onToggle}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors mb-1"
          >
            <PanelLeft className="h-4 w-4" strokeWidth={1.5} />
          </button>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors mb-2"
              >
                <Search className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              Search (⌘K)
            </TooltipContent>
          </Tooltip>

          <nav className="flex-1 flex flex-col items-center gap-1 overflow-y-auto pt-1">
            {ALL_NAV_ITEMS.map((item) => (
              <CollapsedNavItem key={item.path} item={item} currentPath={pathname} />
            ))}
          </nav>

          <div className="py-3 flex justify-center w-full">
            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <Avatar className="h-9 w-9 cursor-pointer">
                  <AvatarImage src="https://avatar.vercel.sh/acme" alt="User" />
                  <AvatarFallback className="text-xs">JD</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                John Doe
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      ) : (
        /* ── Expanded view ── */
        <div className="flex h-screen w-[260px] flex-col">
          <div className="flex h-14 items-center justify-between px-5">
            <div className="flex items-center gap-3">
              <Mountain className="h-5 w-5 text-primary" strokeWidth={1.5} />
              <span className="text-lg md:text-xl font-semibold text-foreground">basalt.</span>
            </div>
            <button
              onClick={onToggle}
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:text-foreground transition-colors"
            >
              <PanelLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <div className="px-4 pb-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center gap-3 rounded-lg bg-secondary px-3 py-2.5 transition-colors hover:bg-accent cursor-pointer"
            >
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="flex-1 text-left text-sm text-muted-foreground">Search</span>
              <kbd className="pointer-events-none hidden rounded border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
                ⌘K
              </kbd>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto pt-1">
            {NAV_GROUPS.map((group) => (
              <NavGroupSection key={group.label} group={group} currentPath={pathname} />
            ))}
          </nav>

          <div className="px-4 py-3">
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
      )}

      {/* Search command palette */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder="Search pages..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {NAV_GROUPS.map((group) => (
            <CommandGroup key={group.label} heading={group.label}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.path}
                  value={item.title}
                  onSelect={() => handleSelect(item.path)}
                  className="gap-3 cursor-pointer"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  <span>{item.title}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </aside>
  );
}

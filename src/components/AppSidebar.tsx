import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  LayoutDashboard, Wallet,
  PiggyBank, TrendingUp,
  LineChart, LayoutGrid, Settings, Search, ChevronUp,
  PanelLeft, LogOut, Palette, LogIn, IdCard,
  ExternalLink, FileQuestion, FileText, Layers, HeartPulse,
  Loader, RectangleEllipsis, FormInput, MousePointerClick, Eye, Navigation,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DottyLogo } from "@/components/DottyLogo";
import { useNavigate, useLocation } from "react-router";
import {
  Collapsible, CollapsibleTrigger,
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
  titleKey: string;
  icon: React.ElementType;
  path: string;
  badge?: number;
  external?: boolean;
}

interface NavGroup {
  labelKey: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const NAV_GROUPS: NavGroup[] = [
  {
    labelKey: "nav.blocks",
    defaultOpen: true,
    items: [
      { titleKey: "nav.dashboard", icon: LayoutDashboard, path: "/" },
      { titleKey: "nav.components", icon: RectangleEllipsis, path: "/components" },
      { titleKey: "nav.health", icon: HeartPulse, path: "/health" },
      { titleKey: "nav.accounts", icon: Wallet, path: "/accounts" },
      { titleKey: "nav.progressTracking", icon: PiggyBank, path: "/progress-tracking" },
      { titleKey: "nav.flowComparison", icon: TrendingUp, path: "/flow-comparison" },
      { titleKey: "nav.portfolio", icon: LineChart, path: "/portfolio" },
      { titleKey: "nav.interactions", icon: Layers, path: "/interactions", badge: 3 },
    ],
  },
  {
    labelKey: "nav.scenarios",
    defaultOpen: true,
    items: [
      { titleKey: "nav.wearableHealth", icon: HeartPulse, path: "/wearable" },
      { titleKey: "nav.bankingWealth", icon: Wallet, path: "/banking" },
      { titleKey: "nav.networkOps", icon: LineChart, path: "/network" },
    ],
  },
  {
    labelKey: "nav.controls",
    defaultOpen: true,
    items: [
      { titleKey: "nav.interactive", icon: MousePointerClick, path: "/interactive" },
      { titleKey: "nav.data", icon: Eye, path: "/data" },
      { titleKey: "nav.forms", icon: FormInput, path: "/forms" },
      { titleKey: "nav.navigation", icon: Navigation, path: "/navigation" },
    ],
  },
  {
    labelKey: "nav.pages",
    defaultOpen: true,
    items: [
      { titleKey: "nav.login", icon: LogIn, path: "/login", external: true },
      { titleKey: "nav.badgeLogin", icon: IdCard, path: "/badge-login", external: true },
      { titleKey: "nav.staticPage", icon: FileText, path: "/static-page", external: true },
      { titleKey: "nav.loading", icon: Loader, path: "/loading", external: true },
      { titleKey: "nav.notFoundPage", icon: FileQuestion, path: "/404", external: true },
    ],
  },
  {
    labelKey: "nav.system",
    defaultOpen: true,
    items: [
      { titleKey: "nav.layout", icon: LayoutGrid, path: "/layout" },
      { titleKey: "nav.colorPalette", icon: Palette, path: "/palette" },
      { titleKey: "nav.settings", icon: Settings, path: "/settings" },
    ],
  },
];

const ALL_NAV_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

// ── Sub-components ──

function NavGroupSection({ group, currentPath }: { group: NavGroup; currentPath: string }) {
  const [open, setOpen] = useState(group.defaultOpen ?? true);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div className="px-3 mt-2">
         <CollapsibleTrigger className="flex w-full items-center justify-between px-3 py-2.5">
          <span className="text-sm font-normal text-muted-foreground">{t(group.labelKey)}</span>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center">
            <ChevronUp
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-200",
                !open && "rotate-180"
              )}
              strokeWidth={1.5}
            />
          </span>
        </CollapsibleTrigger>
      </div>
      <div
        className="grid overflow-hidden"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 200ms ease-out",
        }}
      >
        <div className="min-h-0 overflow-hidden">
        <div className="flex flex-col gap-0.5 px-3">
          {group.items.map((item) => (
            <button
              key={item.path}
              onClick={() =>
                item.external
                  ? window.open(item.path, "_blank", "noopener,noreferrer")
                  : navigate(item.path)
              }
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-normal transition-colors",
                !item.external && currentPath === item.path
                  ? "bg-accent text-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.5} />
              <span className="flex-1 text-left">{t(item.titleKey)}</span>
              {item.external && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                  <ExternalLink className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
                </span>
              )}
              {item.badge && (
                <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-badge-red px-1.5 text-[11px] font-medium text-badge-red-foreground">
                    {item.badge}
                  </span>
                </span>
              )}
            </button>
          ))}
        </div>
        </div>
      </div>
    </Collapsible>
  );
}

function CollapsedNavItem({ item, currentPath }: { item: NavItem; currentPath: string }) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <button
          onClick={() =>
            item.external
              ? window.open(item.path, "_blank", "noopener,noreferrer")
              : navigate(item.path)
          }
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
            !item.external && currentPath === item.path
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
        {t(item.titleKey)}
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
  const { t } = useTranslation();
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
        "sticky top-0 flex h-screen shrink-0 flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out overflow-hidden",
        collapsed ? "w-[68px]" : "w-[260px]"
      )}
    >
      {collapsed ? (
        /* ── Collapsed (icon-only) view ── */
        <div className="flex h-screen w-[68px] flex-col items-center">
          <div className="flex h-14 items-center justify-center">
            <DottyLogo className="h-5 w-5 text-primary" />
          </div>

          <button
            onClick={onToggle}
            aria-label={t("common.expandSidebar")}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors mb-1"
          >
            <PanelLeft className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
          </button>

          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <button
                onClick={() => setSearchOpen(true)}
                aria-label={`${t("common.search")} (⌘K)`}
                className="flex h-10 w-10 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors mb-2"
              >
                <Search className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              {t("common.search")} (⌘K)
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
                  <AvatarFallback className="text-xs">ZL</AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                Zheng Li
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      ) : (
        /* ── Expanded view ── */
        <div className="flex h-screen w-[260px] flex-col">
          <div className="px-3 h-14 flex items-center">
             <div className="flex w-full items-center justify-between px-3">
              <div className="flex items-center gap-3">
                <DottyLogo className="h-5 w-5 text-primary" />
                <span className="text-lg md:text-xl font-semibold text-foreground">dotty.</span>
                <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground leading-none">
                  v{__APP_VERSION__}
                </span>
              </div>
              <button
                onClick={onToggle}
                aria-label={t("common.collapseSidebar")}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground transition-colors"
              >
                <PanelLeft className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="px-3 pb-1">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex w-full items-center gap-3 rounded-lg bg-secondary px-3 py-1.5 transition-colors hover:bg-accent cursor-pointer"
            >
              <Search className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="flex-1 text-left text-sm text-muted-foreground">{t("common.search")}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center">
                <kbd className="pointer-events-none hidden rounded-md border border-border bg-card px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline-block">
                  ⌘K
                </kbd>
              </span>
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto pt-1">
            {NAV_GROUPS.map((group) => (
              <NavGroupSection key={group.labelKey} group={group} currentPath={pathname} />
            ))}
          </nav>

          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarImage src="https://avatar.vercel.sh/acme" alt="User" />
                <AvatarFallback className="text-xs">ZL</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">Zheng Li</p>
                <p className="text-xs text-muted-foreground truncate">zhengli@example.com</p>
              </div>
              <button aria-label={t("common.logOut")} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors shrink-0">
                <LogOut className="h-4 w-4" aria-hidden="true" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search command palette */}
      <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
        <CommandInput placeholder={t("common.searchPages")} />
        <CommandList>
          <CommandEmpty>{t("common.noResults")}</CommandEmpty>
          {NAV_GROUPS.map((group) => (
            <CommandGroup key={group.labelKey} heading={t(group.labelKey)}>
              {group.items.map((item) => (
                <CommandItem
                  key={item.path}
                  value={t(item.titleKey)}
                  onSelect={() => handleSelect(item.path)}
                  className="gap-3 cursor-pointer"
                >
                  <item.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  <span>{t(item.titleKey)}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </aside>
  );
}

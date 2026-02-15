import { useState } from "react";
import {
  Navigation, ChevronRight, Home, FolderOpen, FileText,
  ChevronsLeft, ChevronLeft, ChevronRight as ChevronRightIcon, ChevronsRight,
  CheckCircle2, Circle, MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// ── View Model ──

const BREADCRUMB_SIMPLE = [
  { label: "Home" },
  { label: "Products" },
  { label: "Electronics" },
  { label: "Headphones" },
];

const BREADCRUMB_ICONS = [
  { label: "Home", icon: Home },
  { label: "Documents", icon: FolderOpen },
  { label: "Reports", icon: FolderOpen },
  { label: "Q4 Summary.pdf", icon: FileText },
];

const BREADCRUMB_CARD = [
  { label: "Dashboard" },
  { label: "Settings" },
  { label: "Notifications" },
];

const STEPPER_STEPS = ["Account", "Profile", "Preferences", "Review", "Complete"];

const STANDARD_TABS = ["Overview", "Analytics", "Reports", "Settings"];
const UNDERLINE_TABS = ["All", "Active", "Archived", "Drafts"];
const PILL_TABS = ["Day", "Week", "Month", "Year"];

// ── View Helpers ──

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

function Breadcrumb({ items }: { items: { label: string; icon?: React.ElementType }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
      {items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-1">
          {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />}
          {item.icon && <item.icon className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />}
          <span className={i === items.length - 1 ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground cursor-pointer"}>
            {item.label}
          </span>
        </div>
      ))}
    </nav>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }: { currentPage: number; totalPages: number; onPageChange: (p: number) => void }) {
  const getVisiblePages = () => {
    const pages: (number | "ellipsis")[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center gap-1">
      <Button variant="outline" size="icon" className="h-8 w-8 rounded-[var(--radius-widget)]" disabled={currentPage === 1} onClick={() => onPageChange(1)}>
        <ChevronsLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8 rounded-[var(--radius-widget)]" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        <ChevronLeft className="h-3.5 w-3.5" strokeWidth={1.5} />
      </Button>
      {getVisiblePages().map((page, i) =>
        page === "ellipsis" ? (
          <span key={`e-${i}`} className="flex h-8 w-8 items-center justify-center text-muted-foreground">
            <MoreHorizontal className="h-4 w-4" strokeWidth={1.5} />
          </span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="icon"
            className="h-8 w-8 rounded-[var(--radius-widget)] text-xs font-mono-num"
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        )
      )}
      <Button variant="outline" size="icon" className="h-8 w-8 rounded-[var(--radius-widget)]" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        <ChevronRightIcon className="h-3.5 w-3.5" strokeWidth={1.5} />
      </Button>
      <Button variant="outline" size="icon" className="h-8 w-8 rounded-[var(--radius-widget)]" disabled={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
        <ChevronsRight className="h-3.5 w-3.5" strokeWidth={1.5} />
      </Button>
    </div>
  );
}

function Stepper({ steps, current }: { steps: string[]; current: number }) {
  return (
    <div className="flex items-center">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex items-center gap-2">
            <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium transition-colors ${
              i < current
                ? "bg-primary text-primary-foreground"
                : i === current
                  ? "border-2 border-primary text-primary"
                  : "border border-border text-muted-foreground"
            }`}>
              {i < current ? <CheckCircle2 className="h-4 w-4" strokeWidth={1.5} /> : <span className="font-mono-num">{i + 1}</span>}
            </div>
            <div className="hidden sm:block">
              <p className={`text-xs font-medium ${i <= current ? "text-foreground" : "text-muted-foreground"}`}>{step}</p>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className={`mx-3 h-px w-8 sm:w-12 ${i < current ? "bg-primary" : "bg-border"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Page ──

export default function NavigationPage() {
  const [page1, setPage1] = useState(1);
  const [page2, setPage2] = useState(5);
  const [stepperIndex, setStepperIndex] = useState(1);

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="rounded-[var(--radius-card)] bg-secondary p-5 md:p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Navigation className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Navigation
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-display tracking-tight">
            Navigation and wayfinding
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Breadcrumbs, pagination, steppers, and tab patterns for guiding users through hierarchies and multi-step flows.
          </p>
        </div>
      </div>

      {/* Breadcrumbs */}
      <Section title="Breadcrumbs" icon={ChevronRight}>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">simple</p>
            <Breadcrumb items={BREADCRUMB_SIMPLE} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">with icons</p>
            <Breadcrumb items={BREADCRUMB_ICONS} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">inside a card</p>
            <div className="rounded-[var(--radius-widget)] border border-border bg-card p-4">
              <Breadcrumb items={BREADCRUMB_CARD} />
              <p className="text-sm text-foreground font-medium mt-3">Notification Preferences</p>
              <p className="text-xs text-muted-foreground mt-1">Choose how you want to be notified about updates.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Pagination */}
      <Section title="Pagination" icon={ChevronsRight}>
        <div className="space-y-6">
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">short (5 pages)</p>
            <Pagination currentPage={page1} totalPages={5} onPageChange={setPage1} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">long (20 pages) with ellipsis</p>
            <Pagination currentPage={page2} totalPages={20} onPageChange={setPage2} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">with context</p>
            <div className="rounded-[var(--radius-widget)] border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Showing <span className="font-medium text-foreground font-mono-num">41-50</span> of <span className="font-medium text-foreground font-mono-num">200</span> results
                </p>
                <Pagination currentPage={page2} totalPages={20} onPageChange={setPage2} />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Stepper / Wizard */}
      <Section title="Stepper / Wizard" icon={Circle}>
        <div className="space-y-6">
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-mono">horizontal stepper</p>
            <Stepper steps={STEPPER_STEPS} current={stepperIndex} />
            <div className="flex items-center gap-2 mt-4">
              <Button variant="outline" size="sm" className="rounded-[var(--radius-widget)]" disabled={stepperIndex === 0} onClick={() => setStepperIndex((i) => i - 1)}>
                Back
              </Button>
              <Button size="sm" className="rounded-[var(--radius-widget)]" disabled={stepperIndex === STEPPER_STEPS.length - 1} onClick={() => setStepperIndex((i) => i + 1)}>
                {stepperIndex === STEPPER_STEPS.length - 2 ? "Finish" : "Next"}
              </Button>
              <Button variant="ghost" size="sm" className="ml-auto rounded-[var(--radius-widget)]" onClick={() => setStepperIndex(0)}>
                Reset
              </Button>
            </div>
          </div>

          {/* Vertical stepper */}
          <div>
            <p className="text-xs text-muted-foreground mb-3 font-mono">vertical stepper</p>
            <div className="max-w-sm">
              {STEPPER_STEPS.map((step, i) => (
                <div key={step} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-medium ${
                      i < stepperIndex
                        ? "bg-primary text-primary-foreground"
                        : i === stepperIndex
                          ? "border-2 border-primary text-primary"
                          : "border border-border text-muted-foreground"
                    }`}>
                      {i < stepperIndex ? <CheckCircle2 className="h-3.5 w-3.5" strokeWidth={1.5} /> : <span className="font-mono-num">{i + 1}</span>}
                    </div>
                    {i < STEPPER_STEPS.length - 1 && (
                      <div className={`w-px flex-1 min-h-[24px] ${i < stepperIndex ? "bg-primary" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-6">
                    <p className={`text-sm font-medium ${i <= stepperIndex ? "text-foreground" : "text-muted-foreground"}`}>{step}</p>
                    <p className="text-xs text-muted-foreground">
                      {i < stepperIndex ? "Completed" : i === stepperIndex ? "In progress" : "Pending"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Tab Patterns */}
      <Section title="Tab Patterns" icon={Navigation}>
        <div className="space-y-6">
          {/* Standard tabs */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">standard tabs</p>
            <Tabs defaultValue="overview">
              <TabsList>
                {STANDARD_TABS.map((tab) => (
                  <TabsTrigger key={tab} value={tab.toLowerCase()}>{tab}</TabsTrigger>
                ))}
              </TabsList>
              {STANDARD_TABS.map((tab) => (
                <TabsContent key={tab} value={tab.toLowerCase()}>
                  <div className="rounded-[var(--radius-widget)] border border-border bg-card p-4">
                    <p className="text-sm text-foreground">{tab} content area</p>
                    {tab === "Overview" && (
                      <p className="text-xs text-muted-foreground mt-1">Tab panels hold the content for each section.</p>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Underline tabs */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">underline style</p>
            <Tabs defaultValue="all">
              <TabsList className="bg-transparent border-b border-border rounded-none h-auto p-0 gap-4">
                {UNDERLINE_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase()}
                    className="rounded-none border-b-2 border-transparent bg-transparent px-1 pb-2 pt-1 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
              {UNDERLINE_TABS.map((tab) => (
                <TabsContent key={tab} value={tab.toLowerCase()}>
                  <div className="rounded-[var(--radius-widget)] border border-border bg-card p-4 mt-3">
                    <p className="text-sm text-foreground">Showing {tab.toLowerCase()} items</p>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Pill tabs */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">pill style</p>
            <Tabs defaultValue="day">
              <TabsList className="bg-transparent gap-1 p-0">
                {PILL_TABS.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab.toLowerCase()}
                    className="rounded-full px-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      </Section>
    </div>
  );
}

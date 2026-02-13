import { Search, Star, Sparkles, LayoutGrid, Flame, Filter, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageIntro } from "@/components/PageIntro";

const FILTERS = ["All", "Finance", "Health", "SaaS", "E-commerce", "AI", "Mobile"] as const;

const CATEGORIES = [
  { title: "Dashboards", count: 18, desc: "Operational, analytics, and KPI-focused layouts" },
  { title: "Auth & Onboarding", count: 9, desc: "Login, sign-up, and multi-step onboarding" },
  { title: "Billing & Pricing", count: 7, desc: "Plans, checkout, invoices, and receipts" },
  { title: "CRM & Sales", count: 12, desc: "Pipelines, deals, and customer profiles" },
  { title: "Marketing", count: 10, desc: "Landing pages, feature grids, and FAQs" },
  { title: "Support", count: 6, desc: "Help centers, ticket lists, and status" },
];

const TEMPLATES = [
  { title: "Finance Core", desc: "Multi-card finance dashboard with trends", tag: "Finance", rating: "4.9" },
  { title: "Health Signals", desc: "Vitals, timeline, and habit tracking", tag: "Health", rating: "4.8" },
  { title: "SaaS Ops", desc: "MRR, churn, and retention overview", tag: "SaaS", rating: "4.7" },
  { title: "Storefront Pulse", desc: "Orders, traffic, and inventory", tag: "E-commerce", rating: "4.8" },
  { title: "AI Studio", desc: "Prompt usage, credits, and sessions", tag: "AI", rating: "4.7" },
  { title: "Mobile Growth", desc: "Installs, cohorts, and funnels", tag: "Mobile", rating: "4.6" },
];

const PACKS = [
  { title: "Finance Kit", desc: "Cards, charts, and transaction tables" },
  { title: "Auth Kit", desc: "Login, sign-up, OTP, and reset flows" },
  { title: "Commerce Kit", desc: "Catalog, cart, and checkout modules" },
];

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-card bg-secondary p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default function LibraryPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Curated templates and premium UI modules"
        description="A structured library of production-ready layouts, components, and flows. Built for fast launches and consistent quality across categories."
        eyebrow="Basalt Library"
        icon={Sparkles}
        actions={
          <>
            <div className="relative min-w-[240px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <Input
                placeholder="Search templates"
                className="rounded-widget border-border bg-card pl-10 text-sm focus-visible:ring-primary"
              />
            </div>
            <button className="flex items-center gap-2 rounded-widget bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} /> Explore
            </button>
          </>
        }
      />
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((filter, i) => (
          <button
            key={filter}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              i === 0 ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter}
          </button>
        ))}
        <button className="flex items-center gap-2 rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground">
          <Filter className="h-3.5 w-3.5" strokeWidth={1.5} /> Filters
        </button>
      </div>

      <Section title="Browse by Category" icon={LayoutGrid}>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => (
            <div key={cat.title} className="rounded-widget border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{cat.title}</p>
                <span className="text-xs text-muted-foreground">{cat.count}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{cat.desc}</p>
              <button className="mt-4 text-xs font-medium text-primary hover:text-primary/80">
                View templates
              </button>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Featured Templates" icon={Star}>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          {TEMPLATES.map((tpl) => (
            <div key={tpl.title} className="rounded-widget border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{tpl.title}</p>
                <span className="text-xs text-muted-foreground">{tpl.rating}</span>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">{tpl.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{tpl.tag}</span>
                <button className="text-xs font-medium text-primary">Preview</button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Component Packs" icon={Flame}>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {PACKS.map((pack) => (
            <div key={pack.title} className="rounded-widget border border-border bg-card p-4">
              <p className="text-sm font-medium text-foreground">{pack.title}</p>
              <p className="mt-2 text-xs text-muted-foreground">{pack.desc}</p>
              <button className="mt-4 rounded-widget bg-secondary px-3 py-2 text-xs font-medium text-foreground">
                Open pack
              </button>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

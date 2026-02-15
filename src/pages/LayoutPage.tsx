import {
  LayoutGrid, Grid3X3, Columns3, Rows3,
  AlignHorizontalDistributeCenter, Maximize2,
} from "lucide-react";

// ── View Model ──

interface SectionVM {
  title: string;
  icon: React.ElementType;
}

const SECTIONS: Record<string, SectionVM> = {
  equal:       { title: "Equal Columns",        icon: Grid3X3 },
  asymmetric:  { title: "Asymmetric Columns",   icon: Columns3 },
  responsive:  { title: "Responsive Breakpoints", icon: Maximize2 },
  spanning:    { title: "Spanning Rows & Columns", icon: Rows3 },
  dashboard:   { title: "Dashboard Composition", icon: LayoutGrid },
  flexbox:     { title: "Flexbox Patterns",     icon: AlignHorizontalDistributeCenter },
  autofit:     { title: "Auto-Fit Grid",        icon: Grid3X3 },
};

// ── View helpers ──

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

function Block({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-widget)] border border-border bg-card p-4 text-sm text-muted-foreground ${className}`}
    >
      {children}
    </div>
  );
}

function LabeledBlock({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[var(--radius-widget)] border border-border bg-card p-4 flex items-center justify-center text-xs text-muted-foreground font-mono ${className}`}
    >
      {label}
    </div>
  );
}

// ── Page ──

export default function LayoutPage() {
  return (
    <div className="space-y-4">
      {/* Page intro — 2-layer card */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-5 md:p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Layout
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-display tracking-tight">
            Grid systems and layout patterns
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Reusable responsive layouts built with CSS Grid and Flexbox. Copy
            any pattern to compose your own pages.
          </p>
        </div>
      </div>

      {/* Equal columns */}
      <Section {...SECTIONS.equal}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <LabeledBlock label="1/2" />
            <LabeledBlock label="1/2" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <LabeledBlock label="1/3" />
            <LabeledBlock label="1/3" />
            <LabeledBlock label="1/3" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <LabeledBlock label="1/4" />
            <LabeledBlock label="1/4" />
            <LabeledBlock label="1/4" />
            <LabeledBlock label="1/4" />
          </div>
        </div>
      </Section>

      {/* Asymmetric columns */}
      <Section {...SECTIONS.asymmetric}>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <LabeledBlock label="1/3" />
            <LabeledBlock label="2/3" className="col-span-2" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <LabeledBlock label="1/4" />
            <LabeledBlock label="3/4" className="col-span-3" />
          </div>
          <div className="grid grid-cols-12 gap-4">
            <LabeledBlock label="5 cols" className="col-span-5" />
            <LabeledBlock label="7 cols" className="col-span-7" />
          </div>
        </div>
      </Section>

      {/* Responsive breakpoints */}
      <Section {...SECTIONS.responsive}>
        <p className="text-xs text-muted-foreground mb-3">
          Resize the browser to see these reflow. Mobile: 1 col &rarr; md: 2
          cols &rarr; lg: 4 cols.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <LabeledBlock label="A" className="min-h-[80px]" />
          <LabeledBlock label="B" className="min-h-[80px]" />
          <LabeledBlock label="C" className="min-h-[80px]" />
          <LabeledBlock label="D" className="min-h-[80px]" />
        </div>
      </Section>

      {/* Spanning rows and columns */}
      <Section {...SECTIONS.spanning}>
        <div className="grid grid-cols-3 grid-rows-2 gap-4">
          <LabeledBlock
            label="span 2 rows"
            className="row-span-2 min-h-[160px]"
          />
          <LabeledBlock label="1x1" />
          <LabeledBlock label="1x1" />
          <LabeledBlock label="span 2 cols" className="col-span-2" />
        </div>
      </Section>

      {/* Dashboard-style mixed grid */}
      <Section {...SECTIONS.dashboard}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Block className="lg:col-span-2 min-h-[120px]">
            <p className="text-xs font-medium text-foreground mb-1">
              Wide card
            </p>
            <p className="text-xs">
              Spans 2 columns on large screens. Ideal for charts or summaries.
            </p>
          </Block>
          <Block className="min-h-[120px]">
            <p className="text-xs font-medium text-foreground mb-1">Metric</p>
            <p className="font-mono-num text-2xl text-foreground">1,284</p>
          </Block>
          <Block className="min-h-[120px]">
            <p className="text-xs font-medium text-foreground mb-1">Metric</p>
            <p className="font-mono-num text-2xl text-foreground">$42.5k</p>
          </Block>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mt-4">
          <Block className="md:col-span-2 min-h-[200px]">
            <p className="text-xs font-medium text-foreground mb-1">
              Main content area
            </p>
            <p className="text-xs">
              2/3 width. Perfect for primary charts, tables, or data views.
            </p>
          </Block>
          <Block className="min-h-[200px]">
            <p className="text-xs font-medium text-foreground mb-1">Sidebar</p>
            <p className="text-xs">
              1/3 width. Use for filters, recent activity, or secondary info.
            </p>
          </Block>
        </div>
      </Section>

      {/* Flexbox patterns */}
      <Section {...SECTIONS.flexbox}>
        <div className="space-y-4">
          {/* Horizontal center */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">
              justify-center
            </p>
            <div className="flex justify-center gap-3">
              <LabeledBlock label="A" className="w-20" />
              <LabeledBlock label="B" className="w-20" />
              <LabeledBlock label="C" className="w-20" />
            </div>
          </div>
          {/* Space between */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">
              justify-between
            </p>
            <div className="flex justify-between gap-3">
              <LabeledBlock label="Left" className="w-24" />
              <LabeledBlock label="Right" className="w-24" />
            </div>
          </div>
          {/* Wrap */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">
              flex-wrap
            </p>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: 8 }, (_, i) => (
                <LabeledBlock key={i} label={`${i + 1}`} className="w-20" />
              ))}
            </div>
          </div>
          {/* Vertical stack */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">
              flex-col gap-3
            </p>
            <div className="flex flex-col gap-3 max-w-xs">
              <LabeledBlock label="Top" />
              <LabeledBlock label="Middle" />
              <LabeledBlock label="Bottom" />
            </div>
          </div>
        </div>
      </Section>

      {/* Auto-fit / auto-fill */}
      <Section {...SECTIONS.autofit}>
        <p className="text-xs text-muted-foreground mb-3">
          Cards fill available space with a minimum width of 200px. No
          breakpoint classes needed.
        </p>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {Array.from({ length: 6 }, (_, i) => (
            <Block key={i} className="min-h-[100px]">
              <p className="text-xs font-medium text-foreground mb-1">
                Card {i + 1}
              </p>
              <p className="text-xs">
                Auto-sized content block that adapts to container width.
              </p>
            </Block>
          ))}
        </div>
      </Section>
    </div>
  );
}

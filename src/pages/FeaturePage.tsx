import { Sparkles, ArrowRight, ShieldCheck, Zap, LayoutGrid, Star } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

const featureList = [
  {
    title: "Multi-surface templates",
    desc: "Each template includes desktop, tablet, and mobile layouts.",
    icon: LayoutGrid,
  },
  {
    title: "Operational UX",
    desc: "Cards, tables, and panels reflect real product data flows.",
    icon: Zap,
  },
  {
    title: "Design system aligned",
    desc: "Tokens and typography stay consistent across kits.",
    icon: ShieldCheck,
  },
];

const highlights = [
  { title: "Conversion", value: "+28%" },
  { title: "Time saved", value: "6 weeks" },
  { title: "Coverage", value: "18 industries" },
];

export default function FeaturePage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Elevate every surface"
        description="A modular system that scales from hero sections to analytics dashboards with consistent quality."
        eyebrow="Feature Overview"
        icon={Sparkles}
        actions={
          <button className="flex items-center gap-2 rounded-widget bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
            View library <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        }
      />
      <div className="rounded-card bg-secondary p-6">
        <p className="text-xs text-muted-foreground">Impact metrics</p>
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="grid grid-cols-3 gap-3">
            {highlights.map((item) => (
              <div key={item.title} className="rounded-widget bg-card p-3 text-center">
                <p className="text-xs text-muted-foreground">{item.title}</p>
                <p className="text-lg font-semibold text-foreground font-display">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-widget bg-card p-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" strokeWidth={1.5} />
              <p className="text-sm text-foreground">Top-rated for launch speed</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Ranked #1 by 1200+ teams for time-to-market.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {featureList.map((item) => (
          <div key={item.title} className="rounded-card bg-secondary p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
              <item.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
            </div>
            <p className="mt-4 text-sm font-medium text-foreground">{item.title}</p>
            <p className="mt-2 text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="rounded-card bg-secondary p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Need a custom feature kit?</p>
            <p className="text-xs text-muted-foreground">We build tailored systems for enterprise teams.</p>
          </div>
          <button className="rounded-widget bg-card px-4 py-2 text-xs font-medium text-foreground">Talk to us</button>
        </div>
      </div>
    </div>
  );
}

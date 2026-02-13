import { ArrowRight, Sparkles, Star, ShieldCheck, Globe } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

const highlights = [
  { label: "Templates", value: "120+" },
  { label: "Components", value: "340+" },
  { label: "Industries", value: "18" },
  { label: "Design tokens", value: "24" },
];

const features = [
  {
    title: "Production-grade layouts",
    desc: "Multi-section pages with real-world structure and spacing.",
    icon: ShieldCheck,
  },
  {
    title: "Design system ready",
    desc: "Tokens, cards, and tables built to scale across apps.",
    icon: Sparkles,
  },
  {
    title: "Global-ready UI",
    desc: "Localized typography, multi-language support, and RTL safe.",
    icon: Globe,
  },
];

export default function LandingPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Launch polished product pages in days, not weeks"
        description="A premium template library that brings structure to your product surface. Built for speed, consistency, and high conversion."
        eyebrow="Landing"
        icon={Sparkles}
        actions={
          <>
            <button className="flex items-center gap-2 rounded-widget bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
              Explore templates <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button className="rounded-widget bg-card px-5 py-2.5 text-sm font-medium text-foreground">
              Request a demo
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-card bg-secondary p-6">
          <p className="text-xs text-muted-foreground">Highlights</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-widget bg-card p-3">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-lg font-semibold text-foreground font-display">{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 rounded-widget bg-card p-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-500" strokeWidth={1.5} />
              <p className="text-sm text-foreground">4.9/5 average rating</p>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">From 1,200+ product builders</p>
          </div>
        </div>
        <div className="rounded-card bg-secondary p-6">
          <p className="text-xs text-muted-foreground">Feature snapshot</p>
          <div className="mt-4 space-y-3">
            {features.map((item) => (
              <div key={item.title} className="rounded-widget border border-border bg-card p-3">
                <div className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  <p className="text-sm text-foreground">{item.title}</p>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-card bg-secondary p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Ready to build a premium surface?</p>
            <p className="text-xs text-muted-foreground">Get the latest templates and system updates.</p>
          </div>
          <button className="rounded-widget bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
            Join the waitlist
          </button>
        </div>
      </div>
    </div>
  );
}

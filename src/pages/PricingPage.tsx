import { Check, BadgePercent, Sparkles } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

const tiers = [
  {
    name: "Starter",
    price: "$19",
    desc: "For early-stage teams building fast.",
    features: ["12 templates", "20 components", "Basic support", "Community access"],
  },
  {
    name: "Growth",
    price: "$49",
    desc: "For product teams shipping weekly.",
    features: ["All templates", "60+ components", "Design tokens", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Let’s talk",
    desc: "For orgs needing custom systems.",
    features: ["Custom kits", "Figma library", "Dedicated partner", "SLA"],
  },
];

export default function PricingPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Simple plans, premium output"
        description="Choose a plan that scales with your product team. All plans include production-ready templates and controls."
        eyebrow="Pricing"
        icon={BadgePercent}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-card p-5 ${
              tier.highlighted ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
            }`}
          >
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium ${tier.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
                {tier.name}
              </p>
              {tier.highlighted && (
                <span className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em]">
                  <Sparkles className="h-3 w-3" strokeWidth={1.5} /> Best
                </span>
              )}
            </div>
            <p className={`mt-2 text-3xl font-semibold ${tier.highlighted ? "text-primary-foreground" : "text-foreground"}`}>
              {tier.price}
            </p>
            <p className={`mt-2 text-xs ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {tier.desc}
            </p>
            <ul className="mt-4 space-y-2">
              {tier.features.map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs">
                  <Check className={`h-3.5 w-3.5 ${tier.highlighted ? "text-primary-foreground" : "text-success"}`} strokeWidth={1.5} />
                  <span className={tier.highlighted ? "text-primary-foreground" : "text-foreground"}>{feat}</span>
                </li>
              ))}
            </ul>
            <button
              className={`mt-5 w-full rounded-widget px-4 py-2 text-sm font-medium transition-colors ${
                tier.highlighted
                  ? "bg-white text-primary hover:bg-white/90"
                  : "bg-card text-foreground hover:bg-accent"
              }`}
            >
              {tier.name === "Enterprise" ? "Contact sales" : "Start now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

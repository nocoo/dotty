import { BadgeCheck, AlertTriangle, Info, Sparkles, X, Circle } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

const solidPills = [
  { label: "Primary", className: "bg-primary text-primary-foreground" },
  { label: "Success", className: "bg-success text-success-foreground" },
  { label: "Warning", className: "bg-amber-500 text-white" },
  { label: "Error", className: "bg-destructive text-destructive-foreground" },
  { label: "Muted", className: "bg-muted text-foreground" },
];

const softPills = [
  { label: "Blue", className: "bg-blue-500/10 text-blue-500" },
  { label: "Teal", className: "bg-teal-500/10 text-teal-500" },
  { label: "Indigo", className: "bg-indigo-500/10 text-indigo-500" },
  { label: "Rose", className: "bg-rose-500/10 text-rose-500" },
  { label: "Amber", className: "bg-amber-500/10 text-amber-500" },
];

const outlinePills = [
  { label: "Outline", className: "border border-border text-foreground" },
  { label: "Primary", className: "border border-primary text-primary" },
  { label: "Success", className: "border border-success text-success" },
  { label: "Warning", className: "border border-amber-500 text-amber-500" },
  { label: "Error", className: "border border-destructive text-destructive" },
];

const iconPills = [
  { label: "Verified", icon: BadgeCheck, className: "bg-success/10 text-success" },
  { label: "At risk", icon: AlertTriangle, className: "bg-amber-500/10 text-amber-500" },
  { label: "Info", icon: Info, className: "bg-blue-500/10 text-blue-500" },
  { label: "AI", icon: Sparkles, className: "bg-purple-500/10 text-purple-500" },
];

const sizePills = [
  { label: "XS", className: "text-[10px] px-2 py-0.5" },
  { label: "SM", className: "text-xs px-2.5 py-1" },
  { label: "MD", className: "text-sm px-3 py-1.5" },
  { label: "LG", className: "text-sm px-3.5 py-2" },
];

const gradientPills = [
  { label: "Sunset", className: "bg-gradient-to-r from-amber-500 to-rose-500 text-white" },
  { label: "Ocean", className: "bg-gradient-to-r from-blue-500 to-teal-500 text-white" },
  { label: "Midnight", className: "bg-gradient-to-r from-indigo-600 to-purple-600 text-white" },
];

const dotPills = [
  { label: "Live", dot: "bg-green-500", className: "bg-green-500/10 text-green-600" },
  { label: "Paused", dot: "bg-amber-500", className: "bg-amber-500/10 text-amber-500" },
  { label: "Offline", dot: "bg-rose-500", className: "bg-rose-500/10 text-rose-500" },
];

const closablePills = ["Design", "Analytics", "Mobile", "Finance"].map((label) => ({
  label,
  className: "bg-card text-foreground",
}));

export default function PillsPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Pill chips in every style"
        description="A pill library with solid, soft, outline, icon, gradient, and interactive variants."
        eyebrow="Pills"
        icon={Circle}
      />

      <div className="rounded-card bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-3">Solid pills</p>
        <div className="flex flex-wrap gap-2">
          {solidPills.map((pill) => (
            <span key={pill.label} className={`rounded-full px-3 py-1 text-xs font-medium ${pill.className}`}>
              {pill.label}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-card bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-3">Soft pills</p>
        <div className="flex flex-wrap gap-2">
          {softPills.map((pill) => (
            <span key={pill.label} className={`rounded-full px-3 py-1 text-xs font-medium ${pill.className}`}>
              {pill.label}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-card bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-3">Outline pills</p>
        <div className="flex flex-wrap gap-2">
          {outlinePills.map((pill) => (
            <span key={pill.label} className={`rounded-full px-3 py-1 text-xs font-medium ${pill.className}`}>
              {pill.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-3">Icon pills</p>
          <div className="flex flex-wrap gap-2">
            {iconPills.map((pill) => (
              <span key={pill.label} className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${pill.className}`}>
                <pill.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
                {pill.label}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-card bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-3">Size scale</p>
          <div className="flex flex-wrap items-center gap-2">
            {sizePills.map((pill) => (
              <span key={pill.label} className={`rounded-full bg-card text-foreground ${pill.className}`}>
                {pill.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-card bg-secondary p-4 md:p-5">
        <p className="text-sm text-muted-foreground mb-3">Gradient pills</p>
        <div className="flex flex-wrap gap-2">
          {gradientPills.map((pill) => (
            <span key={pill.label} className={`rounded-full px-3 py-1 text-xs font-medium ${pill.className}`}>
              {pill.label}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-3">Dot indicators</p>
          <div className="flex flex-wrap gap-2">
            {dotPills.map((pill) => (
              <span key={pill.label} className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${pill.className}`}>
                <span className={`h-2 w-2 rounded-full ${pill.dot}`} />
                {pill.label}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-3">Closable pills</p>
          <div className="flex flex-wrap gap-2">
            {closablePills.map((pill) => (
              <button
                key={pill.label}
                className={`inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs font-medium ${pill.className}`}
              >
                {pill.label}
                <X className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

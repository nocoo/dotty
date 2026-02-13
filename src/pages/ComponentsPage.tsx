import {
  LayoutGrid,
  Loader2,
  SquarePen,
  Bell,
  BadgeCheck,
  MessageSquare,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  RectangleEllipsis,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { PageIntro } from "@/components/PageIntro";

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

export default function ComponentsPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="The UI kit that scales across products"
        description="A full control set with buttons, inputs, toggles, cards, and status components. Everything is styled to match Basalt tokens."
        eyebrow="Components"
        icon={RectangleEllipsis}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Buttons" icon={SquarePen}>
          <div className="flex flex-wrap gap-2">
            <button className="rounded-widget bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Primary</button>
            <button className="rounded-widget bg-secondary px-4 py-2 text-sm font-medium text-foreground">Secondary</button>
            <button className="rounded-widget border border-border bg-card px-4 py-2 text-sm font-medium text-foreground">Ghost</button>
            <button className="rounded-widget bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground">Destructive</button>
            <button className="rounded-widget bg-card px-4 py-2 text-sm font-medium text-muted-foreground">Disabled</button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="flex items-center gap-2 rounded-widget bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              <Sparkles className="h-4 w-4" strokeWidth={1.5} /> Generate
            </button>
            <button className="flex items-center gap-2 rounded-widget bg-secondary px-4 py-2 text-sm font-medium text-foreground">
              <Loader2 className="h-4 w-4 animate-spin" strokeWidth={1.5} /> Loading
            </button>
          </div>
        </Section>

        <Section title="Inputs" icon={LayoutGrid}>
          <div className="grid grid-cols-1 gap-3">
            <Input placeholder="Full name" className="rounded-widget border-border bg-card text-sm" />
            <Input placeholder="Email address" className="rounded-widget border-border bg-card text-sm" />
            <div className="relative">
              <Input placeholder="Search" className="rounded-widget border-border bg-card text-sm pr-10" />
              <ArrowRight className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
            </div>
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Toggles" icon={Bell}>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-widget bg-card p-3">
              <span className="text-sm text-foreground">Notifications</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-widget bg-card p-3">
              <span className="text-sm text-foreground">Auto sync</span>
              <Switch />
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Checkbox id="toggle-updates" defaultChecked />
            <label htmlFor="toggle-updates" className="text-sm text-muted-foreground cursor-pointer">
              Send weekly updates
            </label>
          </div>
        </Section>

        <Section title="Badges" icon={BadgeCheck}>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Active</span>
            <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">Blocked</span>
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-500">Pending</span>
            <span className="rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground">Neutral</span>
          </div>
        </Section>

        <Section title="Alerts" icon={AlertTriangle}>
          <div className="space-y-3">
            <div className="rounded-widget border border-border bg-card p-3">
              <p className="text-sm font-medium text-foreground">System maintenance</p>
              <p className="text-xs text-muted-foreground">Planned downtime on Feb 20, 2:00 AM UTC.</p>
            </div>
            <div className="rounded-widget border border-border bg-card p-3">
              <p className="text-sm font-medium text-foreground">Usage limit</p>
              <p className="text-xs text-muted-foreground">You are close to your monthly API cap.</p>
            </div>
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Cards" icon={MessageSquare}>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {["Design review", "Analytics sync", "Billing update", "Team invite"].map((title, i) => (
              <Card key={title} className="rounded-widget border-border bg-card shadow-none">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-foreground">{title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-xs text-muted-foreground">
                    {i % 2 === 0
                      ? "New tasks require your attention and approval."
                      : "Latest update is ready for launch and review."}
                  </p>
                  <button className="text-xs font-medium text-primary">Open</button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Section title="Metrics" icon={Sparkles}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Sessions", value: "24.2k", change: "+12%" },
              { label: "Conversion", value: "4.8%", change: "+0.6%" },
              { label: "Retention", value: "88%", change: "+3%" },
              { label: "Revenue", value: "$84k", change: "+9%" },
            ].map((item) => (
              <div key={item.label} className="rounded-widget border border-border bg-card p-3">
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-lg font-semibold text-foreground font-display">{item.value}</p>
                <span className="text-xs text-success">{item.change}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4 bg-border" />
          <div className="rounded-widget border border-border bg-card p-3">
            <p className="text-xs text-muted-foreground">Insights</p>
            <p className="text-sm text-foreground mt-1">Weekly active users increased across all regions.</p>
          </div>
        </Section>
      </div>
    </div>
  );
}

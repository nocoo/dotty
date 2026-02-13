import {
  Eye, Users, Tag, TrendingUp, TrendingDown,
  Clock, CheckCircle2, GitCommit, MessageSquare,
  Star, ArrowUpRight, Minus,
} from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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

const PEOPLE = [
  { name: "Alice Chen", email: "alice@example.com", initials: "AC", seed: "alice" },
  { name: "Bob Park", email: "bob@example.com", initials: "BP", seed: "bob" },
  { name: "Clara Diaz", email: "clara@example.com", initials: "CD", seed: "clara" },
  { name: "David Kim", email: "david@example.com", initials: "DK", seed: "david" },
  { name: "Eva Torres", email: "eva@example.com", initials: "ET", seed: "eva" },
  { name: "Frank Wu", email: "frank@example.com", initials: "FW", seed: "frank" },
];

const TIMELINE = [
  { icon: CheckCircle2, color: "text-emerald-500", title: "Deployment succeeded", desc: "v2.4.1 deployed to production", time: "2 min ago" },
  { icon: GitCommit, color: "text-blue-500", title: "Code merged", desc: "PR #142 merged into main", time: "15 min ago" },
  { icon: MessageSquare, color: "text-amber-500", title: "New comment", desc: "Alice left a review on PR #142", time: "1 hr ago" },
  { icon: Star, color: "text-purple-500", title: "Milestone reached", desc: "Sprint 8 completed — 24 stories", time: "3 hr ago" },
  { icon: ArrowUpRight, color: "text-primary", title: "Release published", desc: "v2.4.0 released to npm", time: "Yesterday" },
];

const KPI_DATA = [
  { label: "Revenue", value: "$48.2k", change: "+12.5%", trend: "up" as const },
  { label: "Users", value: "2,841", change: "+8.2%", trend: "up" as const },
  { label: "Bounce Rate", value: "24.3%", change: "-3.1%", trend: "down" as const },
  { label: "Avg. Session", value: "4m 32s", change: "0%", trend: "flat" as const },
];

export default function DataDisplayPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Data display and passive content"
        description="Avatars, badges, stat tiles, timelines, and list items for presenting data without user interaction."
        eyebrow="Data Display"
        icon={Eye}
      />

      {/* Avatars */}
      <Section title="Avatars" icon={Users}>
        <div className="space-y-4">
          {/* Sizes */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">sizes</p>
            <div className="flex items-end gap-3">
              {[
                { size: "h-6 w-6", text: "text-[9px]" },
                { size: "h-8 w-8", text: "text-[10px]" },
                { size: "h-10 w-10", text: "text-xs" },
                { size: "h-12 w-12", text: "text-sm" },
                { size: "h-14 w-14", text: "text-base" },
              ].map(({ size, text }, i) => (
                <Avatar key={i} className={size}>
                  <AvatarImage src={`https://avatar.vercel.sh/${PEOPLE[i].seed}`} alt={PEOPLE[i].name} />
                  <AvatarFallback className={text}>{PEOPLE[i].initials}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>

          {/* Fallbacks */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">fallbacks</p>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>ZL</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">AC</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">BP</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback className="bg-amber-500/20 text-amber-600 dark:text-amber-400">CD</AvatarFallback>
              </Avatar>
            </div>
          </div>

          {/* Avatar group / stack */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">stacked group</p>
            <div className="flex -space-x-2">
              {PEOPLE.slice(0, 5).map((p) => (
                <Avatar key={p.seed} className="h-9 w-9 border-2 border-background">
                  <AvatarImage src={`https://avatar.vercel.sh/${p.seed}`} alt={p.name} />
                  <AvatarFallback className="text-[10px]">{p.initials}</AvatarFallback>
                </Avatar>
              ))}
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-medium text-muted-foreground">
                +3
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges" icon={Tag}>
        <div className="space-y-4">
          {/* Variants */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">variants</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="destructive">Destructive</Badge>
              <Badge variant="outline">Outline</Badge>
            </div>
          </div>

          {/* Semantic colors */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">semantic</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="border-transparent bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">Active</Badge>
              <Badge className="border-transparent bg-amber-500/15 text-amber-600 dark:text-amber-400">Pending</Badge>
              <Badge className="border-transparent bg-red-500/15 text-red-600 dark:text-red-400">Failed</Badge>
              <Badge className="border-transparent bg-blue-500/15 text-blue-600 dark:text-blue-400">Info</Badge>
              <Badge className="border-transparent bg-purple-500/15 text-purple-600 dark:text-purple-400">Beta</Badge>
            </div>
          </div>

          {/* With dot indicator */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-mono">with dot</p>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Online
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> Away
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> Busy
              </Badge>
              <Badge variant="outline" className="gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" /> Offline
              </Badge>
            </div>
          </div>
        </div>
      </Section>

      {/* Stat Tiles / KPIs */}
      <Section title="Stat Tiles" icon={TrendingUp}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPI_DATA.map((kpi) => (
            <div key={kpi.label} className="rounded-widget border border-border bg-card p-4">
              <p className="text-xs text-muted-foreground mb-1">{kpi.label}</p>
              <p className="text-2xl font-semibold text-foreground">{kpi.value}</p>
              <div className="flex items-center gap-1 mt-2">
                {kpi.trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />}
                {kpi.trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-red-500" />}
                {kpi.trend === "flat" && <Minus className="h-3.5 w-3.5 text-muted-foreground" />}
                <span className={`text-xs font-medium ${kpi.trend === "up" ? "text-emerald-500" : kpi.trend === "down" ? "text-red-500" : "text-muted-foreground"}`}>
                  {kpi.change}
                </span>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Timeline / Activity Feed */}
      <Section title="Timeline" icon={Clock}>
        <div className="rounded-widget border border-border bg-card p-4">
          <div className="space-y-0">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-3">
                {/* Vertical line + icon */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-card border border-border ${item.color}`}>
                    <item.icon className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  {i < TIMELINE.length - 1 && <div className="w-px flex-1 bg-border" />}
                </div>
                {/* Content */}
                <div className={`pb-6 ${i === TIMELINE.length - 1 ? "pb-0" : ""}`}>
                  <p className="text-sm font-medium text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                  <p className="text-[11px] text-muted-foreground/70 mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* List Items with Actions */}
      <Section title="List Items" icon={Users}>
        <div className="rounded-widget border border-border bg-card divide-y divide-border">
          {PEOPLE.slice(0, 4).map((person) => (
            <div key={person.seed} className="flex items-center gap-3 px-4 py-3">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`https://avatar.vercel.sh/${person.seed}`} alt={person.name} />
                <AvatarFallback className="text-[10px]">{person.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{person.name}</p>
                <p className="text-xs text-muted-foreground truncate">{person.email}</p>
              </div>
              <Badge variant="outline" className="gap-1.5 shrink-0">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Active
              </Badge>
            </div>
          ))}
        </div>
      </Section>

      {/* Key-Value pairs */}
      <Section title="Key-Value Display" icon={Eye}>
        <div className="rounded-widget border border-border bg-card p-4">
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2">
            {[
              { key: "Status", value: "Active" },
              { key: "Plan", value: "Enterprise" },
              { key: "Created", value: "Jan 15, 2026" },
              { key: "Last login", value: "2 hours ago" },
              { key: "Region", value: "US East" },
              { key: "API calls", value: "1.2M / month" },
            ].map((item, i) => (
              <div key={item.key}>
                <div className="flex items-center justify-between py-2.5 px-1">
                  <span className="text-xs text-muted-foreground">{item.key}</span>
                  <span className="text-sm font-medium text-foreground">{item.value}</span>
                </div>
                {i < 5 && <Separator />}
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
}

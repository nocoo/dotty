import { Briefcase, ArrowRight, TrendingUp, Users } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

const stages = [
  { title: "Prospects", count: 18, value: "$320k" },
  { title: "Qualified", count: 12, value: "$210k" },
  { title: "Proposal", count: 7, value: "$160k" },
  { title: "Closed", count: 4, value: "$98k" },
];

const deals = [
  { name: "Nova Labs", stage: "Proposal", value: "$48k" },
  { name: "Atlas Works", stage: "Qualified", value: "$32k" },
  { name: "Solstice", stage: "Prospects", value: "$24k" },
  { name: "Echo Systems", stage: "Closed", value: "$18k" },
];

export default function CrmPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Pipeline overview for sales and CRM"
        description="Deal stages, value summaries, and rep performance for sales operations."
        eyebrow="CRM"
        icon={Briefcase}
      />
      <div className="rounded-card bg-secondary p-5">
        <p className="text-sm text-muted-foreground">Sales pipeline</p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          {stages.map((stage) => (
            <div key={stage.title} className="rounded-widget border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground">{stage.title}</p>
              <p className="text-lg font-semibold text-foreground font-display">{stage.count}</p>
              <p className="text-xs text-muted-foreground">{stage.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-card bg-secondary p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Active deals</p>
          </div>
          <div className="space-y-3">
            {deals.map((deal) => (
              <div key={deal.name} className="flex items-center justify-between rounded-widget border border-border bg-card p-3">
                <div>
                  <p className="text-sm text-foreground">{deal.name}</p>
                  <p className="text-xs text-muted-foreground">{deal.stage}</p>
                </div>
                <span className="text-sm font-medium text-foreground">{deal.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-card bg-secondary p-5">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Top reps</p>
          </div>
          <div className="space-y-3">
            {["Mina Park", "Ethan Cole", "Ava Reyes"].map((rep) => (
              <div key={rep} className="flex items-center justify-between rounded-widget bg-card p-3">
                <span className="text-sm text-foreground">{rep}</span>
                <button className="flex items-center gap-1 text-xs text-primary">
                  View <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { Activity, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

const services = [
  { name: "API", status: "Operational", color: "text-success" },
  { name: "Dashboard", status: "Operational", color: "text-success" },
  { name: "Design tokens", status: "Degraded", color: "text-amber-500" },
  { name: "Payments", status: "Operational", color: "text-success" },
];

const incidents = [
  { title: "Token sync delay", time: "Feb 10, 09:20 UTC", status: "Investigating" },
  { title: "Dashboard latency", time: "Feb 09, 18:45 UTC", status: "Resolved" },
];

export default function StatusPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Status page with incidents and service health"
        description="Operational readouts, incident history, and uptime communication."
        eyebrow="Status"
        icon={Activity}
        actions={
          <div className="flex items-center gap-2 rounded-widget bg-card px-3 py-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" strokeWidth={1.5} /> All systems operational
          </div>
        }
      />

      <div className="rounded-card bg-secondary p-5">
        <p className="text-sm text-muted-foreground mb-4">Services</p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.name} className="rounded-widget border border-border bg-card p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-foreground">{service.name}</p>
                <span className={`text-xs font-medium ${service.color}`}>{service.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-card bg-secondary p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">Recent incidents</p>
        </div>
        <div className="space-y-3">
          {incidents.map((incident) => (
            <div key={incident.title} className="rounded-widget border border-border bg-card p-3">
              <p className="text-sm text-foreground">{incident.title}</p>
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" strokeWidth={1.5} /> {incident.time}</span>
                <span>{incident.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

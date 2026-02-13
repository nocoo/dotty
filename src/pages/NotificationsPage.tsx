import { Bell, CheckCircle2, AlertTriangle, Info, XCircle, Settings } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { PageIntro } from "@/components/PageIntro";

const notifications = [
  {
    title: "New template release",
    desc: "Finance Core and AI Studio were added to the library.",
    time: "2m ago",
    type: "info",
  },
  {
    title: "Billing updated",
    desc: "Your subscription will renew on Feb 24.",
    time: "1h ago",
    type: "success",
  },
  {
    title: "Usage limit warning",
    desc: "You are at 85% of your API usage limit.",
    time: "Yesterday",
    type: "warning",
  },
  {
    title: "Payment failed",
    desc: "Please update your payment method.",
    time: "Feb 09",
    type: "error",
  },
];

const iconMap: Record<string, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

const colorMap: Record<string, string> = {
  info: "text-blue-500",
  success: "text-success",
  warning: "text-amber-500",
  error: "text-destructive",
};

export default function NotificationsPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Stay updated in real time"
        description="Showcase system alerts, product updates, and notifications with distinct status styling."
        eyebrow="Notifications"
        icon={Bell}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-card bg-secondary p-5 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Recent activity</p>
          </div>
          <div className="space-y-3">
            {notifications.map((note) => {
              const Icon = iconMap[note.type];
              return (
                <div key={note.title} className="rounded-widget border border-border bg-card p-3">
                  <div className="flex items-start gap-3">
                    <Icon className={`mt-0.5 h-4 w-4 ${colorMap[note.type]}`} strokeWidth={1.5} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{note.title}</p>
                      <p className="text-xs text-muted-foreground">{note.desc}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{note.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-card bg-secondary p-5">
          <div className="flex items-center gap-2 mb-4">
            <Settings className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Preferences</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Product updates", desc: "New templates and components" },
              { label: "Security alerts", desc: "Login and access notifications" },
              { label: "Billing reminders", desc: "Invoices and renewals" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between rounded-widget bg-card p-3">
                <div>
                  <p className="text-sm text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Switch defaultChecked />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

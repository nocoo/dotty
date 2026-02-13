import { SearchX, FolderOpen, MessageCircleOff, RefreshCcw, Zap, SquareDashed } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

const STATES = [
  {
    title: "No results",
    desc: "Try adjusting your filters or search term.",
    icon: SearchX,
    action: "Clear filters",
  },
  {
    title: "No files",
    desc: "Upload a file to get started with this workspace.",
    icon: FolderOpen,
    action: "Upload file",
  },
  {
    title: "No messages",
    desc: "Start a conversation with your team.",
    icon: MessageCircleOff,
    action: "New message",
  },
  {
    title: "Sync failed",
    desc: "We could not load the latest data.",
    icon: RefreshCcw,
    action: "Retry",
  },
];

export default function EmptyStatesPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Clear, helpful, and actionable"
        description="Empty states should set expectations, offer next steps, and keep the experience on brand."
        eyebrow="Empty States"
        icon={SquareDashed}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {STATES.map((state) => (
          <div key={state.title} className="rounded-card bg-secondary p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-card">
                <state.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{state.title}</p>
                <p className="text-xs text-muted-foreground">{state.desc}</p>
              </div>
            </div>
            <button className="mt-4 rounded-widget bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
              {state.action}
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-card bg-secondary p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-foreground">Blank dashboard</p>
            <p className="text-xs text-muted-foreground">Add your first widget to start tracking.</p>
          </div>
          <button className="rounded-widget bg-secondary px-3 py-2 text-xs font-medium text-foreground">Add widget</button>
        </div>
      </div>
    </div>
  );
}

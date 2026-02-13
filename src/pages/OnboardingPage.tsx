import { Sparkles, Check, ChevronRight, Mail, User, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageIntro } from "@/components/PageIntro";

const steps = [
  { title: "Create profile", desc: "Tell us about your team" },
  { title: "Connect tools", desc: "Sync data sources" },
  { title: "Launch workspace", desc: "Invite collaborators" },
];

export default function OnboardingPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Set up your workspace in minutes"
        description="Structured onboarding flow with multi-step progress, form inputs, and checklist guidance."
        eyebrow="Onboarding"
        icon={Sparkles}
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-card bg-secondary p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-foreground">Step 1: Create profile</p>
              <p className="text-xs text-muted-foreground">Estimated time: 2 min</p>
            </div>
            <span className="rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">In progress</span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="onboard-name" className="text-sm text-foreground">Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="onboard-name" placeholder="Alex Johnson" className="rounded-widget border-border bg-card pl-10 text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="onboard-email" className="text-sm text-foreground">Work email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="onboard-email" placeholder="alex@company.com" className="rounded-widget border-border bg-card pl-10 text-sm" />
              </div>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="onboard-role" className="text-sm text-foreground">Role</Label>
              <Input id="onboard-role" placeholder="Product Designer" className="rounded-widget border-border bg-card text-sm" />
            </div>
          </div>
          <button className="mt-5 rounded-widget bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
            Continue
          </button>
        </div>

        <div className="rounded-card bg-secondary p-5">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Checklist</p>
          </div>
          <div className="space-y-3">
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-widget border border-border bg-card p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-foreground">{step.title}</p>
                  {i === 0 ? (
                    <span className="text-xs text-success">Active</span>
                  ) : (
                    <Check className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-widget bg-card px-4 py-2 text-xs font-medium text-foreground">
            Next step <ChevronRight className="h-3.5 w-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

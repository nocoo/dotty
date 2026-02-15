import { User, Mail, Shield, MapPin, Upload, Check, FormInput } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

// ── View Helpers ──

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

// ── Page ──

export default function FormsPage() {
  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="rounded-[var(--radius-card)] bg-muted p-5 md:p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <FormInput className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Forms
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-display tracking-tight">
            Form layouts that feel premium
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Input clusters, validation states, and action blocks designed for conversion and clarity.
          </p>
        </div>
      </div>

      {/* Profile + Security row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Profile Form" icon={User}>
          <form className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="profile-first" className="text-sm text-foreground">First name</Label>
                <Input id="profile-first" placeholder="Alex" className="rounded-[var(--radius-widget)] border-border bg-card text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-last" className="text-sm text-foreground">Last name</Label>
                <Input id="profile-last" placeholder="Johnson" className="rounded-[var(--radius-widget)] border-border bg-card text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-email" className="text-sm text-foreground">Email</Label>
              <Input id="profile-email" placeholder="alex@dotty.app" className="rounded-[var(--radius-widget)] border-border bg-card text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile-location" className="text-sm text-foreground">Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="profile-location" placeholder="San Francisco, CA" className="rounded-[var(--radius-widget)] border-border bg-card pl-10 text-sm" />
              </div>
            </div>
            <button className="rounded-[var(--radius-widget)] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
              Save profile
            </button>
          </form>
        </Section>

        <Section title="Security" icon={Shield}>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="security-password" className="text-sm text-foreground">Password</Label>
              <Input id="security-password" type="password" placeholder="••••••••" className="rounded-[var(--radius-widget)] border-border bg-card text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="security-confirm" className="text-sm text-foreground">Confirm password</Label>
              <Input id="security-confirm" type="password" placeholder="••••••••" className="rounded-[var(--radius-widget)] border-border bg-card text-sm" />
            </div>
            <div className="flex items-center justify-between rounded-[var(--radius-widget)] bg-card border border-border p-3">
              <div>
                <p className="text-sm text-foreground">Two-factor authentication</p>
                <p className="text-xs text-muted-foreground">Add a layer of protection</p>
              </div>
              <Switch defaultChecked />
            </div>
            <button className="rounded-[var(--radius-widget)] bg-muted px-4 py-2.5 text-sm font-medium text-foreground border border-border">
              Update security
            </button>
          </form>
        </Section>
      </div>

      {/* Newsletter + File Upload + Success row */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Newsletter" icon={Mail}>
          <form className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="news-email" className="text-sm text-foreground">Email</Label>
              <Input id="news-email" placeholder="you@company.com" className="rounded-[var(--radius-widget)] border-border bg-card text-sm" />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="news-consent" />
              <label htmlFor="news-consent" className="text-xs text-muted-foreground cursor-pointer">
                I agree to receive product updates.
              </label>
            </div>
            <button className="rounded-[var(--radius-widget)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
              Subscribe
            </button>
          </form>
        </Section>

        <Section title="File Upload" icon={Upload}>
          <div className="rounded-[var(--radius-widget)] border border-dashed border-border bg-card p-4 text-center">
            <p className="text-sm text-foreground">Drop files here</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, or SVG up to 4MB</p>
            <button className="mt-3 rounded-[var(--radius-widget)] bg-muted px-3 py-2 text-xs font-medium text-foreground border border-border">
              Browse files
            </button>
          </div>
        </Section>

        <Section title="Success State" icon={Check}>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-4">
            <p className="text-sm font-medium text-foreground">Form submitted</p>
            <p className="text-xs text-muted-foreground">Your response has been recorded.</p>
            <Separator className="my-3 bg-border" />
            <button className="rounded-[var(--radius-widget)] bg-muted px-3 py-2 text-xs font-medium text-foreground border border-border">
              View details
            </button>
          </div>
        </Section>
      </div>
    </div>
  );
}

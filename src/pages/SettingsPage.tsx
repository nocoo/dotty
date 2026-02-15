import { useState } from "react";
import {
  User, Bell, Shield, Palette,
  Camera, Globe, CreditCard, Smartphone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// ── View Model ──

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

interface NotifToggleVM {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
}

const NOTIFICATION_TOGGLES: NotifToggleVM[] = [
  {
    id: "email",
    label: "Email notifications",
    description: "Receive transaction alerts via email",
    defaultOn: true,
  },
  {
    id: "push",
    label: "Push notifications",
    description: "Browser and mobile push alerts",
    defaultOn: true,
  },
  {
    id: "marketing",
    label: "Marketing emails",
    description: "Tips, product updates, and offers",
    defaultOn: false,
  },
  {
    id: "weekly",
    label: "Weekly digest",
    description: "Summary of your weekly spending",
    defaultOn: true,
  },
  {
    id: "security",
    label: "Security alerts",
    description: "Login attempts and password changes",
    defaultOn: true,
  },
];

interface SessionVM {
  device: string;
  location: string;
  current: boolean;
}

const ACTIVE_SESSIONS: SessionVM[] = [
  { device: "MacBook Pro — Chrome", location: "San Francisco, US", current: true },
  { device: "iPhone 15 — Safari", location: "San Francisco, US", current: false },
  { device: "Windows PC — Firefox", location: "New York, US", current: false },
];

const THEME_OPTIONS = ["Light", "Dark", "System"] as const;

// ── View — Section components ──

function ProfileSection() {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <User className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Profile Information
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5 space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <button
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
              aria-label="Change profile photo"
            >
              <Camera
                className="h-3 w-3"
                aria-hidden="true"
                strokeWidth={1.5}
              />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">alex@dotty.app</p>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Form fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label
              htmlFor="settings-first-name"
              className="text-sm text-foreground"
            >
              First name
            </Label>
            <Input
              id="settings-first-name"
              defaultValue="Alex"
              className="rounded-[var(--radius-widget)] border-border bg-secondary text-sm focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="settings-last-name"
              className="text-sm text-foreground"
            >
              Last name
            </Label>
            <Input
              id="settings-last-name"
              defaultValue="Johnson"
              className="rounded-[var(--radius-widget)] border-border bg-secondary text-sm focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="settings-email"
              className="text-sm text-foreground"
            >
              Email
            </Label>
            <Input
              id="settings-email"
              defaultValue="alex@dotty.app"
              type="email"
              className="rounded-[var(--radius-widget)] border-border bg-secondary text-sm focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="settings-phone"
              className="text-sm text-foreground"
            >
              Phone
            </Label>
            <Input
              id="settings-phone"
              defaultValue="+1 (555) 123-4567"
              type="tel"
              className="rounded-[var(--radius-widget)] border-border bg-secondary text-sm focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="settings-bio" className="text-sm text-foreground">
            Bio
          </Label>
          <textarea
            id="settings-bio"
            defaultValue="Product designer and financial enthusiast."
            rows={3}
            className="w-full rounded-[var(--radius-widget)] border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button className="rounded-[var(--radius-widget)] bg-secondary px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Cancel
          </button>
          <button className="rounded-[var(--radius-widget)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <Bell className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          Notification Preferences
        </p>
      </div>
      <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5 space-y-1">
        {NOTIFICATION_TOGGLES.map((item, i) => (
          <div key={item.id}>
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <label
                  htmlFor={`notif-${item.id}`}
                  className="text-sm text-foreground cursor-pointer"
                >
                  {item.label}
                </label>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <Switch
                id={`notif-${item.id}`}
                defaultChecked={item.defaultOn}
              />
            </div>
            {i < NOTIFICATION_TOGGLES.length - 1 && (
              <Separator className="bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SecuritySection() {
  return (
    <div className="space-y-4">
      {/* Password */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Password
          </p>
        </div>
        <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="settings-current-password"
              className="text-sm text-foreground"
            >
              Current password
            </Label>
            <Input
              id="settings-current-password"
              type="password"
              placeholder="••••••••"
              className="rounded-[var(--radius-widget)] border-border bg-secondary text-sm focus-visible:ring-primary"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="settings-new-password"
                className="text-sm text-foreground"
              >
                New password
              </Label>
              <Input
                id="settings-new-password"
                type="password"
                placeholder="••••••••"
                className="rounded-[var(--radius-widget)] border-border bg-secondary text-sm focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="settings-confirm-password"
                className="text-sm text-foreground"
              >
                Confirm new password
              </Label>
              <Input
                id="settings-confirm-password"
                type="password"
                placeholder="••••••••"
                className="rounded-[var(--radius-widget)] border-border bg-secondary text-sm focus-visible:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="rounded-[var(--radius-widget)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Update password
            </button>
          </div>
        </div>
      </div>

      {/* Two-factor */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          <Smartphone className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Two-Factor Authentication
          </p>
        </div>
        <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="2fa-authenticator"
                className="text-sm text-foreground cursor-pointer"
              >
                Authenticator app
              </label>
              <p className="text-xs text-muted-foreground">
                Add an extra layer of security with TOTP
              </p>
            </div>
            <Switch id="2fa-authenticator" />
          </div>
          <Separator className="my-4 bg-border" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="2fa-sms"
                className="text-sm text-foreground cursor-pointer"
              >
                SMS verification
              </label>
              <p className="text-xs text-muted-foreground">
                Receive codes via text message
              </p>
            </div>
            <Switch id="2fa-sms" defaultChecked />
          </div>
        </div>
      </div>

      {/* Active sessions */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          <Globe className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Active Sessions
          </p>
        </div>
        <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5 space-y-3">
          {ACTIVE_SESSIONS.map((session) => (
            <div
              key={session.device}
              className="flex items-center justify-between rounded-[var(--radius-widget)] border border-border bg-secondary p-3"
            >
              <div className="space-y-0.5">
                <p className="text-sm text-foreground">
                  {session.device}
                  {session.current && (
                    <span className="ml-2 rounded-[var(--radius-sm)] bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success">
                      Current
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.location}
                </p>
              </div>
              {!session.current && (
                <button className="text-xs text-destructive hover:text-destructive/80 transition-colors">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AppearanceSection() {
  return (
    <div className="space-y-4">
      {/* Theme */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          <Palette className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Theme
          </p>
        </div>
        <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
          <div
            className="grid grid-cols-3 gap-3"
            role="radiogroup"
            aria-label="Theme"
          >
            {THEME_OPTIONS.map((theme) => (
              <button
                key={theme}
                role="radio"
                aria-checked={theme === "Dark"}
                className={`flex flex-col items-center gap-2 rounded-[var(--radius-widget)] border p-4 transition-colors ${
                  theme === "Dark"
                    ? "border-primary bg-accent"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div
                  className={`h-10 w-full rounded-lg ${
                    theme === "Light"
                      ? "bg-white border border-gray-200"
                      : theme === "Dark"
                        ? "bg-[#171717]"
                        : "bg-gradient-to-r from-white to-[#171717]"
                  }`}
                />
                <span className="text-xs text-foreground">{theme}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preferences */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          <CreditCard className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Preferences
          </p>
        </div>
        <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="settings-currency"
                className="text-sm text-foreground cursor-pointer"
              >
                Currency
              </label>
              <p className="text-xs text-muted-foreground">
                Default display currency
              </p>
            </div>
            <select
              id="settings-currency"
              className="rounded-[var(--radius-widget)] border border-border bg-secondary px-3 py-1.5 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
            >
              <option>USD ($)</option>
              <option>EUR (&euro;)</option>
              <option>GBP (&pound;)</option>
              <option>JPY (&yen;)</option>
            </select>
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="settings-language"
                className="text-sm text-foreground cursor-pointer"
              >
                Language
              </label>
              <p className="text-xs text-muted-foreground">
                Interface language
              </p>
            </div>
            <select
              id="settings-language"
              className="rounded-[var(--radius-widget)] border border-border bg-secondary px-3 py-1.5 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
            >
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="settings-compact-mode"
                className="text-sm text-foreground cursor-pointer"
              >
                Compact mode
              </label>
              <p className="text-xs text-muted-foreground">
                Reduce spacing and card sizes
              </p>
            </div>
            <Switch id="settings-compact-mode" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page ──

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
      {/* Left nav */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-3 lg:col-span-1">
        <nav className="flex flex-row gap-1 lg:flex-col">
          {SECTIONS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveSection(id)}
              aria-label={label}
              className={`flex items-center gap-2 rounded-[var(--radius-widget)] px-3 py-2.5 text-sm transition-colors ${
                activeSection === id
                  ? "bg-card border border-border text-foreground font-medium"
                  : "text-muted-foreground hover:bg-card/50 hover:text-foreground"
              }`}
            >
              <Icon className="h-4 w-4" strokeWidth={1.5} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Right content */}
      <div className="lg:col-span-3">
        {activeSection === "profile" && <ProfileSection />}
        {activeSection === "notifications" && <NotificationsSection />}
        {activeSection === "security" && <SecuritySection />}
        {activeSection === "appearance" && <AppearanceSection />}
      </div>
    </div>
  );
}

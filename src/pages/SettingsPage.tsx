import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Camera,
  Globe,
  CreditCard,
  Smartphone,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// -- Settings sections nav --

const SECTIONS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

// -- Notification toggles --

interface NotifToggle {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
}

const NOTIFICATION_TOGGLES: NotifToggle[] = [
  { id: "email", label: "Email notifications", description: "Receive transaction alerts via email", defaultOn: true },
  { id: "push", label: "Push notifications", description: "Browser and mobile push alerts", defaultOn: true },
  { id: "marketing", label: "Marketing emails", description: "Tips, product updates, and offers", defaultOn: false },
  { id: "weekly", label: "Weekly digest", description: "Summary of your weekly spending", defaultOn: true },
  { id: "security", label: "Security alerts", description: "Login attempts and password changes", defaultOn: true },
];

// -- Component --

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  return (
    <>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {/* Left nav */}
        <Card className="rounded-card border-0 bg-secondary shadow-none lg:col-span-1">
          <CardContent className="p-3">
            <nav className="flex flex-row gap-1 lg:flex-col">
              {SECTIONS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  aria-label={label}
                  className={`flex items-center gap-2 rounded-widget px-3 py-2.5 text-sm transition-colors ${
                    activeSection === id
                      ? "bg-accent text-foreground font-medium"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </nav>
          </CardContent>
        </Card>

        {/* Right content */}
        <div className="lg:col-span-3">
          {activeSection === "profile" && <ProfileSection />}
          {activeSection === "notifications" && <NotificationsSection />}
          {activeSection === "security" && <SecuritySection />}
          {activeSection === "appearance" && <AppearanceSection />}
        </div>
      </div>
    </>
  );
}

// ── Profile ──

function ProfileSection() {
  return (
    <Card className="rounded-card border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">
            Profile Information
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <User className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <button className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:bg-primary/90" aria-label="Change profile photo">
              <Camera className="h-3 w-3" aria-hidden="true" strokeWidth={1.5} />
            </button>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">alex@basalt.app</p>
          </div>
        </div>

        <Separator className="bg-border" />

        {/* Form fields */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="settings-first-name" className="text-sm text-foreground">First name</Label>
            <Input
              id="settings-first-name"
              defaultValue="Alex"
              className="rounded-widget border-border bg-card text-sm focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-last-name" className="text-sm text-foreground">Last name</Label>
            <Input
              id="settings-last-name"
              defaultValue="Johnson"
              className="rounded-widget border-border bg-card text-sm focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-email" className="text-sm text-foreground">Email</Label>
            <Input
              id="settings-email"
              defaultValue="alex@basalt.app"
              type="email"
              className="rounded-widget border-border bg-card text-sm focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="settings-phone" className="text-sm text-foreground">Phone</Label>
            <Input
              id="settings-phone"
              defaultValue="+1 (555) 123-4567"
              type="tel"
              className="rounded-widget border-border bg-card text-sm focus-visible:ring-primary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="settings-bio" className="text-sm text-foreground">Bio</Label>
          <textarea
            id="settings-bio"
            defaultValue="Product designer and financial enthusiast."
            rows={3}
            className="w-full rounded-widget border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button className="rounded-widget bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Cancel
          </button>
          <button className="rounded-widget bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            Save changes
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

// ── Notifications ──

function NotificationsSection() {
  return (
    <Card className="rounded-card border-0 bg-secondary shadow-none">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <CardTitle className="text-sm font-normal text-muted-foreground">
            Notification Preferences
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {NOTIFICATION_TOGGLES.map((item, i) => (
          <div key={item.id}>
            <div className="flex items-center justify-between py-3">
              <div className="space-y-0.5">
                <label htmlFor={`notif-${item.id}`} className="text-sm text-foreground cursor-pointer">{item.label}</label>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Switch id={`notif-${item.id}`} defaultChecked={item.defaultOn} />
            </div>
            {i < NOTIFICATION_TOGGLES.length - 1 && <Separator className="bg-border" />}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

// ── Security ──

function SecuritySection() {
  return (
    <div className="space-y-4">
      {/* Password */}
      <Card className="rounded-card border-0 bg-secondary shadow-none">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Password
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="settings-current-password" className="text-sm text-foreground">Current password</Label>
            <Input
              id="settings-current-password"
              type="password"
              placeholder="••••••••"
              className="rounded-widget border-border bg-card text-sm focus-visible:ring-primary"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="settings-new-password" className="text-sm text-foreground">New password</Label>
              <Input
                id="settings-new-password"
                type="password"
                placeholder="••••••••"
                className="rounded-widget border-border bg-card text-sm focus-visible:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="settings-confirm-password" className="text-sm text-foreground">Confirm new password</Label>
              <Input
                id="settings-confirm-password"
                type="password"
                placeholder="••••••••"
                className="rounded-widget border-border bg-card text-sm focus-visible:ring-primary"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button className="rounded-widget bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
              Update password
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Two-factor */}
      <Card className="rounded-card border-0 bg-secondary shadow-none">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Two-Factor Authentication
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="2fa-authenticator" className="text-sm text-foreground cursor-pointer">Authenticator app</label>
              <p className="text-xs text-muted-foreground">
                Add an extra layer of security with TOTP
              </p>
            </div>
            <Switch id="2fa-authenticator" />
          </div>
          <Separator className="my-4 bg-border" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="2fa-sms" className="text-sm text-foreground cursor-pointer">SMS verification</label>
              <p className="text-xs text-muted-foreground">
                Receive codes via text message
              </p>
            </div>
            <Switch id="2fa-sms" defaultChecked />
          </div>
        </CardContent>
      </Card>

      {/* Active sessions */}
      <Card className="rounded-card border-0 bg-secondary shadow-none">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Active Sessions
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { device: "MacBook Pro — Chrome", location: "San Francisco, US", current: true },
            { device: "iPhone 15 — Safari", location: "San Francisco, US", current: false },
            { device: "Windows PC — Firefox", location: "New York, US", current: false },
          ].map((session) => (
            <div key={session.device} className="flex items-center justify-between rounded-widget border border-border p-3">
              <div className="space-y-0.5">
                <p className="text-sm text-foreground">
                  {session.device}
                  {session.current && (
                    <span className="ml-2 rounded-sm bg-success/10 px-1.5 py-0.5 text-xs font-medium text-success">
                      Current
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{session.location}</p>
              </div>
              {!session.current && (
                <button className="text-xs text-destructive hover:text-destructive/80 transition-colors">
                  Revoke
                </button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

// ── Appearance ──

function AppearanceSection() {
  return (
    <div className="space-y-4">
      {/* Theme */}
      <Card className="rounded-card border-0 bg-secondary shadow-none">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Theme
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            {(["Light", "Dark", "System"] as const).map((theme) => (
              <button
                key={theme}
                className={`flex flex-col items-center gap-2 rounded-widget border p-4 transition-colors ${
                  theme === "Dark"
                    ? "border-primary bg-accent"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div className={`h-10 w-full rounded-lg ${
                  theme === "Light"
                    ? "bg-white border border-gray-200"
                    : theme === "Dark"
                    ? "bg-[#171717]"
                    : "bg-gradient-to-r from-white to-[#171717]"
                }`} />
                <span className="text-xs text-foreground">{theme}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Currency & language */}
      <Card className="rounded-card border-0 bg-secondary shadow-none">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <CardTitle className="text-sm font-normal text-muted-foreground">
              Preferences
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="settings-currency" className="text-sm text-foreground cursor-pointer">Currency</label>
              <p className="text-xs text-muted-foreground">Default display currency</p>
            </div>
            <select id="settings-currency" className="rounded-widget border border-border bg-card px-3 py-1.5 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary">
              <option>USD ($)</option>
              <option>EUR (&euro;)</option>
              <option>GBP (&pound;)</option>
              <option>JPY (&yen;)</option>
            </select>
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="settings-language" className="text-sm text-foreground cursor-pointer">Language</label>
              <p className="text-xs text-muted-foreground">Interface language</p>
            </div>
            <select id="settings-language" className="rounded-widget border border-border bg-card px-3 py-1.5 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>German</option>
            </select>
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label htmlFor="settings-compact-mode" className="text-sm text-foreground cursor-pointer">Compact mode</label>
              <p className="text-xs text-muted-foreground">Reduce spacing and card sizes</p>
            </div>
            <Switch id="settings-compact-mode" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

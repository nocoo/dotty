import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  User, Bell, Shield, Palette,
  Camera, Globe, CreditCard, Smartphone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// ── View Model ──

type SectionId = "profile" | "notifications" | "security" | "appearance";

interface NotifToggleVM {
  id: string;
  labelKey: string;
  descKey: string;
  defaultOn: boolean;
}

const NOTIFICATION_TOGGLES: NotifToggleVM[] = [
  {
    id: "email",
    labelKey: "pages.settings.emailNotifications",
    descKey: "pages.settings.emailNotificationsDesc",
    defaultOn: true,
  },
  {
    id: "push",
    labelKey: "pages.settings.pushNotifications",
    descKey: "pages.settings.pushNotificationsDesc",
    defaultOn: true,
  },
  {
    id: "marketing",
    labelKey: "pages.settings.marketingEmails",
    descKey: "pages.settings.marketingEmailsDesc",
    defaultOn: false,
  },
  {
    id: "weekly",
    labelKey: "pages.settings.weeklyDigest",
    descKey: "pages.settings.weeklyDigestDesc",
    defaultOn: true,
  },
  {
    id: "security",
    labelKey: "pages.settings.securityAlerts",
    descKey: "pages.settings.securityAlertsDesc",
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

// ── View — Section components ──

function ProfileSection() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <User className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("pages.settings.profileInfo")}
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
              aria-label={t("pages.settings.changePhoto")}
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
              {t("pages.settings.firstName")}
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
              {t("pages.settings.lastName")}
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
              {t("common.email")}
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
              {t("pages.settings.phone")}
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
            {t("pages.settings.bio")}
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
            {t("common.cancel")}
          </button>
          <button className="rounded-[var(--radius-widget)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
            {t("common.save")}
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const { t } = useTranslation();

  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
      <div className="flex items-center gap-2 px-5 pt-4 pb-3">
        <Bell className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {t("pages.settings.notificationPrefs")}
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
                  {t(item.labelKey)}
                </label>
                <p className="text-xs text-muted-foreground">
                  {t(item.descKey)}
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
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Password */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          <Shield className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("pages.settings.passwordTitle")}
          </p>
        </div>
        <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5 space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="settings-current-password"
              className="text-sm text-foreground"
            >
              {t("pages.settings.currentPassword")}
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
                {t("pages.settings.newPassword")}
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
                {t("pages.settings.confirmPassword")}
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
              {t("pages.settings.updatePassword")}
            </button>
          </div>
        </div>
      </div>

      {/* Two-factor */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          <Smartphone className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("pages.settings.twoFactor")}
          </p>
        </div>
        <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="2fa-authenticator"
                className="text-sm text-foreground cursor-pointer"
              >
                {t("pages.settings.authenticatorApp")}
              </label>
              <p className="text-xs text-muted-foreground">
                {t("pages.settings.authenticatorDesc")}
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
                {t("pages.settings.smsVerification")}
              </label>
              <p className="text-xs text-muted-foreground">
                {t("pages.settings.smsDesc")}
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
            {t("pages.settings.activeSessions")}
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
                      {t("common.currentBadge")}
                    </span>
                  )}
                </p>
                <p className="text-xs text-muted-foreground">
                  {session.location}
                </p>
              </div>
              {!session.current && (
                <button className="text-xs text-destructive hover:text-destructive/80 transition-colors">
                  {t("common.revoke")}
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
  const { t } = useTranslation();

  const THEME_OPTIONS = [
    { key: "light", label: t("pages.settings.light") },
    { key: "dark", label: t("pages.settings.dark") },
    { key: "system", label: t("pages.settings.systemTheme") },
  ] as const;

  return (
    <div className="space-y-4">
      {/* Theme */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted">
        <div className="flex items-center gap-2 px-5 pt-4 pb-3">
          <Palette className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {t("pages.settings.themeTitle")}
          </p>
        </div>
        <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5">
          <div
            className="grid grid-cols-3 gap-3"
            role="radiogroup"
            aria-label={t("pages.settings.themeTitle")}
          >
            {THEME_OPTIONS.map((theme) => (
              <button
                key={theme.key}
                role="radio"
                aria-checked={theme.key === "dark"}
                className={`flex flex-col items-center gap-2 rounded-[var(--radius-widget)] border p-4 transition-colors ${
                  theme.key === "dark"
                    ? "border-primary bg-accent"
                    : "border-border hover:border-primary/50 hover:bg-accent/50"
                }`}
              >
                <div
                  className={`h-10 w-full rounded-lg ${
                    theme.key === "light"
                      ? "bg-white border border-gray-200"
                      : theme.key === "dark"
                        ? "bg-[#171717]"
                        : "bg-gradient-to-r from-white to-[#171717]"
                  }`}
                />
                <span className="text-xs text-foreground">{theme.label}</span>
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
            {t("pages.settings.preferences")}
          </p>
        </div>
        <div className="flex-1 rounded-[var(--radius-card)] bg-card border border-border p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="settings-currency"
                className="text-sm text-foreground cursor-pointer"
              >
                {t("pages.settings.currency")}
              </label>
              <p className="text-xs text-muted-foreground">
                {t("pages.settings.currencyDesc")}
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
                {t("pages.settings.interfaceLanguage")}
              </label>
              <p className="text-xs text-muted-foreground">
                {t("pages.settings.interfaceLanguageDesc")}
              </p>
            </div>
            <select
              id="settings-language"
              className="rounded-[var(--radius-widget)] border border-border bg-secondary px-3 py-1.5 text-sm text-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
            >
              <option>{t("pages.settings.english")}</option>
              <option>{t("pages.settings.spanish")}</option>
              <option>{t("pages.settings.french")}</option>
              <option>{t("pages.settings.german")}</option>
            </select>
          </div>
          <Separator className="bg-border" />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="settings-compact-mode"
                className="text-sm text-foreground cursor-pointer"
              >
                {t("pages.settings.compactMode")}
              </label>
              <p className="text-xs text-muted-foreground">
                {t("pages.settings.compactModeDesc")}
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
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState<SectionId>("profile");

  const SECTIONS = [
    { id: "profile" as const, label: t("pages.settings.profile"), icon: User },
    { id: "notifications" as const, label: t("pages.settings.notifications"), icon: Bell },
    { id: "security" as const, label: t("pages.settings.security"), icon: Shield },
    { id: "appearance" as const, label: t("pages.settings.appearance"), icon: Palette },
  ];

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

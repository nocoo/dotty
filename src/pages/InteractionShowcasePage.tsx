import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  Bell, MessageSquare, AlertTriangle, Info, CheckCircle2,
  XCircle, Layers,
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
  DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useInteractionShowcaseViewModel } from "@/viewmodels/useInteractionShowcaseViewModel";
import type { ToastVariant } from "@/models/types";

// ── Variant → icon mapping ──

const VARIANT_ICON: Record<ToastVariant, React.ElementType> = {
  default: Bell,
  success: CheckCircle2,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

// Dotty monochrome: only success gets chromatic accent, all others use foreground
const VARIANT_STYLE: Record<ToastVariant, string> = {
  default: "text-foreground",
  success: "text-success",
  error: "text-foreground",
  warning: "text-foreground",
  info: "text-foreground",
};

// ── Section wrapper ──

function Section({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

// ── Toast section ──

function ToastSection() {
  const { t } = useTranslation();
  const { toasts } = useInteractionShowcaseViewModel();

  const fireToast = (variant: ToastVariant, title: string, description: string) => {
    switch (variant) {
      case "success":
        toast.success(title, { description });
        break;
      case "error":
        toast.error(title, { description });
        break;
      case "warning":
        toast.warning(title, { description });
        break;
      case "info":
        toast.info(title, { description });
        break;
      default:
        toast(title, { description });
    }
  };

  return (
    <Section title={t("pages.interactionShowcase.toastNotifications")} icon={Bell}>
      <p className="text-xs text-muted-foreground mb-4">
        {t("pages.interactionShowcase.toastDesc")}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {toasts.map((t) => {
          const Icon = VARIANT_ICON[t.variant];
          const colorClass = VARIANT_STYLE[t.variant];
          return (
            <button
              key={t.id}
              onClick={() => fireToast(t.variant, t.title, t.description)}
              className="flex items-start gap-3 rounded-[var(--radius-widget)] border border-border bg-card p-3 text-left transition-colors hover:bg-accent/50"
            >
              <Icon className={`h-4 w-4 mt-0.5 shrink-0 ${colorClass}`} strokeWidth={1.5} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">{t.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                  {t.description}
                </p>
                <span className="mt-1.5 inline-block rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                  {t.variantLabel}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </Section>
  );
}

// ── Dialog section ──

function DialogSection() {
  const { t } = useTranslation();
  const { dialogs, activeDialog, openDialog, closeDialog, getDialogById } =
    useInteractionShowcaseViewModel();

  const current = activeDialog ? getDialogById(activeDialog) : undefined;

  const styleLabels: Record<string, string> = {
    info: t("pages.interactionShowcase.informational"),
    form: t("pages.interactionShowcase.formInput"),
    confirm: t("pages.interactive.destructive"),
  };

  return (
    <Section title={t("pages.interactionShowcase.dialogs")} icon={MessageSquare}>
      <p className="text-xs text-muted-foreground mb-4">
        {t("pages.interactionShowcase.dialogDesc")}
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {dialogs.map((d) => {
          const styleLabel = styleLabels[d.style] ?? d.style;
          return (
            <button
              key={d.id}
              onClick={() => openDialog(d.id)}
              className="flex flex-col items-start gap-2 rounded-[var(--radius-widget)] border border-border bg-card p-3 text-left transition-colors hover:bg-accent/50"
            >
              <p className="text-sm font-medium text-foreground">{d.title}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">{d.description}</p>
              <span className="mt-auto rounded-sm bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                {styleLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Render active dialog */}
      <Dialog open={!!current} onOpenChange={(open) => !open && closeDialog()}>
        {current?.style === "info" && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{current.title}</DialogTitle>
              <DialogDescription>{current.description}</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <button className="rounded-[var(--radius-widget)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                  {t("pages.interactionShowcase.gotIt")}
                </button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}

        {current?.style === "form" && <FormDialogContent onClose={closeDialog} title={current.title} description={current.description} />}

        {current?.style === "confirm" && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{current.title}</DialogTitle>
              <DialogDescription>{current.description}</DialogDescription>
            </DialogHeader>
            <Separator className="bg-border" />
            <DialogFooter className="gap-2 sm:gap-0">
              <DialogClose asChild>
                <button className="rounded-[var(--radius-widget)] bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                  {t("common.cancel")}
                </button>
              </DialogClose>
              <button
                onClick={() => {
                  closeDialog();
                  toast.error(t("pages.interactionShowcase.accountDeleted"), { description: t("pages.interactionShowcase.accountDeletedDesc") });
                }}
                className="rounded-[var(--radius-widget)] bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground transition-colors hover:bg-destructive/90"
              >
                {t("common.delete")}
              </button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </Section>
  );
}

function FormDialogContent({
  onClose,
  title,
  description,
}: {
  onClose: () => void;
  title: string;
  description: string;
}) {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    onClose();
    toast.success(t("pages.interactionShowcase.feedbackSent"), { description: t("pages.interactionShowcase.feedbackSentDesc") });
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {!submitted && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedback-name" className="text-sm text-foreground">{t("pages.interactionShowcase.yourName")}</Label>
            <Input
              id="feedback-name"
              placeholder={t("pages.interactionShowcase.yourNamePlaceholder")}
              className="rounded-[var(--radius-widget)] border-border bg-card text-sm focus-visible:ring-primary"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feedback-message" className="text-sm text-foreground">{t("pages.interactionShowcase.message")}</Label>
            <textarea
              id="feedback-message"
              rows={3}
              placeholder={t("pages.interactionShowcase.messagePlaceholder")}
              className="w-full rounded-[var(--radius-widget)] border border-border bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-primary"
            />
          </div>
          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <button
                type="button"
                className="rounded-[var(--radius-widget)] bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("common.cancel")}
              </button>
            </DialogClose>
            <button
              type="submit"
              className="rounded-[var(--radius-widget)] bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("common.submit")}
            </button>
          </DialogFooter>
        </form>
      )}
    </DialogContent>
  );
}

// ── Page ──

export default function InteractionShowcasePage() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">{t("nav.interactions")}</p>
        <div className="flex items-center gap-2 mb-1">
          <Layers className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          <h1 className="text-lg font-semibold text-foreground font-display">{t("pages.interactionShowcase.overview")}</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          {t("pages.interactionShowcase.overviewDesc")}
        </p>
      </div>

      <ToastSection />
      <DialogSection />
    </div>
  );
}

import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MousePointerClick, Loader2, Plus, Trash2,
  ChevronDown, Copy, Check,
  Bell, AlertTriangle, CheckCircle2, Info, XCircle,
  Inbox, Search, RefreshCw,
  PanelRight, PanelLeft, PanelBottom,
  MessageSquare, Filter, User,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog, DialogContent, DialogDescription,
  DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Sheet, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle, SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

// ── View Model ──

const ALERT_STYLES = {
  info:    { icon: Info,          border: "border-chart-4/30", bg: "bg-chart-4/10", text: "text-chart-2" },
  success: { icon: CheckCircle2,  border: "border-success/30", bg: "bg-success/10", text: "text-success" },
  warning: { icon: AlertTriangle, border: "border-chart-3/30", bg: "bg-chart-3/10", text: "text-chart-2" },
  error:   { icon: XCircle,       border: "border-chart-1/30", bg: "bg-chart-1/10", text: "text-chart-1" },
} as const;

// ── View Helpers ──

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
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

function InlineAlert({ variant, title, message }: { variant: keyof typeof ALERT_STYLES; title: string; message: string }) {
  const s = ALERT_STYLES[variant];
  return (
    <div className={`flex items-start gap-3 rounded-[var(--radius-widget)] border ${s.border} ${s.bg} p-4`}>
      <s.icon className={`h-5 w-5 shrink-0 mt-0.5 ${s.text}`} strokeWidth={1.5} />
      <div className="space-y-1">
        <p className={`text-sm font-medium ${s.text}`}>{title}</p>
        <p className="text-xs text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />;
}

function SkeletonCard() {
  return (
    <div className="rounded-[var(--radius-widget)] border border-border bg-card p-4 space-y-3">
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-4/5" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 w-20 rounded-md" />
        <Skeleton className="h-8 w-16 rounded-md" />
      </div>
    </div>
  );
}

function LoadingButton() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? t("pages.interactive.processing") : t("common.submit")}
    </Button>
  );
}

function CopyButton() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? <Check className="mr-2 h-3.5 w-3.5" /> : <Copy className="mr-2 h-3.5 w-3.5" />}
      {copied ? t("common.copied") : t("common.copy")}
    </Button>
  );
}

// ── Page ──

export default function InteractivePage() {
  const { t } = useTranslation();
  const [collapsible1, setCollapsible1] = useState(false);
  const [collapsible2, setCollapsible2] = useState(false);

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="h-full flex flex-col rounded-[var(--radius-card)] bg-muted p-5 md:p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MousePointerClick className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {t("pages.interactive.eyebrow")}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-display tracking-tight">
            {t("pages.interactive.title")}
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            {t("pages.interactive.description")}
          </p>
        </div>
      </div>

      <Section title={t("pages.interactive.buttonVariants")} icon={MousePointerClick}>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">{t("pages.interactive.default")}</Button>
          <Button variant="secondary">{t("pages.interactive.secondary")}</Button>
          <Button variant="destructive">{t("pages.interactive.destructive")}</Button>
          <Button variant="outline">{t("pages.interactive.outline")}</Button>
          <Button variant="ghost">{t("pages.interactive.ghost")}</Button>
          <Button variant="link">{t("pages.interactive.link")}</Button>
        </div>
      </Section>

      <Section title={t("pages.interactive.buttonSizes")} icon={MousePointerClick}>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="sm">{t("pages.interactive.small")}</Button>
          <Button size="default">{t("pages.interactive.default")}</Button>
          <Button size="lg">{t("pages.interactive.large")}</Button>
          <Button size="icon" aria-label="Add"><Plus className="h-4 w-4" /></Button>
        </div>
      </Section>

      <Section title={t("pages.interactive.buttonStates")} icon={MousePointerClick}>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>{t("pages.interactive.disabled")}</Button>
          <LoadingButton />
          <CopyButton />
        </div>
      </Section>

      <Section title={t("pages.interactive.toastNotifications")} icon={Bell}>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={() => toast.success(t("pages.interactive.toastSuccess"))}>
            <CheckCircle2 className="mr-2 h-3.5 w-3.5" /> {t("pages.interactive.success")}
          </Button>
          <Button size="sm" variant="destructive" onClick={() => toast.error(t("pages.interactive.toastError"))}>
            <XCircle className="mr-2 h-3.5 w-3.5" /> {t("pages.interactive.error")}
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast.warning(t("pages.interactive.toastWarning"))}>
            <AlertTriangle className="mr-2 h-3.5 w-3.5" /> {t("pages.interactive.warning")}
          </Button>
          <Button size="sm" variant="secondary" onClick={() => toast.info(t("pages.interactive.toastInfo"))}>
            <Info className="mr-2 h-3.5 w-3.5" /> {t("pages.interactive.info")}
          </Button>
        </div>
      </Section>

      <Section title={t("pages.interactive.inlineAlerts")} icon={AlertTriangle}>
        <div className="space-y-3">
          <InlineAlert variant="info" title={t("pages.interactive.alertUpdateTitle")} message={t("pages.interactive.alertUpdateDesc")} />
          <InlineAlert variant="success" title={t("pages.interactive.alertPaymentTitle")} message={t("pages.interactive.alertPaymentDesc")} />
          <InlineAlert variant="warning" title={t("pages.interactive.alertStorageTitle")} message={t("pages.interactive.alertStorageDesc")} />
          <InlineAlert variant="error" title={t("pages.interactive.alertConnectionTitle")} message={t("pages.interactive.alertConnectionDesc")} />
        </div>
      </Section>

      <Section title={t("pages.interactive.skeletonLoaders")} icon={Loader2}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Section>

      <Section title={t("pages.interactive.progressIndicators")} icon={Loader2}>
        <div className="space-y-4 max-w-md">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{t("pages.interactive.uploading")}</span><span className="font-mono-num">60%</span>
            </div>
            <Progress value={60} />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{t("pages.interactive.loading")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-foreground">{t("pages.interactive.progressProcessing")}</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title={t("pages.interactive.emptyStates")} icon={Inbox}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-8 flex flex-col items-center text-center">
            <Inbox className="h-10 w-10 text-muted-foreground/50 mb-3" strokeWidth={1} />
            <p className="text-sm font-medium text-foreground mb-1">{t("pages.interactive.noDataYet")}</p>
            <p className="text-xs text-muted-foreground mb-4">{t("pages.interactive.createFirstRecord")}</p>
            <Button size="sm">{t("pages.interactive.createRecord")}</Button>
          </div>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-8 flex flex-col items-center text-center">
            <Search className="h-10 w-10 text-muted-foreground/50 mb-3" strokeWidth={1} />
            <p className="text-sm font-medium text-foreground mb-1">{t("pages.interactive.noResultsFound")}</p>
            <p className="text-xs text-muted-foreground mb-4">{t("pages.interactive.tryAdjusting")}</p>
            <Button size="sm" variant="outline">{t("pages.interactive.clearFilters")}</Button>
          </div>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-8 flex flex-col items-center text-center">
            <XCircle className="h-10 w-10 text-muted-foreground/50 mb-3" strokeWidth={1} />
            <p className="text-sm font-medium text-foreground mb-1">{t("pages.interactive.somethingWentWrong")}</p>
            <p className="text-xs text-muted-foreground mb-4">{t("pages.interactive.pleaseTryAgain")}</p>
            <Button size="sm" variant="outline"><RefreshCw className="mr-2 h-3.5 w-3.5" /> {t("common.retry")}</Button>
          </div>
        </div>
      </Section>

      <Section title={t("pages.interactive.sheetDrawer")} icon={PanelRight}>
        <div className="flex flex-wrap gap-3">
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="sm"><PanelRight className="mr-2 h-3.5 w-3.5" /> {t("pages.interactive.sheetRight")}</Button></SheetTrigger>
            <SheetContent side="right">
              <SheetHeader><SheetTitle>{t("pages.interactive.detailPanel")}</SheetTitle><SheetDescription>{t("pages.interactive.viewEditDetails")}</SheetDescription></SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="space-y-2"><Label>{t("pages.interactive.nameLabel")}</Label><Input defaultValue={t("pages.interactive.nameValue")} /></div>
                <div className="space-y-2"><Label>{t("pages.interactive.emailLabel")}</Label><Input defaultValue={t("pages.interactive.emailValue")} /></div>
              </div>
              <SheetFooter className="mt-6"><Button size="sm">{t("common.save")}</Button></SheetFooter>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="sm"><PanelLeft className="mr-2 h-3.5 w-3.5" /> {t("pages.interactive.sheetLeft")}</Button></SheetTrigger>
            <SheetContent side="left">
              <SheetHeader><SheetTitle>{t("pages.interactive.filters")}</SheetTitle><SheetDescription>{t("pages.interactive.narrowDownResults")}</SheetDescription></SheetHeader>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="sm"><PanelBottom className="mr-2 h-3.5 w-3.5" /> {t("pages.interactive.sheetBottom")}</Button></SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader><SheetTitle>{t("pages.interactive.quickActions")}</SheetTitle></SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </Section>

      <Section title={t("pages.interactive.dialogs")} icon={MessageSquare}>
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline" size="sm">{t("pages.interactive.basicDialog")}</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>{t("pages.interactive.editProfile")}</DialogTitle><DialogDescription>{t("pages.interactive.editProfileDesc")}</DialogDescription></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2"><Label>{t("pages.interactive.displayName")}</Label><Input defaultValue={t("pages.interactive.displayNameValue")} /></div>
              </div>
              <DialogFooter><Button size="sm">{t("common.save")}</Button></DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="destructive" size="sm">{t("pages.interactive.deleteItem")}</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader><AlertDialogTitle>{t("pages.interactive.areYouSure")}</AlertDialogTitle><AlertDialogDescription>{t("pages.interactive.cannotBeUndone")}</AlertDialogDescription></AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">{t("common.delete")}</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Section>

      <Section title={t("pages.interactive.popovers")} icon={Filter}>
        <div className="flex flex-wrap gap-3">
          <Popover>
            <PopoverTrigger asChild><Button variant="outline" size="sm"><Filter className="mr-2 h-3.5 w-3.5" /> {t("common.filter")}</Button></PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-3">
                <p className="text-sm font-medium">{t("pages.interactive.filterBy")}</p>
                <div className="space-y-2"><Label className="text-xs">{t("pages.interactive.statusLabel")}</Label><Input placeholder={t("pages.interactive.statusPlaceholder")} className="h-8 text-xs" /></div>
                <Separator />
                <div className="flex justify-end gap-2"><Button size="sm">{t("common.apply")}</Button></div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild><Button variant="outline" size="sm"><User className="mr-2 h-3.5 w-3.5" /> {t("pages.interactive.profileLabel")}</Button></PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium">{t("pages.interactive.profileInitials")}</div>
                <div><p className="text-sm font-medium">{t("pages.interactive.profileName")}</p><p className="text-xs text-muted-foreground">{t("pages.interactive.profileEmail")}</p></div>
              </div>
              <Separator className="my-3" />
              <div className="space-y-1">
                {[t("pages.interactive.profileSettings"), t("pages.interactive.billing"), t("common.signOut")].map((item) => (
                  <button key={item} className="flex w-full items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">{item}</button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Section>

      <Section title={t("pages.interactive.collapsibleSections")} icon={ChevronDown}>
        <div className="space-y-3">
          <Collapsible open={collapsible1} onOpenChange={setCollapsible1}>
            <div className="rounded-[var(--radius-widget)] border border-border bg-card">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                <span className="text-sm font-medium text-foreground">{t("pages.interactive.advancedOptions")}</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${collapsible1 ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border p-4 space-y-3">
                  <div className="flex items-center justify-between"><span className="text-sm">{t("pages.interactive.enableCaching")}</span><Switch /></div>
                  <div className="flex items-center justify-between"><span className="text-sm">{t("pages.interactive.debugMode")}</span><Switch /></div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible open={collapsible2} onOpenChange={setCollapsible2}>
            <div className="rounded-[var(--radius-widget)] border border-border bg-card">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                <span className="text-sm font-medium text-foreground">{t("pages.interactive.dangerZone")}</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${collapsible2 ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border p-4">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium text-foreground">{t("pages.interactive.deleteWorkspace")}</p><p className="text-xs text-muted-foreground">{t("pages.interactive.permanentlyRemoveData")}</p></div>
                    <Button variant="destructive" size="sm">{t("common.delete")}</Button>
                  </div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        </div>
      </Section>
    </div>
  );
}

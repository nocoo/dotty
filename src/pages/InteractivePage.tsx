import { useState } from "react";
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
    <div className="rounded-[var(--radius-card)] bg-secondary p-4 md:p-5">
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
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <Button onClick={handleClick} disabled={loading}>
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {loading ? "Processing..." : "Submit"}
    </Button>
  );
}

function CopyButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button variant="outline" size="sm" onClick={handleCopy}>
      {copied ? <Check className="mr-2 h-3.5 w-3.5" /> : <Copy className="mr-2 h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Copy"}
    </Button>
  );
}

// ── Page ──

export default function InteractivePage() {
  const [collapsible1, setCollapsible1] = useState(false);
  const [collapsible2, setCollapsible2] = useState(false);

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="rounded-[var(--radius-card)] bg-secondary p-5 md:p-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <MousePointerClick className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Interactive
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground font-display tracking-tight">
            Interactive components
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Buttons, feedback, overlays, and all interactive UI patterns in one place.
          </p>
        </div>
      </div>

      <Section title="Button Variants" icon={MousePointerClick}>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </Section>

      <Section title="Button Sizes" icon={MousePointerClick}>
        <div className="flex flex-wrap items-end gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="icon" aria-label="Add"><Plus className="h-4 w-4" /></Button>
        </div>
      </Section>

      <Section title="Button States" icon={MousePointerClick}>
        <div className="flex flex-wrap items-center gap-3">
          <Button disabled>Disabled</Button>
          <LoadingButton />
          <CopyButton />
        </div>
      </Section>

      <Section title="Toast Notifications" icon={Bell}>
        <div className="flex flex-wrap gap-3">
          <Button size="sm" onClick={() => toast.success("Changes saved successfully.")}>
            <CheckCircle2 className="mr-2 h-3.5 w-3.5" /> Success
          </Button>
          <Button size="sm" variant="destructive" onClick={() => toast.error("Failed to save changes.")}>
            <XCircle className="mr-2 h-3.5 w-3.5" /> Error
          </Button>
          <Button size="sm" variant="outline" onClick={() => toast.warning("Your session expires in 5 minutes.")}>
            <AlertTriangle className="mr-2 h-3.5 w-3.5" /> Warning
          </Button>
          <Button size="sm" variant="secondary" onClick={() => toast.info("A new version is available.")}>
            <Info className="mr-2 h-3.5 w-3.5" /> Info
          </Button>
        </div>
      </Section>

      <Section title="Inline Alerts" icon={AlertTriangle}>
        <div className="space-y-3">
          <InlineAlert variant="info" title="New update available" message="Version 2.4.0 includes performance improvements." />
          <InlineAlert variant="success" title="Payment confirmed" message="Your invoice #1042 has been paid." />
          <InlineAlert variant="warning" title="Storage almost full" message="You've used 92% of your storage quota." />
          <InlineAlert variant="error" title="Connection lost" message="Unable to reach the server." />
        </div>
      </Section>

      <Section title="Skeleton Loaders" icon={Loader2}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </Section>

      <Section title="Progress Indicators" icon={Loader2}>
        <div className="space-y-4 max-w-md">
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Uploading...</span><span className="font-mono-num">60%</span>
            </div>
            <Progress value={60} />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Loading...</span>
            </div>
            <div className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-sm text-foreground">Processing</span>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Empty States" icon={Inbox}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-8 flex flex-col items-center text-center">
            <Inbox className="h-10 w-10 text-muted-foreground/50 mb-3" strokeWidth={1} />
            <p className="text-sm font-medium text-foreground mb-1">No data yet</p>
            <p className="text-xs text-muted-foreground mb-4">Start by creating your first record.</p>
            <Button size="sm">Create record</Button>
          </div>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-8 flex flex-col items-center text-center">
            <Search className="h-10 w-10 text-muted-foreground/50 mb-3" strokeWidth={1} />
            <p className="text-sm font-medium text-foreground mb-1">No results found</p>
            <p className="text-xs text-muted-foreground mb-4">Try adjusting your search.</p>
            <Button size="sm" variant="outline">Clear filters</Button>
          </div>
          <div className="rounded-[var(--radius-widget)] border border-border bg-card p-8 flex flex-col items-center text-center">
            <XCircle className="h-10 w-10 text-muted-foreground/50 mb-3" strokeWidth={1} />
            <p className="text-sm font-medium text-foreground mb-1">Something went wrong</p>
            <p className="text-xs text-muted-foreground mb-4">Please try again.</p>
            <Button size="sm" variant="outline"><RefreshCw className="mr-2 h-3.5 w-3.5" /> Retry</Button>
          </div>
        </div>
      </Section>

      <Section title="Sheet / Drawer" icon={PanelRight}>
        <div className="flex flex-wrap gap-3">
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="sm"><PanelRight className="mr-2 h-3.5 w-3.5" /> Right</Button></SheetTrigger>
            <SheetContent side="right">
              <SheetHeader><SheetTitle>Detail Panel</SheetTitle><SheetDescription>View and edit details.</SheetDescription></SheetHeader>
              <div className="mt-6 space-y-4">
                <div className="space-y-2"><Label>Name</Label><Input defaultValue="John Doe" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="john@example.com" /></div>
              </div>
              <SheetFooter className="mt-6"><Button size="sm">Save changes</Button></SheetFooter>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="sm"><PanelLeft className="mr-2 h-3.5 w-3.5" /> Left</Button></SheetTrigger>
            <SheetContent side="left">
              <SheetHeader><SheetTitle>Filters</SheetTitle><SheetDescription>Narrow down results.</SheetDescription></SheetHeader>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild><Button variant="outline" size="sm"><PanelBottom className="mr-2 h-3.5 w-3.5" /> Bottom</Button></SheetTrigger>
            <SheetContent side="bottom">
              <SheetHeader><SheetTitle>Quick Actions</SheetTitle></SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </Section>

      <Section title="Dialogs" icon={MessageSquare}>
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild><Button variant="outline" size="sm">Basic dialog</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader><DialogTitle>Edit profile</DialogTitle><DialogDescription>Make changes to your profile.</DialogDescription></DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2"><Label>Display name</Label><Input defaultValue="Zheng Li" /></div>
              </div>
              <DialogFooter><Button size="sm">Save</Button></DialogFooter>
            </DialogContent>
          </Dialog>
          <AlertDialog>
            <AlertDialogTrigger asChild><Button variant="destructive" size="sm">Delete item</Button></AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </Section>

      <Section title="Popovers" icon={Filter}>
        <div className="flex flex-wrap gap-3">
          <Popover>
            <PopoverTrigger asChild><Button variant="outline" size="sm"><Filter className="mr-2 h-3.5 w-3.5" /> Filter</Button></PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="space-y-3">
                <p className="text-sm font-medium">Filter by</p>
                <div className="space-y-2"><Label className="text-xs">Status</Label><Input placeholder="e.g. Active" className="h-8 text-xs" /></div>
                <Separator />
                <div className="flex justify-end gap-2"><Button size="sm">Apply</Button></div>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild><Button variant="outline" size="sm"><User className="mr-2 h-3.5 w-3.5" /> Profile</Button></PopoverTrigger>
            <PopoverContent className="w-72">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-xs font-medium">ZL</div>
                <div><p className="text-sm font-medium">Zheng Li</p><p className="text-xs text-muted-foreground">zhengli@example.com</p></div>
              </div>
              <Separator className="my-3" />
              <div className="space-y-1">
                {["Profile settings", "Billing", "Sign out"].map((item) => (
                  <button key={item} className="flex w-full items-center rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">{item}</button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </Section>

      <Section title="Collapsible Sections" icon={ChevronDown}>
        <div className="space-y-3">
          <Collapsible open={collapsible1} onOpenChange={setCollapsible1}>
            <div className="rounded-[var(--radius-widget)] border border-border bg-card">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                <span className="text-sm font-medium text-foreground">Advanced options</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${collapsible1 ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border p-4 space-y-3">
                  <div className="flex items-center justify-between"><span className="text-sm">Enable caching</span><Switch /></div>
                  <div className="flex items-center justify-between"><span className="text-sm">Debug mode</span><Switch /></div>
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
          <Collapsible open={collapsible2} onOpenChange={setCollapsible2}>
            <div className="rounded-[var(--radius-widget)] border border-border bg-card">
              <CollapsibleTrigger className="flex w-full items-center justify-between p-4">
                <span className="text-sm font-medium text-foreground">Danger zone</span>
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${collapsible2 ? "rotate-180" : ""}`} strokeWidth={1.5} />
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="border-t border-border p-4">
                  <div className="flex items-center justify-between">
                    <div><p className="text-sm font-medium text-foreground">Delete workspace</p><p className="text-xs text-muted-foreground">Permanently remove all data.</p></div>
                    <Button variant="destructive" size="sm">Delete</Button>
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

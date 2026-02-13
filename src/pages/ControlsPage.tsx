import { useState } from "react";
import {
  Sparkles,
  FormInput,
  CheckCircle2,
  AlertTriangle,
  Info,
  Plus,
  Mail,
  Lock,
  Search,
} from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";
import { toast } from "sonner";

function Section({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="rounded-card bg-secondary p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
      {children}
    </div>
  );
}

export default function ControlsPage() {
  const [commandOpen, setCommandOpen] = useState(false);

  return (
    <div className="space-y-4">
      <PageIntro
        title="Control library with core shadcn patterns"
        description="Inputs, switches, dialogs, command palette, toasts, tooltips, and status elements—all in one place."
        eyebrow="Controls"
        icon={FormInput}
        actions={
          <button
            className="rounded-widget bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
            onClick={() => toast("Toast triggered", { description: "This is a Sonner toast demo." })}
          >
            Trigger toast
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Inputs" icon={FormInput}>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="controls-name" className="text-sm text-foreground">Full name</Label>
              <Input id="controls-name" placeholder="Alex Johnson" className="rounded-widget border-border bg-card text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="controls-email" className="text-sm text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="controls-email" placeholder="alex@basalt.app" className="rounded-widget border-border bg-card pl-10 text-sm" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="controls-password" className="text-sm text-foreground">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
                <Input id="controls-password" type="password" placeholder="••••••••" className="rounded-widget border-border bg-card pl-10 text-sm" />
              </div>
            </div>
          </div>
        </Section>

        <Section title="Toggles & Checks" icon={CheckCircle2}>
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-widget bg-card p-3">
              <span className="text-sm text-foreground">Enable alerts</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between rounded-widget bg-card p-3">
              <span className="text-sm text-foreground">Auto-sync data</span>
              <Switch />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="controls-remember" />
              <label htmlFor="controls-remember" className="text-sm text-muted-foreground cursor-pointer">Remember preferences</label>
            </div>
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Select" icon={Info}>
          <Select defaultValue="standard">
            <SelectTrigger className="rounded-widget border-border bg-card text-sm">
              <SelectValue placeholder="Select a plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="growth">Growth</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </Section>
        <Section title="Slider" icon={Sparkles}>
          <div className="space-y-3">
            <Slider defaultValue={[40]} max={100} step={1} />
            <Slider defaultValue={[70]} max={100} step={5} className="[&_[data-slot=range]]:bg-amber-500" />
          </div>
        </Section>
        <Section title="Tabs" icon={Plus}>
          <Tabs defaultValue="summary">
            <TabsList>
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <TabsContent value="summary">
              <p className="text-sm text-muted-foreground">Summary content sits here.</p>
            </TabsContent>
            <TabsContent value="details">
              <p className="text-sm text-muted-foreground">Detailed content sits here.</p>
            </TabsContent>
          </Tabs>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Progress" icon={Sparkles}>
          <div className="space-y-3">
            <Progress value={35} />
            <Progress value={62} className="[&_[data-slot=indicator]]:bg-amber-500" />
          </div>
        </Section>
        <Section title="Radio Group" icon={CheckCircle2}>
          <RadioGroup defaultValue="monthly">
            <label className="flex items-center gap-2 text-sm text-foreground">
              <RadioGroupItem value="monthly" /> Monthly
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <RadioGroupItem value="annual" /> Annual
            </label>
            <label className="flex items-center gap-2 text-sm text-foreground">
              <RadioGroupItem value="enterprise" /> Enterprise
            </label>
          </RadioGroup>
        </Section>
        <Section title="Hover Card" icon={Info}>
          <HoverCard>
            <HoverCardTrigger asChild>
              <button className="rounded-widget bg-card px-3 py-2 text-xs text-foreground">Hover for details</button>
            </HoverCardTrigger>
            <HoverCardContent>
              <p className="text-sm font-medium text-foreground">Basalt Studio</p>
              <p className="text-xs text-muted-foreground">Design systems and templates for product teams.</p>
            </HoverCardContent>
          </HoverCard>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Section title="Alerts" icon={AlertTriangle}>
          <div className="space-y-3">
            <div className="rounded-widget border border-border bg-card p-3">
              <p className="text-sm font-medium text-foreground">System warning</p>
              <p className="text-xs text-muted-foreground">Usage has reached 80% of quota.</p>
            </div>
            <div className="rounded-widget border border-border bg-card p-3">
              <p className="text-sm font-medium text-foreground">Maintenance</p>
              <p className="text-xs text-muted-foreground">Scheduled for Feb 22, 2:00 AM UTC.</p>
            </div>
          </div>
        </Section>

        <Section title="Badges" icon={Info}>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-medium text-success">Active</span>
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-medium text-amber-500">Pending</span>
            <span className="rounded-full bg-destructive/10 px-3 py-1 text-xs font-medium text-destructive">Blocked</span>
            <span className="rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground">Neutral</span>
          </div>
        </Section>

        <Section title="Tags" icon={Sparkles}>
          <div className="flex flex-wrap gap-2">
            {["Design", "Analytics", "Mobile", "Finance"].map((tag) => (
              <span key={tag} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Dialog" icon={Plus}>
          <Dialog>
            <DialogTrigger asChild>
              <button className="rounded-widget bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">Open dialog</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite collaborator</DialogTitle>
                <DialogDescription>Send an invite to your team with proper permissions.</DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="dialog-email">Email</Label>
                  <Input id="dialog-email" placeholder="teammate@company.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dialog-role">Role</Label>
                  <Input id="dialog-role" placeholder="Designer" />
                </div>
              </div>
              <DialogFooter>
                <button className="rounded-widget bg-secondary px-3 py-2 text-sm text-foreground">Cancel</button>
                <button className="rounded-widget bg-primary px-3 py-2 text-sm text-primary-foreground">Send invite</button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </Section>

        <Section title="Command Palette" icon={Search}>
          <div className="rounded-widget border border-border bg-card p-3">
            <p className="text-sm text-foreground">Press the button to open the palette.</p>
            <button
              className="mt-3 rounded-widget bg-secondary px-3 py-2 text-xs text-foreground"
              onClick={() => setCommandOpen(true)}
            >
              Open command palette
            </button>
          </div>
          <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
            <CommandInput placeholder="Search commands" />
            <CommandList>
              <CommandEmpty>No results.</CommandEmpty>
              <CommandGroup heading="Suggestions">
                <CommandItem>
                  Create new workspace
                  <CommandShortcut>⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  Open settings
                  <CommandShortcut>⌘S</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandGroup heading="Templates">
                <CommandItem>Launch dashboard</CommandItem>
                <CommandItem>Open billing</CommandItem>
              </CommandGroup>
            </CommandList>
          </CommandDialog>
        </Section>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Section title="Dropdown Menu" icon={Info}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="rounded-widget bg-card px-3 py-2 text-xs text-foreground">Open menu</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Section>
        <Section title="Popover" icon={Info}>
          <Popover>
            <PopoverTrigger asChild>
              <button className="rounded-widget bg-card px-3 py-2 text-xs text-foreground">View details</button>
            </PopoverTrigger>
            <PopoverContent>
              <p className="text-sm font-medium text-foreground">Release schedule</p>
              <p className="text-xs text-muted-foreground">Next update ships on Feb 22.</p>
            </PopoverContent>
          </Popover>
        </Section>
      </div>

      <Section title="Tooltip" icon={Info}>
        <TooltipProvider>
          <div className="flex flex-wrap gap-3">
            {[
              { label: "Hover me", tip: "Small helper text" },
              { label: "Pricing", tip: "Shows plan details" },
              { label: "Security", tip: "2FA is enabled" },
            ].map((item) => (
              <Tooltip key={item.label}>
                <TooltipTrigger asChild>
                  <button className="rounded-widget bg-card px-3 py-2 text-xs text-foreground">{item.label}</button>
                </TooltipTrigger>
                <TooltipContent>{item.tip}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>
      </Section>

      <Section title="Accordion" icon={AlertTriangle}>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Billing details</AccordionTrigger>
            <AccordionContent>Invoices, payment methods, and usage history.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Security</AccordionTrigger>
            <AccordionContent>Access control, MFA, and active sessions.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>API limits</AccordionTrigger>
            <AccordionContent>Usage caps, rate limits, and audit logs.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      <Card className="rounded-card border-0 bg-secondary shadow-none">
        <CardHeader>
          <CardTitle className="text-sm font-normal text-muted-foreground">Form summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground">Controls library sample complete</p>
              <p className="text-xs text-muted-foreground">All standard primitives included.</p>
            </div>
            <button className="rounded-widget bg-primary px-3 py-2 text-xs text-primary-foreground">Publish</button>
          </div>
          <Separator className="my-4 bg-border" />
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-success" strokeWidth={1.5} />
            12 components ready
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

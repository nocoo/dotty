import { CreditCard, Lock, Truck, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageIntro } from "@/components/PageIntro";

const summary = [
  { label: "Growth Plan", value: "$49" },
  { label: "Template Pack", value: "$18" },
  { label: "Tax", value: "$6" },
];

export default function CheckoutPage() {
  const total = "$73";

  return (
    <div className="space-y-4">
      <PageIntro
        title="Checkout that feels safe and polished"
        description="Payment details, order summary, and confidence cues to reduce friction."
        eyebrow="Checkout"
        icon={CreditCard}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-card bg-secondary p-5">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Payment details</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="checkout-name" className="text-sm text-foreground">Cardholder name</Label>
              <Input id="checkout-name" placeholder="Alex Johnson" className="rounded-widget border-border bg-card text-sm" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="checkout-card" className="text-sm text-foreground">Card number</Label>
              <Input id="checkout-card" placeholder="1234 5678 9012 3456" className="rounded-widget border-border bg-card text-sm" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="checkout-exp" className="text-sm text-foreground">Expiry</Label>
                <Input id="checkout-exp" placeholder="MM/YY" className="rounded-widget border-border bg-card text-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-cvc" className="text-sm text-foreground">CVC</Label>
                <Input id="checkout-cvc" placeholder="123" className="rounded-widget border-border bg-card text-sm" />
              </div>
            </div>
            <div className="rounded-widget border border-border bg-card p-3 text-xs text-muted-foreground">
              Your payment is secured with 256-bit encryption.
            </div>
            <button className="w-full rounded-widget bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
              Pay {total}
            </button>
          </form>
        </div>

        <div className="rounded-card bg-secondary p-5">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-sm text-muted-foreground">Order summary</p>
          </div>
          <div className="space-y-3">
            {summary.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-border pt-4 flex items-center justify-between text-sm">
            <span className="text-foreground">Total</span>
            <span className="text-lg font-semibold text-foreground">{total}</span>
          </div>
          <div className="mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" strokeWidth={1.5} /> Secure checkout
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5" strokeWidth={1.5} /> 14-day refund policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

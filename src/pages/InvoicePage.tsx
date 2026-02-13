import { FileText, Download, Send, BadgeCheck } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

const items = [
  { name: "Basalt Growth Plan", qty: 1, price: "$49" },
  { name: "Template Pack", qty: 1, price: "$18" },
  { name: "Priority support", qty: 1, price: "$6" },
];

export default function InvoicePage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Invoice template with receipts and actions"
        description="Statement layouts, line items, and payment status blocks for billing workflows."
        eyebrow="Invoice"
        icon={FileText}
        actions={
          <span className="flex items-center gap-1 rounded-full bg-success/10 px-2 py-1 text-xs font-medium text-success">
            <BadgeCheck className="h-3.5 w-3.5" strokeWidth={1.5} /> Paid
          </span>
        }
      />
      <div className="rounded-card bg-secondary p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <p className="text-xs text-muted-foreground">Billed to</p>
            <p className="text-sm text-foreground">Nova Labs Inc.</p>
            <p className="text-xs text-muted-foreground">billing@novalabs.com</p>
          </div>
          <div className="md:text-right">
            <p className="text-xs text-muted-foreground">Invoice #INV-2048</p>
            <p className="text-sm text-foreground">Issued Feb 10, 2026</p>
            <p className="text-xs text-muted-foreground">Due Feb 20, 2026</p>
          </div>
        </div>
      </div>

      <div className="rounded-card bg-secondary p-5">
        <table className="w-full text-sm">
          <thead className="text-xs text-muted-foreground border-b border-border">
            <tr>
              <th className="py-2 text-left font-normal">Item</th>
              <th className="py-2 text-center font-normal">Qty</th>
              <th className="py-2 text-right font-normal">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.name} className="border-b border-border last:border-b-0">
                <td className="py-3 text-foreground">{item.name}</td>
                <td className="py-3 text-center text-muted-foreground">{item.qty}</td>
                <td className="py-3 text-right text-foreground">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Subtotal</p>
            <p className="text-xs text-muted-foreground">Tax</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-foreground">$73</p>
            <p className="text-sm text-foreground">$6</p>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
          <p className="text-sm font-medium text-foreground">Total</p>
          <p className="text-lg font-semibold text-foreground">$79</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="flex items-center gap-2 rounded-widget bg-primary px-3 py-2 text-xs font-medium text-primary-foreground">
            <Send className="h-3.5 w-3.5" strokeWidth={1.5} /> Send invoice
          </button>
          <button className="flex items-center gap-2 rounded-widget bg-card px-3 py-2 text-xs font-medium text-foreground">
            <Download className="h-3.5 w-3.5" strokeWidth={1.5} /> Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

import { ArrowDownLeft, ArrowUpRight, Filter, Search, SlidersHorizontal, Table } from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageIntro } from "@/components/PageIntro";

const rows = [
  { id: "INV-2041", customer: "Nova Labs", status: "Paid", amount: "$12,400", date: "Feb 01" },
  { id: "INV-2042", customer: "Violet Corp", status: "Pending", amount: "$5,950", date: "Feb 03" },
  { id: "INV-2043", customer: "Atlas Works", status: "Paid", amount: "$8,100", date: "Feb 05" },
  { id: "INV-2044", customer: "Echo Systems", status: "Overdue", amount: "$3,250", date: "Feb 07" },
  { id: "INV-2045", customer: "Solstice", status: "Paid", amount: "$14,900", date: "Feb 09" },
];

export default function TablesPage() {
  return (
    <div className="space-y-4">
      <PageIntro
        title="Data tables with real control density"
        description="Search, filters, status badges, and supporting list layouts for operational products."
        eyebrow="Tables"
        icon={Table}
        actions={
          <>
            <div className="relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} />
              <Input placeholder="Search" className="rounded-widget border-border bg-card pl-10 text-sm" />
            </div>
            <button className="flex items-center gap-2 rounded-widget bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
              <Filter className="h-3.5 w-3.5" strokeWidth={1.5} /> Filter
            </button>
            <button className="flex items-center gap-2 rounded-widget bg-card px-3 py-2 text-xs font-medium text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" strokeWidth={1.5} /> Columns
            </button>
          </>
        }
      />

      <div className="rounded-card bg-secondary overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs text-muted-foreground">
              <th className="px-5 py-3 font-normal">Invoice</th>
              <th className="px-5 py-3 font-normal">Customer</th>
              <th className="px-5 py-3 font-normal">Status</th>
              <th className="px-5 py-3 font-normal">Amount</th>
              <th className="px-5 py-3 font-normal">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-b-0 hover:bg-accent/40">
                <td className="px-5 py-3 text-sm text-foreground">{row.id}</td>
                <td className="px-5 py-3 text-sm text-foreground">{row.customer}</td>
                <td className="px-5 py-3 text-xs">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      row.status === "Paid"
                        ? "bg-success/10 text-success"
                        : row.status === "Pending"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-destructive/10 text-destructive"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-sm text-foreground">{row.amount}</td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-3">Recent transfers</p>
          <div className="space-y-3">
            {[
              { name: "Wire transfer", amount: "$2,800", direction: "out" },
              { name: "ACH payout", amount: "$4,200", direction: "in" },
              { name: "Vendor payment", amount: "$1,150", direction: "out" },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between rounded-widget bg-card p-3">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.direction === "in" ? "bg-success/10" : "bg-destructive/10"}`}>
                    {item.direction === "in" ? (
                      <ArrowDownLeft className="h-3.5 w-3.5 text-success" strokeWidth={1.5} />
                    ) : (
                      <ArrowUpRight className="h-3.5 w-3.5 text-destructive" strokeWidth={1.5} />
                    )}
                  </div>
                  <span className="text-sm text-foreground">{item.name}</span>
                </div>
                <span className="text-sm font-medium text-foreground">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-card bg-secondary p-4 md:p-5">
          <p className="text-sm text-muted-foreground mb-3">Table footer</p>
          <div className="rounded-widget border border-border bg-card p-4 text-sm text-muted-foreground">
            Summaries and bulk actions can sit here to complement the data table layout.
          </div>
        </div>
      </div>
    </div>
  );
}

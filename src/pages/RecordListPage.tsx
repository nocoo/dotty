import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Filter } from "lucide-react";
import { useRecordListViewModel } from "@/viewmodels/useRecordListViewModel";

export default function RecordListPage() {
  const { records, totalCount } = useRecordListViewModel();

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{totalCount} transactions</span>
        <button className="flex items-center gap-2 rounded-widget bg-secondary px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
          <Filter className="h-3.5 w-3.5" strokeWidth={1.5} /> Filter
        </button>
      </div>

      {/* Desktop table */}
      <div className="rounded-card bg-secondary overflow-hidden hidden md:block">
        <div className="flex items-center gap-2 px-5 pt-4 pb-2">
          <ArrowLeftRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />
          <p className="text-sm text-muted-foreground">Transactions</p>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th scope="col" className="px-5 py-3 text-left text-xs font-normal text-muted-foreground">Transaction</th>
              <th scope="col" className="w-[100px] py-3 text-left text-xs font-normal text-muted-foreground">Category</th>
              <th scope="col" className="w-[120px] py-3 text-left text-xs font-normal text-muted-foreground">Date</th>
              <th scope="col" className="w-[100px] py-3 text-right text-xs font-normal text-muted-foreground">Amount</th>
              <th scope="col" className="w-[90px] py-3 pr-5 text-right text-xs font-normal text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((tx) => (
              <tr key={tx.id} className="hover:bg-accent/50 transition-colors">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-md ${tx.direction === "positive" ? "bg-success/10" : "bg-destructive/10"}`}>
                      {tx.direction === "positive" ? <ArrowDownLeft className="h-3 w-3 text-success" strokeWidth={1.5} aria-hidden="true" /> : <ArrowUpRight className="h-3 w-3 text-destructive" strokeWidth={1.5} aria-hidden="true" />}
                    </div>
                    <span className="text-sm text-foreground">{tx.name}</span>
                  </div>
                </td>
                <td className="py-3 text-xs text-muted-foreground">{tx.category}</td>
                <td className="py-3 text-xs text-muted-foreground">{tx.date}</td>
                <td className={`py-3 text-sm font-medium text-right ${tx.direction === "positive" ? "text-success" : "text-foreground"}`}>
                  {tx.formattedAmount}
                </td>
                <td className="py-3 pr-5 text-right">
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${tx.statusVariant === "success" ? "bg-success/10 text-success" : "bg-yellow-500/10 text-yellow-500"}`}>
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile list */}
      <div className="flex flex-col gap-2 md:hidden">
        {records.map((tx) => (
          <div key={tx.id} className="rounded-card bg-secondary p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 ${tx.direction === "positive" ? "bg-success/10" : "bg-destructive/10"}`}>
                {tx.direction === "positive" ? <ArrowDownLeft className="h-3.5 w-3.5 text-success" strokeWidth={1.5} /> : <ArrowUpRight className="h-3.5 w-3.5 text-destructive" strokeWidth={1.5} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-medium ${tx.direction === "positive" ? "text-success" : "text-foreground"}`}>
                  {tx.formattedAmount}
                </p>
                <span className={`text-[10px] ${tx.statusVariant === "success" ? "text-success" : "text-yellow-500"}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

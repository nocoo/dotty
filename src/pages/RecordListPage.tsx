import { ArrowUpRight, ArrowDownLeft, ArrowLeftRight, Filter } from "lucide-react";
import { useRecordListViewModel } from "@/viewmodels/useRecordListViewModel";

export default function RecordListPage() {
  const { records, totalCount } = useRecordListViewModel();

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{totalCount} transactions</span>
        <button className="flex items-center gap-2 rounded-[10px] bg-secondary px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
          <Filter className="h-3.5 w-3.5" strokeWidth={1.5} /> Filter
        </button>
      </div>

      {/* Desktop table */}
      <div className="rounded-[14px] bg-secondary overflow-hidden hidden md:block">
        <div className="flex items-center gap-2 px-5 pt-4 pb-2">
          <ArrowLeftRight className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">Transactions</p>
        </div>
        <div className="grid grid-cols-[1fr_100px_120px_100px_90px] gap-2 px-5 py-3 text-xs text-muted-foreground border-b border-border">
          <span>Transaction</span><span>Category</span><span>Date</span><span className="text-right">Amount</span><span className="text-right">Status</span>
        </div>
        {records.map((tx) => (
          <div key={tx.id} className="grid grid-cols-[1fr_100px_120px_100px_90px] gap-2 px-5 py-3 items-center hover:bg-accent/50 transition-colors">
            <div className="flex items-center gap-3">
              <div className={`flex h-7 w-7 items-center justify-center rounded-md ${tx.direction === "positive" ? "bg-success/10" : "bg-destructive/10"}`}>
                {tx.direction === "positive" ? <ArrowDownLeft className="h-3 w-3 text-success" strokeWidth={1.5} /> : <ArrowUpRight className="h-3 w-3 text-destructive" strokeWidth={1.5} />}
              </div>
              <span className="text-sm text-foreground">{tx.name}</span>
            </div>
            <span className="text-xs text-muted-foreground">{tx.category}</span>
            <span className="text-xs text-muted-foreground">{tx.date}</span>
            <span className={`text-sm font-medium text-right ${tx.direction === "positive" ? "text-success" : "text-foreground"}`}>
              {tx.formattedAmount}
            </span>
            <div className="flex justify-end">
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${tx.statusVariant === "success" ? "bg-success/10 text-success" : "bg-yellow-500/10 text-yellow-500"}`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile list */}
      <div className="flex flex-col gap-2 md:hidden">
        {records.map((tx) => (
          <div key={tx.id} className="rounded-[14px] bg-secondary p-4">
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

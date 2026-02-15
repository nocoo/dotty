import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, Plus, Activity, Wifi, Eye, EyeOff, Lock, NfcIcon, ArrowLeftRight, Filter } from "lucide-react";
import { useState } from "react";
import { useAccountsViewModel } from "@/viewmodels/useAccountsViewModel";
import { useCardShowcaseViewModel } from "@/viewmodels/useCardShowcaseViewModel";
import { useRecordListViewModel } from "@/viewmodels/useRecordListViewModel";
import { Switch } from "@/components/ui/switch";
import type { CreditCard as CreditCardType } from "@/models/types";

function NetworkLogo({ network }: { network: CreditCardType["network"] }) {
  switch (network) {
    case "visa":
      return <span className="text-lg font-extrabold italic tracking-tight">VISA</span>;
    case "mastercard":
      return (
        <div className="flex items-center">
          <div className="h-5 w-5 rounded-full bg-foreground/40 opacity-80" />
          <div className="-ml-2 h-5 w-5 rounded-full bg-foreground/20 opacity-80" />
        </div>
      );
    case "amex":
      return <span className="text-xs font-bold tracking-wider">AMEX</span>;
    default:
      return null;
  }
}

function ChipIcon({ isBlack }: { isBlack: boolean }) {
  return (
    <div className={`h-8 w-10 rounded-md ${isBlack ? "bg-foreground/30" : "bg-foreground/20"} flex items-center justify-center`}>
      <div className={`h-5 w-7 rounded-xs border ${isBlack ? "border-foreground/20" : "border-foreground/15"} grid grid-cols-3 grid-rows-2 gap-px p-px`}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className={`${isBlack ? "bg-foreground/15" : "bg-foreground/10"} rounded-[1px]`} />
        ))}
      </div>
    </div>
  );
}

export default function AccountsPage() {
  const { accountList, activityList } = useAccountsViewModel();
  const [showBalance, setShowBalance] = useState(true);
  const { cards, cardCount, formatBalance } = useCardShowcaseViewModel(showBalance);
  const { records, totalCount } = useRecordListViewModel();

  return (
    <div className="space-y-4">
      {/* Page intro */}
      <div className="rounded-[var(--radius-card)] bg-muted p-4 md:p-5">
        <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground mb-1">Accounts</p>
        <div className="flex items-center gap-2 mb-1">
          <WalletIcon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          <h1 className="text-lg font-semibold text-foreground font-display">Wallet, cards, and transaction history</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Account balances, credit card showcase, usage tracking, and full transaction records.
        </p>
      </div>

      {/* Account balances */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {accountList.map((acc) => (
          <div key={acc.name} className="rounded-[var(--radius-card)] bg-muted p-5">
            <div className="flex items-center gap-2 mb-3">
              <WalletIcon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <span className="text-sm text-muted-foreground">{acc.name}</span>
            </div>
            <h2 className="text-xl md:text-2xl font-semibold text-foreground font-display tracking-tight font-mono-num">${acc.balance.toLocaleString()}</h2>
            <span className="text-xs font-medium text-success mt-1 inline-block">{acc.change}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button className="flex items-center gap-2 rounded-[var(--radius-widget)] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground">
          <Plus className="h-4 w-4" strokeWidth={1.5} /> Add Money
        </button>
        <button className="flex items-center gap-2 rounded-[var(--radius-widget)] bg-secondary px-4 py-2.5 text-sm font-medium text-foreground">
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} /> Send
        </button>
      </div>

      {/* Card showcase */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{cardCount} cards active</span>
        <button onClick={() => setShowBalance(!showBalance)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          {showBalance ? <Eye className="h-4 w-4" strokeWidth={1.5} /> : <EyeOff className="h-4 w-4" strokeWidth={1.5} />}
          {showBalance ? "Hide" : "Show"} balances
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 justify-items-center">
        {cards.map((card) => {
          const { colorScheme: cs } = card;
          return (
            <div
              key={card.name}
              className={`aspect-[86/54] w-full max-w-sm rounded-2xl bg-gradient-to-br ${card.color} p-5 relative overflow-hidden flex flex-col justify-between shadow-lg`}
            >
              {/* Decorative circles */}
              <div className={`absolute -top-12 -right-12 h-40 w-40 rounded-full ${cs.overlayOpacity.large}`} />
              <div className={`absolute -bottom-8 -left-8 h-32 w-32 rounded-full ${cs.overlayOpacity.small}`} />

              {/* Top row: bank name + contactless */}
              <div className="flex items-start justify-between relative z-10">
                <div>
                  <p className={`text-sm font-semibold ${cs.textPrimary}`}>{card.bank}</p>
                  <p className={`text-[10px] ${cs.textMuted} mt-0.5`}>{card.name}</p>
                </div>
                <NfcIcon className={`h-5 w-5 ${cs.textMuted}`} strokeWidth={1.5} />
              </div>

              {/* Middle: chip + card number */}
              <div className="relative z-10 space-y-3">
                <ChipIcon isBlack={cs.chipHighContrast} />
                <p className={`text-sm font-mono tracking-[0.2em] ${cs.textSecondary}`}>{card.number}</p>
              </div>

              {/* Bottom row: expiry + balance + network logo */}
              <div className="flex items-end justify-between relative z-10">
                <div className="flex gap-6">
                  <div>
                    <p className={`text-[9px] uppercase ${cs.textMuted}`}>Valid Thru</p>
                    <p className={`text-xs font-mono ${cs.textSecondary}`}>{card.expiry}</p>
                  </div>
                  <div>
                    <p className={`text-[9px] uppercase ${cs.textMuted}`}>Balance</p>
                    <p className={`text-sm font-semibold font-mono-num ${cs.textPrimary}`}>
                      {formatBalance(card.balance)}
                    </p>
                  </div>
                </div>
                <div className={cs.textPrimary}>
                  <NetworkLogo network={card.network} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Usage bar */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <div key={card.name} className="rounded-[var(--radius-card)] bg-muted p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">{card.bank} {card.name}</span>
              <span className="text-xs text-muted-foreground font-mono-num">
                {card.utilization}%
              </span>
            </div>
            <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
              <div
                className="h-1.5 rounded-full bg-muted"
                role="progressbar"
                aria-valuenow={card.utilization}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${card.bank} ${card.name} credit utilization: ${card.utilization}%`}
              >
                <div
                  className="h-full rounded-full bg-foreground/60 transition-all"
                  style={{ width: `${card.utilization}%` }}
                  aria-hidden="true"
                />
              </div>
              <p className="text-[11px] text-muted-foreground mt-1.5">
                <span className="font-mono-num">${card.balance.toLocaleString()}</span> / <span className="font-mono-num">${card.limit.toLocaleString()}</span> limit
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Card security */}
      <div className="rounded-[var(--radius-card)] bg-muted p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-sm text-muted-foreground">Card Security</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {["Online Payments", "Contactless", "ATM Withdrawal"].map((feat) => (
            <div key={feat} className="flex items-center justify-between rounded-[var(--radius-widget)] bg-card border border-border p-3">
              <label htmlFor={`switch-${feat}`} className="text-sm text-foreground cursor-pointer">{feat}</label>
              <Switch id={`switch-${feat}`} defaultChecked aria-label={feat} className="h-5 w-9 data-[state=checked]:bg-success/20 data-[state=unchecked]:bg-input [&>span]:h-4 [&>span]:w-4 [&>span]:data-[state=checked]:bg-success [&>span]:data-[state=checked]:translate-x-4" />
            </div>
          ))}
        </div>
      </div>

      {/* Recent activity */}
      <div className="rounded-[var(--radius-card)] bg-muted p-5">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-sm text-muted-foreground">Recent Activity</p>
        </div>
        <div className="rounded-[var(--radius-widget)] border border-border bg-card p-3">
          <div className="flex flex-col gap-3">
            {activityList.map((item, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <div className="flex items-center gap-3">
                  <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${item.direction === "positive" ? "bg-muted" : "bg-muted"}`}>
                    {item.direction === "positive" ? <ArrowDownLeft className="h-3.5 w-3.5 text-success" strokeWidth={1.5} /> : <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />}
                  </div>
                  <div>
                    <p className="text-sm text-foreground">{item.desc}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-medium font-mono-num ${item.direction === "positive" ? "text-success" : "text-foreground"}`}>
                  {item.formattedAmount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{totalCount} transactions</span>
        <button className="flex items-center gap-2 rounded-[var(--radius-widget)] bg-secondary px-3 py-2 text-sm text-muted-foreground hover:text-foreground">
          <Filter className="h-3.5 w-3.5" strokeWidth={1.5} /> Filter
        </button>
      </div>

      {/* Desktop table */}
      <div className="rounded-[var(--radius-card)] bg-muted overflow-hidden hidden md:block">
        <div className="rounded-[var(--radius-card)] bg-card border border-border mx-1 mt-1 mb-1 overflow-hidden">
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
                      <div className={`flex h-7 w-7 items-center justify-center rounded-md ${tx.direction === "positive" ? "bg-muted" : "bg-muted"}`}>
                        {tx.direction === "positive" ? <ArrowDownLeft className="h-3 w-3 text-success" strokeWidth={1.5} aria-hidden="true" /> : <ArrowUpRight className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} aria-hidden="true" />}
                      </div>
                      <span className="text-sm text-foreground">{tx.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-xs text-muted-foreground">{tx.category}</td>
                  <td className="py-3 text-xs text-muted-foreground">{tx.date}</td>
                  <td className={`py-3 text-sm font-medium text-right font-mono-num ${tx.direction === "positive" ? "text-success" : "text-foreground"}`}>
                    {tx.formattedAmount}
                  </td>
                  <td className="py-3 pr-5 text-right">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${tx.statusVariant === "success" ? "bg-muted text-success" : "bg-muted text-muted-foreground"}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile transaction list */}
      <div className="flex flex-col gap-2 md:hidden">
        {records.map((tx) => (
          <div key={tx.id} className="rounded-[var(--radius-card)] bg-muted p-4">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg shrink-0 bg-muted`}>
                {tx.direction === "positive" ? <ArrowDownLeft className="h-3.5 w-3.5 text-success" strokeWidth={1.5} /> : <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.category} · {tx.date}</p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-medium font-mono-num ${tx.direction === "positive" ? "text-success" : "text-foreground"}`}>
                  {tx.formattedAmount}
                </p>
                <span className={`text-[10px] ${tx.statusVariant === "success" ? "text-success" : "text-muted-foreground"}`}>
                  {tx.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

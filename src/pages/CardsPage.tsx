import { CreditCard, Wifi, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import { creditCards } from "@/data/mock";

export default function CardsPage() {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-muted-foreground">{creditCards.length} cards active</span>
        <button onClick={() => setShowBalance(!showBalance)} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          {showBalance ? <Eye className="h-4 w-4" strokeWidth={1.5} /> : <EyeOff className="h-4 w-4" strokeWidth={1.5} />}
          {showBalance ? "Hide" : "Show"} balances
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {creditCards.map((card) => (
          <div key={card.name} className={`rounded-[14px] bg-gradient-to-br ${card.color} p-5 text-white relative overflow-hidden`}>
            <div className="absolute top-4 right-4 opacity-20">
              <Wifi className="h-6 w-6 rotate-90" />
            </div>
            <p className="text-xs font-medium opacity-70 mb-6">{card.name}</p>
            <p className="text-base font-mono tracking-wider mb-4">{card.number}</p>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] opacity-60 uppercase">Balance</p>
                <p className="text-lg font-semibold">{showBalance ? `$${card.balance.toLocaleString()}` : "------"}</p>
              </div>
              <CreditCard className="h-8 w-8 opacity-40" strokeWidth={1} />
            </div>
            <div className="mt-3 h-1 rounded-full bg-white/20">
              <div className="h-full rounded-full bg-white/60" style={{ width: `${(card.balance / card.limit) * 100}%` }} />
            </div>
            <p className="text-[10px] opacity-50 mt-1">${card.balance.toLocaleString()} / ${card.limit.toLocaleString()} limit</p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[14px] bg-secondary p-5">
        <div className="flex items-center gap-2 mb-4">
          <Lock className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <span className="text-sm text-muted-foreground">Card Security</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {["Online Payments", "Contactless", "ATM Withdrawal"].map((feat) => (
            <div key={feat} className="flex items-center justify-between rounded-[10px] bg-card p-3">
              <span className="text-sm text-foreground">{feat}</span>
              <div className="h-5 w-9 rounded-full bg-success/20 flex items-center justify-end px-0.5">
                <div className="h-4 w-4 rounded-full bg-success" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Centralized mock data for all pages.
// Type definitions live in @/models/types.ts — edit those to match your domain.

import type {
  Account,
  ActivityItem,
  CreditCard,
  Transaction,
  Budget,
  MonthlyBudget,
  Goal,
  PortfolioItem,
  FAQ,
} from "@/models/types";

export type { Account, ActivityItem, CreditCard, Transaction, Budget, MonthlyBudget, Goal, PortfolioItem, FAQ };

// ── Dashboard ──
export const dashboardBalance = {
  data: Array.from({ length: 24 }, () => ({ value: 3000 + Math.random() * 5000 })),
};

export const dashboardIncome = {
  data: Array.from({ length: 20 }, () => ({ value: 2000 + Math.random() * 6000 })),
};

export const dashboardSpending = [
  { name: "Mon", value: 2400 },
  { name: "Tue", value: 1398 },
  { name: "Wed", value: 5800 },
  { name: "Thu", value: 3908 },
  { name: "Fri", value: 4800 },
  { name: "Sat", value: 3200 },
  { name: "Sun", value: 4300 },
];

export const dashboardExpenses = [
  { name: "Food", value: 35 },
  { name: "Transport", value: 20 },
  { name: "Shopping", value: 25 },
  { name: "Bills", value: 20 },
];

export const dashboardUsage = [
  { name: "Jan", value: 12000 },
  { name: "Feb", value: 15000 },
  { name: "Mar", value: 11000 },
  { name: "Apr", value: 18000 },
  { name: "May", value: 14000 },
  { name: "Jun", value: 20000 },
  { name: "Jul", value: 16000 },
  { name: "Aug", value: 22000 },
  { name: "Sep", value: 13000 },
  { name: "Oct", value: 17000 },
  { name: "Nov", value: 25000 },
  { name: "Dec", value: 19000 },
];

export const recentTransactions = [
  { name: "Netflix Subscription", amount: -15.99, date: "Today", type: "expense" as const },
  { name: "Salary Deposit", amount: 5200.0, date: "Yesterday", type: "income" as const },
  { name: "Grocery Store", amount: -82.4, date: "Yesterday", type: "expense" as const },
  { name: "Freelance Payment", amount: 1200.0, date: "Feb 8", type: "income" as const },
  { name: "Electric Bill", amount: -145.0, date: "Feb 7", type: "expense" as const },
];

// ── Wallet ──
export const accounts: Account[] = [
  { name: "Main Account", balance: 12450.8, currency: "USD", change: "+2.4%" },
  { name: "Savings", balance: 8200.0, currency: "USD", change: "+5.1%" },
  { name: "Investment", balance: 23100.5, currency: "USD", change: "+8.7%" },
];

export const walletActivity: ActivityItem[] = [
  { desc: "Transfer to Savings", amount: -500, date: "Today" },
  { desc: "Received from John", amount: 250, date: "Yesterday" },
  { desc: "ATM Withdrawal", amount: -200, date: "Feb 9" },
  { desc: "Refund - Amazon", amount: 45.99, date: "Feb 8" },
];

// ── Cards ──
export const creditCards: CreditCard[] = [
  { name: "Sapphire Reserve", bank: "Chase", network: "visa", number: "4532 •••• •••• 7890", expiry: "09/28", balance: 3250.0, limit: 10000, color: "from-blue-600 to-blue-800" },
  { name: "Premier World", bank: "HSBC", network: "mastercard", number: "5412 •••• •••• 3456", expiry: "03/27", balance: 1820.5, limit: 5000, color: "from-purple-600 to-purple-800" },
  { name: "Centurion", bank: "American Express", network: "amex", number: "3742 •••• •••• 1234", expiry: "12/29", balance: 8400.0, limit: 25000, color: "from-neutral-800 to-neutral-950" },
];

// ── Transactions ──
export const transactions: Transaction[] = [
  { id: 1, name: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "Feb 11, 2026", status: "Completed" },
  { id: 2, name: "Salary Deposit", category: "Income", amount: 5200.0, date: "Feb 10, 2026", status: "Completed" },
  { id: 3, name: "Grocery Store", category: "Food", amount: -82.4, date: "Feb 10, 2026", status: "Completed" },
  { id: 4, name: "Freelance Payment", category: "Income", amount: 1200.0, date: "Feb 8, 2026", status: "Completed" },
  { id: 5, name: "Electric Bill", category: "Utilities", amount: -145.0, date: "Feb 7, 2026", status: "Completed" },
  { id: 6, name: "Restaurant", category: "Food", amount: -56.8, date: "Feb 6, 2026", status: "Completed" },
  { id: 7, name: "Gas Station", category: "Transport", amount: -42.0, date: "Feb 5, 2026", status: "Pending" },
  { id: 8, name: "Online Transfer", category: "Transfer", amount: -300.0, date: "Feb 4, 2026", status: "Completed" },
  { id: 9, name: "Gym Membership", category: "Health", amount: -49.99, date: "Feb 3, 2026", status: "Completed" },
  { id: 10, name: "Dividend Income", category: "Income", amount: 85.5, date: "Feb 2, 2026", status: "Completed" },
];

// ── Budget ──
export const budgets: Budget[] = [
  { category: "Food & Dining", spent: 420, limit: 600 },
  { category: "Transportation", spent: 180, limit: 300 },
  { category: "Entertainment", spent: 95, limit: 150 },
  { category: "Shopping", spent: 310, limit: 400 },
  { category: "Utilities", spent: 245, limit: 250 },
];

export const monthlyBudgetData: MonthlyBudget[] = [
  { month: "Jul", budget: 1500, actual: 1200 },
  { month: "Aug", budget: 1500, actual: 1400 },
  { month: "Sep", budget: 1600, actual: 1550 },
  { month: "Oct", budget: 1600, actual: 1300 },
  { month: "Nov", budget: 1700, actual: 1800 },
  { month: "Dec", budget: 1700, actual: 1650 },
];

// ── Goals ──
export const goals: Goal[] = [
  { name: "Emergency Fund", target: 10000, saved: 7500, icon: "shield" },
  { name: "Vacation Trip", target: 5000, saved: 2200, icon: "plane" },
  { name: "New Car", target: 30000, saved: 12000, icon: "car" },
  { name: "Home Down Payment", target: 60000, saved: 18000, icon: "home" },
];

// ── Analytics ──
export const analyticsWeekly = [
  { day: "Mon", income: 1200, expense: 800 },
  { day: "Tue", income: 900, expense: 1100 },
  { day: "Wed", income: 1500, expense: 700 },
  { day: "Thu", income: 800, expense: 900 },
  { day: "Fri", income: 2000, expense: 1200 },
  { day: "Sat", income: 600, expense: 1500 },
  { day: "Sun", income: 400, expense: 500 },
];

export const analyticsCategories = [
  { name: "Food", value: 35 },
  { name: "Bills", value: 25 },
  { name: "Shopping", value: 20 },
  { name: "Transport", value: 12 },
  { name: "Other", value: 8 },
];

export const analyticsTrend = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  value: 5000 + Math.sin(i / 3) * 2000 + Math.random() * 1000,
}));

export const analyticsStats = [
  { label: "Avg. Daily Spend", value: "$142", change: "-3.2%" },
  { label: "Transactions/Day", value: "8.4", change: "+1.5%" },
  { label: "Savings Rate", value: "24%", change: "+2.1%" },
  { label: "Top Category", value: "Food", change: "35%" },
];

// ── Cash Flow ──
export const monthlyFlow = [
  { month: "Jul", inflow: 6200, outflow: 4800 },
  { month: "Aug", inflow: 5800, outflow: 5200 },
  { month: "Sep", inflow: 7100, outflow: 4900 },
  { month: "Oct", inflow: 6500, outflow: 5500 },
  { month: "Nov", inflow: 8200, outflow: 6100 },
  { month: "Dec", inflow: 7400, outflow: 5800 },
  { month: "Jan", inflow: 6800, outflow: 5300 },
  { month: "Feb", inflow: 7900, outflow: 5100 },
];

// ── Investments ──
export const portfolio: PortfolioItem[] = [
  { name: "Stocks", value: 45000, allocation: 45, change: "+12.4%", up: true },
  { name: "Bonds", value: 20000, allocation: 20, change: "+3.2%", up: true },
  { name: "Real Estate", value: 15000, allocation: 15, change: "+7.8%", up: true },
  { name: "Crypto", value: 10000, allocation: 10, change: "-5.1%", up: false },
  { name: "Cash", value: 10000, allocation: 10, change: "+0.5%", up: true },
];

export const performanceData = Array.from({ length: 12 }, (_, i) => ({
  month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
  value: 80000 + Math.sin(i / 2) * 10000 + i * 2000 + Math.random() * 3000,
}));

// ── Help ──
export const faqs: FAQ[] = [
  { q: "How do I add a new bank account?", a: "Go to Wallet > Add Money > Link Bank Account." },
  { q: "How are budget limits calculated?", a: "Budget limits are set monthly and reset on the 1st." },
  { q: "Can I export my transactions?", a: "Yes, go to Transactions > Filter > Export CSV." },
  { q: "How do I change my notification settings?", a: "Settings > Notifications > Toggle preferences." },
];


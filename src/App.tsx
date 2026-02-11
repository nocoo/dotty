import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import Index from "./pages/Index";
import WalletPage from "./pages/WalletPage";
import CardsPage from "./pages/CardsPage";
import TransactionsPage from "./pages/TransactionsPage";
import BudgetPage from "./pages/BudgetPage";
import GoalsPage from "./pages/GoalsPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import CashFlowPage from "./pages/CashFlowPage";
import InvestmentsPage from "./pages/InvestmentsPage";
import HelpPage from "./pages/HelpPage";
import SettingsPage from "./pages/SettingsPage";
import PalettePage from "./pages/PalettePage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        {/* Layout route: sidebar + header wraps all dashboard pages */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/cards" element={<CardsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/goals" element={<GoalsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/cash-flow" element={<CashFlowPage />} />
          <Route path="/investments" element={<InvestmentsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/palette" element={<PalettePage />} />
        </Route>
        {/* Standalone pages (no sidebar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

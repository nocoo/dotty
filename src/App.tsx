import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import AccountsPage from "./pages/AccountsPage";
import CardShowcasePage from "./pages/CardShowcasePage";
import RecordListPage from "./pages/RecordListPage";
import ProgressTrackingPage from "./pages/ProgressTrackingPage";
import TargetCardsPage from "./pages/TargetCardsPage";
import StatsOverviewPage from "./pages/StatsOverviewPage";
import FlowComparisonPage from "./pages/FlowComparisonPage";
import PortfolioPage from "./pages/PortfolioPage";
import HelpPage from "./pages/HelpPage";
import SettingsPage from "./pages/SettingsPage";
import PalettePage from "./pages/PalettePage";
import LoginPage from "./pages/LoginPage";
import BadgeLoginPage from "./pages/BadgeLoginPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <Routes>
        {/* Layout route: sidebar + header wraps all dashboard pages */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/card-showcase" element={<CardShowcasePage />} />
          <Route path="/records" element={<RecordListPage />} />
          <Route path="/progress-tracking" element={<ProgressTrackingPage />} />
          <Route path="/targets" element={<TargetCardsPage />} />
          <Route path="/stats" element={<StatsOverviewPage />} />
          <Route path="/flow-comparison" element={<FlowComparisonPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/palette" element={<PalettePage />} />
        </Route>
        {/* Standalone pages (no sidebar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/badge-login" element={<BadgeLoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

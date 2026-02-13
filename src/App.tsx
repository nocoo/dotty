import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import ComponentsPage from "./pages/ComponentsPage";
import FormsPage from "./pages/FormsPage";
import TablesPage from "./pages/TablesPage";
import ControlsPage from "./pages/ControlsPage";
import ButtonsPage from "./pages/ButtonsPage";
import FeedbackPage from "./pages/FeedbackPage";
import OverlaysPage from "./pages/OverlaysPage";
import DataDisplayPage from "./pages/DataDisplayPage";
import NavigationPage from "./pages/NavigationPage";
import AccountsPage from "./pages/AccountsPage";
import RecordListPage from "./pages/RecordListPage";
import ProgressTrackingPage from "./pages/ProgressTrackingPage";
import StatsOverviewPage from "./pages/StatsOverviewPage";
import FlowComparisonPage from "./pages/FlowComparisonPage";
import PortfolioPage from "./pages/PortfolioPage";
import LayoutPage from "./pages/LayoutPage";
import SettingsPage from "./pages/SettingsPage";
import PalettePage from "./pages/PalettePage";
import InteractionShowcasePage from "./pages/InteractionShowcasePage";
import HealthPage from "./pages/HealthPage";
import PillsPage from "./pages/PillsPage";
import WearableDashboardPage from "./pages/WearableDashboardPage";
import BankingDashboardPage from "./pages/BankingDashboardPage";
import NetworkOpsDashboardPage from "./pages/NetworkOpsDashboardPage";
import LoginPage from "./pages/LoginPage";
import BadgeLoginPage from "./pages/BadgeLoginPage";
import StaticPage from "./pages/StaticPage";
import LoadingPage from "./pages/LoadingPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <TooltipProvider>
    <Sonner />
    <BrowserRouter>
      <Routes>
        {/* Layout route: sidebar + header wraps all dashboard pages */}
        <Route element={<DashboardLayout />}>
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/controls" element={<ControlsPage />} />
          <Route path="/buttons" element={<ButtonsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/overlays" element={<OverlaysPage />} />
          <Route path="/data-display" element={<DataDisplayPage />} />
          <Route path="/navigation" element={<NavigationPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/records" element={<RecordListPage />} />
          <Route path="/progress-tracking" element={<ProgressTrackingPage />} />
          <Route path="/stats" element={<StatsOverviewPage />} />
          <Route path="/flow-comparison" element={<FlowComparisonPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/layout" element={<LayoutPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/palette" element={<PalettePage />} />
          <Route path="/interactions" element={<InteractionShowcasePage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/pills" element={<PillsPage />} />
          <Route path="/wearable" element={<WearableDashboardPage />} />
          <Route path="/banking" element={<BankingDashboardPage />} />
          <Route path="/network" element={<NetworkOpsDashboardPage />} />
        </Route>
        {/* Standalone pages (no sidebar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/badge-login" element={<BadgeLoginPage />} />
        <Route path="/static-page" element={<StaticPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
);

export default App;

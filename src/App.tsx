import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import LibraryPage from "./pages/LibraryPage";
import ComponentsPage from "./pages/ComponentsPage";
import FormsPage from "./pages/FormsPage";
import TablesPage from "./pages/TablesPage";
import EmptyStatesPage from "./pages/EmptyStatesPage";
import PricingPage from "./pages/PricingPage";
import ProfilePage from "./pages/ProfilePage";
import OnboardingPage from "./pages/OnboardingPage";
import NotificationsPage from "./pages/NotificationsPage";
import ControlsPage from "./pages/ControlsPage";
import LandingPage from "./pages/LandingPage";
import FeaturePage from "./pages/FeaturePage";
import CheckoutPage from "./pages/CheckoutPage";
import InvoicePage from "./pages/InvoicePage";
import TeamPage from "./pages/TeamPage";
import CrmPage from "./pages/CrmPage";
import StatusPage from "./pages/StatusPage";
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
import InteractionShowcasePage from "./pages/InteractionShowcasePage";
import LifeAiPage from "./pages/LifeAiPage";
import HealthPage from "./pages/HealthPage";
import PillsPage from "./pages/PillsPage";
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
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/forms" element={<FormsPage />} />
          <Route path="/tables" element={<TablesPage />} />
          <Route path="/empty-states" element={<EmptyStatesPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/controls" element={<ControlsPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/feature" element={<FeaturePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/crm" element={<CrmPage />} />
          <Route path="/status" element={<StatusPage />} />
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
          <Route path="/interactions" element={<InteractionShowcasePage />} />
          <Route path="/life-ai" element={<LifeAiPage />} />
          <Route path="/health" element={<HealthPage />} />
          <Route path="/pills" element={<PillsPage />} />
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

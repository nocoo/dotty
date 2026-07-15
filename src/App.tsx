import { BrowserRouter, Route, Routes } from "react-router";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import AccountsPage from "./pages/AccountsPage";
import BadgeLoginPage from "./pages/BadgeLoginPage";
import BankingDashboardPage from "./pages/BankingDashboardPage";
import ComponentsPage from "./pages/ComponentsPage";
import DashboardPage from "./pages/DashboardPage";
import DataPage from "./pages/DataPage";
import FlowComparisonPage from "./pages/FlowComparisonPage";
import FormsPage from "./pages/FormsPage";
import HealthPage from "./pages/HealthPage";
import InteractionShowcasePage from "./pages/InteractionShowcasePage";
import InteractivePage from "./pages/InteractivePage";
import LayoutPage from "./pages/LayoutPage";
import LoadingPage from "./pages/LoadingPage";
import LoginPage from "./pages/LoginPage";
import NavigationPage from "./pages/NavigationPage";
import NetworkOpsDashboardPage from "./pages/NetworkOpsDashboardPage";
import NotFound from "./pages/NotFound";
import PalettePage from "./pages/PalettePage";
import PortfolioPage from "./pages/PortfolioPage";
import ProgressTrackingPage from "./pages/ProgressTrackingPage";
import SettingsPage from "./pages/SettingsPage";
import StaticPage from "./pages/StaticPage";
import WearableDashboardPage from "./pages/WearableDashboardPage";

const App = () => (
	<TooltipProvider>
		<Sonner />
		<BrowserRouter>
			<Routes>
				{/* Layout route: sidebar + header wraps all dashboard pages */}
				<Route element={<DashboardLayout />}>
					<Route path="/components" element={<ComponentsPage />} />
					<Route path="/forms" element={<FormsPage />} />
					<Route path="/navigation" element={<NavigationPage />} />
					<Route path="/interactive" element={<InteractivePage />} />
					<Route path="/data" element={<DataPage />} />
					<Route path="/" element={<DashboardPage />} />
					<Route path="/accounts" element={<AccountsPage />} />
					<Route path="/progress-tracking" element={<ProgressTrackingPage />} />
					<Route path="/flow-comparison" element={<FlowComparisonPage />} />
					<Route path="/portfolio" element={<PortfolioPage />} />
					<Route path="/layout" element={<LayoutPage />} />
					<Route path="/settings" element={<SettingsPage />} />
					<Route path="/palette" element={<PalettePage />} />
					<Route path="/interactions" element={<InteractionShowcasePage />} />
					<Route path="/health" element={<HealthPage />} />
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

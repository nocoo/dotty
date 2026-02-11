import { useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-1">Page not found</p>
        <p className="text-sm text-muted-foreground mb-6">{location.pathname}</p>
        <a href="/" className="rounded-[10px] bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          Back to Dashboard
        </a>
      </div>
    </div>
  );
}

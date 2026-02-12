import { Link } from "react-router-dom";
import { Mountain, User } from "lucide-react";

export default function BadgeLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      {/* Lanyard */}
      <div className="flex flex-col items-center">
        {/* Clip */}
        <div className="relative z-10 h-4 w-10 rounded-t-md bg-zinc-400 dark:bg-zinc-500" />
        {/* Strap */}
        <div className="h-8 w-1 bg-zinc-400 dark:bg-zinc-500" />

        {/* Badge card */}
        <div className="relative aspect-[54/86] w-72 overflow-hidden rounded-2xl bg-card shadow-xl ring-1 ring-border">
          {/* Header strip */}
          <div className="flex items-center justify-between bg-primary px-5 py-4">
            <div className="flex items-center gap-2">
              <Mountain className="h-4 w-4 text-primary-foreground" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-primary-foreground">basalt.</span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-widest text-primary-foreground/60">
              Visitor
            </span>
          </div>

          {/* Badge content */}
          <div className="flex flex-1 flex-col items-center px-6 pt-6">
            {/* Avatar placeholder */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary ring-2 ring-border">
              <User className="h-8 w-8 text-muted-foreground" strokeWidth={1.5} />
            </div>

            <p className="mt-4 text-base font-semibold text-foreground">Welcome</p>
            <p className="mt-1 text-xs text-muted-foreground">Sign in to get your badge</p>

            {/* Divider */}
            <div className="my-5 h-px w-full bg-border" />

            {/* Google Sign-in button */}
            <button className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-secondary px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent">
              <svg className="h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Terms */}
            <p className="mt-4 text-center text-[10px] leading-relaxed text-muted-foreground/60">
              By signing in you agree to our Terms of Service and Privacy Policy
            </p>
          </div>

          {/* Footer strip */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center border-t border-border bg-secondary/50 py-3">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
              <span className="text-[10px] text-muted-foreground">Secure authentication</span>
            </div>
          </div>
        </div>

        {/* Back link below badge */}
        <p className="mt-6 text-sm text-muted-foreground">
          <Link to="/" className="text-primary hover:text-primary/80 transition-colors">
            Back to Dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}

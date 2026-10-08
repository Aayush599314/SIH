import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Bell, Braces, LogOut, ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";
import { useAuth } from "@/hooks/useAuth";

const NAV_ITEMS = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Visualizer", to: "/dashboard#playground" },
  { label: "Algorithms", to: "/dashboard#algorithms" },
  { label: "Challenges", to: "/dashboard#challenge" },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase() || "U";
}

export function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setMenuOpen(false);
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-[var(--color-border)] bg-[var(--color-void)]/85 px-5 backdrop-blur-xl">
      {/* Brand */}
      <Link to="/dashboard" className="flex items-center gap-2 pr-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-lime-400/25 bg-lime-400/10 text-lime-400">
          <Braces className="h-4 w-4" strokeWidth={2.25} />
        </span>
        <span className="font-mono text-[13px] font-semibold tracking-tight text-[var(--color-ink)]">
          AlgoMinds<span className="text-lime-400">.AI</span>
        </span>
      </Link>

      <div className="mx-1 h-5 w-px bg-[var(--color-border)]" />

      {/* Primary nav */}
      <nav className="hidden items-center gap-1 md:flex">
        {NAV_ITEMS.map((item) => {
          const active = item.label === "Dashboard" && location.pathname.startsWith("/dashboard");
          return (
            <Link
              key={item.label}
              to={item.to}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[13px] font-medium transition-colors",
                active
                  ? "bg-[var(--color-surface-2)] text-[var(--color-ink)]"
                  : "text-[var(--color-ink-dim)] hover:bg-[var(--color-surface-2)]/70 hover:text-[var(--color-ink)]",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex-1" />

      {/* Search */}
      <label className="relative hidden w-56 items-center sm:flex lg:w-72">
        <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-[var(--color-ink-faint)]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search data structures..."
          className="w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] py-1.5 pl-8 pr-3 text-[13px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] outline-none transition-colors focus:border-lime-400/40"
        />
      </label>

      {/* Live status */}
      <div className="hidden items-center gap-1.5 rounded-full border border-lime-400/25 bg-lime-400/10 px-2.5 py-1 sm:flex">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime-400" />
        </span>
        <span className="font-mono text-[10px] font-semibold tracking-wider text-lime-400">LIVE</span>
      </div>

      <button
        type="button"
        aria-label="Notifications"
        className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-ink-dim)] transition-colors hover:text-[var(--color-ink)]"
      >
        <Bell className="h-3.5 w-3.5" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-orange-400" />
      </button>

      {/* Profile */}
      <div className="relative">
        <button
          type="button"
          aria-label="Profile menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-1.5 rounded-full py-0.5 pl-0.5 pr-1.5 transition hover:bg-[var(--color-surface-2)]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-lime-400 to-cyan-400 text-[11px] font-bold text-[#06070a]">
            {getInitials(user?.name ?? "Learner")}
          </span>
          <ChevronDown className="hidden h-3.5 w-3.5 text-[var(--color-ink-faint)] sm:block" />
        </button>

        {menuOpen && (
          <>
            {/* Backdrop to close the menu on outside click */}
            <button
              type="button"
              aria-hidden="true"
              tabIndex={-1}
              className="fixed inset-0 z-40 cursor-default"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-0 top-11 z-50 w-56 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-2xl">
              <div className="border-b border-[var(--color-border)] px-4 py-3">
                <p className="truncate text-[13px] font-semibold text-[var(--color-ink)]">{user?.name}</p>
                <p className="truncate text-xs text-[var(--color-ink-faint)]">{user?.email}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-[13px] text-[var(--color-ink-dim)] transition hover:bg-[var(--color-surface-2)] hover:text-[var(--color-ink)]"
              >
                <LogOut className="h-3.5 w-3.5" />
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}

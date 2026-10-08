import type { ReactNode } from "react";
import { TopNavbar } from "./TopNavbar";
import { Sidebar } from "./Sidebar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-[var(--color-void)]">
      <TopNavbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}

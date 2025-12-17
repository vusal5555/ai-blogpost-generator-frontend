import { Sidebar } from "@/components/Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <Sidebar />

      {/* Main content area - offset by sidebar width */}
      <div className="pl-64">{children}</div>
    </div>
  );
}

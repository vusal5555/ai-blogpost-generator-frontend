"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "📊",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Generate",
    href: "/generate",
    icon: "✍️",
    gradient: "from-violet-500 to-purple-500",
  },
  {
    title: "Timeline",
    href: "/timeline",
    icon: "📜",
    gradient: "from-amber-500 to-orange-500",
    disabled: true,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800/50 bg-slate-900">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-slate-800/50 px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-linear-to-br from-violet-500 to-cyan-500 rounded-xl shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-all group-hover:scale-105" />
          <span className="text-xl font-bold bg-linear-to-r from-white to-slate-300 bg-clip-text text-transparent">
            ContentOps
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-1 p-4 mt-2">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-3">
          Menu
        </p>
        {sidebarItems.map((item) => {
          if (item.disabled) return null;

          const isActive =
            pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-slate-400 transition-all duration-200 hover:text-white group",
                isActive
                  ? "bg-linear-to-r from-violet-600/20 to-cyan-600/20 text-white border border-violet-500/20 shadow-lg shadow-violet-500/5"
                  : "hover:bg-slate-800/50"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all",
                  isActive
                    ? `bg-linear-to-br ${item.gradient} shadow-md`
                    : "bg-slate-800/80 group-hover:bg-slate-700/80"
                )}
              >
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-linear-to-r from-violet-400 to-cyan-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Decorative gradient line */}
      <div className="absolute bottom-20 left-4 right-4">
        <div className="h-px bg-linear-to-r from-transparent via-slate-700 to-transparent" />
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-violet-400 transition-colors duration-200 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            ←
          </span>
          <span>Back to Home</span>
        </Link>
      </div>
    </aside>
  );
}

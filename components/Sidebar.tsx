"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "📊",
  },
  {
    title: "Generate",
    href: "/generate",
    icon: "✍️",
  },
  {
    title: "Timeline",
    href: "/timeline",
    icon: "📜",
    disabled: true, // We'll handle this differently
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-800 bg-slate-950">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-slate-800 px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-linear-from-violet-500 to-cyan-500 rounded-lg" />
          <span className="text-xl font-bold text-white">ContentOps</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 p-4">
        {sidebarItems.map((item) => {
          if (item.disabled) return null;

          const isActive =
            pathname === item.href || pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-slate-400 transition-all hover:text-white hover:bg-slate-800",
                isActive && "bg-slate-800 text-white"
              )}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-800 p-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition"
        >
          ← Back to Home
        </Link>
      </div>
    </aside>
  );
}

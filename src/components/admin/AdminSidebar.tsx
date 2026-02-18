"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Wrench,
  FolderKanban,
  Factory,
  Newspaper,
  Briefcase,
  MapPin,
  ExternalLink,
  Crosshair,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Team Members",
    href: "/admin/team",
    icon: Users,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Wrench,
  },
  {
    label: "Projects",
    href: "/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "Markets",
    href: "/admin/markets",
    icon: Factory,
  },
  {
    label: "News & Events",
    href: "/admin/news",
    icon: Newspaper,
  },
  {
    label: "Careers",
    href: "/admin/careers",
    icon: Briefcase,
  },
  {
    label: "Locations",
    href: "/admin/locations",
    icon: MapPin,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-tactical-900 border-r border-tactical-700 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-tactical-700">
        <Link href="/admin" className="flex items-center space-x-3">
          <Crosshair className="h-8 w-8 text-sand-500" />
          <div>
            <span className="text-lg font-bold text-tactical-100 tracking-tight">SNIPER</span>
            <span className="block text-[10px] text-sand-500 tracking-[0.2em] uppercase">Elite Services</span>
          </div>
        </Link>
        <p className="text-tactical-500 text-xs mt-2">Content Management</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-colors",
                active
                  ? "bg-sand-500/10 text-sand-400 border border-sand-500/30"
                  : "text-tactical-400 hover:text-tactical-200 hover:bg-tactical-800"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-tactical-700">
        <Link
          href="/"
          target="_blank"
          className="flex items-center space-x-2 text-tactical-500 hover:text-tactical-300 text-sm transition-colors"
        >
          <ExternalLink className="h-4 w-4" />
          <span>View Website</span>
        </Link>
      </div>
    </aside>
  );
}

import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata: Metadata = {
  title: "Admin Dashboard | Sniper Elite Services",
  description: "Sniper Elite Services content management dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-tactical-950">
      <AdminSidebar />
      <div className="ml-64">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

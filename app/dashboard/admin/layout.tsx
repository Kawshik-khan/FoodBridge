import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="admin" />
      <div className="lg:pl-64 pl-20 transition-all duration-300">
        <DashboardHeader title="Admin Panel" subtitle="Manage platform operations" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

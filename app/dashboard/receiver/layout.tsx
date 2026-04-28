import { Sidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"

export default function ReceiverDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar role="receiver" />
      <div className="lg:pl-64 pl-20 transition-all duration-300">
        <DashboardHeader title="Receiver Dashboard" subtitle="Find and request food donations" />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}

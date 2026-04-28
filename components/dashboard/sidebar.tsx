"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Plus, 
  Package, 
  Inbox, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Users,
  MapPin,
  Truck,
  AlertTriangle,
  Shield
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  role: "donor" | "receiver" | "admin"
}

const roleNavItems = {
  donor: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/donor" },
    { icon: Plus, label: "Post Donation", href: "/dashboard/donor/post" },
    { icon: Package, label: "My Donations", href: "/dashboard/donor/donations" },
    { icon: Inbox, label: "Requests", href: "/dashboard/donor/requests" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/donor/messages" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/donor/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/donor/settings" },
  ],
  receiver: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/receiver" },
    { icon: MapPin, label: "Nearby Donations", href: "/dashboard/receiver/nearby" },
    { icon: Inbox, label: "My Requests", href: "/dashboard/receiver/requests" },
    { icon: Truck, label: "Pickups", href: "/dashboard/receiver/pickups" },
    { icon: MessageSquare, label: "Messages", href: "/dashboard/receiver/messages" },
    { icon: Settings, label: "Settings", href: "/dashboard/receiver/settings" },
  ],
  admin: [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
    { icon: Users, label: "Users", href: "/dashboard/admin/users" },
    { icon: Shield, label: "NGO Approvals", href: "/dashboard/admin/approvals" },
    { icon: AlertTriangle, label: "Reports", href: "/dashboard/admin/reports" },
    { icon: BarChart3, label: "Analytics", href: "/dashboard/admin/analytics" },
    { icon: Settings, label: "Settings", href: "/dashboard/admin/settings" },
  ],
}

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)
  const navItems = roleNavItems[role]

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <svg
                className="h-6 w-6 text-primary-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            {!collapsed && (
              <span className="text-lg font-bold text-sidebar-foreground">FoodBridge</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8 text-sidebar-foreground"
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            )
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-sidebar-border p-4">
          <div className={cn(
            "flex items-center gap-3",
            collapsed ? "justify-center" : ""
          )}>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sidebar-accent text-sm font-semibold text-sidebar-foreground">
              JD
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="truncate text-sm font-medium text-sidebar-foreground">John Doe</p>
                <p className="truncate text-xs text-sidebar-foreground/60 capitalize">{role}</p>
              </div>
            )}
          </div>
          <Button
            variant="ghost"
            className={cn(
              "mt-4 w-full text-sidebar-foreground/70 hover:text-sidebar-foreground",
              collapsed ? "px-0" : ""
            )}
            asChild
          >
            <Link href="/login">
              <LogOut className="h-4 w-4" />
              {!collapsed && <span className="ml-2">Sign Out</span>}
            </Link>
          </Button>
        </div>
      </div>
    </aside>
  )
}

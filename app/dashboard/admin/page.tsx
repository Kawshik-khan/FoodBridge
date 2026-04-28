"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  Building2, 
  Package, 
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  MoreHorizontal,
  ArrowRight,
  Shield,
  Eye
} from "lucide-react"

// Animated counter component
function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 1500
    const steps = 40
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value])

  return <span>{count.toLocaleString()}{suffix}</span>
}

const stats = [
  { label: "Total Users", value: 12847, icon: Users, color: "primary", change: "+12%", trend: "up" },
  { label: "Pending NGO Verifications", value: 23, icon: Building2, color: "accent", change: "+5", trend: "up" },
  { label: "Active Donations", value: 1893, icon: Package, color: "secondary", change: "+8%", trend: "up" },
  { label: "Abuse Reports", value: 7, icon: AlertTriangle, color: "destructive", change: "-3", trend: "down" },
]

const pendingNGOs = [
  { id: 1, name: "Community Food Bank", email: "contact@cfb.org", submitted: "2 hours ago", documents: 3, status: "pending" },
  { id: 2, name: "Hope Shelter Foundation", email: "info@hopeshelter.org", submitted: "5 hours ago", documents: 4, status: "pending" },
  { id: 3, name: "City Mission Network", email: "admin@citymission.org", submitted: "1 day ago", documents: 2, status: "review" },
  { id: 4, name: "Local Aid Society", email: "support@localaid.org", submitted: "2 days ago", documents: 5, status: "pending" },
]

const recentUsers = [
  { id: 1, name: "John Smith", email: "john@restaurant.com", role: "donor", joined: "10 min ago", verified: true },
  { id: 2, name: "Sarah Johnson", email: "sarah@ngo.org", role: "receiver", joined: "25 min ago", verified: true },
  { id: 3, name: "Mike Brown", email: "mike@cafe.com", role: "donor", joined: "1 hour ago", verified: false },
  { id: 4, name: "Emily Davis", email: "emily@shelter.org", role: "receiver", joined: "2 hours ago", verified: true },
  { id: 5, name: "Chris Wilson", email: "chris@market.com", role: "donor", joined: "3 hours ago", verified: false },
]

const recentReports = [
  { id: 1, type: "Fake Donation", reporter: "Hope Shelter", reported: "Unknown User", status: "open", time: "30 min ago" },
  { id: 2, type: "Spam Content", reporter: "City Mission", reported: "Spam Account", status: "investigating", time: "2 hours ago" },
  { id: 3, type: "Quality Issue", reporter: "Food Bank", reported: "Bad Restaurant", status: "resolved", time: "1 day ago" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"ngos" | "users" | "reports">("ngos")

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          const colorClasses: Record<string, string> = {
            primary: "bg-primary/20 text-primary",
            secondary: "bg-secondary/20 text-secondary",
            accent: "bg-accent/20 text-accent",
            destructive: "bg-destructive/20 text-destructive",
          }
          
          return (
            <div key={stat.label} className="bento-card glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-2.5 ${colorClasses[stat.color]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className={`flex items-center gap-1 text-xs font-medium ${
                  stat.trend === "up" ? "text-primary" : "text-destructive"
                }`}>
                  {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {stat.change}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">
                  <AnimatedCounter value={stat.value} />
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Tabs */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-border pb-4">
            <button
              onClick={() => setActiveTab("ngos")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "ngos" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Building2 className="inline-block mr-2 h-4 w-4" />
              NGO Approvals
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "users" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="inline-block mr-2 h-4 w-4" />
              Manage Users
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "reports" 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <AlertTriangle className="inline-block mr-2 h-4 w-4" />
              Reports
            </button>
          </div>

          {/* NGO Approvals Tab */}
          {activeTab === "ngos" && (
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Pending NGO Verifications</h3>
                <span className="bg-accent/20 text-accent px-3 py-1 rounded-full text-xs font-medium">
                  {pendingNGOs.length} pending
                </span>
              </div>
              <div className="space-y-4">
                {pendingNGOs.map((ngo) => (
                  <div 
                    key={ngo.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20 text-secondary font-semibold">
                        {ngo.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{ngo.name}</p>
                        <p className="text-sm text-muted-foreground">{ngo.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-muted-foreground">{ngo.documents} documents</span>
                          <span className="text-xs text-muted-foreground">• {ngo.submitted}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="mr-1 h-3 w-3" />
                        Review
                      </Button>
                      <Button size="sm" className="bg-primary">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Approve
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === "users" && (
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Recent Users</h3>
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Joined</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium text-primary">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-foreground">{user.name}</p>
                              <p className="text-xs text-muted-foreground">{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            user.role === "donor" 
                              ? "bg-primary/20 text-primary" 
                              : "bg-secondary/20 text-secondary"
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {user.verified ? (
                            <span className="inline-flex items-center gap-1 text-primary text-xs">
                              <CheckCircle className="h-3 w-3" />
                              Verified
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-muted-foreground text-xs">
                              <Clock className="h-3 w-3" />
                              Pending
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">{user.joined}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === "reports" && (
            <div className="glass-card rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Abuse Reports</h3>
                <span className="bg-destructive/20 text-destructive px-3 py-1 rounded-full text-xs font-medium">
                  {recentReports.filter(r => r.status !== "resolved").length} active
                </span>
              </div>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div 
                    key={report.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`rounded-xl p-3 ${
                        report.status === "resolved" 
                          ? "bg-primary/20" 
                          : report.status === "investigating" 
                          ? "bg-accent/20" 
                          : "bg-destructive/20"
                      }`}>
                        <AlertTriangle className={`h-5 w-5 ${
                          report.status === "resolved" 
                            ? "text-primary" 
                            : report.status === "investigating" 
                            ? "text-accent" 
                            : "text-destructive"
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report.type}</p>
                        <p className="text-sm text-muted-foreground">
                          Reported by {report.reporter} • {report.reported}
                        </p>
                        <p className="text-xs text-muted-foreground">{report.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        report.status === "resolved" 
                          ? "bg-primary/20 text-primary" 
                          : report.status === "investigating" 
                          ? "bg-accent/20 text-accent" 
                          : "bg-destructive/20 text-destructive"
                      }`}>
                        {report.status}
                      </span>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Shield className="mr-2 h-4 w-4 text-primary" />
                Verify New NGO
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="mr-2 h-4 w-4 text-secondary" />
                Manage Users
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <AlertTriangle className="mr-2 h-4 w-4 text-accent" />
                Review Reports
              </Button>
            </div>
          </div>

          {/* Platform Health */}
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Platform Health</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Rate</span>
                <span className="text-sm font-medium text-primary">98.5%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "98.5%" }} />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">Verification Rate</span>
                <span className="text-sm font-medium text-secondary">94.2%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-secondary rounded-full" style={{ width: "94.2%" }} />
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-muted-foreground">Report Resolution</span>
                <span className="text-sm font-medium text-accent">87.8%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "87.8%" }} />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="glass-card rounded-3xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: "NGO Approved", target: "Hope Shelter", time: "5 min ago", icon: CheckCircle, color: "text-primary" },
                { action: "User Suspended", target: "spam_user", time: "1 hour ago", icon: XCircle, color: "text-destructive" },
                { action: "Report Resolved", target: "#1234", time: "2 hours ago", icon: Shield, color: "text-secondary" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3">
                  <activity.icon className={`h-4 w-4 ${activity.color}`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground truncate">
                      {activity.action}: {activity.target}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import useRemote from "@/hooks/use-remote"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TodoList } from "@/components/ui/todo-list"
import { 
  Package, 
  Clock, 
  CheckCircle, 
  TrendingUp, 
  Plus,
  ArrowRight,
  MapPin,
  Calendar
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

export default function DonorDashboard() {
  const { data: stats = [] } = useRemote('donor.stats', [])
  const { data: recentRequests = [] } = useRemote('donor.recentRequests', [])
  const { data: nearbyReceivers = [] } = useRemote('donor.nearbyReceivers', [])

  const iconMap: Record<string, any> = {
    "Total Donations": Package,
    "Pending Pickups": Clock,
    "Completed": CheckCircle,
    "Impact Score": TrendingUp,
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bento-card glass-card rounded-3xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Welcome back, John!</h2>
            <p className="mt-1 text-muted-foreground">
              You&apos;ve helped save 2,450 meals this month. Keep up the great work!
            </p>
          </div>
          <Button asChild className="glow-primary shrink-0">
            <Link href="/dashboard/donor/post">
              <Plus className="mr-2 h-4 w-4" />
              Post Donation
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat: any) => {
          const Icon = iconMap[stat.label] || Package
          const colorClasses = {
            primary: "bg-primary/20 text-primary",
            secondary: "bg-secondary/20 text-secondary",
            accent: "bg-accent/20 text-accent",
          }
          const colorKey = stat.color && colorClasses[stat.color as keyof typeof colorClasses] ? stat.color : "primary"
          const change = stat.change || ""
          const suffix = stat.suffix || ""
          
          return (
            <div key={stat.label} className="bento-card glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-2.5 ${colorClasses[colorKey as keyof typeof colorClasses]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-primary">{change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">
                  <AnimatedCounter value={stat.value} suffix={suffix} />
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Requests */}
        <div className="lg:col-span-2 bento-card glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Requests</h3>
            <Link href="/dashboard/donor/requests" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentRequests.map((request: any) => (
              <div 
                key={request.id} 
                className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                    {request.receiver.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{request.receiver}</p>
                    <p className="text-sm text-muted-foreground">
                      {request.food} • {request.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    request.status === "pending" 
                      ? "bg-accent/20 text-accent"
                      : request.status === "accepted"
                      ? "bg-secondary/20 text-secondary"
                      : "bg-primary/20 text-primary"
                  }`}>
                    {request.status}
                  </span>
                  <p className="mt-1 text-xs text-muted-foreground">{request.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Receivers */}
        <div className="bento-card glass-card rounded-3xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Nearby Receivers</h3>
            <MapPin className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="space-y-3">
            {nearbyReceivers.map((receiver: any) => (
              <div 
                key={receiver.name}
                className="flex items-center justify-between p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20 text-xs font-semibold text-secondary">
                    {receiver.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-sm font-medium text-foreground">{receiver.name}</p>
                      {receiver.verified && (
                        <svg className="h-3.5 w-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{receiver.distance}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* To-Do List */}
        <div className="lg:col-span-1">
          <TodoList title="Donation Tasks" />
        </div>
      </div>
    </div>
  )
}

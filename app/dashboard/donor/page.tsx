"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
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

const stats = [
  { label: "Total Donations", value: 127, icon: Package, color: "primary", change: "+12%" },
  { label: "Pending Pickups", value: 8, icon: Clock, color: "accent", change: "+3" },
  { label: "Completed", value: 119, icon: CheckCircle, color: "secondary", change: "+8%" },
  { label: "Impact Score", value: 94, suffix: "%", icon: TrendingUp, color: "primary", change: "+2%" },
]

const recentRequests = [
  { id: 1, receiver: "Community Food Bank", food: "Fresh Vegetables", quantity: "15 kg", time: "10 min ago", status: "pending" },
  { id: 2, receiver: "Hope Shelter", food: "Bread & Pastries", quantity: "20 items", time: "25 min ago", status: "pending" },
  { id: 3, receiver: "City Mission", food: "Cooked Meals", quantity: "30 portions", time: "1 hour ago", status: "accepted" },
  { id: 4, receiver: "Local NGO", food: "Dairy Products", quantity: "10 kg", time: "2 hours ago", status: "completed" },
]

const nearbyReceivers = [
  { name: "Community Food Bank", distance: "1.2 km", verified: true },
  { name: "Hope Shelter", distance: "2.5 km", verified: true },
  { name: "City Mission", distance: "3.1 km", verified: true },
  { name: "Local NGO", distance: "4.8 km", verified: false },
]

export default function DonorDashboard() {
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
        {stats.map((stat) => {
          const Icon = stat.icon
          const colorClasses = {
            primary: "bg-primary/20 text-primary",
            secondary: "bg-secondary/20 text-secondary",
            accent: "bg-accent/20 text-accent",
          }
          
          return (
            <div key={stat.label} className="bento-card glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-2.5 ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-xs font-medium text-primary">{stat.change}</span>
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
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
            {recentRequests.map((request) => (
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
            {nearbyReceivers.map((receiver) => (
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
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">{receiver.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/donor/post" className="bento-card glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-primary/30 transition-colors">
          <div className="rounded-xl bg-primary/20 p-3">
            <Plus className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">Quick Donation</p>
            <p className="text-sm text-muted-foreground">Post food in 30 seconds</p>
          </div>
        </Link>
        <Link href="/dashboard/donor/donations" className="bento-card glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-secondary/30 transition-colors">
          <div className="rounded-xl bg-secondary/20 p-3">
            <Package className="h-5 w-5 text-secondary" />
          </div>
          <div>
            <p className="font-medium text-foreground">My Donations</p>
            <p className="text-sm text-muted-foreground">Track all your contributions</p>
          </div>
        </Link>
        <Link href="/dashboard/donor/analytics" className="bento-card glass-card rounded-2xl p-5 flex items-center gap-4 hover:border-accent/30 transition-colors">
          <div className="rounded-xl bg-accent/20 p-3">
            <Calendar className="h-5 w-5 text-accent" />
          </div>
          <div>
            <p className="font-medium text-foreground">Schedule Pickup</p>
            <p className="text-sm text-muted-foreground">Set recurring donations</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

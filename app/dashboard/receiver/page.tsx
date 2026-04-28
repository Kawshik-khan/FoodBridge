"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TodoList } from "@/components/ui/todo-list"
import { Input } from "@/components/ui/input"
import { 
  MapPin, 
  Clock, 
  Search,
  Filter,
  ArrowRight,
  Package,
  CheckCircle,
  Truck,
  Star,
  Heart
} from "lucide-react"
import useRemote from "@/hooks/use-remote"

export default function ReceiverDashboard() {
  const { data: stats = [] } = useRemote('receiver.stats', [])
  const { data: nearbyDonations = [] } = useRemote('receiver.nearbyDonations', [])
  const { data: categories = [] } = useRemote('receiver.categories', [])

  const [selectedCategory, setSelectedCategory] = useState(categories[0] || "All")
  const [searchQuery, setSearchQuery] = useState("")
  const [requestedIds, setRequestedIds] = useState<number[]>([])

  const filteredDonations = nearbyDonations.filter((donation: any) => {
    const matchesCategory = selectedCategory === "All" || donation.category === selectedCategory
    const matchesSearch = donation.foodName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         donation.donor.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRequest = (id: number) => {
    setRequestedIds([...requestedIds, id])
  }

  return (
    <div className="space-y-6">
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
              </div>
              <div className="mt-4">
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Search and Filter */}
      <div className="glass-card rounded-3xl p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search donations by food or donor..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            <Filter className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
            </div>
          </div>
        </div>

      {/* Donations List + To-Do */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {filteredDonations.map((donation: any) => (
            <div key={donation.id} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold text-foreground">{donation.foodName}</p>
                <p className="text-sm text-muted-foreground">{donation.donor} • {donation.quantity} • {donation.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs text-muted-foreground">{donation.distance} • {donation.expiresIn}</div>
                <Button onClick={() => handleRequest(donation.id)} disabled={requestedIds.includes(donation.id)}>Request</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <TodoList title="Pickup Tasks" />
        </div>
      </div>
    </div>
  )
}

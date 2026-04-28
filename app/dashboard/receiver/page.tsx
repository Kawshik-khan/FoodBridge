"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
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

const stats = [
  { label: "Nearby Donations", value: 23, icon: MapPin, color: "primary" },
  { label: "My Requests", value: 5, icon: Package, color: "secondary" },
  { label: "Approved Pickups", value: 3, icon: CheckCircle, color: "accent" },
  { label: "Completed", value: 47, icon: Truck, color: "primary" },
]

const nearbyDonations = [
  {
    id: 1,
    foodName: "Fresh Vegetable Mix",
    donor: "Green Restaurant",
    donorRating: 4.9,
    quantity: "15 kg",
    category: "Fresh Produce",
    distance: "0.8 km",
    expiresIn: "4 hours",
    image: null,
    verified: true,
  },
  {
    id: 2,
    foodName: "Bread & Pastries",
    donor: "City Bakery",
    donorRating: 4.7,
    quantity: "25 items",
    category: "Bakery Items",
    distance: "1.2 km",
    expiresIn: "6 hours",
    image: null,
    verified: true,
  },
  {
    id: 3,
    foodName: "Cooked Meals",
    donor: "Hotel Grand",
    donorRating: 5.0,
    quantity: "40 portions",
    category: "Cooked Meals",
    distance: "1.5 km",
    expiresIn: "3 hours",
    image: null,
    verified: true,
  },
  {
    id: 4,
    foodName: "Dairy Products",
    donor: "Fresh Mart",
    donorRating: 4.8,
    quantity: "20 kg",
    category: "Dairy",
    distance: "2.1 km",
    expiresIn: "8 hours",
    image: null,
    verified: false,
  },
  {
    id: 5,
    foodName: "Canned Goods",
    donor: "Superstore",
    donorRating: 4.6,
    quantity: "50 items",
    category: "Packaged Food",
    distance: "2.8 km",
    expiresIn: "48 hours",
    image: null,
    verified: true,
  },
  {
    id: 6,
    foodName: "Fresh Fruits",
    donor: "Fruit Market",
    donorRating: 4.9,
    quantity: "30 kg",
    category: "Fresh Produce",
    distance: "3.2 km",
    expiresIn: "12 hours",
    image: null,
    verified: true,
  },
]

const categories = ["All", "Fresh Produce", "Cooked Meals", "Bakery Items", "Dairy", "Packaged Food"]

export default function ReceiverDashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [requestedIds, setRequestedIds] = useState<number[]>([])

  const filteredDonations = nearbyDonations.filter(donation => {
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

      {/* Donations Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDonations.map((donation) => {
          const isRequested = requestedIds.includes(donation.id)
          
          return (
            <div key={donation.id} className="bento-card glass-card rounded-3xl overflow-hidden">
              {/* Image */}
              <div className="h-40 bg-muted flex items-center justify-center relative">
                <Package className="h-12 w-12 text-muted-foreground" />
                {/* Urgency Badge */}
                {parseInt(donation.expiresIn) <= 4 && (
                  <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-medium px-2 py-1 rounded-full">
                    Urgent
                  </span>
                )}
                {/* Save Button */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/80 transition-colors">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{donation.foodName}</h3>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-sm text-muted-foreground">{donation.donor}</span>
                      {donation.verified && (
                        <svg className="h-4 w-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-accent">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-medium">{donation.donorRating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                    <Package className="h-3 w-3" />
                    {donation.quantity}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    {donation.distance}
                  </span>
                  <span className="inline-flex items-center gap-1 bg-muted px-2 py-1 rounded-md text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {donation.expiresIn}
                  </span>
                </div>

                <Button 
                  className={`w-full ${isRequested ? "bg-secondary hover:bg-secondary" : ""}`}
                  onClick={() => handleRequest(donation.id)}
                  disabled={isRequested}
                >
                  {isRequested ? (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Requested
                    </>
                  ) : (
                    <>
                      Request
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty State */}
      {filteredDonations.length === 0 && (
        <div className="text-center py-12">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No donations found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}

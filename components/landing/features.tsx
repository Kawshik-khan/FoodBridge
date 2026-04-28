"use client"

import { 
  Utensils, 
  MapPin, 
  Calendar, 
  Star, 
  Shield, 
  Bell 
} from "lucide-react"

const features = [
  {
    icon: Utensils,
    title: "Food Posting",
    description: "List surplus food in seconds with our smart form. Add photos, quantities, and pickup times effortlessly.",
    color: "primary",
    span: "lg:col-span-2",
  },
  {
    icon: MapPin,
    title: "GPS Matching",
    description: "AI-powered matching connects donors with the nearest receivers for faster pickups.",
    color: "secondary",
    span: "",
  },
  {
    icon: Calendar,
    title: "Pickup Scheduling",
    description: "Flexible scheduling lets you choose convenient pickup windows.",
    color: "accent",
    span: "",
  },
  {
    icon: Star,
    title: "Ratings & Reviews",
    description: "Build trust with verified ratings. Top donors get recognition badges.",
    color: "primary",
    span: "",
  },
  {
    icon: Shield,
    title: "Admin Security",
    description: "Robust verification ensures only legitimate NGOs and individuals receive food.",
    color: "secondary",
    span: "",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description: "Real-time alerts for new donations, pickup confirmations, and delivery updates.",
    color: "accent",
    span: "lg:col-span-2",
  },
]

export function Features() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            Features
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Everything you need to
            <br />
            <span className="gradient-text">fight food waste</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            A complete platform for food donation, from posting to pickup. Simple, secure, and impactful.
          </p>
        </div>

        {/* Features Bento Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const colorClasses = {
              primary: "bg-primary/20 text-primary",
              secondary: "bg-secondary/20 text-secondary",
              accent: "bg-accent/20 text-accent",
            }
            
            return (
              <div
                key={feature.title}
                className={`bento-card glass-card rounded-3xl p-6 ${feature.span}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`mb-4 inline-flex rounded-2xl p-3 ${colorClasses[feature.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

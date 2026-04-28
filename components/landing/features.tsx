"use client"

import { useMemo } from "react"
import Image from "next/image"
import { 
  Utensils, 
  MapPin, 
  Calendar, 
  Star, 
  Shield, 
  Bell 
} from "lucide-react"
import useRemote from "@/hooks/use-remote"

const iconMap: Record<string, any> = {
  "Food Posting": Utensils,
  "GPS Matching": MapPin,
  "Pickup Scheduling": Calendar,
  "Ratings & Reviews": Star,
  "Admin Security": Shield,
  "Smart Notifications": Bell,
}

const imageMap: Record<string, string> = {
  "Food Posting": "/Donet.png",
  "Donate": "/Donet.png",
  "Pickup Scheduling": "/Delivery.png",
  "Delivery": "/Delivery.png",
  "Admin Security": "/NGO.png",
  "NGO": "/NGO.png",
}

export function Features() {
  const { data: features = [] } = useRemote('landing.features', [])

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
          {features.map((feature: any, index: number) => {
            const Icon = iconMap[feature.title] || Utensils
            const imageSrc = imageMap[feature.title]
            const colorClasses = {
              primary: "bg-primary/20 text-primary",
              secondary: "bg-secondary/20 text-secondary",
              accent: "bg-accent/20 text-accent",
            }
            
            return (
              <div
                key={`${feature.title}-${index}`}
                className={`bento-card glass-card rounded-3xl p-6 ${feature.span || ''}`}
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
                {imageSrc && (
                  <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-background/40">
                    <Image
                      src={imageSrc}
                      alt={feature.title}
                      width={800}
                      height={450}
                      className="h-40 w-full object-cover"
                      priority={feature.title === "Food Posting"}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

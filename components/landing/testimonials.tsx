"use client"

import { Star, BadgeCheck } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Restaurant Owner",
    avatar: "SC",
    rating: 5,
    verified: true,
    content: "FoodBridge has transformed how we handle surplus food. Instead of throwing away perfectly good meals, we now help feed families in need. The pickup coordination is seamless.",
  },
  {
    name: "Michael Rodriguez",
    role: "NGO Director",
    avatar: "MR",
    rating: 5,
    verified: true,
    content: "As an NGO, finding reliable food sources was always a challenge. FoodBridge connects us with donors in real-time, and the GPS matching saves us hours every day.",
  },
  {
    name: "Priya Patel",
    role: "Supermarket Manager",
    avatar: "PP",
    rating: 5,
    verified: true,
    content: "We&apos;ve reduced our food waste by 85% since joining FoodBridge. The platform is incredibly easy to use, and knowing our surplus feeds people instead of landfills is amazing.",
  },
  {
    name: "David Kim",
    role: "Community Volunteer",
    avatar: "DK",
    rating: 5,
    verified: true,
    content: "I volunteer with local food banks and FoodBridge has been a game-changer. The notifications keep us informed, and the rating system ensures quality donations.",
  },
  {
    name: "Emma Wilson",
    role: "Catering Business",
    avatar: "EW",
    rating: 5,
    verified: true,
    content: "After every event, we have leftover food. FoodBridge makes it simple to donate within minutes. The live tracking gives us peace of mind that it reaches those in need.",
  },
  {
    name: "James Thompson",
    role: "Food Bank Coordinator",
    avatar: "JT",
    rating: 5,
    verified: true,
    content: "The admin dashboard gives us complete visibility into donations and pickups. FoodBridge&apos;s verification system ensures we only work with legitimate, quality sources.",
  },
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            Testimonials
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Loved by donors and
            <br />
            <span className="gradient-text">receivers alike</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Join thousands of businesses and organizations making a difference every day.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bento-card glass-card rounded-3xl p-6"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {testimonial.name}
                      </span>
                      {testimonial.verified && (
                        <BadgeCheck className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground text-pretty">
                {testimonial.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

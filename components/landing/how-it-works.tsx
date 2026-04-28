"use client"

import { Plus, Users, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Plus,
    title: "Post Food",
    description: "List your surplus food with details like quantity, type, and pickup time. Our smart form makes it quick and easy.",
    color: "primary",
  },
  {
    icon: Users,
    title: "Match Nearby",
    description: "Our AI matches your donation with the nearest verified NGO or individual who needs it most.",
    color: "secondary",
  },
  {
    icon: CheckCircle,
    title: "Pickup Confirmed",
    description: "Coordinate pickup times, track in real-time, and receive confirmation when food is delivered.",
    color: "accent",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute top-1/2 right-0 h-[300px] w-[300px] -translate-y-1/2 rounded-full bg-secondary/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm text-secondary">
            How It Works
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Three simple steps to
            <br />
            <span className="gradient-text">make a difference</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            From listing food to completing pickup, our streamlined process takes just minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon
            const colorClasses = {
              primary: "bg-primary/20 text-primary border-primary/30",
              secondary: "bg-secondary/20 text-secondary border-secondary/30",
              accent: "bg-accent/20 text-accent border-accent/30",
            }

            return (
              <div
                key={step.title}
                className="bento-card glass-card rounded-3xl p-8 text-center relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-background border border-border px-4 py-1 text-sm font-medium text-muted-foreground">
                  Step {index + 1}
                </div>

                {/* Icon */}
                <div className={`mx-auto mb-6 inline-flex rounded-2xl border p-4 ${colorClasses[step.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>

                {/* Connector Line (hidden on last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

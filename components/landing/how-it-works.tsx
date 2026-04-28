"use client"

import { Plus, Users, CheckCircle } from "lucide-react"
import useRemote from "@/hooks/use-remote"

export function HowItWorks() {
  const { data: steps = [] } = useRemote('post.steps', [])

  const iconMap: Record<string, any> = {
    Describe: Plus,
    "Add Photos": Plus,
    "Schedule Pickup": CheckCircle,
    Default: Plus,
  }

  const colorClasses: Record<string, string> = {
    primary: "bg-primary/20 text-primary border-primary/30",
    secondary: "bg-secondary/20 text-secondary border-secondary/30",
    accent: "bg-accent/20 text-accent border-accent/30",
  }

  return (
    <section id="how-it-works" className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step: any, index: number) => {
            const title = typeof step === 'string' ? step : step.title
            const Icon = iconMap[title] || iconMap.Default
            const color = (typeof step === 'object' && step.color) || 'primary'

            return (
              <div key={`how-it-works-${index}-${title || "step"}`} className="bento-card glass-card rounded-3xl p-8 text-center relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-background border border-border px-4 py-1 text-sm font-medium text-muted-foreground">
                  Step {index + 1}
                </div>

                <div className={`mx-auto mb-6 inline-flex rounded-2xl border p-4 ${colorClasses[color as keyof typeof colorClasses]}`}>
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="mb-3 text-xl font-semibold text-foreground">{title}</h3>
                <p className="text-muted-foreground">{typeof step === 'object' && step.description ? step.description : ''}</p>

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

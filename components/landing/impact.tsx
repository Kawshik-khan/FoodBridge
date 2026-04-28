"use client"

import { useEffect, useState, useRef } from "react"

interface StatProps {
  value: number
  suffix: string
  label: string
}

function AnimatedStat({ value, suffix, label }: StatProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          const duration = 2000
          const steps = 60
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
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, hasAnimated])

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
        <span className="gradient-text">{count.toLocaleString()}</span>
        <span className="text-primary">{suffix}</span>
      </div>
      <p className="mt-2 text-muted-foreground">{label}</p>
    </div>
  )
}

const stats = [
  { value: 2500000, suffix: "+", label: "Meals Saved" },
  { value: 850, suffix: "+", label: "Active NGOs" },
  { value: 95, suffix: "%", label: "Waste Reduced" },
  { value: 120, suffix: "+", label: "Cities Covered" },
]

export function Impact() {
  return (
    <section id="impact" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 glass-card" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-2 text-sm text-accent">
            Our Impact
          </div>
          <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
            Numbers that
            <br />
            <span className="gradient-text">speak volumes</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground text-pretty">
            Every donation counts. Here&apos;s the impact our community has made together.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bento-card glass-card rounded-3xl p-8">
              <AnimatedStat {...stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

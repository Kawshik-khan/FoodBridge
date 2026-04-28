"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, MapPin, Heart, Truck, Users } from "lucide-react"

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
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
    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="animate-counter">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden pt-24 pb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-secondary/15 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Announcement Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Live: 2,847 donations today
          </div>
        </div>

        {/* Bento Grid Hero */}
        <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-2">
          {/* Main Hero Card */}
          <div className="bento-card glass-card rounded-3xl p-8 lg:col-span-2 lg:row-span-2 lg:p-12">
            <div className="relative h-full flex flex-col justify-between">
              <div className="relative">
                <div className="flex flex-col md:flex-row md:items-center md:gap-8">
                  {/* Left: Text content */}
                  <div className="md:w-1/2">
                    <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                      Share Food.
                      <br />
                      <span className="gradient-text">Save Lives.</span>
                    </h1>
                    <p className="mb-8 text-lg text-muted-foreground text-pretty">
                      Connect surplus food from restaurants, supermarkets, and households with NGOs 
                      and verified individuals who need it most. Reduce waste, fight hunger.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <Button size="lg" asChild className="glow-primary group">
                        <Link href="/register?role=donor">
                          Donate Food
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <Link href="/register?role=receiver">
                          Request Help
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* Right: Illustration */}
                  <div className="md:w-1/2 mt-8 md:mt-0 flex items-center justify-center">
                    <div className="w-full max-w-md">
                      <Image
                        src="/Donet.png"
                        alt="Donate illustration"
                        width={700}
                        height={560}
                        className="w-full h-auto object-contain"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* Trust Badges - moved inside relative block but below content */}
                <div className="mt-10 md:mt-12 flex flex-wrap items-center gap-6 border-t border-border/50 pt-8">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-8 w-8 rounded-full border-2 border-background bg-muted"
                        />
                      ))}
                    </div>
                    <span>Trusted by <strong className="text-foreground">10,000+</strong> donors</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1 text-accent">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span>4.9/5 rating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card - Donations Today */}
          <div className="bento-card glass-card rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-primary/20 p-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <span className="rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                Live
              </span>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-background/30">
              <Image
                src="/Delivery.png"
                alt="Delivery"
                width={800}
                height={450}
                className="h-28 w-full object-cover"
              />
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Donations Today</p>
              <p className="text-3xl font-bold text-foreground">
                <AnimatedCounter value={2847} />
              </p>
            </div>
          </div>

          {/* Stats Card - Nearby NGOs */}
          <div className="bento-card glass-card rounded-3xl p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="rounded-2xl bg-secondary/20 p-3">
                <MapPin className="h-6 w-6 text-secondary" />
              </div>
              <div className="flex -space-x-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 rounded-full border-2 border-card bg-muted"
                  />
                ))}
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-2xl border border-border/60 bg-background/30">
              <Image
                src="/NGO.png"
                alt="NGO"
                width={800}
                height={450}
                className="h-28 w-full object-cover"
              />
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Active NGOs Nearby</p>
              <p className="text-3xl font-bold text-foreground">
                <AnimatedCounter value={156} />
              </p>
            </div>
          </div>
        </div>

        {/* Secondary Stats Row */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bento-card glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className="rounded-xl bg-accent/20 p-3">
              <Truck className="h-5 w-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Pickups Today</p>
              <p className="text-xl font-bold text-foreground">
                <AnimatedCounter value={1923} />
              </p>
            </div>
          </div>
          <div className="bento-card glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className="rounded-xl bg-primary/20 p-3">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Lives Impacted</p>
              <p className="text-xl font-bold text-foreground">
                <AnimatedCounter value={45872} suffix="+" />
              </p>
            </div>
          </div>
          <div className="bento-card glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className="rounded-xl bg-secondary/20 p-3">
              <svg className="h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Food Saved (kg)</p>
              <p className="text-xl font-bold text-foreground">
                <AnimatedCounter value={12450} />
              </p>
            </div>
          </div>
          <div className="bento-card glass-card rounded-2xl p-5 flex items-center gap-4">
            <div className="rounded-xl bg-accent/20 p-3">
              <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Cities Covered</p>
              <p className="text-xl font-bold text-foreground">
                <AnimatedCounter value={84} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

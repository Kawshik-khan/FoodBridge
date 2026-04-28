"use client"

import { useState, useEffect } from "react"
import useRemote from "@/hooks/use-remote"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  MessageSquare,
  Clock,
  Package,
  Truck,
  CheckCircle,
  User,
  Navigation
} from "lucide-react"

export default function LiveTrackingPage() {
  const { data: trackingSteps = [] } = useRemote('tracking.trackingSteps', [])

  const [eta, setEta] = useState(12)

  

  useEffect(() => {
    const timer = setInterval(() => {
      setEta((prev) => (prev > 0 ? prev - 1 : 0))
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard/donor" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-5 w-5" />
            <span>Back</span>
          </Link>
          <h1 className="font-semibold text-foreground">Live Tracking</h1>
          <div className="w-20" />
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Map Section */}
          <div className="glass-card rounded-3xl overflow-hidden">
            <div className="h-[400px] lg:h-[600px] bg-muted relative flex items-center justify-center">
              {/* Map placeholder with route visualization */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Navigation className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
                  <p className="text-lg font-medium text-foreground">Live Route Tracking</p>
                  <p className="text-sm text-muted-foreground">Map view coming soon</p>
                </div>
              </div>
              
              {/* ETA Overlay */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="glass-card rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/20 p-3">
                        <Truck className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated arrival</p>
                        <p className="text-xl font-bold text-foreground">{eta} min</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Distance</p>
                      <p className="text-lg font-semibold text-foreground">1.2 km</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            {/* Pickup Info Card */}
            <div className="glass-card rounded-3xl p-6">
              <h2 className="font-semibold text-foreground mb-6">Pickup Details</h2>
              
              {/* Donor */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 mb-4">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Donor</p>
                    <p className="font-medium text-foreground">Green Restaurant</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Receiver */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-secondary/20 flex items-center justify-center">
                    <User className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Receiver</p>
                    <p className="font-medium text-foreground">Community Food Bank</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <MessageSquare className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Food Info */}
            <div className="glass-card rounded-3xl p-6">
              <h2 className="font-semibold text-foreground mb-4">Food Details</h2>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/30">
                <div className="h-16 w-16 rounded-xl bg-muted flex items-center justify-center">
                  <Package className="h-8 w-8 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Fresh Vegetable Mix</p>
                  <p className="text-sm text-muted-foreground">15 kg • Fresh Produce</p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>Best before: 4 hours</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="glass-card rounded-3xl p-6">
              <h2 className="font-semibold text-foreground mb-6">Tracking Status</h2>
              <div className="space-y-4">
                {trackingSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? "bg-primary text-primary-foreground" 
                          : step.current 
                          ? "bg-accent text-accent-foreground animate-pulse"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : step.current ? (
                          <Truck className="h-4 w-4" />
                        ) : (
                          <div className="h-2 w-2 rounded-full bg-current" />
                        )}
                      </div>
                      {index < trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-8 ${
                          step.completed ? "bg-primary" : "bg-muted"
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-center justify-between">
                        <p className={`font-medium ${
                          step.completed || step.current ? "text-foreground" : "text-muted-foreground"
                        }`}>
                          {step.label}
                        </p>
                        <span className="text-sm text-muted-foreground">{step.time}</span>
                      </div>
                      {step.current && (
                        <p className="text-sm text-accent mt-1">Driver is on the way...</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                <Phone className="mr-2 h-4 w-4" />
                Call Driver
              </Button>
              <Button className="flex-1 glow-primary">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionShell } from "../_components/section-shell"
import { MapPin, Clock, Truck, CheckCircle, Calendar, Phone } from "lucide-react"

interface Pickup {
  id: number
  donor: string
  food: string
  quantity: string
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  pickupTime: string
  location: string
  contact: string
  notes?: string
}

export default function ReceiverPickupsPage() {
  const [pickups, setPickups] = useState<Pickup[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPickups()
  }, [])

  const fetchPickups = async () => {
    try {
      const response = await fetch('/api/receiver/pickups')
      const data = await response.json()
      setPickups(data)
    } catch (error) {
      console.error('Failed to fetch pickups:', error)
    } finally {
      setLoading(false)
    }
  }

  const updatePickupStatus = async (id: number, status: "in_progress" | "completed") => {
    try {
      const response = await fetch(`/api/receiver/pickups/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (response.ok) {
        setPickups(pickups.map(pickup =>
          pickup.id === id ? { ...pickup, status } : pickup
        ))
      }
    } catch (error) {
      console.error('Failed to update pickup:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'in_progress': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'completed': return 'bg-green-100 text-green-800 border-green-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'scheduled': return <Calendar className="h-4 w-4" />
      case 'in_progress': return <Truck className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <SectionShell title="My Pickups" description="Manage your scheduled food pickups.">
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse rounded-2xl border border-border/60 bg-muted/20 p-4">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </SectionShell>
    )
  }

  return (
    <SectionShell title="My Pickups" description="Manage your scheduled food pickups.">
      <div className="space-y-4">
        {pickups.map((pickup) => (
          <Card key={pickup.id} className="glass-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{pickup.donor}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(pickup.status)}
                  <Badge className={getStatusColor(pickup.status)}>
                    {pickup.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="font-medium text-foreground">{pickup.food}</p>
                  <p className="text-sm text-muted-foreground">{pickup.quantity}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {pickup.pickupTime}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {pickup.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {pickup.contact}
                  </div>
                </div>
              </div>

              {pickup.notes && (
                <div className="rounded-lg bg-muted/30 p-3">
                  <p className="text-sm text-muted-foreground">{pickup.notes}</p>
                </div>
              )}

              {pickup.status === 'scheduled' && (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => updatePickupStatus(pickup.id, 'in_progress')}
                    className="glow-primary"
                  >
                    Start Pickup
                  </Button>
                </div>
              )}

              {pickup.status === 'in_progress' && (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => updatePickupStatus(pickup.id, 'completed')}
                    variant="outline"
                  >
                    Mark as Completed
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </SectionShell>
  )
}
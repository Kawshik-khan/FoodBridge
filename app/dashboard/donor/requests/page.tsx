"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SectionShell } from "../_components/section-shell"
import { MapPin, Clock, Phone, CheckCircle, XCircle, AlertCircle } from "lucide-react"

interface Request {
  id: number
  org: string
  food: string
  quantity: string
  time: string
  status: "pending" | "accepted" | "completed" | "cancelled"
  location: string
  contact: string
  notes: string
}

export default function DonorRequestsPage() {
  const [requests, setRequests] = useState<Request[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const response = await fetch('/api/donor/requests')
      const data = await response.json()
      setRequests(data)
    } catch (error) {
      console.error('Failed to fetch requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateRequestStatus = async (id: number, status: "accepted" | "completed" | "cancelled") => {
    try {
      const response = await fetch(`/api/donor/requests/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
      if (response.ok) {
        setRequests(requests.map(req =>
          req.id === id ? { ...req, status } : req
        ))
      }
    } catch (error) {
      console.error('Failed to update request:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'completed': return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />
      default: return <AlertCircle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200'
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  if (loading) {
    return (
      <SectionShell title="Requests" description="Track pickup requests from partner organizations and respond quickly.">
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
    <SectionShell
      title="Requests"
      description="Track pickup requests from partner organizations and respond quickly."
    >
      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="glass-card">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{request.org}</CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(request.status)}
                  <Badge className={getStatusColor(request.status)}>
                    {request.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="font-medium text-foreground">{request.food}</p>
                  <p className="text-sm text-muted-foreground">{request.quantity}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {request.time}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    {request.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {request.contact}
                  </div>
                </div>
              </div>

              {request.notes && (
                <div className="rounded-lg bg-muted/30 p-3">
                  <p className="text-sm text-muted-foreground">{request.notes}</p>
                </div>
              )}

              {request.status === 'pending' && (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => updateRequestStatus(request.id, 'accepted')}
                    className="glow-primary"
                  >
                    Accept Request
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => updateRequestStatus(request.id, 'cancelled')}
                  >
                    Decline
                  </Button>
                </div>
              )}

              {request.status === 'accepted' && (
                <div className="flex gap-2 pt-2">
                  <Button
                    onClick={() => updateRequestStatus(request.id, 'completed')}
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
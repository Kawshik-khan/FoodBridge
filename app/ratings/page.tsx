"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Star, User, MessageSquare } from "lucide-react"

interface Rating {
  id: number
  fromUser: string
  toUser: string
  rating: number
  review: string
  donationId: number
  createdAt: string
}

export default function RatingsPage() {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newRating, setNewRating] = useState({
    toUser: "",
    rating: 5,
    review: ""
  })

  useEffect(() => {
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    try {
      const response = await fetch('/api/ratings')
      const data = await response.json()
      setRatings(data)
    } catch (error) {
      console.error('Failed to fetch ratings:', error)
    } finally {
      setLoading(false)
    }
  }

  const submitRating = async () => {
    try {
      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRating)
      })
      if (response.ok) {
        const addedRating = await response.json()
        setRatings([addedRating, ...ratings])
        setNewRating({ toUser: "", rating: 5, review: "" })
        setShowForm(false)
      }
    } catch (error) {
      console.error('Failed to submit rating:', error)
    }
  }

  const renderStars = (rating: number, interactive = false, onChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        } ${interactive ? 'cursor-pointer hover:text-yellow-400' : ''}`}
        onClick={interactive ? () => onChange?.(i + 1) : undefined}
      />
    ))
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Ratings & Reviews</h1>
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="animate-pulse glass-card p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="flex mb-3">
                {[1,2,3,4,5].map(j => (
                  <div key={j} className="h-5 w-5 bg-muted rounded mr-1"></div>
                ))}
              </div>
              <div className="h-16 bg-muted rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Ratings & Reviews</h1>
        <Button onClick={() => setShowForm(!showForm)} className="glow-primary">
          <MessageSquare className="mr-2 h-4 w-4" />
          Write Review
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6 glass-card">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rate</label>
              <div className="flex">
                {renderStars(newRating.rating, true, (rating) =>
                  setNewRating({ ...newRating, rating })
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review for</label>
              <input
                type="text"
                placeholder="Enter user/organization name"
                className="w-full p-2 border border-input rounded-md bg-background"
                value={newRating.toUser}
                onChange={(e) => setNewRating({ ...newRating, toUser: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Your Review</label>
              <Textarea
                placeholder="Share your experience..."
                value={newRating.review}
                onChange={(e) => setNewRating({ ...newRating, review: e.target.value })}
                rows={4}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={submitRating} disabled={!newRating.toUser || !newRating.review}>
                Submit Review
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {ratings.map((rating) => (
          <Card key={rating.id} className="glass-card">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{rating.fromUser}</p>
                    <p className="text-sm text-muted-foreground">
                      reviewed {rating.toUser}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex mb-1">
                    {renderStars(rating.rating)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(rating.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <p className="text-foreground">{rating.review}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
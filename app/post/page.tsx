"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function PostPage() {
  const [location, setLocation] = useState("")
  const [time, setTime] = useState("")
  const [review, setReview] = useState("")

  const handleSubmit = () => {
    // Handle form submission
    console.log({ location, time, review })
    alert("Review submitted!")
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Post Review</h1>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="time">Time</Label>
          <Input
            id="time"
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="review">Review</Label>
          <Textarea
            id="review"
            placeholder="Write your review here..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={4}
          />
        </div>
        <Button onClick={handleSubmit} className="w-full">
          Submit Review
        </Button>
      </div>
    </div>
  )
}
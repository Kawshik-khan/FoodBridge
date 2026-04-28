import { NextResponse } from 'next/server'

const ratings = [
  {
    id: 1,
    fromUser: "Local Food Bank",
    toUser: "Green Restaurant",
    rating: 5,
    review: "Excellent quality vegetables, very fresh and well-packaged. The donor was very responsive and helpful.",
    donationId: 1,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: 2,
    fromUser: "Homeless Shelter",
    toUser: "Bakery Corner",
    rating: 4,
    review: "Great bread selection, arrived warm and fresh. Only minor delay in pickup timing.",
    donationId: 2,
    createdAt: "2024-01-14T14:20:00Z"
  },
  {
    id: 3,
    fromUser: "Senior Center",
    toUser: "Super Market",
    rating: 5,
    review: "Perfect condition packaged goods. Very reliable donor with excellent communication.",
    donationId: 3,
    createdAt: "2024-01-13T09:15:00Z"
  }
]

export async function GET() {
  return NextResponse.json(ratings)
}

export async function POST(request: Request) {
  const body = await request.json()
  const newRating = {
    id: ratings.length + 1,
    ...body,
    createdAt: new Date().toISOString()
  }
  ratings.push(newRating)
  return NextResponse.json(newRating, { status: 201 })
}
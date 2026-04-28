import { NextResponse } from 'next/server'

const donorRequests = [
  {
    id: 1,
    org: "Local Food Bank",
    food: "Fresh Vegetable Mix",
    quantity: "25 kg",
    time: "2 hours ago",
    status: "pending",
    location: "Downtown Community Center",
    contact: "john@foodbank.org",
    notes: "Urgent need for fresh produce"
  },
  {
    id: 2,
    org: "Homeless Shelter",
    food: "Cooked Meals",
    quantity: "50 portions",
    time: "4 hours ago",
    status: "accepted",
    location: "Central Shelter",
    contact: "mary@shelter.org",
    notes: "For evening distribution"
  },
  {
    id: 3,
    org: "Senior Center",
    food: "Bakery Items",
    quantity: "30 items",
    time: "6 hours ago",
    status: "completed",
    location: "Senior Living Center",
    contact: "robert@seniorcenter.org",
    notes: "Bread and pastries needed"
  }
]

export async function GET() {
  return NextResponse.json(donorRequests)
}
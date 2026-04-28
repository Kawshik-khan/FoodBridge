import { NextResponse } from 'next/server'

const receiverPickups = [
  {
    id: 1,
    donor: "Green Restaurant",
    food: "Fresh Vegetable Mix",
    quantity: "25 kg",
    status: "scheduled",
    pickupTime: "Today, 2:00 PM",
    location: "Downtown Community Center",
    contact: "john@restaurant.com",
    notes: "Please bring containers for transport"
  },
  {
    id: 2,
    donor: "Bakery Corner",
    food: "Assorted Bread",
    quantity: "30 loaves",
    status: "in_progress",
    pickupTime: "Today, 10:00 AM",
    location: "Central Bakery",
    contact: "mary@bakery.com",
    notes: "Fresh baked this morning"
  },
  {
    id: 3,
    donor: "Super Market",
    food: "Packaged Goods",
    quantity: "15 boxes",
    status: "completed",
    pickupTime: "Yesterday, 4:00 PM",
    location: "Super Market Warehouse",
    contact: "robert@supermarket.com"
  }
]

export async function GET() {
  return NextResponse.json(receiverPickups)
}
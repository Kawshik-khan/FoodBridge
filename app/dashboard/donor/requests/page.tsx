import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionShell } from "../_components/section-shell"

const requests = [
  { org: "Community Food Bank", food: "Fresh Vegetables", status: "Pending", time: "10 min ago" },
  { org: "Hope Shelter", food: "Bread & Pastries", status: "Accepted", time: "25 min ago" },
  { org: "City Mission", food: "Cooked Meals", status: "Completed", time: "1 hour ago" },
]

export default function DonorRequestsPage() {
  return (
    <SectionShell
      title="Requests"
      description="Track pickup requests from partner organizations and respond quickly."
    >
      <div className="space-y-4">
        {requests.map((request) => (
          <div key={`${request.org}-${request.food}`} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-foreground">{request.org}</p>
              <p className="text-sm text-muted-foreground">{request.food} · {request.time}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{request.status}</Badge>
              <Button variant="outline" size="sm">Open</Button>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionShell } from "../_components/section-shell"
import { getResource } from "@/lib/data"

export default async function DonorDonationsPage() {
  const donations = (await getResource('donor.donations')) || []
  return (
    <SectionShell
      title="My Donations"
      description="Review donation history, pickup status, and impact at a glance."
    >
      <div className="space-y-4">
        {donations.map((donation: any) => (
          <div key={donation.id} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold text-foreground">{donation.item}</p>
              <p className="text-sm text-muted-foreground">{donation.id} · {donation.impact}</p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">{donation.status}</Badge>
              <Button variant="outline" size="sm">View details</Button>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
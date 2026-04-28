import { Button } from "@/components/ui/button"
import { SectionShell } from "../_components/section-shell"
import { getResource } from "@/lib/data"

export default async function DonorAnalyticsPage() {
  const metrics = (await getResource('donor.analytics.metrics')) || []
  return (
    <SectionShell
      title="Analytics"
      description="See donation trends, pickup reliability, and impact summaries."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {metrics.map((metric: any) => (
          <div key={metric.label} className="rounded-2xl border border-border/60 bg-background p-4">
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-2 text-3xl font-bold text-foreground">{metric.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button>Download report</Button>
        <Button variant="outline">View history</Button>
      </div>
    </SectionShell>
  )
}
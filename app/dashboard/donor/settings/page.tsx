import { Button } from "@/components/ui/button"
import { SectionShell } from "../_components/section-shell"

const settings = [
  "Donation reminders",
  "Pickup notifications",
  "Weekly impact summary",
]

export default function DonorSettingsPage() {
  return (
    <SectionShell
      title="Settings"
      description="Adjust account preferences, alerts, and donation workflow defaults."
    >
      <div className="space-y-4">
        {settings.map((setting) => (
          <div key={setting} className="flex items-center justify-between rounded-2xl border border-border/60 bg-muted/20 p-4">
            <p className="font-medium text-foreground">{setting}</p>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
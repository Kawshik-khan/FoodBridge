import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionShell } from "../_components/section-shell"
import { getResource } from "@/lib/data"

export default async function DonorMessagesPage() {
  const messages = (await getResource('donor.messages')) || []
  return (
    <SectionShell
      title="Messages"
      description="Centralize conversations with receivers and logistics contacts."
    >
      <div className="space-y-4">
        {messages.map((message: any) => (
          <div key={message.sender} className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-muted/20 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-foreground">{message.sender}</p>
                {message.unread && <Badge>New</Badge>}
              </div>
              <p className="text-sm text-muted-foreground">{message.preview}</p>
            </div>
            <Button variant="outline" size="sm">Reply</Button>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
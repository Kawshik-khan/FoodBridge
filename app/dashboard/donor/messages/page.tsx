import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SectionShell } from "../_components/section-shell"

const messages = [
  { sender: "Community Food Bank", preview: "Pickup confirmed for 4:30 PM.", unread: true },
  { sender: "Hope Shelter", preview: "Can you add labels to the next batch?", unread: false },
  { sender: "City Mission", preview: "Thank you for the support this week.", unread: false },
]

export default function DonorMessagesPage() {
  return (
    <SectionShell
      title="Messages"
      description="Centralize conversations with receivers and logistics contacts."
    >
      <div className="space-y-4">
        {messages.map((message) => (
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
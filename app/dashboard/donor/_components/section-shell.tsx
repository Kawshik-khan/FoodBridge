import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

type SectionShellProps = {
  title: string
  description: string
  children: React.ReactNode
}

export function SectionShell({ title, description, children }: SectionShellProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <Card className="glass-card border-border/60">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  )
}
import { CreditCard, FileText, ArrowUpRight } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface BillingPlanProps {
  planName?: string
  isLoading?: boolean
}

function BillingSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-56 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-24 animate-pulse rounded-lg bg-muted" />
        <div className="h-10 w-28 animate-pulse rounded-lg bg-muted" />
      </CardContent>
    </Card>
  )
}

export function BillingPlan({ planName = 'Free', isLoading }: BillingPlanProps) {
  if (isLoading) return <BillingSkeleton />

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-card-hover">
        <div className="bg-gradient-to-br from-primary/10 to-accent/10 px-5 py-4">
          <CardHeader className="p-0">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current plan
            </CardTitle>
            <CardDescription>View plan, upgrade, and manage invoices (if SaaS).</CardDescription>
          </CardHeader>
        </div>
        <CardContent className="space-y-4 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-border bg-card/50 p-4">
            <div>
              <p className="font-semibold text-foreground">{planName}</p>
              <p className="text-sm text-muted-foreground">Billing cycle: Monthly</p>
            </div>
            <Button className="gap-2 transition-transform hover:scale-[1.02]" asChild>
              <a href="#upgrade">
                Upgrade <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-all duration-200 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Invoices
          </CardTitle>
          <CardDescription>Download past invoices and payment history.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-border p-6 text-center">
            <FileText className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-2 text-sm font-medium text-foreground">No invoices yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Invoices will appear here when you upgrade to a paid plan.
            </p>
            <Button variant="outline" size="sm" className="mt-4 transition-transform hover:scale-[1.02]">
              View billing history
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

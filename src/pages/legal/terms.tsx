import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
        <p className="mt-2 text-muted-foreground">Last updated: placeholder.</p>
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-invert max-w-none space-y-4 text-sm text-muted-foreground">
            <p>
              Placeholder: Acceptable use, liability, self-host licensing. Cookie policy and consent CTA.
            </p>
          </CardContent>
        </Card>
        <div className="mt-8 flex gap-4">
          <Button asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/privacy">Privacy</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

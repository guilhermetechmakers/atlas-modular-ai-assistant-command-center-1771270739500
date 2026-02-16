import { Link } from 'react-router-dom'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function ServerErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-fade-in text-center">
        <CardContent className="pt-8 pb-8">
          <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
          <h1 className="mt-4 text-2xl font-bold text-white">500</h1>
          <p className="mt-2 text-muted-foreground">
            Something went wrong on our end. We&apos;ve been notified.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/dashboard">Back to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/help">Report issue</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-fade-in text-center">
        <CardContent className="pt-8 pb-8">
          <FileQuestion className="mx-auto h-16 w-16 text-muted-foreground" />
          <h1 className="mt-4 text-2xl font-bold text-white">404</h1>
          <p className="mt-2 text-muted-foreground">
            This page doesn&apos;t exist or you don&apos;t have access.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild>
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/help">Help</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

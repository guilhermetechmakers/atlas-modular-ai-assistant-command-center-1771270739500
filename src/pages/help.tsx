import { Link } from 'react-router-dom'
import { HelpCircle, Book, MessageCircle, FileText } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-white">About & Help</h1>
          <p className="mt-2 text-muted-foreground">
            Docs, FAQ, self-host guide, and support.
          </p>
        </div>

        <div className="mt-8">
          <div className="relative max-w-xl">
            <HelpCircle className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search docs..." className="pl-9" aria-label="Search documentation" />
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <Book className="h-8 w-8 text-primary" />
              <CardTitle>Documentation</CardTitle>
              <CardDescription>Getting started, integrations, and API.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" asChild>
                <a href="#docs">View docs</a>
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary" />
              <CardTitle>Self-host guide</CardTitle>
              <CardDescription>Docker, env vars, and backups.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Read guide</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <HelpCircle className="h-8 w-8 text-primary" />
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Common questions and troubleshooting.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Open FAQ</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MessageCircle className="h-8 w-8 text-primary" />
              <CardTitle>Contact</CardTitle>
              <CardDescription>Report issues or request help.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline">Contact support</Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

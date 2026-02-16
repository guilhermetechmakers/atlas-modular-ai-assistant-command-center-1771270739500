import { Calendar as CalendarIcon, MapPin, ListTodo } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function CalendarPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-white md:text-3xl">Calendar & Travel</h1>
        <p className="mt-1 text-muted-foreground">
          Day/week/month view, tasks, routines, and trip board.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-primary" />
              Calendar
            </CardTitle>
            <CardDescription>
              Connect Google Calendar to see and manage events.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border text-sm text-muted-foreground">
              Calendar view placeholder. Connect Google Calendar in Settings.
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ListTodo className="h-5 w-5 text-primary" />
              Tasks & routines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">No tasks. Add from dashboard or agent.</p>
            <Button variant="outline" size="sm" className="mt-2">Add task</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Trip board
          </CardTitle>
          <CardDescription>Plan trips and itineraries with the Personal agent.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
            No trips. Click &quot;Plan trip&quot; to get an itinerary from the Personal agent.
          </div>
          <Button className="mt-4">Plan trip</Button>
        </CardContent>
      </Card>
    </div>
  )
}

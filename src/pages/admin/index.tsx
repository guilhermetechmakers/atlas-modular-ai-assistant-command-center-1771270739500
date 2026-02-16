import { Link, useLocation } from 'react-router-dom'
import { Users, BarChart3, Wrench, FileCheck, Settings, Shield } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function AdminDashboard() {
  const location = useLocation()
  const defaultTab = location.pathname.includes('audit') ? 'audit' : 'overview'

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white md:text-3xl">Admin Dashboard</h1>
            <p className="mt-1 text-muted-foreground">
              User management, usage analytics, skill approvals, audit logs.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>

        <Tabs defaultValue={defaultTab} key={defaultTab} className="mt-8">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="audit">Audit logs</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 text-primary" />
                  <CardTitle>User management</CardTitle>
                  <CardDescription>Invite, roles, RBAC.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">Manage users</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <BarChart3 className="h-8 w-8 text-primary" />
                  <CardTitle>Usage analytics</CardTitle>
                  <CardDescription>Rate limits and usage.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="outline">View analytics</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Workspace users</CardTitle>
                <CardDescription>Roles and permissions.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                  User list placeholder. Enforce RBAC at API layer.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usage</CardTitle>
                <CardDescription>API and agent usage.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Analytics placeholder.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  Skill approval queue
                </CardTitle>
                <CardDescription>Approve or reject third-party skills.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                  No pending skills. New skills require admin approval.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="audit" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCheck className="h-5 w-5 text-primary" />
                  Audit logs
                </CardTitle>
                <CardDescription>Append-only, immutable. Retention policy in system settings.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border border-dashed border-border py-8 text-center text-sm text-muted-foreground">
                  Audit log viewer placeholder. All agent actions and skill calls recorded here.
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  System settings
                </CardTitle>
                <CardDescription>Retention, backup policy.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Configure retention
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

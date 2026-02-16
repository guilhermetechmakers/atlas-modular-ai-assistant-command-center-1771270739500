import { useState } from 'react'
import { Download, Database, FileArchive } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'

interface ExportBackupProps {
  isLoading?: boolean
}

function ExportSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="h-6 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-1 h-4 w-64 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-12 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-10 w-36 animate-pulse rounded-lg bg-muted" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="h-6 w-28 animate-pulse rounded bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="h-16 animate-pulse rounded bg-muted" />
        </CardContent>
      </Card>
    </div>
  )
}

export function ExportBackup({ isLoading }: ExportBackupProps) {
  const [autoBackup, setAutoBackup] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleExport = async () => {
    setExporting(true)
    try {
      await new Promise((r) => setTimeout(r, 1200))
      toast.success('Workspace export started. You will receive a download link when ready.')
    } catch {
      toast.error('Export failed. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  if (isLoading) return <ExportSkeleton />

  return (
    <div className="space-y-6">
      <Card className="transition-all duration-200 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileArchive className="h-5 w-5" />
            Export workspace data
          </CardTitle>
          <CardDescription>
            Download a bundle of your workspace (JSON/CSV and attachments). Use for backup or migration.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleExport}
            disabled={exporting}
            className="gap-2 transition-transform hover:scale-[1.02]"
          >
            <Download className="h-4 w-4" />
            {exporting ? 'Preparing export…' : 'Export workspace'}
          </Button>
        </CardContent>
      </Card>

      <Card className="transition-all duration-200 hover:shadow-card-hover">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            DB backup config
          </CardTitle>
          <CardDescription>
            Configure automatic database backups for self-hosted instances.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-0.5">
            <Label htmlFor="auto-backup">Automatic backups</Label>
            <p className="text-sm text-muted-foreground">Schedule periodic DB backups (self-host only).</p>
          </div>
          <Switch
            id="auto-backup"
            checked={autoBackup}
            onCheckedChange={setAutoBackup}
            aria-label="Enable automatic database backups"
          />
        </CardContent>
      </Card>
    </div>
  )
}

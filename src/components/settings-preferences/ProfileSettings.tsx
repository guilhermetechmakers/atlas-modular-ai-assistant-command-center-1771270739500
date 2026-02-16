import { useState } from 'react'
import { User, Camera } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import type { ProfileFormData } from '@/types/preferences'

const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  email: z.string().email('Invalid email'),
  avatar_url: z.string().url().optional().or(z.literal('')),
})

type ProfileSchema = z.infer<typeof profileSchema>

interface ProfileSettingsProps {
  initialData?: ProfileFormData | null
  isLoading?: boolean
}

function ProfileSkeleton() {
  return (
    <Card>
      <CardHeader>
        <div className="h-6 w-32 animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-48 animate-pulse rounded bg-muted" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4">
          <div className="h-20 w-20 animate-pulse rounded-full bg-muted" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function ProfileSettings({ initialData, isLoading }: ProfileSettingsProps) {
  const [avatarUrl, setAvatarUrl] = useState(initialData?.avatar_url ?? '')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      email: initialData?.email ?? '',
      avatar_url: initialData?.avatar_url ?? '',
    },
    values: initialData
      ? { name: initialData.name, email: initialData.email, avatar_url: initialData.avatar_url ?? '' }
      : undefined,
  })

  const onSubmit = async (data: ProfileSchema) => {
    try {
      await new Promise((r) => setTimeout(r, 600))
      setAvatarUrl(data.avatar_url ?? '')
      toast.success('Profile updated successfully.')
    } catch {
      toast.error('Failed to update profile. Please try again.')
    }
  }

  if (isLoading) return <ProfileSkeleton />

  return (
    <Card className="transition-all duration-200 hover:shadow-card-hover">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile
        </CardTitle>
        <CardDescription>
          Update your display name, email, and avatar. Re-auth may be required for sensitive changes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="flex flex-col items-center gap-2">
              <Avatar className="h-20 w-20 rounded-full border-2 border-border">
                <AvatarImage src={avatarUrl || undefined} alt="Avatar" />
                <AvatarFallback className="text-lg font-semibold text-muted-foreground">
                  {(initialData?.name ?? 'U').slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="gap-2 transition-transform hover:scale-[1.02]"
              >
                <Camera className="h-4 w-4" />
                Change photo
              </Button>
            </div>
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="profile-name">Display name</Label>
                <Input
                  id="profile-name"
                  placeholder="Your name"
                  {...register('name')}
                  className={cn(errors.name && 'border-destructive focus-visible:ring-destructive')}
                  aria-invalid={!!errors.name}
                />
                {errors.name && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-email">Email</Label>
                <Input
                  id="profile-email"
                  type="email"
                  placeholder="you@example.com"
                  {...register('email')}
                  className={cn(errors.email && 'border-destructive focus-visible:ring-destructive')}
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="profile-avatar">Avatar URL</Label>
                <Input
                  id="profile-avatar"
                  type="url"
                  placeholder="https://..."
                  {...register('avatar_url')}
                  className={cn(errors.avatar_url && 'border-destructive focus-visible:ring-destructive')}
                  aria-invalid={!!errors.avatar_url}
                />
                {errors.avatar_url && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.avatar_url.message}
                  </p>
                )}
              </div>
            </div>
          </div>
          <Button type="submit" disabled={isSubmitting} className="transition-transform hover:scale-[1.02]">
            {isSubmitting ? 'Saving…' : 'Save changes'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

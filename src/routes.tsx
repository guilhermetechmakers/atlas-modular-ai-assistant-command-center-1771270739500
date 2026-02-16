import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { LandingPage } from '@/pages/landing'
import { LoginPage } from '@/pages/auth/login'
import { SignupPage } from '@/pages/auth/signup'
import LoginSignupPage from '@/pages/Login/Signup'
import { PasswordResetPage } from '@/pages/auth/password-reset'
import { VerifyEmailPage } from '@/pages/auth/verify-email'
import { DashboardOverview } from '@/pages/dashboard/overview'
import CommandCenterPage from '@/pages/Dashboard/CommandCenter'
import { ProjectsPage } from '@/pages/dashboard/projects'
import { ContentPipelinePage } from '@/pages/dashboard/content'
import { ResearchPage } from '@/pages/dashboard/research'
import { CalendarPage } from '@/pages/dashboard/calendar'
import { FinancePage } from '@/pages/dashboard/finance'
import { AgentsPage } from '@/pages/dashboard/agents'
import PreferencesPage from '@/pages/Settings/Preferences'
import { HelpPage } from '@/pages/help'
import { AdminDashboard } from '@/pages/admin'
import { PrivacyPage } from '@/pages/legal/privacy'
import { TermsPage } from '@/pages/legal/terms'
import { NotFoundPage } from '@/pages/errors/not-found'
import { ServerErrorPage } from '@/pages/errors/server-error'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/password-reset', element: <PasswordResetPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
  { path: '/login-/-signup', element: <LoginSignupPage /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: 'command-center', element: <CommandCenterPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'content', element: <ContentPipelinePage /> },
      { path: 'research', element: <ResearchPage /> },
      { path: 'calendar', element: <CalendarPage /> },
      { path: 'finance', element: <FinancePage /> },
      { path: 'agents', element: <AgentsPage /> },
      { path: 'settings', element: <PreferencesPage /> },
      { path: 'settings/preferences', element: <PreferencesPage /> },
    ],
  },
  { path: '/settings-/-preferences', element: <Navigate to="/dashboard/settings/preferences" replace /> },
  { path: '/dashboard-/-command-center', element: <Navigate to="/dashboard/command-center" replace /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '/admin/audit', element: <AdminDashboard /> },
  { path: '/help', element: <HelpPage /> },
  { path: '/privacy', element: <PrivacyPage /> },
  { path: '/terms', element: <TermsPage /> },
  { path: '/500', element: <ServerErrorPage /> },
  { path: '*', element: <NotFoundPage /> },
])

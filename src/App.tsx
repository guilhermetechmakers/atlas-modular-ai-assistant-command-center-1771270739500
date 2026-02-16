import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import { router } from '@/routes'
import { AuthProvider } from '@/contexts/auth-context'

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'rgb(28,28,30)',
            border: '1px solid rgb(39,39,42)',
            color: 'rgb(229,231,235)',
          },
        }}
      />
      </AuthProvider>
    </>
  )
}

export default App

import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { getCurrentUser } from '../../../serverFunc/auth';
export const Route = createFileRoute('/login')({
  beforeLoad: async () => {
    const user = await getCurrentUser()

    if (user) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: () => <Outlet />,
})
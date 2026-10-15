import { createFileRoute } from '@tanstack/react-router'
import AdvisorLogin from '../../../components/login.advisor'

export const Route = createFileRoute('/login/advisor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <AdvisorLogin/>
}

import { createFileRoute } from '@tanstack/react-router'
import SignupAdvisor from '../../../components/adminStuff/signup.advisor'

export const Route = createFileRoute('/signup/advisor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignupAdvisor/>
}

import { createFileRoute } from '@tanstack/react-router'
import SignupMember from '../../../components/adminStuff/signup.member'

export const Route = createFileRoute('/signup/member')({
  component: RouteComponent,
})

function RouteComponent() {
  return <SignupMember/>
}

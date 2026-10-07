import { createFileRoute } from '@tanstack/react-router'
import MemberLogin from '../../../components/login.member'

export const Route = createFileRoute('/login/member')({
  component: RouteComponent,
})

function RouteComponent() {
  return <MemberLogin/>
}

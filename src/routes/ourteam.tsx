import { createFileRoute } from '@tanstack/react-router'
import OnlyMembers from '../../components/only.member.list'
import OnlyAdvisors from '../../components/only.advisor.list'
export const Route = createFileRoute('/ourteam')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <OnlyMembers/>
    <OnlyAdvisors/>
    </>
  )
}

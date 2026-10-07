import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/login/advisor')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/login/advisor"!</div>
}

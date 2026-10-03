import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ourteam')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/ourteam"!</div>
}

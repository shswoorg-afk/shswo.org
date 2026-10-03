import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/activites')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/activites"!</div>
}

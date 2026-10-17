import { createFileRoute } from '@tanstack/react-router'
import Events from '../../components/events'

export const Route = createFileRoute('/events')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Events/>
}

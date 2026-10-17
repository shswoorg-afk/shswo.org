import { createFileRoute } from '@tanstack/react-router'
import DonatePage from '../../components/donate'

export const Route = createFileRoute('/donate')({
  component: RouteComponent,
})

function RouteComponent() {
  return <DonatePage/>
}

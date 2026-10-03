import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/upcoming-programs')({
  component: UpcomingProgramsComponent,
})

function UpcomingProgramsComponent() {
  return <div>Hello "/upcoming/programs"!</div>
}

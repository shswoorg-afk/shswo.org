import { createFileRoute } from '@tanstack/react-router'
import ContactUs from '../../components/contact'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ContactUs/>
}

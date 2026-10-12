import { createFileRoute } from '@tanstack/react-router'
import ImageUpload from '../../components/image.upload'

export const Route = createFileRoute('/ourteam')({
  component: RouteComponent,
})

function RouteComponent() {
  return <ImageUpload/>
}

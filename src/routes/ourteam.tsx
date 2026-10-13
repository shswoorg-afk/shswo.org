import { createFileRoute } from '@tanstack/react-router'
import ImageUpload from '../../components/image.upload'
import DisplayMedia from '../../components/media.display'

export const Route = createFileRoute('/ourteam')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <ImageUpload/>
    </>
  )
}

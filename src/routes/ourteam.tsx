import { createFileRoute } from '@tanstack/react-router'
import ImageUpload from '../../components/image.upload'
import LogOutButton from '../../components/logout.button'
export const Route = createFileRoute('/ourteam')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
    <ImageUpload/>
    <LogOutButton/>
    </>
  )
}

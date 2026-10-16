import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCurrentUser } from '../../serverFunc/auth'

export const Route = createFileRoute('/dashboard')({
  beforeLoad : async () =>{
   const user = await getCurrentUser();
   if(!user)
   {
    throw redirect({to : "/"});
   }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard"!</div>
}

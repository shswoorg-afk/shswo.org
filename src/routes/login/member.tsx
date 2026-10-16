import { createFileRoute, redirect } from '@tanstack/react-router'
import MemberLogin from '../../../components/login.member'
import { getCurrentUser } from '../../../serverFunc/auth'

export const Route = createFileRoute('/login/member')({
  beforeLoad : async () => {
   const user = await getCurrentUser();
   if(user)
   {
    redirect({to : "/dashboard"})
   }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return <MemberLogin/>
}

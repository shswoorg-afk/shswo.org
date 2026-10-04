import { createFileRoute } from '@tanstack/react-router'
import { getActivites } from '../../serverFunc/getactivites'
export const Route = createFileRoute('/activites')({
  component: RouteComponent,
  head : () =>(
    {
      meta : [
        {
          title : "SHSWO | Activities"
        }
      ]
    }
  ),
  loader : () => getActivites(),
})

function RouteComponent() {
  const activites = Route.useLoaderData();
  if(!activites || activites.length === 0)
  {
    return <div className='h-screen flex items-center justify-center font-bold xl:text-2xl text-xl md:text-2xl'>No activites available yet? add some via admin panel</div>
  }
  return (
    <main>
      <h1 className='text-blue-800 text-xl md:text-2xl text-center font-bold'>Our Activites</h1>
      <div>
        <ul>
          {/* dynamic insertion will take place */
           activites.map((item)=>(
            <>
            <div>{item.activityTitle}</div>
            <li>{item.activityContent}</li>
            </>
           ))
          }
        </ul>
      </div>
    </main>
  )
}

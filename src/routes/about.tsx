import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <main className='bg-blue-900 text-white'>
        <div className='flex justify-center'>
          <h1 className='font-bold text-2xl md:text-4xl xl:text-4xl mt-3 underline underline-offset-4'>About us</h1>
        </div>
        <div>
          <p className='text-center font-medium text-md font-eth mt-5 px-3'>Saving Humanity Social Work Organization (SHSWO)</p>
        </div>
        <section className='px-3 min-h-screen flex items-center'>
          <ul className='max-w-2xl mx-auto mt-10 text-sm border border-white rounded-xl p-2'>
            <li className='mt-5'>Saving Humanity Social Work Organization (SHSWO) is a community-based organization dedicated to serving humanity and working for the welfare and development of society.</li>
            <li className='mt-5'>
              Our journey began on 22 May 2021 as Social Work Fund with the aim of supporting people in need and contributing to community welfare. During the process of formalizing the organization, it was found that the name “Social Work Fund” was already registered in Assam. Therefore, to establish a distinct and appropriate identity, the organization adopted the name Saving Humanity Social Work Organization (SHSWO).
            </li>
            <li className='mt-5'>
              Our mission, vision and commitment to social service remained unchanged. The new name reflects our continued dedication to serving humanity and creating positive change in communities.
            </li>
            <li className='mt-5'>
              SHSWO was officially registered under the Societies Registration Act, 1860, on 21 January 2025. Today, the organization works with members, volunteers, advisors, professionals and community supporters in areas including social welfare, health and medical support, education and awareness, humanitarian assistance, youth development, skill development, sports, art & culture, afforestation and community development.
            </li>
            <li className='mt-5'>
              We believe that meaningful change begins with compassion, cooperation and collective responsibility. Through our initiatives and community participation, we strive to support those in need and contribute towards a healthier, stronger and more inclusive society.
            </li>
            <div className='mt-5'>
              <p className='font-bold'>Our Vision</p>
              <p>To build a compassionate, healthy, educated and inclusive society where every person can live with dignity, opportunity and hope</p>
              <p className='font-bold'>Our Mission</p>
              <p>To serve humanity through practical community-based initiatives that promote social welfare, health, education, awareness, environmental responsibility, youth development and community well-being</p>
              <p className='font-bold'>Our Values</p>
              <p>Compassion &bull; Integrity &bull; Service &bull; Inclusiveness &bull; Responsibility &bull; Community Participation</p>
              <p>Serving Humanity &bull; Supporting Communities &bull; Building a Better Future</p>
            </div>
          </ul>
        </section>
      </main>
    </>
  )
}

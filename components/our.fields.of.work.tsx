import { MdEvent, MdHealthAndSafety, MdOutlineThunderstorm } from 'react-icons/md'
import { PiLeaf, PiStudent, PiTrophy } from 'react-icons/pi'
const OurFieldofWorks = () => {
  return (
    <>
          <div className="flex justify-center mt-5">
        <p className="bg-red-800 text-white text-xs md:text-xl xl:text-xl py-2 px-10 rounded-xl font-bold flex justify-center items-center gap-x-1">
          Our Fields of Work <MdEvent size={15} />
        </p>
      </div>
      <div className="min-w-full md:min-w-1/2 xl:w-1/2 flex md:justify-center xl:justify-center overflow-x-scroll gap-x-3 p-3">
        <div className="flex gap-x-2 items-center justify-center flex-col text-lg font-black">
          <div className="bg-blue-200 rounded-lg p-5">
            <PiStudent size={25} />
          </div>
          <p className="text-blue-900">Education</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col text-lg font-black">
          <div className="bg-green-200 rounded-lg p-5">
            <MdHealthAndSafety size={25}/>
          </div>
          <p className="text-green-500">Health</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col text-lg font-black">
          <div className="bg-orange-200 rounded-lg p-5">
            <MdOutlineThunderstorm size={25} />
          </div>
          <p className="text-orange-400">Resilience</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col text-lg font-black">
          <div className="bg-lime-200 rounded-lg p-5">
            <PiLeaf size={25} />
          </div>
          <p className="text-lime-500">LiveliHood</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col text-lg font-black">
          <div className="bg-purple-200 rounded-lg p-5">
            <PiTrophy size={25} />
          </div>
          <p className="text-purple-500">Humanitarian</p>
        </div>
      </div>
    </>
  )
}

export default OurFieldofWorks
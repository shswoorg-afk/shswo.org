import { MdEvent, MdHealthAndSafety, MdHelp, MdPeople, MdSupport } from 'react-icons/md'
import { PiLeaf, PiSnowflake, PiStudent, PiTrophy } from 'react-icons/pi'
const OurFieldofWorks = () => {
  return (
    <>
          <div className="flex justify-center mt-5">
        <p className="bg-red-800 text-white text-xs md:text-xl xl:text-xl py-2 px-10 rounded-xl font-bold flex justify-center items-center gap-x-1">
          Our Fields of Work <MdEvent size={15} />
        </p>
      </div>
      <div className="min-w-full flex md:justify-center xl:justify-center overflow-x-auto gap-x-3 p-3 xl:text-xl text-sm md:text-xl mt-5">
        <div className="flex gap-x-2 items-center justify-center flex-col font-black">
          <div className="bg-blue-200 rounded-lg p-5">
            <MdSupport size={25}/>
          </div>
          <p className="text-blue-900">Essential Support</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col font-black">
          <div className="bg-green-200 rounded-lg p-5">
            <MdHealthAndSafety size={25}/>
          </div>
          <p className="text-green-500">Health Support</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col font-black">
          <div className="bg-orange-200 rounded-lg p-5">
            <PiSnowflake size={25}/>
          </div>
          <p className="text-orange-400">Winter Support</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col font-black">
          <div className="bg-lime-200 rounded-lg p-5">
            <PiStudent size={25}/>
          </div>
          <p className="text-lime-500">Education Support</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col font-black">
          <div className="bg-blue-200 rounded-lg p-5">
            <PiTrophy size={25} />
          </div>
          <p className="text-blue-500">Awareness Programmes</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col font-black">
          <div className="bg-yellow-200 rounded-lg p-5">
            <MdHelp size={25} />
          </div>
          <p className="text-yellow-500">Humanitarian Assistance</p>
        </div>
        <div className="flex gap-x-2 items-center justify-center flex-col font-black">
          <div className="bg-purple-200 rounded-lg p-5">
            <MdPeople size={25} />
          </div>
          <p className="text-purple-500">Community Development</p>
        </div>
      </div>
    </>
  )
}

export default OurFieldofWorks
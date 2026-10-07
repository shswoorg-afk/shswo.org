import Carousel from "./carousel";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { MdEvent, MdHealthAndSafety, MdOutlineThunderstorm, MdWork } from "react-icons/md";
import ImageSlider from "./image.slider";
import { PiLeaf, PiStudent, PiTrophy } from "react-icons/pi";
import OurFieldofWorks from "./our.fields.of.work";
import PopUpLogin from "./pop.up.login";
const Hero = () => {
  useGSAP(() => {
    const track = document.querySelector(".events-track") as HTMLElement;
    const container = document.querySelector(".events-container") as HTMLElement;

    if (!track || !container) return;

    const distance = track.scrollWidth - container.clientWidth;

    if (distance <= 0) return;

    gsap.to(track, {
      x: -distance,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  return (
    <>
    <main className="min-h-screen mt-4">
      <div className="events-container bg-blue-900 h-10 overflow-hidden text-white text-sm md:text-xl font-bold italic">
        <div className="events-track flex w-max items-center gap-x-2 px-2 whitespace-nowrap h-full">

          <p className="underline">
            Our next event is on 28th October
          </p>

          <span>&bull;</span>

          <p className="underline">
            Our next event is on 28th October
          </p>

          <span>&bull;</span>

          <p className="underline">
            Our next event is on 28th October
          </p>

          <span>&bull;</span>

          <p className="underline">
            Our next event is on 28th October
          </p>

        </div>
      </div>

      <Carousel />
      <div className="px-3">
        <div className="bg-cyan-100 mt-2 flex justify-center flex-col items-center rounded-xl py-2">
          <h1 className="text-xl md:text-4xl font-bold text-blue-800">
            Who are we?
          </h1>

          <p className="text-center font-medium text-sm md:text-2xl">
            Saving Humanity Social Work Organization (SHSWO) is a
            community-based organization dedicated to serving humanity
            and supporting people in need.
          </p>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <p className="bg-blue-800 text-white text-xs md:text-xl xl:text-xl p-2 rounded-xl font-bold flex justify-center items-center gap-x-1">
          Recent/Upcoming Programmes <MdEvent size={15} />
        </p>
      </div>
      <ImageSlider />
      <OurFieldofWorks/>
    </main>
    </>
  );
};

export default Hero;
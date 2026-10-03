import { useRef } from "react";
import gsap  from "gsap";
import { useGSAP } from "@gsap/react";
import { images } from "../lib/image"; 
export default function Carousel() {
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLElement>(".carousel-slide");

      if (slides.length <= 1) return;

      gsap.set(slides, {
        opacity: 0,
      });

      gsap.set(slides[0], {
        opacity: 1,
      });

      const timeline = gsap.timeline({
        repeat: -1,
      });

      slides.forEach((slide, index) => {
        const next = slides[(index + 1) % slides.length];
        timeline
          .to(slide, {
            opacity: 0,
            duration: 2,
            ease: "power2.inOut",
            delay: 2,
          })
          .to(
            next,
            {
              opacity: 1,
              duration: 2,
              ease: "power2.inOut",
            },
            "<"
          );
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full mt-2 overflow-hidden"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="carousel-slide absolute inset-0 w-full p-4 bg-blue-200 flex justify-center"
        >
          <div className="w-full md:w-250 md:h-200">
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full"
            />
          </div>
        </div>
      ))}
      <div className="w-full p-4 invisible">
        <div className="w-full md:w-200 md:h-200">
          <img
            src={images[0]}
            alt={images[0]}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
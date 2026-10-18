import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { getMarquee } from "../serverFunc/getMarquee";

type MarqueeMessage = {
  id: string;
  message: string;
};

const EventsMarquee = () => {
  const [messages, setMessages] = useState<MarqueeMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;

    getMarquee()
      .then((result) => {
        if (active) setMessages(result.messages);
      })
      .catch((error) => {
        console.error("Failed to fetch announcements:", error);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;

      if (!container || !track || messages.length === 0) return;

      const distance = track.scrollWidth - container.clientWidth;

      if (distance <= 0) return;

      const animation = gsap.to(track, {
        x: -distance,
        duration: distance / 40,
        ease: "none",
        repeat: -1,
        yoyo: true,
        repeatDelay: 0.5,
      });

      return () => {
        animation.kill();
        gsap.set(track, { clearProps: "transform" });
      };
    },
    {
      scope: containerRef,
      dependencies: [messages],
      revertOnUpdate: true,
    }
  );

  if (loading) {
    return <p className="text-center text-sm">Loading announcements...</p>;
  }

  if (messages.length === 0) {
    return (
      <p className="text-center text-sm">
        There are no upcoming events yet.
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-10 overflow-hidden bg-blue-900 text-sm font-bold italic text-white md:text-xl"
    >
      <div
        ref={trackRef}
        className="flex h-full w-max items-center gap-3 whitespace-nowrap px-4"
      >
        {messages.map(({ id, message }) => (
          <div key={id} className="flex shrink-0 items-center gap-3">
            <p>{message}</p>
            <span>•</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsMarquee;

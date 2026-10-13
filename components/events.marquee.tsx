
import { useEffect, useState } from "react";
import { getMarquee } from "../serverFunc/getMarquee";

type MarqueeMessage = {
  id: string;
  message: string;
};

const EventsMarquee = () => {
  const [messages, setMessages] = useState<MarqueeMessage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    getMarquee()
      .then((result) => {
        if (active) {
          setMessages(result.messages);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch marquee announcements:", error);
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (loading || messages.length === 0) {
    return <div className="font-bold text-center text-xl">There are no upcoming events yet</div>;
  }

  return (
    <div className="events-container h-10 overflow-hidden bg-blue-900 text-sm font-bold italic text-white md:text-xl">
      <div className="events-track flex h-full w-max items-center gap-x-2 whitespace-nowrap px-2">
        {messages.map(({ id, message }) => (
          <div key={id} className="flex items-center gap-x-2">
            <p className="underline">{message}</p>
            <span>&bull;</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsMarquee;

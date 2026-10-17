import { useEffect, useState } from "react";
import { getMediaByType } from "../../serverFunc/media.function";
import AdminDeleteEvent from "./admin.delete.event.button";

type EventMedia = {
    _id: string;
    fileId: string;
    fileName: string;
    url: string;
    type: string;
    sliderTitle?: string;
    sliderText?: string;
    createdAt: string;
    updatedAt: string;
};

const AdminEvents = () => {
    const [events, setEvents] = useState<EventMedia[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadEvents() {
            try {
                const result = await getMediaByType({
                    data: { type: "image-slider" },
                });

                setEvents(result as EventMedia[]);
            } catch {
                setError("Failed to load events. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        void loadEvents();
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6">
            <div className="mx-auto max-w-6xl">
                <header className="mb-8">
                    <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
                        SHSWO Community
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        Events & Programs
                    </h1>
                    <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                        Discover our community programs and the initiatives
                        through which we work towards a better future.
                    </p>
                </header>

                {loading ? (
                    <div className="py-20 text-center text-slate-500">
                        Loading events...
                    </div>
                ) : error ? (
                    <div
                        role="alert"
                        className="rounded-xl border border-red-200 bg-white p-6 text-center text-red-600"
                    >
                        {error}
                    </div>
                ) : events.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-blue-200 bg-white px-6 py-16 text-center">
                        <h2 className="text-xl font-semibold">
                            No events available yet
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Check back soon for our upcoming programs.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <article
                                key={event._id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-md"
                            >
                                <div className="aspect-[4/3] overflow-hidden bg-blue-50">
                                    <img
                                        src={event.url}
                                        alt={event.sliderTitle || event.fileName}
                                        loading="lazy"
                                        className="h-full w-full object-cover transition duration-300 hover:scale-105"
                                    />
                                </div>

                                <div className="p-5">
                                    <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                                        SHSWO Program
                                    </span>

                                    <h2 className="mt-3 text-xl font-bold leading-snug">
                                        {event.sliderTitle || "Community Event"}
                                    </h2>

                                    {event.sliderText && (
                                        <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-slate-600">
                                            {event.sliderText}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <AdminDeleteEvent id={event._id} title="Delete Events"/>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default AdminEvents;
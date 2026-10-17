import { useEffect, useState } from "react";
import { getOnlyAdvisor } from "../serverFunc/getOnlyAdvisor";

type Advisor = {
    _id: string;
    fullName?: string;
    fatherOrHusbandName?: string;
    dob?: string | null;
    occupation?: string;
    village?: string;
    profilePicUrl?: string;
    mobile?: string;
    district?: string;
    state?: string;
    status?: string;
    createdAt?: string | null;
};

export default function OnlyAdvisors() {
    const [advisors, setAdvisors] = useState<Advisor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadAdvisors() {
            try {
                const result = await getOnlyAdvisor();
                setAdvisors(result);
            } catch (error) {
                console.error("Failed to load advisors:", error);
            } finally {
                setLoading(false);
            }
        }

        void loadAdvisors();
    }, []);

    return (
        <main className="min-h-screen bg-slate-100 px-3 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 rounded-2xl bg-slate-950 p-5 text-white shadow-lg sm:mb-8 sm:p-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-300 sm:text-xs">
                        Saving Humanity Social Work Organization
                    </p>

                    <h1 className="mt-3 text-2xl font-extrabold tracking-tight sm:text-4xl">
                        Our Advisors
                    </h1>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                        Meet the people guiding our mission and community initiatives.
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-xs font-medium text-slate-300">
                        <span className="size-2 rounded-full bg-amber-400" />
                        {advisors.length} registered advisor{advisors.length !== 1 ? "s" : ""}
                    </div>
                </header>

                {loading ? (
                    <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-slate-500">
                        Loading advisors...
                    </div>
                ) : advisors.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
                        <h2 className="font-semibold text-slate-800">
                            No advisors found
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Advisor profiles will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                        {advisors.map((advisor) => (
                            <article
                                key={advisor._id}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                {/* Distinctive advisor header */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-4 pb-5 pt-5 sm:px-5">
                                    <div className="pointer-events-none absolute -right-12 -top-12 size-36 rounded-full border-[18px] border-white/5" />
                                    <div className="pointer-events-none absolute -bottom-16 -left-10 size-36 rounded-full border-[18px] border-amber-300/10" />

                                    <div className="relative flex items-center justify-between gap-3">
                                        <div>
                                            <h2 className="text-sm font-extrabold tracking-widest text-white">
                                                SHSWO
                                            </h2>
                                            <p className="mt-1 max-w-[220px] text-[9px] font-medium leading-4 text-blue-200">
                                                SAVING HUMANITY SOCIAL WORK ORGANIZATION
                                            </p>
                                        </div>

                                        <div className="shrink-0 rounded-md border border-amber-300/40 bg-amber-300/10 px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-wider text-amber-200">
                                            Advisor
                                        </div>
                                    </div>

                                    <div className="relative mt-5 flex items-center gap-3 sm:gap-4">
                                        {advisor.profilePicUrl ? (
                                            <img
                                                src={advisor.profilePicUrl}
                                                alt={advisor.fullName || "Advisor"}
                                                loading="lazy"
                                                className="size-[76px] shrink-0 rounded-xl border-2 border-amber-300/80 object-cover shadow-lg sm:size-24"
                                            />
                                        ) : (
                                            <div className="flex size-[76px] shrink-0 items-center justify-center rounded-xl border-2 border-amber-300/80 bg-blue-800 text-2xl font-bold text-white sm:size-24 sm:text-3xl">
                                                {advisor.fullName?.charAt(0).toUpperCase() || "A"}
                                            </div>
                                        )}

                                        <div className="min-w-0 flex-1">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-amber-300">
                                                Advisor ID
                                            </p>
                                            <p className="mt-1 font-mono text-[10px] text-blue-100">
                                                {advisor._id.slice(-8).toUpperCase()}
                                            </p>

                                            <h3 className="mt-2 break-words text-base font-extrabold leading-snug text-white sm:text-lg">
                                                {advisor.fullName || "Advisor"}
                                            </h3>

                                            <span
                                                className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold capitalize ${
                                                    advisor.status === "approved"
                                                        ? "bg-emerald-400/15 text-emerald-200"
                                                        : advisor.status === "rejected"
                                                          ? "bg-red-400/15 text-red-200"
                                                          : "bg-amber-300/15 text-amber-200"
                                                }`}
                                            >
                                                <span className="size-1.5 rounded-full bg-current" />
                                                {advisor.status || "Pending"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Gold accent */}
                                <div className="h-1 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-200" />

                                {/* Advisor information */}
                                <div className="p-4 sm:p-5">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="h-4 w-1 rounded-full bg-blue-900" />
                                        <h4 className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-700 sm:text-xs">
                                            Advisor Information
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-3 gap-y-4 rounded-xl border border-slate-100 bg-slate-50 p-3 sm:gap-x-4 sm:p-4">
                                        <Detail
                                            label="Father / Husband"
                                            value={advisor.fatherOrHusbandName}
                                        />
                                        <Detail
                                            label="Occupation"
                                            value={advisor.occupation}
                                        />
                                        <Detail
                                            label="Village"
                                            value={advisor.village}
                                        />
                                        <Detail
                                            label="District / State"
                                            value={[advisor.district, advisor.state]
                                                .filter(Boolean)
                                                .join(", ")}
                                        />
                                    </div>
                                </div>

                                <footer className="flex items-center justify-between gap-2 border-t border-slate-200 bg-white px-4 py-3 sm:px-5">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 sm:text-[10px]">
                                        SHSWO Advisory Team
                                    </span>
                                    <span className="text-xs font-black tracking-widest text-blue-900">
                                        SHSWO
                                    </span>
                                </footer>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

function Detail({
    label,
    value,
}: {
    label: string;
    value?: string;
}) {
    return (
        <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-wider text-slate-400 sm:text-[10px]">
                {label}
            </p>
            <p className="mt-1 break-words text-xs font-semibold leading-5 text-slate-800 sm:text-sm">
                {value || "—"}
            </p>
        </div>
    );
}
import { useEffect, useState } from "react";
import { getOnlyMembers } from "../serverFunc/getOnlyMembers";
import BackButton from "./BackButton";

type Member = {
    _id: string;
    applicantName?: string;
    fatherName?: string;
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

export default function OnlyMembers() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMembers() {
            try {
                const result = await getOnlyMembers();
                setMembers(
                    [...result].sort(
                        (a, b) =>
                            new Date(a.createdAt ?? 0).getTime() -
                            new Date(b.createdAt ?? 0).getTime()
                    )
                );
            } catch (error) {
                console.error("Failed to load members:", error);
            } finally {
                setLoading(false);
            }
        }

        void loadMembers();
    }, []);

    return (
        <main className="min-h-screen bg-blue-800 px-3 py-6 text-slate-900 sm:px-6 sm:py-10">
            <div>
                <BackButton to="/" />
            </div>
            <div className="mx-auto max-w-7xl mt-7">
                <header className="mb-6 px-1 text-white sm:mb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-200 sm:text-sm sm:tracking-[0.2em]">
                        Saving Humanity Social Work Organization
                    </p>

                    <h1 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-4xl">
                        Our Members
                    </h1>

                    <p className="mt-2 text-xs text-blue-100 sm:text-sm">
                        Membership directory · {members.length} members
                    </p>
                </header>

                {loading ? (
                    <div className="rounded-xl border border-blue-200/30 bg-blue-700 p-8 text-center text-sm text-white sm:rounded-2xl sm:p-10">
                        Loading members...
                    </div>
                ) : members.length === 0 ? (
                    <div className="rounded-xl border border-blue-200/30 bg-blue-700 p-8 text-center text-white sm:rounded-2xl sm:p-10">
                        <h2 className="font-semibold">No members found</h2>
                        <p className="mt-1 text-sm text-blue-100">
                            Registered members will appear here.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3">
                        {members.map((member) => (
                            <article
                                key={member._id}
                                className="overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-lg shadow-blue-950/15 transition-shadow hover:shadow-xl"
                            >
                                {/* ID card header */}
                                <div className="relative overflow-hidden bg-gradient-to-br from-blue-100 via-sky-50 to-white px-4 py-4 sm:px-5 sm:py-5">
                                    <div className="pointer-events-none absolute -right-12 -top-14 size-36 rounded-full border-[18px] border-blue-200/40" />

                                    <div className="relative flex items-center gap-3">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-base font-black text-white shadow-sm sm:size-12 sm:text-lg">
                                            S
                                        </div>

                                        <div className="min-w-0">
                                            <h2 className="text-xs font-extrabold tracking-wide text-blue-950 sm:text-sm">
                                                SHSWO
                                            </h2>
                                            <p className="mt-0.5 max-w-[230px] text-[9px] font-semibold leading-4 text-blue-700 sm:text-[10px]">
                                                SAVING HUMANITY SOCIAL WORK ORGANIZATION
                                            </p>
                                        </div>

                                        <div className="ml-auto shrink-0 rounded-full border border-blue-200 bg-white/80 px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-blue-700">
                                            Member
                                        </div>
                                    </div>

                                    <div className="relative mt-5 flex min-w-0 items-center gap-3 sm:gap-4">
                                        {member.profilePicUrl ? (
                                            <img
                                                src={member.profilePicUrl}
                                                alt={member.applicantName || "Member"}
                                                loading="lazy"
                                                className="size-[76px] shrink-0 rounded-full border-[3px] border-white object-cover shadow-md sm:size-24 sm:border-4"
                                            />
                                        ) : (
                                            <div className="flex size-[76px] shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-blue-200 text-2xl font-bold text-blue-800 shadow-md sm:size-24 sm:border-4 sm:text-3xl">
                                                {member.applicantName?.charAt(0).toUpperCase() || "M"}
                                            </div>
                                        )}

                                        <div className="min-w-0 flex-1">
                                            <span
                                                className={`mt-2 inline-flex max-w-full items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold capitalize sm:text-xs ${member.status === "approved"
                                                        ? "bg-emerald-100 text-emerald-700"
                                                        : member.status === "rejected"
                                                            ? "bg-red-100 text-red-700"
                                                            : "bg-amber-100 text-amber-700"
                                                    }`}
                                            >
                                                <span className="size-1.5 rounded-full bg-current" />
                                                {member.status || "Pending"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Member details */}
                                <div className="px-4 py-4 sm:px-5 sm:py-5">
                                    <div className="mb-3 flex items-center gap-2">
                                        <span className="h-4 w-1 rounded-full bg-blue-600" />
                                        <h4 className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-800 sm:text-xs">
                                            Member Information
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-2 gap-x-3 gap-y-4 rounded-xl bg-slate-50 p-3 sm:gap-x-4 sm:p-4">
                                        <Detail
                                            label="Your Name"
                                            value={member.applicantName}
                                        />
                                        <Detail
                                            label="Father's Name"
                                            value={member.fatherName}
                                        />
                                        <Detail
                                            label="Occupation"
                                            value={member.occupation}
                                        />
                                        <Detail
                                            label="Village"
                                            value={member.village}
                                        />
                                        <Detail
                                            label="District / State"
                                            value={[member.district, member.state]
                                                .filter(Boolean)
                                                .join(", ")}
                                        />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="flex items-center justify-between gap-2 border-t border-blue-100 bg-blue-50 px-4 py-3 sm:px-5">
                                    <span className="text-[9px] font-bold uppercase tracking-wider text-blue-800 sm:text-[10px]">
                                        Official Member Record
                                    </span>
                                    <span className="shrink-0 text-[10px] font-extrabold tracking-widest text-blue-600">
                                        SHSWO
                                    </span>
                                </div>
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
            <p className="mt-1 wrap-break-word text-xs font-bold leading-5 text-slate-800 sm:text-sm">
                {value || "—"}
            </p>
        </div>
    );
}
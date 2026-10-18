import { Link } from "@tanstack/react-router";
import LogOutButton from "./logout.button";
import BackButton from "./BackButton";

type Member = {
    _id: string;
    applicantName?: string;
    fatherName?: string;
    dob?: string | Date | null;
    occupation?: string;
    memberId? : string,
    village?: string;
    profilePicUrl?: string;
    proofOfIdentityUrl?: string;
    po?: string;
    ps?: string;
    district?: string;
    pin?: string;
    joiningdate?: Date | string,
    state?: string;
    organizationIdUrl?: string | null,
    mobile?: string;
    payments?: {
        _id?: string;
        paymentStatus?: string | null;
        paymentDues?: string | null;
    }[] | null;
    identityType?: string;
    status?: string;
    createdAt?: string | Date | null;
};

export default function MemberDashboardProfile({
    member,
}: {
    member: Member;
}) {
    const joiningDate = member.joiningdate
        ? new Date(member.joiningdate).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        })
        : undefined;
    const details = [
        ["Father's Name", member.fatherName],
        ["Date of Birth", member.dob ? new Date(member.dob).toLocaleDateString("en-IN") : undefined],
        ["Occupation", member.occupation],
        ["Mobile", member.mobile],
        ["Joining Date", joiningDate],
        ["Village", member.village],
        ["Post Office", member.po],
        ["Police Station", member.ps],
        ["District", member.district],
        ["PIN Code", member.pin],
        ["State", member.state],
        ["Identity Type", member.identityType?.replace("-", " ")],
    ];

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">      <BackButton
                to="/" />
                <header className="mb-8 mt-3">
                    <div>
                        <p className="text-sm font-medium text-blue-700">SHSWO MEMBER PORTAL</p>
                        <div className="flex justify-between w-full">
                            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                                My Dashboard
                            </h1>
                            <LogOutButton />
                        </div>
                    </div>

                </header>

                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="h-28 bg-gradient-to-r from-blue-900 to-blue-700" />

                    <div className="px-5 pb-6 sm:px-8">
                        <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end">
                            {member.profilePicUrl ? (
                                <img
                                    src={member.profilePicUrl}
                                    alt={member.applicantName ?? "Member"}
                                    className="h-24 w-24 rounded-full border-4 border-white bg-white object-contain shadow-sm"
                                />
                            ) : (
                                <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-slate-100 text-3xl font-bold text-slate-500">
                                    {member.applicantName?.charAt(0) ?? "M"}
                                </div>
                            )}

                            <div className="flex-1 pb-1">
                                <h2 className="text-xl font-bold text-white">
                                    {member.applicantName}
                                </h2>
                                <p className="mt-1 text-sm text-slate-500 font-bold">
                                    Joining Date: {joiningDate ?? "Not provided"}
                                </p>
                                {
                                    member.memberId ? <p className="text-green-500 font-bold text-sm bg-green-100 w-fit p-1 rounded-full">Member Id : {member.memberId}</p> : <p className="text-red-600 text-sm font-bold
                                    ">Member ID not found</p>
                                }
                            </div>

                            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold capitalize text-emerald-700">
                                {member.status ?? "Approved"}
                            </span>
                            <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold capitalize text-emerald-700">
                                {
                                    member.applicantName && "MEMBER"
                                }
                            </span>
                        </div>
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                    <h2 className="text-lg font-bold text-slate-900">Personal Information</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Your registered member details.
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {details.map(([label, value]) => (
                            <div key={label}>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    {label}
                                </p>
                                <p className="mt-1 break-words font-medium capitalize text-slate-800">
                                    {value || "Not provided"}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                    <h2 className="text-lg font-bold text-slate-900">Documents</h2>
                    <div className="mt-4 flex flex-wrap gap-3 items-center">
                        {member.profilePicUrl && (
                            <a
                                href={member.profilePicUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                View Profile Photo
                            </a>
                        )}
                        {member.proofOfIdentityUrl && (
                            <a
                                href={member.proofOfIdentityUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                View Identity Proof
                            </a>
                        )}
                        {member.organizationIdUrl ? (
                            <a
                                href={`${member.organizationIdUrl}?ik-attachment=true`}
                                className="text-blue-600 underline"
                            >
                                Download Organization ID
                            </a>
                        ) : (
                            <p className="text-red-500 text-xs font-bold  text-center">
                                You don't have Organization ID yet
                            </p>
                        )}
                    </div>
                </section>
                {member.payments && member.payments.length > 0 ? (
                    <section className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
                        <h2 className="border-b border-slate-200 px-5 py-4 text-lg font-semibold text-slate-900">
                            Payment Details
                        </h2>

                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                                <tr>
                                    <th className="px-5 py-3 font-semibold">Payment Status</th>
                                    <th className="px-5 py-3 font-semibold">Payment Dues</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {member.payments.map((payment, index) => (
                                    <tr key={payment._id?.toString() ?? index}>
                                        <td className="px-5 py-4 font-medium text-slate-800">
                                            {payment.paymentStatus || "Not updated"}
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {payment.paymentDues || "Not updated"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                ) : (
                    <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-center">
                        <h2 className="text-lg font-semibold text-slate-900">
                            Payment Details
                        </h2>
                        <p className="mt-2 text-sm text-slate-500">
                            Payment details haven't been updated yet.
                        </p>
                    </section>
                )}

                <p className="mt-6 text-center text-xs text-slate-400">
                    Saving Humanity Social Work Organization
                </p>
            </div>
        </main>
    );
}
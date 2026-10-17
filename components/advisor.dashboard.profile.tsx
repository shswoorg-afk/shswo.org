import { Link } from "@tanstack/react-router";

type Advisor = {
    _id: string;
    fullName?: string;
    fatherOrHusbandName?: string;
    mobile?: string;
    status?: string;
    organizationIdUrl? : string | null,
    createdAt?: string | Date | null;
};

export default function AdvisorDashboardProfile({
    advisor,
}: {
    advisor: Advisor;
}) {
    const details = [
        ["Full Name", advisor.fullName],
        ["Father / Husband's Name", advisor.fatherOrHusbandName],
        ["Mobile Number", advisor.mobile],
        [
            "Application Date",
            advisor.createdAt
                ? new Date(advisor.createdAt).toLocaleDateString("en-IN")
                : undefined,
        ],
    ];

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-blue-700">SHSWO ADVISOR PORTAL</p>
                        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
                            My Dashboard
                        </h1>
                    </div>
                    <Link
                        to="/"
                        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Home
                    </Link>
                </header>

                <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50 text-3xl font-bold text-blue-800">
                            {advisor.fullName?.charAt(0) ?? "A"}
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-medium text-blue-700">SHSWO Advisor</p>
                            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                {advisor.fullName}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Advisor ID: {advisor._id}
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold capitalize text-emerald-700">
                            {advisor.status ?? "Approved"}
                        </span>
                    </div>
                </section>

                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
                    <h2 className="text-lg font-bold text-slate-900">Advisor Information</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Your registered advisor details.
                    </p>

                    <div className="mt-6 grid gap-5 sm:grid-cols-2">
                        {details.map(([label, value]) => (
                            <div key={label}>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                                    {label}
                                </p>
                                <p className="mt-1 break-words font-medium text-slate-800">
                                    {value || "Not provided"}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                <p className="mt-6 text-center text-xs text-slate-400">
                    Saving Humanity Social Work Organization
                </p>
            </div>
        </main>
    );
}
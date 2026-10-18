import { useEffect, useState } from "react";
import { getAllMembers } from "../../serverFunc/admin.get.all.members";
import OrganizationIdUploader from "../organization.id.uploader";
import AdminIdUploader from "./admin.member.id.uploader";

export default function AllMembersList() {
  const [applications, setApplications] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllMembers()
      .then((data) => {
        setApplications(
          data.filter((application: any) => application.status === "approved"),
        );
      })
      .catch(() => setError("Failed to load applications."))
      .finally(() => setLoading(false));
  }, []);

  const filteredApplications = applications.filter((application) =>
    [
      application.fullName,
      application.applicantName,
      application.mobile,
      application.username,
    ].some((value) =>
      String(value ?? "").toLowerCase().includes(search.toLowerCase()),
    ),
  );

  if (loading) {
    return (
      <p className="py-10 text-center text-neutral-500">
        Loading approved users...
      </p>
    );
  }

  if (error) {
    return <p className="py-10 text-center text-red-600">{error}</p>;
  }

  return (
    <div className="mt-6 space-y-6 text-black bg-white">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-neutral-200 p-5">
          <p className="text-sm text-neutral-500">Approved users</p>
          <p className="mt-2 text-3xl font-semibold">
            {applications.length}
          </p>
        </div>

        <div className="rounded-xl border border-neutral-200 p-5">
          <p className="text-sm text-neutral-500">Search results</p>
          <p className="mt-2 text-3xl font-semibold">
            {filteredApplications.length}
          </p>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-neutral-200">
        <div className="border-b border-neutral-200 p-4">
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search approved users..."
            className="w-full rounded-lg border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase">
              <tr>
                <th className="px-5 py-4 font-medium">#</th>
                <th className="px-5 py-4 font-medium">Name</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Mobile</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Organization ID</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-neutral-100">
              {filteredApplications.map((application, index) => (
                <tr
                  key={String(application._id)}
                  className="hover:bg-neutral-50"
                >
                  <td className="px-5 py-4 text-neutral-400">
                    {index + 1}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 font-medium">
                    {application.fullName ??
                      application.applicantName ??
                      "—"}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${application.fullName
                          ? "bg-blue-50 text-blue-700"
                          : "bg-purple-50 text-purple-700"
                        }`}
                    >
                      {application.fullName ? "Advisor" : "Member"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {application.mobile ?? "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                      Approved
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    {application.organizationIdUrl ? (
                      <a
                        href={application.organizationIdUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium underline underline-offset-4"
                      >
                        View ID
                      </a>
                    ) : (
                      <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-sm hover:bg-neutral-50">
                        <OrganizationIdUploader
                          applicationId={String(application._id)}
                          collection={application.applicantName ? "member" : "advisor"}
                          imageUrl={application.organizationIdUrl ?? ""}
                        />
                        <AdminIdUploader _id={application._id}/>
                      </label>
                    )}
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-12 text-center text-neutral-500"
                  >
                    No approved users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

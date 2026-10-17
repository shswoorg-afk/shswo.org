
import { useEffect, useState } from "react";
import { acceptAdvisorApplication, getAdvisorApplications, rejectAdvisorApplication } from "../../serverFunc/admin.advisor.application";
type Application = {
  _id: string;
  fullName: string;
  fatherOrHusbandName: string;
  dob: string;
  occupation: string;
  village: string;
  po: string;
  ps: string;
  joiningdate : string,
  district: string;
  pin: string;
  state: string;
  mobile: string;
  identityType: "aadhar" | "pan" | "passport" | "voter-id";
  status: string;
  createdAt: string;
};

export default function VerifySignupAdvisor() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState<string | null>(null);

  async function loadApplications() {
    setLoading(true);
    setError("");

    try {
      const result = await getAdvisorApplications();
      setApplications(result as Application[]);
    } catch (err) {
      console.error(err);
      setError("Unable to load advisor applications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadApplications();
  }, []);

  async function handleReview(
    applicationId: string,
    action: "accept" | "reject",
  ) {
    const confirmed = window.confirm(
      action === "accept"
        ? "Approve this advisor application?"
        : "Reject and delete this advisor application?",
    );

    if (!confirmed) return;

    setProcessingId(applicationId);
    setError("");

    try {
      if (action === "accept") {
        await acceptAdvisorApplication({
          data: { applicationId },
        });
      } else {
        await rejectAdvisorApplication({
          data: { applicationId },
        });
      }

      setApplications((current) =>
        current.filter((application) => application._id !== applicationId),
      );
    } catch (err) {
      console.error(err);
      setError(`Unable to ${action} this application. Please try again.`);
    } finally {
      setProcessingId(null);
    }
  }

  if (loading) {
    return <div className="p-6">Loading advisor applications...</div>;
  }

  return (
    <main className="min-h-screen bg-gray-300 p-4 text-gray-950 sm:p-8 mt-5">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">
              Advisor Signup Verification
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Review and verify new SHSWO advisor applications.
            </p>
          </div>

          <button
            type="button"
            onClick={() => void loadApplications()}
            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold hover:bg-gray-100"
          >
            Refresh
          </button>
        </header>

        <div className="mb-5 rounded-xl border bg-white p-4">
          <p className="text-sm text-gray-500">Pending applications</p>
          <p className="mt-1 text-3xl font-bold">{applications.length}</p>
        </div>

        {error && (
          <p role="alert" className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-800">
            {error}
          </p>
        )}

        {applications.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
            <h2 className="font-semibold">No pending applications</h2>
            <p className="mt-1 text-sm text-gray-500">
              New advisor signups will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2">
            {applications.map((application) => {
              const processing = processingId === application._id;

              return (
                <article
                  key={application._id}
                  className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-lg font-bold">
                        {application.fullName}
                      </h2>
                      <p className="text-sm text-gray-500">
                        +91 {application.mobile}
                      </p>
                    </div>

                    <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
                      Pending
                    </span>
                  </div>

                  <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                    <Detail label="Father's name" value={application.fatherOrHusbandName} />
                    <Detail
                      label="Date of birth"
                      value={new Date(application.dob).toLocaleDateString()}
                    />
                    <Detail label="Occupation" value={application.occupation} />
                    <Detail label="Mobile" value={application.mobile} />
                    <Detail label="Village" value={application.village} />
                    <Detail label="Date of Joining" value={application.joiningdate} />
                    <Detail label="Post office" value={application.po} />
                    <Detail label="Police station" value={application.ps} />
                    <Detail label="District" value={application.district} />
                    <Detail label="PIN" value={application.pin} />
                    <Detail label="State" value={application.state} />
                    <Detail
                      label="Identity proof"
                      value={application.identityType.toUpperCase()}
                    />
                    <Detail
                      label="Applied on"
                      value={new Date(application.createdAt).toLocaleString()}
                    />
                  </dl>

                  <div className="mt-6 flex gap-3 border-t border-gray-100 pt-4">
                    <button
                      type="button"
                      disabled={processing}
                      onClick={() =>
                        void handleReview(application._id, "accept")
                      }
                      className="flex-1 rounded-lg bg-green-700 px-4 py-2.5 font-semibold text-white hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {processing ? "Processing..." : "Accept"}
                    </button>

                    <button
                      type="button"
                      disabled={processing}
                      onClick={() =>
                        void handleReview(application._id, "reject")
                      }
                      className="flex-1 rounded-lg bg-red-600 px-4 py-2.5 font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {processing ? "Processing..." : "Reject"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-gray-500">{label}</dt>
      <dd className="break-words font-medium">{value || "—"}</dd>
    </div>
  );
}

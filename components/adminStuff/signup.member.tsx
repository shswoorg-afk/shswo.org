import { useEffect, useState } from "react";
import { submitMemberApplication, getMemberApplicationStatus } from "../../serverFunc/member.application";
import ImageUploaderProfile from "./image.uploader.profile";
import BackButton from "../BackButton";
import PendingApplicationPopup from "../pending.application.popup";
const SignupMember = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "" | "pending" | "approved" | "rejected" | null
  >("");
  const [profilePic, setProfilePic] = useState<{
    url: string;
    fileId: string;
  } | null>(null);
  const [showPendingPopup, setShowPendingPopup] = useState(false);
  const [identityProof, setIdentityProof] = useState<{
    url: string;
    fileId: string;
  } | null>(null);
  useEffect(() => {
    getMemberApplicationStatus()
      .then((result) => {
        setStatus(result.status);
        if (result.status === "pending") {
          setMessage("Application submitted! Await admin verification.");
        }
        else if (result.status === "approved") {
          setMessage("Verification successful");
        }
        else if (result.status === "rejected") {
          setMessage("Your verfication have been rejected");
        }
      })
      .catch((error) => {
        console.error("Failed to fetch application status:", error);
      });
  }, []);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profilePic || !identityProof) {
      setMessage("Please upload your profile picture and proof of identity.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData(e.currentTarget);

      await submitMemberApplication({
        data: {
          applicantName: String(formData.get("applicantName") ?? ""),
          fatherName: String(formData.get("fatherName") ?? ""),
          dob: String(formData.get("dob") ?? ""),
          occupation: String(formData.get("occupation") ?? ""),
          village: String(formData.get("village") ?? ""),
          po: String(formData.get("po") ?? ""),
          ps: String(formData.get("ps") ?? ""),
          joiningdate: String(formData.get("joiningdate")),
          district: String(formData.get("district") ?? ""),
          pin: String(formData.get("pin") ?? ""),
          state: String(formData.get("state") ?? ""),
          mobile: String(formData.get("mobile") ?? ""),
          password: String(formData.get("password") ?? ""),
          identityType: formData.get("identityType") as
            | "aadhar"
            | "pan"
            | "passport"
            | "voter-id",
          profilePicUrl: profilePic.url,
          profilePicId: profilePic.fileId,
          proofOfIdentityUrl: identityProof.url,
          proofOfIdentityId: identityProof.fileId,
        },
      });

      // Show pending status immediately after successful submission 
      setStatus("pending");
      setMessage("Application submitted! Await admin verification.");
      setShowPendingPopup(true);

      // Reset fields for another application
      e.currentTarget.reset();
      setProfilePic(null);
      setIdentityProof(null)
    } catch (error) {
      console.error(error);
      setMessage("Unable to submit your application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen w-full bg-white px-4 py-8 sm:px-6 sm:py-12">
      <PendingApplicationPopup
        isOpen={showPendingPopup}
        onClose={() => setShowPendingPopup(false)}
      />
      <div className="mx-auto flex w-full max-w-xl flex-col items-center">
        <div className="mb-6 flex w-full items-center justify-between">
          <BackButton to="/" />
          <span className="text-xs font-semibold text-neutral-400">
            Member Portal
          </span>
        </div>

        {/* Logo and organization name */}
        <div className="mb-6 flex flex-col items-center text-center">
          <img
            src="/logo.webp"
            alt="SHSWO Logo"
            className="mb-3 size-20 object-contain sm:size-24"
          />

          <h1 className="text-xl font-extrabold tracking-wide text-green-700 sm:text-2xl">
            SHSWO
          </h1>

          <p className="mt-1 max-w-sm text-xs font-semibold leading-5 tracking-wide text-green-800 sm:text-sm">
            SAVING HUMANITY SOCIAL WORK ORGANIZATION
          </p>

          <div className="mt-4 h-1 w-16 rounded-full bg-green-700" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex max-h-[75vh] w-full flex-col gap-y-2 overflow-y-auto rounded-2xl border border-neutral-200 bg-white p-5 shadow-lg shadow-neutral-200/60 sm:p-8"
        >
          <h2 className="mb-1 text-center text-xl font-bold text-green-800">
            Member Registration
          </h2>

          <p className="mb-4 text-center text-sm font-normal text-neutral-500">
            Complete the form to apply for membership.
          </p>

          <label htmlFor="applicantName" className="text-sm text-neutral-800">
            Applicant Name
          </label>
          <input id="applicantName" name="applicantName" required className="custom-input" placeholder="John Doe" />

          <label htmlFor="fatherName" className="text-sm text-neutral-800">
            Father Name
          </label>
          <input id="fatherName" name="fatherName" required className="custom-input" placeholder="Father's name" />

          <label htmlFor="dob" className="text-sm text-neutral-800">
            Date of Birth
          </label>
          <input id="dob" name="dob" type="date" required className="custom-input" />

          <label htmlFor="joiningdate" className="text-sm text-neutral-800">
            Date of Joining
          </label>
          <input id="joiningdate" name="joiningdate" type="date" required className="custom-input" />

          <label htmlFor="occupation" className="text-sm text-neutral-800">
            Occupation
          </label>
          <input id="occupation" name="occupation" required className="custom-input" placeholder="Eg. Doctor" />

          <label htmlFor="village" className="text-sm text-neutral-800">
            Village
          </label>
          <input id="village" name="village" required className="custom-input" placeholder="Enter your village" />

          <label htmlFor="po" className="text-sm text-neutral-800">
            PO
          </label>
          <input id="po" name="po" required className="custom-input" placeholder="Enter your PO" />

          <label htmlFor="ps" className="text-sm text-neutral-800">
            PS
          </label>
          <input id="ps" name="ps" required className="custom-input" placeholder="Enter your PS" />

          <label htmlFor="district" className="text-sm text-neutral-800">
            District
          </label>
          <input id="district" name="district" required className="custom-input" placeholder="Enter your district" />

          <label htmlFor="pin" className="text-sm text-neutral-800">
            PIN
          </label>
          <input id="pin" name="pin" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required className="custom-input" placeholder="6-digit PIN" />

          <label htmlFor="state" className="text-sm text-neutral-800">
            State
          </label>
          <input id="state" name="state" required className="custom-input" placeholder="Enter your state" />

          <label htmlFor="mobile" className="text-sm text-neutral-800">
            Mobile Number
          </label>
          <input id="mobile" name="mobile" type="tel" minLength={10} required className="custom-input" placeholder="Enter your phone number" />

          <label htmlFor="password" className="text-sm text-neutral-800">
            Password
          </label>
          <input id="password" name="password" type="password" required minLength={8} maxLength={128} className="custom-input" placeholder="Choose a password" />

          <label htmlFor="identityType" className="text-sm text-neutral-800">
            Proof of Identity
          </label>
          <select
            id="identityType"
            name="identityType"
            required
            className="w-full rounded-md border border-neutral-300 bg-white p-2.5 text-sm text-neutral-800 outline-none focus:border-green-700 focus:ring-1 focus:ring-green-700"
          >
            <option value="aadhar">Aadhaar</option>
            <option value="pan">PAN</option>
            <option value="passport">Passport</option>
            <option value="voter-id">Voter ID</option>
          </select>

          <label className="mt-2 text-sm text-neutral-800">
            Upload Proof of Identity
          </label>
          <ImageUploaderProfile onUploadComplete={setIdentityProof} />

          <label htmlFor="profile-pic" className="mt-2 text-sm text-neutral-800">
            Passport Size Photo
          </label>
          <ImageUploaderProfile onUploadComplete={setProfilePic} />

          <div className="mt-4 space-y-2 rounded-xl border border-green-100 bg-green-50 p-4">
            <p className="text-sm font-semibold text-green-900">
              Member Subscription Fee: ₹100 per month
            </p>

            <p className="text-xs font-normal leading-5 text-neutral-600">
              Important: Membership subscription is not a donation and is not
              eligible for deduction under Section 80G of the Income Tax Act, 1961.
            </p>
          </div>

          {(message || status) && (
            <p
              role="status"
              aria-live="polite"
              className="mt-2 text-center text-sm font-normal text-neutral-600"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 rounded-xl bg-green-800 p-3 font-semibold text-white transition-colors hover:bg-green-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Request to Admin"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs font-normal text-neutral-400">
          Saving Humanity Social Work Organization
        </p>
      </div>
    </div>

  );
};

export default SignupMember;
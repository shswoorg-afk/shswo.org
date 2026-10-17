
import { useEffect, useState } from "react";
import { submitMemberApplication, getMemberApplicationStatus } from "../../serverFunc/member.application";
import ImageUploaderProfile from "./image.uploader.profile";
import BackButton from "../BackButton";
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
    } catch (error) {
      console.error(error);
      setMessage("Unable to submit your application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-blue-800 rounded-lg font-bold flex flex-col justify-center items-center px-6 py-8">
      <div>
        <BackButton to="/" />
      </div>
      <h1 className="text-white text-xl mb-3">
        Sign up as Member
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-blue-300 border border-blue-950 flex flex-col md:max-w-xl w-full mx-auto gap-y-2 p-6 md:p-10 max-h-[80vh] overflow-y-auto rounded-xl"
      >
        <label htmlFor="applicantName">Applicant Name</label>
        <input id="applicantName" name="applicantName" required className="custom-input" placeholder="John Doe" />

        <label htmlFor="fatherName">Father Name</label>
        <input id="fatherName" name="fatherName" required className="custom-input" placeholder="Father's name" />

        <label htmlFor="dob">Date of Birth</label>
        <input id="dob" name="dob" type="date" required className="custom-input" />
        <label htmlFor="joiningdate">Date of Joining</label>
        <input id="joiningdate" name="joiningdate" type="date" required className="custom-input" />
        <label htmlFor="occupation">Occupation</label>
        <input id="occupation" name="occupation" required className="custom-input" placeholder="Eg. Doctor" />

        <label htmlFor="village">Village</label>
        <input id="village" name="village" required className="custom-input" placeholder="Enter your village" />

        <label htmlFor="po">PO</label>
        <input id="po" name="po" required className="custom-input" placeholder="Enter your PO" />

        <label htmlFor="ps">PS</label>
        <input id="ps" name="ps" required className="custom-input" placeholder="Enter your PS" />

        <label htmlFor="district">District</label>
        <input id="district" name="district" required className="custom-input" placeholder="Enter your district" />

        <label htmlFor="pin">PIN</label>
        <input id="pin" name="pin" type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required className="custom-input" placeholder="6-digit PIN" />

        <label htmlFor="state">State</label>
        <input id="state" name="state" required className="custom-input" placeholder="Enter your state" />

        <label htmlFor="mobile">Mobile Number</label>
        <input id="mobile" name="mobile" type="tel" minLength={10} required className="custom-input" placeholder="Enter your phone number" />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={8} maxLength={128} className="custom-input" placeholder="Choose a password" />

        <label htmlFor="identityType">Proof of Identity</label>
        <select id="identityType" name="identityType" required className="border border-black rounded-md p-2">
          <option value="aadhar">Aadhaar</option>
          <option value="pan">PAN</option>
          <option value="passport">Passport</option>
          <option value="voter-id">Voter ID</option>
        </select>
        <label htmlFor="">Upload Proof of Identity</label>
        <ImageUploaderProfile onUploadComplete={setIdentityProof} />
        <label htmlFor="profile-pic">Passport Size Photo</label>
        <ImageUploaderProfile
          onUploadComplete={setProfilePic}
        />
        <p className="text-sm">
          Note → ₹100 Member Subscription Fee Per Month
        </p>
        <p className="text-sm">
          Important note : Membership Subscription is not a donation and is not eligible for deduction under section 80G of the Income Tax Act, 1961.
        </p>
        {(message || status) && (
          <p role="status" aria-live="polite" className="text-sm text-center text-gray-700">
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading
          }
          className="bg-blue-950 text-white rounded-2xl p-2 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Request to Admin"}
        </button>
      </form>
    </div>
  );
};

export default SignupMember;

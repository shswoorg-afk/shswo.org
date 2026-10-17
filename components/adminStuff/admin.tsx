
interface AdminPageProps {
    onLogout: () => Promise<void>;
}

import { useState } from "react";
import { updateMarquee } from "../../serverFunc/updateMarquee"; 
import AdminBannerImages from "./admin.banner.images"; 
import AdminImageSlider from "./admin.slider.images"; 
import ImageUpload from "../image.upload"; 
import VerifySignupUser from "./verify.signup.member";
import VerifySignupAdvisor from "./verify.signup.advisor";
import AllMembersList from "./admin.all.members";
import AddActivites from "./activties.stuff";
import BackButton from "../BackButton";
const AdminPage = ({ onLogout }: AdminPageProps) => {
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        try {
            await updateMarquee({ data: { message } });
            alert("Announcement updated!");
        } catch {
            alert("Failed to update announcement.");
        } finally {
            setSaving(false);
        }
    };
    return (
        <div className="min-h-screen bg-black p-6 text-white font-bold">
            <div>
                <BackButton to="/"/> 
            </div>
            <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
            <div className="mt-2">
                <div>
                    <ImageUpload />
                </div>
                {/* Announcement */}
                <div className="mt-8 max-w-xl space-y-3 admin-border">
                    <label htmlFor="marquee-message">
                        Update upcoming event announcement
                    </label>

                    <textarea
                        id="marquee-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={250}
                        className="w-full rounded-lg bg-neutral-800 p-3 text-white resize-none"
                        placeholder="Enter announcement..."
                    />
                    <button
                        type="button"
                        disabled={saving}
                        onClick={handleSave}
                        className="rounded-lg bg-white px-4 py-2 text-black disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save announcement"}
                    </button>
                </div>
                <div>
                    {/* Activites */}
                    <AddActivites/>
                </div>
                {/* banner image */}
                <div>
                    <AdminBannerImages />
                </div>
                {/* Image slider */}
                <div>
                    <AdminImageSlider />
                </div>
                <div>
                    <VerifySignupUser/>
                </div>
                <div>
                    <VerifySignupAdvisor/>
                </div>
                <div>
                    {/* All members list */}
                    <AllMembersList/>
                </div>
            </div>
            <div className="flex justify-center mt-3">
                <button
                    onClick={onLogout}
                    className="mt-4 rounded-full bg-white px-4 py-2 text-black"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default AdminPage;

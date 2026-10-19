
interface AdminPageProps {
    onLogout: () => Promise<void>;
}

import { useEffect, useState } from "react";
import { deleteAnnouncementById, updateMarquee, getMarquee } from "../../serverFunc/updateMarquee";
import AdminBannerImages from "./admin.banner.images";
import AdminImageSlider from "./admin.slider.images";
import ImageUpload from "../image.upload";
import VerifySignupUser from "./verify.signup.member";
import VerifySignupAdvisor from "./verify.signup.advisor";
import AllMembersList from "./admin.all.members";
import AddActivites from "./activties.stuff";
import BackButton from "../BackButton";
import AdminUpdatePaymentDetaills from "./admin.update.payment.detaills";
type Announcement = {
    _id: string;
    message: string;
};
const AdminPage = ({ onLogout }: AdminPageProps) => {
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [deletingId, setDeletingId] = useState<string | null>(null);
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
    const handleDeleteAnnouncement = async (_id: string) => {
        if (!confirm("Delete this announcement permanently?")) return;

        setDeletingId(_id);

        try {
            const result = await deleteAnnouncementById({
                data: { _id },
            });

            if (result.success) {
                setAnnouncements((prev) =>
                    prev.filter((announcement) => announcement._id !== _id)
                );
            }

            alert(result.message);
        } catch {
            alert("Failed to delete announcement.");
        } finally {
            setDeletingId(null);
        }
    };
    useEffect(() => {
        const loadAnnouncements = async () => {
            try {
                const result = await getMarquee();
                setAnnouncements(result.messages ?? []);
            } catch (error) {
                console.error("Failed to load announcements:", error);
            }
        };

        void loadAnnouncements();
    }, []);
    return (
        <div className="min-h-screen bg-black p-6 text-white font-bold">
            <div>
                <BackButton to="/" />
            </div>
            <h1 className="text-2xl font-bold text-center">Admin Dashboard</h1>
            <div className="mt-2">
                <div>
                    <ImageUpload />
                </div>
                {/* Announcement */}
                {/* Announcements */}
                <div className="mt-8 max-w-xl space-y-4 rounded-xl border border-neutral-700 p-5">
                    <h2 className="text-lg font-semibold">Manage Announcements</h2>

                    <label htmlFor="marquee-message" className="block text-sm text-neutral-300">
                        Add upcoming event announcement
                    </label>

                    <textarea
                        id="marquee-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        maxLength={250}
                        className="w-full resize-none rounded-lg bg-neutral-800 p-3 text-white outline-none focus:ring-2 focus:ring-neutral-500"
                        placeholder="Enter announcement..."
                    />

                    <button
                        type="button"
                        disabled={saving}
                        onClick={handleSave}
                        className="rounded-lg bg-white px-4 py-2 text-black disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Add announcement"}
                    </button>
                        <h3 className="text-sm font-semibold">
                            All Announcements ({announcements.length})
                        </h3>

                    <div className="space-y-3 border-t border-neutral-700 pt-4 max-h-screen min-h-screen overflow-y-auto">

                        {announcements.length === 0 ? (
                            <p className="text-sm text-neutral-400">
                                No announcements yet.
                            </p>
                        ) : (
                            announcements.map((announcement) => (
                                <div
                                    key={announcement._id}
                                    className="flex items-start justify-between gap-4 rounded-lg border border-neutral-700 bg-neutral-900 p-4"
                                >
                                    <p className="min-w-0 flex-1 break-words text-sm font-normal">
                                        {announcement.message}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => handleDeleteAnnouncement(announcement._id)}
                                        disabled={deletingId === announcement._id}
                                        className="shrink-0 rounded-lg bg-red-600 px-3 py-2 text-xs disabled:opacity-50"
                                    >
                                        {deletingId === announcement._id ? "Deleting..." : "Delete"}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <div>
                    {/* Activites */}
                    <AddActivites />
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
                    <AdminUpdatePaymentDetaills />
                </div>
                <div>
                    <VerifySignupUser />
                </div>
                <div>
                    <VerifySignupAdvisor />
                </div>
                <div>
                    {/* All members list */}
                    <AllMembersList />
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

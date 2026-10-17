import { useEffect, useState } from "react";
import { addActivity, deleteActivity, getActivites } from "../../serverFunc/activites.crud";
import ActivityImageUploader from "../activity.image.uploader";
type Activity = {
    _id: string;
    activityTitle?: string;
    activityContent?: string;
    activityImageUrl? : string,
    activityImageFileId? : string,
};

export default function AddActivites() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [activityImage, setActivityImage] = useState<{
        url: string;
        fileId: string;
    } | null>(null);
    async function loadActivities() {
        try {
            setLoading(true);
            const result = await getActivites();
            setActivities(result);
        } catch {
            setError("Failed to load activities.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void loadActivities();
    }, []);

    async function handleAddActivity(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");

        if (!title.trim() || !content.trim()) {
            setError("Please enter both a title and activity text.");
            return;
        }

        try {
            setSaving(true);

            const result = await addActivity({
                data: {
                    activityTitle: title.trim(),
                    activityContent: content.trim(),
                    activityImageFileId : String(activityImage?.fileId),
                    activityImageUrl : String(activityImage?.url),
                },
            });

            setActivities((previous) => [
                result.activity,
                ...previous,
            ]);

            setTitle("");
            setContent("");
        } catch {
            setError("Failed to add activity. Please try again.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDeleteActivity(id: string) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this activity?"
        );

        if (!confirmed) return;

        setError("");

        try {
            setDeletingId(id);

            await deleteActivity({ data: { id } });

            setActivities((previous) =>
                previous.filter((activity) => activity._id !== id)
            );
        } catch {
            setError("Failed to delete activity.");
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <main className="mx-auto max-w-4xl space-y-8 p-4 sm:p-6 mt-5 bg-white text-black">
            <header>
                <h1 className="text-2xl font-bold ">
                    Manage Activities
                </h1>
                <p className="mt-1 text-sm text-slate-500">
                    Add and manage SHSWO activities.
                </p>
            </header>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    Add New Activity
                </h2>

                <form onSubmit={handleAddActivity} className="mt-5 space-y-4">
                    <div>
                        <label
                            htmlFor="activityTitle"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Activity Title
                        </label>
                        <input
                            id="activityTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Write title here"
                            maxLength={150}
                            required
                            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="activityContent"
                            className="mb-2 block text-sm font-medium text-slate-700"
                        >
                            Activity Text
                        </label>
                        <textarea
                            id="activityContent"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write activity details here"
                            rows={5}
                            maxLength={5000}
                            required
                            className="w-full resize-y rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    {error && (
                        <p role="alert" className="text-sm text-red-600">
                            {error}
                        </p>
                    )}
                    <ActivityImageUploader onUpload={setActivityImage} />
                    <button
                        type="submit"
                        disabled={saving}
                        className="rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {saving ? "Adding..." : "Add Activity"}
                    </button>
                </form>
            </section>

            <section>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">
                        Added Activities
                    </h2>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                        {activities.length} total
                    </span>
                </div>

                {loading ? (
                    <p className="py-8 text-center text-sm text-slate-500">
                        Loading activities...
                    </p>
                ) : activities.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                        <p className="font-medium text-slate-700">
                            No activities yet
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                            Add your first activity using the form above.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {activities.map((activity) => (
                            <article
                                key={activity._id}
                                className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-start sm:justify-between sm:p-5"
                            >
                                <div className="min-w-0 flex-1">
                                    <h3 className="wrap-break-word font-semibold text-slate-900">
                                        {activity.activityTitle}
                                    </h3>
                                    <p className="mt-2 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-slate-600">
                                        {activity.activityContent}
                                    </p>
                                    <div>
                                        {activity.activityImageUrl && <div>
                                            <img src={activity.activityImageUrl} alt={activity.activityImageFileId} />
                                            </div>}
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => handleDeleteActivity(activity._id)}
                                    disabled={deletingId === activity._id}
                                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                >
                                    {deletingId === activity._id
                                        ? "Deleting..."
                                        : "Delete"}
                                </button>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
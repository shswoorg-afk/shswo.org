import { useEffect, useState } from "react";
import { getMediaByType, deleteMediaById, deleteMediaByType } from "../../serverFunc/media.function";
type SliderImage = {
    _id: string;
    fileId: string;
    fileName: string;
    url: string;
    type: string;
    sliderTitle?: string;
    sliderText?: string;
    createdAt: string;
    updatedAt: string;
};

const AdminImageSlider = () => {
    const [sliders, setSliders] = useState<SliderImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [deletingAll, setDeletingAll] = useState(false);
    const fetchSliders = async () => {
        try {
            setError(null);

            const result = await getMediaByType({
                data: { type: "image-slider" },
            });

            setSliders(result as any);
        } catch (error) {
            console.error("Failed to fetch slider images:", error);
            setError("Failed to load slider images.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchSliders();
    }, []);
    const handleDeleteAll = async () => {
        if (sliders.length === 0 || deletingId || deletingAll) return;

        const confirmed = window.confirm(
            `Permanently delete all ${sliders.length} slider images from ImageKit and the database?`,
        );

        if (!confirmed) return;

        try {
            setDeletingAll(true);
            setError(null);

            const result = await deleteMediaByType({
                data: { type: "image-slider" },
            });

            // Refresh the list to reflect successful and failed deletions.
            await fetchSliders();

            if (!result.success) {
                setError(
                    `${result.deletedCount} images deleted; ${result.failedCount} failed. You can retry the remaining images.`,
                );
            }
        } catch (error) {
            console.error("Failed to delete slider images:", error);
            setError("Failed to delete all slider images. Please try again.");
        } finally {
            setDeletingAll(false);
        }
    };
    const handleDeleteOne = async (id: string) => {
        if (deletingId) return;

        const confirmed = window.confirm(
            "Permanently delete this slider image?",
        );

        if (!confirmed) return;

        try {
            setDeletingId(id);
            setError(null);

            await deleteMediaById({
                data: {
                    id,
                    type : "image-slider"
                },
            });

            setSliders((current) =>
                current.filter((slider) => slider._id !== id),
            );
        } catch (error) {
            console.error("Failed to delete slider image:", error);
            setError("Failed to delete the slider image. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    if (loading) {
        return (
            <div className="grid min-h-48 place-items-center text-sm text-gray-500">
                Loading slider images...
            </div>
        );
    }

    return (
        <section className="space-y-6 p-4 sm:p-6 admin-border">
            <header className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Events Image Slider
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Manage the images displayed in your website slider.
                    </p>
                </div>

                <div className="flex gap-x-3">
                    <span className="rounded-full border px-3 py-1.5 text-sm">
                        {sliders.length} {sliders.length === 1 ? "image" : "images"}
                    </span>
                    <button
                        type="button"
                        onClick={() => handleDeleteAll()}
                        disabled={sliders.length === 0 || deletingId !== null || deletingAll}
                        className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                    >
                        {deletingAll ? "Deleting...All" : "Delete All"}
                    </button>
                </div>


            </header>

            {error && (
                <p
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                    {error}
                </p>
            )}

            {sliders.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center">
                    <h2 className="font-medium">No slider images found</h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Uploaded events slider images will appear here.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {sliders.map((slider) => (
                        <article
                            key={slider._id}
                            className="overflow-hidden rounded-xl border bg-white"
                        >
                            <div className="relative aspect-video overflow-hidden bg-gray-100">
                                <img
                                    src={slider.url}
                                    alt={slider.sliderTitle || slider.fileName}
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                />

                                <span className="absolute left-3 top-3 rounded-md bg-black/70 px-2 py-1 text-xs text-white">
                                    Events Slider image
                                </span>
                            </div>

                            <div className="space-y-3 p-4">
                                <div>
                                    <h2 className="font-semibold">
                                        {slider.sliderTitle || "Untitled slide"}
                                    </h2>

                                    <p className="mt-1 line-clamp-3 text-sm text-gray-500">
                                        {slider.sliderText || "No description provided."}
                                    </p>
                                </div>

                                <p
                                    className="truncate text-xs text-gray-400"
                                    title={slider.fileName}
                                >
                                    {slider.fileName}
                                </p>

                                <div className="flex items-center justify-between gap-3 border-t pt-3">
                                    <span className="text-xs text-gray-500">
                                        {new Date(slider.createdAt).toLocaleDateString()}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={() => void handleDeleteOne(slider._id)}
                                        disabled={deletingId !== null}
                                        className="rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {deletingId === slider._id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
};

export default AdminImageSlider;
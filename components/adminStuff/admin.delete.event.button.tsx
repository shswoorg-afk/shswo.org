import { useState } from "react";
import { deleteMediaById } from "../../serverFunc/media.function"; 

type Props = {
    id: string;
    title?: string;
    onDeleted?: (id: string) => void;
};

export default function AdminDeleteEvent({
    id,
    title = "this event",
    onDeleted,
}: Props) {
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    async function handleDelete() {
        if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        try {
            setDeleting(true);
            setError("");

            await deleteMediaById({
                data: {
                    id,
                    type: "image-slider",
                },
            });

            onDeleted?.(id);
        } catch {
            setError("Failed to delete event. Please try again.");
        } finally {
            setDeleting(false);
        }
    }

    return (
        <div>
            <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {deleting ? "Deleting..." : "Delete event"}
            </button>

            {error && (
                <p role="alert" className="mt-2 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}
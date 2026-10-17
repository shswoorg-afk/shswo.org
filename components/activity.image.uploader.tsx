import { useState } from "react";
import { upload } from "@imagekit/react";
import { getImageKitAuth } from "../lib/imagekit.function";

type Props = {
    onUpload: (image: { url: string; fileId: string } | null) => void;
};

export default function ActivityImageUploader({ onUpload }: Props) {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState("");
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    function handleFileChange(selected: File | null) {
        setError("");
        onUpload(null);
        setPreview("");
        setProgress(0);

        if (!selected) {
            setFile(null);
            return;
        }

        if (!["image/jpeg", "image/png", "image/webp"].includes(selected.type)) {
            setError("Choose a JPG, PNG, or WebP image.");
            setFile(null);
            return;
        }

        if (selected.size > 5 * 1024 * 1024) {
            setError("Image must be smaller than 5 MB.");
            setFile(null);
            return;
        }

        setFile(selected);
        setPreview(URL.createObjectURL(selected));
    }

    async function handleUpload() {
        if (!file || uploading) return;

        try {
            setUploading(true);
            setError("");

            const auth = await getImageKitAuth();

            const result = await upload({
                file,
                fileName: `activity-${Date.now()}-${file.name}`,
                token: auth.token,
                expire: auth.expire,
                signature: auth.signature,
                publicKey: auth.publicKey,
                onProgress: (event) => {
                    if (event.total) {
                        setProgress(
                            Math.round((event.loaded / event.total) * 100)
                        );
                    }
                },
            });

            onUpload({
                url: result.url as string,
                fileId: result.fileId as string,
            });
        } catch (err) {
            console.error(err);
            setError("Upload failed. Please try again.");
        } finally {
            setUploading(false);
        }
    }

    function removeImage() {
        setFile(null);
        setPreview("");
        setProgress(0);
        setError("");
        onUpload(null);
    }

    return (
        <div className="space-y-3">
            <label
                htmlFor="activity-image"
                className="block text-sm font-medium text-slate-700"
            >
                Activity Image
            </label>

            <input
                id="activity-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={(event) =>
                    handleFileChange(event.target.files?.[0] ?? null)
                }
                disabled={uploading}
                className="block w-full rounded-lg border border-slate-300 p-3 text-sm"
            />

            {preview && (
                <img
                    src={preview}
                    alt="Selected activity preview"
                    className="max-h-64 rounded-xl border object-cover"
                />
            )}

            {uploading && (
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {error && (
                <p role="alert" className="text-sm text-red-600">
                    {error}
                </p>
            )}

            <div className="flex flex-wrap gap-2">
                {file && (
                    <button
                        type="button"
                        onClick={handleUpload}
                        disabled={uploading}
                        className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
                    >
                        {uploading ? `Uploading ${progress}%` : "Upload Image"}
                    </button>
                )}

                {file && (
                    <button
                        type="button"
                        onClick={removeImage}
                        disabled={uploading}
                        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 disabled:opacity-50"
                    >
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
}
import { useRef, useState } from "react";
import { upload } from "@imagekit/react";
import { MdImage } from "react-icons/md";

import { getImageKitAuth } from "../lib/imagekit.function";
import { saveOrganizationId } from "../serverFunc/admin.save.organization.id";

type Props = {
    applicationId: string;
    collection: "member" | "advisor";
    imageUrl?: string;
};

export default function OrganizationIdUploader({
    applicationId,
    collection,
    imageUrl,
}: Props) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [image, setImage] = useState<string | null>(imageUrl ?? null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

    async function handleUpload(
        event: React.ChangeEvent<HTMLInputElement>,
    ) {
        const input = event.currentTarget;
        const file = input.files?.[0];

        if (!file) return;

        setError("");

        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            setError("Only JPG, PNG, and WebP images are allowed.");
            input.value = "";
            return;
        }

        if (file.size === 0 || file.size > 5 * 1024 * 1024) {
            setError("Image must be smaller than 5 MB.");
            input.value = "";
            return;
        }

        setUploading(true);

        try {
            const auth = await getImageKitAuth();

            const result = await upload({
                file,
                fileName: `organization-id-${collection}-${applicationId}-${crypto.randomUUID()}-${file.name}`,
                token: auth.token,
                expire: auth.expire,
                signature: auth.signature,
                publicKey: auth.publicKey,
            });

            if (!result.url || !result.fileId) {
                throw new Error("ImageKit did not return the image details.");
            }

            await saveOrganizationId({
                data: {
                    applicationId,
                    collection,
                    url: result.url,
                    fileId: result.fileId,
                }
            });

            setImage(result.url);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Image upload failed.",
            );
        } finally {
            setUploading(false);
            input.value = "";
        }
    }

    return (
        <div className="space-y-3">
            {image && (
                <img
                    src={image}
                    alt="Organization ID"
                    className="h-32 w-48 rounded-lg border object-contain"
                />
            )}

            <input
                ref={inputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleUpload}
                disabled={uploading}
                className="hidden"
            />

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="inline-flex items-center gap-2 rounded-full font-bold
                 text-xs border py-1 px-2  md:px-4  disabled:opacity-50"
            >
                <MdImage size={20} />
                {uploading
                    ? "Uploading..."
                    : image
                        ? "Change ID Image"
                        : "Upload ID Image"}
            </button>

            {image && (
                <a
                    href={image}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm underline underline-offset-4"
                >
                    View full image
                </a>
            )}

            {error && (
                <p role="alert" className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}

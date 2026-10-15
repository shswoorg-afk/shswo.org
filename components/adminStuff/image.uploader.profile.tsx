
import { useRef, useState } from "react";
import { upload } from "@imagekit/react";
import { MdImage } from "react-icons/md";

import { getImageKitAuth } from "../../lib/imagekit.function";

type Props = {
  onUploadComplete: (image: { url: string; fileId: string }) => void;
};

export default function ImageUploaderProfile({
  onUploadComplete,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<{
    url: string;
    fileId: string;
  } | null>(null);

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
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
        fileName: `profile-${crypto.randomUUID()}-${file.name}`,
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        publicKey: auth.publicKey,
      });

      if (!result.url || !result.fileId) {
        throw new Error("ImageKit did not return the image details.");
      }

      const uploaded = {
        url: result.url,
        fileId: result.fileId,
      };

      setImage(uploaded);
      onUploadComplete(uploaded);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Image upload failed."
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
          src={image.url}
          alt="Profile preview"
          className="h-40 w-40 rounded-xl border object-cover"
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
        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 disabled:opacity-50"
      >
        <MdImage size={20} />
        {uploading
          ? "Uploading..."
          : image
            ? "Change Picture"
            : "Upload Picture"}
      </button>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

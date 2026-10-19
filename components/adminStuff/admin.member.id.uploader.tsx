import { useState } from "react";
import { updateMemberId } from "../../serverFunc/admin.update.member.id";

type AdminIdUploaderProps = {
    _id: string;
    memberId?: string;
};

export default function AdminIdUploader({
    _id,
    memberId = "",
}: AdminIdUploaderProps) {
    const [value, setValue] = useState(memberId);
    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        if (!value.trim()) {
            alert("Please enter a Member ID.");
            return;
        }

        try {
            setLoading(true);

            const result = await updateMemberId({
                data: {
                    _id: _id,
                    memberId: value.trim(),
                },
            });

            alert(result.message);
        } catch (error) {
            console.error(error);
            alert("Failed to update Member ID.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-w-40 space-y-2">
              {memberId ? (
                <p className="text-xs font-medium text-green-700">
                   Member ID : {memberId}
                </p>
            ) : (
                <p className="text-xs text-neutral-500">
                    Didn't add Member ID yet.
                </p>
            )}
            <input
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Enter Member ID"
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm outline-none focus:border-green-600"
            />

            <button
                type="button"
                onClick={handleUpdate}
                disabled={loading || !value.trim()}
                className="rounded-full bg-green-700 px-3 py-2 text-sm font-medium text-white
                 hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Updating..." : "Update"}
            </button>
        </div>
    );
}

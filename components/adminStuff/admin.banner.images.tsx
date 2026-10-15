import { useEffect, useState } from "react";
import { getMediaByType, deleteMediaByType, deleteMediaById } from "../../serverFunc/media.function";
type BannerImage = {
  _id: string;
  fileId: string;
  fileName: string;
  url: string;
  type: string;
  createdAt: string;
  updatedAt: string;
};

const AdminBannerImages = () => {
  const [banners, setBanners] = useState<BannerImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchBanners = async () => {
    try {
      setError(null);

      const result = await getMediaByType({
        data: { type: "banner" },
      });

      setBanners(result);
    } catch (error) {
      console.error("Failed to fetch banners:", error);
      setError("Failed to load banner images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchBanners();
  }, []);
  const handleDeleteOne = async (id: string) => {
    if (deletingId) return;

    if (!window.confirm("Permanently delete this banner image?")) return;

    try {
      setDeletingId(id);
      setError(null);

      await deleteMediaById({ data: { id } });

      setBanners((current) =>
        current.filter((banner) => banner._id !== id),
      );
    } catch (error) {
      console.error("Failed to delete banner:", error);
      setError("Failed to delete banner image.");
    } finally {
      setDeletingId(null);
    }
  };
  const handleDeleteAll = async () => {
    if (banners.length === 0 || deleting) return;

    const confirmed = window.confirm(
      `Permanently delete all ${banners.length} banner images?`,
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError(null);

      const result = await deleteMediaByType({
        data: { type: "banner" },
      });

      await fetchBanners();

      if (!result.success) {
        setError(
          `${result.failedCount} image(s) could not be deleted. You can retry.`,
        );
      }
    } catch (error) {
      console.error("Failed to delete banners:", error);
      setError("Failed to delete banner images.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <p className="p-6">Loading banner images...</p>;
  }

  return (
    <section className="space-y-6 p-6 admin-border mt-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Banner Images</h1>
          <p className="text-sm text-gray-500">
            {banners.length} image(s)
          </p>
        </div>
        <button
          type="button"
          onClick={handleDeleteAll}
          disabled={banners.length === 0 || deleting}
          className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete All"}
        </button>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {banners.length === 0 ? (
        <p className="rounded-lg border border-dashed p-8 text-center text-gray-500">
          No banner images found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {banners.map((banner) => (
            <article key={banner._id} className="overflow-hidden rounded-xl border">
              <img
                src={banner.url}
                alt={banner.fileName}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />

              <p className="truncate p-3 text-sm" title={banner.fileName}>
                {banner.fileName}
              </p>
              <div className="p-2">
                <button
                  type="button"
                  onClick={() => handleDeleteOne(banner._id)}
                  disabled={banners.length === 0 || deleting}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-50"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default AdminBannerImages;
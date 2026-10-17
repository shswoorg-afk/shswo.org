import { useEffect, useState } from "react";
import { getMediaByType } from "../serverFunc/media.function";

type GalleryImage = {
  _id: string;
  fileName: string;
  url: string;
  createdAt: string;
};

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        const result = await getMediaByType({
          data: { type: "gallery" },
        });

        setImages(result as GalleryImage[]);
      } catch (error) {
        console.error("Failed to load gallery:", error);
      } finally {
        setLoading(false);
      }
    }

    loadGallery();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-700">
          Our Moments
        </p>

        <h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Photo Gallery
        </h2>

        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Explore moments from our activities, community programmes, and
          journey of serving humanity.
        </p>
      </div>

      {loading ? (
        <div className="columns-2 gap-3 sm:columns-3 sm:gap-5 lg:columns-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="mb-3 aspect-square animate-pulse break-inside-avoid rounded-xl bg-slate-100 sm:mb-5"
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-300 px-5 py-14 text-center">
          <h3 className="text-lg font-semibold text-slate-800">
            No photos yet
          </h3>
          <p className="mt-2 text-sm text-slate-500">
            Photos from our programmes and activities will appear here.
          </p>
        </div>
      ) : (
        <div className="columns-2 gap-3 sm:columns-3 sm:gap-5 lg:columns-4">
          {images.map((image) => (
            <button
              key={image._id}
              type="button"
              onClick={() => setSelectedImage(image)}
              aria-label={`View ${image.fileName}`}
              className="group mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-slate-100 sm:mb-5 sm:rounded-2xl"
            >
              <img
                src={image.url}
                alt={image.fileName || "SHSWO gallery photo"}
                loading="lazy"
                className="h-auto w-full transition duration-300 group-hover:scale-105"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image preview */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            type="button"
            aria-label="Close image preview"
            onClick={() => setSelectedImage(null)}
            className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-3xl text-white hover:bg-white/25"
          >
            ×
          </button>

          <img
            src={selectedImage.url}
            alt={selectedImage.fileName || "SHSWO gallery photo"}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
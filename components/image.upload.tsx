import { useRef, useState } from 'react'
import { upload } from '@imagekit/react'
import { MdImage } from 'react-icons/md'

import { getImageKitAuth } from '../lib/imagekit.function'
import { createMedia } from '../serverFunc/media.function'

const imageTypes = [
  { label: 'Banner', value: 'banner' },
  { label: 'Events Slider', value: 'image-slider' },
  { label: 'Gallery', value: 'gallery' },
] as const

export type ImageType = (typeof imageTypes)[number]['value']

const MAX_FILE_SIZE = 5 * 1024 * 1024

const ALLOWED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
]

export default function ImageUpload() {
  const inputRef = useRef<HTMLInputElement>(null)

  const [progress, setProgress] = useState(0)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [type, setType] = useState<ImageType>('banner')

  const [sliderTitle, setSliderTitle] = useState('')
  const [sliderText, setSliderText] = useState('')
      let imageUploaded = false
    const MAX_IMAGE_MP = 24;
    const MAX_IMAGE_PIXELS = MAX_IMAGE_MP * 1_000_000;
  const validateImageResolution = (file: File): Promise<string | null> => {
    return new Promise((resolve) => {
      const image = new Image();
      const objectUrl = URL.createObjectURL(file);

      image.onload = () => {
        const pixels = image.naturalWidth * image.naturalHeight;
        const megapixels = pixels / 1_000_000;

        URL.revokeObjectURL(objectUrl);

        if (pixels > MAX_IMAGE_PIXELS) {
          resolve(
            `Image resolution is ${megapixels.toFixed(2)} MP. ` +
            `Maximum allowed is ${MAX_IMAGE_MP} MP. ` +
            `Please resize the image before uploading.`
          );
          return;
        }

        resolve(null);
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        resolve("Unable to read this image. Please select a valid image file.");
      };

      image.src = objectUrl;
    });
  };
  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const input = event.currentTarget
    const file = input.files?.[0]

    if (!file) return

    setError('')
    setSuccess('')
    setProgress(0)

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Only JPG, PNG, and WebP images are allowed.')
      input.value = ''
      return
    }

    if (file.size === 0) {
      setError('The selected file is empty.')
      input.value = ''
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('Maximum image size is 5 MB.')
      input.value = ''
      return
    }

    if (
      type === 'image-slider' &&
      (!sliderTitle.trim() || !sliderText.trim())
    ) {
      setError('Please enter both the slider title and text.')
      input.value = ''
      return
    }

    setUploading(true)
    try {
      const auth = await getImageKitAuth()
      const resolutionError = await validateImageResolution(file);
      if (resolutionError) {
        setError(resolutionError);
        return;
      }
      const result = await upload({
        file,
        fileName: file.name,
        token: auth.token,
        expire: auth.expire,
        signature: auth.signature,
        publicKey: auth.publicKey,
        onProgress: ({ loaded, total }) => {
          if (total > 0) {
            setProgress(
              Math.min(99, Math.round((loaded / total) * 100)),
            )
          }
        },
      })

      imageUploaded = true
      setProgress(100)
      setSaving(true)
      const mediaData = {
        fileId: result.fileId as string,
        fileName: file.name,
        url: result.url as string,
        type,
        ...(type === 'image-slider'
          ? {
            sliderTitle: sliderTitle.trim(),
            sliderText: sliderText.trim(),
          }
          : {}),
      }
      console.log('Sending media data:', mediaData)
      await createMedia({
        data: mediaData,
      })
      setSuccess(
        type === 'gallery'
          ? 'Gallery image uploaded and saved successfully.'
          : type === 'image-slider'
            ? 'Event slider image uploaded and saved successfully.'
            : 'Banner image uploaded and saved successfully.',
      )

      if (type === 'image-slider') {
        setSliderTitle('')
        setSliderText('')
      }
    } catch (err) {
      console.error('Image upload error:', err)

      if (imageUploaded) {
        setError(
          'Image uploaded to ImageKit, but saving its record to MongoDB failed. Please check your media records before retrying.',
        )
      } else {
        setError(
          err instanceof Error
            ? err.message
            : 'Image upload failed. Please try again.',
        )
      }
    } finally {
      setUploading(false)
      setSaving(false)
      input.value = ''
    }
  }

  const busy = uploading || saving

  return (
    <div className="space-y-4 admin-border">
      <div className="space-y-1">
        <label
          htmlFor="image-type"
          className="text-sm font-medium"
        >
          Image type
        </label>

        <select
          id="image-type"
          value={type}
          onChange={(event) => {
            setType(event.target.value as ImageType)
            setError('')
            setSuccess('')
          }}
          disabled={busy}
          className="w-full rounded-lg border border-neutral-300 bg-white p-2 text-black disabled:opacity-50"
        >
          {imageTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>

      {type === 'image-slider' && (
        <div className="space-y-3 rounded-xl border border-neutral-200 p-4 text-white">
          <div className="space-y-1">
            <label
              htmlFor="slider-title"
              className="text-sm font-medium"
            >
              Event Slider Title
            </label>

            <input
              id="slider-title"
              type="text"
              value={sliderTitle}
              onChange={(event) =>
                setSliderTitle(event.target.value)
              }
              placeholder="Enter event slider title"
              maxLength={100}
              disabled={busy}
              className="w-full rounded-lg border border-neutral-300 p-2 disabled:opacity-50"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="slider-text"
              className="text-sm font-medium"
            >
              Event  Slider Text
            </label>

            <textarea
              id="slider-text"
              value={sliderText}
              onChange={(event) =>
                setSliderText(event.target.value)
              }
              placeholder="Enter event slider description"
              maxLength={500}
              rows={3}
              disabled={busy}
              className="w-full resize-y rounded-lg border border-neutral-300 p-2  disabled:opacity-50"
            />
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        name="file-upload"
        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
        onChange={handleUpload}
        disabled={busy}
        className="hidden"
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-neutral-400 bg-white px-4 py-2 font-bold text-black transition-colors hover:bg-neutral-100 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <MdImage size={20} aria-hidden="true" />
        {uploading
          ? 'Uploading...'
          : saving
            ? 'Saving...'
            : 'Upload Image'}
      </button>

      {busy && (
        <div className="space-y-1">
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-neutral-200"
            role="progressbar"
            aria-label="Image upload progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              className="h-full rounded-full bg-black transition-[width] duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-sm text-neutral-500" role="status">
            {saving
              ? 'Saving image details...'
              : `Uploading: ${progress}%`}
          </p>
        </div>
      )}

      {error && (
        <p role="alert" className="text-sm text-red-600">
          {error}
        </p>
      )}

      {success && (
        <p role="status" className="text-sm text-green-700">
          {success}
        </p>
      )}
    </div>
  )
}
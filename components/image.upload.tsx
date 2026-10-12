import { useRef, useState } from 'react'
import { upload } from '@imagekit/react'
import { MdImage } from 'react-icons/md'

import { getImageKitAuth } from '../lib/imagekit.function'
import { createMedia } from '../lib/media.function'

const imageTypes = [
  { label: 'Banner', value: 'banner' },
  { label: 'Image Slider', value: 'image-slider' },
  { label: 'Activity', value: 'activity' },
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

    setUploading(true)

    let imageUploaded = false

    try {
      const auth = await getImageKitAuth()

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

      await createMedia({
        data: {
          fileId: result.fileId as string,
          fileName: file.name,
          url: result.url as string,
          type,
        },
      })

      setSuccess('Image uploaded and saved successfully.')
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
    <div className="space-y-4">
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
          onChange={(event) =>
            setType(event.target.value as ImageType)
          }
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
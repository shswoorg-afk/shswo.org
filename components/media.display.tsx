import { useEffect, useState } from 'react'
import { getMediaByType } from '../serverFunc/media.function'
import type { MediaItem, MediaType } from '../types/media.types'
import Carousel from './carousel'
import ImageSlider from './events.slider'
interface MediaDisplayProps {
  type: MediaType
  className?: string
}

export default function DisplayMedia({
  type,
  className = '',
}: MediaDisplayProps) {
  const [media, setMedia] = useState<MediaItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function fetchMedia() {
      setLoading(true)
      setError('')

      try {
        const result = await getMediaByType({
          data: { type },
        })

        if (!cancelled) {
          setMedia(result as any)
        }
      } catch {
        if (!cancelled) {
          setError('Failed to load images. Please try again.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void fetchMedia()

    return () => {
      cancelled = true
    }
  }, [type])

  if (loading) {
    return <p className="text-sm text-neutral-500">Loading images...</p>
  }

  if (error) {
    return (
      <p role="alert" className="text-sm text-red-600">
        {error}
      </p>
    )
  }

  if (media.length === 0) {
    return (
      <p className="text-xl text-neutral-800 text-center font-bold py-3">
        No images found for {type}.
      </p>
    )
  }

  if (type === 'banner') {
    return <Carousel images={media.map((item) => item.url)} />
  }

  if (type === 'image-slider') {
    return <ImageSlider images={media} />
  }

  return (
    <div
      className={`grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {media.map((item) => (
        <img
          key={item._id}
          src={item.url}
          alt={item.fileName}
          loading="lazy"
          className="h-fit w-full rounded-xl"
        />
      ))}
    </div>
  )
}

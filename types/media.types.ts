export const MEDIA_TYPES = [
  'banner',
  'image-slider',
  'activity',
  'gallery',
] as const

export type MediaType = (typeof MEDIA_TYPES)[number]

export interface MediaItem {
  _id: string
  fileId: string
  fileName: string
  url: string
  type: MediaType
  createdAt: string
  updatedAt: string
}
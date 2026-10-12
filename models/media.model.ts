import mongoose, { Schema, type InferSchemaType } from 'mongoose'
import { MEDIA_TYPES } from '../types/media.types'
const MediaSchema = new Schema(
  {
    fileId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    url: {
      type: String,
      required: true,
      trim: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: MEDIA_TYPES,
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
)

export type Media = InferSchemaType<typeof MediaSchema>

const MediaModel =
  mongoose.models.Media ||
  mongoose.model('Media', MediaSchema)

export default MediaModel
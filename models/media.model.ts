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
    sliderTitle : {
    type : String,
    required : false,
    trim : true,
    },
    sliderText : {
      type : String,
      required : false,
      trim : true,
    }
  },
  {
    timestamps: true,
  },
)

export type Media = InferSchemaType<typeof MediaSchema>

const MediaModel =  mongoose.model('Media', MediaSchema)

export default MediaModel
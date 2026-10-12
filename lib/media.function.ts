import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { connectDb } from './connectDb'// Your existing DB connector
import MediaModel from '../models/media.model' // Your Media model
import { MEDIA_TYPES } from '../types/media.types';
const MediaTypeSchema = z.enum(MEDIA_TYPES);
const CreateMediaSchema = z.object({
    fileId: z.string().min(1),
    url: z.url(),
    fileName: z.string().min(1).max(255),
    type: MediaTypeSchema,
})
export const createMedia = createServerFn({ method: 'POST' })
    .validator(CreateMediaSchema)
    .handler(async ({ data }) => {
        // Verify the current admin session here before production use.
        await connectDb()
        const media = await MediaModel.create(data)

        return {
            success: true,
            id: media._id.toString(),
        }
    })

export const getMedia = createServerFn({ method: "GET" }).validator(
    z.object({
        type: MediaTypeSchema
    }
    )).handler(
        async ({ data }) => {
            await connectDb();
            const media = await MediaModel.find({ type: data.type }).sort({ createdAt: -1 }).lean();
            return media.map((item) => ({
                _id: item._id.toString(),
                fileId: item.fileId,
                fileName: item.fileName,
                url: item.url,
                type: item.type,
                createdAt: item.createdAt.toISOString(),
                updatedAt: item.updatedAt.toISOString(),
            }));
        }
    );
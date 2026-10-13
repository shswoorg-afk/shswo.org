import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { connectDb } from '../lib/connectDb'// Your existing DB connector
import MediaModel from '../models/media.model' // Your Media model
import { MEDIA_TYPES } from '../types/media.types';
import verifyAdminSession from "../lib/verifyAdminSession";
import { imageKit } from '../lib/imagekit.function';
const MediaTypeSchema = z.enum(MEDIA_TYPES);
const CreateMediaSchema = z.object({
    fileId: z.string().min(1),
    url: z.url(),
    fileName: z.string().min(1).max(255),
    type: MediaTypeSchema,
    sliderTitle: z.string().optional(),
    sliderText: z.string().optional(),
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

export const getMediaByType = createServerFn({ method: "GET" }).validator(
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
                sliderTitle : item.sliderTitle,
                sliderText : item.sliderText,
                createdAt: item.createdAt.toISOString(),
                updatedAt: item.updatedAt.toISOString(),
            }));
        }
    );

export const deleteMediaByType = createServerFn({ method: "POST" })
  .validator(
    z.object({
      type: MediaTypeSchema,
    }),
  )
  .handler(async ({ data }) => {
    // Only admins can delete media.
    const session = await verifyAdminSession();

    if (!session.authenticated) {
      throw new Error("Unauthorized");
    }

    await connectDb();

    // Find all media of the requested type.
    const media = await MediaModel.find({ type: data.type })
      .select("_id fileId")
      .lean();

    if (media.length === 0) {
      return {
        success: true,
        deletedCount: 0,
        message: "No media found for this type.",
      };
    }

    // Delete the remote ImageKit files first.
    const results = await Promise.allSettled(
      media.map((item) => imageKit.files.delete(item.fileId)),
    );

    const failed = results
      .map((result, index) => ({ result, item: media[index] }))
      .filter(({ result }) => result.status === "rejected");

    // Keep MongoDB records for files that failed to delete remotely.
    const successfullyDeletedIds = results
      .map((result, index) =>
        result.status === "fulfilled" ? media[index]._id : null,
      )
      .filter((id) => id !== null);

    if (successfullyDeletedIds.length > 0) {
      await MediaModel.deleteMany({
        _id: { $in: successfullyDeletedIds },
        type: data.type,
      });
    }

    return {
      success: failed.length === 0,
      deletedCount: successfullyDeletedIds.length,
      failedCount: failed.length,
      message:
        failed.length === 0
          ? "All media of this type deleted successfully."
          : "Some ImageKit files could not be deleted. Their database records were preserved.",
    };
  });

  export const deleteMediaById = createServerFn({ method: "POST" })
  .validator(
    z.object({
      id: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const session = await verifyAdminSession();

    if (!session.authenticated) {
      throw new Error("Unauthorized");
    }

    await connectDb();

    const media = await MediaModel.findOne({
      _id: data.id,
      type: "banner",
    });

    if (!media) {
      throw new Error("Banner image not found");
    }

    // Delete remote ImageKit file first.
    await imageKit.files.delete(media.fileId);

    // Delete only this banner's database record.
    await MediaModel.deleteOne({
      _id: media._id,
      type: "banner",
    });

    return { success: true, id: media._id.toString() };
  });
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { connectDb } from "../lib/connectDb";
import { ActivityModel } from "../models/activities.model";
const activitySchema = z.object({
    activityTitle: z.string().trim().min(1, "Title is required"),
    activityContent: z.string().trim().min(1, "Activity text is required"),
    activityImageUrl : z.url(),
    activityImageFileId : z.string().min(1),
}
);

export const addActivity = createServerFn({
    method: "POST",
})
    .validator(activitySchema)
    .handler(async ({ data }) => {
        await connectDb();

        const activity = await ActivityModel.create({
            activityTitle: data.activityTitle,
            activityContent: data.activityContent,
            activityImageUrl : data.activityImageUrl,
            activityImageFileId : data.activityImageFileId,
        });

        return {
            success: true,
            activity: {
                _id: activity._id.toString(),
                activityTitle: activity.activityTitle,
                activityContent: activity.activityContent,
                activityImageUrl : activity.activityImageUrl,
                activityImageFileId : activity.activityImageFileId,
            },
        };
    });
export const getActivites = createServerFn({
    method: "GET",
}).handler(async () => {
    await connectDb();

    const activities = await ActivityModel.find()
        .sort({ _id: -1 })
        .lean();

    return activities.map((activity) => ({
        _id: activity._id.toString(),
        activityTitle: activity.activityTitle ?? "",
        activityContent: activity.activityContent ?? "",
        activityImageUrl : activity.activityImageUrl
    }));
});

export const deleteActivity = createServerFn({
    method: "POST",
})
    .validator(z.object({
        id: z.string().min(1),
    }))
    .handler(async ({ data }) => {
        await connectDb();

        const activity = await ActivityModel.findByIdAndDelete(data.id);

        if (!activity) {
            throw new Error("Activity not found");
        }

        return { success: true };
    });


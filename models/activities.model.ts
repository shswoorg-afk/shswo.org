import mongoose from "mongoose";
import type { Activites } from "../types/ActivityType";

const ActivitesSchema = new mongoose.Schema<Activites>(
    {
        activityTitle: { type: String, required: true },
        activityContent: { type: String, required: true },
        activityImageUrl: { type: String },
        activityImageFileId: { type: String },
    },
    { timestamps: true }
);

export const ActivityModel =
    mongoose.models.Activites ||
    mongoose.model<Activites>("Activites", ActivitesSchema);
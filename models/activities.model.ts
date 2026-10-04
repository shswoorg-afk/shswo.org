import mongoose from "mongoose";
import type { Activites } from "../types/ActivityType";
const ActivitesSchema = new mongoose.Schema<Activites>({
    activityTitle : {type : String, required : false},
    activityContent : {
        type : String,
        required : false
    }
});

export const ActivityModel = mongoose.model<Activites>("Activites", ActivitesSchema);
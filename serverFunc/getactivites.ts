import { createServerFn } from "@tanstack/react-start";
import { ActivityModel } from "../models/activities.model";
import type { Activites } from "../types/ActivityType";
import { connectDb } from "../lib/connectDb";

export const getActivites = createServerFn({
    method : "GET",
}).handler(async () : Promise<Activites[]> =>{
    await connectDb();
    const activites  = await ActivityModel.find({}, {_id : 0});
    console.log("Activites ", activites);
    
    return activites as Activites[];
});
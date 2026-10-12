import mongoose from "mongoose";
import { MONGO_URI } from "../helpers/env.helper";
export const connectDb = async () =>
{
    await mongoose.connect(MONGO_URI);
}
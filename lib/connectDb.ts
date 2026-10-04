import mongoose from "mongoose";
export const connectDb = async () =>
{
    const url = process.env.MONGO_URI as string;
    await mongoose.connect(url);
}
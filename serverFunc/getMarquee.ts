
import { createServerFn } from "@tanstack/react-start";
import { connectDb } from "../lib/connectDb";
import Marquee from "../models/marquee.model";

export const getMarquee = createServerFn({
  method: "GET",
}).handler(async () => {
  await connectDb();

  const messages = await Marquee.find()
    .sort({ createdAt: -1 })
    .select("message")
    .lean();

  return {
    messages: messages.map((item) => ({
      id: item._id.toString(),
      message: item.message,
    })),
  };
});

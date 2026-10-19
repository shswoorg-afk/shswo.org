
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { connectDb } from "../lib/connectDb";
import Marquee from "../models/marquee.model";
import verifyAdminSession from "../lib/verifyAdminSession";

export const updateMarquee = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      message: z.string().trim().min(1).max(250),
    }),
  )
  .handler(async ({ data }) => {
    const session = await verifyAdminSession();

    if (!session.authenticated) {
      throw new Error("Unauthorized");
    }
    else {
      console.log("you are authenticated");

    }
    await connectDb();

    const marquee = await Marquee.create({
      message: data.message.trim(),
    });

    return {
      success: true,
      marquee: {
        _id: marquee._id.toString(),
        message: marquee.message,
      },
    };
  });

export const deleteAnnouncementById = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      _id: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const session = await verifyAdminSession();

    if (!session.authenticated) {
      throw new Error("Unauthorized");
    }

    await connectDb();

    const deleted = await Marquee.findByIdAndDelete(data._id);

    if (!deleted) {
      return {
        success: false,
        message: "Announcement not found.",
      };
    }

    return {
      success: true,
      message: "Announcement deleted successfully.",
    };
  });


export const getMarquee = createServerFn({
  method: "GET",
}).handler(async () => {
  await connectDb();

  const messages = await Marquee.find({})
    .sort({ createdAt: -1 })
    .lean();

  return JSON.parse(
    JSON.stringify({
      messages: messages.map((item) => ({
        _id: item._id,
        message: item.message,
      })),
    }),
  );
});
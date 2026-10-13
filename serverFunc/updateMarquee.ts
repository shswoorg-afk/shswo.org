
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
    else{
      console.log("you are authenticated");
      
    }
    await connectDb();

    const marquee = await Marquee.create({
      message: data.message.trim(),
    });

    return {
      success: true,
      marquee: {
        id: marquee._id.toString(),
        message: marquee.message,
      },
    };
  });


import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { connectDb } from "../lib/connectDb";
import { MemberApplication } from "../models/member.application.model";

const profileImageSchema = z.object({
  applicationId: z.string().min(1),
  profilePicUrl: z.string().url(),
  profilePicId: z.string().min(1),
});

export const saveMemberProfileImage = createServerFn({
  method: "POST",
})
  .validator(profileImageSchema)
  .handler(async ({ data }) => {
    await connectDb();

    // TODO: Verify the applicant's session or tracking token here.
    // Never allow arbitrary users to update another applicant's record.

    const application = await MemberApplication.findOneAndUpdate(
      {
        _id: data.applicationId,
        status: "pending",
      },
      {
        $set: {
          profilePicUrl: data.profilePicUrl,
          profilePicId: data.profilePicId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("_id profilePicUrl");

    if (!application) {
      throw new Error("Pending member application not found.");
    }

    return {
      success: true,
      profilePicUrl: application.profilePicUrl,
    };
  });

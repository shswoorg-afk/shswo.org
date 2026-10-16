import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { MemberApplication } from "../models/member.application.model";
import { AdvisorApplication } from "../models/advisor.application.model";
import { connectDb } from "../lib/connectDb";

export const saveOrganizationId = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      applicationId: z.string(),
      collection: z.enum(["member", "advisor"]),
      url: z.url(),
      fileId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
   await connectDb();
    const update = {
      $set: {
        organizationIdUrl: data.url,
        organizationIdFileId: data.fileId,
      },
    };

    const filter = {
      _id: data.applicationId,
      status: "approved" as const,
    };

    const result =
      data.collection === "member"
        ? await MemberApplication.updateOne(filter, update)
        : await AdvisorApplication.updateOne(filter, update);

    if (result.matchedCount === 0) {
      throw new Error("Approved application not found.");
    }

    return { success: true };
  });


import { createServerFn } from "@tanstack/react-start";
import { randomBytes } from "node:crypto";
import { z } from "zod";

import { connectDb } from "../lib/connectDb";
import { MemberApplication } from "../models/member.application.model";
import { AdvisorApplication } from "../models/advisor.application.model";

const reviewSchema = z.object({
  applicationId: z.string().min(1),
});


export const acceptAdvisorApplication = createServerFn({
  method: "POST",
})
  .validator(reviewSchema)
  .handler(async ({ data }) => {
    // TODO: Verify admin authorization here.

    await connectDb();

    const userVerifiedId = randomBytes(32).toString("hex");

    const application = await AdvisorApplication.findOneAndUpdate(
      {
        _id: data.applicationId,
        status: "pending",
      },
      {
        $set: {
          status: "approved",
          userVerifiedId,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("_id status");

    if (!application) {
      throw new Error("Pending application not found");
    }

    return {
      success: true,
      message: "Application approved",
    };
  });

export const getAdvisorApplications = createServerFn({
  method: "GET",
}).handler(async () => {
  // TODO: Verify the admin session here before returning applications.

  await connectDb();

  const applications = await AdvisorApplication.find({
    status: "pending",
  })
    .select(
      "-password -trackingTokenHash -userVerifiedId"
    )
    .sort({ createdAt: -1 })
    .lean();

  return applications.map((application) => ({
    _id: application._id.toString(),
    fullName: application.fullName,
    fatherOrHusbandName: application.fatherOrHusbandName,
    dob: application.dob.toISOString(),
    occupation: application.occupation,
    village: application.village,
    po: application.po,
    ps: application.ps,
    district: application.district,
    pin: application.pin,
    state: application.state,
    mobile: application.mobile,
    username: application.username,
    identityType: application.identityType,
    status: application.status,
    createdAt: application.createdAt.toISOString(),
  }));
});
export const rejectAdvisorApplication = createServerFn({
  method: "POST",
})
  .validator(reviewSchema)
  .handler(async ({ data }) => {
    // TODO: Verify the current user is an authenticated admin here.

    await connectDb();

    const application = await AdvisorApplication.findById(
      data.applicationId
    );

    if (!application || application.status !== "pending") {
      throw new Error("Pending application not found");
    }

    // Set rejected before deleting, as requested.
    application.status = "rejected";
    await application.save();

    await MemberApplication.deleteOne({
      _id: application._id,
      status: "rejected",
    });

    return {
      success: true,
      message: "Application rejected",
    };
  });

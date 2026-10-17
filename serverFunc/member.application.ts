import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { randomBytes, createHash } from "node:crypto";
import { z } from "zod";
import argon2 from "argon2";
import { connectDb } from "../lib/connectDb";
import { MemberApplication } from "../models/member.application.model";

const applicationSchema = z.object({
  applicantName: z.string().trim().min(2),
  password: z.string().min(8).max(128),
  fatherName: z.string().trim().min(2),
  dob: z.string().min(1),
  joiningdate : z.string().min(1),
  occupation: z.string().trim().min(1),
  village: z.string().trim().min(1),
  po: z.string().trim().min(1),
  ps: z.string().trim().min(1),
  district: z.string().trim().min(1),
  pin: z.string().regex(/^\d{6}$/),
  state: z.string().trim().min(1),
  mobile: z.string().trim().min(10),
  identityType: z.enum([
    "aadhar",
    "pan",
    "passport",
    "voter-id",
  ]),

  // ImageKit uploads
  profilePicUrl: z.url(),
  profilePicId: z.string().min(1),
  proofOfIdentityUrl: z.url(),
  proofOfIdentityId: z.string().min(1),
});

export const submitMemberApplication = createServerFn({
  method: "POST",
})
  .validator(applicationSchema)
  .handler(async ({ data }) => {
    await connectDb();

    const trackingToken = randomBytes(32).toString("hex");

    const trackingTokenHash = createHash("sha256")
      .update(trackingToken)
      .digest("hex");

    const hashedPassword = await argon2.hash(data.password);

    const application = await MemberApplication.create({
      ...data,
      password: hashedPassword,
      dob: new Date(data.dob),
      trackingTokenHash,
      status: "pending",
    });

    setCookie("member_tracking", trackingToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return {
      success: true,
      applicationId: application._id.toString(),
      message: "Application submitted successfully!",
    };
  });

export const getMemberApplicationStatus = createServerFn({
  method: "GET",
}).handler(async () => {
  const trackingToken = getCookie("member_tracking");

  if (!trackingToken) {
    return {
      status: null,
      rejectionReason: null,
    };
  }

  await connectDb();

  const trackingTokenHash = createHash("sha256")
    .update(trackingToken)
    .digest("hex");
console.log(trackingTokenHash);
  const application = await MemberApplication.findOne({
    trackingTokenHash,
  }).select("status rejectionReason");

  if (!application) {
    return {
      status: null,
      rejectionReason: null,
    };
  }

  return {
    status: application.status,
  };
});


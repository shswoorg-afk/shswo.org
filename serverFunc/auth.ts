import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { connectDb } from "../lib/connectDb";
import { MemberApplication } from "../models/member.application.model";
import { AdvisorApplication } from "../models/advisor.application.model";

export const getCurrentUser = createServerFn({
  method: "GET",
}).handler(async () => {
  const userVerifiedId = getCookie("user-verified");

  if (!userVerifiedId) return null;

  await connectDb();

  const member = await MemberApplication.findOne({
    userVerifiedId,
    status: "approved",
  }).select("_id");

  if (member) {
    return {
      id: member._id.toString(),
      name: member.applicantName,
      role: "member" as const,
    };
  }

  const advisor = await AdvisorApplication.findOne({
    userVerifiedId,
    status: "approved",
  }).select("_id");

  if (advisor) {
    return {
      id: advisor._id.toString(),
      name: advisor.fullName,
      role: "advisor" as const,
    };
  }

  return null;
});

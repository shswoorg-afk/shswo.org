import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { connectDb } from "../lib/connectDb";
import { AdvisorApplication } from "../models/advisor.application.model";

export const getAdvisorDashboard = createServerFn({
    method: "GET",
}).handler(async () => {
    const userVerifiedId = getCookie("user-verified");

    if (!userVerifiedId) return null;

    await connectDb();

    const advisor = await AdvisorApplication.findOne({
        userVerifiedId,
        status: "approved",
    })
        .select("-password -trackingTokenHash -userVerifiedId")
        .lean();

    if (!advisor) return null;

    return {
        ...advisor,
        _id: advisor._id.toString(),
        reviewedBy: advisor.reviewedBy?.toString() ?? null,
        memberId: advisor.memberId?.toString() ?? null,
    };
});
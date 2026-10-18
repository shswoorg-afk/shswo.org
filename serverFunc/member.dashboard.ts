
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";

import { connectDb } from "../lib/connectDb";
import { MemberApplication } from "../models/member.application.model";

export const getMemberDashboard = createServerFn({
    method: "GET",
}).handler(async () => {
    const userVerifiedId = getCookie("user-verified");

    if (!userVerifiedId) return null;

    await connectDb();

    const member = await MemberApplication.findOne({
        userVerifiedId,
        status: "approved",
    })
        .select("-password -trackingTokenHash -userVerifiedId")
        .lean();

    if (!member) return null;

    return {
        ...member,
        _id: member._id.toString(),
        memberId: member.memberId?.toString() ?? null,
        payments: (member.payments ?? []).map((payment) => ({
            _id: payment._id.toString(),
            paymentStatus: payment.paymentStatus ?? null,
            paymentDues: payment.paymentDues ?? null,
        }))
    };
});

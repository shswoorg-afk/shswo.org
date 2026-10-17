import { createServerFn } from "@tanstack/react-start";
import { MemberApplication } from "../models/member.application.model";
import { connectDb } from "../lib/connectDb";

export const getOnlyMembers = createServerFn({
    method: "GET",
}).handler(async () => {
    await connectDb();

    const users = await MemberApplication.find({})
        .select(
            "_id applicantName fatherName dob occupation village profilePicUrl proofOfIdentityUrl po ps district pin state mobile identityType status createdAt organizationIdUrl"
        )
        .sort({ createdAt: -1 })
        .lean();

    return users.map((user) => ({
        _id: user._id.toString(),
        applicantName: user.applicantName,
        fatherName: user.fatherName,
        dob: user.dob?.toISOString() ?? null,
        occupation: user.occupation,
        village: user.village,
        profilePicUrl: user.profilePicUrl,
        proofOfIdentityUrl: user.proofOfIdentityUrl,
        po: user.po,
        ps: user.ps,
        district: user.district,
        pin: user.pin,
        state: user.state,
        mobile: user.mobile,
        identityType: user.identityType,
        status: user.status,
        createdAt: user.createdAt?.toISOString() ?? null,
        organizationIdUrl: user.organizationIdUrl,
    }));
});
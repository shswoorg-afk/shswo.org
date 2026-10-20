import { createServerFn } from "@tanstack/react-start";
import { connectDb } from "../lib/connectDb";
import { AdvisorApplication } from "../models/advisor.application.model";

export const getOnlyAdvisor = createServerFn({
    method: "GET",
}).handler(async () => {
    await connectDb();

    const users = await AdvisorApplication.find({})
        .select(
            "_id fullName applicantName fatherOrHusbandName dob occupation village profilePicUrl proofOfIdentityUrl po ps district pin state mobile identityType status createdAt organizationIdUrl"
        )
        .sort({ createdAt: -1 })
        .lean();

    return users.map((user) => ({
        _id: user._id.toString(),
        fullName: user.fullName,
        fatherOrHusbandName: user.fatherOrHusbandName,
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
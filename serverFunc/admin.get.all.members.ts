import { createServerFn } from "@tanstack/react-start";
import { MemberApplication } from "../models/member.application.model";
import { AdvisorApplication } from "../models/advisor.application.model";
import { connectDb } from "../lib/connectDb";
import { z } from "zod";

export const getAllMembers = createServerFn({
    method: "GET",
}).handler(async () => {
    await connectDb();

    const [members, advisors] = await Promise.all([
        MemberApplication.find({}).lean(),
        AdvisorApplication.find({}).lean(),
    ]);

    return JSON.parse(JSON.stringify([...members, ...advisors]));
});

export const deleteMemberOrAdvisorById = createServerFn({
    method: "POST",
})
    .validator(
        z.object({
            id: z.string().min(1),
        })
    )
    .handler(async ({ data }) => {
        await connectDb();

        const member = await MemberApplication.findByIdAndDelete(data.id);

        if (member) {
            return {
                success: true,
                message: "Member deleted successfully.",
            };
        }

        const advisor = await AdvisorApplication.findByIdAndDelete(data.id);

        if (advisor) {
            return {
                success: true,
                message: "Advisor deleted successfully.",
            };
        }

        return {
            success: false,
            message: "Member or advisor not found.",
        };
    });
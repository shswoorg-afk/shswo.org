import { createServerFn } from "@tanstack/react-start";
import { MemberApplication } from "../models/member.application.model";
import { AdvisorApplication } from "../models/advisor.application.model";
import { connectDb } from "../lib/connectDb";

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

import { createServerFn } from "@tanstack/react-start";
import { MemberApplication } from "../models/member.application.model";
import { connectDb } from "../lib/connectDb";
import verifyAdminSession from "../lib/verifyAdminSession";
import z from "zod";

export const updateMemberId = createServerFn({
    method: "POST",
})
    .validator(
        z.object({
            _id: z.string().min(1),
            memberId: z.string().trim().min(1),
        })
    )
    .handler(async ({ data }) => {
        const session = await verifyAdminSession();

        if (!session.authenticated) {
            throw new Error("Unauthorized");
        }

        await connectDb();

        const member = await MemberApplication.findOne({
            _id: data._id,
            status: "approved",
        });

        if (!member) {
            return {
                success: false,
                message: "Approved member not found.",
            };
        }

        const existingId = await MemberApplication.findOne({
            memberId: data.memberId,
            _id: { $ne: data._id
                
            },
        });

        if (existingId) {
            return {
                success: false,
                message: "This Member ID is already assigned.",
            };
        }

        member.memberId = data.memberId;
        await member.save();

        return {
            success: true,
            message: "Member ID assigned successfully.",
            memberId: member.memberId,
        };
    });
export const getMemberId  =createServerFn({method : "GET"}).validator(
    z.object({_id : z.string().min(1)})).handler(async ({data}) =>{
    const user = await  MemberApplication.findOne({_id : data._id});
    if(user)
    {
        return user.memberId;
    }
    else 
    {
        return "cant find member Id"
    }
})
import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { MemberApplication } from "../models/member.application.model";
import z from "zod";

// Get all payment details for the verified member
export const getPaymentDetails = createServerFn({
    method: "GET",
}).handler(async () => {
    const userVerifiedId = getCookie("user-verified");

    if (!userVerifiedId) {
        return [];
    }

    const user = await MemberApplication.findOne({ userVerifiedId })
        .select("_id payments applicantName mobile")
        .lean();

    if (!user) {
        return [];
    }

    return (user.payments ?? []).map((payment) => ({
        _id: String(user._id) as string,
        paymentId: String(payment._id),
        applicantName: user.applicantName ?? "",
        mobile: user.mobile ?? "",
        paymentStatus: payment.paymentStatus ?? "",
        paymentDues: payment.paymentDues ?? "",
    }));
});


// Update one payment record
export const updatePaymentDetails = createServerFn({
    method: "POST",
})
    .validator(
        z.object({
            mobile: z.string().min(1),
            paymentStatus: z.string(),
            paymentDues: z.string(),
        })
    )
    .handler(async ({ data }) => {
        const userVerifiedId = getCookie("user-verified");

        if (!userVerifiedId) {
            throw new Error("Unauthorized");
        }

        const updated = await MemberApplication.findOneAndUpdate(
            {
                mobile: data.mobile,
                userVerifiedId,
                "payments.0": { $exists: true },
            },
            {
                $set: {
                    "payments.0.paymentStatus": data.paymentStatus,
                    "payments.0.paymentDues": data.paymentDues,
                },
            },
            { returnDocument: "after" }
        );

        return {
            success: Boolean(updated),
            message: updated
                ? "Payment updated successfully"
                : "Member or payment not found",
        };
    });


// Delete one payment record while preserving the member application
export const deletePaymentDetailsbyId = createServerFn({
    method: "POST",
})
    .validator(
        z.object({
            mobile: z.string().min(1),
        })
    )
    .handler(async ({ data }) => {
        const userVerifiedId = getCookie("user-verified");

        if (!userVerifiedId) {
            throw new Error("Unauthorized");
        }

        const updated = await MemberApplication.findOneAndUpdate(
            {
                mobile: data.mobile,
                userVerifiedId,
            },
            {
                $set: {
                    "payments.0.paymentStatus": "",
                    "payments.0.paymentDues": "",
                },
            },
            { new: true }
        );

        return {
            success: Boolean(updated),
            message: updated
                ? "Payment fields cleared successfully"
                : "Member not found",
        };
    });
// Delete ALL payment records but keep the member document
export const deleteAllPaymentDetails = createServerFn({
    method: "POST",
})
    .validator(
        z.object({
            mobile: z.string().min(1), // Member application ID
        })
    )
    .handler(async ({ data }) => {
        const userVerifiedId = getCookie("user-verified");

        if (!userVerifiedId) {
            throw new Error("Unauthorized");
        }

        const updated = await MemberApplication.findOneAndUpdate(
            {
                mobile: data.mobile,
                userVerifiedId,
            },
            {
                $set: {
                    payments: [],
                },
            },
            { new: true }
        );

        return {
            success: Boolean(updated),
            message: updated
                ? "All payment records cleared successfully"
                : "Member application not found",
        };
    });


    // Add a payment record to a member
export const addPaymentDetails = createServerFn({
    method: "POST",
})
    .validator(
        z.object({
             mobile: z.string().min(1), // Member application ID
            paymentStatus: z.string(),
            paymentDues: z.string(),
        })
    )
    .handler(async ({ data }) => {
        // Verify your admin session here before allowing the update.
        const member = await MemberApplication.findOneAndUpdate(
            {mobile : data.mobile},
            {
                $push: {
                    payments: {
                        paymentStatus: data.paymentStatus,
                        paymentDues: data.paymentDues,
                    },
                },
            },
            { new: true, runValidators: true }
        );

        if (!member) {
            return {
                success: false,
                message: "Member application not found",
            };
        }

        return {
            success: true,
            message: "Payment added successfully",
        };
    });
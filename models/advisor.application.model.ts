import { Schema, model } from "mongoose";

const AdvisorApplicationSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        fatherOrHusbandName: {
            type: String,
            required: true,
            trim: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        village: {
            type: String,
            required: true,
        },
        profilePicUrl: {
            type: String,
            required: true,
        },
        profilePicId: {
            type: String,
            required: true,
        },
        proofOfIdentityUrl: {
            type: String,
            required: true,
        },
        proofOfIdentityId: {
            type: String,
            required: true,
        },
        po: { type: String, required: true },
        ps: { type: String, required: true },
        district: { type: String, required: true },
        pin: { type: String, required: true },
        state: { type: String, required: true },
        mobile: { type: String, required: true },
        password: { type: String, required: true },
        identityType: {
            type: String,
            enum: ["aadhar", "pan", "passport", "voter-id"],
            required: true,
        },
        identityProofUrl: {
            type: String,
            required: false,
        },
        trackingTokenHash: {
            type: String,
            required: true,
            unique: true,
            select: false,
        },
        userVerifiedId: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
            index: true,
        },
        reviewedAt: Date,
        reviewedBy: Schema.Types.ObjectId,
        rejectionReason: String,
        memberId: Schema.Types.ObjectId,
    },
    { timestamps: true }
);

export const AdvisorApplication = model("AdvisorApplication", AdvisorApplicationSchema);
import { Schema, model } from "mongoose";

const MemberApplicationSchema = new Schema(
    {
        applicantName: {
            type: String,
            required: true,
            trim: true,
        },
        fatherName: {
            type: String,
            required: true,
            trim: true,
        },
        dob: {
            type: Date,
            required: true,
        },
        joiningdate: {
            type: Date,
            required: true
        },
        occupation: {
            type: String,
            required: true,
        },
        organizationIdUrl: {
            type: String,
            required: false,
        },
        organizationIdFileId: {
            type: String,
            required: false,
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
        memberId : {type : String, required : false},
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
        payments : [
            {
                paymentStatus  : {
                    type : String,
                    required : false
                },
                paymentDues : {
                    type : String,
                    required : false
                }
            }
        ],
        status: {
            type: String,
            enum: ["pending", "approved", "rejected"],
            default: "pending",
            index: true,
        },
    },
    { timestamps: true }
);

export const MemberApplication = model("MemberApplication", MemberApplicationSchema);
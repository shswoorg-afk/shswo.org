import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
import { z } from "zod";
import argon2 from "argon2";

import { connectDb } from "../lib/connectDb";
import { AdvisorApplication } from "../models/advisor.application.model";

export const advisorLogin = createServerFn({
  method: "POST",
})
  .validator(
    z.object({
      mobile: z.string().trim().min(1),
      password: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    await connectDb();

    const application = await AdvisorApplication.findOne({
      mobile: data.mobile,
      status: "approved",
    }).select("+password +userVerifiedId");

    if (!application) {
      throw new Error("Invalid mobile number or password.");
    }

    const passwordValid = await argon2.verify(
      application.password,
      data.password,
    );

    if (!passwordValid) {
      throw new Error("Invalid mobile number or password.");
    }

    if (!application.userVerifiedId) {
      throw new Error("Your account is not ready for login.");
    }

    setCookie("user-verified", application.userVerifiedId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return {
      success: true,
      message: "Login successful.",
    };
  });

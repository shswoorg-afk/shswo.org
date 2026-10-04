import { createServerFn } from "@tanstack/react-start";
import {setCookie} from "@tanstack/react-start/server";
import { createHmac } from "crypto";
import { z } from "zod"
const adminLogin = createServerFn({
    method: "POST",

}).validator(z.object(
    {
        username: z.string().min(1),
        password: z.string().min(1),

    })).handler(
        async ({ data }) => {
            const username = process.env.ADMIN_USERNAME;
            const password = process.env.ADMIN_PASSWORD;
            const secret = process.env.ADMIN_SESSION_SECRET;
            if (!username || !password || !secret) {
                throw new Error("Admin authentication is not configured")
            }
            if (
                data.username !== username ||
                data.password !== password
            ) {
                throw new Error("Invalid admin credentials");
            }
            const expiresAt : number = Math.floor(Date.now() / 1000) + 86400;
            const payload = Buffer.from(
                JSON.stringify({exp : expiresAt})
            ).toString("base64url");
            const signature = createHmac("sha256" , secret).update(payload).digest("base64url");
            setCookie("admin-cookie", `${payload}.${signature}`, {
                httpOnly : true,
                maxAge : 60 * 60 * 24,
                secure : process.env.NODE_ENV === "production",
                sameSite : "lax",
                path : "/",

            });
            return {
                success: true,
            };
        }
    );
export default adminLogin;
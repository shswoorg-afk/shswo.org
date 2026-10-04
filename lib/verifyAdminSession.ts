import { createServerFn } from "@tanstack/react-start";
import { getCookie } from "@tanstack/react-start/server";
import { createHmac, timingSafeEqual } from "node:crypto";

const verifyAdminSession = createServerFn({
  method: "GET",
}).handler(async () => {
  const token = getCookie("admin-cookie");
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!token || !secret) {
    return { authenticated: false };
  }

  const parts = token.split(".");

  if (parts.length !== 2) {
    return { authenticated: false };
  }

  const [payload, signature] = parts;

  const expectedSignature = createHmac("sha256", secret)
    .update(payload)
    .digest();

  let actualSignature: Buffer;

  try {
    actualSignature = Buffer.from(signature, "base64url");
  } catch {
    return { authenticated: false };
  }

  if (
    actualSignature.length !== expectedSignature.length ||
    !timingSafeEqual(actualSignature, expectedSignature)
  ) {
    return { authenticated: false };
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );

    if (
      typeof decoded.exp !== "number" ||
      decoded.exp <= Math.floor(Date.now() / 1000)
    ) {
      return { authenticated: false };
    }

    return { authenticated: true };
  } catch {
    return { authenticated: false };
  }
});

export default verifyAdminSession;
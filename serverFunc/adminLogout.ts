import { createServerFn } from "@tanstack/react-start";
import { setCookie } from "@tanstack/react-start/server";
const adminLogout = createServerFn({
  method: "POST",
}).handler(async () => {
  setCookie("admin-cookie", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return {
    success: true,
  };
});

export default adminLogout;
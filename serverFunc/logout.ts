
import { createServerFn } from "@tanstack/react-start";
import { deleteCookie } from "@tanstack/react-start/server";

export const logout = createServerFn({
  method: "POST",
}).handler(async () => {
  deleteCookie("user-verified", {
    path: "/",
  });

  return { success: true };
});

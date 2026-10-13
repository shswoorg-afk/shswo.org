import { createServerFn } from "@tanstack/react-start";
import ImageKit from "@imagekit/nodejs";

export const getImageKitAuth = createServerFn({
  method: "GET",
}).handler(async () => {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error(
      "IMAGEKIT_PRIVATE_KEY is unavailable in the server runtime.",
    );
  }
  const imageKit = new ImageKit({ privateKey });

  const { expire, signature, token } =
    imageKit.helper.getAuthenticationParameters();

  const publicKey = process.env.VITE_IMAGEKIT_PUBLIC_API_KEY;

  if (!publicKey) {
    throw new Error("ImageKit public key is missing.");
  }

  return { expire, signature, token, publicKey };
});
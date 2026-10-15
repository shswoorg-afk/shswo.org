
import { createServerFn } from "@tanstack/react-start";
import ImageKit from "@imagekit/nodejs";

function getImageKitClient() {
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;

  if (!privateKey) {
    throw new Error(
      "IMAGEKIT_PRIVATE_KEY is unavailable. Check server environment loading."
    );
  }

  return new ImageKit({ privateKey });
}

export const getImageKitAuth = createServerFn({
  method: "GET",
}).handler(async () => {
  const imageKit = getImageKitClient();
  const publicKey = process.env.VITE_IMAGEKIT_PUBLIC_API_KEY;

  if (!publicKey) {
    throw new Error("ImageKit public key is missing.");
  }

  const { token, expire, signature } =
    imageKit.helper.getAuthenticationParameters();

  return { token, expire, signature, publicKey };
});

export { getImageKitClient };

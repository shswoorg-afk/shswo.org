import { createServerFn } from "@tanstack/react-start";
import ImageKit from "@imagekit/nodejs";
import { IMAGEKIT_PRIVATE_API_KEY, IMAGEKIT_PUBLIC_API_KEY } from "../helpers/env.helper";
const imageKit = new ImageKit({
    privateKey: IMAGEKIT_PRIVATE_API_KEY
});

export const getImageKitAuth = createServerFn({ method: "GET" }).handler(async () => {
    const { expire, signature, token } = imageKit.helper.getAuthenticationParameters();
    return {
        expire,
        signature,
        token,
        publicKey : IMAGEKIT_PUBLIC_API_KEY
    }
});
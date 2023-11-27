/**
 * The above code is a JavaScript module that uses the Cloudinary API to generate a signature for
 * uploading files and verifies the signature before saving the file details to a database.
 * @returns The code is returning an object with the properties `timestamp` and `signature` in the
 * `getSignature` function.
 */
"use server";

import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function getSignature() {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
        { timestamp, folder: "next" },
        cloudinaryConfig.api_secret
    );

    return { timestamp, signature };
}

export async function saveToDatabase({ public_id, version, signature }) {
    // verify the data
    const expectedSignature = cloudinary.utils.api_sign_request(
        { public_id, version },
        cloudinaryConfig.api_secret
    );

    if (expectedSignature === signature) {
        // safe to write to database
    }
}

"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

import { getSignature, saveToDatabase } from "@/lib/_cloudinary";

const UploadImage = ({ onImageUpload, avatar_url }) => {
    const t = useTranslations("Index");
    const [imageFile, setImageFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState(avatar_url);
    const [isUploading, setIsUploading] = useState(false);
    const [progressUpload, setProgressUpload] = useState(0);

    const handleSelectedFile = (files) => {
        if (files && files[0].size < 10000000) {
            setImageFile(files[0]);
        } else {
            console.error("The file size is too large or no file selected.");
        }
    };

    const handleUploadFile = async () => {
        if (imageFile) {
            setIsUploading(true);

            try {
                const { signature, timestamp } = await getSignature(); // Get Cloudinary signature

                const formData = new FormData();
                formData.append("file", imageFile);
                formData.append(
                    "api_key",
                    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
                );
                formData.append("quality", "auto:best");
                formData.append("signature", signature);
                formData.append("timestamp", timestamp);
                formData.append("folder", "profile_pics");
                console.log("formData", formData);
                console.log("endpoint", endpoint);

                const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
                const data = await fetch(endpoint, {
                    method: "POST",
                    body: formData,
                }).then((res) => res.json());

                await saveToDatabase({
                    version: data?.version,
                    signature: data?.signature,
                    public_id: data?.public_id,
                });

                setDownloadURL(data.secure_url);
                setIsUploading(false);
                onImageUpload(data.secure_url);
                console.log(" url", data.secure_url);
                console.log(" downloadUrl", downloadURL);
                console.log(" url", data.secure_url);
                console.log(" image Upload", onImageUpload);
            } catch (error) {
                console.error("Error uploading to Cloudinary: ", error);
                setIsUploading(false);
            }
        } else {
            console.error("File not found");
        }
    };
    const handleRemoveFile = () => setImageFile(null);
    console.log(downloadURL);

    return (
        <>
            {isUploading ? (
                <div className='flex justify-center items-center'>
                    <FaSpinner className='h-16 w-16 animate-spin duration-150 text-accent' />
                </div>
            ) : (
                <div className='flex justify-start  ml-10 mb-4 items-center space-x-5'>
                    {downloadURL ? (
                        <Image
                            width={50}
                            height={50}
                            src={downloadURL}
                            alt='profile picture'
                            className='w-24 h-24 border rounded-full border-content text-accent2 '
                        />
                    ) : (
                        <BsPerson className='w-24 h-24 border rounded-full border-content text-accent2 p-2 bg-white' />
                    )}
                    <div className='flex flex-col justify-center items-center'>
                        <label
                            htmlFor='upload-button-image'
                            className='w-full text-center bg-accent rounded-md text-white px-5 py-2 tracking-tight font-bold shadow-sm cursor-pointer'
                        >
                            {downloadURL ? t("Edit Image") : t("Upload Image")}
                        </label>
                        <input
                            type='file'
                            id='upload-button-image'
                            style={{ display: "none" }}
                            onChange={(e) => handleSelectedFile(e.target.files)}
                        />
                        {imageFile && (
                            <div className='flex flex-col justify-center items-center text-sm'>
                                <p>{`Size: ${(
                                    imageFile.size /
                                    (1024 * 1024)
                                ).toFixed(2)} MB`}</p>
                                <div>
                                    <button
                                        className='bg-red-500 text-white rounded-md px-3 py-1'
                                        onClick={handleRemoveFile}
                                    >
                                        {t("Close")}
                                    </button>
                                    <button
                                        className='border border-accent ml-2 text-accent rounded-md px-3 py-1'
                                        onClick={handleUploadFile}
                                    >
                                        {t("Upload")}
                                    </button>
                                </div>{" "}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadImage;

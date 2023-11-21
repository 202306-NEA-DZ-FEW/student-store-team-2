"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";

import { getSignature, saveToDatabase } from "@/lib/_cloudinary";

const UploadId = ({ onIdUpload, profile_id }) => {
    const t = useTranslations("Index");
    const [idFile, setIdFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState(profile_id);
    const [isUploading, setIsUploading] = useState(false);
    const [progressUpload, setProgressUpload] = useState(0);

    const handleSelectedFile = (files) => {
        if (files && files[0].size < 10000000) {
            setIdFile(files[0]);
        } else {
            console.error("The file size is too large or no file selected.");
        }
    };

    const handleUploadFile = async () => {
        if (idFile) {
            setIsUploading(true);

            try {
                const { signature, timestamp } = await getSignature(); // Get Cloudinary signature

                const formData = new FormData();
                formData.append("file", idFile);
                formData.append(
                    "api_key",
                    process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
                );
                formData.append("quality", "auto:best");
                formData.append("signature", signature);
                formData.append("timestamp", timestamp);
                formData.append("folder", "ID");

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
                onIdUpload(data.secure_url);
            } catch (error) {
                console.error("Error uploading to Cloudinary: ", error);
                setIsUploading(false);
            }
        } else {
            console.error("File not found");
        }
    };

    const handleRemoveFile = () => setIdFile(null);

    return (
        <>
            {" "}
            {isUploading ? (
                <div className='flex justify-center items-center'>
                    <FaSpinner className='h-16 w-16 animate-spin duration-150 text-accent' />
                </div>
            ) : (
                <div className='flex justify-start ml-10 mb-4 items-center space-x-5'>
                    {downloadURL ? (
                        <Image
                            width={50}
                            height={50}
                            src={downloadURL}
                            alt='id'
                            className='w-24 h-24 rounded-md '
                        />
                    ) : (
                        <>
                            <BsFillPersonVcardFill className='w-24 h-24  text-red-500 rounded-md' />
                        </>
                    )}
                    <div className='flex flex-col justify-center items-center'>
                        <label
                            htmlFor='upload-button-id'
                            className='w-full text-center bg-accent rounded-md text-white px-5 py-2 tracking-tight font-bold shadow-sm cursor-pointer'
                        >
                            {downloadURL ? t("Edit ID") : t("Upload ID")}
                        </label>
                        <input
                            type='file'
                            id='upload-button-id'
                            style={{ display: "none" }}
                            onChange={(e) => handleSelectedFile(e.target.files)}
                        />
                        {idFile && (
                            <div className='flex flex-col justify-center items-center text-sm'>
                                <p>{`Size: ${(
                                    idFile.size /
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
                                        className='border border-blue-500 ml-2 text-blue-500 rounded-md px-3 py-1'
                                        onClick={handleUploadFile}
                                    >
                                        {t("Upload")}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default UploadId;

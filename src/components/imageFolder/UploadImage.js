"use client";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";

import { useUser } from "../userProvider/UserProvider";

const UploadImage = ({ onImageUpload, avatar_url }) => {
    const t = useTranslations("Index");
    const [imageFile, setImageFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState(avatar_url);
    const [isUploading, setIsUploading] = useState(false);
    const [progressUpload, setProgressUpload] = useState(0);
    const user = useUser();
    const storage = getStorage();

    const handleSelectedFile = (files) => {
        if (files && files[0].size < 10000000) {
            setImageFile(files[0]);
        } else {
            console.error("The file size is too large or no file selected.");
        }
    };

    const handleUploadFile = () => {
        if (imageFile) {
            const storageRef = ref(storage, `image/${user.user}`);
            const uploadTask = uploadBytesResumable(storageRef, imageFile);

            setIsUploading(true); // Start the spinner

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProgressUpload(progress);

                    switch (snapshot.state) {
                        case "paused":
                            console.log("Upload is paused");
                            break;
                        case "running":
                            console.log("Upload is running");
                            break;
                    }
                },
                (error) => {
                    console.error(error.message);
                    setIsUploading(false); // Stop the spinner if an error occurs
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            setDownloadURL(url);
                            setIsUploading(false);
                            onImageUpload(url); // Send the URL to the parent component
                        })
                        .catch((error) => {
                            console.error(
                                "Error getting download URL: ",
                                error
                            );
                            setIsUploading(false);
                        });
                }
            );
        } else {
            console.error("File not found");
        }
    };

    const handleRemoveFile = () => setImageFile(null);

    return (
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
            <div>
                <label
                    htmlFor='upload-button-image'
                    className='bg-accent rounded-md text-white px-5 py-2 tracking-tight font-bold shadow-sm cursor-pointer'
                >
                    {downloadURL ? t("Edit Image") : t("Upload Image")}
                </label>
                <input
                    type='file'
                    id='upload-button-image'
                    style={{ display: "none" }}
                    onChange={(e) => handleSelectedFile(e.target.files)}
                />
                {isUploading ? (
                    <div className=' text-primary' role='status'>
                        <span className='visually-hidden'>
                            {t("Loading")}...
                        </span>
                    </div>
                ) : (
                    imageFile && (
                        <div className='m-2'>
                            <p>{`Size: ${(
                                imageFile.size /
                                (1024 * 1024)
                            ).toFixed(2)} MB`}</p>
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
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default UploadImage;

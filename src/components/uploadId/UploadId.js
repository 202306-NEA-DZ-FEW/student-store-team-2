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
import { BsFillPersonVcardFill } from "react-icons/bs";

import { useUser } from "../userProvider/UserProvider";

const UploadId = ({ onIdUpload, profile_id }) => {
    const t = useTranslations("Index");
    const [idFile, setIdFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState(profile_id);
    const [isUploading, setIsUploading] = useState(false);
    const [progressUpload, setProgressUpload] = useState(0);
    const user = useUser();
    const storage = getStorage();

    const handleSelectedFile = (files) => {
        if (files && files[0].size < 10000000) {
            setIdFile(files[0]);
        } else {
            console.error("The file size is too large or no file selected.");
        }
    };

    const handleUploadFile = () => {
        if (idFile) {
            const storageRef = ref(storage, `ID/${user.user}`);
            const uploadTask = uploadBytesResumable(storageRef, idFile);

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
                            onIdUpload(url); // Send the URL to the parent component
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

    const handleRemoveFile = () => setIdFile(null);

    return (
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
            <div>
                <label
                    htmlFor='upload-button-id'
                    className='bg-none border border-accent rounded-md text-accent px-5 py-2 tracking-tight font-bold shadow-sm cursor-pointer'
                >
                    {downloadURL ? t("Edit ID") : t("Upload ID")}
                </label>
                <input
                    type='file'
                    id='upload-button-id'
                    style={{ display: "none" }}
                    onChange={(e) => handleSelectedFile(e.target.files)}
                />
                {isUploading ? (
                    <div className='text-primary' role='status'>
                        <span className='visually-hidden'>
                            {t("Loading")}...
                        </span>
                    </div>
                ) : (
                    idFile && (
                        <div className='m-2'>
                            <p>{idFile.name}</p>
                            <p>{`Size: ${(idFile.size / (1024 * 1024)).toFixed(
                                2
                            )} MB`}</p>
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
                    )
                )}
            </div>
        </div>
    );
};

export default UploadId;

"use client";

import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from "firebase/storage";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";

import { useUser } from "../userProvider/UserProvider";

export const UploadImage = () => {
    const [imageFile, setImageFile] = useState(null);
    const [downloadURL, setDownloadURL] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [progressUpload, setProgressUpload] = useState(0);
    const [displayImage, setDisplayImage] = useState(false);
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
            // const name = imageFile.name;
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
                    getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                        setDownloadURL(url);
                        setIsUploading(false);
                        setDisplayImage(true); // Stop the spinner after successful upload
                    });
                }
            );

            setTimeout(() => {}, 2000);
        } else {
            console.error("File not found");
        }
    };

    const handleRemoveFile = () => setImageFile(null);

    return (
        <div className='flex justify-start ml-10 mt-5 items-center space-x-5'>
            {displayImage ? (
                <img
                    src={downloadURL}
                    alt='Uploaded'
                    className='w-24 h-24 border rounded-full border-content text-gray-400 '
                />
            ) : (
                <BsPerson className='w-24 h-24 border rounded-full border-content text-gray-400 p-2 bg-white' />
            )}
            <div>
                <label
                    htmlFor='upload-button'
                    className='bg-accent rounded-md text-white px-5 py-2 tracking-tight font-bold shadow-sm cursor-pointer'
                >
                    Upload Image
                </label>
                <input
                    type='file'
                    id='upload-button'
                    style={{ display: "none" }}
                    onChange={(e) => handleSelectedFile(e.target.files)}
                />
                {isUploading ? (
                    <div className='spinner-border text-primary' role='status'>
                        <span className='visually-hidden'>Loading...</span>
                    </div>
                ) : (
                    imageFile && (
                        <div>
                            <p>{imageFile.name}</p>
                            <p>{`Size: ${(
                                imageFile.size /
                                (1024 * 1024)
                            ).toFixed(2)} MB`}</p>
                            <button
                                className='bg-red-500 text-white rounded-md px-3 py-1'
                                onClick={handleRemoveFile}
                            >
                                Close
                            </button>
                            <button
                                className='border border-white ml-1 text-white rounded-md px-3 py-1'
                                onClick={handleUploadFile}
                            >
                                Upload
                            </button>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

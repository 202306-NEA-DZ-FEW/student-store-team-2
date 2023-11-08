"use client";

import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { SiXamarin } from "react-icons/si";

import { getSignature } from "@/lib/_cloudinary";
import { db } from "@/lib/firebase";

import { useUser } from "../userProvider/UserProvider";

const AddProductForm = ({ className, categories }) => {
    const [files, setFiles] = useState([]);
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("Sell");
    const [sellPrice, setSellPrice] = useState("");
    const [borrowPrice, setBorrowPrice] = useState("");
    const [condition, setCondition] = useState(5);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles?.length) {
            setFiles((previousFiles) => [
                ...previousFiles,
                ...acceptedFiles.map((file) =>
                    Object.assign(file, { preview: URL.createObjectURL(file) })
                ),
            ]);
        }
    }, []);

    const removeFile = (name, event) => {
        event.stopPropagation();
        const updatedFiles = files.filter((file) => file.name !== name);
        setFiles(updatedFiles);
    };

    const { user } = useUser();
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/*",
        maxSize: 1024 * 1000,
        maxFiles: 4,
        onDrop,
    });

    useEffect(() => {
        // Revoke the data uris to avoid memory leaks
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const addMoreImages = () => {
        if (files.length < 4) {
            document.querySelector('input[type="file"]').click();
        } else {
            console.log("You can't add more than 4 images");
        }
    };

    const handleFileChange = (e) => {
        const fileList = e.target.files;
        const newFiles = Array.from(fileList);
        if (files.length + newFiles.length > 4) {
            console.log("You can't add more than 4 images");
            return;
        }
        if (newFiles.length > 0) {
            setFiles([
                ...files,
                ...newFiles.slice(0, 4 - files.length).map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                ),
            ]);
        }
    };

    async function action() {
        const uploadedFiles = [];
        for (const file of files) {
            const { signature, timestamp } = await getSignature();

            const formData = new FormData();
            formData.append("file", file);
            formData.append(
                "api_key",
                process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
            );
            formData.append("signature", signature);
            formData.append("timestamp", timestamp);
            formData.append("folder", "next");

            const endpoint = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_URL;
            const response = await fetch(endpoint, {
                method: "POST",
                body: formData,
            }).then((res) => res.json());

            uploadedFiles.push({
                name: file.name,
                preview: URL.createObjectURL(file),
                cloudinaryUrl: response.secure_url,
            });
        }

        const for_borrow = type === "Borrow" || type === "Sell & Borrow";
        const for_sell = type === "Sell" || type === "Sell & Borrow";

        setFiles(uploadedFiles);
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        const imageLinks = uploadedFiles.map((file) => file.cloudinaryUrl);
        const productData = {
            productName,
            category,
            location,
            description,
            for_borrow,
            for_sell,
            sellPrice,
            condition,
            borrowPrice,
            uid: user,
            created_at: formattedDate,
            image: imageLinks,
        };
        const productsDataCollection = collection(db, "products");
        await addDoc(productsDataCollection, productData);

        setProductName("");
        setCategory("");
        setLocation("");
        setDescription("");
        setType("");
        setSellPrice("");
        setBorrowPrice("");
        setFiles([]);
    }

    const ImageFile = ({ file }) => (
        <>
            <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                className='h-full w-full rounded-md object-contain'
            />
            <button
                type='button'
                className='absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border border-rose-400 bg-rose-400 transition-colors hover:bg-white'
                onClick={(event) => removeFile(file.name, event)}
            >
                <SiXamarin className='h-5 w-5 fill-white transition-colors hover:fill-rose-400' />
            </button>
        </>
    );
    const renderPriceInput = () => {
        if (type === "Sell") {
            return (
                <input
                    type='number'
                    className='w-full border border-accent/50 placeholder:text-accent/50 px-4 py-2 rounded-md'
                    placeholder='Price'
                    value={sellPrice}
                    onChange={(e) => setSellPrice(e.target.value)}
                />
            );
        } else if (type === "Borrow") {
            return (
                <input
                    type='number'
                    className='w-full border border-accent/50 placeholder:text-accent/50 px-4 py-2 rounded-md placeholder:text-[12px]'
                    placeholder='Borrow Per Week'
                    value={borrowPrice}
                    onChange={(e) => setBorrowPrice(e.target.value)}
                />
            );
        } else if (type === "Sell & Borrow") {
            return (
                <>
                    <input
                        type='number'
                        className='w-1/2 border border-accent/50 placeholder:text-accent/50 px-4 py-2 rounded-md placeholder:text-[12px]'
                        placeholder='Sell Price'
                        value={sellPrice}
                        onChange={(e) => setSellPrice(e.target.value)}
                    />
                    <input
                        type='number'
                        className='w-1/2 border border-accent/50 placeholder:text-accent/50 px-4 py-2 rounded-md placeholder:text-[12px]'
                        placeholder='Borrow Per Week'
                        value={borrowPrice}
                        onChange={(e) => setBorrowPrice(e.target.value)}
                    />
                </>
            );
        }
    };
    return (
        <form
            action={action}
            className='flex flex-row justify-center items-center space-x-8 w-[1300px]'
        >
            <div className='w-[620px]'>
                {files.length === 0 && (
                    <div
                        {...getRootProps({ className: className })}
                        className='border border-dashed border-accent/50 flex flex-col items-center justify-center text-center p-8 text-accent/50 text-[20px]'
                    >
                        <input
                            {...getInputProps({ name: "file", multiple: true })}
                        />
                        <p>
                            Drag and drop some files here, or click to select
                            files
                        </p>
                    </div>
                )}

                {files.length === 4 && (
                    <div className='flex flex-col gap-4'>
                        <div className='w-full h-[340px] relative rounded-md shadow-lg'>
                            <ImageFile file={files[0]} />
                        </div>
                        <div className='flex '>
                            {files.slice(1).map((file) => (
                                <div
                                    key={file.name}
                                    className='w-1/3 mx-2 relative rounded-md shadow-lg'
                                >
                                    <ImageFile file={file} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {files.length === 3 && (
                    <div className='flex flex-col gap-4'>
                        <div className='w-full h-[340px]  relative rounded-md shadow-lg'>
                            <ImageFile file={files[0]} />
                        </div>
                        <div className='flex '>
                            {files.slice(1).map((file) => (
                                <div
                                    key={file.name}
                                    className='w-1/2 mx-2 relative rounded-md shadow-lg'
                                >
                                    <ImageFile file={file} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {files.length > 0 && files.length < 3 && (
                    <div className='flex flex-row gap-4'>
                        {files.map((file) => (
                            <div
                                key={file.name}
                                className='w-1/2 relative rounded-md shadow-lg'
                            >
                                <ImageFile file={file} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='flex flex-wrap items-center justify-center  p-4 w-[620px] space-y-4 text-lg'>
                <input
                    type='text'
                    placeholder='Product Name'
                    className='border border-accent/50 placeholder:text-accent/50 px-4 py-2 rounded-md w-[545px]'
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />

                <div className='flex justify-center mx-auto space-x-2'>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className='border border-accent/50  placeholder:text-accent/50 px-4 py-2 rounded-md w-[267px]'
                    >
                        <option value=''>Select Category</option>
                        {categories[0].map((cat, index) => (
                            <option key={index} value={index}>
                                {cat}
                            </option>
                        ))}
                    </select>
                    <input
                        type='text'
                        placeholder='Location'
                        className=' border border-accent/50  placeholder:text-accent/50 px-4 py-2 rounded-md w-[267px]'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <textarea
                    placeholder='Description'
                    className='w-[545px] h-[200px] border border-accent/50  placeholder:text-accent/50 px-4  rounded-md flex items-center justify-center placeholder:text-center'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <div className='flex justify-center mx-auto space-x-2'>
                    <select
                        value={type}
                        className='w-[267px] border border-accent/50  placeholder:text-accent/50  py-2 rounded-md text-[20px]'
                        onChange={(e) => setType(e.target.value)}
                    >
                        <option value='Borrow'>Borrow</option>
                        <option value='Sell'>Sell</option>
                        <option value='Sell & Borrow'>Sell & Borrow</option>
                    </select>
                    {renderPriceInput()}
                </div>
                <div className='flex justify-center mx-auto space-x-2 items-center'>
                    <label>Product Condition:</label>
                    <select
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        className='w-[267px] border border-accent/50 placeholder:text-accent/50 px-4 py-2 rounded-md'
                    >
                        {Array.from({ length: 11 }, (_, index) => (
                            <option key={index} value={index}>
                                {index}/10
                            </option>
                        ))}
                    </select>
                </div>

                <div className='flex space-x-2 w-full justify-center'>
                    <input
                        type='file'
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                        multiple
                    />
                    <button
                        type='button'
                        onClick={addMoreImages}
                        className='mt-2 rounded-md border border-accent px-4 py-2 text-[20px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-titleContent/80 hover:text-white bg-titleContent'
                    >
                        Upload Image(s)
                    </button>
                    <button
                        type='submit'
                        className='mt-2 rounded-md  border border-accent px-4 py-2 text-[20px] font-bold uppercase tracking-wider text-white transition-colors  hover:bg-accent/80  hover:text-white bg-accent'
                        disabled={files.length === 0}
                    >
                        List
                    </button>
                </div>
            </div>
        </form>
    );
};

export default AddProductForm;

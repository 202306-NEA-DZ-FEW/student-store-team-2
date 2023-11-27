"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaSpinner } from "react-icons/fa";
import { SiXamarin } from "react-icons/si";

import { getSignature, saveToDatabase } from "@/lib/_cloudinary";
import { addProduct } from "@/lib/_supabase";

import { useUser } from "../userProvider/UserProvider";

const AddProductForm = ({ className, categories }) => {
    const t = useTranslations("Index");

    const [files, setFiles] = useState([]);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("for_sale");
    const [price, setPrice] = useState("");
    const [condition, setCondition] = useState(5);
    const [loading, setLoading] = useState(false);

    const { user } = useUser();

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
    /* The above code is defining a function called `onDrop` using the `useCallback` hook in React. This
  function takes in an array of `acceptedFiles` as a parameter. */

    /**
     * The `removeFile` function removes a file from a list of files based on its name.
     */
    const removeFile = (name, event) => {
        event.stopPropagation();
        const updatedFiles = files.filter((file) => file.name !== name);
        setFiles(updatedFiles);
    };

    /* The above code is using the `useDropzone` hook from the `react-dropzone` library in a JavaScript
    React component. */
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        "image/*": [".jpeg", ".jpg", ".png"],
        maxSize: 1024 * 1000,
        maxFiles: 4,
        onDrop,
    });

    useEffect(() => {
        // Revoke the data uris to avoid memory leaks
        return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    /**
     * The function `addMoreImages` allows the user to add more images by clicking on an input file
     * button, but throws an error if the maximum number of images (4) has already been reached.
     */
    const addMoreImages = () => {
        if (files.length < 4) {
            document.querySelector('input[type="file"]').click();
        } else {
            throw "You can't add more than 4 images";
        }
    };

    /**
     * The function `handleFileChange` takes in an event object and updates the state with new files,
     * while also checking if the total number of files exceeds 4.
     */
    const handleFileChange = (e) => {
        const fileList = e.target.files;
        const newFiles = Array.from(fileList);
        if (files.length + newFiles.length > 4) {
            throw "You can't add more than 4 images";
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

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission

        setLoading(true);
        try {
            await action();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
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
            formData.append("quality", "auto:best");
            formData.append("signature", signature);
            formData.append("timestamp", timestamp);
            formData.append("folder", "next");

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
            uploadedFiles.push({
                name: file.name,
                preview: URL.createObjectURL(file),
                cloudinaryUrl: data.secure_url,
            });
        }

        setFiles(uploadedFiles);

        const imageLinks = uploadedFiles.map((file) => file.cloudinaryUrl);

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
        const productData = {
            name,
            category,
            location,
            description,
            offer_type: type,
            condition,
            price,
            uid: user,
            created_at: formattedDate,
            image: imageLinks,
        };
        await addProduct(productData);

        setName("");
        setCategory("");
        setLocation("");
        setDescription("");
        setType("");
        setPrice("");
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
        if (type === "for_sale") {
            return (
                <input
                    type='number'
                    className='w-full border border-accent/50 placeholder:text-accent/50 px-4 py-2 rounded-md'
                    placeholder={t("Price")}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            );
        } else if (type === "for_borrow") {
            return (
                <input
                    type='number'
                    className='w-full border border-accent/50 placeholder:text-accent/50 px-4 py-2 rounded-md placeholder:text-md'
                    placeholder={t("Price Per Week")}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            );
        }
    };
    return (
        <form
            onSubmit={handleSubmit}
            className='flex md:flex-row flex-col justify-center items-center space-x-8 '
        >
            {loading ? (
                <div className='justify-center items-center'>
                    <FaSpinner className='h-24 w-24 animate-spin duration-150 text-accent' />
                </div>
            ) : (
                <>
                    <div className='md:w-1/2'>
                        {files.length < 4 && (
                            <div
                                {...getRootProps({ className: className })}
                                className={`border border-dashed border-accent/50 md:flex ${
                                    files.length === 0 ? "flex" : "hidden"
                                } flex-col items-center justify-center text-center p-8 text-accent/50 text-sm`}
                            >
                                <input
                                    {...getInputProps({
                                        name: "file",
                                        multiple: true,
                                    })}
                                />
                                <p>
                                    {t(
                                        "Drag and drop some files here or click to select files"
                                    )}
                                </p>
                            </div>
                        )}

                        {files.length >= 1 && (
                            <div className='sm:flex flex-col gap-4 space-x-4'>
                                <div className='flex flex-wrap justify-center '>
                                    {files.map((file, index) => (
                                        <div
                                            key={file.name}
                                            className={`${
                                                files.length === 4 &&
                                                index === 0
                                                    ? "w-full"
                                                    : "w-1/4"
                                            } mx-2 relative rounded-md shadow-lg mt-5`}
                                        >
                                            <ImageFile file={file} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='flex flex-wrap items-center justify-center  p-4 md:w-1/2 space-y-4 text-lg max-w-full'>
                        <input
                            type='text'
                            placeholder={t("Product Name")}
                            className='border border-accent/50 placeholder:text-accent/50 px-4 py-2 rounded-md w-full'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        <div className='flex justify-center mx-auto space-x-2 text-sm'>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='border border-accent/50  placeholder:text-accent/50 px-4 py-2 rounded-md w-1/2 uppercase'
                                required
                            >
                                <option value=''>{t("Category")}</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {t(cat.category_name)}
                                    </option>
                                ))}
                            </select>
                            <input
                                type='text'
                                placeholder={t("Location")}
                                className=' border border-accent/50  placeholder:text-accent/50 px-4 py-2 rounded-md w-1/2'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                required
                            />
                        </div>

                        <textarea
                            placeholder={t("description")}
                            className='w-full h-48 border border-accent/50  placeholder:text-accent/50 px-4  rounded-md placeholder:flex placeholder:items-center placeholder:justify-center placeholder:text-center placeholder:text-md'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        ></textarea>

                        <div className='flex justify-center mx-auto space-x-2 w-full'>
                            <select
                                value={type}
                                className='w-1/2 border border-accent/50  placeholder:text-accent/50  py-2 rounded-md text-sm uppercase'
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value='for_borrow'>
                                    {t("Borrow")}
                                </option>
                                <option value='for_sale'>{t("Sell")}</option>
                            </select>
                            {renderPriceInput()}
                        </div>
                        <div className='flex justify-center mx-auto space-x-2 items-center text-sm'>
                            <label>{t("Product Condition")}:</label>
                            <select
                                value={condition}
                                onChange={(e) => setCondition(e.target.value)}
                                className='w-1/2 border border-accent/50 placeholder:text-accent/50 md:px-4 py-2 rounded-md '
                                required
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
                                className='mt-2 rounded-md border border-accent px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-titleContent/80 hover:text-white bg-titleContent disabled:bg-titleContent/20 disabled:border-none'
                                disabled={files.length === 4}
                            >
                                {t("Upload Image(s)")}
                            </button>
                            <button
                                type='submit'
                                className='mt-2 rounded-md  border border-accent px-4 py-2 text-sm font-bold uppercase tracking-wider text-white transition-colors  hover:bg-accent/80  hover:text-white bg-accent disabled:bg-accent/20 disabled:border-none'
                                disabled={files.length === 0}
                            >
                                {t("List")}
                            </button>
                        </div>
                    </div>
                    <div className='sm:hidden flex flex-wrap w-full justify-center '>
                        {files.map((file) => (
                            <div
                                key={file.name}
                                className='relative w-1/4 rounded-md shadow-md m-5 '
                            >
                                <ImageFile file={file} />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </form>
    );
};

export default AddProductForm;

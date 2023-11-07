"use client";
import Image from "next/image";
import React, { useState } from "react";

const AddProductForm = ({ categories }) => {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages([...images, ...Array.from(e.target.files)]);
    };

    let imageLayout;
    switch (images.length) {
        case 1:
            imageLayout = (
                <div className='w-full h-full bg-gray-200'>
                    <Image
                        width={500}
                        height={500}
                        src={URL.createObjectURL(images[0])}
                        alt='Image 1'
                        className='w-full h-full object-cover'
                    />
                </div>
            );
            break;
        case 2:
            imageLayout = images.map((image, index) => (
                <div key={index} className='w-1/2 h-1/2 bg-gray-200'>
                    <Image
                        width={500}
                        height={500}
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index + 1}`}
                        className='w-full h-full object-cover'
                    />
                </div>
            ));
            break;
        case 3:
            imageLayout = (
                <>
                    <div className='w-full h-1/2 bg-gray-200'>
                        <Image
                            width={500}
                            height={500}
                            src={URL.createObjectURL(images[0])}
                            alt='Image 1'
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='w-1/2 h-1/2 bg-gray-200'>
                        <Image
                            width={500}
                            height={500}
                            src={URL.createObjectURL(images[1])}
                            alt='Image 2'
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='w-1/2 h-1/2 bg-gray-200'>
                        <Image
                            width={500}
                            height={500}
                            src={URL.createObjectURL(images[2])}
                            alt='Image 3'
                            className='w-full h-full object-cover'
                        />
                    </div>
                </>
            );
            break;
        case 4:
            imageLayout = (
                <>
                    <div className='w-3/4 h-1/2 bg-gray-200'>
                        <Image
                            width={500}
                            height={500}
                            src={URL.createObjectURL(images[0])}
                            alt='Image 1'
                            className='w-full h-full object-cover'
                        />
                    </div>
                    <div className='w-1/4 h-1/2 flex flex-col'>
                        {images.slice(1).map((image, index) => (
                            <div
                                key={index}
                                className='w-full h-1/2 bg-gray-200'
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    src={URL.createObjectURL(image)}
                                    alt={`Image ${index + 2}`}
                                    className='w-full h-full object-cover'
                                />
                            </div>
                        ))}
                    </div>
                </>
            );
            break;
        default:
            imageLayout = (
                <label
                    htmlFor='image-upload'
                    className='w-full h-96 bg-gray-200 flex items-center justify-center cursor-pointer'
                >
                    <span className='text-gray-500 text-sm'>Add Image</span>
                    <input
                        id='image-upload'
                        type='file'
                        className='hidden'
                        accept='image/*'
                        onChange={handleImageChange}
                        multiple
                    />
                </label>
            );
            break;
    }

    return (
        <div className=' mx-auto p-4 flex md:flex-row flex-col space-x-5'>
            <div className='flex justify-between items-center mb-4 md:w-1/2'>
                <div className='flex flex-wrap'>{imageLayout}</div>
            </div>
            <div className='mb-4 md:w-1/2'>
                <div className='flex space-x-4 mb-4'>
                    <div className='w-1/2'>
                        <select className='block w-full border border-gray-300 rounded-md p-2'>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='w-1/2'>
                        <select className='block w-full border border-gray-300 rounded-md p-2'>
                            <option value='type1'>Type 1</option>
                            <option value='type2'>Type 2</option>
                            {/* Add other type options */}
                        </select>
                    </div>
                </div>
                <input
                    type='text'
                    placeholder='Product Name'
                    className='block w-full border border-gray-300 rounded-md p-2 mb-4'
                />
                <textarea
                    placeholder='Description'
                    className='block w-full border border-gray-300 rounded-md p-2 h-32 resize-none mb-4'
                ></textarea>
                <div className='flex space-x-4'>
                    <input
                        type='text'
                        placeholder='Location'
                        className='w-1/2 block border border-gray-300 rounded-md p-2'
                    />
                    <input
                        type='text'
                        placeholder='Price'
                        className='w-1/2 block border border-gray-300 rounded-md p-2'
                    />
                </div>
                <div className='flex justify-center'>
                    <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>
                        Add Image
                    </button>
                    <button className='px-4 py-2 bg-green-500 text-white rounded-md'>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;

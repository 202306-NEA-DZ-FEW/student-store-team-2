"use client";
import { useState } from "react";

const AddProductForm = ({ categories }) => {
    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        // Handle image upload logic here
        // For simplicity, let's assume the selected images are stored in 'images' state
        setImages([...images, ...Array.from(e.target.files)]);
    };

    return (
        <div className='max-w-2xl mx-auto p-4'>
            <div className='flex justify-between items-center mb-4'>
                <div className='flex space-x-4'>
                    {images.slice(0, 4).map((image, index) => (
                        <div key={index} className='w-20 h-20 bg-gray-200'>
                            {/* Display uploaded images */}
                            <img
                                src={URL.createObjectURL(image)}
                                alt={`Image ${index + 1}`}
                                className='w-full h-full object-cover'
                            />
                        </div>
                    ))}
                    <label
                        htmlFor='image-upload'
                        className='w-20 h-20 bg-gray-200 flex items-center justify-center cursor-pointer'
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
                </div>
            </div>
            <div className='mb-4'>
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
            </div>
            <div className='flex justify-between'>
                <button className='px-4 py-2 bg-blue-500 text-white rounded-md'>
                    Add Image
                </button>
                <button className='px-4 py-2 bg-green-500 text-white rounded-md'>
                    Save
                </button>
            </div>
        </div>
    );
};

export default AddProductForm;

"use client";
import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

/*
{
    id: 2,
    title: "shoes",
    images: [""]
}
*/
// Placeholder object to be replaced with data from Firestore
const imagesArray = [
    "/img/product4.jpg",
    "/img/product3.jpg",
    "/img/product2.jpg",
    "/img/product1.jpg",
];
function ProductDisplay() {
    const [currentImage, setCurrentImage] = useState(imagesArray[0]);
    const indexRef = useRef(1);
    const scrollRef = useRef(null);

    useEffect(() => {
        setInterval(() => {
            setCurrentImage(imagesArray[indexRef.current]);
            scrollRef.current.scrollTo(0, indexRef.current * 249);
            indexRef.current = indexRef.current + 1;
            if (indexRef.current === 4) {
                indexRef.current = 0;
            }
        }, 4000);
    }, []);

    return (
        <>
            <div className=' flex gap-2 w-full'>
                <div
                    ref={scrollRef}
                    className=' h-[560px] scroll-smooth flex flex-col gap-1 overflow-hidden '
                >
                    {imagesArray.map((item, index) => (
                        <button
                            key={index}
                            className='flex flex-col items-center justify-center'
                            onClick={() => setCurrentImage(item)}
                        >
                            <Image
                                src={item}
                                alt='Product'
                                width={166}
                                height={249}
                                className='h-[249px] object-cover rounded'
                            />
                        </button>
                    ))}
                </div>

                <div className='rounded'>
                    <Image
                        src={currentImage}
                        width={500}
                        height={560}
                        alt='Skin Care Products'
                        className='object-cover h-[560px] rounded'
                    />
                </div>
            </div>
        </>
    );
}

export default ProductDisplay;

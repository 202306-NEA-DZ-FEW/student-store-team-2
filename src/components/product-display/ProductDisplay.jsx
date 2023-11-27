"use client";
import Image from "next/image";
import React from "react";
import { useRef } from "react";
import { useEffect, useState } from "react";

// Placeholder object to be replaced with data from Firestore
// const imagesArray = [
//     "/img/product4.jpg",
//     "/img/product3.jpg",
//     "/img/product2.jpg",
//     "/img/product1.jpg",
// ];
function ProductDisplay({ product }) {
    const images = product.image;

    const [currentImage, setCurrentImage] = useState(images[0]);
    const indexRef = useRef(1);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const interval = setInterval(() => {
                setCurrentImage(images[indexRef.current]);
                scrollRef.current.scrollTo(0, indexRef.current * 249);
                indexRef.current = indexRef.current + 1;
                if (indexRef.current === 4) {
                    indexRef.current = 0;
                }
            }, 4000);

            return () => clearInterval(interval);
        }
    }, [images]);
    return (
        <>
            <div className=' flex gap-2 w-full max-sm:justify-center'>
                <div
                    ref={scrollRef}
                    className=' h-[560px] scroll-smooth hidden sm:flex flex-col gap-1 overflow-hidden '
                >
                    {images.map((item, index) => (
                        <button
                            key={index}
                            className='flex flex-col items-center justify-center '
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

                <div className='rounded  max-sm:w-11/12 '>
                    <Image
                        src={currentImage}
                        width={500}
                        height={560}
                        alt='Skin Care Products'
                        className='object-cover sm:h-[560px] rounded'
                    />
                </div>
            </div>
        </>
    );
}

export default ProductDisplay;

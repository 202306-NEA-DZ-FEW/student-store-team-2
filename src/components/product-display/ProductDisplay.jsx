"use client";
import Link from "next/link";
import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import Image from "next/image";

const data = [
    {
        id: 1,
        title: "Books",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "/img/product1.jpg",
        link: "products?category=books",
    },
    {
        id: 2,
        title: "Sports Equipements",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "/img/product2.jpg",
        link: "products?category=sports",
    },
    {
        id: 3,
        title: "Clothing",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "/img/product3.jpg",
        link: "products?category=clothing",
    },
    {
        id: 4,
        title: "Games",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "/img/product3.jpg",
        link: "products?category=games",
    },
    {
        id: 5,
        title: "Electronics",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "/img/product4.jpg",
        link: "products?category=electronics",
    },
];
/*
{
    id: 2,
    title: "shoes",
    images: [""]
}
*/
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
        <div className='ml-20'>
            <div className=' flex gap-4'>
                <div
                    ref={scrollRef}
                    className=' h-[600px] scroll-smooth flex flex-col gap-4 overflow-hidden   '
                >
                    {imagesArray.map((item, index) => (
                        <button
                            key={index}
                            className='bg-green-400 flex flex-col items-center justify-center'
                            onClick={() => setCurrentImage(item)}
                        >
                            <Image
                                src={item}
                                alt='Product'
                                width={166}
                                height={249}
                                className='h-[249px] object-cover'
                            />
                        </button>
                    ))}
                </div>

                <div className=''>
                    <Image
                        src={currentImage}
                        width={450}
                        height={819}
                        alt='Skin Care Products'
                        className='object-cover h-[600px] '
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;

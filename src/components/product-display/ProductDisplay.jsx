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
function ProductDisplay() {
    //   const [CarouselItems, setCarouselItems] = useState(data);
    //     const ref = useRef(true);
    //     const carouselRef = useRef();
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // interval id
    // const intervalIdRef = useRef(null);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        //     if (isLeftSwipe) {
        //         nextClick();
        //     }
        //     if (isRightSwipe) {
        //         prevClick();
        //     }
    };

    // useEffect(() => {
    //     if (ref.current) {
    //         intervalIdRef.current = setInterval(() => {
    //             CarouselItems.push(CarouselItems.shift());
    //             setCarouselItems([...CarouselItems]);
    //         }, 3500);
    //     }

    //     return () => {
    //         ref.current = false;
    //     };
    // }, []);

    // const nextClick = () => {
    //     clearInterval(intervalIdRef.current);
    //     const list = document.querySelectorAll(".carousel__item");
    //     carouselRef.current.append(list[0]);
    // };

    // const prevClick = () => {
    //     clearInterval(intervalIdRef.current);
    //     const list = document.querySelectorAll(".carousel__item");
    //     carouselRef.current.prepend(list[list.length - 1]);
    // };

    return (
        <div className=''>
            <div className=' flex gap-4 h-[800px] bg-purple-400'>
                <div className='h-full p-1 flex flex-col gap-4 overflow-scroll scrollbar-thin scrollbar-thumb-[#bfdbfe] bg-[#ecfeff] border border-gray-300 rounded'>
                    {data.map((item) => (
                        <div
                            key={item.id}
                            className='bg-green-400 flex flex-col items-center justify-center'
                        >
                            <Image
                                src={item.image}
                                alt='Product'
                                width={150}
                                height={180}
                            />
                        </div>
                    ))}
                </div>

                <div className='h-full'>
                    <Image
                        src='/img/product1.jpg'
                        width={500}
                        height={800}
                        alt='Skin Care Products'
                        className='object-cover'
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;

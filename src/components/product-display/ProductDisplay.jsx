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
        <div className='w-full h-full shadow-xl flex flex-col justify-center'>
            <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className='carousel w-1/2 h-screen '
            >
                <div className='w-full h-[800px] flex flex-col justify-center items-center'>
                    {/* <div className="w-full h-full flex flex-col justify-center items-center bg-green-300"> */}
                    <div className=' grid grid-cols-8 gap-4 h-2/3 bg-purple-400'>
                        <div className='col-span-2 h-full overflow-scroll scrollbar-thin scrollbar-thumb-[#bfdbfe] bg-[#ecfeff] border border-gray-300 rounded'>
                            {data.map((item) => (
                                <div
                                    key={item.id}
                                    className='bg-green-400 mb-1 flex flex-col items-center justify-center'
                                    style={{
                                        backgroundImage: `url(${item.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center center",
                                        width: "150px", // Adjust the width as needed
                                        height: "180px", // Adjust the height as needed
                                    }}
                                ></div>
                            ))}
                        </div>

                        <div className='col-span-6 h-full'>
                            <Image
                                src='/img/product1.jpg'
                                width={500}
                                height={800}
                                alt='Skin Care Products'
                            />
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    );
}

export default ProductDisplay;

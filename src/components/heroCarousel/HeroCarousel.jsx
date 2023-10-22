"use client";
import Link from "next/link";
import React from "react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

const data = [
    {
        id: 1,
        title: "Books",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "https://images.unsplash.com/photo-1600431521340-491eca880813?auto=format&fit=crop&q=80&w=2069&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "products?category=books",
    },
    {
        id: 2,
        title: "Sports Equipements",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "https://images.unsplash.com/photo-1602250515024-54689dcb1590?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "products?category=sports",
    },
    {
        id: 3,
        title: "Clothing",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "https://images.unsplash.com/photo-1563074409-5c5d31af4e94?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "products?category=clothing",
    },
    {
        id: 4,
        title: "Games",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "https://images.unsplash.com/flagged/photo-1580234820596-0876d136e6d5?auto=format&fit=crop&q=80&w=2067&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "products?category=games",
    },
    {
        id: 5,
        title: "Electronics",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "products?category=electronics",
    },
    {
        id: 6,
        title: "Kitchen Cookwares",
        description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae repellendus mollitia nobis.",
        image: "https://images.unsplash.com/photo-1590794056470-74f3ade8ddd9?auto=format&fit=crop&q=80&w=2051&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "products?category=kitchen",
    },
];

function HeroCarousel() {
    const [CarouselItems, setCarouselItems] = useState(data);
    const ref = useRef(true);
    const carouselRef = useRef();
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // interval id
    const intervalIdRef = useRef(null);

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
        if (isLeftSwipe) {
            nextClick();
        }
        if (isRightSwipe) {
            prevClick();
        }
    };

    useEffect(() => {
        if (ref.current) {
            intervalIdRef.current = setInterval(() => {
                CarouselItems.push(CarouselItems.shift());
                setCarouselItems([...CarouselItems]);
            }, 3500);
        }

        return () => {
            ref.current = false;
        };
    }, []);

    const nextClick = () => {
        clearInterval(intervalIdRef.current);
        const list = document.querySelectorAll(".carousel__item");
        carouselRef.current.append(list[0]);
    };

    const prevClick = () => {
        clearInterval(intervalIdRef.current);
        const list = document.querySelectorAll(".carousel__item");
        carouselRef.current.prepend(list[list.length - 1]);
    };

    return (
        <div className='w-full shadow-2xl bg-slate-50 overflow-hidden carousel-container'>
            <div
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                ref={carouselRef}
                className='carousel w-full h-screen relative'
            >
                {data.map((item) => (
                    <div
                        key={item.id}
                        className='carousel__item '
                        style={{ backgroundImage: `url(${item.image})` }}
                    >
                        <div className='content left-5 sm:left-24'>
                            <h1 className='title text-6xl sm:text-8xl w-96 bold font-sans  uppercase'>
                                {item.title}
                            </h1>
                            <p className='des mt-4 w-96 sm:w-[600px]'>
                                {item.description}
                            </p>
                            <Link
                                href={item.link}
                                className='bg-white py-2 px-4 text-gray-700 hover:bg-gray-300 focus:bg-gray-300'
                            >
                                See More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className='buttons hidden sm:block absolute left-1/2 bottom-10 z-30'>
                <button
                    onClick={prevClick}
                    className='prev group border rounded-full p-5 ml-6 z-50 hover:bg-white transition duration-200 '
                >
                    <MdNavigateBefore className='text-white group-hover:text-gray-500 w-7 h-7' />
                </button>
                <button
                    onClick={nextClick}
                    className='next group border rounded-full p-5 ml-8  hover:bg-white  transition duration-200 '
                >
                    <MdNavigateNext className='text-white w-7 h-7 group-hover:text-gray-500' />
                </button>
            </div>
        </div>
    );
}

export default HeroCarousel;

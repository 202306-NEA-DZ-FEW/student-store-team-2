"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { animated, useTransition } from "react-spring"; // Import from react-spring for animations

import StarRating from "../starRating/StarRating";

const Testimonials = ({ testimonials }) => {
    const [items, setItems] = useState(testimonials);
    const t = useTranslations("Index");
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const transitions = useTransition(items[currentSlideIndex], {
        from: { opacity: 0 }, // Move the initial state slightly downwards
        enter: { opacity: 1 }, // Smoothly transition to the normal state
        leave: { opacity: 0 }, // Exit upwards
    });

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (currentSlideIndex + 1) % testimonials.length;
            setCurrentSlideIndex(nextIndex);
        }, 5000); // Change testimonial every 5 seconds

        return () => clearInterval(interval);
    }, [currentSlideIndex, testimonials.length]);

    return (
        <div className='flex flex-col'>
            <p className='text-titleContent text-3xl capitalize-words text-center font-jost tracking-wide '>
                {t("They Said About Us")}
            </p>
            <div className='flex justify-center items-center h-96  '>
                {transitions((props, item) => (
                    <animated.div style={props} className='absolute'>
                        <div className=' py-4 px-8  bg-white shadow-lg rounded-lg font-lato  w-96  mx-auto'>
                            <div className='relative'>
                                <div className='flex justify-center md:justify-end -mt-16'>
                                    <StarRating rating={item.rating} />
                                </div>
                                <div>
                                    <h2 className='text-gray-800 text-3xl font-semibold'>
                                        {item?.title}
                                    </h2>
                                    <p className='mt-2 text-gray-600'>
                                        {item?.testimonial}
                                    </p>
                                </div>
                                <div className='flex justify-end '>
                                    <p className='text-xl font-medium text-accent'>
                                        {item?.author}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;

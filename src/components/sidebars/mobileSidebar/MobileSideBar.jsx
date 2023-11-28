"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { IoOptionsSharp } from "react-icons/io5";

import ProductsFilterWrapper from "@/components/wrappers/productsFilterWrapper/ProductsFilterWrapper";

function MobileSideBar({ categories }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // hide scrollbar when the modal is open
        if (isSidebarOpen) {
            document.body.style.overflow = "hidden";
        }

        // Function to handle the scroll event
        const handleScroll = () => {
            if (window.scrollY > 200) {
                // Show the button when scrolled down 100 pixels
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        // Attach the scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener("scroll", handleScroll);

            // reset body overflow when the modal is close
            document.body.style.overflow = "unset";
        };
    }, [isSidebarOpen]);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    return (
        <div className='lg:hidden'>
            <div
                onClick={toggleSidebar}
                className={`modal fixed z-20 lg:hidden bg-[rgba(0,0,0,0.33)] z-10  top-0 left-0 w-screen h-screen ${
                    isSidebarOpen ? "scale-100" : "scale-0"
                }`}
            >
                <button className='bg-gray-100 rounded-md float-right mr-4 mt-4'>
                    <AiOutlineClose className='w-7 h-7 text-gray-400' />
                </button>
            </div>
            <div
                className={`p-10 bg-white z-20 fixed overflow-auto -translate-x-full h-screen w-3/4 top-0 left-0 transition-all ease-in  lg:translate-x-0 ${
                    isSidebarOpen ? "translate-x-0" : ""
                }`}
            >
                <ProductsFilterWrapper
                    autoSendRequest={false}
                    toggleSidebar={toggleSidebar}
                    categories={categories}
                />
            </div>
            <button
                onClick={toggleSidebar}
                className={`bg-accent w-16 h-16 text-white fixed right-3 top-[80%] transition-all ease-in flex flex-col items-center justify-center rounded-full ${
                    isVisible && !isSidebarOpen ? "scale-100" : "scale-0"
                }`}
            >
                <IoOptionsSharp className='w-7 h-7' />
                <span> Filter</span>
            </button>
        </div>
    );
}

export default MobileSideBar;

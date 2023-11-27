"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useEffect } from "react";

import useTextDirection from "@/hooks/useTextDirection";

import MobileSidebar from "../mobileSidebar/MobileSidebar";
import NotificationsDropdown from "../notifications/NotificationsDropDown";
import Portal from "../portal/Portal";
import Searchbar from "../search/Searchbar";
import UserStatus from "../userStatus/UserStatus";

export default function Navbar() {
    const t = useTranslations("Index");
    const pathname = usePathname();
    const direction = useTextDirection();
    const [isOpen, setIsOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    let navigation;

    navigation = [
        { name: t("Home"), href: "/" },
        { name: t("Products"), href: "/products?page=1" },
        { name: t("About"), href: "/about" },
    ];

    const [isInMiddleSection, setIsInMiddleSection] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const documentHeight = document.body.scrollHeight;

            // Calculate the first fifth position of the page
            const firstFifthPosition = documentHeight / 5;

            // Logic to determine if the user is in the first fifth to end of the page
            const isInFirstFifthToEnd = scrollPosition >= firstFifthPosition;

            setIsInMiddleSection(isInFirstFifthToEnd);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navbarClassName = `text-navbar fixed z-20 mb-auto w-full transition-all duration-300 ease-in-out ${
        (pathname === "/" || pathname === "/en") && !isInMiddleSection
            ? "text-white"
            : "text-black"
    } ${
        (pathname === "/" || pathname === "/en") && !isInMiddleSection
            ? ""
            : "bg-white"
    }`;

    return (
        <nav className={navbarClassName}>
            <>
                <div className='mx-auto px-2 sm:px-6 lg:px-8 '>
                    <div className='relative flex h-16 items-center justify-between'>
                        <div className='flex flex-1 items-center justify-between'>
                            <Link href='/'>
                                <div className='flex flex-shrink-0 items-center  w-1/3'>
                                    <h1
                                        className={`${
                                            direction === "ltr"
                                                ? "tracking-widest"
                                                : ""
                                        } font-lato font-semibold text-2xl px-5`}
                                    >
                                        {t("Title")}.
                                    </h1>
                                </div>
                            </Link>

                            <div className=''>
                                <div className=' flex-1 hidden sm:flex space-x-4 items-center '>
                                    {navigation.map((item) => (
                                        <Link key={item.name} href={item.href}>
                                            <div
                                                className={` hover:bg-accent hover:text-white block rounded-md px-3 py-2 text-sm lg:text-base font-semibold font-lato antialiased tracking-widest`}
                                            >
                                                {item.name}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className='flex gap-4 items-center sm:hidden mr-4'>
                                <NotificationsDropdown />
                                <Searchbar />
                            </div>
                            <div className='hidden sm:block'>
                                <div className='flex space-x-4 items-center'>
                                    <Searchbar />
                                    <UserStatus />
                                    <NotificationsDropdown />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <Portal>
                        <div className='md:hidden fixed bg-accent2 z-50 w-screen h-screen top-0 overflow-hidden'>
                            <MobileSidebar
                                navigation={navigation}
                                toggleMobileMenu={toggleMobileMenu}
                                isOpen={isOpen}
                            />
                        </div>
                    </Portal>
                )}
            </>
        </nav>
    );
}

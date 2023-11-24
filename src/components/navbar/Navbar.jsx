"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useEffect } from "react";
import { BiMenu, BiMenuAltRight } from "react-icons/bi";

import MobileSidebar from "../mobileSidebar/MobileSidebar";
import NotificationsDropdown from "../notifications/NotificationsDropDown";
import Portal from "../portal/Portal";
import Searchbar from "../search/Searchbar";
import UserStatus from "../userStatus/UserStatus";

export default function Navbar() {
    const t = useTranslations("Index");
    const pathname = usePathname();

    const [isOpen, setIsOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    let navigation;

    navigation = [
        { name: t("Home"), href: "/" },
        { name: t("Products"), href: "/products" },
        { name: t("About"), href: "/about" },
    ];

    const [isInMiddleSection, setIsInMiddleSection] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.body.scrollHeight;

            // Calculate the middle section's approximate position
            const middleSectionPosition = documentHeight / 2;

            // Logic to determine if the user is in the middle section
            const isInMiddle =
                scrollPosition >= middleSectionPosition - windowHeight / 2 &&
                scrollPosition <= middleSectionPosition + windowHeight / 2;

            setIsInMiddleSection(isInMiddle);
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
                        <button
                            onClick={toggleMobileMenu}
                            className=' sm:hidden inline-flex items-center justify-center rounded-md p-2  hover:bg-accent2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300 ease-in-out'
                        >
                            {isOpen ? (
                                <BiMenu
                                    className='block h-8 w-8 '
                                    aria-hidden='true'
                                />
                            ) : (
                                <BiMenuAltRight
                                    className='block h-8 w-8'
                                    aria-hidden='true'
                                />
                            )}
                        </button>

                        <div className='flex flex-1 items-center justify-between'>
                            <Link href='/'>
                                <div className='flex flex-shrink-0 items-center  w-1/3'>
                                    <h1 className=' tracking-widest font-lato font-semibold text-2xl px-5'>
                                        {t("Title")}.
                                    </h1>
                                </div>
                            </Link>

                            <div className='hidden md:block'>
                                <div className=' flex-1  flex space-x-4 items-center '>
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
                            <div className='flex spacing-x-5 items-center md:hidden '>
                                <NotificationsDropdown />

                                <UserStatus />
                                <Searchbar />
                            </div>
                            <div className='hidden md:block'>
                                <div className='flex space-x-4 items-center'>
                                    <Searchbar toggleMobileMenu={() => {}} />

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

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BiMenu, BiMenuAltRight, BiUser } from "react-icons/bi";

import MobileSidebar from "../mobileSidebar/MobileSidebar";
import Portal from "../portal/Portal";
import Searchbar from "../search/Searchbar";
import { useUser } from "../userProvider/UserProvider";
import UserStatus from "../userStatus/UserStatus";

export default function Navbar() {
    const { user } = useUser();
    const t = useTranslations("Index");
    const [isOpen, setIsOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };

    let navigation;

    if (user) {
        navigation = [
            { name: t("Home"), href: "/" },
            { name: t("Products"), href: "/products" },
            { name: t("Orders"), href: "/dashboard" },
            { name: t("Donate"), href: "/donate" },
        ];
    } else {
        navigation = [
            { name: t("Home"), href: "/" },
            { name: t("Products"), href: "/products" },
            { name: t("Donate"), href: "/donate" },
        ];
    }

    const pathname = usePathname();
    return (
        <nav
            className={`text-navbar fixed z-20 w-full ${
                pathname === "/" || pathname === "/en"
                    ? "text-white"
                    : "text-black"
            }`}
        >
            {
                <>
                    <div className='mx-auto px-2 sm:px-6 lg:px-8 '>
                        <div className='relative flex h-16 items-center justify-between'>
                            <div className='absolute inset-y-0 right-0 flex items-center md:hidden '>
                                {/* Mobile menu button */}
                                <button
                                    onClick={toggleMobileMenu}
                                    className=' inline-flex items-center justify-center rounded-md p-2  hover:bg-accent2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300 ease-in-out'
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
                            </div>
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
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                            >
                                                <div
                                                    className={` hover:bg-accent hover:text-white block rounded-md px-3 py-2 text-sm lg:text-base font-semibold font-lato antialiased tracking-widest`}
                                                >
                                                    {item.name}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className='hidden md:block'>
                                    <div className='flex space-x-4 items-center'>
                                        <Searchbar
                                            toggleMobileMenu={() => {}}
                                        />
                                        <Link href='/profile?page=form'>
                                            <BiUser
                                                className='block h-6 w-6 antialiased  hover:text-accent rounded-xl font-semibold '
                                                aria-hidden='true'
                                            />
                                        </Link>
                                        <UserStatus />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isOpen && (
                        <Portal>
                            <div className='md:hidden fixed bg-accent2 z-50 w-screen h-screen top-0'>
                                <MobileSidebar
                                    navigation={navigation}
                                    toggleMobileMenu={toggleMobileMenu}
                                    isOpen={isOpen}
                                />
                            </div>
                        </Portal>
                    )}
                </>
            }
        </nav>
    );
}

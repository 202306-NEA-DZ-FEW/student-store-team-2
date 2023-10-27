"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { BiMenu, BiMenuAltRight, BiUser } from "react-icons/bi";

import MobileSidebar from "../mobileSidebar/MobileSidebar";
import Portal from "../portal/Portal";
import Searchbar from "../search/Searchbar";
import UserStatus from "../userStatus/UserStatus";

export default function Navbar() {
    const t = useTranslations("Index");
    const [isOpen, setIsOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };
    const navigation = [
        { name: t("Home"), href: "/" },
        { name: t("Products"), href: "/products" },
        { name: t("Orders"), href: "/order" },
    ];

    return (
        <nav className=' text-navbar absolute z-20 w-full text-white bg-gray-500'>
            {
                <>
                    <div className='mx-auto px-2 sm:px-6 lg:px-8 '>
                        <div className='relative flex h-16 items-center justify-between'>
                            <div className='absolute inset-y-0 right-0 flex items-center sm:hidden '>
                                {/* Mobile menu button */}
                                <button
                                    onClick={toggleMobileMenu}
                                    className='text-titleContent inline-flex items-center justify-center rounded-md p-2  hover:bg-accent2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300 ease-in-out'
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

                                <div className='hidden sm:block'>
                                    <div className=' flex-1  flex space-x-4 items-center '>
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                            >
                                                <div
                                                    className={` hover:bg-accent hover:text-white  block rounded-md px-3 py-2 text-base font-semibold font-lato antialiased tracking-widest`}
                                                >
                                                    {item.name}
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                <div className='hidden sm:block mr-48'>
                                    <div className='flex space-x-4 items-center'>
                                        <Link href='/profile'>
                                            <BiUser
                                                className='block h-6 w-6 antialiased  hover:text-accent rounded-xl font-semibold '
                                                aria-hidden='true'
                                            />
                                        </Link>
                                        <UserStatus />

                                        <Searchbar
                                            toggleMobileMenu={() => {}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {isOpen && (
                        <Portal>
                            <div className='sm:hidden fixed bg-accent2 z-50 w-screen h-screen top-0'>
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

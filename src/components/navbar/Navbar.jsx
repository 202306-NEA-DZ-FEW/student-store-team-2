"use client";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { BiMenu, BiMenuAltRight, BiUser } from "react-icons/bi";

import MobileSidebar from "../mobileSidebar/MobileSidebar";
import Portal from "../portal/Portal";
import Searchbar from "../search/Searchbar";

export default function Navbar() {
    const navigation = [
        { name: "Home", href: "/" },
        {
            name: "Products",
            href: "/products",
        },
        {
            name: "Orders",
            href: "/order",
        },
    ];
    return (
        <Disclosure as='nav' className='bg-none text-navbar w-full'>
            {({ open }) => (
                <>
                    <div className='mx-auto px-2 sm:px-6 lg:px-8 '>
                        <div className='relative flex h-16 items-center justify-between'>
                            <div className='absolute inset-y-0 right-0 flex items-center sm:hidden '>
                                {/* Mobile menu button */}
                                <Disclosure.Button className='text-titleContent inline-flex items-center justify-center rounded-md p-2  hover:bg-accent2 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-all duration-300 ease-in-out'>
                                    {open ? (
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
                                </Disclosure.Button>
                            </div>
                            <div className='flex flex-1 items-center justify-between'>
                                <Link href='/'>
                                    <div className='flex flex-shrink-0 items-center'>
                                        <h1 className=' tracking-widest font-lato font-semibold text-2xl px-5'>
                                            MiniStore.
                                        </h1>
                                    </div>
                                </Link>

                                <div className='hidden sm:block '>
                                    <div className='  flex space-x-4 items-center'>
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
                                        <Link href='/profile'>
                                            <BiUser
                                                className='block h-6 w-6 antialiased  hover:text-accent rounded-xl font-semibold '
                                                aria-hidden='true'
                                            />
                                        </Link>
                                        <Searchbar />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Portal>
                        <MobileSidebar navigation={navigation} />
                    </Portal>
                </>
            )}
        </Disclosure>
    );
}

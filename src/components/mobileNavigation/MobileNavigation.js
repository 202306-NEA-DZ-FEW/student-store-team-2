"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { BiMessageSquare } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { FaSpinner, FaTh } from "react-icons/fa";
import { MdDashboard, MdHome } from "react-icons/md";

import MobileSidebar from "../mobileSidebar/MobileSidebar";
import Portal from "../portal/Portal";
import { useUser } from "../userProvider/UserProvider";

function MobileNavigation() {
    const t = useTranslations("Index");
    const [isOpen, setIsOpen] = useState(false);
    const toggleMobileMenu = () => {
        setIsOpen(!isOpen);
    };
    const { user, userData, loading } = useUser();

    return (
        <>
            <section
                id='bottom-navigation'
                className='block sm:hidden fixed inset-x-0 bottom-0 z-50 bg-white shadow max-w-screen-sm'
            >
                <div id='tabs' className='flex justify-between'>
                    <a
                        href='#'
                        className='w-full focus:text-accent hover:text-accent justify-center inline-block text-center pt-2 pb-1'
                    >
                        <MdHome className='inline-block mb-1 h-6 w-6' />
                        <span className='tab tab-home block text-xs'>
                            {t("Home")}
                        </span>
                    </a>
                    <a
                        href='/inbox'
                        className='w-full focus:text-accent hover:text-accent justify-center inline-block text-center pt-2 pb-1'
                    >
                        <BiMessageSquare className='inline-block mb-1 h-6 w-6' />
                        <span className='tab tab-kategori block text-xs'>
                            {t("Messages")}
                        </span>
                    </a>

                    <Link
                        href='/products?page=1'
                        className='w-full focus:text-accent hover:text-accent justify-center inline-block text-center pt-2 pb-1'
                    >
                        <FaTh className='inline-block mb-1 h-6 w-6' />
                        <span className=' block text-xs'> {t("Products")}</span>
                    </Link>
                    <Link
                        href='/dashboard'
                        className='w-full focus:text-accent hover:text-accent justify-center inline-block text-center pt-2 pb-1'
                    >
                        <MdDashboard className='inline-block mb-1 h-6 w-6' />
                        <span className=' block text-xs'>
                            {" "}
                            {t("Dashboard")}
                        </span>
                    </Link>
                    <div className='w-full focus:text-accent hover:text-accent justify-center inline-block text-center pt-2 pb-1'>
                        {loading ? (
                            <div>
                                <FaSpinner className='h-6 w-6 animate-spin duration-150 text-accent2' />
                            </div>
                        ) : userData ? (
                            <div onClick={toggleMobileMenu}>
                                <Image
                                    src={userData.avatar_url}
                                    alt=''
                                    className='object-cover inline-block h-6 w-6 rounded-full mb-1  border-1   border-accent'
                                    height={50}
                                    width={50}
                                />
                                <span className=' block text-xs'>
                                    {t("Account")}
                                </span>
                            </div>
                        ) : (
                            <div onClick={toggleMobileMenu}>
                                {" "}
                                <CiLogin className='inline-block mb-1 h-6 w-6' />
                                <span className='tab tab-account block text-xs'>
                                    {t("Log In")}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </section>
            {isOpen && (
                <Portal>
                    <div className='md:hidden fixed bg-[#EAF2F8] z-50 w-screen h-screen top-0'>
                        <MobileSidebar
                            toggleMobileMenu={toggleMobileMenu}
                            isOpen={isOpen}
                        />
                    </div>
                </Portal>
            )}
        </>
    );
}

export default MobileNavigation;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

import { signOut } from "@/lib/_supabaseAuth";

import { useUser } from "../userProvider/UserProvider";

function UserStatus() {
    const t = useTranslations("Index");
    const { user, userData, loading } = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSignOutUser = async () => {
        await signOut();
        setIsDropdownOpen(!isDropdownOpen);

        window.location.href = "/";
    };

    const links = [
        { name: t("My Borrowings"), href: "/dashboard?type=borrowings" },
        { name: t("My Lendings"), href: "/dashboard?type=lendings" },
        { name: t("My Purchases"), href: "/dashboard?type=purchases" },
        { name: t("My Sales"), href: "/dashboard?type=sales" },
        { name: t("List an Item"), href: "/dashboard?type=List+an+Item" },
    ];

    useEffect(() => {
        const closeDropdown = (event) => {
            if (!event.target.closest(".user-dropdown")) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("click", closeDropdown);
        } else {
            document.removeEventListener("click", closeDropdown);
        }

        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, [isDropdownOpen]);

    if (loading) {
        return (
            <div>
                <div className='flex justify-center items-center'>
                    <FaSpinner className='h-6 w-6 animate-spin duration-150 text-accent2' />
                </div>
            </div>
        );
    } else if (user) {
        return (
            <div className='relative'>
                <div
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className='cursor-pointer'
                >
                    <div className='flex justify-center items-center space-x-3 cursor-pointer'>
                        <div className='sm:w-10 sm:h-10 h-8 w-8 rounded-full overflow-hidden border-1 mr-2 sm:mr-0  border-accent'>
                            <Image
                                src={userData?.avatar_url}
                                alt=''
                                className='w-full h-full object-cover'
                                height={50}
                                width={50}
                            />
                        </div>
                    </div>
                </div>
                {isDropdownOpen && (
                    <div className='absolute top-full right-0 mt-2 w-60 px-5 py-3 text-gray-900 bg-white rounded-lg shadow border dark:border-transparent user-dropdown'>
                        <ul className='space-y-3 '>
                            <div className='font-semibold  text-gray-900 text-lg'>
                                <div className='cursor-pointer'>
                                    {userData?.full_name}
                                </div>
                            </div>
                            <li className='font-medium  '>
                                <Link
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    href='/dashboard'
                                    className='flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-accent'
                                >
                                    Dashboard
                                </Link>
                            </li>
                            {links.map((link) => (
                                <li className='font-medium' key={link.name}>
                                    <Link
                                        className='sm:hidden hover:bg-accent hover:text-white font-jost text-accent rounded-md font-medium tracking-widest'
                                        href={link.href}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li className='font-medium'>
                                <Link
                                    onClick={() =>
                                        setIsDropdownOpen(!isDropdownOpen)
                                    }
                                    href='/profile?page=form'
                                    className='flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-accent'
                                >
                                    Setting
                                </Link>
                            </li>
                            <hr className='dark:border-gray-700' />
                            <li className='font-medium text-red-600'>
                                <a
                                    onClick={handleSignOutUser}
                                    className='flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600'
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        );
    } else {
        return <Link href='/sign-in'> {t("Sign In")}</Link>;
    }
}

export default UserStatus;

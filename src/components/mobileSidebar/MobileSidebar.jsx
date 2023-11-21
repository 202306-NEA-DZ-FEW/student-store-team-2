import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { BiCollapseAlt } from "react-icons/bi";

export default function MobileSidebar({
    navigation,
    toggleMobileMenu,
    isOpen,
}) {
    const t = useTranslations("Index");

    async function handleSearch(e) {
        if (e.keyCode === 13) {
            e.preventDefault();
            toggleMobileMenu;
        }
    }
    return (
        <div
            className={`transition  z-50  animate-wiggle
            `}
            onKeyDown={handleSearch}
        >
            <div
                className={` relative flex h-16 items-center justify-between text-titleContent `}
            >
                <Link href='/'>
                    <div className='flex flex-shrink-0 items-center'>
                        <h1 className='tracking-widest font-lato font-semibold text-2xl px-5'>
                            {t("Title")}
                        </h1>
                    </div>
                </Link>
                <div className='absolute inset-y-0 right-0 flex items-center sm:hidden '>
                    <button
                        onClick={toggleMobileMenu}
                        className='absolute right-0 items-center justify-center rounded-md p-2 hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                    >
                        <BiCollapseAlt
                            className='block h-8 w-8'
                            aria-hidden='true'
                        />
                    </button>
                </div>
            </div>
            <div className='space-y-1 mt-5 px-2 pt-2 pb-3 flex flex-col justify-start '>
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        className=' hover:bg-accent hover:text-white  rounded-md px-3 py-2 text-xl font-medium tracking-widest'
                        href={item.href}
                    >
                        <button
                            onClick={toggleMobileMenu}
                            className='w-full flex justify-start '
                        >
                            {item.name}
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    );
}

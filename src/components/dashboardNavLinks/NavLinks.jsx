"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";
import { FaCoins, FaShoppingBag } from "react-icons/fa";
import { PiArrowULeftDownBold } from "react-icons/pi";
import { RiShakeHandsFill, RiShoppingBag3Fill } from "react-icons/ri";

const NavLinks = ({ fetchPurchases }) => {
    const t = useTranslations("Index");
    const links = [
        { name: "my stuff", link: "stuff", icon: FaShoppingBag },
        { name: "borrowings", link: "borrowings", icon: PiArrowULeftDownBold },
        { name: "lendings", link: "lendings", icon: RiShakeHandsFill },
        { name: "purchases", link: "purchases", icon: RiShoppingBag3Fill },
        { name: "sales", link: "sales", icon: FaCoins },
    ];

    const params = useSearchParams();
    const type = params.get("type") || "stuff";

    return (
        <div className='font-lato fixed top-6 pt-12  px-8  border-r border-r-gray-200 font-semibold text-lg capitalize h-screen    mt-10 bg-bkg text-titleContent  hidden md:block'>
            {links.map(({ name, link, icon: Icon }) => (
                <Link href={`/dashboard?type=${link}`} key={name}>
                    <div
                        className={`flex justify-start items-center mb-4 rounded-lg px transition-all ease-in hover:bg-gray-300 hover:text-bkg pl-4 pr-12 py-2 ${
                            type === link ? "bg-accent text-bkg" : ""
                        }`}
                    >
                        <Icon className='w-6 h-6' />
                        <span className='ml-4'>{t(name)}</span>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;

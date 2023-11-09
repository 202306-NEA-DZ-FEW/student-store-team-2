"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const NavLinks = () => {
    const t = useTranslations("Index");
    const links = [
        { name: "borrowings" },
        { name: "lendings" },
        { name: "purchases" },
        { name: "sales" },
        { name: "List an Item" },
    ];

    const params = useSearchParams();
    const type = params.get("type");
    return (
        <div className='font-lato font-semibold text-xl uppercase w-96 h-72 ml-24 bg-bkg text-titleContent p-4 hidden sm:block'>
            {links.map((link) => (
                <Link href={`/dashboard?type=${link.name}`} key={link.name}>
                    <div
                        className={`flex justify-center items-center mb-4 hover:bg-accent hover:text-bkg h-20 ${
                            type === link.name ? "bg-accent text-bkg" : ""
                        }`}
                    >
                        {t(link.name)}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;

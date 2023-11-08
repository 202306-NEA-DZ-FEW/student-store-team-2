"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const NavLinks = () => {
    const t = useTranslations("Index");
    const links = [
        { name: t("borrowings") },
        { name: t("lendings") },
        { name: t("purchases") },
        { name: t("sales") },
        { name: t("List an Item") },
    ];
    const [selectedLink, setSelectedLink] = useState("borrowings");
    const handleLinkClick = (link) => {
        setSelectedLink(link);
    };

    return (
        <div className='font-lato font-semibold text-xl uppercase w-96 h-72 ml-24 mt-36 bg-bkg text-titleContent p-4 hidden sm:block'>
            {links.map((link) => (
                <Link href={`/dashboard?type=${link.name}`} key={link.name}>
                    <div
                        className={`flex justify-center items-center mb-4 hover:bg-accent hover:text-bkg h-20 ${
                            selectedLink === link.name
                                ? "bg-accent text-bkg"
                                : ""
                        }`}
                        onClick={() => handleLinkClick(link.name)}
                    >
                        {link.name}
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NavLinks;

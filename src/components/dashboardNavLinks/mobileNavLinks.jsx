"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { FaCoins, FaShoppingBag } from "react-icons/fa";
import { PiArrowULeftDownBold } from "react-icons/pi";
import { RiShakeHandsFill, RiShoppingBag3Fill } from "react-icons/ri";

const DropdownSelect = ({ onChange }) => {
    const t = useTranslations("Index");
    const params = useSearchParams();
    const type = params.get("type") || "stuff";

    const links = [
        { name: "my stuff", link: "stuff", icon: FaShoppingBag },
        { name: "borrowings", link: "borrowings", icon: PiArrowULeftDownBold },
        { name: "lendings", link: "lendings", icon: RiShakeHandsFill },
        { name: "purchases", link: "purchases", icon: RiShoppingBag3Fill },
        { name: "sales", link: "sales", icon: FaCoins },
    ];

    const [selectedOption, setSelectedOption] = useState("stuff");
    const router = useRouter();

    const handleDropdownChange = (e) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
        if (onChange) {
            onChange(selectedValue);
        }
        router.push(`/dashboard?type=${selectedValue}`);
    };

    return (
        <select
            className='-mt-8 mb-4 sm:hidden block w-full p-4 border capitalize border-gray-300 rounded-md focus:outline-none focus:border-accent'
            value={selectedOption}
            onChange={handleDropdownChange}
        >
            {links.map(({ name, link, icon: Icon }) => (
                <option key={name} value={name}>
                    <Icon className='w-6 h-6' />
                    <span className='ml-4'>{t(name)}</span>{" "}
                </option>
            ))}
        </select>
    );
};

export default DropdownSelect;

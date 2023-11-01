"use client";
import { useTranslations } from "next-intl";
import React from "react";

const SortingControl = () => {
    const t = useTranslations("Index");
    return (
        <div className='font-lato font-semibold text-xl text-titleContent sm:flex justify-center w-[940px] h-16 hidden sm:block'>
            <div className='flex justify-between items-center text-center space-x-4 mb-4  w-[630px] '>
                <div className=' hover:underline'>{t("All")}</div>
                <div className=' hover:underline'>{t("Awaiting Pickup")}</div>
                <div className=' hover:underline'>{t("Active")}</div>
                <div className=' hover:underline'>{t("Completed")}</div>
            </div>
            <div className='ml-48 mb-4 sort-list flex items-center '>
                <label className='sort-label pr-2  hover:underline'>
                    {t("Sort")}
                </label>
                <select className='font-lato text-secondaryGray text-xl sort-select px-2 h-16 w-44 border-2 rounded-lg'>
                    <option
                        value='newest'
                        className='text-secondaryGray text-center hover:bg-accent hover:text-white h-16 w-44'
                    >
                        {t("Newest")}
                    </option>
                    <option
                        value='oldest'
                        className='text-secondaryGray text-center hover:bg-accent hover:text-white h-16 w-44'
                    >
                        {t("Oldest")}
                    </option>
                </select>
            </div>
        </div>
    );
};

export default SortingControl;

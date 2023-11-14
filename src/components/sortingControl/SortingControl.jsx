"use client";
import { useTranslations } from "next-intl";
import React from "react";

const SortingControl = () => {
    const t = useTranslations("Index");
    return (
        <div className='font-lato font-semibold text-lg text-titleContent flex justify-center w-fit sm:w-full lg:w-3/4 sm:h-16'>
            <div className='md:flex justify-center items-center text-center sm:px-4  mr-2 mb-4 w-1/2 hidden'>
                <div className=' hover:underline mx-2'>{t("All")}</div>
                <div className=' hover:underline mx-2'>{t("Pending")}</div>
                <div className=' hover:underline mx-2'>{t("Active")}</div>
                <div className=' hover:underline mx-2'>{t("Completed")}</div>
            </div>
            <div className='ml-1/10 mr-2 mb-4 sort-list md:hidden flex justify-between px-4 items-center'>
                <label className='sort-label pr-2  hover:underline hidden'>
                    {t("Filter")}
                </label>
                <select className='font-lato text-secondaryGray text-lg sort-select h-14 w-32 border-2 rounded-lg'>
                    <option
                        value='All'
                        className='text-secondaryGray text-center hover:bg-accent hover:text-white h-16 w-44'
                    >
                        {t("All")}
                    </option>
                    <option
                        value='Pending'
                        className='text-secondaryGray text-center hover:bg-accent hover:text-white h-16 w-44'
                    >
                        {t("Pending")}
                    </option>
                    <option
                        value='Active'
                        className='text-secondaryGray text-center hover:bg-accent hover:text-white h-16 w-44'
                    >
                        {t("Active")}
                    </option>
                    <option
                        value='Completed'
                        className='text-secondaryGray text-center hover:bg-accent hover:text-white h-16 w-44'
                    >
                        {t("Completed")}
                    </option>
                </select>
            </div>
            <div className='ml-1/10 mb-4 sort-list flex px-4 items-center'>
                <label className='sort-label pr-2 hidden hover:underline'>
                    {t("Sort")}
                </label>
                <select className='font-lato text-secondaryGray text-lg sort-select h-14 w-36 border-2 rounded-lg'>
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

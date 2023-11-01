"use client";
import { useTranslations } from "next-intl";
import React from "react";

const MyListings = () => {
    const t = useTranslations("Index");
    return (
        <div className='pt-20'>
            <h2 className='font-jost tracking-wider text-title text-4xl ml-14 pb-20 sm:text-center sm:pr-96 sm:mr-80 sm:py-12'>
                {t("My Listings")}
            </h2>
        </div>
    );
};

export default MyListings;

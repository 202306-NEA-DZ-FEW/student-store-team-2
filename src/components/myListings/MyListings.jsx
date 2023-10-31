"use client";
import { useTranslations } from "next-intl";
import React from "react";

const MyListings = () => {
    const t = useTranslations("Index");
    return (
        <div className='pt-20'>
            <h1 className='font-jost tracking-wider text-title text-4xl text-center pr-96 mr-80 py-12'>
                {t("My Listings")}
            </h1>
        </div>
    );
};

export default MyListings;

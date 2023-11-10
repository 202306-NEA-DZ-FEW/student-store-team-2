"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const MyListings = () => {
    const params = useSearchParams();
    const type = params.get("type");
    const t = useTranslations("Index");
    return (
        <div className='pt-20'>
            <h2 className='font-jost tracking-wider text-title text-4xl ml-14 pb-20  sm:pr-96 sm:mr-80 sm:py-12 '>
                {t("My Listings")} |{" "}
                <span className='uppercase text-2xl hidden sm:inline-block'>
                    {t(type)}{" "}
                </span>
            </h2>
        </div>
    );
};

export default MyListings;

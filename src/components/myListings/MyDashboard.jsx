"use client";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const MyDashboard = () => {
    const params = useSearchParams();
    const type = params.get("type");
    const t = useTranslations("Index");
    return (
        <div className='pt-20'>
            <h2 className='font-jost tracking-wider text-title text-center hidden md:inline-block text-3xl ml-32 pb-20 sm:py-12 '>
                {t("My Dashboard")} |{" "}
                <span className='uppercase text-2xl sm:inline-block'>
                    {t(type)}{" "}
                </span>
            </h2>
            <span className='font-jost tracking-wider text-title text-center text-4xl md:pr-96 sm:mr-80 sm:py-6  md:hidden block'>
                {t(type)}{" "}
            </span>
        </div>
    );
};

export default MyDashboard;

"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

const AuthHeader = ({ title, imageSrc }) => {
    const t = useTranslations("Index");
    return (
        <div>
            <div className='relative flex justify-center items-center rounded-xl'>
                <Image
                    width={1185 / 1.5}
                    height={385 / 1.5}
                    alt='pc'
                    src={imageSrc}
                />
                <div className='absolute flex justify-center items-center w-full h-full  bg-[rgba(114,174,200,0.78)] text-3xl text-white font-regular font-poppins tracking-wider'>
                    {t(title)}
                </div>
            </div>
            <div className='flex flex-col '>
                {/* title */}
                <div className='flex flex-col text-center font-lato text-content'>
                    <h1 className='text-2xl '>
                        {t("Create Your")}{" "}
                        <span className='text-accent'>{t("Store")}</span>
                    </h1>
                    <p className='text-sm'>
                        {t("and start exchanging with other students")}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthHeader;

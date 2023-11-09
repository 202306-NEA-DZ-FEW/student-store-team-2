"use client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

const Page = () => {
    const t = useTranslations("Index");
    return (
        <div className='flex flex-col font-poppins pt-16'>
            <div className='relative min-h-[277px]'>
                <Image
                    src='/donation-banner-transformed.jpg'
                    alt='/donation-banner-transformed.jpg'
                    fill
                    style={{ objectFit: "cover", layout: "fill" }}
                    sizes='(min-height: 277px)'
                />
            </div>
            <section className='flex flex-col items-center w-auto sm:min-h-[343px]'>
                <h3 className='text-titleContent text-xl text-center lg:text-4xl md:text-3xl mb-6 sm:mb-14 mt-14 sm:mt-24'>
                    {t("WHY DONATE")}
                </h3>
                <p className='text-content tracking-widest text-center text-lg md:text-2xl lg:text-3xl sm:w-auto lg:max-w-[1519px] mb-28'>
                    {t("Donate paragraph")}
                </p>
            </section>
            <div className='flex flex-col items-center w-auto sm:min-h-[670px] bg-accent2'>
                <h2 className='text-titleContent text-xl text-center lg:text-4xl md:text-3xl mt-28'>
                    {t("MAKE A DIFFERENCE BY DONATING")}
                </h2>
                <div className='text-content drop-shadow-xl flex flex-col lg:flex-row items-center lg:justify-center lg:items-end w-full min-h-[343px] mt-20 mb-28'>
                    <div className='flex flex-col items-center justify-center sm:mb-8 w-40 h-32 bg-bkg lg:w-64 lg:h-56 rounded-xl lg:mr-12'>
                        <p className='text-xs lg:text-base '>
                            {t("Small Help")}
                        </p>
                        <div className='flex justify-center font-roboto font-bold py-2 lg:py-4'>
                            <p className='text-vase lg:text-2xl'>$</p>
                            <p className='text-4xl lg:text-6xl'>10</p>
                        </div>
                        <button className='bg-accent text-bkg rounded-md text-xs w-24 h-6 lg:text-base lg:w-40 lg:h-10'>
                            {t("Donate")}
                        </button>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-bkg mb-8 w-52 h-44 lg:w-80 lg:h-72 rounded-xl mx-7'>
                        <p className='text-sm lg:text-xl'>{t("Some Help")}</p>
                        <div className='flex justify-center font-roboto font-bold py-3 lg:py-6'>
                            <p className='text-xl lg:text-3xl'>$</p>
                            <p className='text-5xl lg:text-7xl'>25</p>
                        </div>
                        <button className='bg-accent text-bkg rounded-md text-xs w-32 h-8 lg:text-lg lg:w-52 lg:h-12'>
                            {t("Donate")}
                        </button>
                    </div>
                    <div className='flex flex-col items-center justify-center bg-bkg mb-8 w-64 h-56 lg:w-[402px] lg:h-[342px] rounded-xl mx-7'>
                        <p className='text-base lg:text-2xl'>{t("Big Help")}</p>
                        <div className='flex justify-center font-roboto font-bold py-3 lg:py-7 '>
                            <p className='text-2xl lg:text-4xl'>$</p>
                            <p className='text-6xl lg:text-8xl'>50</p>
                        </div>
                        <button className='bg-accent text-bkg rounded-md text-sm w-40 h-10 lg:text-2xl lg:w-64 lg:h-16'>
                            {t("Donate")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;

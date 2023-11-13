"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
    const t = useTranslations("Index");
    return (
        <div className='flex flex-col font-poppins pt-16'>
            <div className='relative min-h-[200px] lg:h-96'>
                <Image
                    src='/donation-banner-transformed.jpg'
                    alt='/donation-banner-transformed.jpg'
                    fill
                    style={{ objectFit: "cover", layout: "fill" }}
                    sizes='(min-height: 200px)'
                />
            </div>
            <section className='flex flex-col items-center w-auto sm:h-1/3 mb-16'>
                <h3 className='text-titleContent font-semibold text-base text-center lg:text-xl sm:font-bold md:text-lg mb-6 sm:mb-19 mt-12 sm:mt-16'>
                    {t("WHY DONATE")}
                </h3>
                <p className='text-content tracking-wide text-center text-base w-3/4 md:text-base lg:text-xl sm:w-3/4 lg:w-3/4 mb-2'>
                    {t("Donate paragraph")}
                </p>
            </section>
            <div className='flex flex-col items-center w-auto sm:min-h-[600px] bg-accent2'>
                <h2 className='text-titleContent font-semibold text-base w-3/4 text-center lg:text-xl sm:font-bold md:text-lg mt-16'>
                    {t("MAKE A DIFFERENCE BY DONATING")}
                </h2>
                <div className='text-content drop-shadow-xl flex flex-col lg:flex-row items-center lg:justify-center lg:items-end w-full lg:h-96'>
                    <div class='relative cursor-pointer flex flex-col items-center justify-center mb-8 w-36 h-32 bg-bkg lg:w-56 lg:h-48 rounded-xl lg:mr-10'>
                        <div class='absolute inset-0 bg-titleContent opacity-25 rounded-lg shadow-2xl'></div>
                        <div class='absolute inset-0 transform  hover:scale-75 transition duration-300'>
                            <div class='h-full w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl'>
                                <p className='text-xs lg:text-sm '>
                                    {t("Small Help")}
                                </p>
                                <div className='flex justify-center font-roboto font-bold py-2 lg:py-4'>
                                    <p className='text-base lg:text-xl'>$</p>
                                    <p className='text-3xl lg:text-5xl'>10</p>
                                </div>
                                <button className='bg-accent text-bkg rounded-md hover:text-title2 hover:bg-accent2 text-xs w-24 h-6 lg:text-sm lg:w-36 lg:h-9'>
                                    {t("Donate")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class='relative cursor-pointer flex flex-col items-center justify-center bg-bkg mb-8 w-44 h-36 lg:w-64 lg:h-60 rounded-xl mx-7'>
                        <div class='absolute inset-0 bg-titleContent opacity-25 rounded-lg shadow-2xl'></div>
                        <div class='absolute inset-0 transform  hover:scale-75 transition duration-300'>
                            <div class='h-full w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-2xl'>
                                <p className='text-sm lg:text-base'>
                                    {t("Some Help")}
                                </p>
                                <div className='flex justify-center font-roboto font-bold py-3 lg:py-6'>
                                    <p className='text-xl lg:text-2xl'>$</p>
                                    <p className='text-4xl lg:text-6xl'>25</p>
                                </div>
                                <button className='bg-accent text-bkg rounded-md hover:text-title2 hover:bg-accent2 text-xs w-28 h-6 lg:text-base lg:w-40 lg:h-10'>
                                    {t("Donate")}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class='relative cursor-pointer flex flex-col items-center justify-center bg-bkg mb-8 w-56 h-48 lg:w-80 lg:h-72 rounded-xl lg:ml-7'>
                        <div class='absolute inset-0 bg-titleContent opacity-25 rounded-lg shadow-2xl'></div>
                        <div class='absolute inset-0 transform  hover:scale-75 transition duration-300'>
                            <div class='h-full w-full bg-white rounded-lg shadow-2xl flex flex-col items-center justify-center '>
                                <p className='text-base lg:text-xl'>
                                    {t("Big Help")}
                                </p>
                                <div className='flex justify-center font-roboto font-bold py-3 lg:py-7 '>
                                    <p className='text-xl lg:text-3xl'>$</p>
                                    <p className='text-5xl lg:text-7xl'>50</p>
                                </div>
                                <button className='bg-accent text-bkg rounded-md hover:text-title2 hover:bg-accent2 text-base w-32 h-8 lg:text-xl lg:w-52 lg:h-11'>
                                    {t("Donate")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;

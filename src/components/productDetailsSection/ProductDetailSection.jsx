"use client";
import React from "react";
import ProfilePic from "../profilePicture/ProfilePic";
import ProfileUserInfo from "../profileUserInformation/ProfileUserInfo";
import BuyBorrowBtn from "../buyborrow-btn/BuyBorrowBtn";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ContactDetails from "../contactDetails/ContactDetails/ContactDetails";

export default function ProductDetailSection({ user, productData }) {
    const t = useTranslations("Index");
    return (
        <section className='w-full sm:w-full flex flex-col'>
            <div className='w-full m-4 flex gap-2'>
                <ProfilePic user={user} />
                <ProfileUserInfo user={user} />
            </div>
            <div className='border border-0.5 border[#EDF1F3] rounded-md drop-shadow-sm p-4 w-full'>
                <div className='mb-10 ml-4'>
                    <h2 className='font-lato text-lg sm:3xl uppercase text-[#55585B]'>
                        {productData
                            ? productData.name
                            : "Product Name Not Available"}
                    </h2>
                    <div className='relative mt-2'>
                        <Image
                            className='z-0'
                            src='/conditionLabelVector.svg'
                            alt='Item Condition'
                            width={139}
                            height={39}
                        ></Image>
                        <div className='font-jost font-extrabold text-sm sm:text-base text-bkg absolute bottom-1 left-2 tracking-wider '>
                            {t("State")}:{" "}
                            {productData
                                ? productData.condition + "/10"
                                : "Condition Not Available"}
                        </div>
                    </div>
                </div>

                <p className='w-full sm:w-5/6 text-sm sm:text-base font-medium mb-2 leading-5 tracking-wide'>
                    {productData
                        ? productData.description
                        : "Description Not Available"}
                </p>
                <div className=' mt-8 text-[#3A3A3A] w-full flex flex-col items-start sm:flex-row sm:items-center my-1'>
                    <div className=' flex flex-row gap-2 w-full sm:w-2/3 '>
                        <BuyBorrowBtn label='Buy' />
                        <p className='font-lato text-lg font-semibold'>
                            $
                            {productData
                                ? productData.price.sell_price
                                : " Sell Price Not Available"}
                        </p>
                    </div>
                    <div className='flex flex-row gap-2 sm:gap-0 w-full sm:w-2/3 mt-2'>
                        <BuyBorrowBtn label='Borrow' />
                        <p className='font-lato text-lg font-semibold '>
                            $
                            {productData
                                ? productData.price.borrow_price
                                : "Borrow Price Not Available"}
                            <span className='text-[#55585B] text-sm font-thin font-jost pl-2'>
                                per day
                            </span>
                        </p>
                    </div>
                </div>
                <div className=' w-full flex mt-8 gap-2'>
                    <p className=' text-sm sm:text-base text-[#3A3A3A] font-semibold '>
                        Category :
                    </p>
                    <Link
                        href='/'
                        className='font-normal text-[#72AEC8] underline hover:text-[#45adda] text-sm sm:text-base transform hover:scale-105 transition-transform duration-300 ease-in-out'
                    >
                        {productData
                            ? productData.category
                            : "Category Not Available"}{" "}
                    </Link>
                </div>
                <ContactDetails user={user} />
            </div>
        </section>
    );
}

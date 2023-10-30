"use client";
import React from "react";
import ProfilePic from "../ProfilePicture/ProfilePic";
import BuyBorrowBtn from "../buyborrow-btn/BuyBorrowBtn";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function ProductDetailSection({ user, productData }) {
    const t = useTranslations("Index");
    return (
        <section className=' w-full flex flex-col'>
            <div className='m-4'>
                <ProfilePic user={user} />
            </div>
            <div className='border border-0.5 border[#EDF1F3] rounded-md drop-shadow-sm p-4 w-10/12'>
                <div className='mb-10 ml-4'>
                    <h2 className='font-lato text-5xl uppercase text-[#55585B]'>
                        {productData
                            ? productData.name
                            : "Product Name Not Available"}
                    </h2>
                    <div className='relative'>
                        <Image
                            className='z-0'
                            src='/conditionLabelVector.svg'
                            alt='Item Condition'
                            width={139}
                            height={39}
                        ></Image>
                        <div className='font-jost font-extrabold text-sm text-bkg absolute bottom-1 left-2 tracking-wider '>
                            {t("State")}:{" "}
                            {productData
                                ? productData.condition + "/10"
                                : "Condition Not Available"}
                        </div>
                    </div>
                </div>

                <p className='w-5/6 text-base font-medium mb-2'>
                    {productData
                        ? productData.description
                        : "Description Not Available"}
                </p>
                <div className='ml-8 text-[#3A3A3A] w-full flex items-center gap-10 my-1'>
                    <div className='w-[180px] flex flex-row '>
                        <BuyBorrowBtn label='Buy' />
                        <p className='font-lato text-lg font-semibold'>
                            $
                            {productData
                                ? productData.price.sell_price
                                : " Sell Price Not Available"}
                        </p>
                    </div>
                    <div className='w-[188px] flex flex-row'>
                        <BuyBorrowBtn label='Borrow' />
                        <p className='font-lato text-lg font-semibold'>
                            $
                            {productData
                                ? productData.price.borrow_price
                                : "Borrow Price Not Available"}
                            <span className='text-[#55585B] text-sm font-thin font-jost'>
                                per day
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

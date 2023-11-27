"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { toast } from "react-toastify";

import {
    createBorrow,
    createPurchase,
    hasBorrowed,
    hasPurchased,
    setNotification,
} from "@/lib/_supabase";

import BuyBorrowBtn from "../buyborrow-btn/BuyBorrowBtn";
import ContactDetails from "../contactDetails/ContactDetails/ContactDetails";
import ProfilePic from "../profilePicture/ProfilePic";
import ProfileUserInfo from "../profileUserInformation/ProfileUserInfo";
import { useUser } from "../userProvider/UserProvider";

const sendItemRequestNotification = async (
    requester,
    owner,
    action,
    itemType
) => {
    const statusMessage = {
        buy: "has requested to buy your item",
        borrow: "has requested to borrow your item",
    };

    const data = {
        message: statusMessage[action],
        path: itemType === "buy" ? "sales" : "lendings", // Adjust path based on item type
    };

    const res = await setNotification(requester, owner, data, "order");
    return res;
};

export default function ProductDetailSection({ user, product }) {
    const t = useTranslations("Index");
    const router = useRouter();
    const currentUser = useUser();

    const [isLoading, setLoading] = useState(false);
    const [hasUserPurchased, setHasUserPurchased] = useState(false);
    const [hasUserBorrowed, setHasUserBorrowed] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    useEffect(() => {
        const checkUserPurchase = async () => {
            setIsChecking(true);
            if (currentUser.user && product) {
                const userHasPurchased = await hasPurchased(
                    product.pid,
                    currentUser.user.id
                );
                await setHasUserPurchased(userHasPurchased);
                await setHasUserBorrowed(userHasPurchased);
                const userHasBorrowed = await hasBorrowed(
                    product.pid,
                    currentUser.user.id
                );
                setHasUserBorrowed(userHasBorrowed);
            }
            setIsChecking(false);
        };

        checkUserPurchase();
    }, [isLoading]);

    const handleClick = async () => {
        try {
            if (currentUser.user) {
                setLoading(true);
                if (product?.offer_type === "for_sale") {
                    const order = {
                        productId: product.pid,
                        receiver: currentUser.user.id,
                        sender: product.uid,
                    };

                    await sendItemRequestNotification(
                        order.receiver,
                        order.sender,
                        "buy",
                        "buy"
                    );

                    await createPurchase(order);
                } else {
                    const order = {
                        productId: product.pid,
                        receiver: currentUser.user.id,
                        sender: product.uid,
                    };

                    await sendItemRequestNotification(
                        order.receiver,
                        order.sender,
                        "borrow",
                        "borrow"
                    );
                    await createBorrow(order);
                }
                toast("Item Added Successfully", {
                    hideProgressBar: true,
                    autoClose: 2000,
                    type: "success",
                    position: "bottom-center",
                });
            } else {
                toast("You must be logged In to Continue", {
                    hideProgressBar: false,
                    autoClose: 2000,
                    type: "error",
                    position: "bottom-center",
                });
                router.push("/sign-in");
            }
        } catch (error) {
            toast("You've already Sent a Request", {
                hideProgressBar: true,
                autoClose: 2000,
                type: "error",
                position: "bottom-center",
            });
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className='w-full sm:w-full flex flex-col'>
            <div className='w-full m-4 flex gap-2'>
                <ProfilePic user={user} />
                <ProfileUserInfo user={user} />
            </div>
            <div className='border border-0.5 border[#EDF1F3] rounded-md drop-shadow-sm p-4 w-full'>
                <div className='mb-10 ml-4'>
                    <h2 className='font-lato text-lg sm:3xl uppercase text-[#55585B]'>
                        {product && product.name}
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
                            {t("State")}: {product && product.condition + "/10"}
                        </div>
                    </div>
                </div>

                <p className='w-full sm:w-5/6 text-sm sm:text-base font-medium mb-2 leading-5 tracking-wide'>
                    {product && product.description}
                </p>
                <div className=' mt-8 text-[#3A3A3A] w-full flex flex-col items-start sm:flex-row sm:items-center my-1'>
                    {isChecking ? (
                        <FaSpinner className='h-8 w-8 animate-spin duration-150 text-accent' />
                    ) : (
                        <>
                            {product?.offer_type === "for_sale" ? (
                                <div className=' flex flex-row gap-2 w-full sm:w-2/3 '>
                                    <BuyBorrowBtn
                                        label='Buy'
                                        handleClick={handleClick}
                                        disabled={hasUserPurchased}
                                        isLoading={isLoading}
                                    />
                                    {hasUserPurchased ? (
                                        <div className='font-lato text-md font-semibold'>
                                            Check your{" "}
                                            <Link
                                                className='underline text-accent'
                                                href='/dashboard'
                                            >
                                                Dashboard
                                            </Link>
                                        </div>
                                    ) : (
                                        <p className='font-lato text-lg font-semibold'>
                                            ${product?.sale_offer?.price}
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className='flex flex-row gap-2 sm:gap-0 w-full sm:w-2/3 mt-2'>
                                    <BuyBorrowBtn
                                        label='Borrow'
                                        handleClick={handleClick}
                                        disabled={hasUserBorrowed}
                                        isLoading={isLoading}
                                    />
                                    {hasUserBorrowed ? (
                                        <div className='font-lato text-md font-semibold'>
                                            Check your{" "}
                                            <Link
                                                className='underline text-accent'
                                                href='/dashboard'
                                            >
                                                Dashboard
                                            </Link>
                                        </div>
                                    ) : (
                                        <p className='font-lato text-lg font-semibold '>
                                            ${product?.borrow_offer?.price}
                                            <span className='text-[#55585B] text-sm font-thin font-jost pl-2'>
                                                per day
                                            </span>
                                        </p>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div className=' w-full flex mt-8 gap-2'>
                    <p className=' text-sm sm:text-base text-[#3A3A3A] font-semibold '>
                        {t("Category:")}
                    </p>
                    <Link
                        href={`/products?category=${product?.categories?.category_name}`}
                        className='font-normal text-[#72AEC8] underline hover:text-[#45adda] text-sm sm:text-base transform hover:scale-105 transition-transform duration-300 ease-in-out'
                    >
                        {product?.categories?.category_name}
                    </Link>
                </div>
                <ContactDetails user={user} />
            </div>
        </section>
    );
}

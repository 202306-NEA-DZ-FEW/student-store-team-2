"use client";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

const HowItWorks = () => {
    const t = useTranslations("Index");
    return (
        <div className='px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 font-lato '>
            <div className='grid gap-6 row-gap-10 lg:grid-cols-2'>
                <div className='lg:py-6 lg:pr-16'>
                    <div className='flex'>
                        <div className='flex flex-col items-center mr-4'>
                            <div>
                                <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                                    <svg
                                        className='w-4 text-gray-600'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        viewBox='0 0 24 24'
                                    >
                                        <line
                                            fill='none'
                                            strokeMiterlimit='10'
                                            x1='12'
                                            y1='2'
                                            x2='12'
                                            y2='22'
                                        />
                                        <polyline
                                            fill='none'
                                            strokeMiterlimit='10'
                                            points='19,15 12,22 5,15'
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className='w-px h-full bg-gray-300' />
                        </div>
                        <div className='pt-1 pb-8'>
                            <Link
                                href='/sign-up'
                                className='mb-2 text-lg font-bold hover:text-accent'
                            >
                                {t("Sign Up")}
                            </Link>
                            <p className='text-gray-700'>
                                {t(
                                    "Register and unlock access to our diverse collection of items available for borrowing or purchase It only takes a few moments to create your account"
                                )}
                            </p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col items-center mr-4'>
                            <div>
                                <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                                    <svg
                                        className='w-4 text-gray-600'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        viewBox='0 0 24 24'
                                    >
                                        <line
                                            fill='none'
                                            strokeMiterlimit='10'
                                            x1='12'
                                            y1='2'
                                            x2='12'
                                            y2='22'
                                        />
                                        <polyline
                                            fill='none'
                                            strokeMiterlimit='10'
                                            points='19,15 12,22 5,15'
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className='w-px h-full bg-gray-300' />
                        </div>
                        <div className='pt-1 pb-8'>
                            <Link
                                href='/products?page=1'
                                className='mb-2 text-lg font-bold hover:text-accent'
                            >
                                {t("Browse & Choose")}
                            </Link>
                            <p className='text-gray-700'>
                                {t(
                                    "Explore our extensive range of products Whether it's books, electronics, furniture, gaming gear, or everyday essentials, take your time to browse through our offerings Once you find what you need, add it to your cart"
                                )}
                            </p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col items-center mr-4'>
                            <div>
                                <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                                    <svg
                                        className='w-4 text-gray-600'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        viewBox='0 0 24 24'
                                    >
                                        <line
                                            fill='none'
                                            strokeMiterlimit='10'
                                            x1='12'
                                            y1='2'
                                            x2='12'
                                            y2='22'
                                        />
                                        <polyline
                                            fill='none'
                                            strokeMiterlimit='10'
                                            points='19,15 12,22 5,15'
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className='w-px h-full bg-gray-300' />
                        </div>
                        <div className='pt-1 pb-8'>
                            <Link
                                href='/dashboard'
                                className='mb-2 text-lg font-bold hover:text-accent'
                            >
                                {t("Connect with Sellers")}
                            </Link>
                            <p className='text-gray-700'>
                                {t(
                                    "Contact the sellers directly to discuss details, ask questions, and negotiate the deal This step ensures you get all the information you need before finalizing your purchase or borrowing arrangement"
                                )}
                            </p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col items-center mr-4'>
                            <div>
                                <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                                    <svg
                                        className='w-4 text-gray-600'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        viewBox='0 0 24 24'
                                    >
                                        <line
                                            fill='none'
                                            strokeMiterlimit='10'
                                            x1='12'
                                            y1='2'
                                            x2='12'
                                            y2='22'
                                        />
                                        <polyline
                                            fill='none'
                                            strokeMiterlimit='10'
                                            points='19,15 12,22 5,15'
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className='w-px h-full bg-gray-300' />
                        </div>
                        <div className='pt-1 pb-8'>
                            <Link
                                href='/dashboard'
                                className='mb-2 text-lg font-bold hover:text-accent'
                            >
                                {t("Confirm Purchase")}
                            </Link>
                            <p className='text-gray-700'>
                                {t(
                                    "Once you've settled all the details and agreed with the seller, confirm your purchase or borrowing Make the payment or arrange the pickup/delivery, and you're all set to enjoy your new item!"
                                )}
                            </p>
                        </div>
                    </div>
                    <div className='flex'>
                        <div className='flex flex-col items-center mr-4'>
                            <div>
                                <div className='flex items-center justify-center w-10 h-10 border rounded-full'>
                                    <svg
                                        className='w-6 text-gray-600'
                                        stroke='currentColor'
                                        viewBox='0 0 24 24'
                                    >
                                        <polyline
                                            fill='none'
                                            strokeWidth='2'
                                            strokeLinecap='round'
                                            strokeLinejoin='round'
                                            strokeMiterlimit='10'
                                            points='6,12 10,16 18,8'
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className='pt-1'>
                            <p className='mb-2 text-lg font-bold'>
                                {t("Enjoy!")}
                            </p>
                            <p className='text-gray-700' />
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <Image
                        height={500}
                        width={500}
                        className='inset-0 object-cover object-bottom w-full rounded shadow-lg h-64 lg:absolute lg:h-full'
                        src='https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?q=80&w=1260&h=750&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        alt=''
                    />
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;

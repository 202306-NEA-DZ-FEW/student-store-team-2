"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

const SecurityForm = () => {
    const t = useTranslations("Index");

    return (
        <div className='flex'>
            <div className='w-1/4 font-lato font-semibold text-xl  bg-bkg text-titleContent p-4'>
                <Link
                    href='/profile?page=form'
                    className='flex justify-center items-center mb-4  hover:bg-accent hover:text-bkg h-20'
                >
                    {t("PROFILE")}
                </Link>

                <Link
                    href='/profile?page=security'
                    className='flex justify-center items-center mb-4  hover:bg-accent hover:text-bkg h-20 '
                >
                    {t("SECURITY")}
                </Link>
            </div>
            <form className='w-3/4 bg-[rgb(237,241,243)]  mx-auto p-4  rounded-lg font-lato'>
                <h1 className='font-lato tracking-wider text-title text-2xl text-center pr-96  mr-80 uppercase  text-titleContent'>
                    {t("SECURITY")}
                </h1>

                <h1 className='font-lato  text-titleContent sm:text-l ml-10  font-bold uppercase mb-4 mt-2'>
                    {t("Change Email")}
                </h1>
                <div className='mb-4'>
                    <input
                        type='email'
                        placeholder={t("Change Email")}
                        id='email'
                        name='email'
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>
                <div className='mb-4 grid gap-4 '>
                    <h1 className='font-lato  text-titleContent sm:text-l ml-10  font-bold uppercase mb-4 mt-2'>
                        {t("Change Password")}
                    </h1>
                    <div className='mb-4'>
                        <input
                            type='password'
                            placeholder={t("New Password")}
                            id='password'
                            name='password'
                            className='w-full border border-gray-300 p-2 rounded-md'
                        />
                    </div>

                    <div className='mb-4'>
                        <input
                            type='password'
                            placeholder={t("Confirm New Password")}
                            id='password'
                            name='password'
                            className='w-full border border-gray-300 p-2 rounded-md'
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SecurityForm;

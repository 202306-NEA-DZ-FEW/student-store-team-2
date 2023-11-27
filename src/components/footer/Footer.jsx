"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { PiInstagramLogo } from "react-icons/pi";

import useTextDirection from "@/hooks/useTextDirection";

import LanguageChanger from "../languageChanger/LanguageChanger";

function Footer() {
    const t = useTranslations("Index");
    const pathname = usePathname();
    const direction = useTextDirection();
    if (pathname === "/dashboard" || pathname === "/en/dashboard") {
        return null;
    }
    return (
        <footer className='hidden sm:block relative pt-8 pb-6 '>
            <div className='container mx-auto px-4'>
                <div
                    className={`flex ${
                        direction === "rtl"
                            ? "text-right lg:text-right"
                            : "text-left lg:text-left"
                    }`}
                >
                    <LanguageChanger />

                    <div className='w-full lg:w-6/12 px-4'>
                        <h4 className='text-3xl fonat-semibold text-accent'>
                            {t("Contact Us")}
                        </h4>

                        <div className='mt-6 lg:mb-0 mb-6'>
                            <button type='button'>
                                <PiInstagramLogo className='bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2  ' />
                            </button>
                            <button type='button'>
                                <FaFacebook className='bg-white text-blue-900 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 ' />
                            </button>
                            <button type='button'>
                                <FaLinkedin className='bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 ' />{" "}
                            </button>
                            <button type='button'>
                                <FaGithub className='bg-white text-black shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 ' />
                            </button>
                        </div>
                    </div>

                    <div className='w-full lg:w-6/12 px-4'>
                        <div className='flex flex-wrap items-top '>
                            <div className='w-full lg:w-4/12 px-4 ml-auto'>
                                <span className='block uppercase text-blueGray-500 text-sm font-semibold mb-2'>
                                    {t("Quick Links")}
                                </span>
                                <ul className='list-unstyled'>
                                    <li>
                                        <Link
                                            className='text-titleContent hover:text-accent font-semibold block pb-2 text-sm'
                                            href='/'
                                        >
                                            {t("Home")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className='text-titleContent hover:text-accent font-semibold block pb-2 text-sm'
                                            href='/products?page=1'
                                        >
                                            {t("Products")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className='text-titleContent hover:text-accent font-semibold block pb-2 text-sm'
                                            href='/donate'
                                        >
                                            {t("Donate")}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className='w-full lg:w-4/12 px-4'>
                                <span className='block uppercase text-blueGray-500 text-sm font-semibold mb-2'>
                                    {t("About LACITÉ")}
                                </span>
                                <ul className='list-unstyled'>
                                    <li>
                                        <Link
                                            href='https://github.com/202306-NEA-DZ-FEW/student-store-team-2'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            className='text-titleContent hover:text-accent font-semibold block pb-2 text-sm'
                                        >
                                            {t("Github Project Link")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className='text-titleContent hover:text-accent font-semibold block pb-2 text-sm'
                                            href='/#how-it-works'
                                        >
                                            {t("How It Works")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className='text-titleContent hover:text-accent font-semibold block pb-2 text-sm'
                                            href='/about'
                                        >
                                            {t("About Us")}
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='border-titleCOtext-titleContent' />
            </div>
        </footer>
    );
}

export default Footer;

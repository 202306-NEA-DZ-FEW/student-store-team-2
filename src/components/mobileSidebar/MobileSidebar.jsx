import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { BiCollapseAlt } from "react-icons/bi";
import { CiLogin, CiLogout } from "react-icons/ci";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { PiInstagramLogo } from "react-icons/pi";

import { signOut } from "@/lib/_supabaseAuth";
import useTextDirection from "@/hooks/useTextDirection";

import LanguageChanger from "../languageChanger/LanguageChanger";
import { useUser } from "../userProvider/UserProvider";

export default function MobileSidebar({ toggleMobileMenu, isOpen }) {
    const t = useTranslations("Index");
    const direction = useTextDirection();

    const { user, userData, loading } = useUser();

    const handleSignOutUser = async () => {
        await signOut();

        window.location.href = "/";
    };

    return (
        <div className=' transition  animate-wiggle font-lato w-screen h-screen'>
            <div className='relative flex h-16 items-center justify-between text-titleContent'>
                {/* Welcome Message */}
                <div className='flex items-center ml-4'>
                    {user && (
                        <>
                            <Image
                                src={userData.avatar_url}
                                alt='Profile'
                                className='w-8 h-8 rounded-full'
                                width={50}
                                height={50}
                            />
                            <p className='ml-2 text-xl font-medium'>
                                {t("Welcome")} ,{userData.full_name}
                            </p>
                            <hr className=' border-gray-300 mx-4' />
                        </>
                    )}
                </div>
                {/* Toggle Button */}
                <div
                    className={`absolute inset-y-0 flex items-center sm:hidden ${
                        direction === "ltr" ? "right-0" : "left-0"
                    }`}
                >
                    <button
                        onClick={toggleMobileMenu}
                        className={`absolute ${
                            direction === "ltr" ? "right-0" : "left-0"
                        } items-center justify-center rounded-md p-2 hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                    >
                        <BiCollapseAlt
                            className='block h-8 w-8'
                            aria-hidden='true'
                        />
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            {user ? (
                <div className='space-y-1 mt-5 px-2 pt-2 pb-3 flex flex-col justify-start'>
                    <Link href='/profile?page=form'>
                        <div
                            className='hover:bg-accent hover:text-white rounded-md px-3 py-2 text-xl font-medium tracking-widest'
                            onClick={toggleMobileMenu}
                        >
                            <IoSettingsSharp className='inline-block mr-4 h-6 w-6 text-accent' />
                            {t("Profile")}
                        </div>
                    </Link>
                    <Link href='/profile?page=security'>
                        <div
                            className='hover:bg-accent hover:text-white rounded-md px-3 py-2 text-xl font-medium tracking-widest'
                            onClick={toggleMobileMenu}
                        >
                            <MdAdminPanelSettings className='inline-block mr-4 h-6 w-6 text-accent' />
                            {t("Security")}
                        </div>
                    </Link>

                    {/* Logout Button */}
                    <div
                        onClick={handleSignOutUser}
                        className='rounded-md px-3 py-2 text-xl font-medium tracking-widest flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600 text-red-600'
                    >
                        <CiLogout className='inline-block mr-4 h-6 w-6' />

                        {t("Logout")}
                    </div>
                </div>
            ) : (
                <div className='space-y-1 mt-5 px-2 pt-2 pb-3 flex flex-col justify-start'>
                    <Link
                        href='/sign-in'
                        onClick={toggleMobileMenu}
                        className='hover:bg-accent hover:text-white rounded-md
                        px-3 py-2 text-xl font-medium tracking-widest'
                    >
                        <CiLogin className='inline-block mr-4 h-6 w-6' />
                        {t("Log In")}
                    </Link>
                </div>
            )}

            <hr className='mt-3 border-gray-300 mx-4' />

            {/*Other Links */}
            <div className='space-y-1 px-2 pt-2 pb-3 flex flex-col justify-start '>
                <div className='w-full lg:w-4/12 ml-auto px-3 py-2 text-md font-medium tracking-widest '>
                    <span className='block uppercase   font-semibold mb-2'>
                        {t("Quick Links")}
                    </span>
                    <ul className='list-unstyled'>
                        <li>
                            <Link
                                className='text-titleContent hover:text-accent font-semibold block pb-2 '
                                href='/'
                            >
                                {t("Home")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='text-titleContent hover:text-accent font-semibold block pb-2 '
                                href='/products?page=1'
                            >
                                {t("Products")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                className='text-titleContent hover:text-accent font-semibold block pb-2 '
                                href='/donate'
                            >
                                {t("Donate")}
                            </Link>
                        </li>
                    </ul>
                    <span className='block uppercase   font-semibold mb-2'>
                        {t("About LACITÉ")}
                    </span>
                    <ul className='list-unstyled'>
                        <li>
                            <Link
                                onClick={toggleMobileMenu}
                                href='https://github.com/202306-NEA-DZ-FEW/student-store-team-2'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='text-titleContent hover:text-accent font-semibold block pb-2 '
                            >
                                {t("Github Project Link")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={toggleMobileMenu}
                                className='text-titleContent hover:text-accent font-semibold block pb-2 '
                                href='/#how-it-works'
                            >
                                {t("How It Works")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                onClick={toggleMobileMenu}
                                className='text-titleContent hover:text-accent font-semibold block pb-2 '
                                href='/about'
                            >
                                {t("About Us")}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Footer Links */}
            <div className='mt-auto px-2 pb-3'>
                <div
                    className={`flex flex-col ${
                        direction === "rtl"
                            ? "text-right lg:text-right"
                            : "text-left lg:text-left"
                    }`}
                >
                    <LanguageChanger />
                </div>
            </div>
            <div className='w-full flex  justify-center items-end'>
                <Link
                    type='button'
                    href='https://www.instagram.com/recodedofficial/'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <PiInstagramLogo className='bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2  ' />
                </Link>
                <Link
                    type='button'
                    href='https://www.facebook.com/recodedofficial/'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <FaFacebook className='bg-white text-blue-900 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 ' />
                </Link>
                <Link
                    type='button'
                    href='https://www.linkedin.com/school/re-coded/'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <FaLinkedin className='bg-white text-blue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 ' />{" "}
                </Link>
                <Link
                    type='button'
                    href='https://github.com/202306-NEA-DZ-FEW/'
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    <FaGithub className='bg-white text-black shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2 ' />
                </Link>
            </div>
        </div>
    );
}

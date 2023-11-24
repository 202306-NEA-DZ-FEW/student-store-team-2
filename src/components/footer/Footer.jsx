"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { FaFacebook, FaLinkedin } from "react-icons/fa";

import LanguageChanger from "../languageChanger/LanguageChanger";

function Footer() {
    const t = useTranslations("Index");
    const pathname = usePathname();

    return (
        <footer
            className={`relative mt-auto border-t w-full flex flex-col items-center justify-center text-base sm:flex-col sm:justify-between sm:text-sm sm:flex-wrap sm:p-4 sm:text-left  ${
                pathname === "/dashboard" || pathname === "/en/dashboard"
                    ? "hidden"
                    : ""
            } `}
        >
            <div className='flex justify-between items-baseline w-full h-24 my-6'>
                <Link href='/'>
                    <button className='font-bold text-3xl tracking-wide sm:hover:tracking-widest transform-all ease-in-out duration-500 font-mono text-black ml-5'>
                        {t("Title")}
                    </button>
                </Link>
                {/* <p className='my-10 text-content sm:text-base'>
                    {t("Description")}
                </p> */}
                <LanguageChanger />
            </div>

            <div className='flex flex-col sm:flex-row sm:items-baseline sm:justify-evenly items-center justify-center w-full md:mb-10'>
                <div className='flex items-start sm:items-center sm:justify-center flex-col uppercase w-1/2 sm:w-1/3 mb-3'>
                    <p className=' font-semibold text-sm sm:text-base text-titleContent tracking-wider py-1'>
                        {t("Contact Us")}
                    </p>
                    <div className='flex flex-col sm:flex-row '>
                        <div className='py-1 sm:px-1'>
                            <Link
                                href='https://www.instagram.com/recodedofficial/'
                                className='flex flex-row items-center hover:text-accent '
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    x='0px'
                                    y='0px'
                                    width='33'
                                    height='33'
                                    viewBox='0 0 48 48'
                                >
                                    <radialGradient
                                        id='yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1'
                                        cx='19.38'
                                        cy='42.035'
                                        r='44.899'
                                        gradientUnits='userSpaceOnUse'
                                    >
                                        <stop
                                            offset='0'
                                            stopColor='#fd5'
                                        ></stop>
                                        <stop
                                            offset='.328'
                                            stopColor='#ff543f'
                                        ></stop>
                                        <stop
                                            offset='.348'
                                            stopColor='#fc5245'
                                        ></stop>
                                        <stop
                                            offset='.504'
                                            stopColor='#e64771'
                                        ></stop>
                                        <stop
                                            offset='.643'
                                            stopColor='#d53e91'
                                        ></stop>
                                        <stop
                                            offset='.761'
                                            stopColor='#cc39a4'
                                        ></stop>
                                        <stop
                                            offset='.841'
                                            stopColor='#c837ab'
                                        ></stop>
                                    </radialGradient>
                                    <path
                                        fill='url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)'
                                        d='M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z'
                                    ></path>
                                    <radialGradient
                                        id='yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2'
                                        cx='11.786'
                                        cy='5.54'
                                        r='29.813'
                                        gradientTransform='matrix(1 0 0 .6663 0 1.849)'
                                        gradientUnits='userSpaceOnUse'
                                    >
                                        <stop
                                            offset='0'
                                            stopColor='#4168c9'
                                        ></stop>
                                        <stop
                                            offset='.999'
                                            stopColor='#4168c9'
                                            stopOpacity='0'
                                        ></stop>
                                    </radialGradient>
                                    <path
                                        fill='url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)'
                                        d='M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z'
                                    ></path>
                                    <path
                                        fill='#fff'
                                        d='M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z'
                                    ></path>
                                    <circle
                                        cx='31.5'
                                        cy='16.5'
                                        r='1.5'
                                        fill='#fff'
                                    ></circle>
                                    <path
                                        fill='#fff'
                                        d='M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z'
                                    ></path>
                                </svg>
                            </Link>
                        </div>
                        <div className='py-1 sm:px-1'>
                            <Link
                                href='https://www.linkedin.com/school/re-coded/'
                                className='flex flex-row items-center hover:text-accent '
                            >
                                <FaLinkedin className='text-3xl text-blue-500' />
                            </Link>
                        </div>
                        <div className='py-1 sm:px-1'>
                            <Link
                                href='https://www.facebook.com/recodedofficial/'
                                className='flex flex-row items-center hover:text-accent '
                            >
                                <FaFacebook className='text-3xl text-blue-700' />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='flex items-start sm:items-center sm:justify-center flex-col uppercase w-1/2 sm:w-1/3 mb-3'>
                    <p className='font-semibold text-sm sm:text-base text-titleContent tracking-wider pl-1'>
                        {t("Quick Links")}
                    </p>

                    <Link
                        href='/'
                        className='py-1 pl-2 mt-1  no-underline hover:text-accent'
                    >
                        <p className='text-sm sm:text-base'>{t("Home")}</p>
                    </Link>
                    <Link
                        href='/products?page=1'
                        className='py-1 pl-2  no-underline hover:text-accent'
                    >
                        <p className='text-sm sm:text-base'>{t("Products")}</p>
                    </Link>
                    <Link
                        href='/donate?page=1'
                        className='py-1 pl-2 no-underline hover:text-accent'
                    >
                        <p className='text-sm sm:text-base'>{t("Donate")}</p>
                    </Link>
                </div>

                <div className='flex items-start sm:items-center sm:justify-center flex-col uppercase  w-1/2 sm:w-1/3 mb-3'>
                    <p className='font-semibold text-sm sm:text-base text-titleContent tracking-wide py-1 pl-1'>
                        {t("About LACITÉ")}
                    </p>
                    <Link
                        href='/about-us'
                        className='py-1 pl-2 no-underline hover:text-accent'
                    >
                        <p className='text-sm sm:text-base'>{t("About Us")}</p>
                    </Link>
                    <Link
                        href='/#how-it-works'
                        className='py-1 pl-2 no-underline hover:text-accent'
                    >
                        <p className='text-sm sm:text-base'>
                            {t("How It Works")}
                        </p>
                    </Link>
                    <Link
                        href='https://github.com/202306-NEA-DZ-FEW/student-store-team-2'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='py-1 pl-2 no-underline font-semibold hover:text-accent'
                    >
                        <p className='text-sm sm:text-base'>
                            {t("Github Project Link")}
                        </p>
                    </Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

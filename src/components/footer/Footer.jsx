//import Logo from "../Nav/Logo"
import Link from "next/link";

function Footer() {
    return (
        <footer className='h-1/5 w-full mx-auto'>
            <div className='flex lg:flex-col flex-row lg:justify-between justify-center'>
                <div className='sb_footer section_padding p-10'>
                    <div className='flex justify-around items-start flex-col md:flex-row md:flex-wrap w-full text-left mb-8'>
                        <div className='w-40 m-4 flex justify-start flex-col'>
                            <Link href='/'>
                                <button className='font-bold text-3xl sm:text-base tracking-wide md:hover:tracking-widest transform-all ease-in-out duration-500 font-mono text-black z-50 '>
                                    <span className=' tracking-white mb-5'>
                                        Mini
                                    </span>
                                    Store
                                </button>
                            </Link>
                            <p className='mt-10 text-content sm:text-base'>
                                This platform is a win-win for everyone involved
                                , lenders earn extra income, borrowers cut
                                costs.
                            </p>
                        </div>

                        {/* Created by */}

                        <div className='w-30  flex justify-start flex-col'>
                            <p className='font-semibold tracking-wider py-1 my-1'>
                                CONTACT US
                            </p>

                            <Link
                                href='https://github.com/0m3ga13'
                                className='flex flex-row items-center mt-3   hover:text-accent dark:hover:text-white'
                            >
                                <svg
                                    className='w-4 h-4 mx-2'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                                        clipRule='evenodd'
                                    />
                                </svg>

                                <span className='sr-only'>GitHub account</span>
                                <p className='py-1'>BARKA Oussama</p>
                            </Link>

                            <Link
                                href='https://github.com/Emybel'
                                className='flex flex-row items-center   hover:text-accent dark:hover:text-white'
                            >
                                <svg
                                    className='w-4 h-4 mx-2'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                                        clipRule='evenodd'
                                    />
                                </svg>

                                <span className='sr-only'>GitHub account</span>
                                <p>Imane BELAID</p>
                            </Link>

                            <Link
                                href='https://github.com/medshk'
                                className='flex flex-row items-center  hover:text-accent dark:hover:text-white'
                            >
                                <svg
                                    className='w-4 h-4 mx-2'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                                        clipRule='evenodd'
                                    />
                                </svg>

                                <span className='sr-only'>GitHub account</span>
                                <p className='py-1'>Mohammed Bennaceur</p>
                            </Link>

                            <Link
                                href='https://github.com/Bolphunga'
                                className='flex flex-row items-center  hover:text-accent dark:hover:text-white'
                            >
                                <svg
                                    className='w-4 h-4 mx-2'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                                        clipRule='evenodd'
                                    />
                                </svg>

                                <span className='sr-only'>GitHub account</span>
                                <p className='py-1'>Ahmed Djebnoune</p>
                            </Link>

                            <Link
                                href='https://github.com/samiraTbl'
                                className='flex flex-row items-center  hover:text-accent dark:hover:text-white'
                            >
                                <svg
                                    className='w-4 h-4 mx-2'
                                    aria-hidden='true'
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='currentColor'
                                    viewBox='0 0 20 20'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z'
                                        clipRule='evenodd'
                                    />
                                </svg>

                                <span className='sr-only'>GitHub account</span>
                                <p>Samira TOUBAL SEGHIR</p>
                            </Link>
                        </div>

                        {/* Our Products */}

                        <div className='w-40 flex justify-start flex-col uppercase tracking-wide '>
                            <p className='font-semibold tracking-wider py-1'>
                                Quick links
                            </p>

                            <Link
                                href='#'
                                className='py-2 mt-3  no-underline hover:text-accent'
                            >
                                <p>Home</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2  no-underline hover:text-accent'
                            >
                                <p>Furniture</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2  no-underline hover:text-accent'
                            >
                                <p>Clothes</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2  no-underline hover:text-accent'
                            >
                                <p>Electronics</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2  no-underline hover:text-accent'
                            >
                                <p>gaming</p>
                            </Link>
                        </div>
                        <div className='w-40  flex justify-start flex-col'>
                            <p className='font-semibold tracking-wider  tracking-wide'>
                                HELP AND INFO
                            </p>
                            <Link
                                href='#'
                                className='py-2  no-underline hover:text-accent'
                            >
                                <p>TRACK YOUR ORDER</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2  no-underline hover:text-accent'
                            >
                                <p>RETURNS POLICIES</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2  no-underline hover:text-accent'
                            >
                                <p>SHIPPING + DELIVERY</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2  no-underline hover:text-accent'
                            >
                                <p>FAQS</p>
                            </Link>
                        </div>

                        <div className='w-40  flex justify-start flex-col uppercase'>
                            <p className='font-semibold tracking-wider py-1 tracking-wide'>
                                ABOUT STUDENT STORE
                            </p>
                            <Link
                                href='#'
                                className='py-2 no-underline hover:text-accent'
                            >
                                <p>ABOUT US</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2 no-underline hover:text-accent'
                            >
                                <p>HOW IT WORKS!</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2 no-underline hover:text-accent'
                            >
                                <p>Terms of Use</p>
                            </Link>
                            <Link
                                href='#'
                                className='py-2  no-underline hover:text-accent'
                            >
                                <p>Privacy Policy</p>
                            </Link>
                        </div>
                    </div>
                    <hr className=' w-full py-2'></hr>

                    <div className='text-sm text-content sm:text-base sm:text-center  flex justify-around items-start flex-col  md:flex-row'>
                        <div className='sb_footer-copyright text-lg tracking-wider font- text-[13px] leading-[15px]  '>
                            <p>
                                we ship with:
                                <a
                                    href='https://www.dhl.com/dz-fr/home.html'
                                    className='icon-link'
                                >
                                    <img
                                        src='/img/dhl.png'
                                        alt='dhl icon'
                                        className='icon'
                                        style={{ display: "inline" }}
                                    />
                                </a>
                                <a
                                    href='https://yalidine.com/'
                                    className='icon-link'
                                >
                                    <img
                                        src='/img/yalidine.png'
                                        className='icon'
                                        alt='yalidine icon'
                                        style={{ display: "inline" }}
                                    />
                                </a>
                            </p>
                        </div>

                        <div className='sb_footer-copyright text-lg tracking-wider font- text-[13px] leading-[15px] pt-7  '>
                            <p>
                                @ Copyright {new Date().getFullYear()}{" "}
                                StudentStore.
                            </p>
                        </div>
                        <div className='sb_footer-below-links flex flex-row justify-between mx-4 text-[13px] leading-[15px] ml-8  font-semibold'></div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;

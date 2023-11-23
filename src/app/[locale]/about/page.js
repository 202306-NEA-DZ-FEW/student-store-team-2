"use client";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import React from "react";
import { useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { FaBook, FaGithub, FaLinkedin, FaPen } from "react-icons/fa";
import { FaHandsHoldingChild } from "react-icons/fa6";
import { PiStudent } from "react-icons/pi";
import { RiArchiveDrawerLine } from "react-icons/ri";
import {
    SiElectron,
    SiNextdotjs,
    SiSupabase,
    SiTailwindcss,
} from "react-icons/si";

const Page = () => {
    const t = useTranslations("Index");

    useEffect(() => {
        const sections = document.querySelectorAll("section");
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                const sectionMiddle =
                    sectionTop + sectionHeight / 2 - windowHeight / 2;

                if (
                    scrollPosition >= sectionMiddle &&
                    scrollPosition <
                        sectionTop + sectionHeight - windowHeight / 2
                ) {
                    window.scrollTo({
                        top: sectionTop,
                        behavior: "smooth",
                    });
                }
            });

            // Handling the last section to prevent going back when reaching the bottom
            const lastSection = sections[sections.length - 1];
            const lastSectionTop = lastSection.offsetTop;

            if (scrollPosition + windowHeight >= documentHeight) {
                window.scrollTo({
                    top:
                        lastSectionTop +
                        lastSection.clientHeight -
                        windowHeight,
                    behavior: "smooth",
                });
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const team = [
        {
            name: "Barka Oussama",
            role: "Frontend Developer",
            image: "https://media.licdn.com/dms/image/D4E03AQECYNARlTXn0Q/profile-displayphoto-shrink_800_800/0/1690369690364?e=1706140800&v=beta&t=b4btPi9rawBadKIap-uXm4J7cuVF1LM_lbEwUCtoZuc",
            links: [
                { name: "GitHub", url: "https://github.com/0m3ga13/" },
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/oussama13/",
                },
            ],
        },
        {
            name: "Bennaceur Mohamed ",
            role: "Frontend Developer",
            image: "https://media.licdn.com/dms/image/D4E03AQHSvt5iYw3jtA/profile-displayphoto-shrink_800_800/0/1696537318993?e=1706140800&v=beta&t=7KTqUSjvV6ujN1wrJJ9R4_lf7lVg1Vz79QCJDLUUbz8",
            links: [
                { name: "GitHub", url: "https://github.com/medshk" },
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/mohammed-bennaceur-571b89194/",
                },
            ],
        },
        {
            name: "Djebnoune Ahmed ",
            role: "Frontend Developer",
            image: "",
            links: [
                { name: "GitHub", url: "https://github.com/Bolphunga" },
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/aymendj/",
                },
            ],
        },
        {
            name: "Belaid Eman ",
            role: "Frontend Developer",
            image: "https://media.licdn.com/dms/image/D4E03AQHqEZgfvKKkFw/profile-displayphoto-shrink_200_200/0/1687532888232?e=1706140800&v=beta&t=jcjNpxzHgqoBQDxI45tQE2po0JdF0XwdIM1yEEzw9N8",
            links: [
                { name: "GitHub", url: "https://github.com/Emybel" },
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/imene-belaid/",
                },
            ],
        },
        {
            name: " Toubal Seghir samira",
            role: "Frontend Developer",
            image: "",
            links: [
                { name: "GitHub", url: "https://github.com/samiraTbl" },
                {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/samira-toubal-seghir-a45524297/",
                },
            ],
        },
    ];

    return (
        <div>
            <Head>
                <title>Welcome to LaCité</title>

                {/* Description */}
                <meta
                    name='description'
                    content="Your one-stop destination for all your academic needs! Whether it's textbooks, calculators, lab equipment, or selling items you no longer need, find it all here."
                />

                {/* Keywords */}
                <meta
                    name='keywords'
                    content='Student Store, textbooks, calculators, lab equipment, academic supplies, buy textbooks, sell calculators, borrow lab equipment, student borrow, student buy, buy items, buy and borrow, student items, borrow, algeria student, algerian university store, mathematics, physics, chemistry, biology, scholarship resources, study guides, educational discounts, student discounts, extracurricular supplies, university essentials'
                />

                {/* Author(s) */}
                <meta
                    name='author'
                    content='Barka Oussama, Bennaceur Mohamed, Djebnoune Ahmed, Belaid Eman, Toubal Seghir Samira'
                />

                {/* Define other metadata fields as needed */}
                {/* For example: Open Graph tags */}
                <meta
                    property='og:title'
                    content='Welcome to Our Student Store'
                />
                <meta
                    property='og:description'
                    content='Your one-stop destination for all your academic needs! Explore, buy, sell, or borrow items for your academic journey.'
                />
            </Head>

            <div className='container my-24 mx-auto md:'>
                <div className=' flex justify-center items-center border rounded-xl border-accent2/50 py-2 px-8 '>
                    <div className='text-center'>
                        <h1 className='text-4xl font-bold mb-4'>
                            {t("Welcome to Our Student Store")}
                        </h1>
                        <p className='text-lg mb-8'>
                            {t(
                                "Your one-stop destination for all your academic needs!"
                            )}
                        </p>
                        <p className='text-gray-600'>
                            {t(
                                "Whether you're searching for textbooks, calculators, lab equipment, or even selling items you no longer need, we've got you covered Our store offers a variety of options to buy, sell, and even borrow items, ensuring you have access to the materials you need for your academic journey"
                            )}
                        </p>
                    </div>
                </div>
                <section className='mb-16' id='section2'>
                    <style>
                        {`@media (min-width: 992px) {
              .rotate-lg-6 {
                transform: rotate(6deg);
              }
            }`}
                    </style>

                    <div className='py-12 md: '>
                        <div className='container mx-auto xl:px-32'>
                            <div className=' grid items-center lg:grid-cols-2'>
                                <div className='mb-12 md:mt-12 lg:mt-0 lg:mb-0'>
                                    <div className='relative z-[1] block rounded-lg bg-[hsla(0,0%,100%,0.55)]  py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[25px] dark:bg-[hsla(0,0%,5%,0.55)] dark:shadow-black/20  lg:-mr-14'>
                                        <h2 className='mb-6 text-3xl font-bold'>
                                            {t("Why Choose LaCité?")}
                                        </h2>

                                        <p className='mb-8 text-neutral-500 dark:text-neutral-300'>
                                            {t(
                                                "Our student store stands out for its diverse range of resources and services Whether you're looking to buy or sell textbooks, scientific equipment, or other academic necessities, we've created a platform that caters specifically to students' needs; Our commitment to providing a seamless experience ensures that you can easily find what you're looking for and even explore options to borrow items you may need temporarily; We prioritize your academic success by offering convenience and accessibility at every step"
                                            )}
                                        </p>
                                        <div className='grid gap-x-6 md:grid-cols-3 lg:grid-cols-2'>
                                            <div className='mb-6'>
                                                <p className='flex items-center'>
                                                    <FaBook className='mr-3 h-5 w-5' />
                                                    {t("Textbooks")}
                                                </p>
                                            </div>

                                            <div className='mb-6'>
                                                <p className='flex items-center'>
                                                    <FaPen className='mr-3 h-5 w-5' />
                                                    {t("Stationery")}
                                                </p>
                                            </div>

                                            <div className='mb-6'>
                                                <p className='flex items-center'>
                                                    <RiArchiveDrawerLine className='mr-3 h-5 w-5' />
                                                    {t("Art Supplies")}
                                                </p>
                                            </div>

                                            <div className='mb-6'>
                                                <p className='flex items-center'>
                                                    <SiElectron className='mr-3 h-5 w-5' />
                                                    {t("Electronics")}
                                                </p>
                                            </div>

                                            <div className='mb-6'>
                                                <p className='flex items-center'>
                                                    <PiStudent className='mr-3 h-5 w-5' />
                                                    {t("Study Guides")}
                                                </p>
                                            </div>

                                            <Link
                                                href='/products?page=1'
                                                className='mb-6'
                                            >
                                                <p className='flex items-center hover:underline hover:text-accent'>
                                                    <BiPlus className='mr-3 h-5 w-5' />
                                                    {t("And More")}
                                                </p>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='md:mb-12 lg:mb-0 h-screen'>
                                    <Image
                                        src='https://images.unsplash.com/photo-1568301856220-8d0dc08a6d48?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                        className='rotate-lg-6 w-full rounded-lg shadow-lg'
                                        alt=''
                                        height={500}
                                        width={500}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='mb-16'>
                    <div className='flex flex-wrap'>
                        <div className='w-full shrink-0 grow-0 basis-auto lg:mb-0 lg:w-5/12'>
                            <div className='flex lg:py-12'>
                                <Image
                                    src='https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                                    className='w-full rounded-lg shadow-lg dark:shadow-black/20 lg:ml-[50px] z-[10]'
                                    alt='image'
                                    height={500}
                                    width={500}
                                />
                            </div>
                        </div>
                        <div className='w-full shrink-0 grow-0 basis-auto lg:w-7/12'>
                            <div className='flex h-full items-center rounded-lg bg-primary p-6 text-center text-neutral-500 lg:pl-12 lg:text-left'>
                                <div className='lg:pl-12'>
                                    <h2 className='mb-6 text-3xl font-bold'>
                                        {t("Start exploring today!")}
                                    </h2>
                                    <p className='mb-6 pb-2 lg:pb-0'>
                                        {t(
                                            "Find all the tools and resources you need for your academic journey From textbooks to stationery, we've got you covered"
                                        )}
                                    </p>
                                    <Link
                                        href='/sign-up'
                                        type='button'
                                        className='rounded-full border-2 border-accent px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-accent transition duration-150 ease-in-out hover:border-accent hover:bg-accent/80 hover:bg-opacity-10 hover:text-white focus:border-accent focus:text-white focus:outline-none focus:ring-0 active:border-accent/80 active:text-accent'
                                        data-te-ripple-init
                                        data-te-ripple-color='light'
                                    >
                                        {t("Get Started")}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='mb-32 text-center'>
                    <h2 className='mb-12 text-3xl font-bold'>
                        {t("Meet the")}{" "}
                        <u className='text-accent'>{t("team")}</u>
                    </h2>

                    <div className='lg:gap-xl-12 grid gap-x-6 md:grid-cols-2 lg:grid-cols-5'>
                        {team.map((member, index) => (
                            <div key={index} className='mb-12 lg:mb-0'>
                                <Image
                                    className='mx-auto mb-6 rounded-lg shadow-lg dark:shadow-black/20 w-[150px]'
                                    src={member?.image}
                                    alt={`Avatar of ${member.name}`}
                                    height={500}
                                    width={500}
                                />
                                <h5 className='mb-4 text-lg font-bold'>
                                    {member.name}
                                </h5>
                                <p className='mb-6'>{member.role}</p>
                                <ul className='mx-auto flex list-inside justify-center'>
                                    {member.links.map((link, linkIndex) => {
                                        if (link.name === "GitHub") {
                                            return (
                                                <a
                                                    key={linkIndex}
                                                    href={link.url}
                                                    className='px-2'
                                                >
                                                    <FaGithub className='h-8 w-8 text-primary dark:text-primary-400 hover:scale-105' />
                                                </a>
                                            );
                                        } else if (link.name === "LinkedIn") {
                                            return (
                                                <a
                                                    key={linkIndex}
                                                    href={link.url}
                                                    className='px-2'
                                                >
                                                    <FaLinkedin className='h-8 w-8 text-primary dark:text-primary-400 hover:scale-105' />
                                                </a>
                                            );
                                        }
                                        return null;
                                    })}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                <section className='mb-32 text-center'>
                    <h2 className='mb-16 text-3xl font-bold'>
                        {t("Technologies Used")}
                    </h2>

                    <div className='flex items-center justify-center flex-wrap text-gray-400 space-x-24'>
                        <a
                            className='mb-12 lg:mb-0 hover:text-black'
                            href='https://nextjs.org/'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <SiNextdotjs className=' h-12 w-12  ' />
                        </a>
                        <a
                            className='mb-12 lg:mb-0 hover:text-green-900'
                            href='https://supabase.com/docs'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <SiSupabase className=' h-12 w-12  ' />
                        </a>
                        <a
                            className='mb-12 lg:mb-0 hover:text-cyan-600'
                            href='https://tailwindcss.com/docs/installation'
                            target='_blank'
                            rel='noopener noreferrer'
                        >
                            <SiTailwindcss className=' h-12 w-12  ' />
                        </a>

                        <a
                            href='https://next-intl-docs.vercel.app/docs/getting-started'
                            target='_blank'
                            rel='noopener noreferrer'
                            className='mb-12 lg:mb-0'
                        >
                            <Image
                                className=' h-12 w-36 grayscale hover:grayscale-0 '
                                alt=''
                                src='https://raw.githubusercontent.com/amannn/next-intl/HEAD/media/logo.svg'
                                width={500}
                                height={500}
                            />
                        </a>
                    </div>
                </section>

                <Link
                    className='fixed bottom-4 right-4 z-50 flex items-center border-accent border bg-white rounded-full shadow-md p-2 cursor-pointer hover:scale-110 animate-bounce  infinite'
                    href='/donate'
                >
                    <FaHandsHoldingChild className='text-accent h-6 w-6 mr-2 ' />
                    <span className='text-gray-600 text-sm font-medium'>
                        {t("Support Students")}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default Page;

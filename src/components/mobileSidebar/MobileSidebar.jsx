import { Disclosure, Transition } from "@headlessui/react";
import Link from "next/link";
import React from "react";
import { BiCollapseAlt, BiUser } from "react-icons/bi";

import Searchbar from "../search/Searchbar";

export default function MobileSidebar({ navigation }) {
    return (
        <Transition
            className='sm:hidden fixed z-50 bg-accent2 w-screen h-screen top-0'
            enter='transition duration-300 ease-in'
            enterFrom='transform scale-105 translate-x-full opacity-0'
            enterTo='transform scale-100 translate-x-0 opacity-100'
            leave='transition duration-95 ease-in'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-90 opacity-0'
        >
            <Disclosure.Panel>
                <div className='relative flex h-16 items-center justify-between text-titleContent'>
                    <Link href='/'>
                        <div className='flex flex-shrink-0 items-center'>
                            <h1 className='tracking-widest font-lato font-semibold text-2xl px-5'>
                                MiniStore.
                            </h1>
                        </div>
                    </Link>
                    <div className='absolute inset-y-0 right-0 flex items-center sm:hidden '>
                        <Disclosure.Button className='absolute right-0 items-center justify-center rounded-md p-2 hover:bg-accent hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                            <BiCollapseAlt
                                className='block h-8 w-8'
                                aria-hidden='true'
                            />
                        </Disclosure.Button>
                    </div>
                </div>

                <div className='space-y-1 px-2 pt-2 pb-3 flex flex-col justify-start'>
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            className=' hover:bg-accent hover:text-white  rounded-md px-3 py-2 text-base font-medium tracking-widest'
                            href={item.href}
                        >
                            <Disclosure.Button className='w-full flex justify-start '>
                                {item.name}
                            </Disclosure.Button>
                        </Link>
                    ))}
                    <Link
                        href='/profile'
                        className={`  hover:bg-accent hover:text-white rounded-md px-3 py-2 text-base font-medium `}
                    >
                        <Disclosure.Button className='w-full flex justify-start items-center '>
                            <BiUser
                                className='block h-4 w-4 mr-2'
                                aria-hidden='true'
                            />
                            <h2>Profile</h2>
                        </Disclosure.Button>
                    </Link>
                    <Searchbar />
                </div>
            </Disclosure.Panel>
        </Transition>
    );
}
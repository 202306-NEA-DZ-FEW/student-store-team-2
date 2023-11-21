"use client";

import Image from "next/image";
import React from "react";

export default function CheckoutForm() {
    return (
        <div className='px-3 md:w-8/12 w-4/5'>
            <div className='w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6'>
                <div className='w-full flex mb-3 items-center'>
                    <div className='w-32'>
                        <span className='text-gray-600 font-semibold'>
                            Contact
                        </span>
                    </div>
                    <div className='flex-grow pl-3'>
                        <span>Scott Windon</span>
                    </div>
                </div>
                <div className='w-full flex items-center'>
                    <div className='w-32'>
                        <span className='text-gray-600 font-semibold'>
                            Billing Address
                        </span>
                    </div>
                    <div className='flex-grow pl-3'>
                        <span>
                            123 George Street, Sydney, NSW 2000 Australia
                        </span>
                    </div>
                </div>
            </div>
            <div className='w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6'>
                <div className='w-full p-3 border-b border-gray-200'>
                    <div className='mb-5'>
                        <label
                            htmlFor='type1'
                            className='flex items-center cursor-pointer'
                        >
                            <input
                                type='radio'
                                className='form-radio h-5 w-5 text-indigo-500'
                                name='type'
                                id='type1'
                            />
                            <Image
                                src='https://leadershipmemphis.org/wp-content/uploads/2020/08/780370.png'
                                width={160}
                                height={40}
                                className='h-6 ml-3'
                                alt='Type 1'
                            />
                        </label>
                    </div>
                    <div>
                        <div className='mb-3'>
                            <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                Name on card
                            </label>
                            <div>
                                <input
                                    className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                    placeholder='John Smith'
                                    type='text'
                                />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                Card number
                            </label>
                            <div>
                                <input
                                    className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                    placeholder='0000 0000 0000 0000'
                                    type='text'
                                />
                            </div>
                        </div>
                        <div className='mb-3 -mx-2 flex items-end'>
                            <div className='px-2 w-1/4'>
                                <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                    Expiration date
                                </label>
                                <div>
                                    <select className='form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer'>
                                        <option value='01'>01 - January</option>
                                        <option value='02'>
                                            02 - February
                                        </option>
                                        <option value='03'>03 - March</option>
                                        <option value='04'>04 - April</option>
                                        <option value='05'>05 - May</option>
                                        <option value='06'>06 - June</option>
                                        <option value='07'>07 - July</option>
                                        <option value='08'>08 - August</option>
                                        <option value='09'>
                                            09 - September
                                        </option>
                                        <option value='10'>10 - October</option>
                                        <option value='11'>
                                            11 - November
                                        </option>
                                        <option value='12'>
                                            12 - December
                                        </option>
                                    </select>
                                </div>
                            </div>
                            <div className='px-2 w-1/4'>
                                <select className='form-select w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer'>
                                    <option value='2020'>2020</option>
                                    <option value='2021'>2021</option>
                                    <option value='2022'>2022</option>
                                    <option value='2023'>2023</option>
                                    <option value='2024'>2024</option>
                                    <option value='2025'>2025</option>
                                    <option value='2026'>2026</option>
                                    <option value='2027'>2027</option>
                                    <option value='2028'>2028</option>
                                    <option value='2029'>2029</option>
                                </select>
                            </div>
                            <div className='px-2 w-1/4'>
                                <label className='text-gray-600 font-semibold text-sm mb-2 ml-1'>
                                    Security code
                                </label>
                                <div>
                                    <input
                                        className='w-full px-3 py-2 mb-1 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors'
                                        placeholder='000'
                                        type='text'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full p-3'>
                    <label
                        htmlFor='type2'
                        className='flex items-center cursor-pointer'
                    >
                        <input
                            type='radio'
                            className='form-radio h-5 w-5 text-indigo-500'
                            name='type'
                            id='type2'
                        />
                        <Image
                            src='https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg'
                            width={80}
                            height={40}
                            className='ml-3'
                            alt='Type 2'
                        />
                    </label>
                </div>
            </div>
            <div>
                <button className='block w-full max-w-xs mx-auto bg-accent hover:bg-cyan-800 focus:bg-cyan-950 text-white rounded-lg px-3 py-2 font-semibold'>
                    <i className='mdi mdi-lock-outline mr-1'></i> DONATE AMOUNT
                </button>
            </div>
        </div>
    );
}

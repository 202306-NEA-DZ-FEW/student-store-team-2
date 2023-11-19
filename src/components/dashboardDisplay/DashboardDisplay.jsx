"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BiMessageSquareDots } from "react-icons/bi";
import { FaCheckSquare } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { RiDeleteBinFill } from "react-icons/ri";

import { useUser } from "../userProvider/UserProvider";

const DashboardDisplay = ({ type, fetchPurchases }) => {
    const { user } = useUser();
    const [data, setData] = useState(null);
    const [purchasedData, setPurchasedData] = useState(null);
    const [orders, setOrders] = useState(null);
    const fetchData = async () => {
        try {
            let table;
            let filterField;
            let filterValue;

            if (type === "borrowings") {
                table = "borrowings";
                filterField = "receiver";
                filterValue = user;
            } else if (type === "lendings") {
                table = "borrowings";
                filterField = "sender";
                filterValue = user;
            } else if (type === "sales") {
                table = "purchases";
                filterField = "sender";
                filterValue = user;
            } else if (type === "purchases") {
                table = "purchases";
                filterField = "receiver";
                filterValue = user;
            }

            const purchasedData = await fetchPurchases(
                table,
                filterField,
                filterValue
            );
            setPurchasedData(purchasedData);
        } catch (error) {
            console.error("Error fetching data:", error.message);
            // Handle the error accordingly, e.g., set an error state or show a message to the user
        }
    };

    useEffect(() => {
        fetchData();
    }, [type, user]);

    return (
        <div className=''>
            <h1 className='text-3xl capitalize font-lato font-medium ml-4 mb-6'>
                {type}
            </h1>
            <div className='flex '>
                <div className=''>
                    <select
                        name=''
                        id=''
                        className='bg-white py-2 px-4 w-16 border border-gray-300 rounded-md inline-block ml-4'
                    >
                        <option value='All' defaultChecked>
                            All
                        </option>
                        <option value='All' defaultChecked>
                            Requested
                        </option>
                        <option value='All' defaultChecked>
                            Pending
                        </option>
                    </select>
                    <form
                        className='ml-4 mb-8 inline-block'
                        action='#'
                        method='GET'
                    >
                        <label for='users-search' className='sr-only'>
                            Search
                        </label>
                        <div className='mt-1 relative lg:w-64 xl:w-96'>
                            <input
                                type='text'
                                name='email'
                                id='users-search'
                                className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-accent focus:border-accent block w-full p-2.5'
                                placeholder='Search for a product'
                            />
                        </div>
                    </form>
                </div>
                <button className='ml-auto rounded-md px-4 py-2 h-12 bg-cyan-600 text-white flex items-center hover:bg-cyan-800'>
                    <GoPlus className='w-7 h-7' />
                    <span>Add product</span>
                </button>
            </div>

            {/* <div>
                {data &&
                    data.map((item) => (
                        <ProductItem
                            key={item.productId}
                            fetchPurchases={fetchPurchases}
                            product={item}
                        />
                    ))}
            </div> */}
            <table className='table-fixed min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-100'>
                    <tr>
                        <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                        >
                            Name
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                        >
                            Seller
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                        >
                            Message
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                        >
                            Borrow period
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                        >
                            Phone Num
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                        >
                            Status
                        </th>
                        <th
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                        >
                            Actions
                        </th>
                        <th scope='col' className='p-4'></th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    <tr className='hover:bg-gray-100'>
                        <td className='p-4  mr-20'>
                            <div className=' font-normal text-gray-500 '>
                                <p className='text-lg capitalize font-semibold text-gray-900'>
                                    sun glasses
                                </p>
                                <span className='text-sm text-gray-400'>
                                    Accesoires
                                </span>
                            </div>
                        </td>
                        <td className='p-4  '>
                            <div className='flex items-center'>
                                <div className='h-10 w-10 rounded-full relative overflow-hidden '>
                                    <Image
                                        layout='fill'
                                        src='https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVyc29ufGVufDB8fDB8fHww'
                                        alt='{{ .name }} avatar'
                                    />
                                </div>

                                <div className='text-sm font-normal text-gray-500 ml-3'>
                                    <div className='text-base font-semibold text-gray-900'>
                                        Oussama 3in taya
                                    </div>
                                    <div className='text-sm font-normal text-gray-500'>
                                        omega@gmail.com
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className='p-4 whitespace-nowrap text-base font-medium text-gray-900'>
                            <BiMessageSquareDots className='w-8 h-8' />
                        </td>
                        <td className='p-4 whitespace-nowrap text-base font-medium text-gray-900'>
                            7 days
                        </td>
                        <td className='p-4 whitespace-nowrap text-base font-medium text-gray-900'>
                            +2136557589
                        </td>
                        <td className='p-4 whitespace-nowrap text-base font-normal text-gray-900'>
                            <p className='bg-green-200 text-green-400 rounded-xl w-fit  px-2'>
                                completed
                            </p>
                        </td>
                        <td className='p-4 whitespace-nowrap flex'>
                            <button
                                type='button'
                                data-modal-toggle='user-modal'
                                className='text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center'
                            >
                                <FaCheckSquare className='w-4 h-4 mr-2' />
                                Accept
                            </button>
                            <button
                                type='button'
                                data-modal-toggle='delete-user-modal'
                                className='ml-2 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center'
                            >
                                <RiDeleteBinFill className='w-4 h-4 mr-2' />
                                Reject
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default DashboardDisplay;

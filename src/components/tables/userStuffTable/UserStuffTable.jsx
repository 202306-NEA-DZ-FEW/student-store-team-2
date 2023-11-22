import Link from "next/link";
import React from "react";
import { IoEyeOutline } from "react-icons/io5";

function UserStuffTable({ data }) {
    const userStuff = ["name", "price", "offer type", "actions"];

    return (
        <table className='table-fixed min-w-full divide-y divide-gray-200 '>
            <thead className='bg-gray-100'>
                <tr>
                    {userStuff.map((title, index) => (
                        <th
                            key={index}
                            scope='col'
                            className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                        >
                            {title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200 '>
                {/* {data && data.length === 0 && (
                    <p key='no items'>you have no item yet</p>
                )} */}
                {data &&
                    data[0].pid &&
                    data?.map((item) => (
                        <tr key={item?.pid}>
                            <td className='p-4  '>
                                <div className=' font-normal text-gray-500 '>
                                    <p className='text-lg capitalize font-semibold text-gray-900'>
                                        {item?.name}
                                    </p>
                                    <span className='text-sm text-gray-400'>
                                        {item?.category_name}
                                    </span>
                                </div>
                            </td>
                            <td className='p-4  mr-20'>
                                <div className=' font-normal text-gray-800 '>
                                    {item?.price}
                                </div>
                            </td>
                            <td className='p-4  mr-20'>
                                <div className=' font-normal text-gray-800 '>
                                    {item?.offer_type}
                                </div>
                            </td>
                            <td className='p-4  mr-20'>
                                <div className=' font-normal text-gray-800 '>
                                    <Link
                                        href={"/products/" + item?.pid}
                                        className='ml-2 bg-gray-300 text-white  hover:bg-gray-400 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center'
                                    >
                                        <IoEyeOutline className='w-4 h-4 mr-2' />
                                        view
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    );
}

export default UserStuffTable;

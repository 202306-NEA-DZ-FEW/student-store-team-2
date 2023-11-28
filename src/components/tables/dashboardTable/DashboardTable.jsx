import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiMessageSquareDots } from "react-icons/bi";
import { FaCheckSquare } from "react-icons/fa";
import { IoMdCloudDone } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";
import { RiDeleteBinFill } from "react-icons/ri";
import { TiCancel } from "react-icons/ti";

import {
    deleteDashboardOrder,
    setNotification,
    updateDashboardOrder,
} from "@/lib/_supabase";

function DashboardTable({ type, data }) {
    return (
        <table className='table-fixed min-w-full divide-y divide-gray-200 '>
            <DashboardTableHead type={type} />
            <tbody className='bg-white divide-y divide-gray-200 '>
                {data &&
                    data?.map((item) => (
                        <DashboardTableRow
                            item={item}
                            type={type}
                            key={item.id}
                        />
                    ))}
            </tbody>
        </table>
    );
}

export default DashboardTable;

function DashboardTableHead({ type }) {
    const userRoleObject = {
        purchases: "bought form",
        sales: "sold to",
        borrowings: "borrowed from",
        lendings: "borrowed for",
    };

    const userRole = userRoleObject[type];

    const isBorrowPeriodExists = type == "borrowings" || type === "lendings";
    return (
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
                    {userRole}
                </th>
                <th
                    scope='col'
                    className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                >
                    Message
                </th>
                {isBorrowPeriodExists && (
                    <th
                        scope='col'
                        className='p-4 text-left text-xs font-medium text-gray-500 uppercase'
                    >
                        Borrow period
                    </th>
                )}
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
            </tr>
        </thead>
    );
}

function DashboardTableRow({ item, type }) {
    const statusColor = {
        requested: "text-green-400",
        pending: "text-purple-400",
        completed: "text-blue-400",
        aborted: "text-rose-400",
    };
    const statusBgColor = {
        requested: "bg-green-200",
        pending: "bg-purple-200",
        completed: "bg-blue-200",
        aborted: "bg-rose-200",
    };
    console.log(item);
    return (
        <tr className='hover:bg-gray-100 align-middle'>
            <td className='p-4  mr-20'>
                <div className=' font-normal text-gray-500 '>
                    <p className='text-lg capitalize font-semibold text-gray-900'>
                        {item?.name}
                    </p>
                    <span className='text-sm text-gray-400'>
                        {item?.category_name}
                    </span>
                </div>
            </td>
            <td className='p-4  '>
                <div className='flex items-center'>
                    <div className='h-10 w-10 rounded-full relative overflow-hidden '>
                        <Image
                            width={50}
                            height={50}
                            src={item?.raw_user_meta_data?.avatar_url}
                            alt={` avatar picture`}
                        />
                    </div>

                    <div className='text-sm font-normal text-gray-500 ml-3'>
                        <div className='text-base font-semibold text-gray-900'>
                            {item?.raw_user_meta_data?.full_name}
                        </div>
                        <div className='text-sm font-normal text-gray-500'>
                            {item?.raw_user_meta_data?.email}
                        </div>
                    </div>
                </div>
            </td>
            <td className='p-4 whitespace-nowrap text-base font-medium text-gray-900'>
                {type === "borrowings" || type === "purchases" ? (
                    <Link href={"inbox/" + item?.sender}>
                        <BiMessageSquareDots className='w-8 h-8' />
                    </Link>
                ) : (
                    <Link href={"inbox/" + item?.receiver}>
                        <BiMessageSquareDots className='w-8 h-8' />
                    </Link>
                )}
            </td>
            {item?.borrow_period && (
                <td className='p-4 whitespace-nowrap text-base font-medium text-gray-900'>
                    {item?.borrow_period}
                </td>
            )}
            <td className='p-4 whitespace-nowrap text-base font-medium text-gray-900'>
                {item?.raw_user_meta_data?.phone_num || "not provided"}
            </td>
            <td className='p-4 whitespace-nowrap text-base font-normal text-gray-900'>
                <p
                    className={` ${statusBgColor[item.status]}
                    ${statusColor[item.status]}
                    rounded-xl w-fit  px-2`}
                >
                    {item?.status}
                </p>
            </td>
            <td className='p-4 whitespace-nowrap '>
                <DashboardTableActions type={type} item={item} />
            </td>
        </tr>
    );
}

function DashboardTableActions({
    type,
    item: { status, id, offer_type, productId, sender, receiver },
}) {
    const actions = {
        accept: {
            icon: FaCheckSquare,
            style: "bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-300",
            text: "accept",
            callback: async (table, orderId, sender, receiver) => {
                updateDashboardOrder(table, "pending", orderId);
                sendNotification("accept", sender, receiver, orderId);
            },
        },
        cancel: {
            icon: MdCancel,
            style: " bg-red-600 hover:bg-red-800 focus:ring-red-300 ",
            text: "cancel",
            callback: (table, orderId) => deleteDashboardOrder(table, orderId),
        },
        reject: {
            icon: MdCancel,
            style: " bg-red-600 hover:bg-red-800 focus:ring-red-300 ",
            text: "reject",
            callback: async (table, orderId, sender, receiver) => {
                deleteDashboardOrder(table, orderId);
                sendNotification("reject", sender, receiver, orderId);
            },
        },
        complete: {
            icon: IoMdCloudDone,
            style: " bg-green-600 hover:bg-green-800 focus:ring-green-300 ",
            text: "complete",
            callback: async (table, orderId, sender, receiver) => {
                updateDashboardOrder(table, "completed", orderId);
                sendNotification("complete", sender, receiver, orderId);
            },
        },
        abort: {
            icon: TiCancel,
            style: " bg-rose-600 hover:bg-rose-800 focus:ring-rose-300 ",
            text: "abort",
            callback: async (table, orderId, sender, receiver) => {
                updateDashboardOrder(table, "aborted", orderId);
                sendNotification("abort", sender, receiver, orderId);
            },
        },
        delete: {
            icon: RiDeleteBinFill,
            style: " bg-red-600 hover:bg-red-800 focus:ring-red-300 ",
            text: "delete",
            callback: (table, orderId) => deleteDashboardOrder(table, orderId),
        },
    };

    const senderActions = {
        requested: ["cancel"],
        pending: ["complete", "abort"],
        completed: ["delete"],
        aborted: ["delete"],
    };
    const receiverActions = {
        requested: ["accept", "reject"],
        pending: ["abort"],
        completed: ["delete"],
        aborted: ["delete"],
    };

    const userActions =
        type === "borrowings" || type === "purchases"
            ? senderActions
            : receiverActions;

    const sendNotification = async (action, sender, receiver, orderId) => {
        const notifier =
            type === "borrowings" || type === "purchases" ? receiver : sender;
        const notified =
            type === "borrowings" || type === "purchases" ? sender : receiver;

        const statusMessage = {
            requested: "has requested to buy your item",
            accept: "has accepeted your request",
            reject: "has rejected your request",
            abort: "has aborted the order",
            complete: "has picked your item",
        };

        const link = {
            borrowings: "lendings",
            lendings: "borrowings",
            purchases: "sales",
            sales: "purchases",
        };

        const data = {
            orderId,
            message: statusMessage[action],
            path: link[type],
        };

        const res = await setNotification(notifier, notified, data, "order");
        return res;
    };

    return (
        <div>
            {status &&
                userActions[status].map((item) => {
                    const { icon: Icon, text, style, callback } = actions[item];

                    const UpdateStatus = async () => {
                        const res = await callback(
                            offer_type,
                            id,
                            sender,
                            receiver
                        );
                    };
                    return (
                        <button
                            key={item}
                            type='button'
                            data-modal-toggle='delete-user-modal'
                            className={`ml-2 ${style} text-white  font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center`}
                            onClick={UpdateStatus}
                        >
                            <Icon className='w-4 h-4 mr-2' />
                            {text}
                        </button>
                    );
                })}
            <Link
                href={"/products/" + productId}
                data-modal-toggle='delete-user-modal'
                className='ml-2 bg-gray-300 text-white  hover:bg-gray-400 font-medium rounded-lg text-sm inline-flex items-center px-3 py-2 text-center'
            >
                <IoEyeOutline className='w-4 h-4 mr-2' />
                view
            </Link>
        </div>
    );
}

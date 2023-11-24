import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { IoNotifications } from "react-icons/io5";

import { getNotifications, updatedNotifications } from "@/lib/supabase";

import { useUser } from "../userProvider/UserProvider";

function NotificationsDropdown() {
    const t = useTranslations("Index");
    const { user, userData, loading } = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Mock notifications array
    const [notifications, setNotifications] = useState([]);

    // unviewed notification number

    const [unviewedCount, setUnviewedCount] = useState(0);

    useEffect(() => {
        const closeDropdown = (event) => {
            if (!event.target.closest(".user-dropdown")) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("click", closeDropdown);

            // set all notification to seen when dropdown is open
            // and update the counter to 0
            setUnviewedCount(0);
        } else {
            if (user) {
                updatedNotificationsVisibility();
                fetchData();
            }
            document.removeEventListener("click", closeDropdown);
        }

        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, [isDropdownOpen]);

    useEffect(() => {
        // Initialize the Supabase client

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        // Listen to changes on the notifications table filtered by the user ID
        console.log("outside user data1", user);
        if (user) {
            fetchData();
            console.log("inside user data", user);

            const handleInserts = (payload) => {
                console.log("Change received!", payload, notifications);
                fetchData();
            };
            const realtime = supabase
                .channel(`notified:${user.id}`)

                .on(
                    "postgres_changes",
                    {
                        event: "INSERT",
                        schema: "public",
                        table: "notifications",
                        columns: ["*"],
                        filter: "notified=eq." + user.id,
                    },
                    handleInserts
                )

                .subscribe();
        }
    }, [user]);

    const fetchData = async () => {
        const data = await getNotifications(user.id);
        if (!data) return;
        setNotifications(data);
        const unviewArray = data.filter((item) => !item.viewed);
        setUnviewedCount(unviewArray.length);
        console.log("ddddddd", data);
    };

    const updatedNotificationsVisibility = () => {
        updatedNotifications(user.id);
    };

    if (loading) {
        return (
            <div>
                <div className='flex justify-center items-center'>
                    <FaSpinner className='h-6 w-6 animate-spin duration-150 text-accent2' />
                </div>
            </div>
        );
    } else if (user) {
        return (
            <div className='relative '>
                <div
                    onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                    }}
                    className='cursor-pointer'
                >
                    <div className='flex justify-center items-center space-x-3 cursor-pointer'>
                        {/* Your user avatar/icon */}
                        <IoNotifications className='sm:w-8 sm:h-8 h-6 w-6 rounded-full overflow-hidden border-1 mr-2 sm:mr-0  border-accent' />
                        {unviewedCount > 0 && (
                            <div className='h-5 w-5 flex justify-center text-sm items-center bg-red-500 text-white rounded-full absolute -top-2 right-0'>
                                {unviewedCount}
                            </div>
                        )}
                    </div>
                </div>
                {isDropdownOpen && (
                    <div className='absolute h-96 overflow-y-auto  top-16 right-0  w-80 text-gray-900 z-50 bg-white rounded-lg shadow border dark:border-transparent user-dropdown'>
                        <div className='font-semibold  text-gray-900 text-lg my-4  px-5 py-3'>
                            Notifications
                        </div>
                        <ul className='space-y-3 '>
                            {notifications &&
                                notifications.map((item) => (
                                    <li key={item.id}>
                                        <Link
                                            href={
                                                "dashboard?type=" +
                                                item.data.path
                                            }
                                            className={`text-titleContent px-5 py-3 ${
                                                !item.viewed
                                                    ? "bg-gray-100 "
                                                    : ""
                                            } flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-accent`}
                                        >
                                            <div className='image w-16 h-16 min-h-[4rem] min-w-[4rem] rounded-full overflow-hidden relative'>
                                                <Image
                                                    layout='fill'
                                                    src={
                                                        item.data.notifier_data
                                                            .avatar_url
                                                    }
                                                    alt='kkk'
                                                />
                                            </div>
                                            <div className='ml-4 font-normal font-sans'>
                                                <span className='font-bold'>
                                                    {
                                                        item.data.notifier_data
                                                            .full_name
                                                    }
                                                </span>{" "}
                                                {item.data.message}
                                                <p className='text-accent mt-1 text-sm'>
                                                    {getReadableTimeDifference(
                                                        item.created_at
                                                    )}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}
            </div>
        );
    }
}

export default NotificationsDropdown;

function getReadableTimeDifference(dateString) {
    const timestamp = new Date(dateString).getTime();
    const currentTimestamp = new Date().getTime();
    const differenceInSeconds = Math.floor(
        (currentTimestamp - timestamp) / 1000
    );

    if (differenceInSeconds < 60) {
        return `${differenceInSeconds} second${
            differenceInSeconds > 1 ? "s" : ""
        } ago`;
    } else if (differenceInSeconds < 3600) {
        const differenceInMinutes = Math.floor(differenceInSeconds / 60);
        return `${differenceInMinutes} minute${
            differenceInMinutes > 1 ? "s" : ""
        } ago`;
    } else if (differenceInSeconds < 86400) {
        const differenceInHours = Math.floor(differenceInSeconds / 3600);
        return `${differenceInHours} hour${
            differenceInHours > 1 ? "s" : ""
        } ago`;
    } else if (differenceInSeconds < 604800) {
        const differenceInDays = Math.floor(differenceInSeconds / 86400);
        return `${differenceInDays} day${differenceInDays > 1 ? "s" : ""} ago`;
    } else {
        const differenceInWeeks = Math.floor(differenceInSeconds / 604800);
        return `${differenceInWeeks} week${
            differenceInWeeks > 1 ? "s" : ""
        } ago`;
    }
}

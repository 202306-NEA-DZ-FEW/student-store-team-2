import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { IoNotifications } from "react-icons/io5";

import { useUser } from "../userProvider/UserProvider";

function NotificationsDropdown() {
    const t = useTranslations("Index");
    const { user, userData, loading } = useUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Mock notifications array
    const [notifications, setNotifications] = useState([
        {
            sender: { name: "John" },
            type: "comment",
            read: false,
            link: "/dashboard",
        },
        {
            sender: { name: "Alice" },
            type: "borrow",
            read: true,
            link: "/dashboard",
        },
        {
            sender: { name: "Emily" },
            type: "purchase",
            read: false,
            link: "/dashboard",
        },
        {
            sender: { name: "Mark" },
            type: "purchase completed",
            read: false,
            link: "/dashboard",
        },
    ]);

    useEffect(() => {
        const closeDropdown = (event) => {
            if (!event.target.closest(".user-dropdown")) {
                setIsDropdownOpen(false);
            }
        };

        if (isDropdownOpen) {
            document.addEventListener("click", closeDropdown);
        } else {
            document.removeEventListener("click", closeDropdown);
        }

        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, [isDropdownOpen]);

    const unreadNotifications = notifications.filter(
        (notification) => !notification.read
    );

    const doneReading = () => {
        setTimeout(() => {
            const updatedNotifications = notifications.map((notification) => {
                return {
                    ...notification,
                    read: true,
                };
            });
            setNotifications(updatedNotifications);
        }, 3000);
    };

    if (loading) {
        return null;
    } else if (user) {
        return (
            <div className='relative'>
                <div
                    onClick={() => {
                        setIsDropdownOpen(!isDropdownOpen);
                        doneReading();
                    }}
                    className='cursor-pointer'
                >
                    <div className='flex justify-center items-center space-x-3 cursor-pointer'>
                        {/* Your user avatar/icon */}
                        <IoNotifications className='sm:w-8 sm:h-8 h-6 w-6 rounded-full overflow-hidden border-1 mr-2 sm:mr-0  border-accent' />
                        {unreadNotifications.length > 0 && (
                            <div className='h-2 w-2 bg-red-500 rounded-full absolute top-0 right-0'></div>
                        )}
                    </div>
                </div>
                {isDropdownOpen && (
                    <div className='absolute top-full right-0 mt-2 w-60 px-5 py-3 text-gray-900 bg-white rounded-lg shadow border dark:border-transparent user-dropdown'>
                        <ul className='space-y-3 '>
                            <div className='font-semibold  text-gray-900 text-lg'>
                                Notifications
                            </div>
                            {notifications.map((notification, index) => (
                                <li
                                    className={`text-titleContent${
                                        !notification.read ? "text-black" : ""
                                    } flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-accent`}
                                    key={index}
                                >
                                    {" "}
                                    {notification.type === "comment" && (
                                        <div>
                                            {notification.sender.name} has
                                            commented on your product
                                        </div>
                                    )}
                                    {notification.type === "borrow" && (
                                        <div>
                                            {notification.sender.name} has
                                            requested to borrow your product
                                        </div>
                                    )}
                                    {notification.type === "purchase" && (
                                        <div>
                                            {notification.sender.name} has
                                            requested to buy your product
                                        </div>
                                    )}
                                    {notification.type ===
                                        "purchase completed" && (
                                        <div>
                                            {notification.sender.name} has
                                            completed your offer
                                        </div>
                                    )}
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

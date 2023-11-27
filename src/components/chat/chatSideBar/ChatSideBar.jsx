"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useEffect } from "react";

import { getUserConnections } from "@/lib/_supabase";

function ChatSideBar() {
    const [name, setName] = useState();
    const [connections, setConnections] = useState([]);
    const params = useParams();

    const fetchConnections = async () => {
        const { name: username, connections: data } =
            await getUserConnections();
        setName(username);
        setConnections(data);
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div
            className={`${
                params.id ? "hidden sm:flex" : "flex w-full sm:w-fit"
            }   chat-sidebar h-full  flex-col pt-20 border-r border-gray-200`}
        >
            <h1 className='text-xl pl-4 capitalize'>{name} </h1>
            <p className='text-base font-medium font-mono pl-4 mt-4'>
                Messages
            </p>
            <div className='users-wrapper h-full sm:w-72 mt-4 flex flex-col  overflow-auto'>
                {connections.map((user) => (
                    <Link
                        key={user.id}
                        href={"/inbox/" + user.id}
                        className='user-item mt-4 hover:bg-gray-100'
                    >
                        <div className='flex  items-center pl-4 py-2'>
                            <div className='image flex items-center justify-center w-12 h-12 rounded-full overflow-hidden bg-yellow-300 relative placeholder:text-xs'>
                                {user.raw_user_meta_data.avatar_url && (
                                    <Image
                                        src={user.raw_user_meta_data.avatar_url}
                                        alt={user.raw_user_meta_data.full_name}
                                        layout='fill'
                                    />
                                )}
                                {!user.raw_user_meta_data.avatar_url && (
                                    <p className='capitalize '>
                                        {user.raw_user_meta_data.full_name[0]}
                                    </p>
                                )}
                            </div>
                            <div className='user-info ml-4'>
                                <p className='capitalize text-base '>
                                    {user.raw_user_meta_data.full_name}
                                </p>
                                <span className=' text-gray-400 font-normal font-jost text-xs'>
                                    Active 9h ago
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default ChatSideBar;

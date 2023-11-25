import Image from "next/image";
import Link from "next/link";
import React from "react";

import { getUserConnections } from "@/lib/supabase";

async function ChatSideBar() {
    const { name, connections } = await getUserConnections();

    return (
        <div className='hidden sm:block chat-sidebar h-full flex flex-col pt-20 border-r border-gray-200'>
            <h1 className='text-xl pl-4 capitalize'>{name} </h1>
            <p className='text-base font-medium font-mono pl-4 mt-4'>
                Messages
            </p>
            <div className='users-wrapper h-full w-72 mt-4 flex flex-col  overflow-auto'>
                {connections.map((user) => (
                    <Link
                        key={user.id}
                        href={"/inbox/" + user.id}
                        className='user-item mt-4 hover:bg-gray-100'
                    >
                        <div className='flex  items-center pl-4 py-2'>
                            <div className='image w-12 h-12 rounded-full overflow-hidden bg-yellow-300 relative placeholder:text-xs'>
                                <Image
                                    src={user.raw_user_meta_data.avatar_url}
                                    alt={user.raw_user_meta_data.full_name}
                                    layout='fill'
                                />
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

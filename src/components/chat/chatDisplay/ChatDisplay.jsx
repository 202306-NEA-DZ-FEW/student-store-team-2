"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { v1 } from "uuid";

import { insertNewMessage } from "@/lib/supabase";
function ChatDisplay({ roomId, receiverInfo, userInfo, savedMessages }) {
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState(savedMessages);

    // init firebase client
    const clientA = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const channelA = useRef(null);
    useEffect(() => {
        channelA.current = clientA.channel(roomId, {
            config: {
                broadcast: { self: false },
            },
        });
        if (channelA.current) {
            channelA.current
                .on("broadcast", { event: "chat-message" }, (payload) => {
                    console.log("msg :", payload);
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            id: v1(),
                            userId: receiverInfo.id,
                            content: payload.payload.msg,
                        },
                    ]);
                })
                .subscribe();
        }

        return () => {
            channelA.current.unsubscribe();
        };
    }, [roomId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (channelA.current) {
            channelA.current.send({
                type: "broadcast",
                event: "chat-message",
                payload: { msg },
            });
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: v1(), userId: userInfo.id, content: msg },
            ]);
            setMsg("");
            const res = await insertNewMessage(userInfo.id, msg, roomId);
        }
    };

    return (
        <div className='flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen'>
            <div className='flex sm:items-center justify-between py-3 border-b-2 border-gray-200'>
                <div className='relative flex items-center space-x-4 mt-16'>
                    <div className='relative'>
                        <span className='absolute text-green-500 right-0 bottom-0'>
                            <svg width='20' height='20'>
                                <circle
                                    cx='8'
                                    cy='8'
                                    r='8'
                                    fill='currentColor'
                                ></circle>
                            </svg>
                        </span>
                        <Image
                            width={46}
                            height={46}
                            src={receiverInfo.raw_user_meta_data.avatar_url}
                            alt=''
                            className='w-10 sm:w-16 h-10 sm:h-16 rounded-full'
                        />
                    </div>
                    <div className='flex flex-col leading-tight'>
                        <div className='text-2xl mt-1 flex items-center'>
                            <span className='text-gray-700 mr-3'>
                                {receiverInfo.raw_user_meta_data.full_name}
                            </span>
                        </div>
                        <span className='text-lg text-gray-600'>
                            {receiverInfo.raw_user_meta_data.email}
                        </span>
                    </div>
                </div>
            </div>
            <div
                id='messages'
                className='flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
            >
                {messages &&
                    messages.map((msg) => (
                        <div className='chat-message' key={msg.id}>
                            <div
                                className={`flex items-end ${
                                    msg.userId === userInfo.id
                                        ? " flex-row-reverse"
                                        : ""
                                }`}
                            >
                                <div className='flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'>
                                    <div>
                                        <span
                                            className={`${
                                                msg.userId !== userInfo.id
                                                    ? " rounded-bl-none bg-gray-100 text-gray-700"
                                                    : "rounded-br-none bg-fuchsia-400 text-white "
                                            } px-4 py-2 rounded-lg inline-block`}
                                        >
                                            {msg.content}
                                        </span>
                                    </div>
                                </div>
                                <Image
                                    width={46}
                                    height={46}
                                    src='https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144'
                                    alt='My profile'
                                    className='w-6 h-6 rounded-full order-1'
                                />
                            </div>
                        </div>
                    ))}
            </div>
            <div className=' px-4 pt-4 mb-2 sm:mb-0'>
                <form
                    className='relative flex border border-gray-300 rounded-3xl'
                    onSubmit={handleSubmit}
                >
                    <span className=' inset-y-0 flex items-center'>
                        <button
                            type='button'
                            className='inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                fill='none'
                                viewBox='0 0 24 24'
                                stroke='currentColor'
                                className='h-6 w-6 text-gray-600'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z'
                                ></path>
                            </svg>
                        </button>
                    </span>
                    <input
                        type='text'
                        placeholder='message'
                        className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600   rounded-md py-3'
                        onChange={(e) => {
                            setMsg(e.target.value);
                        }}
                        value={msg}
                    />
                    <div className=' right-0 items-center inset-y-0 hidden sm:flex'>
                        {!msg && (
                            <>
                                <button
                                    type='button'
                                    className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        className='h-6 w-6 text-gray-600'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            Ltroke-linejoin='round'
                                            strokeWidth='2'
                                            d='M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13'
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    type='button'
                                    className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        className='h-6 w-6 text-gray-600'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            Ltroke-linejoin='round'
                                            strokeWidth='2'
                                            d='M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z'
                                        ></path>
                                        <path
                                            strokeLinecap='round'
                                            Ltroke-linejoin='round'
                                            strokeWidth='2'
                                            d='M15 13a3 3 0 11-6 0 3 3 0 016 0z'
                                        ></path>
                                    </svg>
                                </button>
                                <button
                                    type='button'
                                    className='inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none'
                                >
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='none'
                                        viewBox='0 0 24 24'
                                        stroke='currentColor'
                                        className='h-6 w-6 text-gray-600'
                                    >
                                        <path
                                            strokeLinecap='round'
                                            Ltroke-linejoin='round'
                                            strokeWidth='2'
                                            d='M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                                        ></path>
                                    </svg>
                                </button>
                            </>
                        )}
                        {msg && (
                            <button
                                onClick={handleSubmit}
                                type='submit'
                                className='inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-sky-400'
                            >
                                <span className='font-medium'>Send</span>
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ChatDisplay;

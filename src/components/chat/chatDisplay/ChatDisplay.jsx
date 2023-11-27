"use client";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { v1 } from "uuid";

import { insertNewMessage } from "@/lib/supabase";
function ChatDisplay({ roomId, receiverInfo, userInfo, savedMessages }) {
    const [msg, setMsg] = useState("");
    const [messages, setMessages] = useState(savedMessages);
    const [isTyping, setIsTyping] = useState(false);
    const [isSeen, setIsSeen] = useState(false);
    const [lastMsgSeen, setLastMsgSeen] = useState("default");

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
                presence: {
                    key: userInfo.id,
                },
            },
        });
        if (channelA.current) {
            channelA.current
                .on("broadcast", { event: "chat-message" }, (payload) => {
                    setMessages((prevMessages) => [
                        ...prevMessages,
                        {
                            id: v1(),
                            userId: receiverInfo.id,
                            content: payload.payload.msg,
                        },
                    ]);
                })
                .on("presence", { event: "sync" }, () => {
                    const receiver =
                        channelA.current.presenceState()[receiverInfo.id];
                    const user =
                        channelA.current.presenceState()[userInfo.id] || {};
                    const { msgId } = user[0] || {};
                    console.log("reees", receiver);
                    if (!receiver) return;
                    const { isTyping, userId, isSeen } = receiver[0];
                    if (isSeen && msgId !== lastMsgSeen) {
                        setIsSeen(true);
                        setLastMsgSeen(msgId);
                        console.log("yoo", channelA.current.presenceState());
                        return;
                    }
                    console.log(
                        "Synced presence state: ",
                        channelA.current.presenceState()
                    );
                    if (userId === receiverInfo.id) setIsTyping(isTyping);
                })

                .subscribe();
        }

        return () => {
            channelA.current.unsubscribe();
        };
    }, [roomId]);

    const handleLeave = async () => {
        const userStatus = {
            user: userInfo.id,
            online_at: new Date(),
        };
        await channelA.current.track(userStatus);
        await channelA.current.untrack();
    };
    // broadcast when the user is typing
    const handleTyping = (event) => {
        setMsg(event.target.value);
        const typing = event.target.value.length;
        if (typing) {
            channelA.current.track({ isTyping: true, userId: userInfo.id });
        } else {
            channelA.current.track({ isTyping: false, userId: userInfo.id });
        }
    };
    const handleSeenMessage = () => {
        console.log("sap");
        const lastMsg = messages[messages.length - 1];
        if (channelA.current && lastMsg.userId === receiverInfo.id) {
            channelA.current.track({
                isSeen: true,
                userid: userInfo.id,
                msgId: lastMsg.id,
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSeen(false);
        if (channelA.current && msg) {
            channelA.current.send({
                type: "broadcast",
                event: "chat-message",
                payload: { msg },
            });
            channelA.current.track({ isTyping: false, userId: userInfo.id });
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
                    <Link href='/inbox' className='sm:hidden ml-2'>
                        <IoMdArrowRoundBack className='h-8 w-8 text-gray-800' />
                    </Link>
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
                        {receiverInfo.raw_user_meta_data.avatar_url && (
                            <Image
                                width={46}
                                height={46}
                                src={receiverInfo.raw_user_meta_data.avatar_url}
                                alt=''
                                className='w-10 sm:w-16 h-10 sm:h-16 rounded-full'
                            />
                        )}
                    </div>
                    <div className='flex flex-col leading-tight'>
                        <div className='text-2xl mt-1 flex items-center'>
                            <span className='text-gray-700 mr-3'>
                                {
                                    receiverInfo.raw_user_meta_data.full_name?.split(
                                        " "
                                    )[0]
                                }
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
                className='flex flex-col-reverse p-3 pb-12 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch'
            >
                <div className='flex flex-col  space-y-4'>
                    {messages &&
                        messages.map((msg, index) => (
                            <div
                                className='chat-message max-w-64 relative'
                                key={msg.id}
                                value={index}
                            >
                                {/* display seen when the other user saw the msg */}
                                {messages.length - 1 === index &&
                                    isSeen &&
                                    msg.userId === userInfo.id && (
                                        <p className='absolute -bottom-8 right-3 text-gray-500 font-mono text-xs'>
                                            Seen
                                        </p>
                                    )}
                                <div
                                    className={`flex items-end ${
                                        msg.userId === userInfo.id
                                            ? " flex-row-reverse"
                                            : ""
                                    }`}
                                >
                                    <div className='flex flex-col space-y-2 text-lg max-w-xs mx-2 order-2 items-start'>
                                        <div>
                                            <span
                                                className={`${
                                                    msg.userId !== userInfo.id
                                                        ? " rounded-bl-none bg-gray-100 text-gray-700"
                                                        : "rounded-br-none bg-fuchsia-400 text-white "
                                                } px-4 py-2 rounded-lg inline-block break-all`}
                                            >
                                                {msg.content}
                                            </span>
                                        </div>
                                    </div>
                                    {msg.userId === receiverInfo.id && (
                                        <Image
                                            width={46}
                                            height={46}
                                            src={
                                                receiverInfo.raw_user_meta_data
                                                    .avatar_url
                                            }
                                            alt='My profile'
                                            className='w-6 h-6 rounded-full order-1'
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <div className=' px-4 pt-4 mb-2 sm:mb-0'>
                <form
                    className='relative flex border border-gray-300 rounded-3xl'
                    onSubmit={handleSubmit}
                >
                    {/* is user typing animation */}
                    {isTyping && (
                        <div className='absolute left-2 flex  -top-12 rounded-xl items-center gap-2 h-12'>
                            <Image
                                width={46}
                                height={46}
                                src={receiverInfo.raw_user_meta_data.avatar_url}
                                alt='My profile'
                                className='w-6 h-6 rounded-full '
                            />
                            <span className='circle animate-loader'></span>
                            <span className='circle animate-loader animation-delay-200'></span>
                            <span className='circle animate-loader animation-delay-400'></span>
                        </div>
                    )}
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
                        placeholder='Message'
                        className='w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600   rounded-md py-3'
                        onChange={handleTyping}
                        onFocus={handleSeenMessage}
                        value={msg}
                    />
                    <div className=' right-0 items-center inset-y-0  flex'>
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

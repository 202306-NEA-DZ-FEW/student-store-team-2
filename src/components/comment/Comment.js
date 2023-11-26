"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import InputReview from "./inputReview";
import StarRating from "../starRating/StarRating";

const Comment = () => {
    const t = useTranslations("Index");

    const user = {
        first_name: "Mohammed",
        last_name: "Bennaceur",
        birth_date: "29 octobre 2000",
        gender: "male",
        email: "bennaceurm@gmail.com",
        phoneNumber: "777112233",
        address: {
            building: "villa N°15",
            street: "Boulvard des martyres",
            city: "Ghazaouat",
            state: "Tlemcen",
        },
        institution: "Abou Bekr Belkaid University of Tlemcen",
        profile_pic:
            "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    };

    const commentData = {
        1: {
            text: "i like that product <3 ",
            date: "November 14,2023 at 11:55 pm",
            likes: 2,
        },
        2: {
            text: "what's the price",
            date: "November 29,2023 at 01:55 am",
            likes: 0,
        },
    };
    const replyData = {
        1: {
            1: {
                text: "me too",
                date: "November 14,2023 at 11:59 pm",
                likes: 1,
            },
            2: {
                text: "i don't",
                date: "November 15,2023 at 10:55 am",
                likes: 0,
            },
        },
        2: {
            1: {
                text: "it is cheap",
                date: "November 29,2023 at 10:55 am",
                likes: 4,
            },
        },
    };
    const [showReplyInputs, setShowReplyInputs] = useState({});
    const [showReplies, setShowReplies] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const [replyText, setReplyText] = useState({}); // State to manage the text of the reply input
    const handleInputChange = (e, commentId) => {
        const { value } = e.target;
        setReplyText({ ...replyText, [commentId]: value }); // Update the reply text for the specific comment
    };

    const postReply = (commentId) => {
        // Logic to post the reply using the replyText state value for a specific comment
        const newReply = {
            text: replyText[commentId] || "", // Retrieve the reply text for the specific comment
            // Add other necessary fields like user info, timestamp, etc.
        };

        // Assuming reply is a nested object where replies for each comment are stored under their respective commentIds
        const updatedReplies = {
            ...replyData,
            [commentId]: {
                ...(replyData[commentId] || {}),
                [new Date().getTime()]: newReply, // Using timestamp as the unique ID (not recommended in a real app)
            },
        };

        // Update state to add the new reply
        // This should typically involve updating state through props or context in a real application
        // For this example, assuming direct state update (not recommended in a real app)
        setReplyText({ ...replyText, [commentId]: "" }); // Clear the reply input field after posting the reply
    };

    const toggleReplies = (commentId) => {
        setShowReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    const renderReplies = (replies, commentId) => {
        if (!replies || !showReplies[commentId]) return null;

        return Object.keys(replies).map((replyId) => {
            const reply = replies[replyId];

            return (
                <div key={replyId} className='border-b border-gray-300 pb-4'>
                    <div className='flex items-center space-x-4'>
                        <div className='w-12 h-12 rounded-full overflow-hidden'>
                            <Image
                                className='w-full h-full object-cover'
                                src={user.profile_pic} // Assuming each comment has a user object with a profilePic field
                                alt='User'
                                width={500}
                                height={500}
                            />
                        </div>
                        <div>
                            <h2 className='text-sm font-semibold'>
                                {user.firstName} {user.lastName}
                            </h2>
                            <p className='text-gray-600'>{reply.text}</p>
                        </div>
                    </div>
                </div>
            );
        });
    };

    const closeReviewModal = () => {
        setIsOpen(false);
    };

    const toggleReviewInput = () => {
        setIsOpen(true);
    };

    return (
        <div className='p-10 mb-20 sm:flex justify-center'>
            <div
                onClick={() => toggleReviewInput()}
                className='p-6 bg-accent rounded-full h-8 w-8 flex items-center justify-center text-2xl text-white mt-4 shadow-lg cursor-pointer'
            >
                +
            </div>
            <div className='flex flex-wrap space-x-3 justify-center items-start mt-6 border-t border-gray-200/80 pt-6 space-y-4'>
                {commentData &&
                    Object.keys(commentData).map((commentId) => {
                        const comment = commentData[commentId];
                        const replies = replyData[commentId];

                        return (
                            <div
                                key={commentId}
                                className='  bg-white h-full rounded-2xl px-10 py-8 shadow-lg hover:shadow-2xl transition duration-500'
                            >
                                <div className='w-14 h-14  bg-accent rounded-full flex items-center justify-center font-bold text-white'>
                                    <Image
                                        className='w-full h-full object-cover rounded-full'
                                        src={user.profile_pic} // Assuming each comment has a user object with a profilePic field
                                        alt='User'
                                        width={500}
                                        height={500}
                                    />
                                </div>
                                <div className='mt-4 flex items-center space-x-4'>
                                    <div className='text-sm font-semibold'>
                                        {user.first_name} •{" "}
                                        <span className='font-normal'>
                                            {" "}
                                            5 minutes ago
                                        </span>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <div className='flex items-center mt-2'>
                                        <StarRating rating={5} />
                                    </div>

                                    <p className='mt-4 text-md text-gray-600'>
                                        {comment.text}
                                    </p>
                                    <div className='mt-4 flex justify-between items-center'>
                                        <div
                                            onClick={() =>
                                                toggleReplies(commentId)
                                            }
                                            className='p-2  border-b  rounded-md text-sm text-gray-600 hover:border-accent cursor-pointer'
                                        >
                                            {showReplies[commentId]
                                                ? "Hide Replies"
                                                : "Show Replies"}
                                        </div>
                                    </div>

                                    {renderReplies(replies, commentId)}
                                    <div className='mt-4'>
                                        <input
                                            type='text'
                                            placeholder='Write a reply...'
                                            value={replyText[commentId] || ""} // Set value based on the specific comment's reply text
                                            onChange={(e) =>
                                                handleInputChange(e, commentId)
                                            } // Pass commentId to handleInputChange
                                            className='border border-gray-300 rounded-md p-2 w-full'
                                        />
                                        <button
                                            onClick={() => postReply(commentId)}
                                            className='mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
                                        >
                                            Reply
                                        </button>
                                    </div>

                                    <InputReview
                                        isOpen={isOpen}
                                        closeReviewModal={closeReviewModal}
                                    />
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default Comment;

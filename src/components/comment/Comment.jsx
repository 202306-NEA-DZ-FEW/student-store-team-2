"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import ProfilePic from "../profilePicture/ProfilePic";

function Comment({ user, comments, reply }) {
    const t = useTranslations("Index");
    const [showReplyInputs, setShowReplyInputs] = useState({});
    const [replyTexts, setReplyTexts] = useState({});

    const toggleReplyInput = (commentId, replyId) => {
        setShowReplyInputs((prev) => ({
            ...prev,
            [commentId]: {
                ...prev[commentId],
                [replyId]: !prev[commentId]?.[replyId],
            },
        }));
    };

    const handleReplyTextChange = (event, commentId, replyId) => {
        setReplyTexts((prev) => {
            const newReplyTexts = { ...prev };

            if (!newReplyTexts[commentId]) {
                newReplyTexts[commentId] = {};
            }

            newReplyTexts[commentId][replyId] = event.target.value;
            return newReplyTexts;
        });
    };

    const handleReplySubmit = (commentId, replyId) => {
        const replyText = replyTexts[commentId]?.[replyId];

        if (replyText) {
            console.log(
                `Reply submitted for commentId ${commentId}, replyId ${replyId}:`,
                replyText
            );

            setReplyTexts((prev) => {
                const newReplyTexts = { ...prev };

                if (!newReplyTexts[commentId]) {
                    newReplyTexts[commentId] = {};
                }

                newReplyTexts[commentId][replyId] = replyText; // Set reply text to the current value
                return newReplyTexts;
            });
        }

        toggleReplyInput(commentId, replyId);
    };

    const renderReplies = (replies, commentId) => {
        if (!replies) return null;

        return Object.keys(replies).map((replyId) => {
            const reply = replies[replyId];
            const isReplyInputVisible = showReplyInputs[commentId]?.[replyId];

            return (
                <div key={replyId} className='ml-20 my-3'>
                    <div className='flex flex-row items-center'>
                        <ProfilePic user={user} />
                        <div className='text-accent mx-3 '>
                            {user.first_name} {user.last_name}
                        </div>
                        {reply.date}
                    </div>
                    <div className='ml-14 border-l-2 reply bg-accent2 rounded-md shadow-inner shadow-md px-3 py-4'>
                        {reply.text}
                    </div>

                    <div className='flex  ml-20'>
                        <button
                            className='mr-2 px-3 py-2 rounded-md flex items-center'
                            onClick={() => toggleReplyInput(commentId, replyId)}
                        >
                            <svg
                                width='40'
                                height='40'
                                viewBox='0 0 40 40'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M33.3335 3.33301H6.66683C4.8335 3.33301 3.3335 4.83301 3.3335 6.66634V26.6663C3.3335 28.4997 4.8335 29.9997 6.66683 29.9997H30.0002L36.6668 36.6663V6.66634C36.6668 4.83301 35.1668 3.33301 33.3335 3.33301ZM33.3335 28.6663L31.3335 26.6663H6.66683V6.66634H33.3335V28.6663Z'
                                    fill='#72AEC8'
                                />
                            </svg>
                            <span className='ml-2'>{t("Respond")}</span>
                        </button>

                        <button className='px-3 py-2 rounded-md flex items-center'>
                            <svg
                                width='40'
                                height='40'
                                viewBox='0 0 40 40'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M30.0002 35.0003H13.3335V13.3337L25.0002 1.66699L27.0835 3.75033C27.2779 3.94477 27.4379 4.20866 27.5635 4.54199C27.6891 4.87533 27.7513 5.19477 27.7502 5.50033V6.08366L25.9168 13.3337H35.0002C35.889 13.3337 36.6668 13.667 37.3335 14.3337C38.0002 15.0003 38.3335 15.7781 38.3335 16.667V20.0003C38.3335 20.1948 38.3129 20.4031 38.2718 20.6253C38.2307 20.8475 38.1679 21.0559 38.0835 21.2503L33.0835 33.0003C32.8335 33.5559 32.4168 34.0281 31.8335 34.417C31.2502 34.8059 30.6391 35.0003 30.0002 35.0003ZM10.0002 13.3337V35.0003H3.3335V13.3337H10.0002Z'
                                    fill='#72AEC8'
                                />
                            </svg>
                            <span className='ml-2'>{t("Like")}</span>
                        </button>
                    </div>

                    {isReplyInputVisible && (
                        <div className='flex items-center ml-20'>
                            <textarea
                                value={replyTexts[commentId]?.[replyId] || ""}
                                onChange={(event) =>
                                    handleReplyTextChange(
                                        event,
                                        commentId,
                                        replyId
                                    )
                                }
                                onKeyUp={(event) => {
                                    if (
                                        event.key === "Enter" &&
                                        !event.shiftKey
                                    ) {
                                        event.preventDefault();
                                        handleReplySubmit(commentId, replyId);
                                    }
                                }}
                                onInput={(event) => {
                                    event.target.style.height = "auto";
                                    event.target.style.height =
                                        event.target.scrollHeight + "px";
                                }}
                                placeholder={t("Type your reply") + "..."}
                                className='rounded-md shadow-md bg-accent2 w-full py-2 pl-3 ml-3 rounded-tr-none rounded-br-none'
                            />

                            <button
                                className='bg-accent mr-3 text-black rounded-md py-5 px-5 rounded-tl-none rounded-bl-none'
                                onClick={() =>
                                    handleReplySubmit(commentId, replyId)
                                }
                            >
                                {t("Send")}
                            </button>
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className='container mx-auto my-10 ml-40 mr-40 mt-10 pt-10'>
            <h1 className='text-2xl my-5'>{t("Comments")}</h1>
            <div className='rounded-md shadow-md mr-40'>
                <div className='flex flex-row items-center'>
                    <ProfilePic user={user} />
                    <textarea
                        className='rounded-md shadow-md bg-accent2 w-full py-2 pl-3 ml-3 rounded-tr-none rounded-br-none items-center'
                        placeholder={t("Type your comment") + "..."}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && !event.shiftKey) {
                                event.preventDefault();

                                const textarea = event.target;
                                const caretPosition = textarea.selectionStart;

                                const valueBeforeCaret =
                                    textarea.value.substring(0, caretPosition);
                                const valueAfterCaret =
                                    textarea.value.substring(caretPosition);

                                // Insert a new line at the cursor position
                                textarea.value =
                                    valueBeforeCaret + "\n" + valueAfterCaret;

                                // If you are using state to manage the textarea value, update the state accordingly
                                // Example: setComment(textarea.value);
                            }
                        }}
                    />

                    <button
                        type='button'
                        className='bg-accent mr-3 text-black rounded-md py-5 px-5 rounded-tl-none rounded-bl-none'
                    >
                        {t("Send")}
                    </button>
                </div>

                {Object.keys(comments).map((commentId) => {
                    const comment = comments[commentId];
                    const replies = reply[commentId];

                    return (
                        <div key={commentId} className='ml-5 my-2'>
                            <div className='flex flex-row items-center'>
                                <ProfilePic user={user} />
                                <div className='text-accent mx-3 '>
                                    {user.first_name} {user.last_name}
                                </div>
                                {comment.date}
                            </div>
                            <div className='ml-14 rounded-md shadow-md px-3 py-4'>
                                <div>{comment.text}</div>
                            </div>

                            <div className='flex ml-20 items-center'>
                                <button
                                    className='mr-2 px-3 py-2 rounded-md flex items-center'
                                    onClick={() =>
                                        toggleReplyInput(commentId, commentId)
                                    }
                                >
                                    <svg
                                        width='40'
                                        height='40'
                                        viewBox='0 0 40 40'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M33.3335 3.33301H6.66683C4.8335 3.33301 3.3335 4.83301 3.3335 6.66634V26.6663C3.3335 28.4997 4.8335 29.9997 6.66683 29.9997H30.0002L36.6668 36.6663V6.66634C36.6668 4.83301 35.1668 3.33301 33.3335 3.33301ZM33.3335 28.6663L31.3335 26.6663H6.66683V6.66634H33.3335V28.6663Z'
                                            fill='#72AEC8'
                                        />
                                    </svg>
                                    <span className='ml-2'>{t("Respond")}</span>
                                </button>

                                <button className='px-3 py-2 rounded-md flex items-center'>
                                    <svg
                                        width='40'
                                        height='40'
                                        viewBox='0 0 40 40'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M30.0002 35.0003H13.3335V13.3337L25.0002 1.66699L27.0835 3.75033C27.2779 3.94477 27.4379 4.20866 27.5635 4.54199C27.6891 4.87533 27.7513 5.19477 27.7502 5.50033V6.08366L25.9168 13.3337H35.0002C35.889 13.3337 36.6668 13.667 37.3335 14.3337C38.0002 15.0003 38.3335 15.7781 38.3335 16.667V20.0003C38.3335 20.1948 38.3129 20.4031 38.2718 20.6253C38.2307 20.8475 38.1679 21.0559 38.0835 21.2503L33.0835 33.0003C32.8335 33.5559 32.4168 34.0281 31.8335 34.417C31.2502 34.8059 30.6391 35.0003 30.0002 35.0003ZM10.0002 13.3337V35.0003H3.3335V13.3337H10.0002Z'
                                            fill='#72AEC8'
                                        />
                                    </svg>
                                    <span className='ml-2'>{t("Like")}</span>
                                </button>
                                <span>{comment.likes}</span>
                            </div>

                            {showReplyInputs[commentId] && (
                                <div className='flex items-center ml-20'>
                                    <textarea
                                        value={
                                            replyTexts[commentId]?.[
                                                commentId
                                            ] || ""
                                        }
                                        onChange={(event) =>
                                            handleReplyTextChange(
                                                event,
                                                commentId,
                                                commentId
                                            )
                                        }
                                        onKeyUp={(event) => {
                                            if (
                                                event.key === "Enter" &&
                                                !event.shiftKey
                                            ) {
                                                handleReplySubmit(
                                                    commentId,
                                                    commentId
                                                );
                                            }
                                        }}
                                        onInput={(event) => {
                                            event.target.style.height = "auto";
                                            event.target.style.height =
                                                event.target.scrollHeight +
                                                "px";
                                        }}
                                        placeholder={
                                            t("Type your reply") + "..."
                                        }
                                        className='rounded-md shadow-md bg-accent2 w-full py-2 pl-3 ml-3 rounded-tr-none rounded-br-none'
                                    />

                                    <button
                                        className='bg-accent mr-3 text-black rounded-md py-5 px-5 rounded-tl-none rounded-bl-none'
                                        onClick={() =>
                                            handleReplySubmit(
                                                commentId,
                                                commentId
                                            )
                                        }
                                    >
                                        {t("Send")}
                                    </button>
                                </div>
                            )}

                            {renderReplies(replies, commentId)}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Comment;

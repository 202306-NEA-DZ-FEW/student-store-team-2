import React, { useState } from "react";

import StarRating from "../starRating/StarRating"; // Import your StarRating component

const InputReview = ({ isOpen, closeReviewModal }) => {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(0); // Initial rating value

    const handleInputChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleStarRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform submission logic with reviewText and rating
        // e.g., send data to server, close modal, etc.

        // Close the modal after submitting
        await closeReviewModal();
        setRating(0);
        setReviewText("");
    };

    return (
        isOpen && (
            <div className='fixed top-0 right-0 bottom-0 left-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50'>
                <div className='container mx-auto w-11/12 md:w-2/3 max-w-lg'>
                    <div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
                        <h1 className='text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4'>
                            Leave a Review:
                        </h1>
                        <form onSubmit={handleSubmit}>
                            {/* Text input for the review */}
                            <textarea
                                value={reviewText}
                                onChange={handleInputChange}
                                placeholder='Write your review...'
                                className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-accent font-normal w-full h-40 p-3 text-sm border-gray-300 rounded border'
                            ></textarea>

                            {/* Star rating component */}
                            <div className='mb-4'>
                                <StarRating
                                    rating={rating}
                                    onStarRatingChange={handleStarRatingChange}
                                />
                            </div>

                            {/* Submit button */}
                            <button
                                type='submit'
                                className='bg-accent text-white font-semibold py-2 px-4 rounded hover:bg-accent-dark transition duration-300 ease-in-out'
                            >
                                Submit Review
                            </button>
                        </form>

                        {/* Close button */}
                        <button
                            onClick={closeReviewModal}
                            className='absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600'
                        >
                            {/* SVG for close icon */}
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                className='icon icon-tabler icon-tabler-x'
                                width='20'
                                height='20'
                                viewBox='0 0 24 24'
                                strokeWidth='2.5'
                                stroke='currentColor'
                                fill='none'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                            >
                                <path stroke='none' d='M0 0h24v24H0z' />
                                <line x1='18' y1='6' x2='6' y2='18' />
                                <line x1='6' y1='6' x2='18' y2='18' />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default InputReview;

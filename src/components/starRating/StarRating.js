import React from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";

const StarRating = ({ rating, onStarRatingChange }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    const handleClick = (newRating) => {
        onStarRatingChange(newRating);
    };

    return (
        <div className='flex text-accent'>
            {[...Array(fullStars)].map((_, index) => (
                <BiSolidStar
                    key={index}
                    className='w-6 h-6 cursor-pointer'
                    onClick={() => handleClick(index + 1)}
                />
            ))}
            {halfStar && (
                <BiSolidStarHalf
                    className='w-6 h-6 cursor-pointer'
                    onClick={() => handleClick(fullStars + 0.5)}
                />
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <BiStar
                    key={index}
                    className='w-6 h-6 cursor-pointer'
                    onClick={() => handleClick(fullStars + index + 1)}
                />
            ))}
        </div>
    );
};

export default StarRating;

import React from "react";
import { BiSolidStar, BiSolidStarHalf, BiStar } from "react-icons/bi";

const StarRating = ({ rating }) => {
    // Calculate the number of full and empty stars based on the rating
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
        <div className='flex text-accent'>
            {[...Array(fullStars)].map((_, index) => (
                <BiSolidStar key={index} className='w-6 h-6' />
            ))}
            {halfStar && <BiSolidStarHalf className='w-6 h-6' />}
            {[...Array(emptyStars)].map((_, index) => (
                <BiStar key={index} className='w-6 h-6' />
            ))}
        </div>
    );
};

export default StarRating;

import React from "react";

const ItemLabel = ({ textContent }) => {
    let style = "";
    if (textContent === "For Sale") {
        style = `bg-secondaryBlue`;
    } else if (textContent === "For Borrow") {
        style = `bg-secondaryYellow`;
    } else {
        style = `bg-secondaryGreen`;
    }

    return (
        <div
            className={`flex justify-center text-center items-center font-jost font-bold rounded-full ${style} text-white text-sm w-[105px] h-[26px]`}
        >
            {textContent}
        </div>
    );
};

export default ItemLabel;

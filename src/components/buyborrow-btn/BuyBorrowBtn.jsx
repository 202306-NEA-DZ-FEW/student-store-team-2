import Link from "next/link";
import React from "react";

function BuyBorrowBtn({ label, handleClick }) {
    const classBuy =
        "bg-[#0989FF] transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-[#026fce] duration-300 text-white text-center font-lato text-base md:w-20 w-14 rounded shadow-md";

    const classBorrow =
        "bg-[#FFBD00] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#e8ac09] duration-300 text-white text-center hover:transition-all font-lato text-base md:w-20 w-14 rounded shadow-md relative -top-14 sm:-top-0 sm-absolute";

    return (
        <div className=' w-1/2 flex justify-evenly flex-col'>
            {(label === "Buy" && classBuy) ||
            (label === "Borrow" && classBorrow) ? (
                <button
                    className={label === "Buy" ? classBuy : classBorrow}
                    onClick={handleClick}
                >
                    {label}
                </button>
            ) : null}
        </div>
    );
}

export default BuyBorrowBtn;

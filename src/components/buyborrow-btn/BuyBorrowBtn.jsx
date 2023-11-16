"use client";

import React from "react";
import { useTranslations } from "next-intl";

function BuyBorrowBtn({ label, handleClick }) {
    const t = useTranslations("Index");

    const classBuy =
        "bg-[#0989FF] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#026fce] duration-300 text-white text-center font-lato text-base px-7 py-1 rounded shadow-md";

    const classBorrow =
        "bg-[#FFBD00] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#e8ac09] duration-300 text-white text-center hover:transition-all font-lato text-base px-5 py-1 rounded shadow-md sm-absolute";

    return (
        <div className=' sm:w-1/3 w-1/2 flex justify-evenly flex-col'>
            {(label === "Buy" && classBuy) ||
            (label === "Borrow" && classBorrow) ? (
                <button
                    className={label === "Buy" ? classBuy : classBorrow}
                    onClick={handleClick}
                >
                    {t(label)}
                </button>
            ) : null}
        </div>
    );
}

export default BuyBorrowBtn;

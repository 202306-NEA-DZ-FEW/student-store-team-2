"use client";
import { useTranslations } from "next-intl";
import React from "react";

const ItemLabel = ({ textContent }) => {
    const t = useTranslations("Index");

    let style = "";
    if (textContent === t("for_sale")) {
        style = `bg-secondaryBlue`;
    } else if (textContent === t("for_borrow")) {
        style = `bg-secondaryGreen`;
    } else {
        style = `bg-secondaryGreen`;
    }

    return (
        <div
            className={`capitalize flex justify-center text-center items-center font-jost font-bold rounded-full ${style} text-white text-sm w-[105px] h-[26px]`}
        >
            {t(textContent?.split("_")?.join(" "))}
        </div>
    );
};

export default ItemLabel;

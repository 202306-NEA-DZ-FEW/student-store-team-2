"use client";
import { useTranslations } from "next-intl";

import ProductCard from "../productCard/ProductCard";

export default function AddedGrid() {
    const t = useTranslations("Index");
    return (
        <div className='py-20   content-evenly' style={{ width: "1000px" }}>
            <p className='text-titleContent text-3xl capitalize-words text-center font-jost tracking-wide py-14'>
                {t("recently added")}
            </p>

        </div>
    );
}

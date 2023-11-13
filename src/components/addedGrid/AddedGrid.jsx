"use client";
import { useTranslations } from "next-intl";

export default function AddedGrid() {
    const t = useTranslations("Index");
    return (
        <div className='py-20   content-evenly'>
            <p className='text-titleContent text-3xl capitalize-words text-center font-jost tracking-wide py-14'>
                {t("recently added")}
            </p>
            {/* <div className='flex flex-wrap items-center justify-center gap-5 '>
                <div style={{ width: "306px" }}>
                    <ProductCard />
                </div>
                <div style={{ width: "306px" }}>
                    <ProductCard />
                </div>
                <div style={{ width: "306px" }}>
                    <ProductCard />
                </div>
                <div style={{ width: "306px" }}>
                    <ProductCard />
                </div>
                <div style={{ width: "306px" }}>
                    <ProductCard />
                </div>
                <div style={{ width: "306px" }}>
                    <ProductCard />
                </div>
                <div style={{ width: "306px" }}>
                    <ProductCard />
                </div>
                <div style={{ width: "306px" }}>
                    <ProductCard />
                </div>
                <div style={{ width: "306px" }}>
                    <ProductCard />
                </div> */}

            {/* </div> */}
        </div>
    );
}

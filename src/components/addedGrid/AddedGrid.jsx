"use client";
import { useTranslations } from "next-intl";

import ProductCard from "../productCard/ProductCard";

export default function AddedGrid({ latestProducts }) {
    const t = useTranslations("Index");
    return (
        <div className='py-20   content-evenly'>
            <p className='text-titleContent text-3xl capitalize-words text-center font-jost tracking-wide py-14'>
                {t("recently added")}
            </p>
            <div className='grid-wrapper gap-y-14  gap-4 justify-center grid grid-cols-[repeat(1,308px)]  lg:grid-cols-[repeat(4,308px)] xl:grid-cols-[repeat(4,308px)] 2xl:grid-cols-[repeat(4,308px)] pb-10'>
                {latestProducts &&
                    latestProducts.map((product) => (
                        <ProductCard key={product.pid} product={product} />
                    ))}
            </div>
        </div>
    );
}

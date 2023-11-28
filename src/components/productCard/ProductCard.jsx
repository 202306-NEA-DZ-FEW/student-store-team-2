"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import useTextDirection from "@/hooks/useTextDirection";

import ItemConditionLabel from "./itemConditionLabel/ItemConditionLabel";
import ItemLabel from "./itemLabel/ItemLabel";

export default function ProductCard({ product }) {
    const t = useTranslations("Index");
    const direction = useTextDirection();
    // Conditional rendering function for displaying what icon to show under the item depending on its offer type
    const itemOffer = ({ sale_offer, borrow_offer }) => {
        return (
            <>
                {sale_offer && <span>{sale_offer.price}</span>}
                {borrow_offer && (
                    <span>
                        {borrow_offer.price}/{t("Day")}
                    </span>
                )}
            </>
        );
    };

    return (
        <Link
            href={"/products/" + product.pid}
            className='group w-fit py-2 px-1 rounded-md pt-1 '
        >
            <div className='relative rounded-md bg-gray-200  group-hover:opacity-75 overflow-hidden  w-[18rem] h-[21rem]'>
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    layout='fill'
                    className='object-cover object-center group-hover:scale-125 transition-all ease-in'
                />
                <div className='absolute bottom-0 left-0 mt-6 text-black'>
                    <ItemConditionLabel itemCondition={itemOffer(product)} />
                </div>{" "}
            </div>
            <div className='mt-3 flex '>
                <div className='product-infos'>
                    <div className='mt-1 text-2xl font-jost  text-gray-900'>
                        {product.name}
                    </div>
                    <div className='font-jost text-sm  text-gray-600 mt-1'>
                        {product?.categories?.category_name}
                    </div>

                    {/* {itemOffer(product)} */}
                </div>
                <div
                    className={`${
                        direction === "ltr" ? "ml-auto" : "mr-auto"
                    }  i`}
                >
                    {" "}
                    <ItemLabel textContent={product.offer_type} />
                </div>
            </div>
        </Link>
    );
}

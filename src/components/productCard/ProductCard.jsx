"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaShoppingCart } from "react-icons/fa";
import { SiHandshake } from "react-icons/si";

import useTextDirection from "@/hooks/useTextDirection";

import ItemConditionLabel from "./itemConditionLabel/ItemConditionLabel";
import ItemLabel from "./itemLabel/ItemLabel";

export default function ProductCard({ product }) {
    const t = useTranslations("Index");
    const direction = useTextDirection();
    // Conditional rendering function for displaying what icon to show under the item depending on its offer type
    const itemOffer = ({ sale_offer, borrow_offer }) => {
        return (
            <div>
                {sale_offer && (
                    <div className='mt-4 font-jost flex text-base font-small text-titleContent'>
                        <FaShoppingCart className='text-xl mr-8 text-accent' />
                        {sale_offer.price}
                    </div>
                )}
                {borrow_offer && (
                    <div className='mt-4 font-jost flex  text-base font-small text-titleContent'>
                        <SiHandshake className='text-lg mr-8 text-accent' />{" "}
                        {borrow_offer.price}/{t("Day")}
                    </div>
                )}
            </div>
        );
    };

    return (
        <Link href={"/products/" + product.pid} className='group w-fit'>
            <div className='relative rounded-md bg-gray-200  group-hover:opacity-75 overflow-hidden'>
                <Image
                    src={product.image[0]}
                    alt={product.name}
                    width={306}
                    height={387}
                    className='object-cover object-center group-hover:scale-125 transition-all ease-in'
                />
                <div className='absolute bottom-0 left-0 mt-6 text-black'>
                    <ItemConditionLabel
                        itemCondition={product.condition + "/10"}
                    />
                </div>{" "}
            </div>
            <div className='mt-3 flex '>
                <div className='product-infos'>
                    <div className='font-jost text-sm  text-titleContent'>
                        {product?.categories?.category_name}
                    </div>

                    <div className='mt-1 text-xl font-jost  text-gray-900'>
                        {product.name}
                    </div>

                    {itemOffer(product)}
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

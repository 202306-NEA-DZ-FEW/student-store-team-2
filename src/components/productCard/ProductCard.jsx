"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaShoppingCart } from "react-icons/fa";
import { SiHandshake } from "react-icons/si";

import ItemConditionLabel from "./itemConditionLabel/ItemConditionLabel";
import ItemLabel from "./itemLabel/ItemLabel";

export default function ProductCard({ product, categories }) {
    const t = useTranslations("Index");

    // // Placeholder object to be replaced with data from Firestore
    // const product = {
    //     category: "Books",
    //     condition: "7",
    //
    //     description: "lorem ipsum",
    //     for_borrow: true,
    //     for_sale: false,
    //     id: "0",
    //     imageSrc:
    //         "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    //     is_borrowed: true,
    //     is_sold: true,
    //     name: "Atomic Habits",
    //     price: 50,
    //     uid: "121",
    // };

    // Conditional rendering function for displaying what icon to show under the item depending on its offer type
    const itemOffer = ({ for_borrow, for_sale, price }) => {
        return (
            <div>
                {for_sale && (
                    <div className='mt-4 font-jost flex text-base font-small text-titleContent'>
                        <FaShoppingCart className='text-xl mr-8 text-accent' />
                        {price}
                    </div>
                )}
                {for_borrow && (
                    <div className='mt-4 font-jost flex  text-base font-small text-titleContent'>
                        <SiHandshake className='text-lg mr-8 text-accent' />{" "}
                        {price}/{t("Day")}
                    </div>
                )}
            </div>
        );
    };
    // This determins what ItemLabel displays according the product offer type
    const determineLabel = ({ for_sale, for_borrow }) => {
        if (for_sale && for_borrow) {
            return "Sale & Borrow"; // Translate the label
        } else if (for_sale) {
            return "For Sale"; // Translate the label
        } else if (for_borrow) {
            return "For Borrow"; // Translate the label
        }
        return "";
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
                        {categories[product.category]}
                    </div>

                    <div className='mt-1 text-xl font-jost  text-gray-900'>
                        {product.name}
                    </div>

                    {itemOffer(product)}
                </div>
                <div className='ml-auto'>
                    {" "}
                    <ItemLabel textContent={determineLabel(product)} />
                </div>
            </div>
        </Link>
    );
}

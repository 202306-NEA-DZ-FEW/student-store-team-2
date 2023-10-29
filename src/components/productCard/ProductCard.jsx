"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaShoppingCart } from "react-icons/fa";
import { SiHandshake } from "react-icons/si";

import ItemConditionLabel from "./itemConditionLabel/ItemConditionLabel";
import ItemLabel from "./itemLabel/ItemLabel";

export default function ProductCard() {
    const t = useTranslations("Index");

    // Placeholder object to be replaced with data from Firestore
    const products = [
        {
            category: "Books",
            condition: "7",
            created_at: "October 16, 2023 at 3:33:59 PM UTC+2",
            description: "lorem ipsum",
            for_borrow: true,
            for_sale: true,
            id: "0",
            imageSrc:
                "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            is_borrowed: true,
            is_sold: true,
            name: "Book",
            price: {
                borrow_price: "$20",
                sell_price: "$100",
            },
            uid: "121",
        },
    ];

    // Conditional rendering function for displaying what icon to show under the item depending on its offer type
    const itemOffer = (product) => {
        return (
            <div>
                {product.is_sold && (
                    <Link href='/dashboard'>
                        <div className='mt-1 font-jost flex justify-between text-base font-small text-titleContent'>
                            <FaShoppingCart className='text-xl mr-8 text-blue-500' />
                            {product.price.sell_price}
                        </div>
                    </Link>
                )}
                {product.is_borrowed && (
                    <Link href='/dashboard'>
                        <div className='mt-1 font-jost flex justify-between text-base font-small text-titleContent'>
                            <SiHandshake className='text-lg mr-8 text-blue-500' />{" "}
                            {product.price.borrow_price}/{t("Day")}
                        </div>
                    </Link>
                )}
            </div>
        );
    };
    // This determins what ItemLabel displays according the product offer type
    const determineLabel = (product) => {
        if (product.is_sold && product.is_borrowed) {
            return "Sale & Borrow"; // Translate the label
        } else if (product.is_sold) {
            return "For Sale"; // Translate the label
        } else if (product.is_borrowed) {
            return "For Borrow"; // Translate the label
        }
        return "";
    };

    return (
        <div className=' bg-white'>
            <div className='mx-auto max-w-2xl   lg:max-w-7xl '>
                {products.map((product) => (
                    <div key={product.id} className='group relative'>
                        <div className='relative w-full overflow-hidden rounded-md bg-gray-200  group-hover:opacity-75 lg:h-80'>
                            <Link href={`/product/${product.id}`}>
                                <Image
                                    src={product.imageSrc}
                                    alt={product.imageAlt}
                                    width={500}
                                    height={500}
                                    className='h-full w-full object-cover object-center lg:h-full lg:w-full'
                                />
                            </Link>
                            <div className='absolute bottom-0 left-0 mt-6 text-black'>
                                <ItemConditionLabel
                                    itemCondition={product.condition + "/10"}
                                />
                            </div>{" "}
                        </div>
                        <div className='mt-3 flex justify-between'>
                            <div>
                                <h3 className='font-jost text-sm font-semibold text-titleContent'>
                                    <Link href='/category'>
                                        <div aria-hidden='true' />
                                        {product.category}
                                    </Link>
                                </h3>
                                <Link href={`/product/${product.id}`}>
                                    <div className='mt-1 text-lg font-jost font-bold text-gray-900'>
                                        {product.name}
                                    </div>
                                    {itemOffer(product)}
                                </Link>
                            </div>
                            <Link href='/offerType'>
                                <ItemLabel
                                    textContent={determineLabel(product)}
                                />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import Image from "next/image";
import Link from "next/link";
import { FaHandHoldingMedical } from "react-icons/fa";
import { PiShoppingCartThin } from "react-icons/pi";

export default function ProductCard() {
    // Placeholder object to be replaced with data from Firestore
    const products = [
        {
            id: 1,
            name: "Basic Tee",
            href: "#",
            imageSrc:
                "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
            imageAlt: "Front of men's Basic Tee in black.",
            price: "$35",
            color: "Black",
            category: "Clothing",
            offer: ["borrow", "sale"],
        },
        // More products...
    ];

    // Conditional rendering function for displaying what icon to show under the item depending on its offer type
    const itemOffer = (product) => {
        return (
            <div>
                {product.offer.includes("sale") && (
                    <Link href='/dashboard'>
                        <p className='mt-1 flex justify-between text-sm font-small text-gray-900'>
                            <PiShoppingCartThin className=' text-xl text-blue-500' />{" "}
                            {product.price}
                        </p>
                    </Link>
                )}
                {product.offer.includes("borrow") && (
                    <Link href='/dashboard'>
                        <p className='mt-1 flex justify-between text-sm font-small text-gray-900'>
                            <FaHandHoldingMedical className=' text-lg text-blue-500' />{" "}
                            {product.price}
                        </p>
                    </Link>
                )}
            </div>
        );
    };

    return (
        <div className=' bg-white'>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
                <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
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
                                <p className='absolute bottom-0 left-0 mt-6 text-black'>
                                    6/10
                                </p>{" "}
                                {/*Replace with product state tag banner*/}
                            </div>
                            <div className='mt-3 flex justify-between'>
                                <div>
                                    <h3 className='text-sm text-gray-700'>
                                        <Link href='/category'>
                                            <div
                                                aria-hidden='true'
                                                className='absolute'
                                            />
                                            {product.category}
                                        </Link>
                                    </h3>
                                    <Link href={`/product/${product.id}`}>
                                        <p className='mt-1 text-lg font-medium text-gray-900'>
                                            {product.name}
                                        </p>
                                        {itemOffer(product)}
                                    </Link>
                                </div>
                                <Link href='/offer'>
                                    <div className='mt-1 text-sm font-medium text-gray-900'>
                                        product offer
                                    </div>{" "}
                                    {/*Replace with product offer tag button*/}
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

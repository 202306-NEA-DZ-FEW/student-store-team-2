import Image from "next/image";
import { useEffect, useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";

import { getProduct, getUserProfile } from "@/lib/supabase";

const ProductItem = ({ fetchPurchases, product }) => {
    let text = product.status; // Use product status
    let secondUser = product.second_user;
    let textColorClass = "text-black";
    if (text === "requested") {
        textColorClass = "text-blue-500"; // Change to blue for 'requested'
    } else if (text === "completed") {
        textColorClass = "text-red-500"; // Change to red for 'completed'
    } else if (text === "awaiting pickup") {
        textColorClass = "text-yellow-500"; // Change to yellow for 'awaiting pickup'
    }

    const [productData, setProductData] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productDetails = await getProduct(product.productId);
                setProductData(productDetails);

                const userDetails = await getUserProfile(secondUser);
                setUserData(userDetails);
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            setLoading(false);
        };

        fetchData();
    }, [getProduct, getUserProfile]);

    return (
        <>
            {loading ? (
                <div>
                    <div className='w-full border border-title/20 p-2 rounded-md my-2 animate-pulse'>
                        <h1 className='ml-48 w-4/6 h-[32px] text-gray-400 bg-gray-400 sm:w-4/6 sm:h-[32px] '>
                            ...
                        </h1>
                        <div className='flex justify-start items-start'>
                            <Image
                                src='https://via.placeholder.com/300x300'
                                alt='placeholder'
                                width={130}
                                height={235}
                            />
                            <div className='space-y-4 ml-7 font-lato flex justify-center'>
                                <h1 className='w-4/6 h-[32px]  bg-gray-400 sm:w-4/6 animate-pulse rounded'></h1>
                                <div className='hidden sm:inline-block'></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                productData && (
                    <div>
                        <div className='w-full border border-title/20 p-2 rounded-md my-2'>
                            <h5
                                className={`flex items-center justify-center  uppercase text-xs ${textColorClass}`}
                            >
                                {text}
                            </h5>

                            <div className='flex justify-start items-start '>
                                <Image
                                    src={productData.image[0]}
                                    alt={productData.name}
                                    width={130}
                                    height={235}
                                />
                                <div className='space-y-4 ml-7 font-lato'>
                                    <h1 className='w-4/6 h-[46px] capitalize-words font-semibold font-jost tracking-wider text-titleContent sm:w-4/6 sm:h-[45.83px] '>
                                        {productData.name}
                                    </h1>
                                    <div className='hidden sm:inline-block'>
                                        <div className='flex justify-start space-x-8 md:space-x-8 text-xs'>
                                            <a
                                                href='#'
                                                className='hover:text-accent'
                                            >
                                                <div className='flex justify-start items-start space-x-2 drop-shadow-xl'>
                                                    <BsPersonCircle className='text-accent w-9 h-9' />
                                                    <h2 className='uppercase text-accent'>
                                                        {userData?.first_name}{" "}
                                                        {userData?.last_name}
                                                    </h2>
                                                </div>
                                            </a>

                                            <a
                                                href='#'
                                                className='hover:text-accent'
                                            >
                                                <div className='flex justify-start items-start space-x-2'>
                                                    <AiOutlineMessage className='h-9 w-9' />

                                                    <h2 className='drop-shadow-xl text-titleContent'>
                                                        Send message
                                                    </h2>
                                                </div>
                                            </a>
                                            <a
                                                href='#'
                                                className='hover:text-accent'
                                            >
                                                <div className='flex justify-start items-start space-x-2'>
                                                    <FaPhoneAlt className='h-8 w-8' />
                                                    <h2 className='drop-shadow-xl text-titleContent'>
                                                        {userData?.phone_num}
                                                    </h2>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                    {/* {productData.offer_type === "for_borrow" && (
                  <div className='flex flex-col  space-x-0 space-y-4 md:flex-row md:space-x-14 md:space-y-0 text-xs '>
                    <div className='flex justify-start items-start space-x-5 md:flex-col md:space-x-0'>
                      <p className='uppercase text-xs text-titleContent'>
                        borrow period
                      </p>
                      <p className='text-title2 text-xs'>borrow_period</p>
                    </div>
                  </div>
                )} */}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default ProductItem;

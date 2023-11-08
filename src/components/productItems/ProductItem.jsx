import Image from "next/image";
import { AiOutlineMessage } from "react-icons/ai";
import { BsPersonCircle } from "react-icons/bs";
import { FaPhoneAlt } from "react-icons/fa";
const ProductItem = ({ text, name, order_num, phone }) => {
    text = "requested";
    let textColorClass = "text-black"; // Default text color class
    if (text === "requested") {
        textColorClass = "text-blue-500"; // Change to blue for 'requested'
    } else if (text === "completed") {
        textColorClass = "text-red-500"; // Change to red for 'completed'
    } else if (text === "awaiting pickup") {
        textColorClass = "text-yellow-500"; // Change to yellow for 'awaiting pickup'
    }
    return (
        <div className='sm:w-[935px] sm:h-[255px]'>
            <h5
                className={`flex items-center justify-center py-6 uppercase text-xs ${textColorClass}`}
            >
                {text}
            </h5>
            <div className='flex justify-start items-start'>
                <Image
                    src='https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg'
                    alt='Product dress'
                    width={130}
                    height={235}
                />
                <div className='space-y-4 ml-7 font-lato'>
                    <h1 className='w-[215px] h-[46px] capitalize-words font-semibold font- tracking-wider text-titleContent sm:w-[681.39px] sm:h-[45.83px] '>
                        {name}
                    </h1>
                    <div className='hidden md:block'>
                        <div className='flex justify-start space-x-8 md:space-x-8 text-xs'>
                            <p className='uppercase text-titleContent text-xs'>
                                borrowed for
                            </p>
                            <p className='text-title2 text-xs '>
                                {/*borrowed_for*/}
                            </p>
                            <a href='#' className='hover:text-accent'>
                                <div className='flex justify-start items-start space-x-2 drop-shadow-xl'>
                                    <BsPersonCircle className='text-accent w-9 h-9' />
                                    <h2 className='uppercase text-accent'>
                                        ahmed
                                    </h2>
                                </div>
                            </a>

                            <a href='#' className='hover:text-accent'>
                                <div className='flex justify-start items-start space-x-2'>
                                    <AiOutlineMessage className='h-9 w-9' />

                                    <h2 className='drop-shadow-xl text-titleContent'>
                                        Send message
                                    </h2>
                                </div>
                            </a>
                            <a href='#' className='hover:text-accent'>
                                <div className='flex justify-start items-start space-x-2'>
                                    <FaPhoneAlt className='h-8 w-8' />
                                    <h2 className='drop-shadow-xl text-titleContent'>
                                        {phone}
                                    </h2>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className='flex flex-col  space-x-0 space-y-4 md:flex-row md:space-x-14 md:space-y-0 text-xs '>
                        <div className='flex justify-start items-start space-x-5 md:flex-col md:space-x-0'>
                            <p className='uppercase text-xs text-titleContent'>
                                borrow period
                            </p>
                            <p className='text-title2 text-xs'>
                                {/*borrow_period*/}
                            </p>
                        </div>
                        <div className='flex justify-start items-start space-x-7 md:flex-col md:space-x-0'>
                            <p className='uppercase text-xs font-lato text-titleContent '>
                                Order number
                            </p>
                            <p className='text-title2'>{order_num}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;

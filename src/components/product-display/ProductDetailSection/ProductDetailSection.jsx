"use client";
import React from "react";

// import ItemConditionLabel from "../../productCard/itemConditionLabel/ItemConditionLabel";
import BuyBorrowBtn from "../../buyborrow-btn/BuyBorrowBtn";

// Placeholder object to be replaced with data from Firestore
const productDetails = {
    name: "circle dining table",
    description:
        "Tristique ullamcorper nunc egestas non. Justo, cum feugiat imperdiet nulla molestie ac vulputate scelerisque amet. Bibendum adipiscing platea blandit sit sed quam semper rhoncus. Diam ultrices maecenas consequat eu tortor. Orci, cras lectus mauris, cras egestas quam venenatis neque.",
    condition: "6",
    price: {
        borrow_price: "20",
        sell_price: "100",
    },
    categoty: "Fourniture",
};

export default function ProductDetailSection() {
    return (
        <section className=' w-full flex flex-col'>
            <div className='mb-10 ml-4'>
                <h2 className='font-lato text-5xl uppercase text-[#55585B]'>
                    {productDetails.name}
                </h2>
                {/* <div className='absolute bottom-0 left-0 mt-6 text-black'>
            <ItemConditionLabel
              itemCondition={productDetails.condition + "/10"}
              />
        </div> */}

                <span classeName='bg-[#FFBD00] text-white font-jost font-semibold  '>
                    note: {productDetails.condition + "/10"}
                </span>
            </div>

            <p className='w-5/6 text-base font-medium mb-2'>
                {productDetails.description}
            </p>
            <div className='ml-8 text-[#3A3A3A] w-full flex items-center gap-10 my-1'>
                <div className='w-2/12 flex flex-row '>
                    <BuyBorrowBtn label='Buy' />
                    <p className='font-lato text-lg font-semibold'>
                        ${productDetails.price.sell_price}
                    </p>
                </div>
                <div className='w-[188px] flex flex-row'>
                    <BuyBorrowBtn label='Borrow' />
                    <p className='font-lato text-lg font-semibold'>
                        ${productDetails.price.borrow_price}{" "}
                        <span className='text-[#55585B] text-sm font-thin font-jost'>
                            per day
                        </span>
                    </p>
                </div>
            </div>
        </section>
    );
}

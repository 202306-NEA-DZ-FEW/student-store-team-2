"use client";
import { useTranslations } from "next-intl";
import { FaList, FaRegSmile, FaShoppingBag, FaThumbsUp } from "react-icons/fa";

function FeatureBanner() {
    const t = useTranslations("Index");

    return (
        <div className='flex flex-col mt-32'>
            <div className='mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center font-lato'>
                {/* Feature Card 1 */}
                <div
                    className='flex items-start rounded-xl bg-white p-4 shadow-lg hover:scale-105'
                    style={{ width: "283px" }}
                >
                    {/* Icon */}
                    <div className='flex  mx-4 p-1  h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50'>
                        <FaList className='h-6 w-6  text-blue-400' />
                    </div>
                    {/* Text Content */}
                    <div className='ml-4'>
                        <p className='font-semibold uppercase text-12 md:text-25'>
                            {t("Comprehensive Catalog")}
                        </p>
                        <p className='mt-2 text-sm text-gray-500'>
                            {t("feature descriprion 1")}
                        </p>
                    </div>
                </div>
                {/* Feature Card 2 */}
                <div
                    className='flex items-start rounded-xl bg-white p-4 shadow-lg hover:scale-105'
                    style={{ width: "283px" }}
                >
                    {/* Icon */}
                    <div className='flex mx-4 p-1 h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50'>
                        <FaShoppingBag className='h-6 w-6 text-orange-400' />
                    </div>
                    {/* Text Content */}
                    <div className='ml-4'>
                        <p className='font-semibold uppercase text-12 md:text-25'>
                            {t("Buy, Sell, Borrow")}
                        </p>
                        <p className='mt-2 text-sm text-gray-500'>
                            {t("feature descriprion 2")}
                        </p>
                    </div>
                </div>
                {/* Feature Card 3 */}
                <div
                    className='flex items-start rounded-xl bg-white p-4 shadow-lg hover:scale-105'
                    style={{ width: "283px" }}
                >
                    {/* Icon */}
                    <div className='flex mx-4 p-1 h-12 w-12 items-center justify-center rounded-full border border-green-100 bg-green-50'>
                        <FaRegSmile className='h-6 w-6 text-green-400' />
                    </div>
                    <div className='ml-4'>
                        <p className='font-semibold uppercase text-12 md:text-25'>
                            {t("User-Friendly Experience")}{" "}
                        </p>
                        <p className='mt-2 text-sm text-gray-500'>
                            {" "}
                            {t("feature descriprion 3")}
                        </p>
                    </div>
                </div>
                {/* Feature Card 4 */}
                <div
                    className='flex mx-4 p-1 items-start rounded-xl bg-white p-4 shadow-lg hover:scale-105'
                    style={{ width: "283px" }}
                >
                    {/* Icon */}
                    <div className='flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50'>
                        <FaThumbsUp className='h-6 w-6 text-red-400' />
                    </div>
                    <div className='ml-4'>
                        <p className='font-semibold uppercase text-12 md:text-25'>
                            {t("Community Support Initiative")}{" "}
                        </p>
                        <p className='mt-2 text-sm text-gray-500'>
                            {" "}
                            {t("feature descriprion 4")}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FeatureBanner;

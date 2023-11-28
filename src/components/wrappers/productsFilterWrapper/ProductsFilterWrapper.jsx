"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";

import CategoryFilter from "@/components/filters/categoryFilter/CategoryFilter";
import NoteFilter from "@/components/filters/noteFilter/NoteFilter";
import PriceFilter from "@/components/filters/priceFilter/PriceFilter";
import StatusFilter from "@/components/filters/statusFilter/StatusFilter";

function ProductsFilterWrapper({
    autoSendRequest = true,
    toggleSidebar,
    categories,
}) {
    const searchParams = useSearchParams();
    const t = useTranslations("Index");
    const router = useRouter();
    const [price, setPrice] = useState({
        min: searchParams.get("minPrice") ? searchParams.get("minPrice") : 0,
        max: searchParams.get("maxPrice") ? searchParams.get("maxPrice") : 1000,
    });
    const [status, setStatus] = useState(
        searchParams.get("status") ? searchParams.get("status") : ""
    );
    const [note, setNote] = useState(
        searchParams.get("note") ? searchParams.get("note") : ""
    );
    const [category, setCategory] = useState(
        searchParams.get("category") ? searchParams.get("category") : ""
    );

    // track when the component is mounted
    const requestRef = useRef(false);
    // initial price
    const initialPrice = {
        min: 0,
        max: 1000,
    };

    const handlePriceChange = (obj) => {
        if (Object.keys(obj)[0] === "min") {
            setPrice({ ...price, min: obj.min });
        } else {
            setPrice({ ...price, max: obj.max });
        }
    };

    const handleStatusChange = (val) => {
        setStatus(val);
    };
    const handleNoteChange = (val) => {
        setNote(val);
    };
    const handleCategoryChange = (val) => {
        setCategory(val);
    };

    const handleSendRequest = () => {
        sendRequest();
        toggleSidebar();
    };
    const resetState = () => {
        setPrice(initialPrice);
        setStatus("");
        setNote("");
        setCategory("");
    };

    const sendRequest = () => {
        const queryParams = new URLSearchParams();

        const paramsArray = [
            { minPrice: price.min },
            { maxPrice: price.max === initialPrice.max ? "" : price.max },
            { status },
            { note },
            { category },
        ];
        paramsArray.forEach((param) => {
            if (param[Object.keys(param)[0]]) {
                queryParams.append(
                    Object.keys(param)[0],
                    param[Object.keys(param)[0]]
                );
            }
        });
        const url = searchParams.has("page")
            ? `page=${searchParams.get("page")}&${queryParams.toString()}`
            : queryParams.toString();

        router.push("/products" + "?" + url);
    };

    useEffect(() => {
        if (requestRef.current) {
            requestRef.current = false;
            return;
        }
        // Send a request each time one of the state variables changes
        if (autoSendRequest) {
            sendRequest();
        }
    }, [price.min, price.max, status, note, category]);
    return (
        <div className='max-sm:pb-12 '>
            <div className=' mb-6 '>
                <div className='flex w-full justify-between  mb-4 '>
                    <button
                        onClick={resetState}
                        className='block text-md py-1 px-3  bg-gray-200 rounded-sm hover:bg-gray-400 active:bg-gray-200'
                    >
                        {t("Reset")}
                    </button>
                    {/* show only in mobile view */}
                    {!autoSendRequest && (
                        <button
                            onClick={handleSendRequest}
                            className='block text-md py-1 px-3 text-white bg-accent rounded-sm hover:bg-gray-400 active:bg-gray-500'
                        >
                            {t("Filter")}
                        </button>
                    )}
                </div>
                <h1 className='block uppercase text-lg '>{t("Filter By")}: </h1>
            </div>
            <div className='flex flex-col gap-8'>
                <PriceFilter
                    minVal={price.min}
                    maxVal={price.max}
                    handlePriceChange={handlePriceChange}
                />
                <StatusFilter
                    handleStatusChange={handleStatusChange}
                    currentStatus={status}
                />
                <NoteFilter
                    currentNote={note}
                    handleNoteChange={handleNoteChange}
                />
                <CategoryFilter
                    categories={categories}
                    currentCategory={category}
                    handleCategoryChange={handleCategoryChange}
                />
            </div>
        </div>
    );
}

export default ProductsFilterWrapper;

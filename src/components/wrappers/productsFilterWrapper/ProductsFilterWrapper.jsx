"use client";
import PriceFilter from "@/components/filters/priceFilter/PriceFilter";
import React from "react";
import { useState } from "react";

function ProductsFilterWrapper() {
    const [price, setPrice] = useState({
        min: 0,
        max: 1000,
    });

    const handlePriceChange = (obj) => {
        if (Object.keys(obj)[0] === "min") {
            setPrice({ ...price, min: obj.min });
        } else {
            setPrice({ ...price, max: obj.max });
        }
    };
    return (
        <div>
            <PriceFilter
                min={price.min}
                max={price.max}
                handlePriceChange={handlePriceChange}
            />
            <button
                onClick={() => setPrice({ min: 0, max: 1000 })}
                className='w-48 bg-red-400 '
            >
                click me
            </button>
        </div>
    );
}

export default ProductsFilterWrapper;

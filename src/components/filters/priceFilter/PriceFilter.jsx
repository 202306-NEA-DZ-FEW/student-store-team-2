"use client";
import { useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";

const PriceFilter = ({ minVal, maxVal, handlePriceChange }) => {
    const t = useTranslations("Index");
    const [min, setMin] = useState(minVal);
    const [max, setMax] = useState(maxVal);
    const minValRef = useRef(min);
    const maxValRef = useRef(max);
    const range = useRef(null);

    // title
    const title = t("Price Filter");
    // Convert to percentage
    const getPercent = (value) =>
        Math.round(
            ((value - minValRef.current) /
                (maxValRef.current - minValRef.current)) *
                100
        );

    // Set width of the range to decrease from the left side
    useEffect(() => {
        const minPercent = getPercent(min);
        const maxPercent = getPercent(max);

        if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [min]);

    // Set width of the range to decrease from the right side
    useEffect(() => {
        const minPercent = getPercent(min);
        const maxPercent = getPercent(max);

        if (range.current) {
            range.current.style.width = `${maxPercent - minPercent}%`;
        }
    }, [max]);

    return (
        <div className='pb-10'>
            <h2 className='font-jost sm:text-lg'>{title}</h2>
            <div className='mt-4'>
                <input
                    type='range'
                    min={minValRef.current}
                    max={maxValRef.current}
                    value={min}
                    onChange={(event) => {
                        const value = Math.min(
                            Number(event.target.value),
                            max - 1
                        );
                        setMin(value);
                    }}
                    onMouseUp={(event) => {
                        const value = Math.min(
                            Number(event.target.value),
                            max - 1
                        );

                        handlePriceChange({ min: value });
                    }}
                    className='thumb thumb--left pointer-events-none absolute h-0 w-52 outline-none z-30'
                    style={{ zIndex: min > max - 100 && "5" }}
                />
                <input
                    type='range'
                    min={minValRef.current}
                    max={maxValRef.current}
                    value={max}
                    onChange={(event) => {
                        const value = Math.max(
                            Number(event.target.value),
                            min + 1
                        );
                        setMax(value);
                    }}
                    onMouseUp={(event) => {
                        const value = Math.max(
                            Number(event.target.value),
                            min + 1
                        );
                        handlePriceChange({ max: value });
                    }}
                    className='thumb thumb--right pointer-events-none absolute h-0 w-52 outline-none z-40 '
                />
                <div className='relative w-52'>
                    <div className='slider__track absolute rounded h-1 bg-gray-200 w-full z-10' />
                    <div
                        className='slider__range absolute rounded h-1 z-20 bg-[#821F40]'
                        ref={range}
                    />
                    <div className='slider__left-value absolute text-[#55585B] text-xs left-2 mt-5'>
                        {min}
                    </div>
                    <div className='slider__right-value absolute text-[#55585B] text-xs mt-5 right-1'>
                        {max}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PriceFilter;

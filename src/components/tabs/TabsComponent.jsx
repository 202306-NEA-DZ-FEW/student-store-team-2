"use client";
import React, { useState } from "react";

import AdditionalInfoTab from "./additionalInfoTab/AdditionalInfoTab";
import LocationTab from "./locationTab/LocationTab";
import MobileTabs from "../mobileTabs/MobileTabs";

function TabsComponent({ additional_info, coord, tabs }) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);
    const components = [
        <AdditionalInfoTab key={0} items={additional_info} />,
        <LocationTab key={1} coord={coord} />,
    ];

    const handleTabClick = (index) => {
        setSelectedTabIndex(index);
    };

    return (
        <>
            {/* Desktop View */}
            <div className='hidden w-3/4 sm:block font-lato'>
                <ul className='flex list-none bg-blue-gray-50/60 rounded-lg p-1'>
                    {tabs &&
                        tabs.map((tab, index) => (
                            <li key={index} className='flex-auto text-center'>
                                <button
                                    className={`mb-0 flex w-full cursor-pointer items-center justify-center rounded-lg px-0 py-1 transition-all ease-in-out  hover:border-b hover:border-accent ${
                                        selectedTabIndex === index
                                            ? "text-white bg-accent"
                                            : ""
                                    }`}
                                    onClick={() => handleTabClick(index)}
                                    key={index}
                                >
                                    {tab}
                                </button>
                            </li>
                        ))}
                </ul>
                <div className='w-full'>{components[selectedTabIndex]}</div>
            </div>

            {/* Mobile View */}
            <MobileTabs
                tabs={tabs}
                components={components}
                selectedTabIndex={selectedTabIndex}
                handleTabClick={handleTabClick}
            />
        </>
    );
}

export default TabsComponent;

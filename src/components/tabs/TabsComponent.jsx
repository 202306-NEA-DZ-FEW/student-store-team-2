"use client";
import React, { useState } from "react";

import AdditionalInfoTab from "./additionalInfoTab/AdditionalInfoTab";
import LocationTab from "./locationTab/LocationTab";
import MobileTabs from "../mobileTabs/MobileTabs";

function TabsComponent({ tabs }) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const components = [
        <AdditionalInfoTab key={0} items={tabs} />,
        <LocationTab key={1} items={tabs} />,
    ];

    const handleTabClick = (index) => {
        setSelectedTabIndex(index);
    };

    return (
        <>
            {/* Desktop View */}
            <div className='hidden w-3/4 sm:flex flex-col justify-center items-center py-8'>
                <div className='w-full font-medium text-gray-700 text-sm border-b border-gray-200'>
                    {tabs
                        ? tabs.map((tab, index) => (
                              <button
                                  key={index}
                                  onClick={() => handleTabClick(index)}
                                  className='px-4 h-full rounded-sm uppercase text-[#55585B] hover:bg-[#89ceecba] hover:text-white hover:rounded-sm hover:text-base focus:drop-shadow-md focus:bg-[#72adc7ba] focus:text-white focus:rounded-sm focus:border-2 focus:border-gray-200 focus:text-semibold'
                              >
                                  {tab.title}
                              </button>
                          ))
                        : null}
                </div>
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

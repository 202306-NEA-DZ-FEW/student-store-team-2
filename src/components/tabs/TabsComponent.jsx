"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

import LocationTab from "./locationTab/LocationTab";
import MobileTabs from "../mobileTabs/MobileTabs";

function TabsComponent({ coord }) {
    const t = useTranslations("Index");

    const tabs = [
        {
            title: t("Additionnal Information"),
            content: {
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eget placerat nulla. Vivamus enim nunc, mattis et dignissim vitae, tristique vitae est. Donec quis egestas dolor. Mauris vehicula ut purus at accumsan. Sed quis dolor iaculis, posuere enim at, suscipit tortor. Fusce ultrices ligula ut tortor pellentesque, vel fringilla nisi lobortis. Morbi justo risus, fringilla vitae viverra vitae, luctus nec ipsum. Suspendisse ultrices et urna quis ornare. Praesent facilisis turpis at luctus lacinia. Sed egestas aliquet felis a convallis. Vestibulum euismod imperdiet pharetra. Nulla consectetur, tellus id tincidunt tempus, justo eros volutpat lacus, sit amet tempor nulla arcu vel mi. Donec aliquam vestibulum felis, nec tincidunt dolor accumsan et. Sed dignissim posuere dolor, pulvinar accumsan enim luctus eget. Mauris placerat felis felis, eu semper ex sollicitudin id.<br/> Aliquam pharetra fermentum tempor. Morbi tristique tincidunt felis. Maecenas libero lacus, sollicitudin non cursus vitae, aliquet in eros. Nullam tristique ligula non tellus volutpat, ut vestibulum mi pretium. Donec eu egestas massa. Proin pulvinar, erat et vestibulum efficitur, eros ex tristique libero, ac gravida dolor tortor non nunc. Suspendisse massa erat, viverra id magna in, condimentum viverra purus. Etiam ultrices non nisl a pharetra. Fusce pellentesque libero vel nisl lobortis, a pulvinar mauris facilisis. Proin dictum rhoncus mi sed ullamcorper. Vestibulum maximus erat ac arcu sollicitudin efficitur. Nulla facilisi. Duis nisi nisi, tincidunt non ultricies id, fermentum quis enim. Quisque leo mauris, commodo quis vulputate rhoncus, feugiat a urna. Integer sodales massa ac orci accumsan, vitae molestie ante bibendum.<br/>  Phasellus justo tortor, egestas id finibus in, lobortis at nunc. Curabitur ante enim, porta nec posuere et, vulputate at arcu. Etiam id lectus eget risus pretium convallis. Donec vel nisi dignissim, pretium ipsum ac, venenatis arcu. Sed sit amet arcu tempor, sagittis arcu eu, tristique nulla. Sed sed pellentesque turpis. Vivamus dictum convallis magna, vel aliquet felis sagittis ac.",
                title: "Title Test 1",
            },
        },
        {
            title: t("Location"),
        },
    ];
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    const components = [

        // <AdditionalInfoTab key={0} items={tabs} />,
        <LocationTab key={1} coord={coord} />,
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

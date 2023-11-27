"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useState } from "react";

const MapWithNoSSR = dynamic(() => import("@/components/map/Map"), {
    ssr: false,
});

function LocationTab({ coord }) {
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        setShowMap(true);
    }, []);

    return (
        <>
            <div className='w-full flex flex-col justify-center gap-y-6  '>
                <div className='bg-[#EDF1F3] p-1 m-2 rounded flex items-center text-sm font-base text-gray-700 '>
                    <div className='max-w-fit overflow-clip border-2 border-gray-200 rounded-lg p-4'>
                        {showMap && <MapWithNoSSR coord={coord} />}
                    </div>
                </div>
            </div>
        </>
    );
}
export default LocationTab;

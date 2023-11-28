import React from "react";

import DropdownSelect from "@/components/dashboardNavLinks/mobileNavLinks";
import NavLinks from "@/components/dashboardNavLinks/NavLinks";

function layout({ children }) {
    return (
        <div className='pb-40 h-screen'>
            <div className='w-full h-[1px] fixed top-16 bg-gray-200 z-30'></div>

            <div className='flex leading-6 tracking-wider mb-20'>
                <NavLinks />

                <div className='flex-1 max-w-screen overflow-scroll sm:overflow-hidden flex-col justify-center p-4 mt-40   sm:ml-64'>
                    <DropdownSelect />

                    {children}
                </div>

                <div className=''></div>
            </div>
        </div>
    );
}

export default layout;

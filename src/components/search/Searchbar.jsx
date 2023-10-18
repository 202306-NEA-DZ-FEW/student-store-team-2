import Link from "next/link";
import React from "react";
import { BiSearchAlt } from "react-icons/bi";

const Searchbar = () => {
    return (
        <div>
            <Link
                href='/'
                className={`flex items-center text-titleContent hover:bg-gray-700 hover:text-white dark:text-white  rounded-md px-3 py-2 text-base font-medium `}
            >
                <BiSearchAlt
                    className='block h-4 w-4 mr-2'
                    aria-hidden='true'
                />
                <h2>Search...</h2>
            </Link>
        </div>
    );
};

export default Searchbar;

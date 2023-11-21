"use client";

import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";

import DashboardTable from "../tables/dashboardTable/DashboardTable";

const DashboardDisplay = ({ dashboardData, type }) => {
    const [data, setData] = useState(dashboardData);
    const [search, setSearch] = useState("");

    const handleChange = (e) => filterBySearch(e.target.value);

    const filterBySearch = (search) => {
        const array = dashboardData.filter((item) => {
            if (!search) return item;
            else {
                return (
                    item.name.toLowerCase().includes(search.toLowerCase()) ||
                    item.category_name
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    item.raw_user_meta_data.full_name
                        .toLowerCase()
                        .includes(search.toLowerCase())
                );
            }
        });
        setData(array);
    };

    const filterByStatus = (e) => {
        const status = e.target.value.toLowerCase();
        if (status === "all") setData(dashboardData);
        else {
            const array = dashboardData.filter(
                (item) => item.status === status
            );

            setData(array);
        }
    };

    useEffect(() => {
        setData(dashboardData);
    }, [dashboardData]);

    return (
        <div className=''>
            <h1 className='text-3xl capitalize font-lato font-medium ml-4 mb-6'>
                {type}
            </h1>
            <div className='mb-8'>
                <div className='flex items-end'>
                    <select
                        name=''
                        id=''
                        onChange={filterByStatus}
                        className='bg-white py-2 px-4 w-16 h-12 border border-gray-300 rounded-md  ml-4'
                    >
                        <option value='all' defaultChecked>
                            All
                        </option>
                        <option value='requested' defaultChecked>
                            Requested
                        </option>
                        <option value='pending' defaultChecked>
                            Pending
                        </option>
                        <option value='completed' defaultChecked>
                            Completed
                        </option>
                    </select>
                    <form className='ml-4  inline-block'>
                        <label for='users-search' className='sr-only'>
                            Search
                        </label>
                        <div className='mt-1 relative lg:w-64 xl:w-96'>
                            <input
                                type='text'
                                name='email'
                                id='users-search'
                                onChange={handleChange}
                                className='bg-gray-50 h-12 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-accent focus:border-accent block w-full p-2.5'
                                placeholder='Search for a product'
                            />
                        </div>
                    </form>
                    <button className='ml-8 sm:ml-auto rounded-md p-2.5  bg-cyan-600 text-white flex items-center hover:bg-cyan-800'>
                        <GoPlus className='w-7 h-7' />
                        <span>Add product</span>
                    </button>
                </div>
            </div>

            <DashboardTable type={type} data={data} />
        </div>
    );
};

export default DashboardDisplay;

import React from "react";

const MobileTabs = ({ tabs, components, selectedTabIndex, handleTabClick }) => {
    return (
        <div className='sm:hidden max-w-screen-xl mx-auto w-full bg-white min-h-screen'>
            <div className='grid divide-y divide-neutral-200 max-w-xl mx-auto mt-8'>
                <div className='py-5'>
                    {components.map((tab, index) => (
                        <details className='group' key={index}>
                            <summary className='flex border-2 font-roboto rounded-md justify-between items-center font-medium cursor-pointer pl-4 list-none h-20'>
                                <span> {tabs[index].title}</span>
                                <span
                                    onClick={() => handleTabClick(index)}
                                    className='transition group-open:rotate-180'
                                >
                                    <svg
                                        fill='none'
                                        height='24'
                                        shape-rendering='geometricPrecision'
                                        stroke='currentColor'
                                        stroke-linecap='round'
                                        stroke-linejoin='round'
                                        stroke-width='1.5'
                                        viewBox='0 0 24 24'
                                        width='24'
                                    >
                                        <path d='M6 9l6 6 6-6'></path>
                                    </svg>
                                </span>
                            </summary>
                            <div className='text-neutral-600 mt-3 group-open:animate-fadeIn'>
                                {tab}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MobileTabs;

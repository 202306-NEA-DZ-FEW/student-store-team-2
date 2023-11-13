import React from "react";

function TabsComponent({ items }) {
    return (
        <div className='flex justify-center items-center py-8'>
            <div className='w-3/4 flex flex-col justify-start gap-y-6 '>
                <div className=' flex items-center font-medium text-gray-700 text-sm border-b border-gray-200'>
                    {items.map((section, sectionIndex) =>
                        section.title.map((title, titleIndex) => (
                            <button
                                className='px-4 rounded-sm uppercas hover:bg-[#72adc7ba] hover:text-white hover:rounded-sm hover:border-2 hover:border-gray-200 hover:text-semibold hover:drop-shadow-lg h-full '
                                key={`${sectionIndex}.${titleIndex}`}
                                // onClick={()=>{}}
                            >
                                {title}
                            </button>
                        ))
                    )}
                </div>
                <div className='bg-gray-100 p-1 m-2 rounded flex items-start text-sm font-base text-gray-700 '>
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className='border-2 border-[#72adc7] rounded-lg p-4 '
                        >
                            <h1 className='text-3xl text-blue-600'>
                                {item.content.title}
                            </h1>
                            <p className='text-gray-500 mt-8'>
                                {item.content.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default TabsComponent;

import React from "react";

const radios = [
    {
        id: "for sale",
        title: "For Sale",
        value: "sale",
    },
    {
        id: "for borrow",
        title: "For Borrow",
        value: "borrow",
    },
];
function StatusFilter({ handleStatusChange, currentStatus }) {
    const title = "product status";
    return (
        <div className=''>
            <h2 className='capitalize text-lg'>{title}</h2>
            <div className='mt-4 border-t border-t-[#EEEEEE] flex flex-col gap-5 py-4 px-3'>
                {radios.map((radio) => (
                    <label
                        className='group relative text-[#55585B] text-sm '
                        key={radio.id}
                    >
                        {radio.title}
                        <input
                            type='radio'
                            name='radio'
                            value={radio.value}
                            className='absolute opacity-0 cursor-pointer peer'
                            onChange={() => handleStatusChange(radio.value)}
                        />
                        <span
                            className={`absolute -top-2 -left-3 rounded-sm h-8 w-28 group-hover:bg-gray-200 -z-10   ${
                                radio.value === currentStatus
                                    ? "peer-checked:bg-accent"
                                    : ""
                            }`}
                        ></span>
                    </label>
                ))}
            </div>
        </div>
    );
}

export default StatusFilter;

import React from "react";

function CategoryFilter({ currentCategory, handleCategoryChange, categories }) {
    const title = "categories";
    return (
        <div className=''>
            <h2 className='capitalize text-lg'>{title}</h2>
            <div className='mt-4 border-t border-t-[#EEEEEE] flex flex-col items-start gap-5 py-4 px-3'>
                {categories?.map((cat) => (
                    <button
                        key={cat}
                        value={cat}
                        onClick={(e) => handleCategoryChange(e.target.value)}
                        className={` capitalize   text-md hover:text-gray-800 relative after:contents[''] after:absolute after:bg-gray-200  after:h-[2px] after:-bottom-1 after:left-0 after:transition-all ease-in ${
                            cat === currentCategory
                                ? "after:w-full text-accent"
                                : "after:w-0 text-[#55585B]"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default CategoryFilter;

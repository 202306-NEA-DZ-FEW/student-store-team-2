import React from "react";

import ProductItem from "@/components/productItems/ProductItem";

const DashboardDisplay = ({ data }) => {
    return (
        <div className='flex flex-wrap gap-4 pr-4 w-60 pl-28'>
            <div>
                {data &&
                    data.map((item) => {
                        return <ProductItem key={item.id} {...item} />;
                    })}
            </div>
        </div>
    );
};

export default DashboardDisplay;

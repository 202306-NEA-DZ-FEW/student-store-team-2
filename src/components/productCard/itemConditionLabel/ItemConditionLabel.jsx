import Image from "next/image";
import React from "react";

const ItemConditionLabel = ({ itemCondition }) => {
    return (
        <div className='relative'>
            <Image
                className='z-0'
                src='/conditionLabelVector.svg'
                alt='Item Condition'
                width={139}
                height={39}
            ></Image>
            <div className='font-jost font-extrabold text-sm text-bkg absolute bottom-1 left-2'>
                {" "}
                State: {itemCondition}
            </div>
        </div>
    );
};

export default ItemConditionLabel;

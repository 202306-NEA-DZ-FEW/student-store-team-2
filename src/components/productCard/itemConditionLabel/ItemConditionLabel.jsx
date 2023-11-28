import Image from "next/image";
import { useTranslations } from "next-intl";
import React from "react";

const ItemConditionLabel = ({ itemCondition }) => {
    const t = useTranslations("Index");

    return (
        <div className='relative'>
            <Image
                className='z-0 text-blue-400'
                src='/conditionLabelVector.svg'
                alt='Item Condition'
                width={139}
                height={39}
            ></Image>
            <div className='font-jost font-extrabold text-sm text-bkg absolute bottom-1 left-2 w-fit'>
                {itemCondition}$
            </div>
        </div>
    );
};

export default ItemConditionLabel;

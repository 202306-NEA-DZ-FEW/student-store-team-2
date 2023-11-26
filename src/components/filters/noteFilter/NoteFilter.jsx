import { useTranslations } from "next-intl";
import React from "react";

function NoteFilter({ currentNote, handleNoteChange }) {
    const t = useTranslations("Index");
    const title = t("Product Note");
    return (
        <div>
            <h2 className='capitalize text-lg'>{title}</h2>
            <div className='flex gap-2 mt-4 border-t border-t-[#EEEEEE] py-4'>
                {Array(6)
                    .fill(0)
                    .map((_, index) => (
                        <button
                            key={index}
                            value={index + 5}
                            className={` rounded-xl w-8 h-9   ${
                                parseInt(currentNote) === index + 5
                                    ? "bg-accent drop-shadow-2xl text-white"
                                    : "bg-white border border-gray-200"
                            }`}
                            onClick={(e) => handleNoteChange(e.target.value)}
                        >
                            {index + 5}
                        </button>
                    ))}
            </div>
        </div>
    );
}

export default NoteFilter;

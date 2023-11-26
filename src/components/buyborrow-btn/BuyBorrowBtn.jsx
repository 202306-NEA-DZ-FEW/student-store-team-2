import { useTranslations } from "next-intl";
import { FaSpinner } from "react-icons/fa";

function BuyBorrowBtn({ label, handleClick, disabled, isLoading }) {
    const t = useTranslations("Index");

    const classBuy =
        "bg-[#0989FF] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#026fce] duration-300 text-white text-center font-lato text-base px-7 py-1 rounded shadow-md";
    const classBorrow =
        "bg-[#FFBD00] transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-[#e8ac09] duration-300 text-white text-center hover:transition-all font-lato text-base px-5 py-1 rounded shadow-md sm-absolute";
    const buttonClass = label === "Buy" ? classBuy : classBorrow;

    const disabledClass = disabled
        ? "opacity-50 cursor-not-allowed bg-gray-500 pointer-events-none"
        : "";

    return (
        <div className='sm:w-1/3 w-1/2 flex justify-center flex-col'>
            {label === "Buy" || label === "Borrow" ? (
                <button
                    className={`${buttonClass} ${disabledClass}`}
                    onClick={handleClick}
                    disabled={disabled}
                >
                    {!isLoading ? (
                        t(label)
                    ) : (
                        <FaSpinner className='h-6 w-6 animate-spin duration-150 text-white text-center mx-auto' />
                    )}
                </button>
            ) : null}
        </div>
    );
}

export default BuyBorrowBtn;

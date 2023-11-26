import { useLocale } from "next-intl";
import { useRouter } from "next-intl/client";
import { usePathname } from "next-intl/client";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function LanguageChanger() {
    const router = useRouter();
    const pathname = usePathname();
    const lang = useLocale();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleChange = (selectedLocale) => {
        router.push(pathname, { locale: selectedLocale });
        setIsDropdownOpen(false); // Close the dropdown after selecting a language
    };

    useEffect(() => {
        const closeDropdown = () => {
            setIsDropdownOpen(false);
        };

        if (isDropdownOpen) {
            document.addEventListener("click", closeDropdown);
        } else {
            document.removeEventListener("click", closeDropdown);
        }

        return () => {
            document.removeEventListener("click", closeDropdown);
        };
    }, [isDropdownOpen]);

    return (
        <div>
            <div className='bg-gradient-to-br hidden sm:flex my-2 justify-center items-center'>
                <div className='relative'>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className='items-center space-x-2 flex  sm:mx-6 cursor-pointer font-medium hover:bg-accent hover:text-white rounded-md py-2 px-4 tracking-wides transition-all duration-200 text-titleContent'
                    >
                        <IoIosArrowUp className='w-6 h-6 ' />
                        {lang === "ar" ? "العربية" : "English"}
                    </button>
                    {isDropdownOpen && (
                        <div className='absolute bottom-full right-0 mt-2  px-5 py-3 text-gray-900 bg-white rounded-lg shadow border dark:border-transparent z '>
                            <ul className='space-y-3 '>
                                <li
                                    onClick={() => handleChange("en")}
                                    className='cursor-pointer py-2 px-4 hover:bg-accent hover:text-white font-jost text-accent rounded-md font-medium '
                                >
                                    English
                                </li>
                                <li
                                    onClick={() => handleChange("ar")}
                                    className='cursor-pointer py-2 px-4 hover:bg-accent hover:text-white font-jost text-accent rounded-md font-medium '
                                >
                                    العربية
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className='bg-gradient-to-br flex sm:hidden my-2 justify-center items-center'>
                <button
                    onClick={() => handleChange("en")}
                    className={` mx-3 cursor-pointer font-medium hover:bg-accent hover:text-white rounded-md py-2 px-4 tracking-wides transition-all duration-200 text-titleContent ${
                        lang === "en" ? "text-white bg-accent" : ""
                    }`}
                >
                    English
                </button>
                /
                <button
                    onClick={() => handleChange("ar")}
                    className={` mx-3 cursor-pointer font-medium hover:bg-accent hover:text-white rounded-md py-2 px-4 tracking-wides transition-all duration-200 text-titleContent ${
                        lang === "ar" ? "text-white bg-accent" : ""
                    }`}
                >
                    العربية
                </button>
            </div>
        </div>
    );
}

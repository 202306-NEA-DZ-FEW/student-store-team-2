"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next-intl/client";
import { usePathname } from "next-intl/client";

export default function LanguageChanger() {
    const router = useRouter();
    const pathname = usePathname();
    const lang = useLocale();

    const handleChange = (selectedLocale) => {
        router.push(pathname, { locale: selectedLocale });
    };

    return (
        <div className='bg-gradient-to-br flex my-2 justify-center items-center'>
            <div className='relative'>
                <button className='bg-bkg border-2 border-titleContent border-double p-2 font-roboto font-bold text-titleContent rounded-md peer focus:bg-gray-200 w-28 focus:text-black transition-all duration-200'>
                    {lang === "ar" ? "العربية" : "English"}
                </button>
                <div
                    className='top-5 z-10
                after:content-[""] after:inline-block after:absolute after:top-0
                after:w-full after:h-full after:-z-20 after:blur-[2px] after:rounded-lg
                peer-focus:top-12 peer-focus:opacity-100 peer-focus:visible 
                transition-all duration-300 invisible  opacity-0 '
                >
                    <ul className='py-6 w-32 px-3 flex flex-col gap-3'>
                        <li
                            onClick={() => handleChange("en")}
                            className='cursor-pointer bg-bkg p-3 border-2 text-center rounded-md hover:opacity-90 text-content'
                        >
                            English
                        </li>
                        <li
                            onClick={() => handleChange("ar")}
                            className='cursor-pointer bg-bkg p-3 border-2 text-center rounded-md hover:opacity-90 text-content'
                        >
                            العربية
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

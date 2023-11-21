"use client";

import { useRouter } from "next-intl/client";
import { usePathname } from "next-intl/client";

export default function LanguageChanger({ locale }) {
    const router = useRouter();
    const pathname = usePathname();

    const handleChange = (e) => {
        router.push(pathname, { locale: e.target.value });
    };

    return (
        <div className='absolute top-5 right-2 md:top-0 md:right-16'>
            <select
                value={locale}
                onChange={handleChange}
                className='border border-gray-300 w-40 text-center rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none'
            >
                <option
                    className='py-2 text-secondaryGray text-center hover:bg-accent hover:text-white'
                    value='en'
                >
                    {" "}
                    English
                </option>
                <option
                    className='py-2 text-secondaryGray font-notoKufi text-center hover:bg-accent hover:text-white'
                    value='ar'
                >
                    العربية
                </option>
            </select>
        </div>
    );
}

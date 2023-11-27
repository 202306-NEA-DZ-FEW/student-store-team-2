import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";

import { searchProduct } from "@/lib/_supabase";

const Searchbar = ({ toggleMobileMenu }) => {
    const router = useRouter();
    const t = useTranslations("");
    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [noItemsFound, setNoItemsFound] = useState(false);
    const [toggleSearch, setToggleSearch] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchValue(inputValue);
    };

    const handleSearch = async (e) => {
        e.preventDefault();

        if (searchValue.trim() === "") {
            return;
        }

        router.push("/products/" + searchValue);
        toggleMobileMenu();
        setSearchValue("");
    };

    const handleClick = () => {
        setToggleSearch(!toggleSearch);
        setIsOpen(true);

        setSuggestions([]);
        setNoItemsFound(false);
    };

    const closeSearchModal = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        let debounceTimer;

        const searchProducts = async (value) => {
            if (value.length >= 2) {
                const data = await searchProduct(value);
                const newSuggestions = data.map((product) => ({
                    name: product.name,
                    pid: product.pid,
                }));

                if (newSuggestions.length === 0) {
                    setNoItemsFound(true);
                } else {
                    setNoItemsFound(false);
                }

                setSuggestions(newSuggestions);
            } else {
                setSuggestions([]);
                setNoItemsFound(false);
            }
        };

        debounceTimer = setTimeout(() => {
            searchProducts(searchValue);
        }, 300);

        return () => {
            clearTimeout(debounceTimer);
        };
    }, [searchValue]);

    return (
        <div className='mx-auto cursor-pointer'>
            <form action='' className='flex sm:relative mx-auto'>
                <BsSearch
                    onClick={() => {
                        handleClick();
                        setIsOpen(!isOpen);
                    }}
                    className={`sm:mr-4 z-10 cursor-pointer my-auto h-6 w-6 hover:text-accent ${
                        toggleSearch && "text-accent"
                    } text-inherit`}
                />
                {isOpen && (
                    <div className='sm:h-auto h-screen sm:w-auto w-screen fixed top-0 right-0 bottom-0 left-0 bg-gray-700 bg-opacity-70 flex items-center justify-center z-50'>
                        <div className='container mx-auto w-11/12 md:w-2/3 max-w-lg'>
                            <div className='relative py-8 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400'>
                                <h1 className='text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4'>
                                    {t("Search For Product:")}
                                </h1>
                                <form onSubmit={handleSearch}>
                                    <input
                                        type='text'
                                        value={searchValue}
                                        onChange={handleInputChange}
                                        placeholder='Search products...'
                                        className='mb-5 mt-2 text-gray-600 focus:outline-none focus:border focus:border-accent font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border'
                                    />
                                </form>

                                {suggestions.length > 0 && (
                                    <div className='mb-4'>
                                        <ul>
                                            {suggestions.map((suggestion) => (
                                                <li key={suggestion.pid}>
                                                    <Link
                                                        href={
                                                            "/products/" +
                                                            suggestion.pid
                                                        }
                                                        className='text-blue-600 hover:text-blue-800 focus:outline-none'
                                                        onClick={
                                                            closeSearchModal
                                                        }
                                                    >
                                                        {suggestion.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Close button */}
                                <button
                                    onClick={closeSearchModal}
                                    className='absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600'
                                >
                                    {/* SVG for close icon */}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        className='icon icon-tabler icon-tabler-x'
                                        width='20'
                                        height='20'
                                        viewBox='0 0 24 24'
                                        strokeWidth='2.5'
                                        stroke='currentColor'
                                        fill='none'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    >
                                        <path stroke='none' d='M0 0h24v24H0z' />
                                        <line x1='18' y1='6' x2='6' y2='18' />
                                        <line x1='6' y1='6' x2='18' y2='18' />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Searchbar;

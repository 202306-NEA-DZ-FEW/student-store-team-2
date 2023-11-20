import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

import { supabase } from "@/lib/supabase";

const Searchbar = ({ toggleMobileMenu }) => {
    const router = useRouter();

    const [searchValue, setSearchValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [noItemsFound, setNoItemsFound] = useState(false);
    const [toggleSearch, setToggleSearch] = useState(false);

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
        setSuggestions([]);
        setNoItemsFound(false);
    };

    useEffect(() => {
        let debounceTimer;

        const searchProducts = async (value) => {
            if (value.length >= 2) {
                const { data, error } = await supabase
                    .from("products")
                    .select("name, pid")
                    .ilike("name", `%${value}%`);

                if (error) {
                    console.log(error);
                    return;
                }

                const newSuggestions = data.map((product) => ({
                    name: product.name,
                    pid: product.pid,
                }));
                console.log("suggestions:", suggestions);
                console.log("newSuggestions:", newSuggestions);
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
        <div className='mx-auto text-titleContent max-w-md cursor-pointer'>
            <form action='' className='fixed left-5 sm:relative mx-auto'>
                <input
                    type='search'
                    className={`cursor-pointer absolute h-8 ${
                        toggleSearch
                            ? "w-48 sm:w-96 border border-accent/80 cursor-text text-sm"
                            : "w-0"
                    } rounded-full  outline-none transition-all duration-300 ease-in-out -right-52 sm:right-10 z-50`}
                    onChange={handleInputChange}
                    value={searchValue}
                />
                <BiSearchAlt
                    onClick={handleClick}
                    className={`mr-2 z-10 cursor-pointer my-auto h-6 w-6 stroke-gray-500 hover:text-accent rounded-xl font-semibold ${
                        toggleSearch && "text-accent"
                    }`}
                    aria-hidden='true'
                />
                {suggestions.length > 0 && !noItemsFound && (
                    <div className='hidden sm:block absolute w-48 sm:w-96 -right-52 sm:right-10  mx-auto bg-white border border-accent/80 rounded-md'>
                        <div className='flex flex-col'>
                            {suggestions.map((suggestion, index) => (
                                <Link
                                    key={index}
                                    className='text-sm truncate p-2 hover:bg-accent hover:text-white'
                                    href={"/products/" + suggestion.pid}
                                >
                                    {suggestion.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {noItemsFound && (
                    <div className='hidden sm:block absolute w-48 sm:w-96 -right-52 sm:right-10 h-8 mx-auto bg-white border border-accent/80 rounded-3xl pl-2 pt-2'>
                        <p>No items found</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Searchbar;

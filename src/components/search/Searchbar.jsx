import { collection, getDocs, query, where } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

import { db } from "@/lib/firebase";

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

    async function handleSearch(e) {
        if (e.keyCode === 13) {
            e.preventDefault();

            router.push(`/products?search=${e.target.value}`);
            toggleMobileMenu();
            setSearchValue("");
        }
    }

    const handleClick = () => {
        setToggleSearch(!toggleSearch);
        setSuggestions([]);
        setNoItemsFound(false);
    };

    useEffect(() => {
        let debounceTimer;

        const searchProducts = async (value) => {
            if (value.length >= 2) {
                const q = query(
                    collection(db, "products"),
                    where("name", ">=", value.toLowerCase()),
                    where("name", "<=", value.toLowerCase() + "\uf8ff")
                );

                try {
                    const querySnapshot = await getDocs(q);
                    const newSuggestions = [];
                    querySnapshot.forEach((doc) => {
                        newSuggestions.push(doc.data().name);
                    });

                    if (newSuggestions.length === 0) {
                        setNoItemsFound(true);
                    } else {
                        setNoItemsFound(false);
                    }

                    setSuggestions(newSuggestions);
                } catch (error) {
                    console.error(error);
                }
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
        <div className='mx-auto max-w-md cursor-pointer'>
            <form action='' className='fixed left-5 sm:relative mx-auto'>
                <input
                    type='search'
                    className={`cursor-pointer absolute h-8 ${
                        toggleSearch
                            ? "w-48 border border-accent/80 cursor-text text-sm"
                            : "w-0"
                    } rounded-full bg-transparent outline-none transition-all duration-300 ease-in-out left-10 pl-1`}
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
                    <div className='hidden sm:block absolute w-48 left-10 mx-auto bg-white border border-accent/80 rounded-md'>
                        <div className='flex flex-col'>
                            {suggestions.map((suggestion, index) => (
                                <Link
                                    key={index}
                                    className='text-sm truncate p-2 hover:bg-accent hover:text-white'
                                    href={`products/${suggestion}`}
                                >
                                    {suggestion}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {noItemsFound && (
                    <div className='hidden sm:block absolute w-48 left-10 h-8 mx-auto bg-white border border-accent/80 rounded-3xl pl-2 pt-2'>
                        <p>No items found</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Searchbar;

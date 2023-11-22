"use client";
import { useState } from "react";

import { getGeocodeByCity } from "@/lib/openWeatherAPI";

const LocationInput = ({ location, setLocation, onLocationSelect }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [error, setError] = useState(null);
    let typingTimer = null;
    const doneTypingInterval = 1000;

    const handleLocationChange = (e) => {
        clearTimeout(typingTimer);
        const inputLocation = e.target.value;
        setLocation(inputLocation);

        if (inputLocation === "") {
            setSuggestions([]);
            return;
        }

        typingTimer = setTimeout(async () => {
            try {
                if (inputLocation.length >= 4) {
                    const data = await getGeocodeByCity(
                        inputLocation,
                        "",
                        "",
                        5
                    );
                    setSuggestions(data || []);
                    setError(null);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                setError("Error fetching location suggestions");
                setSuggestions([]);
            }
        }, doneTypingInterval);
    };
    const handleSelect = (city) => {
        onLocationSelect(city.lat, city.lon);
        const selectedLocation = `${city.name}, ${city.state}, ${city.country}`;
        setLocation(selectedLocation);

        setSuggestions([]);
    };

    const handleCloseSuggestions = () => {
        setSuggestions([]);
    };

    return (
        <div className='relative mb-4'>
            <input
                type='text'
                placeholder='Enter Location'
                value={location}
                onChange={handleLocationChange}
                className='w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 focus:outline-none'
            />
            {location?.length >= 4 && suggestions?.length > 0 && (
                <ul className='absolute  bg-white border border-gray-300 w-full mt-1 py-1 rounded-md focus:border-blue-500 shadow-md'>
                    {suggestions.map((city) => (
                        <li
                            key={city.id}
                            role='button'
                            onClick={() => {
                                handleSelect(city);
                            }}
                            onBlur={handleCloseSuggestions}
                            className='px-3 py-1 cursor-pointer hover:bg-gray-200'
                        >
                            {city.name}, {city.state}, {city.country}
                        </li>
                    ))}
                </ul>
            )}
            {error && <p>{error}</p>}
        </div>
    );
};

export default LocationInput;

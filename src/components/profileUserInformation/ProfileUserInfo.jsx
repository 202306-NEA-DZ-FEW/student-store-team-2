import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaUniversity } from "react-icons/fa";
import { PiMapPinLineDuotone } from "react-icons/pi";

import { reverseGeocode } from "@/lib/_openWeatherAPI";

function ProfileUserInfo({ user }) {
    const [location, setLocation] = useState("");

    useEffect(() => {
        const fetcher = async () => {
            if (user) {
                const { location } = user; // Assuming userData has a 'location' object with 'Lat' and 'Long'
                const { Lat, Long } = location;

                try {
                    const data = await reverseGeocode(Lat, Long); // Fetch reverse geocoding data
                    const [firstResult = {}] = data || []; // Get the first result (or default to an empty object)
                    const { name, state, country } = firstResult; // Extract location details

                    const formattedLocation = `${name}, ${state}, ${country}`; // Format the location string if necessary

                    setLocation(formattedLocation); // Set the location state
                } catch (error) {
                    // Handle errors
                    throw ("Error fetching reverse geocoding data:", error);
                }
            }
        };
        fetcher();
    }, [user]);
    return (
        <div className='flex flex-col p-2 ml-4 border-l-1 '>
            <h2 className='font-semibold text-base text-[#55585B]'>
                {user ? user.full_name : null}
            </h2>
            <div className='text-[#55585B] flex gap-1'>
                <FaUniversity />
                <p className='font-medium text-xs  pt-1'>
                    {user ? user.institution : null}
                </p>
            </div>

            <div className='text-[#72ADC7] flex gap-1'>
                <PiMapPinLineDuotone />
                <p className='font-normal text-xs '>{user ? location : null}</p>
            </div>
        </div>
    );
}

export default ProfileUserInfo;

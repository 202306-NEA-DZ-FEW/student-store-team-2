"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import DatePicker from "react-widgets/DatePicker";

import "react-widgets/styles.css";

import { updateUserMetadata } from "@/lib/_supabaseAuth";
import { reverseGeocode } from "@/lib/openWeatherAPI";

import { useUser } from "@/components/userProvider/UserProvider";

import LocationInput from "../locationInput/LocationInput";

const UserProfileForm = () => {
    const t = useTranslations("Index");
    const { user, userData } = useUser();
    const [imageURL, setImageURL] = useState("");
    const [uploading, setUploading] = useState(false);
    const [location, setLocation] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [formData, setFormData] = useState({
        full_name: "",
        birth_date: "",
        first_name: "",
        gender: "",
        institution: "",
        last_name: "",
        phone_num: "",
        avatar_url: "",
        userId: "",
    });

    const [id, setId] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetcher = async () => {
            if (userData) {
                const { full_name, ...otherData } = userData;
                const [first_name = "", last_name = ""] = full_name.split(" ");

                setFormData({
                    ...otherData,
                    first_name,
                    last_name,
                    full_name,
                    avatar_url: userData.avatar_url || "",
                });
                setImageURL(userData.avatar_url);
                setId(userData.userId);
                setLoading(false);
            }
        };
        fetcher();
    }, [loading, userData]);

    useEffect(() => {
        const fetcher = async () => {
            if (userData) {
                const { location } = userData; // Assuming userData has a 'location' object with 'Lat' and 'Long'
                const { Lat, Long } = location;

                try {
                    const data = await reverseGeocode(Lat, Long); // Fetch reverse geocoding data
                    const [firstResult = {}] = data || []; // Get the first result (or default to an empty object)
                    const { name, state, country } = firstResult; // Extract location details

                    const formattedLocation = `${name}, ${state}, ${country}`; // Format the location string if necessary

                    setLocation(formattedLocation); // Set the location state
                } catch (error) {
                    // Handle errors
                    console.error(
                        "Error fetching reverse geocoding data:",
                        error
                    );
                }
            }
        };
        fetcher();
    }, [userData]);

    const handleImageUpload = (url) => {
        setImageURL(url);
        setFormData({ ...formData, avatar_url: url });
    };

    const handleIdUpload = (url) => {
        setId(url);
        setFormData({ ...formData, userId: url });
    };

    const handleLocationSelect = (lat, lon) => {
        // Define the logic for handling the selected location here
        console.log(lat);
        setLatitude(lat);
        setLongitude(lon);
    };

    const handleDateChange = (selectedDay) => {
        const formattedDate = selectedDay.toISOString();
        setFormData({ ...formData, birth_date: formattedDate });
    };

    const handleChange = (e) => {
        if (e.target.name === "full_name") {
            const [first_name = "", last_name = ""] = e.target.value.split(" ");
            setFormData({
                ...formData,
                first_name,
                last_name,
                full_name: e.target.value,
                location: { Lat: latitude, Long: longitude },
            });
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await setUploading(true);
        if (user) {
            const { first_name, last_name, ...otherData } = formData;
            const updatedData = {
                ...otherData,
                full_name: `${first_name} ${last_name}`,
                avatar_url: imageURL,
                location: { Lat: latitude, Long: longitude },
            };
            await updateUserMetadata(updatedData);
            console.log(updatedData);
            await setUploading(false);
        } else setUploading(true);
    };

    if (loading) {
        return (
            <div className='flex h-screen justify-center items-center'>
                <FaSpinner className='h-24 w-24 animate-spin duration-150 text-accent' />
            </div>
        );
    }
    if (uploading) {
        return (
            <div className='flex  h-screen justify-center items-center'>
                <FaSpinner className='h-24 w-24 animate-spin duration-150 text-accent' />
            </div>
        );
    }

    return (
        <div className='flex flex-col sm:flex-row'>
            <div className='sm:w-1/4 h-1/4 w-full font-lato font-semibold text-xl  bg-bkg text-titleContent p-4 flex justify-evenly sm:flex-col'>
                <Link
                    href='/profile?page=form'
                    className='flex justify-center items-center mb-4  hover:bg-accent hover:text-bkg h-20 border-r p-5 sm:border-none '
                >
                    {t("PROFILE")}
                </Link>

                <Link
                    href='/profile?page=security'
                    className='flex justify-center items-center mb-4  hover:bg-accent hover:text-bkg h-20 '
                >
                    {t("SECURITY")}
                </Link>
            </div>
            <form
                onSubmit={handleSubmit}
                className='sm:w-3/4 h-3/4 w-full bg-[rgb(237,241,243)]  mx-auto p-4  rounded-lg font-lato '
            >
                <h1 className='font-lato tracking-wider text-title text-2xl text-center uppercase  text-titleContent'>
                    {t("Profile")}
                </h1>

                <h1 className='font-lato  text-titleContent sm:text-l  text-center font-bold uppercase mb-4 mt-2'>
                    {t("General details")}
                </h1>
                {/* <div className='flex sm:flex-row flex-col mt-2 justify-center'>
                    <UploadImage
                        onImageUpload={handleImageUpload}
                        avatar_url={imageURL}
                    />
                    <UploadId onIdUpload={handleIdUpload} profile_id={id} />
                </div> */}

                <div className='mb-4 grid gap-4 md:grid-cols-2'>
                    <div className='mb-4'>
                        <span className='text-sm text-black '>
                            <span className='text-red-500'>*</span> Required
                        </span>

                        <input
                            type='text'
                            placeholder={t("First Name")}
                            id='first_name'
                            name='first_name'
                            value={formData.first_name}
                            onChange={handleChange}
                            className='w-full border border-gray-300 p-2 rounded-md focus:border-blue-500'
                        />
                    </div>

                    <div className='mb-4'>
                        <span className='text-sm text-black '>
                            <span className='text-red-500'>*</span> Required
                        </span>
                        <input
                            type='text'
                            placeholder={t("Last Name")}
                            id='last_name'
                            name='last_name'
                            value={formData.last_name}
                            onChange={handleChange}
                            className='w-full border border-gray-300 p-2 rounded-md focus:border-blue-500 '
                        />
                    </div>
                    <div className='mb-4'>
                        <select
                            placeholder={t("Gender")}
                            id='gender'
                            name='gender'
                            value={formData.gender}
                            onChange={handleChange}
                            className='w-full border border-gray-300 p-2 rounded-md focus:border-blue-500'
                        >
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <DatePicker
                            defaultValue={
                                formData.birth_date
                                    ? new Date(formData.birth_date)
                                    : null
                            }
                            valueEditFormat={{ dateStyle: "short" }}
                            valueDisplayFormat={{ dateStyle: "medium" }}
                            onChange={handleDateChange}
                            inputProps={{
                                id: "birth_date",
                                name: "birth_date",
                                className:
                                    "w-full border border-gray-300 p-2 rounded-md focus:border-blue-500",
                            }}
                        />
                    </div>
                </div>
                <div className='mb-8'>
                    <input
                        placeholder={t("Institution")}
                        type='text'
                        id='institution'
                        name='institution'
                        value={formData.institution}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md focus:border-blue-500'
                    />
                </div>
                <h1 className='font-lato  text-titleContent sm:text-l text-center font-bold uppercase mb-4 sm:ml-10'>
                    {t("Contact & address Detail")}
                </h1>
                <div className='mb-4 grid gap-4'>
                    <div className='mb-4'>
                        <span className='text-sm text-black '>
                            <span className='text-red-500'>*</span> Required
                        </span>
                        <input
                            placeholder={t("Phone Number")}
                            type='number'
                            id='phone_num'
                            name='phone_num'
                            value={formData.phone_num}
                            onChange={handleChange}
                            className='w-full border border-gray-300 p-2 rounded-md focus:border-blue-500'
                        />
                    </div>
                    <LocationInput
                        location={location}
                        setLocation={setLocation} // Assuming you have a state setter function for location
                        onLocationSelect={handleLocationSelect} // Pass the callback function
                    />
                </div>
                <button
                    type='submit'
                    className='bg-accent  text-white font-bold py-2 px-8 rounded hover:scale-105'
                >
                    {t("Save Changes")}
                </button>
            </form>
        </div>
    );
};

export default UserProfileForm;

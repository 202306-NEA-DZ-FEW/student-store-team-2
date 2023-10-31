"use client";
import { collection, doc, setDoc } from "firebase/firestore";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import DatePicker from "react-widgets/DatePicker";

import "react-widgets/styles.css";

import { db } from "@/lib/firebase";

import { UploadImage } from "../UploadImage/UploadImage";
import { useUser } from "../userProvider/UserProvider";

const UserProfileForm = ({ userData }) => {
    const t = useTranslations("Index");
    const { user } = useUser();
    const [imageURL, setImageURL] = useState("");
    const [formData, setFormData] = useState({
        address: {
            building: "",
            city: "",
            state: "",
            street: "",
        },
        birth_date: "",
        first_name: "",
        gender: "",
        institution: "",
        last_name: "",
        phone_num: "",
        profile_pic: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetcher = async () => {
            if (userData) {
                setFormData({
                    ...userData,
                    profile_pic: userData.profile_pic || "",

                    address: { ...userData.address },
                });
                setImageURL(userData.profile_pic);
                setLoading(false);
            }
        };
        fetcher();
    }, [user]);

    const handleImageUpload = (url) => {
        setImageURL(url);
        setFormData({ ...formData, profile_pic: url });
    };

    const handleDateChange = (selectedDay) => {
        const formattedDate = selectedDay.toISOString();
        setFormData({ ...formData, birth_date: formattedDate });
    };

    const handleChange = (e) => {
        if (e.target.name.startsWith("address.")) {
            const addressField = e.target.name.split(".")[1];
            setFormData({
                ...formData,
                address: {
                    ...formData.address,
                    [addressField]: e.target.value,
                },
            });
        } else {
            if (e.target.name === "birth_date") {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            } else {
                setFormData({
                    ...formData,
                    [e.target.name]: e.target.value,
                });
            }
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (user) {
            const usersRef = collection(db, "users");
            const userRef = doc(usersRef, user);
            const updatedData = { ...formData, profile_pic: imageURL };

            setDoc(userRef, updatedData)
                .then(() => {
                    console.log("Document successfully written!");
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
        }
    };

    if (loading) {
        return <span className='visually-hidden'>{t("Loading")}...</span>;
    }

    return (
        <form
            onSubmit={handleSubmit}
            className='w-full mx-auto p-4  rounded-lg'
        >
            <h1 className='font-lato tracking-wider text-title text-4xl text-center pr-96  mr-80'>
                {t("Profile")}
            </h1>

            <h1 className='font-lato text-title sm:text-xl text-center pr-96  mr-72 mb-12  font-bold'>
                {t("General details")}
            </h1>
            <div className='mb-4 grid gap-4 md:grid-cols-2'>
                <UploadImage
                    onImageUpload={handleImageUpload}
                    profile_pic={imageURL}
                />
                <div className='mb-4'>
                    <label
                        htmlFor='first_name'
                        className='block text-content font-bold mb-2'
                    >
                        {t("First Name")}
                    </label>
                    <input
                        type='text'
                        id='first_name'
                        name='first_name'
                        value={formData.first_name}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='last_name'
                        className='block text-content font-bold mb-2'
                    >
                        {t("Last Name")}
                    </label>
                    <input
                        type='text'
                        id='last_name'
                        name='last_name'
                        value={formData.last_name}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='birth_date'
                        className='block text-content font-bold mb-2'
                    >
                        {t("Birth Date")}
                    </label>
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
                                "w-full border border-gray-300 p-2 rounded-md",
                        }}
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='gender'
                        className='block text-content font-bold mb-2'
                    >
                        {t("Gender")}
                    </label>
                    <select
                        id='gender'
                        name='gender'
                        value={formData.gender}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    >
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                    </select>
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='institution'
                        className='block text-content font-bold mb-2'
                    >
                        {t("Institution")}
                    </label>
                    <input
                        type='text'
                        id='institution'
                        name='institution'
                        value={formData.institution}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>
            </div>
            <h1 className='font-latotext-title sm:text-xl  text-center pr-96  mr-72 font-bold mb-4 mt-12'>
                {t("Contact & address Detail")}
            </h1>
            <div className='mb-4 grid gap-4 md:grid-cols-2'>
                <div className='mb-4'>
                    <label
                        htmlFor='phone_num'
                        className='block text-content font-bold mb-2'
                    >
                        {t("Phone Number")}
                    </label>
                    <input
                        type='number'
                        id='phone_num'
                        name='phone_num'
                        value={formData.phone_num}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='building'
                        className='block text-content font-bold mb-2'
                    >
                        {t("Building")}
                    </label>
                    <input
                        type='text'
                        id='building'
                        name='address.building'
                        value={formData.address.building}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='street'
                        className='block text-content font-bold mb-2'
                    >
                        {t("Street")}
                    </label>
                    <input
                        type='text'
                        id='street'
                        name='address.street'
                        value={formData.address.street}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor='city'
                        className='block text-content font-bold mb-2'
                    >
                        {t("City")}
                    </label>
                    <input
                        type='text'
                        id='city'
                        name='address.city'
                        value={formData.address.city}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>

                <div className='mb-4'>
                    <label
                        htmlFor='state'
                        className='block text-content font-bold mb-2'
                    >
                        {t("State")}
                    </label>
                    <input
                        type='text'
                        id='state'
                        name='address.state'
                        value={formData.address.state}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
                    />
                </div>
            </div>
            <button
                type='submit'
                className='bg-accent hover:scale-105 text-white font-bold py-2 px-8 rounded hover:scale-105'
            >
                {t("Save Changes")}
            </button>
        </form>
    );
};

export default UserProfileForm;

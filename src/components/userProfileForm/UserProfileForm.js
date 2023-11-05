"use client";
import { collection, doc, setDoc } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import DatePicker from "react-widgets/DatePicker";

import "react-widgets/styles.css";

import { db } from "@/lib/firebase";

import { useUser } from "@/components/userProvider/UserProvider";

import UploadImage from "../imageFolder/UploadImage";
import UploadId from "../uploadId/UploadId";

const UserProfileForm = () => {
    const t = useTranslations("Index");
    const { user, userData } = useUser();
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
        userId: "",
    });
    const [id, setId] = useState("");

    const [loading, setLoading] = useState(true);
    const router = useRouter();
    useEffect(() => {
        const fetcher = async () => {
            if (userData) {
                setFormData({
                    ...userData,
                    profile_pic: userData.profile_pic || "",

                    address: { ...userData.address },
                });
                setImageURL(userData.profile_pic);
                setId(userData.userId);
                setLoading(false);
            }
        };
        fetcher();
    }, [user]);

    const handleImageUpload = (url) => {
        setImageURL(url);
        setFormData({ ...formData, profile_pic: url });
    };

    const handleIdUpload = (url) => {
        setId(url);
        setFormData({ ...formData, userId: url });
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
                    router.push("/");
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
                <div className='flex sm:flex-row flex-col mt-2 justify-center'>
                    <UploadImage
                        onImageUpload={handleImageUpload}
                        profile_pic={imageURL}
                    />
                    <UploadId onIdUpload={handleIdUpload} profile_id={id} />
                </div>

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
                            className='w-full border border-gray-300 p-2 rounded-md'
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
                            className='w-full border border-gray-300 p-2 rounded-md'
                        />
                    </div>
                    <div className='mb-4'>
                        <select
                            placeholder={t("Gender")}
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
                </div>
                <div className='mb-8'>
                    <input
                        placeholder={t("Institution")}
                        type='text'
                        id='institution'
                        name='institution'
                        value={formData.institution}
                        onChange={handleChange}
                        className='w-full border border-gray-300 p-2 rounded-md'
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
                            className='w-full border border-gray-300 p-2 rounded-md'
                        />
                    </div>

                    <div className='mb-4'>
                        <span className='text-sm text-black '>
                            <span className='text-red-500'>*</span> Required
                        </span>
                        <input
                            placeholder={t("Building")}
                            type='text'
                            id='building'
                            name='address.building'
                            value={formData.address.building}
                            onChange={handleChange}
                            className='w-full border border-gray-300 p-2 rounded-md'
                        />
                    </div>
                    <div className='mb-4'>
                        <input
                            placeholder={t("Street")}
                            type='text'
                            id='street'
                            name='address.street'
                            value={formData.address.street}
                            onChange={handleChange}
                            className='w-full border border-gray-300 p-2 rounded-md'
                        />
                    </div>
                    <div className='mb-4'>
                        <input
                            placeholder={t("City")}
                            type='text'
                            id='city'
                            name='address.city'
                            value={formData.address.city}
                            onChange={handleChange}
                            className='w-full border border-gray-300 p-2 rounded-md'
                        />
                    </div>

                    <div className='mb-4'>
                        <span className='text-sm text-black '>
                            <span className='text-red-500'>*</span> Required
                        </span>
                        <input
                            placeholder={t("State")}
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
                    className='bg-accent  text-white font-bold py-2 px-8 rounded hover:scale-105'
                >
                    {t("Save Changes")}
                </button>
            </form>
        </div>
    );
};

export default UserProfileForm;

"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

import {
    signInWithEmailAndPassword,
    signUpWithEmailAndPassword,
} from "@/lib/_supabaseAuth";

import LocationInput from "../locationInput/LocationInput";

function CustomForm({ formType }) {
    const t = useTranslations("Index");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [location, setLocation] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [terms, setTerms] = useState(false);
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const isFormFilled = () => {
        return (
            (formType === "login" && email && password) ||
            (formType === "registration" &&
                email &&
                password &&
                fullName &&
                phoneNumber &&
                location &&
                terms)
        );
    };

    const handleLocationChange = (lat, long) => {
        setLatitude(lat);
        setLongitude(long);
    };

    const authenticate = async (userData) => {
        const { formType, ...data } = userData;

        try {
            if (formType === "registration") {
                const user = await signUpWithEmailAndPassword(
                    data.email,
                    data.password,
                    {
                        full_name: data.full_name || "null",
                        email: data.email || "null",
                        phone_num: data.phone_num || "null",
                        last_name: data.last_name || "null",
                        location: { Lat: latitude, Long: longitude },
                    }
                );
                window.location.href = "/profile?page=form";
                return user;
            } else if (formType === "login") {
                const user = await signInWithEmailAndPassword(
                    data.email,
                    data.password
                );
                window.location.href = "/dashboard";

                return user;
            }
        } catch (error) {
            let errorMessage = "An error occurred during authentication.";

            if (error.code === "auth/invalid-login-credentials") {
                errorMessage = t("Authentication error");
            }

            setErrorMessage(errorMessage);

            setTimeout(() => {
                setErrorMessage("");
            }, 3000);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        if (!email || !password) {
            setErrorMessage("Email and password are required");
            return;
        }

        if (formType === "registration" && password.length < 8) {
            setErrorMessage("Password should be at least 8 characters long");
            return;
        }

        const data = {
            formType: formType,
            full_name: fullName,
            email: email,
            phone_num: phoneNumber,
            password: password,
        };
        authenticate(data);
    };

    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className='mx-auto flex flex-col space-y-4 text-sm font-lato font-semibold justify-start items-center sm:items-center mt-6'
            >
                {formType === "login" && (
                    <div className='flex flex-col w-10/12 sm:w-7/12 gap-4 p-6'>
                        <div className='relative h-11 w-full'>
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='peer h-full w-full rounded-md border border-gray-500 border-t-transparent  px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-accent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                                placeholder=' '
                            />
                            <label className='before:content[" "] after:content[" "] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-accent peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-accent peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-accent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500'>
                                {t("Email")}
                            </label>
                        </div>
                        <div className='relative h-11 w-full min-w-3/6'>
                            <input
                                type='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='peer h-full w-full rounded-md border border-gray-500 border-t-transparent  px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-accent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                                placeholder=' '
                            />
                            <label className='before:content[" "] after:content[" "] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-accent peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-accent peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-accent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500'>
                                {t("Password")}
                            </label>
                            <Link href='/resetPassword'>
                                <p className='flex justify-end text-xs font-light hover:text-accent mt-2'>
                                    {t("Forgot your password?")}
                                </p>
                            </Link>
                        </div>
                        <div className='-ml-2.5'>
                            <div className='inline-flex mt-4 items-center'>
                                <label
                                    className='relative flex cursor-pointer items-center rounded-full p-3'
                                    htmlFor='checkbox'
                                    data-ripple-dark='true'
                                >
                                    <input
                                        type='checkbox'
                                        className='before:content[""] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-bkg before:opacity-0 before:transition-opacity checked:border-titleContent checked:bg-accent checked:before:bg-bkg hover:before:opacity-10'
                                        id='checkbox'
                                    />
                                    <span className='pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            className='h-3.5 w-3.5'
                                            viewBox='0 0 20 20'
                                            fill='currentColor'
                                            stroke='currentColor'
                                            strokeWidth='1'
                                        >
                                            <path
                                                fillRule='evenodd'
                                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                clipRule='evenodd'
                                            ></path>
                                        </svg>
                                    </span>
                                </label>
                                <label
                                    className='mt-px cursor-pointer select-none font-light text-titleContent'
                                    htmlFor='checkbox'
                                >
                                    {t("Remember Me")}
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* Full Name and Email */}
                {formType === "registration" && (
                    <div className='flex items-center flex-col sm:flex-row space-y-4 sm:flex sm:items-end sm:justify-start'>
                        <div className='relative h-11 w-full sm:mr-3'>
                            <input
                                type='name'
                                id='fullName'
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className='peer h-full w-full min-w-[232px] rounded-md border border-gray-500 border-t-transparent  px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-accent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                                placeholder=' '
                            />
                            <label
                                htmlFor='fullName'
                                className='before:content[" "] after:content[" "] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-accent peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-accent peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-accent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500'
                            >
                                {t("Full Name")}
                            </label>
                        </div>

                        <div className='relative h-11 w-full'>
                            <input
                                type='email'
                                id='email'
                                onChange={(e) => setEmail(e.target.value)}
                                className='peer h-full w-full min-w-[232px] rounded-md border border-gray-500 border-t-transparent  px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-accent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                                placeholder=' '
                            />
                            <label
                                htmlFor='email'
                                className='before:content[" "] after:content[" "] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-accent peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-accent peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-accent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500'
                            >
                                {t("Email")}
                            </label>
                        </div>
                    </div>
                )}

                {/* Phone Number and Password */}
                {formType === "registration" && (
                    <div className='flex items-center flex-col sm:flex-row justify-center sm:flex sm:justify-start'>
                        <div className='relative h-11 w-full min-w-[232px] sm:mr-3'>
                            <input
                                type='tel'
                                id='phoneNumber'
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                className='peer h-full w-full min-w-[232px] rounded-md border border-gray-500 border-t-transparent  px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-accent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                                placeholder=' '
                            />
                            <label
                                htmlFor='phoneNumber'
                                className='before:content[" "] after:content[" "] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-accent peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-accent peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-accent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500'
                            >
                                {t("Phone Number")}
                            </label>
                        </div>
                        <div className='relative h-11 w-full min-w-[200px]'>
                            <input
                                type='password'
                                id='password'
                                onChange={(e) => setPassword(e.target.value)}
                                className='peer h-full w-full rounded-md border border-gray-500 border-t-transparent  px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-accent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                                placeholder=' '
                            />
                            <label
                                htmlFor='password'
                                className='before:content[" "] after:content[" "] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-accent peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-accent peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-accent peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500'
                            >
                                {t("Password")}
                            </label>
                        </div>
                    </div>
                )}

                {/* Additional Fields for Registration */}
                {formType === "registration" && (
                    <div className='relative h-11 w-1/2 min-w-[200px]'>
                        <LocationInput
                            location={location}
                            setLocation={setLocation}
                            onLocationSelect={handleLocationChange}
                            styling='peer h-full w-full rounded-md border border-gray-500 border-t-transparent  px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-accent focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50'
                        />
                    </div>
                )}

                {/* Terms & Conditions Checkbox */}
                {formType === "registration" && (
                    <div className='flex items-center my-4 space-x-2'>
                        <div className='flex flex-col'>
                            <input
                                type='checkbox'
                                onChange={(e) => setTerms(e.target.checked)}
                            />
                            <label
                                htmlFor='agreements'
                                className='block mt-2 font-light text-center'
                            >
                                {t(
                                    "I have read and agree with all of the Terms"
                                )}
                                <span className='block sm:hidden'>
                                    {t("and Privacy Policy")}
                                </span>
                                <span className='hidden sm:block'>
                                    {t(
                                        "and Conditions and Privacy Policy of The website"
                                    )}
                                </span>
                            </label>
                        </div>
                    </div>
                )}

                {/* Error message display */}
                {errorMessage && (
                    <div className='text-red-500'>{t(errorMessage)}</div>
                )}

                {/* Submit Button */}
                <button
                    type='submit'
                    disabled={!isFormFilled()}
                    className='bg-accent hover-bg-blue-700 text-white disabled:bg-gray-400 font-semibold py-2 px-8 drop-shadow-xl rounded-full hover:scale-105'
                >
                    {formType === "registration"
                        ? `${t("Sign Up")}`
                        : `${t("Login")}`}
                </button>
            </form>
        </div>
    );
}

export default CustomForm;

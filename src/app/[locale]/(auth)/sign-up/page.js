import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import Link from "next/link";
const page = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className=' flex flex-wrap justify-center items-center'>
            <div className='mt-20 flex flex-col'>
                <div className='relative flex justify-center items-center'>
                    <Image
                        width={1185 / 1.5}
                        height={385 / 1.5}
                        alt='pc'
                        src='https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&q=80&w=1185&h=385&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    />
                    <div className='absolute flex justify-center items-center w-full h-full bg-[rgba(114,174,200,0.78)] text-3xl text-white font-regular font-poppins tracking-wider'>
                        Sign Up
                    </div>
                </div>
                <div className='flex flex-col bg-[rgb(237,241,243)]'>
                    {/* title */}
                    <div className='flex flex-col text-center font-lato text-content'>
                        <h1 className='text-2xl '>
                            Create Your{" "}
                            <span className='text-accent'>Store</span>
                        </h1>
                        <p className='text-sm'>
                            and start exchanging with other students
                        </p>
                    </div>

                    {/*Buttons*/}
                    <div className='flex justify-center items-center  m-2 text-content font-lato'>
                        <button className='flex text-sm m-1 px-3 border border-accent2/80 shadow-md p-1 rounded-xl bg-white'>
                            <FaFacebook className='w-5 h-5 mr-1 text-blue-600' />
                            <span className='hidden sm:block'>
                                Continue with Facebook
                            </span>
                        </button>
                        <button className='flex text-sm m-1 px-3 border border-accent2/80 shadow-md p-1 rounded-xl bg-white '>
                            <FcGoogle className='mr-1 w-5 h-5' />
                            <span className='hidden sm:block'>
                                Continue with Google
                            </span>
                        </button>
                    </div>

                    <form className='mx-auto flex flex-col space-y-4 text-sm font-lato font-semibold justify-start items-center sm:items-center mt-2'>
                        {/* Full Name and Email */}
                        <div className='sm:flex space-x-4 space-y-2 sm:justify-start'>
                            <div className='flex flex-col md:flex-row items-center'>
                                <label htmlFor='fullName' className='md:w-28'>
                                    Full Name:
                                </label>
                                <input
                                    type='text'
                                    id='fullName'
                                    name='fullName'
                                    className='shadow-md border rounded-md sm:w-64 w-96'
                                />
                            </div>
                            <div className='flex flex-col md:flex-row items-center'>
                                <label htmlFor='email' className='md:w-28'>
                                    Email:
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    className='shadow-md border rounded-md sm:w-64 w-96'
                                />
                            </div>
                        </div>

                        {/* Phone Number and Password */}
                        <div className='sm:flex space-x-4 space-y-2 sm:justify-start'>
                            <div className='flex flex-col md:flex-row items-center'>
                                <label
                                    htmlFor='phoneNumber'
                                    className='md:w-28'
                                >
                                    Phone Number:
                                </label>
                                <input
                                    type='text'
                                    id='phoneNumber'
                                    name='phoneNumber'
                                    className='shadow-md border rounded-md sm:w-64 w-96'
                                />
                            </div>
                            <div className='flex flex-col md:flex-row items-center'>
                                <label htmlFor='password' className='md:w-28'>
                                    Password:
                                </label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    className='shadow-md border rounded-md sm:w-64 w-96'
                                />
                            </div>
                        </div>

                        {/* Address */}
                        <div className='flex md:flex-row flex-col items-center'>
                            <label htmlFor='address' className='md:w-28'>
                                Address:
                            </label>
                            <textarea
                                id='address'
                                name='address'
                                className='shadow-md border rounded-md w-96'
                            />
                        </div>

                        {/* Terms & Conditions Checkbox */}
                        <div className='flex items-center space-x-2'>
                            <input
                                type='checkbox'
                                name='agreements'
                                className='shadow-md border rounded-md'
                            />
                            <label
                                htmlFor='agreements'
                                className='block font-thin '
                            >
                                I have read and agree with all of the Terms
                                <span className='block sm:hidden'>
                                    and Privacy Policy
                                </span>
                                <span className='hidden sm:block'>
                                    & Conditions and Privacy Policy of Student
                                    Store website.
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            className='bg-accent hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg'
                        >
                            Submit
                        </button>
                    </form>
                    <div className='text-center m-2 text-sm text-content font-thin font-lato'>
                        Already a member ?{" "}
                        <Link className='text-accent' href='/sign-in'>
                            {" "}
                            Login{" "}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;

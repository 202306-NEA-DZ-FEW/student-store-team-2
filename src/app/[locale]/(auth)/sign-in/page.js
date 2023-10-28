import Image from "next/image";
import Link from "next/link";

import CustomForm from "@/components/form/Form";
import GoogleLoginButton from "@/components/googleLoginButton/GoogleButton";
const page = () => {
    return (
        <div className=' flex flex-wrap justify-center items-center '>
            <div className='mt-20 flex flex-col '>
                <div className='relative flex justify-center items-center'>
                    <Image
                        width={1185 / 1.5}
                        height={385 / 1.5}
                        alt='pc'
                        src='https://images.unsplash.com/photo-1593425546383-260c8b86730b?auto=format&fit=crop&q=80&w=1185&h=385&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                    />
                    <div className='absolute flex justify-center items-center w-full h-full bg-[rgba(114,174,200,0.78)] text-3xl text-white font-regular font-poppins tracking-wider'>
                        LOGIN
                    </div>
                </div>
                <div className='flex flex-col bg-[rgb(237,241,243)]'>
                    {/* title */}
                    <div className='flex flex-col text-center font-lato text-content'>
                        <h1 className='text-2xl '>
                            Create Your
                            <span className='text-accent'>Store</span>
                        </h1>
                        <p className='text-sm'>
                            and start exchanging with other students
                        </p>
                    </div>

                    <CustomForm formType='login' />
                    <div className='text-center m-2 text-sm   text-content'>
                        {" "}
                        Not a member ?{" "}
                        <Link className='text-accent' href='/sign-up'>
                            Sign Up
                        </Link>
                    </div>

                    {/*Buttons*/}
                    <div className='flex justify-center items-center text-sm  m-2 text-content font-lato'>
                        Or:
                    </div>
                    <div className='flex justify-center items-center mb-2 '>
                        <GoogleLoginButton
                            googleText='Login with Google'
                            styling='flex text-sm m-1 px-3 border border-accent2/80 shadow-md p-1 rounded-xl bg-white'
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;

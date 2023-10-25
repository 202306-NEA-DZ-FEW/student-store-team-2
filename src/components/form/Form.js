"use client";
import { useForm, Controller } from "react-hook-form";
import {
    loginWithEmailAndPassword,
    registerUserWithEmailAndPassword,
} from "@/lib/authentication";
import { useRouter } from "next/navigation";
const CustomForm = ({ formType }) => {
    const { handleSubmit, control, formState, setError, reset } = useForm();
    const Router = useRouter();
    const onSubmit = async (data) => {
        // Add validation logic here
        if (formType === "registration") {
            if (data.password.length < 8) {
                setError("password", {
                    type: "manual",
                    message: "Password should be longer than 8 characters.",
                });
            }
            if (!/\d/.test(data.password)) {
                setError("password", {
                    type: "manual",
                    message: "Password should contain at least one number.",
                });
            }
            if (data.email.trim() === "") {
                setError("email", {
                    type: "manual",
                    message: "Email is required.",
                });
            }
            // Add other validation rules for registration here
            try {
                const user = await registerUserWithEmailAndPassword(
                    data.email,
                    data.password,
                    {
                        fullName: data.fullName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        // Add other user data fields here
                    }
                );
                console.log("User registered:", user);
                reset();
                Router.push("/profile");
            } catch (error) {
                console.error("Error during registration:", error.message);
            }
        } else if (formType === "login") {
            // Login-specific validation (if needed)

            // Call the login function
            try {
                const user = await loginWithEmailAndPassword(
                    data.email,
                    data.password
                );
                console.log("User logged in:", user);
                reset();
                Router.push("/");
            } catch (error) {
                console.error("Error during login:", error.message);
                // Handle login error as needed
            }
        }
    };

    return (
        <form
            className='mx-auto flex flex-col space-y-4 text-sm font-lato font-semibold justify-start items-center sm:items-center mt-2'
            onSubmit={handleSubmit(onSubmit)}
        >
            {/* Full Name and Email */}
            {formType === "login" && (
                <div className='flex flex-col md:flex-row items-center'>
                    <label htmlFor='email' className='md:w-28'>
                        Email:
                    </label>
                    <div className='flex flex-col'>
                        <Controller
                            name='email'
                            control={control}
                            rules={{ required: "Email is required" }}
                            render={({ field }) => (
                                <input
                                    type='email'
                                    id='email'
                                    className='shadow-md border rounded-md sm:w-64 w-72'
                                    {...field}
                                />
                            )}
                        />
                        {formState.errors.email && (
                            <p className='text-red-500'>
                                {formState.errors.email.message}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {formType === "login" && (
                <div className='flex flex-col items-end'>
                    <div className='flex flex-col md:flex-row items-center justify-end'>
                        <label htmlFor='password' className='md:w-28'>
                            Password:
                        </label>
                        <div className='flex flex-col'>
                            <Controller
                                name='password'
                                control={control}
                                rules={{
                                    required: "Password is required",
                                }}
                                render={({ field }) => (
                                    <input
                                        type='password'
                                        id='password'
                                        className='shadow-md border rounded-md sm:w-64 w-72'
                                        {...field}
                                    />
                                )}
                            />
                            {formState.errors.password && (
                                <p className='text-red-500'>
                                    {formState.errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                    {formType === "login" && (
                        <p className='text-xs font-thin'>
                            forgot your password?
                        </p>
                    )}
                </div>
            )}

            {/* Full Name and Email */}
            {formType === "registration" && (
                <div className='sm:flex space-x-4 space-y-2 sm:justify-start'>
                    <div className='flex flex-col md:flex-row items-center'>
                        <label htmlFor='fullName' className='md:w-28'>
                            Full Name:
                        </label>
                        <div className='flex flex-col'>
                            <Controller
                                name='fullName'
                                control={control}
                                rules={{ required: "Full Name is required" }}
                                render={({ field }) => (
                                    <input
                                        type='text'
                                        id='fullName'
                                        className='shadow-md border rounded-md sm:w-64 w-96'
                                        {...field}
                                    />
                                )}
                            />
                            {formState.errors.fullName && (
                                <p className='text-red-500'>
                                    {formState.errors.fullName.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center'>
                        <label htmlFor='email' className='md-w-28'>
                            Email:
                        </label>
                        <div className='flex flex-col'>
                            <Controller
                                name='email'
                                control={control}
                                rules={{ required: "Email is required" }}
                                render={({ field }) => (
                                    <input
                                        type='email'
                                        id='email'
                                        className='shadow-md border rounded-md sm:w-64 w-96'
                                        {...field}
                                    />
                                )}
                            />
                            {formState.errors.email && (
                                <p className='text-red-500'>
                                    {formState.errors.email.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Phone Number and Password */}
            {formType === "registration" && (
                <div className='sm:flex space-x-4 space-y-2 sm:justify-start'>
                    <div className='flex flex-col md:flex-row items-center'>
                        <label htmlFor='phoneNumber' className='md:w-28'>
                            Phone Number:
                        </label>
                        <div className='flex flex-col'>
                            <Controller
                                name='phoneNumber'
                                control={control}
                                render={({ field }) => (
                                    <input
                                        type='text'
                                        id='phoneNumber'
                                        className='shadow-md border rounded-md sm:w-64 w-96'
                                        {...field}
                                    />
                                )}
                            />
                            {formState.errors.phoneNumber && (
                                <p className='text-red-500'>
                                    {formState.errors.phoneNumber.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row items-center'>
                        <label htmlFor='password' className='md-w-28'>
                            Password:
                        </label>
                        <div className='flex flex-col'>
                            <Controller
                                name='password'
                                control={control}
                                rules={{
                                    required: "Password is required",
                                }}
                                render={({ field }) => (
                                    <input
                                        type='password'
                                        id='password'
                                        className='shadow-md border rounded-md sm:w-64 w-96'
                                        {...field}
                                    />
                                )}
                            />
                            {formState.errors.password && (
                                <p className='text-red-500'>
                                    {formState.errors.password.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Additional Fields for Registration */}
            {formType === "registration" && (
                <div className='flex md:flex-row flex-col items-center'>
                    <label htmlFor='address' className='md-w-28'>
                        Address:
                    </label>
                    <div className='flex flex-col'>
                        <Controller
                            name='address'
                            control={control}
                            render={({ field }) => (
                                <textarea
                                    id='address'
                                    className='shadow-md border rounded-md w-96'
                                    {...field}
                                />
                            )}
                        />
                        {formState.errors.address && (
                            <p className='text-red-500'>
                                {formState.errors.address.message}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Terms & Conditions Checkbox */}
            {formType === "registration" && (
                <div className='flex items-center space-x-2'>
                    <div className='flex flex-col'>
                        <Controller
                            name='agreements'
                            control={control}
                            rules={{
                                required:
                                    "You must agree to the Terms & Conditions",
                            }}
                            render={({ field }) => (
                                <input
                                    type='checkbox'
                                    className='shadow-md border rounded-md'
                                    {...field}
                                />
                            )}
                        />
                        <label htmlFor='agreements' className='block font-thin'>
                            I have read and agree with all of the Terms
                            <span className='block sm:hidden'>
                                and Privacy Policy
                            </span>
                            <span className='hidden sm:block'>
                                & Conditions and Privacy Policy of Student Store
                                website.
                            </span>
                        </label>
                        {formState.errors.agreements && (
                            <p className='text-red-500'>
                                {formState.errors.agreements.message}
                            </p>
                        )}
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <button
                type='submit'
                className='bg-accent hover-bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg'
            >
                {formType === "registration" ? "Sign Up" : "Login"}
            </button>
        </form>
    );
};

export default CustomForm;

"use client";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
function CustomForm() {
    const [formType, setFormType] = useState("login");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const handleFormTypeChange = (type) => {
        setFormType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = Cookies.get("authToken");

        try {
            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    formType: formType,
                    fullName: fullName,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Success:", data.user);
                Cookies.set("authToken", data.user.uid, { expires: 7 });
                console.log("Cookies Set", Cookies.get("authToken"));
                router.push("/");
                // Redirect or perform any actions on successful login/registration
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.error);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("An error occurred.");
        }
    };
    return (
        <div>
            <button
                onClick={() => handleFormTypeChange("login")}
                className={`form-toggle-button ${
                    formType === "login" && "active"
                }`}
            >
                Login
            </button>
            <button
                onClick={() => handleFormTypeChange("registration")}
                className={`form-toggle-button ${
                    formType === "registration" && "active"
                }`}
            >
                Registration
            </button>
            <form
                onSubmit={handleSubmit}
                className='mx-auto flex flex-col space-y-4 text-sm font-lato font-semibold justify-start items-center sm:items-center mt-2'
            >
                {formType === "login" && (
                    <div className='flex flex-col md:flex-row items-center'>
                        <label htmlFor='email' className='md:w-28'>
                            Email:
                        </label>
                        <div className='flex flex-col'>
                            <input
                                type='email'
                                id='email'
                                className='shadow-md border rounded-md sm:w-64 w-72'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
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
                                <input
                                    type='password'
                                    id='password'
                                    className='shadow-md border rounded-md sm:w-64 w-72'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
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
                                <input
                                    type='text'
                                    id='fullName'
                                    className='shadow-md border rounded-md sm:w-64 w-96'
                                    value={fullName}
                                    onChange={(e) =>
                                        setFullName(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row items-center'>
                            <label htmlFor='email' className='md-w-28'>
                                Email:
                            </label>
                            <div className='flex flex-col'>
                                <input
                                    type='email'
                                    id='email'
                                    className='shadow-md border rounded-md sm:w-64 w-96'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
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
                                <input
                                    type='text'
                                    id='phoneNumber'
                                    className='shadow-md border rounded-md sm:w-64 w-96'
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        setPhoneNumber(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row items-center'>
                            <label htmlFor='password' className='md-w-28'>
                                Password:
                            </label>
                            <div className='flex flex-col'>
                                <input
                                    type='password'
                                    id='password'
                                    className='shadow-md border rounded-md sm:w-64 w-96'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
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
                            <textarea
                                id='address'
                                className='shadow-md border rounded-md w-96'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                    </div>
                )}
                {/* Terms & Conditions Checkbox */}
                {formType === "registration" && (
                    <div className='flex items-center space-x-2'>
                        <div className='flex flex-col'>
                            <input
                                type='checkbox'
                                className='shadow-md border rounded-md'
                            />
                            <label
                                htmlFor='agreements'
                                className='block font-thin'
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
        </div>
    );
}

export default CustomForm;

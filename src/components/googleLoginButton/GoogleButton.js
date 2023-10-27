"use client";
import { FcGoogle } from "react-icons/fc";

import { handleGoogleLogin } from "@/lib/authDetails";

const GoogleLoginButton = () => {
    return <FcGoogle onClick={handleGoogleLogin} className='mr-1 w-6 h-6' />;
};

export default GoogleLoginButton;

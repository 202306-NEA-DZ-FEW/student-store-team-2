"use client";
import { useTranslations } from "next-intl";
import { FcGoogle } from "react-icons/fc";

import { handleGoogleLogin } from "@/lib/authDetails";

const GoogleLoginButton = ({ googleText, styling }) => {
    const t = useTranslations("Index");
    return (
        <button onClick={handleGoogleLogin} className={`${styling}`}>
            <FcGoogle className='mr-1 w-6 h-6' />
            <span className='hidden sm:block'>{t(`${googleText}`)}</span>
        </button>
    );
};

export default GoogleLoginButton;

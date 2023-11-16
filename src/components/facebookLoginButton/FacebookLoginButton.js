"use client";
import { useTranslations } from "next-intl";
import { FaFacebook } from "react-icons/fa";

const FacebookLoginButton = ({ styling }) => {
    const t = useTranslations("Index");
    return (
        <button className={`${styling}`}>
            <FaFacebook className=' w-6 h-6' />
        </button>
    );
};

export default FacebookLoginButton;

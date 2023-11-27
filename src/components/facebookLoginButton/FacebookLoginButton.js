"use client";
import { FaFacebook } from "react-icons/fa";

const FacebookLoginButton = ({ styling }) => {
    return (
        <button className={`${styling}`}>
            <FaFacebook className=' w-6 h-6 text-blue-700' />
        </button>
    );
};

export default FacebookLoginButton;

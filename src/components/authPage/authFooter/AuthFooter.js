"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";

const AuthFooter = ({ type }) => {
    const t = useTranslations("Index");
    const text = type === "LOGIN" ? "Not a member ?" : "Already a member ?";
    const link = type === "LOGIN" ? "/sign-up" : "/sign-in";
    const linkText = type === "LOGIN" ? "Sign Up" : "Login";

    return (
        <div>
            {" "}
            <div className='text-center m-2 text-sm   text-content'>
                {" "}
                {t(text)}
                <Link className='text-accent' href={link}>
                    {" "}
                    {t(linkText)}{" "}
                </Link>
            </div>
            {/*Buttons*/}
            <div className='flex justify-center items-center text-sm  m-2 text-content font-lato'>
                {t("Or:")}
            </div>
        </div>
    );
};

export default AuthFooter;

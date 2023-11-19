"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { FaSpinner } from "react-icons/fa";

import { signOut } from "@/lib/_supabaseAuth";

import { useUser } from "../userProvider/UserProvider";

function UserStatus() {
    const t = useTranslations("Index");
    const { user, userData, loading } = useUser();
    const handleSignOutUser = async () => {
        await signOut();
        window.location.href = "/";
    };

    if (loading) {
        return (
            <div>
                <div className='flex justify-center items-center'>
                    <FaSpinner className='h-8 w-8 animate-spin duration-150 text-accent2' />
                </div>
            </div>
        );
    } else if (user) {
        return (
            <div>
                <p>
                    {t("Hello")} {userData?.full_name.split(" ")[0]}!
                </p>
                <button className='text-red-500' onClick={handleSignOutUser}>
                    {t("Sign out")}
                </button>
            </div>
        );
    } else {
        return <Link href='/sign-in'> {t("Sign In")}</Link>;
    }
}

export default UserStatus;

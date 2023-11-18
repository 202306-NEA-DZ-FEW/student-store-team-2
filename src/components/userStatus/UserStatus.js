"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

import { signOut } from "@/lib/_supabaseAuth";

import { useUser } from "../userProvider/UserProvider";

function UserStatus() {
    const t = useTranslations("Index");
    const { user, userData, loading } = useUser();
    const handleSignOutUser = async () => {
        await signOut();
    };

    if (loading) {
        return (
            <div>
                <p>...</p>
            </div>
        );
    } else if (user) {
        return (
            <div>
                <p>
                    {t("Hello")} {userData?.first_name}!
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

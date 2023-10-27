"use client";

import Cookies from "js-cookie";
import Link from "next/link";
import React from "react";

import { useUser } from "../userProvider/UserProvider";

function UserStatus() {
    const { user, userName, loading } = useUser();
    const handleSignOutUser = async () => {
        try {
            // Retrieve the user's authentication token from a cookie or another source
            const authToken = Cookies.get("authToken");

            const response = await fetch("/api/auth", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`,
                },
                body: JSON.stringify({
                    formType: "signout",
                }),
            });

            if (response.ok) {
                Cookies.remove("authToken");

                window.location.href = "/";
            } else {
                const errorData = await response.json();
                console.error("Sign-out error:", errorData.error);
            }
        } catch (error) {
            console.error("Sign-out error:", error);
        }
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
                <p>Hello {userName}!</p>
                <button className='text-red-500' onClick={handleSignOutUser}>
                    Sign out
                </button>
            </div>
        );
    } else {
        return <Link href='/sign-in'>Sign In</Link>;
    }
}

export default UserStatus;

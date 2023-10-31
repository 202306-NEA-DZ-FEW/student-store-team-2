"use client";

import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Function to fetch user data and username
        const fetchUserData = async () => {
            try {
                const authToken = Cookies.get("authToken");
                if (!authToken) {
                    setLoading(false);
                    return;
                }
                const userDataResponse = await fetch("/api/userData", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${authToken}`,
                    },
                });

                if (userDataResponse.ok) {
                    // Parse the response as JSON
                    const userData = await userDataResponse.json();

                    // Access user and username properties
                    const fetchedUser = userData.data.user;
                    const fetchedUserName = userData.data.username;

                    // Update the component state with the fetched user and username data
                    setUser(fetchedUser);
                    if (fetchedUserName) {
                        setUserName(fetchedUserName);
                    } else {
                        setUserName("loading");
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <UserContext.Provider value={{ user, userName, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children, getCurrentUser }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data?.user);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user) {
                    await setUserData(user.user_metadata);
                    setLoading(false);
                } else {
                    await new Promise((resolve) => setTimeout(resolve, 1000));

                    setLoading(false);
                }
            } catch (error) {
                // Handle errors
                setLoading(false);
                throw error;
            }
        };

        fetchUserData();
    }, [user]);

    return (
        <UserContext.Provider value={{ user, userData, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}

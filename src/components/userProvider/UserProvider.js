"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/lib/_supabaseAuth";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data?.user);
            } catch (error) {
                // Handle errors
            }
        };

        fetchData();
    }, []);
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user) {
                    setUserData(user.user_metadata);
                    setLoading(false);
                }
            } catch (error) {
                // Handle errors
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

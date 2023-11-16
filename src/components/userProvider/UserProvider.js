"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/lib/authDetails";
import { getUserProfile } from "@/lib/supabase";

const UserContext = createContext();

export function UserProvider({ fetchUserData, children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const user = await getCurrentUser();

            await setUser(user);

            const data = await getUserProfile(user);
            await setUserData(data);
            await setLoading(false);
        };

        fetchData();
    }, [fetchUserData]);
    return (
        <UserContext.Provider value={{ user, userData, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/lib/authDetails";

const UserContext = createContext();

export function UserProvider({ fetchUserData, children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            const user = await getCurrentUser();
            const data = await fetchUserData(user);

            setUserData(data);
            setUser(user);
            setLoading(false);
        };

        fetchData();
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

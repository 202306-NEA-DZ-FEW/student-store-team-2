"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { getCurrentUser } from "@/lib/_supabaseAuth";

const UserContext = createContext();

export function UserProvider({ fetchUserData, children }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            getCurrentUser().then((data) => {
                setUser(data?.user?.id);
            });
            // await setUser(currentUser.data.user.id);
            // console.log("currenUser ID", currentUser.data.user.id);
            const data = await fetchUserData(user);

            await setUserData(data);
            await setLoading(false);
        };

        fetchData();
    }, [fetchUserData, user]);

    return (
        <UserContext.Provider value={{ user, userData, loading }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}

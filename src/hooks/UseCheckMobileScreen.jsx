"use client";
import { useEffect, useState } from "react";

const useCheckMobileScreen = () => {
    const [width, setWidth] = useState();
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            window.addEventListener("resize", handleWindowSizeChange);
        }

        return () => {
            window.removeEventListener("resize", handleWindowSizeChange);
        };
    }, []);

    return [width <= 768];
};

export default useCheckMobileScreen;

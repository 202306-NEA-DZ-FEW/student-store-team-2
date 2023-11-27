/**
 * The `useCheckMobileScreen` function is a custom hook that returns a boolean value indicating
 * whether the current screen width is less than or equal to 768 pixels.
 * @returns The useCheckMobileScreen custom hook is returning an array with a single boolean value. The
 * boolean value represents whether the width of the window is less than or equal to 768 pixels,
 * indicating whether the screen is considered a mobile screen or not.
 */
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

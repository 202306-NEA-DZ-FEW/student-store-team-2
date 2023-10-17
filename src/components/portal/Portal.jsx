"use client";

import { createPortal } from "react-dom";

const Portal = ({ children }) => {
    if (typeof window === "object") {
        const mount = document.body;
        const el = document.createElement("div");

        return createPortal(children, mount);
    }
};

export default Portal;

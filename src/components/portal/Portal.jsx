/**
 * The above code is a React component that creates a portal to render its children into the document
 * body.
 * @returns The `Portal` component is returning the result of the `createPortal` function.
 */
"use client";

import { createPortal } from "react-dom";

const Portal = ({ children }) => {
    if (typeof window === "object") {
        const mount = document.body;

        return createPortal(children, mount);
    }
};

export default Portal;

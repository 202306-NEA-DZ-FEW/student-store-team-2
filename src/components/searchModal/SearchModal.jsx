"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

const SearchModal = ({ children }) => {
    useEffect(() => {
        const modalRoot = document.getElementById("modal-root");
        const modalContainer = document.createElement("div");

        modalRoot.appendChild(modalContainer);

        return () => {
            modalRoot.removeChild(modalContainer);
        };
    }, []); // Empty dependency array ensures the effect runs only once, after the initial render

    const modalRoot = document.getElementById("modal-root");
    const modalContainer = document.createElement("div");

    return createPortal(children, modalContainer);
};

export default SearchModal;

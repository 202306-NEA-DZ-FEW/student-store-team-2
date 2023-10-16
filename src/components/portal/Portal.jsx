import { createPortal } from "react-dom";

const Portal = ({ children }) => {
    const mount = document.body;
    const el = document.createElement("div");

    // useEffect(() => {
    //     mount.appendChild(el);
    //     return () => mount.removeChild(el);
    // }, [el, mount]);

    return createPortal(children, mount);
};

export default Portal;

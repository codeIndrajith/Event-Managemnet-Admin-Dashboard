import React from "react";

interface ModalProps {
    children: React.ReactNode,
    widthClassName: string;
    heightClassName: string;
    resetPaddingX?: boolean;
    resetPaddingY?: boolean;
}

const Modal: React.FC<ModalProps>  = (
    {
        children,
        widthClassName,
        heightClassName,
        resetPaddingX=false,
        resetPaddingY=false

    }
) => {

    return (
        <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md ${!resetPaddingX && "px-10"} ${!resetPaddingY && "py-7"} z-[2000] ${widthClassName} ${heightClassName}`}>
            {children}
        </div>
    );
}

export default Modal;
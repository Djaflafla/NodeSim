import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export const InputConnItem = () => {
    const [toggle, setToggle] = useState(false);
    const [display, setDisplay] = useState("none");
    const [positionY, setPositionY] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [offSetY, setOffSetY] = useState(0);
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffSetY(e.clientY - positionY);
        e.currentTarget.style.cursor = "grabbing";
    };
    const handleMouseMove = (e) => {
        if (isDragging) {
            setPositionY(e.clientY - offSetY);
        }
    };
    const handleMouseUp = (e) => {
        setIsDragging(false);
        if (e.target instanceof HTMLElement) {
            e.target.style.cursor = "grab";
        }
    };
    useEffect(() => {
        if (isDragging) {
            // Add event listeners when dragging starts
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }
        else {
            // Remove event listeners when dragging stops
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        }
        // Cleanup event listeners when the component unmounts
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);
    useEffect(() => {
        if (toggle) {
            setDisplay("flex");
        }
        else {
            setDisplay("none");
        }
    }, [toggle]);
    const liStyle = {
        position: "absolute",
        top: positionY,
        backgroundColor: "orange",
        display: "flex",
        alignItems: "center",
        userSelect: "none",
        cursor: "grab"
    };
    const connStyle = {
        borderRadius: "50%",
        backgroundColor: "orange",
        border: "2px solid yellow",
        height: "41px",
        width: "41px"
    };
    const editStyle = {
        display: display
    };
    return (_jsxs("li", { className: 'inputConnector', style: liStyle, onMouseDown: handleMouseDown, children: [_jsx("div", { className: 'cercle', style: connStyle }), _jsx("div", { className: 'inputInfo', style: { padding: "5px" }, children: "inputinput" }), _jsxs("div", { className: 'editOptions', style: editStyle, children: [_jsx("button", { children: " X " }), _jsx("button", { children: " Edit " })] }), _jsx("button", { onClick: () => setToggle((prev) => (!prev)), children: "toggle" })] }));
};
//# sourceMappingURL=InputSection.js.map
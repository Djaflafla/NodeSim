import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect } from "react";
export const DraggableDiv = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [offSet, setOffSet] = useState({ x: 0, y: 0 });
    const divStyle = {
        position: "absolute",
        left: position.x,
        top: position.y,
        zIndex: 2,
        backgroundColor: "hotpink",
        cursor: "grab",
        height: "50px",
        width: "100px",
        borderRadius: "10px"
    };
    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffSet({
            x: e.clientX - position.x,
            y: e.clientY - position.y
        });
        e.currentTarget.style.cursor = "grabbing";
    };
    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offSet.x,
                y: e.clientY - offSet.y
            });
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
        // Cleanup event listeners when the component unmounts
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging]);
    return (_jsx("div", { style: divStyle, onMouseDown: handleMouseDown }));
};
//# sourceMappingURL=dragDiv.js.map
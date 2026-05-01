import {useState, useEffect} from "react";
export const InputConnItem = () => {
    const [toggle, setToggle] = useState(false);
    const [display, setDisplay] = useState("none");
    const [positionY, setPositionY] = useState(0)
    const [isDragging, setIsDragging] = useState(false);
    const [offSetY, setOffSetY] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsDragging(true);
        setOffSetY(e.clientY - positionY);
        e.currentTarget.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: React.MouseEvent<MouseEvent>) => {
        if (isDragging) {
            setPositionY(e.clientY - offSetY);
        }
    }

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
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
        } else {
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
        } else {
            setDisplay("none");
        }
    }, [toggle]);

    const liStyle:React.CSSProperties = {
        position: "absolute",
        top: positionY,
        backgroundColor: "orange",
        display: "flex",
        alignItems: "center",
        userSelect: "none",
        cursor: "grab"
    };

    const connStyle:React.CSSProperties = {
        borderRadius: "50%",
        backgroundColor: "orange",
        border: "2px solid yellow",
        height: "41px",
        width: "41px"
    };

    

    const editStyle:React.CSSProperties = {
        display: display
    };

    return (
            <li className='inputConnector' style={liStyle} onMouseDown={handleMouseDown}>
                <div className='cercle' style={connStyle}></div>
                <div className='inputInfo' style={{padding: "5px"}}>inputinput</div>
                <div className='editOptions' style={editStyle}>
                    <button> X </button>
                    <button> Edit </button>
                </div>
                <button onClick={() => setToggle((prev) => (!prev))}>toggle</button>
            </li>
    )
};
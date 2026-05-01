import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ReactElement, useState } from 'react';
import './App.css';
import { DraggableDiv } from './dragDiv';
import { InputConnItem } from './InputSection';
export const NodeInfoWindow = () => {
    return (_jsx("div", { className: 'nodeInfoWindow' }));
};
export const TopBar = ({ setIsHiden }) => {
    return (_jsxs("header", { className: 'topBar', children: [_jsx("button", { onClick: () => setIsHiden((prev) => (!prev)), children: "click" }), _jsx("button", { children: "click" })] }));
};
export const MainScreen = ({ isHiden, inputList }) => {
    const sectionStyle = {
        height: "calc(85vh - 6px)",
        width: "15%",
        border: "3px solid purple",
        position: "absolute",
        margin: "0",
        padding: "0",
        listStyleType: "none",
        left: "-28px",
        cursor: "auto"
    };
    return (_jsx("main", { className: 'mainScreen', onContextMenu: (e) => { e.preventDefault(); }, children: _jsxs("div", { className: 'playArea', children: [_jsx(DraggableDiv, {}), _jsx("ul", { style: sectionStyle, children: inputList.map((x, index) => (_jsx("li", { children: x }, index))) }), isHiden && (_jsx(NodeInfoWindow, {}))] }) }));
};
export const LowBar = ({ setInputList }) => {
    return (_jsxs("footer", { className: 'lowBar', children: [_jsxs("div", { className: 'quickNodes', children: [_jsx("button", { children: "ff" }), _jsx("button", { children: "ff" })] }), _jsxs("div", { className: 'menuLowRight', children: [_jsx("button", { onClick: () => setInputList((list) => [...list, _jsx(InputConnItem, {})]), children: "in edit" }), _jsx("button", { children: "out edit" }), _jsx("button", { children: "." })] })] }));
};
//# sourceMappingURL=div.js.map
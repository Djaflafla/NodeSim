import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { ReactElement, useEffect, useState } from 'react';
import { LowBar, TopBar, MainScreen } from './div';
import './App.css';
function App() {
    const [isHiden, setIsHiden] = useState(false);
    const [inputList, setInputList] = useState([]);
    return (_jsx(_Fragment, { children: _jsxs("div", { children: [_jsx(TopBar, { setIsHiden: setIsHiden }), _jsx(MainScreen, { isHiden: isHiden, inputList: inputList }), _jsx(LowBar, { setInputList: setInputList })] }) }));
}
export default App;
//# sourceMappingURL=App.js.map
import { mainMenuFunc, type possibleMainMenuFunc } from "./MainMenuFunc.js"

export const dict = {
    WSMENUINPUTID : "wsMenuInput",
    MAINMENUOPTION : Object.keys(mainMenuFunc) as possibleMainMenuFunc[],
    MAINMENUDIVID : "mainMenuDiv",
    MAINMENUBUTTONDIVID :"mainMenuButtonDiv",
    MAINMENUBUTTONCLASS : "mainMenuButton",
    
    WSMENUID : "wsMenu",
    WSDIVID : "wsDiv",
    WORKBENCHDIVID : "workbenchDiv",
    CONNLINESSVGID :"connLinesSVG",
    CLOCKBUTTONID : "clockButton",
    WSMENUBUTTONDIVID : "wsMenuButtonDiv",
}


import { Menu } from "./Menu.js"

export function init(menu:Menu){

    // listen for update of input bar
    menu.inputBar? menu.inputBar.addEventListener("input", ()=>{
        menu.inputUpdate()
    }):console.log("no input bar")

}
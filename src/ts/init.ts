import { Menu } from "./Menu.js"
import type { Workspace } from "./Workspace.js"
import type {OptionList} from "./Workspace.js"

export function init(ws:Workspace){

    // listen for update of input bar
    ws.menu.inputBar? ws.menu.inputBar.addEventListener("input", ()=>{
        ws.menu.inputUpdate(ws.optList, ws.pieceCollection)
    }):console.log("no input bar")

}
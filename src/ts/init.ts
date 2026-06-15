import { Renderer } from "./Render.js"
import type { Workspace } from "./Workspace.js"

export function init(ws:Workspace){

    // listen for update of input bar
    ws.menu.inputBar? ws.menu.inputBar.addEventListener("input", ()=>{
        ws.menu.selectedPiece=undefined
        Renderer.updateMenu(ws)

    }):console.log("no input bar")

}
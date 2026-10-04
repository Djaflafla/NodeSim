import { Renderer } from "./Render.js"
import type { Workspace } from "./Workspace.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"
// import { blabla } from "./main.js"

export function init(ws:Workspace){

    // listen for update of input bar
    ws.menu.inputBar? ws.menu.inputBar.addEventListener("input", ()=>{
        ws.menu.newInput(ws)
    }):console.error("no input bar")

    
    const clockBut = document.getElementById("clock")
    clockBut?.addEventListener("click", ()=>{ws.qm.clockAction()})
}
    
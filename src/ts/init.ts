import { Renderer } from "./Render.js"
import { Workspace } from "./Workspace.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"
// import { blabla } from "./main.js"

export function initWS(){

    let ws = new Workspace()

    // listen for update of input bar
    ws.menu.inputBar? ws.menu.inputBar.addEventListener("input", ()=>{
        ws.menu.newInput(ws)
    }):console.error("no input bar")

    
    const clockBut = document.getElementById("clock")
    clockBut?.addEventListener("click", ()=>{ws.qm.clockAction()})

    return ws
}

export function initMM():{
    // create html

    // create logic
    // initial state: shown


    // print main menu
    
}
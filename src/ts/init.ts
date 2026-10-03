import { Renderer } from "./Render.js"
import type { Workspace } from "./Workspace.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"
// import { blabla } from "./main.js"

export function init(ws:Workspace){

    // listen for update of input bar
    ws.menu.inputBar? ws.menu.inputBar.addEventListener("input", ()=>{
        ws.menu.selectedPiece=[]
        ws.menu.updateSelected(ws.menu.getInputVal(), ws)

    }):console.error("no input bar")

    

    const clockBut = document.getElementById("clock")
    clockBut?.addEventListener("click", ()=>{
        if (ws.checkInputUpdate) {
            ws.initQ()
            ws.checkInputUpdate=false
        }
        if (ws.Q.length>0){ws.runNextinQ()}
        

        // let [input1, input2, output] = blabla
        // console.log("///////////////////////")
        // console.log(input1!.connectors[0])
        // console.log(input2!.connectors[0])
        // console.log(output!.connectors[0])
        // console.log(output!.connectors[0]?.connection)

    })
}
    
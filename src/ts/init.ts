import { Renderer } from "./Render.js"
import type { Workspace } from "./Workspace.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"

export function init(ws:Workspace){

    // listen for update of input bar
    ws.menu.inputBar? ws.menu.inputBar.addEventListener("input", ()=>{
        ws.menu.selectedPiece=[]
        ws.menu.updateSelected(ws.menu.getInputVal(), ws)

    }):console.error("no input bar")


    const clockBut = document.getElementById("clock")
    clockBut?.addEventListener("click", ()=>{
        Renderer.renderWS(ws)
    })

}

        // Object.entries(ws.pieceCollection).forEach(([key, piece])=>{
        //     if (piece instanceof Node) {
        //         piece.run(piece)
        //     }
        //     if (piece instanceof Connector){
        //         if (!piece.connectionId){return}
        //         let connArray = ws.cm[piece.connectionId]
        //         if (!connArray){return}
        //         piece.spreadValue(connArray)
        //     }
        // })
    
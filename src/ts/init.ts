import { Renderer } from "./Render.js"
import type { Workspace } from "./Workspace.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"

export function init(ws:Workspace){

    // listen for update of input bar
    ws.menu.inputBar? ws.menu.inputBar.addEventListener("input", ()=>{
        ws.menu.setSelected(ws.menu.getInputVal(), ws)
        Renderer.updateMenu(ws)

    }):console.error("no input bar")


    const clockBut = document.getElementById("clock")
    clockBut?.addEventListener("click", ()=>{
        ws.pieceCollection.forEach(piece=>{
            if (piece instanceof Node) {
                piece.run(piece)
            }
            if (piece instanceof Connector){
                if (!piece.connectionId){return}
                let connArray = ws.connectionMap[piece.connectionId]
                if (!connArray){return}
                piece.spreadValue(connArray)
            }
        })
        console.log(ws.pieceCollection)
    })

}
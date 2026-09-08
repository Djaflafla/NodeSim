import type { Workspace } from "./Workspace.js"
import { Node } from "./Node.js"
import { Renderer as R} from "./Render.js"
import type { nodeType } from "./Node.js"
import { nodeFunction } from "./nodeFunction.js"
import { isNodeType } from "./jsUtils.js"

export type menuFunc = {
    [option:string]:(ws:Workspace)=>void
}

// Function for option in Menu
export const menuFunc:menuFunc = {
    "newNode": (ws)=>{
        let input = ws.menu.getInputVal()
        let known
        if (isNodeType(input)){ known = input}
       

        let node = Node.createNode(ws, known?known:"node", input)
        ws.pieceCollection.push(node)
        ws.menu.setSelected(node.id, ws)
        R.renderWS(ws)
    },
        
    "newConn" : (ws)=>{
    let sp = ws.menu.selectedPiece
        if (!(sp instanceof Node)){console.error("seleceted piece is not a node");return}
        sp.addConn(ws)
        R.renderWS(ws)
    },
    
    "delNode":(ws)=>{
        if (Array.isArray(ws.menu.selectedPiece)){console.error("is an array in \"delNode\"");return}
        if (!ws.menu.selectedPiece){return}
        Node.delPiece(ws.menu.selectedPiece, ws)
        ws.menu.inputBar.value=""
        ws.menu.setSelected("", ws)
        R.renderWS(ws)
        
    },

    "delConn" : (ws)=>{
        if (Array.isArray(ws.menu.selectedPiece)){console.error("is an array in \"delConn\"");return}
        if (!ws.menu.selectedPiece){return}
        Node.delPiece(ws.menu.selectedPiece, ws)
        ws.menu.inputBar.value=""
        ws.menu.setSelected("", ws)
        R.renderWS(ws)
        // delete from  pC and from conn
    },

    "link" : (ws)=>{
        if (!(Array.isArray(ws.menu.selectedPiece))) {return}
        let conn1 = ws.menu.selectedPiece[0]
        let conn2 = ws.menu.selectedPiece[1]
        if (!conn1 || !conn2){console.error("missing conn for link");return}

        ws.connect(conn1, conn2)
        R.renderWS(ws)
    },

    "edit" : (ws)=>{},
}

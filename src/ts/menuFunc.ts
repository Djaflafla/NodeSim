import type { Workspace } from "./Workspace.js"
import { Node } from "./Node.js"
import { Renderer as R} from "./Render.js"
import type { nodeType } from "./Node.js"
import { nodeFunction } from "./nodeFunction.js"
import { isNodeType } from "./jsUtils.js"
import { Connector } from "./Connector.js"

export type menuFunc = {
    [option:string]:(ws:Workspace)=>void
}

// Function for option in Menu
export const menuFunc:menuFunc = {
    "newNode": (ws)=>{
        let input = ws.menu.getInputVal()
        let known
        if (isNodeType(input)){ known = input}

        let node = ws.createNode(known?known:"node", input)
        ws.pieceCollection[node.id] = node
        ws.menu.updateSelected(node.id, ws)
        R.renderWS(ws)
    },
        
    // "newConn" : (ws)=>{
    // let sp = ws.menu.selectedPiece
    //     if (!(sp instanceof Node)){console.error("seleceted piece is not a node");return}
    //     // Useless to add a conn when I cannot use it yet.
    //     // Be back later
    //     // sp.addConn(ws)
    //     // R.renderWS(ws)
    // },
    
    "delNode":(ws)=>{
        if (Array.isArray(ws.menu.selectedPiece)){console.error("is an array in \"delNode\"");return}
        if (!ws.menu.selectedPiece){return}
        Node.delNode(ws.menu.selectedPiece, ws)
        ws.menu.inputBar.value=""
        ws.menu.updateSelected("", ws)
        R.renderWS(ws)
        
    },

    "delConn" : (ws)=>{
        if (!ws.menu.selectedPiece){console.error("no selected piece for delConn");return}
        if (!(ws.menu.selectedPiece instanceof Connector)){console.error("piece is not a connector");return}

        ws.cm.delConnector(ws.menu.selectedPiece, ws)
        ws.menu.inputBar.value=""
        ws.menu.updateSelected("", ws)
        R.renderWS(ws)
        // delete from  pC and from conn
    },

    "link" : (ws)=>{
        let conn1 = ws.menu.selectedPiece[0]
        let conn2 = ws.menu.selectedPiece[1]
        if (!(conn1 instanceof Connector) || !(conn2 instanceof Connector)){console.error("missing conn for link");return}
        ws.cm.connect(conn1, conn2)
        R.renderWS(ws)
    },

    "unlink": (ws)=>{
        let conn1 = ws.menu.selectedPiece[0]
        let conn2 = ws.menu.selectedPiece[1]
        if (!(conn1 instanceof Connector) || !(conn2 instanceof Connector)){console.error("missing conn for link");return}
        if (!conn1.connection.subscriber.includes(conn2)){console.error("Not connected")}
        ws.cm.unconnect(conn1, conn2)
        R.renderWS(ws)
    },



    "edit" : (ws)=>{},



}
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

        let node = Node.createNode(known?known:"node", ws, input)
        ws.pieceCollection[node.id] = node
        ws.menu.updateSelected(node.id, ws)
        R.renderWS(ws)
    },

    "addInput": (ws)=>{
        let node = Node.createNode('input', ws)
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
        if (!(ws.menu.selectedPiece[0] instanceof Node)){console.error("is not a node in delNode");return}
       
        Node.delNode(ws.menu.selectedPiece[0], ws)
        ws.menu.updateSelected("", ws)
        R.renderWS(ws)
        
    },

    "delConn" : (ws)=>{
        if (!(ws.menu.selectedPiece[0] instanceof Connector)){console.error("piece is not a connector");return}

        // Del conn from conn.node
        ws.menu.selectedPiece[0].node!.delConn(ws.menu.selectedPiece[0], ws)
        ws.menu.updateSelected("", ws)
        R.renderWS(ws)
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
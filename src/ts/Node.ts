import { Connector } from "./Connector.js";
import type { Workspace } from "./Workspace.js";
import { nodeFunction, getFunction, getNbConn } from "./nodeFunction.js";
import {UUID} from "./jsUtils.js"

const CONNNAME = (node:Node)=>{return node.connectors.length.toString()}

const CONN1 = ["input", "output", ]
const CONN2 = ["wire", "not" ]
const CONN3 = ["and", "or", "add"] 
const NODEOPTION = ["newNode", "edit", "newConn", "delNode"]

// export const POSSNODE = ["and", "or", "not", "input", "output", "wire", "node", "add"] as const
// export type nodeType = typeof POSSNODE [number]
export type nodeType = keyof typeof nodeFunction


export class Node {
    id:string
    type:nodeType
    run:(node:Node)=>void
    connectors: Connector[] = []
    name:string | undefined
    option = NODEOPTION
    inputBar: HTMLInputElement|undefined
    outputP: HTMLInputElement|undefined
    inputValue: string | undefined

    constructor (id:string, type: nodeType, func:(node:Node)=>void, name?:string) {
        this.id = id
        this.type = type
        this.run = func
        this.name = name
    }

    // create piece. add Conn, give Func, give ID
    static createNode:(ws:Workspace, type:nodeType, name?:string)=>Node = (ws, type, name)=> {
        let func = getFunction(type)
        
        let id = UUID(4)
        let newN:Node = new Node (id, type, func, name)
        newN.type=type

        newN.addConn(ws, getNbConn(type))
        return newN
    }

    // delete node and its connectors from pieceCollection, connectionMap
    // delete conn from pieceCollection, node.connectors, connectionMap
    static delPiece(piece:Node|Connector, ws:Workspace) {

        // Remove conn from connectionMap and pieceCollection
        function delConn (conn:Connector[]|Connector) {
            let connArray = []
            if (!Array.isArray(conn)) {
                connArray.push(conn)
            } else {connArray = conn}

            // Delete connector from connectionMap
            connArray.forEach(conn=>{
                let connectionId = conn.connectionId
                if (!connectionId){return}
                let indx1 = ws.connectionMap[connectionId]?.findIndex(c=>c==conn)
                if (!indx1){return}
                ws.connectionMap[connectionId]?.splice(indx1, 1)
            })

            // Delete connector from pieceCollection
            connArray.forEach(c1=>{
                let indx2 = ws.pieceCollection.findIndex(c=>c==c1)
                ws.pieceCollection.splice(indx2, 1)
            })
        }

        if (!piece){console.error("no piece to del from delPiece()");return}

        if (piece instanceof Node) {
            // Del conn properly
            delConn(piece.connectors)

            // Del node
            let pIndex = ws.pieceCollection.findIndex(p=>p==piece)
            ws.pieceCollection.splice(pIndex, 1)
        }
        if (piece instanceof Connector) {
            // del conn from node.connector
            let node = piece.node
            let indx = node.connectors.findIndex(conn=>conn==piece)
            node.connectors.splice(indx, 1)
            // Del conn from pCollection & connectionMap
            delConn(piece)
        }
    }

    //need ws to append to pieceCollection
    addConn(ws:Workspace, amount:number=1){
        for (let i =0; i<amount; i++) {
            let id = UUID(4)
            let conn = new Connector(id, this, CONNNAME(this))
            this.connectors.push(conn)
            ws.pieceCollection.push(conn)
        }
    }

    setInputValue(){
        if (!this.inputBar){console.error("no input bar on this node in setInputVal()");return}
        this.inputValue = this.inputBar.value
    }
}
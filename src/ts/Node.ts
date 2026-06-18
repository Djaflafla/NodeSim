import { Connector } from "./Connector.js";
import type { Workspace } from "./Workspace.js";
import { NodeFunction as nf } from "./NodeFunction.js";

const CONN3 = ["and", "or", ]
const NODEOPTION = ["newNode", "edit", "newConn", "delNode"]

export const POSSNODE = ["and", "or", "not", "input", "wire", "node"] as const
export type nodeType = typeof POSSNODE [number]

const FAKEHTMLID = "nodeInputBar"


export class Node {
    id:string
    type:nodeType
    run:(node:Node)=>void
    connectors: Connector[] = []
    name:string | undefined
    option = NODEOPTION
    inputBar: HTMLInputElement|undefined
    inputValue: string | undefined

    constructor (id:string, type: nodeType, func:(node:Node)=>void, name?:string) {
        this.id = id
        this.type = type
        this.run = func
        this.name = name
    }

    // create piece. add Conn, give Func, give ID
    static createNode:(ws:Workspace, type:nodeType, name?:string)=>Node = (ws, type, name)=> {
        let func = nf.getFunction(type)!
        // if (!func){console.log("no func in createNode");return}
        
        let id = crypto.randomUUID().slice(32)
        let newN:Node = new Node (id, type, func, name)
        newN.type=type

        if (CONN3.includes(type)){
            newN.addConn(ws, 3)
            // add 3 conn
        }
        if (type=="input"){
            newN.addConn(ws)
        }
        if (type=="not"){
            newN.addConn(ws, 2)
        }
        return newN
    }

     // delete node and its connectors from pieceCollection
    // delete Conn from pieceCollection and from node.connectors
    static delPiece(piece:Node|Connector, ws:Workspace) {
        if (!piece){console.log("no piece to del from delPiece()");return}
        if (piece instanceof Node) {
            piece.connectors.forEach(conn=>{
                let indx3 = ws.pieceCollection.findIndex(c=>c==conn)
                ws.pieceCollection.splice(indx3, 1)
            })
        }
        if (piece instanceof Connector) {
            
            // del conn from node.connector
            let node = piece.node
            let indx = node.connectors.findIndex(conn=>conn==piece)
            node.connectors.splice(indx, 1)
        }
        
        // del mentioned piece from pc
        let indx1 = ws.pieceCollection.findIndex(p=>p==piece)
        ws.pieceCollection.splice(indx1, 1)
    }

    //need ws to append to pieceCollection
    addConn(ws:Workspace, amount:number=1){
        console.log("addConn "+amount.toString())
        for (let i =0; i<amount; i++) {
            let id = crypto.randomUUID().slice(32)
            let conn = new Connector(id, this, this.connectors.length.toString())
            this.connectors.push(conn)
            ws.pieceCollection.push(conn)
        }
    }

    setInputValue(){
        if (!this.inputBar){console.log("no input bar on this node in setInputVal()");return}
        this.inputValue = this.inputBar.value
    }
}
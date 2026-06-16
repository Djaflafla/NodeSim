import { NodeFunction as nf } from "./NodeFunction.js"
import { Node } from "./Node.js"
import { Connector } from "./Connector.js"
import type { Workspace } from "./Workspace.js"
export class Piece {
    name:string | undefined
    type:string
    id:string
    option: string[]


    constructor (id:string, name?:string) {
        this.id = id
        this.name = name
        this.type = "piece"
        this.option = []
    }

    // create piece. add Conn, give Func, give ID
    static createNode:(ws:Workspace, type:string, name?:string)=>Node = (ws, type, name)=> {
        let func = nf.getFunction(type)!
        // if (!func){console.log("no func in createNode");return}
        
        let id = crypto.randomUUID().slice(32)
        let newN:Node = new Node (id, func, name)
        
        if (type == "and"){
            newN.addConn(ws, 3)
            // add 3 conn
        }
        return newN
    }

    // delete node and its connectors from pieceCollection
    // delete Conn from pieceCollection and from node.connectors
    static delPiece(piece:Piece, ws:Workspace) {
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
}


import { Connector } from "./Connector.js";
import { Piece } from "./Piece.js";
import type { Workspace } from "./Workspace.js";

const NODEOPTION = ["newNode", "edit", "newConn", "delNode"]
export class Node extends Piece {
    connectors: Connector[] = []
    type = "node"
    run:(node:Node)=>void
    option = NODEOPTION

    constructor (id:string, func:(node:Node)=>void, name?:string) {
        super(id, name)
        this.run = func
    }

    //need ws to append to pieceCollection
    addConn(ws:Workspace, amount:number=1){
        for (let i =0; i<amount; i++) {
            let id = crypto.randomUUID().slice(32)
            let conn = new Connector(id, this, this.connectors.length.toString())
            this.connectors.push(conn)
            ws.pieceCollection.push(conn)
        }
    }
}
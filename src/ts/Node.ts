import { Connector } from "./Connector.js";
import { Piece } from "./Piece.js";
export class Node extends Piece {
    connectors: Connector[] 

    constructor (id:string, name:string, func:()=>void) {
        super(id, name, func)
        this.type = "node"
        this.connectors = []
        this.option = ["edit", "addConn", "delNode"]
        
    }
}
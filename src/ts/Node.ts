import { Connector } from "./Connector.js";
import { Piece } from "./Piece.js";
export class Node extends Piece {
    connectors: Connector[] = []
    type = "node"
    option = ["edit", "addConn", "delNode"]

    constructor (id:string, func:()=>void, name?:string) {
        super(id, func, name)
    }
}
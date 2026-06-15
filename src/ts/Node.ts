import type { Connector } from "./Connector.js";
import { Piece } from "./Piece.js";

const NODEOPTION = ["edit", "newConn", "delNode"]
export class Node extends Piece {
    connectors: Connector[] = []
    type = "node"
    option = NODEOPTION

    constructor (id:string, func:()=>void, name?:string) {
        super(id, func, name)
    }
}
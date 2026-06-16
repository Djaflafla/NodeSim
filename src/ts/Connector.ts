import { Node } from "./Node.js";
import { Piece } from "./Piece.js";

const CONNOPTION = ["link", "delConn"]
export class Connector extends Piece{
    value:string = ""
    option = CONNOPTION
    type = "connector"
    node:Node

    constructor (id:string, node:Node, name?:string) {
        super(id, name)
        this.node = node
    }

}
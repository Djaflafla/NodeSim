import { Node } from "./Node.js";
import { Piece } from "./Piece.js";

const CONNOPTION = ["link", "delConn"]
export class Connector extends Piece{
    value:string = ""
    option = CONNOPTION
    type = "connector"
    node:Node = new Node("",()=>{})

    constructor (id:string, func:()=>void, name?:string) {
        super(id, func, name)
    }

}
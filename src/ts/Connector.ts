import { Piece } from "./Piece.js";

export class Connector extends Piece{
    value:string

    

    constructor (id:string, name:string, func:()=>void) {
        super(id, name, func)
        this.option = ["link", "delConn"]
        this.value = ""
        this.type = "connector"
        this.value = ""
    }

}
import { Node } from "./Node.js";

const CONNOPTION = ["link", "delConn"]
export class Connector {
    id:string
    type = "conn"
    value:string = ""
    option = CONNOPTION
    node:Node
    name:string | undefined

    constructor (id:string, node:Node, name?:string) {
        this.id = id
        this.node = node
        this.name = name
    }

}
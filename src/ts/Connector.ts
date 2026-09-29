import { Connection } from "./Connection.js";
import { UUID } from "./jsUtils.js";
import { Node } from "./Node.js";

type connType = "input"|"output"
const CONNOPTION = ["delConn"]

export class Connector {
    id:string
    type: connType
    value:string = "noValue"
    menuOption = CONNOPTION
    node:Node
    name:string
    // One Connector = One Connection
    connection: Connection

    constructor (id:string, node:Node, type:connType) {
        this.id = id
        this.node = node
        this.name = id
        this.type = type
        this.connection = new Connection(UUID(), {subs:[this], connectedTo:{[this.id]:[]}})
    }

}
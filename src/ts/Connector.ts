import { Node } from "./Node.js";

const CONNOPTION = ["delConn"]
export class Connector {
    id:string
    type = "conn"
    value:string = "noValue"
    option = CONNOPTION
    node:Node
    name:string | undefined
    connectedTo: Connector [] = []

    constructor (id:string, node:Node, name?:string) {
        this.id = id
        this.node = node
        this.name = name
    }

    connectTo (conn:Connector) {
        this.connectedTo.push(conn)
    }

    spreadValue () {
        this.connectedTo.forEach(conn=>{
            if (this.id = conn.id){return}
            conn.value = this.value
        })
    }

}
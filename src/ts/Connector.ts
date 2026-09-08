import { Node } from "./Node.js";

const CONNOPTION = ["delConn"]
export class Connector {
    id:string
    type = "conn"
    value:string = "noValue"
    option = CONNOPTION
    node:Node
    name:string | undefined
    connectionId: string | undefined

    constructor (id:string, node:Node, name?:string) {
        this.id = id
        this.node = node
        this.name = name
    }

    // Spread value from conn to the ones connected to it
    spreadValue (connArray:Connector[]) {
        connArray.forEach(conn=>{
            if (this.id = conn.id){return}
            conn.value = this.value
        })
    }

}
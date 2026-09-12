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
    connectionId: string = ""

    constructor (id:string, node:Node, type:connType) {
        this.id = id
        this.node = node
        this.name = id
        this.type = type
    }

    // // Spread value from conn to the ones connected to it
    // spreadValue (connArray:Connector[]) {
    //     connArray.forEach(conn=>{
    //         if (this.id == conn.id){return}
    //         conn.value = this.value
    //     })
    // }

}
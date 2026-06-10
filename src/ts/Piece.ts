import { Connector } from "./Connector.js"
import { Node } from "./Node.js"

export class Piece {
    name:string 
    type:string
    id:string
    run:() => void 
    option: string[]


    constructor (id:string, name="", func=()=>{}) {
        this.id = id
        this.name = name
        this.type = "piece"
        this.option = []
        this.run = func
    }
}

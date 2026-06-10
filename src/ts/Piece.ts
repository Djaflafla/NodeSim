import { Connector } from "./Connector.js"
import { Node } from "./Node.js"

export class Piece {
    name:string | undefined
    type:string
    id:string
    run:() => void 
    option: string[]


    constructor (id:string, func=()=>{}, name?:string) {
        this.id = id
        this.name = name
        this.type = "piece"
        this.option = []
        this.run = func
    }
}

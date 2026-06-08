import { Connector } from "./Connector.js";
export class Node {
    name:string
    type:string = "Node"
    id:string
    connectors: Connector[] = []
    run:() => void

    constructor (name:string, func:()=>void) {
        this.id = crypto.randomUUID().slice(30)
        this.name = name
        this.run = func
        
    }


    

    addConn (id:string) {
        this.connectors.push(new Connector(id))
    }
     
    editNode () {

    }
}
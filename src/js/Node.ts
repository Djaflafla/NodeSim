import { Connector } from "./Connector.js";

export class Node {
    name:string
    id:string
    connectors: Connector[] = []
    runFunction = () => {}

    constructor (id:string, name:string) {
        this.id = id
        this.name = name
    }


    

    addConn (id:string) {
        this.connectors.push(new Connector(id))
    }
    
    editNode () {

    }
}
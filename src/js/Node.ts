import { Connector } from "./Connector.js";
export class Node {
    name:string
    id:string
    connectors: Connector[] = []
    runFunction = () => {}

    constructor (name:string) {
        this.id = crypto.randomUUID().slice(30)
        this.name = name
        
    }


    

    addConn (id:string) {
        this.connectors.push(new Connector(id))
    }
    
    editNode () {

    }
}
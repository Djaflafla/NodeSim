import { Connector } from "./Connector.js";
export class Node {
    name:string = "node"
    type:string = "node"
    id:string
    connectors: Connector[] = []
    run:() => void
    option: string[] = ["edit", "addConn", "delNode"]

    constructor (func:()=>void = ()=>{}) {
        this.id = crypto.randomUUID().slice(30)
        this.run = func
        
    }


    

    addConn (id:string) {
        this.connectors.push(new Connector(id))
    }
     
    editNode () {

    }
}
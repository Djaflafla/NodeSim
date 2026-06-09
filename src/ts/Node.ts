import { Connector } from "./Connector.js";
export class Node {
    name:string = "node"
    type:string = "node"
    id:string
    connectors: Connector[] = []
    run:() => void
    option: {opt:string, func:()=>void}[] = [
        {opt:"edit", func:()=>{}},
        {opt:"addConn", func:()=>{}},
        {opt:"delNode", func:()=>{}}
    ]

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
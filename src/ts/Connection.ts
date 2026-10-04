import { ConnectionManager } from "./ConnectionManager.js"
import { Connector } from "./Connector.js"
import type { init } from "./init.js"
import type { Node } from "./Node.js"

export type ConnectorDict = {[id:string]:Connector}
export type FromConnX = {[connectorId:string]:Connector[]}

export type ConnectionParam = {
    id?:string, 
    subs?:Connector[]
    connectedTo?:FromConnX
    value?:string
}

export class Connection {
    id:string
    subscriber:Connector[]=[]
    connectedTo:FromConnX = {}
    value:string = ""


    constructor (id:string, optParam:ConnectionParam={}) {
        this.id = id
        if (optParam["subs"]){this.subscriber=optParam["subs"]}
        if (optParam["connectedTo"]){this.connectedTo=optParam["connectedTo"]}
        if (optParam["value"]){this.value=optParam["value"]}
    }


    addConn(conn:Connector){
        if (this.subscriber.includes(conn)){console.error("Conn already in connection");return}

        this.subscriber.push(conn)
        this.connectedTo[conn.id] = []
        conn.connection=this

    }

    setValue (value:string) {
        this.value = value
    }

    getInputs(){
        let inputs:Connector[] = []
        this.subscriber.forEach(conn=>{
            if (conn.type==="input"){inputs.push(conn)}
        })
        return inputs
    }

    static updateConnection(node:Node){
        let updatedConnection:Connection[] = []
        node.connectors.forEach(conn=>{
            if (conn.type==="output"){
                conn.connection.setValue(conn.value)
                updatedConnection.push(conn.connection)
            }
        })
        return updatedConnection
    }
    

    static getNextNodes(conexArray:Connection[]):Node[]{
        let nodeArray:Node[] = []
        conexArray.forEach(conex=>{
            conex.getInputs().forEach(inputs=>{
                    if (!inputs.node){console.error("connector doesnt have a node");return}
                    nodeArray.push(inputs.node)
                })
        })
        return nodeArray
    }
}



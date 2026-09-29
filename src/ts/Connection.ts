import { ConnectionManager } from "./ConnectionManager.js"
import { Connector } from "./Connector.js"
import type { init } from "./init.js"

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

}



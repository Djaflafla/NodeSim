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

    // put 1 in 2, put 2 in 1
    newCouple(conn1:Connector, conn2:Connector){
        if (this.connectedTo[conn1.id]){
            this.connectedTo[conn1.id]!.push(conn2)
        } else {
            this.connectedTo[conn1.id] = [conn2]
        }

        if (this.connectedTo[conn2.id]){
            this.connectedTo[conn2.id]!.push(conn1)
        } else {
            this.connectedTo[conn2.id] = [conn1]
        }
    }

    static checkConnectiom(conn1:Connector, conn2:Connector){
        // get connectedto of conn1 
        // get connectedto of conn2 
        let conn1ToArray = conn1.connection?.connectedTo[conn1.id]
        let conn2ToArray = conn2.connection?.connectedTo[conn2.id]
        conn1ToArray?.forEach(conn=>{
            if (conn2==conn){return true}
        })
        conn2ToArray?.forEach(conn=>{
            if (conn1==conn){return true}
        })
        return false
    }

    setValue (value:string) {
        this.value = value
    }

}



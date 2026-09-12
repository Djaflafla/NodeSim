import { Connector } from "./Connector.js"
import { UUID } from "./jsUtils.js"
import { Connection } from "./Connection.js"
import { Workspace } from "./Workspace.js"
import type { ConnectorDict } from "./Connection.js"
import { Renderer } from "./Render.js"



export type connMap = {
    [id:string]:Connection
}



export class ConnectionManager{
    connMap:connMap={}

    connect(conn1:Connector, conn2:Connector) {
        let connId = UUID()

        this.connMap[connId] = this.createConnection(connId, [conn1, conn2])
        conn1.connectionId = connId
        conn2.connectionId = connId
        return
    }

    delConnFromNode (connector:Connector) {
        // del conn from node
        let node = connector.node
        Object.entries(node.connectors.input).forEach(([id, conn])=>{
            if (connector===conn){delete node.connectors.input[id]}
            return
        })
        Object.entries(node.connectors.output).forEach(([id, conn])=>{
            if (connector===conn){delete node.connectors.output[id]}
        })
    }

    //Del connection(from connMap) if less than 2 connector
    delConnFromConnection(connector:Connector) {
        // del from connection
        if (connector.connectionId) {
            delete this.connMap[connector.connectionId]?.connectors[connector.id]

            let kv = Object.entries(this.connMap[connector.connectionId]!.connectors)
            // check if still connection and delete
            if (kv.length >1) {return}

            // get last conntor in connex
            // remove connexId from last conntor
            if (!kv[0]){return}
            let lastConn:Connector = kv[0][1]
            lastConn.connectionId = ""
            delete this.connMap[connector.connectionId]
        }
    }

    delConnector(connector:Connector, ws:Workspace) {
        // del from node
        // del from connection
        // Kill connection if dead
        // clean connMap prn
        // del from pieceCollection
        this.delConnFromNode(connector)
        this.delConnFromConnection(connector)
        delete ws.pieceCollection[connector.id]
        // del from pieceColl
    
        delete ws.pieceCollection[connector.id]
    }

    disconnect() {}


    // connectVERSION1(conn1:Connector, conn2:Connector){
    //     // If both already connected: concat 2 into 1. delete 2
    //     // If 1 is already connected push 2 into 1
    //     // If none is conneceted: create connection
    //     if (conn1.connectionId) {
    //         let conn1Array = this.connectionMap[conn1.connectionId]
    //         if (conn2.connectionId){
                
    //             let conn2Array = this.connectionMap[conn2.connectionId]
    //             if (!conn1Array || !conn2Array){return}
    //             // concat add array1 to array2 and returns a copy
    //             this.connectionMap[conn1.connectionId] = conn1Array?.concat(conn2Array)
    //             delete this.connectionMap[conn2.connectionId]
    //             return
    //         }
    //         if (!conn1Array){return}
    //         conn1Array.push(conn2)
    //         return
    //     }

    createConnection (id:string, conns:Connector[]):Connection {
        let connObj:ConnectorDict = {}
        conns.forEach(c=>{
            connObj[c.id]=c
        })
        return new Connection(id, connObj)
    }
}
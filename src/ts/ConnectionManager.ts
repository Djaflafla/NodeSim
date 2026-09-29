import { Connector } from "./Connector.js"
import { UUID } from "./jsUtils.js"
import { Connection } from "./Connection.js"
import { Workspace } from "./Workspace.js"
import { Renderer } from "./Render.js"


export type connMap = {
    [id:string]:Connection
}



export class ConnectionManager{
    connMap:connMap={}
    ws:Workspace

    constructor (ws:Workspace){
        this.ws = ws
    }


    // 1 into 2
    connect(conn1:Connector, conn2:Connector){

        let connexion1 = conn1.connection
        let connexion2 = conn2.connection
        if (connexion1 === connexion2) {console.error("both conn are the same");return}

        connexion1.subscriber.forEach(conn=>{connexion2.subscriber.push(conn); conn.connection=connexion2})
        connexion1.subscriber = []

        Object.entries(connexion1.connectedTo).forEach(([id, connArray])=>{
            connexion2.connectedTo[id] = connArray
            delete connexion1.connectedTo[id]
        })
        delete this.connMap[connexion1.id]

        connexion2.connectedTo[conn1.id]?.push(conn2)
        connexion2.connectedTo[conn2.id]?.push(conn1)
        this.connMap[connexion2.id] = connexion2

    }

    unconnect(){}
    
    

    delConnector(connector:Connector, ws:Workspace) {
        // del from node
        // del from connection
        // Kill connection if dead
        // clean connMap prn
        // del from pieceCollection

    }
}
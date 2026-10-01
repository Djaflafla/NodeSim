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
        if (connexion1.id == connexion2.id) {console.error("both conn are in the same connection");return}

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

    unconnect(conn1:Connector, conn2:Connector){
        let conex = conn1.connection
        let connectedto1 = conex.connectedTo[conn1.id]
        let connectedto2 = conex.connectedTo[conn2.id]
        if (!connectedto1 || !connectedto2) {console.error("Connected to nothiog");return}

        connectedto1.forEach((conn, index)=>{
            if (conn === conn2){
                connectedto1.splice(index, 1)
            }
        })
        connectedto2.forEach((conn, index)=>{
            if (conn === conn1){
                connectedto2.splice(index, 1)
            }
        })
        // ^^ Remove conn from each other
        // create connection for x conns

        // if connectedto[x] is empty
        // if connectedto[x] is last

        
        while (conex.subscriber.length>0){
            let newC = new Connection(UUID())
            newC = returnNewConnection(newC, conex, conex.subscriber.splice(0,1)[0]!)
            if (newC.subscriber.length>1){this.connMap[newC.id] = newC}
            
        }
        delete this.connMap[conex.id]


        
        function returnNewConnection(newC:Connection, oldC:Connection, conn0:Connector):Connection{
            if (newC.subscriber.includes(conn0)){return newC}
            
            newC.subscriber.push(conn0)
            conn0.connection=newC

            // Rm connectedTo from old -> put in new
            newC.connectedTo[conn0.id] = oldC.connectedTo[conn0.id]?.splice(0)??[]

            // process connectedTo
            newC.connectedTo[conn0.id]!.forEach(conn=>{

                // Delete from subs of old connection
                oldC.subscriber.forEach((oldSubConn, index)=>{
                    if (conn === oldSubConn){oldC.subscriber.splice(index, 1)}
                })

                // put in newC
                newC = returnNewConnection(newC, oldC, conn)
            })
            return newC
        }

        
    }
}
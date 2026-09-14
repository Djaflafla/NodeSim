import { Connector } from "./Connector.js"
import { UUID } from "./jsUtils.js"
import { Connection } from "./Connection.js"
import { Workspace } from "./Workspace.js"
import type { ConnectorDict, NestedConnectors } from "./Connection.js"
import { Renderer } from "./Render.js"



export type connMap = {
    [id:string]:Connection
}



export class ConnectionManager{
    connMap:connMap={}

    connect(contor1:Connector, contor2:Connector) {

        if (!contor1.connectionId && !contor2.connectionId) {
            // If not already in connection. Create connexion and add to connMap
            this.createConnection([contor1, contor2])
            console.log("JJJJJJJJJJ")
            return
        }
        
        if (contor1.connectionId&&contor2.connectionId){
            console.log("CCCCCCCC")
            // Both are in a connexion
            
            // Get connexion of 1
            // Get connexion of 2
            console.error("cannot connect because both are in a connection")
            
            return
        }
        
        // Conn1 no, conn2 yes
        if (!contor1.connectionId) {
            console.log("LLLLLLLLLLL")
            // Connect 1 to existing of conn2
            this.connMap[contor2.connectionId]?.addConnector(contor1, contor2)
            return
        }
        
        console.log("PPPPPPPP")
        // Conn1 yes, conn2 no
        // Connect 2 to existing of conn1
        this.connMap[contor1.connectionId]?.addConnector(contor2, contor1)
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
        if (!connector.connectionId) {return}
        
        let connection = this.connMap[connector.connectionId]
        if (!connection){console.error("no connexion with this connectionID");return}

        // remove from connector by id
        delete connection.connectorsById[connector.id]

        // Remove conex id from node
        connector.connectionId=""

        // remove from connectionFlow
        let newCF = connection.removeFromConnectionFlow(connector, connection.connectionFlow, this)[0]

        connection.connectionFlow = newCF

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
    }

    createConnection (NestedConnectors:NestedConnectors) {
        let id = UUID()
        let newC = new Connection(id, NestedConnectors)

        this.connMap[id] = newC
    }
}
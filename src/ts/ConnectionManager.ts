import { Connector } from "./Connector.js"
import { UUID } from "./jsUtils.js"
import { Connection } from "./Connection.js"
import { Workspace } from "./Workspace.js"
import type { ConnectorDict, NestedConnectors } from "./Connection.js"
import { Renderer } from "./Render.js"
import { CFFunc } from "./ConnectionFlow.js"


export type connMap = {
    [id:string]:Connection
}



export class ConnectionManager{
    connMap:connMap={}

    connect(contor1:Connector, contor2:Connector) {

        if (!contor1.connectionId && !contor2.connectionId) {
            // If not already in connection. Create connexion and add to connMap
            this.createConnection([contor1, contor2])
            return
        }
        
        if (contor1.connectionId&&contor2.connectionId){
            // Both are in a connexion
            
            // Get connexion of 1
            // Get connexion of 2
            console.error("cannot connect because both are in a connection")
            
            return
        }
        
        // Conn1 no, conn2 yes
        if (!contor1.connectionId) {
            // Connect 1 to existing of conn2
            this.connMap[contor2.connectionId]?.connectToFlow(contor1, contor2)
            return
        }
        
        // Conn1 yes, conn2 no
        // Connect 2 to existing of conn1
        this.connMap[contor1.connectionId]?.connectToFlow(contor2, contor1)
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
        if (!connector.connectionId) {console.error("Connector doens't have a connectionID"); return}
        let connection = this.connMap[connector.connectionId]
        if (!connection){console.error("no connexion with this connectionID");return}

        // remove from connectionFlow. creates more connections if splited part maskes one
        let newCF= connection.splitFlow(connector, connection.connectionFlow, this)[0]
        
        // check if last or empty in OG connectionFlow
        if (newCF.length<2) {
            if (!Array.isArray(newCF[0])&&newCF[0]) {
                newCF[0].connectionId=""
            } else {console.error("not supposed to be a nested array")}

            delete this.connMap[connection.id]
        } else {
            connection.connectionFlow = connection.cleanCF(newCF)
        }

        // Remove conex id from conn
        connector.connectionId=""

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
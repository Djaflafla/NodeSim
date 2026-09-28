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

    connect(conn1:Connector, conn2:Connector) {

        let c1c = conn1.connection
        let c2c = conn2.connection

        let toadd = conn1
        let toaddto = conn2

        // conn2 no connection
        if (!c2c) {
            // conn1 no connection
            if (!c1c) {
                this.createConnection(conn1, conn2)
                return
            }
            let fConex = new Connection(UUID())
            fConex.addConn(conn2)
            toadd = conn2
            toaddto = conn1
            console.log("con2conexcon2conexcon2conex")
            console.log(conn2.connection)
            // conn1 no connection
        } else if(!c1c) {
            let fConex = new Connection(UUID())
            fConex.addConn(conn1)
        }
        this.mergeConnection(toadd, toaddto)
        return
    }

    // put 1 into 2
    mergeConnection (conn1:Connector, conn2:Connector) {
        let conex1ID = conn1.connection!.id
        console.log(this.connMap)
        let connectedTo1:Connector[] = conn1.connection!.connectedTo[conn1.id]!
        let conex2 = conn2.connection
        if (!conex2){console.error("Missing a connection to connect to in merging");return}
        
        console.log("connectedTo1connectedTo1connectedTo1")
        console.log(JSON.stringify(connectedTo1))

        conex2.addConn(conn1)
        
        // if conn1 not in conn2, exchange
        if (!conex2.connectedTo[conn2.id]!.includes(conn1)){
            conex2.connectedTo[conn2.id]!.push(conn1)}
        if (!conex2.connectedTo[conn1.id]!.includes(conn2)){
            conex2.connectedTo[conn1.id]!.push(conn2)
        } 

        let count = 0
        // if exchange, go get conncted to of conn1
        connectedTo1.forEach(conn=>{
            if (conn!==conn1){
                this.mergeConnection(conn, conn1)
            }
            count++
            console.log("countcountcountcount")
            console.log(count)
        })
        console.log("Donzo")

    }

    unconnect(){}


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

    // //Del connection(from connMap) if less than 2 connector
    // delConnFromConnection(connector:Connector) {
    //     if (!connector.connection) {console.error("Connector doens't have a connectionID"); return}
    //     let connection = connector.connection
    //     if (!connection){console.error("no connexion with this connectionID");return}

    //     // remove from connectionFlow. creates more connections if splited part maskes one
    //     let newCF= connection.splitFlow(connector, connection.connectionFlow, this)[0]
        
    //     // check if last or empty in OG connectionFlow
    //     if (newCF.length<2) {
    //         if (!Array.isArray(newCF[0])&&newCF[0]) {
    //             newCF[0].connectionId=""
    //         } else {console.error("not supposed to be a nested array")}

    //         delete this.connMap[connection.id]
    //     } else {
    //         connection.connectionFlow = connection.cleanCF(newCF)
    //     }

    //     // Remove conex id from conn
    //     connector.connectionId=""

    // }
    
    

    delConnector(connector:Connector, ws:Workspace) {
        // del from node
        // del from connection
        // Kill connection if dead
        // clean connMap prn
        // del from pieceCollection

        this.delConnFromNode(connector)
        // this.delConnFromConnection(connector)
        delete ws.pieceCollection[connector.id]
    }

    createConnection (conn1:Connector, conn2:Connector) {
        let id = UUID()
        let newC = new Connection(id)
        newC.addConn(conn1)
        this.connect(conn2, conn1)
        this.connMap[id] = newC
    }
}
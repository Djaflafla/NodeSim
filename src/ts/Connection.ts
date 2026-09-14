import { ConnectionManager } from "./ConnectionManager.js"
import { Connector } from "./Connector.js"
import { CFFunc } from "./ConnectionFlow.js"

export type ConnectorDict = {[id:string]:Connector}
export type ValuesForConnexion = {
    [id:string]:string
}
export type NestedConnectors = (Connector|NestedConnectors)[]

export class Connection {
    id:string
    connectorsById:ConnectorDict={}
    connectionFlow:NestedConnectors = []
    value:ValuesForConnexion = {}
    removeFromConnectionFlow = CFFunc["removeInConnectionFlow"]
    connectionFlowCorrection = CFFunc["connectionFlowCorrection"]
    addInConnectionFlow = CFFunc["addInConnectionFlow"]


    constructor (id:string, nestedConnectors:NestedConnectors) {
        this.id = id
        this.connectionFlow = nestedConnectors
        this.connectorsById = this.createConnById(nestedConnectors, id)
    }

    createConnById (array:NestedConnectors, id:string) {
        let connObj:ConnectorDict={}
        for (let i of array) {
            if (i instanceof Connector) {
                connObj[i.id] = i
                i.connectionId = id
            }
            if (Array.isArray(i)) {
                // Loop through array
                this.createConnById(i, id)
            }
        }
        return connObj
    }

    addConnector(conn1:Connector, conn2:Connector) {
        if (this.checkFirst(conn2)) {
            this.connectionFlow.splice(0, 0, conn1)
        } else if (this.checkLast(conn2)) {
            this.connectionFlow.push(conn1)
        } else {
            // if conn2 in between 2 other conns
            // find conn2
            this.connectionFlow = this.addInConnectionFlow(conn1, conn2, this.connectionFlow)[0]
        }
        this.connectorsById[conn1.id] = conn1
        conn1.connectionId=conn2.connectionId
    }    

    checkFirst (contor:Connector):Boolean {
        // Doesnt make sens, first and last are alway a conn
    
        let conn1 = this.connectionFlow[0]
        if (conn1 instanceof Connector && conn1 === contor ) {
            return true
        }
        // console.error("find is not a Connector")
        return false
    }
    checkLast (contor:Connector):Boolean {
        // Doesnt make sens, first and last are alway a conn
    
        let lastConn = this.connectionFlow[this.connectionFlow.length-1]
        if (lastConn instanceof Connector && lastConn == contor ) {
            return true
        }
        // console.error("find is not a Connector")  
        return false      
    }
}


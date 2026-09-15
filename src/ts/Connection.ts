import { ConnectionManager } from "./ConnectionManager.js"
import { Connector } from "./Connector.js"
import { CFFunc } from "./ConnectionFlow.js"
import type { init } from "./init.js"

export type ConnectorDict = {[id:string]:Connector}
export type ValuesForConnexion = {
    [id:string]:string
}
export type NestedConnectors = (Connector|NestedConnectors)[]
export type CFFunc = typeof CFFunc

export interface Connection extends CFFunc{}

export class Connection {
    [key:string]:any
    id:string
    connectionFlow:NestedConnectors = []
    value:ValuesForConnexion = {}


    constructor (id:string, nestedConnectors:NestedConnectors) {
        Object.entries(CFFunc).forEach(([funcName, func])=>{this[funcName]=func})
        this.id = id
        let CF = this.cleanCF(nestedConnectors)
        this.connectionFlow = CF
        this.init(CF, id)
    }

    init(array:NestedConnectors, connectionID:string){
        for (let elem of array) {
            if (elem instanceof Connector) {
                elem.connectionId=connectionID
            }
            if (Array.isArray(elem)) {
                // Loop through array
                this.init(elem, connectionID)
            }
        }
    }

    getConnById (array:NestedConnectors) {
        let connById:ConnectorDict={}
        for (let elem of array) {
            if (elem instanceof Connector) {
                connById[elem.id] = elem
            }
            if (Array.isArray(elem)) {
                // Loop through array
                this.getConnById(elem)
            }
        }
        return connById
    }

    connectToFlow(conn1:Connector, conn2:Connector) {
        if (this.connectionFlow[0]==conn2) {
            // check if target is first
            this.connectionFlow.splice(0, 0, conn1)
        } else if (this.connectionFlow[this.connectionFlow.length-1]==conn2) {
            // check if target is last
            this.connectionFlow.push(conn1)
        } else {
            // if conn2 in between 2 other conns
            // find conn2
            let newCF = this.addInsideFlow(conn1, conn2, this.connectionFlow)[0]
            this.connectionFlow = newCF
        }
        conn1.connectionId=this.id
    }    

    // checkFirst (contor:Connector):Boolean {
    //     // Doesnt make sens, first and last are alway a conn
    
    //     let conn1 = this.connectionFlow[0]
    //     if (conn1 instanceof Connector && conn1 === contor ) {
    //         return true
    //     }
    //     // console.error("find is not a Connector")
    //     return false
    // }
    // checkLast (contor:Connector):Boolean {
    //     // Doesnt make sens, first and last are alway a conn
    
    //     let lastConn = this.connectionFlow[this.connectionFlow.length-1]
    //     if (lastConn instanceof Connector && lastConn == contor ) {
    //         return true
    //     }
    //     // console.error("find is not a Connector")  
    //     return false      
    // }
}



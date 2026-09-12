import type { Connector } from "./Connector.js"

export type ConnectorDict = {[id:string]:Connector}
export type ValuesForConnexion = {
    [id:string]:string
}

export class Connection {
    id:string
    connectors:ConnectorDict={}
    value:ValuesForConnexion = {}

    constructor (id:string, connectors: ConnectorDict) {
        this.id = id
        this.connectors=connectors
    }

    addConnector(conn:Connector|Connector[]) {
        let array1 
        if (!Array.isArray(conn)) {
            array1 = [conn]
        } else array1 = conn
        array1.forEach(conn=>{this.connectors[conn.id]=conn})
    }

    setValue (connId:string, value:string) {
        this.value[connId]=value
    }

    getValue () {
        this.checkMultiValue()
        return this.value[0]
    }

    checkMultiValue () {
        if (Object.entries(this.value).length>1){
            console.error("multiple value in same connexion")
        }
    }
}
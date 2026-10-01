import { Connector } from "./Connector.js";
import type { Workspace } from "./Workspace.js";
import { nodeFunction, getFunction } from "./nodeFunction.js";
import {UUID} from "./jsUtils.js"
import type { ConnectorDict } from "./Connection.js";
import { createButton, createElement } from "./htmlUtils.js";
import { getNbConn } from "./nodeFunction.js";

const NODEOPTION = ["newNode", "edit", "delNode"]

// export const POSSNODE = ["and", "or", "not", "input", "output", "wire", "node", "add"] as const
// export type nodeType = typeof POSSNODE [number]
export type nodeType = keyof typeof nodeFunction
export type Connectors = {
    "input":{[id:string]:Connector},
    "output":{[id:string]:Connector}
}

export class Node {
    id:string
    type:nodeType
    run:(node:Node)=>void
    connectors: Connector[]=[]
    name:string
    menuOption = NODEOPTION

    constructor (id:string, type: nodeType, func:(node:Node)=>void, name?:string) {
        this.id = id
        this.type = type
        this.run = func
        this.name = id
    }

    // delete node and its connectors from pieceCollection, connectionMap
    // delete conn from pieceCollection, node.connectors, connectionMap
    static delNode(piece:Node, ws:Workspace) {
        // Del conn properly
        piece.connectors.forEach(conn=>{
            piece.delConn(conn, ws)
            // ws.cm.delConnector(conn, ws)
        })
        
        // Del node
        delete ws.pieceCollection[piece.id]
    }

    delConn (conn:Connector, ws:Workspace){
        //unconnect
        while (conn.getConnectedTo().length>0){
            let conn2 = conn.getConnectedTo()[0]!
            ws.cm.unconnect(conn, conn2)
        }
        //

        // Remove from Node
        this.connectors.forEach((c, index)=>{
            if (c===conn) {
                delete ws.pieceCollection[c.id]
                c.node=undefined
                this.connectors.splice(index, 1)
                return
            }
        })
        // del from pieceCollection

    }

    //need ws to append to pieceCollection
    addConn(ws:Workspace, amountInOut:number){
        for (let i =0; i<amountInOut; i++) {
            let id = UUID()
            let conn = new Connector(id, this, "conn")
            this.connectors.push(conn)
            ws.pieceCollection[id] = conn
        }
    }

    // create piece. add Conn, give Func, give ID
    static createNode:(type:nodeType, ws:Workspace, name?:string)=>Node|InputNode = (type, ws, name)=> {
        let newN:Node|InputNode
        let id = UUID()
        let func = getFunction(type)
        
        if (type=="input"){
            newN = new InputNode (id, func, name)
            if (newN instanceof InputNode){
            }
            
        } else if (type=="output"){
            newN = new OutputNode (id, func, name)
        } else {
            newN = new Node (id, type, func, name)
        }
        
        newN.addConn(ws, getNbConn(type))
        return newN

    }
}

export class InputNode extends Node {
    inputBar: HTMLInputElement
    setButton: HTMLElement

    constructor(id:string, func:(node:Node)=>void, name?:string) {
        super(id, "input", func ,name)

        this.inputBar = createElement("input", {
            className:"inputInputBar"
        }) as HTMLInputElement

        this.setButton = createButton("set", 
            ()=>{this.run(this)}, 
            {className:"inputSetButton"}
        )
    }
}

export class OutputNode extends Node {
    outputBar: HTMLElement = createElement("p", {
        className:"outputOutputBar", 
        textContent:"Value: "
    })
    
    constructor(id:string, func:(node:Node)=>void, name?:string) {
        super(id, "output", func, name)
    }
}
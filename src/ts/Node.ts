import { Connector } from "./Connector.js";
import type { Workspace } from "./Workspace.js";
import { nodeFunction, getFunction } from "./nodeFunction.js";
import {UUID} from "./jsUtils.js"
import type { Connection, ConnectorDict } from "./Connection.js";
import { createButton, createElement } from "./htmlUtils.js";
import { getNbConn } from "./nodeFunction.js";
import type { ConnectionManager } from "./ConnectionManager.js";

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
    connectors: Connector[]=[]
    name:string
    menuOption = NODEOPTION
    run:(node:Node)=>void 
    ws:Workspace

    constructor (id:string, type: nodeType, func:(node:Node)=>void, ws:Workspace, name?:string) {
        this.id = id
        this.type = type
        this.run = func
        this.name = id
        this.ws = ws
    }

    // delete node and its connectors from pieceCollection, connectionMap
    // delete conn from pieceCollection, node.connectors, connectionMap
    static delNode(piece:Node, ws:Workspace) {
        if (ws.startNode.includes(piece)){ws.startNode.splice(ws.startNode.indexOf(piece), 1)}
        // Del conn properly
        piece.connectors.forEach(conn=>{
            piece.delConn(conn, ws)
            // ws.cm.delConnector(conn, ws)
        })
        ws.menu.setInputVal("")
        ws.menu.selectedPiece = []
        
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

        ws.menu.setInputVal("")
        ws.menu.selectedPiece = []

    }

    //need ws to append to pieceCollection
    addConn(ws:Workspace, amountInOut:[number, number]){
        for (let i =0; i<amountInOut[0]; i++) {
            let id = UUID()
            let conn = new Connector(id, this, "input")
            this.connectors.push(conn)
            ws.pieceCollection[id] = conn
        }
        for (let i =0; i<amountInOut[1]; i++) {
            let id = UUID()
            let conn = new Connector(id, this, "output")
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
            newN = new InputNode (id, func, ws, name)
            ws.startNode.push(newN)
            ws.checkInputUpdate = true
            
        } else if (type=="output"){
            newN = new OutputNode (id, func, ws, name)
        } else {
            newN = new Node (id, type, func, ws, name)
        }
        
        newN.addConn(ws, getNbConn(type))
        return newN

    }

    updateInputs (){
        this.connectors.forEach(conn=>{
            if (conn.type==="input"){
                conn.value = conn.connection.value
            }
        })
    }

    // returns an updated connection[]
    updateConnection():Connection[]{
        let conexArray:Connection[] = []
        this.connectors.forEach(conn=>{
            if (conn.type==="output"){
                conn.connection.value = conn.value
                conexArray.push(conn.connection)
            }
        })
        return conexArray
    }

    getUpdatedConnection(){
        let conexArray:Connection[] = []
        this.connectors.forEach(conn=>{
            if (conn.type==="output"){
                conexArray.push(conn.connection)
            }
        })
        return conexArray
    }
}

export class InputNode extends Node {
    inputBar: HTMLInputElement
    setButton: HTMLElement

    constructor(id:string, func:(node:Node)=>void, ws:Workspace, name?:string) {
        super(id, "input", func ,ws, name)

        this.inputBar = createElement("input", {
            className:"inputInputBar"
        }) as HTMLInputElement

        this.setButton = createButton("set", ()=>{
            this.run(this)
            this.updateConnection()
            this.ws.checkInputUpdate = true
        }, 
            {className:"inputSetButton"}
        )
    }
}

export class OutputNode extends Node {
    outputBar: HTMLElement = createElement("p", {
        className:"outputOutputBar", 
        textContent:"Value: "
    })
    
    constructor(id:string, func:(node:Node)=>void, ws:Workspace, name?:string) {
        super(id, "output", func, ws, name)
    }

    setOutput(str:string){
        this.outputBar.textContent="Value: "+str
    }
}
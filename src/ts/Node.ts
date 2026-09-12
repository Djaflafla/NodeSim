import { Connector } from "./Connector.js";
import type { Workspace } from "./Workspace.js";
import { nodeFunction, getFunction, getNbConn } from "./nodeFunction.js";
import {UUID} from "./jsUtils.js"
import type { ConnectorDict } from "./Connection.js";
import { createButton, createElement } from "./htmlUtils.js";

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
    connectors: Connectors = {input:{}, output:{}}
    name:string
    menuOption = NODEOPTION

    constructor (id:string, type: nodeType, func:(node:Node)=>void, name?:string) {
        this.id = id
        this.type = type
        this.run = func
        this.name = type
    }

    // delete node and its connectors from pieceCollection, connectionMap
    // delete conn from pieceCollection, node.connectors, connectionMap
    static delNode(piece:Node|Connector, ws:Workspace) {
        if (piece instanceof Node) {
            // Del conn properly
            Object.entries(piece.getAllConn()).forEach(([id, conntor])=>{
                ws.cm.delConnector(conntor, ws)
            })
            
            // Del node
            delete ws.pieceCollection[piece.id]
        }
    }

    //need ws to append to pieceCollection
    addConn(ws:Workspace, amountInOut:[number, number]){
        // For inputs
        for (let i =0; i<amountInOut[0]; i++) {
            let id = UUID()
            let conn = new Connector(id, this, "input")
            this.connectors.input[id]=conn
            ws.pieceCollection[id] = conn
        }
        // For outputs
        for (let i =0; i<amountInOut[1]; i++) {
            let id = UUID()
            let conn = new Connector(id, this, "output")
            this.connectors.output[id] = conn
            ws.pieceCollection[id] = conn
        }
    }

    getAllConn () {
        let connDict:ConnectorDict = {}

        Object.entries(this.connectors.input).forEach(([id, connector])=>{connDict[id]=connector})
        Object.entries(this.connectors.output).forEach(([id, connector])=>{connDict[id]=connector})

        return connDict
    }
}

export class InputNode extends Node {
    inputBar: HTMLInputElement
    setButton: HTMLElement

    constructor(id:string, func:(node:Node)=>void, name?:string) {
        super(id, "input", func, name)

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
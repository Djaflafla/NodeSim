import { Connector } from "./Connector.js"
import { Node, InputNode, OutputNode} from "./Node.js"
import type {nodeType } from "./Node.js"
import {Renderer as R, Renderer} from "./Render.js"
import { Menu } from "./Menu.js"
import { UUID } from "./jsUtils.js"
import { menuFunc } from "./menuFunc.js"
import { ConnectionManager } from "./ConnectionManager.js"
import { nodeFunction, getFunction, getNbConn } from "./nodeFunction.js";
import type { Connection } from "./Connection.js"

export type Piece = Node|Connector

export type pieceCollection = {
    [id:string]:Piece
}


export class Workspace {
    cm = new ConnectionManager(this)
    menu=new Menu()
    pieceCollection:pieceCollection = {}
    Q:Node[]=[]
    startNode:Node[]=[]
    checkInputUpdate:boolean= false
   

    // initial nodes(inputs)
    // for each conns
    // for each conex: get subscribers
    // for each sub: if sub is input: push it to the q
    initQ(){
        this.Q = []
        this.startNode.forEach(node=>{
            node.getUpdatedConnection().forEach(conex=>{
                conex.subscriber.forEach(conn=>{
                    if (conn.type==="input") {
                        this.Q.push(conn.node!)
                    }
                })   
            })
        })

    }

    doOpt(opt:string){
        let func = menuFunc[opt]
        if (!func) {console.error(`no function for option: ${opt}`);return}
        func(this)
    }

    // Return piece of pieceCollection by searching id first then name
    // return undefined if no match or multiple match
    getPiece:(search:string)=>Piece | undefined = (search) => {
        let found:(Piece)[]= []

        //check by id first (id is more precise bc of uuid)
        if (this.pieceCollection[search]) {
            found.push(this.pieceCollection[search])
        }
        if (found.length==1) {return found[0]}
        if (found.length>1) {console.error("multiple pieces with this id")}

        for (let [Key, piece] of Object.entries(this.pieceCollection)) {
            if (piece.name==search) {
                found.push(piece)
            }   
        }
        if (found.length==1) {return found[0]}
        if (found.length>1) {
            console.error("multiple pieces with this name")
            console.error(`Here's the found pieces: ${found}`)
        }
    }

    runNextinQ(){
        if (this.Q.length<1){console.error("Q is empty")}
        let next:Node = this.Q[0]!

        // get value from connection
        next.updateInputs()

        // process inputs and set output
        next.run(next)

        // Update connection value
        // get subscribers
        // put them in q
        next.updateConnection().forEach(conex=>{
            conex.subscriber.forEach(conn=>{
                if (conn.type==="input") {
                    this.Q.push(conn.node!)
                }
            })
        })
        
        this.Q.splice(0, 1)
    }
    
}

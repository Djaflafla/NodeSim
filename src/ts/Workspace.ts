import { Connector } from "./Connector.js"
import { Node, InputNode, OutputNode} from "./Node.js"
import type {nodeType } from "./Node.js"
import {Renderer as R, Renderer} from "./Render.js"
import { Menu } from "./Menu.js"
import { UUID } from "./jsUtils.js"
import { menuFunc } from "./menuFunc.js"
import { ConnectionManager } from "./ConnectionManager.js"
import { nodeFunction, getFunction, getNbConn } from "./nodeFunction.js";

export type Piece = Node|Connector

export type pieceCollection = {
    [id:string]:Piece
}


export class Workspace {
    Q:Piece[]=[]
    pieceCollection:pieceCollection = {}
    cm = new ConnectionManager()
    menu=new Menu()
   

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

    // create piece. add Conn, give Func, give ID
    createNode:(type:nodeType, name?:string)=>Node|InputNode = (type, name)=> {
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
        
        newN.addConn(this, getNbConn(type))
        return newN

    }
}

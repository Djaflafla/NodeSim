import { Connector } from "./Connector.js"
import { Node} from "./Node.js"
import type {nodeType } from "./Node.js"
import {Renderer as R, Renderer} from "./Render.js"
import { Menu } from "./Menu.js"
import { UUID } from "./jsUtils.js"
import { menuFunc } from "./menuFunc.js"

export type Piece = Node|Connector
export type connMap = {
    [id:string]:Connector[]
}


export class Workspace {
    Q:Piece[]=[]
    pieceCollection:(Piece)[] = []
    connectionMap:connMap = {}
    menu=new Menu()
   

    doOpt(opt:string){
        let func = menuFunc[opt]
        if (!func) {console.error(`no function for option: ${opt}`);return}
        func(this)
    }

    // Return piece of pieceCollection by searching id first then name
    // return undefined if no match or multiple match
    getPiece:(value:string)=>Piece | undefined = (value) => {
        let found:(Piece)[]= []

        //check by id first (id is more precise bc of uuid)
        let byid = undefined
        this.pieceCollection.forEach(piece=>{
            if (piece.id==value) {
                found.push(piece)
            }
        })
        if (found.length==1) {byid = found[0]}
        if (found.length>1) {console.error("multiple pieces with this id")}

        let byname = undefined
        this.pieceCollection.forEach(piece=>{
            if (piece.name==value) {
                found.push(piece)
            }
        })
        if (found.length==1) {byname = found[0]}
        if (found.length>1) {console.error("multiple pieces with this name")}

        return byid?byid:byname
    }

    connect(conn1:Connector, conn2:Connector) {
        let connId = UUID(4)
        this.connectionMap[connId] = [conn1, conn2]
        conn1.connectionId=connId
        conn2.connectionId=connId
        return
    }

    // connectVERSION1(conn1:Connector, conn2:Connector){
    //     // If both already connected: concat 2 into 1. delete 2
    //     // If 1 is already connected push 2 into 1
    //     // If none is conneceted: create connection
    //     if (conn1.connectionId) {
    //         let conn1Array = this.connectionMap[conn1.connectionId]
    //         if (conn2.connectionId){
                
    //             let conn2Array = this.connectionMap[conn2.connectionId]
    //             if (!conn1Array || !conn2Array){return}
    //             // concat add array1 to array2 and returns a copy
    //             this.connectionMap[conn1.connectionId] = conn1Array?.concat(conn2Array)
    //             delete this.connectionMap[conn2.connectionId]
    //             return
    //         }
    //         if (!conn1Array){return}
    //         conn1Array.push(conn2)
    //         return
    //     }

    //     let connId = UUID(4)
    //     this.connectionMap[connId] = [conn1, conn2]
    //     return
    // }
}

 // checkQ () {
    //     // if Node in Q, run it
    //     let next = this.Q[0]
    //     if (!next || !(next instanceof Node)) {return}

    //     next.run(next)
    //     this.Q.shift()
    // }
